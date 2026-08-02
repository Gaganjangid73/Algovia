/**
 * Data structures and content constants for SDE Role page
 */

export const SYSTEM_DESIGN_DATA = [
  {
    id: "hld",
    title: "Master High Level Design",
    description: "Without skippable topics, built for interview context. Also learn how real scalable systems are built, high-level design for architecture decisions.",
    badge: "",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ZQThu-DDGh5-C4a2taE0KbgP_06F6rByyNga47aJEg&s=10",
    className: "Xlr-sderole-systemdesign-content-card"
  },
  {
    id: "lld",
    title: "Master Low Level Design",
    description: "Without skippable topics, built for interview context. Build real-world class diagrams, relationships, design principles, and API-level system components.",
    badge: "",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ZQThu-DDGh5-C4a2taE0KbgP_06F6rByyNga47aJEg&s=10",
    className: "Xlr-sderole-systemdesign-content-card"
  },
  {
    id: "scenarios",
    title: "System Design Scenarios",
    description: "Real scenario-based system design cross-questioning that actually comes up in interviews. 90% of interviews touch these.",
    badge: "90% Interviews Touch This",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ZQThu-DDGh5-C4a2taE0KbgP_06F6rByyNga47aJEg&s=10",
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
        "I've been following Himanshu for almost two years, and that's honestly the only reason I decided to become a member of Algovia. I already knew the way he explains concepts: simple, practical, and always interview-focused.",
        "For about a month, I revised almost everything from the platform, especially the System Design modules and the DSA patterns. What surprised me was how closely the interview discussions matched the way the concepts were explained here. During multiple interview rounds, I found myself using the same approach, the same trade-offs, and the same thought process that I'd practiced on the platform.",
        "I don't know if it was luck or just good preparation, but I walked into my Google interviews feeling more confident than ever before. Instead of trying to remember answers, I was able to explain my reasoning naturally.",
        "A few weeks later, I got the offer.",
        "Thank you, Himanshu. You've built something that genuinely helps engineers prepare the right way. The amount of thought you've put into the DSA Sheet, System Design roadmap, and the overall learning experience really shows."
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
        text: "I rarely write reviews, but I genuinely wanted to appreciate the effort Himanshu has put into this platform. I've followed a lot of interview resources over the years, but this is probably the first one where everything feels connected. I started with the DSA Sheet, then moved to LLD and System Design.",
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
