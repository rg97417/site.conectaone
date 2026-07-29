/**
 * Cloudflare Pages Middleware – Content Negotiation for AI Agents (RFC 7231)
 *
 * When a request arrives with `Accept: text/markdown`, instead of returning the
 * standard HTML page we return a Markdown version of the site content so that
 * AI agents, LLMs and scrapers get a structured, token-efficient document.
 *
 * Deployment: this file lives at functions/_middleware.js and is automatically
 * picked up by Cloudflare Pages as an "on-request" middleware for all routes.
 */

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
*Gerado automaticamente pelo middleware de Content Negotiation da ConectaOne.*
*Para o contexto completo: https://conectaone.com/llms-full.txt*
`;

export async function onRequest(context) {
  const { request, next } = context;
  const accept = request.headers.get("Accept") || "";
  const url = new URL(request.url);

  // Only intercept requests to HTML pages (not static assets, API routes, or .well-known)
  const isHtmlRoute =
    !url.pathname.startsWith("/api/") &&
    !url.pathname.startsWith("/.well-known/") &&
    !url.pathname.match(/\.(txt|json|xml|css|js|png|jpg|svg|ico|woff|woff2|ttf|eot|map|md)$/);

  // Check if the client prefers markdown (AI agent / LLM)
  const wantsMarkdown =
    accept.includes("text/markdown") ||
    accept.includes("text/x-markdown");

  if (isHtmlRoute && wantsMarkdown) {
    // Return the Markdown representation of the homepage
    return new Response(MARKDOWN_CONTENT, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "X-Markdown-Tokens": String(MARKDOWN_CONTENT.split(/\s+/).length),
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "Vary": "Accept",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  // Pass through to the normal static asset handler
  const response = await next();
  return response;
}
