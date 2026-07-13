"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient, hasSupabaseBrowserEnv } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    if (!hasSupabaseBrowserEnv()) { router.push("/admin"); return; }
    const { error: authError } = await createClient().auth.signInWithPassword({ email, password });
    if (authError) { setError("Email ou mot de passe incorrect."); setLoading(false); return; }
    router.push("/admin"); router.refresh();
  }
  return <form onSubmit={submit} className="w-full max-w-md rounded-[24px] border border-line bg-card p-7 shadow-[0_20px_60px_rgba(36,30,26,.08)] sm:p-9"><span className="brand-mark text-2xl">Tator<em className="text-wine">h</em> Fashion</span><h1 className="mb-2 mt-8 text-3xl">Connexion à l’atelier</h1><p className="mb-6 text-sm text-ink-soft">Espace réservé à la propriétaire.</p><div className="space-y-4"><label><span className="field-label">Email</span><input required type="email" autoComplete="email" className="field" value={email} onChange={(e) => setEmail(e.target.value)} /></label><label><span className="field-label">Mot de passe</span><input required type="password" autoComplete="current-password" className="field" value={password} onChange={(e) => setPassword(e.target.value)} /></label></div>{error && <p className="mt-4 text-sm text-wine" role="alert">{error}</p>}<button disabled={loading} className="btn btn-primary mt-6 w-full disabled:opacity-60">{loading ? "Connexion…" : "Se connecter"}</button>{!hasSupabaseBrowserEnv() && <p className="mt-4 rounded-xl bg-gold-soft/50 p-3 text-xs text-ink-soft">Mode démo : configure Supabase dans .env.local pour activer l’authentification.</p>}</form>;
}
