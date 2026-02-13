import type {
  Role,
  Member,
  Task,
  Note,
  Signal,
  AutoRule,
  CultureConfig,
  PredictiveInsight,
  AppData,
} from "./types";

// ==================== Roles ====================

export const sampleRoles: Role[] = [
  {
    id: "role_cto",
    name: "CTO",
    description:
      "Chief Technology Officer - leads all technical strategy and engineering teams",
    color: "blue",
    createdAt: "2025-11-20T09:00:00.000Z",
  },
  {
    id: "role_pm",
    name: "Product Manager",
    description:
      "Owns the product roadmap and prioritizes features based on user feedback",
    color: "green",
    createdAt: "2025-11-20T09:05:00.000Z",
  },
  {
    id: "role_dev",
    name: "Developer",
    description:
      "Full-stack software developer building core platform features",
    color: "purple",
    createdAt: "2025-11-20T09:10:00.000Z",
  },
  {
    id: "role_design",
    name: "Designer",
    description:
      "UI/UX designer creating user interfaces and design systems",
    color: "yellow",
    createdAt: "2025-11-20T09:15:00.000Z",
  },
  {
    id: "role_qa",
    name: "QA Engineer",
    description:
      "Quality assurance engineer responsible for testing and release quality",
    color: "red",
    createdAt: "2025-11-20T09:20:00.000Z",
  },
  {
    id: "role_mkt",
    name: "Marketing Lead",
    description:
      "Drives growth strategy, campaigns, and brand awareness",
    color: "green",
    createdAt: "2025-11-22T10:00:00.000Z",
  },
];

// ==================== Members ====================

export const sampleMembers: Member[] = [
  {
    id: "mem_alex",
    name: "Alex Johnson",
    email: "alex@bossteam.io",
    roleId: "role_cto",
    status: "active",
    createdAt: "2025-11-25T08:00:00.000Z",
    cultureScore: 92,
    gorScore: { growth: 88, operations: 95, resilience: 90, overall: 91 },
  },
  {
    id: "mem_sarah",
    name: "Sarah Chen",
    email: "sarah@bossteam.io",
    roleId: "role_pm",
    status: "active",
    createdAt: "2025-11-25T08:10:00.000Z",
    cultureScore: 88,
    gorScore: { growth: 92, operations: 85, resilience: 87, overall: 88 },
  },
  {
    id: "mem_mike",
    name: "Mike Rivera",
    email: "mike@bossteam.io",
    roleId: "role_dev",
    status: "active",
    createdAt: "2025-11-26T09:00:00.000Z",
    cultureScore: 85,
    gorScore: { growth: 80, operations: 90, resilience: 82, overall: 84 },
  },
  {
    id: "mem_priya",
    name: "Priya Patel",
    email: "priya@bossteam.io",
    roleId: "role_dev",
    status: "active",
    createdAt: "2025-11-26T09:15:00.000Z",
    cultureScore: 90,
    gorScore: { growth: 85, operations: 92, resilience: 88, overall: 88 },
  },
  {
    id: "mem_james",
    name: "James Kim",
    email: "james@bossteam.io",
    roleId: "role_design",
    status: "active",
    createdAt: "2025-11-27T10:00:00.000Z",
    cultureScore: 87,
    gorScore: { growth: 90, operations: 82, resilience: 85, overall: 86 },
  },
  {
    id: "mem_emma",
    name: "Emma Wilson",
    email: "emma@bossteam.io",
    roleId: "role_qa",
    status: "active",
    createdAt: "2025-11-28T08:30:00.000Z",
    cultureScore: 91,
    gorScore: { growth: 78, operations: 95, resilience: 92, overall: 88 },
  },
  {
    id: "mem_omar",
    name: "Omar Hassan",
    email: "omar@bossteam.io",
    roleId: "role_dev",
    status: "on-leave",
    createdAt: "2025-12-01T09:00:00.000Z",
    cultureScore: 76,
    gorScore: { growth: 72, operations: 80, resilience: 70, overall: 74 },
  },
  {
    id: "mem_lisa",
    name: "Lisa Zhang",
    email: "lisa@bossteam.io",
    roleId: "role_mkt",
    status: "active",
    createdAt: "2025-12-02T10:00:00.000Z",
    cultureScore: 83,
    gorScore: { growth: 88, operations: 78, resilience: 80, overall: 82 },
  },
  {
    id: "mem_david",
    name: "David Brown",
    email: "david@bossteam.io",
    roleId: "role_dev",
    status: "active",
    createdAt: "2025-12-10T08:00:00.000Z",
    cultureScore: 79,
    gorScore: { growth: 75, operations: 82, resilience: 78, overall: 78 },
  },
  {
    id: "mem_nina",
    name: "Nina Rossi",
    email: "nina@bossteam.io",
    roleId: "role_qa",
    status: "inactive",
    createdAt: "2025-12-15T09:00:00.000Z",
    cultureScore: 65,
    gorScore: { growth: 60, operations: 70, resilience: 62, overall: 64 },
  },
];

