"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import type { DecisionFormData } from "../../_lib/schemas";

export function TruthStep() {
  const { register, watch, setValue } = useFormContext<DecisionFormData>();

  const costMoney = watch("costMoney") ?? 0;
  const costTime = watch("costTime") ?? 0;
  const costEnergy = watch("costEnergy") ?? 0;
  const costReputation = watch("costReputation") ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-stone-900 mb-1">
          Truth Layer
        </h2>
        <p className="text-sm text-stone-500">
          Separate facts from assumptions. Assess real costs and outcomes.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="factsKnown">Facts You Know (verified)</Label>
          <Textarea
            id="factsKnown"
            placeholder="What do you know for certain? List concrete evidence, data, or confirmed information..."
            {...register("factsKnown")}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="assumptions">Assumptions (unverified)</Label>
          <Textarea
            id="assumptions"
            placeholder="What are you assuming to be true? What haven't you verified yet?"
            {...register("assumptions")}
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="bestCase">Best Case Outcome</Label>
            <Textarea
              id="bestCase"
              placeholder="If everything goes right..."
              {...register("bestCase")}
              className="mt-1"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="worstCase">Worst Case Outcome</Label>
            <Textarea
              id="worstCase"
              placeholder="If everything goes wrong..."
              {...register("worstCase")}
              className="mt-1"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="likelyOutcome">Most Likely Outcome</Label>
            <Textarea
              id="likelyOutcome"
              placeholder="Realistically, what will probably happen..."
              {...register("likelyOutcome")}
              className="mt-1"
              rows={3}
            />
          </div>
        </div>

        <div className="bg-stone-50 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-stone-700 uppercase tracking-wide">
            Cost Assessment
          </h3>
          <Slider
            label="Money"
            value={costMoney}
            onChange={(v) => setValue("costMoney", v)}
          />
          <Slider
            label="Time"
            value={costTime}
            onChange={(v) => setValue("costTime", v)}
          />
          <Slider
            label="Energy"
            value={costEnergy}
            onChange={(v) => setValue("costEnergy", v)}
          />
          <Slider
            label="Reputation"
            value={costReputation}
            onChange={(v) => setValue("costReputation", v)}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-stone-700 uppercase tracking-wide">
            Options to Consider
          </h3>
          <div>
            <Label htmlFor="options.a">Option A (primary)</Label>
            <Input
              id="options.a"
              placeholder="Your main option..."
              {...register("options.a")}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="options.b">Option B (alternative)</Label>
            <Input
              id="options.b"
              placeholder="An alternative approach..."
              {...register("options.b")}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="options.c">Option C (creative)</Label>
            <Input
              id="options.c"
              placeholder="A creative or unconventional option..."
              {...register("options.c")}
              className="mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
