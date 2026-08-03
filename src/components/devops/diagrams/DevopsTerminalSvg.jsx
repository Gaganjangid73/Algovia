import React from "react";

function DevopsTerminalSvg() {
  return (
    <div style={{ position: "relative", width: "100%", height: "230px", background: "#05070a", borderRadius: "16px 16px 0 0", overflow: "hidden" }}>
      {/* Background Grid */}
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.12 }}>
        <defs>
          <pattern id="term-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#term-grid)" />
      </svg>

      {/* Linux Terminal Dropdown & Code Mockup */}
      <div style={{ padding: "16px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "10px" }}>
        {/* Terminal Header Bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 12px", background: "#0f172a", borderRadius: "8px", border: "1px solid #1e293b" }}>
          <div style={{ display: "flex", gap: "6px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444" }} />
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f59e0b" }} />
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981" }} />
          </div>
          <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#64748b" }}>bash - devops@ubuntu:~</span>
        </div>

        {/* Terminal Content Mockup */}
        <div style={{ position: "relative", flex: 1, background: "#090d16", borderRadius: "8px", border: "1px solid #1e293b", padding: "14px", fontFamily: "monospace", fontSize: "12px", color: "#94a3b8", display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <span style={{ color: "#10b981", fontWeight: "bold" }}>$</span>
            <span style={{ color: "#38bdf8" }}>chmod +x deploy.sh && ./deploy.sh</span>
          </div>
          <div style={{ color: "#64748b", fontSize: "11px" }}>[+] Checking Linux kernel & process permissions... OK</div>
          <div style={{ color: "#64748b", fontSize: "11px" }}>[+] Initializing SSH keys & systemd service... OK</div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "4px" }}>
            <span style={{ color: "#10b981", fontWeight: "bold" }}>$</span>
            <span style={{ color: "#ffffff" }}>systemctl status nginx.service</span>
            <span style={{ display: "inline-block", width: "7px", height: "14px", background: "#3b82f6", animation: "blink 1s infinite" }} />
          </div>

          {/* Floating Dropdown Overlay Preview matching Screenshot */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              width: "180px",
              background: "rgba(15, 23, 42, 0.95)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(59, 130, 246, 0.4)",
              borderRadius: "10px",
              padding: "8px",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.6)",
              display: "flex",
              flexDirection: "column",
              gap: "4px"
            }}
          >
            <div style={{ fontSize: "10.5px", fontWeight: "bold", color: "#3b82f6", padding: "4px 8px", background: "rgba(59, 130, 246, 0.12)", borderRadius: "4px" }}>
              Linux & Bash Core
            </div>
            <div style={{ fontSize: "10px", color: "#e2e8f0", padding: "3px 8px" }}>• Shell & Commands</div>
            <div style={{ fontSize: "10px", color: "#e2e8f0", padding: "3px 8px" }}>• Users & Permissions</div>
            <div style={{ fontSize: "10px", color: "#e2e8f0", padding: "3px 8px" }}>• Systemd & Networking</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DevopsTerminalSvg;
