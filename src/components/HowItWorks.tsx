const steps = [
  {
    num: '01',
    title: 'Consultoria Inicial',
    description: 'Entendemos suas necessidades, mapeamos processos e identificamos as maiores oportunidades de impacto com IA no seu negócio.',
    items: ['Análise detalhada do negócio', 'Identificação de oportunidades', 'Avaliação de processos atuais'],
  },
  {
    num: '02',
    title: 'Planejamento Estratégico',
    description: 'Desenvolvemos um plano detalhado com soluções personalizadas, cronograma realista e métricas claras de sucesso.',
    items: ['Definição de escopo e tecnologias', 'Cronograma de implementação', 'KPIs e metas de resultado'],
  },
  {
    num: '03',
    title: 'Implementação & Resultados',
    description: 'Executamos com agilidade, treinamos sua equipe e acompanhamos continuamente os resultados para garantir o ROI.',
    items: ['Implementação ágil e iterativa', 'Treinamento completo da equipe', 'Monitoramento contínuo'],
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="section"
      style={{ background: '#ffffff', borderTop: '1px solid #e5e7eb' }}
    >
      <div className="container-xl">

        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <span className="section-label">Processo</span>
          <h2 className="section-heading">Como funciona</h2>
          <p className="section-sub">
            Um processo claro e eficiente para transformar seu negócio com IA. Simples para você, poderoso nos bastidores.
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {steps.map((step, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr',
                borderTop: '1px solid #e5e7eb',
                padding: '40px 0',
              }}
              className="step-row"
            >
              {/* Number */}
              <div>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#d1d5db',
                    fontFamily: 'monospace',
                    letterSpacing: '0.05em',
                  }}
                >
                  {step.num}
                </span>
              </div>

              {/* Content */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 48,
                  alignItems: 'start',
                }}
                className="step-inner"
              >
                <div>
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: '#111827',
                      letterSpacing: '-0.02em',
                      marginBottom: 12,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.65 }}>
                    {step.description}
                  </p>
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {step.items.map((item, j) => (
                    <li
                      key={j}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        fontSize: 13,
                        color: '#6b7280',
                      }}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          background: '#d1d5db',
                          flexShrink: 0,
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid #e5e7eb' }} />
        </div>

        <div style={{ marginTop: 32 }}>
          <p style={{ fontSize: 13, color: '#9ca3af' }}>
            Do diagnóstico à primeira entrega em até 2 semanas.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .step-inner { grid-template-columns: 1fr !important; gap: 20px !important; }
          .step-row { grid-template-columns: 48px 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;
