import { desc, eq } from "drizzle-orm";
import { Camera, Ruler, TrendingUp } from "lucide-react";
import { progressEntries, workoutSessions } from "@/db/schema";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/session";

export default async function ProgressPage() {
  const session = await requireSession();
  const [latest] = await db.select().from(progressEntries).where(eq(progressEntries.userId, session.user.id)).orderBy(desc(progressEntries.entryDate)).limit(1);
  const completed = await db.select({ id: workoutSessions.id }).from(workoutSessions).where(eq(workoutSessions.userId, session.user.id));

  return (
    <section>
      <span className="eyebrow">Minha evolução</span>
      <h1 className="h1">Progresso</h1>
      <div className="kpis">
        <div className="kpi"><strong>{completed.length}</strong><span>sessões registradas</span></div>
        <div className="kpi"><strong>{latest?.weightKg ?? "—"}</strong><span>peso atual (kg)</span></div>
        <div className="kpi"><strong>{latest?.hipsCm ?? "—"}</strong><span>quadril (cm)</span></div>
        <div className="kpi"><strong>{latest?.thighCm ?? "—"}</strong><span>coxa (cm)</span></div>
      </div>
      <div className="grid-2" style={{ marginTop: 18 }}>
        <div className="card"><Ruler /><h2 className="h2" style={{ marginTop: 12 }}>Medidas</h2><p className="muted">Peso, cintura, quadril e coxa serão registrados por data.</p></div>
        <div className="card"><Camera /><h2 className="h2" style={{ marginTop: 12 }}>Fotos privadas</h2><p className="muted">Checkpoints dos dias 1, 30, 60 e 90, com storage privado.</p></div>
      </div>
      <div className="card" style={{ marginTop: 18 }}><TrendingUp /><h2 className="h2" style={{ marginTop: 12 }}>Histórico de cargas</h2><p className="muted">Será alimentado automaticamente a cada série concluída.</p></div>
    </section>
  );
}
