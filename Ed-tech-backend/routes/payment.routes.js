import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = Router();

// 1. Create Order Endpoint
router.post("/create-order", authenticateToken, PaymentController.createOrder);

// 2. Cryptographic Verification Endpoints (supports both /verify-payment and /verify-signature)
router.post("/verify-payment", authenticateToken, PaymentController.verifyPayment);
router.post("/verify-signature", authenticateToken, PaymentController.verifyPayment);

// 3. Mark Failed / Cancelled Endpoint
router.post("/mark-failed", authenticateToken, PaymentController.markFailed);

// 4. Asynchronous Recovery System: Razorpay Webhook Endpoint
router.post("/webhook", PaymentController.handleWebhook);

export default router;
