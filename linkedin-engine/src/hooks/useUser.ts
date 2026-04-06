"use client";

import { useEffect, useState } from "react";
import { DEMO_MODE, DEMO_PROFILE } from "@/lib/demo";
import type { Profile } from "@/types";
import type { User } from "@supabase/supabase-js";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (DEMO_MODE) {
      setUser({ id: DEMO_PROFILE.id, email: DEMO_PROFILE.email } as User);
      setProfile(DEMO_PROFILE);
      setLoading(false);
      return;
    }

    async function init() {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        setProfile(data);
      }

      setLoading(false);

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        if (!session?.user) {
          setProfile(null);
        }
      });

      return () => subscription.unsubscribe();
    }

    init();
  }, []);

  return { user, profile, loading };
}
