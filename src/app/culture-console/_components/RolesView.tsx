"use client";

import { useState } from "react";
import { Plus, Pencil, X } from "lucide-react";
import type { AppData, Role, RoleColor } from "../_data/types";
import { generateId, roleBadgeColorMap } from "./shared";

interface RolesViewProps {
  data: AppData;
  onDataChange: (data: AppData) => void;
}

export default function RolesView({ data, onDataChange }: RolesViewProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formColor, setFormColor] = useState<RoleColor>("blue");

  function openAdd() {
    setEditId(null);
    setFormName("");
    setFormDescription("");
    setFormColor("blue");
    setModalOpen(true);
  }

  function openEdit(role: Role) {
    setEditId(role.id);
    setFormName(role.name);
    setFormDescription(role.description);
    setFormColor(role.color);
    setModalOpen(true);
  }

  function saveRole() {
    const role: Role = {
      id: editId || generateId(),
      name: formName.trim(),
      description: formDescription.trim(),
      color: formColor,
      createdAt: editId
        ? data.roles.find((r) => r.id === editId)?.createdAt ||
          new Date().toISOString()
        : new Date().toISOString(),
    };

    let newRoles: Role[];
    if (editId) {
      newRoles = data.roles.map((r) => (r.id === editId ? role : r));
    } else {
      newRoles = [...data.roles, role];
    }

    onDataChange({ ...data, roles: newRoles });
    setModalOpen(false);
  }

  function deleteRole(id: string) {
    const newRoles = data.roles.filter((r) => r.id !== id);
    const newMembers = data.members.map((m) =>
      m.roleId === id ? { ...m, roleId: "" } : m
    );
    onDataChange({ ...data, roles: newRoles, members: newMembers });
    setConfirmDeleteId(null);
  }

  return (
    <div className="animate-[fadeIn_0.3s_ease]">
      <div className="flex justify-between items-center mb-7">
        <h2 className="text-[1.6rem] font-bold text-[#f0f0f5]">Roles</h2>
        <button
          onClick={openAdd}
          className="bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] text-white border-none px-5 py-2.5 text-sm font-semibold rounded-[10px] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(74,108,247,0.3)] flex items-center gap-2"
        >
          <Plus size={16} /> Add Role
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {data.roles.length === 0 ? (
          <div className="text-center py-12 text-[#8888a0] text-base">
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
                    className={`inline-block px-3 py-1 rounded-lg text-[0.78rem] font-semibold ${roleBadgeColorMap[role.color]}`}
                  >
                    {role.name}
                  </span>
                  <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => openEdit(role)}
                      title="Edit"
                      className="w-8 h-8 flex items-center justify-center border border-[#2a2a3a] bg-transparent text-[#8888a0] rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#1a1a26] hover:text-[#f0f0f5] hover:border-[#8888a0]"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(role.id)}
                      title="Delete"
                      className="w-8 h-8 flex items-center justify-center border border-[#2a2a3a] bg-transparent text-[#8888a0] rounded-lg cursor-pointer transition-all duration-200 hover:bg-[rgba(239,68,68,0.15)] hover:text-[#ef4444] hover:border-[#ef4444]"
                    >
                      <X size={14} />
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

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl w-full max-w-[480px] p-7 animate-[fadeIn_0.25s_ease]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[1.2rem] font-bold text-[#f0f0f5]">
                {editId ? "Edit Role" : "Add Role"}
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
                saveRole();
              }}
            >
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Role Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Project Manager"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none transition-colors duration-200 focus:border-[#4a6cf7] placeholder:text-[#8888a0]"
                />
              </div>
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the role responsibilities..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none transition-colors duration-200 focus:border-[#4a6cf7] placeholder:text-[#8888a0] resize-y min-h-[60px] font-[inherit]"
                />
              </div>
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Color
                </label>
                <select
                  value={formColor}
                  onChange={(e) => setFormColor(e.target.value as RoleColor)}
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none transition-colors duration-200 focus:border-[#4a6cf7] cursor-pointer"
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
                  onClick={() => setModalOpen(false)}
                  className="bg-transparent text-[#8888a0] border border-[#2a2a3a] px-5 py-2.5 text-sm font-medium rounded-[10px] cursor-pointer transition-all duration-200 hover:border-[#8888a0] hover:text-[#f0f0f5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] text-white border-none px-5 py-2.5 text-sm font-semibold rounded-[10px] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(74,108,247,0.3)]"
                >
                  Save Role
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
              Are you sure you want to delete this role? Members with this role
              will become unassigned.
            </p>
            <div className="flex justify-end gap-2.5 mt-6">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="bg-transparent text-[#8888a0] border border-[#2a2a3a] px-5 py-2.5 text-sm font-medium rounded-[10px] cursor-pointer transition-all duration-200 hover:border-[#8888a0] hover:text-[#f0f0f5]"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteRole(confirmDeleteId)}
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
