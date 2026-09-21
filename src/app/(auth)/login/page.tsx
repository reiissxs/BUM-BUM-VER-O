"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);

    const result = await authClient.signIn.email({
      email: String(form.get("email") || ""),
      password: String(form.get("password") || ""),
    });

    setLoading(false);
    if (result.error) {
      setError("Não foi possível entrar. Confira seu e-mail e senha.");
      return;
    }
    router.replace("/inicio");
    router.refresh();
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <div className="brand">BUM BUM <span>VERÃO</span></div>
        <div style={{ height: 28 }} />
        <span className="eyebrow">90 dias</span>
        <h1 className="h1">Seus próximos 90 dias começam aqui.</h1>
        <p className="muted">Entre para ver o treino de hoje, registrar suas cargas e acompanhar sua evolução.</p>
        <div style={{ height: 18 }} />

        <form className="stack" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input className="input" id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="field">
            <label htmlFor="password">Senha</label>
            <input className="input" id="password" name="password" type="password" autoComplete="current-password" required />
          </div>
          {error && <div className="error">{error}</div>}
          <button className="btn btn-primary" disabled={loading} type="submit">
            {loading ? "Entrando..." : "ENTRAR"}
          </button>
        </form>

        <div className="divider" />
        <div className="stack" style={{ gap: 8 }}>
          <Link className="btn btn-secondary" href="/primeiro-acesso">Primeiro acesso</Link>
          <Link className="btn btn-ghost" href="/recuperar-senha">Esqueci minha senha</Link>
        </div>
      </section>
    </main>
  );
}
