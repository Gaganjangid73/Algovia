import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiCheckLine,
  RiStarLine,
  RiStarFill,
  RiEditLine,
  RiShareLine,
  RiFlashlightLine,
  RiCloseLine,
  RiLockLine,
  RiFileTextLine,
  RiSearchLine,
  RiFileCopyLine,
  RiWhatsappLine,
  RiTwitterXLine,
  RiLinkedinFill,
  RiFacebookCircleLine,
  RiTelegramLine,
  RiMailLine,
  RiLightbulbLine,
  RiBox3Line,
  RiGitMergeLine,
  RiCompass3Line,
  RiShieldCheckLine,
  RiOrganizationChart,
  RiPuzzle2Line,
  RiGitBranchLine,
  RiStackLine,
  RiChat3Line,
  RiFullscreenLine,
  RiFullscreenExitLine,
  RiParkingBoxLine,
  RiBankLine,
  RiArrowUpDownLine,
  RiShoppingBag3Line,
  RiCupLine,
  RiTrafficLightLine,
  RiDatabase2Line,
  RiGamepadLine,
  RiDiceLine,
  RiGridLine,
  RiTicket2Line,
  RiHotelLine,
  RiCarLine,
  RiFlightTakeoffLine,
  RiGraduationCapLine,
  RiBookOpenLine,
  RiRestaurantLine,
  RiTaskLine,
  RiUserSharedLine,
  RiUser3Line,
  RiQuestionnaireLine,
  RiTrophyLine,
  RiShoppingCart2Line,
  RiHammerLine,
  RiStockLine,
  RiWallet3Line,
  RiMoneyDollarBoxLine,
  RiMusic2Line,
  RiTruckLine,
  RiTerminalBoxLine,
  RiBroadcastLine,
  RiMenuLine,
  RiDeleteBinLine
} from "react-icons/ri";

const renderTopicIcon = (topicId) => {
  if (!topicId) return <RiFileTextLine size={15} className="xlr-topic-doc-icon" />;
  const id = topicId.toLowerCase();

  if (id.includes("parking")) return <RiParkingBoxLine size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id.includes("atm")) return <RiBankLine size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id.includes("elevator")) return <RiArrowUpDownLine size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id === "vending-machine") return <RiShoppingBag3Line size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id.includes("coffee")) return <RiCupLine size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id.includes("traffic")) return <RiTrafficLightLine size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id.includes("cache")) return <RiDatabase2Line size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id.includes("chess")) return <RiGamepadLine size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id.includes("snake")) return <RiDiceLine size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id.includes("toe")) return <RiGridLine size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id.includes("ticket") || id.includes("movie") || id.includes("concert")) return <RiTicket2Line size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id.includes("hotel")) return <RiHotelLine size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id.includes("car") || id.includes("rental") || id.includes("ride") || id.includes("sharing")) return <RiCarLine size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id.includes("airline")) return <RiFlightTakeoffLine size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id.includes("course") || id.includes("registration")) return <RiGraduationCapLine size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id.includes("library")) return <RiBookOpenLine size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id.includes("restaurant")) return <RiRestaurantLine size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id.includes("task")) return <RiTaskLine size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id.includes("linkedin")) return <RiUserSharedLine size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id.includes("social")) return <RiUser3Line size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id.includes("overflow") || id.includes("stack")) return <RiQuestionnaireLine size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id.includes("cricinfo")) return <RiTrophyLine size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id.includes("shopping")) return <RiShoppingCart2Line size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id.includes("auction")) return <RiHammerLine size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id.includes("brokerage") || id.includes("stock")) return <RiStockLine size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id.includes("wallet")) return <RiWallet3Line size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id.includes("splitwise")) return <RiMoneyDollarBoxLine size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id.includes("music") || id.includes("streaming")) return <RiMusic2Line size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id.includes("food") || id.includes("delivery")) return <RiTruckLine size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id.includes("logging")) return <RiTerminalBoxLine size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
  if (id.includes("pub-sub")) return <RiBroadcastLine size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;

  return <RiBox3Line size={15} className="xlr-topic-doc-icon" color="#94a3b8" />;
};

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getTopicArticleData } from "../../data/topicArticlesData";
import "./TopicDetailView.css";

const REVISION_STORAGE_KEY = "algovia_revision_topics";

/**
 * Defensive Module Icon Selector matching Reference Screenshots 2 & 3
 */
