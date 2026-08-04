/**
 * Async getter function simulating backend API endpoint for AI Engineering Mega Menu Dropdown data
 */
export const fetchAiEngineeringDropdownData = async () => {
  return [
    {
      columnId: "foundations-col",
      categoryTitle: "Programming, Math & Data Foundations",
      items: [
        {
          id: "step-1",
          title: "Step 1: Statistics & Probability",
          subtitle: "Linear Algebra, Calculus & Probability",
          url: "#"
        },
        {
          id: "step-2",
          title: "Step 2: NumPy & Pandas for ML/AI Engineers",
          subtitle: "Arrays, DataFrames & Feature Engineering",
          url: "#"
        },
        {
          id: "step-3",
          title: "Step 3: Data Cleaning",
          subtitle: "Missing Values, Outliers & Validation",
          url: "#"
        },
        {
          id: "step-4",
          title: "Step 4: Data Visualization",
          subtitle: "Matplotlib, Seaborn, Plotly & ML Plots",
          url: "#"
        }
      ]
    },
    {
      columnId: "ml-dl-col",
      categoryTitle: "Machine Learning & Deep Learning",
      items: [
        {
          id: "step-5",
          title: "Step 5: Machine Learning Fundamentals",
          subtitle: "Regression, Trees & Clustering",
          url: "#"
        },
        {
          id: "step-6",
          title: "Step 6: Deep Learning Fundamentals",
          subtitle: "Neural Nets, Transformers & Training",
          url: "#"
        },
        {
          id: "step-7",
          title: "Step 7: PyTorch",
          subtitle: "Tensors, Autograd, Training & Deployment",
          url: "#"
        }
      ]
    },
    {
      columnId: "llm-col",
      categoryTitle: "LLM Engineering & Applications",
      items: [
        {
          id: "step-8",
          title: "Step 8: Prompting & APIs",
          subtitle: "Prompt Engineering & Model APIs",
          url: "#"
        },
        {
          id: "step-9",
          title: "Step 9: RAG & Vector Search",
          subtitle: "Embeddings, Chunking & Reranking",
          url: "#"
        },
        {
          id: "step-10",
          title: "Step 10: Fine-Tuning",
          subtitle: "LoRA, RLHF & Quantization",
          url: "#"
        },
        {
          id: "step-11",
          title: "Step 11: MCP",
          subtitle: "Standard Tool-Calling Interface",
          url: "#"
        },
        {
          id: "step-12",
          title: "Step 12: Hugging Face Ecosystem",
          subtitle: "Transformers, Datasets, PEFT & Deployment",
          url: "#"
        }
      ]
    },
    {
      columnId: "agents-col",
      categoryTitle: "AI Agents & Orchestration",
      items: [
        {
          id: "step-13",
          title: "Step 13: AI Agents & Tool Calling",
          subtitle: "Agent Loops, ReAct & Memory",
          url: "#"
        },
        {
          id: "step-14",
          title: "Step 14: Orchestration Frameworks",
          subtitle: "LangChain, LangGraph & Workflows",
          url: "#"
        }
      ]
    },
    {
      columnId: "deployment-col",
      categoryTitle: "Deployment, Safety & Production",
      items: [
        {
          id: "step-15",
          title: "Step 15: Deployment & LLMOps",
          subtitle: "Serving, Scaling & Observability",
          url: "#"
        },
        {
          id: "step-16",
          title: "Step 16: AI Safety & Evaluation",
          subtitle: "Eval Frameworks & Red Teaming",
          url: "#"
        },
        {
          id: "step-17",
          title: "Step 17: Security",
          subtitle: "Privacy, Jailbreaks & Compliance",
          url: "#"
        }
      ]
    }
  ];
};

/**
 * Async getter function simulating backend API endpoint for AI Page Main Curriculum Cards
 */
