import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv, hasSupabaseConfig } from "@/lib/supabase/env";

export function hasSupabaseBrowserEnv() {
  return hasSupabaseConfig();
}

export function createClient() {
  const { url, key } = getSupabaseEnv();
  if (!url || !key) throw new Error("Variables Supabase manquantes");
  return createBrowserClient(url, key);
}
