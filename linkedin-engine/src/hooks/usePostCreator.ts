"use client";

import { useState, useCallback } from "react";

const LINKEDIN_CHAR_LIMIT = 3000;
const MOBILE_SEE_MORE_LINES = 5;
const DESKTOP_SEE_MORE_LINES = 3;

export function usePostCreator() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const charCount = content.length;
  const charsRemaining = LINKEDIN_CHAR_LIMIT - charCount;
  const lineCount = content.split("\n").length;
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 200));

  const mobilePreviewLines = MOBILE_SEE_MORE_LINES;
  const desktopPreviewLines = DESKTOP_SEE_MORE_LINES;

  const showsSeeMore = (mode: "mobile" | "desktop") => {
    const threshold =
      mode === "mobile" ? mobilePreviewLines : desktopPreviewLines;
    return lineCount > threshold;
  };

  const getPreviewContent = (mode: "mobile" | "desktop") => {
    const threshold =
      mode === "mobile" ? mobilePreviewLines : desktopPreviewLines;
    const lines = content.split("\n");
    if (lines.length <= threshold) return content;
    return lines.slice(0, threshold).join("\n");
  };

  const insertAtCursor = useCallback(
    (text: string, cursorPosition?: number) => {
      if (cursorPosition !== undefined) {
        const before = content.slice(0, cursorPosition);
        const after = content.slice(cursorPosition);
        setContent(before + text + after);
      } else {
        setContent((prev) => (prev ? text + "\n\n" + prev : text));
      }
    },
    [content]
  );

  const insertHook = useCallback(
    (hookText: string) => {
      if (content.trim()) {
        setContent(hookText + "\n\n" + content);
      } else {
        setContent(hookText);
      }
    },
    [content]
  );

  const applyTemplate = useCallback(
    (sections: { label: string; placeholder: string }[]) => {
      const templateContent = sections
        .map((s) => `[${s.label.toUpperCase()} — ${s.placeholder}]`)
        .join("\n\n");
      setContent(templateContent);
    },
    []
  );

  const copyToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(content);
  }, [content]);

  const clear = useCallback(() => {
    setContent("");
    setTitle("");
  }, []);

  return {
    content,
    setContent,
    title,
    setTitle,
    charCount,
    charsRemaining,
    lineCount,
    wordCount,
    estimatedReadTime,
    showsSeeMore,
    getPreviewContent,
    insertAtCursor,
    insertHook,
    applyTemplate,
    copyToClipboard,
    clear,
    isOverLimit: charCount > LINKEDIN_CHAR_LIMIT,
  };
}
