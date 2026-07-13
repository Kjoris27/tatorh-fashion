import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToSelectionButton } from "@/components/AddToSelectionButton";
import { ArchFrame } from "@/components/ArchFrame";
import { DressIcon } from "@/components/icons";
import { SiteShell } from "@/components/SiteShell";
import { categoryLabels } from "@/lib/data";
import { getProductBySlug, getProducts } from "@/lib/products";
import { formatPrice } from "@/lib/format";

export async function generateStaticParams() {
  return (await getProducts()).map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <SiteShell>
      <section className="section-pad">
        <div className="wrap grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="product-placeholder relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-card border border-line sm:col-span-2">
              {product.images[0] ? <Image src={product.images[0]} alt={product.name} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" /> : <DressIcon />}
              {product.is_new && <span className="absolute left-4 top-4 rounded-full bg-wine px-3 py-1.5 text-xs font-semibold uppercase text-sand">Nouveau</span>}
            </div>
            {product.images.slice(1).map((image, index) => <div key={image} className="relative aspect-[4/5] overflow-hidden rounded-card border border-line"><Image src={image} alt={`${product.name}, vue ${index + 2}`} fill sizes="50vw" className="object-cover" /></div>)}
            {product.video_url && <ArchFrame compact video={product.video_url} image={product.images[0]} alt={`Vidéo de ${product.name}`} />}
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="eyebrow">{categoryLabels[product.category]}</span>
            <h1 className="mt-3 text-[clamp(38px,6vw,58px)] leading-tight">{product.name}</h1>
            <p className="mt-3 text-xl font-semibold">{formatPrice(product.price)}</p>
            <p className="my-7 max-w-xl text-[16px] leading-7 text-ink-soft">{product.description}</p>
            <div className="mb-6"><h2 className="mb-3 font-sans text-sm font-semibold">Tailles disponibles</h2><div className="flex flex-wrap gap-2">{product.sizes.map((size) => <span key={size} className="rounded-full border border-line bg-card px-4 py-2 text-sm">{size}</span>)}</div></div>
            <div className="mb-8"><h2 className="mb-3 font-sans text-sm font-semibold">Couleurs proposées</h2><div className="flex flex-wrap gap-2">{product.colors.map((color) => <span key={color} className="rounded-full border border-line bg-card px-4 py-2 text-sm">{color}</span>)}</div></div>
            <AddToSelectionButton product={product} />
            <p className="mt-4 text-sm text-ink-soft">Après ton ajout, finalise ta sélection sur WhatsApp. Nous confirmerons ensemble les mesures, le tissu et le délai.</p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
