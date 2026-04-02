"use client";

import { useState } from "react";
import { templates } from "@/data/templates";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";
import type { TemplateSection } from "@/types";

interface TemplateSelectorProps {
  onApplyTemplate: (sections: TemplateSection[]) => void;
  userTier: "free" | "basic" | "pro";
}

export function TemplateSelector({ onApplyTemplate, userTier }: TemplateSelectorProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {templates.map((template, index) => {
        const isLocked = template.is_premium && userTier !== "pro";
        const isExpanded = expandedId === template.name;

        return (
          <div
            key={index}
            className={`rounded-lg border transition-colors ${
              isLocked
                ? "opacity-60"
                : "hover:border-primary/50 cursor-pointer"
            }`}
          >
            <button
              onClick={() => {
                if (isLocked) return;
                setExpandedId(isExpanded ? null : template.name);
              }}
              className="w-full text-left p-3 cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium">{template.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {template.description}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Badge variant="secondary" className="text-[10px]">
                    {template.category}
                  </Badge>
                  {isLocked && <Lock className="h-3 w-3 text-muted-foreground" />}
                </div>
              </div>
            </button>

            {isExpanded && !isLocked && (
              <div className="px-3 pb-3 border-t pt-3">
                <div className="space-y-2 mb-3">
                  {template.structure.map((section, si) => (
                    <div key={si} className="text-xs">
                      <span className="font-medium text-primary">
                        {section.label}:
                      </span>{" "}
                      <span className="text-muted-foreground">
                        {section.tips}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => onApplyTemplate(template.structure)}
                  className="text-xs font-medium text-primary hover:underline cursor-pointer"
                >
                  Use this template
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
