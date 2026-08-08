/**
 * Enhanced Schema.org Implementations for ConectaOne Blog
 *
 * This file contains all structured data schemas optimized for:
 * - Rich snippets (FAQ, HowTo, BreadcrumbList)
 * - E-E-A-T signals (Organization, Person, LocalBusiness)
 * - Google Search Console visibility
 *
 * Priority Implementation Order:
 * 1. BreadcrumbList (universal, high impact)
 * 2. Enhanced FAQ schemas (top 15 articles)
 * 3. Organization schema (global site)
 * 4. Service schemas (product pages)
 * 5. LocalBusiness (contact/about pages)
 */

import { BlogPost } from '@/data/blogPosts';

// ============================================================================
// PRIORITY 1: BREADCRUMB SCHEMA (Universal - Add to all blog posts)
// ============================================================================

export const getBreadcrumbSchema = (post: BlogPost) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://conectaone.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://conectaone.com/#insights"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.category,
        "item": `https://conectaone.com/#insights?category=${encodeURIComponent(post.category)}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": post.title,
        "item": `https://conectaone.com/blog/${post.slug}`
      }
    ]
  };
};

// ============================================================================
// PRIORITY 2: ENHANCED FAQ SCHEMAS (Top 15 Strategic Articles)
// ============================================================================

/**
 * Returns custom FAQ schema based on article slug
 * These are highly optimized for featured snippets and People Also Ask boxes
 */
