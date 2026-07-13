import { formatPrice } from "@/lib/format";
import type { SelectionItem } from "@/lib/types";

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "22890000000";

export function buildWhatsAppMessage(
  items: SelectionItem[],
  customerName: string,
  city: string,
) {
  const lines = items.map(
    (item) => `- ${item.name} × ${item.qty} (${formatPrice(item.price * item.qty)})`,
  );
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return [
    "Bonjour Tatorh Fashion, je souhaite commander :",
    ...lines,
    `Total : ${formatPrice(total)}`,
    `Mon nom : ${customerName}`,
    `Ma ville : ${city}`,
  ].join("\n");
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
