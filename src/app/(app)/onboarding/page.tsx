import Link from "next/link";
import { requireSession } from "@/lib/session";

export default async function OnboardingPage() {
  await requireSession();
  return (
    <section className="grid" style={{ maxWidth: 680, margin: "0 auto" }}>
      <span className="eyebrow">Bem-vinda</span>
      <h1 className="h1">Você não precisa montar nada.</h1>
      <p className="muted">Durante os próximos 90 dias, seu treino fica organizado dentro do BUM BUM VERÃO. Assista aos vídeos, registre as cargas e acompanhe sua evolução.</p>
      <div className="card"><strong>1.</strong> Abra o treino do dia.</div>
      <div className="card"><strong>2.</strong> Execute série por série e registre carga e repetições.</div>
      <div className="card"><strong>3.</strong> Acompanhe sua evolução e fale com a especialista quando precisar.</div>
      <Link className="btn btn-primary" href="/inicio">COMEÇAR MEUS 90 DIAS</Link>
    </section>
  );
}
