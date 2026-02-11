"use client";

import { useFormContext } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_LABELS } from "@/lib/constants";
import { evaluateDecision, type DecisionInput } from "@/lib/evaluate";
import type { DecisionFormData } from "@/lib/schemas";

export function ReviewStep() {
  const { watch } = useFormContext<DecisionFormData>();
  const data = watch();

  const evalInput: DecisionInput = {
    title: data.title || "",
    category: data.category || "",
    decisionType: data.decisionType || "",
    emotionState: data.emotionState || "calm",
    factsKnown: data.factsKnown || "",
    assumptions: data.assumptions || "",
    reasonsFor: data.reasonsFor || [],
    reasonsAgainst: data.reasonsAgainst || [],
    bestCase: data.bestCase || "",
    worstCase: data.worstCase || "",
    likelyOutcome: data.likelyOutcome || "",
    costMoney: data.costMoney || 0,
    costTime: data.costTime || 0,
    costEnergy: data.costEnergy || 0,
    costReputation: data.costReputation || 0,
    valuesTop3: data.valuesTop3 || [],
    identityMatch: data.identityMatch || "",
    proudIn1Year: data.proudIn1Year || "UNSURE",
    options: data.options || { a: "", b: "", c: "" },
    scores: data.scores || {
      clarityOutcome: 5,
      reversibility: 5,
      valueAlignment: 5,
      peaceImpact: 5,
      opportunityGain: 5,
      riskLevel: 5,
      regretTest: 5,
    },
  };

  const result = evaluateDecision(evalInput);

  const verdictColors: Record<string, string> = {
    DO: "bg-emerald-100 text-emerald-800 border-emerald-300",
    DONT: "bg-red-100 text-red-800 border-red-300",
    WAIT: "bg-amber-100 text-amber-800 border-amber-300",
    TEST: "bg-blue-100 text-blue-800 border-blue-300",
  };

  const verdictLabels: Record<string, string> = {
    DO: "DO IT",
    DONT: "DON'T DO IT",
    WAIT: "WAIT",
    TEST: "TEST FIRST",
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-stone-900 mb-1">
          Review &amp; Preview
        </h2>
        <p className="text-sm text-stone-500">
          Preview your decision evaluation before finalizing.
        </p>
      </div>

      <div className="bg-stone-50 rounded-xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="font-semibold text-stone-900 text-lg">
              {data.title || "Untitled Decision"}
            </h3>
            <div className="flex gap-2 mt-1">
              <Badge>{CATEGORY_LABELS[data.category] || data.category}</Badge>
              <Badge variant="secondary">
                {data.decisionType === "ONE_WAY" ? "One-Way" : "Two-Way"}
              </Badge>
            </div>
          </div>
          <div
            className={`px-4 py-2 rounded-lg border-2 text-center font-bold text-lg ${verdictColors[result.verdict]}`}
          >
            {verdictLabels[result.verdict]}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-stone-200">
            <p className="text-xs text-stone-500 uppercase tracking-wide">
              Weighted Score
            </p>
            <p className="text-2xl font-bold text-stone-900">
              {result.weightedScore}
              <span className="text-sm font-normal text-stone-400">/100</span>
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-stone-200">
            <p className="text-xs text-stone-500 uppercase tracking-wide">
              Confidence
            </p>
            <p className="text-2xl font-bold text-stone-900">
              {result.confidence}%
            </p>
          </div>
        </div>

        {result.redFlags.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-red-800 mb-2">
              Red Flags
            </h4>
            <ul className="space-y-1">
              {result.redFlags.map((flag, i) => (
                <li key={i} className="text-sm text-red-700 flex gap-2">
                  <span className="shrink-0">&#x26A0;</span>
                  {flag}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h4 className="text-sm font-semibold text-stone-700 mb-2">
            Summary
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-stone-500">Reasons For:</span>{" "}
              {(data.reasonsFor || []).length}
            </div>
            <div>
              <span className="text-stone-500">Reasons Against:</span>{" "}
              {(data.reasonsAgainst || []).length}
            </div>
            <div>
              <span className="text-stone-500">Emotion:</span>{" "}
              {data.emotionState}
            </div>
            <div>
              <span className="text-stone-500">Proud in 1yr:</span>{" "}
              {data.proudIn1Year}
            </div>
            <div>
              <span className="text-stone-500">Cost Level:</span>{" "}
              {result.costLevel.toFixed(1)}/10
            </div>
            <div>
              <span className="text-stone-500">Values:</span>{" "}
              {(data.valuesTop3 || []).join(", ") || "None set"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
