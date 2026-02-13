"use client";

import { MemberPerformanceRow } from "../_data/types";
import { getInitials } from "../_data/sampleData";

const avatarBgMap: Record<string, string> = {
  blue: "bg-[rgba(74,108,247,0.3)] text-[#4a6cf7]",
  green: "bg-[rgba(34,197,94,0.3)] text-[#22c55e]",
  yellow: "bg-[rgba(234,179,8,0.3)] text-[#eab308]",
  red: "bg-[rgba(239,68,68,0.3)] text-[#ef4444]",
  purple: "bg-[rgba(168,85,247,0.3)] text-[#a855f7]",
};

const roleBadgeMap: Record<string, string> = {
  blue: "bg-[rgba(74,108,247,0.15)] text-[#4a6cf7]",
  green: "bg-[rgba(34,197,94,0.15)] text-[#22c55e]",
  yellow: "bg-[rgba(234,179,8,0.15)] text-[#eab308]",
  red: "bg-[rgba(239,68,68,0.15)] text-[#ef4444]",
  purple: "bg-[rgba(168,85,247,0.15)] text-[#a855f7]",
};

interface PerformanceTableProps {
  rows: MemberPerformanceRow[];
}

export default function PerformanceTable({ rows }: PerformanceTableProps) {
  return (
    <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-6 mb-6">
      <h3 className="text-base font-semibold mb-4 text-[#f0f0f5]">
        Member Performance - Month over Month
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[0.88rem]">
          <thead>
            <tr>
              {["Member", "Role", "Dec Tasks", "Dec Completed", "Jan Tasks", "Jan Completed", "Trend"].map(
                (header) => (
                  <th
                    key={header}
                    className="text-left px-3 py-2.5 text-[0.78rem] font-semibold text-[#8888a0] uppercase tracking-[0.3px] border-b border-[#2a2a3a]"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const roleColor = row.role?.color || "blue";
              const initials = getInitials(row.member.name);
              const trendClass =
                row.diff > 0
                  ? "text-[#22c55e]"
                  : row.diff < 0
                  ? "text-[#ef4444]"
                  : "text-[#8888a0]";
              const trendText =
                row.diff > 0
                  ? `+${row.diff} more`
                  : row.diff < 0
                  ? `${row.diff} fewer`
                  : "Same";

              return (
                <tr
                  key={row.member.id}
                  className="border-b border-[#2a2a3a] last:border-b-0 hover:bg-[#1a1a26] transition-colors"
                >
                  <td className="px-3 py-3 text-[#f0f0f5]">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <div
                        className={`w-8 h-8 min-w-[32px] rounded-lg flex items-center justify-center font-bold text-[0.7rem] ${avatarBgMap[roleColor]}`}
                      >
                        {initials}
                      </div>
                      {row.member.name}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-lg text-[0.78rem] font-semibold ${roleBadgeMap[roleColor]}`}
                    >
                      {row.role?.name || "None"}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-[#f0f0f5]">{row.decTasks}</td>
                  <td className="px-3 py-3 text-[#f0f0f5]">{row.decCompleted}</td>
                  <td className="px-3 py-3 text-[#f0f0f5]">{row.janTasks}</td>
                  <td className="px-3 py-3 text-[#f0f0f5]">{row.janCompleted}</td>
                  <td className="px-3 py-3">
                    <span className={trendClass}>{trendText}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
