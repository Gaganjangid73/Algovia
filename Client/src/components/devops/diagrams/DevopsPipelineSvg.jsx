import React from "react";

function DevopsPipelineSvg() {
  return (
    <div style={{ position: "relative", width: "100%", height: "230px", background: "#05070a", borderRadius: "16px 16px 0 0", overflow: "hidden" }}>
      {/* Background Grid Pattern */}
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.15 }}>
        <defs>
          <pattern id="devops-pipeline-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#devops-pipeline-grid)" />
      </svg>

      <svg viewBox="0 0 400 230" style={{ width: "100%", height: "100%", position: "relative", zIndex: 2 }}>
        <defs>
          {/* Node Glow Filters */}
          <filter id="blue-node-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Laser Flow Gradient */}
          <linearGradient id="pipeline-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Pipeline Connection Line */}
        <line x1="60" y1="100" x2="340" y2="100" stroke="url(#pipeline-line-grad)" strokeWidth="3" />

        {/* Animated Laser Pulse Dots moving along line */}
        <circle r="4" fill="#ffffff" filter="url(#blue-node-glow)">
          <animate
            attributeName="cx"
            values="60;153.3;246.6;340;60"
            dur="2.5s"
            repeatCount="indefinite"
            keyTimes="0;0.33;0.66;0.99;1"
          />
          <animate attributeName="cy" values="100;100;100;100;100" dur="2.5s" repeatCount="indefinite" />
        </circle>

        {/* Node 1: Code */}
        <g transform="translate(60, 100)">
          <circle r="18" fill="#090d16" stroke="#3b82f6" strokeWidth="2.5" filter="url(#blue-node-glow)" />
          <circle r="6" fill="#3b82f6" />
          <text x="0" y="42" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="600" fontFamily="sans-serif">
            Code
          </text>
        </g>

        {/* Small Connector Dot 1 */}
        <circle cx="106" cy="100" r="3.5" fill="#ffffff" />

        {/* Node 2: Build */}
        <g transform="translate(153, 100)">
          <circle r="18" fill="#090d16" stroke="#3b82f6" strokeWidth="2.5" filter="url(#blue-node-glow)" />
          <circle r="6" fill="#3b82f6" />
          <text x="0" y="42" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="600" fontFamily="sans-serif">
            Build
          </text>
        </g>

        {/* Node 3: Test */}
        <g transform="translate(246, 100)">
          <circle r="18" fill="#090d16" stroke="#3b82f6" strokeWidth="2.5" filter="url(#blue-node-glow)" />
          <circle r="6" fill="#3b82f6" />
          <text x="0" y="42" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="600" fontFamily="sans-serif">
            Test
          </text>
        </g>

        {/* Node 4: Deploy (Has 2 white dots inside matching reference design!) */}
        <g transform="translate(340, 100)">
          <circle r="18" fill="#090d16" stroke="#3b82f6" strokeWidth="2.5" filter="url(#blue-node-glow)" />
          <circle cx="-5" cy="0" r="4.5" fill="#ffffff" />
          <circle cx="5" cy="0" r="4.5" fill="#ffffff" />
          <text x="0" y="42" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="600" fontFamily="sans-serif">
            Deploy
          </text>
        </g>

        {/* Pipeline Subtitle Label */}
        <text x="200" y="180" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="500" letterSpacing="0.8" fontFamily="monospace">
          commit → build → test → deploy
        </text>
      </svg>
    </div>
  );
}

export default DevopsPipelineSvg;
