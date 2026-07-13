import Link from "next/link";
import { CTABanner } from "@/components/CTABanner";
import { Hero } from "@/components/Hero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ProductGrid } from "@/components/ProductGrid";
import { SiteShell } from "@/components/SiteShell";
import { Testimonials } from "@/components/Testimonials";
import { VideoShowcase } from "@/components/VideoShowcase";
import { getProducts } from "@/lib/products";

export default async function Home() {
  const products = await getProducts();
  return (
    <SiteShell>
      <Hero />
      <ProcessSteps />
      <section id="collection" className="section-pad">
        <div className="wrap reveal">
          <div className="section-head">
            <div><span className="eyebrow">La collection</span><h2 className="section-title">Des pièces pour chaque occasion</h2></div>
            <div><p className="section-copy mb-4">Chaque article peut être ajusté à tes mesures et à tes couleurs préférées.</p><Link href="/collection" className="text-sm font-semibold text-green">Voir tout le catalogue ↗</Link></div>
          </div>
          <ProductGrid products={products} limit={6} />
        </div>
      </section>
      <VideoShowcase products={products} />
      <Testimonials />
      <CTABanner />
    </SiteShell>
  );
}
