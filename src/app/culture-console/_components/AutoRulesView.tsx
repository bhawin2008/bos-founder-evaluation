"use client";

import { useState } from "react";
import { Plus, Pencil, X, Zap, ToggleLeft, ToggleRight, Clock } from "lucide-react";
import type { AppData, AutoRule } from "../_data/types";
import { generateId } from "./shared";

interface AutoRulesViewProps {
  data: AppData;
  onDataChange: (data: AppData) => void;
}

export default function AutoRulesView({
  data,
  onDataChange,
}: AutoRulesViewProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Form
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formTriggerSignal, setFormTriggerSignal] = useState("");
  const [formCondition, setFormCondition] = useState<
    "above" | "below" | "equals"
  >("below");
  const [formConditionValue, setFormConditionValue] = useState(50);
  const [formAction, setFormAction] = useState("");

  function openAdd() {
    setEditId(null);
    setFormName("");
    setFormDescription("");
    setFormTriggerSignal(data.signals[0]?.id || "");
    setFormCondition("below");
    setFormConditionValue(50);
    setFormAction("");
    setModalOpen(true);
  }

  function openEdit(rule: AutoRule) {
    setEditId(rule.id);
    setFormName(rule.name);
    setFormDescription(rule.description);
    setFormTriggerSignal(rule.triggerSignal);
    setFormCondition(rule.condition);
    setFormConditionValue(rule.conditionValue);
    setFormAction(rule.action);
    setModalOpen(true);
  }

  function saveRule() {
    const rule: AutoRule = {
      id: editId || generateId(),
      name: formName.trim(),
      description: formDescription.trim(),
      triggerSignal: formTriggerSignal,
      condition: formCondition,
      conditionValue: formConditionValue,
      action: formAction.trim(),
      enabled: editId
        ? data.autoRules.find((r) => r.id === editId)?.enabled ?? true
        : true,
      lastTriggered: editId
        ? data.autoRules.find((r) => r.id === editId)?.lastTriggered ?? null
        : null,
    };

    let newRules: AutoRule[];
    if (editId) {
      newRules = data.autoRules.map((r) => (r.id === editId ? rule : r));
    } else {
      newRules = [...data.autoRules, rule];
    }

    onDataChange({ ...data, autoRules: newRules });
    setModalOpen(false);
  }

  function toggleRule(id: string) {
    const newRules = data.autoRules.map((r) =>
      r.id === id ? { ...r, enabled: !r.enabled } : r
    );
    onDataChange({ ...data, autoRules: newRules });
  }

  function deleteRule(id: string) {
    onDataChange({
      ...data,
      autoRules: data.autoRules.filter((r) => r.id !== id),
    });
  }

  const activeCount = data.autoRules.filter((r) => r.enabled).length;

  return (
    <div className="animate-[fadeIn_0.3s_ease]">
      <div className="flex justify-between items-center mb-7">
        <div>
          <h2 className="text-[1.6rem] font-bold text-[#f0f0f5]">
            Auto Rules
          </h2>
          <p className="text-[#8888a0] text-sm mt-1">
            Automated responses triggered by signal thresholds
          </p>
        </div>
        <button
          onClick={openAdd}
          className="bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] text-white border-none px-5 py-2.5 text-sm font-semibold rounded-[10px] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(74,108,247,0.3)] flex items-center gap-2"
        >
          <Plus size={16} /> Add Rule
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6 max-md:grid-cols-1">
        <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[rgba(74,108,247,0.12)] flex items-center justify-center text-[#4a6cf7]">
            <Zap size={22} />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#f0f0f5]">
              {data.autoRules.length}
            </div>
            <div className="text-[0.78rem] text-[#8888a0]">Total Rules</div>
          </div>
        </div>
        <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[rgba(34,197,94,0.12)] flex items-center justify-center text-[#22c55e]">
            <ToggleRight size={22} />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#f0f0f5]">
              {activeCount}
            </div>
            <div className="text-[0.78rem] text-[#8888a0]">Active Rules</div>
          </div>
        </div>
        <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[rgba(234,179,8,0.12)] flex items-center justify-center text-[#eab308]">
            <Clock size={22} />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#f0f0f5]">
              {data.autoRules.filter((r) => r.lastTriggered).length}
            </div>
            <div className="text-[0.78rem] text-[#8888a0]">
              Previously Triggered
            </div>
          </div>
        </div>
      </div>

      {/* Rules List */}
      <div className="flex flex-col gap-3">
        {data.autoRules.length === 0 ? (
          <div className="text-center py-12 text-[#8888a0] text-base">
            No auto rules configured. Add a rule to automate responses to signal
            changes.
          </div>
        ) : (
          data.autoRules.map((rule) => {
            const signal = data.signals.find(
              (s) => s.id === rule.triggerSignal
            );
            return (
              <div
                key={rule.id}
                className={`bg-[#12121a] border border-[#2a2a3a] rounded-[14px] px-5 py-[18px] transition-colors duration-200 hover:border-[#3a3a4a] group ${
                  !rule.enabled ? "opacity-50" : ""
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleRule(rule.id)}
                      className="bg-transparent border-none cursor-pointer p-0 text-[#8888a0] hover:text-[#f0f0f5]"
                      title={rule.enabled ? "Disable" : "Enable"}
                    >
                      {rule.enabled ? (
                        <ToggleRight size={24} className="text-[#22c55e]" />
                      ) : (
                        <ToggleLeft size={24} />
                      )}
                    </button>
                    <div>
                      <div className="font-semibold text-[0.95rem] text-[#f0f0f5]">
                        {rule.name}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => openEdit(rule)}
                      title="Edit"
                      className="w-8 h-8 flex items-center justify-center border border-[#2a2a3a] bg-transparent text-[#8888a0] rounded-lg cursor-pointer hover:bg-[#1a1a26] hover:text-[#f0f0f5]"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => deleteRule(rule.id)}
                      title="Delete"
                      className="w-8 h-8 flex items-center justify-center border border-[#2a2a3a] bg-transparent text-[#8888a0] rounded-lg cursor-pointer hover:bg-[rgba(239,68,68,0.15)] hover:text-[#ef4444]"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-[0.88rem] text-[#8888a0] leading-relaxed mb-3">
                  {rule.description}
                </p>
                <div className="flex items-center gap-3 mb-2 flex-wrap text-xs text-[#8888a0]">
                  <span className="inline-block px-2 py-0.5 rounded-md bg-[rgba(74,108,247,0.1)] text-[#4a6cf7]">
                    When: {signal ? signal.name : "Unknown Signal"}
                  </span>
                  <span className="inline-block px-2 py-0.5 rounded-md bg-[rgba(234,179,8,0.1)] text-[#eab308]">
                    {rule.condition} {rule.conditionValue}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-[rgba(74,108,247,0.08)] border border-[rgba(74,108,247,0.15)] rounded-lg px-3 py-2">
                  <Zap size={12} className="text-[#4a6cf7] min-w-[12px]" />
                  <span className="text-sm text-[#f0f0f5]">{rule.action}</span>
                </div>
                {rule.lastTriggered && (
                  <div className="mt-2 text-xs text-[#8888a0] flex items-center gap-1">
                    <Clock size={11} />
                    Last triggered:{" "}
                    {new Date(rule.lastTriggered).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                )}
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
                {editId ? "Edit Rule" : "Add Rule"}
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
                saveRule();
              }}
            >
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Rule Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Burnout Alert"
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
                  rows={2}
                  placeholder="Describe what this rule does..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none focus:border-[#4a6cf7] placeholder:text-[#8888a0] resize-y min-h-[50px] font-[inherit]"
                />
              </div>
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Trigger Signal
                </label>
                <select
                  required
                  value={formTriggerSignal}
                  onChange={(e) => setFormTriggerSignal(e.target.value)}
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none focus:border-[#4a6cf7] cursor-pointer"
                >
                  <option value="">Select a signal</option>
                  {data.signals.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-[18px]">
                  <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                    Condition
                  </label>
                  <select
                    value={formCondition}
                    onChange={(e) =>
                      setFormCondition(
                        e.target.value as "above" | "below" | "equals"
                      )
                    }
                    className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none focus:border-[#4a6cf7] cursor-pointer"
                  >
                    <option value="above">Above</option>
                    <option value="below">Below</option>
                    <option value="equals">Equals</option>
                  </select>
                </div>
                <div className="mb-[18px]">
                  <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                    Value
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={formConditionValue}
                    onChange={(e) =>
                      setFormConditionValue(parseInt(e.target.value, 10))
                    }
                    className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none focus:border-[#4a6cf7]"
                  />
                </div>
              </div>
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                  Action
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Send alert to team lead"
                  value={formAction}
                  onChange={(e) => setFormAction(e.target.value)}
                  className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none focus:border-[#4a6cf7] placeholder:text-[#8888a0]"
                />
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
                  Save Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
