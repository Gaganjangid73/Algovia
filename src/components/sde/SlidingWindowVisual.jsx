import React from "react";

/**
 * Animated SVG visual representing Sliding Window & Two Pointers patterns.
 */
const SlidingWindowVisual = () => {
  const windowArray = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3];
  const twoPointersArray = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];

  return (
    <svg 
      viewBox="0 0 520 250" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="sde-diagram-svg"
      aria-label="Sliding Window and Two Pointers Pattern Visualization"
    >
      <defs>
        <pattern id="gridDot" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.8" fill="#2d3348" />
        </pattern>
        <filter id="blueGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Grid Background */}
      <rect width="100%" height="100%" fill="#090a0f" />
      <rect width="100%" height="100%" fill="url(#gridDot)" />

      {/* ===== SLIDING WINDOW SECTION ===== */}
      <text x="260" y="24" fill="#64748b" fontSize="10" fontWeight="bold" letterSpacing="1.5" textAnchor="middle">
        SLIDING WINDOW PATTERN
      </text>

      {/* Array Boxes */}
      {windowArray.map((val, i) => (
        <g key={`win-${i}`}>
          <rect x={40 + i * 44} y={38} width="36" height="36" rx="6" fill="#141722" stroke="#252b3b" strokeWidth="1" />
          <text x={58 + i * 44} y={61} fill="#e2e8f0" fontSize="13" fontWeight="bold" textAnchor="middle">
            {val}
          </text>
          <text x={58 + i * 44} y={87} fill="#475569" fontSize="8" textAnchor="middle">
            {i}
          </text>
        </g>
      ))}

      {/* Animated Sliding Window Box */}
      <g>
        <rect 
          x="36" 
          y="34" 
          width="176" 
          height="44" 
          rx="8" 
          fill="#2563eb" 
          fillOpacity="0.15" 
          stroke="#3b82f6" 
          strokeWidth="1.5" 
          strokeDasharray="4 3" 
          filter="url(#blueGlow)"
        >
          <animate attributeName="x" values="36;256;36" keyTimes="0;0.5;1" dur="7s" repeatCount="indefinite" />
        </rect>

        <g>
          <animateTransform 
            attributeName="transform" 
            type="translate" 
            values="0,0; 220,0; 0,0" 
            keyTimes="0;0.5;1" 
            dur="7s" 
            repeatCount="indefinite" 
          />
          <text x="44" y="30" fill="#60a5fa" fontSize="9" fontWeight="bold">L</text>
          <text x="204" y="30" fill="#60a5fa" fontSize="9" fontWeight="bold">R</text>
        </g>
      </g>

      <text x="260" y="106" fill="#475569" fontSize="8" letterSpacing="0.5" textAnchor="middle">
        Sliding Window · Subarray Problems
      </text>

      {/* Divider */}
      <line x1="60" y1="118" x2="460" y2="118" stroke="#1e2433" strokeWidth="1" strokeDasharray="3 3" />

      {/* ===== TWO POINTERS SECTION ===== */}
      <text x="260" y="136" fill="#64748b" fontSize="10" fontWeight="bold" letterSpacing="1.5" textAnchor="middle">
        TWO POINTERS PATTERN
      </text>

      <text x="58" y="148" fill="#3b82f6" fontSize="9" fontWeight="bold" textAnchor="middle">L</text>
      <text x="454" y="148" fill="#3b82f6" fontSize="9" fontWeight="bold" textAnchor="middle">R</text>

      {twoPointersArray.map((val, i) => {
        const isL = i === 0;
        const isR = i === 9;
        return (
          <g key={`tp-${i}`}>
            <rect 
              x={40 + i * 44} 
              y={154} 
              width="36" 
              height="36" 
              rx="6" 
              fill={isL || isR ? "#2563eb" : "#141722"} 
              stroke={isL || isR ? "#60a5fa" : "#252b3b"} 
              strokeWidth={isL || isR ? "1.5" : "1"} 
              filter={isL || isR ? "url(#blueGlow)" : "none"}
            />
            <text 
              x={58 + i * 44} 
              y={177} 
              fill={isL || isR ? "#ffffff" : "#e2e8f0"} 
              fontSize={val >= 10 ? "11.5" : "13"} 
              fontWeight="bold" 
              textAnchor="middle"
            >
              {val}
            </text>
            <text x={58 + i * 44} y={203} fill="#475569" fontSize="8" textAnchor="middle">
              {i}
            </text>
          </g>
        );
      })}

      <path d="M 58 208 H 454" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="58" cy="208" r="2.5" fill="#3b82f6" />
      <circle cx="454" cy="208" r="2.5" fill="#3b82f6" />

      <text x="260" y="226" fill="#475569" fontSize="8" letterSpacing="0.5" textAnchor="middle">
        Two Pointers · Target Sum
      </text>
    </svg>
  );
};

export default SlidingWindowVisual;
