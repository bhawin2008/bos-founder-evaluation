import { type CategoryKey, questions } from "./questions";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CategoryScores = Record<CategoryKey, number>;

export interface StatusRange {
  min: number;
  max: number;
  label: string;
  className: "broken" | "unreliable" | "scalable";
  description: string;
}

export interface SectionStatus {
  label: string;
  color: "red" | "yellow" | "green";
}

export interface Bottleneck {
  key: CategoryKey;
  score: number;
  name: string;
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

export const statusRanges: StatusRange[] = [
  {
    min: 0,
    max: 25,
    label: "Sales & Marketing is Broken",
    className: "broken",
    description:
      "Revenue is unpredictable and your sales and marketing systems are not functioning. Immediate, focused intervention is needed before anything else.",
  },
  {
    min: 26,
    max: 45,
    label: "Works but Unreliable",
    className: "unreliable",
    description:
      "Some things are working, but nothing is consistent enough to scale. Revenue comes in, but you can\u2019t predict or repeat it reliably.",
  },
  {
    min: 46,
    max: 60,
    label: "Scalable & Predictable",
    className: "scalable",
    description:
      "Your sales and marketing engine has real structure. Revenue is predictable, messaging is clear, and growth has a repeatable foundation.",
  },
];

export const categoryLabels: Record<CategoryKey, string> = {
  demand: "Demand Quality",
  message: "Message & Positioning Clarity",
  sales: "Sales Process & Conversion",
  revenue: "Revenue Predictability",
};

export const categorySubtitles: Record<CategoryKey, string> = {
  demand: "Are the right leads coming in?",
  message: "Do prospects get it instantly?",
  sales: "What happens after a lead comes in?",
  revenue: "Is growth calm or chaotic?",
};

export const recommendations: Record<
  CategoryKey,
  Record<"red" | "yellow" | "green", string>
> = {
  demand: {
    red: "Your marketing attracts attention, not intent. Focus on attracting problem-aware buyers before increasing volume.",
    yellow:
      "Lead flow is happening but inconsistent. Define your ideal lead sources and double down on what\u2019s already working.",
    green:
      "Demand generation is healthy. Keep optimizing your best-performing channels and monitor lead quality metrics.",
  },
  message: {
    red: "Your offering is not clearly understood. Until messaging is outcome-led, conversion will stay low.",
    yellow:
      "Your message partly lands, but lacks consistency. Align all channels around one clear, outcome-driven promise.",
    green:
      "Messaging is clear and differentiated. Continue refining based on prospect feedback and competitive shifts.",
  },
  sales: {
    red: "Revenue is unstable because sales is intuition-driven. Build a repeatable discovery and qualification process.",
    yellow:
      "There\u2019s some structure, but it\u2019s not consistently followed. Document your best sales conversations and standardize them.",
    green:
      "Sales process is solid and repeatable. Focus on improving conversion rates and coaching the team on edge cases.",
  },
  revenue: {
    red: "Growth feels stressful because revenue depends on individuals, not systems.",
    yellow:
      "You have some visibility into revenue, but not enough to plan confidently. Start tracking conversion metrics weekly.",
    green:
      "Revenue is predictable and founder-independent. Maintain your forecasting discipline and look for expansion opportunities.",
  },
};

export const bottleneckMessages: Record<CategoryKey, string> = {
  demand:
    "Your marketing attracts attention, not intent. Focus on attracting problem-aware buyers before increasing volume.",
  message:
    "Your offering is not clearly understood. Until messaging is outcome-led, conversion will stay low.",
  sales:
    "Revenue is unstable because sales is intuition-driven. Build a repeatable discovery and qualification process.",
  revenue:
    "Growth feels stressful because revenue depends on individuals, not systems.",
};

// ---------------------------------------------------------------------------
// Scoring functions
// ---------------------------------------------------------------------------

export function calculateScores(answers: number[]): {
  categoryScores: CategoryScores;
  totalScore: number;
} {
  const categoryScores: CategoryScores = {
    demand: 0,
    message: 0,
    sales: 0,
    revenue: 0,
  };

  questions.forEach((q, i) => {
    if (answers[i] >= 0) {
      categoryScores[q.categoryKey] += answers[i];
    }
  });

  const totalScore = Object.values(categoryScores).reduce(
    (a, b) => a + b,
    0,
  );
  return { categoryScores, totalScore };
}

export function getStatus(totalScore: number): StatusRange {
  for (const range of statusRanges) {
    if (totalScore >= range.min && totalScore <= range.max) {
      return range;
    }
  }
  return statusRanges[0];
}

export function getSectionStatus(score: number): SectionStatus {
  if (score <= 6) return { label: "Critical", color: "red" };
  if (score <= 11) return { label: "Unstable", color: "yellow" };
  return { label: "Healthy", color: "green" };
}

export function getBottlenecks(categoryScores: CategoryScores): Bottleneck[] {
  const sorted = (
    Object.entries(categoryScores) as [CategoryKey, number][]
  )
    .map(([key, score]) => ({
      key,
      score,
      name: categoryLabels[key],
    }))
    .sort((a, b) => a.score - b.score);

  return sorted.slice(0, 3);
}

export function getSectionRecommendation(
  key: CategoryKey,
  score: number,
): string {
  const status = getSectionStatus(score);
  return recommendations[key][status.color];
}
