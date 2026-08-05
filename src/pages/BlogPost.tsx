import { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet-async';
import SEO from '@/components/SEO';
import { blogPosts } from '@/data/blogPosts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCTA from '@/components/BlogCTA';

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  // Related posts logic
  const relatedPosts = [...blogPosts]
    .filter(p => p.id !== post.id)
    .sort((a, b) => {
      if (a.category === post.category && b.category !== post.category) return -1;
      if (b.category === post.category && a.category !== post.category) return 1;
      return parseInt(b.id) - parseInt(a.id);
    })
    .slice(0, 3);

  // Formatting date
  const formattedDate = new Date(post.date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  // Determine schema type based on post content
  const isTutorial = post.slug.includes('como-criar') || post.slug.includes('tutorial');
  const isTechnical = post.slug.includes('arquitetura') || post.keywords?.some(k =>
    k.includes('n8n') || k.includes('Service Layer') || k.includes('LGPD')
  );

  // Build advanced schema based on article type
  const getArticleSchema = () => {
    const baseSchema = {
      "@context": "https://schema.org",
      "headline": post.title,
      "description": post.excerpt,
      "image": "https://conectaone.com/og-image.png",
      "author": {
        "@type": "Organization",
        "name": post.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "ConectaOne",
        "logo": {
          "@type": "ImageObject",
          "url": "https://conectaone.com/conectaone_logo_principal_1200.png"
        }
      },
      "datePublished": post.date,
      "dateModified": post.date,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://conectaone.com/blog/${post.slug}`
      }
    };

    if (isTechnical) {
      return {
        ...baseSchema,
        "@type": "TechArticle",
        "proficiencyLevel": "Expert",
        "dependencies": ["SAP Business One", "n8n", "OpenAI API"],
        "articleSection": "Software Architecture"
      };
    } else if (isTutorial) {
      return {
        ...baseSchema,
        "@type": ["Article", "HowTo"],
        "step": [
          {
            "@type": "HowToStep",
            "name": "Configurar Service Layer do SAP B1",
            "text": "Habilitar e testar autenticação no Service Layer"
          },
          {
            "@type": "HowToStep",
            "name": "Configurar WhatsApp API",
            "text": "Instalar Evolution API e conectar instância"
          },
          {
            "@type": "HowToStep",
            "name": "Criar workflow n8n",
            "text": "Importar e configurar workflow de automação"
          }
        ]
      };
    } else {
      return {
        ...baseSchema,
        "@type": "BlogPosting"
      };
    }
  };

  // FAQPage schema for SAP IA articles
  const getFAQSchema = () => {
    if (post.keywords?.some(k => k.toLowerCase().includes('sap business one ia'))) {
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Como integrar IA ao SAP Business One?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A integração de IA ao SAP B1 é feita através do Service Layer (APIs REST), conectando LLMs como GPT-4o ou Claude 3.5 via n8n ou Power Automate, garantindo segurança com LGPD e autenticação OAuth."
            }
          },
          {
            "@type": "Question",
            "name": "Qual o custo de implementar IA no SAP Business One?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O custo varia entre R$ 15.000 a R$ 50.000 dependendo da complexidade. Inclui desenvolvimento (2-4 semanas), APIs OpenAI (~R$ 500/mês) e infraestrutura cloud. ROI típico em 2-6 meses."
            }
          },
          {
            "@type": "Question",
            "name": "SAP Joule ou agente customizado: qual escolher?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Para 90% das empresas SAP B1, agentes customizados são melhores: ROI mais rápido (2-4 semanas vs 3-6 meses), custo menor (pay-per-use vs licenças), e personalização total."
            }
          }
        ]
      };
    }
    return null;
  };

  const faqSchema = getFAQSchema();

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col">
      <SEO
        title={`${post.title} | Blog ConectaOne`}
        description={post.excerpt}
        canonical={`https://conectaone.com/blog/${post.slug}`}
      />

      <Helmet>
        {/* Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify(getArticleSchema())}
        </script>

        {/* FAQ Schema (if applicable) */}
        {faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
      </Helmet>
      
      <Header />

      <main className="flex-grow pt-32 pb-24 px-6">
        <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Post Header */}
          <div className="p-8 md:p-12 border-b border-gray-100">
            <Link to="/#insights" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors mb-8">
              <ArrowLeft size={16} className="mr-2" />
              Voltar para artigos
            </Link>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0B1220] leading-tight mb-6">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-500 leading-relaxed mb-8">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{post.readTime} de leitura</span>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="p-8 md:p-12 prose prose-lg prose-blue max-w-none text-[#5B6472]">
            
            {/* GEO/AEO: TL;DR Strategy Block for LLMs */}
            <div id="llm-summary" className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl mb-10" role="complementary" aria-label="TL;DR AI Summary">
              <h2 className="text-lg font-bold text-blue-900 mt-0 mb-2 flex items-center gap-2">
                <span className="text-xl">🤖</span> Resumo Rápido (TL;DR)
              </h2>
              <p className="text-blue-800 font-medium m-0">
                {post.excerpt} A ConectaOne resolve esse desafio estruturando processos integrados com SAP Business One, RPA e Inteligência Artificial.
              </p>
            </div>

            {(() => {
              // Split content by double newlines to get logical blocks/paragraphs
              const blocks = post.content.trim().split('\n\n');
              // Find the middle to inject the CTA naturally
              const midIndex = Math.max(2, Math.ceil(blocks.length / 2));
              
              const firstHalf = blocks.slice(0, midIndex).join('\n\n');
              const secondHalf = blocks.slice(midIndex).join('\n\n');

              return (
                <>
                  <ReactMarkdown>{firstHalf}</ReactMarkdown>
                  <BlogCTA />
                  <ReactMarkdown>{secondHalf}</ReactMarkdown>
                </>
              );
            })()}
          </div>
          
          {/* Related Articles (Internal Linking) */}
          <div className="p-8 md:p-12 border-t border-gray-100 bg-gray-50">
            <h3 className="text-2xl font-bold text-[#0B1220] mb-6">Leia também</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(related => (
                <Link key={related.id} to={`/blog/${related.slug}`} className="group block bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2 block">{related.category}</span>
                  <h4 className="text-lg font-bold text-[#0B1220] group-hover:text-blue-600 transition-colors line-clamp-3">{related.title}</h4>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Post Footer / CTA */}
          <div className="p-8 md:p-12 bg-[#0B1220] text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Precisa de ajuda com este desafio?</h3>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Nossos especialistas estão prontos para entender o cenário da sua empresa e desenhar a melhor solução.
            </p>
            <a 
              href="https://api.whatsapp.com/send/?phone=5511974178200&text=Olá!+Li+um+artigo+no+blog+e+gostaria+de+falar+com+um+consultor." 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
            >
              Falar com um Especialista
            </a>
          </div>
        </article>
      </main>

      <Footer />
      
      {/* Basic styles for markdown content since we don't have Tailwind Typography installed yet */}
      <style>{`
        .prose h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #0B1220;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
          line-height: 1.3;
        }
        .prose h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #0B1220;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose p {
          margin-bottom: 1.25rem;
          line-height: 1.75;
        }
        .prose ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .prose li {
          margin-bottom: 0.5rem;
        }
        .prose strong {
          color: #0B1220;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default BlogPost;
