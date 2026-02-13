"use client";

import { useMemo } from "react";
import type { AppData, Task } from "../_data/types";
import {
  getInitials,
  getRoleColor,
  avatarColorMap,
  roleBadgeColorMap,
} from "./shared";

interface ReportsViewProps {
  data: AppData;
}

function getMonthTasks(tasks: Task[], year: number, month: number): Task[] {
  return tasks.filter((t) => {
    const d = new Date(t.createdAt);
    return d.getFullYear() === year && d.getMonth() === month;
  });
}

function getCompletedInMonth(tasks: Task[]): Task[] {
  return tasks.filter((t) => t.status === "completed");
}

function getWeeklyCompletions(
  tasks: Task[],
  year: number,
  month: number
): number[] {
  const weeks = [0, 0, 0, 0, 0];
  tasks.forEach((t) => {
    if (t.status === "completed" && t.completedAt) {
      const d = new Date(t.completedAt);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const weekNum = Math.min(Math.floor((d.getDate() - 1) / 7), 4);
        weeks[weekNum]++;
      }
    }
  });
  return weeks;
}

interface BarChartProps {
  categories: string[];
  datasets: { label: string; values: number[] }[];
}

function GroupedBarChart({ categories, datasets }: BarChartProps) {
  const allValues = datasets.flatMap((ds) => ds.values);
  const maxVal = Math.max(...allValues, 1);

  return (
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
                  key={di}
                  className="h-[26px] bg-[rgba(42,42,58,0.5)] rounded-md overflow-hidden relative"
                >
                  <div
                    className={`h-full rounded-md flex items-center justify-end pr-2 min-w-[28px] transition-all duration-[600ms] ${
                      di === 0
                        ? "bg-gradient-to-r from-[rgba(74,108,247,0.3)] to-[#4a6cf7]"
                        : "bg-gradient-to-r from-[rgba(168,85,247,0.3)] to-[#a855f7]"
                    }`}
                    style={{ width: `${pct}%` }}
                  >
                    <span className="text-[0.72rem] font-bold text-white">
                      {val}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ReportsView({ data }: ReportsViewProps) {
  const analytics = useMemo(() => {
    const decTasks = getMonthTasks(data.tasks, 2025, 11);
    const janTasks = getMonthTasks(data.tasks, 2026, 0);
    const decCompleted = getCompletedInMonth(decTasks);
    const janCompleted = getCompletedInMonth(janTasks);

    const decRate =
      decTasks.length > 0
        ? Math.round((decCompleted.length / decTasks.length) * 100)
        : 0;
    const janRate =
      janTasks.length > 0
        ? Math.round((janCompleted.length / janTasks.length) * 100)
        : 0;

    const volumeChange = janTasks.length - decTasks.length;
    const rateChange = janRate - decRate;
    const decHigh = decTasks.filter((t) => t.priority === "high").length;
    const janHigh = janTasks.filter((t) => t.priority === "high").length;
    const highChange = janHigh - decHigh;

    const activeMembers = data.members.filter(
      (m) => m.status === "active"
    ).length;
    const decAvg =
      activeMembers > 0 ? (decTasks.length / activeMembers).toFixed(1) : "0";
    const janAvg =
      activeMembers > 0 ? (janTasks.length / activeMembers).toFixed(1) : "0";

    const decWeekly = getWeeklyCompletions(data.tasks, 2025, 11);
    const janWeekly = getWeeklyCompletions(data.tasks, 2026, 0);
    const allWeekly = [...decWeekly, ...janWeekly];
    const maxWeek = Math.max(...allWeekly, 1);

    return {
      decTasks,
      janTasks,
      decCompleted,
      janCompleted,
      decRate,
      janRate,
      volumeChange,
      rateChange,
      highChange,
      decAvg,
      janAvg,
      decWeekly,
      janWeekly,
      maxWeek,
    };
  }, [data.tasks, data.members]);

  const {
    decTasks,
    janTasks,
    decCompleted,
    janCompleted,
    decRate,
    janRate,
    volumeChange,
    rateChange,
    highChange,
    decAvg,
    janAvg,
    decWeekly,
    janWeekly,
    maxWeek,
  } = analytics;

  function trendClass(val: number): string {
    if (val > 0) return "text-[#22c55e]";
    if (val < 0) return "text-[#ef4444]";
    return "text-[#8888a0]";
  }

  const weekLabels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];

  return (
    <div className="animate-[fadeIn_0.3s_ease]">
      <div className="flex justify-between items-center mb-7">
        <div>
          <h2 className="text-[1.6rem] font-bold text-[#f0f0f5]">Reports</h2>
          <p className="text-[#8888a0] text-sm mt-1">
            Month-over-month team performance trends
          </p>
        </div>
      </div>

      {/* Comparison Cards */}
      <div className="flex items-center gap-4 mb-6 max-md:flex-col">
        <div className="flex-1 bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-6">
          <div className="text-[1.1rem] font-bold text-[#f0f0f5] mb-4">
            December 2025
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col gap-0.5">
              <span className="text-[1.8rem] font-extrabold bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] bg-clip-text text-transparent">
                {decTasks.length}
              </span>
              <span className="text-[0.75rem] text-[#8888a0] uppercase tracking-wide">
                Tasks Created
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[1.8rem] font-extrabold bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] bg-clip-text text-transparent">
                {decCompleted.length}
              </span>
              <span className="text-[0.75rem] text-[#8888a0] uppercase tracking-wide">
                Completed
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[1.8rem] font-extrabold bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] bg-clip-text text-transparent">
                {decRate}%
              </span>
              <span className="text-[0.75rem] text-[#8888a0] uppercase tracking-wide">
                Completion Rate
              </span>
            </div>
          </div>
        </div>
        <div className="text-base font-bold text-[#8888a0] min-w-[32px] text-center max-md:hidden">
          vs
        </div>
        <div className="flex-1 bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-6">
          <div className="text-[1.1rem] font-bold text-[#f0f0f5] mb-4">
            January 2026
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col gap-0.5">
              <span className="text-[1.8rem] font-extrabold bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] bg-clip-text text-transparent">
                {janTasks.length}
              </span>
              <span className="text-[0.75rem] text-[#8888a0] uppercase tracking-wide">
                Tasks Created
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[1.8rem] font-extrabold bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] bg-clip-text text-transparent">
                {janCompleted.length}
              </span>
              <span className="text-[0.75rem] text-[#8888a0] uppercase tracking-wide">
                Completed
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[1.8rem] font-extrabold bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] bg-clip-text text-transparent">
                {janRate}%
              </span>
              <span className="text-[0.75rem] text-[#8888a0] uppercase tracking-wide">
                Completion Rate
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trend Indicators */}
      <div className="grid grid-cols-4 gap-4 mb-6 max-md:grid-cols-2">
        <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-5 text-center">
          <div className="text-[0.8rem] text-[#8888a0] mb-2 uppercase tracking-wide">
            Task Volume Trend
          </div>
          <div className={`text-[1.3rem] font-bold ${trendClass(volumeChange)}`}>
            {volumeChange > 0 ? "+" : ""}
            {volumeChange} tasks
          </div>
        </div>
        <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-5 text-center">
          <div className="text-[0.8rem] text-[#8888a0] mb-2 uppercase tracking-wide">
            Completion Rate Trend
          </div>
          <div className={`text-[1.3rem] font-bold ${trendClass(rateChange)}`}>
            {rateChange > 0 ? "+" : ""}
            {rateChange}%
          </div>
        </div>
        <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-5 text-center">
          <div className="text-[0.8rem] text-[#8888a0] mb-2 uppercase tracking-wide">
            High Priority Tasks Trend
          </div>
          <div className={`text-[1.3rem] font-bold ${trendClass(highChange)}`}>
            {highChange > 0 ? "+" : ""}
            {highChange} tasks
          </div>
        </div>
        <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-5 text-center">
          <div className="text-[0.8rem] text-[#8888a0] mb-2 uppercase tracking-wide">
            Avg Tasks per Member
          </div>
          <div
            className={`text-[1.3rem] font-bold ${trendClass(
              parseFloat(janAvg) - parseFloat(decAvg)
            )}`}
          >
            {decAvg} &rarr; {janAvg}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-6 max-md:grid-cols-1">
        <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-6">
          <h3 className="text-base font-semibold text-[#f0f0f5] mb-1.5">
            Tasks by Status
          </h3>
          <div className="flex gap-4 mb-4">
            <span className="flex items-center gap-1.5 text-[0.78rem] text-[#8888a0]">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#4a6cf7]" /> Dec 2025
            </span>
            <span className="flex items-center gap-1.5 text-[0.78rem] text-[#8888a0]">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#a855f7]" /> Jan 2026
            </span>
          </div>
          <GroupedBarChart
            categories={["Completed", "In Progress", "Pending"]}
            datasets={[
              {
                label: "Dec",
                values: [
                  decTasks.filter((t) => t.status === "completed").length,
                  decTasks.filter((t) => t.status === "in-progress").length,
                  decTasks.filter((t) => t.status === "pending").length,
                ],
              },
              {
                label: "Jan",
                values: [
                  janTasks.filter((t) => t.status === "completed").length,
                  janTasks.filter((t) => t.status === "in-progress").length,
                  janTasks.filter((t) => t.status === "pending").length,
                ],
              },
            ]}
          />
        </div>
        <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-6">
          <h3 className="text-base font-semibold text-[#f0f0f5] mb-1.5">
            Tasks by Priority
          </h3>
          <div className="flex gap-4 mb-4">
            <span className="flex items-center gap-1.5 text-[0.78rem] text-[#8888a0]">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#4a6cf7]" /> Dec 2025
            </span>
            <span className="flex items-center gap-1.5 text-[0.78rem] text-[#8888a0]">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#a855f7]" /> Jan 2026
            </span>
          </div>
          <GroupedBarChart
            categories={["High", "Medium", "Low"]}
            datasets={[
              {
                label: "Dec",
                values: [
                  decTasks.filter((t) => t.priority === "high").length,
                  decTasks.filter((t) => t.priority === "medium").length,
                  decTasks.filter((t) => t.priority === "low").length,
                ],
              },
              {
                label: "Jan",
                values: [
                  janTasks.filter((t) => t.priority === "high").length,
                  janTasks.filter((t) => t.priority === "medium").length,
                  janTasks.filter((t) => t.priority === "low").length,
                ],
              },
            ]}
          />
        </div>
      </div>

      {/* Member Performance Table */}
      <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-6 mb-6">
        <h3 className="text-base font-semibold text-[#f0f0f5] mb-4">
          Member Performance - Month over Month
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[0.88rem]">
            <thead>
              <tr>
                {[
                  "Member",
                  "Role",
                  "Dec Tasks",
                  "Dec Completed",
                  "Jan Tasks",
                  "Jan Completed",
                  "Trend",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-3 py-2.5 text-[0.78rem] font-semibold text-[#8888a0] uppercase tracking-wide border-b border-[#2a2a3a]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.members.map((member) => {
                const role = data.roles.find((r) => r.id === member.roleId);
                const color = getRoleColor(role);
                const decMemberTasks = decTasks.filter(
                  (t) => t.assigneeId === member.id
                );
                const decMemberCompleted = decMemberTasks.filter(
                  (t) => t.status === "completed"
                );
                const janMemberTasks = janTasks.filter(
                  (t) => t.assigneeId === member.id
                );
                const janMemberCompleted = janMemberTasks.filter(
                  (t) => t.status === "completed"
                );
                const diff =
                  janMemberCompleted.length - decMemberCompleted.length;
                const trendText =
                  diff > 0
                    ? `+${diff} more`
                    : diff < 0
                      ? `${diff} fewer`
                      : "Same";
                return (
                  <tr
                    key={member.id}
                    className="hover:bg-[#1a1a26] border-b border-[#2a2a3a] last:border-b-0"
                  >
                    <td className="px-3 py-3 text-[#f0f0f5]">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <div
                          className={`w-8 h-8 min-w-[32px] rounded-lg flex items-center justify-center text-[0.7rem] font-bold ${avatarColorMap[color]}`}
                        >
                          {getInitials(member.name)}
                        </div>
                        {member.name}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-lg text-[0.78rem] font-semibold ${roleBadgeColorMap[color]}`}
                      >
                        {role ? role.name : "None"}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-[#f0f0f5]">
                      {decMemberTasks.length}
                    </td>
                    <td className="px-3 py-3 text-[#f0f0f5]">
                      {decMemberCompleted.length}
                    </td>
                    <td className="px-3 py-3 text-[#f0f0f5]">
                      {janMemberTasks.length}
                    </td>
                    <td className="px-3 py-3 text-[#f0f0f5]">
                      {janMemberCompleted.length}
                    </td>
                    <td className="px-3 py-3">
                      <span className={trendClass(diff)}>{trendText}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Weekly Timeline */}
      <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-6">
        <h3 className="text-base font-semibold text-[#f0f0f5] mb-1.5">
          Weekly Task Completion Timeline
        </h3>
        <div className="flex gap-4 mb-4">
          <span className="flex items-center gap-1.5 text-[0.78rem] text-[#8888a0]">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#4a6cf7]" /> Dec 2025
          </span>
          <span className="flex items-center gap-1.5 text-[0.78rem] text-[#8888a0]">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#a855f7]" /> Jan 2026
          </span>
        </div>

        {/* December */}
        <div className="mb-3">
          <div className="text-[0.82rem] font-semibold text-[#8888a0] mb-2 pl-20">
            December 2025
          </div>
          {decWeekly.map((val, i) => (
            <div key={`dec-${i}`} className="flex items-center gap-3 mb-1">
              <div className="w-[68px] min-w-[68px] text-[0.75rem] text-[#8888a0] text-right">
                {weekLabels[i]}
              </div>
              <div className="flex-1 h-[22px] bg-[rgba(42,42,58,0.5)] rounded-md overflow-hidden">
                <div
                  className="h-full rounded-md flex items-center justify-end pr-2 min-w-[28px] transition-all duration-[600ms] bg-gradient-to-r from-[rgba(74,108,247,0.3)] to-[#4a6cf7]"
                  style={{
                    width: `${maxWeek > 0 ? (val / maxWeek) * 100 : 0}%`,
                  }}
                >
                  <span className="text-[0.72rem] font-bold text-white">
                    {val}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* January */}
        <div>
          <div className="text-[0.82rem] font-semibold text-[#8888a0] mb-2 pl-20">
            January 2026
          </div>
          {janWeekly.map((val, i) => (
            <div key={`jan-${i}`} className="flex items-center gap-3 mb-1">
              <div className="w-[68px] min-w-[68px] text-[0.75rem] text-[#8888a0] text-right">
                {weekLabels[i]}
              </div>
              <div className="flex-1 h-[22px] bg-[rgba(42,42,58,0.5)] rounded-md overflow-hidden">
                <div
                  className="h-full rounded-md flex items-center justify-end pr-2 min-w-[28px] transition-all duration-[600ms] bg-gradient-to-r from-[rgba(168,85,247,0.3)] to-[#a855f7]"
                  style={{
                    width: `${maxWeek > 0 ? (val / maxWeek) * 100 : 0}%`,
                  }}
                >
                  <span className="text-[0.72rem] font-bold text-white">
                    {val}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
