"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { type CategoryKey } from "../_data/questions";
import {
  type CategoryScores,
  type Bottleneck,
  type StatusRange,
  categoryLabels,
  categorySubtitles,
  bottleneckMessages,
  calculateScores,
  getStatus,
  getSectionStatus,
  getBottlenecks,
  getSectionRecommendation,
} from "../_data/scoring";

// ---------------------------------------------------------------------------
// Colour helpers
// ---------------------------------------------------------------------------

const statusCircleBorder: Record<StatusRange["className"], string> = {
  broken: "border-[#ef4444]",
  unreliable: "border-[#eab308]",
  scalable: "border-[#22c55e]",
};

const statusBadgeBg: Record<StatusRange["className"], string> = {
  broken: "bg-[rgba(239,68,68,0.15)] text-[#ef4444]",
  unreliable: "bg-[rgba(234,179,8,0.15)] text-[#eab308]",
  scalable: "bg-[rgba(34,197,94,0.15)] text-[#22c55e]",
};

const sectionColorText: Record<"red" | "yellow" | "green", string> = {
  red: "text-[#ef4444]",
  yellow: "text-[#eab308]",
  green: "text-[#22c55e]",
};

const sectionBarBg: Record<"red" | "yellow" | "green", string> = {
  red: "bg-[#ef4444]",
  yellow: "bg-[#eab308]",
  green: "bg-[#22c55e]",
};

const sectionBadgeBg: Record<"red" | "yellow" | "green", string> = {
  red: "bg-[rgba(239,68,68,0.15)] text-[#ef4444]",
  yellow: "bg-[rgba(234,179,8,0.15)] text-[#eab308]",
  green: "bg-[rgba(34,197,94,0.15)] text-[#22c55e]",
};

// ---------------------------------------------------------------------------
// Animated score counter
// ---------------------------------------------------------------------------

function useAnimatedScore(target: number, durationMs = 1200) {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (target === 0) {
      setCurrent(0);
      return;
    }

    let frame = 0;
    const totalFrames = Math.max(target, 1);
    const stepTime = durationMs / totalFrames;
    let elapsed = 0;
    let lastTime: number | null = null;

    const tick = (timestamp: number) => {
      if (lastTime === null) lastTime = timestamp;
      elapsed += timestamp - lastTime;
      lastTime = timestamp;

      const nextFrame = Math.min(Math.floor(elapsed / stepTime), target);
      if (nextFrame !== frame) {
        frame = nextFrame;
        setCurrent(frame);
      }

      if (frame < target) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, durationMs]);

  return current;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ScorecardRow({
  categoryKey,
  score,
}: {
  categoryKey: CategoryKey;
  score: number;
}) {
  const sectionStatus = getSectionStatus(score);
  const percentage = (score / 15) * 100;
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setBarWidth(percentage), 300);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_120px_auto] items-center gap-2 sm:gap-4 bg-[#12121a] border border-[#2a2a3a] rounded-[14px] px-5 py-4">
      <div className="flex flex-col">
        <span className="font-semibold text-[0.95rem] mb-0.5 text-[#f0f0f5]">
          {categoryLabels[categoryKey]}
        </span>
        <span className="text-xs text-[#8888a0]">
          {categorySubtitles[categoryKey]}
        </span>
      </div>
      <div className="font-bold text-[0.95rem] whitespace-nowrap text-[#f0f0f5]">
        {score} / 15
      </div>
      <div className="w-full">
        <div className="w-full h-1.5 bg-[#2a2a3a] rounded-sm overflow-hidden">
          <div
            className={cn(
              "h-full rounded-sm transition-[width] duration-1000 ease-in-out",
              sectionBarBg[sectionStatus.color],
            )}
            style={{ width: `${barWidth}%` }}
          />
        </div>
      </div>
      <div
        className={cn(
          "text-xs font-bold uppercase tracking-wide sm:text-right",
          sectionColorText[sectionStatus.color],
        )}
      >
        {sectionStatus.label}
      </div>
    </div>
  );
}

function BottleneckItem({
  bottleneck,
  rank,
}: {
  bottleneck: Bottleneck;
  rank: number;
}) {
  const sectionStatus = getSectionStatus(bottleneck.score);

  return (
    <div className="flex gap-4 items-start bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-5 mb-3">
      <div className="w-9 h-9 min-w-[2.25rem] flex items-center justify-center rounded-[10px] bg-[rgba(239,68,68,0.15)] text-[#ef4444] font-extrabold text-base">
        #{rank}
      </div>
      <div>
        <h3 className="text-base font-semibold mb-1.5 text-[#f0f0f5]">
          {bottleneck.name}{" "}
          <span
            className={cn(
              "text-xs font-semibold",
              sectionColorText[sectionStatus.color],
            )}
          >
            {bottleneck.score}/15 — {sectionStatus.label}
          </span>
        </h3>
        <p className="text-sm text-[#8888a0] leading-relaxed">
          {bottleneckMessages[bottleneck.key]}
        </p>
      </div>
    </div>
  );
}

