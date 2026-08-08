import { StudentVerifyRepository } from "../repositories/studentVerify.repository.js";
import { UserRepository } from "../repositories/user.repository.js";

// College / Institution Email Domain Validation Regex (.edu, .ac.in, .ernet.in, .org, etc.)
const COLLEGE_EMAIL_REGEX = /@([\w-]+\.)*(edu|ac\.in|ernet\.in|edu\.in|res\.in|org|org\.in)$/i;

export class StudentVerifyService {
  /**
   * Send 6-digit OTP verification code to college email
   */
  static async sendVerificationCode({ userId, email }) {
    if (!email || typeof email !== "string") {
      const error = new Error("Valid college email address is required.");
      error.statusCode = 400;
      throw error;
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Strictly validate domain extension (.edu, .ac.in, .ernet.in, .org)
    if (!COLLEGE_EMAIL_REGEX.test(trimmedEmail)) {
      const error = new Error("Please use a valid college email ending with .edu, .ac.in, .ernet.in, or .org");
      error.statusCode = 400;
      throw error;
    }

    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    // Delete existing OTPs for email & store new code
    await StudentVerifyRepository.deleteOtpsForEmail(trimmedEmail);
    await StudentVerifyRepository.createOtp({
      email: trimmedEmail,
      otpCode,
      expiresAt
    });

    console.log(`\n==================================================`);
    console.log(`🎓 [Student Verification OTP]`);
    console.log(`   User ID: ${userId}`);
    console.log(`   College Email: ${trimmedEmail}`);
    console.log(`   OTP Verification Code: ${otpCode}`);
    console.log(`   Expires At: ${expiresAt.toLocaleString()}`);
    console.log(`==================================================\n`);

    return {
      success: true,
      message: `6-digit verification code sent to ${trimmedEmail}.`,
      expiresInMinutes: 10
    };
  }

  /**
   * Verify submitted OTP code and update user status
   */
  static async verifyCode({ userId, email, otpCode }) {
    if (!email || !otpCode) {
      const error = new Error("College email and OTP code are required.");
      error.statusCode = 400;
      throw error;
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedCode = String(otpCode).trim();

    const validRecord = await StudentVerifyRepository.findValidOtp({
      email: trimmedEmail,
      otpCode: trimmedCode
    });

    if (!validRecord) {
      const error = new Error("Invalid or expired verification code. Please request a new OTP.");
      error.statusCode = 400;
      throw error;
    }

    // Mark user as student verified in DB
    await StudentVerifyRepository.updateUserStudentStatus({
      userId,
      studentEmail: trimmedEmail
    });

    // Delete used OTP
    await StudentVerifyRepository.deleteOtpsForEmail(trimmedEmail);

    console.log(`🎓 [Student Verification] User ${userId} successfully verified as Student (${trimmedEmail}).`);

    return {
      success: true,
      message: "Student status successfully verified!",
      isStudentVerified: true,
      studentEmail: trimmedEmail
    };
  }

  /**
   * Get student verification status for user
   */
  static async getStudentStatus(userId) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }

    return {
      success: true,
      isStudentVerified: Boolean(user.is_student_verified),
      studentEmail: user.student_email || null
    };
  }
}
