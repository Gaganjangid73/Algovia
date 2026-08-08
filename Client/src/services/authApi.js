/**
 * Enterprise Production API Service Layer for Authentication
 * Connects Algovia Client Frontend directly to Express.js + MySQL Backend
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api/auth";

export const TOKEN_STORAGE_KEY = "algovia_jwt_token";
export const USER_STORAGE_KEY = "algovia_auth_user";

class AuthApiService {
  /**
   * Helper function for standard HTTP fetch calls with JSON parsing and error handling
   */
  async _request(endpoint, options = {}) {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        mode: "cors",
        ...options,
        headers
      });

      const data = await response.json();

      if (!response.ok) {
        const error = new Error(data.message || "An unexpected network error occurred.");
        error.status = response.status;
        error.data = data;
        throw error;
      }

      return data;
    } catch (err) {
      console.error(`[AuthApi] Network Error (${endpoint}):`, err);
      if (err.message && err.message !== "Failed to fetch") {
        throw err;
      }
      throw new Error("Unable to connect to server. Please ensure backend is running on http://localhost:5000");
    }
  }

  /**
   * Google OAuth2 Authentication
   */
  async loginWithGoogle(idToken) {
    const result = await this._request("/google", {
      method: "POST",
      body: JSON.stringify({ idToken })
    });

    if (result.accessToken) {
      localStorage.setItem(TOKEN_STORAGE_KEY, result.accessToken);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(result.user));
    }

    return result;
  }

  /**
   * Request 6-digit OTP code for user email
   */
  async sendOtp(email) {
    return await this._request("/send-otp", {
      method: "POST",
      body: JSON.stringify({ email })
    });
  }

  /**
   * Verify 6-digit OTP code and retrieve JWT Access Token
   */
  async verifyOtp(email, otp) {
    const result = await this._request("/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp })
    });

    if (result.accessToken) {
      localStorage.setItem(TOKEN_STORAGE_KEY, result.accessToken);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(result.user));
    }

    return result;
  }

  /**
   * Retrieve current authenticated user profile using stored JWT token
   */
  async getMe() {
    return await this._request("/me", {
      method: "GET"
    });
  }

  /**
   * Logout user and revoke refresh tokens
   */
  async logout() {
    try {
      await this._request("/logout", { method: "POST" });
    } catch (e) {
      console.warn("[AuthApi] Silent logout request failure:", e);
    } finally {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }

  /**
   * Create Razorpay Payment Order
   */
  async createPaymentOrder({ amount, currency, planId, billingCycle, teamSeats }) {
    const rawRoot = API_BASE_URL.replace(/\/api\/auth$/, "/api");
    const token = this.getToken();

    const response = await fetch(`${rawRoot}/payment/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ amount, currency, planId, billingCycle, teamSeats })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to create payment order.");
    }
    return data;
  }

  /**
   * Verify Razorpay Payment Signature
   */
  async verifyPaymentSignature(payload) {
    const rawRoot = API_BASE_URL.replace(/\/api\/auth$/, "/api");
    const token = this.getToken();

    const response = await fetch(`${rawRoot}/payment/verify-signature`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Payment signature verification failed.");
    }
    return data;
  }

  /**
   * Verify Razorpay Payment Signature (alias)
   */
  async verifyPayment(payload) {
    return await this.verifyPaymentSignature(payload);
  }

  /**
   * Mark Payment as Failed or Cancelled in Backend DB
   */
  async markPaymentFailed({ razorpay_order_id, error_code, error_description, status = "failed" }) {
    const rawRoot = API_BASE_URL.replace(/\/api\/auth$/, "/api");
    const token = this.getToken();

    try {
      const response = await fetch(`${rawRoot}/payment/mark-failed`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ razorpay_order_id, error_code, error_description, status })
      });

      return await response.json();
    } catch (err) {
      console.warn("[AuthApi] Mark payment failed network warning:", err);
      return { success: false, message: err.message };
    }
  }

  /**
   * Fetch Active Subscription Status and Protection Metadata
   */
  async getSubscriptionStatus() {
    const rawRoot = API_BASE_URL.replace(/\/api\/auth$/, "/api");
    const token = this.getToken();

    const response = await fetch(`${rawRoot}/subscription/status`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch subscription status.");
    }
    return data;
  }

  /**
   * Fetch Prorated Subscription Upgrade Quote
   */
  async getUpgradeQuote({ newPlanId = "FULL_YEARLY", currency = "INR" }) {
    const rawRoot = API_BASE_URL.replace(/\/api\/auth$/, "/api");
    const token = this.getToken();

    const response = await fetch(`${rawRoot}/subscription/upgrade-quote?newPlanId=${newPlanId}&currency=${currency}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch upgrade quote.");
    }
    return data;
  }

  /**
   * Create Prorated Razorpay Order for Upgrade
   */
  async createUpgradeOrder({ newPlanId = "FULL_YEARLY", currency = "INR" }) {
    const rawRoot = API_BASE_URL.replace(/\/api\/auth$/, "/api");
    const token = this.getToken();

    const response = await fetch(`${rawRoot}/subscription/create-upgrade-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ newPlanId, currency })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to create upgrade order.");
    }
    return data;
  }

  /**
   * Verify Prorated Upgrade Payment & Grant Upgrade Access
   */
  async verifyUpgradePayment(payload) {
    const rawRoot = API_BASE_URL.replace(/\/api\/auth$/, "/api");
    const token = this.getToken();

    const response = await fetch(`${rawRoot}/subscription/verify-upgrade-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Upgrade payment verification failed.");
    }
    return data;
  }

  /**
   * Retrieve stored access token
   */
  getToken() {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  }
}

export const authApi = new AuthApiService();
