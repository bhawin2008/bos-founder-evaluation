import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { verifyWebhookSignature } from "@/lib/razorpay/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    if (!signature || !verifyWebhookSignature(body, signature)) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    const event = JSON.parse(body);
    const serviceClient = await createServiceClient();

    switch (event.event) {
      case "payment.captured": {
        const paymentId = event.payload.payment.entity.id;
        const orderId = event.payload.payment.entity.order_id;

        await serviceClient
          .from("payments")
          .update({ status: "captured", razorpay_payment_id: paymentId })
          .eq("razorpay_order_id", orderId);
        break;
      }

      case "payment.failed": {
        const orderId = event.payload.payment.entity.order_id;

        await serviceClient
          .from("payments")
          .update({ status: "failed" })
          .eq("razorpay_order_id", orderId);
        break;
      }

      case "subscription.cancelled": {
        const subscriptionId = event.payload.subscription.entity.id;

        await serviceClient
          .from("profiles")
          .update({
            subscription_status: "cancelled",
          })
          .eq("razorpay_subscription_id", subscriptionId);
        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
