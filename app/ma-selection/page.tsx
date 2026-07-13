import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { SelectionPage } from "@/app/ma-selection/SelectionPage";

export const metadata: Metadata = { title: "Ma sélection", description: "Récapitulatif de ta sélection avant l’envoi de ta commande sur WhatsApp." };

export default function Page() {
  return <SiteShell><section className="section-pad"><div className="wrap"><div className="mb-9"><span className="eyebrow">Presque terminé</span><h1 className="mt-3 text-[clamp(38px,6vw,56px)]">Ma sélection</h1></div><SelectionPage /></div></section></SiteShell>;
}
