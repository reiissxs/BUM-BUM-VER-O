"use client";

import { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FirstAccessPage() {
  const router = useRouter();

  function start(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/onboarding");
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <div className="brand">BUM BUM <span>VERÃO</span></div>
        <span className="eyebrow" style={{ display: "block", marginTop: 30 }}>Primeiro acesso</span>
        <h1 className="h1">Vamos preparar seus 90 dias.</h1>
        <p className="muted">Na versão final, sua compra libera o acesso automaticamente.</p>
        <form className="stack" onSubmit={start} style={{ marginTop: 24 }}>
          <div className="field"><label>Seu nome</label><input className="input" placeholder="Como quer ser chamada?" /></div>
          <div className="field"><label>E-mail</label><input className="input" type="email" placeholder="seuemail@email.com" /></div>
          <div className="field"><label>Crie uma senha</label><input className="input" type="password" placeholder="Mínimo de 8 caracteres" /></div>
          <button className="btn btn-primary" type="submit">COMEÇAR</button>
        </form>
        <p style={{ marginTop: 18, fontSize: 13 }}><Link href="/login">Já tenho acesso</Link></p>
      </section>
    </main>
  );
}
