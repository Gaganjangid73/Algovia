import React, { useState, useEffect } from "react";
import Announcementbar from "../components/Announcementbar";
import Navbar from "../components/navbar";
import HldSidebar from "../components/hld/HldSidebar";
import HldMainContent from "../components/hld/HldMainContent";
import { fetchHldCurriculumData } from "../data/hldContentData";
import "./HldPage.css";

const STORAGE_KEY = "algovia_hld_completed_topics";

function HldPage() {
  const [sections, setSections] = useState([]);
  const [activeSectionId, setActiveSectionId] = useState("intro-system-design");
  const [completedTopicIds, setCompletedTopicIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load HLD curriculum data asynchronously
  useEffect(() => {
    let isMounted = true;
    const loadHldData = async () => {
      try {
        const data = await fetchHldCurriculumData();
        if (isMounted) {
          setSections(data || []);
          if (data && data.length > 0) {
            setActiveSectionId(data[0].id);
          }
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Failed to load HLD curriculum data:", err);
        if (isMounted) setIsLoading(false);
      }
    };

    loadHldData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Save completed topic IDs to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedTopicIds));
    } catch (e) {
      console.error("Failed to save HLD completed topics:", e);
    }
  }, [completedTopicIds]);

  // Toggle topic completion status
  const handleToggleTopicStatus = (topicId) => {
    setCompletedTopicIds((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      if (safePrev.includes(topicId)) {
        return safePrev.filter((id) => id !== topicId);
      } else {
        return [...safePrev, topicId];
      }
    });
  };

  const activeSection = sections.find((s) => s.id === activeSectionId) || sections[0];
  const safeCompletedIds = Array.isArray(completedTopicIds) ? completedTopicIds : [];

  return (
    <div className="xlr-hld-layout">
      {/* Sticky Top Navigation */}
      <header className="xlr-sticky-header">
        <Announcementbar />
        <Navbar />
      </header>

      {/* 2-Column HLD Workspace Layout */}
      <div className="xlr-hld-container">
        {!isLoading && sections.length > 0 ? (
          <>
            {/* Left Sidebar: Progress Rings & 26 Sections */}
            <HldSidebar
              sections={sections}
              activeSectionId={activeSectionId}
              onSelectSection={setActiveSectionId}
              completedTopicIds={safeCompletedIds}
            />

            {/* Main Content Area: Section Detail & Topics Table */}
            <HldMainContent
              activeSection={activeSection}
              allSections={sections}
              completedTopicIds={safeCompletedIds}
              onToggleTopicStatus={handleToggleTopicStatus}
            />
          </>
        ) : (
          <div style={{ padding: "80px 20px", textAlign: "center", width: "100%", color: "#94a3b8" }}>
            <h2>Loading HLD Curriculum...</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default HldPage;
