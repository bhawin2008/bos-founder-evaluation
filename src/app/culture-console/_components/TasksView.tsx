"use client";

import { useState } from "react";
import { Plus, Pencil, X, Check } from "lucide-react";
import type { AppData, Task, TaskPriority, TaskStatus } from "../_data/types";
import {
  generateId,
  formatStatus,
  formatDate,
  statusBadgeMap,
  priorityBadgeMap,
} from "./shared";

interface TasksViewProps {
  data: AppData;
  onDataChange: (data: AppData) => void;
}

export default function TasksView({ data, onDataChange }: TasksViewProps) {
  const [currentFilter, setCurrentFilter] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Form state
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formAssigneeId, setFormAssigneeId] = useState("");
  const [formPriority, setFormPriority] = useState<TaskPriority>("medium");
  const [formDueDate, setFormDueDate] = useState("");
  const [formStatus, setFormStatus] = useState<TaskStatus>("pending");

  const filtered = data.tasks
    .filter((t) => {
      if (currentFilter === "all") return true;
      return t.status === currentFilter;
    })
    .sort((a, b) => {
      const priorityOrder: Record<string, number> = {
        high: 0,
        medium: 1,
        low: 2,
      };
      const statusOrder: Record<string, number> = {
        "in-progress": 0,
        pending: 1,
        completed: 2,
      };
      if (statusOrder[a.status] !== statusOrder[b.status]) {
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  function openAdd() {
    setEditId(null);
    setFormTitle("");
    setFormDescription("");
    setFormAssigneeId("");
    setFormPriority("medium");
    setFormDueDate("");
    setFormStatus("pending");
    setModalOpen(true);
  }

  function openEdit(task: Task) {
    setEditId(task.id);
    setFormTitle(task.title);
    setFormDescription(task.description);
    setFormAssigneeId(task.assigneeId);
    setFormPriority(task.priority);
    setFormDueDate(task.dueDate);
    setFormStatus(task.status);
    setModalOpen(true);
  }

  function saveTask() {
    const task: Task = {
      id: editId || generateId(),
      title: formTitle.trim(),
      description: formDescription.trim(),
      assigneeId: formAssigneeId,
      priority: formPriority,
      dueDate: formDueDate,
      status: formStatus,
      createdAt: editId
        ? data.tasks.find((t) => t.id === editId)?.createdAt ||
          new Date().toISOString()
        : new Date().toISOString(),
      completedAt:
        formStatus === "completed"
          ? new Date().toISOString()
          : null,
    };

    let newTasks: Task[];
    if (editId) {
      newTasks = data.tasks.map((t) => (t.id === editId ? task : t));
    } else {
      newTasks = [...data.tasks, task];
    }

    onDataChange({ ...data, tasks: newTasks });
    setModalOpen(false);
  }

  function toggleTaskStatus(id: string) {
    const newTasks = data.tasks.map((t) => {
      if (t.id !== id) return t;
      if (t.status === "completed") {
        return { ...t, status: "pending" as TaskStatus, completedAt: null };
      }
      return {
        ...t,
        status: "completed" as TaskStatus,
        completedAt: new Date().toISOString(),
      };
    });
    onDataChange({ ...data, tasks: newTasks });
  }

  function deleteTask(id: string) {
    const newTasks = data.tasks.filter((t) => t.id !== id);
    onDataChange({ ...data, tasks: newTasks });
    setConfirmDeleteId(null);
  }

  const filterButtons = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "in-progress", label: "In Progress" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="animate-[fadeIn_0.3s_ease]">
      <div className="flex justify-between items-center mb-7">
        <h2 className="text-[1.6rem] font-bold text-[#f0f0f5]">Tasks</h2>
        <button
          onClick={openAdd}
          className="bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] text-white border-none px-5 py-2.5 text-sm font-semibold rounded-[10px] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(74,108,247,0.3)] flex items-center gap-2"
        >
          <Plus size={16} /> Add Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {filterButtons.map((f) => (
          <button
            key={f.key}
            onClick={() => setCurrentFilter(f.key)}
            className={`px-4 py-2 border rounded-lg text-[0.85rem] font-medium cursor-pointer transition-all duration-200 ${
              currentFilter === f.key
                ? "bg-[rgba(74,108,247,0.12)] border-[#4a6cf7] text-[#4a6cf7]"
                : "bg-transparent border-[#2a2a3a] text-[#8888a0] hover:border-[#8888a0] hover:text-[#f0f0f5]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-[#8888a0] text-base">
            {data.tasks.length === 0
              ? "No tasks yet. Add your first task to get started."
              : "No tasks match the current filter."}
          </div>
        ) : (
          filtered.map((task) => {
            const assignee = data.members.find(
              (m) => m.id === task.assigneeId
            );
            const isCompleted = task.status === "completed";
            return (
              <div
                key={task.id}
                className={`bg-[#12121a] border border-[#2a2a3a] rounded-[14px] px-5 py-[18px] transition-colors duration-200 hover:border-[#3a3a4a] group`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className={`w-6 h-6 min-w-[24px] border-2 rounded-md flex items-center justify-center cursor-pointer text-xs transition-all duration-200 mt-0.5 ${
                        isCompleted
                          ? "bg-[#22c55e] border-[#22c55e] text-white"
                          : "border-[#2a2a3a] bg-transparent text-transparent hover:border-[#4a6cf7]"
                      }`}
                    >
                      {isCompleted && <Check size={14} />}
                    </button>
                    <div>
                      <div
                        className={`font-semibold text-[0.95rem] ${
                          isCompleted
                            ? "line-through text-[#8888a0]"
                            : "text-[#f0f0f5]"
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
                      onClick={() => openEdit(task)}
                      title="Edit"
                      className="w-8 h-8 flex items-center justify-center border border-[#2a2a3a] bg-transparent text-[#8888a0] rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#1a1a26] hover:text-[#f0f0f5] hover:border-[#8888a0]"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(task.id)}
                      title="Delete"
                      className="w-8 h-8 flex items-center justify-center border border-[#2a2a3a] bg-transparent text-[#8888a0] rounded-lg cursor-pointer transition-all duration-200 hover:bg-[rgba(239,68,68,0.15)] hover:text-[#ef4444] hover:border-[#ef4444]"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
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

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl w-full max-w-[480px] p-7 animate-[fadeIn_0.25s_ease]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[1.2rem] font-bold text-[#f0f0f5]">
                {editId ? "Edit Task" : "Add Task"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center border-none bg-transparent text-[#8888a0] cursor-pointer rounded-lg hover:bg-[#1a1a26] hover:text-[#f0f0f5]"
              >
                <X size={18} />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveTask();
              }}
            >
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Design landing page"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none transition-colors duration-200 focus:border-[#4a6cf7] placeholder:text-[#8888a0]"
                />
              </div>
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the task..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none transition-colors duration-200 focus:border-[#4a6cf7] placeholder:text-[#8888a0] resize-y min-h-[60px] font-[inherit]"
                />
              </div>
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Assignee
                </label>
                <select
                  required
                  value={formAssigneeId}
                  onChange={(e) => setFormAssigneeId(e.target.value)}
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none transition-colors duration-200 focus:border-[#4a6cf7] cursor-pointer"
                >
                  <option value="">Select a member</option>
                  {data.members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-[18px]">
                  <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                    Priority
                  </label>
                  <select
                    value={formPriority}
                    onChange={(e) =>
                      setFormPriority(e.target.value as TaskPriority)
                    }
                    className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none transition-colors duration-200 focus:border-[#4a6cf7] cursor-pointer"
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
                    value={formDueDate}
                    onChange={(e) => setFormDueDate(e.target.value)}
                    className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none transition-colors duration-200 focus:border-[#4a6cf7]"
                  />
                </div>
              </div>
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Status
                </label>
                <select
                  value={formStatus}
                  onChange={(e) =>
                    setFormStatus(e.target.value as TaskStatus)
                  }
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none transition-colors duration-200 focus:border-[#4a6cf7] cursor-pointer"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="flex justify-end gap-2.5 mt-6">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-transparent text-[#8888a0] border border-[#2a2a3a] px-5 py-2.5 text-sm font-medium rounded-[10px] cursor-pointer transition-all duration-200 hover:border-[#8888a0] hover:text-[#f0f0f5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] text-white border-none px-5 py-2.5 text-sm font-semibold rounded-[10px] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(74,108,247,0.3)]"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl w-full max-w-[380px] p-7 animate-[fadeIn_0.25s_ease]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[1.2rem] font-bold text-[#f0f0f5]">
                Confirm Delete
              </h3>
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="w-8 h-8 flex items-center justify-center border-none bg-transparent text-[#8888a0] cursor-pointer rounded-lg hover:bg-[#1a1a26] hover:text-[#f0f0f5]"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-[#8888a0] text-[0.95rem] leading-relaxed">
              Are you sure you want to delete this task?
            </p>
            <div className="flex justify-end gap-2.5 mt-6">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="bg-transparent text-[#8888a0] border border-[#2a2a3a] px-5 py-2.5 text-sm font-medium rounded-[10px] cursor-pointer transition-all duration-200 hover:border-[#8888a0] hover:text-[#f0f0f5]"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteTask(confirmDeleteId)}
                className="bg-[#ef4444] text-white border-none px-5 py-2.5 text-sm font-semibold rounded-[10px] cursor-pointer transition-all duration-200 hover:bg-[#dc2626]"
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
