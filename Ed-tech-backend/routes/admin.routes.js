import { Router } from "express";
import { AdminController } from "../controllers/admin.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/adminAuth.middleware.js";

const router = Router();

// Public Admin Login Route
router.post("/login", AdminController.login);

// Protected Super Admin Routes
router.get("/metrics", authenticateToken, requireAdmin, AdminController.getMetrics);
router.get("/users", authenticateToken, requireAdmin, AdminController.getUsers);
router.post("/users/:userId/subscription", authenticateToken, requireAdmin, AdminController.updateUserSubscription);
router.get("/student-verifications", authenticateToken, requireAdmin, AdminController.getStudentVerifications);
router.get("/payments", authenticateToken, requireAdmin, AdminController.getPayments);

export default router;
