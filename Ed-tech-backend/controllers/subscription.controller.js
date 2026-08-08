import { SUBSCRIPTION_PLANS } from "../config/subscriptionPlans.js";
import { UserRepository } from "../repositories/user.repository.js";
import { SubscriptionRepository } from "../repositories/subscription.repository.js";
import { SubscriptionService } from "../services/subscription.service.js";
import { getPlanTier } from "../utils/subscriptionProtection.js";

export class SubscriptionController {
  /**
   * GET /api/subscription/plans
   */
  static async getPlans(req, res) {
    return res.status(200).json({
      success: true,
      plans: SUBSCRIPTION_PLANS
    });
  }

  /**
   * GET /api/subscription/status (Protected)
   */
  static async getStatus(req, res, next) {
    try {
      const userId = req.user.userId;
      const user = await UserRepository.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }

      const activeSub = await SubscriptionRepository.findActiveByUserId(userId);

      const planKey = activeSub?.plan_id || user.subscription_plan || "FREE";
      const planDetails = SUBSCRIPTION_PLANS[planKey] || SUBSCRIPTION_PLANS.FREE;

      let daysRemaining = 0;
      if (activeSub?.end_date || user.subscription_expires_at) {
        const expMs = new Date(activeSub?.end_date || user.subscription_expires_at).getTime();
        daysRemaining = Math.max(0, Math.ceil((expMs - Date.now()) / (1000 * 60 * 60 * 24)));
      }

      const currentTier = getPlanTier(planKey);
      const isSubscribed = Boolean(user.is_subscribed || (activeSub && daysRemaining > 0));

      return res.status(200).json({
        success: true,
        subscription: {
          isSubscribed,
          plan: user.plan || planDetails.name,
          subscriptionPlan: planKey,
          subscriptionBilling: user.subscription_billing || "none",
          teamSeats: user.team_seats || 1,
          expiresAt: activeSub?.end_date || user.subscription_expires_at,
          planDetails,
          protection: {
            activePlanId: planKey,
            currentPlanTier: isSubscribed ? currentTier : 0,
            daysRemaining,
            isRenewable: daysRemaining <= 7,
            canDowngrade: !isSubscribed || daysRemaining <= 0
          }
        }
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * 1. GET /api/subscription/upgrade-quote (Protected)
   */
  static async getUpgradeQuote(req, res, next) {
    try {
      const userId = req.user.userId;
      const { newPlanId = "FULL_YEARLY", currency = "INR" } = req.query;

      const quote = await SubscriptionService.getUpgradeQuote({
        userId,
        newPlanId,
        currency
      });

      return res.status(200).json({
        success: true,
        ...quote
      });
    } catch (err) {
      console.error("[SubscriptionController] getUpgradeQuote error:", err.message);
      return res.status(400).json({
        success: false,
        message: err.message || "Failed to calculate upgrade quote."
      });
    }
  }

  /**
   * 2. POST /api/subscription/create-upgrade-order (Protected)
   */
  static async createUpgradeOrder(req, res, next) {
    try {
      const userId = req.user.userId;
      const { newPlanId = "FULL_YEARLY", currency = "INR" } = req.body;

      const orderData = await SubscriptionService.createUpgradeOrder({
        userId,
        newPlanId,
        currency
      });

      return res.status(200).json(orderData);
    } catch (err) {
      console.error("[SubscriptionController] createUpgradeOrder error:", err.message);
      return res.status(400).json({
        success: false,
        message: err.message || "Failed to create upgrade order."
      });
    }
  }

  /**
   * 3. POST /api/subscription/verify-upgrade-payment (Protected)
   */
  static async verifyUpgradePayment(req, res, next) {
    try {
      const userId = req.user.userId;
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        newPlanId = "FULL_YEARLY"
      } = req.body;

      const result = await SubscriptionService.verifyUpgradePayment({
        userId,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        newPlanId
      });

      return res.status(200).json(result);
    } catch (err) {
      console.error("[SubscriptionController] verifyUpgradePayment error:", err.message);
      return res.status(400).json({
        success: false,
        message: err.message || "Upgrade payment verification failed."
      });
    }
  }
}