// ==================== December 2025 Tasks ====================

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

// ==================== January 2026 Tasks ====================

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

// ==================== Notes ====================

export const sampleNotes: Note[] = [
  {
    id: "note_01",
    title: "Q1 Culture Goals",
    content:
      "Focus on improving cross-team collaboration. Schedule weekly syncs between engineering and design. Target: raise collaboration signal from 72 to 85 by end of Q1.",
    authorId: "mem_alex",
    tags: ["culture", "goals", "q1"],
    createdAt: "2026-01-05T09:00:00.000Z",
    updatedAt: "2026-01-05T09:00:00.000Z",
  },
  {
    id: "note_02",
    title: "Onboarding Feedback - David",
    content:
      "David mentioned the onboarding felt rushed. Consider adding a buddy system for new hires. His GOR resilience score reflects adjustment period.",
    authorId: "mem_sarah",
    tags: ["onboarding", "feedback"],
    createdAt: "2026-01-08T14:00:00.000Z",
    updatedAt: "2026-01-08T14:00:00.000Z",
  },
  {
    id: "note_03",
    title: "Team Retrospective Notes - Sprint 3",
    content:
      "Key takeaways: 1) Deployment pipeline improved velocity by 30%. 2) Need better async communication for remote members. 3) QA bottleneck in final sprint days.",
    authorId: "mem_sarah",
    tags: ["retro", "sprint"],
    createdAt: "2026-01-15T16:00:00.000Z",
    updatedAt: "2026-01-15T16:00:00.000Z",
  },
  {
    id: "note_04",
    title: "Omar Leave Planning",
    content:
      "Omar is on extended leave. Redistributed his tasks to Mike and David. Monitor their workload signals closely. Expected return: Feb 15.",
    authorId: "mem_alex",
    tags: ["leave", "planning"],
    createdAt: "2026-01-10T10:00:00.000Z",
    updatedAt: "2026-01-12T08:00:00.000Z",
  },
  {
    id: "note_05",
    title: "Culture Health Check Observations",
    content:
      "Overall culture score trending up from 82 to 86. Engineering team shows strongest GOR operations scores. Marketing resilience needs attention - Lisa carrying high load solo.",
    authorId: "mem_alex",
    tags: ["culture", "health", "review"],
    createdAt: "2026-01-20T11:00:00.000Z",
    updatedAt: "2026-01-20T11:00:00.000Z",
  },
];

// ==================== Signals ====================

export const sampleSignals: Signal[] = [
  {
    id: "sig_engagement",
    name: "Team Engagement",
    description: "Measures overall participation in team activities, standups, and reviews",
    category: "engagement",
    weight: 0.25,
    threshold: 75,
    enabled: true,
  },
  {
    id: "sig_productivity",
    name: "Task Completion Rate",
    description: "Ratio of completed tasks to total assigned tasks within sprint cycles",
    category: "productivity",
    weight: 0.2,
    threshold: 80,
    enabled: true,
  },
  {
    id: "sig_collaboration",
    name: "Cross-Team Collaboration",
    description: "Frequency of inter-team code reviews, pair sessions, and knowledge sharing",
    category: "collaboration",
    weight: 0.2,
    threshold: 70,
    enabled: true,
  },
  {
    id: "sig_wellbeing",
    name: "Work-Life Balance",
    description: "Tracks after-hours work, PTO usage, and burnout risk indicators",
    category: "wellbeing",
    weight: 0.15,
    threshold: 65,
    enabled: true,
  },
  {
    id: "sig_leadership",
    name: "Leadership Visibility",
    description: "Measures leadership engagement in mentoring, 1-on-1s, and team ceremonies",
    category: "leadership",
    weight: 0.1,
    threshold: 70,
    enabled: true,
  },
  {
    id: "sig_growth",
    name: "Learning & Growth",
    description: "Tracks skill development, training completion, and growth plan progress",
    category: "engagement",
    weight: 0.1,
    threshold: 60,
    enabled: true,
  },
];

