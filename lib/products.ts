import "server-only";
import { createClient } from "@supabase/supabase-js";
import { seedProducts } from "@/lib/data";
import { getSupabaseEnv } from "@/lib/supabase/env";
import type { Product } from "@/lib/types";

export async function getProducts(): Promise<Product[]> {
  try {
    const { url, key } = getSupabaseEnv();
    if (!url || !key) return seedProducts;
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (error || !data?.length) return seedProducts;
    return data as Product[];
  } catch {
    return seedProducts;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return (await getProducts()).find((product) => product.slug === slug);
}
