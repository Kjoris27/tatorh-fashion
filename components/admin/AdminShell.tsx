import { AdminNav } from "@/components/admin/AdminNav";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-sand lg:flex"><AdminNav /><main className="min-w-0 flex-1 p-4 sm:p-7 lg:p-10">{children}</main></div>;
}
