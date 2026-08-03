/**
 * Async getter function simulating backend API endpoint for Master High Level Design (HLD) Curriculum
 * Contains 26 Sections and 183 Topics
 */
export const fetchHldCurriculumData = async () => {
  return [
    {
      id: "intro-system-design",
      title: "Introduction to System Design",
      description: "Foundational concepts of system design, interview expectations, and a high-level overview of key system design principles.",
      topics: [
        {
          id: "what-is-system-design",
          title: "What is System Design?",
          importance: "high",
          openPercent: "38.22%",
          isLocked: false
        },
        {
          id: "hld-vs-lld-vs-machine-coding",
          title: "HLD vs LLD vs Machine Coding",
          importance: "low",
          openPercent: "45.14%",
          isLocked: false
        },
        {
          id: "how-system-design-evaluated",
          title: "How System Design is evaluated in interviews",
          importance: "high",
          openPercent: "56.44%",
          isLocked: false
        }
      ]
    },
    {
      id: "core-system-design-concepts",
      title: "Core System Design Concepts",
      description: "Fundamental architectural building blocks required for designing scalable software systems.",
      topics: [
        { id: "scalability-vertical-horizontal", title: "Vertical vs Horizontal Scalability", importance: "high", openPercent: "72.10%", isLocked: false },
        { id: "latency-vs-throughput", title: "Latency vs Throughput", importance: "medium", openPercent: "64.30%", isLocked: false },
        { id: "availability-vs-consistency", title: "Availability vs Consistency (CAP Theorem)", importance: "high", openPercent: "88.50%", isLocked: false },
        { id: "pacelc-theorem", title: "PACELC Theorem & Tradeoffs", importance: "medium", openPercent: "51.20%", isLocked: false },
        { id: "single-point-of-failure", title: "Eliminating Single Points of Failure (SPOF)", importance: "high", openPercent: "69.40%", isLocked: false },
        { id: "stateless-vs-stateful", title: "Stateless vs Stateful Architectures", importance: "high", openPercent: "81.00%", isLocked: false },
        { id: "reliability-resilience-fault-tolerance", title: "Reliability, Resilience & Fault Tolerance", importance: "medium", openPercent: "59.80%", isLocked: false },
        { id: "back-of-envelope-estimation", title: "Back-of-the-envelope Capacity Calculations", importance: "high", openPercent: "92.30%", isLocked: false },
        { id: "sla-slo-sli", title: "SLA, SLO, and SLI Metrics", importance: "low", openPercent: "43.10%", isLocked: false }
      ]
    },
    {
      id: "networking-fundamentals",
      title: "Networking Fundamentals",
      description: "OSI model, TCP/UDP protocols, HTTP/1.1 vs HTTP/2 vs HTTP/3, gRPC, and WebSockets.",
      topics: [
        { id: "tcp-vs-udp", title: "TCP vs UDP in Distributed Systems", importance: "high", openPercent: "78.40%", isLocked: false },
        { id: "http-versions", title: "HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC)", importance: "high", openPercent: "81.90%", isLocked: false },
        { id: "grpc-vs-rest", title: "gRPC vs REST vs GraphQL", importance: "high", openPercent: "84.20%", isLocked: false },
        { id: "websockets-sse", title: "WebSockets vs Server-Sent Events (SSE) vs Long Polling", importance: "high", openPercent: "89.60%", isLocked: false },
        { id: "dns-resolution", title: "DNS Architecture & Anycast Routing", importance: "medium", openPercent: "62.50%", isLocked: false },
        { id: "tls-ssl-handshake", title: "TLS/SSL Handshake & HTTPS Security", importance: "medium", openPercent: "57.30%", isLocked: false },
        { id: "cdn-edge-computing", title: "Content Delivery Networks (CDNs) & Edge Caching", importance: "high", openPercent: "79.10%", isLocked: false },
        { id: "nat-reverse-proxy", title: "NAT, Forward Proxy vs Reverse Proxy", importance: "medium", openPercent: "68.70%", isLocked: false },
        { id: "network-bandwidth-throttling", title: "Network Bandwidth & Backpressure", importance: "low", openPercent: "39.40%", isLocked: false }
      ]
    },
    {
      id: "load-balancing",
      title: "Load Balancing",
      description: "Distributing incoming traffic efficiently across multiple backend servers.",
      topics: [
        { id: "lb-types-l4-l7", title: "Layer 4 vs Layer 7 Load Balancers", importance: "high", openPercent: "86.40%", isLocked: false },
        { id: "lb-algorithms", title: "Load Balancing Algorithms (Round Robin, Least Conn, Hash)", importance: "high", openPercent: "91.20%", isLocked: false },
        { id: "consistent-hashing", title: "Consistent Hashing & Virtual Nodes", importance: "high", openPercent: "95.80%", isLocked: false },
        { id: "lb-health-checks", title: "Health Checks & Passive/Active Monitoring", importance: "medium", openPercent: "64.10%", isLocked: false },
        { id: "dns-load-balancing", title: "DNS-based Geo-Load Balancing", importance: "medium", openPercent: "58.90%", isLocked: false }
      ]
    },
    {
      id: "api-design",
      title: "API Design",
      description: "Designing clean, versioned, idempotent, and secure RESTful and RPC APIs.",
      topics: [
        { id: "restful-api-best-practices", title: "RESTful API Naming & Status Codes", importance: "high", openPercent: "89.30%", isLocked: false },
        { id: "idempotency-keys", title: "Idempotency in Payment & Order APIs", importance: "high", openPercent: "93.70%", isLocked: false },
        { id: "api-versioning-strategies", title: "API Versioning Strategies (URI, Header, Query)", importance: "medium", openPercent: "71.40%", isLocked: false },
        { id: "pagination-cursor-offset", title: "Offset vs Cursor-based Pagination", importance: "high", openPercent: "85.20%", isLocked: false },
        { id: "batching-bulk-apis", title: "Batching & Bulk API Requests", importance: "low", openPercent: "48.60%", isLocked: false },
        { id: "graphql-schema-design", title: "GraphQL Schema Design & N+1 Problem", importance: "medium", openPercent: "67.90%", isLocked: false },
        { id: "openapi-swagger-specs", title: "OpenAPI Specification & Contract First Design", importance: "low", openPercent: "41.20%", isLocked: false },
        { id: "async-polling-webhooks", title: "Async Job APIs & Webhook Callbacks", importance: "high", openPercent: "79.80%", isLocked: false },
        { id: "error-handling-rfc7807", title: "RFC 7807 Problem Details for Error Responses", importance: "low", openPercent: "36.50%", isLocked: false },
        { id: "field-masking-partial-responses", title: "Field Masking & Partial API Responses", importance: "low", openPercent: "32.10%", isLocked: false },
        { id: "api-deprecation-sunset", title: "API Deprecation & Sunset Headers", importance: "low", openPercent: "29.40%", isLocked: false },
        { id: "rate-limit-response-headers", title: "X-RateLimit Standard Response Headers", importance: "medium", openPercent: "59.30%", isLocked: false },
        { id: "api-mocking-contract-testing", title: "Consumer-Driven Contract Testing", importance: "low", openPercent: "27.80%", isLocked: false },
        { id: "cross-origin-cors", title: "CORS Policies & Preflight Requests", importance: "medium", openPercent: "63.20%", isLocked: false }
      ]
    },
    {
      id: "api-infrastructure",
      title: "API Infrastructure",
      description: "Infrastructure components and patterns required to secure, manage, and scale APIs in production environments.",
      topics: [
        {
          id: "api-gateways",
          title: "API Gateways",
          importance: "high",
          openPercent: "52.59%",
          isLocked: false
        },
        {
          id: "rate-limiting",
          title: "Rate Limiting",
          importance: "low",
          openPercent: "85.96%",
          isLocked: false
        },
        {
          id: "throttling-vs-rate-limiting",
          title: "Throttling vs Rate Limiting",
          importance: "medium",
          openPercent: "70.16%",
          isLocked: false
        }
      ]
    },
    {
      id: "api-security",
      title: "API Security",
      description: "OAuth 2.0, OpenID Connect, JWT tokens, mTLS, and defense against OWASP API Top 10 vulnerabilities.",
      topics: [
        { id: "jwt-vs-session-cookies", title: "JWT vs Session Cookies Authentication", importance: "high", openPercent: "87.10%", isLocked: false },
        { id: "oauth2-oidc-flows", title: "OAuth 2.0 & OpenID Connect Authorization Flows", importance: "high", openPercent: "90.40%", isLocked: false },
        { id: "mtls-service-to-service", title: "mTLS for Service-to-Service Security", importance: "medium", openPercent: "64.80%", isLocked: false },
        { id: "api-key-management", title: "API Key Rotation & Secret Management", importance: "medium", openPercent: "58.20%", isLocked: false },
        { id: "owasp-api-top-10", title: "OWASP API Security Top 10 Mitigation", importance: "high", openPercent: "82.60%", isLocked: false }
      ]
    },
    {
      id: "communication-patterns",
      title: "Communication Patterns",
      description: "Synchronous vs Asynchronous messaging patterns, event-driven architecture, and pub/sub systems.",
      topics: [
        { id: "sync-vs-async-comm", title: "Synchronous vs Asynchronous Communication", importance: "high", openPercent: "84.90%", isLocked: false },
        { id: "message-queues-kafka-rabbitmq", title: "Message Queues (Kafka vs RabbitMQ vs SQS)", importance: "high", openPercent: "94.10%", isLocked: false },
        { id: "pub-sub-architecture", title: "Publish-Subscribe Pattern", importance: "high", openPercent: "88.30%", isLocked: false },
        { id: "event-sourcing-cqrs", title: "Event Sourcing & CQRS", importance: "high", openPercent: "86.70%", isLocked: false },
        { id: "dead-letter-queues", title: "Dead Letter Queues (DLQ) & Retry Mechanisms", importance: "medium", openPercent: "73.50%", isLocked: false },
        { id: "outbox-pattern", title: "Transactional Outbox Pattern", importance: "high", openPercent: "89.20%", isLocked: false },
        { id: "competing-consumers", title: "Competing Consumers & Consumer Groups", importance: "medium", openPercent: "67.40%", isLocked: false },
        { id: "at-least-once-exactly-once", title: "At-least-once vs Exactly-once Delivery", importance: "high", openPercent: "91.80%", isLocked: false },
        { id: "change-data-capture-cdc", title: "Change Data Capture (CDC) with Debezium", importance: "medium", openPercent: "69.10%", isLocked: false },
        { id: "backpressure-flow-control", title: "Reactive Streams & Backpressure Flow Control", importance: "medium", openPercent: "61.40%", isLocked: false },
        { id: "saga-pattern-orchestration-choreography", title: "Saga Pattern (Choreography vs Orchestration)", importance: "high", openPercent: "88.90%", isLocked: false },
        { id: "request-reply-over-async", title: "Request-Reply pattern over Message Queues", importance: "low", openPercent: "44.30%", isLocked: false },
        { id: "message-deduplication", title: "Message Deduplication & Idempotent Consumers", importance: "high", openPercent: "82.50%", isLocked: false },
        { id: "schema-registry-avro", title: "Schema Registry & Apache Avro Serialization", importance: "low", openPercent: "38.90%", isLocked: false },
        { id: "polling-vs-push-notifications", title: "Push Notifications & Mobile Gateway Architecture", importance: "medium", openPercent: "59.80%", isLocked: false }
      ]
    },
    {
      id: "caching",
      title: "Caching",
      description: "In-memory caching strategies, cache eviction algorithms, Redis, Memcached, and caching pitfalls.",
      topics: [
        { id: "cache-aside-read-through-write-through", title: "Cache Patterns (Cache-Aside, Read-Through, Write-Through, Write-Behind)", importance: "high", openPercent: "96.20%", isLocked: false },
        { id: "redis-vs-memcached", title: "Redis Data Structures vs Memcached", importance: "high", openPercent: "91.70%", isLocked: false },
        { id: "cache-eviction-lru-lfu", title: "Eviction Policies (LRU, LFU, FIFO, ARC)", importance: "high", openPercent: "87.40%", isLocked: false },
        { id: "cache-stampede-thundering-herd", title: "Cache Stampede & Thundering Herd Problem", importance: "high", openPercent: "84.60%", isLocked: false },
        { id: "cache-penetration-bloom-filters", title: "Cache Penetration & Bloom Filters", importance: "high", openPercent: "89.10%", isLocked: false },
        { id: "cache-avalanche", title: "Cache Avalanche & Jittered TTLs", importance: "medium", openPercent: "76.30%", isLocked: false },
        { id: "distributed-caching-clusters", title: "Redis Cluster Sharding & Sentinel HA", importance: "medium", openPercent: "78.90%", isLocked: false },
        { id: "cdn-browser-caching-headers", title: "Browser & HTTP Cache-Control Headers", importance: "medium", openPercent: "69.40%", isLocked: false },
        { id: "multi-level-caching-l1-l2", title: "Multi-Level L1 (In-Memory) + L2 (Redis) Caching", importance: "medium", openPercent: "71.20%", isLocked: false },
        { id: "cache-invalidation-strategies", title: "Cache Invalidation Hard Problems", importance: "high", openPercent: "88.50%", isLocked: false },
        { id: "two-tier-caching", title: "Two-Tier Cache Synchronization", importance: "low", openPercent: "42.80%", isLocked: false },
        { id: "redis-pub-sub-keyspace-notifications", title: "Redis Keyspace Notifications for Cache Invalidation", importance: "low", openPercent: "39.60%", isLocked: false }
      ]
    },
    {
      id: "database-fundamentals",
      title: "Database Fundamentals",
      description: "SQL vs NoSQL databases, ACID properties, isolation levels, and storage engines.",
      topics: [
        { id: "sql-vs-nosql", title: "SQL vs NoSQL: When to use which?", importance: "high", openPercent: "94.50%", isLocked: false },
        { id: "acid-properties", title: "ACID Properties & Transactions", importance: "high", openPercent: "91.80%", isLocked: false },
        { id: "ansi-sql-isolation-levels", title: "Read Committed vs Repeatable Read vs Serializable Isolation", importance: "high", openPercent: "86.30%", isLocked: false },
        { id: "relational-normalization-denormalization", title: "Database Normalization vs Denormalization", importance: "medium", openPercent: "74.10%", isLocked: false },
        { id: "polyglot-persistence", title: "Polyglot Persistence in Microservices", importance: "medium", openPercent: "68.90%", isLocked: false },
        { id: "connection-pooling-pgbouncer", title: "Connection Pooling (HikariCP, PgBouncer)", importance: "medium", openPercent: "62.40%", isLocked: false }
      ]
    },
    {
      id: "indexing-and-storage-engines",
      title: "Indexing and Storage Engines",
      description: "B-Trees, B+ Trees, LSM-Trees, inverted indexes, and query execution plans.",
      topics: [
        { id: "b-tree-vs-b-plus-tree", title: "B-Tree vs B+ Tree Indexes", importance: "high", openPercent: "89.70%", isLocked: false },
        { id: "lsm-trees-write-amplification", title: "LSM-Trees & SSTables (LevelDB, RocksDB, Cassandra)", importance: "high", openPercent: "85.20%", isLocked: false },
        { id: "clustered-vs-secondary-index", title: "Clustered Index vs Secondary Index", importance: "high", openPercent: "81.40%", isLocked: false },
        { id: "composite-indexes-leftmost-prefix", title: "Composite Indexes & Leftmost Prefix Rule", importance: "medium", openPercent: "77.90%", isLocked: false }
      ]
    },
    {
      id: "database-read-scaling",
      title: "Database Read Scaling",
      description: "Read replicas, primary-replica replication lag, and query optimization.",
      topics: [
        { id: "primary-replica-replication", title: "Primary-Replica Asynchronous vs Synchronous Replication", importance: "high", openPercent: "88.60%", isLocked: false },
        { id: "replication-lag-solutions", title: "Handling Replication Lag & Read-Your-Own-Writes", importance: "high", openPercent: "90.10%", isLocked: false },
        { id: "read-write-splitting", title: "Read/Write Splitting at Application Layer", importance: "medium", openPercent: "73.80%", isLocked: false },
        { id: "cqrs-read-view-materialized", title: "Materialized Views & Read Models", importance: "medium", openPercent: "69.40%", isLocked: false },
        { id: "database-proxy-routing", title: "Database Proxies & Query Routing", importance: "low", openPercent: "46.20%", isLocked: false },
        { id: "index-tuning-explain-analyze", title: "EXPLAIN ANALYZE & Query Optimization", importance: "medium", openPercent: "72.50%", isLocked: false }
      ]
    },
    {
      id: "database-write-scaling",
      title: "Database Write Scaling",
      description: "Sharding, partitioning, global primary keys, and Vitess/Citus distributed SQL.",
      topics: [
        { id: "database-sharding-key-strategies", title: "Database Sharding Strategies (Range, Hash, Directory)", importance: "high", openPercent: "93.40%", isLocked: false },
        { id: "resharding-consistent-hashing-db", title: "Resharding & Live Migration without Downtime", importance: "high", openPercent: "87.90%", isLocked: false },
        { id: "distributed-primary-keys", title: "Distributed ID Generation (Snowflake, UUIDv7, TSID)", importance: "high", openPercent: "91.00%", isLocked: false },
        { id: "distributed-sql-spanner-cockroach", title: "Distributed SQL (Google Spanner, CockroachDB)", importance: "medium", openPercent: "68.30%", isLocked: false },
        { id: "cross-shard-queries-transactions", title: "Handling Cross-Shard Queries & Two-Phase Commit", importance: "high", openPercent: "84.10%", isLocked: false }
      ]
    },
    {
      id: "storage-systems",
      title: "Storage Systems",
      description: "Block storage, Object storage (S3), File storage (NFS), and Distributed file systems.",
      topics: [
        { id: "object-storage-s3-architecture", title: "Object Storage Architecture (Amazon S3, MinIO)", importance: "high", openPercent: "89.50%", isLocked: false },
        { id: "block-vs-file-vs-object-storage", title: "Block Storage vs File Storage vs Object Storage", importance: "medium", openPercent: "76.20%", isLocked: false },
        { id: "hdfs-glusterfs-ceph", title: "Distributed File Systems (HDFS, Ceph)", importance: "medium", openPercent: "64.70%", isLocked: false },
        { id: "presigned-urls-multipart-upload", title: "S3 Multipart Uploads & Presigned URLs", importance: "high", openPercent: "83.10%", isLocked: false },
        { id: "storage-tiering-lifecycle", title: "Data Tiering (Hot, Warm, Cold Glacier Storage)", importance: "low", openPercent: "49.80%", isLocked: false }
      ]
    },
    {
      id: "system-design-tradeoffs",
      title: "System Design Tradeoffs",
      description: "Balancing consistency, availability, cost, complexity, and performance.",
      topics: [
        { id: "consistency-vs-availability-deep-dive", title: "Strong Consistency vs Eventual Consistency", importance: "high", openPercent: "92.60%", isLocked: false },
        { id: "cost-vs-performance-tradeoff", title: "Infrastructure Cost vs Latency Optimization", importance: "medium", openPercent: "71.80%", isLocked: false },
        { id: "monolith-vs-microservices-tradeoff", title: "Monolith vs Microservices Tradeoffs", importance: "high", openPercent: "88.90%", isLocked: false },
        { id: "push-vs-pull-architecture", title: "Push vs Pull Data Fetching", importance: "medium", openPercent: "75.40%", isLocked: false },
        { id: "sync-vs-async-tradeoff", title: "Sync Blocking vs Async Non-Blocking Execution", importance: "high", openPercent: "81.30%", isLocked: false },
        { id: "sql-vs-nosql-tradeoff-matrix", title: "Relational Integrity vs Schema-less Flexibility", importance: "medium", openPercent: "69.70%", isLocked: false },
        { id: "build-vs-buy-managed-services", title: "Self-Hosted Open Source vs Managed Cloud Services", importance: "low", openPercent: "52.40%", isLocked: false },
        { id: "normalization-vs-denormalization-tradeoff", title: "Read Speed vs Update Anomaly Tradeoffs", importance: "medium", openPercent: "64.10%", isLocked: false }
      ]
    },
    {
      id: "failure-handling",
      title: "Failure Handling",
      description: "Circuit breakers, rate limits, graceful degradation, and retry strategies with exponential backoff.",
      topics: [
        { id: "circuit-breaker-pattern", title: "Circuit Breaker Pattern (Resilience4j, Hystrix)", importance: "high", openPercent: "94.10%", isLocked: false },
        { id: "exponential-backoff-jitter", title: "Exponential Backoff with Full Jitter", importance: "high", openPercent: "89.80%", isLocked: false },
        { id: "bulkhead-isolation-pattern", title: "Bulkhead Pattern for Thread Pool Isolation", importance: "medium", openPercent: "72.30%", isLocked: false },
        { id: "graceful-degradation-fallback", title: "Graceful Degradation & Static Fallbacks", importance: "high", openPercent: "86.50%", isLocked: false }
      ]
    },
    {
      id: "time-and-ordering",
      title: "Time and Ordering",
      description: "Clocks, NTP skew, vector clocks, Lamport timestamps, and ordering events in distributed systems.",
      topics: [
        { id: "physical-vs-logical-clocks", title: "Physical Clocks & NTP Clock Skew", importance: "high", openPercent: "79.30%", isLocked: false },
        { id: "lamport-vector-clocks", title: "Lamport Timestamps & Vector Clocks", importance: "high", openPercent: "83.60%", isLocked: false }
      ]
    },
    {
      id: "coordination-and-consensus",
      title: "Coordination and Consensus",
      description: "Distributed locks, leader election, Raft, Paxos, Zookeeper, and etcd.",
      topics: [
        { id: "raft-consensus-algorithm", title: "Raft Consensus Algorithm (Leader Election, Log Replication)", importance: "high", openPercent: "91.40%", isLocked: false },
        { id: "paxos-consensus-overview", title: "Paxos Consensus Protocol Overview", importance: "medium", openPercent: "73.20%", isLocked: false },
        { id: "distributed-locks-redis-redlock", title: "Distributed Locks (Redis Redlock vs Zookeeper)", importance: "high", openPercent: "87.60%", isLocked: false },
        { id: "etcd-zookeeper-service-discovery", title: "Service Discovery with etcd & Apache Zookeeper", importance: "medium", openPercent: "68.90%", isLocked: false }
      ]
    },
    {
      id: "distributed-transactions",
      title: "Distributed Transactions",
      description: "Two-Phase Commit (2PC), Saga pattern, and XA transactions.",
      topics: [
        { id: "two-phase-commit-2pc", title: "Two-Phase Commit (2PC) Protocol & Blocking Issues", importance: "high", openPercent: "88.20%", isLocked: false },
        { id: "saga-pattern-implementation", title: "Saga Pattern Implementation for Microservices", importance: "high", openPercent: "92.50%", isLocked: false },
        { id: "three-phase-commit-3pc", title: "Three-Phase Commit (3PC) & Non-blocking Commit", importance: "low", openPercent: "41.70%", isLocked: false },
        { id: "tcc-try-confirm-cancel", title: "Try-Confirm-Cancel (TCC) Pattern", importance: "medium", openPercent: "63.80%", isLocked: false }
      ]
    },
    {
      id: "data-structures-for-scale",
      title: "Data Structures for Scale",
      description: "HyperLogLog, Count-Min Sketch, Skip Lists, QuadTrees, and GeoHashes.",
      topics: [
        { id: "bloom-filter-probabilistic", title: "Bloom Filters for Membership Queries", importance: "high", openPercent: "93.10%", isLocked: false },
        { id: "hyperloglog-cardinality", title: "HyperLogLog for Unique Count Estimation", importance: "high", openPercent: "86.40%", isLocked: false },
        { id: "count-min-sketch-frequency", title: "Count-Min Sketch for Heavy Hitters", importance: "medium", openPercent: "71.90%", isLocked: false },
        { id: "geohash-quadtree-spatial", title: "GeoHash vs QuadTree for Location-based Services (Uber/Tinder)", importance: "high", openPercent: "95.20%", isLocked: false },
        { id: "skip-lists-zset", title: "Skip Lists in Redis Sorted Sets (ZSET)", importance: "medium", openPercent: "77.30%", isLocked: false },
        { id: "radix-trie-routing", title: "Radix Tries for High-Speed IP & Route Lookup", importance: "low", openPercent: "48.20%", isLocked: false },
        { id: "ring-buffer-disruptor", title: "LMAX Disruptor Ring Buffer for Ultra-Low Latency", importance: "medium", openPercent: "62.90%", isLocked: false }
      ]
    },
    {
      id: "architectural-patterns",
      title: "Architectural Patterns",
      description: "Peer-to-Peer, Master-Slave, Layered, Hexagonal, and Clean Architecture.",
      topics: [
        { id: "microservices-vs-monolith", title: "Microservices Architecture Patterns", importance: "high", openPercent: "91.50%", isLocked: false },
        { id: "serverless-event-driven-lambda", title: "Serverless & Function-as-a-Service (FaaS)", importance: "high", openPercent: "87.30%", isLocked: false },
        { id: "hexagonal-ports-adapters", title: "Hexagonal Architecture (Ports & Adapters)", importance: "medium", openPercent: "69.80%", isLocked: false },
        { id: "peer-to-peer-bittorrent", title: "Peer-to-Peer (P2P) Architecture & BitTorrent", importance: "medium", openPercent: "74.10%", isLocked: false },
        { id: "strangler-fig-migration", title: "Strangler Fig Pattern for Legacy Migration", importance: "high", openPercent: "85.60%", isLocked: false },
        { id: "sidecar-pattern-service-mesh", title: "Sidecar Pattern & Service Mesh (Istio, Envoy)", importance: "high", openPercent: "88.90%", isLocked: false },
        { id: "cqrs-read-write-segregation", title: "Command Query Responsibility Segregation (CQRS)", importance: "high", openPercent: "89.40%", isLocked: false },
        { id: "event-driven-architecture-eda", title: "Event-Driven Architecture (EDA) & Event Sourcing", importance: "high", openPercent: "93.00%", isLocked: false },
        { id: "bulkhead-and-circuit-breaker-combo", title: "Resilience Patterns Combination", importance: "medium", openPercent: "68.20%", isLocked: false },
        { id: "database-per-service-pattern", title: "Database per Service Pattern", importance: "high", openPercent: "86.70%", isLocked: false },
        { id: "api-gateway-bff", title: "Backend For Frontend (BFF) Pattern", importance: "medium", openPercent: "77.40%", isLocked: false }
      ]
    },
    {
      id: "microservices-patterns",
      title: "Microservices Patterns",
      description: "Service discovery, API Gateways, Service Mesh, Distributed Tracing, and Config Management.",
      topics: [
        { id: "service-discovery-eureka-consul", title: "Client-side vs Server-side Service Discovery", importance: "high", openPercent: "85.90%", isLocked: false },
        { id: "service-mesh-envoy-istio", title: "Service Mesh Data Plane vs Control Plane", importance: "high", openPercent: "89.10%", isLocked: false },
        { id: "distributed-tracing-jaeger-zipkin", title: "Distributed Tracing with Trace & Span IDs", importance: "high", openPercent: "87.40%", isLocked: false },
        { id: "centralized-config-management", title: "Centralized Configuration Management (Spring Cloud Config)", importance: "medium", openPercent: "64.30%", isLocked: false },
        { id: "api-gateway-routing-auth", title: "API Gateway Routing, Auth & Rate Limiting", importance: "high", openPercent: "92.10%", isLocked: false },
        { id: "health-check-api-pattern", title: "Health Check Endpoint Pattern", importance: "medium", openPercent: "69.50%", isLocked: false },
        { id: "externalized-configuration", title: "Externalized Configuration & Environment Variables", importance: "medium", openPercent: "66.80%", isLocked: false },
        { id: "log-aggregation-elk-loki", title: "Log Aggregation with ELK & Grafana Loki", importance: "high", openPercent: "84.70%", isLocked: false },
        { id: "blue-green-canary-deployments", title: "Blue-Green & Canary Deployment Strategies", importance: "high", openPercent: "90.30%", isLocked: false },
        { id: "shadow-deployments-traffic-mirroring", title: "Shadow Deployments & Traffic Mirroring", importance: "medium", openPercent: "61.20%", isLocked: false }
      ]
    },
    {
      id: "big-data-processing",
      title: "Big Data Processing",
      description: "Batch vs Stream processing, Hadoop, Spark, Flink, and Lambda/Kappa Architectures.",
      topics: [
        { id: "batch-vs-stream-processing", title: "Batch Processing vs Stream Processing", importance: "high", openPercent: "88.60%", isLocked: false },
        { id: "spark-architecture-rdd-dataframe", title: "Apache Spark RDD, DataFrames & Memory Management", importance: "high", openPercent: "91.30%", isLocked: false },
        { id: "flink-event-time-watermarks", title: "Apache Flink Event Time & Watermarks", importance: "high", openPercent: "84.90%", isLocked: false },
        { id: "lambda-vs-kappa-architecture", title: "Lambda Architecture vs Kappa Architecture", importance: "medium", openPercent: "77.20%", isLocked: false },
        { id: "data-lake-vs-data-warehouse", title: "Data Lake vs Data Warehouse vs Data Lakehouse", importance: "high", openPercent: "86.80%", isLocked: false },
        { id: "columnar-storage-parquet-orc", title: "Row-Oriented vs Columnar Storage (Parquet, ORC)", importance: "high", openPercent: "89.40%", isLocked: false },
        { id: "partitioning-bucketing-spark", title: "Spark Data Partitioning & Bucketing Optimization", importance: "medium", openPercent: "68.50%", isLocked: false },
        { id: "kafka-streams-state-stores", title: "Kafka Streams State Stores & RocksDB", importance: "medium", openPercent: "72.10%", isLocked: false },
        { id: "data-lineage-catalog-datahub", title: "Data Governance & Lineage with Apache Atlas", importance: "low", openPercent: "42.30%", isLocked: false },
        { id: "distributed-joins-broadcast-shuffle", title: "Broadcast Join vs Shuffle Hash Join", importance: "high", openPercent: "83.70%", isLocked: false }
      ]
    },
    {
      id: "observability",
      title: "Observability",
      description: "Metrics, Logs, Traces (The 3 Pillars), Prometheus, Grafana, OpenTelemetry.",
      topics: [
        { id: "three-pillars-observability", title: "The 3 Pillars: Metrics, Logs & Distributed Traces", importance: "high", openPercent: "94.20%", isLocked: false },
        { id: "prometheus-pull-metrics", title: "Prometheus Pull-based Metrics & PromQL", importance: "high", openPercent: "89.60%", isLocked: false },
        { id: "opentelemetry-collector", title: "OpenTelemetry Standard & Collector Architecture", importance: "high", openPercent: "86.90%", isLocked: false },
        { id: "structured-json-logging", title: "Structured Logging & Correlation IDs", importance: "high", openPercent: "91.00%", isLocked: false },
        { id: "alerts-paging-oncall", title: "Alert Fatigue Prevention & PagerDuty Integration", importance: "medium", openPercent: "67.40%", isLocked: false },
        { id: "synthetic-monitoring-canary", title: "Synthetic Monitoring & Automated Canary Analysis", importance: "medium", openPercent: "61.80%", isLocked: false },
        { id: "distributed-context-propagation", title: "W3C Trace Context & Propagation", importance: "medium", openPercent: "64.20%", isLocked: false },
        { id: "metrics-types-counter-gauge-histogram", title: "Counters, Gauges, Histograms & Summaries", importance: "high", openPercent: "82.50%", isLocked: false },
        { id: "ebpf-zero-instrumentation", title: "eBPF Zero-Code Observability (Cilium, Pixie)", importance: "medium", openPercent: "58.70%", isLocked: false }
      ]
    },
    {
      id: "advanced-security",
      title: "Advanced Security",
      description: "Zero Trust Architecture, Key Management (KMS), HSM, and Encryption at rest/transit.",
      topics: [
        { id: "zero-trust-architecture", title: "Zero Trust Architecture Principles", importance: "high", openPercent: "88.10%", isLocked: false },
        { id: "encryption-at-rest-in-transit", title: "Symmetric vs Asymmetric Encryption & Envelope Encryption", importance: "high", openPercent: "86.50%", isLocked: false },
        { id: "aws-kms-hashicorp-vault", title: "Key Management Systems (AWS KMS, HashiCorp Vault)", importance: "high", openPercent: "90.20%", isLocked: false },
        { id: "rate-limit-ddos-protection-cloudflare", title: "DDoS Mitigation & WAF Rules", importance: "high", openPercent: "84.80%", isLocked: false },
        { id: "data-masking-anonymization", title: "Data Masking, Anonymization & PII Compliance", importance: "medium", openPercent: "71.40%", isLocked: false },
        { id: "securing-secrets-git-commit", title: "Secret Scanning & Hardware Security Modules (HSM)", importance: "medium", openPercent: "63.90%", isLocked: false }
      ]
    },
    {
      id: "system-design-interview-preparation",
      title: "System Design Interview Preparation",
      description: "4-step interview framework, system design templates, mock interview walkthroughs, and real FAANG system design problems.",
      topics: [
        { id: "4-step-system-design-framework", title: "4-Step System Design Interview Framework", importance: "high", openPercent: "97.80%", isLocked: false },
        { id: "design-url-shortener", title: "Design TinyURL / Bitly (URL Shortener)", importance: "high", openPercent: "98.50%", isLocked: false },
        { id: "design-whatsapp-chat-app", title: "Design WhatsApp / Messenger (Real-time Chat)", importance: "high", openPercent: "96.90%", isLocked: false },
        { id: "design-netflix-video-streaming", title: "Design Netflix / YouTube (Video Streaming)", importance: "high", openPercent: "95.40%", isLocked: false },
        { id: "design-uber-ride-sharing", title: "Design Uber / Lyft (Location-based Ride Sharing)", importance: "high", openPercent: "94.80%", isLocked: false },
        { id: "design-twitter-news-feed", title: "Design Twitter / Instagram Newsfeed (Fanout-on-write)", importance: "high", openPercent: "96.20%", isLocked: false },
        { id: "design-distributed-rate-limiter", title: "Design a Distributed Rate Limiter", importance: "high", openPercent: "93.60%", isLocked: false }
      ]
    }
  ];
};
