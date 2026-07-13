"use client";

export type ProductFilter = "all" | "soiree" | "ensemble" | "traditionnel" | "nouveau";

const filters: { value: ProductFilter; label: string }[] = [
  { value: "all", label: "Toutes" },
  { value: "soiree", label: "Robes de soirée" },
  { value: "ensemble", label: "Ensembles" },
  { value: "traditionnel", label: "Tenues traditionnelles" },
  { value: "nouveau", label: "Nouveautés" },
];

export function FilterChips({ value, onChange }: { value: ProductFilter; onChange: (value: ProductFilter) => void }) {
  return (
    <div className="mb-8 flex gap-2.5 overflow-x-auto pb-2" aria-label="Filtrer la collection">
      {filters.map((filter) => (
        <button key={filter.value} type="button" onClick={() => onChange(filter.value)} className={`shrink-0 rounded-full border px-[18px] py-2 text-sm font-medium ${value === filter.value ? "border-ink bg-ink text-sand" : "border-line bg-card text-ink-soft"}`} aria-pressed={value === filter.value}>
          {filter.label}
        </button>
      ))}
    </div>
  );
}