export const getEnhancedFAQSchema = (slug: string) => {
  const faqSchemas: Record<string, any> = {

    // Article 1: SAP IA - 5 Casos Reais (High commercial intent)
    "5-casos-reais-ia-sap-business-one-2026": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Como integrar IA ao SAP Business One?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A integração é feita através do Service Layer (APIs REST nativas do SAP B1). Conecte LLMs como GPT-4o, Claude 3.5 Sonnet ou Gemini usando ferramentas de automação (n8n, Power Automate, Make.com). Garanta segurança com autenticação OAuth 2.0 e conformidade LGPD/ISO 27001."
          }
        },
        {
          "@type": "Question",
          "name": "Quais os casos de uso reais de IA no SAP Business One?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "1) Chatbot WhatsApp para consulta de estoque e pedidos em tempo real; 2) Agente de vendas autônomo que qualifica leads via e-mail/WhatsApp; 3) Automação de conciliação bancária com IA; 4) Geração automática de relatórios executivos; 5) Análise preditiva de demanda para compras."
          }
        },
        {
          "@type": "Question",
          "name": "Quanto custa implementar IA no SAP Business One?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Entre R$ 15.000 e R$ 50.000 dependendo da complexidade. Inclui: desenvolvimento (2-4 semanas), APIs de LLMs (~R$ 500-2.000/mês), infraestrutura cloud (~R$ 300/mês) e treinamento. ROI médio alcançado em 2-6 meses com redução de 40-70% em tarefas manuais."
          }
        },
        {
          "@type": "Question",
          "name": "SAP Joule ou agente de IA customizado: qual escolher?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Para SAP Business One, agentes customizados são recomendados em 90% dos casos. Vantagens: ROI rápido (2-4 semanas vs 3-6 meses), custo menor (pay-per-use vs licenças SAP), personalização total, integração com WhatsApp/e-mail. SAP Joule é ideal para S/4HANA Cloud com alto investimento."
          }
        }
      ]
    },

    // Article 2: Custos SAP Business One (High search volume)
    "quanto-custa-implementar-sap-business-one-breakdown-completo": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Quanto custa implementar o SAP Business One em 2026?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Investimento total entre R$ 80.000 e R$ 350.000 para empresas de médio porte (50-200 usuários). Inclui: licenças SAP (~R$ 3.000-5.000/usuário), projeto de implantação (R$ 40k-150k), infraestrutura cloud (R$ 1.500-5.000/mês), customizações e treinamento. Projeto completo leva 3-6 meses."
          }
        },
        {
          "@type": "Question",
          "name": "Qual a diferença de custo entre SAP B1 on-premise e cloud?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cloud: CAPEX menor (sem servidor físico), OPEX previsível (R$ 1.500-5.000/mês por infraestrutura), atualizações automáticas, escalabilidade instantânea. On-premise: CAPEX alto (servidor + licenças MS SQL ~R$ 50k-100k), OPEX com TI interno, controle total de dados. Cloud vence em 70% dos casos B2B."
          }
        },
        {
          "@type": "Question",
          "name": "Quais módulos do SAP Business One são essenciais?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Core obrigatório: Financeiro, Vendas, Compras, Estoque e Produção (se indústria). Módulos avançados: MRP (planejamento), CRM (relacionamento), Service (pós-venda). Add-ons fiscais brasileiros (Triple One, Skill) são OBRIGATÓRIOS para emissão de NF-e/SPED. Conte com 60% do budget para módulos core."
          }
        },
        {
          "@type": "Question",
          "name": "Como reduzir custos de consultoria SAP Business One?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "1) Evite over-customização: use workflows nativos do SAP; 2) Adote integrações via API em vez de add-ons caros; 3) Treine key-users internos para suporte N1; 4) Escolha consultoria com SLA fixo (evite hora técnica); 5) Automatize processos com RPA/IA para reduzir dependência de suporte."
          }
        }
      ]
    },

    // Article 3: SAP vs Totvs (Comparison - high intent)
    "sap-business-one-vs-totvs-protheus-erp-comparacao-2026": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "SAP Business One ou Totvs Protheus: qual o melhor ERP?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SAP B1: melhor para empresas com operação internacional, necessidade de compliance global (SOX, IFRS), integrações complexas e escalabilidade. Totvs: ideal para empresas 100% Brasil, foco fiscal brasileiro, menor investimento inicial. SAP vence em tecnologia e cloud; Totvs em localização fiscal."
          }
        },
        {
          "@type": "Question",
          "name": "Qual ERP é mais barato: SAP Business One ou Totvs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Investimento inicial: Totvs Protheus é 20-30% mais barato (R$ 60k-200k vs R$ 80k-350k do SAP). TCO 5 anos: SAP B1 pode ser mais econômico devido a menor custo de customização, APIs nativas robustas e cloud otimizado. Totvs tem custo de manutenção alto por depender de DBAs e infraestrutura legada."
          }
        },
        {
          "@type": "Question",
          "name": "SAP Business One tem módulo fiscal brasileiro?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim, através de add-ons homologados pela SAP: Triple One (líder de mercado), Skill e Vistex. Cobrem NF-e, NFC-e, CT-e, MDF-e, SPED Fiscal/Contribuições, Reinf, eSocial e Nova Reforma Tributária (IBS/CBS). Add-on fiscal custa R$ 15k-40k + manutenção anual (~20% do valor)."
          }
        },
        {
          "@type": "Question",
          "name": "É possível migrar de Totvs para SAP Business One?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim, mas requer projeto estruturado: 1) Mapeamento de processos (As-Is vs To-Be); 2) ETL de dados (clientes, produtos, saldos); 3) Validação fiscal (conferência de impostos); 4) Testes em paralelo (3-6 meses); 5) Treinamento de usuários. Prazo médio: 6-9 meses. ConectaOne realiza migrações com zero parada de operação."
          }
        }
      ]
    },

    // Article 4: Arquitetura IA SAP (Technical deep-dive)
    "sap-business-one-ia-arquitetura-seguranca-n8n": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Como funciona a arquitetura de IA integrada ao SAP B1?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Arquitetura em 4 camadas: 1) SAP B1 Service Layer (APIs REST); 2) Camada de orquestração (n8n/Power Automate); 3) LLM (OpenAI, Claude, Gemini); 4) Interface (WhatsApp, e-mail, portal). Fluxo: usuário consulta via chat → n8n valida sessão → LLM processa → Service Layer busca dados → resposta formatada em <3s."
          }
        },
        {
          "@type": "Question",
          "name": "Quais ferramentas usar para conectar IA ao SAP Business One?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Orquestração: n8n (open-source, melhor custo-benefício), Power Automate (empresas Microsoft 365), Make.com. LLMs: OpenAI GPT-4o (melhor para português), Claude 3.5 Sonnet (raciocínio complexo), Gemini 2.0 Flash (velocidade). Interface: Evolution API (WhatsApp), Twilio (SMS), Langchain (agentes autônomos)."
          }
        },
        {
          "@type": "Question",
          "name": "Como garantir segurança em integrações de IA com SAP?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "1) OAuth 2.0 + SSL/TLS para autenticação Service Layer; 2) Nunca envie senhas de usuários SAP para LLMs; 3) Logs auditáveis (quem consultou o quê); 4) Rate limiting (evita ataques DDoS); 5) Anonimização de dados pessoais (LGPD); 6) VPN/VPC para tráfego cloud. Certificação ISO 27001 recomendada."
          }
        }
      ]
    },

    // Article 5: SAP Joule vs Custom Agents
    "sap-joule-vs-agentes-ia-customizados-comparacao": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "O que é SAP Joule?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SAP Joule é o copiloto de IA generativa nativo da SAP, lançado em 2023. Integra-se a S/4HANA Cloud, SuccessFactors, Ariba e SAP Analytics Cloud. Funcionalidades: consultas em linguagem natural, automação de workflows, insights preditivos e geração de código ABAP. Disponível via licença SAP Cloud (adicional ao ERP)."
          }
        },
        {
          "@type": "Question",
          "name": "SAP Joule funciona com SAP Business One?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Não oficialmente (até 2026). Joule é projetado para S/4HANA Cloud e SAP BTP. Para SAP B1, a solução é construir agentes customizados usando Service Layer + LLMs externos (OpenAI, Claude). Vantagem: custo menor, flexibilidade total, integração com WhatsApp/e-mail, ROI em 2-4 semanas."
          }
        },
        {
          "@type": "Question",
          "name": "Quanto custa o SAP Joule?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Modelo de licenciamento: por usuário ou por consumo (tokens). Estimativa: US$ 50-150/usuário/mês (adicional às licenças SAP). Requer S/4HANA Cloud + SAP BTP (Business Technology Platform). Investimento inicial: US$ 100k-500k. Agentes customizados custam 60-80% menos e entregam ROI mais rápido."
          }
        }
      ]
    },

    // Article 6: Chatbot WhatsApp SAP
    "como-criar-chatbot-whatsapp-consulta-sap-business-one": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Como criar chatbot WhatsApp integrado ao SAP Business One?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Stack técnica: 1) Evolution API (WhatsApp oficial); 2) n8n (orquestração de workflows); 3) Service Layer SAP B1 (APIs REST); 4) OpenAI GPT-4o (inteligência conversacional). Fluxo: cliente pergunta no WhatsApp → n8n processa → GPT entende intenção → Service Layer retorna dados → resposta formatada. Implementação: 2-3 semanas."
          }
        },
        {
          "@type": "Question",
          "name": "Quais informações o chatbot pode consultar no SAP B1?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vendas: pedidos, notas fiscais, boletos em aberto, histórico de compras. Estoque: disponibilidade de produtos, preços, prazos de entrega. Financeiro: saldo devedor, 2ª via de boleto, extrato de conta corrente. Produção: status de ordens, previsão de conclusão. Limitações: não permite alterações críticas (apenas consultas e ações pré-aprovadas)."
          }
        },
        {
          "@type": "Question",
          "name": "Qual o custo de um chatbot WhatsApp para SAP Business One?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Desenvolvimento: R$ 8.000-25.000 (dependendo da complexidade). Mensalidade: Evolution API (R$ 300-800/mês), n8n self-hosted (R$ 0) ou cloud (R$ 300/mês), OpenAI GPT-4o (R$ 500-2.000/mês baseado em uso). Total mensal: R$ 800-3.000. ROI alcançado em 2-4 meses com redução de 60% em atendimento manual."
          }
        }
      ]
    },

    // Article 7: RPA Power Automate
    "rpa-power-automate-reduzindo-trabalho-manual": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "O que é RPA (Robotic Process Automation)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "RPA é tecnologia que automatiza tarefas repetitivas executadas por humanos em sistemas digitais. Robôs de software replicam ações como preencher formulários, extrair dados de e-mails, conciliar planilhas, fazer login em portais bancários. Plataformas líderes: Power Automate (Microsoft), UiPath, Automation Anywhere."
          }
        },
        {
          "@type": "Question",
          "name": "Como RPA reduz custos em processos financeiros?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Exemplos reais: 1) Conciliação bancária: redução de 8h/dia para 30 min (90% menos tempo); 2) Cobrança automatizada: envio de boletos/e-mails sem intervenção humana; 3) Auditoria de notas fiscais: validação automática de XML vs pedidos de compra. ROI médio: 3-6 meses. Custo: R$ 10k-40k (projeto) + R$ 500-2.000/mês (licenças)."
          }
        },
        {
          "@type": "Question",
          "name": "Power Automate ou UiPath: qual escolher?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Power Automate: melhor para empresas Microsoft 365, integração nativa com SAP/Dynamics, licenciamento por usuário (já incluído em E3/E5), interface low-code. UiPath: líder em automação desktop complexa, forte em OCR/Computer Vision, melhor para projetos enterprise multi-plataforma. Custo: PA (~R$ 300/mês/user) vs UiPath (~R$ 800-1.500/mês/robot)."
          }
        }
      ]
    },

    // Article 8: Migração Cloud SAP
    "migracao-sap-business-one-aws-hana-guia-tecnico-2026": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Vale a pena migrar SAP Business One para cloud?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim para 80% das empresas. Benefícios: redução de 40-60% em custos de infraestrutura, eliminação de CAPEX (servidor físico), DR/backup automático, escalabilidade instantânea, acesso remoto seguro, atualizações sem downtime. Melhor ROI: empresas com 20+ usuários, multi-filiais ou trabalho híbrido."
          }
        },
        {
          "@type": "Question",
          "name": "AWS ou Azure para SAP Business One HANA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AWS: líder em infraestrutura SAP (certificação oficial), instâncias otimizadas (x1e, r5), melhor custo-benefício (~30% mais barato), suporte SAP nativo. Azure: melhor para empresas Microsoft-first, integração com AD/Office 365, licenciamento híbrido. Recomendação: AWS para SAP puro; Azure para stack Microsoft completo."
          }
        },
        {
          "@type": "Question",
          "name": "Quanto custa hospedar SAP B1 HANA na cloud?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AWS: R$ 2.500-8.000/mês dependendo de usuários e volumetria (instâncias r5.2xlarge a r5.8xlarge). Inclui: compute, storage (SSD), backup S3, data transfer. Custos extras: VPN (R$ 300/mês), DR (disaster recovery ~40% do custo primário), monitoramento CloudWatch. Economia vs on-premise: 40-50% em 3 anos (TCO)."
          }
        }
      ]
    },

    // Article 9: Automação n8n SAP
    "automacao-n8n-erp-sap-business-one": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "O que é n8n e como integrar ao SAP Business One?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "n8n é plataforma open-source de automação de workflows (alternativa ao Zapier/Make.com). Integração SAP B1: usa nó HTTP Request para chamar Service Layer APIs (REST). Casos de uso: sincronizar pedidos com e-commerce, enviar NF-e por e-mail automaticamente, criar relatórios e enviar via WhatsApp, integrar CRM externo."
          }
        },
        {
          "@type": "Question",
          "name": "n8n é melhor que Power Automate para SAP B1?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vantagens n8n: open-source (custo zero), self-hosted (controle total de dados), comunidade ativa, integrações ilimitadas. Vantagens Power Automate: suporte Microsoft oficial, UI mais intuitiva, conectores nativos SAP, governança enterprise. Recomendação: n8n para budgets apertados e DevOps interno; PA para empresas Microsoft 365."
          }
        },
        {
          "@type": "Question",
          "name": "Quanto custa implementar automação com n8n?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Desenvolvimento: R$ 5.000-20.000 (dependendo da complexidade dos workflows). Hospedagem: self-hosted (R$ 200-500/mês em VPS) ou n8n Cloud (R$ 300-1.200/mês). Manutenção: R$ 500-2.000/mês (suporte técnico). ROI: 2-4 meses. Economia típica: 30-60h/mês de trabalho manual eliminado."
          }
        }
      ]
    },

    // Article 10: Agentes IA Vendas
    "agentes-de-ia-para-vendas-b2b": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "O que é um agente de IA para vendas (AI SDR)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Agente autônomo de IA que executa tarefas de SDR (Sales Development Representative): prospecção de leads, qualificação via BANT, follow-up por e-mail/WhatsApp, agendamento de reuniões. Usa LLMs (GPT-4o, Claude) + CRM + automação. Opera 24/7, responde <1 min, personaliza conversas em escala. ROI: 3x mais reuniões qualificadas com 60% menos custo."
          }
        },
        {
          "@type": "Question",
          "name": "Como criar um agente de vendas com IA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Stack: 1) LLM (OpenAI, Claude, Gemini); 2) CRM (HubSpot, Pipedrive, RD Station); 3) Automação (n8n, Make.com); 4) Canal (e-mail via SendGrid, WhatsApp via Evolution API). Workflow: lead entra no CRM → trigger automático → IA envia mensagem personalizada → qualifica BANT → agenda reunião no Google Calendar. Desenvolvimento: 3-6 semanas."
          }
        },
        {
          "@type": "Question",
          "name": "Qual o custo de um agente de IA para vendas?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Desenvolvimento: R$ 15.000-40.000. Mensalidade: LLM (R$ 800-3.000), CRM (R$ 300-1.500), automação (R$ 300-800), infraestrutura (R$ 200-500). Total: R$ 1.600-5.800/mês. Comparado a SDR humano (R$ 6.000-12.000/mês + encargos), ROI em 2-3 meses. Produtividade: 10x mais leads contatados simultaneamente."
          }
        }
      ]
    },

    // Article 11: Como criar SaaS B2B
    "como-criar-um-saas-b2b-com-ia": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Como criar um SaaS B2B do zero?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "1) Validar problema (entrevistas com 20+ potenciais clientes); 2) Definir MVP (funcionalidades core); 3) Escolher stack (React/Next.js + Node.js + PostgreSQL); 4) Desenvolver (3-6 meses); 5) Beta test (10-20 early adopters); 6) GTM (Go-to-Market strategy); 7) Escalar. Investimento: R$ 80k-300k (dev + marketing). Prazo break-even: 12-18 meses."
          }
        },
        {
          "@type": "Question",
          "name": "Como integrar IA em um SaaS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Casos de uso: 1) Geração de conteúdo (propostas, contratos, e-mails); 2) Análise preditiva (churn, upsell); 3) Chatbot de suporte; 4) Automação de workflows. Stack: OpenAI API, LangChain (orquestração), vector databases (Pinecone, Weaviate) para RAG. Custo adicional: R$ 500-5.000/mês dependendo do uso. Diferencial competitivo: ticket 30-50% maior."
          }
        },
        {
          "@type": "Question",
          "name": "Qual o custo de desenvolvimento de um SaaS B2B?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "MVP: R$ 80.000-180.000 (3-6 meses, time de 3-5 devs). Produto completo: R$ 250k-800k (12-18 meses). Stack cloud: AWS/Azure (~R$ 1.500-5.000/mês). Marketing: R$ 30k-100k/mês (growth). Time mínimo: 1 tech lead, 2 devs full-stack, 1 designer UX, 1 PM. Alternativa low-cost: no-code (Bubble, Retool) para validação rápida."
          }
        }
      ]
    },

    // Article 12: Consultoria SAP IA
    "consultoria-sap-business-one-ia-implementacao": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "O que faz uma consultoria SAP Business One?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Serviços: 1) Implementação completa (análise As-Is, parametrização, go-live); 2) Customização e add-ons; 3) Integrações (e-commerce, CRM, logística); 4) Suporte técnico (SLA 24/7); 5) Treinamento de usuários; 6) Upgrade de versões; 7) Otimização de performance. Consultoria premium: +IA, RPA, arquitetura cloud, migração de ERPs legados."
          }
        },
        {
          "@type": "Question",
          "name": "Como escolher consultoria SAP Business One?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Critérios: 1) Certificação SAP Gold Partner; 2) Cases no seu segmento (indústria, distribuição, varejo); 3) Metodologia estruturada (ASAP, Agile); 4) SLA transparente (tempo de resposta garantido); 5) Expertise em cloud e IA; 6) Preço fixo vs hora técnica. Red flags: consultoria que não mostra código-fonte, cobra por tickets triviais, não documenta customizações."
          }
        },
        {
          "@type": "Question",
          "name": "Quanto custa consultoria SAP Business One por hora?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hora técnica: R$ 250-600 (dependendo da senioridade e região). Projetos fixos: mais econômicos (10-30% desconto vs hora). Retainer mensal (suporte): R$ 3.000-15.000 (inclui X horas de atendimento). ConectaOne pratica modelo híbrido: projetos com escopo fechado + SLA mensal para sustentação. Evite consultorias que só cobram por hora (incentivo errado)."
          }
        }
      ]
    },

    // Article 13: IA RH Recrutamento
    "ia-rh-onboarding-recrutamento": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Como IA pode melhorar o recrutamento?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Aplicações: 1) Triagem de currículos (IA ranqueia candidatos por fit); 2) Entrevistas assíncronas (bot faz perguntas, analisa respostas); 3) Assessment de soft skills (NLP analisa comportamento); 4) Matching candidato-vaga (ML recomenda melhores fits); 5) Redação de job descriptions. Redução: 60-80% no tempo de triagem. Ferramentas: HireVue, Pymetrics, Gupy (Brasil)."
          }
        },
        {
          "@type": "Question",
          "name": "IA substitui recrutadores?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Não, mas transforma o papel. IA automatiza tarefas repetitivas (triagem, agendamento, follow-up). Recrutador foca em: entrevistas finais, avaliação cultural, negociação, employer branding. Tendência: recrutador vira 'talent strategist'. Empresas que adotam IA reduzem time-to-hire em 40% e aumentam qualidade de contratação em 25% (dados Gartner 2025)."
          }
        },
        {
          "@type": "Question",
          "name": "Como automatizar onboarding com IA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Fluxo: 1) Chatbot recebe novo funcionário no dia 1, tira dúvidas; 2) IA gera checklist personalizada (por cargo/área); 3) RPA cria acessos em sistemas (e-mail, ERP, CRM); 4) LLM resume políticas internas e responde perguntas; 5) Gamificação de treinamentos. Resultado: redução de 70% em tempo de RH, satisfação de novos colaboradores 35% maior (NPS)."
          }
        }
      ]
    },

    // Article 14: Atendimento IA Generativa
    "atendimento-automatizado-ia-generativa": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Como funciona atendimento ao cliente com IA Generativa?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Diferente de chatbots tradicionais (baseados em regras), IA generativa usa LLMs (GPT, Claude) para entender contexto e responder naturalmente. Capacidades: resolver problemas complexos, consultar múltiplos sistemas (CRM, ERP, base de conhecimento), escalar para humano quando necessário. Taxa de resolução autônoma: 60-85% (vs 20-40% de bots tradicionais)."
          }
        },
        {
          "@type": "Question",
          "name": "Qual o ROI de atendimento com IA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Redução de custos: 40-70% (menos analistas de suporte). Satisfação do cliente: +25-35% (CSAT) devido a respostas instantâneas e precisas. Tempo médio de atendimento (TMA): redução de 8 min para 2 min. Exemplo: empresa com 1.000 tickets/mês economiza R$ 15k-30k/mês. Payback: 3-6 meses. Ferramentas: Zendesk AI, Intercom Fin, customizados com OpenAI."
          }
        },
        {
          "@type": "Question",
          "name": "IA Generativa funciona em português?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim, modelos top-tier têm excelência em português: GPT-4o (OpenAI), Claude 3.5 Sonnet (Anthropic), Gemini 2.0 (Google). Suportam: gírias, regionalismos, erros de digitação. Para domínios específicos (jurídico, médico, SAP), recomenda-se fine-tuning ou RAG (Retrieval-Augmented Generation) com base de conhecimento interna. Acurácia: 92-97% em PT-BR (benchmarks 2025)."
          }
        }
      ]
    },

    // Article 15: Integração E-commerce SAP
    "integracao-sap-business-one-ecommerce": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Como integrar e-commerce ao SAP Business One?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Métodos: 1) API nativa (Service Layer REST) - recomendado; 2) Add-ons (Ominichannel SAP, integrators como Anymarket/Plugg.to); 3) Middleware (n8n, Mulesoft). Sincronização: produtos, estoque, pedidos, clientes, notas fiscais. Fluxo: pedido no site → cria ordem de venda no SAP → estoque baixado → emite NF-e → rastreio enviado ao cliente. Real-time ou batch (depende do volume)."
          }
        },
        {
          "@type": "Question",
          "name": "Qual plataforma de e-commerce integra melhor com SAP B1?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Top 3: 1) VTEX (API robusta, suporte nativo SAP, ideal para B2B/B2C complexo); 2) Shopify Plus (via apps ou custom API); 3) WooCommerce (flexível, open-source, ótimo para PMEs). Plataformas legadas (Magento 1.x, PrestaShop) exigem middleware. Critério de escolha: volumetria de pedidos, B2B vs B2C, multi-loja, internacionalização."
          }
        },
        {
          "@type": "Question",
          "name": "Quanto custa integrar e-commerce ao SAP Business One?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Desenvolvimento custom (API): R$ 15.000-50.000 (depende da complexidade). Add-ons: R$ 8.000-25.000 (licença) + R$ 200-1.000/mês (manutenção). Middleware SaaS (Anymarket, Plugg.to): R$ 500-3.000/mês. Prazo: 4-8 semanas. ROI: aumento de 30-60% em vendas online com estoque unificado e fulfillment automático."
          }
        }
      ]
    }

  };

  return faqSchemas[slug] || null;
};

