"use client";

import { useState } from "react";
import { Plus, Pencil, X } from "lucide-react";
import type { AppData, Member, MemberStatus } from "../_data/types";
import {
  generateId,
  formatStatus,
  getInitials,
  getRoleColor,
  avatarColorMap,
  roleBadgeColorMap,
  statusBadgeMap,
} from "./shared";

interface MembersViewProps {
  data: AppData;
  onDataChange: (data: AppData) => void;
}

export default function MembersView({ data, onDataChange }: MembersViewProps) {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formRoleId, setFormRoleId] = useState("");
  const [formStatus, setFormStatus] = useState<MemberStatus>("active");

  const filtered = data.members.filter((m) => {
    if (!search) return true;
    return (
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  function openAdd() {
    setEditId(null);
    setFormName("");
    setFormEmail("");
    setFormRoleId("");
    setFormStatus("active");
    setModalOpen(true);
  }

  function openEdit(member: Member) {
    setEditId(member.id);
    setFormName(member.name);
    setFormEmail(member.email);
    setFormRoleId(member.roleId);
    setFormStatus(member.status);
    setModalOpen(true);
  }

  function saveMember() {
    const member: Member = {
      id: editId || generateId(),
      name: formName.trim(),
      email: formEmail.trim(),
      roleId: formRoleId,
      status: formStatus,
      createdAt: editId
        ? data.members.find((m) => m.id === editId)?.createdAt ||
          new Date().toISOString()
        : new Date().toISOString(),
      cultureScore: editId
        ? data.members.find((m) => m.id === editId)?.cultureScore
        : 75,
      gorScore: editId
        ? data.members.find((m) => m.id === editId)?.gorScore
        : { growth: 70, operations: 75, resilience: 72, overall: 72 },
    };

    let newMembers: Member[];
    if (editId) {
      newMembers = data.members.map((m) => (m.id === editId ? member : m));
    } else {
      newMembers = [...data.members, member];
    }

    onDataChange({ ...data, members: newMembers });
    setModalOpen(false);
  }

  function deleteMember(id: string) {
    const newMembers = data.members.filter((m) => m.id !== id);
    const newTasks = data.tasks.map((t) =>
      t.assigneeId === id ? { ...t, assigneeId: "" } : t
    );
    onDataChange({ ...data, members: newMembers, tasks: newTasks });
    setConfirmDeleteId(null);
  }

  return (
    <div className="animate-[fadeIn_0.3s_ease]">
      <div className="flex justify-between items-center mb-7">
        <h2 className="text-[1.6rem] font-bold text-[#f0f0f5]">
          Team Members
        </h2>
        <button
          onClick={openAdd}
          className="bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] text-white border-none px-5 py-2.5 text-sm font-semibold rounded-[10px] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(74,108,247,0.3)] flex items-center gap-2"
        >
          <Plus size={16} /> Add Member
        </button>
      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full py-3 px-4 bg-[#12121a] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none transition-colors duration-200 focus:border-[#4a6cf7] placeholder:text-[#8888a0]"
        />
      </div>

      {/* Members List */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-[#8888a0] text-base">
            {data.members.length === 0
              ? "No team members yet. Add your first member to get started."
              : "No members match your search."}
          </div>
        ) : (
          filtered.map((member) => {
            const role = data.roles.find((r) => r.id === member.roleId);
            const color = getRoleColor(role);
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
                      className={`w-10 h-10 min-w-[40px] rounded-[10px] flex items-center justify-center font-bold text-[0.85rem] ${avatarColorMap[color]}`}
                    >
                      {getInitials(member.name)}
                    </div>
                    <div>
                      <div className="font-semibold text-[0.95rem] text-[#f0f0f5]">
                        {member.name}
                      </div>
                      <div className="text-[0.8rem] text-[#8888a0]">
                        {member.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => openEdit(member)}
                      title="Edit"
                      className="w-8 h-8 flex items-center justify-center border border-[#2a2a3a] bg-transparent text-[#8888a0] rounded-lg cursor-pointer text-sm transition-all duration-200 hover:bg-[#1a1a26] hover:text-[#f0f0f5] hover:border-[#8888a0]"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(member.id)}
                      title="Delete"
                      className="w-8 h-8 flex items-center justify-center border border-[#2a2a3a] bg-transparent text-[#8888a0] rounded-lg cursor-pointer text-sm transition-all duration-200 hover:bg-[rgba(239,68,68,0.15)] hover:text-[#ef4444] hover:border-[#ef4444]"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span
                    className={`inline-block px-3 py-1 rounded-lg text-[0.78rem] font-semibold ${roleBadgeColorMap[color]}`}
                  >
                    {role ? role.name : "No Role"}
                  </span>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-md text-[0.72rem] font-semibold uppercase tracking-wide ${statusBadgeMap[member.status]}`}
                  >
                    {formatStatus(member.status)}
                  </span>
                  <span className="text-[0.78rem] text-[#8888a0]">
                    {taskCount} active task{taskCount !== 1 ? "s" : ""}
                  </span>
                  {member.gorScore && (
                    <span className="text-[0.78rem] text-[#8888a0]">
                      GOR: {member.gorScore.overall}
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
                {editId ? "Edit Member" : "Add Member"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center border-none bg-transparent text-[#8888a0] text-xl cursor-pointer rounded-lg transition-all duration-200 hover:bg-[#1a1a26] hover:text-[#f0f0f5]"
              >
                <X size={18} />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveMember();
              }}
            >
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jane Smith"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none transition-colors duration-200 focus:border-[#4a6cf7] placeholder:text-[#8888a0]"
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
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none transition-colors duration-200 focus:border-[#4a6cf7] placeholder:text-[#8888a0]"
                />
              </div>
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Role
                </label>
                <select
                  required
                  value={formRoleId}
                  onChange={(e) => setFormRoleId(e.target.value)}
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none transition-colors duration-200 focus:border-[#4a6cf7] cursor-pointer"
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
                  value={formStatus}
                  onChange={(e) =>
                    setFormStatus(e.target.value as MemberStatus)
                  }
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none transition-colors duration-200 focus:border-[#4a6cf7] cursor-pointer"
                >
                  <option value="active">Active</option>
                  <option value="on-leave">On Leave</option>
                  <option value="inactive">Inactive</option>
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
                  Save Member
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
              Are you sure you want to delete this member? Their tasks will
              become unassigned.
            </p>
            <div className="flex justify-end gap-2.5 mt-6">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="bg-transparent text-[#8888a0] border border-[#2a2a3a] px-5 py-2.5 text-sm font-medium rounded-[10px] cursor-pointer transition-all duration-200 hover:border-[#8888a0] hover:text-[#f0f0f5]"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteMember(confirmDeleteId)}
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
