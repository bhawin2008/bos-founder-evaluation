"use client";

import { BarDataset, WeeklyData } from "../_data/types";

interface GroupedBarChartProps {
  title: string;
  categories: string[];
  datasets: BarDataset[];
}

function GroupedBarChart({ title, categories, datasets }: GroupedBarChartProps) {
  const allValues = datasets.flatMap((ds) => ds.values);
  const maxVal = Math.max(...allValues, 1);

  return (
    <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-6">
      <h3 className="text-base font-semibold mb-1.5 text-[#f0f0f5]">{title}</h3>
      <div className="flex gap-4 mb-4">
        <span className="flex items-center gap-1.5 text-[0.78rem] text-[#8888a0]">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#4a6cf7] inline-block" /> Dec 2025
        </span>
        <span className="flex items-center gap-1.5 text-[0.78rem] text-[#8888a0]">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#a855f7] inline-block" /> Jan 2026
        </span>
      </div>
      <div className="flex flex-col gap-3.5">
        {categories.map((cat, i) => (
          <div key={cat} className="flex items-center gap-3">
            <div className="w-[90px] min-w-[90px] text-[0.82rem] text-[#8888a0] text-right">
              {cat}
            </div>
            <div className="flex-1 flex flex-col gap-1">
              {datasets.map((ds, di) => {
                const val = ds.values[i];
                const pct = maxVal > 0 ? (val / maxVal) * 100 : 0;
                return (
                  <div
                    key={ds.label}
                    className="h-[26px] bg-[rgba(42,42,58,0.5)] rounded-md overflow-hidden relative"
                  >
                    <div
                      className={`h-full rounded-md flex items-center justify-end pr-2 min-w-[28px] transition-all duration-600 ${
                        di === 0
                          ? "bg-gradient-to-r from-[rgba(74,108,247,0.3)] to-[#4a6cf7]"
                          : "bg-gradient-to-r from-[rgba(168,85,247,0.3)] to-[#a855f7]"
                      }`}
                      style={{ width: `${pct}%` }}
                    >
                      <span className="text-[0.72rem] font-bold text-white">{val}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface WeeklyTimelineProps {
  decWeekly: WeeklyData;
  janWeekly: WeeklyData;
}

function WeeklyTimeline({ decWeekly, janWeekly }: WeeklyTimelineProps) {
  const allWeekly = [...decWeekly.weeks, ...janWeekly.weeks];
  const maxWeek = Math.max(...allWeekly, 1);
  const weekLabels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];

  return (
    <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-6 mb-6">
      <h3 className="text-base font-semibold mb-1.5 text-[#f0f0f5]">
        Weekly Task Completion Timeline
      </h3>
      <div className="flex gap-4 mb-4">
        <span className="flex items-center gap-1.5 text-[0.78rem] text-[#8888a0]">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#4a6cf7] inline-block" /> Dec 2025
        </span>
        <span className="flex items-center gap-1.5 text-[0.78rem] text-[#8888a0]">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#a855f7] inline-block" /> Jan 2026
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {/* December section */}
        <div className="mb-3">
          <div className="text-[0.82rem] font-semibold text-[#8888a0] mb-2 pl-20">
            {decWeekly.monthLabel}
          </div>
          {decWeekly.weeks.map((val, i) => {
            const pct = maxWeek > 0 ? (val / maxWeek) * 100 : 0;
            return (
              <div key={`dec-${i}`} className="flex items-center gap-3 mb-1">
                <div className="w-[68px] min-w-[68px] text-[0.75rem] text-[#8888a0] text-right">
                  {weekLabels[i]}
                </div>
                <div className="flex-1 h-[22px] bg-[rgba(42,42,58,0.5)] rounded-md overflow-hidden">
                  <div
                    className="h-full rounded-md flex items-center justify-end pr-2 min-w-[28px] transition-all duration-600 bg-gradient-to-r from-[rgba(74,108,247,0.3)] to-[#4a6cf7]"
                    style={{ width: `${pct}%` }}
                  >
                    <span className="text-[0.72rem] font-bold text-white">{val}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* January section */}
        <div className="mb-3">
          <div className="text-[0.82rem] font-semibold text-[#8888a0] mb-2 pl-20">
            {janWeekly.monthLabel}
          </div>
          {janWeekly.weeks.map((val, i) => {
            const pct = maxWeek > 0 ? (val / maxWeek) * 100 : 0;
            return (
              <div key={`jan-${i}`} className="flex items-center gap-3 mb-1">
                <div className="w-[68px] min-w-[68px] text-[0.75rem] text-[#8888a0] text-right">
                  {weekLabels[i]}
                </div>
                <div className="flex-1 h-[22px] bg-[rgba(42,42,58,0.5)] rounded-md overflow-hidden">
                  <div
                    className="h-full rounded-md flex items-center justify-end pr-2 min-w-[28px] transition-all duration-600 bg-gradient-to-r from-[rgba(168,85,247,0.3)] to-[#a855f7]"
                    style={{ width: `${pct}%` }}
                  >
                    <span className="text-[0.72rem] font-bold text-white">{val}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface MonthlyChartProps {
  statusDatasets: BarDataset[];
  priorityDatasets: BarDataset[];
  decWeekly: WeeklyData;
  janWeekly: WeeklyData;
}

export default function MonthlyChart({
  statusDatasets,
  priorityDatasets,
  decWeekly,
  janWeekly,
}: MonthlyChartProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-6 mb-6 max-md:grid-cols-1">
        <GroupedBarChart
          title="Tasks by Status"
          categories={["Completed", "In Progress", "Pending"]}
          datasets={statusDatasets}
        />
        <GroupedBarChart
          title="Tasks by Priority"
          categories={["High", "Medium", "Low"]}
          datasets={priorityDatasets}
        />
      </div>
      <WeeklyTimeline decWeekly={decWeekly} janWeekly={janWeekly} />
    </>
  );
}
