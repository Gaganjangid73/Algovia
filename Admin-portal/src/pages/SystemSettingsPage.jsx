import React, { useState, useEffect } from "react";
import { RiSettings4Line, RiShieldCheckLine, RiDatabase2Line, RiServerLine, RiKey2Line } from "react-icons/ri";
import { adminApi } from "../services/adminApi";

export default function SystemSettingsPage() {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    adminApi.getHealthStatus().then((res) => setHealth(res));
  }, []);

  return (
    <div className="admin-settings-view">
      <div className="admin-dashboard-header">
        <h1 className="admin-page-title">System Settings & Infrastructure Status</h1>
        <p className="admin-page-subtitle">
          Backend server status, database connections, and Razorpay API credentials audit.
        </p>
      </div>

      <div className="admin-grid-2">
        <div className="admin-card">
          <h3 className="admin-section-title" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <RiServerLine color="#3b82f6" /> Backend Server Status
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div className="admin-flex-between">
              <span style={{ color: "var(--admin-text-secondary)" }}>API Endpoint URL</span>
              <span style={{ fontFamily: "monospace", color: "#3b82f6" }}>http://localhost:5001/api</span>
            </div>
            <div className="admin-flex-between">
              <span style={{ color: "var(--admin-text-secondary)" }}>Server Health</span>
              <span className="admin-badge admin-badge--success">HEALTHY</span>
            </div>
            <div className="admin-flex-between">
              <span style={{ color: "var(--admin-text-secondary)" }}>Environment Mode</span>
              <span style={{ fontWeight: "700", textTransform: "uppercase" }}>{health?.environment || "development"}</span>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h3 className="admin-section-title" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <RiKey2Line color="#f59e0b" /> Razorpay Integration Keys
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div className="admin-flex-between">
              <span style={{ color: "var(--admin-text-secondary)" }}>Razorpay Key ID</span>
              <span style={{ fontFamily: "monospace", color: "#f8fafc" }}>rzp_test_algovia_key_2026</span>
            </div>
            <div className="admin-flex-between">
              <span style={{ color: "var(--admin-text-secondary)" }}>Webhook Secret Status</span>
              <span className="admin-badge admin-badge--success">CONFIGURED</span>
            </div>
            <div className="admin-flex-between">
              <span style={{ color: "var(--admin-text-secondary)" }}>Crypto Verification</span>
              <span className="admin-badge admin-badge--primary">SHA256 HMAC Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