export const fetchAiPageCardsData = async () => {
  return [
    {
      id: "ai-engineering-complete",
      title: "Master AI Engineering (Complete One)",
      subtitle: "Transformers, LLM Architecture, Fine-Tuning & RAG Systems",
      badge: "POPULAR",
      image: "",
      topics: [
        "LLM Architecture & Transformers",
        "RAG, Embeddings & Vector Search",
        "LoRA & QLoRA Fine-Tuning",
        "AI Agents, Tool Calling & LangGraph"
      ],
      author: "Gagan",
      url: "#"
    },
    {
      id: "llm-fine-tuning",
      title: "LLM Fine-Tuning & RAG Systems",
      subtitle: "Build Production-grade RAG and Fine-tune Open Source Models",
      badge: "NEW",
      image: "",
      topics: [
        "Chunking, Hybrid Search & Reranking",
        "PEFT, LoRA & DPO Optimization",
        "vLLM & TensorRT-LLM Serving",
        "LangChain & LlamaIndex Pipelines"
      ],
      author: "Gagan",
      url: "#"
    },
    {
      id: "ai-agents-orchestration",
      title: "AI Agents & Autonomous Workflows",
      subtitle: "Design Tool-Calling Agents with Memory & Multi-Agent Loops",
      badge: "FEATURED",
      image: "",
      topics: [
        "ReAct Loop & Tool Integration",
        "LangGraph State Machines",
        "MCP (Model Context Protocol)",
        "Human-in-the-Loop & Evaluation"
      ],
      author: "Gagan",
      url: "#"
    }
  ];
};

/**
 * Async getter function simulating backend API endpoint for AI Learning Step 1 & Step 2 Path
 */
export const fetchAiStepPathData = async () => {
  return {
    step1: {
      stepHeader: "STEP 1 · KNOW THIS BEFORE AI",
      stepSubheader: "Master Your Software Engineering Interviews is 6 Domains Path, You are on the right path.",
      title: "Software Engineering Fundamentals",
      subtitle: "The DSA and System Design basics you're expected to already know before starting the AI Engineering module.",
      url: "/",
      image: ""
    },
    step2: {
      stepHeader: "STEP 2 · START YOUR AI LEARNING",
      stepSubheader: "Recommended: you have a good or basic understanding of Python",
      title: "Master AI Engineering (Complete One)",
      subtitle: "The full curriculum: Deep Learning, Classical ML, RAG, fine-tuning, MCP, agents, evaluation, deployment and everything in between.",
      url: "#",
      image: ""
    }
  };
};

/**
 * Async getter function simulating backend API endpoint for AI Engineering Interactive Step Explorer (Steps 1 through 18)
 */
