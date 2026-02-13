"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import type { CategoryKey } from "../_data/questions";
import { categoryLabels } from "../_data/questions";
import {
  calculateScores,
  getStatus,
  getCategoryHealth,
  getBottlenecks,
  bottleneckMessages,
  type StatusClassName,
  type CategoryScores,
} from "../_data/scoring";

interface ResultsScreenProps {
  answers: number[];
  onRestart: () => void;
}

const scoreCircleBorderColors: Record<StatusClassName, string> = {
  survival: "border-red-500",
  fragile: "border-orange-500",
  emerging: "border-yellow-500",
  scaling: "border-blue-500",
  built: "border-green-500",
};

const statusBadgeStyles: Record<StatusClassName, string> = {
  survival: "bg-red-500/15 text-red-500",
  fragile: "bg-orange-500/15 text-orange-500",
  emerging: "bg-yellow-500/15 text-yellow-500",
  scaling: "bg-blue-500/15 text-blue-500",
  built: "bg-green-500/15 text-green-500",
};

const barFillColors: Record<string, string> = {
  red: "bg-red-500",
  orange: "bg-orange-500",
  green: "bg-green-500",
};

export default function ResultsScreen({
  answers,
  onRestart,
}: ResultsScreenProps) {
  const { categoryScores, totalScore } = calculateScores(answers);
  const status = getStatus(totalScore);
  const bottlenecks = getBottlenecks(categoryScores);

  const [animatedScore, setAnimatedScore] = useState(0);
  const [barsAnimated, setBarsAnimated] = useState(false);
  const animationRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Animate the score counter
  useEffect(() => {
    if (totalScore === 0) {
      setAnimatedScore(0);
      return;
    }

    let current = 0;
    const duration = 1200;
    const stepTime = duration / totalScore;

    animationRef.current = setInterval(() => {
      current++;
      setAnimatedScore(current);
      if (current >= totalScore) {
        if (animationRef.current) clearInterval(animationRef.current);
      }
    }, stepTime);

    return () => {
      if (animationRef.current) clearInterval(animationRef.current);
    };
  }, [totalScore]);

  // Trigger bar animations after a short delay
  useEffect(() => {
    const timer = setTimeout(() => setBarsAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const categoryEntries = Object.entries(categoryScores) as [
    CategoryKey,
    number,
  ][];

  return (
    <div className="animate-fade-in text-center py-5">
      <h1 className="text-3xl font-bold mb-8">Your Diagnosis</h1>

      {/* Score Circle */}
      <div
        className={cn(
          "w-40 h-40 rounded-full border-4 flex flex-col items-center justify-center mx-auto mb-6",
          scoreCircleBorderColors[status.className]
        )}
      >
        <span className="text-5xl font-extrabold leading-none">
          {animatedScore}
        </span>
        <span className="text-base text-gray-500">/ 60</span>
      </div>

      {/* Status Badge */}
      <div
        className={cn(
          "inline-block px-6 py-2.5 rounded-full text-lg font-bold mb-4 uppercase tracking-wider",
          statusBadgeStyles[status.className]
        )}
      >
        {status.label}
      </div>

      {/* Status Description */}
      <p className="text-gray-500 text-base leading-relaxed max-w-lg mx-auto mb-10">
        {status.description}
      </p>

      {/* Category Scores Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 text-left">
        {categoryEntries.map(([key, score]) => {
          const health = getCategoryHealth(score);
          const percentage = (score / 15) * 100;

          return (
            <div
              key={key}
              className="bg-[#12121a] border border-gray-700/60 rounded-2xl p-5"
            >
              <div className="flex justify-between items-center mb-2.5">
                <span className="font-semibold text-sm">
                  {categoryLabels[key]}
                </span>
                <span className="font-bold text-sm">
                  {score} / 15
                </span>
              </div>
              <div className="w-full h-1.5 bg-gray-700/60 rounded-sm overflow-hidden mb-2">
                <div
                  className={cn(
                    "h-full rounded-sm transition-all duration-1000 ease-out",
                    barFillColors[health.barColor]
                  )}
                  style={{ width: barsAnimated ? `${percentage}%` : "0%" }}
                />
              </div>
              <div className="text-xs text-gray-500">{health.label}</div>
            </div>
          );
        })}
      </div>

      {/* Bottlenecks Section */}
      <div className="mb-10 text-left">
        <h2 className="text-xl font-bold mb-1.5 text-center">
          Your Top 3 Bottlenecks
        </h2>
        <p className="text-gray-500 text-sm mb-6 text-center">
          These are the areas holding your business back the most.
        </p>
        <div className="flex flex-col gap-3">
          {bottlenecks.map((b, i) => (
            <div
              key={b.key}
              className="flex gap-4 items-start bg-[#12121a] border border-gray-700/60 rounded-2xl p-5"
            >
              <div className="w-9 h-9 min-w-[2.25rem] flex items-center justify-center rounded-lg bg-red-500/15 text-red-500 font-extrabold text-base">
                #{i + 1}
              </div>
              <div>
                <h3 className="text-base font-semibold mb-1">
                  {b.name}{" "}
                  <span className="text-red-500 text-sm font-semibold">
                    ({b.score}/15)
                  </span>
                </h3>
                <p className="text-sm text-gray-500 leading-snug">
                  {bottleneckMessages[b.key]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Restart Button */}
      <button
        type="button"
        onClick={onRestart}
        className="bg-gradient-to-br from-blue-500 to-purple-500 text-white border-none px-12 py-4 text-lg font-semibold rounded-xl cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(74,108,247,0.3)]"
      >
        Retake Diagnostic
      </button>
    </div>
  );
}
