"use client";

import Link from "next/link";
import { useState } from "react";
import { categoryLabels } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { createClient, hasSupabaseBrowserEnv } from "@/lib/supabase/client";
import type { Product } from "@/lib/types";

export function ProductTable({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts);
  async function remove(product: Product) {
    if (!window.confirm(`Supprimer « ${product.name} » ?`)) return;
    if (hasSupabaseBrowserEnv()) {
      const { error } = await createClient().from("products").delete().eq("id", product.id);
      if (error) { window.alert("La suppression a échoué."); return; }
    }
    setProducts((current) => current.filter((item) => item.id !== product.id));
  }
  return <div className="overflow-x-auto rounded-card border border-line bg-card"><table className="w-full min-w-[720px] text-left text-sm"><thead className="border-b border-line text-xs uppercase tracking-wide text-ink-soft"><tr><th className="p-4">Article</th><th className="p-4">Catégorie</th><th className="p-4">Prix</th><th className="p-4">Stock</th><th className="p-4 text-right">Actions</th></tr></thead><tbody>{products.map((product) => <tr key={product.id} className="border-b border-line last:border-0"><td className="p-4 font-semibold">{product.name}</td><td className="p-4 text-ink-soft">{categoryLabels[product.category]}</td><td className="p-4">{formatPrice(product.price)}</td><td className="p-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${product.in_stock ? "bg-green/10 text-green" : "bg-wine/10 text-wine"}`}>{product.in_stock ? "Disponible" : "Indisponible"}</span></td><td className="p-4 text-right"><Link href={`/admin/produits/${product.id}`} className="mr-4 font-semibold text-green">Modifier</Link><button type="button" onClick={() => remove(product)} className="font-semibold text-wine">Supprimer</button></td></tr>)}</tbody></table>{!products.length && <p className="p-8 text-center text-ink-soft">Aucun article pour le moment.</p>}</div>;
}
