import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Announcementbar from "../components/Announcementbar";
import Navbar from "../components/navbar";
import LLDDashboard from "../components/lld/LLDDashboard";
import TopicDetailView from "../components/topicDetail/TopicDetailView";
import { fetchLldCurriculumData } from "../data/lldContentData";
import "./HldPage.css";

const STORAGE_KEY = "algovia_lld_completed_topics";

function LldPage() {
  const { topicId: urlTopicId } = useParams();
  const navigate = useNavigate();

  const [sections, setSections] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

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

  // Load LLD curriculum data asynchronously
  useEffect(() => {
    let isMounted = true;
    const loadLldData = async () => {
      try {
        const data = await fetchLldCurriculumData();
        if (isMounted) {
          setSections(data || []);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Failed to load LLD curriculum data:", err);
        if (isMounted) setIsLoading(false);
      }
    };

    loadLldData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync URL topicId to selectedTopic state
  useEffect(() => {
    if (sections.length > 0 && urlTopicId) {
      const allTopics = sections.flatMap((sec) => sec.topics || []);
      const found = allTopics.find((t) => t.id === urlTopicId);
      if (found) {
        setSelectedTopic({ id: found.id, title: found.title });
      } else {
        setSelectedTopic({ id: urlTopicId, title: urlTopicId.replace(/-/g, " ") });
      }
    } else if (!urlTopicId) {
      setSelectedTopic(null);
    }
  }, [sections, urlTopicId]);

  // Save completed topic IDs to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedTopicIds));
    } catch (e) {
      console.error("Failed to save LLD completed topics:", e);
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

  const handleSelectTopic = (topic) => {
    const topicId = typeof topic === "string" ? topic : topic.id;
    const topicTitle = typeof topic === "string" ? topic : topic.title;
    setSelectedTopic({ id: topicId, title: topicTitle });
    navigate(`/lld/${topicId}`);
  };

  const handleBackToOverview = () => {
    setSelectedTopic(null);
    navigate("/lld");
  };

  const safeCompletedIds = Array.isArray(completedTopicIds) ? completedTopicIds : [];

  return (
    <div className="xlr-hld-layout">
      {/* Sticky Top Navigation */}
      <header className="xlr-sticky-header">
        <Announcementbar />
        <Navbar />
      </header>

      {/* Render Topic Detail Reading View OR Full LLD Course Dashboard Overview */}
      {selectedTopic ? (
        <TopicDetailView
          topicId={selectedTopic.id}
          topicTitle={selectedTopic.title}
          courseType="LLD"
          sidebarTitle="MASTER LLD INTERVIEWS"
          allSections={sections}
          completedTopicIds={safeCompletedIds}
          onToggleTopicStatus={handleToggleTopicStatus}
          onSelectTopic={(id, title) => handleSelectTopic({ id, title })}
          onBackToOverview={handleBackToOverview}
        />
      ) : !isLoading && sections.length > 0 ? (
        <LLDDashboard
          categories={sections}
          onNavigateHome={() => navigate("/")}
          onTopicSelect={(topic) => handleSelectTopic(topic)}
        />
      ) : (
        <div style={{ padding: "80px 20px", textAlign: "center", width: "100%", color: "#94a3b8" }}>
          <h2>Loading LLD Curriculum...</h2>
        </div>
      )}
    </div>
  );
}

export default LldPage;
