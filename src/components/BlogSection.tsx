import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/blogPosts';

const BlogSection = () => {
  // Get the 3 most recent posts
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <section
      className="section"
      style={{ background: '#ffffff', borderTop: '1px solid #e5e7eb' }}
    >
      <div className="container-xl">

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: 48,
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div>
            <span className="section-label">Blog</span>
            <h2 className="section-heading" style={{ marginBottom: 0 }}>Insights & recursos</h2>
          </div>
          <Link
            to="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              color: '#9ca3af',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#6b7280'}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#9ca3af'}
          >
            Ver todos
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            overflow: 'hidden',
          }}
          className="blog-grid"
        >
          {recentPosts.map((post, i) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              style={{
                display: 'block',
                padding: '28px 24px',
                borderRight: i < recentPosts.length - 1 ? '1px solid #e5e7eb' : 'none',
                background: '#ffffff',
                transition: 'background 0.15s',
                textDecoration: 'none',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = '#f9fafb'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = '#ffffff'}
            >
              <span
                style={{
                  display: 'inline-block',
                  fontSize: 11,
                  fontWeight: 500,
                  color: '#9ca3af',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: 14,
                  fontFamily: 'monospace',
                }}
              >
                {post.category}
              </span>
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#111827',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.4,
                  marginBottom: 10,
                }}
              >
                {post.title}
              </h3>
              <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.65, marginBottom: 20 }}>
                {post.excerpt}
              </p>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 13,
                  color: '#9ca3af',
                }}
              >
                Ler artigo <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .blog-grid { grid-template-columns: 1fr !important; }
          .blog-grid a { border-right: none !important; border-bottom: 1px solid #e5e7eb; }
          .blog-grid a:last-child { border-bottom: none; }
        }
      `}</style>
    </section>
  );
};

export default BlogSection;