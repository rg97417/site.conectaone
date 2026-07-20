import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
}

const SEO = ({ 
  title = "ConectaOne | Consultoria SAP Business One & Soluções em IA",
  description = "Acelere seu negócio com a ConectaOne. Especialistas em implantação SAP Business One, troca de consultoria, desenvolvimento de SaaS, CRM com IA e RPA (Power Automate) para empresas B2B.",
  canonical = "https://conectaone.com.br"
}: SEOProps) => {
  const keywords = [
    "consultoria SAP Business One",
    "trocar de consultoria SAP",
    "implantação SAP B1",
    "desenvolvimento de SaaS",
    "automação de processos",
    "RPA",
    "Power Automate",
    "agentes de IA para vendas",
    "inteligência artificial empresas",
    "ConectaOne",
  ];

  // Schema de Organização e B2B Service para SEO Local/Institucional
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ConectaOne",
    "url": "https://conectaone.com.br",
    "logo": "https://conectaone.com.br/conectaone_logo_principal_1200.png",
    "description": "Consultoria especializada em SAP Business One e desenvolvimento de soluções em Inteligência Artificial, RPA e Software Sob Medida (SaaS).",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BR"
    },
    "sameAs": [
      "https://www.linkedin.com/company/conectaone"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Como trocar de consultoria SAP Business One?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A transição de consultoria SAP B1 para a ConectaOne é feita sem impacto na sua operação. Realizamos uma auditoria técnica do seu ambiente, estabilizamos processos críticos e assumimos a gestão com SLA rápido."
        }
      },
      {
        "@type": "Question",
        "name": "Vocês desenvolvem SaaS e soluções customizadas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim. Desenvolvemos plataformas SaaS robustas, CRMs customizados e agentes de IA integrados ao seu ecossistema atual (inclusive SAP) para otimizar vendas e reduzir custos operacionais."
        }
      },
      {
        "@type": "Question",
        "name": "Como a Automação e RPA podem ajudar minha empresa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Através de tecnologias como Power Automate e IA, eliminamos tarefas manuais e repetitivas no seu backoffice. Isso gera ROI imediato ao liberar sua equipe para atividades estratégicas."
        }
      },
      {
        "@type": "Question",
        "name": "As soluções podem ser personalizadas para meu negócio?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim. Todas as nossas soluções são customizadas para atender às necessidades específicas do seu negócio. Realizamos uma análise detalhada dos seus processos e objetivos para desenvolver uma solução sob medida."
        }
      }
    ]
  };

  return (
    <Helmet>
      {/* Títulos e Descrições Básicas */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />

      {/* Links Canônicos e Alternativas */}
      <link rel="canonical" href={canonical} />
      <link rel="alternate" href={`${canonical}`} hrefLang="pt-BR" />

      {/* Open Graph - Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="ConectaOne" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:image" content={`${canonical}/og-image.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${canonical}/og-image.png`} />

      {/* Metadados Estruturados - Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      {/* Tags Adicionais */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="ConectaOne" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="theme-color" content="#2563eb" />
      
      {/* Meta tags adicionais para SEO */}
      <meta name="geo.region" content="BR-SP" />
      <meta name="geo.placename" content="São Paulo" />
      <meta name="geo.position" content="-23.5505;-46.6333" />
      <meta name="ICBM" content="-23.5505, -46.6333" />
      <meta name="language" content="pt-BR" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="7 days" />
      <meta name="expires" content="never" />
      <meta name="coverage" content="Worldwide" />
      <meta name="target" content="all" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="format-detection" content="telephone=no" />
    </Helmet>
  );
};

export default SEO; 