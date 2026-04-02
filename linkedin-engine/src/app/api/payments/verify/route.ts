import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/server";
import { verifyRazorpaySignature, PLANS } from "@/lib/razorpay/client";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await request.json();

    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // Use service client to update profile (bypasses RLS for admin operations)
    const serviceClient = await createServiceClient();

    // Get the payment record to determine the plan
    const { data: payment } = await serviceClient
      .from("payments")
      .select("*")
      .eq("razorpay_order_id", razorpay_order_id)
      .single();

    if (!payment) {
      return NextResponse.json(
        { error: "Payment not found" },
        { status: 404 }
      );
    }

    const plan = PLANS[payment.plan_type as keyof typeof PLANS];

    // Update payment status
    await serviceClient
      .from("payments")
      .update({
        razorpay_payment_id,
        razorpay_signature,
        status: "captured",
      })
      .eq("razorpay_order_id", razorpay_order_id);

    // Calculate subscription end date
    const endDate = new Date();
    if (payment.plan_type === "pro_annual") {
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else {
      endDate.setMonth(endDate.getMonth() + 1);
    }

    // Update user subscription
    await serviceClient
      .from("profiles")
      .update({
        subscription_tier: plan.tier,
        subscription_status: "active",
        subscription_end_date: endDate.toISOString(),
      })
      .eq("id", user.id);

    return NextResponse.json({ success: true, tier: plan.tier });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
