import { SUBSCRIPTION_PLANS } from "../config/subscriptionPlans.js";
import { UserRepository } from "../repositories/user.repository.js";

export class SubscriptionController {
  /**
   * GET /api/subscription/plans
   * Returns list of all available subscription plans & pricing
   */
  static async getPlans(req, res) {
    return res.status(200).json({
      success: true,
      plans: SUBSCRIPTION_PLANS
    });
  }

  /**
   * GET /api/subscription/status (Protected)
   * Returns current user active subscription details & features unlocked
   */
  static async getStatus(req, res, next) {
    try {
      const userId = req.user.userId;
      const user = await UserRepository.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }

      const planKey = user.subscription_plan || "FREE";
      const planDetails = SUBSCRIPTION_PLANS[planKey] || SUBSCRIPTION_PLANS.FREE;

      return res.status(200).json({
        success: true,
        subscription: {
          isSubscribed: Boolean(user.is_subscribed),
          plan: user.plan || planDetails.name,
          subscriptionPlan: planKey,
          subscriptionBilling: user.subscription_billing || "none",
          teamSeats: user.team_seats || 1,
          expiresAt: user.subscription_expires_at,
          planDetails
        }
      });
    } catch (err) {
      next(err);
    }
  }
}
