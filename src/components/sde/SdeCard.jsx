import React, { useState } from "react";
import HldDiagram from "./diagrams/HldDiagram";
import LldDiagram from "./diagrams/LldDiagram";
import ScenariosDiagram from "./diagrams/ScenariosDiagram";
import "./diagrams/diagrams.css";

const DIAGRAM_MAP = {
  hld: <HldDiagram />,
  lld: <LldDiagram />,
  scenarios: <ScenariosDiagram />
};

/**
 * Modular card component for SDE roles section
 * Features smart image fallback rendering: if image is missing or fails to load,
 * automatically renders interactive custom diagram illustrations matching user design!
 */
const SdeCard = ({ item, isDsaCard = false, children }) => {
  const { id, title, description, badge, badgeColor, image, className } = item;
  const [imgError, setImgError] = useState(false);

  const cardClasses = [
    "Xlr-sderole-systemdesign-content-card",
    isDsaCard ? "sde-card--dsa" : "",
    className || ""
  ].filter(Boolean).join(" ");

  // Custom diagram fallback component for this card
  const fallbackDiagram = DIAGRAM_MAP[id] || null;

  // Decide whether to show image or custom diagram fallback
  const hasValidImage = image && typeof image === "string" && image.trim().length > 0 && !imgError;

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
        ) : hasValidImage ? (
          <img 
            src={image.trim()} 
            alt={title} 
            loading="lazy" 
            onError={() => setImgError(true)} 
          />
        ) : (
          fallbackDiagram
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
