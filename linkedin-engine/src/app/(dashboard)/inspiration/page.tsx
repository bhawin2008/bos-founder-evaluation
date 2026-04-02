"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { whatIfPrompts } from "@/data/what-if-prompts";
import { swipeFile, type SwipePost } from "@/data/swipe-file";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select } from "@/components/ui/select";
import {
  Lightbulb,
  Sparkles,
  RefreshCw,
  ArrowRight,
  Bookmark,
  Eye,
} from "lucide-react";

export default function InspirationPage() {
  const router = useRouter();
  const { profile } = useUser();

  // Daily prompts state
  const [customTopic, setCustomTopic] = useState("");
  const [goal, setGoal] = useState("grow_audience");
  const [generatedPrompts, setGeneratedPrompts] = useState<
    { idea: string; format: string; starter_hook: string; why_it_works: string }[]
  >([]);
  const [generatingPrompts, setGeneratingPrompts] = useState(false);

  // What-if state
  const [whatIfIndex, setWhatIfIndex] = useState(0);
  const visibleWhatIfs = whatIfPrompts.slice(whatIfIndex, whatIfIndex + 5);

  // Swipe file state
  const [swipeFilter, setSwipeFilter] = useState("all");
  const [expandedSwipe, setExpandedSwipe] = useState<number | null>(null);

  const filteredSwipe = useMemo(
    () =>
      swipeFilter === "all"
        ? swipeFile
        : swipeFile.filter(
            (s) => s.industry.toLowerCase() === swipeFilter.toLowerCase() || s.goal === swipeFilter
          ),
    [swipeFilter]
  );

  async function handleGeneratePrompts() {
    setGeneratingPrompts(true);
    try {
      const res = await fetch("/api/ai/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry: profile?.industry || customTopic || "General",
          contentPillars: profile?.content_pillars || [],
          goal,
        }),
      });
      const data = await res.json();
      if (data.prompts) setGeneratedPrompts(data.prompts);
    } catch {
      // silently fail
    }
    setGeneratingPrompts(false);
  }

  function handleUsePrompt(text: string) {
    // Store in sessionStorage for the create page to pick up
    sessionStorage.setItem("linkedin_engine_prompt", text);
    router.push("/create");
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Inspiration Engine</h1>
        <p className="text-sm text-muted-foreground">
          Find your next great LinkedIn post idea
        </p>
      </div>

      <Tabs defaultValue="prompts">
        <TabsList>
          <TabsTrigger value="prompts">Today&apos;s Prompts</TabsTrigger>
          <TabsTrigger value="swipe">Swipe File</TabsTrigger>
          <TabsTrigger value="whatif">What If</TabsTrigger>
        </TabsList>

        {/* Today's Prompts */}
        <TabsContent value="prompts">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Topic or niche</label>
                <Input
                  placeholder="e.g., SaaS marketing, leadership, hiring..."
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Goal</label>
                <Select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  options={[
                    { value: "grow_audience", label: "Grow audience" },
                    { value: "get_clients", label: "Get clients" },
                    { value: "build_authority", label: "Build authority" },
                    { value: "start_conversations", label: "Start conversations" },
                  ]}
                />
              </div>
            </div>

            <Button onClick={handleGeneratePrompts} disabled={generatingPrompts}>
              <Sparkles className="h-4 w-4 mr-1" />
              {generatingPrompts ? "Generating..." : "Generate Custom Prompts"}
            </Button>

            {generatingPrompts && (
              <div className="grid gap-4 sm:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-4 space-y-3">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-8 w-24" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {generatedPrompts.length > 0 && !generatingPrompts && (
              <div className="grid gap-4 sm:grid-cols-3">
                {generatedPrompts.map((prompt, i) => (
                  <Card key={i} className="hover:border-primary/50 transition-colors">
                    <CardContent className="p-4 space-y-3">
                      <Badge variant="secondary" className="text-[10px]">
                        {prompt.format}
                      </Badge>
                      <p className="text-sm font-medium">{prompt.idea}</p>
                      <p className="text-xs text-muted-foreground italic">
                        &ldquo;{prompt.starter_hook}&rdquo;
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {prompt.why_it_works}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUsePrompt(prompt.starter_hook)}
                      >
                        Use This <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {generatedPrompts.length === 0 && !generatingPrompts && (
              <div className="flex flex-col items-center py-12 text-center">
                <Lightbulb className="h-10 w-10 text-accent/50 mb-3" />
                <p className="text-sm text-muted-foreground">
                  Let&apos;s find your next great idea.
                </p>
                <p className="text-xs text-muted-foreground">
                  Enter a topic and click Generate to get personalized prompts.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Swipe File */}
        <TabsContent value="swipe">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {["all", "engagement", "authority", "education"].map((f) => (
                <button
                  key={f}
                  onClick={() => setSwipeFilter(f)}
                  className={`px-3 py-1.5 text-xs rounded-full transition-colors cursor-pointer ${
                    swipeFilter === f
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {filteredSwipe.map((post, i) => (
                <Card key={i} className="hover:border-primary/50 transition-colors">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-[10px]">
                        {post.content_type}
                      </Badge>
                      <Badge variant="secondary" className="text-[10px]">
                        {post.industry}
                      </Badge>
                      <Badge
                        variant={post.engagement_level === "viral" ? "accent" : "secondary"}
                        className="text-[10px]"
                      >
                        {post.engagement_level}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium">{post.hook}</p>
                    {expandedSwipe === i ? (
                      <>
                        <p className="text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed">
                          {post.content}
                        </p>
                        <button
                          onClick={() => setExpandedSwipe(null)}
                          className="text-xs text-primary hover:underline cursor-pointer"
                        >
                          Show less
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setExpandedSwipe(i)}
                        className="text-xs text-primary hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="h-3 w-3" /> Read full post
                      </button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUsePrompt(post.hook)}
                    >
                      Create Similar <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* What If */}
        <TabsContent value="whatif">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Creative prompts to spark unconventional thinking
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setWhatIfIndex((prev) =>
                    prev + 5 >= whatIfPrompts.length ? 0 : prev + 5
                  )
                }
              >
                <RefreshCw className="h-4 w-4 mr-1" /> Refresh
              </Button>
            </div>

            <div className="space-y-3">
              {visibleWhatIfs.map((prompt, i) => (
                <Card key={whatIfIndex + i} className="hover:border-primary/50 transition-colors">
                  <CardContent className="p-4 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <p className="text-sm">{prompt}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="shrink-0"
                      onClick={() => handleUsePrompt(prompt)}
                    >
                      Use This
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
