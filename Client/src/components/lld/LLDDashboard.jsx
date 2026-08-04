import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiArrowLeftLine,
  RiMenuLine,
  RiCloseLine,
  RiSearchLine,
  RiCheckLine,
  RiLockLine,
  RiLockUnlockLine,
  RiArrowRightSLine
} from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";
import "./LLDDashboard.css";

// 3-Bar Signal Strength Icon matching user reference screenshot
const SignalBarsIcon = ({ color = "#ef4444" }) => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="9" width="3.5" height="7" rx="1" fill={color} />
    <rect x="6.2" y="5" width="3.5" height="11" rx="1" fill={color} />
    <rect x="11.4" y="1" width="3.5" height="15" rx="1" fill={color} />
  </svg>
);

const MOCK_CATEGORIES = [
  {
    id: "lld-intro",
    title: "LLD Introduction",
    description: "Foundational concepts of Low Level Design covering comparisons, interview expectations, evaluation criteria, and design philosophies.",
    topics: [
      { id: "t1", title: "What is Low Level Design (LLD)?", importance: "high", openPercent: "95.65%" },
      { id: "t2", title: "LLD vs HLD", importance: "medium", openPercent: "82.18%" },
      { id: "t3", title: "LLD vs Machine Coding Round", importance: "high", openPercent: "79.42%" },
      { id: "t4", title: "Types of LLD Interviews", importance: "high", openPercent: "92.54%" },
      { id: "t5", title: "How LLD is evaluated in interviews", importance: "high", openPercent: "64.33%" },
      { id: "t6", title: "Functional Design vs Object-Oriented Design", importance: "medium", openPercent: "33.26%" },
      { id: "t7", title: "When NOT to use OOP", importance: "high", openPercent: "65.14%" }
    ]
  },
  {
    id: "oop-fundamentals",
    title: "OOP Fundamentals",
    description: "Core principles of Object-Oriented Programming, Encapsulation, Abstraction, Inheritance, and Polymorphism.",
    topics: [
      { id: "t8", title: "Encapsulation & Information Hiding", importance: "high", openPercent: "88.20%" },
      { id: "t9", title: "Abstraction vs Interface", importance: "high", openPercent: "91.10%" },
      { id: "t10", title: "Inheritance vs Composition", importance: "high", openPercent: "94.50%" },
      { id: "t11", title: "Polymorphism in Practice", importance: "medium", openPercent: "76.40%" }
    ]
  },
  {
    id: "class-relationships",
    title: "Class Relationships",
    description: "Association, Aggregation, Composition, Dependency, and Implementation relationships.",
    topics: [
      { id: "t12", title: "Association vs Aggregation", importance: "medium", openPercent: "70.15%" },
      { id: "t13", title: "Composition Deep Dive", importance: "high", openPercent: "85.30%" }
    ]
  },
  {
    id: "design-principles",
    title: "Design Principles",
    description: "DRY, KISS, YAGNI, Separation of Concerns, and Law of Demeter.",
    topics: [
      { id: "t14", title: "DRY & KISS Principles", importance: "high", openPercent: "89.00%" },
      { id: "t15", title: "Separation of Concerns", importance: "high", openPercent: "92.10%" }
    ]
  },
  {
    id: "solid-principles",
    title: "SOLID Principles",
    description: "Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.",
    topics: [
      { id: "t16", title: "Single Responsibility Principle (SRP)", importance: "high", openPercent: "96.40%" },
      { id: "t17", title: "Open/Closed Principle (OCP)", importance: "high", openPercent: "93.20%" },
      { id: "t18", title: "Liskov Substitution Principle (LSP)", importance: "high", openPercent: "87.90%" }
    ]
  },
  {
    id: "uml-diagrams",
    title: "UML Diagrams",
    description: "Class Diagrams, Sequence Diagrams, Use Case Diagrams, and State Machine Diagrams.",
    topics: [
      { id: "t19", title: "Class Diagram Symbols & Notation", importance: "high", openPercent: "82.00%" },
      { id: "t20", title: "Sequence Diagram Fundamentals", importance: "medium", openPercent: "74.50%" }
    ]
  },
  {
    id: "design-patterns-intro",
    title: "Design Patterns Introduction",
    description: "Overview of Gang of Four (GoF) patterns: Creational, Structural, and Behavioral.",
    topics: [
      { id: "t21", title: "History & Classification of GoF Patterns", importance: "medium", openPercent: "68.30%" }
    ]
  },
  {
    id: "creational-patterns",
    title: "Creational Design Patterns",
    description: "Factory Method, Abstract Factory, Builder, Singleton, Prototype patterns.",
    topics: [
      { id: "t22", title: "Singleton Pattern & Thread Safety", importance: "high", openPercent: "98.10%" },
      { id: "t23", title: "Factory Method vs Abstract Factory", importance: "high", openPercent: "94.20%" },
      { id: "t24", title: "Builder Pattern with Fluent API", importance: "high", openPercent: "91.80%" }
    ]
  },
  {
    id: "structural-patterns",
    title: "Structural Design Patterns",
    description: "Adapter, Decorator, Facade, Proxy, Composite, Flyweight, Bridge patterns.",
    topics: [
      { id: "t25", title: "Adapter Pattern", importance: "high", openPercent: "89.50%" },
      { id: "t26", title: "Decorator Pattern in Real Systems", importance: "high", openPercent: "92.70%" }
    ]
  },
  {
    id: "behavioral-patterns",
    title: "Behavioral Design Patterns",
    description: "Observer, Strategy, Command, Chain of Responsibility, State, Mediator patterns.",
    topics: [
      { id: "t27", title: "Strategy Pattern", importance: "high", openPercent: "95.00%" },
      { id: "t28", title: "Observer Pattern & Event Handling", importance: "high", openPercent: "93.40%" }
    ]
  },
  {
    id: "architectural-patterns",
    title: "Architectural & Practical Patterns (LLD Scope)",
    description: "Common architectural and practical design patterns used in low-level design to structure applications.",
    topics: [
      { id: "t29", title: "MVC Pattern", importance: "high", openPercent: "54.03%" },
      { id: "t30", title: "MVVM Pattern", importance: "high", openPercent: "44.62%" },
      { id: "t31", title: "Repository Pattern", importance: "high", openPercent: "31.51%" },
      { id: "t32", title: "Specification Pattern", importance: "high", openPercent: "51.09%" },
      { id: "t33", title: "Layered Architecture", importance: "low", openPercent: "40.82%" },
      { id: "t34", title: "Middlewares", importance: "high", openPercent: "46.50%" }
    ]
  },
  {
    id: "concurrency-lld",
    title: "Concurrency & Thread Safety (LLD Level)",
    description: "Multi-threading primitives, Locks, Mutexes, Semaphores, and Thread-Safe Data Structures.",
    topics: [
      { id: "t35", title: "Reentrant Locks & Synchronized Blocks", importance: "high", openPercent: "88.60%" },
      { id: "t36", title: "Producer-Consumer Queue Implementation", importance: "high", openPercent: "94.10%" }
    ]
  }
];

