import nodemailer from "nodemailer";

const smtpUser = process.env.SMTP_USER || "gaganjangid11@zohomail.in";
const smtpPass = process.env.SMTP_PASS || "";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.zoho.in",
  port: parseInt(process.env.SMTP_PORT || "465", 10),
  secure: true, // SSL for port 465
  auth: {
    user: smtpUser,
    pass: smtpPass
  },
  tls: {
    rejectUnauthorized: false
  }
});

/**
 * Send OTP Verification Email via Zoho Mail
 */
export async function sendOtpEmail(toEmail, otpCode) {
  const mailOptions = {
    from: process.env.SMTP_FROM || `"Algovia Tech" <${smtpUser}>`,
    to: toEmail,
    subject: `🔐 ${otpCode} is your Algovia Verification Code`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #090c15; color: #ffffff; margin: 0; padding: 40px 20px; }
          .container { max-width: 500px; margin: 0 auto; background: #0f121d; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 36px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
          .logo { font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; margin-bottom: 24px; }
          .title { font-size: 20px; font-weight: 700; color: #ffffff; margin-bottom: 12px; }
          .subtitle { font-size: 14px; color: #94a3b8; line-height: 1.5; margin-bottom: 28px; }
          .otp-box { background: #1a1e2e; border: 1px solid #3b82f6; border-radius: 12px; padding: 18px 24px; display: inline-block; margin-bottom: 28px; }
          .otp-code { font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #3b82f6; font-family: monospace; }
          .footer { font-size: 12px; color: #64748b; line-height: 1.5; margin-top: 24px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">⚡ Algovia</div>
          <div class="title">Verification Code</div>
          <div class="subtitle">Please use the following 6-digit code to complete your login or registration. This code expires in 5 minutes.</div>
          
          <div class="otp-box">
            <div class="otp-code">${otpCode}</div>
          </div>
          
          <div class="footer">
            If you did not request this email, please ignore it.<br>
            Sent securely via Zoho Mail from <strong>${smtpUser}</strong>
          </div>
        </div>
      </body>
      </html>
    `
  };

  if (!smtpPass) {
    console.log(`[MailConfig] SMTP_PASS not set. Skipping live Zoho dispatch. OTP Code for ${toEmail} is: ${otpCode}`);
    return { success: true, simulated: true };
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[MailConfig] OTP Email successfully dispatched to ${toEmail} via Zoho Mail. MessageID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("[MailConfig] Error sending email via Zoho Mail SMTP:", error.message);
    throw new Error(`Failed to dispatch OTP email via Zoho Mail: ${error.message || "Check Zoho App Password"}`);
  }
}
