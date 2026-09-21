import Link from "next/link";
import { requireAdmin } from "@/lib/session";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <main className="shell">
      <header className="topbar"><div className="brand">BUM BUM <span>VERÃO</span> · Admin</div><Link className="btn btn-secondary" href="/inicio">Voltar ao app</Link></header>
      {children}
    </main>
  );
}
