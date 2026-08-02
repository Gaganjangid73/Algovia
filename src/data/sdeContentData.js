/**
 * Data structures and content constants for SDE Role page
 */

export const SYSTEM_DESIGN_DATA = [
  {
    id: "hld",
    title: "Master High Level Design",
    description: "Without skippable topics, built for interview context. Also learn how real scalable systems are built, high-level design for architecture decisions.",
    badge: "",
    image: "",
    className: "Xlr-sderole-systemdesign-content-card"
  },
  {
    id: "lld",
    title: "Master Low Level Design",
    description: "Without skippable topics, built for interview context. Build real-world class diagrams, relationships, design principles, and API-level system components.",
    badge: "",
    image: "",
    className: "Xlr-sderole-systemdesign-content-card"
  },
  {
    id: "scenarios",
    title: "System Design Scenarios",
    description: "Real scenario-based system design cross-questioning that actually comes up in interviews. 90% of interviews touch these.",
    badge: "90% Interviews Touch This",
    image: "",
    className: "Xlr-sderole-systemdesign-content-card"
  }
];

export const DSA_DATA = [
  {
    id: "dsa-patterns",
    title: "Master Data Structures & Algorithm Patterns",
    description: "Already know the basics? Level up with design patterns built for those with DSA experience who want to crack top interviews.",
    badge: "",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ZQThu-DDGh5-C4a2taE0KbgP_06F6rByyNga47aJEg&s=10",
    isFullWidth: true
  },
  {
    id: "dsa-31",
    title: "DSA-31 Sheet",
    description: "A curated DSA sheet for software engineering interviews, built to sharpen your problem-solving the right way. Pattern-sorted problems.",
    badge: "DSA-31 (DSA Sheet For Engineers)",
    badgeColor: "blue",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ZQThu-DDGh5-C4a2taE0KbgP_06F6rByyNga47aJEg&s=10"
  },
  {
    id: "cf-18",
    title: "CF-18 DSA Sheet",
    description: "A curated competitive-programming problems of Codeforces problems by topic and rating. Build real speed and sharpen the problem-solving from 800 to 2200+ rating growth.",
    badge: "CF-18 (Competitive Programming)",
    badgeColor: "red",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ZQThu-DDGh5-C4a2taE0KbgP_06F6rByyNga47aJEg&s=10"
  }
];

/**
 * Async getter function to simulate fetching Feature Showcase tabs data from backend API.
 * All glow shadows and accent colors reference global CSS variables from globalvariable.css
 */
