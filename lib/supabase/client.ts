import { createClient } from "@supabase/supabase-js";

export function createSupabaseClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL;

  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error("SUPABASE_URL não configurada (client)");
  }

  if (!supabaseAnonKey) {
    throw new Error("SUPABASE_ANON_KEY não configurada (client)");
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}