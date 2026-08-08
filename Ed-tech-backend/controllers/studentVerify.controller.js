import { StudentVerifyService } from "../services/studentVerify.service.js";

export class StudentVerifyController {
  /**
   * POST /api/student-verify/send-code
   */
  static async sendCode(req, res, next) {
    try {
      const userId = req.user.userId;
      const { email } = req.body;

      const result = await StudentVerifyService.sendVerificationCode({
        userId,
        email
      });

      return res.status(200).json(result);
    } catch (err) {
      console.error("[StudentVerifyController] sendCode error:", err.message);
      return res.status(err.statusCode || 400).json({
        success: false,
        message: err.message || "Failed to send verification code."
      });
    }
  }

  /**
   * POST /api/student-verify/verify-code
   */
  static async verifyCode(req, res, next) {
    try {
      const userId = req.user.userId;
      const { email, otp_code, otpCode } = req.body;

      const result = await StudentVerifyService.verifyCode({
        userId,
        email,
        otpCode: otp_code || otpCode
      });

      return res.status(200).json(result);
    } catch (err) {
      console.error("[StudentVerifyController] verifyCode error:", err.message);
      return res.status(err.statusCode || 400).json({
        success: false,
        message: err.message || "Failed to verify code."
      });
    }
  }

  /**
   * GET /api/student-verify/status
   */
  static async getStatus(req, res, next) {
    try {
      const userId = req.user.userId;
      const result = await StudentVerifyService.getStudentStatus(userId);
      return res.status(200).json(result);
    } catch (err) {
      console.error("[StudentVerifyController] getStatus error:", err.message);
      return res.status(err.statusCode || 400).json({
        success: false,
        message: err.message || "Failed to fetch student verification status."
      });
    }
  }
}
