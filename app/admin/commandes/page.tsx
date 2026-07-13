import { AdminShell } from "@/components/admin/AdminShell";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { requireAdmin } from "@/lib/admin";
import { createServerSupabaseClient, hasSupabaseEnv } from "@/lib/supabase/server";
import type { Order } from "@/lib/types";

export default async function OrdersPage() {
  await requireAdmin(); let orders: Order[] = [];
  if (hasSupabaseEnv()) { const { data } = await (await createServerSupabaseClient()).from("orders").select("*").order("created_at", { ascending: false }); orders = (data || []) as Order[]; }
  return <AdminShell><div className="mb-8"><span className="eyebrow">Suivi</span><h1 className="mt-2 text-4xl">Commandes</h1></div><OrdersTable initialOrders={orders} /></AdminShell>;
}
