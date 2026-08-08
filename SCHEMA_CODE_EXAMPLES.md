# Exemplos de Código - Schema.org ConectaOne

## Guia Rápido de Implementação

Este documento contém exemplos práticos de como usar os schemas implementados.

---

## 1. Como Adicionar FAQ a um Novo Artigo

### Passo 1: Editar `/src/utils/enhancedSchemas.ts`

Localizar a função `getEnhancedFAQSchema` e adicionar um novo case:

```typescript
export const getEnhancedFAQSchema = (slug: string) => {
  const faqSchemas: Record<string, any> = {

    // ... schemas existentes ...

    // NOVO ARTIGO: Adicionar aqui
    "seu-novo-slug-aqui": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Pergunta 1 otimizada para SEO?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Resposta completa e objetiva. Máximo 300 caracteres para featured snippet. Incluir números, dados e CTAs quando possível."
          }
        },
        {
          "@type": "Question",
          "name": "Pergunta 2 com long-tail keyword?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Outra resposta rica em informação. Use listas numeradas (1, 2, 3) ou bullet points conceituais. Exemplo: Vantagens: custo menor, ROI rápido, integração nativa."
          }
        },
        {
          "@type": "Question",
          "name": "Pergunta 3 sobre custo/ROI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Respostas com valores numéricos performam melhor: 'Investimento entre R$ X e R$ Y. ROI em Z meses. Redução de W% em custos operacionais.'"
          }
        }
      ]
    }
  };

  return faqSchemas[slug] || null;
};
```

### Passo 2: Criar o artigo normalmente

O `BlogPost.tsx` já detecta automaticamente o FAQ pelo slug.

### Passo 3: Testar

```bash
# Build do projeto
npm run build

# Acessar no browser
https://conectaone.com/blog/seu-novo-slug-aqui

# Ver source (Ctrl+U) e procurar por:
<script type="application/ld+json">
  {"@context":"https://schema.org","@type":"FAQPage"...
```

---

## 2. Como Adicionar Breadcrumb a Páginas Customizadas

O breadcrumb já está implementado para TODOS os posts do blog automaticamente.

Para adicionar em outras páginas (ex: página de serviços):

### Exemplo: Página `/servicos/sap-business-one`

```tsx
import { Helmet } from 'react-helmet-async';

const SAPServicePage = () => {
  const breadcrumbSchema = {
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
        "name": "Serviços",
        "item": "https://conectaone.com/servicos"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "SAP Business One",
        "item": "https://conectaone.com/servicos/sap-business-one"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* Conteúdo da página */}
    </>
  );
};
```

---

## 3. Como Adicionar Service Schema (Páginas de Serviços)

### Exemplo: Página `/servicos/consultoria-sap`

```tsx
import { Helmet } from 'react-helmet-async';
import { getServiceSchemas } from '@/utils/enhancedSchemas';

const ConsultoriaSAPPage = () => {
  const serviceSchemas = getServiceSchemas();
  const sapServiceSchema = serviceSchemas[0]; // Consultoria SAP B1

  return (
    <>
      <Helmet>
        <title>Consultoria SAP Business One | ConectaOne</title>

        {/* Service Schema */}
        <script type="application/ld+json">
          {JSON.stringify(sapServiceSchema)}
        </script>
      </Helmet>

      <div>
        <h1>Consultoria SAP Business One</h1>
        {/* Conteúdo da página */}
      </div>
    </>
  );
};

export default ConsultoriaSAPPage;
```

### Schema gerado:

```json
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
          "description": "Projeto completo de implantação SAP Business One..."
        }
      }
    ]
  }
}
```

---

## 4. Como Adicionar Review/Rating Schema

Quando tiver depoimentos reais com notas (ex: 5 estrelas), adicionar:

### Exemplo: Página de Case Study com Depoimento

