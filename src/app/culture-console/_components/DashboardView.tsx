"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { AppData } from "../_data/types";
import {
  formatStatus,
  getInitials,
  getRoleColor,
  avatarColorMap,
  roleBadgeColorMap,
  statusBadgeMap,
  priorityBadgeMap,
} from "./shared";

interface DashboardViewProps {
  data: AppData;
}

export default function DashboardView({ data }: DashboardViewProps) {
  const activeTasks = data.tasks.filter((t) => t.status !== "completed");
  const completedTasks = data.tasks.filter((t) => t.status === "completed");

  // GOR aggregate scores
  const membersWithScores = data.members.filter((m) => m.gorScore);
  const avgGOR =
    membersWithScores.length > 0
      ? {
          growth:
            Math.round(
              membersWithScores.reduce(
                (sum, m) => sum + (m.gorScore?.growth ?? 0),
                0
              ) / membersWithScores.length
            ),
          operations:
            Math.round(
              membersWithScores.reduce(
                (sum, m) => sum + (m.gorScore?.operations ?? 0),
                0
              ) / membersWithScores.length
            ),
          resilience:
            Math.round(
              membersWithScores.reduce(
                (sum, m) => sum + (m.gorScore?.resilience ?? 0),
                0
              ) / membersWithScores.length
            ),
          overall:
            Math.round(
              membersWithScores.reduce(
                (sum, m) => sum + (m.gorScore?.overall ?? 0),
                0
              ) / membersWithScores.length
            ),
        }
      : { growth: 0, operations: 0, resilience: 0, overall: 0 };

  const avgCulture =
    membersWithScores.length > 0
      ? Math.round(
          membersWithScores.reduce(
            (sum, m) => sum + (m.cultureScore ?? 0),
            0
          ) / membersWithScores.length
        )
      : 0;

  const healthLabel =
    avgCulture >= data.config.healthThresholds.excellent
      ? "Excellent"
      : avgCulture >= data.config.healthThresholds.good
        ? "Good"
        : avgCulture >= data.config.healthThresholds.warning
          ? "Warning"
          : "Critical";

  const healthColor =
    avgCulture >= data.config.healthThresholds.excellent
      ? "text-green-400"
      : avgCulture >= data.config.healthThresholds.good
        ? "text-blue-400"
        : avgCulture >= data.config.healthThresholds.warning
          ? "text-yellow-400"
          : "text-red-400";

  // Recent members (last 5)
  const recentMembers = data.members.slice(-5).reverse();
  // Recent tasks (last 5)
  const recentTasks = data.tasks.slice(-5).reverse();

  return (
    <div className="animate-[fadeIn_0.3s_ease]">
      <div className="flex justify-between items-center mb-7">
        <div>
          <h2 className="text-[1.6rem] font-bold text-[#f0f0f5]">Dashboard</h2>
          <p className="text-[#8888a0] text-sm mt-1">
            Culture health overview &amp; GOR framework metrics
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-8 max-md:grid-cols-2 max-[480px]:grid-cols-1">
        <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-6 text-center">
          <div className="text-4xl font-extrabold bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] bg-clip-text text-transparent mb-1">
            {data.members.length}
          </div>
          <div className="text-[0.85rem] text-[#8888a0]">Team Members</div>
        </div>
        <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-6 text-center">
          <div className="text-4xl font-extrabold bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] bg-clip-text text-transparent mb-1">
            {activeTasks.length}
          </div>
          <div className="text-[0.85rem] text-[#8888a0]">Active Tasks</div>
        </div>
        <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-6 text-center">
          <div className="text-4xl font-extrabold bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] bg-clip-text text-transparent mb-1">
            {completedTasks.length}
          </div>
          <div className="text-[0.85rem] text-[#8888a0]">Completed Tasks</div>
        </div>
        <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-6 text-center">
          <div className="text-4xl font-extrabold bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] bg-clip-text text-transparent mb-1">
            {data.roles.length}
          </div>
          <div className="text-[0.85rem] text-[#8888a0]">Roles Defined</div>
        </div>
      </div>

      {/* Culture Health & GOR Scores */}
      <div className="grid grid-cols-2 gap-6 mb-8 max-md:grid-cols-1">
        <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-5">
          <h3 className="text-base font-semibold text-[#f0f0f5] mb-4">
            Culture Health
          </h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl font-extrabold bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] bg-clip-text text-transparent">
              {avgCulture}
            </div>
            <div>
              <div className={`text-lg font-bold ${healthColor}`}>
                {healthLabel}
              </div>
              <div className="text-xs text-[#8888a0]">Average culture score</div>
            </div>
          </div>
          <div className="w-full bg-[#2a2a3a] rounded-full h-2">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-[#4a6cf7] to-[#a855f7] transition-all duration-500"
              style={{ width: `${avgCulture}%` }}
            />
          </div>
        </div>

        <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-5">
          <h3 className="text-base font-semibold text-[#f0f0f5] mb-4">
            GOR Framework Scores
          </h3>
          <div className="space-y-3">
            {(
              [
                { label: "Growth", value: avgGOR.growth, color: "from-green-500 to-emerald-400" },
                { label: "Operations", value: avgGOR.operations, color: "from-blue-500 to-cyan-400" },
                { label: "Resilience", value: avgGOR.resilience, color: "from-purple-500 to-pink-400" },
              ] as const
            ).map(({ label, value, color }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-sm text-[#8888a0] w-24">{label}</span>
                <div className="flex-1 bg-[#2a2a3a] rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${color} transition-all duration-500`}
                    style={{ width: `${value}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-[#f0f0f5] w-8 text-right">
                  {value}
                </span>
              </div>
            ))}
            <div className="flex items-center gap-3 pt-2 border-t border-[#2a2a3a]">
              <span className="text-sm font-semibold text-[#f0f0f5] w-24">
                Overall
              </span>
              <div className="flex-1 bg-[#2a2a3a] rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full bg-gradient-to-r from-[#4a6cf7] to-[#a855f7] transition-all duration-500"
                  style={{ width: `${avgGOR.overall}%` }}
                />
              </div>
              <span className="text-sm font-extrabold bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] bg-clip-text text-transparent w-8 text-right">
                {avgGOR.overall}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Members & Tasks */}
      <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
        <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-5">
          <h3 className="text-base font-semibold text-[#f0f0f5] mb-4">
            Recent Members
          </h3>
          {recentMembers.length === 0 ? (
            <div className="text-center py-5 text-[#8888a0] text-sm">
              No members yet
            </div>
          ) : (
            recentMembers.map((member) => {
              const role = data.roles.find((r) => r.id === member.roleId);
              const color = getRoleColor(role);
              return (
                <div
                  key={member.id}
                  className="flex items-center gap-3 py-2.5 border-b border-[#2a2a3a] last:border-b-0"
                >
                  <div
                    className={`w-8 h-8 min-w-[32px] rounded-lg flex items-center justify-center text-xs font-bold ${avatarColorMap[color]}`}
                  >
                    {getInitials(member.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-sm font-medium text-[#f0f0f5] truncate">
                      {member.name}
                    </span>
                    <span className="block text-xs text-[#8888a0]">
                      {role ? role.name : "No Role"}
                    </span>
                  </div>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-md text-[0.72rem] font-semibold uppercase tracking-wide ${statusBadgeMap[member.status]}`}
                  >
                    {formatStatus(member.status)}
                  </span>
                </div>
              );
            })
          )}
        </div>

        <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-5">
          <h3 className="text-base font-semibold text-[#f0f0f5] mb-4">
            Recent Tasks
          </h3>
          {recentTasks.length === 0 ? (
            <div className="text-center py-5 text-[#8888a0] text-sm">
              No tasks yet
            </div>
          ) : (
            recentTasks.map((task) => {
              const assignee = data.members.find(
                (m) => m.id === task.assigneeId
              );
              return (
                <div
                  key={task.id}
                  className="flex items-center gap-3 py-2.5 border-b border-[#2a2a3a] last:border-b-0"
                >
                  <div className="flex-1 min-w-0">
                    <span className="block text-sm font-medium text-[#f0f0f5] truncate">
                      {task.title}
                    </span>
                    <span className="block text-xs text-[#8888a0]">
                      {assignee ? assignee.name : "Unassigned"}
                    </span>
                  </div>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-md text-[0.72rem] font-semibold uppercase tracking-wide ${priorityBadgeMap[task.priority]}`}
                  >
                    {task.priority}
                  </span>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-md text-[0.72rem] font-semibold uppercase tracking-wide ${statusBadgeMap[task.status]}`}
                  >
                    {formatStatus(task.status)}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