// ============================================================================
// PRIORITY 3: ORGANIZATION SCHEMA (Global - Add to all pages)
// ============================================================================

export const getOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ConectaOne Innovation",
    "alternateName": "ConectaOne",
    "url": "https://conectaone.com",
    "logo": "https://conectaone.com/conectaone_logo_principal_1200.png",
    "description": "Consultoria SAP Business One, Inteligência Artificial e RPA para empresas B2B. Implementação SAP, agentes de IA, automação de processos e desenvolvimento de SaaS.",
    "foundingDate": "2020",
    "founder": {
      "@type": "Person",
      "name": "Renan Galhardo",
      "jobTitle": "CEO & CTO"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Avenida Paulista",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "postalCode": "01310-100",
      "addressCountry": "BR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+55-11-97417-8200",
      "contactType": "Customer Service",
      "areaServed": "BR",
      "availableLanguage": ["Portuguese", "English"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/conectaone",
      "https://github.com/conectaone"
    ],
    "knowsAbout": [
      "SAP Business One",
      "Inteligência Artificial",
      "Automação de Processos (RPA)",
      "Desenvolvimento de SaaS",
      "Consultoria ERP",
      "n8n Automation",
      "Power Automate",
      "Agentes de IA",
      "Cloud Computing",
      "LGPD Compliance"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Brasil"
    }
  };
};

