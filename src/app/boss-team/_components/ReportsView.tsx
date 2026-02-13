"use client";

import type { Member, Task, Flag } from "../_data/types";
import { defaultCategories } from "../_data/types";

interface ReportsViewProps {
  members: Member[];
  tasks: Task[];
  flags: Flag[];
}

export default function ReportsView({ members, tasks, flags }: ReportsViewProps) {
  const completionRate = tasks.length > 0
    ? Math.round((tasks.filter((t) => t.status === "completed").length / tasks.length) * 100)
    : 0;

  const flagsByCategory = defaultCategories.map((cat) => ({
    ...cat,
    count: flags.filter((f) => f.category === cat.id).length,
  }));

  const memberPerformance = members.map((m) => ({
    name: m.name,
    tasksCompleted: tasks.filter((t) => t.assigneeId === m.id && t.status === "completed").length,
    tasksTotal: tasks.filter((t) => t.assigneeId === m.id).length,
    positiveFlags: flags.filter((f) => f.memberId === m.id && f.type === "positive").length,
    negativeFlags: flags.filter((f) => f.memberId === m.id && f.type === "negative").length,
  }));

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
        <p className="text-sm text-gray-500">Team performance overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
          <p className="text-3xl font-bold text-gray-900">{completionRate}%</p>
          <p className="text-sm text-gray-500 mt-1">Task Completion Rate</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
          <p className="text-3xl font-bold text-gray-900">{members.length}</p>
          <p className="text-sm text-gray-500 mt-1">Team Members</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
          <p className="text-3xl font-bold text-gray-900">{flags.length}</p>
          <p className="text-sm text-gray-500 mt-1">Total Signals</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Flags by Category</h3>
          <div className="space-y-3">
            {flagsByCategory.map((cat) => (
              <div key={cat.id} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{cat.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gray-900 rounded-full"
                      style={{ width: `${flags.length > 0 ? (cat.count / flags.length) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-8 text-right">{cat.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Member Performance</h3>
          <div className="space-y-3">
            {memberPerformance.map((m) => (
              <div key={m.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm font-medium text-gray-900">{m.name}</span>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-green-600">+{m.positiveFlags}</span>
                  <span className="text-red-600">-{m.negativeFlags}</span>
                  <span className="text-gray-400">{m.tasksCompleted}/{m.tasksTotal} tasks</span>
                </div>
              </div>
            ))}
            {memberPerformance.length === 0 && <p className="text-sm text-gray-400">No members yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
