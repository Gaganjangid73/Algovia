import React from "react";

/**
 * Modular card component for SDE roles section
 */
const SdeCard = ({ item, isDsaCard = false, children }) => {
  const { title, description, badge, badgeColor, image, className } = item;

  const cardClasses = [
    "Xlr-sderole-systemdesign-content-card",
    isDsaCard ? "sde-card--dsa" : "",
    className || ""
  ].filter(Boolean).join(" ");

  return (
    <div className={cardClasses}>
      {badge && (
        <span className={`sde-card-badge ${badgeColor ? `sde-badge--${badgeColor}` : ""}`}>
          {badge}
        </span>
      )}
      <div className={`sde-card-image-wrapper ${isDsaCard ? "sde-card-image-wrapper--dsa" : ""}`}>
        {children ? (
          children
        ) : (
          <img src={image?.trim()} alt={title} loading="lazy" />
        )}
      </div>
      <div className="sde-card-info">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default SdeCard;
