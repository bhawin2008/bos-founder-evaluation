import { DecisionWizard } from "@/components/wizard/decision-wizard";

export default function NewDecisionPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">New Decision</h1>
        <p className="text-sm text-stone-500">
          Walk through each layer to build a clear picture of your decision.
        </p>
      </div>
      <DecisionWizard />
    </div>
  );
}
