import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Attach JWT token from localStorage if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("algovia_admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export class AdminApiService {
  /**
   * Admin Login (Super Admin: admin@algovia.io / Password: Gagan@0123)
   */
  async login({ email, password }) {
    const response = await api.post("/admin/login", { email, password });
    if (response.data?.token) {
      localStorage.setItem("algovia_admin_token", response.data.token);
      if (response.data.admin) {
        localStorage.setItem("algovia_admin_user", JSON.stringify(response.data.admin));
      }
    }
    return response.data;
  }

  /**
   * Logout Admin Session
   */
  logout() {
    localStorage.removeItem("algovia_admin_token");
    localStorage.removeItem("algovia_admin_user");
  }

  /**
   * Check if Admin is currently authenticated
   */
  isAuthenticated() {
    return Boolean(localStorage.getItem("algovia_admin_token"));
  }

  /**
   * Fetch 100% Real SQL Metrics & Revenue Analytics from DB
   */
  async getDashboardMetrics() {
    const response = await api.get("/admin/metrics");
    return response.data;
  }

  /**
   * Fetch 100% Real SQL Users Directory
   */
  async getUsers() {
    const response = await api.get("/admin/users");
    return response.data;
  }

  /**
   * Admin Override: Update User Subscription in SQL DB
   */
  async updateUserSubscription(userId, { planId, billingCycle, daysToExtend }) {
    const response = await api.post(`/admin/users/${userId}/subscription`, {
      planId,
      billingCycle,
      daysToExtend
    });
    return response.data;
  }

  /**
   * Fetch 100% Real Student Verification Requests from SQL DB
   */
  async getStudentVerifications() {
    const response = await api.get("/admin/student-verifications");
    return response.data;
  }

  /**
   * Approve or Reject Student Verification Request
   */
  async updateStudentVerification(requestId, status) {
    const response = await api.post(`/admin/student-verifications/${requestId}`, { status });
    return response.data;
  }

  /**
   * Fetch 100% Real Payments & Razorpay Audit Ledger from SQL DB
   */
  async getPaymentTransactions() {
    const response = await api.get("/admin/payments");
    return response.data;
  }

  /**
   * Check Backend Server Health
   */
  async getHealthStatus() {
    const response = await api.get("/health");
    return response.data;
  }
}

export const adminApi = new AdminApiService();
