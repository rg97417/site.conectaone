import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Soluções',      href: '/#services' },
  { label: 'SAP Business One', href: '/#services' },
  { label: 'Diferenciais',  href: '/#why-choose-us' },
  { label: 'Como Funciona', href: '/#how-it-works' },
  { label: 'Clientes',      href: '/#testimonials' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,

        /* Resizable navbar: tall when at top, compact when scrolled */
        height: scrolled ? 56 : 72,
        display: 'flex',
        alignItems: 'center',

        background: scrolled
          ? 'rgba(255,255,255,0.96)'
          : 'rgba(255,255,255,0)',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid #e5e7eb' : '1px solid transparent',
        transition: 'height 0.25s ease, background 0.25s ease, border-color 0.25s ease, backdrop-filter 0.25s ease',
        boxShadow: scrolled ? '0 1px 8px rgba(0,0,0,0.04)' : 'none',
      }}
    >
      <div className="container-xl" style={{ width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo — also resizes */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', transition: 'all 0.25s' }}>
            <img
              src="/conectaone_logo_principal_1200.png"
              alt="ConectaOne"
              style={{
                height: scrolled ? 45 : 60,
                width: 'auto',
                transition: 'height 0.25s ease',
              }}
            />
          </a>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="hidden-mobile">
            {navLinks.map(l => (
              <a
                key={l.href + l.label}
                href={l.href}
                style={{
                  padding: '6px 13px',
                  fontSize: 14,
                  color: '#6b7280',
                  borderRadius: 6,
                  transition: 'color 0.15s, background 0.15s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = '#111827';
                  el.style.background = '#f3f4f6';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = '#6b7280';
                  el.style.background = 'transparent';
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="/#contact"
              className="btn btn-primary"
              style={{ marginLeft: 10, fontSize: 13 }}
            >
              Falar com especialista
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="show-mobile"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'transparent',
              border: '1px solid #d1d5db',
              borderRadius: 6,
              width: 36,
              height: 36,
              cursor: 'pointer',
              color: '#6b7280',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
            }}
            aria-label="Menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div
            style={{
              position: 'absolute',
              top: scrolled ? 56 : 72,
              left: 0, right: 0,
              background: 'rgba(255,255,255,0.98)',
              backdropFilter: 'blur(14px)',
              borderBottom: '1px solid #e5e7eb',
              padding: '12px 24px 24px',
            }}
          >
            {navLinks.map(l => (
              <a
                key={l.href + l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '13px 0',
                  fontSize: 15,
                  color: '#6b7280',
                  borderBottom: '1px solid #f3f4f6',
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="btn btn-primary"
              style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}
            >
              Falar com especialista
            </a>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
};

export default Header;
