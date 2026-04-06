"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { usePostCreator } from "@/hooks/usePostCreator";
import { useUser } from "@/hooks/useUser";
import { useToast } from "@/components/ui/toast";
import { DEMO_MODE } from "@/lib/demo";
import { Editor } from "@/components/post-creator/Editor";
import { HookSuggestions } from "@/components/post-creator/HookSuggestions";
import { TemplateSelector } from "@/components/post-creator/TemplateSelector";
import { ToneAnalyzer } from "@/components/post-creator/ToneAnalyzer";
import { PostPreview } from "@/components/post-creator/PostPreview";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Save, Trash2, Sparkles, PenLine, Lightbulb, FolderOpen } from "lucide-react";

function WelcomeModal() {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("welcome") === "true") {
      setOpen(true);
      // Clean the URL
      window.history.replaceState({}, "", "/create");
    }
  }, [searchParams]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-3 h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-accent" />
          </div>
          <DialogTitle className="text-center">
            Welcome to LinkedIn Engine!
          </DialogTitle>
          <DialogDescription className="text-center">
            Your 7-day free Pro trial has started. Here&apos;s what you can do:
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
            <PenLine className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Post Creator</p>
              <p className="text-xs text-muted-foreground">
                Write with 50+ hooks, 8 templates, and AI-powered feedback
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
            <Lightbulb className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Inspiration Engine</p>
              <p className="text-xs text-muted-foreground">
                Daily prompts, swipe file, and &ldquo;what if&rdquo; creative sparks
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
            <FolderOpen className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Resource Library</p>
              <p className="text-xs text-muted-foreground">
                Hooks, templates, CTA frameworks — all organized by use case
              </p>
            </div>
          </div>
        </div>
        <Button className="w-full" onClick={() => setOpen(false)}>
          Start Writing <PenLine className="h-4 w-4 ml-1" />
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default function CreatePage() {
  const {
    content,
    setContent,
    charCount,
    charsRemaining,
    lineCount,
    wordCount,
    estimatedReadTime,
    showsSeeMore,
    getPreviewContent,
    insertHook,
    applyTemplate,
    copyToClipboard,
    clear,
    isOverLimit,
  } = usePostCreator();

  const { profile } = useUser();
  const { addToast } = useToast();
  const [saving, setSaving] = useState(false);

  // Pick up prompt from Inspiration Engine (via sessionStorage)
  useEffect(() => {
    const prompt = sessionStorage.getItem("linkedin_engine_prompt");
    if (prompt) {
      setContent(prompt);
      sessionStorage.removeItem("linkedin_engine_prompt");
    }
  }, [setContent]);

  async function handleSaveDraft() {
    if (!content.trim()) {
      addToast({ title: "Nothing to save", variant: "destructive" });
      return;
    }

    setSaving(true);

    if (DEMO_MODE) {
      // Save to localStorage in demo mode
      const drafts = JSON.parse(localStorage.getItem("le_drafts") || "[]");
      drafts.push({
        id: crypto.randomUUID(),
        content,
        status: "draft",
        created_at: new Date().toISOString(),
      });
      localStorage.setItem("le_drafts", JSON.stringify(drafts));
      addToast({ title: "Draft saved!", variant: "success" });
    } else {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { error } = await supabase.from("posts").insert({
        user_id: profile?.id,
        content,
        status: "draft",
        content_type: "text",
      });

      if (error) {
        addToast({ title: "Failed to save draft", variant: "destructive" });
      } else {
        addToast({ title: "Draft saved!", variant: "success" });
      }
    }
    setSaving(false);
  }

  return (
    <div className="space-y-4">
      <Suspense>
        <WelcomeModal />
      </Suspense>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Post Creator</h1>
          <p className="text-sm text-muted-foreground">
            Write, refine, and preview your LinkedIn post
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={clear}>
            <Trash2 className="h-4 w-4 mr-1" /> Clear
          </Button>
          <Button size="sm" onClick={handleSaveDraft} disabled={saving}>
            <Save className="h-4 w-4 mr-1" />
            {saving ? "Saving..." : "Save Draft"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Editor — 60% */}
        <Card className="lg:col-span-3 overflow-hidden">
          <Editor
            content={content}
            onChange={setContent}
            charCount={charCount}
            charsRemaining={charsRemaining}
            lineCount={lineCount}
            wordCount={wordCount}
            isOverLimit={isOverLimit}
          />
        </Card>

        {/* Right Panel — 40% */}
        <Card className="lg:col-span-2 p-4">
          <Tabs defaultValue="hooks">
            <TabsList className="w-full">
              <TabsTrigger value="hooks">Hooks</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="ai">AI Assist</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="hooks">
              <HookSuggestions onSelectHook={insertHook} />
            </TabsContent>

            <TabsContent value="templates">
              <TemplateSelector
                onApplyTemplate={applyTemplate}
                userTier={profile?.subscription_tier || "free"}
              />
            </TabsContent>

            <TabsContent value="ai">
              <ToneAnalyzer content={content} />
            </TabsContent>

            <TabsContent value="preview">
              <PostPreview
                content={content}
                showsSeeMore={showsSeeMore}
                getPreviewContent={getPreviewContent}
                wordCount={wordCount}
                estimatedReadTime={estimatedReadTime}
                onCopy={copyToClipboard}
              />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
