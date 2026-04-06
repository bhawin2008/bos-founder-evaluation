"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <header className="lg:hidden sticky top-0 z-40 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-14 items-center px-4">
        <Link href="/create" className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent" />
          <span className="text-lg font-bold text-primary">LinkedIn</span>
          <span className="text-lg font-bold text-accent">Engine</span>
        </Link>
      </div>
    </header>
  );
}
