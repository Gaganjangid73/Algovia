import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Announcementbar from "../components/announcementbar";
import Navbar from "../components/navbar";
import TopicDetailView from "../components/topicDetail/TopicDetailView";
import { LLD_PROBLEMS_SECTIONS, getAllLldProblemsFlat } from "../data/lldProblemsData";

const LLD_PROBLEMS_COMPLETED_STORAGE_KEY = "algovia_lld_problems_completed_ids";

export default function LldProblemsPage() {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const [completedTopicIds, setCompletedTopicIds] = useState(() => {
    try {
      const saved = localStorage.getItem(LLD_PROBLEMS_COMPLETED_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const sections = LLD_PROBLEMS_SECTIONS;
  const safeCompletedIds = Array.isArray(completedTopicIds) ? completedTopicIds : [];

  // Find currently selected topic or default directly to 1st problem
  const allFlatTopics = getAllLldProblemsFlat();
  const currentTopic = topicId
    ? allFlatTopics.find((t) => t.id === topicId || t.id.toLowerCase() === topicId.toLowerCase()) || allFlatTopics[0]
    : allFlatTopics[0];

  // Toggle completion status
  const handleToggleTopicStatus = (idToToggle) => {
    if (!idToToggle) return;
    setCompletedTopicIds((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      let updated;
      if (safePrev.includes(idToToggle)) {
        updated = safePrev.filter((id) => id !== idToToggle);
      } else {
        updated = [...safePrev, idToToggle];
      }
      try {
        localStorage.setItem(LLD_PROBLEMS_COMPLETED_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save LLD problems completion status:", e);
      }
      return updated;
    });
  };

  // Handle selecting a topic
  const handleSelectTopic = (id) => {
    if (!id) return;
    navigate(`/lld-designs/${id}`);
  };

  // Handle back button
  const handleBackToOverview = () => {
    navigate("/lld");
  };

  return (
    <div className="xlr-hld-layout">
      {/* Sticky Top Navigation */}
      <header className="xlr-sticky-header">
        <Announcementbar />
        <Navbar />
      </header>

      {/* Directly Render Topic Detail View Workspace */}
      <TopicDetailView
        topicId={currentTopic.id}
        topicTitle={currentTopic.title}
        courseType="LLD_PROBLEMS"
        sidebarTitle="MASTER LLD PROBLEMS"
        allSections={sections}
        completedTopicIds={safeCompletedIds}
        onToggleTopicStatus={handleToggleTopicStatus}
        onSelectTopic={handleSelectTopic}
        onBackToOverview={handleBackToOverview}
      />
    </div>
  );
}
