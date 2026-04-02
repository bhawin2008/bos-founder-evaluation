"use client";

import { useUser } from "@/hooks/useUser";
import { useSubscription } from "@/hooks/useSubscription";
import { Paywall } from "@/components/ui/paywall";
import { PageLoader } from "@/components/ui/loading";

interface SubscriptionGateProps {
  children: React.ReactNode;
  feature: "post_creator" | "inspiration" | "resources" | "ai_assist" | "premium_resources";
}

export function SubscriptionGate({ children, feature }: SubscriptionGateProps) {
  const { profile, loading } = useUser();
  const { canAccessFeature } = useSubscription(profile);

  if (loading) {
    return <PageLoader />;
  }

  if (!canAccessFeature(feature)) {
    return (
      <div className="relative min-h-[400px]">
        <div className="opacity-30 pointer-events-none">{children}</div>
        <Paywall />
      </div>
    );
  }

  return <>{children}</>;
}
