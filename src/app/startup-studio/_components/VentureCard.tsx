"use client";

import {
  Venture,
  STAGE_LABELS,
  REVENUE_MODEL_LABELS,
  getOverallScore,
  scoreColor,
  RevenueModel,
} from "../_data/types";

const STAGE_BADGE_CLASSES: Record<string, string> = {
  idea: "bg-[#a29bfe]/20 text-[#a29bfe]",
  validating: "bg-[#fdcb6e]/20 text-[#fdcb6e]",
  building: "bg-[#74b9ff]/20 text-[#74b9ff]",
  launched: "bg-[#00cec9]/20 text-[#00cec9]",
  paused: "bg-[#636e72]/20 text-[#636e72]",
};

interface VentureCardProps {
  venture: Venture;
  onClick: (id: string) => void;
}

export default function VentureCard({ venture, onClick }: VentureCardProps) {
  const score = getOverallScore(venture);
  const hasScore = Object.keys(venture.scores).length > 0;

  return (
    <div
      className="bg-[#1c1f2e] border border-[#2a2e3f] rounded-xl p-5 cursor-pointer transition-all hover:border-[#6c5ce7] hover:-translate-y-0.5"
      onClick={() => onClick(venture.id)}
    >
      <div className="flex justify-between items-start mb-2.5">
        <h4 className="text-base font-semibold text-[#e8eaed]">
          {venture.name}
        </h4>
        <span
          className={`px-2.5 py-0.5 rounded-xl text-[0.7rem] font-semibold uppercase tracking-wide ${STAGE_BADGE_CLASSES[venture.stage]}`}
        >
          {STAGE_LABELS[venture.stage]}
        </span>
      </div>

      <div className="text-[0.85rem] text-[#9aa0b2] mb-3.5 leading-relaxed">
        {venture.description}
      </div>

      <div className="flex gap-4 text-xs text-[#6b7185]">
        <span>{venture.market || "No market defined"}</span>
        {venture.revenueModel && (
          <span>{REVENUE_MODEL_LABELS[venture.revenueModel as RevenueModel]}</span>
        )}
      </div>

      <div className="mt-3">
        {hasScore ? (
          <>
            <div className="flex justify-between text-[0.75rem] text-[#6b7185]">
              <span>Score</span>
              <span>{score}%</span>
            </div>
            <div className="h-1.5 bg-[#232738] rounded-sm overflow-hidden mt-1">
              <div
                className={`h-full rounded-sm transition-all duration-300 ${scoreColor(score)}`}
                style={{ width: `${score}%` }}
              />
            </div>
          </>
        ) : (
          <div className="text-[0.75rem] text-[#6b7185]">Not evaluated</div>
        )}
      </div>
    </div>
  );
}

export { STAGE_BADGE_CLASSES };
