import type { Metadata } from "next";
import { ProductGrid } from "@/components/ProductGrid";
import { SiteShell } from "@/components/SiteShell";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Collection",
  description: "Découvre les robes, ensembles et tenues traditionnelles Tatorh Fashion, confectionnés sur demande.",
};

export default async function CollectionPage() {
  const products = await getProducts();
  return (
    <SiteShell>
      <section className="section-pad">
        <div className="wrap">
          <div className="mb-10 max-w-2xl"><span className="eyebrow">La collection complète</span><h1 className="mt-3 text-[clamp(38px,6vw,60px)] leading-tight">Une pièce pour <em className="text-wine">ton moment.</em></h1><p className="mt-4 text-ink-soft">Découvre nos modèles et imagine-les dans tes couleurs, ton tissu et à tes mesures.</p></div>
          <ProductGrid products={products} searchable />
        </div>
      </section>
    </SiteShell>
  );
}
