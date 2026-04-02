"use client";

import { useState } from "react";
import { usePostCreator } from "@/hooks/usePostCreator";
import { useUser } from "@/hooks/useUser";
import { useToast } from "@/components/ui/toast";
import { createClient } from "@/lib/supabase/client";
import { Editor } from "@/components/post-creator/Editor";
import { HookSuggestions } from "@/components/post-creator/HookSuggestions";
import { TemplateSelector } from "@/components/post-creator/TemplateSelector";
import { ToneAnalyzer } from "@/components/post-creator/ToneAnalyzer";
import { PostPreview } from "@/components/post-creator/PostPreview";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Save, Trash2 } from "lucide-react";

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

  async function handleSaveDraft() {
    if (!content.trim()) {
      addToast({ title: "Nothing to save", variant: "destructive" });
      return;
    }

    setSaving(true);
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
    setSaving(false);
  }

  return (
    <div className="space-y-4">
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
