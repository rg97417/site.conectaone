# Arquitetura de Schemas - ConectaOne

## Visão Geral da Estrutura

```
┌─────────────────────────────────────────────────────────────────┐
│                        SITE CONECTAONE                          │
│                     https://conectaone.com                      │
└─────────────────────────────────────────────────────────────────┘
                                │
                ┌───────────────┴───────────────┐
                │                               │
        ┌───────▼────────┐             ┌───────▼────────┐
        │ GLOBAL SCHEMAS │             │  PAGE SCHEMAS  │
        │ (Todas páginas)│             │ (Específicos)  │
        └───────┬────────┘             └───────┬────────┘
                │                               │
    ┌───────────┴───────────┐       ┌──────────┴──────────┐
    │                       │       │                     │
┌───▼────┐         ┌────────▼───┐   │                     │
│Organization│     │LocalBusiness│   │                     │
│ Schema   │     │  Schema     │   │                     │
│          │     │             │   │                     │
│E-E-A-T   │     │ SEO Local   │   │                     │
└──────────┘     └─────────────┘   │                     │
                                    │                     │
                        ┌───────────▼───────────┐         │
                        │   BLOG POST SCHEMAS   │         │
                        │   (38 artigos)        │         │
                        └───────────┬───────────┘         │
                                    │                     │
            ┌───────────────────────┼───────────────────┐ │
            │                       │                   │ │
    ┌───────▼────────┐   ┌─────────▼──────┐   ┌────────▼─▼──────┐
    │ BreadcrumbList │   │ Article Schema │   │ Enhanced FAQ    │
    │                │   │                │   │                 │
    │  (Universal)   │   │ TechArticle    │   │ (Top 15 posts) │
    │  38 posts      │   │ HowTo          │   │ 48 perguntas   │
    │                │   │ BlogPosting    │   │                 │
    └────────────────┘   └────────────────┘   └─────────────────┘
                                    │
                        ┌───────────┴───────────┐
                        │                       │
                ┌───────▼────────┐   ┌──────────▼─────────┐
                │ Person Schema  │   │  Dataset Schema    │
                │                │   │                    │
                │ (Renan Galhardo│   │ (3 artigos com    │
                │  - E-E-A-T)    │   │  dados reais)     │
                └────────────────┘   └────────────────────┘
```

---

## Fluxo de Renderização por Tipo de Página

### 1. Home Page (`/`)

```
┌─────────────────────────────────────┐
│         HOME PAGE                   │
│    https://conectaone.com           │
└─────────────────────────────────────┘
                │
        ┌───────┴────────┐
        │                │
┌───────▼────┐   ┌───────▼──────┐
│Organization│   │ LocalBusiness│
│  Schema    │   │   Schema     │
└────────────┘   └──────────────┘

Schemas Renderizados:
✅ Organization (autoridade global)
✅ LocalBusiness (SEO local São Paulo)
```

---

### 2. Blog Post Page (`/blog/:slug`)

```
┌────────────────────────────────────────────────┐
│         BLOG POST                              │
│    /blog/5-casos-reais-ia-sap-business-one-2026│
└────────────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
┌───────▼────┐  ┌───────▼────┐  ┌──────▼──────┐
│Organization│  │LocalBusiness│ │ Breadcrumb  │
│  (Global)  │  │  (Global)   │ │   List      │
└────────────┘  └─────────────┘ └──────┬──────┘
                                       │
                        ┌──────────────┼──────────────┐
                        │              │              │
                ┌───────▼────┐  ┌──────▼─────┐ ┌─────▼──────┐
                │  Article   │  │ Enhanced   │ │   Person   │
                │  Schema    │  │   FAQ      │ │   Schema   │
                │            │  │            │ │            │
                │TechArticle │  │ (se slug   │ │(se autor = │
                │   HowTo    │  │  está nos  │ │   Renan)   │
                │BlogPosting │  │  top 15)   │ │            │
                └────────────┘  └────────────┘ └────────────┘
                                       │
                                ┌──────▼─────┐
                                │  Dataset   │
                                │  Schema    │
                                │            │
                                │(se artigo  │
                                │data-driven)│
                                └────────────┘

Schemas Renderizados (máximo 7):
✅ Organization (global)
✅ LocalBusiness (global)
✅ BreadcrumbList (universal)
✅ Article/TechArticle/HowTo (automático)
✅ Enhanced FAQ (se top 15)
✅ Person (se autor Renan)
✅ Dataset (se data-driven)
```

