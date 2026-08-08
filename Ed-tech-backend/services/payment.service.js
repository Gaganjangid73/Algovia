import Razorpay from "razorpay";
import crypto from "crypto";
import { UserRepository } from "../repositories/user.repository.js";
import { PaymentRepository } from "../repositories/payment.repository.js";
import { SubscriptionRepository } from "../repositories/subscription.repository.js";
import { validateSubscriptionAction } from "../utils/subscriptionProtection.js";

const keyId = process.env.RAZORPAY_KEY_ID || "rzp_test_algovia_key_2026";
const keySecret = process.env.RAZORPAY_KEY_SECRET || "rzp_test_secret_algovia_2026";
const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "algovia_webhook_secret_2026";

let razorpayInstance = null;
try {
  if (keyId && keySecret && !keyId.includes("test_algovia_key")) {
    razorpayInstance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret
    });
  }
} catch (err) {
  console.warn("[RazorpayService] SDK initialization note:", err.message);
}

export class PaymentService {
  /**
   * 1. Create Razorpay Order & Save to Payments table with status 'created'
   */
  static async createOrder({ userId, amount, currency = "INR", planId, billingCycle = "monthly", teamSeats = 1 }) {
    if (!userId) {
      throw new Error("User ID is required to create a payment order.");
    }

    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error("User account not found.");
    }

