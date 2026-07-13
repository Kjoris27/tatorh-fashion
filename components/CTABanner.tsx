import { ArrowIcon } from "@/components/icons";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function CTABanner() {
  return <section className="section-pad"><div className="wrap"><div className="reveal flex flex-wrap items-center justify-between gap-6 rounded-[24px] bg-wine px-7 py-10 text-center text-sand sm:px-10 md:py-13 md:text-left"><h2 className="max-w-[500px] text-[clamp(25px,4vw,34px)] leading-tight">Une occasion approche ? Décrivons ta robe ensemble.</h2><a href={buildWhatsAppUrl("Bonjour Tatorh Fashion, une occasion approche et j’aimerais créer ma robe avec vous.")} target="_blank" rel="noreferrer" className="btn btn-gold mx-auto md:mx-0">Écrire sur WhatsApp <ArrowIcon /></a></div></div></section>;
}
