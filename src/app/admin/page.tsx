import { count } from "drizzle-orm";
import { Dumbbell, Library, MessageCircle, Users } from "lucide-react";
import { exercises, programAccess, supportThreads, workouts } from "@/db/schema";
import { db } from "@/lib/db";

export default async function AdminPage() {
  const [[exerciseCount], [workoutCount], [accessCount], [threadCount]] = await Promise.all([
    db.select({ value: count() }).from(exercises),
    db.select({ value: count() }).from(workouts),
    db.select({ value: count() }).from(programAccess),
    db.select({ value: count() }).from(supportThreads),
  ]);

  return (
    <section>
      <span className="eyebrow">Painel administrativo</span>
      <h1 className="h1">Controle do programa</h1>
      <div className="kpis">
        <div className="kpi"><strong>{exerciseCount.value}</strong><span>exercícios</span></div>
        <div className="kpi"><strong>{workoutCount.value}</strong><span>treinos</span></div>
        <div className="kpi"><strong>{accessCount.value}</strong><span>acessos</span></div>
        <div className="kpi"><strong>{threadCount.value}</strong><span>conversas</span></div>
      </div>
      <div className="grid-2" style={{ marginTop: 18 }}>
        <div className="card"><Library /><h2 className="h2" style={{ marginTop: 12 }}>Conteúdo</h2><p className="muted">Cadastro de semanas, dias, treinos, exercícios, vídeos e alternativas.</p></div>
        <div className="card"><Users /><h2 className="h2" style={{ marginTop: 12 }}>Usuárias e acessos</h2><p className="muted">Datas de início/fim, bloqueio, expiração e vitalício.</p></div>
        <div className="card"><Dumbbell /><h2 className="h2" style={{ marginTop: 12 }}>Editor dos 90 dias</h2><p className="muted">Calendário configurável, sem número fixo de treinos por semana.</p></div>
        <div className="card"><MessageCircle /><h2 className="h2" style={{ marginTop: 12 }}>Suporte</h2><p className="muted">Fila de conversas para a especialista e histórico completo.</p></div>
      </div>
    </section>
  );
}
