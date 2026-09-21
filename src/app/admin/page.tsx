import { CalendarDays, Dumbbell, Library, MessageCircle, Users } from "lucide-react";

export default function AdminPage() {
  return (
    <section>
      <span className="eyebrow">Painel administrativo</span>
      <h1 className="h1">Controle do programa</h1>
      <p className="muted">Prévia do ambiente usado para cadastrar e editar todo o conteúdo do BUM BUM VERÃO.</p>
      <div className="kpis" style={{ marginTop: 22 }}>
        <div className="kpi"><strong>26</strong><span>exercícios</span></div>
        <div className="kpi"><strong>6</strong><span>treinos</span></div>
        <div className="kpi"><strong>128</strong><span>alunas</span></div>
        <div className="kpi"><strong>4</strong><span>dúvidas abertas</span></div>
      </div>
      <div className="grid-2" style={{ marginTop: 18 }}>
        <div className="card"><Library /><h2 className="h2" style={{ marginTop: 12 }}>Exercícios e vídeos</h2><p className="muted">Cadastre exercícios, orientações, equipamentos, vídeos e alternativas.</p></div>
        <div className="card"><Dumbbell /><h2 className="h2" style={{ marginTop: 12 }}>Editor de treinos</h2><p className="muted">Monte treinos com séries, repetições, descanso e ordem personalizada.</p></div>
        <div className="card"><CalendarDays /><h2 className="h2" style={{ marginTop: 12 }}>Calendário dos 90 dias</h2><p className="muted">Defina treino ou descanso em cada dia do programa.</p></div>
        <div className="card"><Users /><h2 className="h2" style={{ marginTop: 12 }}>Alunas e acessos</h2><p className="muted">Acompanhe início, término, acesso vitalício e progresso.</p></div>
        <div className="card"><MessageCircle /><h2 className="h2" style={{ marginTop: 12 }}>Suporte</h2><p className="muted">Fila de conversas da especialista e histórico de atendimento.</p></div>
      </div>
    </section>
  );
}
