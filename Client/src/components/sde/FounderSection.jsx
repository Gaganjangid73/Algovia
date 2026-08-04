import React from "react";
import { useFounderData } from "../../hooks/useFounderData";
import gaganImg from "../../assets/Gagan.JPG";
import { 
  FiGlobe, 
  FiLinkedin, 
  FiInstagram, 
  FiVideo, 
  FiBookmark, 
  FiCoffee,
  FiArrowRight
} from "react-icons/fi";

const SOCIAL_ICONS = {
  web: <FiGlobe />,
  linkedin: <FiLinkedin />,
  instagram: <FiInstagram />,
  topmate: <FiVideo />,
  bookmark: <FiBookmark />
};

const SECONDARY_ICONS = {
  "Book a Session": <FiVideo />,
  "Buy me a Chai": <FiCoffee />
};

/**
 * Founder Section Component: "Building Engineer, Not Just Coders"
 * Light & Dark Theme adaptive with Gagan's portrait image and React Icons
 */
const FounderSection = () => {
  const { data, loading } = useFounderData();

  if (loading || !data) return null;

  return (
    <section id="founder" className="sde-founder-section" aria-labelledby="founder-title">
      <div className="sde-founder-container">
        
        {/* Left Side: Story & Quote Content */}
        <div className="sde-founder-content">
          <h2 id="founder-title" className="sde-founder-title">
            <span className="sde-founder-title-prefix">{data.titlePrefix}</span>
            <span className="sde-founder-title-highlight">{data.titleHighlight}</span>
          </h2>

          <div className="sde-founder-text-block">
            <p className="sde-founder-greeting">{data.greeting}</p>
            <p className="sde-founder-bio">{data.bio}</p>

            <div className="sde-founder-quote-box">
              <span className="sde-quote-label">{data.quoteHeader}</span>
              {data.quoteLines.map((line, idx) => (
                <p 
                  key={idx} 
                  className={`sde-quote-line ${line.bold ? "sde-quote-line--bold" : ""}`}
                >
                  {line.text}
                </p>
              ))}
            </div>
          </div>

          {/* Action Buttons & Links */}
          <div className="sde-founder-actions">
            {/* Primary CTA Button */}
            <a href={data.primaryCta.url} className="sde-founder-primary-btn">
              <span>{data.primaryCta.text}</span>
              <FiArrowRight className="sde-primary-arrow-icon" aria-hidden="true" />
            </a>

            {/* Secondary Buttons Row */}
            <div className="sde-founder-secondary-row">
              {data.secondaryButtons.map((btn, idx) => (
                <a key={idx} href={btn.url} className="sde-founder-secondary-btn">
                  <span className="sde-btn-icon">{SECONDARY_ICONS[btn.text] || btn.icon}</span>
                  <span>{btn.text}</span>
                </a>
              ))}
            </div>

            {/* Larger React Icon Social Row */}
            <div className="sde-founder-social-row">
              {data.socialLinks.map((item) => (
                <a 
                  key={item.id} 
                  href={item.url} 
                  className="sde-founder-social-icon" 
                  title={item.label}
                  aria-label={item.label}
                >
                  {SOCIAL_ICONS[item.id] || item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Gagan Portrait Image Card */}
        <div className="sde-founder-image-wrapper">
          <div className="sde-founder-image-card">
            <img 
              src={gaganImg} 
              alt="Gagan - Founder & Engineer of Algovia.io" 
              className="sde-founder-portrait" 
            />
            <div className="sde-founder-image-vignette" aria-hidden="true" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default FounderSection;
