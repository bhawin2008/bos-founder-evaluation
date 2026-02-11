"use server";

import { prisma } from "./prisma";
import { evaluateDecision, type DecisionInput } from "./evaluate";
import type { DecisionFormData, CalmCheckData } from "./schemas";
import { revalidatePath } from "next/cache";

export async function getDecisions(filters?: {
  category?: string;
  verdict?: string;
  search?: string;
}) {
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

  const decisions = await prisma.decision.findMany({
    where,
    orderBy: { updatedAt: "desc" },
  });

  return decisions;
}

export async function getDecision(id: string) {
  return prisma.decision.findUnique({ where: { id } });
}

export async function createDecision(
  data: DecisionFormData,
  calmCheck?: CalmCheckData
) {
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

  const decision = await prisma.decision.create({
    data: {
      title: data.title,
      category: data.category,
      decisionType: data.decisionType,
      deadline: data.deadline ? new Date(data.deadline) : null,
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
    },
  });

  revalidatePath("/");
  revalidatePath("/decisions");
  return decision;
}

export async function updateDecision(
  id: string,
  data: DecisionFormData,
  calmCheck?: CalmCheckData
) {
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

  const decision = await prisma.decision.update({
    where: { id },
    data: {
      title: data.title,
      category: data.category,
      decisionType: data.decisionType,
      deadline: data.deadline ? new Date(data.deadline) : null,
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
    },
  });

  revalidatePath("/");
  revalidatePath("/decisions");
  revalidatePath(`/decisions/${id}`);
  return decision;
}

export async function deleteDecision(id: string) {
  await prisma.decision.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/decisions");
}
