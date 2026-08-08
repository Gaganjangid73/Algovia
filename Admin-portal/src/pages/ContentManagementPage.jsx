import React, { useState } from "react";
import { RiBookOpenLine, RiLockLine, RiLockUnlockLine, RiCheckLine } from "react-icons/ri";

export default function ContentManagementPage() {
  const [topics, setTopics] = useState([
    { id: "c1", category: "Low Level Design (LLD)", title: "What is Low Level Design (LLD)?", isPreview: true },
    { id: "c2", category: "Low Level Design (LLD)", title: "LLD vs HLD & Machine Coding", isPreview: true },
    { id: "c3", category: "Low Level Design (LLD)", title: "Types of LLD Interviews", isPreview: true },
    { id: "c4", category: "Low Level Design (LLD)", title: "Encapsulation & Abstraction Deep Dive", isPreview: false },
    { id: "c5", category: "High Level Design (HLD)", title: "System Architecture Basics", isPreview: true },
    { id: "c6", category: "High Level Design (HLD)", title: "Database Sharding & Partitioning", isPreview: false },
    { id: "c7", category: "System Design Scenarios", title: "Designing Parking Lot System", isPreview: true },
    { id: "c8", category: "System Design Scenarios", title: "Designing Distributed Rate Limiter", isPreview: false }
  ]);

  const togglePreview = (id) => {
    setTopics((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isPreview: !t.isPreview } : t))
    );
  };

  return (
    <div className="admin-content-view">
      <div className="admin-dashboard-header">
        <h1 className="admin-page-title">Curriculum Content & Access Control</h1>
        <p className="admin-page-subtitle">
          Toggle free preview access vs premium subscription lock across LLD, HLD, and Scenario modules.
        </p>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Curriculum Category</th>
              <th>Topic Title</th>
              <th>Access Level</th>
              <th>Action Toggle</th>
            </tr>
          </thead>
          <tbody>
            {topics.map((t) => (
              <tr key={t.id}>
                <td style={{ fontWeight: "700", color: "#3b82f6" }}>{t.category}</td>
                <td>{t.title}</td>
                <td>
                  {t.isPreview ? (
                    <span className="admin-badge admin-badge--success">
                      <RiLockUnlockLine /> Free Preview
                    </span>
                  ) : (
                    <span className="admin-badge admin-badge--warning">
                      <RiLockLine /> Premium Locked
                    </span>
                  )}
                </td>
                <td>
                  <button
                    className={`admin-btn admin-btn--sm ${t.isPreview ? "admin-btn--danger" : "admin-btn--success"}`}
                    onClick={() => togglePreview(t.id)}
                  >
                    {t.isPreview ? "Lock as Premium" : "Make Free Preview"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
