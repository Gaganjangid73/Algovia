import crypto from "crypto";
import Razorpay from "razorpay";
import { SUBSCRIPTION_PLANS } from "../config/subscriptionPlans.js";
import { SubscriptionRepository } from "../repositories/subscription.repository.js";
import { UserRepository } from "../repositories/user.repository.js";
import { PaymentRepository } from "../repositories/payment.repository.js";

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
} catch (e) {
  console.warn("[SubscriptionService] Razorpay init note:", e.message);
}

/**
 * Normalizes input plan IDs to catalog key
 */

export const resolvePlanDetails = (planId, currency = "INR") => {
  if (!planId) return SUBSCRIPTION_PLANS.FULL_MONTHLY;
  const p = String(planId).toUpperCase();

  if (SUBSCRIPTION_PLANS[p]) return SUBSCRIPTION_PLANS[p];

  if (p.includes("YEARLY") || p.includes("FULL_ACCESS")) return SUBSCRIPTION_PLANS.FULL_YEARLY;
  if (p.includes("BASIC")) return SUBSCRIPTION_PLANS.BASIC_MONTHLY;
  if (p.includes("STUDENT")) return SUBSCRIPTION_PLANS.STUDENT_MONTHLY;
  if (p.includes("TEAM")) return SUBSCRIPTION_PLANS.TEAM;

  return SUBSCRIPTION_PLANS.FULL_MONTHLY;
};

export class SubscriptionService {
  /**
   * 1. Calculate Day-wise Pro-rata Upgrade Quote
   */
  static async getUpgradeQuote({ userId, newPlanId, currency = "INR" }) {
    if (!userId) throw new Error("User ID is required.");

    const user = await UserRepository.findById(userId);
    if (!user) throw new Error("User not found.");

    const newPlan = resolvePlanDetails(newPlanId, currency);
    const newPlanPrice = currency.toUpperCase() === "USD" ? (newPlan.priceUSD || 69) : (newPlan.priceINR || 3999);

    // Fetch active subscription
    const currentSub = await SubscriptionRepository.findActiveByUserId(userId);

    let unusedCredit = 0;
    let remainingDays = 0;
    let totalDays = 30;
    let currentPlanName = user.plan || "Free Plan";
    let currentPlanPrice = 0;

    if (currentSub) {
      const startMs = new Date(currentSub.start_date).getTime();
      const endMs = new Date(currentSub.end_date).getTime();
      const nowMs = Date.now();

      totalDays = Math.max(1, Math.round((endMs - startMs) / (1000 * 60 * 60 * 24))) || 30;
      remainingDays = Math.max(0, Math.ceil((endMs - nowMs) / (1000 * 60 * 60 * 24)));
      currentPlanPrice = parseFloat(currentSub.amount_paid || 0);

      // Pro-rata Math Calculation
      const dailyRate = currentPlanPrice / totalDays;
      unusedCredit = Math.floor(dailyRate * remainingDays);

      const resolvedCurrent = resolvePlanDetails(currentSub.plan_id, currency);
      currentPlanName = resolvedCurrent.name;
    } else if (user.is_subscribed) {
      // Fallback if legacy subscription flag exists
      totalDays = 30;
      remainingDays = 15;
      currentPlanPrice = currency.toUpperCase() === "USD" ? 5 : 299;
      const dailyRate = currentPlanPrice / totalDays;
      unusedCredit = Math.floor(dailyRate * remainingDays);
    }

    const finalPayableAmount = Math.max(0, Math.round(newPlanPrice - unusedCredit));

    return {
      currentPlan: {
        name: currentPlanName,
        price: currentPlanPrice
      },
      newPlan: {
        id: newPlan.id,
        name: newPlan.name,
        price: newPlanPrice
      },
      unusedCredit,
      remainingDays,
      totalDays,
      finalPayableAmount,
      currency: currency.toUpperCase()
    };
  }

