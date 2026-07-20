import { ArrowRight } from 'lucide-react';
import { CanvasText } from './ui/CanvasText';

const whatsappUrl =
  'https://api.whatsapp.com/send/?phone=5511974178200&text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+as+solu%C3%A7%C3%B5es+personalizadas+da+ConectaOne.&type=phone_number&app_absent=0';

const Hero = () => {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 72,
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <div className="container-xl hero-container" style={{ width: '100%' }}>
        <div style={{ maxWidth: 820 }}>

          {/* Eyebrow */}
          <span
            className="fade-up"
            style={{
              display: 'inline-block',
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--blue)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: 24,
              fontFamily: 'monospace',
            }}
          >
            SOLUÇÕES DE ALTA PERFORMANCE PARA NEGÓCIOS B2B
          </span>

          {/* H1 — duas linhas, dois públicos */}
          <h1
            className="fade-up delay-1 hero-headline"
            style={{
              fontSize: 'clamp(28px, 5vw, 62px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: 'var(--text)',
              marginBottom: 32,
            }}
          >
            {/* Linha 1 — SAP */}
            <span style={{ display: 'block', marginBottom: 8 }}>
              Consultoria{' '}
              <CanvasText
                text="SAP Business One"
                bgColor="#0B1220"
                colors={[
                  'rgba(255,255,255,0.16)',
                  'rgba(255,255,255,0.10)',
                  'rgba(255,255,255,0.06)',
                  'rgba(255,255,255,0.04)',
                  'rgba(255,255,255,0.02)',
                ]}
                lineGap={5}
                animationSpeed={0.3}
              />
            </span>

            {/* Linha 2 — IA / Software */}
            <span style={{ display: 'block', color: 'var(--text)' }}>
              {/* Desktop version (single block) */}
              <span className="hidden-mobile">
                <CanvasText
                  text="IA, Software & Automações"
                  bgColor="#2563EB"
                  colors={[
                    'rgba(255,255,255,0.18)',
                    'rgba(255,255,255,0.12)',
                    'rgba(255,255,255,0.07)',
                    'rgba(255,255,255,0.04)',
                    'rgba(255,255,255,0.02)',
                  ]}
                  lineGap={5}
                  animationSpeed={0.28}
                />
              </span>
              
              {/* Mobile version (split into two tight blocks) */}
              <span className="show-mobile-block" style={{ display: 'none' }}>
                <CanvasText
                  text="IA, Software &"
                  bgColor="#2563EB"
                  colors={['rgba(255,255,255,0.18)', 'rgba(255,255,255,0.12)']}
                  lineGap={5}
                  animationSpeed={0.28}
                />
                <br />
                <CanvasText
                  text="Automações"
                  bgColor="#2563EB"
                  colors={['rgba(255,255,255,0.18)', 'rgba(255,255,255,0.12)']}
                  lineGap={5}
                  animationSpeed={0.28}
                />
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="fade-up delay-2"
            style={{
              fontSize: 17,
              color: 'var(--muted)',
              lineHeight: 1.65,
              maxWidth: 560,
              marginBottom: 20,
            }}
          >
            Da implantação e consultoria SAP Business One ao desenvolvimento de
            agentes de IA, automações, SaaS e software sob medida — uma equipe
            especializada para cada etapa do seu crescimento.
          </p>

          {/* Service tags */}
          <div
            className="fade-up delay-3"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              marginBottom: 40,
            }}
          >
            {[
              'Consultoria SAP B1',
              'Implantação SAP',
              'Agentes de IA',
              'Automações',
              'Desenvolvimento de Software',
              'SaaS',
              'Landing Pages',
              'Integrações',
            ].map((tag, i) => (
              <span
                key={i}
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: 'var(--muted)',
                  background: 'var(--bg-2)',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  padding: '4px 10px',
                  fontFamily: 'monospace',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div
            className="fade-up delay-4 hero-ctas"
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 64 }}
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              Falar com especialista
              <ArrowRight size={16} />
            </a>
            <a href="#services" className="btn btn-outline btn-lg">
              Ver soluções
            </a>
          </div>

          {/* Metrics */}
          <div
            className="fade-up delay-5 hero-metrics"
            style={{
              display: 'flex',
              gap: 40,
              flexWrap: 'wrap',
              paddingTop: 32,
              borderTop: '1px solid #e5e7eb',
            }}
          >
            {[
              { value: '+50',  label: 'Projetos entregues' },
              { value: '90d',  label: 'Prazo médio para ROI' },
              { value: '98%',  label: 'Satisfação dos clientes' },
            ].map((m, i) => (
              <div key={i}>
                <p
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                    color: 'var(--text)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {m.value}
                </p>
                <p style={{ fontSize: 13, color: 'var(--muted)' }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .hero-container {
          padding: 80px 24px;
        }
        /* Mobile fixes */
        @media (max-width: 480px) {
          .hero-container { padding: 40px 24px !important; }
          .hero-headline { font-size: clamp(24px, 7vw, 38px) !important; line-height: 1.2 !important; }
          .hero-headline span[style] { display: block; margin-bottom: 6px; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
