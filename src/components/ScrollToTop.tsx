import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Voltar ao topo"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 84,
        zIndex: 50,
        width: 36,
        height: 36,
        borderRadius: 8,
        background: '#ffffff',
        border: '1px solid #d1d5db',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: '#9ca3af',
        transition: 'color 0.15s, border-color 0.15s',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.color = '#374151';
        el.style.borderColor = '#9ca3af';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.color = '#9ca3af';
        el.style.borderColor = '#d1d5db';
      }}
    >
      <ArrowUp size={14} />
    </button>
  );
};

export default ScrollToTop;