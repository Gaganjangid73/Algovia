import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../config/database.js";
import { AdminRepository } from "../repositories/admin.repository.js";

const JWT_SECRET = process.env.JWT_SECRET || "algovia_jwt_super_secret_key_2026";

export class AdminController {
  /**
   * POST /api/admin/login
   * Admin Authentication Endpoint (Default Password: Gagan@0123)
   */
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required." });
      }

      const user = await db("users").where({ email: email.trim() }).first();
      if (!user) {
        return res.status(401).json({ success: false, message: "Invalid admin credentials." });
      }

      if (user.role !== "admin") {
        return res.status(403).json({ success: false, message: "Access denied. Super Admin role required." });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid admin credentials." });
      }

      // Sign JWT Token
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: "admin", isAdmin: true },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      console.log(`🔑 [Admin Auth] Super Admin ${user.email} logged in successfully.`);

      return res.status(200).json({
        success: true,
        message: "Admin login successful.",
        token,
        admin: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (err) {
      console.error("[AdminController] login error:", err.message);
      return res.status(500).json({ success: false, message: err.message || "Admin login failed." });
    }
  }

  /**
   * GET /api/admin/metrics
   */
  static async getMetrics(req, res, next) {
    try {
      const metrics = await AdminRepository.getRealMetrics();
      return res.status(200).json({ success: true, metrics });
    } catch (err) {
      console.error("[AdminController] getMetrics error:", err.message);
      return res.status(500).json({ success: false, message: "Failed to fetch real-time metrics." });
    }
  }

  /**
   * GET /api/admin/users
   */
  static async getUsers(req, res, next) {
    try {
      const users = await AdminRepository.getAllUsers();
      return res.status(200).json({ success: true, users });
    } catch (err) {
      console.error("[AdminController] getUsers error:", err.message);
      return res.status(500).json({ success: false, message: "Failed to fetch real user directory." });
    }
  }

  /**
   * POST /api/admin/users/:userId/subscription
   */
  static async updateUserSubscription(req, res, next) {
    try {
      const { userId } = req.params;
      const { planId, billingCycle, daysToExtend } = req.body;
      const result = await AdminRepository.updateUserSubscription(userId, { planId, billingCycle, daysToExtend });
      return res.status(200).json({ success: true, result, message: "User subscription updated successfully." });
    } catch (err) {
      console.error("[AdminController] updateUserSubscription error:", err.message);
      return res.status(500).json({ success: false, message: "Failed to update user subscription." });
    }
  }

  /**
   * GET /api/admin/student-verifications
   */
  static async getStudentVerifications(req, res, next) {
    try {
      const requests = await AdminRepository.getStudentVerifications();
      return res.status(200).json({ success: true, requests });
    } catch (err) {
      console.error("[AdminController] getStudentVerifications error:", err.message);
      return res.status(500).json({ success: false, message: "Failed to fetch student verifications." });
    }
  }

  /**
   * GET /api/admin/payments
   */
  static async getPayments(req, res, next) {
    try {
      const transactions = await AdminRepository.getAllPayments();
      return res.status(200).json({ success: true, transactions });
    } catch (err) {
      console.error("[AdminController] getPayments error:", err.message);
      return res.status(500).json({ success: false, message: "Failed to fetch payment ledger." });
    }
  }
}
