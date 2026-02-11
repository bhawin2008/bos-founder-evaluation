export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { VERDICT_LABELS, VERDICT_COLORS, CATEGORY_LABELS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Plus } from "lucide-react";

export default async function HomePage() {
  const recentDecisions = await prisma.decision.findMany({
    orderBy: { updatedAt: "desc" },
    take: 5,
  });

  const totalCount = await prisma.decision.count();

  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-bold text-stone-900 tracking-tight">
          Think clearly. Decide wisely.
        </h1>
        <p className="text-lg text-stone-500 max-w-2xl mx-auto">
          DecisionOS processes your decisions through three layers — Clarity,
          Truth, and Alignment — to give you a structured verdict with
          confidence scoring.
        </p>
        <div className="flex items-center justify-center gap-4 pt-2">
          <Link
            href="/decisions/new"
            className="inline-flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-stone-800 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Decision
          </Link>
          {totalCount > 0 && (
            <Link
              href="/decisions"
              className="inline-flex items-center gap-2 border border-stone-300 text-stone-700 px-6 py-3 rounded-xl font-medium hover:bg-stone-50 transition-colors"
            >
              View Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      {/* How It Works */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            step: "1",
            title: "Clarity Layer",
            description:
              "Define what you're deciding, your emotional state, and reasons for and against.",
          },
          {
            step: "2",
            title: "Truth Layer",
            description:
              "Separate facts from assumptions. Assess costs, scenarios, and alternatives.",
          },
          {
            step: "3",
            title: "Alignment Layer",
            description:
              "Check value alignment, identity match, and score each decision dimension.",
          },
        ].map((item) => (
          <div
            key={item.step}
            className="bg-white rounded-xl border border-stone-200 p-6 space-y-3"
          >
            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-sm font-bold text-stone-600">
              {item.step}
            </div>
            <h3 className="font-semibold text-stone-900">{item.title}</h3>
            <p className="text-sm text-stone-500">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Recent Decisions */}
      {recentDecisions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-stone-900">
              Recent Decisions
            </h2>
            <Link
              href="/decisions"
              className="text-sm text-stone-500 hover:text-stone-900 transition-colors"
            >
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentDecisions.map((d) => (
              <Link
                key={d.id}
                href={`/decisions/${d.id}`}
                className="block bg-white rounded-xl border border-stone-200 p-4 hover:border-stone-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-stone-900">{d.title}</h3>
                    <Badge>{CATEGORY_LABELS[d.category]}</Badge>
                  </div>
                  {d.verdict && (
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border ${VERDICT_COLORS[d.verdict]}`}
                    >
                      {VERDICT_LABELS[d.verdict]}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs text-stone-400">
                  <span>Score: {d.weightedScore}/100</span>
                  <span>Confidence: {d.confidence}%</span>
                  <span>
                    {new Date(d.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
