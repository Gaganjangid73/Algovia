import React from "react";
import { RiCheckLine, RiLockUnlockLine, RiArrowRightLine } from "react-icons/ri";
import "./PaymentSuccessModal.css";

/**
 * Aesthetic Modern Payment Success Modal Component for Algovia.io
 */
export default function PaymentSuccessModal({
  isOpen,
  onClose,
  planName = "Full Access",
  onStartExploring
}) {
  if (!isOpen) return null;

  const handleAction = () => {
    if (onClose) onClose();
    if (onStartExploring) {
      onStartExploring();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="algovia-success-overlay" onClick={onClose}>
      <div className="algovia-success-card" onClick={(e) => e.stopPropagation()}>
        <div className="algovia-success-glow" />

        {/* Animated Icon Ring */}
        <div className="algovia-success-icon-wrapper">
          <RiCheckLine />
        </div>

        {/* Heading */}
        <h2 className="algovia-success-title">Payment Successful! 🎉</h2>
        <p className="algovia-success-subtitle">
          Welcome to <strong>Algovia.io {planName}</strong>. Your subscription is active and all course content has been unlocked.
        </p>

        {/* Plan Details Summary */}
        <div className="algovia-success-plan-box">
          <div className="algovia-success-plan-row">
            <span>Activated Tier</span>
            <span className="algovia-success-plan-val">{planName}</span>
          </div>
          <div className="algovia-success-plan-row">
            <span>Access Status</span>
            <span className="algovia-unlocked-badge">
              <RiLockUnlockLine /> 100% Unlocked
            </span>
          </div>
          <div className="algovia-success-plan-row">
            <span>Payment Security</span>
            <span className="algovia-success-plan-val">Razorpay Verified ✓</span>
          </div>
        </div>

        {/* CTA Button */}
        <button type="button" className="algovia-success-action-btn" onClick={handleAction}>
          <span>Start Exploring...</span>
          <RiArrowRightLine size={18} />
        </button>
      </div>
    </div>
  );
}
