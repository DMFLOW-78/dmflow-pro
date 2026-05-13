"use client";

import { useEffect, useMemo } from "react";
import { createSupabaseClient } from "@/lib/supabase/client";

export default function LogoutPage() {
  const supabase = useMemo(() => createSupabaseClient(), []);

  useEffect(() => {
    async function logout() {
      await supabase.auth.signOut();
      window.location.href = "/login";
    }

    logout();
  }, [supabase]);

  return null;
}