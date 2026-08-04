import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { UserRepository } from "../repositories/user.repository.js";
import { sendOtpEmail } from "../config/mail.config.js";

const JWT_SECRET = process.env.JWT_SECRET || "algovia_super_secret_jwt_key_production_2026";
const JWT_EXPIRES_IN = "7d";
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export class AuthService {
  /**
   * Production Google OAuth2 ID Token Verification & User Linking
   */
  static async handleGoogleAuth(idToken) {
    if (!idToken) {
      throw new Error("Google idToken parameter is required.");
    }

    let payload;
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID
      });
      payload = ticket.getPayload();
    } catch (err) {
      console.error("[AuthService] Google verifyIdToken failed:", err.message);
      throw new Error("Invalid or expired Google OAuth ID Token.");
    }

    if (!payload) {
      throw new Error("Invalid Google token payload.");
    }

    if (!payload.email_verified) {
      throw new Error("Google account email address is not verified.");
    }

    const { sub: googleId, email, name, picture: avatar } = payload;
    const normalizedEmail = email.toLowerCase().trim();

    // Check Case 1: User with google_id already exists
    let user = await UserRepository.findByGoogleId(googleId);

    if (!user) {
      // Check Case 2: User with email exists -> Link google_id and update Google avatar & name
      user = await UserRepository.findByEmail(normalizedEmail);

      if (user) {
        user = await UserRepository.linkGoogleAccount(user.id, googleId, avatar);
        if (name && user.name !== name) {
          user = await UserRepository.update(user.id, { name });
        }
      } else {
        // Case 3: Brand new Google user -> Create record
        user = await UserRepository.createGoogleUser({
          email: normalizedEmail,
          name: name || normalizedEmail.split("@")[0],
          googleId,
          avatar
        });
      }
    } else {
      // Existing Google user -> Always sync latest Google avatar & name if provided
      const updateData = {};
      if (avatar && user.avatar !== avatar) updateData.avatar = avatar;
      if (name && user.name !== name) updateData.name = name;

      if (Object.keys(updateData).length > 0) {
        user = await UserRepository.update(user.id, updateData);
      }
    }

    // Sign JWT Token
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
      message: "Google authentication successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        plan: user.plan,
        isSubscribed: Boolean(user.is_subscribed),
        subscriptionPlan: user.subscription_plan || "FREE",
        subscriptionBilling: user.subscription_billing || "none",
        teamSeats: user.team_seats || 1,
        preferredLanguage: user.preferred_language
      },
      accessToken
    };
  }
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
      user = await UserRepository.create({
        email: normalizedEmail,
        name: normalizedEmail.split("@")[0],
        avatar: null
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
        isSubscribed: Boolean(user.is_subscribed),
        subscriptionPlan: user.subscription_plan || "FREE",
        subscriptionBilling: user.subscription_billing || "none",
        teamSeats: user.team_seats || 1,
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
      isSubscribed: Boolean(user.is_subscribed),
      subscriptionPlan: user.subscription_plan || "FREE",
      subscriptionBilling: user.subscription_billing || "none",
      teamSeats: user.team_seats || 1,
      preferredLanguage: user.preferred_language,
      createdAt: user.created_at
    };
  }
}
