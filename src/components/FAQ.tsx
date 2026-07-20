import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Como a IA pode beneficiar minha empresa?",
    answer: "Nossa IA otimiza processos, reduz custos operacionais e aumenta a eficiência através de automação inteligente, análise preditiva e integração de sistemas. Clientes relatam redução de até 70% em custos operacionais.",
  },
  {
    question: "Quanto tempo leva para implementar as soluções?",
    answer: "Soluções básicas são implementadas em 2–3 semanas. Projetos mais complexos levam de 1–2 meses. Desenvolvemos um cronograma detalhado baseado nas suas necessidades específicas.",
  },
  {
    question: "Preciso ter conhecimento técnico para usar as soluções?",
    answer: "Não. Nossas soluções são desenvolvidas com foco na usabilidade, com interfaces intuitivas e treinamento completo para sua equipe. Oferecemos suporte contínuo para garantir o máximo aproveitamento.",
  },
  {
    question: "Como é feito o suporte após a implementação?",
    answer: "Oferecemos suporte técnico dedicado, monitoramento contínuo e manutenção preventiva. Nossa equipe está disponível para ajustes, melhorias e resolução de dúvidas.",
  },
  {
    question: "As soluções podem ser personalizadas para meu negócio?",
    answer: "Sim. Todas as nossas soluções são customizadas para atender às necessidades específicas do seu negócio. Realizamos análise detalhada dos seus processos e objetivos para desenvolver uma solução sob medida.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      className="section"
      style={{ background: '#f9fafb', borderTop: '1px solid #e5e7eb' }}
    >
      <div className="container-xl">

        <div style={{ marginBottom: 48 }}>
          <span className="section-label">FAQ</span>
          <h2 className="section-heading">Perguntas frequentes</h2>
        </div>

        <div style={{ maxWidth: 720 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderTop: '1px solid #e5e7eb' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  padding: '20px 0',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 500, color: '#111827', letterSpacing: '-0.01em' }}>
                  {faq.question}
                </span>
                {open === i
                  ? <Minus size={16} style={{ color: '#9ca3af', flexShrink: 0 }} />
                  : <Plus size={16} style={{ color: '#9ca3af', flexShrink: 0 }} />
                }
              </button>
              {open === i && (
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.65, paddingBottom: 20 }}>
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
          <div style={{ borderTop: '1px solid #e5e7eb' }} />
        </div>
      </div>
    </section>
  );
};

export default FAQ;