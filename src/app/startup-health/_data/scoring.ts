import { type CategoryKey, categoryLabels, questions } from "./questions";

export interface StatusRange {
  min: number;
  max: number;
  label: string;
  className: StatusClassName;
  description: string;
}

export type StatusClassName =
  | "survival"
  | "fragile"
  | "emerging"
  | "scaling"
  | "built";

export interface CategoryHealth {
  label: string;
  barColor: "red" | "orange" | "green";
}

export interface Bottleneck {
  key: CategoryKey;
  score: number;
  name: string;
}

export interface CategoryScores {
  sales: number;
  marketing: number;
  founder: number;
  team: number;
}

export const statusRanges: StatusRange[] = [
  {
    min: 0,
    max: 12,
    label: "Survival Mode",
    className: "survival",
    description:
      "The founder IS the business. No systems, no leverage. One bad week away from collapse. Immediate action needed.",
  },
  {
    min: 13,
    max: 24,
    label: "Fragile Growth",
    className: "fragile",
    description:
      "Revenue is coming in, but everything depends on the founder. Growth is creating more chaos, not clarity.",
  },
  {
    min: 25,
    max: 36,
    label: "Emerging Structure",
    className: "emerging",
    description:
      "Some systems are forming, but inconsistently followed. The business works — until it's tested.",
  },
  {
    min: 37,
    max: 48,
    label: "Scaling Ready",
    className: "scaling",
    description:
      "Real foundations are in place. The team is growing into ownership. A few gaps remain, but momentum is strong.",
  },
  {
    min: 49,
    max: 60,
    label: "Built to Scale",
    className: "built",
    description:
      "Systems run the business, not the founder. Revenue is predictable, the team is capable, and growth has structure.",
  },
];

export const bottleneckMessages: Record<CategoryKey, string> = {
  sales:
    "Your revenue is unpredictable and founder-driven. Without a repeatable sales system, growth will always be a grind.",
  marketing:
    "Your market doesn't clearly understand who you are, what you solve, or why you're different. You're creating noise, not signal.",
  founder:
    "You ARE the business. Nothing moves without you, and that's the ceiling on your growth.",
  team:
    "You have people, not a team. Execution depends on constant follow-up, not ownership.",
};

export function calculateScores(answers: number[]): {
  categoryScores: CategoryScores;
  totalScore: number;
} {
  const categoryScores: CategoryScores = {
    sales: 0,
    marketing: 0,
    founder: 0,
    team: 0,
  };

  questions.forEach((q, i) => {
    if (answers[i] >= 0) {
      categoryScores[q.categoryKey] += answers[i];
    }
  });

  const totalScore = Object.values(categoryScores).reduce(
    (a, b) => a + b,
    0
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

export function getCategoryHealth(score: number): CategoryHealth {
  if (score <= 5) return { label: "Red Flag", barColor: "red" };
  if (score <= 10) return { label: "Needs Attention", barColor: "orange" };
  return { label: "Healthy", barColor: "green" };
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
