const days = [
  ["Dia 15", "Treino C", "Quadríceps + Glúteos", "Concluído"],
  ["Dia 16", "Recuperação", "Descanso", "Concluído"],
  ["Dia 17", "Treino A", "Glúteos + Posteriores", "Hoje"],
  ["Dia 18", "Treino B", "Superiores + Core", "Próximo"],
  ["Dia 19", "Recuperação", "Descanso", "Bloqueado"],
  ["Dia 20", "Treino C", "Quadríceps + Glúteos", "Bloqueado"],
];

export default function WorkoutsPage() {
  return (
    <section>
      <span className="eyebrow">Semana 3</span>
      <h1 className="h1">Seu cronograma</h1>
      <p className="muted">Você não precisa decidir o que treinar. O próximo passo já está organizado.</p>
      <div className="list" style={{ marginTop: 22 }}>
        {days.map(([day, workout, subtitle, status]) => (
          <div className="list-row" key={day}>
            <div>
              <strong>{day} · {workout}</strong>
              <div className="muted">{subtitle}</div>
            </div>
            <span className="pill">{status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
