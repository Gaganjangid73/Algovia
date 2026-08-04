import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  RiArrowLeftLine, 
  RiCheckLine, 
  RiHeartLine, 
  RiQuestionLine,
  RiGroupLine,
  RiUser3Line,
  RiSubtractLine,
  RiAddLine
} from "react-icons/ri";
import { 
  FaInstagram, 
  FaXTwitter, 
  FaMedium, 
  FaLinkedin 
} from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";
import "./CheckoutPage.css";

/**
 * Checkout / Payment Page for Algovia.io
 * Matches exact split-screen reference screenshots (Left dark order summary + Right plan details & contact info).
 */
const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, openAuthModal } = useAuth();

  // Selected State Options
  const [currency, setCurrency] = useState("INR"); // "INR" | "USD"
  const [billingCycle, setBillingCycle] = useState("monthly"); // "monthly" | "yearly" | "student" | "team"
  const [planType, setPlanType] = useState("full"); // "full" | "basic"
  const [teamSeats, setTeamSeats] = useState(5); // Minimum 2

  // User Data
  const userName = user?.name || "";
  const userEmail = user?.email || "";

  // Dynamic Price Calculations
  const isINR = currency === "INR";
  const symbol = isINR ? "₹" : "$";

  let unitPrice = 0;
  let originalPrice = 0;
  let periodLabel = "/month";
  let subtotalText = "";
  let totalText = "";

  if (billingCycle === "team") {
    const seatPrice = isINR ? 299 : 5;
    unitPrice = seatPrice * teamSeats;
    periodLabel = "/mo";
    subtotalText = `${symbol}${unitPrice.toLocaleString()}`;
    totalText = `${symbol}${unitPrice.toLocaleString()}`;
  } else if (billingCycle === "yearly") {
    periodLabel = "/year";
    if (planType === "full") {
      unitPrice = isINR ? 3999 : 69;
      originalPrice = isINR ? 5988 : 108;
    } else {
      unitPrice = isINR ? 2499 : 39;
      originalPrice = isINR ? 3588 : 60;
    }
    subtotalText = `${symbol}${unitPrice.toLocaleString()}`;
    totalText = `${symbol}${unitPrice.toLocaleString()}`;
  } else if (billingCycle === "student") {
    periodLabel = "/month";
    if (planType === "full") {
      unitPrice = isINR ? 299 : 5;
      originalPrice = isINR ? 499 : 9;
    } else {
      unitPrice = isINR ? 179 : 3;
      originalPrice = isINR ? 299 : 5;
    }
    subtotalText = `${symbol}${unitPrice.toLocaleString()}`;
    totalText = `${symbol}${unitPrice.toLocaleString()}`;
  } else {
    // Monthly
    periodLabel = "/month";
    if (planType === "full") {
      unitPrice = isINR ? 499 : 9;
      originalPrice = isINR ? 999 : 18;
    } else {
      unitPrice = isINR ? 299 : 5;
      originalPrice = isINR ? 599 : 10;
    }
    subtotalText = `${symbol}${unitPrice.toLocaleString()}`;
    totalText = `${symbol}${unitPrice.toLocaleString()}`;
  }

  // Handle Team seats change
  const incrementSeats = () => setTeamSeats((prev) => Math.min(100, prev + 1));
  const decrementSeats = () => setTeamSeats((prev) => Math.max(2, prev - 1));

  // Payment Handler (Placeholder integration for Razorpay)
  const handleSubscribe = () => {
    if (!isAuthenticated || !user) {
      openAuthModal("/payment/checkout");
      return;
    }
    alert(`Initiating Razorpay Checkout for ${totalText} (${billingCycle} - ${planType === "full" ? "Full Access" : "Basic Plan"})...`);
  };

  return (
    <div className="chk-wrapper">
      {/* ========================================================================= */}
      {/* LEFT COLUMN: Order Summary & Sidebar Controls (Dark Black Theme)         */}
      {/* ========================================================================= */}
      <aside className="chk-sidebar">
        {/* Back Link */}
        <Link to="/" className="chk-back-btn">
          <RiArrowLeftLine size={16} />
          <span>Algovia.io</span>
        </Link>

        {/* Subscribe Header & Price */}
        <div className="chk-sidebar-header">
          <span className="chk-sidebar-subtitle">Subscribe to Algovia.io</span>
          <div className="chk-sidebar-price-row">
            <span className="chk-sidebar-amount">{symbol}{unitPrice.toLocaleString()}</span>
            <span className="chk-sidebar-period">per {billingCycle === "yearly" ? "year" : "month"}</span>
          </div>
          {billingCycle === "yearly" && (
            <p className="chk-sidebar-note">
              That's just {symbol}{isINR ? (planType === "full" ? "333.25" : "208.25") : (planType === "full" ? "5.75" : "3.25")}/month, billed yearly
            </p>
          )}
        </div>

        {/* Currency Selector (INR vs USD) */}
        <div className="chk-currency-toggle">
          <button
            type="button"
            className={`chk-currency-btn ${isINR ? "chk-currency-btn--active" : ""}`}
            onClick={() => setCurrency("INR")}
          >
            <span className="chk-flag">🇮🇳</span> INR
          </button>
          <button
            type="button"
            className={`chk-currency-btn ${!isINR ? "chk-currency-btn--active" : ""}`}
            onClick={() => setCurrency("USD")}
          >
            <span className="chk-flag">🇺🇸</span> USD
          </button>
        </div>

        {/* Billing Cycle Tab Controls */}
        <div className="chk-tabs-container">
          <button
            type="button"
            className={`chk-tab-btn ${billingCycle === "monthly" ? "chk-tab-btn--active" : ""}`}
            onClick={() => setBillingCycle("monthly")}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`chk-tab-btn ${billingCycle === "yearly" ? "chk-tab-btn--active" : ""}`}
            onClick={() => setBillingCycle("yearly")}
          >
            Yearly <span className="chk-badge-green">33%</span>
          </button>
          <button
            type="button"
            className={`chk-tab-btn ${billingCycle === "student" ? "chk-tab-btn--active" : ""}`}
            onClick={() => setBillingCycle("student")}
          >
            Student <span className="chk-badge-green">40%</span>
          </button>
          <button
            type="button"
            className={`chk-tab-btn ${billingCycle === "team" ? "chk-tab-btn--active" : ""}`}
            onClick={() => setBillingCycle("team")}
          >
            Group | Team | Friends
          </button>
        </div>

        {/* Radio Cards Plan Selector (Only when not in Team Mode) */}
        {billingCycle !== "team" && (
          <div className="chk-plan-radios">
            <div
              className={`chk-radio-card ${planType === "full" ? "chk-radio-card--selected" : ""}`}
              onClick={() => setPlanType("full")}
            >
              <div className="chk-radio-content">
                <span className="chk-radio-title">Algovia.io Full Access</span>
                <span className="chk-radio-sub">Complete access to everything</span>
              </div>
              <div className="chk-radio-dot-wrapper">
                <div className="chk-radio-outer-dot">
                  {planType === "full" && <div className="chk-radio-inner-dot" />}
                </div>
              </div>
            </div>

            <div
              className={`chk-radio-card ${planType === "basic" ? "chk-radio-card--selected" : ""}`}
              onClick={() => setPlanType("basic")}
            >
              <div className="chk-radio-content">
                <span className="chk-radio-title">Algovia.io Basic Plan</span>
                <span className="chk-radio-sub">Core DSA, LLD & HLD access</span>
              </div>
              <div className="chk-radio-dot-wrapper">
                <div className="chk-radio-outer-dot">
                  {planType === "basic" && <div className="chk-radio-inner-dot" />}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Subtotal & Tax Breakdown */}
        <div className="chk-sidebar-breakdown">
          <div className="chk-breakdown-row">
            <span>Subtotal</span>
            <span>{subtotalText}</span>
          </div>
          <div className="chk-breakdown-row">
            <span>Tax</span>
            <span>Incl. GST</span>
          </div>
          <div className="chk-breakdown-divider" />
          <div className="chk-breakdown-row chk-breakdown-total">
            <span>Total, due today</span>
            <span>{totalText}</span>
          </div>
        </div>

        <p className="chk-sidebar-footer-info">
          Inclusive of GST • GST invoice available on request
        </p>
      </aside>

      {/* ========================================================================= */}
      {/* RIGHT COLUMN: Contact Info, Feature List & FAQs (Light/Dark Container)   */}
      {/* ========================================================================= */}
      <main className="chk-main-content">
        <div className="chk-main-inner">

          {/* 1. Contact Information Section */}
          <section className="chk-section">
            <h4 className="chk-section-title">Contact information</h4>
            {isAuthenticated && user ? (
              <div className="chk-contact-inputs-box">
                <div className="chk-input-row">
                  <label>Name</label>
                  <input type="text" value={userName} readOnly />
                </div>
                <div className="chk-input-row">
                  <label>Email</label>
                  <input type="email" value={userEmail} readOnly />
                </div>
              </div>
            ) : (
              <div 
                className="chk-contact-inputs-box chk-unauth-box"
                onClick={() => openAuthModal("/payment/checkout")}
              >
                <div className="chk-input-row">
                  <span className="chk-unauth-label">Email</span>
                  <button type="button" className="chk-unauth-signin-btn">
                    Sign in to continue
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* 2. Choose Your Plan Section */}
          <section className="chk-section">
            <h4 className="chk-section-title">Choose your plan</h4>
            <p className="chk-trusted-subtitle">
              ✓ Trusted by engineers preparing for top product-based companies
            </p>

            {/* TEAM PLAN VIEW */}
            {billingCycle === "team" ? (
              <div className="chk-plan-detail-card chk-team-card">
                <div className="chk-team-header">
                  <div className="chk-team-icon-title">
                    <RiGroupLine size={24} color="#3b82f6" />
                    <div>
                      <h3 className="chk-plan-card-name">Team Plan</h3>
                      <span className="chk-plan-tag">MIN 2 SEATS</span>
                    </div>
                  </div>
                  <span className="chk-team-subtitle">
                    Especially built for groups, college classes, and institutions
                  </span>
                  <p className="chk-team-desc">
                    You pay once for the whole team. Invite members by email, each gets their own account with full premium access, at no cost to them.
                  </p>
                </div>

                <div className="chk-team-price-box">
                  <span className="chk-team-big-price">{symbol}{unitPrice.toLocaleString()}<small>/mo</small></span>
                  <span className="chk-team-per-seat">{symbol}{isINR ? 299 : 5}/seat/month</span>
                </div>

                {/* Seats Stepper & Slider */}
                <div className="chk-seats-box">
                  <div className="chk-seats-header">
                    <span className="chk-seats-label">SEATS</span>
                    <div className="chk-seats-controls">
                      <button type="button" onClick={decrementSeats}><RiSubtractLine /></button>
                      <span className="chk-seats-count">{teamSeats}</span>
                      <button type="button" onClick={incrementSeats}><RiAddLine /></button>
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min="2" 
                    max="100" 
                    value={teamSeats} 
                    onChange={(e) => setTeamSeats(parseInt(e.target.value))}
                    className="chk-seats-slider"
                  />
                  <div className="chk-seats-range-labels">
                    <span>2 min</span>
                    <span>Up to 100 seats</span>
                  </div>
                  <div className="chk-seats-pills">
                    {[2, 5, 10, 25, 50, 100].map((num) => (
                      <button
                        key={num}
                        type="button"
                        className={`chk-seat-pill ${teamSeats === num ? "chk-seat-pill--active" : ""}`}
                        onClick={() => setTeamSeats(num)}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Teammates Avatar Stack */}
                <div className="chk-teammates-box">
                  <div className="chk-avatars-row">
                    {Array.from({ length: Math.min(5, teamSeats) }).map((_, i) => (
                      <div key={i} className="chk-avatar-circle">
                        <RiUser3Line size={16} />
                      </div>
                    ))}
                  </div>
                  <span className="chk-teammates-text">
                    ✓ <strong>{teamSeats} teammates</strong>, each with their own account and login, invited by email after checkout.
                  </span>
                </div>

                {/* Team Features */}
                <div className="chk-features-grid">
                  <div className="chk-feature-item"><RiCheckLine color="#10b981" /> <span>Master Data Structures & Algorithms Patterns Systematically</span></div>
                  <div className="chk-feature-item"><RiCheckLine color="#10b981" /> <span>System Design (Complete One) LLD / HLD</span></div>
                  <div className="chk-feature-item"><RiCheckLine color="#10b981" /> <span>CS Core Subjects (Computer Networking, Operating System, DBMS/SQL)</span></div>
                  <div className="chk-feature-item"><RiCheckLine color="#10b981" /> <span>Premium Engineering Newsletters</span></div>
                  <div className="chk-feature-item"><RiCheckLine color="#10b981" /> <span>System Design Scenarios (90% interviews touch these)</span></div>
                  <div className="chk-feature-item"><RiCheckLine color="#10b981" /> <span>Interview Patterns for System Design (build & be 100% interview ready)</span></div>
                  <div className="chk-feature-item"><RiCheckLine color="#10b981" /> <span>AI Engineering (Complete One)</span></div>
                  <div className="chk-feature-item"><RiCheckLine color="#10b981" /> <span>DevOps Engineering (Docker, Kubernetes, Terraform, Ansible, CI/CD, Monitoring, SRE, Security & Scripting)</span></div>
                  <div className="chk-feature-item"><RiCheckLine color="#10b981" /> <span>Access to all new content in future (a lot currently in progress)</span></div>
                </div>

                <div className="chk-seat-summary-box">
                  <div className="chk-seat-summary-row">
                    <span>Per seat</span>
                    <span>{symbol}{isINR ? 299 : 5}/mo</span>
                  </div>
                  <div className="chk-seat-summary-row">
                    <span>x {teamSeats} seats</span>
                    <span><strong>{symbol}{unitPrice.toLocaleString()}/mo</strong></span>
                  </div>
                </div>

                <button type="button" className="chk-submit-btn" onClick={handleSubscribe}>
                  Get Team Plan {symbol}{unitPrice.toLocaleString()}/mo
                </button>
                <p className="chk-btn-note">You'll be redirected to invite your team by email right after payment</p>
              </div>
            ) : (
              /* INDIVIDUAL / STUDENT / YEARLY / MONTHLY PLAN CARD */
              <div className="chk-plan-detail-card">
                <div className="chk-plan-card-top">
                  <div className="chk-plan-card-title-box">
                    <h3 className="chk-plan-card-name">
                      {billingCycle === "yearly" ? "Yearly Plan" : (billingCycle === "student" ? "Student Plan" : "Monthly Plan")} (Algovia.io {planType === "basic" ? "Basic Plan" : ""})
                    </h3>
                  </div>

                  <div className="chk-plan-card-price-stack">
                    <div className="chk-original-crossed">
                      {symbol}{originalPrice}
                    </div>
                    <div className="chk-current-price-row">
                      <span className="chk-big-number">{symbol}{unitPrice.toLocaleString()}</span>
                      <span className="chk-mo-label">{periodLabel}</span>
                    </div>
                    <span className="chk-gst-label">
                      {billingCycle === "yearly" ? "One-time • Incl. GST" : "Monthly • Incl. GST"}
                    </span>
                    <span className="chk-badge-pill">
                      {planType === "full" ? "Full Access" : "Basic"}
                    </span>
                    <span className="chk-ideal-label">
                      {planType === "full" ? "Ideal for Professionals & Experienced" : "Ideal for Freshers"}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="chk-features-stack">
                  <div className="chk-feature-item"><RiCheckLine color="#10b981" /> <span>Master Data Structures & Algorithms Patterns Systematically</span></div>
                  <div className="chk-feature-item"><RiCheckLine color="#10b981" /> <span>System Design (Complete One) LLD / HLD</span></div>
                  {planType === "full" && (
                    <>
                      <div className="chk-feature-item"><RiCheckLine color="#10b981" /> <span>CS Core Subjects (Computer Networking, Operating System, DBMS/SQL)</span></div>
                      <div className="chk-feature-item"><RiCheckLine color="#10b981" /> <span>Premium Engineering Newsletters</span></div>
                      <div className="chk-feature-item"><RiCheckLine color="#10b981" /> <span>System Design Scenarios (90% interviews touch these)</span></div>
                      <div className="chk-feature-item"><RiCheckLine color="#10b981" /> <span>Interview Patterns for System Design (build & be 100% interview ready)</span></div>
                      <div className="chk-feature-item"><RiCheckLine color="#10b981" /> <span>AI Engineering (Complete One)</span></div>
                      <div className="chk-feature-item"><RiCheckLine color="#10b981" /> <span>DevOps Engineering (Docker, Kubernetes, Terraform, Ansible, CI/CD, Monitoring, SRE, Security & Scripting)</span></div>
                      <div className="chk-feature-item"><RiCheckLine color="#10b981" /> <span>Access to all new content in future (a lot currently in progress)</span></div>
                    </>
                  )}
                  {billingCycle === "yearly" && (
                    <div className="chk-feature-item"><RiCheckLine color="#10b981" /> <span>12 months access, save 3 months vs monthly</span></div>
                  )}
                </div>

                {billingCycle === "yearly" && (
                  <div className="chk-yearly-savings-banner">
                    Save {symbol}{isINR ? (planType === "full" ? "1989" : "1089") : (planType === "full" ? "39" : "21")} vs monthly billing
                  </div>
                )}

                <button type="button" className="chk-submit-btn" onClick={handleSubscribe}>
                  {billingCycle === "yearly" ? "Subscribe Yearly" : "Subscribe"}
                </button>
              </div>
            )}
          </section>

          {/* 3. Frequently Asked Questions */}
          <section className="chk-section chk-faq-section">
            <h4 className="chk-section-title">Frequently asked</h4>
            
            <div className="chk-faq-item">
              <h5 className="chk-faq-q">When am I charged?</h5>
              <p className="chk-faq-a">
                As soon as you complete payment. Monthly plans renew automatically each month; yearly plans are a single one-time payment.
              </p>
            </div>

            <div className="chk-faq-item">
              <h5 className="chk-faq-q">Can I switch plans?</h5>
              <p className="chk-faq-a">
                If you're on Basic, you can upgrade to Full Access directly on the same billing cycle — charged at full price today, no need to cancel first. For any other switch, cancel your current plan from Profile → Billing, then activate the new one.
              </p>
            </div>

            <div className="chk-faq-item">
              <h5 className="chk-faq-q">How do refunds work?</h5>
              <p className="chk-faq-a">
                If you cancel, you keep access until the end of your billing period. See our <Link to="/refund-policy" className="chk-faq-link">Refund Policy</Link>.
              </p>
            </div>
          </section>

          {/* 4. Bottom Footer Links & Support */}
          <footer className="chk-main-footer">
            <div className="chk-support-row">
              <a href="#chai" className="chk-chai-link"><RiHeartLine color="#ef4444" /> <span>Buy me a chai</span></a>
              <span className="chk-pipe">|</span>
              <a href="mailto:support@algovia.io" className="chk-support-link">Need help? Contact support</a>
            </div>

            <div className="chk-view-expenses">
              <Link to="/billing-expenses">View all billing & expenses of this platform →</Link>
            </div>

            <div className="chk-legal-row">
              <Link to="/terms">Terms of Service</Link>
              <span className="chk-dot">•</span>
              <Link to="/privacy-policy">Privacy Policy</Link>
              <span className="chk-dot">•</span>
              <Link to="/refund-policy">Refund Policy</Link>
            </div>

            <div className="chk-socials-row">
              <span className="chk-follow-label">Follow Himanshu Singour:</span>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
              <a href="https://medium.com" target="_blank" rel="noopener noreferrer"><FaMedium /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            </div>
          </footer>

        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
