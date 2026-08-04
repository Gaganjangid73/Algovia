import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { RiLock2Line, RiArrowRightLine } from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";
import Announcementbar from "../announcementbar";
import Navbar from "../navbar";
import "./ProtectedRoute.css";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, openAuthModal } = useAuth();
  const location = useLocation();

  const currentPath = location.pathname + location.search;

  useEffect(() => {
    if (!isAuthenticated) {
      openAuthModal(currentPath);
    }
  }, [isAuthenticated, currentPath, openAuthModal]);

  if (!isAuthenticated) {
    return (
      <div className="xlr-gate-layout">
        <header className="xlr-sticky-header">
          <Announcementbar />
          <Navbar />
        </header>

        <div className="xlr-gate-container">
          <div className="xlr-gate-card">
            <div className="xlr-gate-icon-circle">
              <RiLock2Line size={32} color="#3b82f6" />
            </div>

            <h2 className="xlr-gate-title">Sign In Required to Access Content</h2>
            <p className="xlr-gate-subtitle">
              This topic contains premium engineering patterns, production scenarios, and architecture breakdowns. Please sign in to unlock complete access.
            </p>

            <button
              type="button"
              className="xlr-gate-btn"
              onClick={() => openAuthModal(currentPath)}
            >
              <span>Sign In to Unlock</span>
              <RiArrowRightLine size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
