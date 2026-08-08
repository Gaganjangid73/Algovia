import { db } from "../config/database.js";

/**
 * Middleware to restrict access to Admin users only
 */
export async function requireAdmin(req, res, next) {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ success: false, message: "Authentication required." });
    }

    const user = await db("users").where({ id: req.user.userId }).first();
    if (!user || user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Super Admin privileges required."
      });
    }

    req.adminUser = user;
    next();
  } catch (err) {
    console.error("[requireAdmin] Error:", err.message);
    return res.status(500).json({ success: false, message: "Internal server error during authorization." });
  }
}
