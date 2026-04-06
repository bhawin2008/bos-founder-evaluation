import { NextRequest, NextResponse } from "next/server";
import { DEMO_PROMPTS } from "@/lib/demo";

export async function POST(request: NextRequest) {
  try {
    const { industry } = await request.json();

    if (!industry) {
      return NextResponse.json(
        { error: "Industry is required" },
        { status: 400 }
      );
    }

    // Demo mode: return mock prompts
    if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") {
      return NextResponse.json({ prompts: DEMO_PROMPTS });
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
    const { generatePrompts } = await import("@/lib/ai/claude");
    const prompts = await generatePrompts(
      industry,
      body.contentPillars || [],
      body.goal || "grow_audience"
    );

    return NextResponse.json({ prompts });
  } catch (error) {
    console.error("Error generating prompts:", error);
    return NextResponse.json(
      { error: "Failed to generate prompts" },
      { status: 500 }
    );
  }
}
