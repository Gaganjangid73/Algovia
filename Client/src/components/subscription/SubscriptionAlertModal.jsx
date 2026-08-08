import React from "react";
import { RiLockLine, RiInformationLine, RiErrorWarningLine } from "react-icons/ri";
import "./SubscriptionAlertModal.css";

/**
 * Subscription Protection Rules Alert Modal Component for Algovia.io
 */
export default function SubscriptionAlertModal({
  isOpen,
  onClose,
  code = "DOWNGRADE_NOT_ALLOWED",
  message,
  daysRemaining = 0
}) {
  if (!isOpen) return null;

  const isDowngrade = code === "DOWNGRADE_NOT_ALLOWED";
  const title = isDowngrade ? "Plan Downgrade Restricted" : "Active Subscription Exists";
  const defaultMsg = isDowngrade
    ? "You currently have an active higher-tier plan. Downgrading to a lower-tier plan is restricted until your current plan expires."
    : `You already have an active subscription to this plan. Renewal is allowed starting 7 days before expiry (${daysRemaining} days remaining).`;

  return (
    <div className="algovia-alert-overlay" onClick={onClose}>
      <div className="algovia-alert-card" onClick={(e) => e.stopPropagation()}>
        <div className="algovia-alert-icon-wrapper">
          <RiErrorWarningLine />
        </div>

        <h3 className="algovia-alert-title">{title}</h3>
        <p className="algovia-alert-message">{message || defaultMsg}</p>

        {daysRemaining > 0 && (
          <div className="algovia-alert-info-box">
            <span style={{ color: "#94a3b8" }}>Current Plan Active</span>
            <span style={{ fontWeight: "700", color: "#f59e0b" }}>{daysRemaining} Days Left</span>
          </div>
        )}

        <button type="button" className="algovia-alert-btn" onClick={onClose}>
          Understood
        </button>
      </div>
    </div>
  );
}
