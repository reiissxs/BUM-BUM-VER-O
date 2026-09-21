import Link from "next/link";

export default function RecoverPasswordPage() {
  return (
    <main className="auth-shell">
      <section className="auth-card">
        <div className="brand">BUM BUM <span>VERÃO</span></div>
        <div style={{ height: 28 }} />
        <span className="eyebrow">Recuperar acesso</span>
        <h1 className="h1">Redefina sua senha.</h1>
        <p className="muted">A interface está pronta. O envio real do e-mail será ativado quando o provedor transacional de e-mail for conectado.</p>
        <div className="divider" />
        <Link className="btn btn-secondary" href="/login">Voltar para o login</Link>
      </section>
    </main>
  );
}
