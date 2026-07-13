"use client";
/* eslint-disable @next/next/no-img-element -- les aperçus utilisent des URL blob locales */

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient, hasSupabaseBrowserEnv } from "@/lib/supabase/client";
import type { Product, ProductCategory } from "@/lib/types";

const availableSizes = ["34", "36", "38", "40", "42", "44", "46", "Sur mesure"];

function slugify(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function ProductForm({ initial }: { initial?: Product }) {
  const router = useRouter();
  const [name, setName] = useState(initial?.name || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [category, setCategory] = useState<ProductCategory>(initial?.category || "soiree");
  const [price, setPrice] = useState(initial?.price?.toString() || "");
  const [sizes, setSizes] = useState(initial?.sizes || []);
  const [colors, setColors] = useState(initial?.colors.join(", ") || "");
  const [inStock, setInStock] = useState(initial?.in_stock ?? true);
  const [isNew, setIsNew] = useState(initial?.is_new ?? false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const previews = useMemo(() => imageFiles.map((file) => ({ name: file.name, url: URL.createObjectURL(file) })), [imageFiles]);

  async function uploadFile(file: File, folder: "images" | "videos") {
    const supabase = createClient();
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
    const path = `${folder}/${Date.now()}-${crypto.randomUUID()}-${safeName}`;
    const { error: uploadError } = await supabase.storage.from("products").upload(path, file, { upsert: false });
    if (uploadError) throw uploadError;
    return supabase.storage.from("products").getPublicUrl(path).data.publicUrl;
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setSaving(true); setError("");
    if (videoFile && videoFile.size > 50 * 1024 * 1024) { setError("La vidéo ne doit pas dépasser 50 Mo."); setSaving(false); return; }
    try {
      if (!hasSupabaseBrowserEnv()) { window.alert("Article validé en mode démo. Configure Supabase pour le sauvegarder."); router.push("/admin/produits"); return; }
      const newImages = await Promise.all(imageFiles.map((file) => uploadFile(file, "images")));
      const videoUrl = videoFile ? await uploadFile(videoFile, "videos") : initial?.video_url || null;
      const payload = {
        name, slug: slugify(name), description, category,
        price: Number(price), sizes, colors: colors.split(",").map((item) => item.trim()).filter(Boolean),
        in_stock: inStock, is_new: isNew, images: [...(initial?.images || []), ...newImages], video_url: videoUrl,
      };
      const supabase = createClient();
      const result = initial
        ? await supabase.from("products").update(payload).eq("id", initial.id)
        : await supabase.from("products").insert(payload);
      if (result.error) throw result.error;
      router.push("/admin/produits"); router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "La sauvegarde a échoué."); setSaving(false);
    }
  }

  return <form onSubmit={submit} className="grid gap-6 xl:grid-cols-[1fr_360px]"><div className="space-y-6 rounded-card border border-line bg-card p-5 sm:p-7"><div className="grid gap-5 sm:grid-cols-2"><label className="sm:col-span-2"><span className="field-label">Nom de l’article *</span><input required className="field" value={name} onChange={(e) => setName(e.target.value)} /></label><label><span className="field-label">Catégorie *</span><select className="field" value={category} onChange={(e) => setCategory(e.target.value as ProductCategory)}><option value="soiree">Robe de soirée</option><option value="ensemble">Ensemble</option><option value="traditionnel">Tenue traditionnelle</option><option value="autre">Autre</option></select></label><label><span className="field-label">Prix en FCFA *</span><input required min="0" step="500" type="number" className="field" value={price} onChange={(e) => setPrice(e.target.value)} /></label><label className="sm:col-span-2"><span className="field-label">Description</span><textarea rows={5} className="field resize-y" value={description} onChange={(e) => setDescription(e.target.value)} /></label></div><fieldset><legend className="field-label">Tailles disponibles</legend><div className="flex flex-wrap gap-2">{availableSizes.map((size) => <label key={size} className={`cursor-pointer rounded-full border px-4 py-2 text-sm ${sizes.includes(size) ? "border-ink bg-ink text-sand" : "border-line"}`}><input type="checkbox" className="sr-only" checked={sizes.includes(size)} onChange={() => setSizes((current) => current.includes(size) ? current.filter((item) => item !== size) : [...current, size])} />{size}</label>)}</div></fieldset><label><span className="field-label">Couleurs (séparées par des virgules)</span><input className="field" placeholder="Bordeaux, Émeraude" value={colors} onChange={(e) => setColors(e.target.value)} /></label><div className="grid gap-3 sm:grid-cols-2"><Toggle label="En stock" value={inStock} onChange={setInStock} /><Toggle label="Nouveauté" value={isNew} onChange={setIsNew} /></div></div><aside className="space-y-6"><div className="rounded-card border border-line bg-card p-5"><label className="block cursor-pointer rounded-xl border-2 border-dashed border-line p-6 text-center"><span className="block font-semibold">Ajouter des photos</span><span className="mt-1 block text-xs text-ink-soft">JPG, PNG ou WebP · plusieurs fichiers possibles</span><input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => setImageFiles(Array.from(e.target.files || []))} /></label>{previews.length > 0 && <div className="mt-4 grid grid-cols-3 gap-2">{previews.map((preview) => <div key={preview.url} className="aspect-square overflow-hidden rounded-lg bg-gold-soft"><img src={preview.url} alt={preview.name} className="h-full w-full object-cover" /></div>)}</div>}</div><div className="rounded-card border border-line bg-card p-5"><label className="block cursor-pointer rounded-xl border-2 border-dashed border-line p-6 text-center"><span className="block font-semibold">Ajouter une vidéo</span><span className="mt-1 block text-xs text-ink-soft">MP4 · 50 Mo maximum</span><input type="file" accept="video/mp4" className="sr-only" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} /></label>{videoFile && <p className="mt-3 truncate text-xs text-ink-soft">{videoFile.name}</p>}</div>{error && <p role="alert" className="rounded-xl bg-wine/10 p-3 text-sm text-wine">{error}</p>}<button disabled={saving} className="btn btn-primary w-full disabled:opacity-60">{saving ? "Sauvegarde…" : initial ? "Enregistrer les modifications" : "Publier l’article"}</button></aside></form>;
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (value: boolean) => void }) {
  return <label className="flex cursor-pointer items-center justify-between rounded-xl border border-line p-4 text-sm font-semibold"><span>{label}</span><input type="checkbox" className="h-5 w-5 accent-green" checked={value} onChange={(e) => onChange(e.target.checked)} /></label>;
}
