import Link from "next/link";
import { ArrowRight, CheckCircle2, Flame, Trophy } from "lucide-react";

export default function DashboardPage() {
  const currentDay = 17;
  const totalDays = 90;
  const percent = 19;

  return (
    <div className="grid">
      <section className="card hero-card">
        <span className="eyebrow">Seu programa</span>
        <h1 className="h1" style={{ fontSize: "clamp(38px, 10vw, 64px)" }}>Dia {currentDay} de {totalDays}</h1>
        <p className="muted">Você já construiu consistência. Hoje tem treino de glúteos + posteriores.</p>
        <div className="progress-track"><div className="progress-fill" style={{ width: `${percent}%` }} /></div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 9, fontSize: 13 }}>
          <span className="muted">{currentDay} / {totalDays} dias</span>
          <strong>{percent}% completo</strong>
        </div>
      </section>

      <section className="kpis">
        <div className="kpi"><strong>7</strong><span>treinos concluídos</span></div>
        <div className="kpi"><strong>3</strong><span>sequência atual</span></div>
        <div className="kpi"><strong>19%</strong><span>do programa</span></div>
        <div className="kpi"><strong>73</strong><span>dias restantes</span></div>
      </section>

      <div className="section-head">
        <div><span className="eyebrow">Agora</span><h2 className="h2">Treino de hoje</h2></div>
        <span className="pill"><Flame size={14} /> foco do dia</span>
      </div>

      <section className="card">
        <span className="pill">TREINO A</span>
        <h2 className="h1" style={{ fontSize: 36 }}>Glúteos + Posteriores</h2>
        <p className="muted">5 exercícios · aproximadamente 45 minutos</p>
        <Link className="btn btn-primary" href="/treino/demo?dia=17">COMEÇAR TREINO <ArrowRight size={18} /></Link>
      </section>

      <div className="grid-2">
        <section className="card">
          <CheckCircle2 size={24} />
          <h2 className="h2" style={{ marginTop: 12 }}>Último treino</h2>
          <p className="muted">Treino C · Quadríceps + Glúteos</p>
          <strong>Concluído ontem</strong>
        </section>
        <section className="card">
          <Trophy size={24} />
          <h2 className="h2" style={{ marginTop: 12 }}>Seu próximo marco</h2>
          <p className="muted">Complete mais 5 dias para desbloquear 25% do programa.</p>
        </section>
      </div>
    </div>
  );
}
