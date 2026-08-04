/**
 * Data structures for 35 Low Level Design (LLD) Problems in ONE CONTINUOUS UNIFIED LIST:
 * URL pattern: /lld-designs/:topicId
 */

export const LLD_PROBLEMS_SECTIONS = [
  {
    id: "all-lld-problems",
    title: "Low Level Design Problems",
    topics: [
      {
        id: "object-oriented-design-interview",
        title: "Object-Oriented Design Interview",
        isLocked: false,
        summary: "Introduction to low-level object-oriented design interview expectations and evaluation criteria."
      },
      {
        id: "framework-for-the-ood-interview",
        title: "Framework for the OOD Interview",
        isLocked: false,
        summary: "A step-by-step structured blueprint to approach any low-level system design problem in 45 minutes."
      },
      {
        id: "parking-lot",
        title: "Parking Lot (Interview #1)",
        isLocked: false,
        summary: "Design a multi-level parking lot supporting different spot sizes, pricing models, and payment terminals."
      },
      {
        id: "atm",
        title: "ATM (Interview #2)",
        isLocked: false,
        summary: "Design an Automated Teller Machine supporting card validation, cash withdrawal, balance query, and State pattern."
      },
      {
        id: "elevator-system",
        title: "Elevator System (Interview #3)",
        isLocked: false,
        summary: "Design a multi-elevator controller algorithm supporting SCAN/LOOK scheduling, floor requests, and emergency overrides."
      },
      {
        id: "vending-machine",
        title: "Vending Machine (Interview #4)",
        isLocked: false,
        summary: "Design a vending machine using the State design pattern with inventory management, coin insertion, and change calculation."
      },
      {
        id: "coffee-vending-machine",
        title: "Coffee Vending Machine (Interview #5)",
        isLocked: false,
        summary: "Design a customizable beverage dispensing system using the Decorator design pattern for toppings and ingredients."
      },
      {
        id: "traffic-signal",
        title: "Traffic Signal (Interview #6)",
        isLocked: false,
        summary: "Design a smart traffic signal controller system managing state transitions, timer intervals, and emergency vehicle overrides."
      },
      {
        id: "lru-cache",
        title: "LRU Cache (Interview #7)",
        isLocked: false,
        summary: "Design an in-memory Least Recently Used (LRU) Cache supporting O(1) get and put operations with Doubly LinkedList and HashMap."
      },
      {
        id: "chess-game",
        title: "Chess Game (Interview #8)",
        isLocked: false,
        summary: "Design a 2-player chess game with piece movement validation, castling, en passant, checkmate detection, and undo functionality."
      },
      {
        id: "snake-and-ladder",
        title: "Snake and Ladder (Interview #9)",
        isLocked: false,
        summary: "Design a multiplayer Snake and Ladder board game with custom dice strategies, board size configuration, and winner leaderboard."
      },
      {
        id: "tic-tac-toe",
        title: "Tic-Tac-Toe (Interview #10)",
        isLocked: false,
        summary: "Design an N x N Tic-Tac-Toe game supporting variable winning streak lengths and efficient O(1) move validation."
      },
      {
        id: "movie-ticket-booking-system",
        title: "Movie Ticket Booking System (Interview #11)",
        isLocked: false,
        summary: "Design a BookMyShow clone with multiplex seat layout selection, concurrent seat locks, and payment integration."
      },
      {
        id: "concert-ticketing-system",
        title: "Concert Ticketing System (Interview #12)",
        isLocked: false,
        summary: "Design a high-concurrency event ticketing platform dealing with flash-sale inventory contention and queue waiting rooms."
      },
      {
        id: "hotel-management-system",
        title: "Hotel Management System (Interview #13)",
        isLocked: false,
        summary: "Design a hotel room booking service with room category availability, dynamic pricing, check-in/check-out billing."
      },
      {
        id: "car-rental-system",
        title: "Car Rental System (Interview #14)",
        isLocked: false,
        summary: "Design a Zoomcar/Hertz vehicle rental system with location-based vehicle searches, rental reservations, and damage insurance."
      },
      {
        id: "airline-management-system",
        title: "Airline Management System (Interview #15)",
        isLocked: false,
        summary: "Design a flight reservation and seat allocation engine with multi-leg itineraries and baggage tracking."
      },
      {
        id: "course-registration-system",
        title: "Course Registration System (Interview #16)",
        isLocked: false,
        summary: "Design a university portal with prerequisite validations, waitlist queues, and max credit limit checks."
      },
      {
        id: "library-management-system",
        title: "Library Management System (Interview #17)",
        isLocked: false,
        summary: "Design a library book issuing system with barcode tracking, overdue fine computation, and reservation holds."
      },
      {
        id: "restaurant-management-system",
        title: "Restaurant Management System (Interview #18)",
        isLocked: false,
        summary: "Design a POS & table management service for restaurants supporting digital order routing to Kitchen Display Systems."
      },
      {
        id: "task-management-system",
        title: "Task Management System (Interview #19)",
        isLocked: false,
        summary: "Design a Jira/Trello project board supporting task assignment, status workflows, priorities, and audit histories."
      },
      {
        id: "linkedin",
        title: "LinkedIn (Interview #20)",
        isLocked: false,
        summary: "Design low-level classes for professional network connections, message exchanges, job postings, and newsfeed updates."
      },
      {
        id: "social-networking-service",
        title: "Social Networking Service (Interview #21)",
        isLocked: false,
        summary: "Design Facebook/Twitter post publishing, user follows, newsfeed fan-out generation, and privacy settings."
      },
      {
        id: "stack-overflow",
        title: "Stack Overflow (Interview #22)",
        isLocked: false,
        summary: "Design a Q&A platform with upvoting/downvoting mechanics, reputation calculation engines, and tag searching."
      },
      {
        id: "cricinfo",
        title: "Cricinfo (Interview #23)",
        isLocked: false,
        summary: "Design a live cricket score update engine with ball-by-ball commentary broadcasting and player statistic tracking."
      },
      {
        id: "online-shopping-service",
        title: "Online Shopping Service (Interview #24)",
        isLocked: false,
        summary: "Design an Amazon-like e-commerce platform with cart checkout, coupon promotions, and order status state machines."
      },
      {
        id: "online-auction-system",
        title: "Online Auction System (Interview #25)",
        isLocked: false,
        summary: "Design an eBay auction system supporting real-time bidding, reserve price thresholds, and auto-bidding proxies."
      },
      {
        id: "online-stock-brokerage-system",
        title: "Online Stock Brokerage System (Interview #26)",
        isLocked: false,
        summary: "Design a Zerodha/Groww stock trading platform with limit/market order placement, portfolio tracking, and balance margin checks."
      },
      {
        id: "digital-wallet-system",
        title: "Digital Wallet System (Interview #27)",
        isLocked: false,
        summary: "Design a Paytm/GooglePay P2P payment wallet supporting atomic transactions, ledger transaction histories, and cashbacks."
      },
      {
        id: "splitwise",
        title: "Splitwise (Interview #28)",
        isLocked: false,
        summary: "Design an expense sharing app supporting equal/exact/percentage splits and optimal debt simplification algorithms."
      },
      {
        id: "music-streaming-service",
        title: "Music Streaming Service (Interview #29)",
        isLocked: false,
        summary: "Design a Spotify-like audio streaming app with playlist management, offline downloads, and playback queues."
      },
      {
        id: "food-delivery-service",
        title: "Food Delivery Service (Interview #30)",
        isLocked: false,
        summary: "Design a Swiggy/Zomato food order platform with restaurant menus, live delivery partner allocation, and trip tracking."
      },
      {
        id: "ride-sharing-service",
        title: "Ride Sharing Service (Interview #31)",
        isLocked: false,
        summary: "Design an Uber/Ola ride-hailing service with driver location matching, surge pricing strategies, and route tracking."
      },
      {
        id: "logging-framework",
        title: "Logging Framework (Interview #32)",
        isLocked: false,
        summary: "Design a configurable multi-threaded logging library supporting log levels (INFO, DEBUG, ERROR) and multiple appender sinks."
      },
      {
        id: "pub-sub-system",
        title: "Pub-Sub System (Interview #33)",
        isLocked: false,
        summary: "Design an in-memory Publisher-Subscriber messaging bus with topic subscriptions, message retention, and worker threads."
      }
    ]
  }
];

// Helper function to extract all topics flattened into a single list
export const getAllLldProblemsFlat = () => {
  const flat = [];
  LLD_PROBLEMS_SECTIONS.forEach((sec) => {
    (sec.topics || []).forEach((top) => {
      flat.push({ ...top, sectionId: sec.id, sectionTitle: sec.title });
    });
  });
  return flat;
};
