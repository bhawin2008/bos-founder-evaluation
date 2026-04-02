import { NextRequest, NextResponse } from "next/server";
import { DEMO_ANALYSIS } from "@/lib/demo";

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();

    if (!content || content.trim().length < 20) {
      return NextResponse.json(
        { error: "Post content must be at least 20 characters" },
        { status: 400 }
      );
    }

    // Demo mode: return mock analysis
    if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") {
      return NextResponse.json({ analysis: DEMO_ANALYSIS });
    }

    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { analyzePost } = await import("@/lib/ai/claude");
    const analysis = await analyzePost(content);

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Error analyzing post:", error);
    return NextResponse.json(
      { error: "Failed to analyze post" },
      { status: 500 }
    );
  }
}
