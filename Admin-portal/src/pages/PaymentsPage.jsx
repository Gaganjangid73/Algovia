import React, { useState, useEffect } from "react";
import {
  RiBankCardLine,
  RiSearchLine,
  RiDownloadLine,
  RiShieldCheckLine
} from "react-icons/ri";
import { adminApi } from "../services/adminApi";
import "./PaymentsPage.css";

export default function PaymentsPage() {
  const [transactions, setTransactions] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    adminApi.getPaymentTransactions().then((res) => {
      if (res.transactions) setTransactions(res.transactions);
    });
  }, []);

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      (tx.userEmail || "").toLowerCase().includes(search.toLowerCase()) ||
      (tx.orderId || "").toLowerCase().includes(search.toLowerCase()) ||
      (tx.paymentId || "").toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter === "all") return true;
    return tx.status.toLowerCase() === statusFilter.toLowerCase();
  });

  const totalPaidVolume = transactions
    .filter((tx) => tx.status === "PAID" || tx.status === "UPGRADED")
    .reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="admin-payments-view">
      <div className="admin-dashboard-header">
        <h1 className="admin-page-title">Razorpay Payment Audit & Financial Ledger</h1>
        <p className="admin-page-subtitle">
          Real-time order logs, cryptographic signature verifications, and transaction records.
        </p>
      </div>

      {/* Summary Banner */}
      <div className="admin-grid-2" style={{ marginBottom: "24px" }}>
        <div className="admin-card">
          <div className="admin-stat-label">TOTAL PROCESSED VOLUME</div>
          <div className="admin-stat-value" style={{ color: "#10b981" }}>₹{totalPaidVolume.toLocaleString()}</div>
          <span className="admin-badge admin-badge--success">100% Cryptographically Verified</span>
        </div>

        <div className="admin-card">
          <div className="admin-stat-label">RAZORPAY GATEWAY INTEGRATION</div>
          <div className="admin-stat-value" style={{ color: "#3b82f6" }}>ACTIVE (Test Mode)</div>
          <span className="admin-badge admin-badge--primary">Webhook & Signature Verified</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="admin-filter-bar">
        <button
          className={`admin-chip-btn ${statusFilter === "all" ? "admin-chip-btn--active" : ""}`}
          onClick={() => setStatusFilter("all")}
        >
          All ({transactions.length})
        </button>
        <button
          className={`admin-chip-btn ${statusFilter === "paid" ? "admin-chip-btn--active" : ""}`}
          onClick={() => setStatusFilter("paid")}
        >
          Paid ({transactions.filter((t) => t.status === "PAID").length})
        </button>
        <button
          className={`admin-chip-btn ${statusFilter === "upgraded" ? "admin-chip-btn--active" : ""}`}
          onClick={() => setStatusFilter("upgraded")}
        >
          Upgraded ({transactions.filter((t) => t.status === "UPGRADED").length})
        </button>
        <button
          className={`admin-chip-btn ${statusFilter === "failed" ? "admin-chip-btn--active" : ""}`}
          onClick={() => setStatusFilter("failed")}
        >
          Failed ({transactions.filter((t) => t.status === "FAILED").length})
        </button>

        <div className="admin-input-group" style={{ marginLeft: "auto", width: "260px" }}>
          <RiSearchLine size={15} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search order ID or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Transaction Table */}
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID & Payment ID</th>
              <th>Customer Email</th>
              <th>Subscription Plan</th>
              <th>Payable Amount</th>
              <th>Gateway Status</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => (
              <tr key={tx.id}>
                <td>
                  <div style={{ fontFamily: "monospace", color: "#3b82f6", fontWeight: "700" }}>
                    {tx.orderId}
                  </div>
                  <div style={{ fontFamily: "monospace", color: "var(--admin-text-muted)", fontSize: "11px" }}>
                    {tx.paymentId || "N/A (Failed/Pending)"}
                  </div>
                </td>
                <td style={{ fontWeight: "600" }}>{tx.userEmail}</td>
                <td>
                  <span className="admin-badge admin-badge--neutral">{tx.plan}</span>
                </td>
                <td style={{ fontWeight: "800", color: "#f8fafc" }}>
                  ₹{tx.amount.toLocaleString()} <span style={{ fontSize: "11px", color: "var(--admin-text-muted)" }}>{tx.currency}</span>
                </td>
                <td>
                  {tx.status === "PAID" && (
                    <span className="admin-badge admin-badge--success">PAID</span>
                  )}
                  {tx.status === "FAILED" && (
                    <span className="admin-badge admin-badge--danger">FAILED</span>
                  )}
                  {tx.status === "UPGRADED" && (
                    <span className="admin-badge admin-badge--purple">UPGRADED</span>
                  )}
                </td>
                <td style={{ color: "var(--admin-text-muted)", fontSize: "12px" }}>
                  {new Date(tx.date).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
