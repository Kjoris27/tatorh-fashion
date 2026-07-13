import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return <><Nav /><main>{children}</main><Footer /></>;
}
