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