const renderModuleIcon = (title = "") => {
  const t = (title || "").toLowerCase();
  if (t.includes("intro")) return <RiLightbulbLine size={18} className="xlr-module-icon" />;
  if (t.includes("oop")) return <RiBox3Line size={18} className="xlr-module-icon" />;
  if (t.includes("relationship")) return <RiGitMergeLine size={18} className="xlr-module-icon" />;
  if (t.includes("design principles") || t.includes("creational") || t.includes("structural") || t.includes("behavioral"))
    return <RiCompass3Line size={18} className="xlr-module-icon" />;
  if (t.includes("solid")) return <RiShieldCheckLine size={18} className="xlr-module-icon" />;
  if (t.includes("uml")) return <RiOrganizationChart size={18} className="xlr-module-icon" />;
  if (t.includes("architectural") || t.includes("practical")) return <RiPuzzle2Line size={18} className="xlr-module-icon" />;
  if (t.includes("concurrency") || t.includes("thread")) return <RiGitBranchLine size={18} className="xlr-module-icon" />;
  if (t.includes("error") || t.includes("dependency") || t.includes("clean code")) return <RiStackLine size={18} className="xlr-module-icon" />;
  if (t.includes("approach") || t.includes("interview")) return <RiChat3Line size={18} className="xlr-module-icon" />;
  return <RiLightbulbLine size={18} className="xlr-module-icon" />;
};

