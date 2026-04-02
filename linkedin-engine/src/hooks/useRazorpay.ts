"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/toast";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

interface UseRazorpayOptions {
  onSuccess?: (tier: string) => void;
}

export function useRazorpay({ onSuccess }: UseRazorpayOptions = {}) {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  async function loadScript(): Promise<boolean> {
    if (typeof window !== "undefined" && window.Razorpay) return true;

    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function checkout(planType: string) {
    setLoading(true);

    const loaded = await loadScript();
    if (!loaded) {
      addToast({
        title: "Failed to load payment gateway",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      // Create order
      const res = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planType }),
      });

      const data = await res.json();
      if (data.error) {
        addToast({ title: data.error, variant: "destructive" });
        setLoading(false);
        return;
      }

      // Open Razorpay checkout
      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "LinkedIn Engine",
        description: `${planType.replace("_", " ")} subscription`,
        order_id: data.orderId,
        handler: async function (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) {
          // Verify payment
          const verifyRes = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            addToast({
              title: "Payment successful!",
              description: `You're now on the ${verifyData.tier} plan.`,
              variant: "success",
            });
            onSuccess?.(verifyData.tier);
          } else {
            addToast({
              title: "Payment verification failed",
              variant: "destructive",
            });
          }
        },
        theme: {
          color: "#1B5E8C",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch {
      addToast({ title: "Payment failed", variant: "destructive" });
    }

    setLoading(false);
  }

  return { checkout, loading };
}
