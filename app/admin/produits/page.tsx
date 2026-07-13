import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProductTable } from "@/components/admin/ProductTable";
import { requireAdmin } from "@/lib/admin";
import { getProducts } from "@/lib/products";

export default async function ProductsAdminPage() {
  await requireAdmin(); const products = await getProducts();
  return <AdminShell><div className="mb-8 flex flex-wrap items-center justify-between gap-4"><div><span className="eyebrow">Catalogue</span><h1 className="mt-2 text-4xl">Articles</h1></div><Link href="/admin/produits/nouveau" className="btn btn-primary">Ajouter</Link></div><ProductTable initialProducts={products} /></AdminShell>;
}
