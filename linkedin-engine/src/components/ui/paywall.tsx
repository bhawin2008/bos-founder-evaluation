"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock, Crown, Sparkles } from "lucide-react";

interface PaywallProps {
  title?: string;
  description?: string;
}

export function Paywall({
  title = "Subscribe to Continue",
  description = "Your free trial has ended. Subscribe to unlock Post Creator, Inspiration Engine, and the full Resource Library.",
}: PaywallProps) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-xl">
      <div className="text-center max-w-sm px-6">
        <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center">
          <Lock className="h-7 w-7 text-accent" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-6">{description}</p>
        <div className="space-y-2">
          <Link href="/settings" className="block">
            <Button className="w-full">
              <Crown className="h-4 w-4 mr-1" /> View Plans
            </Button>
          </Link>
          <p className="text-xs text-muted-foreground">
            Starting at &#8377;299/month
          </p>
        </div>
      </div>
    </div>
  );
}

export function PremiumBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">
      <Sparkles className="h-2.5 w-2.5" /> Pro
    </span>
  );
}
