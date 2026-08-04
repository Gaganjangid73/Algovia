import { db } from "../config/database.js";
import { randomUUID } from "crypto";

export class UserRepository {
  /**
   * Find user by email address
   */
  static async findByEmail(email) {
    return await db("users").where({ email }).first();
  }

  /**
   * Find user by Google ID (sub)
   */
  static async findByGoogleId(googleId) {
    return await db("users").where({ google_id: googleId }).first();
  }

  /**
   * Find user by ID
   */
  static async findById(id) {
    return await db("users").where({ id }).first();
  }

  /**
   * Link Google ID to existing account & update avatar / verification
   */
  static async linkGoogleAccount(id, googleId, avatarUrl) {
    const updateData = {
      google_id: googleId,
      is_verified: true,
      updated_at: new Date()
    };
    if (avatarUrl) {
      updateData.avatar = avatarUrl;
    }
    await db("users").where({ id }).update(updateData);
    return await this.findById(id);
  }

  /**
   * Create new Google OAuth user record
   */
  static async createGoogleUser({ email, name, googleId, avatar }) {
    const newUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      email,
      name: name || email.split("@")[0],
      google_id: googleId,
      avatar: avatar || null,
      is_verified: true,
      role: "USER",
      plan: "Free Plan",
      preferred_language: "cpp",
      created_at: new Date(),
      updated_at: new Date()
    };

    await db("users").insert(newUser);
    return newUser;
  }

  /**
   * Create new user record
   */
  static async create(userData) {
    const newUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      email: userData.email,
      name: userData.name || userData.email.split("@")[0],
      avatar: userData.avatar || null,
      role: "USER",
      plan: "Free Plan",
      preferred_language: "cpp",
      created_at: new Date(),
      updated_at: new Date()
    };

    await db("users").insert(newUser);
    return newUser;
  }

  /**
   * Update user details
   */
  static async update(id, updateData) {
    await db("users")
      .where({ id })
      .update({
        ...updateData,
        updated_at: new Date()
      });

    return await this.findById(id);
  }

  /**
   * Save generated OTP record
   */
  static async saveOtp(email, otpHash, expiresAt) {
    const otpRecord = {
      id: `otp_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      email,
      otp_hash: otpHash,
      expires_at: expiresAt,
      is_used: false,
      created_at: new Date()
    };

    await db("otps").insert(otpRecord);
    return otpRecord;
  }

  /**
   * Find valid unexpired OTP record
   */
  static async findValidOtp(email) {
    return await db("otps")
      .where({ email, is_used: false })
      .where("expires_at", ">", new Date())
      .orderBy("created_at", "desc")
      .first();
  }

  /**
   * Mark OTP as used
   */
  static async markOtpUsed(id) {
    await db("otps").where({ id }).update({ is_used: true });
  }

  /**
   * Save refresh token record
   */
  static async saveRefreshToken(userId, tokenHash, expiresAt) {
    const tokenRecord = {
      id: `rt_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      user_id: userId,
      token_hash: tokenHash,
      expires_at: expiresAt,
      is_revoked: false,
      created_at: new Date()
    };

    await db("refresh_tokens").insert(tokenRecord);
    return tokenRecord;
  }
}