export const fetchAiExplorerStepsData = async () => {
  return [
    {
      id: "step-1",
      stepNumber: 1,
      title: "Step 1: Software Development Fundamentals",
      subtitle: "DSA & System Design Basics",
      detailTitle: "Software Development Fundamentals",
      description: "Core Data Structures, Algorithms, and System Design principles expected before starting AI Engineering.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      shadowGlowColor: "rgba(37, 99, 235, 0.55)",
      exploreUrl: "#"
    },
    {
      id: "step-2",
      stepNumber: 2,
      title: "Step 2: Statistics & Probability",
      subtitle: "Linear Algebra, Calculus & Probability",
      detailTitle: "Statistics & Probability",
      description: "The math that everything else, from gradient descent to attention, is built on.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
      shadowGlowColor: "rgba(168, 85, 247, 0.55)",
      exploreUrl: "#"
    },
    {
      id: "step-3",
      stepNumber: 3,
      title: "Step 3: NumPy & Pandas for ML/AI Engineers",
      subtitle: "Arrays, DataFrames & Feature Engineering",
      detailTitle: "NumPy & Pandas for ML/AI Engineers",
      description: "Vectorized array computations, DataFrame manipulation, and production data preprocessing pipelines.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      shadowGlowColor: "rgba(16, 185, 129, 0.55)",
      exploreUrl: "#"
    },
    {
      id: "step-4",
      stepNumber: 4,
      title: "Step 4: Data Cleaning",
      subtitle: "Missing Values, Outliers & Validation",
      detailTitle: "Data Cleaning",
      description: "Handling missing values, outlier detection, data normalization, and dataset validation techniques.",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
      shadowGlowColor: "rgba(245, 158, 11, 0.55)",
      exploreUrl: "#"
    },
    {
      id: "step-5",
      stepNumber: 5,
      title: "Step 5: Data Visualization",
      subtitle: "Matplotlib, Seaborn, Plotly & ML Plots",
      detailTitle: "Data Visualization",
      description: "Seeing your data before, during, and after modeling, from Matplotlib basics to ML-specific plots like ROC curves and SHAP.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      shadowGlowColor: "rgba(6, 182, 212, 0.55)",
      exploreUrl: "#"
    },
    {
      id: "step-6",
      stepNumber: 6,
      title: "Step 6: Machine Learning Fundamentals",
      subtitle: "Regression, Trees & Clustering",
      detailTitle: "Machine Learning Fundamentals",
      description: "Supervised and unsupervised algorithms, model evaluation, cross-validation, and hyperparameter tuning.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      shadowGlowColor: "rgba(244, 63, 94, 0.55)",
      exploreUrl: "#"
    },
    {
      id: "step-7",
      stepNumber: 7,
      title: "Step 7: Deep Learning Fundamentals",
      subtitle: "Neural Nets, Transformers & Training",
      detailTitle: "Deep Learning Fundamentals",
      description: "Perceptrons, backpropagation, activation functions, CNNs, RNNs, and Transformer architecture internals.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
      shadowGlowColor: "rgba(139, 92, 246, 0.55)",
      exploreUrl: "#"
    },
    {
      id: "step-8",
      stepNumber: 8,
      title: "Step 8: PyTorch",
      subtitle: "Tensors, Autograd, Training & Deployment",
      detailTitle: "PyTorch",
      description: "The deep learning framework most modern AI/ML work and every LLM is built on, from tensors to production deployment.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      shadowGlowColor: "rgba(249, 115, 22, 0.55)",
      exploreUrl: "#"
    },
    {
      id: "step-9",
      stepNumber: 9,
      title: "Step 9: Prompting & APIs",
      subtitle: "Prompt Engineering & Model APIs",
      detailTitle: "Prompting & APIs",
      description: "Getting reliable output out of foundation models: prompting technique, decoding, and API mechanics.",
      image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80",
      shadowGlowColor: "rgba(59, 130, 246, 0.55)",
      exploreUrl: "#"
    },
    {
      id: "step-10",
      stepNumber: 10,
      title: "Step 10: RAG & Vector Search",
      subtitle: "Embeddings, Chunking & Reranking",
      detailTitle: "RAG & Vector Search",
      description: "Building production RAG pipelines with hybrid search, vector databases, reranking, and semantic retrieval.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      shadowGlowColor: "rgba(132, 204, 22, 0.55)",
      exploreUrl: "#"
    },
    {
      id: "step-11",
      stepNumber: 11,
      title: "Step 11: Fine-Tuning",
      subtitle: "LoRA, RLHF & Quantization",
      detailTitle: "Fine-Tuning",
      description: "PEFT techniques, LoRA, QLoRA, DPO, and quantization for custom LLM domain adaptation.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
      shadowGlowColor: "rgba(236, 72, 153, 0.55)",
      exploreUrl: "#"
    },
    {
      id: "step-12",
      stepNumber: 12,
      title: "Step 12: MCP",
      subtitle: "Standard Tool-Calling Interface",
      detailTitle: "MCP (Model Context Protocol)",
      description: "Standardized open protocol connecting AI models to tools, databases, and local file systems.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      shadowGlowColor: "rgba(99, 102, 241, 0.55)",
      exploreUrl: "#"
    },
    {
      id: "step-13",
      stepNumber: 13,
      title: "Step 13: Hugging Face Ecosystem",
      subtitle: "Transformers, Datasets, PEFT & Deployment",
      detailTitle: "Hugging Face Ecosystem",
      description: "Navigating Hugging Face Hub, Datasets library, PEFT, TGI, and open-source AI models.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      shadowGlowColor: "rgba(234, 179, 8, 0.55)",
      exploreUrl: "#"
    },
    {
      id: "step-14",
      stepNumber: 14,
      title: "Step 14: AI Agents & Tool Calling",
      subtitle: "Agent Loops, ReAct & Memory",
      detailTitle: "AI Agents & Tool Calling",
      description: "Designing autonomous agent loops with ReAct prompting, function calling, short/long-term memory, and tool execution.",
      image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80",
      shadowGlowColor: "rgba(147, 51, 234, 0.55)",
      exploreUrl: "#"
    },
    {
      id: "step-15",
      stepNumber: 15,
      title: "Step 15: Orchestration Frameworks",
      subtitle: "LangChain, LangGraph & Workflows",
      detailTitle: "Orchestration Frameworks",
      description: "Building multi-agent graphs, state machines, and reliable AI workflows using LangGraph and LangChain.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
      shadowGlowColor: "rgba(20, 184, 166, 0.55)",
      exploreUrl: "#"
    },
    {
      id: "step-16",
      stepNumber: 16,
      title: "Step 16: Deployment & LLMOps",
      subtitle: "Serving, Scaling & Observability",
      detailTitle: "Deployment & LLMOps",
      description: "vLLM serving, TensorRT-LLM optimization, latency monitoring, tracing, and LLM production ops.",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
      shadowGlowColor: "rgba(239, 68, 68, 0.55)",
      exploreUrl: "#"
    },
    {
      id: "step-17",
      stepNumber: 17,
      title: "Step 17: AI Safety & Evaluation",
      subtitle: "Eval Frameworks & Red Teaming",
      detailTitle: "AI Safety & Evaluation",
      description: "RAGAS evaluation, LLM-as-a-judge benchmarking, hallucination metrics, and adversarial red teaming.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      shadowGlowColor: "rgba(56, 189, 248, 0.55)",
      exploreUrl: "#"
    },
    {
      id: "step-18",
      stepNumber: 18,
      title: "Step 18: Security",
      subtitle: "Privacy, Jailbreaks & Compliance",
      detailTitle: "Security",
      description: "OWASP Top 10 for LLMs, prompt injection defense, data privacy, guardrails, and compliance.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      shadowGlowColor: "rgba(225, 29, 72, 0.55)",
      exploreUrl: "#"
    }
  ];
};