export const fetchFeatureShowcaseData = async () => {
  return [
    {
      id: "dsa-systematic",
      title: "Master DSA Pattern In Systematic Way",
      subtitle: "See how solutions are built, not just read.",
      detailTitle: "Master DSA Patterns In Systematic Way",
      detailDescription: "Learn pattern recognition for 300+ interview problems. Visualize step-by-step algorithms with interactive execution flowcharts and time complexity benchmarks.",
      shadowGlow: "var(--color-blue-glow)",
      accentColor: "var(--color-blue)",
      images: [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=800&auto=format&fit=crop"
      ]
    },
    {
      id: "system-design-complete",
      title: "System Design (Complete One)",
      subtitle: "HLD & LLD with real diagrams, fully covered.",
      detailTitle: "Complete System Design (HLD & LLD)",
      detailDescription: "From database sharding and load balancer topologies to object-oriented design patterns. Master real-world production system architectures.",
      shadowGlow: "var(--color-green-glow)",
      accentColor: "var(--color-green)",
      images: [
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
      ]
    },
    {
      id: "design-scenarios",
      title: "System Design Scenarios",
      subtitle: "90% of interviews touch these.",
      detailTitle: "System Design Scenario Deep Dives",
      detailDescription: "Real interview cross-questioning scenarios: race conditions, cache invalidation, consensus protocols, and leader election fault tolerance.",
      shadowGlow: "var(--color-red-glow)",
      accentColor: "var(--color-red)",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
      ]
    },
    {
      id: "swe-sheet-dsa",
      title: "Software Engineer Sheet (DSA)",
      subtitle: "300 problems, pattern-sorted with streak tracking.",
      detailTitle: "Software Engineer Sheet (DSA 300)",
      detailDescription: "300 handpicked interview questions categorized by topic frequency, company tags, and pattern difficulty with built-in revision streak tracking.",
      shadowGlow: "var(--color-purple-glow)",
      accentColor: "var(--color-purple)",
      images: [
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop"
      ]
    },
    {
      id: "cp-structured",
      title: "Competitive Programming (Structured Way)",
      subtitle: "Interview-grade competitive programming for speed.",
      detailTitle: "Competitive Programming Masterclass",
      detailDescription: "Build lightning-fast code implementation skills with rating-based Codeforces and LeetCode contest problem sets from 800 to 2200+ rating.",
      shadowGlow: "var(--color-amber-glow)",
      accentColor: "var(--color-amber)",
      images: [
        "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"
      ]
    },
    {
      id: "system-design-patterns",
      title: "System Design Interview Patterns",
      subtitle: "The building blocks behind every great answer.",
      detailTitle: "System Design Core Patterns",
      detailDescription: "Master 20 core architectural blueprints: Rate limiting, Consistent Hashing, Write-ahead logging, CQRS, and Event-driven message queues.",
      shadowGlow: "var(--color-sky-glow)",
      accentColor: "var(--color-sky)",
      images: [
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop"
      ]
    },
    {
      id: "eng-newsletter",
      title: "Engineering Newsletter",
      subtitle: "System Design stories, every week.",
      detailTitle: "Weekly Staff Engineering Case Studies",
      detailDescription: "Deep dive case studies on how Netflix, Uber, Discord, and Stripe scale infrastructure to millions of requests per second.",
      shadowGlow: "var(--color-pink-glow)",
      accentColor: "var(--color-pink)",
      images: [
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
      ]
    },
    {
      id: "behavioural-prep",
      title: "Master Behavioural Interview",
      subtitle: "STAR stories, leadership & HR round prep.",
      detailTitle: "Staff & Lead Behavioural Interview Prep",
      detailDescription: "Craft compelling STAR framework stories for conflict resolution, project failures, technical leadership, and cross-team influence.",
      shadowGlow: "var(--color-emerald-glow)",
      accentColor: "var(--color-emerald)",
      images: [
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
      ]
    },
    {
      id: "cs-fundamentals",
      title: "Master CS Fundamentals (Interview)",
      subtitle: "OS, DBMS & SQL, and Computer Networking, interview-ready.",
      detailTitle: "Master CS Fundamentals (Interview)",
      detailDescription: "The core CS fundamentals every interview loop touches: Operating Systems, DBMS & SQL, and Computer Networking, covered end to end with the questions that actually get asked.",
      shadowGlow: "var(--color-indigo-glow)",
      accentColor: "var(--color-indigo)",
      images: [
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop"
      ]
    }
  ];
};

/**
 * Async getter function to simulate fetching 'Why Us' section data from backend API.
 * Uses clean dummy text data and a highlights array for dynamic bolding.
 */
