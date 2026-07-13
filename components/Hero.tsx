import Link from "next/link";
import { ArchFrame } from "@/components/ArchFrame";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section className="pb-10 pt-12 md:pt-16">
      <div className="wrap grid items-center gap-9 md:grid-cols-[1.05fr_.95fr] md:gap-14">
        <div>
          <span className="eyebrow">Prêt-à-porter africain · fait sur demande</span>
          <h1 className="my-5 text-[clamp(38px,6vw,62px)] leading-[1.03]">Ta robe n’existe<br />pas encore.<br /><em className="text-wine">On va la créer.</em></h1>
          <p className="mb-8 max-w-[470px] text-[17px] text-ink-soft">Tatorh Fashion confectionne des robes et tenues à la demande, pensées pour toi, à Lomé et pour toutes les femmes qui veulent porter quelque chose qui n’appartient qu’à elles.</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/collection" className="btn btn-primary">Voir la collection</Link>
            <a href={buildWhatsAppUrl("Bonjour Tatorh Fashion, j’aimerais créer une tenue sur demande.")} className="btn btn-ghost" target="_blank" rel="noreferrer">Commander sur WhatsApp</a>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[480px] md:mx-0">
          <ArchFrame label="Vidéo produit — dernière collection" tag="En atelier cette semaine" />
        </div>
      </div>
    </section>
  );
}
