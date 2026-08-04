import gaganAvatar from "../assets/Gagan.JPG";

/**
 * Scenario Dialogue Generator for System Design Scenario Based Interviews
 * Formats scenario answers as real-world interview conversations between an
 * Interviewer (Engineering Manager) and Candidate (Senior Software Engineer).
 */

export const getScenarioDialogue = (scenarioId, scenarioTitle) => {
  const cleanTitle = scenarioTitle || "System Design Scenario";

  return {
    id: scenarioId,
    title: cleanTitle,
    candidate: {
      name: "Gagan Jangid",
      role: "Senior Software Engineer",
      avatar: gaganAvatar
    },
    interviewer: {
      name: "Interviewer",
      role: "Engineering Manager",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=InterviewerManager"
    },
    introSubtitle: "A real scenario-based interview that happened between Gagan and an Interviewer, based on situations that come up in actual engineering interviews.",
    dialogueBlocks: [
      {
        id: "q1",
        speaker: "interviewer",
        text: cleanTitle
      },
      {
        id: "a1",
        speaker: "candidate",
        paragraphs: [
          `If this issue occurs in production, applications may temporarily lose access to primary data streams, cached sessions, rate-limiting counters, or background queue signals depending on system dependencies.`,
          `This suddenly increases pressure on downstream databases and secondary services because traffic that was previously handled asynchronously or cached at the edge now hits persistent storage directly.`
        ],
        bulletHeader: "As a result:",
        bullets: [
          "API latency may increase significantly (p99 latency spikes)",
          "Database connection pools and CPU load may hit 100% capacity",
          "User sessions or active authentication tokens may be invalidated",
          "Cascading failures may trigger across dependent microservices"
        ]
      },
      {
        id: "q2",
        speaker: "interviewer",
        text: "Can you explain this with a simple real-world production example?"
      },
      {
        id: "a2",
        speaker: "candidate",
        paragraphs: [
          `Sure. Imagine a high-traffic e-commerce application serving 50,000 requests per second. Under normal operating conditions, product catalog reads are served directly from an in-memory Redis cluster with a 99% cache hit ratio.`,
          `Now suppose the Redis cluster experiences a network partition or OOM crash suddenly.`
        ],
        bulletHeader: "Immediately:",
        bullets: [
          "The cache layer becomes completely unavailable to worker nodes",
          "All 50,000 requests per second bypass cache and hit PostgreSQL/MySQL directly",
          "Database query load spikes by 100x within milliseconds, triggering connection pool exhaustion"
        ],
        closingText: "So a single tier failure indirectly causes a complete system outage if backpressure and fallback mechanisms are missing."
      },
      {
        id: "q3",
        speaker: "interviewer",
        text: "How would you design the architecture to gracefully prevent this failure in an enterprise system?"
      },
      {
        id: "a3",
        speaker: "candidate",
        paragraphs: [
          `To build a resilient system that survives this scenario, I enforce four architectural patterns:`
        ],
        bullets: [
          "1. Circuit Breakers (Resilience4j / Hystrix): Instantly trip when error rate exceeds threshold, preventing traffic from hammering dead downstream dependencies.",
          "2. Probabilistic Early Eviction & Singleflight / Lock Coalescing: Ensure only ONE request queries DB on cache miss while all other concurrent requests wait for the single result.",
          "3. Multi-Tier Local In-Memory Cache (Guava / Caffeine): Maintain a tiny L1 in-process memory cache inside application pods so hot keys remain available even if L2 Redis fails.",
          "4. Graceful Degradation: Fallback to static read-only stale data or degraded non-critical features rather than throwing 500 Internal Server Errors."
        ]
      },
      {
        id: "q4",
        speaker: "interviewer",
        text: "So what is the biggest senior engineering takeaway here?"
      },
      {
        id: "a4",
        speaker: "candidate",
        paragraphs: [
          `The biggest learning is this: Caching and helper services improve system performance significantly, but distributed architectures must NEVER assume helper tiers will always be available.`,
          `High-scale distributed systems should always be designed so the core application can survive dependency failures safely without taking down the entire platform.`
        ]
      }
    ]
  };
};
