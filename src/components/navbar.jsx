import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Algovia from "../assets/Algovia.png";
import { RiArrowDropDownLine, RiArrowRightSLine } from "react-icons/ri";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { SiCplusplus, SiPython, SiGo, SiJavascript } from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { useTheme } from "../context/ThemeContext";
import "./navbar.css";
import Primarybtn from "./button";
import { useNavDropdownData } from "../hooks/useNavDropdownData";

const Roles = ["SDE", "AI Engineer", "Devops"];

const ROLE_PATHS = {
  "SDE": "/",
  "AI Engineer": "/ai/engineering/home",
  "Devops": "/devops/engineering/home"
};

const ROLE_NAV_ITEMS = {
  "SDE": [
    {
      id: "system-design",
      title: "System Design",
      subtitle: "System Design (Complete One)",
      hasDropdown: true,
      dropdownType: "system-design"
    },
    {
      id: "dsa",
      title: "Data Structure & Algorithms",
      subtitle: "Master DSA Patterns & Core Concepts",
      hasDropdown: true,
      dropdownType: "dsa"
    },
    {
      id: "swe",
      title: "Software Engineer Bucket",
      subtitle: "Interview Preparation & Concepts",
      hasDropdown: true,
      dropdownType: "swe"
    },
    {
      id: "newsletter",
      title: "Engineering Newsletter",
      subtitle: "System Design stories, every week",
      hasDropdown: false
    }
  ],
  "AI Engineer": [
    {
      id: "ai-engineering",
      title: "AI Engineering (Complete One)",
      subtitle: "The Complete Learning Path, Step by Step",
      hasDropdown: true,
      dropdownType: "ai-engineering"
    },
    {
      id: "newsletter",
      title: "Engineering Newsletter",
      subtitle: "System Design stories, every week",
      hasDropdown: false
    }
  ],
  "Devops": [
    {
      id: "devops-engineering",
      title: "DevOps Engineering",
      subtitle: "Linux to Kubernetes to Production",
      hasDropdown: true,
      dropdownType: "devops-engineering"
    },
    {
      id: "cloud-interview",
      title: "Cloud For Interview",
      subtitle: "IAM to Serverless to Production",
      hasDropdown: false
    },
    {
      id: "newsletter",
      title: "Engineering Newsletter",
      subtitle: "System Design stories, every week",
      hasDropdown: false
    }
  ]
};

const renderLangIcon = (type) => {
  switch (type) {
    case "cpp":
      return <SiCplusplus className="xlr-lang-icon xlr-lang-icon--cpp" />;
    case "java":
      return <FaJava className="xlr-lang-icon xlr-lang-icon--java" />;
    case "python":
      return <SiPython className="xlr-lang-icon xlr-lang-icon--python" />;
    case "go":
      return <SiGo className="xlr-lang-icon xlr-lang-icon--go" />;
    case "js":
      return <SiJavascript className="xlr-lang-icon xlr-lang-icon--js" />;
    default:
      return null;
  }
};

function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { 
    systemDesignData, 
    dsaData, 
    sweBucketData, 
    aiEngineeringData, 
    devopsEngineeringData, 
    isLoading 
  } = useNavDropdownData();

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
              onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.id)}
              onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
            >
              <div className="xlr-navbar-item-bundle">
                <div className="xlr-navbar-item-name">{item.title}</div>
                <div className="xlr-navbar-item-subname">{item.subtitle}</div>
              </div>
              {item.hasDropdown && <RiArrowDropDownLine className="arrow-icon" size={25} />}

              {/* 1. Mega Menu Dropdown for System Design */}
              {item.dropdownType === "system-design" && activeDropdown === item.id && (
                <div className="xlr-megamenu-dropdown">
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
                <div className="xlr-dsa-dropdown">
                  <div className="xlr-dsa-dropdown-container">
                    <a href={dsaData.banner.url} className="xlr-dsa-banner">
                      <h4 className="xlr-dsa-banner-title">{dsaData.banner.title}</h4>
                      <p className="xlr-dsa-banner-subtitle">{dsaData.banner.subtitle}</p>
                    </a>
                    <div className="xlr-dsa-dropdown-body">
                      <h5 className="xlr-dsa-category-header">{dsaData.categoryHeader}</h5>
                      <div className="xlr-dsa-items-list">
                        {dsaData.items.map((subItem) => (
                          <a href={subItem.url} className="xlr-dsa-item-link" key={subItem.id}>
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
                <div className="xlr-megamenu-dropdown xlr-megamenu-dropdown--swe">
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
                <div className="xlr-megamenu-dropdown xlr-megamenu-dropdown--ai">
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

              {/* 5. Single Column Card Dropdown for DevOps Engineering */}
              {item.dropdownType === "devops-engineering" && activeDropdown === item.id && (
                <div className="xlr-devops-dropdown">
                  <div className="xlr-devops-dropdown-container">
                    <div className="xlr-devops-items-list">
                      {!isLoading &&
                        devopsEngineeringData.map((subItem) => (
                          <a href={subItem.url} className="xlr-devops-item-link" key={subItem.id}>
                            <span className="xlr-devops-item-title">{subItem.title}</span>
                            <span className="xlr-devops-item-subtitle">{subItem.subtitle}</span>
                          </a>
                        ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>
      </div>

      {/* Right Section: Role Toggle + Theme Toggle + Get Started Button */}
      <div className="xlr-navbar-right">
        <div className="xlr-Interview-roles">
          {Roles.map((item) => (
            <div
              key={item}
              className={currentRole === item ? "xlr-Interview-roles-active" : " "}
              onClick={() => handleRoleClick(item)}
            >
              {item}
            </div>
          ))}
        </div>

        <button
          className="xlr-theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          title={isDark ? "Light theme" : "Dark theme"}
        >
          {isDark ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
        </button>

        <Primarybtn className="xlr-navbtn" text="Get Started" icon={<RiArrowRightSLine size={19} />} />
      </div>
    </div>
  );
}

export default Navbar;
