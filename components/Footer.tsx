import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="pb-10 pt-14">
      <div className="wrap">
        <div className="mb-10 grid grid-cols-2 gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="brand-mark text-xl no-underline">Tator<em className="text-wine">h</em> Fashion</Link>
            <p className="mt-3 max-w-60 text-sm text-ink-soft">Robes et tenues sur demande, confectionnées à Lomé.</p>
          </div>
          <FooterGroup title="Navigation" links={[["/collection", "Collection"], ["/#comment", "Comment ça marche"], ["/#videos", "En vidéo"]]} />
          <FooterGroup title="Contact" links={[[buildWhatsAppUrl("Bonjour Tatorh Fashion, j’aimerais discuter d’une création."), "WhatsApp"], ["/contact", "Instagram"], ["/contact", "TikTok"]]} />
          <FooterGroup title="Infos" links={[["/contact", "Livraison"], ["/contact", "Prendre ses mesures"], ["/contact", "FAQ"]]} />
        </div>
        <div className="flex flex-wrap justify-between gap-2 border-t border-line pt-5 text-[13px] text-ink-soft">
          <span>© 2026 Tatorh Fashion. Tous droits réservés.</span><span>Lomé, Togo</span>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({ title, links }: { title: string; links: string[][] }) {
  return <div><h4 className="mb-3.5 text-sm font-semibold uppercase tracking-wide text-ink-soft">{title}</h4><ul className="space-y-2.5 text-sm">{links.map(([href, label]) => <li key={`${href}-${label}`}><Link href={href} className="no-underline hover:text-green">{label}</Link></li>)}</ul></div>;
}
