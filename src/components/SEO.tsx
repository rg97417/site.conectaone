import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
}

const SEO = ({ 
  title = "ConectaOne | ERP SAP Business One, Consultoria & IA",
  description = "Consultoria ERP SAP Business One, desenvolvimento de SaaS (como Granazap), integração de SAP com IA, criação de microSaaS e Agentes de IA para vendas e financeiro.",
  canonical = "https://www.conectaone.com"
}: SEOProps) => {
  const keywords = [
    "ERP SAP Business One",
    "consultoria SAP Business One",
    "Como integrar IA com SAP B1",
    "Como conectar SAP com IA",
    "Como criar um microSaaS",
    "Como criar um SaaS",
    "Como criar um SaaS financeiro",
    "Como criar um agente de IA",
    "agentes de IA para vendas",
    "Granazap",
    "Granazap Pro",
    "desenvolvimento de SaaS",
    "trocar de consultoria SAP",
    "inteligência artificial empresas",
    "ConectaOne",
  ];

  // Schema de Organização e B2B Service para SEO Local/Institucional
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ConectaOne",
    "url": "https://www.conectaone.com",
    "logo": "https://www.conectaone.com/conectaone_logo_principal_1200.png",
    "description": "Consultoria especializada em ERP SAP Business One e desenvolvimento de soluções em Inteligência Artificial, RPA e Software Sob Medida (SaaS).",
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
        "name": "Como integrar IA com SAP Business One?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Integrar Inteligência Artificial com SAP B1 permite criar agentes de IA para atendimento, otimizar vendas e conciliação financeira. A ConectaOne conecta LLMs nativamente ao banco de dados SAP usando integrações seguras."
        }
      },
      {
        "@type": "Question",
        "name": "Como criar um agente de IA para vendas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Para criar um agente de IA, mapeamos o seu fluxo de vendas, conectamos ao seu ERP ou CRM, e treinamos a inteligência artificial para responder objeções, enviar propostas e fechar negócios automaticamente, operando 24/7."
        }
      },
      {
        "@type": "Question",
        "name": "Como criar um SaaS ou microSaaS financeiro?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Desenvolvemos o seu SaaS ou microSaaS do zero (como fizemos com o Granazap e Granazap Pro). Desde a estruturação do banco de dados, arquitetura multitenant, até os painéis de dashboard e módulos financeiros completos."
        }
      },
      {
        "@type": "Question",
        "name": "O que é o Granazap e o Granazap Pro?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O Granazap é um exemplo de SaaS financeiro desenvolvido para revolucionar o controle de gastos direto pelo WhatsApp. Desenvolvemos soluções SaaS sob medida como essa para nossos clientes."
        }
      },
      {
        "@type": "Question",
        "name": "Como trocar de consultoria SAP Business One?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A transição de consultoria SAP B1 para a ConectaOne é feita sem impacto na sua operação. Realizamos uma auditoria técnica do seu ambiente, estabilizamos processos críticos e assumimos a gestão com SLA rápido."
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