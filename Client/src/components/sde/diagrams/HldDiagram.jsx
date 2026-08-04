import React from "react";
import { FiUser, FiZap, FiDatabase, FiShuffle, FiServer } from "react-icons/fi";

const HldDiagram = () => {
  return (
    <div className="sde-diagram sde-diagram--hld">
      <div className="sde-hld-grid-bg" />
      <div className="sde-hld-glow-radial" />

      {/* SVG Connecting Flow Lines & Laser Particles */}
      <svg className="sde-hld-svg-lines" viewBox="0 0 400 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="hldLaserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base Lines */}
        <path d="M 65 100 H 120" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" />
        <path d="M 175 100 C 195 100, 205 60, 225 60" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" />
        <path d="M 175 100 C 195 100, 205 140, 225 140" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" />
        <path d="M 285 60 C 305 60, 315 50, 335 50" stroke="rgba(234,179,8,0.3)" strokeWidth="1.5" fill="none" />
        <path d="M 285 140 C 305 140, 315 150, 335 150" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" fill="none" />

        {/* Animated Laser Paths */}
        <path d="M 65 100 H 120" stroke="url(#hldLaserGrad)" strokeWidth="2" fill="none" className="sde-laser-path" filter="url(#glow)" />
        <path d="M 175 100 C 195 100, 205 60, 225 60" stroke="url(#hldLaserGrad)" strokeWidth="2" fill="none" className="sde-laser-path sde-laser-delay-1" filter="url(#glow)" />
        <path d="M 175 100 C 195 100, 205 140, 225 140" stroke="url(#hldLaserGrad)" strokeWidth="2" fill="none" className="sde-laser-path sde-laser-delay-2" filter="url(#glow)" />
      </svg>

      <div className="sde-hld-nodes">
        
        {/* Client Node */}
        <div className="sde-hld-node sde-hld-node--client">
          <div className="sde-node-avatar"><FiUser /></div>
          <span className="sde-node-title">Client</span>
          <span className="sde-node-sub">Browser · App</span>
        </div>

        {/* Load Balancer Node */}
        <div className="sde-hld-node sde-hld-node--lb">
          <div className="sde-node-icon"><FiShuffle /></div>
          <span className="sde-node-title">Load Balancer</span>
          <span className="sde-node-sub">Routes traffic</span>
        </div>

        {/* App Servers Column */}
        <div className="sde-hld-servers-column">
          <div className="sde-hld-node sde-hld-node--server">
            <FiServer /> <span>App Server</span>
          </div>
          <div className="sde-hld-node sde-hld-node--server">
            <FiServer /> <span>App Server</span>
          </div>
        </div>

        {/* Storage Column */}
        <div className="sde-hld-storage-column">
          <div className="sde-hld-node sde-hld-node--cache">
            <FiZap className="sde-icon-zap" />
            <div className="sde-node-text-group">
              <span className="sde-node-title">Cache</span>
              <span className="sde-node-sub">Redis · Fast</span>
            </div>
          </div>

          <div className="sde-hld-node sde-hld-node--db">
            <FiDatabase className="sde-icon-db" />
            <div className="sde-node-text-group">
              <span className="sde-node-title">DB</span>
              <span className="sde-node-sub">SQL · Replicas</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HldDiagram;
