/**
 * Dataset for 20 Reusable System Design Patterns for Interviews
 * URL Pattern: /system-design/interview-pattern and /system-design/interview-pattern/:patternId
 */

export const SYSTEM_DESIGN_PATTERNS_SECTIONS = [
  {
    id: "system-design-patterns",
    title: "System Design Patterns",
    topics: [
      {
        id: "high-read-traffic",
        patternNum: 1,
        title: "High Read Traffic",
        subtitle: "Scale reads with caching, CDNs, and read replicas to handle millions of concurrent users.",
        importance: "High",
        usedInProd: "92%",
        isUnlocked: true,
        accessLabel: "Unlocked"
      },
      {
        id: "media-streaming",
        patternNum: 2,
        title: "Media Streaming",
        subtitle: "Deliver video and audio at scale using adaptive bitrate streaming and distributed CDN edge nodes.",
        importance: "High",
        usedInProd: "78%",
        isUnlocked: true,
        accessLabel: "Premium"
      },
      {
        id: "leader-election",
        patternNum: 3,
        title: "Leader Election",
        subtitle: "Coordinate distributed nodes to elect a single primary that handles writes and critical state.",
        importance: "High",
        usedInProd: "65%",
        isUnlocked: true,
        accessLabel: "Premium"
      },
      {
        id: "multi-tenancy",
        patternNum: 4,
        title: "Multi-Tenancy",
        subtitle: "Serve multiple customers from one deployment while keeping their data strictly isolated.",
        importance: "High",
        usedInProd: "72%",
        isUnlocked: true,
        accessLabel: "Premium"
      },
      {
        id: "high-write-traffic",
        patternNum: 5,
        title: "High Write Traffic",
        subtitle: "Handle write-heavy workloads with write-behind caches, sharding, and async processing pipelines.",
        importance: "High",
        usedInProd: "88%",
        isUnlocked: true,
        accessLabel: "Premium"
      },
      {
        id: "distributed-counting",
        patternNum: 6,
        title: "Distributed Counting",
        subtitle: "Count events accurately across distributed nodes without creating hotspot contention.",
        importance: "High",
        usedInProd: "60%",
        isUnlocked: true,
        accessLabel: "Premium"
      },
      {
        id: "multi-region-architecture",
        patternNum: 7,
        title: "Multi-Region Architecture",
        subtitle: "Deploy globally to reduce latency and survive regional failures with active-active setups.",
        importance: "High",
        usedInProd: "82%",
        isUnlocked: true,
        accessLabel: "Premium"
      },
      {
        id: "distributed-transactions",
        patternNum: 8,
        title: "Distributed Transactions",
        subtitle: "Maintain consistency across multiple services using sagas, 2PC, or eventual consistency.",
        importance: "High",
        usedInProd: "74%",
        isUnlocked: true,
        accessLabel: "Premium"
      },
      {
        id: "realtime-updates",
        patternNum: 9,
        title: "Realtime Updates",
        subtitle: "Push live data to clients instantly using WebSockets, SSE, or long-polling.",
        importance: "High",
        usedInProd: "85%",
        isUnlocked: true,
        accessLabel: "Unlocked"
      },
      {
        id: "fanout-pattern",
        patternNum: 10,
        title: "Fanout Pattern",
        subtitle: "Broadcast one event to many consumers efficiently using queues or precomputed timelines.",
        importance: "High",
        usedInProd: "76%",
        isUnlocked: true,
        accessLabel: "Premium"
      },
      {
        id: "handling-hot-keys",
        patternNum: 11,
        title: "Handling Hot Keys",
        subtitle: "Prevent cache and DB hotspots from becoming bottlenecks under celebrity-scale traffic.",
        importance: "High",
        usedInProd: "68%",
        isUnlocked: true,
        accessLabel: "Premium"
      },
      {
        id: "handling-traffic-spikes",
        patternNum: 12,
        title: "Handling Traffic Spikes",
        subtitle: "Absorb sudden burst traffic with rate limiting, queues, and autoscaling strategies.",
        importance: "High",
        usedInProd: "80%",
        isUnlocked: true,
        accessLabel: "Premium"
      },
      {
        id: "handling-location-data",
        patternNum: 13,
        title: "Handling Location Data",
        subtitle: "Store and query geospatial data efficiently for proximity search and mapping features.",
        importance: "High",
        usedInProd: "58%",
        isUnlocked: true,
        accessLabel: "Premium"
      },
      {
        id: "recommendations",
        patternNum: 14,
        title: "Recommendations",
        subtitle: "Build personalized recommendation engines using collaborative filtering and vector similarity.",
        importance: "High",
        usedInProd: "75%",
        isUnlocked: true,
        accessLabel: "Premium"
      },
      {
        id: "deduplicating-data",
        patternNum: 15,
        title: "Deduplicating Data",
        subtitle: "Ensure idempotency and prevent duplicate records using bloom filters and unique constraints.",
        importance: "High",
        usedInProd: "55%",
        isUnlocked: true,
        accessLabel: "Premium"
      },
      {
        id: "removing-single-points-of-failure",
        patternNum: 16,
        title: "Removing Single Points of Failure",
        subtitle: "Add redundancy at every layer so no single component can take down the entire system.",
        importance: "High",
        usedInProd: "90%",
        isUnlocked: true,
        accessLabel: "Premium"
      },
      {
        id: "handling-large-files",
        patternNum: 17,
        title: "Handling Large Files",
        subtitle: "Upload, store, and process multi-GB files using chunked uploads and object storage.",
        importance: "High",
        usedInProd: "70%",
        isUnlocked: true,
        accessLabel: "Premium"
      },
      {
        id: "generating-unique-ids",
        patternNum: 18,
        title: "Generating Unique IDs",
        subtitle: "Create globally unique, sortable, time-ordered IDs without coordination overhead.",
        importance: "High",
        usedInProd: "82%",
        isUnlocked: true,
        accessLabel: "Premium"
      },
      {
        id: "failure-detection",
        patternNum: 19,
        title: "Failure Detection",
        subtitle: "Detect unhealthy nodes quickly using heartbeats, gossip protocols, and health checks.",
        importance: "High",
        usedInProd: "72%",
        isUnlocked: true,
        accessLabel: "Premium"
      },
      {
        id: "handling-failures",
        patternNum: 20,
        title: "Handling Failures",
        subtitle: "Build resilient systems with retries, circuit breakers, timeouts, and graceful degradation.",
        importance: "High",
        usedInProd: "86%",
        isUnlocked: true,
        accessLabel: "Premium"
      }
    ]
  }
];

export const getAllPatternsFlat = () => {
  const flat = [];
  SYSTEM_DESIGN_PATTERNS_SECTIONS.forEach((sec) => {
    (sec.topics || []).forEach((top) => {
      flat.push({ ...top, sectionId: sec.id, sectionTitle: sec.title });
    });
  });
  return flat;
};
