"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CATEGORIES,
  CATEGORY_LABELS,
  VERDICTS,
  VERDICT_LABELS,
  VERDICT_COLORS,
} from "@/lib/constants";
import { getDecisions } from "@/lib/actions";
import { Plus, Search } from "lucide-react";
import type { Decision } from "@/generated/prisma/client";

export default function DashboardPage() {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [verdict, setVerdict] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDecisions = useCallback(async () => {
    setLoading(true);
    const data = await getDecisions({
      search: search || undefined,
      category: category || undefined,
      verdict: verdict || undefined,
    });
    setDecisions(data);
    setLoading(false);
  }, [search, category, verdict]);

  useEffect(() => {
    const debounce = setTimeout(fetchDecisions, 300);
    return () => clearTimeout(debounce);
  }, [fetchDecisions]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Dashboard</h1>
          <p className="text-sm text-stone-500">
            {decisions.length} decision{decisions.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/decisions/new">
          <Button>
            <Plus className="w-4 h-4 mr-1" />
            New Decision
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <Input
            placeholder="Search decisions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="sm:w-44"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {CATEGORY_LABELS[cat]}
            </option>
          ))}
        </Select>
        <Select
          value={verdict}
          onChange={(e) => setVerdict(e.target.value)}
          className="sm:w-40"
        >
          <option value="">All Verdicts</option>
          {VERDICTS.map((v) => (
            <option key={v} value={v}>
              {VERDICT_LABELS[v]}
            </option>
          ))}
        </Select>
      </div>

      {/* Decision List */}
      {loading ? (
        <div className="text-center py-12 text-stone-400">Loading...</div>
      ) : decisions.length === 0 ? (
        <div className="text-center py-12 space-y-3">
          <p className="text-stone-400">No decisions found.</p>
          <Link href="/decisions/new">
            <Button variant="outline">Create your first decision</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {decisions.map((d) => (
            <Link
              key={d.id}
              href={`/decisions/${d.id}`}
              className="block bg-white rounded-xl border border-stone-200 p-4 hover:border-stone-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-medium text-stone-900 truncate">
                      {d.title}
                    </h3>
                    <Badge>{CATEGORY_LABELS[d.category]}</Badge>
                    {d.status === "draft" && (
                      <Badge variant="warning">Draft</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-stone-400">
                    <span>Score: {d.weightedScore}/100</span>
                    <span>Confidence: {d.confidence}%</span>
                    <span>
                      {d.decisionType === "ONE_WAY" ? "One-Way" : "Two-Way"}
                    </span>
                    <span>
                      {new Date(d.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                {d.verdict && (
                  <span
                    className={`shrink-0 px-3 py-1 rounded-lg text-xs font-semibold border ${VERDICT_COLORS[d.verdict]}`}
                  >
                    {VERDICT_LABELS[d.verdict]}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