// ============================================================================
// PRIORITY 4: LOCAL BUSINESS SCHEMA (For contact/about pages)
// ============================================================================

export const getLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ConectaOne Innovation",
    "image": "https://conectaone.com/conectaone_logo_principal_1200.png",
    "url": "https://conectaone.com",
    "telephone": "+55-11-97417-8200",
    "priceRange": "$$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Avenida Paulista",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "postalCode": "01310-100",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -23.561684,
      "longitude": -46.655981
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.linkedin.com/company/conectaone"
    ]
  };
};

// ============================================================================
// PRIORITY 5: SERVICE SCHEMAS (For service pages)
// ============================================================================

export const getServiceSchemas = () => {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Consultoria SAP Business One",
      "provider": {
        "@type": "Organization",
        "name": "ConectaOne"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Brasil"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Serviços SAP Business One",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Implementação SAP B1",
              "description": "Projeto completo de implantação SAP Business One com metodologia ASAP"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Suporte SAP B1",
              "description": "Sustentação técnica SAP Business One com SLA garantido"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Migração Cloud SAP",
              "description": "Migração de SAP Business One para AWS ou Azure com zero downtime"
            }
          }
        ]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Inteligência Artificial para Empresas",
      "provider": {
        "@type": "Organization",
        "name": "ConectaOne"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Brasil"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Serviços de IA",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Agentes de IA para Vendas",
              "description": "Desenvolvimento de agentes autônomos de IA para prospecção e qualificação de leads"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Chatbot WhatsApp Inteligente",
              "description": "Chatbot com IA Generativa integrado a SAP, CRM e sistemas internos"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Integração IA ao SAP B1",
              "description": "Conectar LLMs (GPT-4o, Claude) ao SAP Business One via Service Layer"
            }
          }
        ]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Automação de Processos (RPA)",
      "provider": {
        "@type": "Organization",
        "name": "ConectaOne"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Brasil"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Serviços de RPA",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Automação Financeira",
              "description": "RPA para conciliação bancária, cobrança e auditoria de notas fiscais"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Automação com Power Automate",
              "description": "Desenvolvimento de workflows automatizados com Microsoft Power Automate"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Automação com n8n",
              "description": "Workflows open-source com n8n para integração de sistemas"
            }
          }
        ]
      }
    }
  ];
};

// ============================================================================
// UTILITY: Get all schemas for a blog post
// ============================================================================

export const getAllSchemasForPost = (post: BlogPost) => {
  const schemas = [];

  // Always include breadcrumb
  schemas.push(getBreadcrumbSchema(post));

  // Check for enhanced FAQ
  const faqSchema = getEnhancedFAQSchema(post.slug);
  if (faqSchema) {
    schemas.push(faqSchema);
  }

  return schemas;
};
