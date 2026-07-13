import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin";
import { seedProducts } from "@/lib/data";
import { createServerSupabaseClient, hasSupabaseEnv } from "@/lib/supabase/server";

export default async function AdminPage() {
  await requireAdmin();
  let productCount = seedProducts.length;
  let pendingCount = 0;
  if (hasSupabaseEnv()) {
    const supabase = await createServerSupabaseClient();
    const [products, orders] = await Promise.all([
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("orders").select("id", { count: "exact", head: true }).eq("status", "en_attente"),
    ]);
    productCount = products.count || 0; pendingCount = orders.count || 0;
  }
  return <AdminShell><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><span className="eyebrow">Bonjour</span><h1 className="mt-2 text-4xl">Vue d’ensemble</h1></div><Link href="/admin/produits/nouveau" className="btn btn-primary">Ajouter un article</Link></div>{!hasSupabaseEnv() && <div className="mb-6 rounded-card border border-gold bg-gold-soft/40 p-4 text-sm">Mode démo actif. Les données deviennent persistantes dès que les variables Supabase sont ajoutées.</div>}<div className="grid gap-5 sm:grid-cols-2"><Link href="/admin/produits" className="rounded-card border border-line bg-card p-6 no-underline"><span className="text-sm text-ink-soft">Articles publiés</span><strong className="mt-2 block font-serif text-5xl font-medium text-green">{productCount}</strong></Link><Link href="/admin/commandes" className="rounded-card border border-line bg-card p-6 no-underline"><span className="text-sm text-ink-soft">Commandes en attente</span><strong className="mt-2 block font-serif text-5xl font-medium text-wine">{pendingCount}</strong></Link></div></AdminShell>;
}
