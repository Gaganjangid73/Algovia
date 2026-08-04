import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const smtpUser = process.env.SMTP_USER || "gaganjangid11@zohomail.in";
const smtpPass = process.env.SMTP_PASS || "";
const smtpHost = process.env.SMTP_HOST || "smtp.zoho.in";
const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);

console.log("Testing Zoho Mail Connection...");
console.log(`Host: ${smtpHost}:${smtpPort}`);
console.log(`User: ${smtpUser}`);
console.log(`Pass Length: ${smtpPass.length}`);

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: smtpUser,
    pass: smtpPass
  },
  tls: {
    rejectUnauthorized: false
  }
});

async function runTest() {
  try {
    await transporter.verify();
    console.log("✅ Zoho Mail SMTP Transporter Connection Verified!");

    const info = await transporter.sendMail({
      from: `"Algovia Authentication" <${smtpUser}>`,
      to: smtpUser,
      subject: "Test Email from Algovia",
      text: "If you receive this, Zoho Mail SMTP integration is working 100%!"
    });

    console.log("✅ Test email sent! MessageId:", info.messageId);
  } catch (err) {
    console.error("❌ Zoho Mail SMTP Error:", err);
  }
}

runTest();
