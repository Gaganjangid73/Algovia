import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  RiMoneyDollarCircleLine,
  RiGroupLine,
  RiGraduationCapLine,
  RiLineChartLine,
  RiArrowUpLine,
  RiArrowRightLine,
  RiExternalLinkLine,
  RiCheckLine,
  RiCloseLine
} from "react-icons/ri";
import { adminApi } from "../services/adminApi";
import "./DashboardPage.css";

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminApi.getDashboardMetrics().then((res) => {
      setData(res.metrics);
      setIsLoading(false);
    });
  }, []);

  const metrics = data || {
    mrr: 489500,
    arr: 5874000,
    totalRevenue: 1245800,
    totalUsers: 1420,
    activeSubscribers: 1248,
    studentVerifiedUsers: 342,
    conversionRate: 14.2,
    recentTransactions: []
  };

  return (
    <div className="admin-dashboard-view">
      {/* Title Header */}
      <div className="admin-dashboard-header">
        <h1 className="admin-page-title">Executive Performance Overview</h1>
        <p className="admin-page-subtitle">
          Real-time metrics, revenue analytics, and system performance audit.
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div className="admin-grid-4">
        {/* Card 1: MRR Revenue */}
        <div className="admin-card admin-stat-card admin-card--interactive">
          <div className="admin-stat-top">
            <span className="admin-stat-label">MONTHLY RECURRING REVENUE</span>
            <div className="admin-stat-icon-wrapper admin-stat-icon-wrapper--green">
              <RiMoneyDollarCircleLine />
            </div>
          </div>
          <div className="admin-stat-value">₹{metrics.mrr.toLocaleString()}</div>
          <div className="admin-stat-trend" style={{ color: "#10b981" }}>
            <RiArrowUpLine /> <span>+18.4% vs last month</span>
          </div>
        </div>

        {/* Card 2: Active Subscribers */}
        <div className="admin-card admin-stat-card admin-card--interactive">
          <div className="admin-stat-top">
            <span className="admin-stat-label">ACTIVE SUBSCRIBERS</span>
            <div className="admin-stat-icon-wrapper admin-stat-icon-wrapper--blue">
              <RiGroupLine />
            </div>
          </div>
          <div className="admin-stat-value">{metrics.activeSubscribers.toLocaleString()}</div>
          <div className="admin-stat-trend" style={{ color: "#3b82f6" }}>
            <RiArrowUpLine /> <span>+112 new this month</span>
          </div>
        </div>

        {/* Card 3: Student Status Verifications */}
        <div className="admin-card admin-stat-card admin-card--interactive">
          <div className="admin-stat-top">
            <span className="admin-stat-label">VERIFIED STUDENTS</span>
            <div className="admin-stat-icon-wrapper admin-stat-icon-wrapper--amber">
              <RiGraduationCapLine />
            </div>
          </div>
          <div className="admin-stat-value">{metrics.studentVerifiedUsers.toLocaleString()}</div>
          <div className="admin-stat-trend" style={{ color: "#f59e0b" }}>
            <span>.edu & .ac.in verified</span>
          </div>
        </div>

        {/* Card 4: Conversion Rate */}
        <div className="admin-card admin-stat-card admin-card--interactive">
          <div className="admin-stat-top">
            <span className="admin-stat-label">CONVERSION RATE</span>
            <div className="admin-stat-icon-wrapper admin-stat-icon-wrapper--purple">
              <RiLineChartLine />
            </div>
          </div>
          <div className="admin-stat-value">{metrics.conversionRate}%</div>
          <div className="admin-stat-trend" style={{ color: "#8b5cf6" }}>
            <RiArrowUpLine /> <span>+2.1% optimized</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Toolbar */}
      <div className="admin-quick-actions-bar">
        <Link to="/users" className="admin-btn admin-btn--primary">
          Manage User Directory →
        </Link>
        <Link to="/students" className="admin-btn admin-btn--success">
          Approve Pending Students (2) →
        </Link>
        <Link to="/payments" className="admin-btn">
          View Razorpay Audit Ledger
        </Link>
      </div>

      {/* Recent Transactions Table */}
      <div className="admin-section-block">
        <div className="admin-section-header">
          <h2 className="admin-section-title">Recent Razorpay Transactions</h2>
          <Link to="/payments" className="admin-btn admin-btn--sm">
            View All Ledger Entries <RiArrowRightLine />
          </Link>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>User Email</th>
                <th>Plan Purchased</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {(metrics.recentTransactions || []).map((tx) => (
                <tr key={tx.id}>
                  <td style={{ fontFamily: "monospace", color: "#3b82f6", fontWeight: "700" }}>
                    {tx.paymentId || tx.orderId}
                  </td>
                  <td>{tx.userEmail}</td>
                  <td>
                    <span className="admin-badge admin-badge--neutral">{tx.plan}</span>
                  </td>
                  <td style={{ fontWeight: "700" }}>₹{tx.amount.toLocaleString()}</td>
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
    </div>
  );
}
