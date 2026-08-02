import React from "react";
import { useWhyUsData } from "../../hooks/useWhyUsData";
import { useAnimatedCounter } from "../../hooks/useAnimatedCounter";

/**
 * Helper to render paragraph text with specific phrases highlighted in <strong> tags
 */
const renderHighlightedText = (text, highlights = []) => {
  if (!highlights || highlights.length === 0) return text;
  const escaped = highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, index) => {
    const isMatched = highlights.some((h) => h.toLowerCase() === part.toLowerCase());
    return isMatched ? <strong key={index}>{part}</strong> : part;
  });
};

/**
 * Animated Stat Display Component using useAnimatedCounter custom hook
 */
const AnimatedStatDisplay = ({ targetCount, suffix = "+", label }) => {
  const { formattedCount, elementRef } = useAnimatedCounter(targetCount, 2200);

  return (
    <div ref={elementRef} className="sde-whyus-stat-box">
      <div className="sde-whyus-stat-number">
        {formattedCount}
        {suffix}
      </div>
      <div className="sde-whyus-stat-label">{label}</div>
    </div>
  );
};

/**
 * 'Why Engineers Choose Algovia.io' Section Component
 */
const WhyUsSection = () => {
  const { data, loading } = useWhyUsData();

  if (loading || !data) return null;

  return (
    <section className="sde-whyus-section" aria-labelledby="whyus-title">
      {/* Eyebrow & Title Header */}
      <div className="sde-whyus-header">
        <span className="sde-whyus-eyebrow">{data.eyebrow}</span>
        <h2 id="whyus-title" className="sde-whyus-title">
          {data.title}
        </h2>
        <p className="sde-whyus-subtitle">{data.subtitle}</p>
      </div>

      {/* Viewport-Triggered Animated Counter Stat Box */}
      <AnimatedStatDisplay 
        targetCount={data.targetCount} 
        suffix={data.statSuffix} 
        label={data.statLabel} 
      />

      {/* Vertical Reasons List */}
      <div className="sde-whyus-reasons-list">
        {data.reasons.map((item) => (
          <div key={item.id} className="sde-whyus-reason-card">
            <span className="sde-reason-eyebrow">{item.eyebrow}</span>
            <p className="sde-reason-text">
              {renderHighlightedText(item.text, item.highlights)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUsSection;