function LLDDashboard({
  categories = MOCK_CATEGORIES,
  courseTitle = "MASTER LOW LEVEL DESIGN",
  drawerTitle = "LLD Course Topics",
  weeksLabel = "WEEKS",
  onNavigateHome,
  onTopicSelect
}) {
  const [activeCategoryId, setActiveCategoryId] = useState("lld-intro");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { user, checkTopicAccess } = useAuth();
  const [completedTopicIds, setCompletedTopicIds] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState(null);

  // Prevent background body scroll when sidebar drawer is open on mobile
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  const activeCategory = categories.find((c) => c.id === activeCategoryId) || categories[0];
  const topicsList = activeCategory.topics || [];

  // Counts
  const totalTopicsInCourse = categories.reduce((sum, cat) => sum + (cat.topics ? cat.topics.length : 0), 0);
  const completedTopicsCount = completedTopicIds.length;
  const totalWeeksCount = categories.length;

  const totalInSection = topicsList.length;
  const completedInSection = topicsList.filter((t) => completedTopicIds.includes(t.id)).length;
  const sectionProgressPercent = totalInSection > 0 ? Math.round((completedInSection / totalInSection) * 100) : 0;

  // Filter topics based on search
  const filteredTopics = searchQuery.trim() === ""
    ? topicsList
    : topicsList.filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleToggleTopic = (topicId) => {
    setCompletedTopicIds((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  const handleSelectTopicRow = (topic, isUnlocked) => {
    if (!isUnlocked) {
      // Locked topic access attempt -> Redirect to checkout page!
      navigate("/payment/checkout");
      return;
    }
    setSelectedTopicId(topic.id);
    if (onTopicSelect) onTopicSelect(topic);
    // Close mobile drawer if open
    setIsSidebarOpen(false);
  };

  const handleCategoryClick = (catId) => {
    setActiveCategoryId(catId);
    setIsSidebarOpen(false);
  };

  const renderImportanceBadge = (importance, isCompact = false) => {
    const isHigh = importance === "high";
    const color = isHigh ? "#ef4444" : "#eab308";
    const label = isHigh
      ? isCompact ? "High" : "High importance"
      : isCompact ? "Medium" : "Medium importance";

    return (
      <div className={`lld-imp-badge ${isHigh ? "lld-imp-badge--high" : "lld-imp-badge--medium"}`}>
        <SignalBarsIcon color={color} />
        <span>{label}</span>
      </div>
    );
  };

  // SVG Progress Ring Circumference
  const RADIUS = 28;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  return (
    <div className="lld-dashboard-wrapper">
      {/* Mobile Top Navigation Bar (< 768px) */}
      <div className="lld-mobile-top-bar">
        <button
          type="button"
          className="lld-mobile-home-btn"
          onClick={() => (onNavigateHome ? onNavigateHome() : window.location.assign("/"))}
        >
          <RiArrowLeftLine size={18} />
          <span>Home</span>
        </button>

        <button
          type="button"
          className="lld-mobile-topics-btn"
          onClick={() => setIsSidebarOpen(true)}
        >
          <RiMenuLine size={18} />
          <span>Topics</span>
        </button>
      </div>

      {/* Off-Canvas Backdrop Overlay (< 768px) */}
      {isSidebarOpen && (
        <div
          className="lld-drawer-backdrop"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Dashboard Layout Container */}
      <div className="lld-dashboard-container">
        {/* Left Sidebar (Desktop & Mobile Drawer) */}
        <aside className={`lld-sidebar ${isSidebarOpen ? "lld-sidebar--open" : ""}`}>
          {/* Mobile Drawer Close Button */}
          <div className="lld-sidebar-drawer-header">
            <h3 className="lld-drawer-title">{drawerTitle}</h3>
            <button
              type="button"
              className="lld-drawer-close-btn"
              onClick={() => setIsSidebarOpen(false)}
              title="Close Topics Drawer"
            >
              <RiCloseLine size={22} />
            </button>
          </div>

          {/* Sidebar Overview Header & Progress Rings */}
          <div className="lld-sidebar-overview">
            <h2 className="lld-course-title">{courseTitle}</h2>
            <p className="lld-course-subtitle">0 skippable topic · covered 100%</p>

            <div className="lld-progress-rings-row">
              {/* Ring 1: TOPICS */}
              <div className="lld-ring-card">
                <div className="lld-ring-svg-wrapper">
                  <svg width="68" height="68" viewBox="0 0 68 68">
                    <circle cx="34" cy="34" r={RADIUS} className="lld-ring-bg" />
                    <circle
                      cx="34"
                      cy="34"
                      r={RADIUS}
                      className="lld-ring-fill"
                      style={{
                        strokeDasharray: CIRCUMFERENCE,
                        strokeDashoffset: CIRCUMFERENCE - (0 / 100) * CIRCUMFERENCE
                      }}
                    />
                  </svg>
                  <div className="lld-ring-center-text">
                    <span className="lld-ring-percent">0%</span>
                    <span className="lld-ring-subtext">{completedTopicsCount}/{totalTopicsInCourse}</span>
                  </div>
                </div>
                <span className="lld-ring-label">TOPICS</span>
              </div>

              {/* Ring 2: WEEKS / SECTIONS */}
              <div className="lld-ring-card">
                <div className="lld-ring-svg-wrapper">
                  <svg width="68" height="68" viewBox="0 0 68 68">
                    <circle cx="34" cy="34" r={RADIUS} className="lld-ring-bg" />
                    <circle
                      cx="34"
                      cy="34"
                      r={RADIUS}
                      className="lld-ring-fill"
                      style={{
                        strokeDasharray: CIRCUMFERENCE,
                        strokeDashoffset: CIRCUMFERENCE - (0 / 100) * CIRCUMFERENCE
                      }}
                    />
                  </svg>
                  <div className="lld-ring-center-text">
                    <span className="lld-ring-percent">0%</span>
                    <span className="lld-ring-subtext">0/{totalWeeksCount}</span>
                  </div>
                </div>
                <span className="lld-ring-label">{weeksLabel}</span>
              </div>
            </div>
          </div>

          {/* Scrollable Course Categories List */}
          <div className="lld-categories-list">
            {categories.map((cat) => {
              const isActive = cat.id === activeCategoryId;
              const catTotal = cat.topics ? cat.topics.length : 0;
              const catDone = cat.topics
                ? cat.topics.filter((t) => completedTopicIds.includes(t.id)).length
                : 0;

              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`lld-category-btn ${isActive ? "lld-category-btn--active" : ""}`}
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  <span className="lld-category-name">{cat.title}</span>
                  <div className="lld-category-badge">
                    <span>{catDone}/{catTotal}</span>
                    {isActive && <RiArrowRightSLine size={16} />}
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Main Content Area */}
        <main className="lld-main-content">
          {/* Header Row: Title & Search Button */}
          <div className="lld-main-header">
            <div className="lld-title-container">
              <h1 className="lld-active-title">{activeCategory.title}</h1>
              <button
                type="button"
                className="lld-search-toggle-btn"
                onClick={() => setIsSearchOpen((prev) => !prev)}
                title="Search topics"
              >
                <RiSearchLine size={18} />
              </button>
            </div>

            {isSearchOpen && (
              <div className="lld-search-box">
                <RiSearchLine size={18} className="lld-search-icon" />
                <input
                  type="text"
                  autoFocus
                  className="lld-search-input"
                  placeholder="Search LLD topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}

            <p className="lld-active-description">{activeCategory.description}</p>
          </div>

          {/* Progress Section */}
          <div className="lld-progress-section">
            <div className="lld-progress-track">
              <div
                className="lld-progress-fill"
                style={{ width: `${sectionProgressPercent}%` }}
              />
            </div>
            <span className="lld-progress-count">
              {completedInSection}/{totalInSection} completed
            </span>
          </div>

          {/* Topics Table Container */}
          <div className="lld-topics-table">
            {/* Table Column Headers */}
            <div className="lld-table-header">
              <span className="lld-col-status">STATUS</span>
              <span className="lld-col-topic">TOPIC</span>
              <span className="lld-col-imp">INTERVIEW IMP</span>
              <span className="lld-col-open">OPEN %</span>
              <span className="lld-col-progress">PROGRESS</span>
            </div>

            {/* Topic Item Rows */}
            {filteredTopics.map((topic, index) => {
              const isDone = completedTopicIds.includes(topic.id);
              const isSelected = selectedTopicId === topic.id;
              const isUnlocked = checkTopicAccess(index, "lld");

              return (
                <div
                  key={topic.id}
                  className={`lld-topic-row ${isSelected ? "lld-topic-row--selected" : ""} ${!isUnlocked ? "lld-topic-row--locked" : ""}`}
                >
                  {/* Radio / Status Checkbox Circle */}
                  <div className="lld-col-status">
                    <button
                      type="button"
                      className={`lld-status-circle ${isDone ? "lld-status-circle--done" : ""}`}
                      onClick={() => isUnlocked && handleToggleTopic(topic.id)}
                      title={isDone ? "Mark as uncompleted" : (isUnlocked ? "Mark as completed" : "Locked for free tier")}
                      disabled={!isUnlocked}
                    >
                      {isDone && <RiCheckLine size={13} />}
                    </button>
                  </div>

                  {/* Topic Title */}
                  <div
                    className="lld-col-topic"
                    onClick={() => handleSelectTopicRow(topic, isUnlocked)}
                  >
                    <span className={`lld-topic-title-text ${isDone ? "lld-topic-title-text--done" : ""}`}>
                      {topic.title}
                    </span>

                    {/* Compact Mobile Sub-Row Badge (< 768px) */}
                    <div className="lld-mobile-subrow-badge">
                      {renderImportanceBadge(topic.importance, true)}
                    </div>
                  </div>

                  {/* Importance Column (Desktop) */}
                  <div className="lld-col-imp">
                    {renderImportanceBadge(topic.importance, false)}
                  </div>

                  {/* Open % Column */}
                  <div className="lld-col-open">
                    <span className="lld-open-text">{topic.openPercent || "50.00%"}</span>
                  </div>

                  {/* Progress & Lock/Unlock Icon Column */}
                  <div className="lld-col-progress" onClick={() => handleSelectTopicRow(topic, isUnlocked)}>
                    {isUnlocked ? (
                      <RiLockUnlockLine className="lld-unlock-icon" size={16} color="#10b981" title="Unlocked" />
                    ) : (
                      <RiLockLine className="lld-lock-icon lld-lock-icon--locked" size={16} color="#ef4444" title="Subscription required — Click to unlock" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}

export default LLDDashboard;
