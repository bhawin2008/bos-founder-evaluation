"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import {
  ViewName,
  AppData,
  Role,
  Member,
  Task,
  MonthlyStats,
  TrendInfo,
  BarDataset,
  MemberPerformanceRow,
  WeeklyData,
} from "./_data/types";
import {
  sampleRoles,
  sampleMembers,
  sampleTasks,
  getMonthTasks,
  getCompletedInMonth,
  getWeeklyCompletions,
  formatStatus,
  formatDate,
  getInitials,
  generateId,
} from "./_data/sampleData";
import Sidebar from "./_components/Sidebar";
import StatsOverview from "./_components/StatsOverview";
import MonthlyChart from "./_components/MonthlyChart";
import PerformanceTable from "./_components/PerformanceTable";

// ==================== Color Maps ====================

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

const statusBadgeMap: Record<string, string> = {
  active: "bg-[rgba(34,197,94,0.15)] text-[#22c55e]",
  "on-leave": "bg-[rgba(234,179,8,0.15)] text-[#eab308]",
  inactive: "bg-[rgba(239,68,68,0.15)] text-[#ef4444]",
  pending: "bg-[rgba(136,136,160,0.15)] text-[#8888a0]",
  "in-progress": "bg-[rgba(74,108,247,0.15)] text-[#4a6cf7]",
  completed: "bg-[rgba(34,197,94,0.15)] text-[#22c55e]",
};

const priorityBadgeMap: Record<string, string> = {
  low: "bg-[rgba(136,136,160,0.15)] text-[#8888a0]",
  medium: "bg-[rgba(234,179,8,0.15)] text-[#eab308]",
  high: "bg-[rgba(239,68,68,0.15)] text-[#ef4444]",
};

// ==================== localStorage helpers ====================

const STORAGE_KEYS = {
  members: "boss_members",
  tasks: "boss_tasks",
  roles: "boss_roles",
  seeded: "boss_seeded",
} as const;

function loadData(): AppData {
  if (typeof window === "undefined") {
    return { members: [], tasks: [], roles: [] };
  }
  return {
    members: JSON.parse(localStorage.getItem(STORAGE_KEYS.members) || "[]"),
    tasks: JSON.parse(localStorage.getItem(STORAGE_KEYS.tasks) || "[]"),
    roles: JSON.parse(localStorage.getItem(STORAGE_KEYS.roles) || "[]"),
  };
}

function saveData(data: AppData): void {
  localStorage.setItem(STORAGE_KEYS.members, JSON.stringify(data.members));
  localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(data.tasks));
  localStorage.setItem(STORAGE_KEYS.roles, JSON.stringify(data.roles));
}

function seedIfNeeded(): AppData {
  if (typeof window === "undefined") {
    return { members: sampleMembers, tasks: sampleTasks, roles: sampleRoles };
  }
  if (!localStorage.getItem(STORAGE_KEYS.seeded)) {
    const data: AppData = {
      roles: sampleRoles,
      members: sampleMembers,
      tasks: sampleTasks,
    };
    saveData(data);
    localStorage.setItem(STORAGE_KEYS.seeded, "true");
    return data;
  }
  return loadData();
}

// ==================== Main Page ====================

