import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProductForm } from "@/components/admin/ProductForm";
import { requireAdmin } from "@/lib/admin";
import { getProducts } from "@/lib/products";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin(); const { id } = await params; const product = (await getProducts()).find((item) => item.id === id);
  if (!product) notFound();
  return <AdminShell><div className="mb-8"><span className="eyebrow">Catalogue</span><h1 className="mt-2 text-4xl">Modifier {product.name}</h1></div><ProductForm initial={product} /></AdminShell>;
}
