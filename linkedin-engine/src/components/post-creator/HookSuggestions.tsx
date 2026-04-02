"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { hooksLibrary } from "@/data/hooks-library";
import type { HookCategory } from "@/types";
import { Sparkles, Plus } from "lucide-react";

const categories: { value: HookCategory; label: string }[] = [
  { value: "story", label: "Story" },
  { value: "authority", label: "Authority" },
  { value: "engagement", label: "Engagement" },
  { value: "controversy", label: "Controversy" },
  { value: "education", label: "Education" },
  { value: "case_study", label: "Case Study" },
  { value: "launch", label: "Launch" },
  { value: "personal", label: "Personal" },
  { value: "opinion", label: "Opinion" },
];

interface HookSuggestionsProps {
  onSelectHook: (hook: string) => void;
}

export function HookSuggestions({ onSelectHook }: HookSuggestionsProps) {
  const [selectedCategory, setSelectedCategory] = useState<HookCategory>("story");
  const [topic, setTopic] = useState("");
  const [aiHooks, setAiHooks] = useState<{ hook: string; style: string }[]>([]);
  const [generating, setGenerating] = useState(false);

  const filteredHooks = hooksLibrary.filter((h) => h.category === selectedCategory);

  async function handleGenerate() {
    if (!topic.trim()) return;
    setGenerating(true);
    try {
      const res = await fetch("/api/ai/hooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          contentType: selectedCategory,
          industry: "General",
          tone: "professional",
        }),
      });
      const data = await res.json();
      if (data.hooks) setAiHooks(data.hooks);
    } catch {
      // silently fail
    }
    setGenerating(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-2.5 py-1 text-xs rounded-full transition-colors cursor-pointer ${
              selectedCategory === cat.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {filteredHooks.map((hook, i) => (
          <button
            key={i}
            onClick={() => onSelectHook(hook.text)}
            className="w-full text-left p-3 rounded-lg border hover:border-primary/50 hover:bg-primary/5 transition-colors text-sm leading-relaxed cursor-pointer group"
          >
            <span>{hook.text}</span>
            <Plus className="inline ml-2 h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>

      <div className="border-t pt-4">
        <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
          <Sparkles className="h-3 w-3" /> AI Hook Generator
        </p>
        <div className="flex gap-2">
          <Input
            placeholder="Enter your topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="text-sm"
          />
          <Button
            size="sm"
            onClick={handleGenerate}
            disabled={generating || !topic.trim()}
          >
            {generating ? "..." : "Generate"}
          </Button>
        </div>

        {generating && (
          <div className="mt-3 space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        )}

        {aiHooks.length > 0 && !generating && (
          <div className="mt-3 space-y-2">
            {aiHooks.map((hook, i) => (
              <button
                key={i}
                onClick={() => onSelectHook(hook.hook)}
                className="w-full text-left p-3 rounded-lg border border-accent/30 bg-accent/5 hover:bg-accent/10 transition-colors text-sm cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <span>{hook.hook}</span>
                  <Badge variant="accent" className="text-[10px] shrink-0">
                    {hook.style}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
