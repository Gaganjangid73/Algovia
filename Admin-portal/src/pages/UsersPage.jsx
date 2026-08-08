import React, { useState, useEffect } from "react";
import {
  RiUser3Line,
  RiSearchLine,
  RiShieldCheckLine,
  RiGraduationCapLine,
  RiEditLine,
  RiCheckLine,
  RiCloseLine,
  RiSparklingLine
} from "react-icons/ri";
import { adminApi } from "../services/adminApi";
import "./UsersPage.css";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionSuccess, setActionSuccess] = useState("");

  useEffect(() => {
    adminApi.getUsers().then((res) => {
      if (res.users) setUsers(res.users);
    });
  }, []);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.plan || "").toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (filter === "all") return true;
    if (filter === "subscribed") return u.isSubscribed;
    if (filter === "basic") return (u.plan || "").toLowerCase().includes("basic");
    if (filter === "student") return u.isStudentVerified;
    if (filter === "free") return !u.isSubscribed;
    return true;
  });

  const handleGrantFullAccess = async (user) => {
    await adminApi.updateUserSubscription(user.id, { planId: "FULL_YEARLY", billingCycle: "yearly", daysToExtend: 365 });
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id
          ? { ...u, isSubscribed: true, plan: "Full Access", subscriptionPlan: "FULL_YEARLY", billingCycle: "yearly" }
          : u
      )
    );
    setActionSuccess(`Full Access granted to ${user.name}!`);
    setIsModalOpen(false);
  };

  const handleGrantStudentStatus = async (user) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id
          ? { ...u, isStudentVerified: true, studentEmail: u.email }
          : u
      )
    );
    setActionSuccess(`Student status verified for ${user.name}!`);
    setIsModalOpen(false);
  };

  const handleRevokeSubscription = async (user) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id
          ? { ...u, isSubscribed: false, plan: "Free Plan", subscriptionPlan: "FREE", billingCycle: "none" }
          : u
      )
    );
    setActionSuccess(`Subscription revoked for ${user.name}.`);
    setIsModalOpen(false);
  };

  return (
    <div className="admin-users-view">
      <div className="admin-dashboard-header">
        <h1 className="admin-page-title">User Directory & Admin Control</h1>
        <p className="admin-page-subtitle">
          Manage registered users, grant subscription overrides, and verify student credentials.
        </p>
      </div>

      {actionSuccess && (
        <div className="admin-badge admin-badge--success" style={{ padding: "12px 18px", fontSize: "13px", marginBottom: "16px", width: "100%" }}>
          <RiCheckLine size={16} /> {actionSuccess}
        </div>
      )}

      {/* Filter Chips Bar */}
      <div className="admin-filter-bar">
        <button
          className={`admin-chip-btn ${filter === "all" ? "admin-chip-btn--active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All Users ({users.length})
        </button>
        <button
          className={`admin-chip-btn ${filter === "subscribed" ? "admin-chip-btn--active" : ""}`}
          onClick={() => setFilter("subscribed")}
        >
          Subscribed ({users.filter((u) => u.isSubscribed).length})
        </button>
        <button
          className={`admin-chip-btn ${filter === "student" ? "admin-chip-btn--active" : ""}`}
          onClick={() => setFilter("student")}
        >
          Verified Students ({users.filter((u) => u.isStudentVerified).length})
        </button>
        <button
          className={`admin-chip-btn ${filter === "basic" ? "admin-chip-btn--active" : ""}`}
          onClick={() => setFilter("basic")}
        >
          Basic Plan ({users.filter((u) => (u.plan || "").toLowerCase().includes("basic")).length})
        </button>
        <button
          className={`admin-chip-btn ${filter === "free" ? "admin-chip-btn--active" : ""}`}
          onClick={() => setFilter("free")}
        >
          Free Tier ({users.filter((u) => !u.isSubscribed).length})
        </button>

        <div className="admin-input-group" style={{ marginLeft: "auto", width: "260px" }}>
          <RiSearchLine size={15} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* User Table */}
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User Name & Email</th>
              <th>Active Plan</th>
              <th>Student Verified</th>
              <th>Billing Cycle</th>
              <th>Registered Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id}>
                <td>
                  <div style={{ fontWeight: "700", color: "#f8fafc" }}>{u.name}</div>
                  <div style={{ color: "var(--admin-text-muted)", fontSize: "12px" }}>{u.email}</div>
                </td>
                <td>
                  {u.isSubscribed ? (
                    <span className="admin-badge admin-badge--success">{u.plan}</span>
                  ) : (
                    <span className="admin-badge admin-badge--neutral">Free Plan</span>
                  )}
                </td>
                <td>
                  {u.isStudentVerified ? (
                    <span className="admin-badge admin-badge--primary">
                      <RiGraduationCapLine /> Verified ({u.studentEmail ? u.studentEmail.split("@")[1] : ".edu"})
                    </span>
                  ) : (
                    <span className="admin-badge admin-badge--neutral">Unverified</span>
                  )}
                </td>
                <td style={{ textTransform: "capitalize", fontWeight: "600" }}>{u.billingCycle}</td>
                <td style={{ color: "var(--admin-text-muted)", fontSize: "12px" }}>
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td>
                  <button
                    className="admin-btn admin-btn--sm"
                    onClick={() => {
                      setSelectedUser(u);
                      setIsModalOpen(true);
                    }}
                  >
                    <RiEditLine size={14} /> Override Access
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Override Modal */}
      {isModalOpen && selectedUser && (
        <div className="admin-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-flex-between">
              <h3 className="admin-section-title">Admin Access Override</h3>
              <button
                style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }}
                onClick={() => setIsModalOpen(false)}
              >
                <RiCloseLine size={20} />
              </button>
            </div>

            <div>
              <div style={{ fontWeight: "800", fontSize: "15px", color: "#f8fafc" }}>{selectedUser.name}</div>
              <div style={{ color: "#94a3b8", fontSize: "13px" }}>{selectedUser.email}</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                className="admin-btn admin-btn--success"
                onClick={() => handleGrantFullAccess(selectedUser)}
              >
                <RiSparklingLine /> Grant 1-Year Full Access Plan
              </button>

              {!selectedUser.isStudentVerified && (
                <button
                  className="admin-btn admin-btn--primary"
                  onClick={() => handleGrantStudentStatus(selectedUser)}
                >
                  <RiGraduationCapLine /> Verify Student Status Manually
                </button>
              )}

              {selectedUser.isSubscribed && (
                <button
                  className="admin-btn admin-btn--danger"
                  onClick={() => handleRevokeSubscription(selectedUser)}
                >
                  Revoke Subscription Access
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
