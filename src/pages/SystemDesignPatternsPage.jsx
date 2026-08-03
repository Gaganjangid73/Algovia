import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RiSignalTowerLine, RiLockLine, RiLockUnlockLine, RiCheckLine } from "react-icons/ri";
import Announcementbar from "../components/announcementbar";
import Navbar from "../components/navbar";
import TopicDetailView from "../components/topicDetail/TopicDetailView";
import { SYSTEM_DESIGN_PATTERNS_SECTIONS, getAllPatternsFlat } from "../data/systemDesignPatternsData";
import "./SystemDesignPatternsPage.css";

const PATTERNS_COMPLETED_STORAGE_KEY = "algovia_sd_patterns_completed_ids";

export default function SystemDesignPatternsPage() {
  const { patternId } = useParams();
  const navigate = useNavigate();

  const [completedPatternIds, setCompletedPatternIds] = useState(() => {
    try {
      const saved = localStorage.getItem(PATTERNS_COMPLETED_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const allPatterns = getAllPatternsFlat();
  const safeCompletedIds = Array.isArray(completedPatternIds) ? completedPatternIds : [];

  // Toggle completion status
  const handleTogglePatternStatus = (idToToggle) => {
    if (!idToToggle) return;
    setCompletedPatternIds((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      let updated;
      if (safePrev.includes(idToToggle)) {
        updated = safePrev.filter((id) => id !== idToToggle);
      } else {
        updated = [...safePrev, idToToggle];
      }
      try {
        localStorage.setItem(PATTERNS_COMPLETED_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save patterns completion status:", e);
      }
      return updated;
    });
  };

  // Find active pattern if patternId is present
  const currentPattern = patternId
    ? allPatterns.find((p) => p.id === patternId || p.id.toLowerCase() === patternId.toLowerCase())
    : null;

  // Handle selecting a pattern in reading view
  const handleSelectTopic = (id) => {
    if (!id) return;
    navigate(`/system-design/interview-pattern/${id}`);
  };

  // If patternId is present in URL, render TopicDetailView layout directly!
  if (currentPattern) {
    return (
      <div className="xlr-sdp-layout">
        <header className="xlr-sticky-header">
          <Announcementbar />
          <Navbar />
        </header>

        <TopicDetailView
          topicId={currentPattern.id}
          topicTitle={currentPattern.title}
          courseType="SYSTEM_DESIGN_PATTERNS"
          sidebarTitle="SYSTEM DESIGN PATTERNS"
          allSections={SYSTEM_DESIGN_PATTERNS_SECTIONS}
          completedTopicIds={safeCompletedIds}
          onToggleTopicStatus={handleTogglePatternStatus}
          onSelectTopic={handleSelectTopic}
          onBackToOverview={() => navigate("/system-design/interview-pattern")}
        />
      </div>
    );
  }

  // Otherwise, render the Overview Table Page matching screenshots!
  return (
    <div className="xlr-sdp-layout">
      {/* Sticky Navigation */}
      <header className="xlr-sticky-header">
        <Announcementbar />
        <Navbar />
      </header>

      <div className="xlr-sdp-container">
        {/* Page Header */}
        <div className="xlr-sdp-header">
          <h1 className="xlr-sdp-title">Reusable System Design Patterns for Interviews</h1>
          <p className="xlr-sdp-subtitle">The building blocks behind every great system design answer.</p>
        </div>

        {/* Interview Tips Banner */}
        <div className="xlr-sdp-tips-card">
          <div className="xlr-sdp-tips-header">Interview Tips</div>
          <div className="xlr-sdp-tips-grid">
            <div className="xlr-sdp-tip-item">
              <span className="xlr-sdp-tip-num">01</span>
              <span className="xlr-sdp-tip-text">
                Each pattern solves a class of problems. Understand the why before the how.
              </span>
            </div>
            <div className="xlr-sdp-tip-item">
              <span className="xlr-sdp-tip-num">02</span>
              <span className="xlr-sdp-tip-text">
                In interviews, name the pattern first, then explain tradeoffs.
              </span>
            </div>
            <div className="xlr-sdp-tip-item">
              <span className="xlr-sdp-tip-num">03</span>
              <span className="xlr-sdp-tip-text">
                Most real systems combine 2 to 3 patterns. Look for overlaps.
              </span>
            </div>
            <div className="xlr-sdp-tip-item">
              <span className="xlr-sdp-tip-num">04</span>
              <span className="xlr-sdp-tip-text">
                Focus on scalability, fault tolerance, and consistency tradeoffs.
              </span>
            </div>
          </div>
        </div>

        {/* Patterns Table */}
        <div className="xlr-sdp-table-wrapper">
          <div className="xlr-sdp-table-header">
            <div className="xlr-sdp-col-num">#</div>
            <div className="xlr-sdp-col-pattern">PATTERN</div>
            <div className="xlr-sdp-col-imp">IMPORTANT</div>
            <div className="xlr-sdp-col-prod">USED IN PROD</div>
            <div className="xlr-sdp-col-done">DONE</div>
            <div className="xlr-sdp-col-access">ACCESS</div>
          </div>

          <div className="xlr-sdp-table-body">
            {allPatterns.map((pat) => {
              const isDone = safeCompletedIds.includes(pat.id);

              return (
                <div
                  key={pat.id}
                  className="xlr-sdp-table-row"
                  onClick={() => navigate(`/system-design/interview-pattern/${pat.id}`)}
                >
                  {/* Pattern Number Pill */}
                  <div className="xlr-sdp-col-num">
                    <span className="xlr-sdp-pattern-pill">Pattern #{pat.patternNum}</span>
                  </div>

                  {/* Pattern Title & Subtitle */}
                  <div className="xlr-sdp-col-pattern xlr-sdp-pattern-info">
                    <span className="xlr-sdp-pattern-title">{pat.title}</span>
                    <span className="xlr-sdp-pattern-subtitle">{pat.subtitle}</span>
                  </div>

                  {/* Importance */}
                  <div className="xlr-sdp-col-imp">
                    <div className="xlr-sdp-imp-badge">
                      <RiSignalTowerLine size={15} />
                      <span>{pat.importance}</span>
                    </div>
                  </div>

                  {/* Used in Prod */}
                  <div className="xlr-sdp-col-prod xlr-sdp-prod-cell">
                    <span className="xlr-sdp-prod-label">In Prod</span>
                    <div className="xlr-sdp-prod-bar-bg">
                      <div
                        className="xlr-sdp-prod-bar-fill"
                        style={{ width: pat.usedInProd }}
                      />
                    </div>
                    <span className="xlr-sdp-prod-percent">{pat.usedInProd}</span>
                  </div>

                  {/* Done Button */}
                  <div
                    className="xlr-sdp-col-done"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTogglePatternStatus(pat.id);
                    }}
                  >
                    <button type="button" className="xlr-sdp-done-btn">
                      {isDone ? (
                        <RiCheckLine size={20} color="#10b981" />
                      ) : (
                        <div className="xlr-sdp-done-circle" />
                      )}
                    </button>
                  </div>

                  {/* Access Badge */}
                  <div className="xlr-sdp-col-access">
                    {pat.accessLabel === "Unlocked" ? (
                      <div className="xlr-sdp-access-pill xlr-sdp-access--free">
                        <RiLockUnlockLine size={16} color="#10b981" />
                      </div>
                    ) : (
                      <div className="xlr-sdp-access-pill xlr-sdp-access--premium">
                        <RiLockLine size={13} color="#64748b" />
                        <span>Premium</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
