import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiRocketLine,
  RiTeamLine,
  RiBarChartGroupedLine,
  RiShieldCheckLine,
  RiCloudLine,
  RiSmartphoneLine,
  RiLockPasswordLine
} from "react-icons/ri";
import { adminApi } from "../services/adminApi";
import "./AdminLoginPage.css";

export default function AdminLoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@algovia.io");
  const [password, setPassword] = useState("Gagan@0123");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await adminApi.login({ email: email.trim(), password });
      if (res.success && res.token) {
        if (onLoginSuccess) onLoginSuccess();
        navigate("/");
      } else {
        throw new Error(res.message || "Invalid admin credentials.");
      }
    } catch (err) {
      console.error("[AdminLoginPage] Error:", err);
      setErrorMessage(err.message || "Invalid admin credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="algovia-login-page">
      {/* Background Glowing Orbs */}
      <div className="algovia-orb algovia-orb--1" />
      <div className="algovia-orb algovia-orb--2" />

      {/* Left Side: Brand Marketing & Features */}
      <div className="algovia-login-left">
        <h1 className="algovia-login-headline">
          Power Your <br />
          <span className="algovia-gradient-text">Platform</span>
        </h1>

        <p className="algovia-login-desc">
          Experience the next evolution of Algovia Executive Management. Streamline operations,
          empower your platform engineers, and drive revenue growth with real-time system metrics.
        </p>

        {/* 6 Feature Chips */}
        <div className="algovia-feature-grid">
          <div className="algovia-feature-chip">
            <RiRocketLine color="#818cf8" /> Smart Automation
          </div>
          <div className="algovia-feature-chip">
            <RiTeamLine color="#818cf8" /> Team Centric
          </div>
          <div className="algovia-feature-chip">
            <RiBarChartGroupedLine color="#818cf8" /> Real-time Analytics
          </div>
          <div className="algovia-feature-chip">
            <RiShieldCheckLine color="#818cf8" /> Secure & Reliable
          </div>
          <div className="algovia-feature-chip">
            <RiCloudLine color="#818cf8" /> Cloud Native
          </div>
          <div className="algovia-feature-chip">
            <RiSmartphoneLine color="#818cf8" /> Mobile Ready
          </div>
        </div>

        {/* Stat Counters */}
        <div className="algovia-stat-row">
          <div className="algovia-stat-box">
            <span className="algovia-stat-num">10k+</span>
            <span className="algovia-stat-lbl">Active Subscribers</span>
          </div>
          <div className="algovia-stat-box">
            <span className="algovia-stat-num">99.9%</span>
            <span className="algovia-stat-lbl">Uptime SLA</span>
          </div>
        </div>

        <div className="algovia-quote-strip">
          "The most intuitive System Design platform we've ever built."
        </div>
      </div>

      {/* Right Side: White Card Container */}
      <div className="algovia-login-right">
        <div className="algovia-white-card">
          <h2 className="algovia-card-title">Welcome back</h2>
          <p className="algovia-card-subtitle">Login to your Algovia Admin Dashboard</p>

          {errorMessage && (
            <div className="algovia-login-error">
              {errorMessage}
            </div>
          )}

          <form className="algovia-login-form" onSubmit={handleSubmit}>
            <div className="algovia-form-group">
              <label className="algovia-form-label">
                EMAIL ADDRESS <span>*</span>
              </label>
              <input
                type="email"
                className="algovia-form-input"
                placeholder="admin@algovia.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="algovia-form-group">
              <label className="algovia-form-label">
                PASSWORD <span>*</span>
              </label>
              <input
                type="password"
                className="algovia-form-input"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="algovia-login-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Continue to Admin Portal"}
            </button>
          </form>

          <div className="algovia-card-footer">
            By logging in, you agree to Algovia's <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}
