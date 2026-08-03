export const ROLE_PATHS = {
  "SDE": "/",
  "AI Engineer": "/ai/engineering/home",
  "Devops": "/devops/engineering/home"
};

export const ROLE_NAV_ITEMS = {
  "SDE": [
    { id: "system-design", title: "System Design", subtitle: "System Design (Complete One)", hasDropdown: true, dropdownType: "system-design" },
    { id: "dsa", title: "Data Structures & Algorithms", subtitle: "Master DSA Patterns & Core Concepts", hasDropdown: true, dropdownType: "dsa" },
    { id: "swe-bucket", title: "Software Engineer Bucket", subtitle: "Interview Preparation & Concepts", hasDropdown: true, dropdownType: "swe" },
    { id: "newsletter", title: "Engineering Newsletter", subtitle: "System Design stories, every week", hasDropdown: false }
  ],
  "AI Engineer": [
    { id: "ai-curriculum", title: "AI Engineering", subtitle: "AI Engineering (Complete One)", hasDropdown: true, dropdownType: "ai-engineering" },
    { id: "newsletter", title: "Engineering Newsletter", subtitle: "AI architecture & LLM case studies", hasDropdown: false }
  ],
  "Devops": [
    { id: "devops-curriculum", title: "Devops Engineering", subtitle: "Devops Engineering (Complete One)", hasDropdown: true, dropdownType: "devops-engineering" },
    { id: "newsletter", title: "Engineering Newsletter", subtitle: "Cloud infrastructure case studies", hasDropdown: false }
  ]
};