function RecommendationItem({
  categoryKey,
  score,
}: {
  categoryKey: CategoryKey;
  score: number;
}) {
  const sectionStatus = getSectionStatus(score);

  return (
    <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] px-5 py-4 mb-3">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-[0.95rem] text-[#f0f0f5]">
          {categoryLabels[categoryKey]}
        </span>
        <span
          className={cn(
            "text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-xl",
            sectionBadgeBg[sectionStatus.color],
          )}
        >
          {sectionStatus.label}
        </span>
      </div>
      <p className="text-sm text-[#8888a0] leading-relaxed">
        {getSectionRecommendation(categoryKey, score)}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main ResultsScreen component
// ---------------------------------------------------------------------------

interface ResultsScreenProps {
  answers: number[];
  onRestart: () => void;
}

export default function ResultsScreen({
  answers,
  onRestart,
}: ResultsScreenProps) {
  const { categoryScores, totalScore } = calculateScores(answers);
  const status = getStatus(totalScore);
  const bottlenecks = getBottlenecks(categoryScores);
  const lowestSection = bottlenecks[0];
  const lowestStatus = getSectionStatus(lowestSection.score);
  const animatedScore = useAnimatedScore(totalScore);

  const categoryKeys: CategoryKey[] = [
    "demand",
    "message",
    "sales",
    "revenue",
  ];

  return (
    <div className="py-5 pb-10 animate-[fadeIn_0.4s_ease]">
      {/* Report header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-1.5 text-[#f0f0f5]">
          Your Clarity Report
        </h1>
        <p className="text-base text-[#8888a0]">
          Sales & Marketing Diagnostic Results
        </p>
      </div>

      {/* Overall Score */}
      <div className="text-center mb-10">
        <div
          className={cn(
            "w-40 h-40 rounded-full border-4 flex flex-col items-center justify-center mx-auto mb-6",
            statusCircleBorder[status.className],
          )}
        >
          <span className="text-5xl font-extrabold leading-none text-[#f0f0f5]">
            {animatedScore}
          </span>
          <span className="text-base text-[#8888a0]">/ 60</span>
        </div>
        <div
          className={cn(
            "inline-block px-6 py-2.5 rounded-full text-lg font-bold mb-4 uppercase tracking-wider",
            statusBadgeBg[status.className],
          )}
        >
          {status.label}
        </div>
        <p className="text-base text-[#8888a0] leading-relaxed max-w-lg mx-auto">
          {status.description}
        </p>
      </div>

      {/* Section A: Scorecard */}
      <section className="mb-9">
        <div className="mb-5">
          <h2 className="text-xl font-bold mb-1 text-[#f0f0f5]">Scorecard</h2>
          <p className="text-sm text-[#8888a0]">
            How each dimension scored
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {categoryKeys.map((key) => (
            <ScorecardRow
              key={key}
              categoryKey={key}
              score={categoryScores[key]}
            />
          ))}
        </div>
      </section>

      {/* Section B: Top 3 Bottlenecks */}
      <section className="mb-9">
        <div className="mb-5">
          <h2 className="text-xl font-bold mb-1 text-[#f0f0f5]">
            Top 3 Bottlenecks
          </h2>
          <p className="text-sm text-[#8888a0]">
            The areas holding your revenue back the most
          </p>
        </div>
        <div>
          {bottlenecks.map((b, i) => (
            <BottleneckItem key={b.key} bottleneck={b} rank={i + 1} />
          ))}
        </div>
      </section>

      {/* Section C: What to Fix First */}
      <section className="mb-9">
        <div className="mb-5">
          <h2 className="text-xl font-bold mb-1 text-[#f0f0f5]">
            What to Fix First
          </h2>
        </div>
        <div className="text-center bg-[#12121a] border border-[#2a2a3a] rounded-[14px] px-5 py-7 mb-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8888a0] mb-2">
            Your #1 priority
          </div>
          <div className="text-2xl font-extrabold mb-2 text-[#f0f0f5]">
            {lowestSection.name}
          </div>
          <div
            className={cn(
              "text-sm font-semibold",
              sectionColorText[lowestStatus.color],
            )}
          >
            {lowestSection.score}/15 — {lowestStatus.label}
          </div>
        </div>
        <p className="text-base text-[#8888a0] leading-relaxed mb-4">
          {getSectionRecommendation(lowestSection.key, lowestSection.score)}
        </p>
        <div className="bg-[rgba(74,108,247,0.08)] border border-[rgba(74,108,247,0.2)] rounded-[10px] px-5 py-4 text-sm text-[#8888a0] leading-relaxed">
          <strong className="text-[#f0f0f5]">Remember:</strong> Fix the lowest
          score first. More leads will not fix broken conversion.
        </div>
      </section>

      {/* Section D: Recommendations */}
      <section className="mb-9">
        <div className="mb-5">
          <h2 className="text-xl font-bold mb-1 text-[#f0f0f5]">
            Recommendations
          </h2>
          <p className="text-sm text-[#8888a0]">
            Guidance for each dimension based on your score
          </p>
        </div>
        <div>
          {categoryKeys.map((key) => (
            <RecommendationItem
              key={key}
              categoryKey={key}
              score={categoryScores[key]}
            />
          ))}
        </div>
      </section>

      {/* Retake button */}
      <div className="text-center mt-5">
        <button
          type="button"
          onClick={onRestart}
          className="bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] text-white border-none px-12 py-4 text-lg font-semibold rounded-xl cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(74,108,247,0.3)]"
        >
          Retake Diagnostic
        </button>
      </div>
    </div>
  );
}
