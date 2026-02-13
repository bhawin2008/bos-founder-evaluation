"use client";

import { Venture, STAGE_LABELS, getOverallScore, formatDate } from "../_data/types";

interface DashboardViewProps {
  ventures: Venture[];
  onNewVenture: () => void;
}

export default function DashboardView({ ventures, onNewVenture }: DashboardViewProps) {
  const total = ventures.length;
  const active = ventures.filter((v) => v.stage !== "paused").length;
  const evaluated = ventures.filter((v) => Object.keys(v.scores).length > 0).length;

  let avgScore = 0;
  const scoredVentures = ventures.filter((v) => Object.keys(v.scores).length > 0);
  if (scoredVentures.length > 0) {
    const totalScore = scoredVentures.reduce((sum, v) => sum + getOverallScore(v), 0);
    avgScore = Math.round(totalScore / scoredVentures.length);
  }

  const stats = [
    { label: "Total Ventures", value: String(total), sub: "in portfolio" },
    { label: "Active", value: String(active), sub: "currently active" },
    { label: "Evaluated", value: String(evaluated), sub: "scored ventures" },
    { label: "Avg Score", value: `${avgScore}%`, sub: "across evaluated" },
  ];

  const sorted = [...ventures].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  const recent = sorted.slice(0, 5);

  return (
    <section>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-[#e8eaed]">Dashboard</h2>
        <button
          onClick={onNewVenture}
          className="px-4 py-2 rounded-lg bg-[#6c5ce7] text-white text-sm font-semibold hover:bg-[#7e70f0] transition-all"
        >
          + New Venture
        </button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-[#1c1f2e] border border-[#2a2e3f] rounded-xl p-5"
          >
            <div className="text-xs text-[#6b7185] uppercase tracking-wide">
              {s.label}
            </div>
            <div className="text-3xl font-bold mt-1 text-[#e8eaed]">{s.value}</div>
            <div className="text-xs text-[#9aa0b2] mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-lg text-[#9aa0b2] mb-4">Recent Activity</h3>
        {recent.length === 0 ? (
          <div className="text-center py-12 text-[#6b7185]">
            <p className="text-sm mt-2">
              No ventures yet. Create your first venture to get started.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {recent.map((v) => (
              <div
                key={v.id}
                className="bg-[#1c1f2e] border border-[#2a2e3f] rounded-lg px-4 py-3.5 flex justify-between items-center"
              >
                <span className="text-sm text-[#e8eaed]">
                  <strong>{v.name}</strong> &mdash; {STAGE_LABELS[v.stage]}
                </span>
                <span className="text-xs text-[#6b7185]">
                  {formatDate(v.updatedAt)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
