const steps = [
  ["01 — Choisir", "Un modèle ou ton inspiration", "Parcours la collection, ou envoie-moi une photo du style que tu veux. On adapte ensemble."],
  ["02 — Préciser", "Tes mesures et ton tissu", "Un message WhatsApp suffit. Je te guide pour prendre les bonnes mesures, même à distance."],
  ["03 — Recevoir", "Ta pièce, prête à porter", "Confection soignée, essayage possible à Lomé ou livraison partout où tu es."],
];

export function ProcessSteps() {
  return (
    <section id="comment" className="section-pad border-y border-line">
      <div className="wrap reveal">
        <div className="section-head"><div><span className="eyebrow">Le processus</span><h2 className="section-title">De l’idée à la pièce livrée</h2></div><p className="section-copy">Trois étapes, tout se passe sur WhatsApp — pas besoin de créer un compte pour commencer.</p></div>
        <div className="grid gap-7 md:grid-cols-3">
          {steps.map(([num, title, copy]) => <article key={num} className="rounded-card border border-line bg-card p-7"><span className="font-serif text-[15px] italic text-wine">{num}</span><h3 className="mb-2 mt-3.5 text-[19px]">{title}</h3><p className="m-0 text-[14.5px] text-ink-soft">{copy}</p></article>)}
        </div>
      </div>
    </section>
  );
}