---

## Lógica Condicional de Schemas

### BlogPost.tsx - Decision Tree

```
Artigo carregado (post.slug)
    │
    ├─> SEMPRE renderiza:
    │   ├─ BreadcrumbList (getBreadcrumbSchema)
    │   ├─ Article Schema (getArticleSchema)
    │   │   ├─ Se slug contém "arquitetura" ou keywords técnicas
    │   │   │   └─> TechArticle
    │   │   ├─ Se slug contém "como-criar" ou "tutorial"
    │   │   │   └─> HowTo
    │   │   └─ Senão
    │   │       └─> BlogPosting
    │   │
    │   └─ Organization/LocalBusiness (via GlobalSchemas)
    │
    ├─> CONDICIONALMENTE renderiza:
    │   │
    │   ├─ Enhanced FAQ
    │   │   ├─ Se slug está em faqSchemas (top 15)
    │   │   │   └─> getEnhancedFAQSchema(slug)
    │   │   ├─ Senão, se keywords incluem "sap business one ia"
    │   │   │   └─> getFallbackFAQSchema()
    │   │   └─> Senão: null
    │   │
    │   ├─ Person Schema
    │   │   ├─ Se post.author inclui "Renan Galhardo"
    │   │   │   └─> getPersonSchema()
    │   │   └─> Senão: null
    │   │
    │   └─ Dataset Schema
    │       ├─ Se slug em ["5-casos-reais...", "quanto-custa...", "sap-vs-totvs..."]
    │       │   └─> getDatasetSchema()
    │       └─> Senão: null
    │
    └─> Renderiza tudo no <Helmet>
```

---

## Estrutura de Arquivos

```
src/
├── utils/
│   └── enhancedSchemas.ts         ← BIBLIOTECA CENTRAL (1.200 linhas)
│       ├── getBreadcrumbSchema()
│       ├── getEnhancedFAQSchema()
│       ├── getOrganizationSchema()
│       ├── getLocalBusinessSchema()
│       ├── getServiceSchemas()
│       └── getAllSchemasForPost()
│
├── components/
│   ├── GlobalSchemas.tsx          ← SCHEMAS GLOBAIS
│   │   └── Injeta Organization + LocalBusiness
│   │
│   └── SEO.tsx                    ← META TAGS (existente)
│
├── pages/
│   └── BlogPost.tsx               ← POST DO BLOG (modificado)
│       └── Usa schemas de enhancedSchemas.ts
│
└── App.tsx                        ← ROOT (modificado)
    └── Inclui <GlobalSchemas />
```

---

## Priorização Visual

```
┌─────────────────────────────────────────────────────────────┐
│                    PRIORIDADE DE SCHEMAS                    │
└─────────────────────────────────────────────────────────────┘

🔥 PRIORITY 1 - IMPLEMENTADO (Deploy agora)
├── BreadcrumbList
│   ├── Cobertura: 38 posts
│   ├── Impacto: Alto (rich snippets imediatos)
│   └── Status: ✅ 100%
│
└── Enhanced FAQ
    ├── Cobertura: 15 posts estratégicos (48 perguntas)
    ├── Impacto: Muito Alto (featured snippets)
    └── Status: ✅ 100%

🔥 PRIORITY 2 - IMPLEMENTADO (Deploy agora)
├── Organization
│   ├── Cobertura: Todas as páginas
│   ├── Impacto: Alto (E-E-A-T + Knowledge Graph)
│   └── Status: ✅ 100%
│
└── LocalBusiness
    ├── Cobertura: Todas as páginas
    ├── Impacto: Médio (SEO local São Paulo)
    └── Status: ✅ 100%

📋 PRIORITY 3 - FUTURO (2-4 semanas)
└── Service
    ├── Cobertura: Páginas /servicos/* (a criar)
    ├── Impacto: Médio-Alto (conversão)
    └── Status: ⏳ Código pronto, páginas pendentes

📋 PRIORITY 4 - FUTURO (1-3 meses)
├── Review/Rating
│   ├── Cobertura: Testimonials (quando tiver)
│   └── Impacto: Médio (social proof)
│
├── VideoObject
│   ├── Cobertura: Se adicionar vídeos
│   └── Impacto: Médio (vídeo snippets)
│
└── AggregateRating
    ├── Cobertura: Homepage + serviços
    └── Impacto: Médio (estrelas nos SERPs)
```