// ==================== Auto Rules ====================

export const sampleAutoRules: AutoRule[] = [
  {
    id: "rule_01",
    name: "Burnout Alert",
    description: "Alert when a member's wellbeing signal drops below threshold",
    triggerSignal: "sig_wellbeing",
    condition: "below",
    conditionValue: 50,
    action: "Send alert to team lead and suggest PTO",
    enabled: true,
    lastTriggered: null,
  },
  {
    id: "rule_02",
    name: "High Performer Recognition",
    description: "Recognize members with consistently high GOR scores",
    triggerSignal: "sig_productivity",
    condition: "above",
    conditionValue: 90,
    action: "Add to monthly recognition board",
    enabled: true,
    lastTriggered: "2026-01-15T10:00:00.000Z",
  },
  {
    id: "rule_03",
    name: "Collaboration Nudge",
    description: "Nudge teams when cross-team collaboration drops",
    triggerSignal: "sig_collaboration",
    condition: "below",
    conditionValue: 60,
    action: "Schedule cross-team sync meeting",
    enabled: false,
    lastTriggered: null,
  },
];

// ==================== Default Config ====================

export const defaultConfig: CultureConfig = {
  orgName: "BossTeam",
  gorWeights: { growth: 0.35, operations: 0.4, resilience: 0.25 },
  healthThresholds: { excellent: 90, good: 75, warning: 60, critical: 40 },
  dateRange: { start: "2025-12-01", end: "2026-01-31" },
  notificationsEnabled: true,
  autoRulesEnabled: true,
};

// ==================== Predictive Insights ====================

export const sampleInsights: PredictiveInsight[] = [
  {
    id: "insight_01",
    title: "Burnout Risk: Lisa Zhang",
    description:
      "Lisa has been the sole marketing resource and her task load has increased 40% month-over-month. GOR resilience trending down.",
    category: "risk",
    confidence: 82,
    impact: "high",
    membersAffected: ["mem_lisa"],
    suggestedAction:
      "Consider hiring a marketing coordinator or redistributing non-critical marketing tasks.",
    timeframe: "Next 2-4 weeks",
  },
  {
    id: "insight_02",
    title: "Engineering Velocity Up 25%",
    description:
      "The dev team completed 25% more tasks in January vs December with higher quality (fewer rollbacks). CI/CD improvements showing ROI.",
    category: "trend",
    confidence: 94,
    impact: "high",
    membersAffected: ["mem_mike", "mem_priya", "mem_david", "mem_alex"],
    suggestedAction:
      "Document the process improvements and apply similar patterns to QA pipeline.",
    timeframe: "Ongoing",
  },
  {
    id: "insight_03",
    title: "Onboarding Gap for David",
    description:
      "David's GOR scores are below team average 6 weeks in. His operations score is improving but growth metrics lag behind peers.",
    category: "risk",
    confidence: 71,
    impact: "medium",
    membersAffected: ["mem_david"],
    suggestedAction:
      "Assign a mentor and create a structured 30-60-90 growth plan.",
    timeframe: "Next 30 days",
  },
  {
    id: "insight_04",
    title: "Cross-Team Collaboration Opportunity",
    description:
      "Design and QA teams rarely interact directly. Joint review sessions could reduce rework by an estimated 15%.",
    category: "opportunity",
    confidence: 76,
    impact: "medium",
    membersAffected: ["mem_james", "mem_emma", "mem_nina"],
    suggestedAction:
      "Establish weekly design-QA review sessions starting next sprint.",
    timeframe: "Next sprint",
  },
  {
    id: "insight_05",
    title: "Omar Return Planning",
    description:
      "Omar returns from leave Feb 15. His pre-leave GOR scores were below average. Re-onboarding plan recommended.",
    category: "risk",
    confidence: 65,
    impact: "medium",
    membersAffected: ["mem_omar"],
    suggestedAction:
      "Prepare a return-to-work plan with reduced workload for first 2 weeks.",
    timeframe: "Feb 15",
  },
];

// ==================== Full App Data (Initial) ====================

export function getInitialData(): AppData {
  return {
    members: [...sampleMembers],
    tasks: [...sampleTasks],
    roles: [...sampleRoles],
    notes: [...sampleNotes],
    signals: [...sampleSignals],
    autoRules: [...sampleAutoRules],
    config: { ...defaultConfig },
  };
}
