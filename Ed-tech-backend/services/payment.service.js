import Razorpay from "razorpay";
import crypto from "crypto";
import { UserRepository } from "../repositories/user.repository.js";
import { SUBSCRIPTION_PLANS } from "../config/subscriptionPlans.js";

const keyId = process.env.RAZORPAY_KEY_ID || "rzp_test_algovia_key_2026";
const keySecret = process.env.RAZORPAY_KEY_SECRET || "rzp_test_secret_algovia_2026";

let razorpayInstance = null;
try {
  if (keyId && keySecret && !keyId.includes("test_algovia_key")) {
    razorpayInstance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret
    });
  }
} catch (err) {
  console.warn("[RazorpayService] Razorpay SDK initialization warning:", err.message);
}

export class PaymentService {
  /**
   * Create Razorpay Order
   */
  static async createOrder({ userId, amount, currency = "INR", planId, billingCycle = "monthly", teamSeats = 1 }) {
    if (!userId) {
      throw new Error("User ID is required to create a payment order.");
    }

    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error("User account not found.");
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      throw new Error("Invalid payment amount.");
    }

    // Amount in paise (minimum unit for INR)
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
        console.error("[RazorpayService] Order creation error:", err.message);
        throw new Error(`Razorpay Order creation failed: ${err.message}`);
      }
    } else {
      // Mock Order ID generation for local testing / fallback mode
      orderId = `order_mock_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`;
      console.log(`[RazorpayService] Created Mock Order ID: ${orderId} for ${user.email} (${currency} ${parsedAmount})`);
    }

    return {
      orderId,
      currency: currency.toUpperCase(),
      amount: amountInSubunits,
      amountFormatted: parsedAmount,
      keyId,
      user: {
        name: user.name,
        email: user.email
      }
    };
  }

  /**
   * Verify Razorpay Payment Signature & Activate Subscription
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

    // Verify HMAC-SHA256 signature if real Razorpay instance is active
    if (razorpayInstance && razorpay_signature) {
      const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      if (generatedSignature !== razorpay_signature) {
        throw new Error("Payment signature verification failed. Invalid transaction signature.");
      }
    }

    // Calculate subscription expiration (e.g. 1 month or 1 year)
    const isYearly = billingCycle === "yearly";
    const expiresAt = new Date();
    if (isYearly) {
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    } else {
      expiresAt.setMonth(expiresAt.getMonth() + 1);
    }

    // Map plan title
    const planNormalized = String(planId).toLowerCase();
    const isBasic = planNormalized.includes("basic");
    const displayPlanName = isBasic ? "Basic Plan" : "Full Access";

    // Update user record in SQL database
    const updatedUser = await UserRepository.update(userId, {
      is_subscribed: true,
      subscription_plan: planId,
      subscription_billing: billingCycle,
      subscription_expires_at: expiresAt,
      team_seats: parseInt(teamSeats, 10) || 1,
      plan: displayPlanName,
      razorpay_payment_id
    });

    console.log(`[RazorpayService] Payment Verified! ${updatedUser.email} upgraded to ${displayPlanName} (${billingCycle}).`);

    return {
      success: true,
      message: `Subscription activated successfully for ${displayPlanName}!`,
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
}
