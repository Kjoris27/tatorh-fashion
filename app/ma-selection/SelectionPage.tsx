"use client";

import Link from "next/link";
import { useState } from "react";
import { useSelection } from "@/components/SelectionProvider";
import { createClient, hasSupabaseBrowserEnv } from "@/lib/supabase/client";
import { formatPrice } from "@/lib/format";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export function SelectionPage() {
  const { items, total, updateQty, remove, clear } = useSelection();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!items.length) return;
    setSending(true); setError("");
    try {
      if (hasSupabaseBrowserEnv()) {
        const supabase = createClient();
        const { error: insertError } = await supabase.from("orders").insert({
          customer_name: name,
          customer_phone: phone || null,
          customer_city: city,
          items,
          total,
          status: "en_attente",
        });
        if (insertError) throw insertError;
      }
      const url = buildWhatsAppUrl(buildWhatsAppMessage(items, name, city));
      clear();
      window.location.href = url;
    } catch {
      setError("La commande n’a pas pu être enregistrée. Réessaie dans un instant.");
      setSending(false);
    }
  }

  if (!items.length) return (
    <div className="rounded-card border border-line bg-card p-8 text-center sm:p-12"><h1 className="text-3xl">Ta sélection est vide</h1><p className="my-4 text-ink-soft">Ajoute les modèles qui te plaisent, puis reviens ici pour les envoyer sur WhatsApp.</p><Link href="/collection" className="btn btn-primary">Voir la collection</Link></div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
      <div className="space-y-4">
        {items.map((item) => <article key={item.product_id} className="flex flex-wrap items-center gap-4 rounded-card border border-line bg-card p-4"><div className="product-placeholder h-24 w-20 shrink-0 rounded-xl" /><div className="min-w-[150px] flex-1"><Link href={`/produit/${item.slug}`} className="font-serif text-lg no-underline">{item.name}</Link><p className="text-sm text-ink-soft">{formatPrice(item.price)}</p></div><div className="flex items-center rounded-full border border-line"><button type="button" className="h-9 w-9" onClick={() => updateQty(item.product_id, item.qty - 1)} aria-label="Réduire la quantité">−</button><span className="w-8 text-center text-sm">{item.qty}</span><button type="button" className="h-9 w-9" onClick={() => updateQty(item.product_id, item.qty + 1)} aria-label="Augmenter la quantité">+</button></div><button type="button" className="text-sm font-semibold text-wine" onClick={() => remove(item.product_id)}>Retirer</button></article>)}
      </div>
      <form onSubmit={submit} className="h-fit rounded-card border border-line bg-card p-6 sm:p-8">
        <h2 className="mb-5 text-2xl">Finaliser sur WhatsApp</h2>
        <div className="space-y-4"><label><span className="field-label">Ton nom *</span><input className="field" required value={name} onChange={(e) => setName(e.target.value)} /></label><label><span className="field-label">Ta ville *</span><input className="field" required value={city} onChange={(e) => setCity(e.target.value)} /></label><label><span className="field-label">Ton téléphone (facultatif)</span><input className="field" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} /></label></div>
        <div className="my-6 flex justify-between border-y border-line py-4 text-lg font-semibold"><span>Total</span><span>{formatPrice(total)}</span></div>
        {error && <p role="alert" className="mb-4 text-sm text-wine">{error}</p>}
        <button disabled={sending} className="btn btn-gold w-full disabled:opacity-60">{sending ? "Préparation…" : "Envoyer ma commande sur WhatsApp ↗"}</button>
        <p className="mt-4 text-xs leading-5 text-ink-soft">Aucun paiement n’est effectué ici. Les détails et le règlement seront confirmés ensemble sur WhatsApp.</p>
      </form>
    </div>
  );
}
