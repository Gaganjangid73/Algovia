import React from "react";
import { Link } from "react-router-dom";
import { RiArrowLeftLine, RiFileTextLine, RiMailLine } from "react-icons/ri";
import Announcementbar from "../components/Announcementbar";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import "./TermsPage.css";

/**
 * Terms of Service / Terms & Conditions Page Component for Algovia.io
 * Supports Light & Dark themes dynamically.
 */
const TermsPage = () => {
  return (
    <div className="terms-page-wrapper">
      <header className="xlr-sticky-header">
        <Announcementbar />
        <Navbar />
      </header>

      <main className="terms-container">
        {/* Back link */}
        <Link to="/" className="terms-back-link">
          <RiArrowLeftLine size={16} />
          <span>Back to Home</span>
        </Link>

        {/* Hero Header */}
        <div className="terms-header">
          <div className="terms-icon-box">
            <RiFileTextLine size={28} className="terms-icon-svg" />
          </div>
          <div className="terms-header-text">
            <h1 className="terms-title">Terms of Service</h1>
            <p className="terms-subtitle">Last updated: August 5, 2026</p>
          </div>
        </div>

        {/* Quick Links Box */}
        <div className="terms-quick-links-box">
          <span className="terms-quick-label">Quick Links:</span>
          <div className="terms-quick-links">
            <a href="#acceptance">FAQs</a>
            <span className="terms-dot">•</span>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="terms-dot">•</span>
            <a href="#contact">Shipping Policy</a>
          </div>
        </div>

        {/* Policy Content Sections */}
        <div className="terms-content-stack">
          {/* Section 1 */}
          <section id="acceptance" className="terms-card">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using Algovia.io ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Service. These Terms apply to all users, including visitors, registered users, and subscribers.
            </p>
          </section>

          {/* Section 2 */}
          <section className="terms-card">
            <h2>2. Description of Service</h2>
            <p>
              Algovia.io is an educational platform providing content related to Data Structures and Algorithms (DSA), System Design, Low-Level Design (LLD), High-Level Design (HLD), and software engineering interview preparation. We offer both free and premium subscription-based content.
            </p>
          </section>

          {/* Section 3 */}
          <section className="terms-card">
            <h2>3. User Accounts</h2>
            <p>When you create an account with us, you must:</p>
            <ul className="terms-bullet-list">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>
            <p className="terms-note-text">
              We reserve the right to suspend or terminate accounts that violate these Terms or engage in fraudulent activity.
            </p>
          </section>

          {/* Section 4 */}
          <section className="terms-card">
            <h2>4. Subscription and Payments</h2>
            
            <h3>Subscription Plans</h3>
            <p>
              We offer various subscription plans (Algovia.io Plus and Algovia.io Prime) with different features and pricing. Details of each plan are available on our subscription page.
            </p>

            <h3>Payment Processing</h3>
            <p>
              Payments are processed through secure third-party payment processors (Razorpay). By subscribing, you authorize us to charge your payment method for the subscription fee.
            </p>

            <h3>Automatic Renewal</h3>
            <p>
              Subscriptions automatically renew at the end of each billing period unless cancelled before the renewal date. You can manage your subscription through your account settings.
            </p>
          </section>

          {/* Section 5 */}
          <section className="terms-card">
            <h2>5. Refund Policy</h2>
            <p>
              Due to the digital nature of our content, all sales are generally final. However, we may consider refund requests on a case-by-case basis within 7 days of purchase if you have not accessed a significant portion of the premium content. Please contact our support team for refund requests.
            </p>
          </section>

          {/* Section 6 */}
          <section className="terms-card">
            <h2>6. Intellectual Property</h2>
            <p>
              All content on Algovia.io, including but not limited to text, graphics, logos, images, videos, code snippets, and educational materials, is the property of Algovia.io LLC and is protected by copyright and intellectual property laws.
            </p>
            <p>You may not:</p>
            <ul className="terms-bullet-list">
              <li>Copy, reproduce, or distribute our content without permission</li>
              <li>Modify, adapt, or create derivative works from our content</li>
              <li>Use our content for commercial purposes without authorization</li>
              <li>Share your account credentials or subscription access with others</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="terms-card">
            <h2>7. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="terms-bullet-list">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on the rights of others</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use automated tools to scrape or download content</li>
              <li>Interfere with the proper functioning of the Service</li>
              <li>Post harmful, offensive, or inappropriate content</li>
              <li>Impersonate others or misrepresent your affiliation</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section className="terms-card">
            <h2>8. User Content</h2>
            <p>
              You may have the opportunity to post comments, notes, or other content. You retain ownership of your content but grant us a non-exclusive, royalty-free license to use, display, and distribute your content in connection with our Service. You are solely responsible for the content you post.
            </p>
          </section>

          {/* Section 9 */}
          <section className="terms-card">
            <h2>9. Disclaimer of Warranties</h2>
            <p className="terms-uppercase-text">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT GUARANTEE THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE. WE DO NOT WARRANT THE ACCURACY OR COMPLETENESS OF ANY CONTENT.
            </p>
          </section>

          {/* Section 10 */}
          <section className="terms-card">
            <h2>10. Limitation of Liability</h2>
            <p className="terms-uppercase-text">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, ALGOVIA.IO LLC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID FOR THE SERVICE IN THE PRECEDING 12 MONTHS.
            </p>
          </section>

          {/* Section 11 */}
          <section className="terms-card">
            <h2>11. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Algovia.io LLC, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the Service or violation of these Terms.
            </p>
          </section>

          {/* Section 12 */}
          <section className="terms-card">
            <h2>12. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the Service at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
            </p>
          </section>

          {/* Section 13 */}
          <section className="terms-card">
            <h2>13. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the Service shall be subject to the exclusive jurisdiction of the courts in India.
            </p>
          </section>

          {/* Section 14 */}
          <section className="terms-card">
            <h2>14. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify users of significant changes by posting a notice on our website or sending an email. Your continued use of the Service after such modifications constitutes acceptance of the updated Terms.
            </p>
          </section>

          {/* Section 15 */}
          <section id="contact" className="terms-card">
            <h2>15. Contact Information</h2>
            <p>If you have any questions about these Terms, please contact us:</p>
            
            <div className="terms-contact-box">
              <div className="terms-contact-company">Algovia.io LLC</div>
              <a href="mailto:support@algovia.io" className="terms-contact-email">
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

export default TermsPage;
