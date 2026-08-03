import React, { useState } from "react";
import Primarybtn from "../button";
import { RiArrowRightSLine } from "react-icons/ri";
import TransformerDiagram from "./diagrams/TransformerDiagram";

const DIAGRAM_MAP = {
  "ai-engineering-complete": <TransformerDiagram />,
  "llm-fine-tuning": <TransformerDiagram />,
  "ai-agents-orchestration": <TransformerDiagram />
};

function AiCard({ card }) {
  const [imgError, setImgError] = useState(false);
  const hasValidImage = card.image && card.image.trim() !== "" && !imgError;

  return (
    <div className="xlr-sde-card">
      <div className="xlr-card-header-badge">
        <span className="xlr-badge">{card.badge || "MODULE"}</span>
      </div>

      <div className="xlr-card-diagram-wrapper">
        {hasValidImage ? (
          <img
            src={card.image}
            alt={card.title}
            onError={() => setImgError(true)}
            className="xlr-card-img"
          />
        ) : (
          DIAGRAM_MAP[card.id] || <TransformerDiagram />
        )}
      </div>

      <div className="xlr-card-content">
        <h3 className="xlr-card-title">{card.title}</h3>
        <p className="xlr-card-subtitle">{card.subtitle}</p>

        <div className="xlr-card-topics-list">
          {card.topics &&
            card.topics.map((topic, idx) => (
              <div className="xlr-card-topic-item" key={idx}>
                <span className="xlr-topic-bullet">•</span>
                <span className="xlr-topic-text">{topic}</span>
              </div>
            ))}
        </div>

        <div className="xlr-card-footer">
          <Primarybtn
            text="Explore Learning Path"
            icon={<RiArrowRightSLine size={19} />}
            className="xlr-navbtn"
          />
        </div>
      </div>
    </div>
  );
}

export default AiCard;
