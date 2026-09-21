import { Dumbbell, Search } from "lucide-react";

const exercises = [
  ["Elevação pélvica", "Glúteos", "Máquina / Smith"],
  ["Agachamento búlgaro", "Glúteos + Quadríceps", "Halteres"],
  ["Stiff", "Posteriores + Glúteos", "Barra"],
  ["Abdução de quadril", "Glúteo médio", "Máquina"],
  ["Coice na polia", "Glúteos", "Polia"],
  ["Mesa flexora", "Posteriores", "Máquina"],
];

export default function ExercisesPage() {
  return (
    <section>
      <span className="eyebrow">Biblioteca</span>
      <h1 className="h1">Exercícios</h1>
      <p className="muted">Consulte execução, músculos trabalhados, equipamento e orientações técnicas.</p>
      <div className="field" style={{ margin: "22px 0 14px" }}>
        <div style={{ position: "relative" }}>
          <Search size={18} style={{ position: "absolute", left: 14, top: 15, opacity: .55 }} />
          <input className="input" placeholder="Pesquisar exercício" style={{ paddingLeft: 42 }} />
        </div>
      </div>
      <div className="list">
        {exercises.map(([name, group, equipment]) => (
          <div className="list-row" key={name}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div className="avatar"><Dumbbell size={19} /></div>
              <div><strong>{name}</strong><div className="muted">{group}</div></div>
            </div>
            <span className="pill">{equipment}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
