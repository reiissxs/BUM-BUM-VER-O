import Link from "next/link";

const exercises = [
  { name: "Elevação pélvica", sets: 4, reps: "10–12", rest: 90, last: "45 kg", guide: "Controle a descida e faça a extensão completa do quadril." },
  { name: "Stiff", sets: 3, reps: "8–10", rest: 90, last: "34 kg", guide: "Mantenha a coluna neutra e conduza o quadril para trás." },
  { name: "Agachamento búlgaro", sets: 3, reps: "10 cada perna", rest: 75, last: "12 kg", guide: "Mantenha o pé da frente totalmente apoiado e controle a descida." },
  { name: "Abdução de quadril", sets: 4, reps: "12–15", rest: 60, last: "45 kg", guide: "Evite impulso e controle o retorno." },
  { name: "Coice na polia", sets: 3, reps: "12–15", rest: 60, last: "10 kg", guide: "Movimente o quadril sem girar o tronco." },
];

export default async function WorkoutPage({ searchParams }: { searchParams: Promise<{ dia?: string }> }) {
  const { dia } = await searchParams;
  return (
    <section>
      <span className="eyebrow">{dia ? `Dia ${dia}` : "Treino de hoje"}</span>
      <h1 className="h1">Treino A</h1>
      <p className="muted">Glúteos + Posteriores · aproximadamente 45 minutos</p>

      <div className="list" style={{ marginTop: 22 }}>
        {exercises.map((item, index) => (
          <article className="card" key={item.name}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <span className="eyebrow">Exercício {index + 1} de {exercises.length}</span>
              <span className="pill">Última carga: {item.last}</span>
            </div>
            <div style={{ marginTop: 14, borderRadius: 18, minHeight: 180, display: "grid", placeItems: "center", background: "#101014", border: "1px solid var(--line)" }}>
              <span className="muted">Vídeo demonstrativo</span>
            </div>
            <h2 className="h2" style={{ marginTop: 16 }}>{item.name}</h2>
            <p className="muted">{item.sets} séries · {item.reps} repetições · {item.rest}s de descanso</p>
            <p>{item.guide}</p>
            <div className="grid-2">
              <div className="field"><label>Carga utilizada</label><input className="input" inputMode="decimal" placeholder="kg" /></div>
              <div className="field"><label>Repetições realizadas</label><input className="input" inputMode="numeric" placeholder="reps" /></div>
            </div>
            <button className="btn btn-primary" style={{ marginTop: 14 }}>CONCLUIR SÉRIE</button>
          </article>
        ))}
      </div>
      <Link className="btn btn-secondary" href="/inicio" style={{ width: "100%", marginTop: 18 }}>VOLTAR AO INÍCIO</Link>
    </section>
  );
}