```tsx
const CaseStudyPage = () => {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Organization",
      "name": "ConectaOne Innovation"
    },
    "author": {
      "@type": "Person",
      "name": "João Silva"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5"
    },
    "reviewBody": "A ConectaOne implementou nosso SAP Business One em 3 meses com integração de IA. Reduzimos 60% do tempo de atendimento ao cliente. Recomendo!"
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(reviewSchema)}
        </script>
      </Helmet>
      {/* Conteúdo */}
    </>
  );
};
```

**IMPORTANTE**: Só use Review schema se tiver depoimento REAL. Google penaliza reviews falsos.

---

## 5. Como Adicionar AggregateRating (Nota Média)

Quando tiver múltiplos depoimentos:

```tsx
const TestimonialsPage = () => {
  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ConectaOne Innovation",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "27",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(aggregateRatingSchema)}
        </script>
      </Helmet>

      <section>
        <h2>O que nossos clientes dizem</h2>
        <div className="rating">
          ⭐⭐⭐⭐⭐ 4.8/5 (27 avaliações)
        </div>
        {/* Lista de depoimentos */}
      </section>
    </>
  );
};
```

---

## 6. Como Adicionar VideoObject Schema

Se adicionar vídeos ao blog ou páginas:

```tsx
const VideoArticlePage = () => {
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Como integrar IA ao SAP Business One",
    "description": "Tutorial completo de integração de GPT-4 ao SAP B1 usando n8n",
    "thumbnailUrl": "https://conectaone.com/videos/thumb-sap-ia.jpg",
    "uploadDate": "2026-01-15T08:00:00+00:00",
    "duration": "PT12M34S", // 12 minutos e 34 segundos (formato ISO 8601)
    "contentUrl": "https://conectaone.com/videos/sap-ia-tutorial.mp4",
    "embedUrl": "https://www.youtube.com/embed/ABC123XYZ",
    "publisher": {
      "@type": "Organization",
      "name": "ConectaOne",
      "logo": {
        "@type": "ImageObject",
        "url": "https://conectaone.com/logo.png"
      }
    }
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(videoSchema)}
        </script>
      </Helmet>

      <article>
        <h1>Como integrar IA ao SAP Business One</h1>
        <iframe src="https://www.youtube.com/embed/ABC123XYZ" />
        {/* Conteúdo do artigo */}
      </article>
    </>
  );
};
```

---

## 7. Como Adicionar HowTo Schema (Tutoriais)

O `BlogPost.tsx` já detecta automaticamente tutoriais (slug com "como-criar" ou "tutorial").

Para customizar um HowTo schema manualmente:

```tsx
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como cadastrar fornecedor no SAP Business One",
  "description": "Guia passo a passo para cadastrar parceiros de negócios (fornecedores)",
  "totalTime": "PT5M", // 5 minutos
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "BRL",
    "value": "0"
  },
  "tool": [
    {
      "@type": "HowToTool",
      "name": "SAP Business One versão 10.0 ou superior"
    }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Acessar cadastro de Parceiros de Negócios",
      "text": "No menu principal, vá em Parceiros de Negócios > Cadastro de parceiros de negócios",
      "image": "https://conectaone.com/tutoriais/sap-menu.png"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Mudar para modo Adicionar",
      "text": "Pressione Ctrl + A ou vá no menu Dados > Adicionar"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Preencher dados do fornecedor",
      "text": "Código do PN, Tipo (selecionar Fornecedor), Nome, CNPJ, endereço e dados fiscais"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Salvar cadastro",
      "text": "Revise as informações e clique no botão Adicionar no canto inferior esquerdo"
    }
  ]
};
```

---

## 8. Best Practices para FAQ Schemas

### ✅ BOAS PRÁTICAS:

1. **Perguntas naturais** (como usuários realmente buscam):
   - ✅ "Quanto custa implementar SAP Business One?"
   - ❌ "Custos SAP B1 valores preços"

2. **Respostas completas mas concisas** (100-300 caracteres):
   - ✅ "Entre R$ 80.000 e R$ 350.000 para empresas de 50-200 usuários. Inclui licenças (~R$ 3k-5k/user), implantação (R$ 40k-150k) e infraestrutura cloud. Prazo: 3-6 meses."
   - ❌ "Depende. Entre em contato." (muito vaga)

