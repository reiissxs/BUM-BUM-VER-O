import { and, asc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { exercises, workoutExercises, workouts } from "@/db/schema";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function WorkoutPage({ params, searchParams }: { params: Promise<{ workoutId: string }>; searchParams: Promise<{ dia?: string }> }) {
  const { workoutId } = await params;
  const { dia } = await searchParams;
  const [workout] = await db.select().from(workouts).where(and(eq(workouts.id, workoutId), eq(workouts.active, true))).limit(1);
  if (!workout) notFound();

  const items = await db
    .select({
      id: workoutExercises.id,
      sets: workoutExercises.sets,
      repsMin: workoutExercises.repsMin,
      repsMax: workoutExercises.repsMax,
      repsText: workoutExercises.repsText,
      restSeconds: workoutExercises.restSeconds,
      guidance: workoutExercises.technicalGuidance,
      exerciseName: exercises.name,
      videoUrl: exercises.videoUrl,
      equipment: exercises.equipment,
    })
    .from(workoutExercises)
    .innerJoin(exercises, eq(workoutExercises.exerciseId, exercises.id))
    .where(eq(workoutExercises.workoutId, workoutId))
    .orderBy(asc(workoutExercises.sortOrder));

  return (
    <section>
      <span className="eyebrow">{dia ? `Dia ${dia}` : "Treino"}</span>
      <h1 className="h1">{workout.name}</h1>
      <p className="muted">{workout.subtitle}</p>
      <div className="list" style={{ marginTop: 22 }}>
        {items.length === 0 ? <div className="card empty">Nenhum exercício cadastrado neste treino.</div> : items.map((item, index) => (
          <article className="card" key={item.id}>
            <span className="eyebrow">Exercício {index + 1} de {items.length}</span>
            <h2 className="h2" style={{ marginTop: 8 }}>{item.exerciseName}</h2>
            <p className="muted">{item.sets} séries · {item.repsText || `${item.repsMin ?? ""}${item.repsMax ? `–${item.repsMax}` : ""} repetições`} · {item.restSeconds}s de descanso</p>
            {item.guidance && <p>{item.guidance}</p>}
            <div className="grid-2">
              <div className="field"><label>Carga utilizada</label><input className="input" inputMode="decimal" placeholder="kg" disabled /></div>
              <div className="field"><label>Repetições realizadas</label><input className="input" inputMode="numeric" placeholder="reps" disabled /></div>
            </div>
            <button className="btn btn-primary" style={{ marginTop: 14 }} disabled>CONCLUIR SÉRIE</button>
            <p className="muted" style={{ fontSize: 12 }}>O motor transacional de séries e descanso entra na próxima etapa; os campos estão bloqueados para evitar dados locais falsos.</p>
          </article>
        ))}
      </div>
    </section>
  );
}
