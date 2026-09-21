"use client";

import Link from "next/link";
import { Check, ChevronRight, History, TrendingUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type SetEntry = {
  weight: string;
  reps: string;
};

type Exercise = {
  id: string;
  name: string;
  sets: number;
  target: string;
  rest: number;
  last: string;
  guide: string;
  progressionSet?: number;
};

const exercises: Exercise[] = [
  {
    id: "elevacao-pelvica",
    name: "Elevação pélvica",
    sets: 4,
    target: "8–10",
    rest: 90,
    last: "15 kg",
    guide: "Controle a descida e faça a extensão completa do quadril.",
    progressionSet: 3,
  },
  {
    id: "stiff",
    name: "Stiff",
    sets: 3,
    target: "8–10",
    rest: 90,
    last: "34 kg",
    guide: "Mantenha a coluna neutra e conduza o quadril para trás.",
    progressionSet: 3,
  },
  {
    id: "bulgaro",
    name: "Agachamento búlgaro",
    sets: 3,
    target: "8–10 cada perna",
    rest: 75,
    last: "12 kg",
    guide: "Mantenha o pé da frente totalmente apoiado e controle a descida.",
    progressionSet: 3,
  },
  {
    id: "abducao",
    name: "Abdução de quadril",
    sets: 4,
    target: "12–15",
    rest: 60,
    last: "45 kg",
    guide: "Evite impulso e controle o retorno.",
    progressionSet: 3,
  },
  {
    id: "coice",
    name: "Coice na polia",
    sets: 3,
    target: "12–15",
    rest: 60,
    last: "10 kg",
    guide: "Movimente o quadril sem girar o tronco.",
    progressionSet: 3,
  },
];

const demoSeed: Record<string, SetEntry[]> = {
  "elevacao-pelvica": [
    { weight: "15", reps: "7" },
    { weight: "15", reps: "6" },
    { weight: "17", reps: "6" },
    { weight: "", reps: "" },
  ],
};

const storageKey = "bumbum-verao-demo-workout-a";

export default function WorkoutPage() {
  const [entries, setEntries] = useState<Record<string, SetEntry[]>>(demoSeed);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      try {
        setEntries(JSON.parse(stored));
      } catch {
        setEntries(demoSeed);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(entries));
  }, [entries]);

  const completedSets = useMemo(
    () =>
      Object.values(entries)
        .flat()
        .filter((set) => set.weight.trim() && set.reps.trim()).length,
    [entries],
  );

  const totalSets = exercises.reduce((sum, exercise) => sum + exercise.sets, 0);

  function getExerciseSets(exercise: Exercise) {
    const current = entries[exercise.id] ?? [];
    return Array.from({ length: exercise.sets }, (_, index) => current[index] ?? { weight: "", reps: "" });
  }

  function updateSet(exerciseId: string, setIndex: number, field: keyof SetEntry, value: string) {
    setEntries((current) => {
      const exercise = exercises.find((item) => item.id === exerciseId);
      if (!exercise) return current;

      const nextSets = getExerciseSetsFromState(current, exercise);
      nextSets[setIndex] = { ...nextSets[setIndex], [field]: value.replace(/[^0-9.,]/g, "") };

      return { ...current, [exerciseId]: nextSets };
    });
  }

  function resetDemo() {
    setEntries(demoSeed);
  }

  return (
    <section>
      <span className="eyebrow">Dia 17</span>
      <h1 className="h1">Treino A</h1>
      <p className="muted">Glúteos + Posteriores · aproximadamente 45 minutos</p>

      <section className="card" style={{ marginTop: 20, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center" }}>
          <div>
            <span className="eyebrow">Progresso do treino</span>
            <div style={{ marginTop: 5 }}><strong>{completedSets} de {totalSets} séries registradas</strong></div>
          </div>
          <button className="btn btn-ghost" type="button" onClick={resetDemo} style={{ minHeight: 38 }}>Resetar demo</button>
        </div>
        <div className="progress-track" style={{ marginTop: 13 }}>
          <div className="progress-fill" style={{ width: `${Math.round((completedSets / totalSets) * 100)}%` }} />
        </div>
      </section>

      <div className="list" style={{ marginTop: 22 }}>
        {exercises.map((exercise, exerciseIndex) => {
          const sets = getExerciseSets(exercise);

          return (
            <article className="card" key={exercise.id} style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ padding: 20, borderBottom: "1px solid var(--line)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
                  <div>
                    <span className="eyebrow">Exercício {exerciseIndex + 1} de {exercises.length}</span>
                    <h2 className="h2" style={{ marginTop: 8 }}>{exercise.name}</h2>
                  </div>
                  <span className="pill"><History size={13} /> Última carga: {exercise.last}</span>
                </div>

                <div
                  style={{
                    marginTop: 16,
                    borderRadius: 18,
                    minHeight: 170,
                    display: "grid",
                    placeItems: "center",
                    background: "#101014",
                    border: "1px solid var(--line)",
                  }}
                >
                  <span className="muted">Vídeo demonstrativo</span>
                </div>

                <p className="muted" style={{ marginBottom: 6 }}>
                  {exercise.sets} séries · meta {exercise.target} repetições · {exercise.rest}s de descanso
                </p>
                <p style={{ margin: 0 }}>{exercise.guide}</p>
              </div>

              <div style={{ padding: 20 }}>
                <div style={{ display: "grid", gap: 12 }}>
                  {sets.map((set, setIndex) => {
                    const registered = Boolean(set.weight.trim() && set.reps.trim());
                    const isProgressionSet = exercise.progressionSet === setIndex + 1;

                    return (
                      <div
                        key={setIndex}
                        style={{
                          border: "1px solid var(--line)",
                          background: registered ? "rgba(255,47,125,.055)" : "#111115",
                          borderRadius: 18,
                          padding: 16,
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", marginBottom: 13 }}>
                          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                            <div
                              style={{
                                width: 34,
                                height: 34,
                                display: "grid",
                                placeItems: "center",
                                borderRadius: 11,
                                background: "var(--pink-soft)",
                                color: "#ff79aa",
                                fontWeight: 950,
                              }}
                            >
                              {setIndex + 1}
                            </div>
                            <div>
                              <strong>{setIndex + 1}ª série</strong>
                              <div className="muted" style={{ fontSize: 12 }}>Meta: {exercise.target} repetições</div>
                            </div>
                          </div>

                          {registered ? (
                            <span className="pill" style={{ color: "var(--success)", background: "rgba(99,214,156,.09)" }}>
                              <Check size={13} /> Registrado
                            </span>
                          ) : (
                            <span className="muted" style={{ fontSize: 12 }}>Pendente</span>
                          )}
                        </div>

                        {isProgressionSet && (
                          <div
                            style={{
                              display: "flex",
                              gap: 10,
                              alignItems: "flex-start",
                              background: "rgba(255,47,125,.10)",
                              border: "1px solid rgba(255,47,125,.22)",
                              padding: 12,
                              borderRadius: 14,
                              marginBottom: 13,
                            }}
                          >
                            <TrendingUp size={18} style={{ flex: "0 0 auto", marginTop: 1, color: "#ff6fa4" }} />
                            <div>
                              <strong style={{ fontSize: 13 }}>Pode progredir a carga</strong>
                              <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>
                                Se estiver confortável e mantendo boa execução, considere aumentar de 2 a 5 kg.
                              </div>
                            </div>
                          </div>
                        )}

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
                            gap: 12,
                          }}
                        >
                          <div className="field">
                            <label>Peso utilizado</label>
                            <div style={{ position: "relative" }}>
                              <input
                                className="input"
                                inputMode="decimal"
                                value={set.weight}
                                onChange={(event) => updateSet(exercise.id, setIndex, "weight", event.target.value)}
                                placeholder="0"
                                style={{ paddingRight: 42 }}
                              />
                              <span className="muted" style={{ position: "absolute", right: 14, top: 14 }}>kg</span>
                            </div>
                          </div>

                          <div className="field">
                            <label>Repetições feitas</label>
                            <input
                              className="input"
                              inputMode="numeric"
                              value={set.reps}
                              onChange={(event) => updateSet(exercise.id, setIndex, "reps", event.target.value)}
                              placeholder={exercise.target}
                            />
                          </div>
                        </div>

                        {registered && (
                          <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 11, fontSize: 12 }}>
                            <span className="muted">Registrado:</span>
                            <strong>{set.weight} kg</strong>
                            <span className="muted">·</span>
                            <strong>{set.reps} reps</strong>
                            <span className="muted">de {exercise.target}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <button className="btn btn-secondary" type="button" style={{ width: "100%", marginTop: 14 }}>
                  PRÓXIMO EXERCÍCIO <ChevronRight size={17} />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <Link className="btn btn-primary" href="/inicio" style={{ width: "100%", marginTop: 18 }}>
        FINALIZAR TREINO
      </Link>
    </section>
  );
}

function getExerciseSetsFromState(state: Record<string, SetEntry[]>, exercise: Exercise) {
  const current = state[exercise.id] ?? [];
  return Array.from({ length: exercise.sets }, (_, index) => current[index] ?? { weight: "", reps: "" });
}
