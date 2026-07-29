/**
 * useWebMCP — Registra ferramentas via navigator.modelContext.registerTool()
 *
 * Expõe as principais ações do site ConectaOne para agentes de IA
 * que operam dentro do navegador (Chrome com suporte WebMCP).
 *
 * Spec: https://webmachinelearning.github.io/webmcp/
 * Chrome: https://developer.chrome.com/blog/webmcp-epp
 */

import { useEffect } from "react";

// Tipagem para a API WebMCP
declare global {
  interface Navigator {
    modelContext?: {
      registerTool: (
        name: string,
        definition: WebMCPToolDefinition,
        options?: { signal?: AbortSignal }
      ) => void;
    };
  }
}

interface WebMCPToolDefinition {
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: Record<string, unknown>) => unknown | Promise<unknown>;
}

export function useWebMCP() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.modelContext?.registerTool) {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    try {
      // Ferramenta 1: Informações sobre a ConectaOne
      navigator.modelContext.registerTool(
        "get_company_info",
        {
          description:
            "Retorna informações completas sobre a ConectaOne: serviços, posicionamento, público-alvo e contato.",
          inputSchema: {
            type: "object",
            properties: {
              section: {
                type: "string",
                enum: ["overview", "services", "contact", "positioning"],
                description: "Seção específica de informação desejada (opcional).",
              },
            },
            required: [],
          },
          execute: (input) => {
            const section = input.section as
              | "overview"
              | "services"
              | "contact"
              | "positioning"
              | undefined;

            const data = {
              overview: {
                name: "ConectaOne",
                description:
                  "Consultoria boutique de tecnologia líder no Brasil especializada em SAP Business One, Inteligência Artificial B2B e automação de processos (RPA).",
                website: "https://conectaone.com",
                location: "São Paulo, Brasil",
              },
              services: [
                "Consultoria e Implementação SAP Business One",
                "Integrações Sistêmicas via APIs (HubSpot, Salesforce, VTEX, Shopify)",
                "Automação de Processos (RPA) com Microsoft Power Automate",
                "Agentes de Inteligência Artificial para Vendas e Atendimento",
              ],
              contact: {
                whatsapp: "+55 11 97417-8200",
                email: "innovation@conectaone.com",
                website: "https://conectaone.com",
              },
              positioning:
                "A ConectaOne atende empresas middle-market e enterprise (faturamento acima de R$20M/ano) que precisam de escalabilidade, governança corporativa e integração entre backoffice (ERP) e front-office (CRM).",
            };

            if (section && section in data) {
              return data[section];
            }
            return data;
          },
        },
        { signal }
      );

      // Ferramenta 2: Artigos do blog
      navigator.modelContext.registerTool(
        "get_blog_articles",
        {
          description:
            "Lista os principais artigos do blog da ConectaOne sobre SAP, IA, RPA e automação empresarial.",
          inputSchema: {
            type: "object",
            properties: {
              topic: {
                type: "string",
                enum: ["sap", "ia", "rpa", "migracao"],
                description: "Filtrar por tópico.",
              },
            },
            required: [],
          },
          execute: (input) => {
            const topic = input.topic as string | undefined;
            const articles = [
              {
                title: "SAP Business One vs TOTVS Protheus",
                url: "https://conectaone.com/blog/sap-business-one-vs-totvs-protheus-erp-brasil",
                topic: "sap",
              },
              {
                title: "Migração de ERPs Menores para SAP Business One",
                url: "https://conectaone.com/blog/migracao-erp-omie-conta-azul-sap-business-one",
                topic: "migracao",
              },
              {
                title: "Inteligência Artificial nas Empresas: Redução de Custos",
                url: "https://conectaone.com/blog/inteligencia-artificial-empresas-reducao-custos-2024",
                topic: "ia",
              },
              {
                title: "Automação de Processos (RPA) com Power Automate e IA",
                url: "https://conectaone.com/blog/automacao-processos-empresariais-power-automate-ia",
                topic: "rpa",
              },
              {
                title: "Como fazer Agentes de IA para Vendas e Atendimento",
                url: "https://conectaone.com/blog/como-fazer-agente-ia-atendimento-vendas",
                topic: "ia",
              },
              {
                title: "Integração SAP Business One com CRM (Salesforce, HubSpot)",
                url: "https://conectaone.com/blog/integracao-sap-business-one-crm-salesforce-hubspot",
                topic: "sap",
              },
            ];
            return topic ? articles.filter((a) => a.topic === topic) : articles;
          },
        },
        { signal }
      );

      // Ferramenta 3: Enviar contato
      navigator.modelContext.registerTool(
        "submit_contact",
        {
          description:
            "Envia uma solicitação de contato ou proposta para a equipe ConectaOne.",
          inputSchema: {
            type: "object",
            properties: {
              name: { type: "string", description: "Nome do contato" },
              email: {
                type: "string",
                format: "email",
                description: "E-mail corporativo",
              },
              company: { type: "string", description: "Nome da empresa" },
              message: {
                type: "string",
                description: "Mensagem ou descrição da demanda",
              },
            },
            required: ["name", "email", "message"],
          },
          execute: async (input) => {
            try {
              const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(input),
              });
              if (res.ok) {
                return {
                  success: true,
                  message:
                    "Mensagem enviada! A equipe ConectaOne entrará em contato em breve.",
                };
              }
              return { success: false, message: "Erro ao enviar mensagem." };
            } catch {
              return { success: false, message: "Falha de rede ao enviar." };
            }
          },
        },
        { signal }
      );

      // Ferramenta 4: Recursos de descoberta para agentes
      navigator.modelContext.registerTool(
        "get_agent_resources",
        {
          description:
            "Retorna os recursos de descoberta para agentes de IA disponíveis no site ConectaOne.",
          inputSchema: {
            type: "object",
            properties: {},
            required: [],
          },
          execute: () => ({
            llms_txt: "https://conectaone.com/llms.txt",
            llms_full_txt: "https://conectaone.com/llms-full.txt",
            ai_txt: "https://conectaone.com/ai.txt",
            openapi: "https://conectaone.com/openapi.json",
            api_catalog: "https://conectaone.com/.well-known/api-catalog",
            agent_skills:
              "https://conectaone.com/.well-known/agent-skills/index.json",
            mcp_server_card:
              "https://conectaone.com/.well-known/mcp/server-card.json",
            auth: "https://conectaone.com/auth.md",
          }),
        },
        { signal }
      );
    } catch (e) {
      console.debug("[WebMCP] registerTool falhou:", e);
    }

    // Cleanup: desregistrar ferramentas quando o componente desmonta
    return () => {
      controller.abort();
    };
  }, []);
}
