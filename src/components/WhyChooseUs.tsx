import { ArrowRight } from 'lucide-react';

const metrics = [
  { value: '+50',  label: 'Projetos entregues' },
  { value: '98%',  label: 'Satisfação dos clientes' },
  { value: '90d',  label: 'Prazo médio de ROI' },
  { value: '24/7', label: 'Suporte garantido' },
];

const advantages = [
  {
    title: 'Resultados mensuráveis',
    description: 'Soluções com métricas claras e KPIs definidos. Você acompanha o ROI desde a primeira semana.',
  },
  {
    title: 'Equipe especializada',
    description: 'Expertise técnica em IA com profundo entendimento de negócios para entregar soluções reais.',
  },
  {
    title: 'Implementação ágil',
    description: 'Metodologia que garante entregas rápidas e adaptáveis. Valor tangível desde as primeiras semanas.',
  },
  {
    title: 'Segurança avançada',
    description: 'Os mais altos padrões de segurança da informação, protegendo seus dados e garantindo compliance.',
  },
  {
    title: 'Soluções sob medida',
    description: 'Nada de template genérico. Desenvolvemos tecnologia 100% customizada para sua realidade.',
  },
  {
    title: 'Escalabilidade garantida',
    description: 'Arquitetura projetada para crescer com você. Sem reinvestimentos pesados conforme o negócio escala.',
  },
];

const WhyChooseUs = () => {
  return (
    <section
      id="why-choose-us"
      className="section"
      style={{ background: '#f9fafb', borderTop: '1px solid #e5e7eb' }}
    >
      <div className="container-xl">

        {/* Metrics strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            border: '1px solid #e5e7eb',
            borderRadius: 10,
            overflow: 'hidden',
            marginBottom: 80,
            background: '#ffffff',
          }}
          className="metrics-grid"
        >
          {metrics.map((m, i) => (
            <div
              key={i}
              style={{
                padding: '28px 24px',
                borderRight: i < metrics.length - 1 ? '1px solid #e5e7eb' : 'none',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: '#111827',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                {m.value}
              </p>
              <p style={{ fontSize: 13, color: '#9ca3af' }}>{m.label}</p>
            </div>
          ))}
        </div>

        {/* Main layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 64,
            alignItems: 'start',
          }}
          className="grid-stack"
        >
          {/* Left */}
          <div>
            <span className="section-label">Por que a ConectaOne?</span>
            <h2 className="section-heading" style={{ marginBottom: 16 }}>
              Expertise que transforma desafios em oportunidades
            </h2>
            <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.65, marginBottom: 36 }}>
              Nossa abordagem integra tecnologia avançada com profundo entendimento de negócios.
              Criamos soluções que automatizam processos e impulsionam crescimento sustentável.
            </p>
            <a href="#contact" className="btn btn-primary btn-lg">
              Solicitar consultoria gratuita
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Right — advantages list */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {advantages.map((a, i) => (
              <div
                key={i}
                style={{
                  padding: '20px 0',
                  borderBottom: i < advantages.length - 1 ? '1px solid #e5e7eb' : 'none',
                }}
              >
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#111827',
                    marginBottom: 4,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {a.title}
                </h3>
                <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>
                  {a.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .grid-stack { grid-template-columns: 1fr !important; gap: 40px !important; }
          .metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .metrics-grid > div:nth-child(2) { border-right: none !important; }
          .metrics-grid > div:nth-child(1),
          .metrics-grid > div:nth-child(2) { border-bottom: 1px solid #e5e7eb !important; }
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
