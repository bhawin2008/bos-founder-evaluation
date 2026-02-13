"use client";

import { useCallback } from "react";
import { cn } from "@/lib/utils";
import type { Question, CategoryKey } from "../_data/questions";

interface QuestionScreenProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer: number;
  onSelectOption: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const OPTION_LETTERS = ["A", "B", "C", "D"] as const;

const categoryBadgeStyles: Record<CategoryKey, string> = {
  sales: "bg-blue-500/15 text-blue-500",
  marketing: "bg-purple-500/15 text-purple-500",
  founder: "bg-orange-500/15 text-orange-500",
  team: "bg-green-500/15 text-green-500",
};

export default function QuestionScreen({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onSelectOption,
  onNext,
  onPrev,
  isFirst,
  isLast,
}: QuestionScreenProps) {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const isAnswered = selectedAnswer >= 0;

  const handleNext = useCallback(() => {
    if (!isAnswered) return;
    onNext();
  }, [isAnswered, onNext]);

  return (
    <div className="animate-fade-in w-full">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-700/50 rounded-sm mb-10 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-sm transition-all duration-400 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question Header */}
      <div className="flex justify-between items-center mb-6">
        <span
          className={cn(
            "inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide",
            categoryBadgeStyles[question.categoryKey]
          )}
        >
          {question.category}
        </span>
        <span className="text-gray-500 text-sm">
          {currentIndex + 1} / {totalQuestions}
        </span>
      </div>

      {/* Question Text */}
      <h2 className="text-xl sm:text-2xl font-semibold leading-snug mb-8">
        {question.question}
      </h2>

      {/* Options */}
      <div className="flex flex-col gap-3 mb-10">
        {question.options.map((option, i) => {
          const isSelected = selectedAnswer === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelectOption(i)}
              className={cn(
                "flex items-center gap-3.5 px-5 py-4 rounded-xl border-[1.5px] text-left text-base leading-snug cursor-pointer transition-all duration-200",
                isSelected
                  ? "bg-blue-500/10 border-blue-500"
                  : "bg-[#12121a] border-gray-700/60 hover:bg-[#1a1a26] hover:border-blue-500"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 min-w-[2rem] flex items-center justify-center rounded-lg border-[1.5px] text-xs font-bold transition-all duration-200",
                  isSelected
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "bg-[#0a0a0f] border-gray-700/60 text-gray-500"
                )}
              >
                {OPTION_LETTERS[i]}
              </div>
              <span className="flex-1">{option}</span>
            </button>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-3 sm:flex-row flex-col-reverse">
        <button
          type="button"
          onClick={onPrev}
          className={cn(
            "bg-transparent text-gray-500 border border-gray-700/60 px-8 py-3.5 text-base font-medium rounded-xl cursor-pointer transition-all duration-300 hover:border-gray-500 hover:text-gray-200 sm:w-auto w-full text-center",
            isFirst && "invisible"
          )}
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!isAnswered}
          className={cn(
            "bg-gradient-to-br from-blue-500 to-purple-500 text-white border-none px-12 py-3.5 text-lg font-semibold rounded-xl cursor-pointer transition-all duration-300 sm:w-auto w-full text-center",
            isAnswered
              ? "hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(74,108,247,0.3)]"
              : "opacity-40 cursor-not-allowed"
          )}
        >
          {isLast ? "See Results" : "Next"}
        </button>
      </div>
    </div>
  );
}
