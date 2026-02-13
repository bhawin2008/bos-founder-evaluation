"use client";

import { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDecision } from "../../../_lib/actions";
import type { Decision } from "../../../_lib/storage";
import { DecisionWizard } from "../../../_components/wizard/decision-wizard";
import type { DecisionFormData } from "../../../_lib/schemas";

export default function EditDecisionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [decision, setDecision] = useState<Decision | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const d = getDecision(id);
    setDecision(d);
    setLoaded(true);
  }, [id]);

  if (!loaded) {
    return <div className="text-center py-12 text-stone-400">Loading...</div>;
  }

  if (!decision) {
    notFound();
  }

  const initialData: DecisionFormData & { id: string } = {
    id: decision.id,
    title: decision.title,
    category: decision.category as DecisionFormData["category"],
    decisionType: decision.decisionType as DecisionFormData["decisionType"],
    deadline: decision.deadline || "",
    urgencyNote: decision.urgencyNote,
    doNothing30Days: decision.doNothing30Days,
    emotionState: decision.emotionState as DecisionFormData["emotionState"],
    reasonsFor: JSON.parse(decision.reasonsFor),
    reasonsAgainst: JSON.parse(decision.reasonsAgainst),
    factsKnown: decision.factsKnown,
    assumptions: decision.assumptions,
    bestCase: decision.bestCase,
    worstCase: decision.worstCase,
    likelyOutcome: decision.likelyOutcome,
    costMoney: decision.costMoney,
    costTime: decision.costTime,
    costEnergy: decision.costEnergy,
    costReputation: decision.costReputation,
    options: JSON.parse(decision.options),
    valuesTop3: JSON.parse(decision.valuesTop3),
    identityMatch: decision.identityMatch,
    proudIn1Year: decision.proudIn1Year as DecisionFormData["proudIn1Year"],
    scores: (() => {
      const parsed = JSON.parse(decision.scores);
      return {
        clarityOutcome: parsed.clarityOutcome ?? 5,
        reversibility: parsed.reversibility ?? 5,
        valueAlignment: parsed.valueAlignment ?? 5,
        peaceImpact: parsed.peaceImpact ?? 5,
        opportunityGain: parsed.opportunityGain ?? 5,
        riskLevel: parsed.riskLevel ?? 5,
        regretTest: parsed.regretTest ?? 5,
      };
    })(),
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Edit Decision</h1>
          <p className="text-sm text-stone-500">{decision.title}</p>
        </div>
        <Link
          href={`/decision-os/decisions/${id}`}
          className="text-sm text-stone-500 hover:text-stone-900 transition-colors"
        >
          Cancel
        </Link>
      </div>
      <DecisionWizard initialData={initialData} editId={id} />
    </div>
  );
}
