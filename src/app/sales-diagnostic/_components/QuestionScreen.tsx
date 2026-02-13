"use client";

import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { type Question, type CategoryKey } from "../_data/questions";

// ---------------------------------------------------------------------------
// Category badge colour mapping (matches original CSS)
// ---------------------------------------------------------------------------
const categoryBadgeStyles: Record<CategoryKey, string> = {
  demand: "bg-[rgba(74,108,247,0.15)] text-[#4a6cf7]",
  message: "bg-[rgba(34,197,94,0.15)] text-[#22c55e]",
  sales: "bg-[rgba(234,179,8,0.15)] text-[#eab308]",
  revenue: "bg-[rgba(239,68,68,0.15)] text-[#ef4444]",
};

const LETTERS = ["A", "B", "C", "D"] as const;

interface QuestionScreenProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  selectedOption: number;
  onSelectOption: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function QuestionScreen({
  question,
  questionIndex,
  totalQuestions,
  selectedOption,
  onSelectOption,
  onNext,
  onPrev,
  isFirst,
  isLast,
}: QuestionScreenProps) {
  const progress = ((questionIndex + 1) / totalQuestions) * 100;

  const handleNext = useCallback(() => {
    if (selectedOption === -1) return;
    onNext();
  }, [selectedOption, onNext]);

  return (
    <div className="w-full animate-[fadeIn_0.4s_ease]">
      {/* Progress bar */}
      <div className="w-full h-1 bg-[#2a2a3a] rounded-sm mb-10 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#4a6cf7] to-[#a855f7] rounded-sm transition-[width] duration-400 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header: badge + counter */}
      <div className="flex justify-between items-center mb-6">
        <span
          className={cn(
            "inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide",
            categoryBadgeStyles[question.categoryKey],
          )}
        >
          {question.category}
        </span>
        <span className="text-[#8888a0] text-sm">
          {questionIndex + 1} / {totalQuestions}
        </span>
      </div>

      {/* Question text */}
      <h2 className="text-xl sm:text-2xl font-semibold leading-snug mb-8 text-[#f0f0f5]">
        {question.question}
      </h2>

      {/* Options */}
      <div className="flex flex-col gap-3 mb-10">
        {question.options.map((opt, i) => {
          const isSelected = selectedOption === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelectOption(i)}
              className={cn(
                "flex items-center gap-3.5 px-5 py-4 rounded-xl border-[1.5px] text-left text-base leading-snug cursor-pointer transition-all duration-200",
                isSelected
                  ? "bg-[rgba(74,108,247,0.1)] border-[#4a6cf7]"
                  : "bg-[#12121a] border-[#2a2a3a] hover:bg-[#1a1a26] hover:border-[#4a6cf7]",
              )}
            >
              <span
                className={cn(
                  "w-8 h-8 min-w-[2rem] flex items-center justify-center rounded-lg font-bold text-sm border-[1.5px] transition-all duration-200",
                  isSelected
                    ? "bg-[#4a6cf7] border-[#4a6cf7] text-white"
                    : "bg-[#0a0a0f] border-[#2a2a3a] text-[#8888a0]",
                )}
              >
                {LETTERS[i]}
              </span>
              <span className="flex-1 text-[#f0f0f5]">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between gap-3 sm:flex-row flex-col-reverse">
        <button
          type="button"
          onClick={onPrev}
          className={cn(
            "bg-transparent text-[#8888a0] border border-[#2a2a3a] px-8 py-3.5 text-base font-medium rounded-xl cursor-pointer transition-all duration-300 hover:border-[#8888a0] hover:text-[#f0f0f5] sm:w-auto w-full text-center",
            isFirst && "invisible",
          )}
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={selectedOption === -1}
          className="bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] text-white border-none px-12 py-3.5 text-lg font-semibold rounded-xl cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(74,108,247,0.3)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none sm:w-auto w-full text-center"
        >
          {isLast ? "See Results" : "Next"}
        </button>
      </div>
    </div>
  );
}
