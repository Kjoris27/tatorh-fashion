import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section id="avis" className="section-pad border-t border-line">
      <div className="wrap reveal">
        <div className="section-head"><div><span className="eyebrow">Elles ont commandé</span><h2 className="section-title">Ce qu’elles en disent</h2></div></div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => <figure key={item.name} className="m-0 flex flex-col gap-5 rounded-card bg-green p-7 text-sand"><blockquote className="m-0 font-serif text-[17px] italic leading-relaxed">« {item.quote} »</blockquote><figcaption className="text-[13.5px] font-semibold opacity-85">— {item.name}</figcaption></figure>)}
        </div>
      </div>
    </section>
  );
}
