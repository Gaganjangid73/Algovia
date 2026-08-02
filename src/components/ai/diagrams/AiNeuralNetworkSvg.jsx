import React from "react";

function AiNeuralNetworkSvg() {
  return (
    <div style={{ position: "relative", width: "100%", height: "270px", background: "#05070a", borderRadius: "16px 16px 0 0", overflow: "hidden" }}>
      {/* Background Subtle Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px)",
          backgroundSize: "16px 16px"
        }}
      />
      {/* Radial Blue Glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "320px",
          height: "220px",
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.35) 0%, rgba(59, 130, 246, 0.05) 70%, transparent 100%)",
          filter: "blur(28px)",
          pointerEvents: "none"
        }}
      />

      <svg
        width="100%"
        height="100%"
        viewBox="0 0 500 270"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "relative", zIndex: 2 }}
      >
        {/* Layer 1 to Layer 2 Connections */}
        <path d="M 60 60 L 150 45 M 60 60 L 150 110 M 60 60 L 150 175" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" />
        <path d="M 60 135 L 150 45 M 60 135 L 150 110 M 60 135 L 150 175 M 60 135 L 150 220" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" />
        <path d="M 60 210 L 150 110 M 60 210 L 150 175 M 60 210 L 150 220" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" />

        {/* Layer 2 to Layer 3 Connections */}
        <path d="M 150 45 L 260 35 M 150 45 L 260 95 M 150 45 L 260 155" stroke="rgba(59, 130, 246, 0.35)" strokeWidth="1" />
        <path d="M 150 110 L 260 95 M 150 110 L 260 155 M 150 110 L 260 215" stroke="rgba(59, 130, 246, 0.35)" strokeWidth="1" />
        <path d="M 150 175 L 260 155 M 150 175 L 260 215 M 150 175 L 260 245" stroke="rgba(59, 130, 246, 0.35)" strokeWidth="1" />
        <path d="M 150 220 L 260 215 M 150 220 L 260 245" stroke="rgba(59, 130, 246, 0.35)" strokeWidth="1" />

        {/* Layer 3 to Layer 4 Connections */}
        <path d="M 260 35 L 370 60 M 260 35 L 370 135" stroke="rgba(96, 165, 250, 0.4)" strokeWidth="1.2" />
        <path d="M 260 95 L 370 60 M 260 95 L 370 135 M 260 95 L 370 210" stroke="rgba(96, 165, 250, 0.4)" strokeWidth="1.2" />
        <path d="M 260 155 L 370 135 M 260 155 L 370 210" stroke="rgba(96, 165, 250, 0.4)" strokeWidth="1.2" />
        <path d="M 260 215 L 370 210" stroke="rgba(96, 165, 250, 0.4)" strokeWidth="1.2" />

        {/* Layer 4 to Layer 5 Output Connections */}
        <path d="M 370 60 L 450 85 M 370 60 L 450 175" stroke="#3b82f6" strokeWidth="1.5" />
        <path d="M 370 135 L 450 85 M 370 135 L 450 175" stroke="#3b82f6" strokeWidth="1.5" />
        <path d="M 370 210 L 450 175" stroke="#3b82f6" strokeWidth="1.5" />

        {/* Traveling Particles */}
        <circle cx="0" cy="0" r="3" fill="#60a5fa">
          <animateMotion path="M 60 60 L 150 110 L 260 95 L 370 60 L 450 85" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="0" cy="0" r="3" fill="#a855f7">
          <animateMotion path="M 60 135 L 150 175 L 260 155 L 370 135 L 450 175" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
        </circle>
        <circle cx="0" cy="0" r="3" fill="#38bdf8">
          <animateMotion path="M 60 210 L 150 220 L 260 215 L 370 210 L 450 175" dur="2.8s" repeatCount="indefinite" begin="1s" />
        </circle>

        {/* Layer 1 Nodes (Input) */}
        {[[60, 60], [60, 135], [60, 210]].map(([cx, cy], i) => (
          <g key={`l1-${i}`}>
            <circle cx={cx} cy={cy} r="10" fill="rgba(37, 99, 235, 0.25)" />
            <circle cx={cx} cy={cy} r="6" fill="#2563eb" stroke="#60a5fa" strokeWidth="2" />
            <circle cx={cx} cy={cy} r="2" fill="#ffffff" />
          </g>
        ))}

        {/* Layer 2 Nodes */}
        {[[150, 45], [150, 110], [150, 175], [150, 220]].map(([cx, cy], i) => (
          <g key={`l2-${i}`}>
            <circle cx={cx} cy={cy} r="10" fill="rgba(37, 99, 235, 0.25)" />
            <circle cx={cx} cy={cy} r="6" fill="#2563eb" stroke="#60a5fa" strokeWidth="2" />
            <circle cx={cx} cy={cy} r="2" fill="#ffffff" />
          </g>
        ))}

        {/* Layer 3 Nodes */}
        {[[260, 35], [260, 95], [260, 155], [260, 215], [260, 245]].map(([cx, cy], i) => (
          <g key={`l3-${i}`}>
            <circle cx={cx} cy={cy} r="10" fill="rgba(37, 99, 235, 0.25)" />
            <circle cx={cx} cy={cy} r="6" fill="#2563eb" stroke="#60a5fa" strokeWidth="2" />
            <circle cx={cx} cy={cy} r="2" fill="#ffffff" />
          </g>
        ))}

        {/* Layer 4 Nodes */}
        {[[370, 60], [370, 135], [370, 210]].map(([cx, cy], i) => (
          <g key={`l4-${i}`}>
            <circle cx={cx} cy={cy} r="12" fill="rgba(59, 130, 246, 0.3)" />
            <circle cx={cx} cy={cy} r="7" fill="#3b82f6" stroke="#93c5fd" strokeWidth="2" />
            <circle cx={cx} cy={cy} r="2.5" fill="#ffffff" />
          </g>
        ))}

        {/* Layer 5 Output Nodes */}
        {[[450, 85], [450, 175]].map(([cx, cy], i) => (
          <g key={`l5-${i}`}>
            <circle cx={cx} cy={cy} r="14" fill="rgba(59, 130, 246, 0.35)" />
            <circle cx={cx} cy={cy} r="8" fill="#60a5fa" stroke="#ffffff" strokeWidth="2" />
            <circle cx={cx} cy={cy} r="3" fill="#ffffff" />
          </g>
        ))}
      </svg>
    </div>
  );
}

export default AiNeuralNetworkSvg;
