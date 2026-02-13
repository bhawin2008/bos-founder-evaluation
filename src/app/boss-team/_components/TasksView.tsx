"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import type { Task, Member } from "../_data/types";

interface TasksViewProps {
  tasks: Task[];
  members: Member[];
  onAddTask: (task: Omit<Task, "id" | "createdAt">) => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
}

export default function TasksView({ tasks, members, onAddTask, onUpdateTask, onDeleteTask }: TasksViewProps) {
  const [filter, setFilter] = useState<"all" | "pending" | "in-progress" | "completed">("all");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [dueDate, setDueDate] = useState("");

  const filtered = tasks.filter((t) => filter === "all" || t.status === filter);

  const handleAdd = () => {
    if (!title.trim()) return;
    onAddTask({
      title: title.trim(),
      description: description.trim(),
      assigneeId,
      status: "pending",
      priority,
      dueDate,
      category: "cat_other",
    });
    setTitle("");
    setDescription("");
    setAssigneeId("");
    setPriority("medium");
    setDueDate("");
    setShowForm(false);
  };

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    "in-progress": "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
  };

  const priorityColors: Record<string, string> = {
    low: "bg-gray-100 text-gray-600",
    medium: "bg-amber-100 text-amber-700",
    high: "bg-red-100 text-red-700",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
          <p className="text-sm text-gray-500">{tasks.length} total tasks</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors"
        >
          <Plus size={16} /> Add Task
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        {(["all", "pending", "in-progress", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              filter === f
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((task) => {
          const assignee = members.find((m) => m.id === task.assigneeId);
          return (
            <div key={task.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-gray-900">{task.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>{task.priority}</span>
                  </div>
                  {task.description && <p className="text-sm text-gray-500 mb-2">{task.description}</p>}
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    {assignee && <span>Assigned to {assignee.name}</span>}
                    {task.dueDate && <span>Due {task.dueDate}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <select
                    value={task.status}
                    onChange={(e) => onUpdateTask(task.id, { status: e.target.value as Task["status"] })}
                    className={`text-xs px-2 py-1 rounded-full border-0 cursor-pointer ${statusColors[task.status]}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button onClick={() => onDeleteTask(task.id)} className="text-gray-400 hover:text-red-500">
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-8">No tasks found.</p>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add Task</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="space-y-3">
              <input type="text" placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
              <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" rows={3} />
              <select value={assigneeId} onChange={(e) => setAssigneeId(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900">
                <option value="">Unassigned</option>
                {members.map((m) => (<option key={m.id} value={m.id}>{m.name}</option>))}
              </select>
              <select value={priority} onChange={(e) => setPriority(e.target.value as Task["priority"])} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900">
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
              <button onClick={handleAdd} className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors">Add Task</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
