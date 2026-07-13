export function formatPrice(value: number) {
  return `${new Intl.NumberFormat("fr-FR").format(value)} FCFA`;
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
