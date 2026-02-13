import { storage, type Decision } from "./storage";
import { evaluateDecision, type DecisionInput } from "./evaluate";
import type { DecisionFormData, CalmCheckData } from "./schemas";

export type { Decision };

export function getDecisions(filters?: {
  category?: string;
  verdict?: string;
  search?: string;
}): Decision[] {
  const where: Record<string, unknown> = {};

  if (filters?.category) {
    where.category = filters.category;
  }
  if (filters?.verdict) {
    where.verdict = filters.verdict;
  }
  if (filters?.search) {
    where.title = { contains: filters.search };
  }

  return storage.findMany({
    where,
    orderBy: { updatedAt: "desc" },
  });
}

export function getDecision(id: string): Decision | null {
  return storage.findUnique(id);
}

export function getRecentDecisions(take: number = 5): Decision[] {
  return storage.findMany({
    orderBy: { updatedAt: "desc" },
    take,
  });
}

export function getTotalCount(): number {
  return storage.count();
}

export function createDecision(
  data: DecisionFormData,
  calmCheck?: CalmCheckData
): Decision {
  const isCalmCheckFailed =
    calmCheck &&
    (calmCheck.hungry || calmCheck.tired || calmCheck.angry || calmCheck.lonely);

  const evalInput: DecisionInput = {
    title: data.title,
    category: data.category,
    decisionType: data.decisionType,
    emotionState: data.emotionState,
    factsKnown: data.factsKnown || "",
    assumptions: data.assumptions || "",
    reasonsFor: data.reasonsFor,
    reasonsAgainst: data.reasonsAgainst,
    bestCase: data.bestCase || "",
    worstCase: data.worstCase || "",
    likelyOutcome: data.likelyOutcome || "",
    costMoney: data.costMoney,
    costTime: data.costTime,
    costEnergy: data.costEnergy,
    costReputation: data.costReputation,
    valuesTop3: data.valuesTop3,
    identityMatch: data.identityMatch || "",
    proudIn1Year: data.proudIn1Year,
    options: data.options,
    scores: data.scores,
  };

  const evaluation = evaluateDecision(evalInput);

  const finalVerdict = isCalmCheckFailed ? "WAIT" : evaluation.verdict;
  const finalNotes = isCalmCheckFailed
    ? evaluation.counselorNotes +
      "\n\nCalm Check triggered: You reported feeling " +
      [
        calmCheck?.hungry && "hungry",
        calmCheck?.tired && "tired",
        calmCheck?.angry && "angry",
        calmCheck?.lonely && "lonely",
      ]
        .filter(Boolean)
        .join(", ") +
      ". It's recommended to wait before finalizing this decision."
    : evaluation.counselorNotes;

  const decision = storage.create({
    title: data.title,
    category: data.category,
    decisionType: data.decisionType,
    deadline: data.deadline || null,
    urgencyNote: data.urgencyNote || "",
    doNothing30Days: data.doNothing30Days || "",
    emotionState: data.emotionState,
    reasonsFor: JSON.stringify(data.reasonsFor),
    reasonsAgainst: JSON.stringify(data.reasonsAgainst),
    factsKnown: data.factsKnown || "",
    assumptions: data.assumptions || "",
    bestCase: data.bestCase || "",
    worstCase: data.worstCase || "",
    likelyOutcome: data.likelyOutcome || "",
    costMoney: data.costMoney,
    costTime: data.costTime,
    costEnergy: data.costEnergy,
    costReputation: data.costReputation,
    valuesTop3: JSON.stringify(data.valuesTop3),
    identityMatch: data.identityMatch || "",
    proudIn1Year: data.proudIn1Year,
    options: JSON.stringify(data.options),
    scores: JSON.stringify({ ...data.scores, costLevel: evaluation.costLevel }),
    weightedScore: evaluation.weightedScore,
    verdict: finalVerdict,
    confidence: evaluation.confidence,
    redFlags: JSON.stringify(evaluation.redFlags),
    counselorNotes: finalNotes,
    nextSteps: JSON.stringify(evaluation.nextSteps),
    experimentPlan: JSON.stringify(evaluation.experimentPlan || {}),
    status: isCalmCheckFailed ? "draft" : "final",
    calmCheck: JSON.stringify(calmCheck || {}),
  });

  return decision;
}

