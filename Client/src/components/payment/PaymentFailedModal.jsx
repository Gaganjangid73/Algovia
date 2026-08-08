import React from "react";
import { RiErrorWarningLine, RiRefreshLine, RiShieldCheckLine } from "react-icons/ri";
import "./PaymentFailedModal.css";

/**
 * Aesthetic Modern Payment Failed Modal Component for Algovia.io
 */
export default function PaymentFailedModal({
  isOpen,
  onClose,
  errorMessage = "Transaction could not be completed at this time.",
  onRetry
}) {
  if (!isOpen) return null;

  return (
    <div className="algovia-failed-overlay" onClick={onClose}>
      <div className="algovia-failed-card" onClick={(e) => e.stopPropagation()}>
        <div className="algovia-failed-glow" />

        {/* Pulsing Error Icon Ring */}
        <div className="algovia-failed-icon-wrapper">
          <RiErrorWarningLine />
        </div>

        {/* Heading */}
        <h2 className="algovia-failed-title">Payment Unsuccessful</h2>
        <p className="algovia-failed-subtitle">
          We couldn't process your transaction. Don't worry, no funds were debited.
        </p>

        {/* Failure Reason Info Box */}
        <div className="algovia-failed-info-box">
          <div className="algovia-failed-info-row">
            <span>Failure Reason</span>
            <span className="algovia-failed-reason-text">{errorMessage}</span>
          </div>
          <div className="algovia-failed-info-row" style={{ marginTop: "6px" }}>
            <span>Account Balance</span>
            <span className="algovia-safe-note">
              <RiShieldCheckLine /> 0 Funds Debited
            </span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="algovia-failed-actions">
          <button
            type="button"
            className="algovia-retry-action-btn"
            onClick={() => {
              if (onClose) onClose();
              if (onRetry) onRetry();
            }}
          >
            <RiRefreshLine size={18} />
            <span>Retry Payment</span>
          </button>

          <button type="button" className="algovia-dismiss-btn" onClick={onClose}>
            Cancel & Return
          </button>
        </div>
      </div>
    </div>
  );
}
