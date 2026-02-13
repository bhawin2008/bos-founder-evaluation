"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import type { CalmCheckData } from "../../_lib/schemas";

interface CalmCheckProps {
  onComplete: (data: CalmCheckData) => void;
  onSkip: () => void;
}

export function CalmCheck({ onComplete, onSkip }: CalmCheckProps) {
  const [checks, setChecks] = useState<CalmCheckData>({
    hungry: false,
    tired: false,
    angry: false,
    lonely: false,
  });

  const anyTriggered = checks.hungry || checks.tired || checks.angry || checks.lonely;

  const toggle = (key: keyof CalmCheckData) => {
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-5">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-stone-900">
            Calm Check
          </h3>
          <p className="text-sm text-stone-500 mt-1">
            Before finalizing, honestly check: are you any of these right now?
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {(
            [
              { key: "hungry" as const, label: "Hungry" },
              { key: "tired" as const, label: "Tired" },
              { key: "angry" as const, label: "Angry" },
              { key: "lonely" as const, label: "Lonely" },
            ] as const
          ).map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => toggle(key)}
              className={`p-4 rounded-xl border-2 text-sm font-medium transition-all cursor-pointer ${
                checks[key]
                  ? "border-amber-400 bg-amber-50 text-amber-800"
                  : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {anyTriggered && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-sm text-amber-800">
              You might not be in the best state to finalize. We recommend saving
              as a draft and revisiting when you feel calmer.
            </p>
          </div>
        )}

        <div className="flex gap-3">
          {anyTriggered ? (
            <>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => onComplete(checks)}
              >
                Save as Draft (WAIT)
              </Button>
              <Button className="flex-1" onClick={onSkip}>
                Finalize Anyway
              </Button>
            </>
          ) : (
            <Button className="w-full" onClick={onSkip}>
              I&apos;m Calm — Finalize
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