export const fetchWhyUsData = async () => {
  return {
    eyebrow: "WHY US",
    title: "Why Engineers Choose Algovia.io",
    subtitle: "Build real engineering depth, not just interview skills.",
    targetCount: 334023,
    statSuffix: "+",
    statLabel: "Engineers learning on Algovia.io",
    reasons: [
      {
        id: "structured",
        eyebrow: "STRUCTURED, NOT SCATTERED",
        text: "Engineers choose Algovia.io because it gives clarity in a space where learning often feels scattered. Instead of jumping across random videos and playlists, everything here is structured in the right order so that Low-Level Design and High-Level Design finally make sense. Every concept connects to the next until system design becomes something you understand deeply, not just memorize.",
        highlights: ["Algovia.io", "structured in the right order"]
      },
      {
        id: "pattern-first",
        eyebrow: "DSA PATTERN-FIRST",
        text: "One of the most loved parts of the platform is the DSA pattern-wise problem set. You don't solve problems randomly. You master every pattern from two pointers to sliding window, trees, graphs, heaps, DP, and more. Every week new pattern-based challenges are added so your problem-solving ability keeps improving without searching across 10 different platforms.",
        highlights: ["DSA pattern-wise problem set"]
      },
      {
        id: "real-architectures",
        eyebrow: "REAL COMPANIES, REAL ARCHITECTURES",
        text: "Learning stays exciting because everything is taught using real architectures from real companies. When you understand how Amazon handles massive traffic or how Netflix streams globally, system design stops feeling intimidating. You understand why technologies are chosen, how trade-offs are made, and what bottlenecks matter in production.",
        highlights: ["everything is taught using real architectures from real companies"]
      },
      {
        id: "newsletter",
        eyebrow: "STAY AHEAD WITH THE NEWSLETTER",
        text: "Daily and weekly tech articles and newsletters make sure you never fall behind. Subscribe at Algovia.io and get the latest engineering insights, scaling stories, backend trends, and architecture learnings delivered directly. Like having a mentor who constantly shares what matters in the real world.",
        highlights: ["Daily and weekly tech articles and newsletters", "Algovia.io"]
      },
      {
        id: "ai-engineering",
        eyebrow: "AI ENGINEERING, STRUCTURED THE SAME WAY",
        text: "The platform now covers AI Engineering end to end : math and classical ML foundations, deep learning, prompting, RAG, fine-tuning, agent patterns, orchestration, evaluation, and deployment. Same systematic approach as the DSA and system design content: every topic mapped out in order, nothing scattered, so you can go from fundamentals to shipping real AI systems with confidence.",
        highlights: ["AI Engineering end to end"]
      },
      {
        id: "devops",
        eyebrow: "DEVOPS ENGINEERING, FROM DOCKER TO PRODUCTION",
        text: "The platform also covers DevOps Engineering end to end : Docker, Kubernetes, Terraform, Ansible, CI/CD, monitoring and logging, SRE practices, and security (DevSecOps). Same structured, pattern-first approach as everything else on the platform, so you go from container basics to running real production systems without piecing it together from a dozen scattered tutorials.",
        highlights: ["DevOps Engineering end to end"]
      },
      {
        id: "confidence",
        eyebrow: "CONFIDENCE, NOT JUST KNOWLEDGE",
        text: "More than interview prep, Algovia.io builds confidence. You learn how to reason about scale, defend decisions, and speak like a senior engineer. With more career-focused features coming soon, the platform is built to help engineers grow faster, stay curious, and become the kind of developers companies rely on.",
        highlights: ["Algovia.io", "confidence"]
      }
    ]
  };
};

/**
 * Async getter function to simulate fetching Reviews and Success Stories data from backend API
 */
