import { asc, eq } from "drizzle-orm";
import { Dumbbell } from "lucide-react";
import { exercises } from "@/db/schema";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ExercisesPage() {
  const data = await db.select().from(exercises).where(eq(exercises.active, true)).orderBy(asc(exercises.name));
  return (
    <section>
      <span className="eyebrow">Biblioteca</span>
      <h1 className="h1">Exercícios</h1>
      <p className="muted">Vídeos, execução, músculos trabalhados, equipamento e orientações técnicas.</p>
      <div className="list" style={{ marginTop: 22 }}>
        {data.length === 0 ? <div className="card empty"><Dumbbell size={30} /><p>A biblioteca ainda está vazia. Os exercícios serão cadastrados pelo admin.</p></div> : data.map((item) => <div className="list-row" key={item.id}><div><strong>{item.name}</strong><div className="muted">{item.muscleGroup || "Grupo muscular não informado"}</div></div><span className="pill">{item.equipment || "Livre"}</span></div>)}
      </div>
    </section>
  );
}