export default function AnalyticsDashboardPage() {
  const [data, setData] = useState<AppData>({ members: [], tasks: [], roles: [] });
  const [activeView, setActiveView] = useState<ViewName>("dashboard");
  const [taskFilter, setTaskFilter] = useState<string>("all");
  const [memberSearch, setMemberSearch] = useState("");
  const [mounted, setMounted] = useState(false);

  // Modal states
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  // Edit states
  const [editMemberId, setEditMemberId] = useState<string | null>(null);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [editRoleId, setEditRoleId] = useState<string | null>(null);

  // Delete pending
  const [pendingDelete, setPendingDelete] = useState<{
    type: "member" | "task" | "role";
    id: string;
    message: string;
  } | null>(null);

  // Form states for member
  const [memberForm, setMemberForm] = useState({
    name: "",
    email: "",
    roleId: "",
    status: "active" as Member["status"],
  });

  // Form states for task
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    assigneeId: "",
    priority: "medium" as Task["priority"],
    dueDate: "",
    status: "pending" as Task["status"],
  });

  // Form states for role
  const [roleForm, setRoleForm] = useState({
    name: "",
    description: "",
    color: "blue" as Role["color"],
  });

  // Initialize data
  useEffect(() => {
    const initialData = seedIfNeeded();
    setData(initialData);
    setMounted(true);
  }, []);

  // Persist changes
  const updateData = useCallback((newData: AppData) => {
    setData(newData);
    saveData(newData);
  }, []);

  // ==================== Analytics computations ====================

  const decTasks = useMemo(() => getMonthTasks(data.tasks, 2025, 11), [data.tasks]);
  const janTasks = useMemo(() => getMonthTasks(data.tasks, 2026, 0), [data.tasks]);
  const decCompleted = useMemo(() => getCompletedInMonth(decTasks), [decTasks]);
  const janCompleted = useMemo(() => getCompletedInMonth(janTasks), [janTasks]);

  const decStats: MonthlyStats = useMemo(
    () => ({
      total: decTasks.length,
      completed: decCompleted.length,
      rate: decTasks.length > 0 ? Math.round((decCompleted.length / decTasks.length) * 100) : 0,
    }),
    [decTasks, decCompleted]
  );

  const janStats: MonthlyStats = useMemo(
    () => ({
      total: janTasks.length,
      completed: janCompleted.length,
      rate: janTasks.length > 0 ? Math.round((janCompleted.length / janTasks.length) * 100) : 0,
    }),
    [janTasks, janCompleted]
  );

  const trends: TrendInfo[] = useMemo(() => {
    const volumeChange = janTasks.length - decTasks.length;
    const rateChange = janStats.rate - decStats.rate;
    const decHigh = decTasks.filter((t) => t.priority === "high").length;
    const janHigh = janTasks.filter((t) => t.priority === "high").length;
    const highChange = janHigh - decHigh;
    const activeMembers = data.members.filter((m) => m.status === "active").length;
    const decAvg = activeMembers > 0 ? (decTasks.length / activeMembers).toFixed(1) : "0";
    const janAvg = activeMembers > 0 ? (janTasks.length / activeMembers).toFixed(1) : "0";

    return [
      {
        label: "Task Volume Trend",
        value: `${volumeChange > 0 ? "+" : ""}${volumeChange} tasks`,
        direction: volumeChange > 0 ? "up" : volumeChange < 0 ? "down" : "neutral",
      },
      {
        label: "Completion Rate Trend",
        value: `${rateChange > 0 ? "+" : ""}${rateChange}%`,
        direction: rateChange > 0 ? "up" : rateChange < 0 ? "down" : "neutral",
      },
      {
        label: "High Priority Tasks Trend",
        value: `${highChange > 0 ? "+" : ""}${highChange} tasks`,
        direction: highChange > 0 ? "up" : highChange < 0 ? "down" : "neutral",
      },
      {
        label: "Avg Tasks per Member",
        value: `${decAvg} \u2192 ${janAvg}`,
        direction:
          parseFloat(janAvg) > parseFloat(decAvg)
            ? "up"
            : parseFloat(janAvg) < parseFloat(decAvg)
            ? "down"
            : "neutral",
      },
    ];
  }, [decTasks, janTasks, decStats.rate, janStats.rate, data.members]);

  const statusDatasets: BarDataset[] = useMemo(
    () => [
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
    ],
    [decTasks, janTasks]
  );

  const priorityDatasets: BarDataset[] = useMemo(
    () => [
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
    ],
    [decTasks, janTasks]
  );

  const decWeekly: WeeklyData = useMemo(
    () => ({
      weeks: getWeeklyCompletions(decTasks, 2025, 11),
      monthLabel: "December 2025",
    }),
    [decTasks]
  );

  const janWeekly: WeeklyData = useMemo(
    () => ({
      weeks: getWeeklyCompletions(janTasks, 2026, 0),
      monthLabel: "January 2026",
    }),
    [janTasks]
  );

  const memberPerformanceRows: MemberPerformanceRow[] = useMemo(
    () =>
      data.members.map((member) => {
        const role = data.roles.find((r) => r.id === member.roleId);
        const decMemberTasks = decTasks.filter((t) => t.assigneeId === member.id);
        const decMemberCompleted = decMemberTasks.filter((t) => t.status === "completed");
        const janMemberTasks = janTasks.filter((t) => t.assigneeId === member.id);
        const janMemberCompleted = janMemberTasks.filter((t) => t.status === "completed");
        return {
          member,
          role,
          decTasks: decMemberTasks.length,
          decCompleted: decMemberCompleted.length,
          janTasks: janMemberTasks.length,
          janCompleted: janMemberCompleted.length,
          diff: janMemberCompleted.length - decMemberCompleted.length,
        };
      }),
    [data.members, data.roles, decTasks, janTasks]
  );

  // ==================== CRUD Operations ====================

  // --- Roles ---
  const openRoleModal = useCallback(
    (id?: string) => {
      if (id) {
        const role = data.roles.find((r) => r.id === id);
        if (role) {
          setRoleForm({ name: role.name, description: role.description, color: role.color });
          setEditRoleId(id);
        }
      } else {
        setRoleForm({ name: "", description: "", color: "blue" });
        setEditRoleId(null);
      }
      setRoleModalOpen(true);
    },
    [data.roles]
  );

  const saveRole = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const newData = { ...data, roles: [...data.roles] };
      const role: Role = {
        id: editRoleId || generateId(),
        name: roleForm.name.trim(),
        description: roleForm.description.trim(),
        color: roleForm.color,
        createdAt: editRoleId
          ? data.roles.find((r) => r.id === editRoleId)?.createdAt || new Date().toISOString()
          : new Date().toISOString(),
      };
      if (editRoleId) {
        const idx = newData.roles.findIndex((r) => r.id === editRoleId);
        if (idx !== -1) newData.roles[idx] = role;
      } else {
        newData.roles.push(role);
      }
      updateData(newData);
      setRoleModalOpen(false);
      setEditRoleId(null);
    },
    [data, editRoleId, roleForm, updateData]
  );

  // --- Members ---
  const openMemberModal = useCallback(
    (id?: string) => {
      if (id) {
        const member = data.members.find((m) => m.id === id);
        if (member) {
          setMemberForm({
            name: member.name,
            email: member.email,
            roleId: member.roleId,
            status: member.status,
          });
          setEditMemberId(id);
        }
      } else {
        setMemberForm({ name: "", email: "", roleId: "", status: "active" });
        setEditMemberId(null);
      }
      setMemberModalOpen(true);
    },
    [data.members]
  );

  const saveMember = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const newData = { ...data, members: [...data.members] };
      const member: Member = {
        id: editMemberId || generateId(),
        name: memberForm.name.trim(),
        email: memberForm.email.trim(),
        roleId: memberForm.roleId,
        status: memberForm.status,
        createdAt: editMemberId
          ? data.members.find((m) => m.id === editMemberId)?.createdAt || new Date().toISOString()
          : new Date().toISOString(),
      };
      if (editMemberId) {
        const idx = newData.members.findIndex((m) => m.id === editMemberId);
        if (idx !== -1) newData.members[idx] = member;
      } else {
        newData.members.push(member);
      }
      updateData(newData);
      setMemberModalOpen(false);
      setEditMemberId(null);
    },
    [data, editMemberId, memberForm, updateData]
  );

  // --- Tasks ---
  const openTaskModal = useCallback(
    (id?: string) => {
      if (id) {
        const task = data.tasks.find((t) => t.id === id);
        if (task) {
          setTaskForm({
            title: task.title,
            description: task.description,
            assigneeId: task.assigneeId,
            priority: task.priority,
            dueDate: task.dueDate,
            status: task.status,
          });
          setEditTaskId(id);
        }
      } else {
        setTaskForm({
          title: "",
          description: "",
          assigneeId: "",
          priority: "medium",
          dueDate: "",
          status: "pending",
        });
        setEditTaskId(null);
      }
      setTaskModalOpen(true);
    },
    [data.tasks]
  );

  const saveTask = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const newData = { ...data, tasks: [...data.tasks] };
      const task: Task = {
        id: editTaskId || generateId(),
        title: taskForm.title.trim(),
        description: taskForm.description.trim(),
        assigneeId: taskForm.assigneeId,
        priority: taskForm.priority,
        dueDate: taskForm.dueDate,
        status: taskForm.status,
        createdAt: editTaskId
          ? data.tasks.find((t) => t.id === editTaskId)?.createdAt || new Date().toISOString()
          : new Date().toISOString(),
        completedAt: taskForm.status === "completed" ? new Date().toISOString() : null,
      };
      if (editTaskId) {
        const idx = newData.tasks.findIndex((t) => t.id === editTaskId);
        if (idx !== -1) newData.tasks[idx] = task;
      } else {
        newData.tasks.push(task);
      }
      updateData(newData);
      setTaskModalOpen(false);
      setEditTaskId(null);
    },
    [data, editTaskId, taskForm, updateData]
  );

  const toggleTaskStatus = useCallback(
    (id: string) => {
      const newData = { ...data, tasks: data.tasks.map((t) => ({ ...t })) };
      const task = newData.tasks.find((t) => t.id === id);
      if (!task) return;
      task.status = task.status === "completed" ? "pending" : "completed";
      task.completedAt = task.status === "completed" ? new Date().toISOString() : null;
      updateData(newData);
    },
    [data, updateData]
  );

  // --- Delete ---
  const requestDelete = useCallback(
    (type: "member" | "task" | "role", id: string) => {
      const messages: Record<string, string> = {
        member:
          "Are you sure you want to delete this member? Their tasks will become unassigned.",
        task: "Are you sure you want to delete this task?",
        role: "Are you sure you want to delete this role? Members with this role will become unassigned.",
      };
      setPendingDelete({ type, id, message: messages[type] });
      setConfirmModalOpen(true);
    },
    []
  );

  const confirmDelete = useCallback(() => {
    if (!pendingDelete) return;
    const newData: AppData = {
      roles: [...data.roles],
      members: data.members.map((m) => ({ ...m })),
      tasks: data.tasks.map((t) => ({ ...t })),
    };

    if (pendingDelete.type === "member") {
      newData.members = newData.members.filter((m) => m.id !== pendingDelete.id);
      newData.tasks.forEach((t) => {
        if (t.assigneeId === pendingDelete.id) t.assigneeId = "";
      });
    } else if (pendingDelete.type === "task") {
      newData.tasks = newData.tasks.filter((t) => t.id !== pendingDelete.id);
    } else if (pendingDelete.type === "role") {
      newData.roles = newData.roles.filter((r) => r.id !== pendingDelete.id);
      newData.members.forEach((m) => {
        if (m.roleId === pendingDelete.id) m.roleId = "";
      });
    }

    updateData(newData);
    setConfirmModalOpen(false);
    setPendingDelete(null);
  }, [data, pendingDelete, updateData]);

  // ==================== Derived data ====================

  const activeTasks = useMemo(
    () => data.tasks.filter((t) => t.status !== "completed"),
    [data.tasks]
  );
  const completedTasks = useMemo(
    () => data.tasks.filter((t) => t.status === "completed"),
    [data.tasks]
  );

  const filteredMembers = useMemo(() => {
    const search = memberSearch.toLowerCase();
    return data.members.filter((m) => {
      if (!search) return true;
      return (
        m.name.toLowerCase().includes(search) || m.email.toLowerCase().includes(search)
      );
    });
  }, [data.members, memberSearch]);

  const filteredTasks = useMemo(() => {
    let tasks =
      taskFilter === "all"
        ? [...data.tasks]
        : data.tasks.filter((t) => t.status === taskFilter);

    const priorityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 };
    const statusOrder: Record<string, number> = {
      "in-progress": 0,
      pending: 1,
      completed: 2,
    };

    tasks.sort((a, b) => {
      if (statusOrder[a.status] !== statusOrder[b.status]) {
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    return tasks;
  }, [data.tasks, taskFilter]);

  const recentMembers = useMemo(() => data.members.slice(-5).reverse(), [data.members]);
  const recentTasks = useMemo(() => data.tasks.slice(-5).reverse(), [data.tasks]);

  if (!mounted) {
    return (
      <div className="flex min-h-screen bg-[#0a0a0f] text-[#f0f0f5] font-sans items-center justify-center">
        <div className="text-[#8888a0]">Loading...</div>
      </div>
    );
  }

  // ==================== Render ====================

  return (
    <div className="flex min-h-screen bg-[#0a0a0f] text-[#f0f0f5] font-sans">
      <Sidebar activeView={activeView} onSwitchView={setActiveView} />

      <main className="flex-1 p-8 px-10 overflow-y-auto max-h-screen max-md:p-5">
        {/* ==================== Dashboard View ==================== */}
        {activeView === "dashboard" && (
          <div className="animate-[fadeIn_0.3s_ease]">
            <div className="flex justify-between items-center mb-7">
              <div>
                <h2 className="text-[1.6rem] font-bold">Dashboard</h2>
                <p className="text-[#8888a0] text-[0.9rem] mt-1">
                  Team overview at a glance
                </p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-4 gap-4 mb-8 max-md:grid-cols-2 max-[480px]:grid-cols-1">
              {[
                { value: data.members.length, label: "Team Members" },
                { value: activeTasks.length, label: "Active Tasks" },
                { value: completedTasks.length, label: "Completed Tasks" },
                { value: data.roles.length, label: "Roles Defined" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] py-6 px-5 text-center"
                >
                  <div className="text-4xl font-extrabold bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[0.85rem] text-[#8888a0]">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent sections */}
            <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              {/* Recent Members */}
              <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-5">
                <h3 className="text-base font-semibold mb-4 text-[#f0f0f5]">
                  Recent Members
                </h3>
                {recentMembers.length === 0 ? (
                  <div className="text-center py-5 text-[#8888a0] text-[0.85rem]">
                    No members yet
                  </div>
                ) : (
                  recentMembers.map((member) => {
                    const role = data.roles.find((r) => r.id === member.roleId);
                    const roleColor = role?.color || "blue";
                    return (
                      <div
                        key={member.id}
                        className="flex items-center gap-3 py-2.5 border-b border-[#2a2a3a] last:border-b-0"
                      >
                        <div
                          className={`w-8 h-8 min-w-[32px] rounded-lg flex items-center justify-center font-bold text-[0.7rem] ${avatarBgMap[roleColor]}`}
                        >
                          {getInitials(member.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="block text-[0.9rem] font-medium truncate">
                            {member.name}
                          </span>
                          <span className="block text-[0.78rem] text-[#8888a0]">
                            {role?.name || "No Role"}
                          </span>
                        </div>
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-md text-[0.72rem] font-semibold uppercase tracking-[0.3px] ${statusBadgeMap[member.status]}`}
                        >
                          {formatStatus(member.status)}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Recent Tasks */}
              <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-5">
                <h3 className="text-base font-semibold mb-4 text-[#f0f0f5]">
                  Recent Tasks
                </h3>
                {recentTasks.length === 0 ? (
                  <div className="text-center py-5 text-[#8888a0] text-[0.85rem]">
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
                          <span className="block text-[0.9rem] font-medium truncate">
                            {task.title}
                          </span>
                          <span className="block text-[0.78rem] text-[#8888a0]">
                            {assignee?.name || "Unassigned"}
                          </span>
                        </div>
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-md text-[0.72rem] font-semibold uppercase tracking-[0.3px] ${priorityBadgeMap[task.priority]}`}
                        >
                          {task.priority}
                        </span>
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-md text-[0.72rem] font-semibold uppercase tracking-[0.3px] ${statusBadgeMap[task.status]}`}
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
        )}

        {/* ==================== Members View ==================== */}
        {activeView === "members" && (
          <div className="animate-[fadeIn_0.3s_ease]">
            <div className="flex justify-between items-center mb-7 max-sm:flex-col max-sm:items-start max-sm:gap-3">
              <h2 className="text-[1.6rem] font-bold">Team Members</h2>
              <button
                onClick={() => openMemberModal()}
                className="bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] text-white border-none px-[22px] py-2.5 text-[0.9rem] font-semibold rounded-[10px] cursor-pointer transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(74,108,247,0.3)]"
              >
                + Add Member
              </button>
            </div>

            <div className="mb-5">
              <input
                type="text"
                placeholder="Search members..."
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                className="w-full py-3 px-4 bg-[#12121a] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-[0.9rem] outline-none transition-colors duration-200 focus:border-[#4a6cf7] placeholder:text-[#8888a0]"
              />
            </div>

            <div className="flex flex-col gap-3">
              {filteredMembers.length === 0 ? (
                <div className="text-center py-12 text-[#8888a0] text-[0.95rem]">
                  {data.members.length === 0
                    ? "No team members yet. Add your first member to get started."
                    : "No members match your search."}
                </div>
              ) : (
                filteredMembers.map((member) => {
                  const role = data.roles.find((r) => r.id === member.roleId);
                  const roleColor = role?.color || "blue";
                  const taskCount = data.tasks.filter(
                    (t) => t.assigneeId === member.id && t.status !== "completed"
                  ).length;

                  return (
                    <div
                      key={member.id}
                      className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] px-5 py-[18px] transition-colors duration-200 hover:border-[#3a3a4a] group"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 min-w-[40px] rounded-[10px] flex items-center justify-center font-bold text-[0.85rem] ${avatarBgMap[roleColor]}`}
                          >
                            {getInitials(member.name)}
                          </div>
                          <div>
                            <div className="font-semibold text-[0.95rem]">
                              {member.name}
                            </div>
                            <div className="text-[0.8rem] text-[#8888a0]">
                              {member.email}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={() => openMemberModal(member.id)}
                            title="Edit"
                            className="w-8 h-8 flex items-center justify-center border border-[#2a2a3a] bg-transparent text-[#8888a0] rounded-lg cursor-pointer text-[0.85rem] transition-all duration-200 hover:bg-[#1a1a26] hover:text-[#f0f0f5] hover:border-[#8888a0]"
                          >
                            &#9998;
                          </button>
                          <button
                            onClick={() => requestDelete("member", member.id)}
                            title="Delete"
                            className="w-8 h-8 flex items-center justify-center border border-[#2a2a3a] bg-transparent text-[#8888a0] rounded-lg cursor-pointer text-[0.85rem] transition-all duration-200 hover:bg-[rgba(239,68,68,0.15)] hover:text-[#ef4444] hover:border-[#ef4444]"
                          >
                            &#10005;
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span
                          className={`inline-block px-3 py-1 rounded-lg text-[0.78rem] font-semibold ${roleBadgeMap[roleColor]}`}
                        >
                          {role?.name || "No Role"}
                        </span>
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-md text-[0.72rem] font-semibold uppercase tracking-[0.3px] ${statusBadgeMap[member.status]}`}
                        >
                          {formatStatus(member.status)}
                        </span>
                        <span className="text-[0.78rem] text-[#8888a0]">
                          {taskCount} active task{taskCount !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ==================== Tasks View ==================== */}
        {activeView === "tasks" && (
          <div className="animate-[fadeIn_0.3s_ease]">
            <div className="flex justify-between items-center mb-7 max-sm:flex-col max-sm:items-start max-sm:gap-3">
              <h2 className="text-[1.6rem] font-bold">Tasks</h2>
              <button
                onClick={() => openTaskModal()}
                className="bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] text-white border-none px-[22px] py-2.5 text-[0.9rem] font-semibold rounded-[10px] cursor-pointer transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(74,108,247,0.3)]"
              >
                + Add Task
              </button>
            </div>

            <div className="flex gap-2 mb-5 flex-wrap">
              {["all", "pending", "in-progress", "completed"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTaskFilter(filter)}
                  className={`px-4 py-2 border rounded-lg text-[0.85rem] font-medium cursor-pointer transition-all duration-200 ${
                    taskFilter === filter
                      ? "bg-[rgba(74,108,247,0.12)] border-[#4a6cf7] text-[#4a6cf7]"
                      : "bg-transparent border-[#2a2a3a] text-[#8888a0] hover:border-[#8888a0] hover:text-[#f0f0f5]"
                  }`}
                >
                  {filter === "all"
                    ? "All"
                    : filter
                        .split("-")
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(" ")}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-12 text-[#8888a0] text-[0.95rem]">
                  {data.tasks.length === 0
                    ? "No tasks yet. Add your first task to get started."
                    : "No tasks match the current filter."}
                </div>
              ) : (
                filteredTasks.map((task) => {
                  const assignee = data.members.find(
                    (m) => m.id === task.assigneeId
                  );
                  const isCompleted = task.status === "completed";

                  return (
                    <div
                      key={task.id}
                      className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] px-5 py-[18px] transition-colors duration-200 hover:border-[#3a3a4a] group"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleTaskStatus(task.id)}
                            className={`w-6 h-6 min-w-[24px] border-2 rounded-md flex items-center justify-center cursor-pointer text-[0.8rem] transition-all duration-200 mt-0.5 ${
                              isCompleted
                                ? "bg-[#22c55e] border-[#22c55e] text-white"
                                : "border-[#2a2a3a] bg-transparent text-transparent hover:border-[#4a6cf7]"
                            }`}
                          >
                            {isCompleted ? "\u2713" : ""}
                          </button>
                          <div>
                            <div
                              className={`font-semibold text-[0.95rem] ${
                                isCompleted
                                  ? "line-through text-[#8888a0]"
                                  : ""
                              }`}
                            >
                              {task.title}
                            </div>
                            {task.description && (
                              <div
                                className={`text-[0.82rem] text-[#8888a0] mt-0.5 ${
                                  isCompleted ? "line-through" : ""
                                }`}
                              >
                                {task.description}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={() => openTaskModal(task.id)}
                            title="Edit"
                            className="w-8 h-8 flex items-center justify-center border border-[#2a2a3a] bg-transparent text-[#8888a0] rounded-lg cursor-pointer text-[0.85rem] transition-all duration-200 hover:bg-[#1a1a26] hover:text-[#f0f0f5] hover:border-[#8888a0]"
                          >
                            &#9998;
                          </button>
                          <button
                            onClick={() => requestDelete("task", task.id)}
                            title="Delete"
                            className="w-8 h-8 flex items-center justify-center border border-[#2a2a3a] bg-transparent text-[#8888a0] rounded-lg cursor-pointer text-[0.85rem] transition-all duration-200 hover:bg-[rgba(239,68,68,0.15)] hover:text-[#ef4444] hover:border-[#ef4444]"
                          >
                            &#10005;
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 flex-wrap max-[480px]:flex-col max-[480px]:items-start">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-md text-[0.72rem] font-semibold uppercase tracking-[0.3px] ${priorityBadgeMap[task.priority]}`}
                        >
                          {task.priority}
                        </span>
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-md text-[0.72rem] font-semibold uppercase tracking-[0.3px] ${statusBadgeMap[task.status]}`}
                        >
                          {formatStatus(task.status)}
                        </span>
                        <span className="text-[0.78rem] text-[#8888a0]">
                          {assignee
                            ? `Assigned to ${assignee.name}`
                            : "Unassigned"}
                        </span>
                        {task.dueDate && (
                          <span className="text-[0.78rem] text-[#8888a0]">
                            Due {formatDate(task.dueDate)}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ==================== Roles View ==================== */}
        {activeView === "roles" && (
          <div className="animate-[fadeIn_0.3s_ease]">
            <div className="flex justify-between items-center mb-7 max-sm:flex-col max-sm:items-start max-sm:gap-3">
              <h2 className="text-[1.6rem] font-bold">Roles</h2>
              <button
                onClick={() => openRoleModal()}
                className="bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] text-white border-none px-[22px] py-2.5 text-[0.9rem] font-semibold rounded-[10px] cursor-pointer transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(74,108,247,0.3)]"
              >
                + Add Role
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {data.roles.length === 0 ? (
                <div className="text-center py-12 text-[#8888a0] text-[0.95rem]">
                  No roles defined yet. Add your first role to get started.
                </div>
              ) : (
                data.roles.map((role) => {
                  const memberCount = data.members.filter(
                    (m) => m.roleId === role.id
                  ).length;
                  return (
                    <div
                      key={role.id}
                      className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] px-5 py-[18px] transition-colors duration-200 hover:border-[#3a3a4a] group"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span
                          className={`inline-block px-3 py-1 rounded-lg text-[0.78rem] font-semibold ${roleBadgeMap[role.color]}`}
                        >
                          {role.name}
                        </span>
                        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={() => openRoleModal(role.id)}
                            title="Edit"
                            className="w-8 h-8 flex items-center justify-center border border-[#2a2a3a] bg-transparent text-[#8888a0] rounded-lg cursor-pointer text-[0.85rem] transition-all duration-200 hover:bg-[#1a1a26] hover:text-[#f0f0f5] hover:border-[#8888a0]"
                          >
                            &#9998;
                          </button>
                          <button
                            onClick={() => requestDelete("role", role.id)}
                            title="Delete"
                            className="w-8 h-8 flex items-center justify-center border border-[#2a2a3a] bg-transparent text-[#8888a0] rounded-lg cursor-pointer text-[0.85rem] transition-all duration-200 hover:bg-[rgba(239,68,68,0.15)] hover:text-[#ef4444] hover:border-[#ef4444]"
                          >
                            &#10005;
                          </button>
                        </div>
                      </div>
                      <p className="text-[0.88rem] text-[#8888a0] leading-relaxed mb-2.5">
                        {role.description || "No description"}
                      </p>
                      <div className="text-[0.78rem] text-[#8888a0]">
                        {memberCount} member{memberCount !== 1 ? "s" : ""}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ==================== Analytics View ==================== */}
        {activeView === "analytics" && (
          <div className="animate-[fadeIn_0.3s_ease]">
            <div className="flex justify-between items-center mb-7">
              <div>
                <h2 className="text-[1.6rem] font-bold">Analytics</h2>
                <p className="text-[#8888a0] text-[0.9rem] mt-1">
                  Month-over-month team performance trends
                </p>
              </div>
            </div>

            <StatsOverview
              decStats={decStats}
              janStats={janStats}
              trends={trends}
            />

            <MonthlyChart
              statusDatasets={statusDatasets}
              priorityDatasets={priorityDatasets}
              decWeekly={decWeekly}
              janWeekly={janWeekly}
            />

            <PerformanceTable rows={memberPerformanceRows} />
          </div>
        )}
      </main>

      {/* ==================== Member Modal ==================== */}
      {memberModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center"
          onClick={() => setMemberModalOpen(false)}
        >
          <div
            className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl w-full max-w-[480px] p-7 animate-[fadeIn_0.25s_ease]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[1.2rem] font-bold">
                {editMemberId ? "Edit Member" : "Add Member"}
              </h3>
              <button
                onClick={() => setMemberModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center border-none bg-transparent text-[#8888a0] text-[1.3rem] cursor-pointer rounded-lg transition-all duration-200 hover:bg-[#1a1a26] hover:text-[#f0f0f5]"
              >
                &times;
              </button>
            </div>
            <form onSubmit={saveMember}>
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jane Smith"
                  value={memberForm.name}
                  onChange={(e) =>
                    setMemberForm({ ...memberForm, name: e.target.value })
                  }
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-[0.9rem] outline-none transition-colors duration-200 focus:border-[#4a6cf7] placeholder:text-[#8888a0]"
                />
              </div>
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. jane@company.com"
                  value={memberForm.email}
                  onChange={(e) =>
                    setMemberForm({ ...memberForm, email: e.target.value })
                  }
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-[0.9rem] outline-none transition-colors duration-200 focus:border-[#4a6cf7] placeholder:text-[#8888a0]"
                />
              </div>
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Role
                </label>
                <select
                  required
                  value={memberForm.roleId}
                  onChange={(e) =>
                    setMemberForm({ ...memberForm, roleId: e.target.value })
                  }
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-[0.9rem] outline-none transition-colors duration-200 focus:border-[#4a6cf7] cursor-pointer"
                >
                  <option value="">Select a role</option>
                  {data.roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Status
                </label>
                <select
                  value={memberForm.status}
                  onChange={(e) =>
                    setMemberForm({
                      ...memberForm,
                      status: e.target.value as Member["status"],
                    })
                  }
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-[0.9rem] outline-none transition-colors duration-200 focus:border-[#4a6cf7] cursor-pointer"
                >
                  <option value="active">Active</option>
                  <option value="on-leave">On Leave</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end gap-2.5 mt-6">
                <button
                  type="button"
                  onClick={() => setMemberModalOpen(false)}
                  className="bg-transparent text-[#8888a0] border border-[#2a2a3a] px-[22px] py-2.5 text-[0.9rem] font-medium rounded-[10px] cursor-pointer transition-all duration-200 hover:border-[#8888a0] hover:text-[#f0f0f5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] text-white border-none px-[22px] py-2.5 text-[0.9rem] font-semibold rounded-[10px] cursor-pointer transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(74,108,247,0.3)]"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== Task Modal ==================== */}
      {taskModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center"
          onClick={() => setTaskModalOpen(false)}
        >
          <div
            className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl w-full max-w-[480px] p-7 animate-[fadeIn_0.25s_ease]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[1.2rem] font-bold">
                {editTaskId ? "Edit Task" : "Add Task"}
              </h3>
              <button
                onClick={() => setTaskModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center border-none bg-transparent text-[#8888a0] text-[1.3rem] cursor-pointer rounded-lg transition-all duration-200 hover:bg-[#1a1a26] hover:text-[#f0f0f5]"
              >
                &times;
              </button>
            </div>
            <form onSubmit={saveTask}>
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Design landing page"
                  value={taskForm.title}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, title: e.target.value })
                  }
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-[0.9rem] outline-none transition-colors duration-200 focus:border-[#4a6cf7] placeholder:text-[#8888a0]"
                />
              </div>
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the task..."
                  value={taskForm.description}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, description: e.target.value })
                  }
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-[0.9rem] font-[inherit] outline-none transition-colors duration-200 focus:border-[#4a6cf7] placeholder:text-[#8888a0] resize-y min-h-[60px]"
                />
              </div>
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Assignee
                </label>
                <select
                  required
                  value={taskForm.assigneeId}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, assigneeId: e.target.value })
                  }
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-[0.9rem] outline-none transition-colors duration-200 focus:border-[#4a6cf7] cursor-pointer"
                >
                  <option value="">Select a member</option>
                  {data.members.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Priority
                </label>
                <select
                  value={taskForm.priority}
                  onChange={(e) =>
                    setTaskForm({
                      ...taskForm,
                      priority: e.target.value as Task["priority"],
                    })
                  }
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-[0.9rem] outline-none transition-colors duration-200 focus:border-[#4a6cf7] cursor-pointer"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Due Date
                </label>
                <input
                  type="date"
                  value={taskForm.dueDate}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, dueDate: e.target.value })
                  }
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-[0.9rem] outline-none transition-colors duration-200 focus:border-[#4a6cf7]"
                />
              </div>
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Status
                </label>
                <select
                  value={taskForm.status}
                  onChange={(e) =>
                    setTaskForm({
                      ...taskForm,
                      status: e.target.value as Task["status"],
                    })
                  }
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-[0.9rem] outline-none transition-colors duration-200 focus:border-[#4a6cf7] cursor-pointer"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="flex justify-end gap-2.5 mt-6">
                <button
                  type="button"
                  onClick={() => setTaskModalOpen(false)}
                  className="bg-transparent text-[#8888a0] border border-[#2a2a3a] px-[22px] py-2.5 text-[0.9rem] font-medium rounded-[10px] cursor-pointer transition-all duration-200 hover:border-[#8888a0] hover:text-[#f0f0f5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] text-white border-none px-[22px] py-2.5 text-[0.9rem] font-semibold rounded-[10px] cursor-pointer transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(74,108,247,0.3)]"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== Role Modal ==================== */}
      {roleModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center"
          onClick={() => setRoleModalOpen(false)}
        >
          <div
            className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl w-full max-w-[480px] p-7 animate-[fadeIn_0.25s_ease]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[1.2rem] font-bold">
                {editRoleId ? "Edit Role" : "Add Role"}
              </h3>
              <button
                onClick={() => setRoleModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center border-none bg-transparent text-[#8888a0] text-[1.3rem] cursor-pointer rounded-lg transition-all duration-200 hover:bg-[#1a1a26] hover:text-[#f0f0f5]"
              >
                &times;
              </button>
            </div>
            <form onSubmit={saveRole}>
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Role Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Project Manager"
                  value={roleForm.name}
                  onChange={(e) =>
                    setRoleForm({ ...roleForm, name: e.target.value })
                  }
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-[0.9rem] outline-none transition-colors duration-200 focus:border-[#4a6cf7] placeholder:text-[#8888a0]"
                />
              </div>
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the role responsibilities..."
                  value={roleForm.description}
                  onChange={(e) =>
                    setRoleForm({ ...roleForm, description: e.target.value })
                  }
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-[0.9rem] font-[inherit] outline-none transition-colors duration-200 focus:border-[#4a6cf7] placeholder:text-[#8888a0] resize-y min-h-[60px]"
                />
              </div>
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Color
                </label>
                <select
                  value={roleForm.color}
                  onChange={(e) =>
                    setRoleForm({
                      ...roleForm,
                      color: e.target.value as Role["color"],
                    })
                  }
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-[0.9rem] outline-none transition-colors duration-200 focus:border-[#4a6cf7] cursor-pointer"
                >
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="yellow">Yellow</option>
                  <option value="red">Red</option>
                  <option value="purple">Purple</option>
                </select>
              </div>
              <div className="flex justify-end gap-2.5 mt-6">
                <button
                  type="button"
                  onClick={() => setRoleModalOpen(false)}
                  className="bg-transparent text-[#8888a0] border border-[#2a2a3a] px-[22px] py-2.5 text-[0.9rem] font-medium rounded-[10px] cursor-pointer transition-all duration-200 hover:border-[#8888a0] hover:text-[#f0f0f5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] text-white border-none px-[22px] py-2.5 text-[0.9rem] font-semibold rounded-[10px] cursor-pointer transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(74,108,247,0.3)]"
                >
                  Save Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== Confirm Delete Modal ==================== */}
      {confirmModalOpen && pendingDelete && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center"
          onClick={() => {
            setConfirmModalOpen(false);
            setPendingDelete(null);
          }}
        >
          <div
            className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl w-full max-w-[380px] p-7 animate-[fadeIn_0.25s_ease]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[1.2rem] font-bold">Confirm Delete</h3>
              <button
                onClick={() => {
                  setConfirmModalOpen(false);
                  setPendingDelete(null);
                }}
                className="w-8 h-8 flex items-center justify-center border-none bg-transparent text-[#8888a0] text-[1.3rem] cursor-pointer rounded-lg transition-all duration-200 hover:bg-[#1a1a26] hover:text-[#f0f0f5]"
              >
                &times;
              </button>
            </div>
            <p className="text-[#8888a0] text-[0.95rem] leading-relaxed mb-6">
              {pendingDelete.message}
            </p>
            <div className="flex justify-end gap-2.5">
              <button
                onClick={() => {
                  setConfirmModalOpen(false);
                  setPendingDelete(null);
                }}
                className="bg-transparent text-[#8888a0] border border-[#2a2a3a] px-[22px] py-2.5 text-[0.9rem] font-medium rounded-[10px] cursor-pointer transition-all duration-200 hover:border-[#8888a0] hover:text-[#f0f0f5]"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-[#ef4444] text-white border-none px-[22px] py-2.5 text-[0.9rem] font-semibold rounded-[10px] cursor-pointer transition-all duration-200 hover:bg-[#dc2626]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
