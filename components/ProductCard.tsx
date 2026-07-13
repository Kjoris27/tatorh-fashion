import Image from "next/image";
import Link from "next/link";
import { AddToSelectionButton } from "@/components/AddToSelectionButton";
import { DressIcon } from "@/components/icons";
import { categoryLabels } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card-hover overflow-hidden rounded-card border border-line bg-card">
      <Link href={`/produit/${product.slug}`} className="relative flex aspect-[4/5] items-center justify-center overflow-hidden product-placeholder">
        {product.images[0] ? (
          <Image src={product.images[0]} alt={product.name} fill sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 25vw" className="object-cover transition duration-500 hover:scale-[1.03]" />
        ) : <DressIcon />}
        {product.is_new && <span className="absolute left-3 top-3 rounded-full bg-wine px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-sand">Nouveau</span>}
        {product.video_url && <span className="absolute bottom-3 right-3 rounded-full bg-card/90 px-2.5 py-1 text-[11px] font-semibold">Vidéo</span>}
      </Link>
      <div className="p-[18px] pb-5">
        <span className="text-[12px] uppercase tracking-[.05em] text-ink-soft">{categoryLabels[product.category]}</span>
        <h3 className="my-1.5 text-lg"><Link href={`/produit/${product.slug}`} className="no-underline">{product.name}</Link></h3>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="font-semibold">{formatPrice(product.price)}</span>
          <AddToSelectionButton product={product} compact />
        </div>
      </div>
    </article>
  );
}
