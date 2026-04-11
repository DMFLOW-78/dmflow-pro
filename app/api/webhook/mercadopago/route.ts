import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !url.startsWith("http")) {
    throw new Error("SUPABASE_URL inválida");
  }

  if (!key) {
    throw new Error("SUPABASE key ausente");
  }

  return createClient(url, key);
}

export async function POST(request: Request) {
  const supabase = getSupabaseAdmin();

  // seu código aqui

  return new Response("OK", { status: 200 });
}