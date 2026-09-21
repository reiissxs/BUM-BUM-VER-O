"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function FirstAccessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);

    const result = await authClient.signUp.email({
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      password: String(form.get("password") || ""),
    });

    setLoading(false);
    if (result.error) {
      setError(result.error.message || "Não foi possível criar o acesso.");
      return;
    }
    router.replace("/onboarding");
    router.refresh();
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <div className="brand">BUM BUM <span>VERÃO</span></div>
        <div style={{ height: 28 }} />
        <span className="eyebrow">Primeiro acesso</span>
        <h1 className="h1">Crie sua senha.</h1>
        <p className="muted">Use o mesmo e-mail informado na compra quando a integração do checkout estiver ativa.</p>
        <div style={{ height: 18 }} />
        <form className="stack" onSubmit={handleSubmit}>
          <div className="field"><label htmlFor="name">Nome</label><input className="input" id="name" name="name" required /></div>
          <div className="field"><label htmlFor="email">E-mail</label><input className="input" id="email" name="email" type="email" required /></div>
          <div className="field"><label htmlFor="password">Senha</label><input className="input" id="password" name="password" type="password" minLength={8} required /></div>
          {error && <div className="error">{error}</div>}
          <button className="btn btn-primary" disabled={loading} type="submit">{loading ? "Criando..." : "COMEÇAR"}</button>
        </form>
        <div className="divider" />
        <Link className="btn btn-ghost" href="/login">Já tenho acesso</Link>
      </section>
    </main>
  );
}
