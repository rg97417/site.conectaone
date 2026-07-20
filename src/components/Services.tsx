import { CheckCircle2 } from 'lucide-react';

const sapServices = [
  { title: 'Implantação Completa', desc: 'Mapeamento aderente, go-live seguro e aceleração do Retorno sobre Investimento (ROI) desde os primeiros meses.' },
  { title: 'Suporte e Sustentação', desc: 'Atendimento técnico ágil e proativo para garantir estabilidade operacional e zero paradas sistêmicas.' },
  { title: 'Reforma Tributária', desc: 'Consultoria e adequação completa do seu ambiente SAP Business One às novas exigências fiscais do Brasil.' },
  { title: 'Integrações de Sistemas', desc: 'Unificação do seu ecossistema. Conectamos o SAP a CRMs, e-commerces, bancos e plataformas de logística.' },
  { title: 'Customizações & Add-ons', desc: 'Desenvolvimento de softwares acoplados ao ERP e adequações via SDK para regras de negócio exclusivas.' },
  { title: 'Gestão de Projetos', desc: 'Auditoria técnica, liderança e cronogramas previsíveis para garantir a entrega no prazo e no budget.' },
];

const aiSoftwareServices = [
  { title: 'Plataformas Sob Medida', desc: 'Desenvolvimento de SaaS e sistemas web escaláveis para digitalizar operações complexas e gerar nova receita.' },
  { title: 'IA para Triagem de Leads', desc: 'Assistentes autônomos que conversam, entendem e qualificam leads 24/7, entregando apenas oportunidades quentes.' },
  { title: 'RPA & Power Automate', desc: 'Desenvolvimento de robôs de automação (RPA) para eliminar tarefas manuais e repetitivas em todo o seu backoffice.' },
  { title: 'Sistemas para Times de Vendas', desc: 'Dashboards e CRMs customizados com rastreamento de KPIs em tempo real para controle absoluto da performance.' },
  { title: 'Prospecção (Lead Scrapers)', desc: 'Extração, limpeza e enriquecimento automatizado de dados para escalar de forma cirúrgica o seu outbound B2B.' },
  { title: 'IA de Atendimento', desc: 'Agentes conversacionais focados em retenção, suporte rápido e agendamento automático de reuniões.' },
];

const Services = () => {
  return (
    <section
      id="services"
      className="section"
      style={{ background: '#f4f6f9', borderTop: '1px solid #e5e7eb' }}
    >
      <div className="container-xl">
        {/* Header */}
        <div style={{ marginBottom: 56, textAlign: 'center', maxWidth: 700, margin: '0 auto 64px' }}>
          <span className="section-label" style={{ margin: '0 auto 16px' }}>O Que Entregamos</span>
          <h2 className="section-heading" style={{ color: 'var(--navy)' }}>Duas frentes de especialidade.<br />Um único parceiro de tecnologia.</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Atuamos de ponta a ponta: desde a estrutura robusta do SAP Business One até a inovação de agentes de Inteligência Artificial e softwares sob medida.
          </p>
        </div>

        {/* Dual Pillar Layout */}
        <div className="services-grid" style={{ display: 'grid', gap: '32px' }}>
          
          {/* Pillar 1: SAP B1 */}
          <div 
            style={{ 
              background: '#ffffff', 
              borderRadius: 16, 
              padding: '40px 32px', 
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 24px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{ marginBottom: 32, paddingBottom: 16, borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.02em', margin: 0 }}>
                Consultoria SAP Business One
              </h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {sapServices.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <CheckCircle2 size={20} color="var(--blue)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--navy)', marginBottom: 4 }}>{s.title}</h4>
                    <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pillar 2: AI & Software */}
          <div 
            style={{ 
              background: '#ffffff', 
              borderRadius: 16, 
              padding: '40px 32px', 
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 24px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{ marginBottom: 32, paddingBottom: 16, borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.02em', margin: 0 }}>
                IA, Automações & Software
              </h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {aiSoftwareServices.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <CheckCircle2 size={20} color="var(--blue)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--navy)', marginBottom: 4 }}>{s.title}</h4>
                    <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      
      <style>{`
        @media (min-width: 992px) {
          .services-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </section>
  );
};

export default Services;
