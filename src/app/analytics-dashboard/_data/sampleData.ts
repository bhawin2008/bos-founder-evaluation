import { Role, Member, Task } from "./types";

export const sampleRoles: Role[] = [
  { id: "role_cto", name: "CTO", description: "Chief Technology Officer - leads all technical strategy and engineering teams", color: "blue", createdAt: "2025-11-20T09:00:00.000Z" },
  { id: "role_pm", name: "Product Manager", description: "Owns the product roadmap and prioritizes features based on user feedback", color: "green", createdAt: "2025-11-20T09:05:00.000Z" },
  { id: "role_dev", name: "Developer", description: "Full-stack software developer building core platform features", color: "purple", createdAt: "2025-11-20T09:10:00.000Z" },
  { id: "role_design", name: "Designer", description: "UI/UX designer creating user interfaces and design systems", color: "yellow", createdAt: "2025-11-20T09:15:00.000Z" },
  { id: "role_qa", name: "QA Engineer", description: "Quality assurance engineer responsible for testing and release quality", color: "red", createdAt: "2025-11-20T09:20:00.000Z" },
  { id: "role_mkt", name: "Marketing Lead", description: "Drives growth strategy, campaigns, and brand awareness", color: "green", createdAt: "2025-11-22T10:00:00.000Z" },
];

export const sampleMembers: Member[] = [
  { id: "mem_alex", name: "Alex Johnson", email: "alex@bossteam.io", roleId: "role_cto", status: "active", createdAt: "2025-11-25T08:00:00.000Z" },
  { id: "mem_sarah", name: "Sarah Chen", email: "sarah@bossteam.io", roleId: "role_pm", status: "active", createdAt: "2025-11-25T08:10:00.000Z" },
  { id: "mem_mike", name: "Mike Rivera", email: "mike@bossteam.io", roleId: "role_dev", status: "active", createdAt: "2025-11-26T09:00:00.000Z" },
  { id: "mem_priya", name: "Priya Patel", email: "priya@bossteam.io", roleId: "role_dev", status: "active", createdAt: "2025-11-26T09:15:00.000Z" },
  { id: "mem_james", name: "James Kim", email: "james@bossteam.io", roleId: "role_design", status: "active", createdAt: "2025-11-27T10:00:00.000Z" },
  { id: "mem_emma", name: "Emma Wilson", email: "emma@bossteam.io", roleId: "role_qa", status: "active", createdAt: "2025-11-28T08:30:00.000Z" },
  { id: "mem_omar", name: "Omar Hassan", email: "omar@bossteam.io", roleId: "role_dev", status: "on-leave", createdAt: "2025-12-01T09:00:00.000Z" },
  { id: "mem_lisa", name: "Lisa Zhang", email: "lisa@bossteam.io", roleId: "role_mkt", status: "active", createdAt: "2025-12-02T10:00:00.000Z" },
  { id: "mem_david", name: "David Brown", email: "david@bossteam.io", roleId: "role_dev", status: "active", createdAt: "2025-12-10T08:00:00.000Z" },
  { id: "mem_nina", name: "Nina Rossi", email: "nina@bossteam.io", roleId: "role_qa", status: "inactive", createdAt: "2025-12-15T09:00:00.000Z" },
];

