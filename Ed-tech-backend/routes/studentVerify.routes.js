import { Router } from "express";
import { StudentVerifyController } from "../controllers/studentVerify.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = Router();

// Protected Routes
router.post("/send-code", authenticateToken, StudentVerifyController.sendCode);
router.post("/verify-code", authenticateToken, StudentVerifyController.verifyCode);
router.get("/status", authenticateToken, StudentVerifyController.getStatus);

export default router;
