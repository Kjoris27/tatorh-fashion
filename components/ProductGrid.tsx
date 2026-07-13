"use client";

import { useMemo, useState } from "react";
import { FilterChips, type ProductFilter } from "@/components/FilterChips";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/types";

export function ProductGrid({ products, searchable = false, limit }: { products: Product[]; searchable?: boolean; limit?: number }) {
  const [filter, setFilter] = useState<ProductFilter>("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products
      .filter((product) => filter === "all" || (filter === "nouveau" ? product.is_new : product.category === filter))
      .filter((product) => !normalized || `${product.name} ${product.description}`.toLowerCase().includes(normalized))
      .slice(0, limit);
  }, [filter, limit, products, query]);

  return (
    <>
      {searchable && (
        <label className="mb-5 block max-w-md">
          <span className="sr-only">Rechercher un article</span>
          <input className="field" type="search" placeholder="Rechercher une robe, un ensemble…" value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>
      )}
      <FilterChips value={filter} onChange={setFilter} />
      {visible.length ? (
        <div className="grid grid-cols-1 gap-[26px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : <p className="rounded-card border border-line bg-card p-8 text-center text-ink-soft">Aucune pièce ne correspond à ta recherche.</p>}
    </>
  );
}
