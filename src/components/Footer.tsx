import { ArrowRight, Mail, Phone, Linkedin } from 'lucide-react';

const whatsappUrl = "https://api.whatsapp.com/send/?phone=5511974178200&text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+as+solu%C3%A7%C3%B5es+personalizadas+da+ConectaOne.&type=phone_number&app_absent=0";

const solutions = [
  'IA para Empresas',
  'Automação de Processos',
  'Integração de Sistemas',
  'Análise Preditiva',
  'Atendimento Inteligente',
  'SAP Business One',
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      {/* Final CTA */}
      <section
        style={{
          borderTop: '1px solid #e5e7eb',
          background: '#f9fafb',
          padding: '80px 0',
        }}
      >
        <div
          className="container-xl footer-cta"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 32,
          }}
        >
          <div>
            <h2
              style={{
                fontSize: 'clamp(22px, 3.5vw, 36px)',
                fontWeight: 700,
                color: '#111827',
                letterSpacing: '-0.03em',
                lineHeight: 1.2,
                marginBottom: 8,
              }}
            >
              Pronto para automatizar seu negócio?
            </h2>
            <p style={{ fontSize: 15, color: '#6b7280' }}>
              Mais de 50 empresas já escalaram resultados com a ConectaOne.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }} className="footer-cta-btns">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              Falar com especialista
              <ArrowRight size={16} />
            </a>
            <a href="#services" className="btn btn-outline btn-lg">
              Ver soluções
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e5e7eb', background: '#ffffff' }}>
        <div className="container-xl" style={{ padding: '48px 24px 32px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              gap: 48,
              marginBottom: 40,
            }}
            className="footer-grid"
          >
            {/* Brand */}
            <div>
              <img
                src="/conectaone_logo_principal_1200.png"
                alt="ConectaOne"
                style={{ height: 45, width: 'auto', marginBottom: 16 }}
              />
              <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.65, maxWidth: 280, marginBottom: 20 }}>
                Transformamos empresas com automação e inteligência artificial. Resultados mensuráveis desde os primeiros 90 dias.
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                {[
                  { href: 'https://www.linkedin.com/company/conectaone', icon: <Linkedin size={15} />, label: 'LinkedIn' },
                  { href: whatsappUrl, icon: (
                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.4 3.6C18.2 1.4 15.2 0 12 0 5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.7 6L0 24l6.2-1.6c1.8 1 3.8 1.5 5.8 1.5 6.6 0 12-5.4 12-12 0-3.2-1.4-6.2-3.6-8.4z"/>
                    </svg>
                  ), label: 'WhatsApp' },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 8,
                      border: '1px solid #e5e7eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#9ca3af',
                      transition: 'color 0.15s, border-color 0.15s',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.color = '#6b7280';
                      el.style.borderColor = '#d1d5db';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.color = '#9ca3af';
                      el.style.borderColor = '#e5e7eb';
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Solutions */}
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#111827', marginBottom: 16, letterSpacing: '-0.01em' }}>
                Soluções
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {solutions.map((item, i) => (
                  <li key={i}>
                    <a
                      href="#services"
                      style={{ fontSize: 13, color: '#6b7280', transition: 'color 0.15s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#111827'}
                      onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#6b7280'}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#111827', marginBottom: 16, letterSpacing: '-0.01em' }}>
                Contato
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a
                  href="mailto:contato@conectaone.com"
                  style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6b7280', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#111827'}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#6b7280'}
                >
                  <Mail size={13} />
                  contato@conectaone.com
                </a>
                <a
                  href="tel:+5511974178200"
                  style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6b7280', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#111827'}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#6b7280'}
                >
                  <Phone size={13} />
                  +55 (11) 97417-8200
                </a>
                <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>Seg–Sex: 9h às 18h</p>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div
            style={{
              borderTop: '1px solid #f3f4f6',
              paddingTop: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <p style={{ fontSize: 12, color: '#9ca3af' }}>
              © {year} ConectaOne. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </>
  );
};

export default Footer;
