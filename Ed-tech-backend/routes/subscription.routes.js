import { Router } from "express";
import { SubscriptionController } from "../controllers/subscription.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = Router();

// Public: Get all subscription plans & pricing catalog
router.get("/plans", SubscriptionController.getPlans);

// Protected: Get current user active subscription status
router.get("/status", authenticateToken, SubscriptionController.getStatus);

// Protected Prorated Subscription Upgrade Endpoints
router.get("/upgrade-quote", authenticateToken, SubscriptionController.getUpgradeQuote);
router.post("/create-upgrade-order", authenticateToken, SubscriptionController.createUpgradeOrder);
router.post("/verify-upgrade-payment", authenticateToken, SubscriptionController.verifyUpgradePayment);

export default router;
