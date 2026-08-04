/**
 * Async getter function simulating backend API endpoint for DevOps Engineering Dropdown data
 */
export const fetchDevopsEngineeringDropdownData = async () => {
  return [
    {
      id: "linux",
      title: "Linux",
      subtitle: "Shell, Permissions & SSH",
      url: "#"
    },
    {
      id: "docker",
      title: "Docker",
      subtitle: "Images, Volumes & Compose",
      url: "#"
    },
    {
      id: "kubernetes",
      title: "Kubernetes",
      subtitle: "Pods, Services & Scaling",
      url: "#"
    },
    {
      id: "terraform",
      title: "Terraform",
      subtitle: "State, Modules & Workspaces",
      url: "#"
    },
    {
      id: "ansible",
      title: "Ansible",
      subtitle: "Playbooks, Roles & Vault",
      url: "#"
    },
    {
      id: "cicd",
      title: "CI/CD",
      subtitle: "Jenkins, Actions & GitOps",
      url: "#"
    },
    {
      id: "monitoring-logging",
      title: "Monitoring & Logging",
      subtitle: "Prometheus, Grafana & ELK",
      url: "#"
    },
    {
      id: "devsecops",
      title: "Security (DevSecOps)",
      subtitle: "Secrets, Scanning & Least Privilege",
      url: "#"
    },
    {
      id: "sre",
      title: "SRE",
      subtitle: "SLOs, Incidents & Chaos",
      url: "#"
    },
    {
      id: "scripting",
      title: "Scripting",
      subtitle: "Python, Boto3 & Bash",
      url: "#"
    }
  ];
};

/**
 * Async getter function simulating backend API endpoint for DevOps Page Cards
 */
export const fetchDevopsPageCardsData = async () => {
  return [
    {
      id: "linux-bash",
      title: "Linux & Bash",
      subtitle: "Shell, permissions, processes and scripting, the foundation every DevOps & cloud role builds on.",
      badge: "",
      badgeColor: "",
      image: "",
      exploreUrl: "#"
    },
    {
      id: "devops-toolchain",
      title: "DevOps",
      subtitle: "Docker to Kubernetes to Terraform to production, the complete on-prem & hybrid DevOps toolchain.",
      badge: "",
      badgeColor: "",
      image: "",
      exploreUrl: "#"
    },
    {
      id: "cloud-aws",
      title: "Cloud (AWS)",
      subtitle: "IAM to serverless to production, go deep on the cloud provider everyone hires for.",
      badge: "100% INTERVIEW CONTEXT",
      badgeColor: "red",
      image: "",
      exploreUrl: "#"
    }
  ];
};
