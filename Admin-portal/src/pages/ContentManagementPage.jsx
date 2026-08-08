import React, { useState, useEffect } from "react";
import {
  RiBookOpenLine,
  RiAddLine,
  RiEditLine,
  RiDeleteBin6Line,
  RiLockLine,
  RiLockUnlockLine,
  RiCheckLine,
  RiCloseLine,
  RiSearchLine,
  RiCpuLine,
  RiServerLine,
  RiBrainLine,
  RiSparklingLine
} from "react-icons/ri";
import { adminApi } from "../services/adminApi";
import "./ContentManagementPage.css";

export default function ContentManagementPage() {
  const [activeTrack, setActiveTrack] = useState("sde"); // 'sde' | 'devops' | 'ai'
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionSuccess, setActionSuccess] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    track: "sde",
    category: "HLD",
    difficulty: "Intermediate",
    estimatedMinutes: 20,
    isPremium: true,
    summary: "",
    content: ""
  });

  // Fetch topics live from SQL DB
  const loadTopics = async () => {
    setIsLoading(true);
    try {
      const res = await adminApi.getCurriculumTopics({ track: activeTrack });
      if (res.topics) setTopics(res.topics);
    } catch (err) {
      console.error("[ContentManagementPage] Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTopics();
    setActiveCategory("All");
  }, [activeTrack]);

  // Handle Modal Open for Create
  const handleOpenCreate = () => {
    setEditingTopic(null);
    setFormData({
      title: "",
      slug: "",
      track: activeTrack,
      category: activeTrack === "sde" ? "HLD" : activeTrack === "devops" ? "Docker" : "AI Systems",
      difficulty: "Intermediate",
      estimatedMinutes: 20,
      isPremium: true,
      summary: "",
      content: ""
    });
    setIsModalOpen(true);
  };

  // Handle Modal Open for Edit
  const handleOpenEdit = (topic) => {
    setEditingTopic(topic);
    setFormData({
      title: topic.title,
      slug: topic.slug,
      track: topic.track,
      category: topic.category,
      difficulty: topic.difficulty,
      estimatedMinutes: topic.estimated_minutes || topic.estimatedMinutes || 20,
      isPremium: Boolean(topic.isPremium || topic.is_premium),
      summary: topic.summary || "",
      content: topic.content || ""
    });
    setIsModalOpen(true);
  };

  // Title Auto-slug Generator
  const handleTitleChange = (e) => {
    const titleVal = e.target.value;
    const autoSlug = titleVal
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setFormData((prev) => ({
      ...prev,
      title: titleVal,
      slug: editingTopic ? prev.slug : autoSlug
    }));
  };

  // Handle Form Submit (POST create or PUT update)
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (editingTopic) {
        await adminApi.updateCurriculumTopic(editingTopic.id, formData);
        setActionSuccess(`Topic '${formData.title}' updated successfully!`);
      } else {
        await adminApi.createCurriculumTopic(formData);
        setActionSuccess(`New topic '${formData.title}' published successfully!`);
      }
      setIsModalOpen(false);
      loadTopics();
    } catch (err) {
      console.error("[ContentManagementPage] Save error:", err);
      alert(err.message || "Failed to save topic.");
    }
  };

  // Toggle Visibility Access (Free Preview vs Premium Only)
  const handleToggleVisibility = async (id, currentTitle) => {
    try {
      const res = await adminApi.toggleCurriculumTopicVisibility(id);
      setActionSuccess(`Access level updated for '${currentTitle}'.`);
      loadTopics();
    } catch (err) {
      console.error("[ContentManagementPage] Toggle error:", err);
    }
  };

  // Delete Topic
  const handleDeleteTopic = async (id, currentTitle) => {
    if (!window.confirm(`Are you sure you want to delete '${currentTitle}'?`)) return;
    try {
      await adminApi.deleteCurriculumTopic(id);
      setActionSuccess(`Topic '${currentTitle}' deleted.`);
      loadTopics();
    } catch (err) {
      console.error("[ContentManagementPage] Delete error:", err);
    }
  };

  // Extract unique categories for active track
  const availableCategories = ["All", ...new Set(topics.map((t) => t.category))];

  // Filter topics
  const filteredTopics = topics.filter((t) => {
    const matchesCategory = activeCategory === "All" || t.category === activeCategory;
    const matchesSearch =
      (t.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.summary || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.category || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="admin-content-view">
      <div className="admin-dashboard-header">
        <h1 className="admin-page-title">Curriculum Content & Track Control</h1>
        <p className="admin-page-subtitle">
          Author, publish, edit, and toggle access levels for System Design (SDE), DevOps, and AI/ML tracks.
        </p>
      </div>

      {actionSuccess && (
        <div className="admin-badge admin-badge--success" style={{ padding: "12px 18px", fontSize: "13px", marginBottom: "20px", width: "100%" }}>
          <RiCheckLine size={16} /> {actionSuccess}
        </div>
      )}

      {/* 3 Main Track Tabs */}
      <div className="admin-track-tabs">
        <button
          type="button"
          className={`admin-track-tab ${activeTrack === "sde" ? "admin-track-tab--active" : ""}`}
          onClick={() => setActiveTrack("sde")}
        >
          <RiCpuLine size={20} />
          <span>SDE (System Design HLD / LLD)</span>
        </button>

        <button
          type="button"
          className={`admin-track-tab ${activeTrack === "devops" ? "admin-track-tab--active" : ""}`}
          onClick={() => setActiveTrack("devops")}
        >
          <RiServerLine size={20} />
          <span>DevOps Engineering</span>
        </button>

        <button
          type="button"
          className={`admin-track-tab ${activeTrack === "ai" ? "admin-track-tab--active" : ""}`}
          onClick={() => setActiveTrack("ai")}
        >
          <RiBrainLine size={20} />
          <span>AI & ML Systems</span>
        </button>
      </div>

      {/* Category Chips & Action Toolbar */}
      <div className="admin-flex-between" style={{ marginBottom: "20px", flexWrap: "wrap", gap: "16px" }}>
        <div className="admin-category-bar" style={{ margin: 0 }}>
          {availableCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`admin-category-chip ${activeCategory === cat ? "admin-category-chip--active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="admin-flex-row" style={{ gap: "12px" }}>
          <div className="admin-input-group" style={{ width: "240px" }}>
            <RiSearchLine size={15} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="admin-btn admin-btn--primary"
            onClick={handleOpenCreate}
          >
            <RiAddLine size={18} /> Create Curriculum Topic
          </button>
        </div>
      </div>

      {/* Topics Table */}
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Track & Category</th>
              <th>Topic Title & Summary</th>
              <th>Difficulty</th>
              <th>Est. Time</th>
              <th>Access Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTopics.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", color: "var(--admin-text-muted)", padding: "35px" }}>
                  No curriculum topics found for this track/category filter. Click "+ Create Curriculum Topic" to add one!
                </td>
              </tr>
            ) : (
              filteredTopics.map((t) => (
                <tr key={t.id}>
                  <td>
                    <span className="admin-badge admin-badge--purple" style={{ textTransform: "uppercase", marginBottom: "4px" }}>
                      {t.track}
                    </span>
                    <div style={{ fontWeight: "700", color: "#3b82f6", fontSize: "12.5px" }}>{t.category}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: "700", color: "#f8fafc", fontSize: "14px" }}>{t.title}</div>
                    <div style={{ color: "var(--admin-text-muted)", fontSize: "12px", maxWidth: "450px" }}>
                      {t.summary || "No summary specified."}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`admin-badge ${
                        t.difficulty === "Beginner"
                          ? "admin-badge--success"
                          : t.difficulty === "Advanced"
                          ? "admin-badge--danger"
                          : "admin-badge--primary"
                      }`}
                    >
                      {t.difficulty}
                    </span>
                  </td>
                  <td style={{ fontWeight: "600" }}>{t.estimated_minutes || t.estimatedMinutes || 20} mins</td>
                  <td>
                    {t.isPremium ? (
                      <span className="admin-badge admin-badge--warning">
                        <RiLockLine /> Premium Locked
                      </span>
                    ) : (
                      <span className="admin-badge admin-badge--success">
                        <RiLockUnlockLine /> Free Preview
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="admin-flex-row" style={{ gap: "6px" }}>
                      <button
                        type="button"
                        className="admin-btn admin-btn--sm"
                        onClick={() => handleOpenEdit(t)}
                        title="Edit Topic Content"
                      >
                        <RiEditLine size={14} /> Edit
                      </button>

                      <button
                        type="button"
                        className={`admin-btn admin-btn--sm ${t.isPremium ? "admin-btn--success" : "admin-btn--danger"}`}
                        onClick={() => handleToggleVisibility(t.id, t.title)}
                        title="Toggle Access Level"
                      >
                        {t.isPremium ? "Make Free" : "Lock Premium"}
                      </button>

                      <button
                        type="button"
                        className="admin-btn admin-btn--danger admin-btn--sm"
                        onClick={() => handleDeleteTopic(t.id, t.title)}
                        title="Delete Topic"
                      >
                        <RiDeleteBin6Line size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Full Topic Authoring Modal */}
      {isModalOpen && (
        <div className="admin-author-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="admin-author-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-flex-between">
              <h3 className="admin-section-title">
                {editingTopic ? "Edit Curriculum Topic" : "Author New Curriculum Topic"}
              </h3>
              <button
                type="button"
                style={{ background: "none", border: "none", color: "var(--admin-text-secondary)", cursor: "pointer" }}
                onClick={() => setIsModalOpen(false)}
              >
                <RiCloseLine size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="admin-form-grid-2">
                <div className="admin-field-box">
                  <label className="admin-field-label">Track Selection</label>
                  <select
                    className="admin-field-select"
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                    required
                  >
                    <option value="sde">SDE (System Design HLD / LLD)</option>
                    <option value="devops">DevOps Engineering</option>
                    <option value="ai">AI & ML Systems</option>
                  </select>
                </div>

                <div className="admin-field-box">
                  <label className="admin-field-label">Module Category</label>
                  <input
                    type="text"
                    className="admin-field-input"
                    placeholder="e.g. HLD, LLD, Scenarios, Docker, LLM Apps"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="admin-field-box">
                <label className="admin-field-label">Topic Title</label>
                <input
                  type="text"
                  className="admin-field-input"
                  placeholder="e.g. Designing Distributed Rate Limiter"
                  value={formData.title}
                  onChange={handleTitleChange}
                  required
                />
              </div>

              <div className="admin-form-grid-2">
                <div className="admin-field-box">
                  <label className="admin-field-label">URL Slug</label>
                  <input
                    type="text"
                    className="admin-field-input"
                    placeholder="design-distributed-rate-limiter"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-field-box">
                  <label className="admin-field-label">Difficulty Level</label>
                  <select
                    className="admin-field-select"
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="admin-form-grid-2">
                <div className="admin-field-box">
                  <label className="admin-field-label">Estimated Time (Minutes)</label>
                  <input
                    type="number"
                    min={5}
                    max={180}
                    className="admin-field-input"
                    value={formData.estimatedMinutes}
                    onChange={(e) => setFormData({ ...formData, estimatedMinutes: e.target.value })}
                  />
                </div>

                <div className="admin-field-box">
                  <label className="admin-field-label">Access Level</label>
                  <select
                    className="admin-field-select"
                    value={formData.isPremium ? "true" : "false"}
                    onChange={(e) => setFormData({ ...formData, isPremium: e.target.value === "true" })}
                  >
                    <option value="true">🔒 Premium Subscription Locked</option>
                    <option value="false">🔓 Free Preview Available</option>
                  </select>
                </div>
              </div>

              <div className="admin-field-box">
                <label className="admin-field-label">Content Summary / Subtitle</label>
                <textarea
                  className="admin-field-textarea"
                  style={{ minHeight: "60px" }}
                  placeholder="Brief summary explaining what students will learn in this topic..."
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  required
                />
              </div>

              <div className="admin-field-box">
                <label className="admin-field-label">Full Lesson Content (Markdown / HTML)</label>
                <textarea
                  className="admin-field-textarea"
                  style={{ minHeight: "140px" }}
                  placeholder="Write full architectural breakdown, system diagrams, SOLID code examples, and trade-off analysis..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
              </div>

              <div className="admin-flex-row" style={{ justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                <button
                  type="button"
                  className="admin-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="admin-btn admin-btn--primary"
                >
                  <RiSparklingLine /> {editingTopic ? "Save Changes" : "Publish Topic"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
