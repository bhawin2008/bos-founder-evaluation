import { SCORE_WEIGHTS, HIGH_EMOTIONS } from "./constants";

export interface DecisionInput {
  title: string;
  category: string;
  decisionType: string;
  emotionState: string;
  factsKnown: string;
  assumptions: string;
  reasonsFor: string[];
  reasonsAgainst: string[];
  bestCase: string;
  worstCase: string;
  likelyOutcome: string;
  costMoney: number;
  costTime: number;
  costEnergy: number;
  costReputation: number;
  valuesTop3: string[];
  identityMatch: string;
  proudIn1Year: string;
  options: { a: string; b: string; c: string };
  scores: {
    clarityOutcome: number;
    reversibility: number;
    valueAlignment: number;
    peaceImpact: number;
    opportunityGain: number;
    riskLevel: number;
    regretTest: number;
  };
  counselorNotes?: string;
}

export interface EvaluationResult {
  weightedScore: number;
  verdict: "DO" | "DONT" | "WAIT" | "TEST";
  confidence: number;
  redFlags: string[];
  counselorNotes: string;
  nextSteps: Record<string, string[]>;
  experimentPlan: ExperimentPlan | null;
  costLevel: number;
  scores: DecisionInput["scores"] & { costLevel: number };
}

export interface ExperimentPlan {
  hypothesis: string;
  timebox: string;
  costCap: string;
  successMetrics: string[];
  killCriteria: string;
  reviewDate: string;
}

function computeCostLevel(
  costMoney: number,
  costTime: number,
  costEnergy: number,
  costReputation: number
): number {
  const avg = (costMoney + costTime + costEnergy + costReputation) / 4;
  return Math.round(avg * 10) / 10;
}

function computeWeightedScore(
  scores: DecisionInput["scores"],
  costLevel: number
): number {
  const totalWeight = Object.values(SCORE_WEIGHTS).reduce((a, b) => a + b, 0);

  const raw =
    scores.valueAlignment * SCORE_WEIGHTS.valueAlignment +
    scores.peaceImpact * SCORE_WEIGHTS.peaceImpact +
    scores.clarityOutcome * SCORE_WEIGHTS.clarityOutcome +
    scores.reversibility * SCORE_WEIGHTS.reversibility +
    scores.opportunityGain * SCORE_WEIGHTS.opportunityGain +
    (10 - scores.riskLevel) * SCORE_WEIGHTS.riskLevel +
    (10 - costLevel) * SCORE_WEIGHTS.costLevel +
    scores.regretTest * SCORE_WEIGHTS.regretTest;

  return Math.round((raw / totalWeight) * 10);
}

function detectRedFlags(input: DecisionInput): string[] {
  const flags: string[] = [];
  const isHighEmotion = HIGH_EMOTIONS.includes(
    input.emotionState as (typeof HIGH_EMOTIONS)[number]
  );

  if (input.decisionType === "ONE_WAY" && isHighEmotion) {
    flags.push(
      `Major: One-way decision made under strong emotion (${input.emotionState}). Pause recommended.`
    );
  }

  if (
    input.assumptions.trim().length > 0 &&
    input.factsKnown.trim().length === 0
  ) {
    flags.push(
      "You have assumptions but no verified facts. Validate before proceeding."
    );
  }

  if (input.proudIn1Year === "NO") {
    flags.push(
      "Major: You indicated you would NOT be proud of this decision in 1 year."
    );
  }

  if (input.scores.peaceImpact <= 3) {
    flags.push(
      "Low peace impact score — this decision may cause ongoing stress or inner conflict."
    );
  }

  if (input.costEnergy >= 8) {
    flags.push(
      "Very high energy cost. Consider whether you have the capacity for this right now."
    );
  }

  return flags;
}

function computeConfidence(input: DecisionInput): number {
  let confidence = 50;

  if (input.factsKnown.trim().length > 0) {
    confidence += 10;
  }

  if (
    input.assumptions.trim().length > 0 &&
    (input.counselorNotes || "").trim().length > 0
  ) {
    confidence += 10;
  }

  if (input.options.b.trim().length > 0 || input.options.c.trim().length > 0) {
    confidence += 10;
  }

  const isHighEmotion = HIGH_EMOTIONS.includes(
    input.emotionState as (typeof HIGH_EMOTIONS)[number]
  );
  if (isHighEmotion) {
    confidence -= 10;
  }

  if (input.decisionType === "ONE_WAY" && input.scores.reversibility <= 3) {
    confidence -= 10;
  }

  return Math.max(0, Math.min(100, confidence));
}