---

## Mapa de Cobertura de Schemas por URL

```
URL                                         │ Schemas Aplicados
────────────────────────────────────────────┼─────────────────────────────────
/                                           │ Organization, LocalBusiness
/blog                                       │ Organization, LocalBusiness
/blog/5-casos-reais-ia-sap-b1-2026         │ Org, Local, Breadcrumb, Article,
                                            │ Enhanced FAQ (4 Q), Person
────────────────────────────────────────────┼─────────────────────────────────
/blog/quanto-custa-implementar-sap-b1      │ Org, Local, Breadcrumb, Article,
                                            │ Enhanced FAQ (4 Q), Dataset
────────────────────────────────────────────┼─────────────────────────────────
/blog/sap-vs-totvs-2026                    │ Org, Local, Breadcrumb, Article,
                                            │ Enhanced FAQ (4 Q), Dataset
────────────────────────────────────────────┼─────────────────────────────────
/blog/sap-ia-arquitetura-n8n               │ Org, Local, Breadcrumb,
                                            │ TechArticle, Enhanced FAQ (3 Q)
────────────────────────────────────────────┼─────────────────────────────────
/blog/sap-joule-vs-custom-agents           │ Org, Local, Breadcrumb, Article,
                                            │ Enhanced FAQ (3 Q)
────────────────────────────────────────────┼─────────────────────────────────
/blog/chatbot-whatsapp-sap                 │ Org, Local, Breadcrumb, HowTo,
                                            │ Enhanced FAQ (3 Q)
────────────────────────────────────────────┼─────────────────────────────────
/blog/rpa-power-automate                   │ Org, Local, Breadcrumb, Article,
                                            │ Enhanced FAQ (3 Q)
────────────────────────────────────────────┼─────────────────────────────────
/blog/[outros 23 posts]                    │ Org, Local, Breadcrumb, Article
                                            │ (+ Person se Renan, + Dataset
                                            │ se data-driven)
────────────────────────────────────────────┼─────────────────────────────────
/servicos/consultoria-sap (futuro)         │ Org, Local, Breadcrumb, Service
/servicos/agentes-ia (futuro)              │ Org, Local, Breadcrumb, Service
/servicos/rpa (futuro)                     │ Org, Local, Breadcrumb, Service
```

---

## Performance de Schemas (Impacto SEO)

```
┌─────────────────────────────────────────────────────────────┐
│            IMPACTO ESTIMADO POR TIPO DE SCHEMA              │
└─────────────────────────────────────────────────────────────┘

Schema Type         │ CTR Impact │ Rich Snippet Rate │ Time to Show
────────────────────┼────────────┼───────────────────┼──────────────
BreadcrumbList      │   +15-25%  │       ~95%        │   Imediato
Enhanced FAQ        │   +40-80%  │       ~60-70%     │   7-30 dias
Organization        │   +5-10%   │       ~30%        │   30-90 dias
LocalBusiness       │   +10-20%  │       ~40%        │   30-60 dias
Person (E-E-A-T)    │   +3-8%    │       ~20%        │   60-120 dias
Dataset             │   +5-15%   │       ~25%        │   30-90 dias
Service (futuro)    │   +10-25%  │       ~50%        │   30-60 dias
Review (futuro)     │   +20-40%  │       ~80%        │   7-30 dias

Notas:
- CTR Impact: Aumento percentual no Click-Through Rate
- Rich Snippet Rate: % de chance de Google ativar o snippet
- Time to Show: Tempo médio até Google exibir nos resultados
```

