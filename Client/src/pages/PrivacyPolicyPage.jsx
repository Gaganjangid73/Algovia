import React from "react";
import { Link } from "react-router-dom";
import { RiArrowLeftLine, RiShieldCheckLine, RiMailLine } from "react-icons/ri";
import Announcementbar from "../components/Announcementbar";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import "./PrivacyPolicyPage.css";

/**
 * Privacy Policy Page Component for Algovia.io
 * Supports Light & Dark themes dynamically.
 */
const PrivacyPolicyPage = () => {
  return (
    <div className="privacy-page-wrapper">
      <header className="xlr-sticky-header">
        <Announcementbar />
        <Navbar />
      </header>

      <main className="privacy-container">
        {/* Back link */}
        <Link to="/" className="privacy-back-link">
          <RiArrowLeftLine size={16} />
          <span>Back to Home</span>
        </Link>

        {/* Hero Header */}
        <div className="privacy-header">
          <div className="privacy-shield-icon">
            <RiShieldCheckLine size={28} className="privacy-shield-svg" />
          </div>
          <div className="privacy-header-text">
            <h1 className="privacy-title">Privacy Policy</h1>
            <p className="privacy-subtitle">Last updated: August 5, 2026</p>
          </div>
        </div>

        {/* Quick Links Box */}
        <div className="privacy-quick-links-box">
          <span className="privacy-quick-label">Quick Links:</span>
          <div className="privacy-quick-links">
            <a href="#introduction">FAQs</a>
            <span className="privacy-dot">•</span>
            <a href="#rights">Terms of Service</a>
            <span className="privacy-dot">•</span>
            <a href="#contact">Shipping Policy</a>
          </div>
        </div>

        {/* Policy Content Sections */}
        <div className="privacy-content-stack">
          {/* Section 1 */}
          <section id="introduction" className="privacy-card">
            <h2>1. Introduction</h2>
            <p>
              Welcome to Algovia.io ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website algovia.io and use our services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="privacy-card">
            <h2>2. Information We Collect</h2>
            
            <h3>Personal Information</h3>
            <ul className="privacy-bullet-list">
              <li>Name and email address when you create an account</li>
              <li>Payment information when you subscribe to our services</li>
              <li>Profile information you choose to provide</li>
              <li>Communication data when you contact us</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <ul className="privacy-bullet-list">
              <li>Device and browser information</li>
              <li>IP address and location data</li>
              <li>Usage data and analytics</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="privacy-card">
            <h2>3. How We Use Your Information</h2>
            <ul className="privacy-bullet-list">
              <li>To provide and maintain our services</li>
              <li>To process your transactions and subscriptions</li>
              <li>To send you updates, newsletters, and marketing communications</li>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To improve our website and services</li>
              <li>To detect and prevent fraud or unauthorized access</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="privacy-card">
            <h2>4. Information Sharing</h2>
            <p>
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="privacy-bullet-list">
              <li>
                <strong>Service Providers:</strong> Third-party vendors who help us operate our business (payment processors, email services, analytics providers)
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to protect our rights
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="privacy-card">
            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          {/* Section 6 */}
          <section id="rights" className="privacy-card">
            <h2>6. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className="privacy-bullet-list">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Data portability</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="privacy-card">
            <h2>7. Cookies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie preferences through your browser settings. Essential cookies are required for the website to function properly and cannot be disabled.
            </p>
          </section>

          {/* Section 8 */}
          <section className="privacy-card">
            <h2>8. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
            </p>
          </section>

          {/* Section 9 */}
          <section className="privacy-card">
            <h2>9. Children's Privacy</h2>
            <p>
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
            </p>
          </section>

          {/* Section 10 */}
          <section className="privacy-card">
            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of our services after any changes indicates your acceptance of the updated policy.
            </p>
          </section>

          {/* Section 11 */}
          <section id="contact" className="privacy-card">
            <h2>11. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or our privacy practices, please contact us:</p>
            
            <div className="privacy-contact-box">
              <div className="privacy-contact-company">Algovia.io LLC</div>
              <a href="mailto:support@algovia.io" className="privacy-contact-email">
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

export default PrivacyPolicyPage;
