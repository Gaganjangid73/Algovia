import { AuthService } from "../services/auth.service.js";

export class AuthController {
  /**
   * POST /api/auth/send-otp
   */
  static async sendOtp(req, res, next) {
    try {
      const { email } = req.body;
      const result = await AuthService.sendOtp(email);
      return res.status(200).json({
        success: true,
        ...result
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * POST /api/auth/verify-otp
   */
  static async verifyOtp(req, res, next) {
    try {
      const { email, otp } = req.body;
      const result = await AuthService.verifyOtp(email, otp);
      return res.status(200).json({
        success: true,
        ...result
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/auth/me (Protected Route)
   */
  static async getMe(req, res, next) {
    try {
      const userId = req.user.userId;
      const profile = await AuthService.getUserProfile(userId);
      return res.status(200).json({
        success: true,
        user: profile
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * POST /api/auth/logout
   */
  static async logout(req, res) {
    return res.status(200).json({
      success: true,
      message: "Logged out successfully."
    });
  }
}
