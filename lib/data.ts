import type { Product } from "@/lib/types";

export const seedProducts: Product[] = [
  {
    id: "1",
    name: "Robe Ayélé",
    slug: "robe-ayele",
    category: "soiree",
    price: 35000,
    description:
      "Robe de soirée en tissu wax, coupe fluide, ceinture assortie. Confectionnée à tes mesures.",
    sizes: ["36", "38", "40", "42"],
    colors: ["Bordeaux", "Émeraude"],
    is_new: true,
    in_stock: true,
    images: [],
    video_url: null,
  },
  {
    id: "2",
    name: "Ensemble Akofa",
    slug: "ensemble-akofa",
    category: "ensemble",
    price: 42000,
    description: "Ensemble deux pièces, haut brodé main et jupe crayon assortie.",
    sizes: ["36", "38", "40"],
    colors: ["Ocre", "Bleu nuit"],
    is_new: false,
    in_stock: true,
    images: [],
    video_url: null,
  },
  {
    id: "3",
    name: "Robe Réveillon",
    slug: "robe-reveillon",
    category: "soiree",
    price: 48000,
    description: "Robe satin, coupe sirène, idéale pour les grandes occasions.",
    sizes: ["38", "40", "42", "44"],
    colors: ["Or", "Noir"],
    is_new: true,
    in_stock: true,
    images: [],
    video_url: null,
  },
  {
    id: "4",
    name: "Tenue Adjoa",
    slug: "tenue-adjoa",
    category: "traditionnel",
    price: 39000,
    description:
      "Tenue traditionnelle deux pièces, motifs tissés, parfaite pour les cérémonies.",
    sizes: ["36", "38", "40", "42"],
    colors: ["Vert/Or"],
    is_new: false,
    in_stock: true,
    images: [],
    video_url: null,
  },
  {
    id: "5",
    name: "Robe Mireille",
    slug: "robe-mireille",
    category: "soiree",
    price: 33000,
    description: "Robe courte, tissu léger, parfaite pour les sorties et cocktails.",
    sizes: ["36", "38", "40"],
    colors: ["Corail"],
    is_new: false,
    in_stock: true,
    images: [],
    video_url: null,
  },
  {
    id: "6",
    name: "Ensemble Foli",
    slug: "ensemble-foli",
    category: "ensemble",
    price: 45000,
    description:
      "Ensemble pantalon large et top ajusté, pour un look à la fois classe et confortable.",
    sizes: ["38", "40", "42"],
    colors: ["Terracotta", "Kaki"],
    is_new: false,
    in_stock: true,
    images: [],
    video_url: null,
  },
];

export const categoryLabels = {
  soiree: "Robe de soirée",
  ensemble: "Ensemble deux pièces",
  traditionnel: "Tenue traditionnelle",
  autre: "Autre création",
};

export const testimonials = [
  {
    quote:
      "J’ai envoyé une photo trouvée sur Pinterest, elle me l’a recréée avec mon tissu préféré. Parfait du premier coup.",
    name: "Nadège, Lomé",
  },
  {
    quote:
      "Tout s’est passé sur WhatsApp, même les mesures. Ma robe est arrivée exactement comme prévu.",
    name: "Sika, Kara",
  },
  {
    quote:
      "Le suivi vidéo pendant la confection, ça change tout. On sait à quoi s’attendre avant la livraison.",
    name: "Afi, Cotonou",
  },
];
