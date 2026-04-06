import Razorpay from "razorpay";
import crypto from "crypto";

export function getRazorpayInstance() {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });
}

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const body = orderId + "|" + paymentId;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");
  return expectedSignature === signature;
}

export function verifyWebhookSignature(
  body: string,
  signature: string
): boolean {
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest("hex");
  return expectedSignature === signature;
}

export const PLANS = {
  basic_monthly: {
    name: "Basic Monthly",
    amount: 29900, // ₹299 in paise
    founding_amount: 29900,
    regular_amount: 49900,
    period: "monthly",
    tier: "basic" as const,
  },
  pro_monthly: {
    name: "Pro Monthly",
    amount: 49900, // ₹499 in paise
    founding_amount: 49900,
    regular_amount: 79900,
    period: "monthly",
    tier: "pro" as const,
  },
  pro_annual: {
    name: "Pro Annual",
    amount: 399900, // ₹3,999 in paise
    founding_amount: 399900,
    regular_amount: 699900,
    period: "yearly",
    tier: "pro" as const,
  },
} as const;
