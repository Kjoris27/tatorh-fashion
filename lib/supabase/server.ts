import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseEnv, hasSupabaseConfig } from "@/lib/supabase/env";

export function hasSupabaseEnv() {
  return hasSupabaseConfig();
}

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();
  const { url, key } = getSupabaseEnv();
  if (!url || !key) throw new Error("Variables Supabase manquantes");

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Les Server Components ne peuvent pas toujours écrire les cookies.
        }
      },
    },
  });
}
