import { db } from "../config/database.js";

export class SubscriptionRepository {
  /**
   * Find current active subscription for a user
   */
  static async findActiveByUserId(userId) {
    const now = new Date();

    // 1. Check subscriptions table first
    const sub = await db("subscriptions")
      .where({ user_id: userId, status: "active" })
      .andWhere("end_date", ">", now)
      .orderBy("created_at", "desc")
      .first();

    if (sub) return sub;

    // 2. Fallback to users table if legacy or direct user subscription exists
    const user = await db("users").where({ id: userId }).first();
    if (user && user.is_subscribed) {
      const expDate = user.subscription_expires_at ? new Date(user.subscription_expires_at) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      if (expDate > now) {
        return {
          id: "user_legacy",
          user_id: user.id,
          plan_id: user.subscription_plan || "FULL_MONTHLY",
          amount_paid: user.subscription_plan?.toLowerCase().includes("basic") ? 299 : 499,
          start_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          end_date: expDate,
          status: "active"
        };
      }
    }

    return null;
  }

  /**
   * Insert new subscription record
   */
  static async createSubscription({ userId, planId, amountPaid, startDate, endDate, status = "active" }) {
    const record = {
      user_id: userId,
      plan_id: planId,
      amount_paid: amountPaid,
      start_date: startDate || new Date(),
      end_date: endDate,
      status,
      created_at: new Date(),
      updated_at: new Date()
    };

    const [insertedId] = await db("subscriptions").insert(record);
    return { id: insertedId, ...record };
  }

  /**
   * Mark subscription as upgraded
   */
  static async markAsUpgraded(subscriptionId) {
    await db("subscriptions")
      .where({ id: subscriptionId })
      .update({
        status: "upgraded",
        updated_at: new Date()
      });
  }

  /**
   * Mark all previous active subscriptions for a user as upgraded
   */
  static async markAllUserActiveAsUpgraded(userId) {
    await db("subscriptions")
      .where({ user_id: userId, status: "active" })
      .update({
        status: "upgraded",
        updated_at: new Date()
      });
  }
}
