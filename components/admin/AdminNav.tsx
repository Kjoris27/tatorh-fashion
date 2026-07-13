"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient, hasSupabaseBrowserEnv } from "@/lib/supabase/client";

const links = [["/admin", "Vue d’ensemble"], ["/admin/produits", "Articles"], ["/admin/commandes", "Commandes"]];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <aside className="border-b border-line bg-green text-sand lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between px-5 py-5 lg:block lg:p-7">
        <Link href="/" className="brand-mark text-xl no-underline">Tator<em className="text-gold-soft">h</em> Fashion</Link>
        <span className="text-xs font-semibold uppercase tracking-wider opacity-70 lg:mt-2 lg:block">Administration</span>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-4 pb-4 lg:flex-col lg:px-5" aria-label="Administration">
        {links.map(([href, label]) => <Link key={href} href={href} className={`shrink-0 rounded-xl px-4 py-3 text-sm font-medium no-underline ${pathname === href ? "bg-sand text-ink" : "hover:bg-white/10"}`}>{label}</Link>)}
        <button type="button" className="shrink-0 rounded-xl px-4 py-3 text-left text-sm font-medium hover:bg-white/10 lg:mt-5" onClick={async () => { if (hasSupabaseBrowserEnv()) await createClient().auth.signOut(); router.push("/admin/login"); router.refresh(); }}>Déconnexion</button>
      </nav>
    </aside>
  );
}
