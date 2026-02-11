export const CATEGORIES = [
  "CAREER",
  "FINANCE",
  "RELATIONSHIP",
  "HEALTH",
  "BUSINESS",
  "EDUCATION",
  "LIFESTYLE",
  "OTHER",
] as const;

export const DECISION_TYPES = ["ONE_WAY", "TWO_WAY"] as const;

export const EMOTION_STATES = [
  "calm",
  "fear",
  "anger",
  "guilt",
  "ego",
  "excitement",
  "anxiety",
] as const;

export const PROUD_OPTIONS = ["YES", "NO", "UNSURE"] as const;

export const VERDICTS = ["DO", "DONT", "WAIT", "TEST"] as const;

export const HIGH_EMOTIONS = ["fear", "anger", "guilt", "ego"] as const;

export const SCORE_WEIGHTS = {
  valueAlignment: 20,
  peaceImpact: 15,
  clarityOutcome: 15,
  reversibility: 10,
  opportunityGain: 15,
  riskLevel: 10,
  costLevel: 10,
  regretTest: 5,
} as const;

export const CATEGORY_LABELS: Record<string, string> = {
  CAREER: "Career",
  FINANCE: "Finance",
  RELATIONSHIP: "Relationship",
  HEALTH: "Health",
  BUSINESS: "Business",
  EDUCATION: "Education",
  LIFESTYLE: "Lifestyle",
  OTHER: "Other",
};

export const VERDICT_LABELS: Record<string, string> = {
  DO: "Do It",
  DONT: "Don't Do It",
  WAIT: "Wait",
  TEST: "Test First",
};

export const VERDICT_COLORS: Record<string, string> = {
  DO: "bg-emerald-100 text-emerald-800 border-emerald-200",
  DONT: "bg-red-100 text-red-800 border-red-200",
  WAIT: "bg-amber-100 text-amber-800 border-amber-200",
  TEST: "bg-blue-100 text-blue-800 border-blue-200",
};