3. **Incluir números e dados** (Google prioriza):
   - ✅ "ROI em 2-6 meses com redução de 40-70% em custos"
   - ❌ "ROI rápido e custos menores"

4. **Mínimo 3 perguntas, ideal 4-6**:
   - Google raramente ativa FAQ com menos de 3 perguntas
   - Máximo 10 perguntas (depois fica repetitivo)

5. **Evitar keyword stuffing**:
   - ✅ "Como integrar IA ao SAP Business One?"
   - ❌ "Como integrar IA Inteligência Artificial ao SAP Business One B1 ERP?"

---

### ❌ ERROS COMUNS:

1. ❌ Perguntas sem interrogação
2. ❌ Respostas muito curtas (<50 caracteres)
3. ❌ Respostas muito longas (>500 caracteres)
4. ❌ HTML dentro do texto (usar texto puro)
5. ❌ Duplicar FAQs de outros sites (Google penaliza)

---

## 9. Como Testar Schemas Antes do Deploy

### Método 1: Validator local (antes de commitar)

```bash
# Instalar validator (opcional)
npm install -g schema-validator

# Copiar schema do código e testar em:
# https://validator.schema.org/
```

### Método 2: Browser DevTools

```javascript
// No console do browser (depois de carregar a página)
const scripts = document.querySelectorAll('script[type="application/ld+json"]');
scripts.forEach((script, i) => {
  console.log(`Schema ${i + 1}:`, JSON.parse(script.textContent));
});
```

### Método 3: Rich Results Test (após deploy)

```
1. Fazer deploy
2. Acessar: https://search.google.com/test/rich-results
3. Colar URL do artigo
4. Verificar se detecta:
   - BreadcrumbList
   - FAQPage
   - Article (TechArticle/BlogPosting)
   - Organization
```

---

## 10. Checklist de Validação de Schema

Antes de adicionar um novo schema, verificar:

- [ ] Schema está na documentação oficial (schema.org)
- [ ] Todas as propriedades obrigatórias estão preenchidas
- [ ] URLs são absolutas (não relativas)
- [ ] Datas no formato ISO 8601 (YYYY-MM-DD)
- [ ] Não há HTML dentro de strings de texto
- [ ] JSON está válido (sem vírgulas extras)
- [ ] Schema testado no validator.schema.org
- [ ] Schema testado no Google Rich Results Test

---

## 11. Snippets VS Code (Produtividade)

Adicionar ao `.vscode/snippets.json`:

```json
{
  "FAQ Schema": {
    "prefix": "faq-schema",
    "body": [
      "{",
      "  \"@context\": \"https://schema.org\",",
      "  \"@type\": \"FAQPage\",",
      "  \"mainEntity\": [",
      "    {",
      "      \"@type\": \"Question\",",
      "      \"name\": \"${1:Pergunta aqui?}\",",
      "      \"acceptedAnswer\": {",
      "        \"@type\": \"Answer\",",
      "        \"text\": \"${2:Resposta completa aqui}\"",
      "      }",
      "    }",
      "  ]",
      "}"
    ]
  }
}
```

---

## 12. Recursos Úteis

### Ferramentas Online:
- Schema.org Explorer: https://schema.org/
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema Markup Validator: https://validator.schema.org/
- JSON-LD Playground: https://json-ld.org/playground/

### Extensões Chrome:
- Schema.org Markup Validator
- SEO Minion (Schema highlighter)
- Structured Data Testing Tool (deprecated, mas útil)

### Documentação Google:
- Structured Data Guidelines: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- FAQ Guidelines: https://developers.google.com/search/docs/appearance/structured-data/faqpage
- Article Guidelines: https://developers.google.com/search/docs/appearance/structured-data/article

---

## Suporte

Dúvidas sobre implementação:
1. Consultar `/src/utils/enhancedSchemas.ts` (código documentado)
2. Verificar `SCHEMA_IMPLEMENTATION_REPORT.md` (visão geral)
3. Testar em https://validator.schema.org

**Última atualização**: 2026-08-07
