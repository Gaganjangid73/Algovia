import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "./Announcementbar.css";

function AnnouncementBar() {
  const { user } = useAuth();

  // Determine if user has an explicit active paid subscription
  const isSubscribed = useMemo(() => {
    if (!user) return false;

    // Strictly check if authenticated user explicitly has an active paid subscription
    if (user.isSubscribed === true) return true;
    if (user.hasSubscription === true) return true;
    if (user.subscription && (user.subscription.active === true || user.subscription.status === "active")) return true;
    if (user.plan && typeof user.plan === "string" && ["plus", "prime", "pro", "premium", "paid"].includes(user.plan.toLowerCase())) return true;

    return false;
  }, [user]);

  // If user has bought an active subscription, hide the announcement bar
  if (isSubscribed) {
    return null;
  }

  return (
    <div className="announcement">
      <span className="announcement-text">
        Unlock everything on Algovia.io with one subscription — no restrictions.
      </span>
      <Link to="/payment/checkout" className="xlr-access">
        Get Full Access <FaLongArrowAltRight />
      </Link>
    </div>
  );
}

export default AnnouncementBar;