import { NextRequest, NextResponse } from "next/server";
import { DEMO_HOOKS } from "@/lib/demo";

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    // Demo mode: return mock hooks
    if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") {
      // Customize demo hooks slightly based on topic
      const hooks = DEMO_HOOKS.map((h) => ({
        ...h,
        hook: h.hook.replace("this strategy", `${topic}`),
      }));
      return NextResponse.json({ hooks });
    }

    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.clone().json();
    const { generateHooks } = await import("@/lib/ai/claude");
    const hooks = await generateHooks(
      topic,
      body.contentType || "tip",
      body.industry || "General",
      body.tone || "professional"
    );

    return NextResponse.json({ hooks });
  } catch (error) {
    console.error("Error generating hooks:", error);
    return NextResponse.json(
      { error: "Failed to generate hooks" },
      { status: 500 }
    );
  }
}
