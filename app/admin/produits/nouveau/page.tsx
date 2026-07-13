import { AdminShell } from "@/components/admin/AdminShell";
import { ProductForm } from "@/components/admin/ProductForm";
import { requireAdmin } from "@/lib/admin";

export default async function NewProductPage() {
  await requireAdmin();
  return <AdminShell><div className="mb-8"><span className="eyebrow">Catalogue</span><h1 className="mt-2 text-4xl">Ajouter un article</h1></div><ProductForm /></AdminShell>;
}