export function updateDecision(
  id: string,
  data: DecisionFormData,
  calmCheck?: CalmCheckData
): Decision {
  const isCalmCheckFailed =
    calmCheck &&
    (calmCheck.hungry || calmCheck.tired || calmCheck.angry || calmCheck.lonely);

  const evalInput: DecisionInput = {
    title: data.title,
    category: data.category,
    decisionType: data.decisionType,
    emotionState: data.emotionState,
    factsKnown: data.factsKnown || "",
    assumptions: data.assumptions || "",
    reasonsFor: data.reasonsFor,
    reasonsAgainst: data.reasonsAgainst,
    bestCase: data.bestCase || "",
    worstCase: data.worstCase || "",
    likelyOutcome: data.likelyOutcome || "",
    costMoney: data.costMoney,
    costTime: data.costTime,
    costEnergy: data.costEnergy,
    costReputation: data.costReputation,
    valuesTop3: data.valuesTop3,
    identityMatch: data.identityMatch || "",
    proudIn1Year: data.proudIn1Year,
    options: data.options,
    scores: data.scores,
  };

  const evaluation = evaluateDecision(evalInput);

  const finalVerdict = isCalmCheckFailed ? "WAIT" : evaluation.verdict;
  const finalNotes = isCalmCheckFailed
    ? evaluation.counselorNotes +
      "\n\nCalm Check triggered: You reported feeling " +
      [
        calmCheck?.hungry && "hungry",
        calmCheck?.tired && "tired",
        calmCheck?.angry && "angry",
        calmCheck?.lonely && "lonely",
      ]
        .filter(Boolean)
        .join(", ") +
      ". It's recommended to wait before finalizing this decision."
    : evaluation.counselorNotes;

  const decision = storage.update(id, {
    title: data.title,
    category: data.category,
    decisionType: data.decisionType,
    deadline: data.deadline || null,
    urgencyNote: data.urgencyNote || "",
    doNothing30Days: data.doNothing30Days || "",
    emotionState: data.emotionState,
    reasonsFor: JSON.stringify(data.reasonsFor),
    reasonsAgainst: JSON.stringify(data.reasonsAgainst),
    factsKnown: data.factsKnown || "",
    assumptions: data.assumptions || "",
    bestCase: data.bestCase || "",
    worstCase: data.worstCase || "",
    likelyOutcome: data.likelyOutcome || "",
    costMoney: data.costMoney,
    costTime: data.costTime,
    costEnergy: data.costEnergy,
    costReputation: data.costReputation,
    valuesTop3: JSON.stringify(data.valuesTop3),
    identityMatch: data.identityMatch || "",
    proudIn1Year: data.proudIn1Year,
    options: JSON.stringify(data.options),
    scores: JSON.stringify({ ...data.scores, costLevel: evaluation.costLevel }),
    weightedScore: evaluation.weightedScore,
    verdict: finalVerdict,
    confidence: evaluation.confidence,
    redFlags: JSON.stringify(evaluation.redFlags),
    counselorNotes: finalNotes,
    nextSteps: JSON.stringify(evaluation.nextSteps),
    experimentPlan: JSON.stringify(evaluation.experimentPlan || {}),
    status: isCalmCheckFailed ? "draft" : "final",
    calmCheck: JSON.stringify(calmCheck || {}),
  });

  if (!decision) {
    throw new Error(`Decision with id ${id} not found`);
  }

  return decision;
}

export function deleteDecision(id: string): void {
  storage.delete(id);
}
