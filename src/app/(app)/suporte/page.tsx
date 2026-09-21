import { MessageCircle } from "lucide-react";

export default function SupportPage() {
  return (
    <section>
      <span className="eyebrow">Especialista</span>
      <h1 className="h1">Fale com a especialista</h1>
      <div className="card">
        <MessageCircle />
        <h2 className="h2" style={{ marginTop: 12 }}>Suporte sobre o programa e execução</h2>
        <p className="muted">Suporte respondido por profissional de Educação Física. Prazo de resposta: até 24/48 horas úteis.</p>
        <p className="muted">O chat assíncrono já possui estrutura de banco para guardar todo o histórico. A interface de envio será conectada na próxima etapa.</p>
      </div>
    </section>
  );
}