---

## Validação de Schemas (Checklist Técnico)

```
┌─────────────────────────────────────────────────────────────┐
│              VALIDAÇÃO TÉCNICA DE SCHEMAS                   │
└─────────────────────────────────────────────────────────────┘

Schema              │ Required Properties │ Optional But Recommended
────────────────────┼─────────────────────┼──────────────────────────
BreadcrumbList      │ itemListElement,    │ -
                    │ position, name, item│
────────────────────┼─────────────────────┼──────────────────────────
FAQPage             │ mainEntity, name,   │ dateCreated, author
                    │ acceptedAnswer      │
────────────────────┼─────────────────────┼──────────────────────────
Organization        │ name, url           │ logo, address, sameAs,
                    │                     │ contactPoint, knowsAbout
────────────────────┼─────────────────────┼──────────────────────────
LocalBusiness       │ name, address       │ geo, openingHours,
                    │                     │ priceRange, telephone
────────────────────┼─────────────────────┼──────────────────────────
Article             │ headline, datePubli-│ image, author, publisher
                    │ shed, dateModified  │
────────────────────┼─────────────────────┼──────────────────────────
Person              │ name                │ jobTitle, worksFor,
                    │                     │ knowsAbout, url
────────────────────┼─────────────────────┼──────────────────────────
Service             │ serviceType,        │ hasOfferCatalog,
                    │ provider            │ areaServed, description

✅ Todos os schemas implementados incluem TODAS as propriedades
   recomendadas para maximizar chances de rich snippets.
```

---

## Fluxo de Testes (Quality Assurance)

```
┌─────────────────────────────────────────────────────────────┐
│                   PIPELINE DE TESTES                        │
└─────────────────────────────────────────────────────────────┘

1. DESENVOLVIMENTO
   └─> Código em /src/utils/enhancedSchemas.ts
       ├─> TypeScript validation ✅
       └─> npm run build ✅

2. VALIDAÇÃO LOCAL (Antes do deploy)
   └─> Browser DevTools Console
       ├─> document.querySelectorAll('script[type="application/ld+json"]')
       └─> JSON.parse() de cada schema

3. VALIDAÇÃO ONLINE (Após deploy)
   └─> https://validator.schema.org
       ├─> Copiar HTML da página
       ├─> Verificar warnings (OK)
       └─> Verificar errors (NÃO OK)

4. RICH RESULTS TEST (Após deploy)
   └─> https://search.google.com/test/rich-results
       ├─> Colar URL do artigo
       ├─> Verificar schemas detectados
       └─> Verificar elegibilidade rich snippets

5. GOOGLE SEARCH CONSOLE (7-30 dias após deploy)
   └─> Enhancements > Breadcrumbs / FAQ
       ├─> Páginas válidas
       ├─> Erros (corrigir)
       └─> Avisos (analisar)

6. SERP MONITORING (30-90 dias)
   └─> Buscar artigos no Google
       ├─> Breadcrumb aparecendo? ✅
       ├─> FAQ snippet ativo? ✅
       └─> Organization no Knowledge Panel? ✅
```

---

## Troubleshooting Guide

```
┌─────────────────────────────────────────────────────────────┐
│              PROBLEMAS COMUNS E SOLUÇÕES                    │
└─────────────────────────────────────────────────────────────┘

PROBLEMA: Schema não aparece no view-source
└─> SOLUÇÃO: Verificar se <GlobalSchemas /> está em App.tsx
             Verificar se import está correto

PROBLEMA: Rich Results Test não detecta FAQ
└─> SOLUÇÃO: Verificar se slug está em faqSchemas
             Mínimo 3 perguntas por FAQ
             Perguntas devem terminar com "?"

PROBLEMA: Google não ativa rich snippet
└─> SOLUÇÃO: Aguardar 7-30 dias (Google testa)
             Perguntas muito genéricas (refinar)
             Respostas muito curtas (<50 chars)
             Keyword stuffing (naturalizar)

PROBLEMA: Search Console mostra erro "Missing field"
└─> SOLUÇÃO: Verificar propriedades obrigatórias
             Ex: FAQPage precisa de mainEntity.acceptedAnswer

PROBLEMA: TypeScript error ao importar schemas
└─> SOLUÇÃO: Verificar export em enhancedSchemas.ts
             Verificar import { ... } from '@/utils/...'
             Rodar npm run build para validar

PROBLEMA: Build falha com schema inválido
└─> SOLUÇÃO: Validar JSON no validator.schema.org
             Vírgulas extras em arrays
             Aspas não escapadas em strings
```

