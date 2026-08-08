import React from "react";
import { NavLink } from "react-router-dom";
import {
  RiDashboard3Line,
  RiUser3Line,
  RiGraduationCapLine,
  RiBankCardLine,
  RiBookOpenLine,
  RiSettings4Line,
  RiLogoutBoxRLine
} from "react-icons/ri";
import { adminApi } from "../../services/adminApi";
import "./AdminSidebar.css";

export default function AdminSidebar({ pendingVerificationsCount = 2, onLogout }) {
  const handleLogoutClick = () => {
    adminApi.logout();
    if (onLogout) onLogout();
  };

  return (
    <aside className="admin-sidebar">
      {/* Brand Header */}
      <div className="admin-sidebar-header">
        <div className="admin-sidebar-logo">A</div>
        <div className="admin-sidebar-brand">
          <span className="admin-sidebar-brand-title">Algovia Admin</span>
          <span className="admin-sidebar-brand-sub">Command Center</span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="admin-sidebar-nav">
        <span className="admin-nav-section-title">Core Management</span>
        
        <NavLink
          to="/"
          className={({ isActive }) => `admin-nav-item ${isActive ? "admin-nav-item--active" : ""}`}
          end
        >
          <RiDashboard3Line size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) => `admin-nav-item ${isActive ? "admin-nav-item--active" : ""}`}
        >
          <RiUser3Line size={18} />
          <span>User Directory</span>
        </NavLink>

        <NavLink
          to="/students"
          className={({ isActive }) => `admin-nav-item ${isActive ? "admin-nav-item--active" : ""}`}
        >
          <RiGraduationCapLine size={18} />
          <span>Student Approvals</span>
          {pendingVerificationsCount > 0 && (
            <span className="admin-nav-badge">{pendingVerificationsCount}</span>
          )}
        </NavLink>

        <NavLink
          to="/payments"
          className={({ isActive }) => `admin-nav-item ${isActive ? "admin-nav-item--active" : ""}`}
        >
          <RiBankCardLine size={18} />
          <span>Payments Ledger</span>
        </NavLink>

        <span className="admin-nav-section-title">System & Content</span>

        <NavLink
          to="/content"
          className={({ isActive }) => `admin-nav-item ${isActive ? "admin-nav-item--active" : ""}`}
        >
          <RiBookOpenLine size={18} />
          <span>Curriculum Control</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) => `admin-nav-item ${isActive ? "admin-nav-item--active" : ""}`}
        >
          <RiSettings4Line size={18} />
          <span>System Settings</span>
        </NavLink>
      </nav>

      {/* Footer Profile & Logout */}
      <div className="admin-sidebar-footer">
        <div className="admin-user-profile-strip">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gagan"
            alt="Super Admin"
            className="admin-profile-avatar"
          />
          <div className="admin-profile-meta">
            <span className="admin-profile-name">Gagan Jangid</span>
            <span className="admin-profile-role">Super Principal Engineer</span>
          </div>

          <button
            type="button"
            className="admin-sidebar-logout-btn"
            onClick={handleLogoutClick}
            title="Log out from Admin Portal"
          >
            <RiLogoutBoxRLine size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
