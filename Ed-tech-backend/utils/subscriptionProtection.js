/**
 * Subscription Protection Rules & Plan Tier Rankings
 */

export const PLAN_TIERS = {
  FREE: 0,
  BASIC_MONTHLY: 1,
  BASIC_YEARLY: 2,
  STUDENT_MONTHLY: 3,
  FULL_MONTHLY: 3,
  FULL_YEARLY: 4,
  TEAM: 4
};

/**
 * Returns numeric tier weight for plan ID
 */
export const getPlanTier = (planId) => {
  if (!planId) return 0;
  const p = String(planId).toUpperCase();

  if (PLAN_TIERS[p] !== undefined) return PLAN_TIERS[p];

  if (p.includes("YEARLY") || p.includes("FULL_ACCESS")) return 4;
  if (p.includes("FULL")) return 3;
  if (p.includes("BASIC")) return 2;
  return 0;
};

/**
 * Validates Subscription Protection Rules:
 * Rule A: Prevent Downgrade while higher-tier plan is active
 * Rule B: Prevent Duplicate Active Purchase unless in renewal window (<= 7 days remaining)
 * Rule C: Allow Higher-tier Upgrades only
 */
export const validateSubscriptionAction = ({ activeSub, requestedPlanId }) => {
  if (!activeSub) {
    return { allowed: true };
  }

  const endMs = new Date(activeSub.end_date).getTime();
  const nowMs = Date.now();
  const daysRemaining = Math.max(0, Math.ceil((endMs - nowMs) / (1000 * 60 * 60 * 24)));

  if (daysRemaining <= 0) {
    return { allowed: true, daysRemaining: 0 };
  }

  const currentPlanId = String(activeSub.plan_id).toUpperCase();
  const reqPlanId = String(requestedPlanId).toUpperCase();

  const currentPlanTier = getPlanTier(currentPlanId);
  const requestedPlanTier = getPlanTier(reqPlanId);

  // Rule B: Duplicate Active Purchase Check
  if (currentPlanId === reqPlanId && daysRemaining > 7) {
    const error = new Error(
      `You already have an active subscription to this plan. Duplicate purchases are blocked until 7 days before expiry (${daysRemaining} days remaining).`
    );
    error.code = "ALREADY_ACTIVE";
    error.statusCode = 400;
    error.daysRemaining = daysRemaining;
    throw error;
  }

  // Rule A: Downgrade Check
  if (requestedPlanTier < currentPlanTier) {
    const error = new Error(
      `You cannot downgrade to a lower-tier plan while your higher-tier plan is active (${daysRemaining} days remaining).`
    );
    error.code = "DOWNGRADE_NOT_ALLOWED";
    error.statusCode = 400;
    error.daysRemaining = daysRemaining;
    throw error;
  }

  return {
    allowed: true,
    daysRemaining,
    isUpgrade: requestedPlanTier > currentPlanTier,
    isRenewal: currentPlanId === reqPlanId && daysRemaining <= 7
  };
};
