export interface VentureScores {
  market?: number;
  problem?: number;
  solution?: number;
  competitive?: number;
  team?: number;
  feasibility?: number;
  revenue?: number;
  timing?: number;
}

export type Stage = "idea" | "validating" | "building" | "launched" | "paused";

export type RevenueModel =
  | "saas"
  | "marketplace"
  | "freemium"
  | "transactional"
  | "advertising"
  | "licensing"
  | "other";

export interface Venture {
  id: string;
  name: string;
  description: string;
  stage: Stage;
  market: string;
  revenueModel: RevenueModel | "";
  scores: VentureScores;
  createdAt: string;
  updatedAt: string;
}

export type ViewName = "dashboard" | "ventures" | "evaluate" | "pipeline";

export interface CriterionDef {
  id: keyof VentureScores;
  label: string;
  desc: string;
}

export const CRITERIA: CriterionDef[] = [
  { id: "market", label: "Market Opportunity", desc: "Size, growth, and accessibility of the target market" },
  { id: "problem", label: "Problem Severity", desc: "How painful is the problem you are solving?" },
  { id: "solution", label: "Solution Fit", desc: "How well does your solution address the problem?" },
  { id: "competitive", label: "Competitive Advantage", desc: "Defensibility and differentiation from competitors" },
  { id: "team", label: "Team Readiness", desc: "Skills, experience, and capacity of the founding team" },
  { id: "feasibility", label: "Technical Feasibility", desc: "Can you build this with available resources and technology?" },
  { id: "revenue", label: "Revenue Potential", desc: "Clarity and scale of the monetization path" },
  { id: "timing", label: "Market Timing", desc: "Is now the right time for this venture?" },
];

export const REVENUE_MODEL_LABELS: Record<RevenueModel, string> = {
  saas: "SaaS Subscription",
  marketplace: "Marketplace",
  freemium: "Freemium",
  transactional: "Transactional",
  advertising: "Advertising",
  licensing: "Licensing",
  other: "Other",
};

export const STAGE_LABELS: Record<Stage, string> = {
  idea: "Idea",
  validating: "Validating",
  building: "Building",
  launched: "Launched",
  paused: "Paused",
};

export const PIPELINE_STAGES: Stage[] = ["idea", "validating", "building", "launched"];

export const SEED_VENTURES: Venture[] = [
  {
    id: "1",
    name: "AI Scheduling Assistant",
    description:
      "An AI-powered scheduling tool that learns meeting preferences and automatically finds optimal times across teams and time zones.",
    stage: "validating",
    market: "Remote teams & distributed companies",
    revenueModel: "saas",
    scores: { market: 8, problem: 7, solution: 8, competitive: 6, team: 7, feasibility: 8, revenue: 7, timing: 9 },
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-02-01T14:30:00Z",
  },
  {
    id: "2",
    name: "Founder Wellness Tracker",
    description:
      "A wellness and burnout prevention app specifically designed for startup founders, tracking stress, sleep, and workload patterns.",
    stage: "idea",
    market: "Startup founders & entrepreneurs",
    revenueModel: "freemium",
    scores: { market: 6, problem: 8, solution: 5, competitive: 4, team: 6, feasibility: 9, revenue: 5, timing: 7 },
    createdAt: "2026-02-05T09:00:00Z",
    updatedAt: "2026-02-05T09:00:00Z",
  },
  {
    id: "3",
    name: "MicroSaaS Marketplace",
    description:
      "A curated marketplace for buying and selling small SaaS businesses under $50k ARR, with built-in due diligence tools.",
    stage: "building",
    market: "Indie hackers & micro-entrepreneurs",
    revenueModel: "marketplace",
    scores: { market: 7, problem: 7, solution: 7, competitive: 5, team: 8, feasibility: 6, revenue: 8, timing: 8 },
    createdAt: "2025-12-01T08:00:00Z",
    updatedAt: "2026-02-10T11:00:00Z",
  },
  {
    id: "4",
    name: "Local Commerce Platform",
    description:
      "A hyperlocal e-commerce platform connecting neighborhood shops with nearby customers for same-day delivery.",
    stage: "launched",
    market: "Local retail businesses",
    revenueModel: "transactional",
    scores: { market: 8, problem: 6, solution: 7, competitive: 5, team: 7, feasibility: 7, revenue: 7, timing: 6 },
    createdAt: "2025-09-20T12:00:00Z",
    updatedAt: "2026-01-28T16:00:00Z",
  },
  {
    id: "5",
    name: "DevTool Analytics",
    description:
      "Usage analytics and adoption metrics for developer tools and APIs, helping DevRel teams understand developer journeys.",
    stage: "idea",
    market: "Developer tool companies",
    revenueModel: "saas",
    scores: {},
    createdAt: "2026-02-12T10:00:00Z",
    updatedAt: "2026-02-12T10:00:00Z",
  },
  {
    id: "6",
    name: "Carbon Offset Tracker",
    description:
      "B2B SaaS for startups to track, report, and offset their carbon footprint with verified credits and automated reporting.",
    stage: "paused",
    market: "Climate-conscious startups",
    revenueModel: "saas",
    scores: { market: 6, problem: 5, solution: 6, competitive: 4, team: 5, feasibility: 7, revenue: 5, timing: 6 },
    createdAt: "2025-10-10T08:00:00Z",
    updatedAt: "2026-01-15T09:00:00Z",
  },
];

export function getOverallScore(venture: Venture): number {
  const keys = Object.keys(venture.scores) as (keyof VentureScores)[];
  if (keys.length === 0) return 0;
  const sum = keys.reduce((acc, k) => acc + (venture.scores[k] ?? 0), 0);
  return Math.round((sum / (keys.length * 10)) * 100);
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export function truncate(str: string, len: number): string {
  if (str.length <= len) return str;
  return str.substring(0, len) + "...";
}

export function scoreColor(score: number): string {
  if (score >= 70) return "bg-teal-400";
  if (score >= 50) return "bg-yellow-400";
  return "bg-red-400";
}

export function scoreColorVar(score: number): string {
  if (score >= 70) return "#00cec9";
  if (score >= 50) return "#fdcb6e";
  return "#ff6b6b";
}
