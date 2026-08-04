/**
 * Algovia.io Backend Subscription Plans Catalog & Specifications
 */

export const SUBSCRIPTION_PLANS = {
  FREE: {
    id: "FREE",
    name: "Free Plan",
    planType: "free",
    accessScope: "preview", // First 3 topics in every module
    priceINR: 0,
    priceUSD: 0,
    features: [
      "Access to first 3 topics in LLD, HLD, LLD Designs & System Design Scenarios"
    ]
  },
  BASIC_MONTHLY: {
    id: "BASIC_MONTHLY",
    name: "Algovia.io Basic Plan (Monthly)",
    planType: "basic",
    billingCycle: "monthly",
    accessScope: "core", // Core DSA, LLD & HLD
    priceINR: 299,
    originalPriceINR: 599,
    priceUSD: 5,
    originalPriceUSD: 10,
    features: [
      "Master Data Structures & Algorithms Patterns Systematically",
      "System Design (Complete One) LLD / HLD",
      "Premium Engineering Newsletter"
    ]
  },
  BASIC_YEARLY: {
    id: "BASIC_YEARLY",
    name: "Algovia.io Basic Plan (Yearly)",
    planType: "basic",
    billingCycle: "yearly",
    accessScope: "core", // Core DSA, LLD & HLD
    priceINR: 2499,
    originalPriceINR: 3588,
    priceUSD: 39,
    originalPriceUSD: 60,
    features: [
      "Master Data Structures & Algorithms Patterns Systematically",
      "System Design (Complete One) LLD / HLD",
      "Premium Engineering Newsletter",
      "12 months access, save 3 months vs monthly"
    ]
  },
  FULL_MONTHLY: {
    id: "FULL_MONTHLY",
    name: "Algovia.io Full Access (Monthly)",
    planType: "full",
    billingCycle: "monthly",
    accessScope: "everything", // Complete access to everything
    priceINR: 499,
    originalPriceINR: 999,
    priceUSD: 9,
    originalPriceUSD: 18,
    features: [
      "Master Data Structures & Algorithms Patterns Systematically",
      "System Design (Complete One) LLD / HLD",
      "CS Core Subjects (Computer Networking, Operating System, DBMS/SQL)",
      "Premium Engineering Newsletters",
      "System Design Scenarios (90% interviews touch these)",
      "Interview Patterns for System Design (build & be 100% interview ready)",
      "AI Engineering (Complete One)",
      "DevOps Engineering (Docker, Kubernetes, Terraform, Ansible, CI/CD, Monitoring, SRE, Security & Scripting)",
      "Access to all new content in future"
    ]
  },
  FULL_YEARLY: {
    id: "FULL_YEARLY",
    name: "Algovia.io Full Access (Yearly)",
    planType: "full",
    billingCycle: "yearly",
    accessScope: "everything", // Complete access to everything
    priceINR: 3999,
    originalPriceINR: 5988,
    priceUSD: 69,
    originalPriceUSD: 108,
    features: [
      "Master Data Structures & Algorithms Patterns Systematically",
      "System Design (Complete One) LLD / HLD",
      "CS Core Subjects (Computer Networking, Operating System, DBMS/SQL)",
      "Premium Engineering Newsletters",
      "System Design Scenarios (90% interviews touch these)",
      "Interview Patterns for System Design (build & be 100% interview ready)",
      "AI Engineering (Complete One)",
      "DevOps Engineering (Docker, Kubernetes, Terraform, Ansible, CI/CD, Monitoring, SRE, Security & Scripting)",
      "Access to all new content in future",
      "12 months access, save 3 months vs monthly"
    ]
  },
  STUDENT_MONTHLY: {
    id: "STUDENT_MONTHLY",
    name: "Student Plan (Monthly)",
    planType: "full",
    billingCycle: "student",
    accessScope: "everything",
    priceINR: 299,
    originalPriceINR: 499,
    priceUSD: 5,
    originalPriceUSD: 9,
    features: [
      "Full Access discount for students with valid institution ID"
    ]
  },
  TEAM: {
    id: "TEAM",
    name: "Team Plan",
    planType: "full",
    billingCycle: "team",
    accessScope: "everything",
    perSeatPriceINR: 299,
    perSeatPriceUSD: 5,
    minSeats: 2,
    maxSeats: 100,
    features: [
      "Full Access for groups, college classes, and engineering teams",
      "Single invoice payment with email invitations for teammates"
    ]
  }
};
