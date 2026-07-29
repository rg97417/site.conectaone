/**
 * WebMCPProvider — Registra as ferramentas WebMCP ao montar a aplicação.
 * Sem UI, apenas efeito colateral para agentes de IA no navegador.
 */

import { useWebMCP } from "@/hooks/use-web-mcp";

export function WebMCPProvider() {
  useWebMCP();
  return null;
}
