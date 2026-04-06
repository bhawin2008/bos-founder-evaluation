import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Skip auth in demo mode
  if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") {
    return NextResponse.next();
  }

  const { updateSession } = await import("@/lib/supabase/middleware");
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
