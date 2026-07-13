"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowIcon, BagIcon } from "@/components/icons";
import { useSelection } from "@/components/SelectionProvider";

export function Nav() {
  const [open, setOpen] = useState(false);
  const { count } = useSelection();
  const links = [
    ["/collection", "Collection"],
    ["/#comment", "Comment ça marche"],
    ["/#videos", "En vidéo"],
    ["/a-propos", "À propos"],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-sand/95 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-[1180px] items-center justify-between px-4 py-4 sm:px-6" aria-label="Navigation principale">
        <Link href="/" className="brand-mark text-[22px] no-underline">Tator<em className="text-wine">h</em> Fashion</Link>
        <ul className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-[65px] flex-col border-b border-line bg-sand px-6 md:static md:flex md:flex-row md:border-0 md:bg-transparent md:p-0 md:gap-8`}>
          {links.map(([href, label]) => (
            <li key={href} className="border-b border-line py-3 last:border-0 md:border-0 md:py-0">
              <Link href={href} onClick={() => setOpen(false)} className="text-[15px] font-medium no-underline hover:text-green">{label}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/ma-selection" className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card" aria-label={`Ma sélection, ${count} article${count > 1 ? "s" : ""}`}>
            <BagIcon />
            {count > 0 && <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-wine px-1 text-center text-[11px] font-semibold leading-5 text-sand">{count}</span>}
          </Link>
          <Link href="/contact" className="btn btn-primary hidden py-3 sm:inline-flex">Commander <ArrowIcon /></Link>
          <button type="button" onClick={() => setOpen(!open)} className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-line bg-transparent md:hidden" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open}>
            <span className="h-0.5 w-5 bg-ink" /><span className="h-0.5 w-5 bg-ink" /><span className="h-0.5 w-5 bg-ink" />
          </button>
        </div>
      </nav>
    </header>
  );
}