const decTasks: Task[] = [
  { id: "task_d01", title: "Set up CI/CD pipeline", description: "Configure GitHub Actions for automated builds and deployments", assigneeId: "mem_alex", priority: "high", dueDate: "2025-12-10", status: "completed", createdAt: "2025-12-01T09:00:00.000Z", completedAt: "2025-12-08T16:00:00.000Z" },
  { id: "task_d02", title: "Design onboarding flow", description: "Create wireframes and prototypes for new user onboarding experience", assigneeId: "mem_james", priority: "high", dueDate: "2025-12-12", status: "completed", createdAt: "2025-12-01T10:00:00.000Z", completedAt: "2025-12-11T14:00:00.000Z" },
  { id: "task_d03", title: "User authentication module", description: "Implement JWT-based authentication with refresh tokens", assigneeId: "mem_mike", priority: "high", dueDate: "2025-12-15", status: "completed", createdAt: "2025-12-02T08:30:00.000Z", completedAt: "2025-12-14T17:00:00.000Z" },
  { id: "task_d04", title: "Database schema design", description: "Design PostgreSQL schema for core entities", assigneeId: "mem_priya", priority: "high", dueDate: "2025-12-08", status: "completed", createdAt: "2025-12-02T09:00:00.000Z", completedAt: "2025-12-07T15:00:00.000Z" },
  { id: "task_d05", title: "Write QA test plan", description: "Create comprehensive test plan for the authentication module", assigneeId: "mem_emma", priority: "medium", dueDate: "2025-12-16", status: "completed", createdAt: "2025-12-03T11:00:00.000Z", completedAt: "2025-12-15T12:00:00.000Z" },
  { id: "task_d06", title: "Create product roadmap Q1", description: "Define product roadmap and milestones for Q1 2026", assigneeId: "mem_sarah", priority: "high", dueDate: "2025-12-18", status: "completed", createdAt: "2025-12-04T08:00:00.000Z", completedAt: "2025-12-17T16:30:00.000Z" },
  { id: "task_d07", title: "Homepage redesign mockups", description: "Design 3 homepage layout variations with responsive views", assigneeId: "mem_james", priority: "medium", dueDate: "2025-12-20", status: "completed", createdAt: "2025-12-05T10:00:00.000Z", completedAt: "2025-12-19T11:00:00.000Z" },
  { id: "task_d08", title: "API rate limiting", description: "Implement rate limiting middleware for all public API endpoints", assigneeId: "mem_mike", priority: "medium", dueDate: "2025-12-22", status: "completed", createdAt: "2025-12-08T09:00:00.000Z", completedAt: "2025-12-20T14:00:00.000Z" },
  { id: "task_d09", title: "Set up monitoring dashboard", description: "Configure Grafana dashboards for server metrics and alerting", assigneeId: "mem_alex", priority: "medium", dueDate: "2025-12-20", status: "completed", createdAt: "2025-12-08T10:00:00.000Z", completedAt: "2025-12-19T10:00:00.000Z" },
  { id: "task_d10", title: "Marketing landing page copy", description: "Write copy for the new product landing page including CTAs", assigneeId: "mem_lisa", priority: "medium", dueDate: "2025-12-22", status: "completed", createdAt: "2025-12-10T08:00:00.000Z", completedAt: "2025-12-21T15:00:00.000Z" },
  { id: "task_d11", title: "Integration testing suite", description: "Build integration tests for user registration and login flows", assigneeId: "mem_emma", priority: "medium", dueDate: "2025-12-24", status: "completed", createdAt: "2025-12-12T09:00:00.000Z", completedAt: "2025-12-23T13:00:00.000Z" },
  { id: "task_d12", title: "User profile page", description: "Implement user profile page with avatar upload and settings", assigneeId: "mem_priya", priority: "low", dueDate: "2025-12-28", status: "completed", createdAt: "2025-12-15T08:00:00.000Z", completedAt: "2025-12-27T14:00:00.000Z" },
  { id: "task_d13", title: "Email notification system", description: "Set up transactional email service for user notifications", assigneeId: "mem_omar", priority: "medium", dueDate: "2025-12-30", status: "pending", createdAt: "2025-12-16T09:00:00.000Z", completedAt: null },
  { id: "task_d14", title: "Social media campaign plan", description: "Plan December social media content calendar and ad strategy", assigneeId: "mem_lisa", priority: "low", dueDate: "2025-12-18", status: "completed", createdAt: "2025-12-10T14:00:00.000Z", completedAt: "2025-12-17T10:00:00.000Z" },
  { id: "task_d15", title: "Code review guidelines", description: "Document code review process and best practices for the team", assigneeId: "mem_alex", priority: "low", dueDate: "2025-12-28", status: "completed", createdAt: "2025-12-18T08:00:00.000Z", completedAt: "2025-12-26T16:00:00.000Z" },
  { id: "task_d16", title: "Performance benchmark tests", description: "Run load tests on API endpoints and document baseline metrics", assigneeId: "mem_emma", priority: "medium", dueDate: "2025-12-30", status: "in-progress", createdAt: "2025-12-20T09:00:00.000Z", completedAt: null },
];

