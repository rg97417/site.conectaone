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

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col">
      <SEO 
        title={`${post.title} | Blog ConectaOne`}
        description={post.excerpt}
        canonical={`https://conectaone.com/blog/${post.slug}`}
      />
      
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
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
            "dateModified": post.date
          })}
        </script>
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
