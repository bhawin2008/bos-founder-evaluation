import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getRazorpayInstance, PLANS } from "@/lib/razorpay/client";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { planType } = await request.json();

    if (!planType || !(planType in PLANS)) {
      return NextResponse.json({ error: "Invalid plan type" }, { status: 400 });
    }

    const plan = PLANS[planType as keyof typeof PLANS];
    const razorpay = getRazorpayInstance();

    const order = await razorpay.orders.create({
      amount: plan.amount,
      currency: "INR",
      receipt: `order_${user.id}_${Date.now()}`,
      notes: {
        user_id: user.id,
        plan_type: planType,
      },
    });

    // Store pending payment
    await supabase.from("payments").insert({
      user_id: user.id,
      razorpay_order_id: order.id,
      amount: plan.amount,
      plan_type: planType,
      status: "pending",
    });

    return NextResponse.json({
      orderId: order.id,
      amount: plan.amount,
      currency: "INR",
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