const janTasks: Task[] = [
  { id: "task_j01", title: "Implement search functionality", description: "Build full-text search with filters across all entities", assigneeId: "mem_mike", priority: "high", dueDate: "2026-01-10", status: "completed", createdAt: "2026-01-02T09:00:00.000Z", completedAt: "2026-01-09T17:00:00.000Z" },
  { id: "task_j02", title: "Dashboard analytics module", description: "Build analytics dashboard with charts for team metrics", assigneeId: "mem_priya", priority: "high", dueDate: "2026-01-12", status: "completed", createdAt: "2026-01-02T09:30:00.000Z", completedAt: "2026-01-11T15:00:00.000Z" },
  { id: "task_j03", title: "Design system v2", description: "Update design system with new components and token structure", assigneeId: "mem_james", priority: "high", dueDate: "2026-01-15", status: "completed", createdAt: "2026-01-03T08:00:00.000Z", completedAt: "2026-01-14T16:00:00.000Z" },
  { id: "task_j04", title: "Sprint planning Q1", description: "Break down Q1 roadmap into sprints and assign story points", assigneeId: "mem_sarah", priority: "high", dueDate: "2026-01-08", status: "completed", createdAt: "2026-01-03T10:00:00.000Z", completedAt: "2026-01-07T14:00:00.000Z" },
  { id: "task_j05", title: "Automated regression tests", description: "Expand test coverage to include all critical user journeys", assigneeId: "mem_emma", priority: "high", dueDate: "2026-01-15", status: "completed", createdAt: "2026-01-05T09:00:00.000Z", completedAt: "2026-01-14T11:00:00.000Z" },
  { id: "task_j06", title: "Real-time notifications", description: "Implement WebSocket-based real-time notification system", assigneeId: "mem_mike", priority: "high", dueDate: "2026-01-18", status: "completed", createdAt: "2026-01-06T08:00:00.000Z", completedAt: "2026-01-17T16:00:00.000Z" },
  { id: "task_j07", title: "Team permissions system", description: "Build role-based access control for team workspaces", assigneeId: "mem_priya", priority: "high", dueDate: "2026-01-20", status: "completed", createdAt: "2026-01-07T09:00:00.000Z", completedAt: "2026-01-19T15:00:00.000Z" },
  { id: "task_j08", title: "Content marketing strategy", description: "Define blog content calendar and SEO keyword targets for Q1", assigneeId: "mem_lisa", priority: "medium", dueDate: "2026-01-15", status: "completed", createdAt: "2026-01-06T10:00:00.000Z", completedAt: "2026-01-14T12:00:00.000Z" },
  { id: "task_j09", title: "Mobile responsive audit", description: "Audit and fix all responsive design issues on mobile devices", assigneeId: "mem_james", priority: "medium", dueDate: "2026-01-22", status: "completed", createdAt: "2026-01-08T08:00:00.000Z", completedAt: "2026-01-21T10:00:00.000Z" },
  { id: "task_j10", title: "DevOps infrastructure upgrade", description: "Migrate to containerized infrastructure with Kubernetes", assigneeId: "mem_alex", priority: "high", dueDate: "2026-01-25", status: "completed", createdAt: "2026-01-10T09:00:00.000Z", completedAt: "2026-01-24T17:00:00.000Z" },
  { id: "task_j11", title: "User feedback survey analysis", description: "Analyze Q4 user feedback and create actionable insights report", assigneeId: "mem_sarah", priority: "medium", dueDate: "2026-01-20", status: "completed", createdAt: "2026-01-10T10:00:00.000Z", completedAt: "2026-01-19T14:00:00.000Z" },
  { id: "task_j12", title: "API documentation overhaul", description: "Rewrite API docs with interactive examples using Swagger/OpenAPI", assigneeId: "mem_david", priority: "medium", dueDate: "2026-01-22", status: "completed", createdAt: "2026-01-12T08:00:00.000Z", completedAt: "2026-01-21T16:00:00.000Z" },
  { id: "task_j13", title: "Accessibility compliance audit", description: "Ensure WCAG 2.1 AA compliance across all user-facing pages", assigneeId: "mem_emma", priority: "medium", dueDate: "2026-01-28", status: "completed", createdAt: "2026-01-15T09:00:00.000Z", completedAt: "2026-01-27T13:00:00.000Z" },
  { id: "task_j14", title: "Data export feature", description: "Allow users to export their data in CSV and JSON formats", assigneeId: "mem_david", priority: "medium", dueDate: "2026-01-28", status: "in-progress", createdAt: "2026-01-16T08:00:00.000Z", completedAt: null },
  { id: "task_j15", title: "Onboarding email sequence", description: "Create 5-part drip email campaign for new user onboarding", assigneeId: "mem_lisa", priority: "medium", dueDate: "2026-01-25", status: "completed", createdAt: "2026-01-16T10:00:00.000Z", completedAt: "2026-01-24T11:00:00.000Z" },
  { id: "task_j16", title: "Dark mode theme support", description: "Implement system-aware dark/light mode toggle with persistence", assigneeId: "mem_james", priority: "low", dueDate: "2026-01-30", status: "completed", createdAt: "2026-01-18T09:00:00.000Z", completedAt: "2026-01-29T14:00:00.000Z" },
  { id: "task_j17", title: "Error tracking integration", description: "Set up Sentry for front-end error tracking and alerting", assigneeId: "mem_alex", priority: "medium", dueDate: "2026-01-28", status: "completed", createdAt: "2026-01-20T08:00:00.000Z", completedAt: "2026-01-27T15:00:00.000Z" },
  { id: "task_j18", title: "File upload microservice", description: "Build a dedicated service for handling file uploads with S3", assigneeId: "mem_priya", priority: "medium", dueDate: "2026-01-30", status: "in-progress", createdAt: "2026-01-22T09:00:00.000Z", completedAt: null },
  { id: "task_j19", title: "Security penetration testing", description: "Conduct security audit and pen test on all public endpoints", assigneeId: "mem_emma", priority: "high", dueDate: "2026-01-31", status: "pending", createdAt: "2026-01-24T08:00:00.000Z", completedAt: null },
  { id: "task_j20", title: "Investor metrics dashboard", description: "Build a metrics dashboard showcasing KPIs for investor updates", assigneeId: "mem_sarah", priority: "high", dueDate: "2026-01-31", status: "in-progress", createdAt: "2026-01-25T09:00:00.000Z", completedAt: null },
];

export const sampleTasks: Task[] = [...decTasks, ...janTasks];

export function getMonthTasks(tasks: Task[], year: number, month: number): Task[] {
  return tasks.filter((t) => {
    const d = new Date(t.createdAt);
    return d.getFullYear() === year && d.getMonth() === month;
  });
}

export function getCompletedInMonth(tasks: Task[]): Task[] {
  return tasks.filter((t) => t.status === "completed");
}

export function getWeeklyCompletions(tasks: Task[], year: number, month: number): number[] {
  const weeks = [0, 0, 0, 0, 0];
  tasks.forEach((t) => {
    if (t.status === "completed" && t.completedAt) {
      const d = new Date(t.completedAt);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const weekNum = Math.min(Math.floor((d.getDate() - 1) / 7), 4);
        weeks[weekNum]++;
      }
    }
  });
  return weeks;
}

export function formatStatus(status: string): string {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatDate(dateStr: string): string {
  const parts = dateStr.split("-");
  const date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}
