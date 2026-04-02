import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { analyzePost } from "@/lib/ai/claude";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content } = await request.json();

    if (!content || content.trim().length < 20) {
      return NextResponse.json(
        { error: "Post content must be at least 20 characters" },
        { status: 400 }
      );
    }

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
