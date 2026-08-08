import { db } from "../config/database.js";

export class StudentVerifyRepository {
  /**
   * Delete existing OTPs for a given email
   */
  static async deleteOtpsForEmail(email) {
    await db("otp_verifications").where({ email }).del();
  }

  /**
   * Create new OTP record
   */
  static async createOtp({ email, otpCode, expiresAt }) {
    const record = {
      email,
      otp_code: otpCode,
      expires_at: expiresAt,
      created_at: new Date()
    };

    const [insertedId] = await db("otp_verifications").insert(record);
    return { id: insertedId, ...record };
  }

  /**
   * Find valid, unexpired OTP for email and code
   */
  static async findValidOtp({ email, otpCode }) {
    const now = new Date();
    return await db("otp_verifications")
      .where({ email, otp_code: otpCode })
      .andWhere("expires_at", ">", now)
      .orderBy("created_at", "desc")
      .first();
  }

  /**
   * Update user student verification status in users table
   */
  static async updateUserStudentStatus({ userId, studentEmail }) {
    await db("users")
      .where({ id: userId })
      .update({
        is_student_verified: true,
        student_email: studentEmail,
        updated_at: new Date()
      });
  }
}
