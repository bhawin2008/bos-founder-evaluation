"use client";

import { useState, useEffect, useCallback } from "react";
import Sidebar from "./_components/Sidebar";
import DashboardView from "./_components/DashboardView";
import VenturesView from "./_components/VenturesView";
import EvaluateView from "./_components/EvaluateView";
import PipelineView from "./_components/PipelineView";
import {
  Venture,
  VentureScores,
  ViewName,
  Stage,
  RevenueModel,
  SEED_VENTURES,
  CRITERIA,
  STAGE_LABELS,
  REVENUE_MODEL_LABELS,
  getOverallScore,
  scoreColor,
  scoreColorVar,
} from "./_data/types";

const STORAGE_KEY = "startup-studio-ventures";

function loadVentures(): Venture[] {
  if (typeof window === "undefined") return SEED_VENTURES;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return SEED_VENTURES;
    }
  }
  return SEED_VENTURES;
}

function saveVentures(ventures: Venture[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ventures));
}

export default function StartupStudioPage() {
  const [ventures, setVentures] = useState<Venture[]>([]);
  const [currentView, setCurrentView] = useState<ViewName>("dashboard");
  const [showVentureModal, setShowVentureModal] = useState(false);
  const [editingVentureId, setEditingVentureId] = useState<string | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailVentureId, setDetailVentureId] = useState<string | null>(null);
  const [evaluateVentureId, setEvaluateVentureId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Form state
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formStage, setFormStage] = useState<Stage>("idea");
  const [formMarket, setFormMarket] = useState("");
  const [formRevenueModel, setFormRevenueModel] = useState<RevenueModel | "">("");

  useEffect(() => {
    setVentures(loadVentures());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      saveVentures(ventures);
    }
  }, [ventures, mounted]);

  // --- Modal handlers ---

  const openNewVentureModal = useCallback(() => {
    setEditingVentureId(null);
    setFormName("");
    setFormDescription("");
    setFormStage("idea");
    setFormMarket("");
    setFormRevenueModel("");
    setShowVentureModal(true);
  }, []);

  const openEditVentureModal = useCallback(
    (id: string) => {
      const v = ventures.find((x) => x.id === id);
      if (!v) return;
      setEditingVentureId(v.id);
      setFormName(v.name);
      setFormDescription(v.description);
      setFormStage(v.stage);
      setFormMarket(v.market);
      setFormRevenueModel(v.revenueModel);
      setShowVentureModal(true);
    },
    [ventures]
  );

  const closeVentureModal = useCallback(() => {
    setShowVentureModal(false);
    setEditingVentureId(null);
  }, []);

  const handleSaveVenture = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!formName.trim() || !formDescription.trim()) return;

      if (editingVentureId) {
        setVentures((prev) =>
          prev.map((v) =>
            v.id === editingVentureId
              ? {
                  ...v,
                  name: formName.trim(),
                  description: formDescription.trim(),
                  stage: formStage,
                  market: formMarket.trim(),
                  revenueModel: formRevenueModel,
                  updatedAt: new Date().toISOString(),
                }
              : v
          )
        );
      } else {
        const newVenture: Venture = {
          id: Date.now().toString(),
          name: formName.trim(),
          description: formDescription.trim(),
          stage: formStage,
          market: formMarket.trim(),
          revenueModel: formRevenueModel,
          scores: {},
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setVentures((prev) => [...prev, newVenture]);
      }

      closeVentureModal();
    },
    [
      editingVentureId,
      formName,
      formDescription,
      formStage,
      formMarket,
      formRevenueModel,
      closeVentureModal,
    ]
  );

  // --- Detail modal handlers ---

  const showVentureDetail = useCallback((id: string) => {
    setDetailVentureId(id);
    setShowDetailModal(true);
  }, []);

  const closeDetailModal = useCallback(() => {
    setShowDetailModal(false);
    setDetailVentureId(null);
  }, []);

  const handleEditFromDetail = useCallback(
    (id: string) => {
      closeDetailModal();
      openEditVentureModal(id);
    },
    [closeDetailModal, openEditVentureModal]
  );

  const handleEvaluateFromDetail = useCallback(
    (id: string) => {
      closeDetailModal();
      setEvaluateVentureId(id);
      setCurrentView("evaluate");
    },
    [closeDetailModal]
  );

  const handleDeleteVenture = useCallback(
    (id: string) => {
      if (window.confirm("Are you sure you want to delete this venture?")) {
        setVentures((prev) => prev.filter((v) => v.id !== id));
        closeDetailModal();
      }
    },
    [closeDetailModal]
  );

  // --- Evaluation handler ---

  const handleSaveEvaluation = useCallback(
    (ventureId: string, scores: VentureScores) => {
      setVentures((prev) =>
        prev.map((v) =>
          v.id === ventureId
            ? { ...v, scores, updatedAt: new Date().toISOString() }
            : v
        )
      );
      setEvaluateVentureId(null);
    },
    []
  );

  // --- Navigation ---

  const handleNavigate = useCallback((view: ViewName) => {
    setCurrentView(view);
    setEvaluateVentureId(null);
  }, []);

  // Detail venture for modal
  const detailVenture = detailVentureId
    ? ventures.find((v) => v.id === detailVentureId)
    : null;

  if (!mounted) {
    return (
      <div className="flex min-h-screen bg-[#0f1117] text-[#e8eaed]">
        <aside className="w-60 bg-[#161822] border-r border-[#2a2e3f]" />
        <main className="flex-1 ml-60 p-8" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0f1117] text-[#e8eaed] font-sans">
      <Sidebar activeView={currentView} onNavigate={handleNavigate} />

      <main className="flex-1 ml-60 p-8">
        {currentView === "dashboard" && (
          <DashboardView
            ventures={ventures}
            onNewVenture={openNewVentureModal}
          />
        )}
        {currentView === "ventures" && (
          <VenturesView
            ventures={ventures}
            onVentureClick={showVentureDetail}
          />
        )}
        {currentView === "evaluate" && (
          <EvaluateView
            ventures={ventures}
            onSaveEvaluation={handleSaveEvaluation}
            initialVentureId={evaluateVentureId}
          />
        )}
        {currentView === "pipeline" && (
          <PipelineView
            ventures={ventures}
            onVentureClick={showVentureDetail}
          />
        )}
      </main>

      {/* New / Edit Venture Modal */}
      {showVentureModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100]"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeVentureModal();
          }}
        >
          <div className="bg-[#161822] border border-[#2a2e3f] rounded-xl w-[480px] max-w-[90vw] max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center px-5 py-4 border-b border-[#2a2e3f]">
              <h3 className="text-lg font-semibold text-[#e8eaed]">
                {editingVentureId ? "Edit Venture" : "New Venture"}
              </h3>
              <button
                onClick={closeVentureModal}
                className="bg-transparent border-none text-[#6b7185] text-2xl cursor-pointer leading-none hover:text-[#e8eaed]"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSaveVenture} className="p-5">
              <div className="mb-4">
                <label className="block text-[0.85rem] text-[#9aa0b2] mb-1.5 font-medium">
                  Venture Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Scheduling Assistant"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#232738] border border-[#2a2e3f] rounded-lg text-[#e8eaed] text-sm font-sans focus:outline-none focus:border-[#6c5ce7]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-[0.85rem] text-[#9aa0b2] mb-1.5 font-medium">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Brief description of the venture..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#232738] border border-[#2a2e3f] rounded-lg text-[#e8eaed] text-sm font-sans focus:outline-none focus:border-[#6c5ce7] resize-vertical"
                />
              </div>
              <div className="mb-4">
                <label className="block text-[0.85rem] text-[#9aa0b2] mb-1.5 font-medium">
                  Stage
                </label>
                <select
                  value={formStage}
                  onChange={(e) => setFormStage(e.target.value as Stage)}
                  className="w-full px-3 py-2.5 bg-[#232738] border border-[#2a2e3f] rounded-lg text-[#e8eaed] text-sm font-sans focus:outline-none focus:border-[#6c5ce7]"
                >
                  <option value="idea">Idea</option>
                  <option value="validating">Validating</option>
                  <option value="building">Building</option>
                  <option value="launched">Launched</option>
                  <option value="paused">Paused</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-[0.85rem] text-[#9aa0b2] mb-1.5 font-medium">
                  Target Market
                </label>
                <input
                  type="text"
                  placeholder="e.g. Small business owners"
                  value={formMarket}
                  onChange={(e) => setFormMarket(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#232738] border border-[#2a2e3f] rounded-lg text-[#e8eaed] text-sm font-sans focus:outline-none focus:border-[#6c5ce7]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-[0.85rem] text-[#9aa0b2] mb-1.5 font-medium">
                  Revenue Model
                </label>
                <select
                  value={formRevenueModel}
                  onChange={(e) =>
                    setFormRevenueModel(e.target.value as RevenueModel | "")
                  }
                  className="w-full px-3 py-2.5 bg-[#232738] border border-[#2a2e3f] rounded-lg text-[#e8eaed] text-sm font-sans focus:outline-none focus:border-[#6c5ce7]"
                >
                  <option value="">Select...</option>
                  <option value="saas">SaaS Subscription</option>
                  <option value="marketplace">Marketplace</option>
                  <option value="freemium">Freemium</option>
                  <option value="transactional">Transactional</option>
                  <option value="advertising">Advertising</option>
                  <option value="licensing">Licensing</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex gap-2.5 justify-end mt-2">
                <button
                  type="button"
                  onClick={closeVentureModal}
                  className="px-4 py-2 rounded-lg bg-[#232738] text-[#e8eaed] border border-[#2a2e3f] text-sm font-semibold hover:bg-[#1c1f2e] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#6c5ce7] text-white text-sm font-semibold hover:bg-[#7e70f0] transition-all"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Venture Detail Modal */}
      {showDetailModal && detailVenture && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100]"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeDetailModal();
          }}
        >
          <div className="bg-[#161822] border border-[#2a2e3f] rounded-xl w-[640px] max-w-[90vw] max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center px-5 py-4 border-b border-[#2a2e3f]">
              <h3 className="text-lg font-semibold text-[#e8eaed]">
                {detailVenture.name}
              </h3>
              <button
                onClick={closeDetailModal}
                className="bg-transparent border-none text-[#6b7185] text-2xl cursor-pointer leading-none hover:text-[#e8eaed]"
              >
                &times;
              </button>
            </div>
            <div className="p-5">
              {/* Description */}
              <div className="mb-5">
                <h4 className="text-xs text-[#6b7185] uppercase tracking-wide mb-2">
                  Description
                </h4>
                <p className="text-sm text-[#9aa0b2] leading-relaxed">
                  {detailVenture.description}
                </p>
              </div>

              {/* Meta grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                <div className="bg-[#232738] p-3 rounded-lg">
                  <div className="text-[0.75rem] text-[#6b7185] uppercase">
                    Stage
                  </div>
                  <div className="text-[0.95rem] font-semibold mt-0.5 text-[#e8eaed]">
                    {STAGE_LABELS[detailVenture.stage]}
                  </div>
                </div>
                <div className="bg-[#232738] p-3 rounded-lg">
                  <div className="text-[0.75rem] text-[#6b7185] uppercase">
                    Revenue Model
                  </div>
                  <div className="text-[0.95rem] font-semibold mt-0.5 text-[#e8eaed]">
                    {detailVenture.revenueModel
                      ? REVENUE_MODEL_LABELS[detailVenture.revenueModel as RevenueModel]
                      : "Not set"}
                  </div>
                </div>
                <div className="bg-[#232738] p-3 rounded-lg">
                  <div className="text-[0.75rem] text-[#6b7185] uppercase">
                    Target Market
                  </div>
                  <div className="text-[0.95rem] font-semibold mt-0.5 text-[#e8eaed]">
                    {detailVenture.market || "Not defined"}
                  </div>
                </div>
                <div className="bg-[#232738] p-3 rounded-lg">
                  <div className="text-[0.75rem] text-[#6b7185] uppercase">
                    Overall Score
                  </div>
                  <div className="text-[0.95rem] font-semibold mt-0.5 text-[#e8eaed]">
                    {Object.keys(detailVenture.scores).length > 0
                      ? `${getOverallScore(detailVenture)}%`
                      : "Not evaluated"}
                  </div>
                </div>
              </div>

              {/* Evaluation Scores */}
              {Object.keys(detailVenture.scores).length > 0 && (
                <div className="mb-5">
                  <h4 className="text-xs text-[#6b7185] uppercase tracking-wide mb-2">
                    Evaluation Scores
                  </h4>
                  <div className="flex flex-col gap-2.5">
                    {CRITERIA.map((c) => {
                      const val = detailVenture.scores[c.id] ?? 0;
                      const pct = val * 10;
                      const color = scoreColorVar(pct);
                      return (
                        <div
                          key={c.id}
                          className="flex justify-between items-center text-[0.85rem]"
                        >
                          <span className="min-w-[140px] text-[#e8eaed]">
                            {c.label}
                          </span>
                          <div className="flex-1 mx-3 h-1.5 bg-[#232738] rounded-sm overflow-hidden">
                            <div
                              className="h-full rounded-sm transition-all duration-300"
                              style={{
                                width: `${pct}%`,
                                backgroundColor: color,
                              }}
                            />
                          </div>
                          <span className="min-w-[40px] text-right text-[#e8eaed]">
                            {val}/10
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2.5 mt-5 pt-4 border-t border-[#2a2e3f]">
                <button
                  onClick={() => handleEditFromDetail(detailVenture.id)}
                  className="px-3 py-1.5 rounded-lg bg-[#6c5ce7] text-white text-xs font-semibold hover:bg-[#7e70f0] transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleEvaluateFromDetail(detailVenture.id)}
                  className="px-3 py-1.5 rounded-lg bg-[#232738] text-[#e8eaed] border border-[#2a2e3f] text-xs font-semibold hover:bg-[#1c1f2e] transition-all"
                >
                  Evaluate
                </button>
                <button
                  onClick={() => handleDeleteVenture(detailVenture.id)}
                  className="px-3 py-1.5 rounded-lg bg-[#ff6b6b] text-white text-xs font-semibold hover:opacity-90 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
