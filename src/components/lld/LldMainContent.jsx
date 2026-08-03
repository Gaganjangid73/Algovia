import React, { useState } from "react";
import { RiSearchLine, RiCheckLine, RiLockLine, RiSignalTowerLine } from "react-icons/ri";

function LldMainContent({
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
  const completedInSection = topicsList.filter((t) => (completedTopicIds || []).includes(t.id)).length;
  const sectionProgressPercent = totalInSection > 0 ? Math.round((completedInSection / totalInSection) * 100) : 0;

  // Filter topics if search query is active
  const filteredTopics = searchQuery.trim() === ""
    ? topicsList
    : topicsList.filter((t) =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Importance Badge helper
  const renderImportanceBadge = (importance) => {
    switch (importance) {
      case "high":
        return (
          <div className="xlr-hld-importance-badge xlr-hld-imp--high">
            <RiSignalTowerLine size={15} />
            <span>High importance</span>
          </div>
        );
      case "medium":
        return (
          <div className="xlr-hld-importance-badge xlr-hld-imp--medium">
            <RiSignalTowerLine size={15} />
            <span>Medium importance</span>
          </div>
        );
      case "low":
      default:
        return (
          <div className="xlr-hld-importance-badge xlr-hld-imp--low">
            <RiSignalTowerLine size={15} />
            <span>Low importance</span>
          </div>
        );
    }
  };

  return (
    <main className="xlr-hld-main">
      {/* Header & Search Bar Row */}
      <div className="xlr-hld-main-header-row">
        <div className="xlr-hld-main-header-text">
          <h1 className="xlr-hld-section-title">{activeSection.title}</h1>
          <p className="xlr-hld-section-description">{activeSection.description}</p>
        </div>

        {/* Expandable Search Input / Button */}
        <div className="xlr-hld-search-wrapper">
          {isSearchOpen ? (
            <div className="xlr-hld-search-input-box">
              <RiSearchLine size={16} color="#94a3b8" />
              <input
                type="text"
                autoFocus
                className="xlr-hld-search-input"
                placeholder="Search LLD topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => {
                  if (searchQuery.trim() === "") setIsSearchOpen(false);
                }}
              />
            </div>
          ) : (
            <button
              type="button"
              className="xlr-hld-search-icon-btn"
              onClick={() => setIsSearchOpen(true)}
              title="Search LLD topics"
            >
              <RiSearchLine size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Section Progress Bar */}
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
          const isDone = (completedTopicIds || []).includes(topic.id);
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

export default LldMainContent;
