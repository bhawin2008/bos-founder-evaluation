"use client";

import { useState } from "react";
import { Plus, X, Shield } from "lucide-react";
import type { Role } from "../_data/types";

interface RolesViewProps {
  roles: Role[];
  onAddRole: (role: Omit<Role, "id">) => void;
  onDeleteRole: (id: string) => void;
}

export default function RolesView({ roles, onAddRole, onDeleteRole }: RolesViewProps) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return;
    onAddRole({ name: name.trim(), description: description.trim(), permissions: [] });
    setName("");
    setDescription("");
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Roles</h2>
          <p className="text-sm text-gray-500">{roles.length} defined roles</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors">
          <Plus size={16} /> Add Role
        </button>
      </div>

      <div className="grid gap-3">
        {roles.map((role) => (
          <div key={role.id} className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">{role.name}</p>
                <p className="text-xs text-gray-500">{role.description || "No description"}</p>
              </div>
            </div>
            <button onClick={() => onDeleteRole(role.id)} className="text-gray-400 hover:text-red-500"><X size={16} /></button>
          </div>
        ))}
        {roles.length === 0 && <p className="text-center text-gray-400 py-8">No roles defined yet.</p>}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add Role</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="space-y-3">
              <input type="text" placeholder="Role name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
              <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" rows={3} />
              <button onClick={handleAdd} className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors">Add Role</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
