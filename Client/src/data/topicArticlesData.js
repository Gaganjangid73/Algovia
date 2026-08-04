import gaganAvatar from "../assets/Gagan.JPG";

/**
 * Rich educational article content store for Low Level Design (LLD) & High Level Design (HLD) topics
 * Authored by Gagan Jangid (Senior Software Engineer)
 */
export const TOPIC_ARTICLES = {
  "what-is-lld": {
    id: "what-is-lld",
    title: "What is Low Level Design (LLD)?",
    author: {
      name: "Gagan Jangid",
      role: "Senior Software Engineer",
      avatar: gaganAvatar
    },
    readingProgress: 7,
    sectionsOnPage: [
      { id: "what-lld-means", title: "1. What Low Level Design Actually Means" },
      { id: "where-lld-sits", title: "2. Where LLD Sits in the Software Design Process" },
      { id: "what-lld-produces", title: "3. What LLD Actually Produces" },
      { id: "concrete-example", title: "4. A Concrete Example, Designing a Parking Lot Ticket System" },
      { id: "why-lld-matters", title: "5. Why LLD Actually Matters" },
      { id: "common-misconceptions", title: "6. Common Misconceptions About LLD" },
      { id: "key-takeaways", title: "7. Key Takeaways" }
    ],
    contentBlocks: [
      {
        type: "paragraph",
        text: "Imagine you and a friend decide to build a house. The architect draws up the big picture: three bedrooms, a garage, a garden facing east. That's the vision. But nobody picks up a hammer from that drawing alone."
      },
      {
        type: "paragraph",
        text: "Someone still has to decide exactly where every pipe runs, how thick each wall is, which socket goes on which switchboard. Low Level Design is that second, much more detailed set of decisions, applied to software instead of a house."
      },
      {
        type: "callout",
        text: "Low Level Design (LLD) is the process of translating a system's high level plan into the actual classes, objects, interfaces, and interactions that a developer can sit down and code directly."
      },
      {
        type: "heading",
        id: "what-lld-means",
        text: "1. What Low Level Design Actually Means"
      },
      {
        type: "paragraph",
        text: "When you hear 'design' in software, it's easy to get confused. System Design usually splits into two stages: High Level Design (HLD) and Low Level Design (LLD). HLD deals with servers, databases, load balancers, caches, and microservices architecture."
      },
      {
        type: "paragraph",
        text: "LLD zooms in to a single service or component. It answers: What classes will we write? What data members will each class hold? Which design patterns fit best here? How will threads safely access shared state?"
      },
      {
        type: "heading",
        id: "where-lld-sits",
        text: "2. Where LLD Sits in the Software Design Process"
      },
      {
        type: "paragraph",
        text: "In standard software engineering workflows, requirement analysis leads to HLD, which leads to LLD, which leads to implementation (coding). Skip LLD, and engineers end up writing messy, tightly coupled code with duplicate logic and hidden bugs."
      },
      {
        type: "heading",
        id: "what-lld-produces",
        text: "3. What LLD Actually Produces"
      },
      {
        type: "paragraph",
        text: "A complete LLD document delivers: 1) Class Diagrams (UML showing relationships), 2) Sequence Diagrams (showing call flows), 3) Interface Contracts & Method Signatures, 4) State Machine Diagrams for lifecycle transitions, and 5) Concurrency & Exception Handling Strategies."
      },
      {
        type: "heading",
        id: "concrete-example",
        text: "4. A Concrete Example, Designing a Parking Lot Ticket System"
      },
      {
        type: "paragraph",
        text: "Consider a Parking Lot. HLD decides if we use PostgreSQL or Redis to store active tickets. LLD decides the exact classes: Vehicle (Car, Bike, Truck), ParkingSpot, Ticket, RateCalculationStrategy (Hourly, Flat, PeakHour), and PaymentProcessor."
      },
      {
        type: "heading",
        id: "why-lld-matters",
        text: "5. Why LLD Actually Matters"
      },
      {
        type: "paragraph",
        text: "Top tech companies (Google, Amazon, Meta, Uber, Microsoft) heavily test LLD in Machine Coding & Object-Oriented Design rounds. Clean LLD proves you write maintainable, scalable, and testable code."
      },
      {
        type: "heading",
        id: "common-misconceptions",
        text: "6. Common Misconceptions About LLD"
      },
      {
        type: "paragraph",
        text: "Misconception #1: LLD is just writing code. Fact: LLD is designing abstractions before coding. Misconception #2: More design patterns equal better design. Fact: Overengineering leads to unnecessary complexity."
      },
      {
        type: "heading",
        id: "key-takeaways",
        text: "7. Key Takeaways"
      },
      {
        type: "paragraph",
        text: "Mastering LLD requires understanding Object-Oriented Analysis & Design (OOAD), SOLID principles, Design Patterns, and Clean Code principles."
      }
    ]
  }
};

