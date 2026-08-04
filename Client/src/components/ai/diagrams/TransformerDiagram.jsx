import React from "react";
import "../../sde/diagrams/diagrams.css";

function TransformerDiagram() {
  return (
    <div className="xlr-diagram-container">
      <div className="xlr-diagram-grid-bg" />
      <div className="xlr-diagram-glow xlr-diagram-glow--blue" />

      <svg
        className="xlr-diagram-svg"
        viewBox="0 0 400 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 60 120 C 130 60, 190 60, 260 120"
          stroke="url(#blueFlow1)"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        <path
          d="M 60 120 C 130 180, 190 180, 260 120"
          stroke="url(#purpleFlow1)"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        <path
          d="M 260 120 L 340 120"
          stroke="#3b82f6"
          strokeWidth="2.5"
        />

        <circle className="xlr-laser-dot" cx="0" cy="0" r="4" fill="#60a5fa">
          <animateMotion
            path="M 60 120 C 130 60, 190 60, 260 120"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle className="xlr-laser-dot" cx="0" cy="0" r="4" fill="#a855f7">
          <animateMotion
            path="M 60 120 C 130 180, 190 180, 260 120"
            dur="2.5s"
            repeatCount="indefinite"
            begin="0.8s"
          />
        </circle>
        <circle className="xlr-laser-dot" cx="0" cy="0" r="4" fill="#38bdf8">
          <animateMotion
            path="M 260 120 L 340 120"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>

        <defs>
          <linearGradient id="blueFlow1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="purpleFlow1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.9" />
          </linearGradient>
        </defs>
      </svg>

      <div className="xlr-diagram-nodes">
        <div className="xlr-diagram-node" style={{ left: "40px", top: "100px" }}>
          <span className="xlr-node-icon">📥</span>
          <span className="xlr-node-label">Tokens</span>
        </div>

        <div className="xlr-diagram-node xlr-diagram-node--active" style={{ left: "190px", top: "95px" }}>
          <span className="xlr-node-icon">🧠</span>
          <span className="xlr-node-label">Self Attention</span>
        </div>

        <div className="xlr-diagram-node" style={{ left: "320px", top: "100px" }}>
          <span className="xlr-node-icon">✨</span>
          <span className="xlr-node-label">LLM Output</span>
        </div>
      </div>
    </div>
  );
}

export default TransformerDiagram;
