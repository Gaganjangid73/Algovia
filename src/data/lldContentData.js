/**
 * Async getter function simulating backend API endpoint for Master Low Level Design (LLD) Curriculum
 * Contains 16 Weeks/Modules and 137 Topics
 */
export const fetchLldCurriculumData = async () => {
  return [
    {
      id: "lld-introduction",
      title: "LLD Introduction",
      description: "Foundational concepts of Low Level Design covering comparisons, interview expectations, evaluation criteria, and design philosophies.",
      topics: [
        {
          id: "what-is-lld",
          title: "What is Low Level Design (LLD)?",
          importance: "high",
          openPercent: "95.65%",
          isLocked: false
        },
        {
          id: "lld-vs-hld",
          title: "LLD vs HLD",
          importance: "medium",
          openPercent: "82.18%",
          isLocked: false
        },
        {
          id: "lld-vs-machine-coding",
          title: "LLD vs Machine Coding Round",
          importance: "high",
          openPercent: "79.42%",
          isLocked: false
        },
        {
          id: "types-of-lld-interviews",
          title: "Types of LLD Interviews",
          importance: "high",
          openPercent: "92.54%",
          isLocked: false
        },
        {
          id: "how-lld-evaluated",
          title: "How LLD is evaluated in interviews",
          importance: "high",
          openPercent: "64.33%",
          isLocked: false
        },
        {
          id: "functional-vs-ood",
          title: "Functional Design vs Object-Oriented Design",
          importance: "medium",
          openPercent: "33.26%",
          isLocked: false
        },
        {
          id: "when-not-to-use-oop",
          title: "When NOT to use OOP",
          importance: "high",
          openPercent: "65.14%",
          isLocked: false
        }
      ]
    },
    {
      id: "oop-fundamentals",
      title: "OOP Fundamentals",
      description: "Core object-oriented programming concepts: Encapsulation, Abstraction, Inheritance, Polymorphism, Composition.",
      topics: [
        { id: "encapsulation-data-hiding", title: "Encapsulation & Data Hiding in Practice", importance: "high", openPercent: "91.20%", isLocked: false },
        { id: "abstraction-interfaces", title: "Abstraction & Interface Design", importance: "high", openPercent: "88.40%", isLocked: false },
        { id: "inheritance-vs-composition", title: "Inheritance vs Composition (Favor Composition)", importance: "high", openPercent: "94.60%", isLocked: false },
        { id: "polymorphism-runtime-compile", title: "Runtime vs Compile-time Polymorphism", importance: "high", openPercent: "86.90%", isLocked: false },
        { id: "method-overriding-overloading", title: "Method Overriding & Overloading Rules", importance: "medium", openPercent: "74.30%", isLocked: false },
        { id: "abstract-classes-interfaces", title: "Abstract Classes vs Interfaces", importance: "high", openPercent: "92.10%", isLocked: false },
        { id: "multiple-inheritance-diamond-problem", title: "Diamond Problem & Multiple Inheritance", importance: "medium", openPercent: "68.50%", isLocked: false },
        { id: "value-objects-entities", title: "Value Objects vs Entities vs Aggregates", importance: "high", openPercent: "83.70%", isLocked: false },
        { id: "immutability-defensive-copying", title: "Immutability & Defensive Copying", importance: "high", openPercent: "87.20%", isLocked: false },
        { id: "constructors-initialization", title: "Constructor Chaining & Initialization Order", importance: "low", openPercent: "45.10%", isLocked: false },
        { id: "access-modifiers-scope", title: "Access Modifiers & Package Visibility", importance: "low", openPercent: "49.60%", isLocked: false },
        { id: "static-methods-singletons", title: "Static Methods & Utility Classes Pitfalls", importance: "medium", openPercent: "63.80%", isLocked: false },
        { id: "coupling-and-cohesion", title: "High Cohesion & Low Coupling", importance: "high", openPercent: "93.40%", isLocked: false },
        { id: "domain-driven-design-basics", title: "DDD Basics for LLD Interviews", importance: "medium", openPercent: "71.90%", isLocked: false },
        { id: "anemic-vs-rich-domain-model", title: "Anemic vs Rich Domain Models", importance: "medium", openPercent: "66.40%", isLocked: false },
        { id: "generics-and-type-erasure", title: "Generics & Variance (Covariance/Contravariance)", importance: "medium", openPercent: "58.20%", isLocked: false },
        { id: "equals-hashcode-contract", title: "equals() and hashCode() Contract", importance: "high", openPercent: "89.50%", isLocked: false },
        { id: "serialization-deserialization-lld", title: "Object Serialization & DTO Mapping", importance: "low", openPercent: "42.70%", isLocked: false },
        { id: "garbage-collection-object-lifecycle", title: "Object Lifecycle & Resource Leakage", importance: "medium", openPercent: "55.30%", isLocked: false }
      ]
    },
    {
      id: "class-relationships",
      title: "Class Relationships",
      description: "Association, Aggregation, Composition, Dependency, and Generalization relationships.",
      topics: [
        { id: "association-vs-aggregation", title: "Association vs Aggregation", importance: "high", openPercent: "87.90%", isLocked: false },
        { id: "aggregation-vs-composition", title: "Aggregation vs Composition Deep Dive", importance: "high", openPercent: "91.30%", isLocked: false },
        { id: "dependency-relationship", title: "Dependency (Uses-a) Relationship", importance: "medium", openPercent: "76.40%", isLocked: false },
        { id: "generalization-realization", title: "Generalization & Realization in Code", importance: "medium", openPercent: "71.80%", isLocked: false },
        { id: "cardinality-multiplicity", title: "1-to-1, 1-to-N, and N-to-N Relationships", importance: "high", openPercent: "85.20%", isLocked: false },
        { id: "bidirectional-vs-unidirectional", title: "Bidirectional vs Unidirectional Relationships", importance: "medium", openPercent: "69.10%", isLocked: false }
      ]
    },
    {
      id: "design-principles",
      title: "Design Principles",
      description: "DRY, KISS, YAGNI, Separation of Concerns, Law of Demeter, and Open-Closed Principle.",
      topics: [
        { id: "dry-dont-repeat-yourself", title: "DRY (Don't Repeat Yourself)", importance: "high", openPercent: "93.80%", isLocked: false },
        { id: "kiss-keep-it-simple", title: "KISS (Keep It Simple, Stupid)", importance: "high", openPercent: "90.40%", isLocked: false },
        { id: "yagni-you-aint-gonna-need-it", title: "YAGNI (You Ain't Gonna Need It)", importance: "high", openPercent: "88.70%", isLocked: false },
        { id: "separation-of-concerns", title: "Separation of Concerns (SoC)", importance: "high", openPercent: "92.10%", isLocked: false },
        { id: "law-of-demeter", title: "Law of Demeter (Principle of Least Knowledge)", importance: "medium", openPercent: "74.60%", isLocked: false },
        { id: "program-to-interface", title: "Program to an Interface, not an Implementation", importance: "high", openPercent: "95.20%", isLocked: false },
        { id: "tell-dont-ask-principle", title: "Tell, Don't Ask Principle", importance: "medium", openPercent: "68.90%", isLocked: false },
        { id: "hollywood-principle", title: "Hollywood Principle (Don't call us, we'll call you)", importance: "medium", openPercent: "65.30%", isLocked: false },
        { id: "fail-fast-principle", title: "Fail-Fast vs Fail-Safe Design", importance: "high", openPercent: "84.10%", isLocked: false },
        { id: "principle-least-astonishment", title: "Principle of Least Astonishment (POLA)", importance: "low", openPercent: "41.90%", isLocked: false }
      ]
    },
    {
      id: "solid-principles",
      title: "SOLID Principles",
      description: "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.",
      topics: [
        { id: "srp-single-responsibility", title: "Single Responsibility Principle (SRP)", importance: "high", openPercent: "97.40%", isLocked: false },
        { id: "ocp-open-closed", title: "Open/Closed Principle (OCP)", importance: "high", openPercent: "96.10%", isLocked: false },
        { id: "lsp-liskov-substitution", title: "Liskov Substitution Principle (LSP)", importance: "high", openPercent: "94.80%", isLocked: false },
        { id: "isp-interface-segregation", title: "Interface Segregation Principle (ISP)", importance: "high", openPercent: "91.30%", isLocked: false },
        { id: "dip-dependency-inversion", title: "Dependency Inversion Principle (DIP)", importance: "high", openPercent: "95.90%", isLocked: false },
        { id: "solid-violations-in-interviews", title: "Identifying SOLID Violations in Code Reviews", importance: "high", openPercent: "89.70%", isLocked: false },
        { id: "refactoring-to-solid", title: "Refactoring Legacy Code to SOLID", importance: "medium", openPercent: "77.40%", isLocked: false },
        { id: "solid-tradeoffs-overengineering", title: "Avoiding Over-engineering with SOLID", importance: "medium", openPercent: "73.20%", isLocked: false },
        { id: "solid-in-functional-languages", title: "SOLID Principles in Non-OOP Codebases", importance: "low", openPercent: "39.80%", isLocked: false }
      ]
    },
    {
      id: "uml-diagrams",
      title: "UML Diagrams",
      description: "Class Diagrams, Sequence Diagrams, Use Case Diagrams, State Machine Diagrams.",
      topics: [
        { id: "uml-class-diagram-symbols", title: "Class Diagram Notations & Multiplicity", importance: "high", openPercent: "92.30%", isLocked: false },
        { id: "uml-sequence-diagram-lifelines", title: "Sequence Diagrams & Synchronous/Async Messages", importance: "high", openPercent: "89.60%", isLocked: false },
        { id: "use-case-diagrams", title: "Use Case Diagrams & Actor System Boundaries", importance: "medium", openPercent: "71.40%", isLocked: false },
        { id: "state-machine-diagrams", title: "State Machine Diagrams for Workflow Engines", importance: "high", openPercent: "84.20%", isLocked: false },
        { id: "activity-diagrams", title: "Activity Diagrams for Business Process Modeling", importance: "medium", openPercent: "66.80%", isLocked: false },
        { id: "object-diagrams", title: "Object Diagrams (Instance Snapshots)", importance: "low", openPercent: "48.30%", isLocked: false },
        { id: "package-diagrams", title: "Package & Component Diagrams", importance: "low", openPercent: "44.10%", isLocked: false },
        { id: "plantuml-mermaid-tools", title: "Drawing UML using PlantUML & Mermaid JS", importance: "medium", openPercent: "62.70%", isLocked: false },
        { id: "uml-in-interview-whiteboard", title: "Whiteboarding UML Diagrams in 10 Minutes", importance: "high", openPercent: "88.90%", isLocked: false }
      ]
    },
    {
      id: "design-patterns-intro",
      title: "Design Patterns Introduction",
      description: "Gang of Four (GoF) design patterns taxonomy: Creational, Structural, Behavioral.",
      topics: [
        { id: "gof-patterns-taxonomy", title: "Gang of Four (GoF) Overview & History", importance: "high", openPercent: "88.20%", isLocked: false },
        { id: "when-to-use-patterns", title: "When to Use vs When NOT to Use Patterns", importance: "high", openPercent: "91.60%", isLocked: false },
        { id: "pattern-matching-in-problems", title: "How to Choose the Right Design Pattern", importance: "high", openPercent: "93.40%", isLocked: false },
        { id: "antipatterns-code-smells", title: "Common Design Anti-Patterns & Code Smells", importance: "medium", openPercent: "76.90%", isLocked: false },
        { id: "refactoring-to-patterns", title: "Refactoring Code to GoF Patterns", importance: "medium", openPercent: "72.40%", isLocked: false }
      ]
    },
    {
      id: "creational-design-patterns",
      title: "Creational Design Patterns",
      description: "Singleton, Factory Method, Abstract Factory, Builder, Prototype.",
      topics: [
        { id: "singleton-pattern-thread-safe", title: "Singleton Pattern (Thread Safety & Enum Singleton)", importance: "high", openPercent: "96.70%", isLocked: false },
        { id: "factory-method-pattern", title: "Factory Method Pattern", importance: "high", openPercent: "95.10%", isLocked: false },
        { id: "abstract-factory-pattern", title: "Abstract Factory Pattern", importance: "high", openPercent: "91.80%", isLocked: false },
        { id: "builder-pattern-fluent", title: "Builder Pattern & Fluent Interfaces", importance: "high", openPercent: "97.20%", isLocked: false },
        { id: "prototype-pattern-cloning", title: "Prototype Pattern (Shallow vs Deep Copying)", importance: "medium", openPercent: "74.80%", isLocked: false },
        { id: "object-pool-pattern", title: "Object Pool Pattern (Connection Pools)", importance: "medium", openPercent: "68.30%", isLocked: false },
        { id: "dependency-injection-container", title: "Dependency Injection & Service Locator", importance: "high", openPercent: "89.40%", isLocked: false }
      ]
    },
    {
      id: "structural-design-patterns",
      title: "Structural Design Patterns",
      description: "Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy.",
      topics: [
        { id: "adapter-pattern", title: "Adapter Pattern (Wrapper for Legacy APIs)", importance: "high", openPercent: "94.30%", isLocked: false },
        { id: "decorator-pattern-java-io", title: "Decorator Pattern (Java I/O Streams)", importance: "high", openPercent: "95.80%", isLocked: false },
        { id: "facade-pattern-subsystem", title: "Facade Pattern (Simplifying Complex Subsystems)", importance: "high", openPercent: "92.60%", isLocked: false },
        { id: "proxy-pattern-virtual-security", title: "Proxy Pattern (Virtual, Protection, Caching Proxy)", importance: "high", openPercent: "88.90%", isLocked: false },
        { id: "composite-pattern-tree-structures", title: "Composite Pattern (File System & UI Trees)", importance: "medium", openPercent: "79.20%", isLocked: false },
        { id: "flyweight-pattern-memory-sharing", title: "Flyweight Pattern (Memory-efficient String Pools)", importance: "medium", openPercent: "71.50%", isLocked: false },
        { id: "bridge-pattern-decoupling", title: "Bridge Pattern (Decoupling Abstraction from Impl)", importance: "medium", openPercent: "66.70%", isLocked: false }
      ]
    },
    {
      id: "behavioral-design-patterns",
      title: "Behavioral Design Patterns",
      description: "Observer, Strategy, Command, Chain of Responsibility, State, Template Method, Iterator, Mediator, Memento, Visitor.",
      topics: [
        { id: "strategy-pattern-payment-gateways", title: "Strategy Pattern (Payment Gateways & Pricing Engines)", importance: "high", openPercent: "98.10%", isLocked: false },
        { id: "observer-pattern-pub-sub-local", title: "Observer Pattern (Event Listeners & Reactive Streams)", importance: "high", openPercent: "96.40%", isLocked: false },
        { id: "command-pattern-undo-redo", title: "Command Pattern (Undo/Redo & Transaction Logs)", importance: "high", openPercent: "92.80%", isLocked: false },
        { id: "chain-of-responsibility-middleware", title: "Chain of Responsibility (HTTP Filters & Middleware)", importance: "high", openPercent: "94.50%", isLocked: false },
        { id: "state-pattern-vending-machine", title: "State Pattern (Vending Machine & Order State Machine)", importance: "high", openPercent: "95.20%", isLocked: false },
        { id: "template-method-pattern", title: "Template Method Pattern (Framework Hooks)", importance: "high", openPercent: "89.10%", isLocked: false },
        { id: "iterator-pattern-custom-collections", title: "Iterator Pattern (Traversing Custom Collections)", importance: "medium", openPercent: "78.30%", isLocked: false },
        { id: "mediator-pattern-chat-room", title: "Mediator Pattern (Air Traffic Control & Chat Hubs)", importance: "medium", openPercent: "73.90%", isLocked: false },
        { id: "memento-pattern-snapshots", title: "Memento Pattern (Text Editor Save Points)", importance: "medium", openPercent: "69.40%", isLocked: false },
        { id: "visitor-pattern-ast-parsing", title: "Visitor Pattern (AST Parsing & Tax Calculations)", importance: "medium", openPercent: "64.10%", isLocked: false }
      ]
    },
    {
      id: "architectural-practical-patterns",
      title: "Architectural & Practical Patterns (LLD Scope)",
      description: "MVC, MVP, MVVM, DAO, DTO, Repository Pattern, Unit of Work, Active Record.",
      topics: [
        { id: "repository-pattern-db-decoupling", title: "Repository Pattern for DB Decoupling", importance: "high", openPercent: "93.60%", isLocked: false },
        { id: "dto-dao-pattern", title: "DTO (Data Transfer Object) & DAO Patterns", importance: "high", openPercent: "91.20%", isLocked: false },
        { id: "unit-of-work-transactions", title: "Unit of Work Pattern", importance: "medium", openPercent: "74.80%", isLocked: false },
        { id: "mvc-architecture-pattern", title: "MVC (Model-View-Controller) Deep Dive", importance: "high", openPercent: "88.90%", isLocked: false },
        { id: "active-record-vs-data-mapper", title: "Active Record vs Data Mapper Pattern", importance: "medium", openPercent: "67.40%", isLocked: false },
        { id: "cqrs-at-lld-level", title: "CQRS at Class & Handler Level", importance: "medium", openPercent: "63.90%", isLocked: false },
        { id: "specification-pattern-filtering", title: "Specification Pattern for Dynamic Querying", importance: "medium", openPercent: "71.20%", isLocked: false },
        { id: "service-layer-pattern", title: "Service Layer Pattern & Business Logic Isolation", importance: "high", openPercent: "86.50%", isLocked: false },
        { id: "circuit-breaker-lld-resilience", title: "Circuit Breaker Implementation at Class Level", importance: "medium", openPercent: "69.80%", isLocked: false }
      ]
    },
    {
      id: "concurrency-thread-safety",
      title: "Concurrency & Thread Safety (LLD Level)",
      description: "Thread pools, synchronizers, mutexes, atomic operations, producer-consumer queues.",
      topics: [
        { id: "thread-safety-immutability-locking", title: "Thread Safety via Immutability & Synchronized Blocks", importance: "high", openPercent: "94.80%", isLocked: false },
        { id: "producer-consumer-blocking-queue", title: "Producer-Consumer Pattern with BlockingQueue", importance: "high", openPercent: "96.30%", isLocked: false },
        { id: "thread-pool-executor-custom", title: "Designing a Custom Thread Pool Executor", importance: "high", openPercent: "92.10%", isLocked: false },
        { id: "read-write-lock-pattern", title: "ReentrantReadWriteLock Pattern", importance: "medium", openPercent: "79.40%", isLocked: false },
        { id: "atomic-variables-cas", title: "Atomic Variables & Compare-And-Swap (CAS)", importance: "high", openPercent: "87.60%", isLocked: false },
        { id: "deadlock-prevention-bankers", title: "Deadlock Detection & Prevention Strategies", importance: "high", openPercent: "90.20%", isLocked: false },
        { id: "double-checked-locking-volatile", title: "Double-Checked Locking & Volatile Keyword", importance: "high", openPercent: "88.90%", isLocked: false },
        { id: "countdown-latch-cyclic-barrier", title: "CountDownLatch vs CyclicBarrier", importance: "medium", openPercent: "73.10%", isLocked: false },
        { id: "semaphore-rate-limiter-lld", title: "Semaphore & Leaky Bucket Rate Limiter", importance: "high", openPercent: "85.70%", isLocked: false },
        { id: "thread-local-storage-dangers", title: "ThreadLocal Variables & Memory Leaks", importance: "medium", openPercent: "64.80%", isLocked: false }
      ]
    },
    {
      id: "error-handling-reliability",
      title: "Error Handling & Reliability",
      description: "Custom Exception Hierarchies, Result<T> Monad, Checked vs Unchecked Exceptions.",
      topics: [
        { id: "custom-exception-hierarchy", title: "Designing a Clean Custom Exception Hierarchy", importance: "high", openPercent: "89.60%", isLocked: false },
        { id: "result-monad-error-handling", title: "Result<T, E> Pattern vs Throwing Exceptions", importance: "high", openPercent: "84.20%", isLocked: false },
        { id: "checked-vs-unchecked-exceptions", title: "Checked vs Unchecked Exceptions Guidelines", importance: "medium", openPercent: "76.80%", isLocked: false },
        { id: "global-exception-handler", title: "Global Error Handlers & Panic Recovery", importance: "medium", openPercent: "71.40%", isLocked: false },
        { id: "resource-cleanup-try-with-resources", title: "RAII & Try-With-Resources Management", importance: "high", openPercent: "88.10%", isLocked: false },
        { id: "graceful-error-logging-context", title: "Adding Contextual Metadata to Error Logs", importance: "medium", openPercent: "68.90%", isLocked: false },
        { id: "retry-handler-exponential-backoff", title: "Class-level Retry Handler with Backoff", importance: "high", openPercent: "82.50%", isLocked: false },
        { id: "null-safety-optional-pattern", title: "Null Safety & Optional/Maybe Monad", importance: "high", openPercent: "91.30%", isLocked: false }
      ]
    },
    {
      id: "dependency-management-extensibility",
      title: "Dependency Management & Extensibility",
      description: "Plugin Architecture, SPI (Service Provider Interface), Dependency Injection.",
      topics: [
        { id: "plugin-architecture-service-loader", title: "Plugin Architecture using ServiceLoader", importance: "high", openPercent: "84.90%", isLocked: false },
        { id: "inversion-of-control-ioc-container", title: "Building a Lightweight IoC Container", importance: "high", openPercent: "89.20%", isLocked: false },
        { id: "strategy-factory-extensibility", title: "Combining Strategy + Factory for Zero Code Mod", importance: "high", openPercent: "93.40%", isLocked: false },
        { id: "event-bus-in-memory-pubsub", title: "Designing an In-Memory Event Bus", importance: "high", openPercent: "87.80%", isLocked: false },
        { id: "annotation-reflection-processor", title: "Reflection & Custom Annotations in LLD", importance: "medium", openPercent: "69.10%", isLocked: false },
        { id: "dynamic-proxies-aspects", title: "Dynamic Proxies & AOP (Aspect Oriented Prog)", importance: "medium", openPercent: "65.40%", isLocked: false }
      ]
    },
    {
      id: "clean-code-lld",
      title: "Clean Code for LLD",
      description: "Meaningful names, small focused functions, refactoring smells, self-documenting code.",
      topics: [
        { id: "meaningful-names-variables-classes", title: "Intention-Revealing Naming Conventions", importance: "high", openPercent: "95.60%", isLocked: false },
        { id: "function-length-argument-count", title: "Small Functions & Parameter Object Refactoring", importance: "high", openPercent: "92.80%", isLocked: false },
        { id: "comments-vs-self-documenting", title: "Self-Documenting Code vs Bad Comments", importance: "medium", openPercent: "78.40%", isLocked: false },
        { id: "formatting-vertical-horizontal-density", title: "Code Formatting & Vertical/Horizontal Density", importance: "low", openPercent: "51.20%", isLocked: false },
        { id: "refactoring-nested-ifs-guard-clauses", title: "Replacing Nested Ifs with Guard Clauses", importance: "high", openPercent: "94.10%", isLocked: false },
        { id: "replacing-switch-polymorphism", title: "Replacing Switch Statements with Polymorphism", importance: "high", openPercent: "91.70%", isLocked: false },
        { id: "code-review-checklist-lld", title: "10-Point LLD Code Review Checklist", importance: "high", openPercent: "88.30%", isLocked: false }
      ]
    },
    {
      id: "lld-interview-approach",
      title: "LLD Interview Approach",
      description: "45-minute LLD interview blueprint, requirement gathering, class diagram sketch, and code execution.",
      topics: [
        { id: "45-min-lld-interview-blueprint", title: "45-Minute LLD Interview Time Management", importance: "high", openPercent: "98.40%", isLocked: false },
        { id: "design-parking-lot-system", title: "Design a Parking Lot System", importance: "high", openPercent: "98.90%", isLocked: false },
        { id: "design-snake-and-ladders", title: "Design Snake & Ladders / Tic-Tac-Toe Game", importance: "high", openPercent: "97.50%", isLocked: false },
        { id: "design-book-my-show", title: "Design Movie Ticket Booking (BookMyShow)", importance: "high", openPercent: "96.80%", isLocked: false },
        { id: "design-splitwise-expense-sharing", title: "Design Splitwise (Expense Sharing App)", importance: "high", openPercent: "97.10%", isLocked: false },
        { id: "design-elevator-system", title: "Design Elevator Control System", importance: "high", openPercent: "95.60%", isLocked: false },
        { id: "design-vending-machine-system", title: "Design a Vending Machine System", importance: "high", openPercent: "94.80%", isLocked: false },
        { id: "design-logging-framework-log4j", title: "Design a Logging Framework (like Log4j)", importance: "high", openPercent: "93.90%", isLocked: false }
      ]
    }
  ];
};
