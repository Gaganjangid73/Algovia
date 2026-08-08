import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiCloseLine, RiCodeSSlashLine } from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";
import AlgoviaLogo from "../../assets/Algovia.png";
import "./UserProfileModal.css";

export default function UserProfileModal() {
  const navigate = useNavigate();
  const {
    user,
    isProfileModalOpen,
    closeProfileModal,
    preferredLanguage,
    setPreferredLanguage
  } = useAuth();

  const [avatarError, setAvatarError] = useState(false);

  useEffect(() => {
    setAvatarError(false);
  }, [user?.avatar]);

  if (!isProfileModalOpen) return null;

  const handleBecomeMember = () => {
    closeProfileModal();
    navigate("/payment/checkout");
  };

  const userName = user?.name || "User";
  const userEmail = user?.email || "";
  const userInitial = (userName !== "User" ? userName : userEmail || "U").trim().charAt(0).toUpperCase();

  const isSubscribed = Boolean(
    user?.isSubscribed ||
    user?.is_subscribed ||
    (user?.plan && user.plan.toLowerCase() !== "free plan" && user.plan.toLowerCase() !== "free")
  );

  const activePlanName = isSubscribed
    ? user?.plan || "Full Access"
    : "Free Plan";

  const billingCycleLabel = (
    user?.subscriptionBilling ||
    user?.subscription_billing ||
    (user?.subscriptionPlan?.toLowerCase().includes("yearly") ? "yearly" : "monthly")
  ).toUpperCase();

  const formatDate = (dateInput, fallback = "Aug 8, 2026") => {
    if (!dateInput) return fallback;
    try {
      const d = new Date(dateInput);
      if (isNaN(d.getTime())) return fallback;
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return fallback;
    }
  };

  const memberSinceDate = formatDate(user?.createdAt || user?.created_at, "Jun 29, 2026");
  const expiresDate = formatDate(
    user?.subscriptionExpiresAt || user?.subscription_expires_at,
    isSubscribed ? "Aug 8, 2027" : null
  );

  return (
    <div className="xlr-upm-overlay" onClick={closeProfileModal}>
      <div className="xlr-upm-card" onClick={(e) => e.stopPropagation()}>
        {/* Top Header Bar */}
        <header className="xlr-upm-header">
          <div className="xlr-upm-header-left">
            <div className="xlr-upm-logo-box">
              <img src={AlgoviaLogo} alt="Algovia" className="xlr-upm-logo-img" onError={(e) => {
                e.target.style.display = "none";
              }} />
              <span className="xlr-upm-logo-text">Algovia</span>
            </div>
            <div className="xlr-upm-header-divider" />
            <div className="xlr-upm-user-badge">
              {user?.avatar && !avatarError ? (
                <img
                  src={user.avatar}
                  alt={userName}
                  className="xlr-upm-avatar"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <div className="xlr-upm-avatar-initial">
                  {userInitial}
                </div>
              )}
              <div className="xlr-upm-user-meta">
                <span className="xlr-upm-user-name">{userName}</span>
                <span className="xlr-upm-user-email">{userEmail}</span>
              </div>
            </div>
          </div>

          <button type="button" className="xlr-upm-close-btn" onClick={closeProfileModal} title="Close Profile">
            <RiCloseLine size={18} />
          </button>
        </header>

        {/* 3-Column Content Grid matching reference screenshot */}
        <div className="xlr-upm-body">
          {/* COLUMN 1: ACCOUNT */}
          <div className="xlr-upm-col">
            <h5 className="xlr-upm-col-title">ACCOUNT</h5>

            {/* Account Details Box */}
            <div className="xlr-upm-box">
              <div className="xlr-upm-row">
                <span className="xlr-upm-label">Name</span>
                <span className="xlr-upm-value xlr-upm-value--bold">{userName}</span>
              </div>
              <div className="xlr-upm-row">
                <span className="xlr-upm-label">Email</span>
                <span className="xlr-upm-value xlr-upm-value--bold">{userEmail}</span>
              </div>
              <div className="xlr-upm-row">
                <span className="xlr-upm-label">Plan</span>
                <span className={`xlr-upm-value xlr-upm-value--bold ${isSubscribed ? "xlr-upm-plan-tag" : ""}`}>
                  {activePlanName}
                </span>
              </div>
              <div className="xlr-upm-row">
                <span className="xlr-upm-label">Member since</span>
                <span className="xlr-upm-value xlr-upm-value--bold">{memberSinceDate}</span>
              </div>
            </div>

            {/* Preferred Language Selector Box */}
            <div className="xlr-upm-box xlr-upm-box--lang">
              <h6 className="xlr-upm-lang-heading">Preferred Programming Language</h6>
              <p className="xlr-upm-lang-sub">
                Select the language you'd like code snippets shown in across the platform. You can change it anytime.
              </p>
              <div className="xlr-upm-lang-pills">
                <button
                  type="button"
                  className={`xlr-upm-pill ${preferredLanguage === "java" ? "xlr-upm-pill--active" : ""}`}
                  onClick={() => setPreferredLanguage("java")}
                >
                  <span className="xlr-pill-icon">☕</span>
                  <span>Java</span>
                </button>

                <button
                  type="button"
                  className={`xlr-upm-pill ${preferredLanguage === "cpp" ? "xlr-upm-pill--active" : ""}`}
                  onClick={() => setPreferredLanguage("cpp")}
                >
                  <span className="xlr-pill-icon">⚙️</span>
                  <span>C++</span>
                </button>

                <button
                  type="button"
                  className={`xlr-upm-pill ${preferredLanguage === "python" ? "xlr-upm-pill--active" : ""}`}
                  onClick={() => setPreferredLanguage("python")}
                >
                  <span className="xlr-pill-icon">🐍</span>
                  <span>Python</span>
                </button>
              </div>
            </div>

            {/* Become a Member / Manage Plan CTA */}
            <button type="button" className="xlr-upm-cta-btn" onClick={handleBecomeMember}>
              {isSubscribed ? "Manage / Upgrade Plan" : "Become a Member"}
            </button>
          </div>

          {/* COLUMN 2: BILLING */}
          <div className="xlr-upm-col xlr-upm-col--billing">
            <h5 className="xlr-upm-col-title">BILLING</h5>
            {isSubscribed ? (
              <div className="xlr-upm-box">
                <div className="xlr-upm-row">
                  <span className="xlr-upm-label">Status</span>
                  <span className="xlr-upm-status-badge">Active</span>
                </div>
                <div className="xlr-upm-row">
                  <span className="xlr-upm-label">Plan Access</span>
                  <span className="xlr-upm-value xlr-upm-value--bold">{activePlanName}</span>
                </div>
                <div className="xlr-upm-row">
                  <span className="xlr-upm-label">Billing Cycle</span>
                  <span className="xlr-upm-value xlr-upm-value--bold">{billingCycleLabel}</span>
                </div>
                <div className="xlr-upm-row">
                  <span className="xlr-upm-label">Expires / Renews</span>
                  <span className="xlr-upm-value xlr-upm-value--bold">{expiresDate}</span>
                </div>
              </div>
            ) : (
              <p className="xlr-upm-billing-text">
                Get full access to all premium content and topics. Become a member to unlock everything.
              </p>
            )}
          </div>

          {/* COLUMN 3: PAYMENT & ACTIONS */}
          <div className="xlr-upm-col xlr-upm-col--payment">
            <h5 className="xlr-upm-col-title">PAYMENT & ACTIONS</h5>

            {/* Payment Info Box */}
            <div className="xlr-upm-box">
              <div className="xlr-upm-row">
                <span className="xlr-upm-label">Gateway</span>
                <span className="xlr-upm-value xlr-upm-value--bold">Razorpay · Secure</span>
              </div>
              <div className="xlr-upm-row">
                <span className="xlr-upm-label">Currency</span>
                <span className="xlr-upm-value xlr-upm-value--bold">INR (₹)</span>
              </div>
              <div className="xlr-upm-row">
                <span className="xlr-upm-label">Tax / GST</span>
                <span className="xlr-upm-value xlr-upm-value--bold">Included in price</span>
              </div>
              <div className="xlr-upm-row">
                <span className="xlr-upm-label">Source</span>
                <span className="xlr-upm-value xlr-upm-value--bold">Web</span>
              </div>
            </div>

            <div className="xlr-upm-footnote">
              Issues? <span>gaganjangid11@zohomail.in</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
