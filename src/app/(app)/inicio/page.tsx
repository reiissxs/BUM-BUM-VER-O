import { and, eq } from "drizzle-orm";
import { ArrowRight, CalendarDays, CheckCircle2, Flame, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { programAccess, programDays, programs, workoutSessions, workouts } from "@/db/schema";
import { db } from "@/lib/db";
import { getProgramDay, getProgramPercent } from "@/lib/program";
import { requireSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await requireSession();
  const [access] = await db
    .select({
      accessId: programAccess.id,
      startDate: programAccess.startDate,
      accessType: programAccess.accessType,
      status: programAccess.status,
      programId: programs.id,
      programName: programs.name,
      durationDays: programs.durationDays,
    })
    .from(programAccess)
    .innerJoin(programs, eq(programAccess.programId, programs.id))
    .where(and(eq(programAccess.userId, session.user.id), eq(programAccess.status, "active"), eq(programs.active, true)))
    .limit(1);

  if (!access) {
    return (
      <section className="card empty">
        <LockKeyhole size={34} style={{ marginBottom: 12 }} />
        <h1 className="h2">Nenhum programa ativo</h1>
        <p>Seu login está funcionando, mas ainda não existe acesso ao BUM BUM VERÃO vinculado a esta conta.</p>
      </section>
    );
  }

  const currentDay = getProgramDay(access.startDate, access.durationDays);
  const percent = getProgramPercent(currentDay, access.durationDays);

  const [today] = await db
    .select({
      dayType: programDays.dayType,
      title: programDays.title,
      workoutId: workouts.id,
      workoutName: workouts.name,
      workoutSubtitle: workouts.subtitle,
      estimatedMinutes: workouts.estimatedMinutes,
    })
    .from(programDays)
    .leftJoin(workouts, eq(programDays.workoutId, workouts.id))
    .where(and(eq(programDays.programId, access.programId), eq(programDays.dayNumber, currentDay)))
    .limit(1);

  const completed = await db
    .select({ id: workoutSessions.id })
    .from(workoutSessions)
    .where(and(eq(workoutSessions.userId, session.user.id), eq(workoutSessions.status, "completed")));

  return (
    <div className="grid">
      <section className="card hero-card">
        <span className="eyebrow">Seu programa</span>
        <h1 className="h1" style={{ fontSize: "clamp(34px, 9vw, 58px)" }}>Dia {currentDay} de {access.durationDays}</h1>
        <div className="progress-track"><div className="progress-fill" style={{ width: `${percent}%` }} /></div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 9, fontSize: 13 }}>
          <span className="muted">{currentDay} / {access.durationDays} dias</span>
          <strong>{percent}% completo</strong>
        </div>
      </section>

      <section className="kpis">
        <div className="kpi"><strong>{completed.length}</strong><span>treinos concluídos</span></div>
        <div className="kpi"><strong>{percent}%</strong><span>do programa</span></div>
        <div className="kpi"><strong>—</strong><span>sequência atual</span></div>
        <div className="kpi"><strong>{access.accessType === "lifetime" ? "∞" : access.durationDays}</strong><span>{access.accessType === "lifetime" ? "acesso vitalício" : "dias de acesso"}</span></div>
      </section>

      <div className="section-head"><div><span className="eyebrow">Agora</span><h2 className="h2">Treino de hoje</h2></div></div>

      {!today ? (
        <section className="card empty"><CalendarDays size={32} /><p>O Dia {currentDay} ainda não foi configurado no painel administrativo.</p></section>
      ) : today.dayType === "rest" ? (
        <section className="card"><span className="pill"><CheckCircle2 size={14} /> Dia de recuperação</span><h2 className="h2" style={{ marginTop: 16 }}>{today.title || "Descanso"}</h2><p className="muted">Recupere-se e volte no próximo treino programado.</p></section>
      ) : (
        <section className="card">
          <span className="pill"><Flame size={14} /> TREINO DE HOJE</span>
          <h2 className="h1" style={{ fontSize: 34 }}>{today.workoutName}</h2>
          <p className="muted">{today.workoutSubtitle || "Treino programado"}</p>
          <p className="muted">{today.estimatedMinutes ? `≈ ${today.estimatedMinutes} minutos` : "Duração definida pelo treino"}</p>
          {today.workoutId && <Link className="btn btn-primary" href={`/treino/${today.workoutId}?dia=${currentDay}`}>COMEÇAR TREINO <ArrowRight size={18} /></Link>}
        </section>
      )}
    </div>
  );
}
