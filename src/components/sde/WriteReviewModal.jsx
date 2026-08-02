import React, { useEffect } from "react";

/**
 * 'Write a Review' Modal Component
 */
const WriteReviewModal = ({
  isOpen,
  onClose,
  formState,
  onInputChange,
  onSubmit
}) => {
  // ESC key handler to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="sde-modal-overlay" onClick={onClose} aria-modal="true" role="dialog">
      <div 
        className="sde-modal-card" 
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal card
      >
        {/* Modal Header */}
        <div className="sde-modal-header">
          <div className="sde-modal-title-group">
            <h3 className="sde-modal-title">Write a Review</h3>
            <p className="sde-modal-subtitle">Share your experience with Algovia</p>
          </div>
          <button 
            type="button" 
            className="sde-modal-close-btn" 
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={onSubmit} className="sde-modal-form">
          <div className="sde-form-group">
            <label htmlFor="review-name" className="sde-form-label">Name</label>
            <input
              id="review-name"
              type="text"
              className="sde-form-input"
              value={formState.name}
              onChange={(e) => onInputChange("name", e.target.value)}
              placeholder="Your Full Name"
              required
            />
          </div>

          <div className="sde-form-group">
            <label htmlFor="review-email" className="sde-form-label">Email</label>
            <input
              id="review-email"
              type="email"
              className="sde-form-input"
              value={formState.email}
              onChange={(e) => onInputChange("email", e.target.value)}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="sde-form-group">
            <label htmlFor="review-content" className="sde-form-label">Your Review</label>
            <textarea
              id="review-content"
              className="sde-form-textarea"
              rows={4}
              value={formState.review}
              onChange={(e) => onInputChange("review", e.target.value)}
              placeholder="Share your honest experience with the platform..."
              required
            />
          </div>

          {/* Form Actions */}
          <div className="sde-modal-actions">
            <button 
              type="button" 
              className="sde-modal-cancel-btn" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="sde-modal-submit-btn"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteReviewModal;
