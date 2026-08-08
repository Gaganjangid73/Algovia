import React, { useState, useEffect } from "react";
import {
  RiGraduationCapLine,
  RiCheckLine,
  RiCloseLine,
  RiShieldCheckLine,
  RiTimeLine
} from "react-icons/ri";
import { adminApi } from "../services/adminApi";
import "./StudentVerificationsPage.css";

export default function StudentVerificationsPage() {
  const [requests, setRequests] = useState([]);
  const [actionSuccess, setActionSuccess] = useState("");

  useEffect(() => {
    adminApi.getStudentVerifications().then((res) => {
      if (res.requests) setRequests(res.requests);
    });
  }, []);

  const handleApprove = async (id, userName) => {
    await adminApi.updateStudentVerification(id, "approved");
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "approved" } : r))
    );
    setActionSuccess(`Student verification approved for ${userName}!`);
  };

  const handleReject = async (id, userName) => {
    await adminApi.updateStudentVerification(id, "rejected");
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "rejected" } : r))
    );
    setActionSuccess(`Student verification rejected for ${userName}.`);
  };

  const pendingRequests = requests.filter((r) => r.status === "pending");
  const approvedRequests = requests.filter((r) => r.status === "approved");

  return (
    <div className="admin-students-view">
      <div className="admin-dashboard-header">
        <h1 className="admin-page-title">Student Status Verification Queue</h1>
        <p className="admin-page-subtitle">
          Review, approve, or reject student discount credentials (.edu, .ac.in, .org emails).
        </p>
      </div>

      {actionSuccess && (
        <div className="admin-badge admin-badge--success" style={{ padding: "12px 18px", fontSize: "13px", marginBottom: "20px", width: "100%" }}>
          <RiCheckLine size={16} /> {actionSuccess}
        </div>
      )}

      {/* Summary Cards */}
      <div className="admin-student-grid">
        <div className="admin-card">
          <div className="admin-stat-label">PENDING APPROVALS</div>
          <div className="admin-stat-value" style={{ color: "#f59e0b" }}>{pendingRequests.length}</div>
          <span className="admin-badge admin-badge--warning">Requires Admin Action</span>
        </div>

        <div className="admin-card">
          <div className="admin-stat-label">APPROVED STUDENTS</div>
          <div className="admin-stat-value" style={{ color: "#10b981" }}>{approvedRequests.length}</div>
          <span className="admin-badge admin-badge--success">Unlocked ₹299/mo Student Plan</span>
        </div>

        <div className="admin-card">
          <div className="admin-stat-label">SUPPORTED DOMAINS</div>
          <div className="admin-stat-value" style={{ color: "#3b82f6" }}>.edu, .ac.in, .org</div>
          <span className="admin-badge admin-badge--primary">OTP Auto-Validated</span>
        </div>
      </div>

      {/* Pending Queue Table */}
      <div className="admin-section-block">
        <h2 className="admin-section-title" style={{ marginBottom: "14px" }}>
          Pending Student Verification Requests ({pendingRequests.length})
        </h2>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Applicant Name</th>
                <th>Submitted College Email</th>
                <th>Domain Category</th>
                <th>Submitted Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingRequests.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", color: "var(--admin-text-muted)", padding: "30px" }}>
                    🎉 No pending student verification requests. All caught up!
                  </td>
                </tr>
              ) : (
                pendingRequests.map((r) => (
                  <tr key={r.id}>
                    <td style={{ fontWeight: "700", color: "#f8fafc" }}>{r.userName}</td>
                    <td style={{ fontFamily: "monospace", color: "#3b82f6" }}>{r.email}</td>
                    <td>
                      <span className="admin-badge admin-badge--purple">{r.domain}</span>
                    </td>
                    <td style={{ color: "var(--admin-text-muted)", fontSize: "12px" }}>
                      {new Date(r.submittedAt).toLocaleString()}
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          className="admin-btn admin-btn--success admin-btn--sm"
                          onClick={() => handleApprove(r.id, r.userName)}
                        >
                          <RiCheckLine /> Approve
                        </button>
                        <button
                          className="admin-btn admin-btn--danger admin-btn--sm"
                          onClick={() => handleReject(r.id, r.userName)}
                        >
                          <RiCloseLine /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
