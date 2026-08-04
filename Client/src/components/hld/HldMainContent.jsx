import React, { useState } from "react";
import { RiSearchLine, RiCheckLine, RiLockLine } from "react-icons/ri";

// 3-Bar Signal Strength Icon matching user desktop screenshot
const SignalBarsIcon = ({ color = "#ef4444" }) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="9" width="3.5" height="7" rx="1" fill={color} />
    <rect x="6.2" y="5" width="3.5" height="11" rx="1" fill={color} />
    <rect x="11.4" y="1" width="3.5" height="15" rx="1" fill={color} />
  </svg>
);

function HldMainContent({
  activeSection,
  allSections,
  completedTopicIds,
  onToggleTopicStatus,
  onSelectTopic
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  if (!activeSection) return null;

  // Active section topics
  const topicsList = activeSection.topics || [];
  const totalInSection = topicsList.length;

  // Completed count in current active section
  const completedInSection = topicsList.filter((t) => completedTopicIds.includes(t.id)).length;
  const sectionProgressPercent = totalInSection > 0 ? Math.round((completedInSection / totalInSection) * 100) : 0;

  // Filter topics if search query is active
  const filteredTopics = searchQuery.trim() === ""
    ? topicsList
    : topicsList.filter((t) =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Importance Badge helper matching desktop screenshot
  const renderImportanceBadge = (importance) => {
    switch (importance) {
      case "high":
        return (
          <div className="xlr-hld-importance-badge xlr-hld-imp--high">
            <SignalBarsIcon color="#ef4444" />
            <span>High importance</span>
          </div>
        );
      case "medium":
        return (
          <div className="xlr-hld-importance-badge xlr-hld-imp--medium">
            <SignalBarsIcon color="#eab308" />
            <span>Medium importance</span>
          </div>
        );
      case "low":
      default:
        return (
          <div className="xlr-hld-importance-badge xlr-hld-imp--low">
            <SignalBarsIcon color="#64748b" />
            <span>Low importance</span>
          </div>
        );
    }
  };

  return (
    <main className="xlr-hld-main">
      {/* Header & Search Bar Row matching desktop screenshot */}
      <div className="xlr-hld-main-header-row">
        <div className="xlr-hld-title-row">
          <h1 className="xlr-hld-section-title">{activeSection.title}</h1>
          <button
            type="button"
            className="xlr-hld-search-icon-btn"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            title="Search topics"
          >
            <RiSearchLine size={18} />
          </button>
        </div>

        {isSearchOpen && (
          <div className="xlr-hld-search-input-box">
            <RiSearchLine size={18} color="#94a3b8" />
            <input
              type="text"
              autoFocus
              className="xlr-hld-search-input"
              placeholder="Search HLD topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        <p className="xlr-hld-section-description">{activeSection.description}</p>
      </div>

      {/* Section Progress Bar Track & Count matching desktop screenshot */}
      <div className="xlr-hld-progress-section">
        <div className="xlr-hld-progress-bar-track">
          <div
            className="xlr-hld-progress-bar-fill"
            style={{ width: `${sectionProgressPercent}%` }}
          />
        </div>
        <span className="xlr-hld-progress-count">
          {completedInSection}/{totalInSection} completed
        </span>
      </div>

      {/* Topics Table */}
      <div className="xlr-hld-topics-table">
        {/* Table Header */}
        <div className="xlr-hld-table-header">
          <span>STATUS</span>
          <span>TOPIC</span>
          <span>INTERVIEW IMP</span>
          <span>OPEN %</span>
          <span>PROGRESS</span>
        </div>

        {/* Topic Rows */}
        {filteredTopics.map((topic) => {
          const isDone = completedTopicIds.includes(topic.id);
          return (
            <div key={topic.id} className="xlr-hld-topic-row">
              {/* Status Checkbox Circle Button */}
              <div className="xlr-hld-status-col">
                <button
                  type="button"
                  className="xlr-hld-status-btn"
                  onClick={() => onToggleTopicStatus(topic.id)}
                  title={isDone ? "Mark as uncompleted" : "Mark as completed"}
                >
                  <div className={`xlr-hld-status-circle ${isDone ? "xlr-hld-status-circle--done" : ""}`}>
                    {isDone && <RiCheckLine size={13} />}
                  </div>
                </button>
              </div>

              {/* Topic Name */}
              <div
                className="xlr-hld-name-col"
                onClick={() => onSelectTopic && onSelectTopic(topic.id, topic.title)}
                style={{ cursor: "pointer" }}
              >
                <span className={`xlr-hld-topic-name ${isDone ? "xlr-hld-topic-name--done" : ""}`}>
                  {topic.title}
                </span>
              </div>

              {/* Interview Importance */}
              <div className="xlr-hld-imp-col">
                {renderImportanceBadge(topic.importance)}
              </div>

              {/* Open Percentage */}
              <div className="xlr-hld-open-col">
                <span className="xlr-hld-open-percent">{topic.openPercent || "50.00%"}</span>
              </div>

              {/* Progress & Lock Icon */}
              <div className="xlr-hld-progress-col">
                <span>—</span>
                <RiLockLine className="xlr-hld-lock-icon" size={16} />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default HldMainContent;