function determineVerdict(
  weightedScore: number,
  redFlags: string[]
): "DO" | "DONT" | "WAIT" | "TEST" {
  const hasMajorRedFlags = redFlags.some((f) =>
    f.toLowerCase().startsWith("major")
  );

  if (weightedScore >= 75 && !hasMajorRedFlags) return "DO";
  if (weightedScore >= 60 || (weightedScore >= 75 && hasMajorRedFlags))
    return "TEST";
  if (weightedScore >= 45) return "WAIT";
  return "DONT";
}

function generateCounselorNotes(
  input: DecisionInput,
  redFlags: string[]
): string {
  const notes: string[] = [];

  if (input.emotionState && input.emotionState !== "calm") {
    notes.push(
      `Your dominant emotional state is "${input.emotionState}". Decisions made under strong emotions often look different after 48 hours. Consider sleeping on it.`
    );
  }

  if (input.factsKnown.trim().length < 20) {
    notes.push(
      "Your known facts section is thin. The biggest missing proof is solid, verified data. Before committing, gather at least one more concrete data point."
    );
  }

  if (input.assumptions.trim().length > 0) {
    notes.push(
      "You've identified assumptions — good self-awareness. Now test the most critical one before proceeding."
    );
  }

  const smallestStep =
    input.options.a.trim() || input.options.b.trim() || input.options.c.trim();
  if (smallestStep) {
    notes.push(
      `Consider starting with the smallest possible step: "${smallestStep.substring(0, 80)}${smallestStep.length > 80 ? "..." : ""}"`
    );
  }

  if (redFlags.length > 0) {
    notes.push(
      `There ${redFlags.length === 1 ? "is" : "are"} ${redFlags.length} red flag${redFlags.length === 1 ? "" : "s"} to address before finalizing.`
    );
  }

  return notes.join("\n\n");
}

function generateNextSteps(
  _verdict: string,
  _input: DecisionInput
): Record<string, string[]> {
  const steps: Record<string, string[]> = {};

  steps["DO"] = [
    "Set a clear start date and commit publicly",
    "Identify the first 3 concrete actions",
    "Schedule a 30-day review checkpoint",
    "Inform key stakeholders of your decision",
  ];

  steps["DONT"] = [
    "Document why you chose not to proceed (future reference)",
    "Identify what would need to change for this to become viable",
    "Redirect energy to your highest-priority alternative",
    "Set a 90-day revisit reminder in case circumstances change",
  ];

  steps["WAIT"] = [
    "Set a specific revisit date (not indefinite delay)",
    "List exactly what information or conditions you're waiting for",
    "Take one small exploratory action in the meantime",
    "Check: are you waiting for clarity or avoiding discomfort?",
  ];

  steps["TEST"] = [
    "Define a small, reversible experiment (see experiment plan)",
    "Set a strict timebox and budget cap",
    "Identify 3 measurable success criteria",
    "Schedule a review date before the experiment ends",
  ];

  return steps;
}

function generateExperimentPlan(
  input: DecisionInput
): ExperimentPlan {
  const reviewDate = new Date();
  reviewDate.setDate(reviewDate.getDate() + 14);

  return {
    hypothesis: `If I proceed with "${input.title.substring(0, 50)}", then ${input.bestCase || "the expected positive outcome will materialize"}.`,
    timebox: "14 days",
    costCap: `Limit spend to ${Math.min(input.costMoney, 3)}/10 of originally estimated cost. Keep time investment under ${Math.min(input.costTime, 3)}/10.`,
    successMetrics: [
      input.likelyOutcome
        ? `Achieve early signal of: ${input.likelyOutcome.substring(0, 60)}`
        : "Positive early feedback from stakeholders",
      "No major blockers discovered within first week",
      "Energy and motivation remain stable (not draining)",
    ],
    killCriteria: `Stop immediately if: ${input.worstCase ? input.worstCase.substring(0, 80) : "costs exceed budget, energy drops severely, or a red flag materializes"}.`,
    reviewDate: reviewDate.toISOString().split("T")[0],
  };
}

export function evaluateDecision(input: DecisionInput): EvaluationResult {
  const costLevel = computeCostLevel(
    input.costMoney,
    input.costTime,
    input.costEnergy,
    input.costReputation
  );

  const weightedScore = computeWeightedScore(input.scores, costLevel);
  const redFlags = detectRedFlags(input);
  const verdict = determineVerdict(weightedScore, redFlags);
  const confidence = computeConfidence(input);
  const counselorNotes = generateCounselorNotes(input, redFlags);
  const nextSteps = generateNextSteps(verdict, input);
  const experimentPlan = verdict === "TEST" ? generateExperimentPlan(input) : null;

  return {
    weightedScore,
    verdict,
    confidence,
    redFlags,
    counselorNotes,
    nextSteps,
    experimentPlan,
    costLevel,
    scores: { ...input.scores, costLevel },
  };
}
