import { redirect } from "next/navigation";
import { createServerSupabaseClient, hasSupabaseEnv } from "@/lib/supabase/server";

export async function requireAdmin() {
  if (!hasSupabaseEnv()) return null;
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return user;
}
