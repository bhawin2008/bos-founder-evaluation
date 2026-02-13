"use client";

import { useState } from "react";
import { Plus, Pencil, X, Radio, ToggleLeft, ToggleRight } from "lucide-react";
import type { AppData, Signal, SignalCategory } from "../_data/types";
import { generateId } from "./shared";

interface SignalFrameworkViewProps {
  data: AppData;
  onDataChange: (data: AppData) => void;
}

const categoryColors: Record<SignalCategory, string> = {
  engagement: "bg-[rgba(74,108,247,0.15)] text-[#4a6cf7]",
  productivity: "bg-[rgba(34,197,94,0.15)] text-[#22c55e]",
  collaboration: "bg-[rgba(168,85,247,0.15)] text-[#a855f7]",
  wellbeing: "bg-[rgba(234,179,8,0.15)] text-[#eab308]",
  leadership: "bg-[rgba(239,68,68,0.15)] text-[#ef4444]",
};

export default function SignalFrameworkView({
  data,
  onDataChange,
}: SignalFrameworkViewProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Form
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formCategory, setFormCategory] = useState<SignalCategory>("engagement");
  const [formWeight, setFormWeight] = useState(0.1);
  const [formThreshold, setFormThreshold] = useState(70);

  function openAdd() {
    setEditId(null);
    setFormName("");
    setFormDescription("");
    setFormCategory("engagement");
    setFormWeight(0.1);
    setFormThreshold(70);
    setModalOpen(true);
  }

  function openEdit(signal: Signal) {
    setEditId(signal.id);
    setFormName(signal.name);
    setFormDescription(signal.description);
    setFormCategory(signal.category);
    setFormWeight(signal.weight);
    setFormThreshold(signal.threshold);
    setModalOpen(true);
  }

  function saveSignal() {
    const signal: Signal = {
      id: editId || generateId(),
      name: formName.trim(),
      description: formDescription.trim(),
      category: formCategory,
      weight: formWeight,
      threshold: formThreshold,
      enabled: editId
        ? data.signals.find((s) => s.id === editId)?.enabled ?? true
        : true,
    };

    let newSignals: Signal[];
    if (editId) {
      newSignals = data.signals.map((s) => (s.id === editId ? signal : s));
    } else {
      newSignals = [...data.signals, signal];
    }

    onDataChange({ ...data, signals: newSignals });
    setModalOpen(false);
  }

  function toggleSignal(id: string) {
    const newSignals = data.signals.map((s) =>
      s.id === id ? { ...s, enabled: !s.enabled } : s
    );
    onDataChange({ ...data, signals: newSignals });
  }

  function deleteSignal(id: string) {
    onDataChange({
      ...data,
      signals: data.signals.filter((s) => s.id !== id),
    });
  }

  const totalWeight = data.signals
    .filter((s) => s.enabled)
    .reduce((sum, s) => sum + s.weight, 0);

  return (
    <div className="animate-[fadeIn_0.3s_ease]">
      <div className="flex justify-between items-center mb-7">
        <div>
          <h2 className="text-[1.6rem] font-bold text-[#f0f0f5]">
            Signal Framework
          </h2>
          <p className="text-[#8888a0] text-sm mt-1">
            Configure culture health signals and their weights
          </p>
        </div>
        <button
          onClick={openAdd}
          className="bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] text-white border-none px-5 py-2.5 text-sm font-semibold rounded-[10px] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(74,108,247,0.3)] flex items-center gap-2"
        >
          <Plus size={16} /> Add Signal
        </button>
      </div>

      {/* Weight Summary */}
      <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-5 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Radio size={18} className="text-[#4a6cf7]" />
            <span className="text-sm font-semibold text-[#f0f0f5]">
              Total Active Signal Weight
            </span>
          </div>
          <div
            className={`text-lg font-bold ${
              Math.abs(totalWeight - 1) < 0.01
                ? "text-[#22c55e]"
                : "text-[#eab308]"
            }`}
          >
            {(totalWeight * 100).toFixed(0)}%
            {Math.abs(totalWeight - 1) >= 0.01 && (
              <span className="text-xs text-[#eab308] ml-2">
                (should equal 100%)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Signals List */}
      <div className="flex flex-col gap-3">
        {data.signals.length === 0 ? (
          <div className="text-center py-12 text-[#8888a0] text-base">
            No signals configured. Add your first signal to start tracking
            culture health.
          </div>
        ) : (
          data.signals.map((signal) => (
            <div
              key={signal.id}
              className={`bg-[#12121a] border border-[#2a2a3a] rounded-[14px] px-5 py-[18px] transition-colors duration-200 hover:border-[#3a3a4a] group ${
                !signal.enabled ? "opacity-50" : ""
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleSignal(signal.id)}
                    className="bg-transparent border-none cursor-pointer p-0 text-[#8888a0] hover:text-[#f0f0f5]"
                    title={signal.enabled ? "Disable" : "Enable"}
                  >
                    {signal.enabled ? (
                      <ToggleRight size={24} className="text-[#22c55e]" />
                    ) : (
                      <ToggleLeft size={24} />
                    )}
                  </button>
                  <div>
                    <div className="font-semibold text-[0.95rem] text-[#f0f0f5]">
                      {signal.name}
                    </div>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-md text-[0.72rem] font-semibold uppercase tracking-wide mt-1 ${categoryColors[signal.category]}`}
                    >
                      {signal.category}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => openEdit(signal)}
                    title="Edit"
                    className="w-8 h-8 flex items-center justify-center border border-[#2a2a3a] bg-transparent text-[#8888a0] rounded-lg cursor-pointer hover:bg-[#1a1a26] hover:text-[#f0f0f5]"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => deleteSignal(signal.id)}
                    title="Delete"
                    className="w-8 h-8 flex items-center justify-center border border-[#2a2a3a] bg-transparent text-[#8888a0] rounded-lg cursor-pointer hover:bg-[rgba(239,68,68,0.15)] hover:text-[#ef4444]"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
              <p className="text-[0.88rem] text-[#8888a0] leading-relaxed mb-3">
                {signal.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-[#8888a0]">
                <span>
                  Weight:{" "}
                  <span className="font-bold text-[#f0f0f5]">
                    {(signal.weight * 100).toFixed(0)}%
                  </span>
                </span>
                <span>
                  Threshold:{" "}
                  <span className="font-bold text-[#f0f0f5]">
                    {signal.threshold}
                  </span>
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl w-full max-w-[480px] p-7 animate-[fadeIn_0.25s_ease]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[1.2rem] font-bold text-[#f0f0f5]">
                {editId ? "Edit Signal" : "Add Signal"}
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
                saveSignal();
              }}
            >
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Signal Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Team Engagement"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none focus:border-[#4a6cf7] placeholder:text-[#8888a0]"
                />
              </div>
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe what this signal measures..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none focus:border-[#4a6cf7] placeholder:text-[#8888a0] resize-y min-h-[60px] font-[inherit]"
                />
              </div>
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Category
                </label>
                <select
                  value={formCategory}
                  onChange={(e) =>
                    setFormCategory(e.target.value as SignalCategory)
                  }
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none focus:border-[#4a6cf7] cursor-pointer"
                >
                  <option value="engagement">Engagement</option>
                  <option value="productivity">Productivity</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="wellbeing">Wellbeing</option>
                  <option value="leadership">Leadership</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-[18px]">
                  <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                    Weight (0-1)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    max="1"
                    required
                    value={formWeight}
                    onChange={(e) => setFormWeight(parseFloat(e.target.value))}
                    className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none focus:border-[#4a6cf7]"
                  />
                </div>
                <div className="mb-[18px]">
                  <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                    Alert Threshold
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={formThreshold}
                    onChange={(e) =>
                      setFormThreshold(parseInt(e.target.value, 10))
                    }
                    className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none focus:border-[#4a6cf7]"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2.5 mt-6">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-transparent text-[#8888a0] border border-[#2a2a3a] px-5 py-2.5 text-sm font-medium rounded-[10px] cursor-pointer hover:border-[#8888a0] hover:text-[#f0f0f5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] text-white border-none px-5 py-2.5 text-sm font-semibold rounded-[10px] cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(74,108,247,0.3)]"
                >
                  Save Signal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
