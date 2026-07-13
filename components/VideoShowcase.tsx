import { ArchFrame } from "@/components/ArchFrame";
import type { Product } from "@/lib/types";

const notes = ["Tissu wax, tombé fluide", "Broderie faite main", "Satin, coupe sirène", "Motifs traditionnels"];

export function VideoShowcase({ products }: { products: Product[] }) {
  return (
    <section id="videos" className="section-pad border-t border-line">
      <div className="wrap reveal">
        <div className="section-head"><div><span className="eyebrow">En mouvement</span><h2 className="section-title">Vu en vrai, avant de commander</h2></div><p className="section-copy">Chaque pièce prend vie en vidéo — la matière, la coupe, le tombé du tissu.</p></div>
        <div className="flex snap-x gap-[22px] overflow-x-auto pb-4">
          {products.slice(0, 4).map((product, index) => (
            <figure key={product.id} className="m-0 w-[220px] shrink-0 snap-start">
              <ArchFrame compact image={product.images[0]} video={product.video_url} alt={`Vidéo de ${product.name}`} />
              <figcaption className="mt-3 text-sm font-medium">{product.name}<span className="mt-0.5 block text-[12.5px] font-normal text-ink-soft">{notes[index]}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
