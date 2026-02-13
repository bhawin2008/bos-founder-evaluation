"use client";

import { useState, useMemo } from "react";
import type { AppData } from "../_data/types";
import {
  getInitials,
  getRoleColor,
  avatarColorMap,
} from "./shared";

interface CompareViewProps {
  data: AppData;
}

export default function CompareView({ data }: CompareViewProps) {
  const [memberA, setMemberA] = useState(data.members[0]?.id || "");
  const [memberB, setMemberB] = useState(data.members[1]?.id || "");

  const comparison = useMemo(() => {
    const a = data.members.find((m) => m.id === memberA);
    const b = data.members.find((m) => m.id === memberB);
    if (!a || !b) return null;

    const aTasks = data.tasks.filter((t) => t.assigneeId === a.id);
    const bTasks = data.tasks.filter((t) => t.assigneeId === b.id);
    const aCompleted = aTasks.filter((t) => t.status === "completed").length;
    const bCompleted = bTasks.filter((t) => t.status === "completed").length;
    const aRate =
      aTasks.length > 0 ? Math.round((aCompleted / aTasks.length) * 100) : 0;
    const bRate =
      bTasks.length > 0 ? Math.round((bCompleted / bTasks.length) * 100) : 0;

    return {
      a,
      b,
      aRole: data.roles.find((r) => r.id === a.roleId),
      bRole: data.roles.find((r) => r.id === b.roleId),
      aTasks: aTasks.length,
      bTasks: bTasks.length,
      aCompleted,
      bCompleted,
      aRate,
      bRate,
    };
  }, [memberA, memberB, data]);

  const metrics = comparison
    ? [
        {
          label: "Culture Score",
          a: comparison.a.cultureScore ?? 0,
          b: comparison.b.cultureScore ?? 0,
        },
        {
          label: "GOR Overall",
          a: comparison.a.gorScore?.overall ?? 0,
          b: comparison.b.gorScore?.overall ?? 0,
        },
        {
          label: "GOR Growth",
          a: comparison.a.gorScore?.growth ?? 0,
          b: comparison.b.gorScore?.growth ?? 0,
        },
        {
          label: "GOR Operations",
          a: comparison.a.gorScore?.operations ?? 0,
          b: comparison.b.gorScore?.operations ?? 0,
        },
        {
          label: "GOR Resilience",
          a: comparison.a.gorScore?.resilience ?? 0,
          b: comparison.b.gorScore?.resilience ?? 0,
        },
        {
          label: "Total Tasks",
          a: comparison.aTasks,
          b: comparison.bTasks,
        },
        {
          label: "Completed Tasks",
          a: comparison.aCompleted,
          b: comparison.bCompleted,
        },
        {
          label: "Completion Rate",
          a: comparison.aRate,
          b: comparison.bRate,
          suffix: "%",
        },
      ]
    : [];

  return (
    <div className="animate-[fadeIn_0.3s_ease]">
      <div className="flex justify-between items-center mb-7">
        <div>
          <h2 className="text-[1.6rem] font-bold text-[#f0f0f5]">Compare</h2>
          <p className="text-[#8888a0] text-sm mt-1">
            Side-by-side member performance comparison
          </p>
        </div>
      </div>

      {/* Selectors */}
      <div className="flex items-center gap-4 mb-8 max-md:flex-col">
        <div className="flex-1 max-md:w-full">
          <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
            Member A
          </label>
          <select
            value={memberA}
            onChange={(e) => setMemberA(e.target.value)}
            className="w-full py-2.5 px-3.5 bg-[#12121a] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none focus:border-[#4a6cf7] cursor-pointer"
          >
            {data.members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
        <div className="text-lg font-bold text-[#8888a0] mt-6 max-md:mt-0">
          vs
        </div>
        <div className="flex-1 max-md:w-full">
          <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
            Member B
          </label>
          <select
            value={memberB}
            onChange={(e) => setMemberB(e.target.value)}
            className="w-full py-2.5 px-3.5 bg-[#12121a] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none focus:border-[#4a6cf7] cursor-pointer"
          >
            {data.members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison */}
      {comparison && (
        <>
          {/* Member Cards */}
          <div className="grid grid-cols-2 gap-6 mb-8 max-md:grid-cols-1">
            {[
              { member: comparison.a, role: comparison.aRole },
              { member: comparison.b, role: comparison.bRole },
            ].map(({ member, role }) => {
              const color = getRoleColor(role);
              return (
                <div
                  key={member.id}
                  className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-6 flex items-center gap-4"
                >
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold ${avatarColorMap[color]}`}
                  >
                    {getInitials(member.name)}
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-[#f0f0f5]">
                      {member.name}
                    </div>
                    <div className="text-sm text-[#8888a0]">
                      {role ? role.name : "No Role"}
                    </div>
                    <div className="text-xs text-[#8888a0] mt-1">
                      Culture: {member.cultureScore ?? "N/A"} | GOR:{" "}
                      {member.gorScore?.overall ?? "N/A"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Metrics Comparison */}
          <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-6">
            <h3 className="text-base font-semibold text-[#f0f0f5] mb-6">
              Performance Metrics
            </h3>
            <div className="space-y-5">
              {metrics.map(({ label, a, b, suffix }) => {
                const max = Math.max(a, b, 1);
                return (
                  <div key={label}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-[#8888a0]">{label}</span>
                      <div className="flex gap-8">
                        <span className="text-sm font-bold text-[#4a6cf7]">
                          {a}
                          {suffix || ""}
                        </span>
                        <span className="text-sm font-bold text-[#a855f7]">
                          {b}
                          {suffix || ""}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 h-3 bg-[rgba(42,42,58,0.5)] rounded-md overflow-hidden">
                        <div
                          className="h-full rounded-md bg-gradient-to-r from-[rgba(74,108,247,0.3)] to-[#4a6cf7] transition-all duration-500"
                          style={{
                            width: `${max > 0 ? (a / max) * 100 : 0}%`,
                          }}
                        />
                      </div>
                      <div className="flex-1 h-3 bg-[rgba(42,42,58,0.5)] rounded-md overflow-hidden">
                        <div
                          className="h-full rounded-md bg-gradient-to-r from-[rgba(168,85,247,0.3)] to-[#a855f7] transition-all duration-500"
                          style={{
                            width: `${max > 0 ? (b / max) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
