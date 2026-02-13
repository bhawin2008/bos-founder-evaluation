"use client";

import { Users, CheckSquare, AlertCircle, TrendingUp } from "lucide-react";
import type { Member, Task, Flag } from "../_data/types";

interface DashboardViewProps {
  members: Member[];
  tasks: Task[];
  flags: Flag[];
}

export default function DashboardView({ members, tasks, flags }: DashboardViewProps) {
  const activeMembers = members.filter((m) => m.status === "active").length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const pendingTasks = tasks.filter((t) => t.status === "pending").length;
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress").length;
  const positiveFlags = flags.filter((f) => f.type === "positive").length;
  const negativeFlags = flags.filter((f) => f.type === "negative").length;

  const cultureScore = members.length > 0
    ? Math.min(100, Math.round(((positiveFlags - negativeFlags) / Math.max(members.length, 1)) * 20 + 70))
    : 0;

  const topPerformers = members
    .map((m) => ({
      ...m,
      positiveCount: flags.filter((f) => f.memberId === m.id && f.type === "positive").length,
      taskCount: tasks.filter((t) => t.assigneeId === m.id && t.status === "completed").length,
    }))
    .sort((a, b) => b.positiveCount + b.taskCount - (a.positiveCount + a.taskCount))
    .slice(0, 5);

  const needsCoaching = members
    .map((m) => ({
      ...m,
      negativeCount: flags.filter((f) => f.memberId === m.id && f.type === "negative").length,
    }))
    .filter((m) => m.negativeCount > 0)
    .sort((a, b) => b.negativeCount - a.negativeCount)
    .slice(0, 5);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-sm text-gray-500">Culture health at a glance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<Users size={20} />}
          label="Active Members"
          value={activeMembers}
          color="bg-blue-500"
        />
        <StatCard
          icon={<CheckSquare size={20} />}
          label="Tasks Completed"
          value={completedTasks}
          sub={`${pendingTasks} pending · ${inProgressTasks} in progress`}
          color="bg-green-500"
        />
        <StatCard
          icon={<AlertCircle size={20} />}
          label="Flags Raised"
          value={flags.length}
          sub={`${positiveFlags} positive · ${negativeFlags} negative`}
          color="bg-amber-500"
        />
        <StatCard
          icon={<TrendingUp size={20} />}
          label="Culture Score"
          value={`${cultureScore}/100`}
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
          {topPerformers.length === 0 ? (
            <p className="text-sm text-gray-400">No data yet. Add members and flags to see results.</p>
          ) : (
            <div className="space-y-3">
              {topPerformers.map((m) => (
                <div key={m.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-gray-900">{m.name}</p>
                    <p className="text-xs text-gray-500">{m.role}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-green-600">{m.positiveCount} flags</span>
                    <span className="text-xs text-gray-400 ml-2">{m.taskCount} tasks</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Needs Coaching</h3>
          {needsCoaching.length === 0 ? (
            <p className="text-sm text-gray-400">No coaching signals detected.</p>
          ) : (
            <div className="space-y-3">
              {needsCoaching.map((m) => (
                <div key={m.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-gray-900">{m.name}</p>
                    <p className="text-xs text-gray-500">{m.role}</p>
                  </div>
                  <span className="text-sm font-medium text-red-600">{m.negativeCount} flags</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-10 h-10 rounded-lg ${color} text-white flex items-center justify-center`}>
          {icon}
        </div>
        <span className="text-sm text-gray-500">{label}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}
