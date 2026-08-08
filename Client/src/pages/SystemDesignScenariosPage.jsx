import React, { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  RiSignalTowerLine,
  RiCheckLine,
  RiDatabase2Line,
  RiCodeSSlashLine,
  RiPulseLine,
  RiCpuLine,
  RiMessage3Line,
  RiShieldCheckLine,
  RiLockPasswordLine,
  RiGitBranchLine,
  RiShape2Line,
  RiRamLine,
  RiExchangeDollarLine,
  RiRocketLine,
  RiBrainLine,
  RiQuestionnaireLine,
  RiLock2Line,
  RiLockUnlockLine
} from "react-icons/ri";
import { useAuth } from "../context/AuthContext";
import Announcementbar from "../components/announcementbar";
import Navbar from "../components/navbar";
import TopicDetailView from "../components/topicDetail/TopicDetailView";
import ScenarioDetailView from "../components/scenarioDetail/ScenarioDetailView";
import {
  HLD_SCENARIO_CATEGORIES,
  LLD_SCENARIO_CATEGORIES,
  getAllScenariosFlat
} from "../data/systemDesignScenariosData";
import "./SystemDesignScenariosPage.css";

const SCENARIOS_COMPLETED_KEY = "algovia_sd_scenarios_completed_ids";

export default function SystemDesignScenariosPage() {
  const { scenarioId } = useParams();
  const navigate = useNavigate();
  const { checkTopicAccess } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const rawMode = (searchParams.get("mode") || "hld").toLowerCase();
  const activeTab = rawMode === "lld" ? "LLD" : "HLD";

  const [completedIds, setCompletedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(SCENARIOS_COMPLETED_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleToggleTab = (tab) => {
    setSearchParams({ mode: tab.toLowerCase() });
  };

  const handleToggleDone = (id) => {
    setCompletedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(SCENARIOS_COMPLETED_KEY, JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const handleScenarioClick = (scId, scTitle, isUnlocked) => {
    if (!isUnlocked) {
      navigate("/payment/checkout");
      return;
    }
    navigate(`/system-design-scenario/${scId}?mode=${activeTab.toLowerCase()}`);
  };

  // Aesthetic Category Icon Mapper
  const getCategoryIcon = (catId) => {
    switch (catId) {
      case "storage":
        return <RiDatabase2Line size={18} color="#3b82f6" />;
      case "api":
        return <RiCodeSSlashLine size={18} color="#10b981" />;
      case "real-time":
        return <RiPulseLine size={18} color="#ec4899" />;
      case "scalability":
        return <RiCpuLine size={18} color="#8b5cf6" />;
      case "messaging":
        return <RiMessage3Line size={18} color="#f59e0b" />;
      case "reliability":
        return <RiShieldCheckLine size={18} color="#06b6d4" />;
      case "security":
        return <RiLockPasswordLine size={18} color="#ef4444" />;
      case "concurrency":
        return <RiGitBranchLine size={18} color="#f97316" />;
      case "design-patterns":
        return <RiShape2Line size={18} color="#6366f1" />;
      case "caching":
      case "memory-caching":
        return <RiRamLine size={18} color="#14b8a6" />;
      case "transactions":
        return <RiExchangeDollarLine size={18} color="#10b981" />;
      case "resilience":
        return <RiShieldCheckLine size={18} color="#06b6d4" />;
      case "deployment":
        return <RiRocketLine size={18} color="#3b82f6" />;
      case "ai-ml":
        return <RiBrainLine size={18} color="#a855f7" />;
      default:
        return <RiQuestionnaireLine size={18} color="#94a3b8" />;
    }
  };

  // Active Category Dataset
  const activeCategories = activeTab === "HLD" ? HLD_SCENARIO_CATEGORIES : LLD_SCENARIO_CATEGORIES;

  // If scenarioId is present in URL, render ScenarioDetailView conversation layout
  if (scenarioId) {
    const allFlat = getAllScenariosFlat();
    const activeScenarioObj = allFlat.find((s) => s.id === scenarioId) || {
      id: scenarioId,
      title: scenarioId.replace(/-/g, " ")
    };

    return (
      <ScenarioDetailView
        scenarioId={activeScenarioObj.id}
        scenarioTitle={activeScenarioObj.title}
        mode={activeTab.toLowerCase()}
      />
    );
  }

  // Importance renderer
  const renderImportance = (imp) => {
    if (imp === "high") {
      return (
        <div className="xlr-sds-imp xlr-sds-imp--high">
          <RiSignalTowerLine size={15} />
          <span>High</span>
        </div>
      );
    }
    if (imp === "medium") {
      return (
        <div className="xlr-sds-imp xlr-sds-imp--medium">
          <RiSignalTowerLine size={15} />
          <span>Medium</span>
        </div>
      );
    }
    return (
      <div className="xlr-sds-imp xlr-sds-imp--low">
        <RiSignalTowerLine size={15} />
        <span>Low</span>
      </div>
    );
  };

  const allFlatScenarios = getAllScenariosFlat(activeTab.toLowerCase());

  return (
    <div className="xlr-sds-page-wrapper">
      <Announcementbar />
      <Navbar />

      <main className="xlr-sds-container">
        {/* Header Hero Section */}
        <div className="xlr-sds-hero">
          <div className="xlr-sds-hero-text">
            <h1 className="xlr-sds-title">System Design Scenarios</h1>
            <p className="xlr-sds-subtitle">
              Master real-world engineering trade-offs, architecture choices, and scenario-based interview questions through interactive dialogues.
            </p>
          </div>

          {/* Mode Switcher Toggle Pill (HLD / LLD) */}
          <div className="xlr-sds-tab-toggle">
            <button
              type="button"
              className={`xlr-sds-tab-btn ${activeTab === "HLD" ? "xlr-sds-tab-btn--active" : ""}`}
              onClick={() => handleToggleTab("HLD")}
            >
              <span className="xlr-sds-tab-main">HLD</span>
              <span className="xlr-sds-tab-sub">High Level</span>
            </button>
            <button
              type="button"
              className={`xlr-sds-tab-btn ${activeTab === "LLD" ? "xlr-sds-tab-btn--active" : ""}`}
              onClick={() => handleToggleTab("LLD")}
            >
              <span className="xlr-sds-tab-main">LLD</span>
              <span className="xlr-sds-tab-sub">Low Level</span>
            </button>
          </div>
        </div>

        {/* Categorized Table List */}
        <div className="xlr-sds-categories-wrapper">
          {activeCategories.map((cat) => (
            <div key={cat.id} className="xlr-sds-category-block">
              {/* Category Header with Aesthetic React Icon */}
              <div className="xlr-sds-cat-header">
                <div className="xlr-sds-cat-icon-box">{getCategoryIcon(cat.id)}</div>
                <span className="xlr-sds-cat-title">{cat.title}</span>
                <span className="xlr-sds-cat-count">{cat.scenarios.length} scenarios</span>
              </div>

              {/* Table Container */}
              <div className="xlr-sds-table">
                <div className="xlr-sds-table-head">
                  <span className="xlr-sds-col-code">#</span>
                  <span className="xlr-sds-col-title">SCENARIO</span>
                  <span className="xlr-sds-col-imp">IMPORTANT</span>
                  <span className="xlr-sds-col-open">OPEN %</span>
                  <span className="xlr-sds-col-done">DONE</span>
                </div>

                <div className="xlr-sds-table-body">
                  {cat.scenarios.map((sc, scIdx) => {
                    const globalIdx = allFlatScenarios.findIndex((item) => item.id === sc.id);
                    const isDone = completedIds.includes(sc.id);
                    const isUnlocked = checkTopicAccess(globalIdx >= 0 ? globalIdx : scIdx, "scenarios");
                    return (
                      <div
                        key={sc.id}
                        className={`xlr-sds-row ${isDone ? "xlr-sds-row--done" : ""} ${!isUnlocked ? "xlr-sds-row--locked" : ""}`}
                        onClick={() => handleScenarioClick(sc.id, sc.title, isUnlocked)}
                      >
                        <span className="xlr-sds-col-code">{sc.code}</span>

                        <span className="xlr-sds-col-title">
                          {sc.title}
                          {!isUnlocked && <RiLock2Line size={14} color="#ef4444" style={{ marginLeft: "8px", verticalAlign: "middle" }} title="Subscription required — Click to unlock" />}
                        </span>

                        <div className="xlr-sds-col-imp">{renderImportance(sc.importance)}</div>

                        <span className="xlr-sds-col-open">{sc.openPercent}</span>

                        <div
                          className="xlr-sds-col-done"
                          onClick={(e) => {
                            if (!isUnlocked) return;
                            e.stopPropagation();
                            handleToggleDone(sc.id);
                          }}
                        >
                          {isUnlocked ? (
                            <button type="button" className="xlr-sds-done-btn">
                              <div className={`xlr-sds-done-circle ${isDone ? "xlr-sds-done-circle--active" : ""}`}>
                                {isDone && <RiCheckLine size={13} color="#10b981" />}
                              </div>
                            </button>
                          ) : (
                            <RiLock2Line size={16} color="#ef4444" title="Locked" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
