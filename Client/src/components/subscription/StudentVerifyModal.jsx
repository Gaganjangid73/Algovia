import React, { useState } from "react";
import { RiGraduationCapLine, RiCloseLine, RiMailSendLine, RiShieldCheckLine } from "react-icons/ri";
import { authApi } from "../../services/authApi";
import "./StudentVerifyModal.css";

/**
 * Student Status Verification Modal Component for Algovia.io
 * Supports .edu, .ac.in, .ernet.in, .edu.in, .res.in, .org, .org.in college emails
 */
export default function StudentVerifyModal({
  isOpen,
  onClose,
  onVerificationSuccess
}) {
  const [step, setStep] = useState(1); // 1 = Enter Email, 2 = Enter OTP
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  if (!isOpen) return null;

  // Step 1: Send OTP to College Email
  const handleSendCode = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!email.trim()) {
      setErrorMessage("Please enter your college email address.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await authApi.sendStudentOtp({ email: email.trim() });
      setSuccessMessage(res.message || "6-digit OTP sent to your college email.");
      setStep(2);
    } catch (err) {
      console.error("[StudentVerifyModal] Send Code Error:", err);
      setErrorMessage(err.message || "Failed to send verification code. Please check email domain.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify Submitted OTP Code
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!otpCode.trim() || otpCode.trim().length !== 6) {
      setErrorMessage("Please enter the 6-digit OTP code sent to your email.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await authApi.verifyStudentOtp({
        email: email.trim(),
        otpCode: otpCode.trim()
      });

      if (res.success) {
        if (onVerificationSuccess) {
          onVerificationSuccess(res.studentEmail || email.trim());
        }
        onClose();
      } else {
        throw new Error(res.message || "Invalid OTP code.");
      }
    } catch (err) {
      console.error("[StudentVerifyModal] Verify Code Error:", err);
      setErrorMessage(err.message || "Invalid or expired verification code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setEmail("");
    setOtpCode("");
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div className="algovia-student-overlay" onClick={onClose}>
      <div className="algovia-student-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button type="button" className="algovia-student-close-btn" onClick={onClose}>
          <RiCloseLine size={20} />
        </button>

        {/* Modal Header */}
        <div className="algovia-student-header-box">
          <div className="algovia-student-icon-ring">
            <RiGraduationCapLine />
          </div>
          <h3 className="algovia-student-title">Verify Student Status</h3>
          <p className="algovia-student-subtitle">
            {step === 1
              ? "Enter your official college or institution email address (.ac.in, .edu, .org) to unlock student pricing."
              : `Enter the 6-digit verification code sent to ${email}.`}
          </p>
        </div>

        {/* Error Banner */}
        {errorMessage && (
          <div className="algovia-student-error">
            {errorMessage}
          </div>
        )}

        {/* Step 1 Form: Email Input */}
        {step === 1 && (
          <form className="algovia-student-form" onSubmit={handleSendCode}>
            <div className="algovia-student-field">
              <label className="algovia-student-label">College Email Address</label>
              <input
                type="email"
                className="algovia-student-input"
                placeholder="yourname@college.ac.in or .edu / .org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                required
              />
            </div>

            <button
              type="submit"
              className="algovia-student-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? "Sending Code..." : "Send Verification Code"}
            </button>
          </form>
        )}

        {/* Step 2 Form: OTP Code Verification */}
        {step === 2 && (
          <form className="algovia-student-form" onSubmit={handleVerifyCode}>
            <div className="algovia-student-field">
              <label className="algovia-student-label">6-Digit Verification Code</label>
              <input
                type="text"
                maxLength={6}
                className="algovia-student-input algovia-student-otp-input"
                placeholder="123456"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                autoFocus
                required
              />
            </div>

            <button
              type="submit"
              className="algovia-student-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify Code & Unlock Student Pricing"}
            </button>

            <div style={{ textAlign: "center", marginTop: "4px" }}>
              <button
                type="button"
                className="algovia-student-resend-btn"
                onClick={handleSendCode}
                disabled={isLoading}
              >
                Didn't receive code? Resend OTP
              </button>
              <span style={{ color: "#64748b", margin: "0 6px" }}>•</span>
              <button
                type="button"
                className="algovia-student-resend-btn"
                onClick={handleReset}
                disabled={isLoading}
              >
                Change Email
              </button>
            </div>
          </form>
        )}

        {/* Fallback Notice */}
        <div className="algovia-student-fallback-box">
          Don't have an .ac.in, .edu, or .org email? Contact us at <strong>support@algovia.io</strong> with your college ID card for manual student status verification.
        </div>
      </div>
    </div>
  );
}
