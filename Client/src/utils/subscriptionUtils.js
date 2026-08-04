/**
 * Utility functions for Subscription & Content Access Control in Algovia.io
 */

/**
 * Free Preview limit: First N topics in each module are free for unsubscribed users.
 */
export const FREE_TOPICS_COUNT = 3;

/**
 * Determines the plan level of a user.
 * @param {object} user - User object from AuthContext
 * @returns {"full" | "basic" | "free"}
 */
export const getUserPlanType = (user) => {
  if (!user) return "free";

  if (user.isSubscribed === true || user.hasSubscription === true || user.isPaid === true) {
    return "full";
  }

  const plan = typeof user.plan === "string" ? user.plan.toLowerCase() : "";
  if (
    ["full", "prime", "plus", "pro", "premium", "full access", "full plan"].some((p) =>
      plan.includes(p)
    )
  ) {
    return "full";
  }

  if (["basic", "basic plan", "free_tier"].some((p) => plan.includes(p))) {
    return "basic";
  }

  // LocalStorage test override check
  if (localStorage.getItem("algovia_subscribed") === "true") {
    return "full";
  }

  return "free";
};

/**
 * Checks if a specific topic is unlocked for a given user.
 * @param {number} topicIndex - Zero-indexed position of the topic in the list
 * @param {string} category - Category identifier ("lld", "hld", "lld-designs", "scenarios", "patterns")
 * @param {object} user - User object
 * @returns {boolean} True if unlocked, false if locked
 */
export const isTopicUnlocked = (topicIndex, category, user) => {
  const planType = getUserPlanType(user);

  // Full Access plan unlocks EVERYTHING
  if (planType === "full") {
    return true;
  }

  // Basic Plan unlocks LLD, HLD, DSA topics, but restricts advanced scenarios
  if (planType === "basic") {
    if (["lld", "hld", "patterns"].includes(category)) {
      return true;
    }
    // For advanced scenarios or heavy LLD designs, first 5 are unlocked for basic plan
    return topicIndex < 5;
  }

  // Free User: Only the first FREE_TOPICS_COUNT (first 3) topics are unlocked
  return topicIndex < FREE_TOPICS_COUNT;
};