/**
 * Async getter function simulating backend API endpoint for AI Feature Showcase section
 */
export const fetchAiFeatureShowcaseData = async () => {
  return [
    {
      id: "ai-engineering-complete",
      title: "Master AI Engineering (Complete One)",
      subtitle: "Transformers, Fine-Tuning, RAG & AI Agents.",
      detailTitle: "Master AI Engineering (Complete One)",
      detailDescription: "The complete curriculum: Deep Learning, Classical ML, RAG, fine-tuning, MCP, agents, evaluation, deployment and everything in between.",
      shadowGlow: "var(--color-sky-glow)",
      accentColor: "var(--color-sky)",
      images: [
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=800&auto=format&fit=crop"
      ]
    },
    {
      id: "llm-fine-tuning",
      title: "LLM Fine-Tuning & RAG Systems",
      subtitle: "Build Production-grade RAG & PEFT pipelines.",
      detailTitle: "LLM Architecture, Fine-Tuning & RAG",
      detailDescription: "Master embeddings, vector databases, LoRA, QLoRA, DPO optimization, and production LLM serving with vLLM.",
      shadowGlow: "var(--color-purple-glow)",
      accentColor: "var(--color-purple)",
      images: [
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
      ]
    },
    {
      id: "ai-agents-mcp",
      title: "AI Agents & Autonomous Workflows",
      subtitle: "ReAct loops, LangGraph state machines & MCP.",
      detailTitle: "AI Agents & Tool Calling (ReAct)",
      detailDescription: "Design tool-calling autonomous agents with short/long-term memory, MCP protocol integration, and multi-agent coordination.",
      shadowGlow: "var(--color-amber-glow)",
      accentColor: "var(--color-amber)",
      images: [
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
      ]
    },
    {
      id: "llmops-eval-safety",
      title: "LLMOps, Evaluation & AI Safety",
      subtitle: "Serving, latency, RAGAS & Red Teaming.",
      detailTitle: "Production LLMOps & Evaluation",
      detailDescription: "Deploy models with TensorRT-LLM, monitor token latency, benchmark output quality with RAGAS, and secure models against prompt injections.",
      shadowGlow: "var(--color-emerald-glow)",
      accentColor: "var(--color-emerald)",
      images: [
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
      ]
    },
    {
      id: "ai-newsletter",
      title: "Engineering Newsletter",
      subtitle: "LLM architecture & AI case studies, every week.",
      detailTitle: "Weekly AI Architecture Deep Dives",
      detailDescription: "Deep dive case studies on how OpenAI, Anthropic, Meta, and Google design, evaluate, and scale massive AI infrastructure.",
      shadowGlow: "var(--color-pink-glow)",
      accentColor: "var(--color-pink)",
      images: [
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop"
      ]
    }
  ];
};


