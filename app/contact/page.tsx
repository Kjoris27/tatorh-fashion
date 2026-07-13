import type { Metadata } from "next";
import { ArrowIcon } from "@/components/icons";
import { SiteShell } from "@/components/SiteShell";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = { title: "Contact", description: "Contacte Tatorh Fashion sur WhatsApp pour une commande ou une création sur demande." };

export default function ContactPage() {
  return <SiteShell><section className="section-pad"><div className="wrap grid gap-8 md:grid-cols-[1fr_.9fr]"><div><span className="eyebrow">Parlons de ta tenue</span><h1 className="my-5 text-[clamp(40px,6vw,62px)] leading-tight">Ton idée mérite de <em className="text-wine">prendre forme.</em></h1><p className="max-w-xl text-[17px] leading-7 text-ink-soft">Écris-nous sur WhatsApp avec ton inspiration, l’occasion et la date souhaitée. Nous te guiderons pour le tissu, les mesures et la livraison.</p><a href={buildWhatsAppUrl("Bonjour Tatorh Fashion, j’aimerais vous parler d’une création.")} target="_blank" rel="noreferrer" className="btn btn-gold mt-8">Commencer sur WhatsApp <ArrowIcon /></a></div><aside className="rounded-[24px] bg-green p-7 text-sand sm:p-10"><h2 className="mb-6 text-3xl">Informations</h2><dl className="space-y-6"><div><dt className="text-xs font-semibold uppercase tracking-wider opacity-70">Atelier</dt><dd className="mt-1">Lomé, Togo</dd></div><div><dt className="text-xs font-semibold uppercase tracking-wider opacity-70">Disponibilité</dt><dd className="mt-1">Lundi au samedi, sur rendez-vous</dd></div><div><dt className="text-xs font-semibold uppercase tracking-wider opacity-70">Livraison</dt><dd className="mt-1">Lomé, Togo et destinations à confirmer</dd></div></dl></aside></div></section></SiteShell>;
}
