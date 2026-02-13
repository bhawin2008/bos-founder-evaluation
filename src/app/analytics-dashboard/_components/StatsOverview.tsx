"use client";

import { Task, MonthlyStats, TrendInfo } from "../_data/types";

interface StatsOverviewProps {
  decStats: MonthlyStats;
  janStats: MonthlyStats;
  trends: TrendInfo[];
}

function trendColorClass(direction: "up" | "down" | "neutral"): string {
  if (direction === "up") return "text-[#22c55e]";
  if (direction === "down") return "text-[#ef4444]";
  return "text-[#8888a0]";
}

export default function StatsOverview({ decStats, janStats, trends }: StatsOverviewProps) {
  return (
    <>
      {/* Summary comparison cards */}
      <div className="flex items-center gap-4 mb-6 max-md:flex-col">
        <div className="flex-1 bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-6">
          <div className="text-lg font-bold text-[#f0f0f5] mb-4">December 2025</div>
          <div className="flex gap-6">
            <div className="flex flex-col gap-0.5">
              <span className="text-3xl font-extrabold bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] bg-clip-text text-transparent">
                {decStats.total}
              </span>
              <span className="text-[0.75rem] text-[#8888a0] uppercase tracking-wider">
                Tasks Created
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-3xl font-extrabold bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] bg-clip-text text-transparent">
                {decStats.completed}
              </span>
              <span className="text-[0.75rem] text-[#8888a0] uppercase tracking-wider">
                Completed
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-3xl font-extrabold bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] bg-clip-text text-transparent">
                {decStats.rate}%
              </span>
              <span className="text-[0.75rem] text-[#8888a0] uppercase tracking-wider">
                Completion Rate
              </span>
            </div>
          </div>
        </div>

        <div className="text-base font-bold text-[#8888a0] min-w-[32px] text-center max-md:hidden">
          vs
        </div>

        <div className="flex-1 bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-6">
          <div className="text-lg font-bold text-[#f0f0f5] mb-4">January 2026</div>
          <div className="flex gap-6">
            <div className="flex flex-col gap-0.5">
              <span className="text-3xl font-extrabold bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] bg-clip-text text-transparent">
                {janStats.total}
              </span>
              <span className="text-[0.75rem] text-[#8888a0] uppercase tracking-wider">
                Tasks Created
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-3xl font-extrabold bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] bg-clip-text text-transparent">
                {janStats.completed}
              </span>
              <span className="text-[0.75rem] text-[#8888a0] uppercase tracking-wider">
                Completed
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-3xl font-extrabold bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] bg-clip-text text-transparent">
                {janStats.rate}%
              </span>
              <span className="text-[0.75rem] text-[#8888a0] uppercase tracking-wider">
                Completion Rate
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trend indicator cards */}
      <div className="grid grid-cols-4 gap-4 mb-6 max-md:grid-cols-2">
        {trends.map((trend) => (
          <div
            key={trend.label}
            className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-5 text-center"
          >
            <div className="text-[0.8rem] text-[#8888a0] mb-2 uppercase tracking-[0.3px]">
              {trend.label}
            </div>
            <div className={`text-xl font-bold ${trendColorClass(trend.direction)}`}>
              {trend.value}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
