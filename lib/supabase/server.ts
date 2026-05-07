import { createClient } from "@supabase/supabase-js"

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL

const supabaseAnonKey =
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log("SUPABASE_URL existe?", !!supabaseUrl)
console.log("SUPABASE_KEY existe?", !!supabaseAnonKey)

if (!supabaseUrl) {
  throw new Error("SUPABASE_URL não configurada")
}

if (!supabaseAnonKey) {
  throw new Error("SUPABASE_ANON_KEY não configurada")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)