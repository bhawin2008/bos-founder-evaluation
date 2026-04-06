"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Monitor, Smartphone } from "lucide-react";

interface PostPreviewProps {
  content: string;
  showsSeeMore: (mode: "mobile" | "desktop") => boolean;
  getPreviewContent: (mode: "mobile" | "desktop") => string;
  wordCount: number;
  estimatedReadTime: number;
  onCopy: () => Promise<void>;
}

export function PostPreview({
  content,
  showsSeeMore,
  getPreviewContent,
  wordCount,
  estimatedReadTime,
  onCopy,
}: PostPreviewProps) {
  const [viewMode, setViewMode] = useState<"mobile" | "desktop">("mobile");
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const hasSeeMore = showsSeeMore(viewMode);
  const previewText = expanded ? content : getPreviewContent(viewMode);

  async function handleCopy() {
    await onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!content.trim()) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Monitor className="h-8 w-8 text-muted-foreground/40 mb-3" />
        <p className="text-sm text-muted-foreground">
          Start writing to see your preview
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
          <button
            onClick={() => {
              setViewMode("mobile");
              setExpanded(false);
            }}
            className={`p-1.5 rounded-md transition-colors cursor-pointer ${
              viewMode === "mobile" ? "bg-background shadow-sm" : ""
            }`}
          >
            <Smartphone className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              setViewMode("desktop");
              setExpanded(false);
            }}
            className={`p-1.5 rounded-md transition-colors cursor-pointer ${
              viewMode === "desktop" ? "bg-background shadow-sm" : ""
            }`}
          >
            <Monitor className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{wordCount} words</span>
          <span>~{estimatedReadTime} min read</span>
        </div>
      </div>

      {/* LinkedIn-style preview */}
      <div
        className={`border rounded-xl bg-white p-4 ${
          viewMode === "mobile" ? "max-w-[360px] mx-auto" : ""
        }`}
      >
        {/* Profile header mock */}
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-primary/20" />
          <div>
            <p className="text-sm font-semibold text-gray-900">Your Name</p>
            <p className="text-xs text-gray-500">Your headline</p>
            <p className="text-xs text-gray-400">Just now</p>
          </div>
        </div>

        {/* Post content */}
        <div className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
          {previewText}
          {hasSeeMore && !expanded && (
            <button
              onClick={() => setExpanded(true)}
              className="text-gray-500 hover:text-gray-700 ml-1 cursor-pointer"
            >
              ...see more
            </button>
          )}
        </div>

        {/* Engagement bar mock */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t text-xs text-gray-500">
          <span>Like</span>
          <span>Comment</span>
          <span>Repost</span>
          <span>Send</span>
        </div>
      </div>

      {hasSeeMore && (
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-[10px]">
            {viewMode === "mobile" ? "Mobile" : "Desktop"}: Shows
            &ldquo;...see more&rdquo;
          </Badge>
        </div>
      )}

      <Button onClick={handleCopy} variant="outline" className="w-full" size="sm">
        {copied ? (
          <>
            <Check className="h-4 w-4 mr-1" /> Copied!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 mr-1" /> Copy to Clipboard
          </>
        )}
      </Button>
    </div>
  );
}
