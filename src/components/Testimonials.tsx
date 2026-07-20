const testimonials = [
  {
    quote: "A implementação do assistente virtual da ConectaOne aumentou em 30% nossa taxa de conversão de leads. Pacientes atendidos 24/7, resultando em ROI de 320% no primeiro trimestre.",
    author: "Dra. Ana Silva",
    role: "Diretora Clínica",
    company: "Centro Odontológico Sorrisos",
  },
  {
    quote: "As soluções de automação liberaram nossa equipe comercial de 20 horas semanais em tarefas administrativas. Esse tempo gerou aumento de 32% no faturamento trimestral.",
    author: "Roberto Mendes",
    role: "Diretor Comercial",
    company: "Distribuidora Centro-Oeste",
  },
  {
    quote: "A integração entre nossos sistemas financeiros e ERP reduziu o ciclo de recebimento em 7 dias e eliminou erros que custavam R$15.000 mensais. ROI em menos de 60 dias.",
    author: "Carla Rodrigues",
    role: "Diretora Financeira",
    company: "Indústria Nacional Ltda.",
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="section"
      style={{ background: '#f9fafb', borderTop: '1px solid #e5e7eb' }}
    >
      <div className="container-xl">

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <span className="section-label">Clientes</span>
          <h2 className="section-heading">Resultados comprovados</h2>
          <p className="section-sub">
            Empresas que transformaram suas operações com a ConectaOne e geraram impacto financeiro mensurável.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            overflow: 'hidden',
            background: '#ffffff',
          }}
          className="testimonial-grid"
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                padding: '32px 28px',
                borderRight: i < testimonials.length - 1 ? '1px solid #e5e7eb' : 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}
            >
              {/* Quote */}
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7, flex: 1 }}>
                "{t.quote}"
              </p>

              {/* Author */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  paddingTop: 20,
                  borderTop: '1px solid #f3f4f6',
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: '#f3f4f6',
                    border: '1px solid #e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#6b7280',
                    flexShrink: 0,
                  }}
                >
                  {t.author[0]}
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{t.author}</p>
                  <p style={{ fontSize: 12, color: '#9ca3af' }}>
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .testimonial-grid { grid-template-columns: 1fr !important; }
          .testimonial-grid > div { border-right: none !important; border-bottom: 1px solid #e5e7eb; }
          .testimonial-grid > div:last-child { border-bottom: none; }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
