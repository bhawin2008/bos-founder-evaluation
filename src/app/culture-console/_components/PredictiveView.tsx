"use client";

import {
  AlertTriangle,
  TrendingUp,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import type { AppData } from "../_data/types";
import { sampleInsights } from "../_data/sampleData";

interface PredictiveViewProps {
  data: AppData;
}

export default function PredictiveView({ data }: PredictiveViewProps) {
  const categoryIcons: Record<string, React.ElementType> = {
    risk: AlertTriangle,
    trend: TrendingUp,
    opportunity: Lightbulb,
  };

  const categoryColors: Record<string, string> = {
    risk: "bg-[rgba(239,68,68,0.15)] text-[#ef4444] border-[rgba(239,68,68,0.3)]",
    trend:
      "bg-[rgba(34,197,94,0.15)] text-[#22c55e] border-[rgba(34,197,94,0.3)]",
    opportunity:
      "bg-[rgba(74,108,247,0.15)] text-[#4a6cf7] border-[rgba(74,108,247,0.3)]",
  };

  const impactColors: Record<string, string> = {
    high: "bg-[rgba(239,68,68,0.15)] text-[#ef4444]",
    medium: "bg-[rgba(234,179,8,0.15)] text-[#eab308]",
    low: "bg-[rgba(136,136,160,0.15)] text-[#8888a0]",
  };

  return (
    <div className="animate-[fadeIn_0.3s_ease]">
      <div className="flex justify-between items-center mb-7">
        <div>
          <h2 className="text-[1.6rem] font-bold text-[#f0f0f5]">
            Predictive Insights
          </h2>
          <p className="text-[#8888a0] text-sm mt-1">
            AI-powered predictions based on GOR framework signals
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-8 max-md:grid-cols-1">
        {(["risk", "trend", "opportunity"] as const).map((cat) => {
          const count = sampleInsights.filter(
            (i) => i.category === cat
          ).length;
          const Icon = categoryIcons[cat];
          return (
            <div
              key={cat}
              className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-5 flex items-center gap-4"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${categoryColors[cat]}`}
              >
                <Icon size={22} />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#f0f0f5]">
                  {count}
                </div>
                <div className="text-[0.78rem] text-[#8888a0] capitalize">
                  {cat === "risk"
                    ? "Risks Detected"
                    : cat === "trend"
                      ? "Trends Identified"
                      : "Opportunities Found"}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Insights List */}
      <div className="flex flex-col gap-4">
        {sampleInsights.map((insight) => {
          const Icon = categoryIcons[insight.category];
          const affectedMembers = insight.membersAffected
            .map((id) => data.members.find((m) => m.id === id)?.name)
            .filter(Boolean);
          return (
            <div
              key={insight.id}
              className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-6 transition-colors duration-200 hover:border-[#3a3a4a]"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 min-w-[40px] rounded-xl flex items-center justify-center mt-0.5 ${categoryColors[insight.category]}`}
                >
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h4 className="text-[0.95rem] font-semibold text-[#f0f0f5]">
                      {insight.title}
                    </h4>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-md text-[0.72rem] font-semibold uppercase tracking-wide ${impactColors[insight.impact]}`}
                    >
                      {insight.impact} impact
                    </span>
                    <span className="text-[0.72rem] text-[#8888a0]">
                      {insight.confidence}% confidence
                    </span>
                  </div>
                  <p className="text-[0.88rem] text-[#8888a0] leading-relaxed mb-3">
                    {insight.description}
                  </p>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="text-xs text-[#8888a0]">Affects:</span>
                    {affectedMembers.map((name) => (
                      <span
                        key={name}
                        className="inline-block px-2 py-0.5 rounded-md text-xs bg-[rgba(74,108,247,0.1)] text-[#4a6cf7]"
                      >
                        {name}
                      </span>
                    ))}
                    <span className="text-xs text-[#8888a0] ml-2">
                      Timeframe: {insight.timeframe}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-[rgba(74,108,247,0.08)] border border-[rgba(74,108,247,0.15)] rounded-lg px-4 py-3">
                    <ArrowRight
                      size={14}
                      className="text-[#4a6cf7] min-w-[14px]"
                    />
                    <span className="text-sm text-[#f0f0f5]">
                      {insight.suggestedAction}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
