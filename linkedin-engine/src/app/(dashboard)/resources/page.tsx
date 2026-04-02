"use client";

import { useState, useMemo } from "react";
import { hooksLibrary } from "@/data/hooks-library";
import { templates } from "@/data/templates";
import { useUser } from "@/hooks/useUser";
import { useToast } from "@/components/ui/toast";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Copy,
  Check,
  Download,
  Lock,
  Bookmark,
  FolderOpen,
  Rocket,
  BookOpen,
  Award,
  Users,
  MessageSquare,
  Image,
} from "lucide-react";

const useCases = [
  { id: "all", label: "All Resources", icon: FolderOpen },
  { id: "launching", label: "Launching Something", icon: Rocket },
  { id: "story", label: "Personal Story", icon: BookOpen },
  { id: "authority", label: "Establish Authority", icon: Award },
  { id: "clients", label: "Get Clients", icon: Users },
  { id: "engagement", label: "Boost Engagement", icon: MessageSquare },
  { id: "banners", label: "Profile Banners", icon: Image },
];

// Build resource items from seed data
function buildResources() {
  const hookResources = Object.entries(
    hooksLibrary.reduce(
      (acc, hook) => {
        if (!acc[hook.category]) acc[hook.category] = [];
        acc[hook.category].push(hook.text);
        return acc;
      },
      {} as Record<string, string[]>
    )
  ).map(([category, hooks]) => ({
    title: `${category.charAt(0).toUpperCase() + category.slice(1).replace("_", " ")} Hooks Collection`,
    description: `${hooks.length} curated hooks for ${category.replace("_", " ")} posts`,
    category: "hooks" as const,
    use_case: mapCategoryToUseCase(category),
    items: hooks,
    is_premium: false,
    download_count: Math.floor(Math.random() * 200) + 50,
  }));

  const templateResources = templates.map((t) => ({
    title: `${t.name} Template`,
    description: t.description,
    category: "template" as const,
    use_case: mapCategoryToUseCase(t.category),
    items: t.structure.map((s) => s.label),
    is_premium: t.is_premium,
    download_count: Math.floor(Math.random() * 150) + 30,
  }));

  const ctaFrameworks = [
    { title: "Question CTA Framework", description: "End posts with engaging questions that drive comments", items: ["Has this happened to you?", "What would you do differently?", "Agree or disagree?", "What's your experience?", "Am I wrong?", "What would you add?"], is_premium: false },
    { title: "Action CTA Framework", description: "Drive specific actions with clear CTAs", items: ["Save this for later", "Share with someone who needs this", "Follow for more insights like this", "Drop a comment if you relate", "Repost to help others", "DM me 'strategy' for the full guide"], is_premium: false },
    { title: "DM Funnel CTA Framework", description: "Convert engagement to conversations", items: ["Comment 'interested' and I'll send you the template", "DM me 'growth' for the free checklist", "Drop a '1' in the comments for the full breakdown", "Comment 'yes' and I'll share the playbook"], is_premium: true },
  ].map((cta) => ({
    ...cta,
    category: "cta" as const,
    use_case: "clients",
    download_count: Math.floor(Math.random() * 100) + 20,
  }));

  return [...hookResources, ...templateResources, ...ctaFrameworks];
}

function mapCategoryToUseCase(category: string): string {
  const map: Record<string, string> = {
    launch: "launching",
    story: "story",
    personal: "story",
    authority: "authority",
    education: "authority",
    case_study: "clients",
    engagement: "engagement",
    controversy: "engagement",
    opinion: "engagement",
    how_to: "authority",
    listicle: "authority",
  };
  return map[category] || "all";
}

export default function ResourcesPage() {
  const [selectedUseCase, setSelectedUseCase] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { profile } = useUser();
  const { addToast } = useToast();

  const allResources = useMemo(() => buildResources(), []);

  const filtered = useMemo(
    () =>
      selectedUseCase === "all"
        ? allResources
        : allResources.filter((r) => r.use_case === selectedUseCase),
    [selectedUseCase, allResources]
  );

  async function handleCopy(text: string, id: string) {
    const content = Array.isArray(text) ? text.join("\n\n") : text;
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    addToast({ title: "Copied to clipboard!", variant: "success" });
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Resource Library</h1>
        <p className="text-sm text-muted-foreground">
          Your content toolkit — hooks, templates, CTAs, and more
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filter sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-1 sticky top-20">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Use Case
            </p>
            {useCases.map((uc) => (
              <button
                key={uc.id}
                onClick={() => setSelectedUseCase(uc.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer ${
                  selectedUseCase === uc.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <uc.icon className="h-4 w-4" />
                {uc.label}
              </button>
            ))}
          </div>
        </div>

        {/* Resource grid */}
        <div className="lg:col-span-3">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-center">
              <FolderOpen className="h-10 w-10 text-muted-foreground/40 mb-3" />
              <p className="text-sm text-muted-foreground">
                Your content toolkit is ready.
              </p>
              <p className="text-xs text-muted-foreground">
                Select a use case to find relevant resources.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {filtered.map((resource, i) => {
                const isLocked =
                  resource.is_premium && profile?.subscription_tier !== "pro";
                const resourceId = `${resource.category}-${i}`;

                return (
                  <Card
                    key={i}
                    className={`transition-colors ${isLocked ? "opacity-60" : "hover:border-primary/50"}`}
                  >
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium">{resource.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {resource.description}
                          </p>
                        </div>
                        {isLocked && <Lock className="h-4 w-4 text-muted-foreground shrink-0" />}
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-[10px]">
                          {resource.category}
                        </Badge>
                        {resource.is_premium && (
                          <Badge variant="accent" className="text-[10px]">
                            Pro
                          </Badge>
                        )}
                        <span className="text-[10px] text-muted-foreground ml-auto">
                          {resource.download_count} uses
                        </span>
                      </div>

                      {!isLocked && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full"
                          onClick={() =>
                            handleCopy(resource.items.join("\n\n"), resourceId)
                          }
                        >
                          {copiedId === resourceId ? (
                            <>
                              <Check className="h-3 w-3 mr-1" /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3 mr-1" /> Copy All
                            </>
                          )}
                        </Button>
                      )}

                      {isLocked && (
                        <Button size="sm" variant="accent" className="w-full">
                          <Lock className="h-3 w-3 mr-1" /> Upgrade to Pro
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