---

## Métricas de Monitoramento

```
┌─────────────────────────────────────────────────────────────┐
│          KPIS PARA MONITORAR (Search Console)               │
└─────────────────────────────────────────────────────────────┘

Métrica                  │ Ferramenta           │ Frequência
─────────────────────────┼──────────────────────┼─────────────
Impressões orgânicas     │ Search Console       │ Semanal
CTR médio                │ Search Console       │ Semanal
Posição média            │ Search Console       │ Semanal
FAQ snippets ativos      │ Manual (buscar)      │ Quinzenal
Breadcrumb nos SERPs     │ Manual (buscar)      │ Mensal
Erros de schema          │ Search Console >     │ Semanal
                         │   Enhancements       │
Knowledge Panel ConectaOne│ Google Search       │ Mensal
Rich snippet rate        │ Search Console       │ Mensal
                         │ (impressões rich/    │
                         │  total impressões)   │

ALERTAS CRÍTICOS:
⚠️  Erros de schema > 5%   → Corrigir imediatamente
⚠️  CTR cai > 10%          → Revisar meta descriptions
⚠️  Posição cai > 3 pontos → Verificar concorrentes
```

---

## Roadmap de Evolução

```
┌─────────────────────────────────────────────────────────────┐
│                 PRÓXIMAS IMPLEMENTAÇÕES                     │
└─────────────────────────────────────────────────────────────┘

Q1 2026 (Agora) ✅
├── BreadcrumbList (38 posts)
├── Enhanced FAQ (15 posts)
├── Organization (global)
└── LocalBusiness (global)

Q2 2026
├── Criar páginas /servicos/*
├── Implementar Service schemas
├── Coletar depoimentos com notas
└── Adicionar Review schemas

Q3 2026
├── Criar vídeos tutoriais
├── Implementar VideoObject schemas
├── Adicionar AggregateRating (média de reviews)
└── Expandir FAQ para mais 10 artigos

Q4 2026
├── Event schemas (se criar eventos/webinars)
├── Course schemas (se criar cursos)
├── JobPosting schemas (se tiver vagas)
└── A/B test de FAQ questions
```

---

## Conclusão Visual

```
┌─────────────────────────────────────────────────────────────┐
│                    ESTADO ATUAL                             │
└─────────────────────────────────────────────────────────────┘

📊 Schemas Implementados:      6 tipos
📄 Páginas com Schemas:        38 posts + todas as páginas
🎯 FAQs Otimizados:            15 artigos (48 perguntas)
✅ Build Status:               Sucesso (sem erros)
🚀 Pronto para Deploy:         SIM

┌─────────────────────────────────────────────────────────────┐
│                  IMPACTO ESPERADO                           │
└─────────────────────────────────────────────────────────────┘

30 dias:    CTR +10-20%  │ Breadcrumb snippets ativos
90 dias:    CTR +25-35%  │ 5-10 FAQ snippets ativos
180 dias:   CTR +40-60%  │ 12-15 FAQ snippets + Knowledge Panel

┌─────────────────────────────────────────────────────────────┐
│                  PRÓXIMO PASSO                              │
└─────────────────────────────────────────────────────────────┘

1. Deploy em produção
2. Testar 3 URLs no Rich Results Test
3. Monitorar Search Console em 7 dias
4. Ajustar FAQs baseado em performance Google

```

---

**Documentação Relacionada**:
- Relatório Completo: `/SCHEMA_IMPLEMENTATION_REPORT.md`
- Exemplos de Código: `/SCHEMA_CODE_EXAMPLES.md`
- Sumário Executivo: `/SCHEMA_SUMMARY.md`

**Data**: 2026-08-07
**Versão**: 1.0
