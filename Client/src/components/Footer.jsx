import React from "react";
import { Link } from "react-router-dom";
import algoviaLogo from "../assets/Algovia.png";
import { FaInstagram, FaXTwitter, FaLinkedin, FaMedium } from "react-icons/fa6";
import "./Footer.css";

/**
 * Global Footer Component for Algovia.io
 * Appears across all pages in Light and Dark themes.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: "About", url: "#" },
    { label: "Pricing", url: "#" },
    { label: "Buy me a chai ☕", url: "#" },
    { label: "Privacy Policy", url: "/privacy-policy" },
    { label: "Terms and Conditions", url: "/terms" },
    { label: "Refund Policy", url: "/refund-policy" },
    { label: "Cancellation Policy", url: "/cancellation-policy" }
  ];

  return (
    <footer className="algovia-global-footer">
      <div className="algovia-footer-container">
        
        {/* Main Footer Row: Brand Logo, Nav Links, Social Icons */}
        <div className="algovia-footer-main-row">
          
          {/* Brand Logo & Tagline */}
          <div className="algovia-footer-brand">
            <Link to="/" className="algovia-footer-logo-link">
              <img 
                src={algoviaLogo} 
                alt="Algovia.io Logo" 
                className="algovia-footer-logo-img" 
              />
              <div className="algovia-footer-brand-text">
                <span className="algovia-footer-brand-name">
                  Algovia<span>.io</span>
                </span>
                <span className="algovia-footer-brand-tagline">
                  BUILT BY ENGINEER, FOR ENGINEERS
                </span>
              </div>
            </Link>
          </div>

          {/* Center Navigation Links with pipe separators */}
          <nav className="algovia-footer-nav" aria-label="Footer Navigation">
            {navLinks.map((link, index) => (
              <React.Fragment key={link.label}>
                {link.url.startsWith("/") ? (
                  <Link to={link.url} className="algovia-footer-nav-link">
                    {link.label}
                  </Link>
                ) : (
                  <a href={link.url} className="algovia-footer-nav-link">
                    {link.label}
                  </a>
                )}
                {index < navLinks.length - 1 && (
                  <span className="algovia-footer-pipe-separator" aria-hidden="true">
                    |
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Right Social Icons matching exact reference screenshot */}
          <div className="algovia-footer-socials">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="algovia-footer-social-btn algovia-social--instagram"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="algovia-footer-social-btn algovia-social--x"
              aria-label="X / Twitter"
            >
              <FaXTwitter />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="algovia-footer-social-btn algovia-social--linkedin"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a 
              href="https://medium.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="algovia-footer-social-btn algovia-social--medium"
              aria-label="Medium Articles"
            >
              <FaMedium />
            </a>
          </div>

        </div>

        {/* Bottom Copyright Row */}
        <div className="algovia-footer-copyright">
          <p>Copyright © {currentYear} Algovia.io | All rights reserved</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
