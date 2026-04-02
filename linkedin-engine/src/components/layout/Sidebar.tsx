"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/hooks/useUser";
import { Badge } from "@/components/ui/badge";
import {
  PenLine,
  Lightbulb,
  FolderOpen,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";

const navItems = [
  { href: "/create", label: "Post Creator", icon: PenLine },
  { href: "/inspiration", label: "Inspiration", icon: Lightbulb },
  { href: "/resources", label: "Resources", icon: FolderOpen },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { profile } = useUser();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  const tierLabel =
    profile?.subscription_tier === "pro"
      ? "Pro"
      : profile?.subscription_tier === "basic"
        ? "Basic"
        : "Free";

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r bg-card h-screen sticky top-0">
      <div className="p-6 border-b">
        <Link href="/create" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-accent" />
          <div>
            <span className="text-xl font-bold text-primary">LinkedIn</span>
            <span className="text-xl font-bold text-accent">Engine</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        {profile && (
          <div className="flex items-center gap-3 mb-3">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
              {profile.full_name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {profile.full_name || "User"}
              </p>
              <Badge
                variant={tierLabel === "Pro" ? "accent" : "secondary"}
                className="text-xs"
              >
                {tierLabel}
              </Badge>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full px-3 py-2 rounded-lg hover:bg-muted cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
