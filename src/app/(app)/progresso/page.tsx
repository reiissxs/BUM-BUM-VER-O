import { Camera, Ruler, TrendingUp, Trophy } from "lucide-react";

export default function ProgressPage() {
  return (
    <section>
      <span className="eyebrow">Minha evolução</span>
      <h1 className="h1">Progresso</h1>
      <p className="muted">Tudo que você registra durante o programa fica organizado aqui.</p>

      <div className="kpis" style={{ marginTop: 22 }}>
        <div className="kpi"><strong>17</strong><span>dias no programa</span></div>
        <div className="kpi"><strong>7</strong><span>treinos realizados</span></div>
        <div className="kpi"><strong>19%</strong><span>programa completo</span></div>
        <div className="kpi"><strong>3</strong><span>sequência atual</span></div>
      </div>

      <div className="grid-2" style={{ marginTop: 18 }}>
        <div className="card"><Ruler /><h2 className="h2" style={{ marginTop: 12 }}>Medidas</h2><p className="muted">Peso 67,8 kg · Cintura 70 cm · Quadril 102 cm · Coxa 61 cm</p></div>
        <div className="card"><Camera /><h2 className="h2" style={{ marginTop: 12 }}>Fotos privadas</h2><p className="muted">Dia 1 salvo. Próximo checkpoint: Dia 30.</p></div>
      </div>

      <div className="card" style={{ marginTop: 18 }}>
        <TrendingUp />
        <h2 className="h2" style={{ marginTop: 12 }}>Histórico de cargas</h2>
        <div className="list" style={{ marginTop: 14 }}>
          <div className="list-row"><span>Elevação pélvica</span><strong>40 → 50 kg</strong></div>
          <div className="list-row"><span>Stiff</span><strong>30 → 36 kg</strong></div>
          <div className="list-row"><span>Agachamento búlgaro</span><strong>10 → 14 kg</strong></div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 18 }}>
        <Trophy />
        <h2 className="h2" style={{ marginTop: 12 }}>Conquistas</h2>
        <p className="muted">🏆 Primeira semana concluída · 🔥 3 treinos consecutivos</p>
      </div>
    </section>
  );
}
