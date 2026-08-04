import React from "react";
import { useReviewsData } from "../../hooks/useReviewsData";
import { useAnimatedCounter } from "../../hooks/useAnimatedCounter";
import WriteReviewModal from "./WriteReviewModal";

/**
 * Animated Stat Display Component for Community Counter
 */
const CommunityStatDisplay = ({ targetCount, suffix = "+", label }) => {
  const { formattedCount, elementRef } = useAnimatedCounter(targetCount, 2200);

  return (
    <div ref={elementRef} className="sde-reviews-stat-group">
      <div className="sde-reviews-stat-number">
        {formattedCount}
        {suffix}
      </div>
      <div className="sde-reviews-stat-label">{label}</div>
    </div>
  );
};

/**
 * Main Reviews & Success Stories Section Component
 */
const ReviewsSection = () => {
  const {
    data,
    loading,
    isModalOpen,
    openModal,
    closeModal,
    formState,
    handleInputChange,
    handleFormSubmit
  } = useReviewsData();

  if (loading || !data) return null;

  // Split reviews into 3 columns for the upward marquee grid
  const col1 = data.reviews.filter((_, i) => i % 3 === 0);
  const col2 = data.reviews.filter((_, i) => i % 3 === 1);
  const col3 = data.reviews.filter((_, i) => i % 3 === 2);

  const columns = [col1, col2, col3];

  return (
    <section className="sde-reviews-section" aria-labelledby="reviews-title">
      {/* Section Top Header */}
      <div className="sde-reviews-header">
        <div className="sde-reviews-title-box">
          <span className="sde-reviews-eyebrow">{data.eyebrow}</span>
          <h2 id="reviews-title" className="sde-reviews-title">
            {data.titleLine1} <br />
            {data.titleLine2}
          </h2>
        </div>

        {/* Community Stat Counter on Right */}
        <CommunityStatDisplay
          targetCount={data.statNumber}
          suffix={data.statSuffix}
          label={data.statLabel}
        />
      </div>

      {/* Main Top Featured Success Story Card */}
      <div className="sde-featured-story-card">
        <span className="sde-featured-badge">{data.featuredStory.badge}</span>
        
        {/* Double Quote Icon */}
        <div className="sde-quote-icon" aria-hidden="true">“</div>

        {/* Paragraphs */}
        <div className="sde-featured-body">
          {data.featuredStory.paragraphs.map((p, idx) => (
            <p key={idx} className="sde-featured-paragraph">{p}</p>
          ))}
        </div>

        {/* Author Footer */}
        <div className="sde-featured-author">
          <div className="sde-avatar-circle">{data.featuredStory.author.avatar}</div>
          <div className="sde-author-info">
            <h4 className="sde-author-name">{data.featuredStory.author.name}</h4>
            <p className="sde-author-role">{data.featuredStory.author.role}</p>
          </div>
        </div>
      </div>

      {/* Infinite Upward Marquee Grid (3 Columns) */}
      <div className="sde-reviews-marquee-container">
        <div className="sde-reviews-marquee-grid">
          {columns.map((colCards, colIdx) => (
            <div key={colIdx} className="sde-marquee-column-wrapper">
              <div className={`sde-marquee-column sde-marquee-column--${colIdx}`}>
                {/* Duplicate items for seamless infinite scroll loop */}
                {[...colCards, ...colCards, ...colCards].map((item, itemIdx) => (
                  <div 
                    key={`${item.id}-${itemIdx}`} 
                    className={`sde-review-card sde-review-card--${item.bgTheme}`}
                  >
                    <div className="sde-quote-icon sde-quote-icon--sm" aria-hidden="true">“</div>
                    <p className="sde-review-text">{item.text}</p>
                    <div className="sde-review-author">
                      <div className="sde-avatar-circle sde-avatar-circle--sm">{item.avatar}</div>
                      <div className="sde-author-info">
                        <h5 className="sde-author-name sde-author-name--sm">{item.author}</h5>
                        <p className="sde-author-role sde-author-role--sm">{item.subtitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Aesthetic Glassmorphic Floating Pill Button */}
      <div className="sde-share-experience-wrapper">
        <button 
          type="button" 
          className="sde-share-experience-btn" 
          onClick={openModal}
        >
          <span className="sde-share-icon" aria-hidden="true">✨</span>
          <span>Share your experience</span>
          <span className="sde-share-arrow" aria-hidden="true">→</span>
        </button>
      </div>

      {/* Write a Review Modal Window */}
      <WriteReviewModal
        isOpen={isModalOpen}
        onClose={closeModal}
        formState={formState}
        onInputChange={handleInputChange}
        onSubmit={handleFormSubmit}
      />
    </section>
  );
};

export default ReviewsSection;
