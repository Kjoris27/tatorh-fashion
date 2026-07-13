"use client";

import { useState } from "react";
import { formatDate, formatPrice } from "@/lib/format";
import { createClient, hasSupabaseBrowserEnv } from "@/lib/supabase/client";
import type { Order, OrderStatus } from "@/lib/types";

const labels: Record<OrderStatus, string> = { en_attente: "En attente", confirmee: "Confirmée", livree: "Livrée", annulee: "Annulée" };

export function OrdersTable({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState(initialOrders);
  async function updateStatus(id: string, status: OrderStatus) {
    const previous = orders; setOrders((current) => current.map((order) => order.id === id ? { ...order, status } : order));
    if (hasSupabaseBrowserEnv()) {
      const { error } = await createClient().from("orders").update({ status }).eq("id", id);
      if (error) { setOrders(previous); window.alert("Le statut n’a pas été modifié."); }
    }
  }
  if (!orders.length) return <div className="rounded-card border border-line bg-card p-10 text-center"><h2 className="text-2xl">Aucune commande</h2><p className="mt-2 text-sm text-ink-soft">Les commandes envoyées depuis « Ma sélection » apparaîtront ici.</p></div>;
  return <div className="space-y-4">{orders.map((order) => <article key={order.id} className="rounded-card border border-line bg-card p-5 sm:p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="text-xl">{order.customer_name || "Cliente"}</h2><p className="text-sm text-ink-soft">{order.customer_city || "Ville non précisée"} · {formatDate(order.created_at)}</p>{order.customer_phone && <p className="text-sm text-ink-soft">{order.customer_phone}</p>}</div><select aria-label="Statut de la commande" className="field w-auto" value={order.status} onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}>{Object.entries(labels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div><ul className="my-4 border-y border-line py-3 text-sm">{order.items.map((item) => <li key={item.product_id} className="flex justify-between gap-4 py-1"><span>{item.name} × {item.qty}</span><span>{formatPrice(item.price * item.qty)}</span></li>)}</ul><p className="text-right font-semibold">Total : {formatPrice(order.total)}</p></article>)}</div>;
}
