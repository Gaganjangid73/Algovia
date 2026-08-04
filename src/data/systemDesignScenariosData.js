/**
 * Comprehensive System Design Scenario Based Dataset
 * Categorized under HLD and LLD for real-world interview preparation
 */

export const HLD_SCENARIO_CATEGORIES = [
  {
    id: "storage",
    title: "STORAGE",
    scenarios: [
      { id: "se-3", code: "SE-3", title: "What if database connection pool exhausts?", importance: "medium", openPercent: "36.83%" },
      { id: "se-4", code: "SE-4", title: "What if primary DB write fails mid-transaction?", importance: "high", openPercent: "28.81%" },
      { id: "se-6", code: "SE-6", title: "What if cache becomes inconsistent with DB?", importance: "medium", openPercent: "83.21%" },
      { id: "se-8", code: "SE-8", title: "What if leader election fails?", importance: "high", openPercent: "28.98%" },
      { id: "se-9", code: "SE-9", title: "What if network partition occurs in DB cluster?", importance: "high", openPercent: "61.79%" },
      { id: "se-15", code: "SE-15", title: "What if split-brain problem occurs?", importance: "low", openPercent: "47.08%" },
      { id: "se-17", code: "SE-17", title: "What if primary DB disk fills up completely?", importance: "high", openPercent: "72.78%" },
      { id: "se-19", code: "SE-19", title: "What if distributed lock never releases?", importance: "low", openPercent: "50.89%" },
      { id: "se-22", code: "SE-22", title: "What if one shard grows much larger than others?", importance: "medium", openPercent: "68.66%" },
      { id: "se-28", code: "SE-28", title: "What if users see stale data from read replicas?", importance: "high", openPercent: "89.32%" },
      { id: "se-37", code: "SE-37", title: "What if Redis master node crashes?", importance: "high", openPercent: "36.76%" },
      { id: "se-38", code: "SE-38", title: "What if DB replication lag increases significantly?", importance: "medium", openPercent: "61.14%" },
      { id: "se-39", code: "SE-39", title: "What if two services update same record simultaneously?", importance: "high", openPercent: "83.58%" },
      { id: "se-45", code: "SE-45", title: "What if cache eviction deletes hot keys prematurely?", importance: "high", openPercent: "75.49%" },
      { id: "se-47", code: "SE-47", title: "What if database index scan becomes a full table scan?", importance: "high", openPercent: "69.41%" },
      { id: "se-49", code: "SE-49", title: "What if search index write rate lags behind DB?", importance: "high", openPercent: "28.14%" },
      { id: "se-51", code: "SE-51", title: "What if unique ID generator runs out of sequence IDs?", importance: "medium", openPercent: "45.33%" }
    ]
  },
  {
    id: "api",
    title: "API",
    scenarios: [
      { id: "se-10", code: "SE-10", title: "What if downstream API starts timing out?", importance: "high", openPercent: "66.39%" },
      { id: "se-27", code: "SE-27", title: "What if duplicate payment requests hit the API?", importance: "high", openPercent: "73.74%" },
      { id: "se-44", code: "SE-44", title: "What if API contract changes without breaking backward compatibility?", importance: "low", openPercent: "41.36%" },
      { id: "se-50", code: "SE-50", title: "What if client uploads a multi-gigabyte file over slow network?", importance: "high", openPercent: "85.49%" },
      { id: "se-54", code: "SE-54", title: "What if rate limiter blocks legitimate heavy users?", importance: "medium", openPercent: "58.20%" },
      { id: "se-55", code: "SE-55", title: "What if API gateway becomes the single point of failure?", importance: "high", openPercent: "79.10%" },
      { id: "se-56", code: "SE-56", title: "What if client retries non-idempotent POST requests?", importance: "high", openPercent: "84.30%" },
      { id: "se-57", code: "SE-57", title: "What if CORS preflight request overhead spikes latency?", importance: "low", openPercent: "31.50%" },
      { id: "se-58", code: "SE-58", title: "What if GraphQL query depth causes N+1 DB query explosion?", importance: "high", openPercent: "77.80%" },
      { id: "se-59", code: "SE-59", title: "What if webhook subscriber endpoint is down continuously?", importance: "medium", openPercent: "63.40%" },
      { id: "se-60", code: "SE-60", title: "What if payload compression overhead consumes API CPU?", importance: "low", openPercent: "42.10%" },
      { id: "se-61", code: "SE-61", title: "What if JWT signature secret is compromised?", importance: "high", openPercent: "91.20%" },
      { id: "se-62", code: "SE-62", title: "What if third-party OAuth provider drops requests?", importance: "medium", openPercent: "52.80%" },
      { id: "se-63", code: "SE-63", title: "What if API response size exceeds client memory limits?", importance: "medium", openPercent: "49.60%" },
      { id: "se-64", code: "SE-64", title: "What if gRPC connection channel closes unexpectedly?", importance: "medium", openPercent: "60.40%" }
    ]
  },
  {
    id: "real-time",
    title: "REAL-TIME",
    scenarios: [
      { id: "se-2", code: "SE-2", title: "What if realtime analytics pipeline lags behind?", importance: "high", openPercent: "80.32%" },
      { id: "se-34", code: "SE-34", title: "What if millions of WebSocket connections drop together?", importance: "low", openPercent: "88.80%" },
      { id: "se-36", code: "SE-36", title: "What if message delivery order changes in event stream?", importance: "low", openPercent: "57.60%" },
      { id: "se-48", code: "SE-48", title: "What if a celebrity post triggers a mass fanout spike?", importance: "medium", openPercent: "82.64%" },
      { id: "se-65", code: "SE-65", title: "What if push notification service gets throttled by Apple/Google?", importance: "high", openPercent: "74.10%" },
      { id: "se-66", code: "SE-66", title: "What if live chat room exceeds 100,000 concurrent listeners?", importance: "high", openPercent: "86.50%" },
      { id: "se-67", code: "SE-67", title: "What if video stream buffer underruns due to network jitter?", importance: "medium", openPercent: "67.30%" },
      { id: "se-68", code: "SE-68", title: "What if WebRTC peer-to-peer connection fails to establish NAT?", importance: "medium", openPercent: "54.20%" },
      { id: "se-69", code: "SE-69", title: "What if heartbeat ping timeouts disconnect healthy clients?", importance: "low", openPercent: "48.90%" },
      { id: "se-70", code: "SE-70", title: "What if event stream replay takes hours after consumer outage?", importance: "high", openPercent: "78.40%" },
      { id: "se-71", code: "SE-71", title: "What if location GPS updates arrive out of chronological order?", importance: "medium", openPercent: "62.70%" },
      { id: "se-72", code: "SE-72", title: "What if audio streaming bitrates drop dynamically?", importance: "low", openPercent: "39.80%" },
      { id: "se-73", code: "SE-73", title: "What if pub-sub message queue consumer memory leaks?", importance: "high", openPercent: "81.90%" },
      { id: "se-74", code: "SE-74", title: "What if live scoreboard updates arrive out of sequence?", importance: "medium", openPercent: "59.40%" },
      { id: "se-75", code: "SE-75", title: "What if SSE (Server-Sent Events) connection reaches browser HTTP/1.1 limit?", importance: "low", openPercent: "44.60%" }
    ]
  },
  {
    id: "scalability",
    title: "SCALABILITY",
    scenarios: [
      { id: "se-5", code: "SE-5", title: "What if DB reference latency increases suddenly?", importance: "low", openPercent: "60.93%" },
      { id: "se-11", code: "SE-11", title: "What if network partition happens across availability zones?", importance: "high", openPercent: "89.80%" },
      { id: "se-12", code: "SE-12", title: "What if 10M requests hit your service in 10 seconds?", importance: "low", openPercent: "37.33%" },
      { id: "se-16", code: "SE-16", title: "What if CDN cache invalidation lags?", importance: "low", openPercent: "86.58%" },
      { id: "se-20", code: "SE-20", title: "What if load balancer node crashes under heavy load?", importance: "high", openPercent: "32.96%" },
      { id: "se-23", code: "SE-23", title: "What if load balancer algorithm causes worker imbalance?", importance: "medium", openPercent: "72.84%" },
      { id: "se-25", code: "SE-25", title: "What if retry mechanism causes cascading failure storms?", importance: "low", openPercent: "63.99%" },
      { id: "se-29", code: "SE-29", title: "What if traffic spikes 100x during Black Friday sale?", importance: "low", openPercent: "30.24%" },
      { id: "se-30", code: "SE-30", title: "What if thundering herd problem happens on cache miss?", importance: "medium", openPercent: "39.45%" },
      { id: "se-31", code: "SE-31", title: "What if auto-scaler fails to provision instances fast enough?", importance: "medium", openPercent: "64.38%" },
      { id: "se-35", code: "SE-35", title: "What if microservice pod runs out of memory (OOMKilled)?", importance: "medium", openPercent: "29.94%" },
      { id: "se-40", code: "SE-40", title: "What if deployment breaks production during canary rollout?", importance: "medium", openPercent: "75.53%" },
      { id: "se-43", code: "SE-43", title: "What if system read ratio changes from 10:1 to 1:10?", importance: "high", openPercent: "51.43%" },
      { id: "se-46", code: "SE-46", title: "What if user sessions drop when switching regional data centers?", importance: "low", openPercent: "89.52%" },
      { id: "se-76", code: "SE-76", title: "What if DNS propagation takes 48 hours during IP migration?", importance: "medium", openPercent: "55.70%" }
    ]
  },
  {
    id: "messaging",
    title: "MESSAGING",
    scenarios: [
      { id: "se-7", code: "SE-7", title: "What if notification service sends duplicate messages?", importance: "medium", openPercent: "55.73%" },
      { id: "se-14", code: "SE-14", title: "What if queue backlog increases continuously?", importance: "medium", openPercent: "89.41%" },
      { id: "se-41", code: "SE-41", title: "What if Kafka broker goes down during high ingestion?", importance: "high", openPercent: "73.17%" },
      { id: "se-77", code: "SE-77", title: "What if consumer group rebalance takes several minutes?", importance: "high", openPercent: "81.20%" },
      { id: "se-78", code: "SE-78", title: "What if dead letter queue (DLQ) fills up without alert?", importance: "medium", openPercent: "67.50%" },
      { id: "se-79", code: "SE-79", title: "What if poison pill message crashes queue worker repeatedly?", importance: "high", openPercent: "88.10%" },
      { id: "se-80", code: "SE-80", title: "What if RabbitMQ memory high watermark threshold triggers block?", importance: "medium", openPercent: "59.30%" },
      { id: "se-81", code: "SE-81", title: "What if SQS visibility timeout expires before job finishes?", importance: "high", openPercent: "76.40%" },
      { id: "se-82", code: "SE-82", title: "What if message partition key leads to hot partition imbalance?", importance: "high", openPercent: "83.90%" },
      { id: "se-83", code: "SE-83", title: "What if exactly-once processing semantic fails under retry?", importance: "high", openPercent: "87.60%" },
      { id: "se-84", code: "SE-84", title: "What if event payload schema evolves breaking legacy consumers?", importance: "medium", openPercent: "64.20%" },
      { id: "se-85", code: "SE-85", title: "What if message TTL expires before consumer processes job?", importance: "low", openPercent: "45.80%" },
      { id: "se-86", code: "SE-86", title: "What if out-of-order event delivery breaks financial ledger?", importance: "high", openPercent: "92.30%" },
      { id: "se-87", code: "SE-87", title: "What if log compaction in Kafka deletes necessary state snapshot?", importance: "medium", openPercent: "58.90%" },
      { id: "se-88", code: "SE-88", title: "What if queue message size exceeds maximum payload limit?", importance: "low", openPercent: "38.50%" }
    ]
  },
  {
    id: "reliability",
    title: "RELIABILITY",
    scenarios: [
      { id: "se-1", code: "SE-1", title: "What if primary region completely fails?", importance: "low", openPercent: "51.87%" },
      { id: "se-21", code: "SE-21", title: "What if leader-follower region sync becomes slow?", importance: "high", openPercent: "54.10%" },
      { id: "se-24", code: "SE-24", title: "What if primary database disk corrupts unexpectedly?", importance: "high", openPercent: "80.02%" },
      { id: "se-26", code: "SE-26", title: "What if backups are corrupted when disaster recovery triggers?", importance: "medium", openPercent: "32.01%" },
      { id: "se-33", code: "SE-33", title: "What if disaster recovery failover fails mid-way?", importance: "high", openPercent: "79.90%" },
      { id: "se-42", code: "SE-42", title: "What if data corruption happens silently in DB storage engine?", importance: "high", openPercent: "41.65%" },
      { id: "se-53", code: "SE-53", title: "What if system must choose between consistency and availability during partition?", importance: "high", openPercent: "85.65%" },
      { id: "se-89", code: "SE-89", title: "What if circuit breaker trips during temporary network blip?", importance: "medium", openPercent: "66.40%" },
      { id: "se-90", code: "SE-90", title: "What if health check endpoint returns 200 OK while DB is dead?", importance: "high", openPercent: "89.10%" },
      { id: "se-91", code: "SE-91", title: "What if graceful shutdown fails killing active transactions?", importance: "high", openPercent: "74.80%" },
      { id: "se-92", code: "SE-92", title: "What if clock skew across servers breaks distributed timestamps?", importance: "high", openPercent: "82.50%" },
      { id: "se-93", code: "SE-93", title: "What if retry storm crashes upstream recovery attempt?", importance: "high", openPercent: "88.30%" },
      { id: "se-94", code: "SE-94", title: "What if TLS certificate expires in production at midnight?", importance: "medium", openPercent: "61.90%" },
      { id: "se-95", code: "SE-95", title: "What if garbage collection pause triggers node heartbeat loss?", importance: "medium", openPercent: "57.30%" },
      { id: "se-96", code: "SE-96", title: "What if cross-region latency spikes due to undersea cable cut?", importance: "low", openPercent: "43.70%" }
    ]
  },
  {
    id: "security",
    title: "SECURITY",
    scenarios: [
      { id: "se-13", code: "SE-13", title: "What if authentication service goes down completely?", importance: "high", openPercent: "34.00%" },
      { id: "se-18", code: "SE-18", title: "What if secret API keys leak into public GitHub repo?", importance: "medium", openPercent: "51.58%" },
      { id: "se-97", code: "SE-97", title: "What if attacker launches a massive Layer 7 DDoS attack?", importance: "high", openPercent: "87.40%" },
      { id: "se-98", code: "SE-98", title: "What if SQL injection bypasses ORM parameterization?", importance: "high", openPercent: "93.10%" },
      { id: "se-99", code: "SE-99", title: "What if SSRF vulnerability exposes internal cloud metadata (169.254.169.254)?", importance: "high", openPercent: "86.90%" },
      { id: "se-100", code: "SE-100", title: "What if JWT refresh token theft occurs via XSS?", importance: "high", openPercent: "81.50%" },
      { id: "se-101", code: "SE-101", title: "What if CORS misconfiguration allows unauthorized domain access?", importance: "medium", openPercent: "63.20%" },
      { id: "se-102", code: "SE-102", title: "What if password hash database is leaked online?", importance: "high", openPercent: "90.80%" },
      { id: "se-103", code: "SE-103", title: "What if credential stuffing attack targets login endpoint?", importance: "high", openPercent: "84.70%" },
      { id: "se-104", code: "SE-104", title: "What if man-in-the-middle attack intercepts internal microservice traffic?", importance: "medium", openPercent: "58.30%" },
      { id: "se-105", code: "SE-105", title: "What if session fixation attack hijacks user dashboard?", importance: "medium", openPercent: "52.10%" },
      { id: "se-106", code: "SE-106", title: "What if IDOR vulnerability leaks private user documents?", importance: "high", openPercent: "88.60%" },
      { id: "se-107", code: "SE-107", title: "What if rate limiting IP spoofing bypasses security gateway?", importance: "medium", openPercent: "67.40%" },
      { id: "se-108", code: "SE-108", title: "What if replay attack executes duplicate financial transfer?", importance: "high", openPercent: "89.20%" },
      { id: "se-109", code: "SE-109", title: "What if container image contains unpatched Zero-Day vulnerability?", importance: "medium", openPercent: "46.90%" }
    ]
  }
];

