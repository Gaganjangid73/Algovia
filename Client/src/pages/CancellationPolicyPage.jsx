import React from "react";
import { Link } from "react-router-dom";
import { RiArrowLeftLine, RiCloseCircleLine, RiMailLine } from "react-icons/ri";
import Announcementbar from "../components/Announcementbar";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import "./CancellationPolicyPage.css";

/**
 * Cancellation Policy Page Component for Algovia.io
 * Supports Light & Dark themes dynamically.
 */
const CancellationPolicyPage = () => {
  return (
    <div className="cancellation-page-wrapper">
      <header className="xlr-sticky-header">
        <Announcementbar />
        <Navbar />
      </header>

      <main className="cancellation-container">
        {/* Back link */}
        <Link to="/" className="cancellation-back-link">
          <RiArrowLeftLine size={16} />
          <span>Back to Home</span>
        </Link>

        {/* Hero Header */}
        <div className="cancellation-header">
          <div className="cancellation-icon-box">
            <RiCloseCircleLine size={28} className="cancellation-icon-svg" />
          </div>
          <div className="cancellation-header-text">
            <h1 className="cancellation-title">Cancellation Policy</h1>
            <p className="cancellation-subtitle">Last updated: August 5, 2026</p>
          </div>
        </div>

        {/* Quick Links Box */}
        <div className="cancellation-quick-links-box">
          <span className="cancellation-quick-label">Quick Links:</span>
          <div className="cancellation-quick-links">
            <a href="#overview">FAQs</a>
            <span className="cancellation-dot">•</span>
            <Link to="/refund-policy">Refund Policy</Link>
            <span className="cancellation-dot">•</span>
            <Link to="/terms">Terms & Conditions</Link>
            <span className="cancellation-dot">•</span>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </div>
        </div>

        {/* Policy Content Sections */}
        <div className="cancellation-content-stack">
          {/* Section 1 */}
          <section id="overview" className="cancellation-card">
            <h2>1. Overview</h2>
            <p>
              Algovia.io ("we," "our," or "us") offers monthly and yearly digital subscriptions for our Data Structures & Algorithms and System Design courses, premium articles, newsletters, and coding resources. Payments are processed securely through Razorpay. This Cancellation Policy explains how you can cancel your subscription and what happens after you do.
            </p>
          </section>

          {/* Section 2 */}
          <section className="cancellation-card">
            <h2>2. Cancel Anytime</h2>
            <p>
              You can cancel your subscription at <strong>any time</strong>, with no cancellation fee. There is no minimum commitment beyond the billing period you have already paid for.
            </p>
          </section>

          {/* Section 3 */}
          <section className="cancellation-card">
            <h2>3. What Cancellation Does</h2>
            <p>
              Cancelling your subscription <strong>stops future renewals only</strong>. It turns off automatic billing so you will not be charged again at the start of the next billing cycle. It does not immediately end your current access.
            </p>
          </section>

          {/* Section 4 */}
          <section className="cancellation-card">
            <h2>4. Access After Cancellation</h2>
            <p>
              After you cancel, your subscription <strong>remains active until the end of the current billing period</strong> that you have already paid for. You keep full access to all premium content until that date, after which your account reverts to the free tier.
            </p>
          </section>

          {/* Section 5 */}
          <section className="cancellation-card">
            <h2>5. No Partial Refunds</h2>
            <p>
              We do not provide partial refunds for the unused portion of a billing period. When you cancel, you continue to enjoy access for the remainder of the period you paid for, but no pro-rated amount is refunded. For details on when a refund may be reviewed, see our <Link to="/refund-policy" className="cancellation-inline-link">Refund Policy</Link>.
            </p>
          </section>

          {/* Section 6 */}
          <section className="cancellation-card">
            <h2>6. How to Cancel</h2>
            <p>You can cancel your subscription in a few steps:</p>
            <ul className="cancellation-bullet-list">
              <li>Sign in to your Algovia.io account</li>
              <li>Go to <strong>Profile → Billing</strong></li>
              <li>Select <strong>Cancel Subscription</strong> and confirm</li>
            </ul>
            <p className="cancellation-note-text">
              If you have any trouble cancelling, email us at <a href="mailto:support@algovia.io" className="cancellation-inline-link">support@algovia.io</a> and we will help you right away.
            </p>
          </section>

          {/* Section 7 */}
          <section className="cancellation-card">
            <h2>7. Reactivating Your Subscription</h2>
            <p>
              You are welcome back anytime. After a cancellation takes effect, you can resubscribe from the pricing page whenever you like to restore premium access.
            </p>
          </section>

          {/* Section 8 */}
          <section id="contact" className="cancellation-card">
            <h2>8. Contact Us</h2>
            <p>For any questions about this Cancellation Policy, please reach out to us:</p>
            
            <div className="cancellation-contact-box">
              <div className="cancellation-contact-company">Algovia.io LLC</div>
              <a href="mailto:support@algovia.io" className="cancellation-contact-email">
                <RiMailLine size={16} />
                <span>support@algovia.io</span>
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CancellationPolicyPage;
