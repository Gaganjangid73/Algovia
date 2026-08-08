import React, { useState, useEffect } from "react";
import { RiSearchLine, RiNotification3Line, RiRefreshLine, RiPulseLine, RiSunLine, RiMoonLine } from "react-icons/ri";
import "./AdminHeader.css";

export default function AdminHeader({ searchQuery, setSearchQuery, onRefresh }) {
  const [timeString, setTimeString] = useState("");
  const [theme, setTheme] = useState(() => localStorage.getItem("algovia_admin_theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("algovia_admin_theme", theme);
  }, [theme]);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <div className="admin-header-search">
          <RiSearchLine size={16} />
          <input
            type="text"
            placeholder="Search users, transactions, emails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-header-right">
        <div className="admin-header-time-pill">
          <RiPulseLine size={13} style={{ color: "#10b981", marginRight: "6px", verticalAlign: "middle" }} />
          <span>{timeString || "17:45:00 IST"}</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          type="button"
          className="admin-header-icon-btn"
          onClick={toggleTheme}
          title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
        >
          {theme === "dark" ? <RiSunLine size={18} color="#f59e0b" /> : <RiMoonLine size={18} color="#6366f1" />}
        </button>

        <button
          type="button"
          className="admin-header-icon-btn"
          onClick={onRefresh}
          title="Refresh Data"
        >
          <RiRefreshLine size={18} />
        </button>

        <button
          type="button"
          className="admin-header-icon-btn"
          title="Notifications"
        >
          <RiNotification3Line size={18} />
          <span className="admin-notif-dot" />
        </button>
      </div>
    </header>
  );
}
