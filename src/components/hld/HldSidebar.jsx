import React from "react";
import { RiArrowRightSLine } from "react-icons/ri";

function HldSidebar({
  sections,
  activeSectionId,
  onSelectSection,
  completedTopicIds
}) {
  // Calculate total topics & total sections metrics
  const totalTopics = sections.reduce((acc, sec) => acc + sec.topics.length, 0);
  const totalSections = sections.length;

  // Completed topics count
  const completedTopicsCount = Array.isArray(completedTopicIds) ? completedTopicIds.length : 0;
  const topicPercent = totalTopics > 0 ? Math.round((completedTopicsCount / totalTopics) * 100) : 0;

  // Completed sections count (section is completed if all its topics are checked)
  const completedSectionsCount = sections.filter((sec) =>
    sec.topics.length > 0 && sec.topics.every((t) => (completedTopicIds || []).includes(t.id))
  ).length;
  const sectionPercent = totalSections > 0 ? Math.round((completedSectionsCount / totalSections) * 100) : 0;

  // SVG Ring calculations (Radius 33 => Circumference ~ 207.345)
  const CIRCUMFERENCE = 207.345;
  const topicOffset = CIRCUMFERENCE - (topicPercent / 100) * CIRCUMFERENCE;
  const sectionOffset = CIRCUMFERENCE - (sectionPercent / 100) * CIRCUMFERENCE;

  return (
    <aside className="xlr-hld-sidebar">
      {/* Sidebar Header */}
      <div className="xlr-hld-sidebar-header">
        <h3 className="xlr-hld-sidebar-title">MASTER HIGH LEVEL DESIGN</h3>
        <p className="xlr-hld-sidebar-subtitle">0 skippable topic · covered 100%</p>
      </div>

      {/* Aesthetic Compact Progress Rings Section */}
      <div className="xlr-hld-rings-container">
        {/* Ring 1: TOPICS */}
        <div className="xlr-hld-ring-item">
          <div className="xlr-hld-ring-wrapper">
            <svg className="xlr-hld-ring-svg" viewBox="0 0 80 80">
              <circle className="xlr-hld-ring-bg" cx="40" cy="40" r="33" strokeWidth="4.5" fill="none" />
              <circle
                className="xlr-hld-ring-fill"
                cx="40"
                cy="40"
                r="33"
                strokeWidth="4.5"
                fill="none"
                style={{
                  strokeDasharray: CIRCUMFERENCE,
                  strokeDashoffset: topicOffset
                }}
              />
            </svg>
            <div className="xlr-hld-ring-text-container">
              <span className="xlr-hld-ring-percent">{topicPercent}%</span>
              <span className="xlr-hld-ring-fraction">{completedTopicsCount}/{totalTopics}</span>
            </div>
          </div>
          <span className="xlr-hld-ring-label">TOPICS</span>
        </div>

        {/* Center Vertical Divider Line */}
        <div className="xlr-hld-ring-divider" />

        {/* Ring 2: SECTIONS */}
        <div className="xlr-hld-ring-item">
          <div className="xlr-hld-ring-wrapper">
            <svg className="xlr-hld-ring-svg" viewBox="0 0 80 80">
              <circle className="xlr-hld-ring-bg" cx="40" cy="40" r="33" strokeWidth="4.5" fill="none" />
              <circle
                className="xlr-hld-ring-fill"
                cx="40"
                cy="40"
                r="33"
                strokeWidth="4.5"
                fill="none"
                style={{
                  strokeDasharray: CIRCUMFERENCE,
                  strokeDashoffset: sectionOffset
                }}
              />
            </svg>
            <div className="xlr-hld-ring-text-container">
              <span className="xlr-hld-ring-percent">{sectionPercent}%</span>
              <span className="xlr-hld-ring-fraction">{completedSectionsCount}/{totalSections}</span>
            </div>
          </div>
          <span className="xlr-hld-ring-label">SECTIONS</span>
        </div>
      </div>

      {/* 26 Sections Scrollable List */}
      <div className="xlr-hld-sections-list">
        {sections.map((sec) => {
          const isActive = sec.id === activeSectionId;
          const count = sec.topics.length;
          return (
            <button
              key={sec.id}
              type="button"
              className={`xlr-hld-section-btn ${isActive ? "xlr-hld-section-btn--active" : ""}`}
              onClick={() => onSelectSection(sec.id)}
            >
              <span>{sec.title}</span>
              <div className="xlr-hld-section-badge">
                <span>{count}</span>
                {isActive && <RiArrowRightSLine size={14} />}
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export default HldSidebar;