export const fetchReviewsData = async () => {
  return {
    eyebrow: "PREMIUM USERS REVIEWS",
    titleLine1: "Real Results,",
    titleLine2: "Real Engineers",
    statNumber: 634467,
    statSuffix: "+",
    statLabel: "Growing community of engineers",
    featuredStory: {
      badge: "SUCCESS STORY",
      paragraphs: [
        "I've been working as an SDE at a startup in Bengaluru for the last five years, so I wasn't looking for another course. I just wanted a solid place to revise before my interview cycle started.",
        "I've been following Gagan for almost two years, and that's honestly the only reason I decided to become a member of Algovia. I already knew the way he explains concepts: simple, practical, and always interview-focused.",
        "For about a month, I revised almost everything from the platform, especially the System Design modules and the DSA patterns. What surprised me was how closely the interview discussions matched the way the concepts were explained here. During multiple interview rounds, I found myself using the same approach, the same trade-offs, and the same thought process that I'd practiced on the platform.",
        "I don't know if it was luck or just good preparation, but I walked into my Google interviews feeling more confident than ever before. Instead of trying to remember answers, I was able to explain my reasoning naturally.",
        "A few weeks later, I got the offer.",
        "Thank you, Gagan. You've built something that genuinely helps engineers prepare the right way. The amount of thought you've put into the DSA Sheet, System Design roadmap, and the overall learning experience really shows."
      ],
      author: {
        name: "Arjun Mehta",
        role: "Senior Software Engineer, 5 YOE · Bengaluru Startup · Placed at Google",
        avatar: "A"
      }
    },
    reviews: [
      {
        id: "rev-1",
        text: "The DSA Patterns section. Exactly what I needed. I've been waiting for this type of content for so long. And honestly it's even better than I expected. The topics, the explanations, the structured problems. If I follow this consistently I'll walk into SDE interviews with real confidence. So much respect, lots of love.",
        author: "Pooja Rawat",
        subtitle: "B.Tech CSE, 3rd Year",
        avatar: "P",
        bgTheme: "gray"
      },
      {
        id: "rev-2",
        text: "What impressed me the most wasn't the amount of content. It was how well everything is structured. Every topic builds on the previous one, so I never felt overwhelmed. Whether I was preparing DSA, Low-Level Design, High-Level Design, or DevOps, the learning flow made sense. Within a few weeks, I noticed that I could explain concepts much more confidently during mock interviews.",
        author: "Abhishake Mourya",
        subtitle: "Algovia Member",
        avatar: "A",
        bgTheme: "pink"
      },
      {
        id: "rev-3",
        text: "This is probably the first platform where I never felt overwhelmed. Usually, when I buy a course, I get excited for two days and then stop because there's just too much content. Here, I simply open the roadmap and continue from where I left off. Small thing, but it has helped me stay consistent for almost three months now.",
        author: "Aman Gupta",
        subtitle: "Senior Software Engineer",
        avatar: "A",
        bgTheme: "gray"
      },
      {
        id: "rev-4",
        text: "What the heck, the AB DSA Sheet is something else. I know there are a lot of sheets out there but this one is different. Pattern based problems with actually solid concept explanations. Today I completed the topic 'How to Solve DSA Effectively' and honestly, in 4 years of prep no one had ever explained it this way. Now I finally know the right approach.",
        author: "Nikhil Sharma",
        subtitle: "Working Professional, Upskilling",
        avatar: "N",
        bgTheme: "yellow"
      },
      {
        id: "rev-5",
        text: "I've purchased several interview courses over the years, but most of them felt like video libraries. There was no clear direction. Algovia is different. It feels like having a mentor who already knows what comes next. The structured roadmap, interview-focused explanations, and curated resources saved me countless hours.",
        author: "Shubhangi",
        subtitle: "Algovia Member",
        avatar: "S",
        bgTheme: "white"
      },
      {
        id: "rev-6",
        text: "I've been in the industry for almost three years, and one thing I've learned is that having too many resources is sometimes worse than having none. That's exactly where Algovia helped me. I stopped jumping between YouTube, LeetCode discussions, blogs, and random PDFs. Everything I needed was already organized.",
        author: "Rohit Mishra",
        subtitle: "Software Engineer",
        avatar: "R",
        bgTheme: "purple"
      },
      {
        id: "rev-7",
        text: "I've been reading your system design articles regularly, and I genuinely enjoy them. I've also completed Arpit Bhayani's System Design course, but I can confidently say that the depth, practicality, and clarity of the knowledge you share are exceptional. It's rare to find content that combines strong fundamentals with real implementation.",
        author: "Siddharth Nair",
        subtitle: "Algovia Member",
        avatar: "S",
        bgTheme: "purple"
      },
      {
        id: "rev-8",
        text: "I rarely write reviews, but I genuinely wanted to appreciate the effort Gagan has put into this platform. I've followed a lot of interview resources over the years, but this is probably the first one where everything feels connected. I started with the DSA Sheet, then moved to LLD and System Design.",
        author: "Neha Singh",
        subtitle: "Full Stack Developer",
        avatar: "N",
        bgTheme: "yellow"
      },
      {
        id: "rev-9",
        text: "The System Design content genuinely surprised me. Most resources explain 'how' a system works, but very few explain 'why' specific architectural choices were made. The case studies on high-throughput message queues and distributed caching gave me immense confidence.",
        author: "Karan Patel",
        subtitle: "Backend Engineer",
        avatar: "K",
        bgTheme: "blue"
      }
    ]
  };
};

/**
 * Async getter function to simulate fetching Founder / 'Building Engineer, Not Just Coders' section data
 */
