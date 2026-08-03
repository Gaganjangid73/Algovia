import React from "react";

function DevopsCloudSvg() {
  return (
    <div style={{ position: "relative", width: "100%", height: "230px", background: "#05070a", borderRadius: "16px 16px 0 0", overflow: "hidden" }}>
      {/* Background Grid Pattern */}
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.15 }}>
        <defs>
          <pattern id="cloud-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cloud-grid)" />
      </svg>

      <svg viewBox="0 0 420 230" style={{ width: "100%", height: "100%", position: "relative", zIndex: 2 }}>
        <defs>
          <filter id="cloud-node-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Live Traffic Label */}
        <text x="210" y="36" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="500" fontFamily="sans-serif">
          production traffic, live
        </text>

        {/* Connection Lines */}
        {/* User -> ALB */}
        <line x1="50" y1="120" x2="135" y2="120" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 2" />

        {/* ALB -> EC2 top, mid, bot */}
        <path d="M 175 120 L 225 70" stroke="#3b82f6" strokeWidth="2" />
        <line x1="175" y1="120" x2="225" y2="120" stroke="#3b82f6" strokeWidth="2" />
        <path d="M 175 120 L 225 170" stroke="#3b82f6" strokeWidth="2" />

        {/* EC2 top, mid, bot -> RDS */}
        <path d="M 275 70 L 335 120" stroke="#3b82f6" strokeWidth="2" />
        <line x1="275" y1="120" x2="335" y2="120" stroke="#3b82f6" strokeWidth="2" />
        <path d="M 275 170 L 335 120" stroke="#3b82f6" strokeWidth="2" />

        {/* Animated Laser Dot 1 (User -> ALB -> EC2 Mid -> RDS) */}
        <circle r="4.5" fill="#ffffff" filter="url(#cloud-node-glow)">
          <animate
            attributeName="cx"
            values="50;135;250;335"
            dur="2.2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            values="120;120;120;120"
            dur="2.2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Animated Laser Dot 2 (User -> ALB -> EC2 Bot -> RDS) */}
        <circle r="3.5" fill="#60a5fa" filter="url(#cloud-node-glow)">
          <animate
            attributeName="cx"
            values="50;135;250;335"
            dur="2.2s"
            begin="0.8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            values="120;120;170;120"
            dur="2.2s"
            begin="0.8s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Node 1: User */}
        <g transform="translate(45, 120)">
          <circle r="16" fill="#090d16" stroke="#3b82f6" strokeWidth="2" filter="url(#cloud-node-glow)" />
          <text x="0" y="38" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="500" fontFamily="sans-serif">
            user
          </text>
        </g>

        {/* Node 2: ALB */}
        <g transform="translate(135, 100)">
          <rect width="40" height="40" rx="8" fill="#090d16" stroke="#3b82f6" strokeWidth="2" filter="url(#cloud-node-glow)" />
          <circle cx="20" cy="20" r="5" fill="#3b82f6" />
          <text x="20" y="58" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="500" fontFamily="sans-serif">
            ALB
          </text>
        </g>

        {/* Node 3: EC2 Instances Cluster (3 Stacked Blue Border Boxes) */}
        <g>
          {/* EC2 Top */}
          <rect x="225" y="52" width="50" height="36" rx="6" fill="#090d16" stroke="#3b82f6" strokeWidth="2" />
          {/* EC2 Mid */}
          <rect x="225" y="102" width="50" height="36" rx="6" fill="#090d16" stroke="#3b82f6" strokeWidth="2" filter="url(#cloud-node-glow)" />
          {/* EC2 Bot */}
          <rect x="225" y="152" width="50" height="36" rx="6" fill="#090d16" stroke="#3b82f6" strokeWidth="2" />
          <text x="250" y="206" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="500" fontFamily="sans-serif">
            EC2
          </text>
        </g>

        {/* Node 4: RDS Database Cylinder */}
        <g transform="translate(335, 100)">
          <ellipse cx="20" cy="10" rx="18" ry="8" fill="#090d16" stroke="#3b82f6" strokeWidth="2" />
          <path d="M 2 10 L 2 30 A 18 8 0 0 0 38 30 L 38 10" fill="#090d16" stroke="#3b82f6" strokeWidth="2" filter="url(#cloud-node-glow)" />
          <path d="M 2 20 A 18 8 0 0 0 38 20" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="20" y="58" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="500" fontFamily="sans-serif">
            RDS
          </text>
        </g>
      </svg>
    </div>
  );
}

export default DevopsCloudSvg;
