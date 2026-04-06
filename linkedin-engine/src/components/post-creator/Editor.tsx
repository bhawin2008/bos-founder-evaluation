"use client";

import { cn } from "@/lib/utils";

interface EditorProps {
  content: string;
  onChange: (value: string) => void;
  charCount: number;
  charsRemaining: number;
  lineCount: number;
  wordCount: number;
  isOverLimit: boolean;
}

export function Editor({
  content,
  onChange,
  charCount,
  charsRemaining,
  lineCount,
  wordCount,
  isOverLimit,
}: EditorProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 relative">
        <textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Start writing your LinkedIn post here...

Tip: A great post starts with a hook that makes people stop scrolling."
          className="w-full h-full min-h-[400px] lg:min-h-[500px] resize-none border-0 bg-transparent p-4 text-base leading-relaxed focus:outline-none placeholder:text-muted-foreground/50"
        />
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/30 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>{wordCount} words</span>
          <span>{lineCount} lines</span>
          <span
            className={cn(
              lineCount > 5 && "text-accent font-medium",
              lineCount > 3 && lineCount <= 5 && "text-yellow-600"
            )}
          >
            {lineCount > 5
              ? "Shows '...see more' on mobile"
              : lineCount > 3
                ? "Shows '...see more' on desktop"
                : "Full post visible"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "font-medium",
              isOverLimit ? "text-destructive" : charsRemaining < 200 ? "text-accent" : ""
            )}
          >
            {charCount}/3,000
          </span>
        </div>
      </div>
    </div>
  );
}
