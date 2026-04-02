"use client";

import { useMemo } from "react";
import type { Profile } from "@/types";

export function useSubscription(profile: Profile | null) {
  const tier = profile?.subscription_tier ?? "free";
  const status = profile?.subscription_status ?? "inactive";
  const endDate = profile?.subscription_end_date;

  const isActive = useMemo(() => {
    if (tier === "free") {
      // Check if within 7-day trial
      if (profile?.created_at) {
        const created = new Date(profile.created_at);
        const trialEnd = new Date(created.getTime() + 7 * 24 * 60 * 60 * 1000);
        return new Date() < trialEnd;
      }
      return false;
    }
    return status === "active";
  }, [tier, status, profile?.created_at]);

  const isTrialing = useMemo(() => {
    if (tier !== "free") return false;
    if (profile?.created_at) {
      const created = new Date(profile.created_at);
      const trialEnd = new Date(created.getTime() + 7 * 24 * 60 * 60 * 1000);
      return new Date() < trialEnd;
    }
    return false;
  }, [tier, profile?.created_at]);

  const trialDaysLeft = useMemo(() => {
    if (!isTrialing || !profile?.created_at) return 0;
    const created = new Date(profile.created_at);
    const trialEnd = new Date(created.getTime() + 7 * 24 * 60 * 60 * 1000);
    const diff = trialEnd.getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (24 * 60 * 60 * 1000)));
  }, [isTrialing, profile?.created_at]);

  const canAccessFeature = (feature: "post_creator" | "inspiration" | "resources" | "ai_assist" | "premium_resources") => {
    if (isActive || isTrialing) {
      if (feature === "premium_resources" && tier === "basic") return false;
      return true;
    }
    return false;
  };

  const aiCallsLimit = tier === "pro" ? 50 : tier === "basic" ? 10 : 0;

  return {
    tier,
    status,
    endDate,
    isActive,
    isTrialing,
    trialDaysLeft,
    canAccessFeature,
    aiCallsLimit,
  };
}
