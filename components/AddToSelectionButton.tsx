"use client";

import { useState } from "react";
import { useSelection } from "@/components/SelectionProvider";
import type { Product } from "@/lib/types";

export function AddToSelectionButton({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { add } = useSelection();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        add(product);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
      }}
      className={compact ? "rounded-full border border-ink bg-transparent px-4 py-2 text-[13px] font-semibold transition hover:bg-ink hover:text-sand" : "btn btn-primary w-full sm:w-auto"}
    >
      {added ? "Ajouté ✓" : compact ? "Ajouter" : "Ajouter à ma sélection"}
    </button>
  );
}
