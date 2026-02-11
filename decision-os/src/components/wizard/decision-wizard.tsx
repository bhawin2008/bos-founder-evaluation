"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ClarityStep } from "./clarity-step";
import { TruthStep } from "./truth-step";
import { AlignmentStep } from "./alignment-step";
import { ReviewStep } from "./review-step";
import { CalmCheck } from "./calm-check";
import { claritySchema, truthSchema, alignmentSchema, decisionFormSchema } from "@/lib/schemas";
import type { DecisionFormData, CalmCheckData } from "@/lib/schemas";
import { createDecision, updateDecision } from "@/lib/actions";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";

const STEPS = [
  { name: "Clarity", schema: claritySchema },
  { name: "Truth", schema: truthSchema },
  { name: "Alignment", schema: alignmentSchema },
  { name: "Review", schema: null },
] as const;

interface DecisionWizardProps {
  initialData?: DecisionFormData & { id?: string };
  editId?: string;
}

export function DecisionWizard({ initialData, editId }: DecisionWizardProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [showCalmCheck, setShowCalmCheck] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DecisionFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(decisionFormSchema) as any,
    defaultValues: initialData || {
      title: "",
      category: "OTHER",
      decisionType: "TWO_WAY",
      deadline: "",
      urgencyNote: "",
      doNothing30Days: "",
      emotionState: "calm",
      reasonsFor: [],
      reasonsAgainst: [],
      factsKnown: "",
      assumptions: "",
      bestCase: "",
      worstCase: "",
      likelyOutcome: "",
      costMoney: 0,
      costTime: 0,
      costEnergy: 0,
      costReputation: 0,
      options: { a: "", b: "", c: "" },
      valuesTop3: [],
      identityMatch: "",
      proudIn1Year: "UNSURE",
      scores: {
        clarityOutcome: 5,
        reversibility: 5,
        valueAlignment: 5,
        peaceImpact: 5,
        opportunityGain: 5,
        riskLevel: 5,
        regretTest: 5,
      },
    },
    mode: "onTouched",
  });

  const validateCurrentStep = async () => {
    const currentSchema = STEPS[step].schema;
    if (!currentSchema) return true;

    const data = form.getValues();
    const result = currentSchema.safeParse(data);

    if (!result.success) {
      const fieldNames = Object.keys(result.error.flatten().fieldErrors);
      for (const fieldName of fieldNames) {
        form.setError(fieldName as keyof DecisionFormData, {
          message:
            (
              result.error.flatten().fieldErrors as Record<string, string[]>
            )[fieldName]?.[0] || "Invalid",
        });
      }
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    const valid = await validateCurrentStep();
    if (valid && step < STEPS.length - 1) {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleSubmit = async (calmCheck?: CalmCheckData) => {
    setIsSubmitting(true);
    try {
      const data = form.getValues();
      let decision;
      if (editId) {
        decision = await updateDecision(editId, data, calmCheck);
      } else {
        decision = await createDecision(data, calmCheck);
      }
      router.push(`/decisions/${decision.id}`);
    } catch (error) {
      console.error("Failed to save decision:", error);
      setIsSubmitting(false);
    }
  };

  const handleFinalize = () => {
    setShowCalmCheck(true);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s.name} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => i < step && setStep(i)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  i === step
                    ? "bg-stone-900 text-white"
                    : i < step
                      ? "bg-stone-200 text-stone-700 hover:bg-stone-300"
                      : "bg-stone-100 text-stone-400"
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                  {i < step ? <Check className="w-3 h-3" /> : i + 1}
                </span>
                <span className="hidden sm:inline">{s.name}</span>
              </button>
              {i < STEPS.length - 1 && (
                <div
                  className={`w-8 h-0.5 ${
                    i < step ? "bg-stone-400" : "bg-stone-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="bg-white rounded-xl border border-stone-200 p-6">
          {step === 0 && <ClarityStep />}
          {step === 1 && <TruthStep />}
          {step === 2 && <AlignmentStep />}
          {step === 3 && <ReviewStep />}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={step === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>

          {step < STEPS.length - 1 ? (
            <Button type="button" onClick={handleNext}>
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleFinalize}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-1" />
                  {editId ? "Update Decision" : "Finalize Decision"}
                </>
              )}
            </Button>
          )}
        </div>

        {/* Calm Check Modal */}
        {showCalmCheck && (
          <CalmCheck
            onComplete={(calmData) => {
              setShowCalmCheck(false);
              handleSubmit(calmData);
            }}
            onSkip={() => {
              setShowCalmCheck(false);
              handleSubmit();
            }}
          />
        )}
      </form>
    </FormProvider>
  );
}
