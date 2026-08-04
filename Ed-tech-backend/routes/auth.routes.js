import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = Router();

// Public Authentication Endpoints
router.post("/google", AuthController.googleAuth);
router.post("/send-otp", AuthController.sendOtp);
router.post("/verify-otp", AuthController.verifyOtp);

// Protected Authentication Endpoints
router.get("/me", authenticateToken, AuthController.getMe);
router.post("/logout", authenticateToken, AuthController.logout);

export default router;