/**
 * Fallback generator for topics that don't have custom static article text yet
 */
export const getTopicArticleData = (topicId, topicTitle = "Topic Details") => {
  if (TOPIC_ARTICLES[topicId]) {
    return TOPIC_ARTICLES[topicId];
  }

  const isLldProblem = (topicId || "").includes("parking") || 
                       (topicId || "").includes("vending") || 
                       (topicId || "").includes("atm") || 
                       (topicId || "").includes("elevator") || 
                       (topicId || "").includes("chess") || 
                       (topicId || "").includes("snake") || 
                       (topicId || "").includes("toe") || 
                       (topicId || "").includes("splitwise") || 
                       (topicId || "").includes("pub-sub") || 
                       (topicId || "").includes("cricinfo") || 
                       (topicId || "").includes("auction") || 
                       (typeof window !== "undefined" && window.location.pathname.includes("/lld-designs"));

  const isSdPattern = (topicId || "").includes("traffic") || 
                      (topicId || "").includes("streaming") || 
                      (topicId || "").includes("election") || 
                      (topicId || "").includes("tenancy") || 
                      (topicId || "").includes("counting") || 
                      (topicId || "").includes("region") || 
                      (topicId || "").includes("transactions") || 
                      (topicId || "").includes("realtime") || 
                      (topicId || "").includes("fanout") || 
                      (topicId || "").includes("keys") || 
                      (topicId || "").includes("spikes") || 
                      (topicId || "").includes("location") || 
                      (topicId || "").includes("recommendations") || 
                      (topicId || "").includes("deduplicating") || 
                      (topicId || "").includes("failure") || 
                      (topicId || "").includes("ids") || 
                      (typeof window !== "undefined" && window.location.pathname.includes("/interview-pattern"));

  const isSdScenario = (topicId || "").startsWith("se-") || 
                       (topicId || "").startsWith("lld-se-") || 
                       (typeof window !== "undefined" && window.location.pathname.includes("/scenarios"));

  if (isSdScenario && !isLldProblem) {
    return {
      id: topicId,
      title: topicTitle,
      author: {
        name: "Gagan Jangid",
        role: "Senior Software Engineer",
        avatar: gaganAvatar
      },
      readingProgress: 0,
      sectionsOnPage: [
        { id: "context", title: "1. Scenario Breakdown & Context" },
        { id: "root-cause", title: "2. Root Cause Analysis" },
        { id: "architectural-mitigation", title: "3. Architectural Mitigation Strategy" },
        { id: "tradeoffs", title: "4. Tradeoffs & Edge Cases" },
        { id: "interview-answer", title: "5. Production-Ready Interview Talking Points" }
      ],
      contentBlocks: [
        {
          type: "callout",
          text: `Interview Context: This scenario evaluates your capability to handle real-world system failures, edge cases, and high-concurrency degradation gracefully.`
        },
        {
          type: "heading",
          id: "context",
          text: "1. Scenario Breakdown & Context"
        },
        {
          type: "paragraph",
          text: `In large-scale production environments, "${topicTitle}" represents a critical system event. Senior interviewers use this question to test whether you design for optimistic scenarios or build resilient systems that self-heal.`
        },
        {
          type: "heading",
          id: "root-cause",
          text: "2. Root Cause Analysis"
        },
        {
          type: "paragraph",
          text: "• Network partition or transient packet drop between cluster nodes.\n• Resource contention, thread pool exhaustion, or DB connection starvation.\n• Unhandled cascading retries without backoff or circuit breaking."
        },
        {
          type: "heading",
          id: "architectural-mitigation",
          text: "3. Architectural Mitigation Strategy"
        },
        {
          type: "paragraph",
          text: "1. Implement Exponential Backoff with Jitter for all client retries.\n2. Introduce Circuit Breakers (Hystrix / Resilience4j) to fail fast and prevent cascading system collapse.\n3. Enforce Rate Limiting & Graceful Degradation (serve cached static fallbacks or read-only mode).\n4. Maintain Distributed Tracing (OpenTelemetry) & Automated Alerting on p99 latency spikes."
        },
        {
          type: "heading",
          id: "tradeoffs",
          text: "4. Tradeoffs & Edge Cases"
        },
        {
          type: "paragraph",
          text: "Tradeoff: Prioritizing Availability (AP system) ensures the service stays online, but clients may read slightly stale data until async reconciliation completes."
        },
        {
          type: "heading",
          id: "interview-answer",
          text: "5. Production-Ready Interview Talking Points"
        },
        {
          type: "paragraph",
          text: "1. State the failure mode immediately.\n2. Explain the short-term mitigation (failover / circuit break / throttle).\n3. Outline the long-term architectural fix (sharding / replica isolation / backpressure queues)."
        }
      ]
    };
  }

  if (isSdPattern && !isLldProblem) {
    const cleanTitle = topicTitle.replace(/Pattern #\d+:/gi, "").trim();
    return {
      id: topicId,
      title: topicTitle,
      author: {
        name: "Gagan Jangid",
        role: "Senior Software Engineer",
        avatar: gaganAvatar
      },
      readingProgress: 0,
      sectionsOnPage: [
        { id: "overview", title: `1. Overview of ${cleanTitle}` },
        { id: "problem-class", title: "2. Class of Problems Solved" },
        { id: "architecture", title: "3. Architectural Blueprints" },
        { id: "tradeoffs", title: "4. Tradeoffs & Consistency Constraints" },
        { id: "prod-examples", title: "5. Production System Examples" },
        { id: "interview-presentation", title: "6. How to State in Interviews" }
      ],
      contentBlocks: [
        {
          type: "callout",
          text: `Mastering ${cleanTitle}: In interviews, name this pattern first, explain the underlying trade-offs, and demonstrate how to combine it with other patterns to build scalable systems.`
        },
        {
          type: "heading",
          id: "overview",
          text: `1. Overview of ${cleanTitle}`
        },
        {
          type: "paragraph",
          text: `${cleanTitle} is a foundational building block in large-scale distributed systems design. It isolates system bottlenecks and establishes robust patterns for scalability, fault tolerance, and low latency.`
        },
        {
          type: "heading",
          id: "problem-class",
          text: "2. Class of Problems Solved"
        },
        {
          type: "paragraph",
          text: "• Solves high concurrency bottlenecks and resource contention.\n• Prevents single-point failures with distributed fallback mechanisms.\n• Ensures predictable system degradation under extreme peak loads."
        },
        {
          type: "heading",
          id: "architecture",
          text: "3. Architectural Blueprints"
        },
        {
          type: "paragraph",
          text: "Client -> Edge Load Balancer -> API Gateway -> Stateless Worker Pool -> Distributed Cache (Redis / Memcached) -> Persistent Storage Shards with Read Replicas."
        },
        {
          type: "heading",
          id: "tradeoffs",
          text: "4. Tradeoffs & Consistency Constraints"
        },
        {
          type: "paragraph",
          text: "CAP Theorem Application: Prioritizes Availability and Partition Tolerance (AP) under network partitions while employing background async replication for eventual consistency."
        },
        {
          type: "heading",
          id: "prod-examples",
          text: "5. Production System Examples"
        },
        {
          type: "paragraph",
          text: "Adopted by top-tier tech companies including Netflix, Uber, Amazon, and Google for handling global internet-scale traffic."
        },
        {
          type: "heading",
          id: "interview-presentation",
          text: "6. How to State in Interviews"
        },
        {
          type: "paragraph",
          text: "1. State the problem requirement clearly.\n2. Propose this pattern as the primary architectural choice.\n3. Discuss CAP theorem tradeoffs, failure modes, and metrics to monitor."
        }
      ]
    };
  }

  if (isLldProblem) {
    const cleanTitle = topicTitle.replace(/\(Interview #\d+\)/gi, "").trim();
    
    let designPatterns = "Singleton (for system controller), Factory (for dynamic object creation), Strategy (for pluggable algorithms).";
    let coreEntitiesText = "Domain Models, Controller/Manager Singleton, Repository/State Store, and Client APIs.";

    if (topicId.includes("vending")) {
      designPatterns = "State Pattern (ReadyState, DispenseState, HasMoneyState), Factory Pattern (ItemFactory), Strategy Pattern (PricingStrategy).";
      coreEntitiesText = "VendingMachine, State (Interface), ItemSlot, Item, Coin, Note, PaymentProcessor.";
    } else if (topicId.includes("parking")) {
      designPatterns = "Strategy Pattern (ParkingStrategy & FeeCalculationStrategy), Factory Pattern (VehicleFactory), Singleton (ParkingLotManager).";
      coreEntitiesText = "ParkingLot, ParkingFloor, ParkingSpot (Compact, Large, Handicapped), Vehicle (Car, Bike, Truck), Ticket, PaymentTerminal.";
    } else if (topicId.includes("atm")) {
      designPatterns = "State Pattern (IdleState, CardInsertedState, PINEnteredState, DispensingState), Chain of Responsibility (CashDispenser $50 -> $20 -> $10).";
      coreEntitiesText = "ATM, ATMState, Card, Account, BankService, CashDispenser, Keypad, Screen, ReceiptPrinter.";
    } else if (topicId.includes("elevator")) {
      designPatterns = "Strategy Pattern (ElevatorDispatchStrategy - LOOK/SCAN algorithm), State Pattern (Idle, MovingUp, MovingDown, Maintenance), Observer Pattern (Floor Display updates).";
      coreEntitiesText = "ElevatorController, ElevatorCar, InternalButtonPanel, ExternalButton, Floor, Request (SourceFloor, DestinationFloor, Direction).";
    } else if (topicId.includes("lru")) {
      designPatterns = "Composite Doubly LinkedList + HashMap pattern for O(1) time complexity access and eviction.";
      coreEntitiesText = "LRUCache, Node (key, value, prev, next), DoublyLinkedList (head, tail), CapacityManager.";
    } else if (topicId.includes("pub-sub")) {
      designPatterns = "Observer Pattern (Publisher -> Topic -> Subscriber), Broker Pattern, ThreadPool Executor for async message processing.";
      coreEntitiesText = "PubSubBroker, Topic, Message, Subscriber (Interface), Publisher, MessageQueue, SubscriptionRegistry.";
    } else if (topicId.includes("splitwise")) {
      designPatterns = "Strategy Pattern (ExpenseSplitStrategy: EqualSplit, ExactSplit, PercentageSplit), Graph Min-Flow Algorithm (Debt Simplification).";
      coreEntitiesText = "SplitwiseService, User, Group, Expense, Split (Interface), DebtGraph, BalanceSheet.";
    } else if (topicId.includes("chess") || topicId.includes("snake") || topicId.includes("toe")) {
      designPatterns = "Command Pattern (for move undo/redo execution), Strategy Pattern (WinningConditionStrategy), State Pattern (TurnState).";
      coreEntitiesText = "Board, Cell, Piece/Player, GameController, MoveRecord, WinningStrategy.";
    } else if (topicId.includes("booking") || topicId.includes("ticketing") || topicId.includes("hotel") || topicId.includes("rental")) {
      designPatterns = "Factory Pattern (InventoryFactory), Strategy Pattern (DynamicPricingStrategy), Pessimistic Lock / Optimistic Lock (SeatReservation).";
      coreEntitiesText = "InventoryManager, Show/Event, Seat, BookingTicket, PaymentGateway, LockRegistry.";
    }

    return {
      id: topicId,
      title: topicTitle,
      author: {
        name: "Gagan Jangid",
        role: "Senior Software Engineer",
        avatar: gaganAvatar
      },
      readingProgress: 0,
      sectionsOnPage: [
        { id: "problem-statement", title: "1. Problem Statement" },
        { id: "functional-requirements", title: "2. Functional Requirements" },
        { id: "non-functional-requirements", title: "3. Non-Functional Requirements" },
        { id: "clarifying-questions", title: "4. Clarifying Questions" },
        { id: "assumptions-constraints", title: "5. Assumptions & Constraints" },
        { id: "core-entities", title: "6. Core Entities" },
        { id: "relationships-between-entities", title: "7. Relationships Between Entities" },
        { id: "uml-class-diagram", title: "8. UML Class Diagram" },
        { id: "design-patterns-used", title: "9. Design Patterns Used" },
        { id: "class-design", title: "10. Class Design" },
        { id: "interface-design", title: "11. Interface Design" },
        { id: "sequence-diagrams", title: "12. Sequence Diagrams" },
        { id: "important-workflows", title: "13. Important Workflows" },
        { id: "public-apis", title: "14. Public APIs / Methods" },
        { id: "exception-handling", title: "15. Exception Handling" },
        { id: "concurrency-considerations", title: "16. Concurrency Considerations" }
      ],
      contentBlocks: [
        {
          type: "callout",
          text: "All the headings and the flow should remain the same, just like you would follow in an interview or while building a system. Memorize this structure, as it is common for almost every LLD problem."
        },
        {
          type: "heading",
          id: "problem-statement",
          text: "1. Problem Statement"
        },
        {
          type: "paragraph",
          text: `Design an object-oriented production system for ${cleanTitle}. The system must handle concurrent user requests efficiently, maintain deterministic internal state transitions, enforce SOLID principles, and expose extensible APIs.`
        },
        {
          type: "heading",
          id: "functional-requirements",
          text: "2. Functional Requirements"
        },
        {
          type: "paragraph",
          text: `1. System Initialization: Bootstraps core state, inventory, and configurable parameters for ${cleanTitle}.\n2. Core Operations: Supports primary user interactions (e.g., allocations, transactions, updates, state changes).\n3. Validation & State Control: Rejects invalid requests, enforces state transition guards, and handles edge cases.`
        },
        {
          type: "heading",
          id: "non-functional-requirements",
          text: "3. Non-Functional Requirements"
        },
        {
          type: "paragraph",
          text: "• Low Latency: Core operations execute in O(1) or O(log N) complexity.\n• Thread Safety: Race-condition-free operation under multi-threaded concurrency using ReentrantLocks or ReadWriteLocks.\n• Extensibility: Open/Closed Principle applied via strategy and factory abstractions.\n• High Cohesion & Loose Coupling: Isolated single-responsibility modules."
        },
        {
          type: "heading",
          id: "clarifying-questions",
          text: "4. Clarifying Questions"
        },
        {
          type: "paragraph",
          text: "1. Scope: Are we designing a single-process in-memory engine or a distributed microservice?\n2. Concurrency: Will multiple clients access the system simultaneously?\n3. Persistence: Is database persistence required or strictly in-memory data structures?\n4. Extensibility: What future algorithms or integrations might be added later?"
        },
        {
          type: "heading",
          id: "assumptions-constraints",
          text: "5. Assumptions & Constraints"
        },
        {
          type: "paragraph",
          text: "• Single-node JVM / C++ process in-memory execution.\n• Thread-safe memory access using explicit locks.\n• Clean separation between API controllers, domain entities, and data stores."
        },
        {
          type: "heading",
          id: "core-entities",
          text: "6. Core Entities"
        },
        {
          type: "paragraph",
          text: coreEntitiesText
        },
        {
          type: "heading",
          id: "relationships-between-entities",
          text: "7. Relationships Between Entities"
        },
        {
          type: "paragraph",
          text: "• Composition: Manager owns and controls life cycle of state stores and active entities.\n• Aggregation: Controllers reference configurable strategy objects.\n• Association: Users and transactions linked via UUID identifiers."
        },
        {
          type: "heading",
          id: "uml-class-diagram",
          text: "8. UML Class Diagram"
        },
        {
          type: "paragraph",
          text: "UML structural view: + public interfaces, - private state fields, # protected helpers, and arrows demarcating inheritance (is-a) vs composition (has-a)."
        },
        {
          type: "heading",
          id: "design-patterns-used",
          text: "9. Design Patterns Used"
        },
        {
          type: "paragraph",
          text: designPatterns
        },
        {
          type: "heading",
          id: "class-design",
          text: "10. Class Design"
        },
        {
          type: "paragraph",
          text: "Concrete Java / C++ implementations adhering to encapsulation. Private mutable properties paired with thread-safe public accessors."
        },
        {
          type: "heading",
          id: "interface-design",
          text: "11. Interface Design"
        },
        {
          type: "paragraph",
          text: "Interface Segregation Principle (ISP) enforced. Clean interface contracts defined for easy mock testing and dependency injection."
        },
        {
          type: "heading",
          id: "sequence-diagrams",
          text: "12. Sequence Diagrams"
        },
        {
          type: "paragraph",
          text: "Flow sequence: Client -> API Controller -> State Validator -> Manager -> Strategy -> Entity -> Event Dispatcher."
        },
        {
          type: "heading",
          id: "important-workflows",
          text: "13. Important Workflows"
        },
        {
          type: "paragraph",
          text: "End-to-end trace of happy-path execution, validation failures, rollbacks, and success confirmation."
        },
        {
          type: "heading",
          id: "public-apis",
          text: "14. Public APIs / Methods"
        },
        {
          type: "paragraph",
          text: "• executeOperation(params): OperationResult\n• getState(): SystemState\n• configureStrategy(StrategyType): void"
        },
        {
          type: "heading",
          id: "exception-handling",
          text: "15. Exception Handling"
        },
        {
          type: "paragraph",
          text: "Custom domain exceptions: InvalidStateException, ResourceUnavailableException, ConcurrencyConflictException, ValidationException."
        },
        {
          type: "heading",
          id: "concurrency-considerations",
          text: "16. Concurrency Considerations"
        },
        {
          type: "paragraph",
          text: "ReentrantReadWriteLock applied for high read throughput. AtomicInteger / AtomicReference used for lock-free counter updates. Synchronized blocks for critical section state transitions."
        }
      ]
    };
  }

  return {
    id: topicId,
    title: topicTitle,
    author: {
      name: "Gagan Jangid",
      role: "Senior Software Engineer",
      avatar: gaganAvatar
    },
    readingProgress: 7,
    sectionsOnPage: [
      { id: "overview", title: `1. Overview of ${topicTitle}` },
      { id: "key-concepts", title: "2. Key Concepts & Architecture" },
      { id: "interview-expectations", title: "3. Interview Expectations & Best Practices" },
      { id: "code-example", title: "4. Code Example & Implementation" },
      { id: "summary", title: "5. Summary & Key Takeaways" }
    ],
    contentBlocks: [
      {
        type: "paragraph",
        text: `Welcome to the comprehensive guide on ${topicTitle}. In modern software engineering, mastering this concept is essential for building scalable, maintainable, and high-performance applications.`
      },
      {
        type: "callout",
        text: `Key Principle: ${topicTitle} provides the foundational framework needed for clean software architecture and robust technical interviews.`
      },
      {
        type: "heading",
        id: "overview",
        text: `1. Overview of ${topicTitle}`
      },
      {
        type: "paragraph",
        text: `Understanding ${topicTitle} requires breaking down its core components into actionable design decisions. It bridges high-level architectural goals with actual implementation details.`
      },
      {
        type: "heading",
        id: "key-concepts",
        text: "2. Key Concepts & Architecture"
      },
      {
        type: "paragraph",
        text: "When implementing this pattern, always focus on high cohesion, loose coupling, thread safety, and proper exception management."
      },
      {
        type: "heading",
        id: "interview-expectations",
        text: "3. Interview Expectations & Best Practices"
      },
      {
        type: "paragraph",
        text: "Interviewers look for candidates who can state requirements clearly, apply SOLID principles, design clean class interfaces, and discuss tradeoffs intelligently."
      },
      {
        type: "heading",
        id: "code-example",
        text: "4. Code Example & Implementation"
      },
      {
        type: "paragraph",
        text: "In real-world production codebases, this structure ensures seamless extensibility and effortless unit testing."
      },
      {
        type: "heading",
        id: "summary",
        text: "5. Summary & Key Takeaways"
      },
      {
        type: "paragraph",
        text: "Consistently practice designing modules using these guidelines to excel in senior software engineering interviews."
      }
    ]
  };
};
