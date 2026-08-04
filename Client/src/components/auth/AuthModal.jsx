import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RiCloseLine, RiArrowRightLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../context/AuthContext";
import { authApi } from "../../services/authApi";
import "./AuthModal.css";

const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  "685500519772-qclv720jl87orrus88li3mbfmg2j51e8.apps.googleusercontent.com";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, redirectPath } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState("email"); // "email" | "otp"
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(45);
  const [canResend, setCanResend] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const otpInputsRef = useRef([]);

  // Reset modal state cleanly whenever modal is opened
  useEffect(() => {
    if (isAuthModalOpen) {
      setStep("email");
      setEmail("");
      setOtp(["", "", "", "", "", ""]);
      setTimer(45);
      setCanResend(false);
      setErrorMsg("");
      setSuccessMsg("");
      setIsLoading(false);
    }
  }, [isAuthModalOpen]);

  // Load Google Identity Services SDK script dynamically
  useEffect(() => {
    if (!isAuthModalOpen) return;

    const loadGoogleSdk = () => {
      if (window.google?.accounts?.id) {
        initializeGoogleId();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        initializeGoogleId();
      };
      document.body.appendChild(script);
    };

    const initializeGoogleId = () => {
      try {
        if (window.google?.accounts?.id) {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse
          });
        }
      } catch (e) {
        console.warn("[AuthModal] Failed to initialize Google ID SDK:", e);
      }
    };

    loadGoogleSdk();
  }, [isAuthModalOpen]);

  // Handle Google OAuth Response
  const handleGoogleResponse = async (response) => {
    if (!response || !response.credential) {
      setErrorMsg("Google login failed. No credential received.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // Call backend API POST /api/auth/google
      const result = await authApi.loginWithGoogle(response.credential);
      setIsLoading(false);
      login(result.user);
      if (redirectPath) {
        navigate(redirectPath);
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMsg(err.message || "Google authentication failed.");
    }
  };

  // Trigger Google Account Selector Prompt
  const handleGoogleClick = () => {
    setErrorMsg("");
    setSuccessMsg("");

    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Fallback to standard Google OAuth popup if One Tap is blocked
          console.warn("[GoogleAuth] One-Tap prompt closed or skipped.");
        }
      });
    } else {
      setErrorMsg("Google Sign-In is initializing. Please try again in a moment.");
    }
  };

  // Countdown timer for OTP resend
  useEffect(() => {
    let interval = null;
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && !canResend) {
      setCanResend(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, timer, canResend]);

  if (!isAuthModalOpen) return null;

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setErrorMsg("");
    setSuccessMsg("");
    setIsLoading(true);

    try {
      const res = await authApi.sendOtp(email);
      setIsLoading(false);
      setStep("otp");
      setTimer(45);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]); // Clean empty 6-digit OTP inputs
      setSuccessMsg(res.message || `A 6-digit code has been sent to ${email}`);
    } catch (err) {
      setIsLoading(false);
      setErrorMsg(err.message || "Failed to send OTP code. Please check your backend connection.");
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Move focus to next input box automatically
    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length < 6) {
      setErrorMsg("Please enter complete 6-digit verification code.");
      return;
    }

    setErrorMsg("");
    setSuccessMsg("");
    setIsLoading(true);

    try {
      const result = await authApi.verifyOtp(email, otpCode);
      setIsLoading(false);
      login(result.user);
      if (redirectPath) {
        navigate(redirectPath);
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMsg(err.message || "Invalid or expired OTP code. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await authApi.sendOtp(email);
      setIsLoading(false);
      setTimer(45);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      setSuccessMsg(res.message || "A new verification code has been dispatched!");
    } catch (err) {
      setIsLoading(false);
      setErrorMsg(err.message || "Failed to resend verification code.");
    }
  };

  return (
    <div className="xlr-auth-modal-overlay" onClick={closeAuthModal}>
      <div className="xlr-auth-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Left Side: Auth Form */}
        <div className="xlr-auth-left-panel">
          {/* Close Button */}
          <button type="button" className="xlr-auth-close-btn" onClick={closeAuthModal}>
            <RiCloseLine size={20} color="#ffffff" />
          </button>

          {/* Logo Branding */}
          <div className="xlr-auth-logo">
            Algovia<span>.io</span>
          </div>

          {/* Form Header */}
          <div className="xlr-auth-header-text">
            <h2 className="xlr-auth-title">{step === "email" ? "Sign in" : "Enter Verification Code"}</h2>
            <p className="xlr-auth-subtitle">
              {step === "email"
                ? "Ready to Master Your Software Engineering Interviews?"
                : `We sent a 6-digit code to ${email}`}
            </p>
          </div>

          {/* Error / Success Callout Banners */}
          {errorMsg && (
            <div className="xlr-auth-msg-banner xlr-auth-msg--error">
              {errorMsg}
            </div>
          )}

          {successMsg && !errorMsg && (
            <div className="xlr-auth-msg-banner xlr-auth-msg--success">
              {successMsg}
            </div>
          )}

          {step === "email" ? (
            /* STEP 1: EMAIL INPUT FORM */
            <div className="xlr-auth-form-container">
              {/* Google Auth Button */}
              <button type="button" className="xlr-auth-google-btn" onClick={handleGoogleClick}>
                <FcGoogle size={20} />
                <span>Continue with Google</span>
              </button>

              <div className="xlr-auth-divider">
                <span>or</span>
              </div>

              <form onSubmit={handleSendOtp} className="xlr-auth-form">
                <div className="xlr-auth-input-group">
                  <input
                    type="email"
                    required
                    className="xlr-auth-input"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                  />
                </div>

                <button type="submit" className="xlr-auth-primary-btn" disabled={isLoading}>
                  <span>{isLoading ? "Sending OTP..." : "Continue with email"}</span>
                  <RiArrowRightLine size={18} />
                </button>
              </form>
            </div>
          ) : (
            /* STEP 2: OTP VERIFICATION FORM */
            <div className="xlr-auth-form-container">
              <form onSubmit={handleVerifyOtp} className="xlr-auth-form">
                <div className="xlr-auth-otp-grid">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpInputsRef.current[idx] = el)}
                      type="text"
                      maxLength={1}
                      className="xlr-auth-otp-box"
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      autoFocus={idx === 0}
                    />
                  ))}
                </div>

                <div className="xlr-auth-timer-row">
                  {canResend ? (
                    <button type="button" className="xlr-auth-resend-btn" onClick={handleResendOtp}>
                      Resend OTP Code
                    </button>
                  ) : (
                    <span className="xlr-auth-timer-text">Resend code in {timer}s</span>
                  )}
                  <button type="button" className="xlr-auth-change-email" onClick={() => setStep("email")}>
                    Change Email
                  </button>
                </div>

                <button type="submit" className="xlr-auth-primary-btn" disabled={isLoading}>
                  <span>{isLoading ? "Verifying..." : "Verify & Continue"}</span>
                  <RiArrowRightLine size={18} />
                </button>
              </form>
            </div>
          )}

          {/* Footer Terms & Disclaimers matching screenshot */}
          <div className="xlr-auth-footer-disclaimer">
            <p>By continuing you agree to our Terms & Privacy Policy</p>
            <p>By signing in you agree to our <a href="#terms">Terms</a> & <a href="#privacy">Privacy Policy</a></p>
          </div>
        </div>

        {/* Right Side: Hero Canvas Showcase matching screenshot */}
        <div className="xlr-auth-right-panel">
          <div className="xlr-auth-hero-canvas">
            <h1 className="xlr-auth-hero-title">
              One Platform to Master<br />
              Software Engineering Interviews ..
            </h1>
            <span className="xlr-auth-hero-tag">BUILT BY ENGINEER, FOR ENGINEERS</span>
            <span className="xlr-auth-hero-footer">Made with love by Gagan Jangid 🇮🇳</span>
          </div>
        </div>
      </div>
    </div>
  );
}
