import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository.js";
import { sendOtpEmail } from "../config/mail.config.js";

const JWT_SECRET = process.env.JWT_SECRET || "algovia_super_secret_jwt_key_production_2026";
const JWT_EXPIRES_IN = "7d";

export class AuthService {
  /**
   * Request 6-digit OTP code for email
   */
  static async sendOtp(email) {
    if (!email || !email.includes("@")) {
      throw new Error("Invalid email address provided.");
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 1. Generate secure 6-digit numeric OTP
    const rawOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // 2. Hash OTP code before saving to DB
    const salt = await bcrypt.genSalt(10);
    const otpHash = await bcrypt.hash(rawOtp, salt);

    // 3. Set expiry to 5 minutes from now
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // 4. Save to SQL database
    await UserRepository.saveOtp(normalizedEmail, otpHash, expiresAt);

    // 5. Send OTP via Zoho Mail SMTP from gaganjangid11@zohomail.in
    await sendOtpEmail(normalizedEmail, rawOtp);

    console.log(`[AuthService] Generated & dispatched OTP email to ${normalizedEmail}`);

    return {
      message: `OTP sent successfully to ${normalizedEmail}`,
      email: normalizedEmail
    };
  }

  /**
   * Verify 6-digit OTP code & Issue JWT Token
   */
  static async verifyOtp(email, otpCode) {
    if (!email || !otpCode) {
      throw new Error("Email and OTP code are required.");
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 1. Find valid OTP record in SQL DB
    const otpRecord = await UserRepository.findValidOtp(normalizedEmail);
    if (!otpRecord) {
      throw new Error("OTP code expired or invalid. Please request a new code.");
    }

    // 2. Compare provided code against stored hash
    const isMatch = await bcrypt.compare(otpCode, otpRecord.otp_hash);
    if (!isMatch) {
      throw new Error("Incorrect 6-digit verification code.");
    }

    // 3. Mark OTP as used
    await UserRepository.markOtpUsed(otpRecord.id);

    // 4. Find or Create User in SQL DB
    let user = await UserRepository.findByEmail(normalizedEmail);
    if (!user) {
      const isGagan = normalizedEmail.includes("gaganjangid");
      user = await UserRepository.create({
        email: normalizedEmail,
        name: isGagan ? "Gagan Jangid" : normalizedEmail.split("@")[0],
        avatar: isGagan ? "/assets/Gagan.JPG" : null
      });
    }

    // 5. Generate JWT Access Token
    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return {
      message: "Authentication successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        plan: user.plan,
        preferredLanguage: user.preferred_language
      },
      accessToken
    };
  }

  /**
   * Retrieve current user profile by JWT User ID
   */
  static async getUserProfile(userId) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error("User account not found.");
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      plan: user.plan,
      preferredLanguage: user.preferred_language,
      createdAt: user.created_at
    };
  }
}
