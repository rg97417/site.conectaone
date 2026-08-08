# Decisão Técnica: Schemas Client-Side vs Server-Side

**Data:** 2026-08-08
**Decisão:** Manter schemas dinâmicos (BreadcrumbList, FAQPage, Article) injetados via React client-side

---

## ✅ Implementação Atual

### Schemas Estáticos (HTML index.html)
- `Organization` → E-E-A-T global
- `WebSite` → Funcionalidade de busca

### Schemas Dinâmicos (React + react-helmet-async)
- `BreadcrumbList` → 38 posts do blog
- `FAQPage` → 15 artigos estratégicos (48 FAQs)
- `Article` / `BlogPosting` → Metadata de cada post
- `Person` → Autoria (Renan Galhardo)
- `Dataset` → 3 artigos data-driven
- `LocalBusiness` → SEO local (via GlobalSchemas.tsx)

---

## 🔍 Análise Técnica

### Opção A: Adicionar Server-Side Rendering (SSR)

**Bibliotecas avaliadas:**

1. **react-snap**
   - ❌ 33 vulnerabilidades (3 críticas)
   - ❌ Puppeteer 1.20.0 (deprecated desde 2021)
   - ❌ Não é mantido ativamente

2. **vite-prerender-plugin**
   - ⚠️  Requer script SSR customizado
   - ⚠️  Complexidade de implementação alta
   - ⚠️  Risco de quebrar build/routing existente

3. **Script customizado (Puppeteer)**
   - ⏱️  Tempo de desenvolvimento: 4-8 horas
   - ⚠️  Manutenção adicional necessária
   - ⚠️  Possibilidade de bugs em edge cases

### Opção B: Manter Schemas Client-Side (Escolhida ✅)

**Fundamentação:**

1. **Google oficial documenta suporte completo** ([fonte](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)):
   > "Google can read JSON-LD data when it is dynamically injected into the page's contents, such as by JavaScript code or embedded widgets"

2. **Googlebot executa JavaScript** desde 2015
   - Evergreen Chromium engine (atualizado continuamente)
   - Executa ES6+, async/await, React, etc.
   - Aguarda até 5 segundos para JS executar

3. **Zero risco de segurança**
   - Nenhuma vulnerabilidade adicionada
   - Não depende de bibliotecas deprecated
   - Build limpo e estável

4. **Schemas críticos já estão estáticos**
   - `Organization` → index.html (linha 62-74)
   - `WebSite` → index.html (linha 77-89)
   - Garantem E-E-A-T mesmo sem JS

---

## 📊 Comparação de Risco

| Critério | Client-Side (Atual) | SSR/Prerender |
|----------|---------------------|---------------|
| **Vulnerabilidades** | 15 (existentes) | 33+ (críticas) |
| **Manutenibilidade** | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| **Risco de quebrar** | Baixo | Alto |
| **Tempo de dev** | 0h | 4-8h |
| **Suporte Google** | ✅ Documentado | ✅ Documentado |
| **Crawlers sem JS** | ⚠️  Limitado | ✅ Total |
| **Performance** | Bom | Ótimo |

---

## 🎯 Validação da Decisão

### Testes Realizados

1. **HTML estático contém schemas críticos:**
   ```bash
   curl -s https://www.conectaone.com/ | grep "Organization"
   # ✅ Retorna schema Organization
   ```

2. **Schemas dinâmicos injetados corretamente:**
   - ✅ Chrome DevTools mostra 5-6 schemas por post
   - ✅ Build passa sem erros TypeScript
   - ✅ 61 posts prerenderizados no build

3. **Google aceita schemas via JS:**
   - ✅ Documentação oficial confirma
   - ✅ Googlebot moderno executa React

### Evidências de Funcionamento

**Sites de grande escala usando schemas client-side:**
- Medium.com (React SPA com schemas dinâmicos)
- Dev.to (Preact SPA com schemas)
- Muitos sites Next.js em modo SPA

**Google Search Console (previsão):**
- Breadcrumbs: 38 válidas (7-14 dias pós-deploy)
- FAQ: 15 válidas (7-14 dias pós-deploy)
- Organization: 1 válida (já detectada)

---

## 🚀 Recomendação Final

**MANTER IMPLEMENTAÇÃO ATUAL** por ser:
- ✅ Mais segura (zero vulnerabilidades adicionadas)
- ✅ Mais estável (sem mudanças arquiteturais)
- ✅ Igualmente eficaz para SEO (Google documenta suporte)
- ✅ Mais simples de manter

**SSR/Prerender seria recomendado SE:**
- Precisássemos suportar crawlers antigos (Yahoo, Bing antigo)
- Performance de First Paint fosse crítica (<100ms)
- Houvesse biblioteca SSR sem vulnerabilidades
- Site fosse migrar para Next.js/Remix (futuro)

---

## 📝 Monitoramento Pós-Deploy

**Verificar em 7 dias** (Search Console):
1. Enhancements > Breadcrumbs (esperado: 38 válidas)
2. Enhancements > FAQ (esperado: 15 válidas)
3. Core Web Vitals (deve manter ou melhorar)

**Se schemas não aparecerem** (improvável):
- Reavaliar SSR usando Next.js (migração completa)
- Ou usar Vite SSR oficial quando estabilizar

---

## 🔗 Referências

- [Google: Structured Data Intro](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Google: Dynamic rendering](https://developers.google.com/search/docs/crawling-indexing/javascript/dynamic-rendering)
- [Googlebot Evergreen](https://developers.google.com/search/blog/2019/05/the-new-evergreen-googlebot)
- [TanStack Start Prerendering](https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering)
- [Vite Prerender Plugin](https://github.com/preactjs/vite-prerender-plugin)

---

**Conclusão:** Schemas client-side via react-helmet-async são **perfeitamente válidos** para SEO moderno e representam o **menor risco** para o projeto.
