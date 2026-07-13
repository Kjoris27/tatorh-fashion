import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { SelectionProvider } from "@/components/SelectionProvider";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Tatorh Fashion — Robes sur demande à Lomé",
    template: "%s — Tatorh Fashion",
  },
  description:
    "Robes et tenues africaines confectionnées sur demande à Lomé. Choisis ton modèle et commande simplement sur WhatsApp.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${instrument.variable}`}>
      <body>
        <SelectionProvider>{children}</SelectionProvider>
      </body>
    </html>
  );
}
