"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, ArrowRight, ArrowLeft, Check } from "lucide-react";

const industries = [
  "Technology", "Marketing", "Sales", "Finance", "HR", "Consulting",
  "Education", "Healthcare", "Real Estate", "E-commerce", "Media", "Other",
];

const contentPillarOptions = [
  "Leadership", "Marketing", "Sales", "Tech", "Startups", "Career",
  "Personal Branding", "Coaching", "Freelancing", "HR", "Finance", "Other",
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [headline, setHeadline] = useState("");
  const [industry, setIndustry] = useState("");
  const [pillars, setPillars] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  function togglePillar(pillar: string) {
    setPillars((prev) =>
      prev.includes(pillar)
        ? prev.filter((p) => p !== pillar)
        : prev.length < 3
          ? [...prev, pillar]
          : prev
    );
  }

  async function handleComplete() {
    if (!user) return;
    setSaving(true);

    const supabase = createClient();
    await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        linkedin_headline: headline,
        industry,
        content_pillars: pillars,
        onboarding_completed: true,
      })
      .eq("id", user.id);

    setSaving(false);
    router.push("/create?welcome=true");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-lg">
        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  s < step
                    ? "bg-primary text-primary-foreground"
                    : s === step
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {s < step ? <Check className="h-4 w-4" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-12 h-0.5 ${
                    s < step ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-accent" />
            </div>
            {step === 1 && (
              <>
                <CardTitle>Let&apos;s set up your profile</CardTitle>
                <CardDescription>
                  This helps us personalize your experience
                </CardDescription>
              </>
            )}
            {step === 2 && (
              <>
                <CardTitle>What&apos;s your industry?</CardTitle>
                <CardDescription>
                  We&apos;ll use this to suggest relevant content ideas
                </CardDescription>
              </>
            )}
            {step === 3 && (
              <>
                <CardTitle>Pick your content pillars</CardTitle>
                <CardDescription>
                  Choose up to 3 topics you want to be known for on LinkedIn
                </CardDescription>
              </>
            )}
          </CardHeader>

          <CardContent>
            {/* Step 1: Name & Headline */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    autoFocus
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    LinkedIn Headline
                  </label>
                  <Input
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="e.g., Helping B2B founders grow on LinkedIn"
                  />
                  <p className="text-xs text-muted-foreground">
                    This helps our AI tailor suggestions to your positioning
                  </p>
                </div>
                <Button
                  className="w-full"
                  onClick={() => setStep(2)}
                  disabled={!fullName.trim()}
                >
                  Continue <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}

            {/* Step 2: Industry */}
            {step === 2 && (
              <div className="space-y-4">
                <Select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="Select your industry"
                  options={industries.map((i) => ({ value: i, label: i }))}
                />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => setStep(3)}
                    disabled={!industry}
                  >
                    Continue <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Content Pillars */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {contentPillarOptions.map((pillar) => (
                    <button
                      key={pillar}
                      onClick={() => togglePillar(pillar)}
                      className={`px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer border ${
                        pillars.includes(pillar)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-muted-foreground border-border hover:border-primary/50"
                      }`}
                    >
                      {pillars.includes(pillar) && (
                        <Check className="h-3 w-3 inline mr-1" />
                      )}
                      {pillar}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  {pillars.length}/3 selected
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep(2)}
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleComplete}
                    disabled={pillars.length === 0 || saving}
                  >
                    {saving ? "Setting up..." : "Start Creating"}
                    <Sparkles className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-4">
          You can always change these later in Settings
        </p>
      </div>
    </div>
  );
}