export const fetchFounderData = async () => {
  return {
    titlePrefix: "Building Engineer, ",
    titleHighlight: "Not Just Coders",
    greeting: "Hey, I'm Gagan, Engineer of Algovia.io.",
    bio: "I started as a software engineer, then chose to build something of my own: Algovia.io, helping people master software engineering and AI Engineering interviews, systematically.",
    quoteHeader: "Remember:",
    quoteLines: [
      { text: "Never play it safe.", bold: true },
      { text: "Never play it safe.", bold: true },
      { text: "You are in your comfort zone.", bold: false },
      { text: "You are never going to grow.", bold: false },
      { text: "You are never going to achieve anything.", bold: false },
      { text: "By playing it safe, no one becomes a world champion.", bold: false },
      { text: "By playing it safe, no one achieves anything great in life.", bold: false },
      { text: "Don't play it safe. Take risks.", bold: true },
      { text: "There is only one life.", bold: true }
    ],
    primaryCta: {
      text: "Get Started Now",
      url: "#"
    },
    secondaryButtons: [
      { text: "Book a Session", icon: "🎥", url: "#" },
      { text: "Buy me a Chai", icon: "☕", url: "#" }
    ],
    socialLinks: [
      { id: "web", icon: "🌐", label: "Website", url: "#" },
      { id: "linkedin", icon: "in", label: "LinkedIn", url: "#" },
      { id: "instagram", icon: "📷", label: "Instagram", url: "#" },
      { id: "topmate", icon: "📹", label: "Video Calls", url: "#" },
      { id: "bookmark", icon: "🔖", label: "Bookmarks", url: "#" }
    ]
  };
};

/**
 * Async getter function to simulate fetching FAQ categories and accordion Q&A pairs from backend API
 */
export const fetchFaqData = async () => {
  return {
    title: "Frequently Asked Questions",
    categories: [
      { id: "plans", label: "Plans & Access" },
      { id: "curriculum", label: "Course Content & Curriculum" },
      { id: "features", label: "Features & Functionality" },
      { id: "account", label: "Account Management" },
      { id: "support", label: "Course Access & Technical Support" },
      { id: "mentorship", label: "Mentorship & Community Support" },
      { id: "career", label: "Career Guidance" },
      { id: "jobs", label: "Internships & Job Assistance" },
      { id: "payments", label: "Payment & Refunds" }
    ],
    items: {
      plans: [
        {
          id: "p1",
          question: "What is Algovia.io?",
          answer: "Algovia.io is a web-based learning platform for software engineers. It covers Data Structures & Algorithms, System Design (LLD & HLD), CS Core Subjects (OS, CN, DBMS, Behavioral), AI Engineering, and DevOps Engineering, all in one place, with both free and premium content so you can start learning without paying anything."
        },
        {
          id: "p2",
          question: "What plans are available and what does each one unlock?",
          answer: "We offer Basic Access (unlocking core DSA sheets, System Design roadmaps, and article notes) and Full Access (unlocking AI Engineering, DevOps, CF-18 CP sheet, weekly live case studies, and Discord community mentorship)."
        },
        {
          id: "p3",
          question: "What can I access for free, without subscribing?",
          answer: "You can access our free DSA-31 problem sheet, public engineering newsletter, and foundational System Design architecture articles completely for free."
        },
        {
          id: "p4",
          question: "I only care about one track (AI, DevOps, or the Newsletter). Do I have to buy Full Access?",
          answer: "No, you can subscribe to single-track learning modules or upgrade to the Full Access plan at any time with automated pro-rated pricing."
        },
        {
          id: "p5",
          question: "What is the difference between Basic and Full Access?",
          answer: "Basic Access gives lifetime read access to core DSA sheets and system design notes. Full Access includes ongoing content updates, live Q&A sessions, AI & DevOps tracks, and direct mentorship support."
        },
        {
          id: "p6",
          question: "Will I get access to new content released in the future?",
          answer: "Yes! All Full Access members automatically receive every new system design module, DSA pattern update, and weekly engineering case study published on Algovia.io."
        },
        {
          id: "p7",
          question: "Can I upgrade my plan later?",
          answer: "Yes, you can upgrade your plan at any time directly from your account dashboard by paying only the remaining price difference."
        },
        {
          id: "p8",
          question: "Can I renew after my subscription expires?",
          answer: "Yes! Returning engineers automatically receive an exclusive renewal discount when renewing their subscription."
        }
      ],
      curriculum: [
        {
          id: "c1",
          question: "How is the DSA pattern content structured?",
          answer: "Our DSA curriculum is organized pattern-by-pattern (Two Pointers, Sliding Window, Monotonic Stack, Dynamic Programming, Trees & Graphs) with step-by-step problem walkthroughs rather than random lists."
        },
        {
          id: "c2",
          question: "Does the System Design track cover both HLD and LLD?",
          answer: "Yes! High Level Design covers microservice architecture, database sharding, caching strategies, and message queues. Low Level Design covers object-oriented design, class diagrams, design patterns, and clean code principles."
        }
      ],
      features: [
        {
          id: "f1",
          question: "Are the problem solutions available in multiple programming languages?",
          answer: "Yes, code snippets and pattern solutions are provided in Java, C++, Python, JavaScript, and Go."
        }
      ],
      account: [
        {
          id: "a1",
          question: "Can I switch my registered email address?",
          answer: "Yes, you can update your email address anytime under Account Settings or by reaching out to support@algovia.io."
        }
      ],
      support: [
        {
          id: "s1",
          question: "How do I get help if I run into technical issues?",
          answer: "You can open a support ticket in your dashboard or message our engineering team directly via the Algovia Discord community."
        }
      ],
      mentorship: [
        {
          id: "m1",
          question: "How do mock interviews and mentorship sessions work?",
          answer: "Full Access members can book 1-on-1 mock interview slots and resume reviews with experienced senior engineers."
        }
      ],
      career: [
        {
          id: "car1",
          question: "Is there guidance for compensation negotiation?",
          answer: "Yes, we provide career negotiation playbooks and level-matching guides for SDE-1, SDE-2, and Staff Engineer roles."
        }
      ],
      jobs: [
        {
          id: "j1",
          question: "Do you offer referrals to top tech companies?",
          answer: "Yes! Top performers on our DSA sheets and mock interviews get direct referrals to partner tech startups and MNCs."
        }
      ],
      payments: [
        {
          id: "pay1",
          question: "What payment methods are supported?",
          answer: "We accept Credit/Debit Cards, UPI, NetBanking, Razorpay, and international payments via Stripe."
        }
      ]
    }
  };
};

