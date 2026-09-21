import { BottomNav } from "@/components/bottom-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="shell">
        <div className="topbar">
          <div className="brand">BUM BUM <span>VERÃO</span></div>
          <div className="avatar" aria-label="Perfil">E</div>
        </div>
        {children}
      </main>
      <BottomNav />
    </>
  );
}
