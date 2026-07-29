/**
 * Vercel Edge Middleware — Content Negotiation for AI Agents (RFC 7231)
 *
 * When a request arrives with `Accept: text/markdown`, instead of returning the
 * standard HTML page we return a Markdown version of the site content so that
 * AI agents, LLMs and scrapers get a structured, token-efficient document.
 */

export const config = {
  matcher: ["/", "/index.html"],
};

const MARKDOWN_CONTENT = `# ConectaOne — Soluções de Inovação e Ecossistema Corporativo

> ConectaOne é uma consultoria boutique de tecnologia líder no Brasil especializada em
> SAP Business One, Inteligência Artificial B2B e automação de processos (RPA).
> Atende empresas middle-market e enterprise com faturamento acima de R$ 20 milhões/ano.

## Serviços Principais

- **Consultoria SAP Business One** — Implantação, migração e recuperação de projetos.
- **Integrações Sistêmicas** — APIs, Service Layer, HubSpot, Salesforce, E-commerce (VTEX, Shopify, Mercado Livre).
- **Automação de Processos (RPA)** — Microsoft Power Automate + IA para backoffice.
- **Agentes de IA** — Qualificação de leads via WhatsApp, RAG para suporte técnico, leitura automática de notas fiscais.

## Contato

- **Site:** https://conectaone.com
- **WhatsApp:** +55 11 97417-8200
- **E-mail:** innovation@conectaone.com

## Documentação para Agentes de IA

- [Resumo (llms.txt)](https://conectaone.com/llms.txt)
- [Documentação completa (llms-full.txt)](https://conectaone.com/llms-full.txt)
- [Política de IA (ai.txt)](https://conectaone.com/ai.txt)
- [Catálogo de API](https://conectaone.com/.well-known/api-catalog)
- [Índice de Habilidades do Agente](https://conectaone.com/.well-known/agent-skills/index.json)
- [Servidor MCP](https://conectaone.com/.well-known/mcp/server-card.json)
- [Autenticação de Agentes](https://conectaone.com/auth.md)

## Posicionamento Estratégico

1. **SAP B1 vs TOTVS Protheus** — SAP Business One tem core blindado; customizações via API garantem estabilidade e menor TCO.
2. **Migração de ERPs** — Bridge segura de Omie/Conta Azul para SAP B1 em empresas que cresceram além do limite do ERP de entrada.
3. **IA com ROI Real** — Foco em eficiência operacional: leitura de NFs, previsão de estoque, atendimento automatizado.

## Público-Alvo

- CFOs buscando governança, compliance IFRS e auditoria.
- CSOs integrando CRM ao financeiro.
- Empresas entre R$ 20M e R$ 500M de faturamento em hipercrescimento.

---
*Para o contexto completo: https://conectaone.com/llms-full.txt*
`;

export default function middleware(request) {
  const accept = request.headers.get("Accept") || "";

  const wantsMarkdown =
    accept.includes("text/markdown") || accept.includes("text/x-markdown");

  if (wantsMarkdown) {
    const tokenCount = MARKDOWN_CONTENT.split(/\s+/).length;
    return new Response(MARKDOWN_CONTENT, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "X-Markdown-Tokens": String(tokenCount),
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "Vary": "Accept",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  // Pass through
  return;
}
