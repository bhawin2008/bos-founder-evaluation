"use client";

import {
  Venture,
  PIPELINE_STAGES,
  STAGE_LABELS,
  getOverallScore,
  truncate,
} from "../_data/types";

interface PipelineViewProps {
  ventures: Venture[];
  onVentureClick: (id: string) => void;
}

export default function PipelineView({ ventures, onVentureClick }: PipelineViewProps) {
  return (
    <section>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-[#e8eaed]">Pipeline</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 min-h-[500px]">
        {PIPELINE_STAGES.map((stage) => {
          const stageVentures = ventures.filter((v) => v.stage === stage);

          return (
            <div
              key={stage}
              className="bg-[#161822] border border-[#2a2e3f] rounded-xl flex flex-col"
            >
              <div className="py-3.5 px-4 font-bold text-sm border-b border-[#2a2e3f] text-center text-[#e8eaed]">
                {STAGE_LABELS[stage]}
              </div>
              <div className="p-3 flex flex-col gap-2.5 flex-1">
                {stageVentures.length === 0 ? (
                  <div className="text-center py-5 text-[#6b7185] text-xs">
                    No ventures
                  </div>
                ) : (
                  stageVentures.map((v) => {
                    const hasScore = Object.keys(v.scores).length > 0;
                    const score = getOverallScore(v);

                    return (
                      <div
                        key={v.id}
                        onClick={() => onVentureClick(v.id)}
                        className="bg-[#1c1f2e] border border-[#2a2e3f] rounded-lg p-3 cursor-pointer transition-all hover:border-[#6c5ce7]"
                      >
                        <h5 className="text-[0.85rem] font-semibold mb-1.5 text-[#e8eaed]">
                          {v.name}
                        </h5>
                        <p className="text-[0.75rem] text-[#6b7185] leading-tight">
                          {truncate(v.description, 80)}
                        </p>
                        {hasScore && (
                          <div className="mt-2 text-[0.75rem] text-[#6c5ce7] font-semibold">
                            Score: {score}%
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