    // Subscription Protection Rules Check (Rule A: No Downgrade, Rule B: No Duplicate Active, Rule C: Upgrades Allowed)
    const activeSub = await SubscriptionRepository.findActiveByUserId(userId);
    validateSubscriptionAction({ activeSub, requestedPlanId: planId || "FULL_MONTHLY" });

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      throw new Error("Invalid payment amount.");
    }

    // Amount in paise for INR
    const amountInSubunits = Math.round(parsedAmount * 100);
    const receipt = `rcpt_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

    let orderId = "";

    if (razorpayInstance) {
      try {
        const order = await razorpayInstance.orders.create({
          amount: amountInSubunits,
          currency: currency.toUpperCase(),
          receipt,
          notes: {
            userId: user.id,
            userEmail: user.email,
            planId: planId || "FULL_MONTHLY",
            billingCycle,
            teamSeats: String(teamSeats)
          }
        });
        orderId = order.id;
      } catch (err) {
        console.error("[PaymentService] Razorpay order creation failed:", err.message);
        throw new Error(`Razorpay Order creation failed: ${err.message}`);
      }
    } else {
      // Mock Order ID generation for local development / testing fallback
      orderId = `order_mock_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`;
      console.log(`[PaymentService] Created Order ID: ${orderId} for ${user.email} (${currency} ${parsedAmount})`);
    }

    // Save order in payments table with status 'created'
    await PaymentRepository.createPaymentRecord({
      userId: user.id,
      razorpayOrderId: orderId,
      amount: parsedAmount,
      currency
    });

    return {
      success: true,
      orderId,
      amount: amountInSubunits, // amount in paise for Razorpay Checkout JS
      amountFormatted: parsedAmount,
      currency: currency.toUpperCase(),
      key: keyId,
      keyId: keyId,
      user: {
        name: user.name,
        email: user.email
      }
    };
  }

  /**
   * 2. Verify Cryptographic Signature & Grant Subscription Access
   */
  static async verifyPayment({
    userId,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    planId = "FULL_MONTHLY",
    billingCycle = "monthly",
    teamSeats = 1
  }) {
    if (!userId) {
      throw new Error("User ID is required to verify payment.");
    }

    if (!razorpay_order_id || !razorpay_payment_id) {
      throw new Error("Missing razorpay_order_id or razorpay_payment_id.");
    }

    // Perform Cryptographic Signature Verification using Node's native crypto
    if (razorpayInstance && razorpay_signature) {
      const hmac = crypto.createHmac("sha256", keySecret);
      hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const generatedSignature = hmac.digest("hex");

      if (generatedSignature !== razorpay_signature) {
        throw new Error("Invalid payment signature verification. Transaction compromised.");
      }
    }

    // Update payments table status to 'paid'
    await PaymentRepository.markAsPaid(razorpay_order_id, razorpay_payment_id, razorpay_signature || "verified_sig");

    // Calculate subscription expiration date
    const isYearly = billingCycle === "yearly";
    const expiresAt = new Date();
    if (isYearly) {
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    } else {
      expiresAt.setMonth(expiresAt.getMonth() + 1);
    }

    const planNormalized = String(planId).toLowerCase();
    const isBasic = planNormalized.includes("basic");
    const displayPlanName = isBasic ? "Basic Plan" : "Full Access";

    // Create active record in subscriptions table
    await SubscriptionRepository.markAllUserActiveAsUpgraded(userId);
    await SubscriptionRepository.createSubscription({
      userId,
      planId: planId || "FULL_MONTHLY",
      amountPaid: isBasic ? 299 : 499,
      startDate: new Date(),
      endDate: expiresAt,
      status: "active"
    });

    // Grant user subscription access in users table
    const updatedUser = await UserRepository.update(userId, {
      is_subscribed: true,
      subscription_plan: planId,
      subscription_billing: billingCycle,
      subscription_expires_at: expiresAt,
      team_seats: parseInt(teamSeats, 10) || 1,
      plan: displayPlanName,
      razorpay_payment_id
    });

    console.log(`[PaymentService] Verification Successful: ${updatedUser.email} upgraded to ${displayPlanName}.`);

    return {
      success: true,
      message: `Subscription successfully activated for ${displayPlanName}!`,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        plan: updatedUser.plan,
        isSubscribed: true,
        subscriptionPlan: updatedUser.subscription_plan,
        subscriptionBilling: updatedUser.subscription_billing,
        teamSeats: updatedUser.team_seats
      }
    };
  }

  /**
   * 3. Mark Payment Record as Failed or Cancelled in DB
   */
  static async markFailed({ razorpay_order_id, error_code, error_description, status = "failed" }) {
    if (!razorpay_order_id) {
      throw new Error("razorpay_order_id is required.");
    }

    const reason = error_description
      ? `${error_code ? `[${error_code}] ` : ""}${error_description}`
      : "Transaction cancelled or failed";

    const targetStatus = status === "cancelled" ? "cancelled" : "failed";
    const updatedRecord = await PaymentRepository.markAsFailed(razorpay_order_id, reason, targetStatus);

    console.log(`[PaymentService] Marked Order ${razorpay_order_id} as ${targetStatus}: ${reason}`);

    return {
      success: true,
      status: targetStatus,
      payment: updatedRecord
    };
  }

  /**
   * 4. Asynchronous Recovery System: Process Razorpay Webhook Event
   */
  static async handleWebhook(rawBody, signature) {
    if (!signature) {
      throw new Error("Missing x-razorpay-signature header.");
    }

    // Verify Webhook Signature using RAZORPAY_WEBHOOK_SECRET
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(typeof rawBody === "string" ? rawBody : JSON.stringify(rawBody))
      .digest("hex");

    if (expectedSignature !== signature && process.env.NODE_ENV === "production") {
      throw new Error("Invalid Razorpay webhook signature.");
    }

    const payload = typeof rawBody === "string" ? JSON.parse(rawBody) : rawBody;
    const event = payload.event;
    const paymentEntity = payload.payload?.payment?.entity;

    if (!paymentEntity) {
      return { success: true, message: "Ignored event without payment entity." };
    }

    const orderId = paymentEntity.order_id;
    const paymentId = paymentEntity.id;
    const notes = paymentEntity.notes || {};
    const userId = notes.userId;
    const planId = notes.planId || "FULL_MONTHLY";
    const billingCycle = notes.billingCycle || "monthly";
    const teamSeats = notes.teamSeats || 1;

    console.log(`[PaymentWebhook] Received event '${event}' for Order ${orderId}`);

    if (event === "payment.captured") {
      // Mark as paid in DB
      if (orderId) {
        await PaymentRepository.markAsPaid(orderId, paymentId, "webhook_captured");
      }

      // Asynchronous Recovery: Unlock user subscription even if client network dropped!
      if (userId) {
        const isYearly = billingCycle === "yearly";
        const expiresAt = new Date();
        if (isYearly) expiresAt.setFullYear(expiresAt.getFullYear() + 1);
        else expiresAt.setMonth(expiresAt.getMonth() + 1);

        const isBasic = String(planId).toLowerCase().includes("basic");
        const displayPlanName = isBasic ? "Basic Plan" : "Full Access";

        await UserRepository.update(userId, {
          is_subscribed: true,
          subscription_plan: planId,
          subscription_billing: billingCycle,
          subscription_expires_at: expiresAt,
          team_seats: parseInt(teamSeats, 10) || 1,
          plan: displayPlanName,
          razorpay_payment_id: paymentId
        });
        console.log(`[PaymentWebhook] Asynchronous Recovery: Granted subscription to User ${userId}`);
      }
    } else if (event === "payment.failed") {
      const errorDesc = paymentEntity.error_description || "Payment failed at gateway";
      if (orderId) {
        await PaymentRepository.markAsFailed(orderId, errorDesc, "failed");
      }
    }

    return { success: true, event };
  }
}