  /**
   * 2. Create Server-side Prorated Razorpay Order
   */
  static async createUpgradeOrder({ userId, newPlanId, currency = "INR" }) {
    // Always compute quote server-side (never trust client amounts)
    const quote = await this.getUpgradeQuote({ userId, newPlanId, currency });
    const { finalPayableAmount, newPlan } = quote;

    const user = await UserRepository.findById(userId);
    const amountInSubunits = Math.round(finalPayableAmount * 100);
    const receipt = `upg_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

    let orderId = "";

    if (razorpayInstance && amountInSubunits > 0) {
      try {
        const order = await razorpayInstance.orders.create({
          amount: amountInSubunits,
          currency: currency.toUpperCase(),
          receipt,
          notes: {
            userId: user.id,
            userEmail: user.email,
            planId: newPlan.id,
            upgrade: "true",
            unusedCredit: String(quote.unusedCredit)
          }
        });
        orderId = order.id;
      } catch (err) {
        console.error("[SubscriptionService] Razorpay upgrade order failed:", err.message);
        throw new Error(`Razorpay upgrade order failed: ${err.message}`);
      }
    } else {
      orderId = `order_upgrade_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`;
    }

    // Save payment intent in payments table
    await PaymentRepository.createPaymentRecord({
      userId: user.id,
      razorpayOrderId: orderId,
      amount: finalPayableAmount,
      currency
    });

    return {
      success: true,
      orderId,
      amount: amountInSubunits,
      amountFormatted: finalPayableAmount,
      unusedCredit: quote.unusedCredit,
      currency: currency.toUpperCase(),
      key: keyId,
      keyId: keyId,
      quote
    };
  }

  /**
   * 3. Verify Upgrade Payment & Update Subscriptions
   */
  static async verifyUpgradePayment({
    userId,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    newPlanId
  }) {
    if (!userId || !razorpay_order_id) {
      throw new Error("Missing required parameters for upgrade verification.");
    }

    // Cryptographic signature check
    if (razorpayInstance && razorpay_signature) {
      const hmac = crypto.createHmac("sha256", keySecret);
      hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const generatedSignature = hmac.digest("hex");

      if (generatedSignature !== razorpay_signature) {
        throw new Error("Invalid transaction signature for upgrade.");
      }
    }

    // Mark payment as paid
    const paymentRecord = await PaymentRepository.markAsPaid(
      razorpay_order_id,
      razorpay_payment_id || `pay_upg_${Date.now()}`,
      razorpay_signature || "verified_upgrade_sig"
    );

    // 1. Mark previous active subscription status as 'upgraded'
    await SubscriptionRepository.markAllUserActiveAsUpgraded(userId);

    // 2. Insert new subscription record with status 'active'
    const newPlan = resolvePlanDetails(newPlanId);
    const startDate = new Date();
    const endDate = new Date();
    if (newPlan.billingCycle === "yearly") {
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else {
      endDate.setMonth(endDate.getMonth() + 1);
    }

    const newSub = await SubscriptionRepository.createSubscription({
      userId,
      planId: newPlan.id,
      amountPaid: paymentRecord ? paymentRecord.amount : newPlan.priceINR,
      startDate,
      endDate,
      status: "active"
    });

    // 3. Update user's tier in users table
    const displayPlanName = newPlan.planType === "basic" ? "Basic Plan" : "Full Access";
    const updatedUser = await UserRepository.update(userId, {
      is_subscribed: true,
      subscription_plan: newPlan.id,
      subscription_billing: newPlan.billingCycle || "yearly",
      subscription_expires_at: endDate,
      plan: displayPlanName,
      razorpay_payment_id: razorpay_payment_id || `pay_upg_${Date.now()}`
    });

    console.log(`[SubscriptionService] Upgrade Successful! ${updatedUser.email} upgraded to ${displayPlanName}.`);

    return {
      success: true,
      message: `Successfully upgraded to ${displayPlanName}!`,
      subscription: newSub,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        plan: updatedUser.plan,
        isSubscribed: true,
        subscriptionPlan: updatedUser.subscription_plan,
        subscriptionBilling: updatedUser.subscription_billing,
        subscriptionExpiresAt: endDate
      }
    };
  }
}
