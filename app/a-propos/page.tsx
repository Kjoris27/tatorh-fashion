import type { Metadata } from "next";
import { ArchFrame } from "@/components/ArchFrame";
import { CTABanner } from "@/components/CTABanner";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = { title: "À propos", description: "Découvre l’atelier et la vision de Tatorh Fashion à Lomé." };

export default function AboutPage() {
  return <SiteShell><section className="section-pad"><div className="wrap grid items-center gap-10 md:grid-cols-2 md:gap-16"><div><span className="eyebrow">Derrière Tatorh</span><h1 className="my-5 text-[clamp(40px,6vw,62px)] leading-tight">Des vêtements qui commencent par <em className="text-wine">une conversation.</em></h1><div className="space-y-4 text-[16px] leading-7 text-ink-soft"><p>Tatorh Fashion est un atelier de création basé à Lomé. Chaque pièce est pensée pour la femme qui la portera : son style, ses mesures, son occasion et ses envies.</p><p>Du choix du tissu aux derniers ajustements, nous gardons un contact direct sur WhatsApp. Tu vois la pièce prendre forme et tu sais exactement ce qui arrive.</p></div></div><div className="mx-auto w-full max-w-[430px]"><ArchFrame label="Dans l’atelier Tatorh Fashion" tag="Confectionné à Lomé" /></div></div></section><CTABanner /></SiteShell>;
}
