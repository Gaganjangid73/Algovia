import React, { useState, useEffect } from "react";
import { 
  RiCloseLine, 
  RiCheckLine, 
  RiRocketLine, 
  RiArrowRightLine, 
  RiErrorWarningLine,
  RiDiscountPercentLine
} from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";
import { authApi, USER_STORAGE_KEY } from "../../services/authApi";
import { loadRazorpayScript } from "../../utils/loadRazorpay";
import "./UpgradePlanModal.css";

/**
 * Prorated Subscription Upgrade Modal Component (Algovia.io)
 * Dynamically fetches pro-rata quote calculations, generates server-side prorated order, and upgrades user tier.
 */
export default function UpgradePlanModal({
  isOpen,
  onClose,
  newPlanId = "FULL_YEARLY",
  onUpgradeSuccess
}) {
  const { user, isAuthenticated, openAuthModal } = useAuth();

  const [quote, setQuote] = useState(null);
  const [loadingQuote, setLoadingQuote] = useState(true);
  const [statusState, setStatusState] = useState("idle"); // 'idle' | 'processing' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch prorated upgrade calculation from backend (/api/subscription/upgrade-quote)
  useEffect(() => {
    if (isOpen && isAuthenticated) {
      setLoadingQuote(true);
      setStatusState("idle");
      setErrorMessage("");

      authApi
        .getUpgradeQuote({ newPlanId, currency: "INR" })
        .then((data) => {
          setQuote(data);
        })
        .catch((err) => {
          console.error("[UpgradeModal] Failed to fetch quote:", err);
          setErrorMessage(err.message || "Failed to load upgrade quote.");
        })
        .finally(() => {
          setLoadingQuote(false);
        });
    }
  }, [isOpen, isAuthenticated, newPlanId]);

  if (!isOpen) return null;

  const symbol = quote?.currency === "USD" ? "$" : "₹";

  // Handle Pay & Upgrade Action
  const handleUpgradeNow = async () => {
    if (!isAuthenticated || !user) {
      if (onClose) onClose();
      openAuthModal("/payment/checkout");
      return;
    }

    setStatusState("processing");
    setErrorMessage("");

    try {
      // 1. Dynamically Load Official Razorpay SDK
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load Razorpay SDK. Please check your internet connection.");
      }

      // 2. Request Server-side Prorated Order Creation (/api/subscription/create-upgrade-order)
      const orderRes = await authApi.createUpgradeOrder({
        newPlanId,
        currency: quote?.currency || "INR"
      });

      const { orderId, amount: amountInPaise, key, keyId } = orderRes;

      const activeRazorpayKey = key || keyId || import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_TNF6FuY1OIb3GW";

      // 3. Configure Razorpay Popup Modal
      const options = {
        key: activeRazorpayKey,
        amount: amountInPaise,
        currency: (quote?.currency || "INR").toUpperCase(),
        name: "Algovia.io",
        description: `Prorated Upgrade to ${quote?.newPlan?.name || "Full Access"}`,
        image: "/assets/Algovia.png",
        order_id: orderId.includes("mock") ? undefined : orderId,

        // 4. Handle Verification Call (/api/subscription/verify-upgrade-payment)
        handler: async function (response) {
          try {
            setStatusState("processing");

            const verifyPayload = {
              razorpay_order_id: response.razorpay_order_id || orderId,
              razorpay_payment_id: response.razorpay_payment_id || `pay_upg_mock_${Date.now()}`,
              razorpay_signature: response.razorpay_signature || "verified_upgrade_sig",
              newPlanId
            };

            const verifyRes = await authApi.verifyUpgradePayment(verifyPayload);

            if (verifyRes.success) {
              const updatedUser = {
                ...user,
                ...verifyRes.user,
                isSubscribed: true,
                plan: "Full Access"
              };
              localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
              localStorage.setItem("algovia_subscribed", "true");

              setStatusState("success");
              if (onUpgradeSuccess) onUpgradeSuccess(updatedUser);
            } else {
              throw new Error(verifyRes.message || "Upgrade verification failed.");
            }
          } catch (err) {
            console.error("[UpgradeModal] Verification Error:", err);
            setStatusState("error");
            setErrorMessage(err.message || "Payment verification failed.");
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || ""
        },
        theme: {
          color: "#2563eb"
        },
        modal: {
          ondismiss: function () {
            setStatusState("idle");
          }
        }
      };

      // 5. Handle Mock Simulation vs Live Razorpay Popup
      if (orderId.includes("mock") || !window.Razorpay) {
        const confirmMock = window.confirm(
          `[Algovia Prorated Upgrade]\nConfirm upgrade payment of ${symbol}${quote?.finalPayableAmount} (Unused Credit Deducted: -${symbol}${quote?.unusedCredit})?\n\nClick OK to verify and unlock Full Access immediately!`
        );

        if (confirmMock) {
          options.handler({
            razorpay_order_id: orderId,
            razorpay_payment_id: `pay_upg_test_${Date.now()}`,
            razorpay_signature: "mock_upgrade_signature_valid"
          });
        } else {
          setStatusState("idle");
        }
      } else {
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (failResp) {
          setStatusState("error");
          setErrorMessage(failResp.error.description || "Upgrade payment failed.");
        });
        rzp.open();
      }
    } catch (err) {
      console.error("[UpgradeModal] Order Error:", err);
      setStatusState("error");
      setErrorMessage(err.message || "Failed to initialize upgrade order.");
    }
  };

  return (
    <div className="algovia-upgrade-overlay" onClick={onClose}>
      <div className="algovia-upgrade-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="algovia-upgrade-header">
          <h3 className="algovia-upgrade-title">
            <RiRocketLine color="#3b82f6" />
            <span>Prorated Subscription Upgrade</span>
          </h3>
          <button type="button" className="algovia-upgrade-close-btn" onClick={onClose}>
            <RiCloseLine size={20} />
          </button>
        </div>

        {/* Loading Quote State */}
        {loadingQuote ? (
          <div className="algovia-upgrade-loading">
            <div className="algovia-upgrade-spinner" />
            <span style={{ fontSize: "14px", color: "#64748b" }}>Calculating day-wise pro-rata credit...</span>
          </div>
        ) : statusState === "success" ? (
          /* SUCCESS SCREEN */
          <div className="algovia-upgrade-body" style={{ textAlign: "center", padding: "36px 24px" }}>
            <div className="algovia-status-icon algovia-status-icon--success" style={{ margin: "0 auto" }}>
              <RiCheckLine />
            </div>
            <h3 style={{ fontSize: "20px", fontWeight: "800", margin: "16px 0 8px 0" }}>
              Upgrade Complete! 🎉
            </h3>
            <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 20px 0" }}>
              You are now subscribed to <strong>{quote?.newPlan?.name || "Algovia.io Full Access"}</strong>. All premium courses and system design scenarios are 100% unlocked!
            </p>
            <button
              type="button"
              className="algovia-upgrade-btn"
              onClick={() => {
                onClose();
                window.location.reload();
              }}
            >
              Start Learning Now
            </button>
          </div>
        ) : statusState === "error" ? (
          /* ERROR SCREEN */
          <div className="algovia-upgrade-body" style={{ textAlign: "center", padding: "36px 24px" }}>
            <div className="algovia-status-icon algovia-status-icon--error" style={{ margin: "0 auto" }}>
              <RiErrorWarningLine />
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: "800", margin: "16px 0 8px 0" }}>
              Upgrade Failed
            </h3>
            <p style={{ fontSize: "14px", color: "#ef4444", margin: "0 0 20px 0" }}>{errorMessage}</p>
            <button type="button" className="algovia-retry-btn" onClick={handleUpgradeNow}>
              Retry Upgrade
            </button>
          </div>
        ) : (
          /* PRO-RATA CALCULATION FORM */
          <div className="algovia-upgrade-body">
            
            {/* Current Active Plan Banner */}
            <div className="algovia-current-sub-banner">
              <div className="algovia-current-sub-info">
                <span className="algovia-current-sub-label">Current Active Plan</span>
                <span className="algovia-current-sub-name">{quote?.currentPlan?.name || "Basic Plan"}</span>
              </div>
              <span className="algovia-days-badge">
                {quote?.remainingDays || 0} Days Left
              </span>
            </div>

            {/* Day-Wise Pro-Rata Math Breakdown Table */}
            <div className="algovia-prorated-box">
              <div className="algovia-prorated-row">
                <span>Target Plan ({quote?.newPlan?.name})</span>
                <span style={{ fontWeight: "700" }}>{symbol}{quote?.newPlan?.price}</span>
              </div>

              <div className="algovia-prorated-row algovia-prorated-row--credit">
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <RiDiscountPercentLine />
                  <span>Unused Days Credit ({quote?.remainingDays} days deducted)</span>
                </div>
                <span>-{symbol}{quote?.unusedCredit}</span>
              </div>

              <div className="algovia-prorated-row algovia-prorated-row--total">
                <span>Final Net Amount Payable</span>
                <span className="algovia-prorated-amount">{symbol}{quote?.finalPayableAmount}</span>
              </div>
            </div>

            {/* Upgrade Action CTA */}
            <button
              type="button"
              className="algovia-upgrade-btn"
              onClick={handleUpgradeNow}
              disabled={statusState === "processing"}
            >
              {statusState === "processing" ? (
                <>
                  <div className="algovia-upgrade-spinner" style={{ borderTopColor: "#ffffff" }} />
                  <span>Upgrading Subscription...</span>
                </>
              ) : (
                <>
                  <span>Pay & Upgrade Now ({symbol}{quote?.finalPayableAmount})</span>
                  <RiArrowRightLine />
                </>
              )}
            </button>

            <p className="algovia-upgrade-footnote">
              🔒 Immediate activation • Pro-rata credit applied • Powered by Razorpay
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
