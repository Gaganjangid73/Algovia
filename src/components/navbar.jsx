import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Algovia from "../assets/Algovia.png";
import Primarybtn from "./button";
import gaganAvatar from "../assets/Gagan.JPG";
import {
  RiArrowDropDownLine,
  RiArrowRightSLine,
  RiUserSettingsLine,
  RiBankCardLine,
  RiBugLine,
  RiLogoutBoxRLine
} from "react-icons/ri";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { useNavDropdownData } from "../hooks/useNavDropdownData";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { ROLE_NAV_ITEMS, ROLE_PATHS } from "../config/navigationConfig";
import "./navbar.css";

// Helper function to render language icons
const renderLangIcon = (type) => {
  switch (type) {
    case "cpp":
      return <span className="xlr-lang-icon xlr-lang-icon--cpp">C++</span>;
    case "java":
      return <span className="xlr-lang-icon xlr-lang-icon--java">Java</span>;
    case "python":
      return <span className="xlr-lang-icon xlr-lang-icon--python">Py</span>;
    case "js":
      return <span className="xlr-lang-icon xlr-lang-icon--js">JS</span>;
    case "go":
      return <span className="xlr-lang-icon xlr-lang-icon--go">Go</span>;
    default:
      return null;
  }
};

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);
  const profileMenuRef = useRef(null);

  const { 
    systemDesignData, 
    dsaData, 
    sweBucketData, 
    aiEngineeringData, 
    devopsEngineeringData, 
    isLoading 
  } = useNavDropdownData();

  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, openAuthModal, openProfileModal, logout } = useAuth();

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Determine current active role from URL location
  const getCurrentRole = () => {
    const path = location.pathname;
    if (path.startsWith("/ai")) return "AI Engineer";
    if (path.startsWith("/devops")) return "Devops";
    return "SDE";
  };

  const currentRole = getCurrentRole();

  const handleRoleClick = (role) => {
    const targetPath = ROLE_PATHS[role] || "/";
    navigate(targetPath);
  };

  // Robust hover management with grace period delay to prevent premature dropdown closing
  const handleMouseEnterItem = (itemId, hasDropdown) => {
    if (!hasDropdown) return;
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(itemId);
  };

  const handleMouseLeaveItem = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleDropdownContainerMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
  };

  const handleDropdownLinkClick = (subItem, e) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(null);
    if (e && e.preventDefault) e.preventDefault();

    const titleLower = (subItem?.title || "").toLowerCase();

    if (titleLower.includes("master low level") || subItem?.id === "lld-1") {
      navigate("/lld");
    } else if (titleLower.includes("approach") || subItem?.id === "lld-2" || subItem?.id === "lld-3") {
      navigate("/lld-designs");
    } else if (titleLower.includes("master high level") || subItem?.id === "hld-1") {
      navigate("/hld");
    } else if (titleLower.includes("scenarios") || subItem?.id === "edge-1") {
      navigate("/system-design-scenario?mode=hld");
    } else if (titleLower.includes("patterns") || subItem?.id === "edge-2") {
      navigate("/system-design/interview-pattern");
    } else if (subItem?.url && subItem.url !== "#") {
      navigate(subItem.url);
    } else if (titleLower.includes("low level")) {
      navigate("/lld");
    } else if (titleLower.includes("high level")) {
      navigate("/hld");
    }
  };

  const navItems = ROLE_NAV_ITEMS[currentRole] || ROLE_NAV_ITEMS["SDE"];

  return (
    <div className="xlr-navbar">
      {/* Left Section: Logo Branding + Nav Items List */}
      <div className="xlr-navbar-left">
        <div className="xlr-branding" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <div className="xlr-logoicon">
            <img src={Algovia} alt="logo" />
          </div>
          <div className="xlr-brandtext">
            <div className="xlr-brandname">
              Algovia<span>.io</span>
            </div>
            <div className="xlr-tagline">BUILT BY ENGINEER, FOR ENGINEERS</div>
          </div>
        </div>

        <div className="xlr-navbar-item-list">
          {navItems.map((item) => (
            <div
              className={`xlr-navbar-item ${activeDropdown === item.id ? "xlr-navbar-item--open" : ""}`}
              key={item.id}
              onMouseEnter={() => handleMouseEnterItem(item.id, item.hasDropdown)}
              onMouseLeave={handleMouseLeaveItem}
            >
              <div className="xlr-navbar-item-bundle">
                <div className="xlr-navbar-item-name">{item.title}</div>
                <div className="xlr-navbar-item-subname">{item.subtitle}</div>
              </div>
              {item.hasDropdown && <RiArrowDropDownLine className="arrow-icon" size={25} />}

              {/* 1. 3-Column Mega Menu Dropdown for System Design */}
              {item.dropdownType === "system-design" && activeDropdown === item.id && (
                <div
                  className="xlr-megamenu-dropdown"
                  onMouseEnter={handleDropdownContainerMouseEnter}
                  onMouseLeave={handleMouseLeaveItem}
                >
                  <div className="xlr-megamenu-container">
                    {!isLoading &&
                      systemDesignData.map((col) => (
                        <div className="xlr-megamenu-column" key={col.columnId}>
                          <h4 className="xlr-megamenu-col-header">{col.categoryTitle}</h4>
                          <div className="xlr-megamenu-items-list">
                            {col.items.map((subItem) => (
                              <a
                                href={subItem.url}
                                className="xlr-megamenu-item-link"
                                key={subItem.id}
                                onClick={(e) => handleDropdownLinkClick(subItem, e)}
                              >
                                <span className="xlr-megamenu-item-title">{subItem.title}</span>
                                <span className="xlr-megamenu-item-subtitle">{subItem.subtitle}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* 2. Single Column Card Dropdown for DSA */}
              {item.dropdownType === "dsa" && activeDropdown === item.id && dsaData && (
                <div
                  className="xlr-dsa-dropdown"
                  onMouseEnter={handleDropdownContainerMouseEnter}
                  onMouseLeave={handleMouseLeaveItem}
                >
                  <div className="xlr-dsa-dropdown-container">
                    <a
                      href={dsaData.banner.url}
                      className="xlr-dsa-banner"
                      onClick={(e) => handleDropdownLinkClick(dsaData.banner.url, e)}
                    >
                      <h4 className="xlr-dsa-banner-title">{dsaData.banner.title}</h4>
                      <p className="xlr-dsa-banner-subtitle">{dsaData.banner.subtitle}</p>
                    </a>
                    <div className="xlr-dsa-dropdown-body">
                      <h5 className="xlr-dsa-category-header">{dsaData.categoryHeader}</h5>
                      <div className="xlr-dsa-items-list">
                        {dsaData.items.map((subItem) => (
                          <a
                            href={subItem.url}
                            className="xlr-dsa-item-link"
                            key={subItem.id}
                            onClick={(e) => handleDropdownLinkClick(subItem.url, e)}
                          >
                            <span className="xlr-dsa-item-title">{subItem.title}</span>
                            <span className="xlr-dsa-item-subtitle">{subItem.subtitle}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. 4-Column Mega Menu Dropdown for Software Engineer Bucket */}
              {item.dropdownType === "swe" && activeDropdown === item.id && (
                <div
                  className="xlr-megamenu-dropdown xlr-megamenu-dropdown--swe"
                  onMouseEnter={handleDropdownContainerMouseEnter}
                  onMouseLeave={handleMouseLeaveItem}
                >
                  <div className="xlr-megamenu-container xlr-megamenu-container--4col">
                    {!isLoading &&
                      sweBucketData.map((col) => (
                        <div className="xlr-megamenu-column" key={col.columnId}>
                          <h4 className="xlr-megamenu-col-header">{col.categoryTitle}</h4>
                          <div className="xlr-megamenu-items-list">
                            {col.items.map((subItem) => (
                              <a
                                href={subItem.url}
                                className={`xlr-megamenu-item-link ${
                                  subItem.isLocked ? "xlr-megamenu-item-link--locked" : ""
                                }`}
                                key={subItem.id}
                                onClick={(e) => handleDropdownLinkClick(subItem.url, e)}
                              >
                                <div className="xlr-megamenu-item-title-row">
                                  {subItem.iconType && renderLangIcon(subItem.iconType)}
                                  <span className="xlr-megamenu-item-title">{subItem.title}</span>
                                  {subItem.isLocked && <FiLock className="xlr-item-lock-icon" />}
                                </div>

                                <span className="xlr-megamenu-item-subtitle">{subItem.subtitle}</span>

                                {subItem.badgeBtnText && (
                                  <div className="xlr-item-pill-btn">
                                    {subItem.badgeBtnText}
                                  </div>
                                )}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* 4. 5-Column Mega Menu Dropdown for AI Engineering */}
              {item.dropdownType === "ai-engineering" && activeDropdown === item.id && (
                <div
                  className="xlr-megamenu-dropdown xlr-megamenu-dropdown--ai"
                  onMouseEnter={handleDropdownContainerMouseEnter}
                  onMouseLeave={handleMouseLeaveItem}
                >
                  <div className="xlr-megamenu-container xlr-megamenu-container--5col">
                    {!isLoading &&
                      aiEngineeringData.map((col) => (
                        <div className="xlr-megamenu-column" key={col.columnId}>
                          <h4 className="xlr-megamenu-col-header">{col.categoryTitle}</h4>
                          <div className="xlr-megamenu-items-list">
                            {col.items.map((subItem) => (
                              <a
                                href={subItem.url}
                                className="xlr-megamenu-item-link"
                                key={subItem.id}
                                onClick={(e) => handleDropdownLinkClick(subItem.url, e)}
                              >
                                <span className="xlr-megamenu-item-title">{subItem.title}</span>
                                <span className="xlr-megamenu-item-subtitle">{subItem.subtitle}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* 5. DevOps Engineering Single Column Card Dropdown */}
              {item.dropdownType === "devops-engineering" && activeDropdown === item.id && (
                <div
                  className="xlr-devops-dropdown"
                  onMouseEnter={handleDropdownContainerMouseEnter}
                  onMouseLeave={handleMouseLeaveItem}
                >
                  <div className="xlr-devops-dropdown-container">
                    <div className="xlr-devops-dropdown-body">
                      <h5 className="xlr-devops-category-header">DevOps Engineering</h5>
                      <div className="xlr-devops-items-list">
                        {!isLoading &&
                          devopsEngineeringData.map((subItem) => (
                            <a
                              href={subItem.url}
                              className="xlr-devops-item-link"
                              key={subItem.id}
                              onClick={(e) => handleDropdownLinkClick(subItem.url, e)}
                            >
                              <span className="xlr-devops-item-title">{subItem.title}</span>
                              <span className="xlr-devops-item-subtitle">{subItem.subtitle}</span>
                            </a>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Section: Exact Reference Layout (Role Switcher -> Theme Toggle -> Get Started Button) */}
      <div className="xlr-navbar-right">
        {/* Role Switcher Pill Container */}
        <div className="xlr-role-switcher">
          <button
            className={`xlr-role-btn ${currentRole === "SDE" ? "xlr-role-btn--active" : ""}`}
            onClick={() => handleRoleClick("SDE")}
          >
            SDE
          </button>
          <button
            className={`xlr-role-btn ${currentRole === "AI Engineer" ? "xlr-role-btn--active" : ""}`}
            onClick={() => handleRoleClick("AI Engineer")}
          >
            AI Engineer
          </button>
          <button
            className={`xlr-role-btn ${currentRole === "Devops" ? "xlr-role-btn--active" : ""}`}
            onClick={() => handleRoleClick("Devops")}
          >
            Devops
          </button>
        </div>

        {/* Theme Switcher Button */}
        <button 
          className="xlr-theme-toggle" 
          onClick={toggleTheme}
          aria-label="Toggle dark/light theme"
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === "dark" ? (
            <MdOutlineDarkMode size={20} className="theme-icon dark-icon" />
          ) : (
            <MdOutlineLightMode size={20} className="theme-icon light-icon" />
          )}
        </button>

        {/* User Auth Profile Dropdown / Get Started Button */}
        {isAuthenticated ? (
          <div className="xlr-nav-profile-container" ref={profileMenuRef}>
            {/* Circular User Avatar with Sync Arrows Ring matching screenshot */}
            <button
              type="button"
              className="xlr-nav-avatar-btn"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              title="User Account"
            >
              <div className="xlr-nav-avatar-ring">
                <svg className="xlr-avatar-ring-svg" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="46" className="ring-path" />
                  <path d="M 96,50 A 46,46 0 0,1 50,96" className="ring-arrow-path" />
                  <path d="M 4,50 A 46,46 0 0,1 50,4" className="ring-arrow-path" />
                </svg>
                <img
                  src={gaganAvatar}
                  alt={user?.name || "Gagan Jangid"}
                  className="xlr-nav-avatar-img"
                  onError={(e) => {
                    e.target.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=Gagan";
                  }}
                />
              </div>
            </button>

            {/* Profile Dropdown Popup Menu matching user screenshot */}
            {isProfileMenuOpen && (
              <div className="xlr-profile-dropdown-card">
                {/* Header User Info */}
                <div className="xlr-profile-card-header">
                  <h4 className="xlr-profile-user-name">{user?.name || "Gagan Jangid"}</h4>
                  <span className="xlr-profile-user-plan">Free Plan</span>
                </div>

                {/* Menu Items List */}
                <div className="xlr-profile-card-body">
                  <button
                    type="button"
                    className="xlr-profile-menu-item"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      openProfileModal();
                    }}
                  >
                    <RiUserSettingsLine size={18} />
                    <span>Profile</span>
                  </button>

                  <button
                    type="button"
                    className="xlr-profile-menu-item"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                    }}
                  >
                    <RiBankCardLine size={18} />
                    <span>Subscription</span>
                  </button>

                  <button
                    type="button"
                    className="xlr-profile-menu-item"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                    }}
                  >
                    <RiBugLine size={18} />
                    <span>Bug & Request</span>
                  </button>
                </div>

                {/* Footer Logout Option */}
                <div className="xlr-profile-card-footer">
                  <button
                    type="button"
                    className="xlr-profile-menu-item xlr-profile-menu-item--logout"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      logout();
                    }}
                  >
                    <RiLogoutBoxRLine size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            className="xlr-nav-login-btn"
            onClick={() => openAuthModal()}
          >
            <span>Sign in</span>
            <RiArrowRightSLine size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
