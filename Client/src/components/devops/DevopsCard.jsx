import React, { useState } from "react";
import DevopsTerminalSvg from "./diagrams/DevopsTerminalSvg";
import DevopsPipelineSvg from "./diagrams/DevopsPipelineSvg";
import DevopsCloudSvg from "./diagrams/DevopsCloudSvg";

const DIAGRAM_MAP = {
  "linux-bash": <DevopsTerminalSvg />,
  "devops-toolchain": <DevopsPipelineSvg />,
  "cloud-aws": <DevopsCloudSvg />
};

function DevopsCard({ card }) {
  const [imgError, setImgError] = useState(false);
  
  // Image availability condition: render image if present and valid; otherwise render SVG diagram fallback
  const hasValidImage = Boolean(
    card && 
    card.image && 
    typeof card.image === "string" && 
    card.image.trim().length > 0 && 
    !imgError
  );

  return (
    <div className="xlr-devops-card">
      {/* Dynamic Badge (Only rendered if badge property exists on backend card data) */}
      {card.badge && (
        <div className={`xlr-devops-card-badge ${card.badgeColor ? `xlr-devops-card-badge--${card.badgeColor}` : ""}`}>
          {card.badge}
        </div>
      )}

      {/* Media Container: Shows Image when available, otherwise renders interactive SVG Diagram */}
      <div className="xlr-devops-media-wrapper">
        {hasValidImage ? (
          <img
            src={card.image.trim()}
            alt={card.title}
            onError={() => setImgError(true)}
            className="xlr-devops-card-img"
          />
        ) : (
          DIAGRAM_MAP[card.id] || <DevopsPipelineSvg />
        )}
      </div>

      {/* Card Content Body */}
      <div className="xlr-devops-card-body">
        <h3 className="xlr-devops-card-title">{card.title}</h3>
        <p className="xlr-devops-card-description">{card.subtitle || card.description}</p>
      </div>
    </div>
  );
}

export default DevopsCard;
