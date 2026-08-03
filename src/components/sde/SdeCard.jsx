import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
 * Clicking HLD card navigates to /hld curriculum page!
 */
const SdeCard = ({ item, isDsaCard = false, children }) => {
  const { id, title, description, badge, badgeColor, image, className } = item;
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  const cardClasses = [
    "Xlr-sderole-systemdesign-content-card",
    isDsaCard ? "sde-card--dsa" : "",
    className || ""
  ].filter(Boolean).join(" ");

  // Custom diagram fallback component for this card
  const fallbackDiagram = DIAGRAM_MAP[id] || null;

  // Decide whether to show image or custom diagram fallback
  const hasValidImage = image && typeof image === "string" && image.trim().length > 0 && !imgError;

  const handleCardClick = () => {
    if (id === "hld") {
      navigate("/hld");
    } else if (id === "lld") {
      navigate("/lld");
    }
  };

  return (
    <div className={cardClasses} onClick={handleCardClick} style={{ cursor: "pointer" }}>
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
