"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CATEGORIES, DECISION_TYPES, EMOTION_STATES, CATEGORY_LABELS } from "@/lib/constants";
import type { DecisionFormData } from "@/lib/schemas";
import { Plus, X } from "lucide-react";
import { useState } from "react";

export function ClarityStep() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<DecisionFormData>();

  const reasonsFor = watch("reasonsFor") || [];
  const reasonsAgainst = watch("reasonsAgainst") || [];
  const [forInput, setForInput] = useState("");
  const [againstInput, setAgainstInput] = useState("");

  const addReasonFor = () => {
    if (forInput.trim()) {
      setValue("reasonsFor", [...reasonsFor, forInput.trim()]);
      setForInput("");
    }
  };

  const removeReasonFor = (index: number) => {
    setValue("reasonsFor", reasonsFor.filter((_: string, i: number) => i !== index));
  };

  const addReasonAgainst = () => {
    if (againstInput.trim()) {
      setValue("reasonsAgainst", [...reasonsAgainst, againstInput.trim()]);
      setAgainstInput("");
    }
  };

  const removeReasonAgainst = (index: number) => {
    setValue("reasonsAgainst", reasonsAgainst.filter((_: string, i: number) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-stone-900 mb-1">
          Clarity Layer
        </h2>
        <p className="text-sm text-stone-500">
          Define what you&apos;re deciding and why it matters.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Decision Title</Label>
          <Input
            id="title"
            placeholder="e.g., Should I leave my job to start a business?"
            {...register("title")}
            className="mt-1"
          />
          {errors.title && (
            <p className="text-sm text-red-600 mt-1">
              {errors.title.message as string}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select id="category" {...register("category")} className="mt-1">
              <option value="">Select category...</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {CATEGORY_LABELS[cat]}
                </option>
              ))}
            </Select>
            {errors.category && (
              <p className="text-sm text-red-600 mt-1">
                {errors.category.message as string}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="decisionType">Decision Type</Label>
            <Select
              id="decisionType"
              {...register("decisionType")}
              className="mt-1"
            >
              <option value="">Select type...</option>
              {DECISION_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type === "ONE_WAY"
                    ? "One-Way Door (hard to reverse)"
                    : "Two-Way Door (reversible)"}
                </option>
              ))}
            </Select>
            {errors.decisionType && (
              <p className="text-sm text-red-600 mt-1">
                {errors.decisionType.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="deadline">Deadline (optional)</Label>
            <Input
              id="deadline"
              type="date"
              {...register("deadline")}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="emotionState">Current Emotional State</Label>
            <Select
              id="emotionState"
              {...register("emotionState")}
              className="mt-1"
            >
              {EMOTION_STATES.map((emotion) => (
                <option key={emotion} value={emotion}>
                  {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="urgencyNote">Why does this feel urgent?</Label>
          <Textarea
            id="urgencyNote"
            placeholder="What's driving the timeline?"
            {...register("urgencyNote")}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="doNothing30Days">
            What happens if you do nothing for 30 days?
          </Label>
          <Textarea
            id="doNothing30Days"
            placeholder="Describe the impact of inaction..."
            {...register("doNothing30Days")}
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Reasons For</Label>
            <div className="mt-2 space-y-2">
              {reasonsFor.map((reason: string, i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-sm"
                >
                  <span className="flex-1">{reason}</span>
                  <button
                    type="button"
                    onClick={() => removeReasonFor(i)}
                    className="text-stone-400 hover:text-red-500 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  placeholder="Add a reason for..."
                  value={forInput}
                  onChange={(e) => setForInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addReasonFor();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={addReasonFor}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Label>Reasons Against</Label>
            <div className="mt-2 space-y-2">
              {reasonsAgainst.map((reason: string, i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm"
                >
                  <span className="flex-1">{reason}</span>
                  <button
                    type="button"
                    onClick={() => removeReasonAgainst(i)}
                    className="text-stone-400 hover:text-red-500 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  placeholder="Add a reason against..."
                  value={againstInput}
                  onChange={(e) => setAgainstInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addReasonAgainst();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={addReasonAgainst}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
