import React from "react";
import { Link } from "react-router-dom";
import { RiArrowLeftLine, RiRefreshLine, RiMailLine } from "react-icons/ri";
import Announcementbar from "../components/Announcementbar";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import "./RefundPolicyPage.css";

/**
 * Refund Policy Page Component for Algovia.io
 * Supports Light & Dark themes dynamically.
 */
const RefundPolicyPage = () => {
  return (
    <div className="refund-page-wrapper">
      <header className="xlr-sticky-header">
        <Announcementbar />
        <Navbar />
      </header>

      <main className="refund-container">
        {/* Back link */}
        <Link to="/" className="refund-back-link">
          <RiArrowLeftLine size={16} />
          <span>Back to Home</span>
        </Link>

        {/* Hero Header */}
        <div className="refund-header">
          <div className="refund-icon-box">
            <RiRefreshLine size={28} className="refund-icon-svg" />
          </div>
          <div className="refund-header-text">
            <h1 className="refund-title">Refund Policy</h1>
            <p className="refund-subtitle">Last updated: August 5, 2026</p>
          </div>
        </div>

        {/* Quick Links Box */}
        <div className="refund-quick-links-box">
          <span className="refund-quick-label">Quick Links:</span>
          <div className="refund-quick-links">
            <a href="#overview">FAQs</a>
            <span className="refund-dot">•</span>
            <Link to="/cancellation-policy">Cancellation Policy</Link>
            <span className="refund-dot">•</span>
            <Link to="/terms">Terms & Conditions</Link>
            <span className="refund-dot">•</span>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </div>
        </div>

        {/* Policy Content Sections */}
        <div className="refund-content-stack">
          {/* Section 1 */}
          <section id="overview" className="refund-card">
            <h2>1. Overview</h2>
            <p>
              Algovia.io ("we," "our," or "us") provides digital learning content, including Data Structures & Algorithms and System Design courses, premium articles, newsletters, and coding resources, through monthly and yearly subscriptions. All payments are securely processed by Razorpay. This Refund Policy explains the terms under which refunds may be considered. We do not sell or ship any physical products.
            </p>
          </section>

          {/* Section 2 */}
          <section className="refund-card">
            <h2>2. Digital Products Are Generally Non-Refundable</h2>
            <p>
              Because our offerings are digital and access is delivered instantly, subscription payments are generally <strong>non-refundable once access to the paid content has been granted</strong>. As soon as your subscription is activated, you receive immediate access to premium material, which cannot be returned.
            </p>
          </section>

          {/* Section 3 */}
          <section className="refund-card">
            <h2>3. Refund Request Review (7-Day Window)</h2>
            <p>
              We understand that exceptional situations can occur. Refund requests may be reviewed on a <strong>case-by-case basis within 7 days of the original purchase date</strong>. When reviewing a request, we may consider factors such as:
            </p>
            <ul className="refund-bullet-list">
              <li>Whether the premium content was accessed or consumed</li>
              <li>Accidental or duplicate payments</li>
              <li>Verified technical issues that prevented you from using the service</li>
              <li>Incorrect charges</li>
            </ul>
            <p className="refund-note-text">
              Approval of any refund is at our reasonable discretion. Requests made after 7 days from purchase are not eligible for a refund.
            </p>
          </section>

          {/* Section 4 */}
          <section className="refund-card">
            <h2>4. Non-Refundable Situations</h2>
            <ul className="refund-bullet-list">
              <li>Requests made more than 7 days after purchase</li>
              <li>Change of mind after substantial content has been accessed</li>
              <li>Partial or unused portions of a subscription period (see our Cancellation Policy)</li>
              <li>Failure to cancel before an automatic renewal, where content remained available</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="refund-card">
            <h2>5. How to Request a Refund</h2>
            <p>
              To request a refund, email us at <a href="mailto:support@algovia.io" className="refund-inline-email">support@algovia.io</a> within 7 days of your purchase and include:
            </p>
            <ul className="refund-bullet-list">
              <li>The email address associated with your account</li>
              <li>The Razorpay payment / order ID</li>
              <li>The date of purchase and the plan purchased</li>
              <li>A brief reason for your request</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="refund-card">
            <h2>6. Refund Processing</h2>
            <p>
              If a refund is approved, it will be processed to your original payment method through Razorpay. Approved refunds are typically completed within <strong>5-7 business days</strong>, though the exact timing depends on your bank or card issuer. We will notify you by email once the refund has been initiated.
            </p>
          </section>

          {/* Section 7 */}
          <section className="refund-card">
            <h2>7. Failed or Duplicate Payments</h2>
            <p>
              If you were charged but did not receive access, or were charged more than once for the same subscription, contact us at <a href="mailto:support@algovia.io" className="refund-inline-email">support@algovia.io</a> with your payment details. Verified failed or duplicate charges are fully refunded.
            </p>
          </section>

          {/* Section 8 */}
          <section id="contact" className="refund-card">
            <h2>8. Contact Us</h2>
            <p>For any questions about this Refund Policy, please reach out to us:</p>
            
            <div className="refund-contact-box">
              <div className="refund-contact-company">Algovia.io LLC</div>
              <a href="mailto:support@algovia.io" className="refund-contact-email">
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

export default RefundPolicyPage;
