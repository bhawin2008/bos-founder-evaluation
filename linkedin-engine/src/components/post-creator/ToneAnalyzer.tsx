"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import type { AISuggestions } from "@/types";
import { Sparkles, TrendingUp, MessageSquare, Eye, Target } from "lucide-react";

interface ToneAnalyzerProps {
  content: string;
}

function ScoreBar({ score, label }: { score: number; label: string }) {
  const color =
    score >= 8
      ? "bg-green-500"
      : score >= 6
        ? "bg-accent"
        : score >= 4
          ? "bg-yellow-500"
          : "bg-destructive";

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{score}/10</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${score * 10}%` }}
        />
      </div>
    </div>
  );
}

export function ToneAnalyzer({ content }: ToneAnalyzerProps) {
  const [analysis, setAnalysis] = useState<AISuggestions | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    if (!content.trim() || content.trim().length < 20) {
      setError("Write at least 20 characters before analyzing.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setAnalysis(data.analysis);
      }
    } catch {
      setError("Failed to analyze. Please try again.");
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="space-y-4 p-1">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Sparkles className="h-8 w-8 text-accent mb-3" />
        <p className="text-sm font-medium mb-1">AI Post Analysis</p>
        <p className="text-xs text-muted-foreground mb-4 max-w-[240px]">
          Get a detailed score and actionable feedback on your post draft.
        </p>
        {error && (
          <p className="text-xs text-destructive mb-3">{error}</p>
        )}
        <Button onClick={handleAnalyze} size="sm">
          Analyze My Post
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`text-2xl font-bold ${
              analysis.overall_score >= 7
                ? "text-green-600"
                : analysis.overall_score >= 5
                  ? "text-accent"
                  : "text-destructive"
            }`}
          >
            {analysis.overall_score}/10
          </div>
          <Badge
            variant={
              analysis.estimated_engagement === "high"
                ? "default"
                : analysis.estimated_engagement === "medium"
                  ? "accent"
                  : "secondary"
            }
          >
            {analysis.estimated_engagement} engagement
          </Badge>
        </div>
        <Button variant="ghost" size="sm" onClick={handleAnalyze}>
          Re-analyze
        </Button>
      </div>

      <p className="text-sm italic text-muted-foreground">
        &ldquo;{analysis.one_line_verdict}&rdquo;
      </p>

      <div className="space-y-3">
        <ScoreBar score={analysis.hook_strength.score} label="Hook Strength" />
        <ScoreBar score={analysis.readability.score} label="Readability" />
        <ScoreBar score={analysis.value.score} label="Value" />
        <ScoreBar score={analysis.cta_strength.score} label="CTA Strength" />
      </div>

      <div className="space-y-2 border-t pt-3">
        <p className="text-xs font-medium flex items-center gap-1">
          <Target className="h-3 w-3" /> Suggestions
        </p>
        {analysis.suggestions.map((suggestion, i) => (
          <p key={i} className="text-xs text-muted-foreground pl-4 relative">
            <span className="absolute left-0">•</span>
            {suggestion}
          </p>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 border-t pt-3">
        <div className="text-xs">
          <p className="text-muted-foreground flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> Hook
          </p>
          <p className="mt-0.5">{analysis.hook_strength.feedback}</p>
        </div>
        <div className="text-xs">
          <p className="text-muted-foreground flex items-center gap-1">
            <Eye className="h-3 w-3" /> Readability
          </p>
          <p className="mt-0.5">{analysis.readability.feedback}</p>
        </div>
        <div className="text-xs">
          <p className="text-muted-foreground flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> Value
          </p>
          <p className="mt-0.5">{analysis.value.feedback}</p>
        </div>
        <div className="text-xs">
          <p className="text-muted-foreground flex items-center gap-1">
            <MessageSquare className="h-3 w-3" /> CTA
          </p>
          <p className="mt-0.5">{analysis.cta_strength.feedback}</p>
        </div>
      </div>
    </div>
  );
}
