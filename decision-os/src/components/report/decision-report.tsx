"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  CATEGORY_LABELS,
  VERDICT_LABELS,
  VERDICT_COLORS,
  SCORE_WEIGHTS,
} from "@/lib/constants";
import type { Decision } from "@/generated/prisma/client";
import type { ExperimentPlan } from "@/lib/evaluate";

interface DecisionReportProps {
  decision: Decision;
}

export function DecisionReport({ decision }: DecisionReportProps) {
  const scores = JSON.parse(decision.scores as string) as Record<
    string,
    number
  >;
  const redFlags = JSON.parse(decision.redFlags as string) as string[];
  const nextSteps = JSON.parse(decision.nextSteps as string) as Record<
    string,
    string[]
  >;
  const reasonsFor = JSON.parse(decision.reasonsFor as string) as string[];
  const reasonsAgainst = JSON.parse(
    decision.reasonsAgainst as string
  ) as string[];
  const valuesTop3 = JSON.parse(decision.valuesTop3 as string) as string[];
  const options = JSON.parse(decision.options as string) as {
    a: string;
    b: string;
    c: string;
  };
  const experimentPlan = JSON.parse(
    decision.experimentPlan as string
  ) as ExperimentPlan | Record<string, never>;

  const verdictSteps = nextSteps[decision.verdict] || [];

  const scoreLabels: Record<string, string> = {
    valueAlignment: "Value Alignment",
    peaceImpact: "Peace of Mind",
    clarityOutcome: "Clarity of Outcome",
    reversibility: "Reversibility",
    opportunityGain: "Opportunity Gain",
    riskLevel: "Risk Level",
    costLevel: "Cost Level",
    regretTest: "Regret Test",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">
            {decision.title}
          </h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge>{CATEGORY_LABELS[decision.category]}</Badge>
            <Badge variant="secondary">
              {decision.decisionType === "ONE_WAY" ? "One-Way" : "Two-Way"}
            </Badge>
            {decision.status === "draft" && (
              <Badge variant="warning">Draft</Badge>
            )}
          </div>
        </div>
        <div
          className={`px-5 py-3 rounded-xl border-2 text-center ${VERDICT_COLORS[decision.verdict]}`}
        >
          <p className="text-xs uppercase tracking-wide font-medium opacity-70">
            Verdict
          </p>
          <p className="text-2xl font-bold">
            {VERDICT_LABELS[decision.verdict]}
          </p>
        </div>
      </div>

      {/* Score and Confidence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Weighted Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-stone-900">
              {decision.weightedScore}
              <span className="text-lg font-normal text-stone-400">/100</span>
            </div>
            <Progress
              value={decision.weightedScore}
              className="mt-3"
              barClassName={
                decision.weightedScore >= 75
                  ? "bg-emerald-500"
                  : decision.weightedScore >= 60
                    ? "bg-blue-500"
                    : decision.weightedScore >= 45
                      ? "bg-amber-500"
                      : "bg-red-500"
              }
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Confidence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-stone-900">
              {decision.confidence}
              <span className="text-lg font-normal text-stone-400">%</span>
            </div>
            <Progress value={decision.confidence} className="mt-3" />
          </CardContent>
        </Card>
      </div>

      {/* Score Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Score Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(SCORE_WEIGHTS).map(([key, weight]) => {
              const scoreValue = scores[key] ?? 0;
              const isReversed = key === "riskLevel" || key === "costLevel";
              const displayValue = isReversed ? 10 - scoreValue : scoreValue;
              const contribution = (displayValue * weight) / 100;

              return (
                <div key={key} className="flex items-center gap-3">
                  <span className="w-36 text-sm text-stone-600 shrink-0">
                    {scoreLabels[key] || key}
                  </span>
                  <div className="flex-1">
                    <Progress value={displayValue * 10} />
                  </div>
                  <span className="text-sm tabular-nums text-stone-500 w-12 text-right">
                    {scoreValue}/10
                  </span>
                  <span className="text-xs text-stone-400 w-16 text-right">
                    w:{weight} (+{contribution.toFixed(1)})
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Red Flags */}
      {redFlags.length > 0 && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-800">Red Flags</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {redFlags.map((flag, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm text-red-700 bg-red-50 rounded-lg p-3"
                >
                  <span className="shrink-0">&#x26A0;</span>
                  {flag}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Reasons For and Against */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-emerald-800">Reasons For</CardTitle>
          </CardHeader>
          <CardContent>
            {reasonsFor.length > 0 ? (
              <ul className="space-y-2">
                {reasonsFor.map((reason, i) => (
                  <li
                    key={i}
                    className="text-sm bg-emerald-50 border border-emerald-200 rounded-lg p-2"
                  >
                    {reason}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-stone-400">No reasons listed</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-800">Reasons Against</CardTitle>
          </CardHeader>
          <CardContent>
            {reasonsAgainst.length > 0 ? (
              <ul className="space-y-2">
                {reasonsAgainst.map((reason, i) => (
                  <li
                    key={i}
                    className="text-sm bg-red-50 border border-red-200 rounded-lg p-2"
                  >
                    {reason}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-stone-400">No reasons listed</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Outcomes */}
      <Card>
        <CardHeader>
          <CardTitle>Outcome Scenarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-emerald-50 rounded-lg p-4">
              <p className="text-xs font-semibold text-emerald-700 uppercase mb-1">
                Best Case
              </p>
              <p className="text-sm text-stone-700">
                {decision.bestCase || "Not specified"}
              </p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-xs font-semibold text-red-700 uppercase mb-1">
                Worst Case
              </p>
              <p className="text-sm text-stone-700">
                {decision.worstCase || "Not specified"}
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-xs font-semibold text-blue-700 uppercase mb-1">
                Most Likely
              </p>
              <p className="text-sm text-stone-700">
                {decision.likelyOutcome || "Not specified"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Values and Identity */}
      <Card>
        <CardHeader>
          <CardTitle>Values &amp; Identity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-xs font-semibold text-stone-500 uppercase mb-1">
              Top Values
            </p>
            <div className="flex flex-wrap gap-2">
              {valuesTop3.length > 0 ? (
                valuesTop3.map((v, i) => <Badge key={i}>{v}</Badge>)
              ) : (
                <span className="text-sm text-stone-400">None set</span>
              )}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-500 uppercase mb-1">
              Identity Match
            </p>
            <p className="text-sm text-stone-700">
              {decision.identityMatch || "Not specified"}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-500 uppercase mb-1">
              Proud in 1 Year?
            </p>
            <Badge
              variant={
                decision.proudIn1Year === "YES"
                  ? "success"
                  : decision.proudIn1Year === "NO"
                    ? "danger"
                    : "warning"
              }
            >
              {decision.proudIn1Year}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Options */}
      {(options.a || options.b || options.c) && (
        <Card>
          <CardHeader>
            <CardTitle>Options Considered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {options.a && (
                <div className="bg-stone-50 rounded-lg p-3">
                  <span className="text-xs font-semibold text-stone-500">
                    A:
                  </span>{" "}
                  <span className="text-sm">{options.a}</span>
                </div>
              )}
              {options.b && (
                <div className="bg-stone-50 rounded-lg p-3">
                  <span className="text-xs font-semibold text-stone-500">
                    B:
                  </span>{" "}
                  <span className="text-sm">{options.b}</span>
                </div>
              )}
              {options.c && (
                <div className="bg-stone-50 rounded-lg p-3">
                  <span className="text-xs font-semibold text-stone-500">
                    C:
                  </span>{" "}
                  <span className="text-sm">{options.c}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Counselor Notes */}
      {decision.counselorNotes && (
        <Card className="border-stone-300 bg-stone-50">
          <CardHeader>
            <CardTitle>Counselor Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm prose-stone max-w-none">
              {decision.counselorNotes.split("\n\n").map((note, i) => (
                <p key={i} className="text-sm text-stone-700 mb-3 last:mb-0">
                  {note}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Steps */}
      {verdictSteps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>
              Next Steps ({VERDICT_LABELS[decision.verdict]})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2">
              {verdictSteps.map((step, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm bg-stone-50 rounded-lg p-3"
                >
                  <span className="shrink-0 w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center text-xs font-medium text-stone-600">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}

      {/* Experiment Plan (for TEST verdict) */}
      {decision.verdict === "TEST" &&
        experimentPlan &&
        "hypothesis" in experimentPlan && (
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">
                Experiment Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-stone-500 uppercase">
                  Hypothesis
                </p>
                <p className="text-sm text-stone-700">
                  {experimentPlan.hypothesis}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-stone-500 uppercase">
                    Timebox
                  </p>
                  <p className="text-sm text-stone-700">
                    {experimentPlan.timebox}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-500 uppercase">
                    Review Date
                  </p>
                  <p className="text-sm text-stone-700">
                    {experimentPlan.reviewDate}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-stone-500 uppercase">
                  Cost Cap
                </p>
                <p className="text-sm text-stone-700">
                  {experimentPlan.costCap}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-stone-500 uppercase">
                  Success Metrics
                </p>
                <ol className="mt-1 space-y-1">
                  {experimentPlan.successMetrics?.map(
                    (metric: string, i: number) => (
                      <li key={i} className="text-sm text-stone-700 flex gap-2">
                        <span className="text-stone-400">{i + 1}.</span>
                        {metric}
                      </li>
                    )
                  )}
                </ol>
              </div>
              <div>
                <p className="text-xs font-semibold text-stone-500 uppercase">
                  Kill Criteria
                </p>
                <p className="text-sm text-stone-700">
                  {experimentPlan.killCriteria}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
    </div>
  );
}
