"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import type { DecisionFormData } from "../../_lib/schemas";
import { Plus, X } from "lucide-react";
import { useState } from "react";

export function AlignmentStep() {
  const { register, watch, setValue } = useFormContext<DecisionFormData>();

  const valuesTop3 = watch("valuesTop3") || [];
  const scores = watch("scores") || {
    clarityOutcome: 5,
    reversibility: 5,
    valueAlignment: 5,
    peaceImpact: 5,
    opportunityGain: 5,
    riskLevel: 5,
    regretTest: 5,
  };
  const proudIn1Year = watch("proudIn1Year") || "UNSURE";
  const [valueInput, setValueInput] = useState("");

  const addValue = () => {
    if (valueInput.trim() && valuesTop3.length < 3) {
      setValue("valuesTop3", [...valuesTop3, valueInput.trim()]);
      setValueInput("");
    }
  };

  const removeValue = (index: number) => {
    setValue("valuesTop3", valuesTop3.filter((_: string, i: number) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-stone-900 mb-1">
          Alignment Layer
        </h2>
        <p className="text-sm text-stone-500">
          Check if this decision aligns with your values and identity.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Your Top 3 Values</Label>
          <p className="text-xs text-stone-400 mt-0.5">
            What matters most to you? (max 3)
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {valuesTop3.map((value: string, i: number) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 bg-stone-100 border border-stone-200 rounded-full px-3 py-1 text-sm"
              >
                {value}
                <button
                  type="button"
                  onClick={() => removeValue(i)}
                  className="text-stone-400 hover:text-red-500 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          {valuesTop3.length < 3 && (
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="e.g., Freedom, Growth, Family..."
                value={valueInput}
                onChange={(e) => setValueInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addValue();
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={addValue}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="identityMatch">
            Does this fit who you want to become?
          </Label>
          <Textarea
            id="identityMatch"
            placeholder="How does this decision relate to the person you aspire to be?"
            {...register("identityMatch")}
            className="mt-1"
          />
        </div>

        <div>
          <Label>Will you be proud of this decision in 1 year?</Label>
          <div className="flex gap-3 mt-2">
            {(["YES", "NO", "UNSURE"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setValue("proudIn1Year", option)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                  proudIn1Year === option
                    ? option === "YES"
                      ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                      : option === "NO"
                        ? "bg-red-100 border-red-300 text-red-800"
                        : "bg-amber-100 border-amber-300 text-amber-800"
                    : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                }`}
              >
                {option === "YES"
                  ? "Yes"
                  : option === "NO"
                    ? "No"
                    : "Unsure"}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-stone-50 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-stone-700 uppercase tracking-wide">
            Score Each Dimension (0-10)
          </h3>

          <Slider
            label="Clarity of Outcome"
            value={scores.clarityOutcome}
            onChange={(v) => setValue("scores.clarityOutcome", v)}
          />
          <Slider
            label="Reversibility"
            value={scores.reversibility}
            onChange={(v) => setValue("scores.reversibility", v)}
          />
          <Slider
            label="Value Alignment"
            value={scores.valueAlignment}
            onChange={(v) => setValue("scores.valueAlignment", v)}
          />
          <Slider
            label="Peace of Mind Impact"
            value={scores.peaceImpact}
            onChange={(v) => setValue("scores.peaceImpact", v)}
          />
          <Slider
            label="Opportunity Gain"
            value={scores.opportunityGain}
            onChange={(v) => setValue("scores.opportunityGain", v)}
          />
          <Slider
            label="Risk Level (10 = highest risk)"
            value={scores.riskLevel}
            onChange={(v) => setValue("scores.riskLevel", v)}
          />
          <Slider
            label="Regret Test (10 = zero regret)"
            value={scores.regretTest}
            onChange={(v) => setValue("scores.regretTest", v)}
          />
        </div>
      </div>
    </div>
  );
}
