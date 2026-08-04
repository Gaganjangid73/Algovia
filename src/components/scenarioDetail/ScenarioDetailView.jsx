import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowLeftLine, RiCheckLine, RiExternalLinkLine, RiMoonLine, RiSunLine } from "react-icons/ri";
import { getScenarioDialogue } from "../../data/scenarioDialoguesData";
import "./ScenarioDetailView.css";

export default function ScenarioDetailView({ scenarioId, scenarioTitle, mode = "hld" }) {
  const navigate = useNavigate();
  const [isStudied, setIsStudied] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.getAttribute("data-theme") === "dark";
  });

  const dialogue = getScenarioDialogue(scenarioId, scenarioTitle);

  // Sync theme attribute with document root
  const toggleTheme = () => {
    const nextTheme = isDarkMode ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    setIsDarkMode(!isDarkMode);
  };

  // Check if current scenario is marked as studied in localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`algovia_scenario_studied_${scenarioId}`);
      if (saved) setIsStudied(JSON.parse(saved));
    } catch (e) {
      console.error("Failed to load scenario studied status", e);
    }
  }, [scenarioId]);

  const handleToggleStudied = () => {
    const next = !isStudied;
    setIsStudied(next);
    try {
      localStorage.setItem(`algovia_scenario_studied_${scenarioId}`, JSON.stringify(next));
    } catch (e) {
      console.error("Failed to save studied status", e);
    }
  };

  const backUrl = `/system-design-scenario?mode=${mode}`;

  return (
    <div className="xlr-scnd-layout">
      {/* Top Fixed Header Bar */}
      <header className="xlr-scnd-topbar">
        <div className="xlr-scnd-topbar-inner">
          <button type="button" className="xlr-scnd-back-btn" onClick={() => navigate(backUrl)}>
            <RiArrowLeftLine size={16} />
            <span>System Design Scenario Based</span>
          </button>

          <button type="button" className="xlr-scnd-theme-btn" onClick={toggleTheme} title="Toggle Theme">
            {isDarkMode ? <RiSunLine size={18} /> : <RiMoonLine size={18} />}
          </button>
        </div>
      </header>

      {/* Main Content Article Container */}
      <main className="xlr-scnd-container">
        {/* Main Title */}
        <h1 className="xlr-scnd-title">{dialogue.title}</h1>

        {/* Candidate Profile Header */}
        <div className="xlr-scnd-author-row">
          <div className="xlr-scnd-author-avatar">
            <img src={dialogue.candidate.avatar} alt={dialogue.candidate.name} onError={(e) => {
              e.target.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=Gagan";
            }} />
          </div>
          <div className="xlr-scnd-author-info">
            <div className="xlr-scnd-author-name-wrap">
              <span className="xlr-scnd-author-name">{dialogue.candidate.name}</span>
              <RiExternalLinkLine size={14} color="#94a3b8" />
            </div>
            <span className="xlr-scnd-author-role">{dialogue.candidate.role}</span>
          </div>
        </div>

        {/* Subtitle Intro Card */}
        <p className="xlr-scnd-intro">
          A real scenario-based interview that happened between <strong>{dialogue.candidate.name}</strong> and an <strong>Interviewer</strong>, based on situations that come up in actual engineering interviews.
        </p>

        {/* Dialogue Conversation Transcript Feed */}
        <div className="xlr-scnd-feed">
          {dialogue.dialogueBlocks.map((block) => {
            const isInterviewer = block.speaker === "interviewer";
            const speakerObj = isInterviewer ? dialogue.interviewer : dialogue.candidate;

            return (
              <div key={block.id} className="xlr-scnd-block-wrapper">
                <div className="xlr-scnd-block-header">
                  <div className="xlr-scnd-speaker-avatar">
                    <img src={speakerObj.avatar} alt={speakerObj.name} onError={(e) => {
                      e.target.src = isInterviewer
                        ? "https://api.dicebear.com/7.x/bottts/svg?seed=Manager"
                        : "https://api.dicebear.com/7.x/avataaars/svg?seed=Gagan";
                    }} />
                  </div>
                  <div className="xlr-scnd-speaker-meta">
                    <span className="xlr-scnd-speaker-name">{speakerObj.name}</span>
                    <span className="xlr-scnd-speaker-role">{speakerObj.role}</span>
                  </div>
                </div>

                <div className="xlr-scnd-block-content">
                  {/* Interviewer Question */}
                  {isInterviewer ? (
                    <h2 className="xlr-scnd-question-text">{block.text}</h2>
                  ) : (
                    /* Candidate Answer Content */
                    <div className="xlr-scnd-answer-body">
                      {block.paragraphs && block.paragraphs.map((p, idx) => (
                        <p key={idx} className="xlr-scnd-para">{p}</p>
                      ))}

                      {block.bulletHeader && (
                        <p className="xlr-scnd-bullet-header">{block.bulletHeader}</p>
                      )}

                      {block.bullets && (
                        <ul className="xlr-scnd-bullet-list">
                          {block.bullets.map((item, bIdx) => (
                            <li key={bIdx} className="xlr-scnd-bullet-item">{item}</li>
                          ))}
                        </ul>
                      )}

                      {block.closingText && (
                        <p className="xlr-scnd-closing-para">{block.closingText}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Mark as Studied Button */}
        <div className="xlr-scnd-footer-action">
          <button
            type="button"
            className={`xlr-scnd-studied-btn ${isStudied ? "xlr-scnd-studied-btn--active" : ""}`}
            onClick={handleToggleStudied}
          >
            <div className="xlr-scnd-check-icon-circle">
              <RiCheckLine size={14} color={isStudied ? "#ffffff" : "#64748b"} />
            </div>
            <span>{isStudied ? "Marked as Studied" : "Mark as Studied"}</span>
          </button>
        </div>
      </main>
    </div>
  );
}
