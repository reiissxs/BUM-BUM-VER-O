import { BottomNav } from "@/components/bottom-nav";
import { LogoutButton } from "@/components/logout-button";
import { requireSession } from "@/lib/session";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();
  const initial = (session.user.name || session.user.email || "U").slice(0, 1).toUpperCase();

  return (
    <>
      <main className="shell">
        <header className="topbar">
          <div className="brand">BUM BUM <span>VERÃO</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <LogoutButton />
            <div className="avatar" aria-label="Perfil">{initial}</div>
          </div>
        </header>
        {children}
      </main>
      <BottomNav />
    </>
  );
}
