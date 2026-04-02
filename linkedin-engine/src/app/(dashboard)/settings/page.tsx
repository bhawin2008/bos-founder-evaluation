"use client";

import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useSubscription } from "@/hooks/useSubscription";
import { useToast } from "@/components/ui/toast";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { User, CreditCard, Crown } from "lucide-react";

const industries = [
  "Technology",
  "Marketing",
  "Sales",
  "Finance",
  "HR",
  "Consulting",
  "Education",
  "Healthcare",
  "Real Estate",
  "E-commerce",
  "Media",
  "Other",
];

const contentPillarOptions = [
  "Leadership",
  "Marketing",
  "Sales",
  "Tech",
  "Startups",
  "Career",
  "Personal Branding",
  "Coaching",
  "Freelancing",
  "HR",
  "Finance",
  "Other",
];

export default function SettingsPage() {
  const { profile, loading } = useUser();
  const { tier, isActive, isTrialing, trialDaysLeft } = useSubscription(profile);
  const { addToast } = useToast();

  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [headline, setHeadline] = useState(profile?.linkedin_headline || "");
  const [industry, setIndustry] = useState(profile?.industry || "");
  const [pillars, setPillars] = useState<string[]>(profile?.content_pillars || []);
  const [saving, setSaving] = useState(false);

  // Sync state when profile loads
  if (profile && !fullName && profile.full_name) {
    setFullName(profile.full_name);
    setHeadline(profile.linkedin_headline || "");
    setIndustry(profile.industry || "");
    setPillars(profile.content_pillars || []);
  }

  async function handleSave() {
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        linkedin_headline: headline,
        industry,
        content_pillars: pillars,
        onboarding_completed: true,
      })
      .eq("id", profile?.id);

    if (error) {
      addToast({ title: "Failed to save", variant: "destructive" });
    } else {
      addToast({ title: "Settings saved!", variant: "success" });
    }
    setSaving(false);
  }

  function togglePillar(pillar: string) {
    setPillars((prev) =>
      prev.includes(pillar)
        ? prev.filter((p) => p !== pillar)
        : prev.length < 3
          ? [...prev, pillar]
          : prev
    );
  }

  if (loading) {
    return (
      <div className="space-y-4 max-w-2xl">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your profile and subscription
        </p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <User className="h-4 w-4" /> Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">LinkedIn Headline</label>
            <Input
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g., Helping B2B founders grow on LinkedIn"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Industry</label>
            <Select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="Select your industry"
              options={industries.map((i) => ({ value: i, label: i }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Content Pillars (pick up to 3)
            </label>
            <div className="flex flex-wrap gap-2">
              {contentPillarOptions.map((pillar) => (
                <button
                  key={pillar}
                  onClick={() => togglePillar(pillar)}
                  className={`px-3 py-1.5 text-xs rounded-full transition-colors cursor-pointer ${
                    pillars.includes(pillar)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {pillar}
                </button>
              ))}
            </div>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>

      {/* Subscription */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CreditCard className="h-4 w-4" /> Subscription
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge
              variant={tier === "pro" ? "accent" : tier === "basic" ? "default" : "secondary"}
              className="text-sm px-3 py-1"
            >
              <Crown className="h-3 w-3 mr-1" />
              {tier === "pro" ? "Pro" : tier === "basic" ? "Basic" : "Free"}
            </Badge>
            {isTrialing && (
              <span className="text-sm text-muted-foreground">
                {trialDaysLeft} days left in trial
              </span>
            )}
            {isActive && tier !== "free" && (
              <span className="text-sm text-green-600 font-medium">Active</span>
            )}
          </div>

          {tier === "free" && !isTrialing && (
            <div className="rounded-lg border border-accent/30 bg-accent/5 p-4">
              <p className="text-sm font-medium">Your trial has ended</p>
              <p className="text-xs text-muted-foreground mt-1">
                Subscribe to continue using Post Creator, Inspiration Engine,
                and Resources.
              </p>
              <Button variant="accent" size="sm" className="mt-3">
                View Plans
              </Button>
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border p-4">
              <p className="text-sm font-semibold">Basic</p>
              <p className="text-2xl font-bold mt-1">
                <span className="line-through text-muted-foreground text-sm mr-1">
                  &#8377;499
                </span>
                &#8377;299
                <span className="text-xs font-normal text-muted-foreground">
                  /mo
                </span>
              </p>
              <p className="text-[10px] text-accent font-medium">
                Founding price
              </p>
              <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                <li>Post Creator</li>
                <li>10 AI assists/month</li>
                <li>Inspiration Engine</li>
                <li>Basic Resources</li>
              </ul>
            </div>
            <div className="rounded-lg border border-accent p-4">
              <p className="text-sm font-semibold">Pro</p>
              <p className="text-2xl font-bold mt-1">
                <span className="line-through text-muted-foreground text-sm mr-1">
                  &#8377;799
                </span>
                &#8377;499
                <span className="text-xs font-normal text-muted-foreground">
                  /mo
                </span>
              </p>
              <p className="text-[10px] text-accent font-medium">
                Founding price
              </p>
              <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                <li>Everything in Basic</li>
                <li>Unlimited AI assists</li>
                <li>Premium Resources</li>
                <li>Tribe Access (Skool)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
