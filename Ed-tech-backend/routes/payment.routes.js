import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = Router();

// Protected Payment Endpoints
router.post("/create-order", authenticateToken, PaymentController.createOrder);
router.post("/verify-signature", authenticateToken, PaymentController.verifyPayment);

export default router;
