import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="shell">
      <div className="topbar">
        <div><div className="brand">BUM BUM <span>VERÃO</span></div><span className="eyebrow">Admin demo</span></div>
        <Link className="btn btn-secondary" href="/inicio">Ver app</Link>
      </div>
      {children}
    </main>
  );
}
