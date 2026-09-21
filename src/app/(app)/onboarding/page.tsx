import Link from "next/link";

const steps = [
  ["01", "Bem-vinda ao BUM BUM VERÃO.", "Uma jornada organizada para você saber exatamente o que fazer em cada treino."],
  ["02", "Seu treino já estará organizado.", "Durante os próximos 90 dias, basta abrir o app e seguir o treino programado."],
  ["03", "Registre suas cargas.", "Assista às demonstrações, anote sua evolução e acompanhe seu progresso."],
  ["04", "Conte com suporte.", "Quando tiver dúvidas sobre o programa, fale com nossa especialista."],
];

export default function OnboardingPage() {
  return (
    <section>
      <span className="eyebrow">Antes de começar</span>
      <h1 className="h1">Tudo pronto para seus 90 dias.</h1>
      <div className="grid" style={{ marginTop: 22 }}>
        {steps.map(([n, title, text]) => (
          <article className="card" key={n}>
            <span className="pill">{n}</span>
            <h2 className="h2" style={{ marginTop: 14 }}>{title}</h2>
            <p className="muted">{text}</p>
          </article>
        ))}
      </div>
      <Link className="btn btn-primary" href="/inicio" style={{ width: "100%", marginTop: 18 }}>COMEÇAR MEUS 90 DIAS</Link>
    </section>
  );
}
