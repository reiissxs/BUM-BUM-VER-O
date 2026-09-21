import { asc, eq } from "drizzle-orm";
import { CalendarDays } from "lucide-react";
import { programDays, programs } from "@/db/schema";
import { db } from "@/lib/db";

export default async function WorkoutsPage() {
  const [program] = await db.select().from(programs).where(eq(programs.slug, "bumbum-verao")).limit(1);
  const days = program ? await db.select().from(programDays).where(eq(programDays.programId, program.id)).orderBy(asc(programDays.dayNumber)) : [];

  return (
    <section>
      <span className="eyebrow">90 dias</span>
      <h1 className="h1">Seu cronograma</h1>
      <p className="muted">Cada dia é configurado pelo painel. Nenhum número de treinos fica travado no código.</p>
      <div className="list" style={{ marginTop: 22 }}>
        {days.length === 0 ? <div className="card empty"><CalendarDays size={30} /><p>O calendário ainda não foi cadastrado.</p></div> : days.map((day) => <div className="list-row" key={day.id}><div><strong>Dia {day.dayNumber}</strong><div className="muted">{day.title || (day.dayType === "rest" ? "Descanso" : "Treino")}</div></div><span className="pill">{day.dayType === "rest" ? "Descanso" : "Treino"}</span></div>)}
      </div>
    </section>
  );
}