export const LLD_SCENARIO_CATEGORIES = [
  {
    id: "concurrency",
    title: "CONCURRENCY",
    scenarios: [
      { id: "lld-se-10", code: "SE-10", title: "What if two requests bleed across thread pool?", importance: "high", openPercent: "54.70%" },
      { id: "lld-se-12", code: "SE-12", title: "What if distributed lock is never released?", importance: "medium", openPercent: "88.91%" },
      { id: "lld-se-16", code: "SE-16", title: "What if API latency spikes under concurrency?", importance: "high", openPercent: "29.68%" },
      { id: "lld-se-18", code: "SE-18", title: "What if two threads update the same object simultaneously?", importance: "high", openPercent: "41.60%" },
      { id: "lld-se-19", code: "SE-19", title: "What if thread starvation happens?", importance: "low", openPercent: "60.59%" },
      { id: "lld-se-25", code: "SE-25", title: "What if multiple users book the same seat at the same time?", importance: "high", openPercent: "76.68%" },
      { id: "lld-se-27", code: "SE-27", title: "What if optimistic locking fails repeatedly?", importance: "low", openPercent: "51.08%" },
      { id: "lld-se-32", code: "SE-32", title: "What if deadlock occurs between thread execution loops?", importance: "high", openPercent: "42.64%" },
      { id: "lld-se-34", code: "SE-34", title: "What if pessimistic locking reduces throughput heavily?", importance: "medium", openPercent: "57.97%" },
      { id: "lld-se-37", code: "SE-37", title: "What if atomic integer CAS loop spins endlessly under contention?", importance: "high", openPercent: "81.40%" },
      { id: "lld-se-44", code: "SE-44", title: "What if double-checked locking singleton fails without volatile?", importance: "high", openPercent: "89.20%" },
      { id: "lld-se-45", code: "SE-45", title: "What if producer queue overflows while consumers are blocked?", importance: "medium", openPercent: "64.30%" },
      { id: "lld-se-52", code: "SE-52", title: "What if read-write lock causes writer starvation under heavy read load?", importance: "high", openPercent: "73.80%" },
      { id: "lld-se-53", code: "SE-53", title: "What if ThreadLocal context is leaked across thread pool executions?", importance: "medium", openPercent: "69.10%" }
    ]
  },
  {
    id: "caching",
    title: "CACHING",
    scenarios: [
      { id: "lld-se-7", code: "SE-7", title: "What if Redis cache crashes suddenly?", importance: "high", openPercent: "45.50%" },
      { id: "lld-se-8", code: "SE-8", title: "What if stale cache causes financial inconsistency?", importance: "low", openPercent: "71.69%" },
      { id: "lld-se-31", code: "SE-31", title: "What if cache data becomes stale after DB update?", importance: "low", openPercent: "75.43%" },
      { id: "lld-se-43", code: "SE-43", title: "What if key read surge causes LRU eviction stampede?", importance: "high", openPercent: "48.08%" }
    ]
  },
  {
    id: "design-patterns",
    title: "DESIGN PATTERNS",
    scenarios: [
      { id: "lld-se-1", code: "SE-1", title: "What if millions of objects are created every second?", importance: "low", openPercent: "66.70%" },
      { id: "lld-se-11", code: "SE-11", title: "What if memory usage keeps increasing slowly?", importance: "low", openPercent: "73.34%" },
      { id: "lld-se-15", code: "SE-15", title: "What if one class becomes too tightly coupled with others?", importance: "high", openPercent: "58.13%" },
      { id: "lld-se-23", code: "SE-23", title: "What if core domain model becomes impossible to extend?", importance: "high", openPercent: "32.45%" },
      { id: "lld-se-26", code: "SE-26", title: "What if circular dependency is created by mistake?", importance: "low", openPercent: "66.68%" },
      { id: "lld-se-29", code: "SE-29", title: "What if object creation is extremely expensive?", importance: "medium", openPercent: "37.06%" },
      { id: "lld-se-35", code: "SE-35", title: "What if new features keep breaking old code?", importance: "high", openPercent: "60.21%" },
      { id: "lld-se-46", code: "SE-46", title: "What if an object has complex state transitions?", importance: "medium", openPercent: "75.29%" },
      { id: "lld-se-47", code: "SE-47", title: "What if an object has too many constructor parameters?", importance: "low", openPercent: "66.57%" },
      { id: "lld-se-48", code: "SE-48", title: "What if many objects must react to state change?", importance: "high", openPercent: "44.03%" },
      { id: "lld-se-49", code: "SE-49", title: "What if an algorithm needs to be interchangeable at runtime?", importance: "medium", openPercent: "28.75%" },
      { id: "lld-se-50", code: "SE-50", title: "What if object creation depends on type or configuration?", importance: "medium", openPercent: "55.19%" }
    ]
  },
  {
    id: "messaging",
    title: "MESSAGING",
    scenarios: [
      { id: "lld-se-3", code: "SE-3", title: "What if queue consumer execution becomes slower than producer?", importance: "low", openPercent: "49.65%" },
      { id: "lld-se-9", code: "SE-9", title: "What if messages arrive out of order?", importance: "low", openPercent: "78.25%" },
      { id: "lld-se-21", code: "SE-21", title: "What if queue processing latency increases?", importance: "medium", openPercent: "78.92%" },
      { id: "lld-se-38", code: "SE-38", title: "What if in-memory queue consumer processes duplicate events?", importance: "high", openPercent: "28.12%" },
      { id: "lld-se-41", code: "SE-41", title: "What if exactly-once processing is required?", importance: "medium", openPercent: "77.61%" }
    ]
  },
  {
    id: "transactions",
    title: "TRANSACTIONS",
    scenarios: [
      { id: "lld-se-6", code: "SE-6", title: "What if compensating transaction fails mid-way?", importance: "high", openPercent: "38.89%" },
      { id: "lld-se-14", code: "SE-14", title: "What if saga transaction fails halfway?", importance: "medium", openPercent: "42.19%" },
      { id: "lld-se-17", code: "SE-17", title: "What if retries cause duplicate payment intent?", importance: "high", openPercent: "66.14%" },
      { id: "lld-se-33", code: "SE-33", title: "What if transaction partially succeeds?", importance: "low", openPercent: "76.31%" }
    ]
  },
  {
    id: "resilience",
    title: "RESILIENCE",
    scenarios: [
      { id: "lld-se-4", code: "SE-4", title: "What if rate limiter node itself becomes bottleneck?", importance: "high", openPercent: "69.70%" },
      { id: "lld-se-5", code: "SE-5", title: "What if DB connection pool exhausts?", importance: "high", openPercent: "57.19%" },
      { id: "lld-se-13", code: "SE-13", title: "What if async worker node dies silently?", importance: "low", openPercent: "50.24%" },
      { id: "lld-se-20", code: "SE-20", title: "What if microservice experiences cascading failure across dependencies?", importance: "high", openPercent: "48.10%" },
      { id: "lld-se-30", code: "SE-30", title: "What if high traffic spikes across web servers?", importance: "high", openPercent: "77.86%" },
      { id: "lld-se-54", code: "SE-54", title: "What if circuit breaker fails to trip during dependency outage?", importance: "high", openPercent: "82.40%" },
      { id: "lld-se-55", code: "SE-55", title: "What if bulk-head thread isolation pool starves main requests?", importance: "medium", openPercent: "61.30%" }
    ]
  },
  {
    id: "storage",
    title: "STORAGE",
    scenarios: [
      { id: "lld-se-39", code: "SE-39", title: "What if database shard becomes hotspot?", importance: "high", openPercent: "34.41%" }
    ]
  },
  {
    id: "deployment",
    title: "DEPLOYMENT",
    scenarios: [
      { id: "lld-se-36", code: "SE-36", title: "What if rollback of feature is needed instantly?", importance: "medium", openPercent: "38.56%" }
    ]
  },
  {
    id: "ai-ml",
    title: "AI/ML",
    scenarios: [
      { id: "lld-se-2", code: "SE-2", title: "What if vector DB latency increases suddenly?", importance: "medium", openPercent: "53.28%" },
      { id: "lld-se-28", code: "SE-28", title: "What if GPU out-of-memory error occurs?", importance: "high", openPercent: "30.27%" },
      { id: "lld-se-40", code: "SE-40", title: "What if LLM inference request execution times out (>30s)?", importance: "low", openPercent: "36.09%" }
    ]
  }
];

export const getAllScenariosFlat = () => {
  const hld = HLD_SCENARIO_CATEGORIES.flatMap((c) => c.scenarios);
  const lld = LLD_SCENARIO_CATEGORIES.flatMap((c) => c.scenarios);
  return [...hld, ...lld];
};
