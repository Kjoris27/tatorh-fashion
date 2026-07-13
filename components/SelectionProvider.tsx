"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product, SelectionItem } from "@/lib/types";

type SelectionContextValue = {
  items: SelectionItem[];
  count: number;
  total: number;
  add: (product: Product) => void;
  updateQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const SelectionContext = createContext<SelectionContextValue | null>(null);

export function SelectionProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<SelectionItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("tatorh-selection");
      if (stored) setItems(JSON.parse(stored));
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem("tatorh-selection", JSON.stringify(items));
  }, [items, ready]);

  const value = useMemo<SelectionContextValue>(() => ({
    items,
    count: items.reduce((sum, item) => sum + item.qty, 0),
    total: items.reduce((sum, item) => sum + item.price * item.qty, 0),
    add(product) {
      setItems((current) => {
        const existing = current.find((item) => item.product_id === product.id);
        if (existing) return current.map((item) => item.product_id === product.id ? { ...item, qty: item.qty + 1 } : item);
        return [...current, {
          product_id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          qty: 1,
          image: product.images[0],
        }];
      });
    },
    updateQty(productId, qty) {
      if (qty < 1) return;
      setItems((current) => current.map((item) => item.product_id === productId ? { ...item, qty } : item));
    },
    remove(productId) { setItems((current) => current.filter((item) => item.product_id !== productId)); },
    clear() { setItems([]); },
  }), [items]);

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export function useSelection() {
  const value = useContext(SelectionContext);
  if (!value) throw new Error("useSelection doit être utilisé dans SelectionProvider");
  return value;
}
