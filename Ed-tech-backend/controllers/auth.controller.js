import { AuthService } from "../services/auth.service.js";

export class AuthController {
  /**
   * POST /api/auth/google
   * Verifies Google OAuth2 ID Token and logs in/registers user
   */
  static async googleAuth(req, res, next) {
    try {
      const { idToken, credential } = req.body;
      const tokenToVerify = idToken || credential;

      if (!tokenToVerify) {
        return res.status(400).json({
          success: false,
          message: "Missing Google ID Token (idToken / credential) in request body."
        });
      }

      const result = await AuthService.handleGoogleAuth(tokenToVerify);
      return res.status(200).json({
        success: true,
        ...result
      });
    } catch (err) {
      console.error("[AuthController] googleAuth error:", err.message);
      return res.status(401).json({
        success: false,
        message: err.message || "Google authentication failed."
      });
    }
  }
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
