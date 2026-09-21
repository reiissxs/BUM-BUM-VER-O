"use client";

import { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  function enterDemo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/inicio");
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <div className="brand">BUM BUM <span>VERÃO</span></div>
        <span className="eyebrow" style={{ display: "block", marginTop: 30 }}>Seu projeto de 90 dias</span>
        <h1 className="h1">Seus próximos 90 dias começam aqui.</h1>
        <p className="muted">Abra o app, veja o treino do dia e siga o programa sem precisar montar nada.</p>

        <form className="stack" onSubmit={enterDemo} style={{ marginTop: 24 }}>
          <div className="field">
            <label>E-mail</label>
            <input className="input" type="email" placeholder="seuemail@email.com" defaultValue="demo@bumbumverao.com" />
          </div>
          <div className="field">
            <label>Senha</label>
            <input className="input" type="password" placeholder="••••••••" defaultValue="12345678" />
          </div>
          <button className="btn btn-primary" type="submit">ENTRAR NO APP</button>
        </form>

        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, marginTop: 18, fontSize: 13 }}>
          <Link className="muted" href="/recuperar-senha">Esqueci minha senha</Link>
          <Link href="/primeiro-acesso">Primeiro acesso</Link>
        </div>

        <div className="divider" />
        <p className="muted" style={{ fontSize: 12, margin: 0 }}>
          Prévia visual: o banco e a autenticação real serão ligados depois.
        </p>
      </section>
    </main>
  );
}
