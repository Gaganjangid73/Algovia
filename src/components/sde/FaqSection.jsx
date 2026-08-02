import React from "react";
import { useFaqData } from "../../hooks/useFaqData";
import { FiChevronDown } from "react-icons/fi";

/**
 * Frequently Asked Questions (FAQ) Section Component
 * Features vertical category tabs on left and expandable accordion list on right.
 * Light & Dark theme responsive matching user reference screenshots.
 */
const FaqSection = () => {
  const {
    data,
    loading,
    activeCategory,
    openItemId,
    handleCategorySelect,
    toggleAccordion
  } = useFaqData();

  if (loading || !data) return null;

  const currentQuestions = data.items[activeCategory] || [];

  return (
    <section className="sde-faq-section" aria-labelledby="faq-title">
      {/* Section Title */}
      <h2 id="faq-title" className="sde-faq-title">
        {data.title}
      </h2>

      <div className="sde-faq-container">
        {/* Left Column: Category Navigation Tabs */}
        <div className="sde-faq-categories-nav" role="tablist">
          {data.categories.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`sde-faq-category-btn ${isActive ? "sde-faq-category-btn--active" : ""}`}
                onClick={() => handleCategorySelect(cat.id)}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Right Column: Accordion Questions Container */}
        <div className="sde-faq-accordion-box">
          {currentQuestions.map((item) => {
            const isOpen = openItemId === item.id;
            return (
              <div 
                key={item.id} 
                className={`sde-faq-accordion-item ${isOpen ? "sde-faq-accordion-item--open" : ""}`}
              >
                <button
                  type="button"
                  className="sde-faq-question-btn"
                  onClick={() => toggleAccordion(item.id)}
                  aria-expanded={isOpen}
                >
                  <span className="sde-faq-question-text">{item.question}</span>
                  <FiChevronDown 
                    className={`sde-faq-chevron-icon ${isOpen ? "sde-faq-chevron-icon--rotated" : ""}`} 
                    aria-hidden="true"
                  />
                </button>

                {/* Collapsible Answer Block */}
                {isOpen && (
                  <div className="sde-faq-answer-block">
                    <p className="sde-faq-answer-text">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