/**
 * Async getter function simulating backend API endpoint for Navbar Mega Menu dropdown data
 */
export const fetchSystemDesignDropdownData = async () => {
  return [
    {
      columnId: "lld-col",
      categoryTitle: "Low Level Design",
      items: [
        {
          id: "lld-1",
          title: "Master Low Level Design",
          subtitle: "Classes, Patterns & OOP Design",
          url: "#",
          isHighlighted: false
        },
        {
          id: "lld-2",
          title: "Low Level Design Approach",
          subtitle: "Problems of low level design, to know how to approach in an interview",
          url: "#",
          isHighlighted: false
        },
        {
          id: "lld-3",
          title: "Low Level Design Practice",
          subtitle: "Practice LLD problems and see where you are lacking and evaluate your approach",
          url: "#",
          isHighlighted: false
        }
      ]
    },
    {
      columnId: "hld-col",
      categoryTitle: "High Level Design",
      items: [
        {
          id: "hld-1",
          title: "Master High Level Design",
          subtitle: "Scalability, Architecture & Tradeoffs",
          url: "#",
          isHighlighted: false
        },
        {
          id: "hld-2",
          title: "High Level Design Practice Problem",
          subtitle: "Curated HLD practice problems",
          url: "#",
          isHighlighted: false
        }
      ]
    },
    {
      columnId: "edge-col",
      categoryTitle: "System Design Edge Core",
      items: [
        {
          id: "edge-1",
          title: "System Design Scenarios",
          subtitle: "Last-Minute Interview Revision",
          url: "#",
          isHighlighted: false
        },
        {
          id: "edge-2",
          title: "System Design Patterns",
          subtitle: "Reusable In Production & Interview",
          url: "#",
          isHighlighted: false
        }
      ]
    }
  ];
};