function TopicDetailView({
  topicId,
  topicTitle = "Topic Details",
  sidebarTitle,
  courseType,
  allSections = [],
  completedTopicIds = [],
  onToggleTopicStatus,
  onSelectTopic,
  onBackToOverview
}) {
  // Dynamic HLD vs LLD vs LLD Problems vs SD Patterns Sidebar Title Auto-detection
  const path = typeof window !== "undefined" ? window.location.pathname.toLowerCase() : "";
  const isSdPatterns = courseType === "SYSTEM_DESIGN_PATTERNS" || path.includes("/system-design/interview-pattern");
  const isLldProblems = courseType === "LLD_PROBLEMS" || path.includes("/lld-problems") || path.includes("/lld-designs");
  const isHldCourse =
    courseType === "HLD" ||
    (sidebarTitle && sidebarTitle.toLowerCase().includes("hld")) ||
    path.includes("/hld") ||
    (topicId || "").toLowerCase().includes("hld");

  const computedSidebarTitle =
    sidebarTitle || (isSdPatterns ? "SYSTEM DESIGN PATTERNS" : isLldProblems ? "MASTER LLD PROBLEMS" : isHldCourse ? "MASTER HLD INTERVIEWS" : "MASTER LLD INTERVIEWS");

  const progressFractionLabel = isSdPatterns ? "Patterns Solved" : isLldProblems ? "Problems Solved" : "Docs Completed";

  // Defensive state initialization
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isBarHidden, setIsBarHidden] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [expandedSectionIds, setExpandedSectionIds] = useState([]);

  // Mobile Drawer state
  const [isTopicsDrawerOpen, setIsTopicsDrawerOpen] = useState(false);

  // Fetch safe topic article object
  const article = getTopicArticleData(topicId, topicTitle) || {};
  const safeAuthor = article.author || { name: "Gagan Jangid", role: "Senior Software Engineer", avatar: "" };
  const safeContentBlocks = article.contentBlocks || [];
  const safeSectionsOnPage = article.sectionsOnPage || [];

  // Scroll reading progress & active TOC heading state
  const [scrollProgress, setScrollProgress] = useState(7);
  const [activeHeadingId, setActiveHeadingId] = useState(safeSectionsOnPage[0]?.id || "what-lld-means");

  // Revision state (stored safely in localStorage)
  const [revisionTopicIds, setRevisionTopicIds] = useState(() => {
    try {
      const saved = localStorage.getItem(REVISION_STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Modal states
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Note text per topic
  const [noteText, setNoteText] = useState("");

  // Save & Clear Note Handlers
  const handleSaveNote = () => {
    if (!topicId) return;
    try {
      localStorage.setItem(`algovia_note_${topicId}`, noteText);
      setIsNotesOpen(false);
    } catch (err) {
      console.error("Failed to save note:", err);
    }
  };

  const handleClearNote = () => {
    setNoteText("");
    if (!topicId) return;
    try {
      localStorage.removeItem(`algovia_note_${topicId}`);
    } catch (err) {
      console.error("Failed to clear note:", err);
    }
  };

  const navigate = useNavigate();
  const { checkTopicAccess } = useAuth();

  // Flattened topic list across all sections for Prev/Next navigation
  const allFlatTopics = (allSections || []).flatMap((sec) =>
    (sec?.topics || []).filter(Boolean).map((t) => ({ ...t, sectionTitle: sec?.title || "" }))
  );
  const currentTopicIndex = allFlatTopics.findIndex((t) => t.id === topicId);
  const prevTopic = currentTopicIndex > 0 ? allFlatTopics[currentTopicIndex - 1] : null;
  const nextTopic = currentTopicIndex >= 0 && currentTopicIndex < allFlatTopics.length - 1 ? allFlatTopics[currentTopicIndex + 1] : null;

  // Protect locked topics: redirect to /payment/checkout
  useEffect(() => {
    if (currentTopicIndex >= 0) {
      const catKey = isHldCourse ? "hld" : (isSdPatterns ? "patterns" : (isLldProblems ? "lld-designs" : "lld"));
      const isUnlocked = checkTopicAccess(currentTopicIndex, catKey);
      if (!isUnlocked) {
        navigate("/payment/checkout", { replace: true });
      }
    }
  }, [currentTopicIndex, isHldCourse, isSdPatterns, isLldProblems, checkTopicAccess, navigate]);

  // Track page scroll progress & active heading for TOC safely
  useEffect(() => {
    const handleScroll = () => {
      try {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          const currentProgress = Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)));
          setScrollProgress(currentProgress);
        }

        const list = safeSectionsOnPage || [];
        for (let i = list.length - 1; i >= 0; i--) {
          const secItem = list[i];
          if (!secItem || !secItem.id) continue;
          const el = document.getElementById(secItem.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 160) {
              setActiveHeadingId(secItem.id);
              break;
            }
          }
        }
      } catch (err) {
        console.warn("Scroll calculation error:", err);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [topicId, safeSectionsOnPage]);

  // Sync expanded section for active topic
  useEffect(() => {
    if (allSections && allSections.length > 0 && topicId) {
      const parentSec = allSections.find((sec) =>
        (sec?.topics || []).some((t) => t && t.id === topicId)
      );
      if (parentSec && !expandedSectionIds.includes(parentSec.id)) {
        setExpandedSectionIds((prev) => [...prev, parentSec.id]);
      }
    }
  }, [topicId, allSections]);

  // Sync Note text from localStorage for current topic safely
  useEffect(() => {
    if (!topicId) return;
    try {
      const savedNote = localStorage.getItem(`algovia_note_${topicId}`) || "";
      setNoteText(savedNote);
    } catch {
      setNoteText("");
    }
  }, [topicId]);

  // Auto-save Note text to localStorage
  const handleNoteChange = (e) => {
    const val = e.target.value || "";
    setNoteText(val);
    if (!topicId) return;
    try {
      localStorage.setItem(`algovia_note_${topicId}`, val);
    } catch (err) {
      console.error("Failed to save note:", err);
    }
  };

  // Toggle Revision Status (Orange Star)
  const handleToggleRevision = () => {
    if (!topicId) return;
    setRevisionTopicIds((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      let updated;
      if (safePrev.includes(topicId)) {
        updated = safePrev.filter((id) => id !== topicId);
      } else {
        updated = [...safePrev, topicId];
      }
      try {
        localStorage.setItem(REVISION_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save revision topics:", e);
      }
      return updated;
    });
  };

  // Copy share URL to clipboard with fallback polyfill
  const handleCopyLink = () => {
    const shareUrl = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2500);
      }).catch(() => setCopySuccess(false));
    } else {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    }
  };

  // Real Working Social Share Handlers
  const getShareTitle = () => article.title || topicTitle || "Low Level Design Topic";

  const handleShareWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out "${getShareTitle()}" on Algovia:`);
    window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, "_blank", "noopener,noreferrer");
  };

  const handleShareTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Learning "${getShareTitle()}" on Algovia`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank", "noopener,noreferrer");
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank", "noopener,noreferrer");
  };

  const handleShareFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank", "noopener,noreferrer");
  };

  const handleShareTelegram = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out "${getShareTitle()}" on Algovia:`);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, "_blank", "noopener,noreferrer");
  };

  const handleShareEmail = () => {
    const url = encodeURIComponent(window.location.href);
    const subject = encodeURIComponent(`Topic: ${getShareTitle()}`);
    const body = encodeURIComponent(`Hey,\n\nCheck out this topic on Algovia:\n${window.location.href}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
  };

  const handleShareNative = async () => {
    const shareData = {
      title: getShareTitle(),
      text: `Check out "${getShareTitle()}" on Algovia!`,
      url: window.location.href
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.warn("Share cancelled:", err);
      }
    } else {
      handleCopyLink();
    }
  };

  // Safe checks
  const safeCompletedList = Array.isArray(completedTopicIds) ? completedTopicIds : [];
  const isCompleted = topicId ? safeCompletedList.includes(topicId) : false;
  const isRevision = topicId ? revisionTopicIds.includes(topicId) : false;

  // Overall metrics calculation
  const totalDocs = allFlatTopics.length || 137;
  const completedDocsCount = safeCompletedList.length;
  const overallProgressPercent = Math.round((completedDocsCount / totalDocs) * 100);

  // Toggle module accordion expand/collapse
  const toggleSectionExpand = (secId) => {
    if (!secId) return;
    setExpandedSectionIds((prev) =>
      prev.includes(secId) ? prev.filter((id) => id !== secId) : [...prev, secId]
    );
  };

  // Scroll smoothly to section anchor
  const scrollToAnchor = (anchorId) => {
    if (!anchorId) return;
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Calculate word count for note
  const wordCount = noteText.trim() === "" ? 0 : noteText.trim().split(/\s+/).length;

  return (
    <div className={`xlr-tdv-workspace ${isSidebarCollapsed ? "xlr-tdv-workspace--collapsed" : ""}`}>
      {/* ========================================================================= */}
      {/* 0. MOBILE TOP HEADER NAVIGATION BAR (< 768px)                              */}
      {/* ========================================================================= */}
      <div className="xlr-tdv-mobile-header">
        <button
          type="button"
          className="xlr-tdv-mobile-back-btn"
          onClick={() => (onBackToOverview ? onBackToOverview() : window.history.back())}
        >
          <RiArrowLeftSLine size={20} />
          <span>Back</span>
        </button>

        <div className="xlr-tdv-mobile-header-right">
          {/* Circular Reading Scroll Progress Badge */}
          <div className="xlr-tdv-mobile-progress-badge" title={`Reading Progress ${scrollProgress}%`}>
            <svg width="26" height="26" viewBox="0 0 26 26">
              <circle cx="13" cy="13" r="10" fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
              <circle
                cx="13"
                cy="13"
                r="10"
                fill="none"
                stroke="#f97316"
                strokeWidth="2.5"
                strokeDasharray={2 * Math.PI * 10}
                strokeDashoffset={2 * Math.PI * 10 * (1 - scrollProgress / 100)}
                transform="rotate(-90 13 13)"
              />
            </svg>
            <span className="xlr-tdv-mobile-progress-text">{scrollProgress}%</span>
          </div>

          <button
            type="button"
            className="xlr-tdv-mobile-topics-btn"
            onClick={() => setIsTopicsDrawerOpen(true)}
          >
            <RiMenuLine size={18} />
            <span>Topics</span>
          </button>
        </div>
      </div>

      {/* Left Topics Slide-Over Drawer Modal */}
      {isTopicsDrawerOpen && (
        <div className="xlr-tdv-drawer-backdrop" onClick={() => setIsTopicsDrawerOpen(false)}>
          <div className="xlr-tdv-drawer-modal" onClick={(e) => e.stopPropagation()}>
            <div className="xlr-tdv-drawer-header">
              <h3 className="xlr-tdv-drawer-title">{computedSidebarTitle}</h3>
              <button
                type="button"
                className="xlr-tdv-drawer-close-btn"
                onClick={() => setIsTopicsDrawerOpen(false)}
              >
                <RiCloseLine size={22} />
              </button>
            </div>

            {/* Overall Progress Box */}
            <div className="xlr-tdv-progress-box" style={{ margin: "16px 20px" }}>
              <div className="xlr-tdv-progress-ring-wrapper">
                <svg className="xlr-tdv-progress-svg" viewBox="0 0 60 60">
                  <circle className="xlr-tdv-progress-bg" cx="30" cy="30" r="24" strokeWidth="4.5" />
                  <circle
                    className="xlr-tdv-progress-fill"
                    cx="30"
                    cy="30"
                    r="24"
                    strokeWidth="4.5"
                    strokeDasharray={2 * Math.PI * 24}
                    strokeDashoffset={2 * Math.PI * 24 * (1 - overallProgressPercent / 100)}
                  />
                </svg>
                <span className="xlr-tdv-progress-ring-text">{overallProgressPercent}%</span>
              </div>
              <div className="xlr-tdv-progress-text">
                <span className="xlr-tdv-progress-label">OVERALL PROGRESS</span>
                <span className="xlr-tdv-progress-fraction">
                  <strong>{completedDocsCount}</strong> /{totalDocs}
                </span>
                <span className="xlr-tdv-progress-sublabel">{progressFractionLabel}</span>
              </div>
            </div>

            {/* Search Input Box */}
            <div className="xlr-tdv-search-box" style={{ margin: "0 20px 16px 20px" }}>
              <RiSearchLine size={15} color="#94a3b8" />
              <input
                type="text"
                placeholder="Search topics..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value || "")}
              />
            </div>

            {/* Scrollable Accordion Topics List */}
            <div className="xlr-tdv-drawer-topics-list">
              {(allSections || []).map((sec) => {
                if (!sec || !sec.id) return null;
                const isSecExpanded = expandedSectionIds.includes(sec.id);
                const matchingTopics = (sec.topics || []).filter((t) =>
                  t && t.title && t.title.toLowerCase().includes((searchFilter || "").toLowerCase())
                );
                if (searchFilter.trim() !== "" && matchingTopics.length === 0) return null;

                return (
                  <div key={sec.id} className="xlr-tdv-module-group">
                    <button
                      type="button"
                      className="xlr-tdv-module-header"
                      onClick={() => toggleSectionExpand(sec.id)}
                    >
                      <div className="xlr-tdv-module-header-title">
                        {renderModuleIcon(sec.title)}
                        <span>{sec.title}</span>
                      </div>
                      {isSecExpanded ? <RiArrowRightSLine className="xlr-arrow-rotate-90" size={16} /> : <RiArrowRightSLine size={16} />}
                    </button>

                    {(isSecExpanded || searchFilter.trim() !== "") && (
                      <div className="xlr-tdv-module-topics">
                        {(searchFilter.trim() !== "" ? matchingTopics : sec.topics || []).map((t) => {
                          if (!t || !t.id) return null;
                          const isTopicActive = t.id === topicId;
                          const isTopicDone = safeCompletedList.includes(t.id);
                          const isTopicRev = revisionTopicIds.includes(t.id);

                          return (
                            <button
                              key={t.id}
                              type="button"
                              className={`xlr-tdv-topic-item ${isTopicActive ? "xlr-tdv-topic-item--active" : ""}`}
                              onClick={() => {
                                setIsTopicsDrawerOpen(false);
                                onSelectTopic && onSelectTopic(t.id, t.title);
                              }}
                            >
                              <RiFileTextLine size={15} className="xlr-topic-doc-icon" />
                              <span className="xlr-tdv-topic-item-title">{t.title}</span>
                              <div className="xlr-tdv-topic-item-indicators">
                                {isTopicRev && <RiStarFill size={13} color="#f97316" title="Marked for revision" />}
                                {isTopicDone && <RiCheckLine size={14} color="#16a34a" title="Completed" />}
                                {t.isLocked && <RiLockLine size={13} color="#94a3b8" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. FIXED LEFT SIDEBAR                                                     */}
      {/* ========================================================================= */}
      <aside className={`xlr-tdv-sidebar ${isSidebarCollapsed ? "xlr-tdv-sidebar--collapsed-strip" : ""}`}>
        {/* Toggle Collapse/Expand Floating Button */}
        <button
          type="button"
          className="xlr-tdv-toggle-sidebar-btn"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isSidebarCollapsed ? <RiArrowRightSLine size={16} /> : <RiArrowLeftSLine size={16} />}
        </button>

        {!isSidebarCollapsed ? (
          /* Full Expanded Sidebar Content */
          <div className="xlr-tdv-sidebar-inner">
            {/* Fixed Top Block (Header, Progress, Search) */}
            <div className="xlr-tdv-sidebar-top-fixed">
              {/* Header & Back Button */}
              <div className="xlr-tdv-sidebar-header-row">
                <button
                  type="button"
                  className="xlr-tdv-back-btn"
                  onClick={() => onBackToOverview && onBackToOverview()}
                  title="Back to Overview"
                >
                  <RiArrowLeftSLine size={18} />
                </button>
                <div>
                  <h3 className="xlr-tdv-sidebar-title">{computedSidebarTitle}</h3>
                  <span className="xlr-tdv-sidebar-subtext">0 skippable topic · covered 100%</span>
                </div>
              </div>

              {/* Overall Progress Box */}
              <div className="xlr-tdv-progress-box">
                <div className="xlr-tdv-progress-ring-wrapper">
                  <svg className="xlr-tdv-progress-svg" viewBox="0 0 60 60">
                    <circle className="xlr-tdv-progress-bg" cx="30" cy="30" r="24" strokeWidth="4.5" />
                    <circle
                      className="xlr-tdv-progress-fill"
                      cx="30"
                      cy="30"
                      r="24"
                      strokeWidth="4.5"
                      strokeDasharray={2 * Math.PI * 24}
                      strokeDashoffset={2 * Math.PI * 24 * (1 - overallProgressPercent / 100)}
                    />
                  </svg>
                  <span className="xlr-tdv-progress-ring-text">{overallProgressPercent}%</span>
                </div>
                <div className="xlr-tdv-progress-text">
                  <span className="xlr-tdv-progress-label">OVERALL PROGRESS</span>
                  <span className="xlr-tdv-progress-fraction">
                    <strong>{completedDocsCount}</strong> /{totalDocs}
                  </span>
                  <span className="xlr-tdv-progress-sublabel">{progressFractionLabel}</span>
                </div>
              </div>

              {/* Search Topics Input */}
              <div className="xlr-tdv-search-box">
                <RiSearchLine size={15} color="#94a3b8" />
                <input
                  type="text"
                  placeholder="Search topics..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value || "")}
                />
              </div>
            </div>

            {/* Independently Scrollable Modules List */}
            <div className="xlr-tdv-modules-scrollable-container">
              <div className="xlr-tdv-modules-list">
                {isLldProblems || isSdPatterns ? (
                  /* Single continuous flat list for LLD Problems & System Design Patterns */
                  <div className="xlr-tdv-module-topics" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {(allSections?.[0]?.topics || []).filter((t) =>
                      !searchFilter.trim() || (t && t.title && t.title.toLowerCase().includes(searchFilter.toLowerCase()))
                    ).map((t) => {
                      if (!t || !t.id) return null;
                      const isTopicActive = t.id === topicId;
                      const isTopicDone = safeCompletedList.includes(t.id);
                      const isTopicRev = revisionTopicIds.includes(t.id);

                      return (
                        <button
                          key={t.id}
                          type="button"
                          className={`xlr-tdv-topic-item ${isTopicActive ? "xlr-tdv-topic-item--active" : ""}`}
                          onClick={() => onSelectTopic && onSelectTopic(t.id, t.title)}
                        >
                          {renderTopicIcon(t.id)}
                          <span className="xlr-tdv-topic-item-title">{t.title}</span>

                          {/* Indicators */}
                          <div className="xlr-tdv-topic-item-indicators">
                            {isTopicRev && <RiStarFill size={13} color="#f97316" title="Marked for revision" />}
                            {isTopicDone && <RiCheckLine size={14} color="#16a34a" title="Completed" />}
                            {t.isLocked && <RiLockLine size={13} color="#94a3b8" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  /* Module Accordions for HLD / LLD Courses */
                  (allSections || []).map((sec) => {
                    if (!sec || !sec.id) return null;
                    const isSecExpanded = expandedSectionIds.includes(sec.id);
                    const matchingTopics = (sec.topics || []).filter((t) =>
                      t && t.title && t.title.toLowerCase().includes((searchFilter || "").toLowerCase())
                    );
                    if (searchFilter.trim() !== "" && matchingTopics.length === 0) return null;

                    return (
                      <div key={sec.id} className="xlr-tdv-module-group">
                        {/* Module Accordion Header */}
                        <button
                          type="button"
                          className="xlr-tdv-module-header"
                          onClick={() => toggleSectionExpand(sec.id)}
                        >
                          <div className="xlr-tdv-module-header-title">
                            {renderModuleIcon(sec.title)}
                            <span>{sec.title}</span>
                          </div>
                          {isSecExpanded ? <RiArrowRightSLine className="xlr-arrow-rotate-90" size={16} /> : <RiArrowRightSLine size={16} />}
                        </button>

                        {/* Module Topics List */}
                        {(isSecExpanded || searchFilter.trim() !== "") && (
                          <div className="xlr-tdv-module-topics">
                            {(searchFilter.trim() !== "" ? matchingTopics : sec.topics || []).map((t) => {
                              if (!t || !t.id) return null;
                              const isTopicActive = t.id === topicId;
                              const isTopicDone = safeCompletedList.includes(t.id);
                              const isTopicRev = revisionTopicIds.includes(t.id);

                              return (
                                <button
                                  key={t.id}
                                  type="button"
                                  className={`xlr-tdv-topic-item ${isTopicActive ? "xlr-tdv-topic-item--active" : ""}`}
                                  onClick={() => onSelectTopic && onSelectTopic(t.id, t.title)}
                                >
                                  <RiFileTextLine size={15} className="xlr-topic-doc-icon" />
                                  <span className="xlr-tdv-topic-item-title">{t.title}</span>

                                  {/* Indicators */}
                                  <div className="xlr-tdv-topic-item-indicators">
                                    {isTopicRev && <RiStarFill size={13} color="#f97316" title="Marked for revision" />}
                                    {isTopicDone && <RiCheckLine size={14} color="#16a34a" title="Completed" />}
                                    {t.isLocked && <RiLockLine size={13} color="#94a3b8" />}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Collapsed Icons Strip Mode */
          <div className="xlr-tdv-collapsed-strip">
            <button
              type="button"
              className="xlr-tdv-strip-back"
              onClick={() => onBackToOverview && onBackToOverview()}
              title="Back to Overview"
            >
              <RiArrowLeftSLine size={18} />
            </button>
            <div className="xlr-tdv-strip-icons">
              {(allSections || []).map((sec) => {
                if (!sec || !sec.id) return null;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    className="xlr-tdv-strip-icon-btn"
                    onClick={() => {
                      setIsSidebarCollapsed(false);
                      setExpandedSectionIds([sec.id]);
                    }}
                    title={sec.title}
                  >
                    {renderModuleIcon(sec.title)}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </aside>

      {/* ========================================================================= */}
      {/* 2. CENTER MAIN ARTICLE CONTAINER (Scrolls Smoothly)                       */}
      {/* ========================================================================= */}
      <main className="xlr-tdv-main-content">
        <article className="xlr-tdv-article">
          {/* Article Header H1 */}
          <h1 className="xlr-tdv-article-title">{article.title || topicTitle}</h1>

          {/* Author Byline: Gagan Jangid + Gagan.JPG */}
          <div className="xlr-tdv-author-byline">
            <img src={safeAuthor.avatar} alt={safeAuthor.name} className="xlr-tdv-author-avatar" />
            <div className="xlr-tdv-author-info">
              <span className="xlr-tdv-author-name">{safeAuthor.name}</span>
              <span className="xlr-tdv-author-role">{safeAuthor.role}</span>
            </div>
          </div>

          {/* Formatted Article Content Blocks */}
          <div className="xlr-tdv-article-body">
            {safeContentBlocks.map((block, idx) => {
              if (!block) return null;
              if (block.type === "paragraph") {
                return <p key={idx} className="xlr-tdv-paragraph">{block.text}</p>;
              }
              if (block.type === "callout") {
                return (
                  <div key={idx} className="xlr-tdv-callout-box">
                    <p>{block.text}</p>
                  </div>
                );
              }
              if (block.type === "heading") {
                return (
                  <h2 key={idx} id={block.id} className="xlr-tdv-heading">
                    {block.text}
                  </h2>
                );
              }
              return null;
            })}
          </div>
        </article>

      {/* ========================================================================= */}
      {/* 3. FLOATING BOTTOM ACTION BAR CONTROLS (Middle-Bottom Portal to document.body) */}
      {/* ========================================================================= */}
      {createPortal(
        <div className={`xlr-tdv-floating-action-bar ${isBarHidden ? "xlr-tdv-floating-action-bar--collapsed" : ""}`}>
          {/* Top Hide/Show Pill Button */}
          <button
            type="button"
            className="xlr-tdv-bar-hide-btn"
            onClick={() => setIsBarHidden(!isBarHidden)}
            title={isBarHidden ? "Show Action Bar" : "Hide Action Bar"}
          >
            {isBarHidden ? <RiArrowUpSLine size={13} /> : <RiArrowDownSLine size={13} />}
            <span>{isBarHidden ? "Show" : "Hide"}</span>
          </button>

          {!isBarHidden && (
            <div className="xlr-tdv-bar-content-row">
              {/* Previous Topic Button */}
              <button
                type="button"
                className="xlr-tdv-action-btn xlr-tdv-action-btn--nav"
                disabled={!prevTopic}
                onClick={() => prevTopic && onSelectTopic && onSelectTopic(prevTopic.id, prevTopic.title)}
              >
                <RiArrowLeftSLine size={14} />
                <span>Prev</span>
              </button>

              {/* Vertical Line Divider */}
              <div className="xlr-tdv-bar-divider" />

              {/* Complete Button (Green when active!) */}
              <button
                type="button"
                className={`xlr-tdv-action-btn ${isCompleted ? "xlr-tdv-action-btn--complete-active" : ""}`}
                onClick={() => onToggleTopicStatus && onToggleTopicStatus(topicId)}
              >
                <RiCheckLine size={14} />
                <span>{isCompleted ? "Completed" : "Complete"}</span>
              </button>

              {/* Revision Button with Chevron (Orange when active!) */}
              <button
                type="button"
                className={`xlr-tdv-action-btn ${isRevision ? "xlr-tdv-action-btn--revision-active" : ""}`}
                onClick={handleToggleRevision}
              >
                {isRevision ? <RiStarFill size={14} color="#f97316" /> : <RiStarLine size={14} />}
                <span>{isRevision ? "In Revision" : "Revision"}</span>
                <RiArrowUpSLine size={11} color="#94a3b8" />
              </button>

              {/* Note Button */}
              <button
                type="button"
                className={`xlr-tdv-action-btn ${noteText.trim() ? "xlr-tdv-action-btn--has-note" : ""}`}
                onClick={() => setIsNotesOpen(true)}
              >
                <RiEditLine size={14} />
                <span>Note</span>
              </button>

              {/* Share Button */}
              <button
                type="button"
                className="xlr-tdv-action-btn"
                onClick={() => setIsShareOpen(true)}
              >
                <RiShareLine size={14} />
                <span>Share</span>
              </button>

              {/* Focus Button */}
              <button
                type="button"
                className="xlr-tdv-action-btn"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              >
                <RiFullscreenLine size={14} />
                <span>Focus</span>
              </button>

              {/* Vertical Line Divider */}
              <div className="xlr-tdv-bar-divider" />

              {/* Next Topic Button */}
              <button
                type="button"
                className="xlr-tdv-action-btn xlr-tdv-action-btn--nav"
                disabled={!nextTopic}
                onClick={() => nextTopic && onSelectTopic && onSelectTopic(nextTopic.id, nextTopic.title)}
              >
                <span>Next</span>
                <RiArrowRightSLine size={14} />
              </button>
            </div>
          )}
        </div>,
        document.body
      )}
      </main>

      {/* ========================================================================= */}
      {/* 3. FIXED RIGHT SIDEBAR (Top section fixed, TOC list scrollable)            */}
      {/* ========================================================================= */}
      <aside className="xlr-tdv-right-sidebar">
        {/* Fixed Top Block (Does not scroll!) */}
        <div className="xlr-tdv-right-sidebar-top-fixed">
          {/* Brand Banner & Upgrade CTA */}
          <div className="xlr-tdv-brand-banner">
            <div className="xlr-tdv-brand-name">
              <span>Algo</span>via.io
            </div>
            <p className="xlr-tdv-brand-sub">Upgrade now and master everything faster</p>
            <button type="button" className="xlr-tdv-member-btn">
              Become a Member
            </button>
          </div>

          {/* Reading Progress with Green Bar */}
          <div className="xlr-tdv-reading-progress">
            <div className="xlr-tdv-reading-progress-header">
              <span>Reading Progress</span>
              <strong>{scrollProgress}%</strong>
            </div>
            <div className="xlr-tdv-reading-bar-track">
              <div className="xlr-tdv-reading-bar-fill" style={{ width: `${scrollProgress}%` }} />
            </div>
          </div>

          {/* On This Page Fixed Title */}
          <h4 className="xlr-tdv-toc-title">On This Page</h4>
        </div>

        {/* Independently Scrollable TOC List */}
        <div className="xlr-tdv-toc-scrollable-container">
          <ul className="xlr-tdv-toc-list">
            {(safeSectionsOnPage || []).map((secItem) => {
              if (!secItem || !secItem.id) return null;
              const isHeadingActive = activeHeadingId === secItem.id;
              return (
                <li
                  key={secItem.id}
                  className={`xlr-tdv-toc-item ${isHeadingActive ? "xlr-tdv-toc-item--active" : ""}`}
                >
                  <button type="button" onClick={() => scrollToAnchor(secItem.id)}>
                    {secItem.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 4. NOTES MODAL DRAWER                                                      */}
      {/* ========================================================================= */}
      {isNotesOpen && (
        <div className="xlr-tdv-modal-overlay" onClick={() => setIsNotesOpen(false)}>
          <div className="xlr-tdv-notes-modal" onClick={(e) => e.stopPropagation()}>
            <div className="xlr-tdv-modal-header">
              <div className="xlr-tdv-modal-header-left">
                <div className="xlr-tdv-notes-icon-wrapper">
                  <RiEditLine size={20} color="#3b82f6" />
                </div>
                <div>
                  <h3 className="xlr-tdv-modal-title">Topic Notes</h3>
                  <span className="xlr-tdv-modal-subtitle">{topicTitle}</span>
                </div>
              </div>
              <button type="button" className="xlr-tdv-close-btn" onClick={() => setIsNotesOpen(false)}>
                <RiCloseLine size={20} />
              </button>
            </div>

            <div className="xlr-tdv-notes-body">
              <textarea
                className="xlr-tdv-notes-textarea"
                placeholder="Write your notes, thought process, scratch ideas... (auto-saved)"
                value={noteText}
                onChange={handleNoteChange}
                autoFocus
              />
              <div className="xlr-tdv-notes-footer">
                <div className="xlr-tdv-notes-actions">
                  <button type="button" className="xlr-tdv-save-note-btn" onClick={handleSaveNote}>
                    Save Note
                  </button>
                  <button type="button" className="xlr-tdv-clear-note-btn" onClick={handleClearNote}>
                    <RiDeleteBinLine size={14} />
                    <span>Clear</span>
                  </button>
                </div>
                <span className="xlr-tdv-word-count">{wordCount}/1000 words</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. SHARE MODAL                                                            */}
      {/* ========================================================================= */}
      {isShareOpen && (
        <div className="xlr-tdv-modal-overlay" onClick={() => setIsShareOpen(false)}>
          <div className="xlr-tdv-share-modal" onClick={(e) => e.stopPropagation()}>
            <div className="xlr-tdv-modal-header">
              <h3 className="xlr-tdv-modal-title">Share</h3>
              <button type="button" className="xlr-tdv-close-btn" onClick={() => setIsShareOpen(false)}>
                <RiCloseLine size={20} />
              </button>
            </div>

            <div className="xlr-tdv-share-body">
              {/* Copy URL Input Box */}
              <div className="xlr-tdv-share-url-box">
                <div className="xlr-tdv-share-url-text">
                  <RiFileCopyLine size={16} color="#94a3b8" />
                  <span>{typeof window !== "undefined" ? window.location.href : ""}</span>
                </div>
                <button type="button" className="xlr-tdv-copy-btn" onClick={handleCopyLink}>
                  {copySuccess ? "Copied!" : "Copy"}
                </button>
              </div>

              {/* Share via Social Buttons */}
              <span className="xlr-tdv-share-label">Share via</span>
              <div className="xlr-tdv-share-grid">
                <button type="button" className="xlr-share-btn xlr-share-btn--whatsapp" onClick={handleShareWhatsApp}>
                  <RiWhatsappLine size={24} />
                  <span>WhatsApp</span>
                </button>
                <button type="button" className="xlr-share-btn xlr-share-btn--twitter" onClick={handleShareTwitter}>
                  <RiTwitterXLine size={22} />
                  <span>Twitter</span>
                </button>
                <button type="button" className="xlr-share-btn xlr-share-btn--linkedin" onClick={handleShareLinkedIn}>
                  <RiLinkedinFill size={24} />
                  <span>LinkedIn</span>
                </button>
                <button type="button" className="xlr-share-btn xlr-share-btn--facebook" onClick={handleShareFacebook}>
                  <RiFacebookCircleLine size={24} />
                  <span>Facebook</span>
                </button>
                <button type="button" className="xlr-share-btn xlr-share-btn--telegram" onClick={handleShareTelegram}>
                  <RiTelegramLine size={24} />
                  <span>Telegram</span>
                </button>
                <button type="button" className="xlr-share-btn xlr-share-btn--email" onClick={handleShareEmail}>
                  <RiMailLine size={24} />
                  <span>Email</span>
                </button>
              </div>

              <button type="button" className="xlr-tdv-more-options-btn" onClick={handleShareNative}>
                <RiShareLine size={16} />
                <span>More options</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopicDetailView;
export { TopicDetailView as TopicViewDetails };
