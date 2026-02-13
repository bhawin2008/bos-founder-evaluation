"use client";

import { useState, useCallback } from "react";
import {
  Venture,
  VentureScores,
  CRITERIA,
  STAGE_LABELS,
} from "../_data/types";

interface EvaluateViewProps {
  ventures: Venture[];
  onSaveEvaluation: (ventureId: string, scores: VentureScores) => void;
  initialVentureId?: string | null;
}

export default function EvaluateView({
  ventures,
  onSaveEvaluation,
  initialVentureId,
}: EvaluateViewProps) {
  const [evaluatingId, setEvaluatingId] = useState<string | null>(
    initialVentureId ?? null
  );
  const [scores, setScores] = useState<Record<string, number>>({});

  const nonPaused = ventures.filter((v) => v.stage !== "paused");

  const startEvaluation = useCallback(
    (id: string) => {
      const v = ventures.find((x) => x.id === id);
      if (!v) return;
      setEvaluatingId(id);
      const initial: Record<string, number> = {};
      CRITERIA.forEach((c) => {
        initial[c.id] = v.scores[c.id] ?? 5;
      });
      setScores(initial);
    },
    [ventures]
  );

  // Auto-start evaluation if initialVentureId is provided and we haven't started yet
  const evaluatingVenture = evaluatingId
    ? ventures.find((v) => v.id === evaluatingId)
    : null;

  // If an initial venture ID was passed in and we haven't loaded scores yet, initialize
  if (initialVentureId && evaluatingId === initialVentureId && Object.keys(scores).length === 0) {
    const v = ventures.find((x) => x.id === initialVentureId);
    if (v) {
      const initial: Record<string, number> = {};
      CRITERIA.forEach((c) => {
        initial[c.id] = v.scores[c.id] ?? 5;
      });
      setScores(initial);
    }
  }

  const handleScoreChange = (criteriaId: string, value: number) => {
    setScores((prev) => ({ ...prev, [criteriaId]: value }));
  };

  const handleSave = () => {
    if (!evaluatingId) return;
    onSaveEvaluation(evaluatingId, scores as VentureScores);
    handleCancel();
  };

  const handleCancel = () => {
    setEvaluatingId(null);
    setScores({});
  };

  // Selection view
  if (!evaluatingId) {
    return (
      <section>
        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
          <h2 className="text-2xl font-bold text-[#e8eaed]">
            Evaluate Venture
          </h2>
        </div>

        <div>
          <p className="text-[#9aa0b2] mb-4">
            Select a venture to evaluate:
          </p>

          {nonPaused.length === 0 ? (
            <div className="text-center py-12 text-[#6b7185]">
              <p className="text-sm mt-2">
                No ventures available to evaluate.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {nonPaused.map((v) => {
                const hasScore = Object.keys(v.scores).length > 0;
                return (
                  <div
                    key={v.id}
                    onClick={() => startEvaluation(v.id)}
                    className="bg-[#1c1f2e] border border-[#2a2e3f] rounded-lg px-4 py-3.5 cursor-pointer transition-all hover:border-[#6c5ce7] flex justify-between items-center"
                  >
                    <span className="font-semibold text-[#e8eaed]">
                      {v.name}
                    </span>
                    <span className="text-xs text-[#6b7185]">
                      {STAGE_LABELS[v.stage]}
                      {hasScore ? " (re-evaluate)" : ""}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    );
  }

  // Evaluation form
  return (
    <section>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-[#e8eaed]">
          Evaluate Venture
        </h2>
      </div>

      <div className="max-w-[700px]">
        <div className="text-xl font-bold mb-6 text-[#6c5ce7]">
          Evaluating: {evaluatingVenture?.name}
        </div>

        <div className="flex flex-col gap-5 mb-6">
          {CRITERIA.map((c) => (
            <div
              key={c.id}
              className="bg-[#1c1f2e] border border-[#2a2e3f] rounded-lg p-4"
            >
              <label className="block font-semibold text-[#e8eaed] mb-1">
                {c.label}
              </label>
              <div className="text-xs text-[#6b7185] mb-3">{c.desc}</div>
              <input
                type="range"
                min={1}
                max={10}
                value={scores[c.id] ?? 5}
                onChange={(e) =>
                  handleScoreChange(c.id, parseInt(e.target.value))
                }
                className="w-full accent-[#6c5ce7]"
              />
              <div className="text-right text-[0.85rem] text-[#6c5ce7] font-semibold mt-1">
                {scores[c.id] ?? 5} / 10
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2.5 justify-end">
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-lg bg-[#232738] text-[#e8eaed] border border-[#2a2e3f] text-sm font-semibold hover:bg-[#1c1f2e] transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-[#6c5ce7] text-white text-sm font-semibold hover:bg-[#7e70f0] transition-all"
          >
            Save Evaluation
          </button>
        </div>
      </div>
    </section>
  );
}