/**
 * Async getter function simulating backend API endpoint for DSA Navbar Dropdown data
 */
export const fetchDsaDropdownData = async () => {
  return {
    banner: {
      title: "Master DSA with Patterns",
      subtitle: "Master DSA Patterns & Core Concepts",
      url: "#"
    },
    categoryHeader: "INTERVIEW SHEETS FOR DSA",
    items: [
      {
        id: "dsa-sheet-31",
        title: "DSA-31 Sheet",
        subtitle: "Solve All Pattern Problems with Concept Maps",
        url: "#"
      },
      {
        id: "cf-sheet-18",
        title: "CF-18 Sheet",
        subtitle: "Solve Patterns Wise Competitive Problems",
        url: "#"
      },
      {
        id: "quick-revision",
        title: "Quick Revision (Before Interview)",
        subtitle: "Last-Min Interview Problems (If Less Time Remaining)",
        url: "#"
      },
      {
        id: "company-specific",
        title: "Company-specific Problems",
        subtitle: "Most Asked Companies DSA Problems, Pattern wise",
        url: "#"
      }
    ]
  };
};

/**
 * Async getter function simulating backend API endpoint for Software Engineer Bucket Mega Menu data
 */
export const fetchSoftwareEngineerBucketData = async () => {
  return [
    {
      columnId: "prog-languages",
      categoryTitle: "Programming Languages",
      items: [
        {
          id: "cpp",
          title: "C++",
          subtitle: "Pointers, Memory Management & Systems Interviews",
          iconType: "cpp",
          url: "#",
          isLocked: false
        },
        {
          id: "java",
          title: "Java",
          subtitle: "OOP, JVM Internals & Enterprise Interviews",
          iconType: "java",
          url: "#",
          isLocked: false
        },
        {
          id: "python",
          title: "Python",
          subtitle: "Scripting, Data Structures & Backend Interviews",
          iconType: "python",
          url: "#",
          isLocked: false
        },
        {
          id: "go",
          title: "Go",
          subtitle: "Concurrency, Goroutines & Systems Interviews",
          iconType: "go",
          url: "#",
          isLocked: false
        },
        {
          id: "js",
          title: "JavaScript",
          subtitle: "Closures, Async & Frontend Interviews",
          iconType: "js",
          url: "#",
          isLocked: false
        }
      ]
    },
    {
      columnId: "cs-fundamentals",
      categoryTitle: "CS Fundamentals",
      items: [
        {
          id: "os",
          title: "Operating System",
          subtitle: "Processes, Threads, Memory & Concurrency",
          badgeBtnText: "TOP QUESTIONS →",
          url: "#",
          isLocked: false
        },
        {
          id: "cn",
          title: "Computer Networks",
          subtitle: "OSI, TCP/IP, DNS & Core Protocols",
          badgeBtnText: "TOP QUESTIONS →",
          url: "#",
          isLocked: false
        },
        {
          id: "dbms",
          title: "DBMS & SQL",
          subtitle: "Queries, Indexing, Transactions & Normalization",
          badgeBtnText: "TOP QUESTIONS →",
          url: "#",
          isLocked: false
        }
      ]
    },
    {
      columnId: "eng-tools",
      categoryTitle: "Engineering Tools",
      items: [
        {
          id: "git",
          title: "Git",
          subtitle: "Branching, Merging & Version Control",
          url: "#",
          isLocked: false
        },
        {
          id: "linux",
          title: "Linux",
          subtitle: "Shell, Permissions & Process Management",
          url: "#",
          isLocked: false
        },
        {
          id: "bash",
          title: "Bash",
          subtitle: "Scripting & Automation Basics",
          url: "#",
          isLocked: false
        }
      ]
    },
    {
      columnId: "behavioural",
      categoryTitle: "Behavioural Interview",
      items: [
        {
          id: "behavioral-round",
          title: "Behavioural Interview",
          subtitle: "STAR Stories, Leadership & HR Round Prep",
          badgeBtnText: "TOP QUESTIONS →",
          url: "#",
          isLocked: false
        }
      ]
    }
  ];
};



