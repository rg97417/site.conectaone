import { useState } from 'react';
import { Mail, Phone, Send, ArrowRight } from 'lucide-react';

const whatsappUrl = "https://api.whatsapp.com/send/?phone=5511974178200&text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+as+solu%C3%A7%C3%B5es+personalizadas+da+ConectaOne.&type=phone_number&app_absent=0";

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  fontSize: 14,
  color: '#111827',
  background: '#ffffff',
  border: '1px solid #d1d5db',
  borderRadius: 8,
  outline: 'none',
  fontFamily: 'Inter, sans-serif',
  transition: 'border-color 0.15s',
};

const WAButton = () => (
  <a
    href={whatsappUrl}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp"
    style={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      zIndex: 100,
      width: 52,
      height: 52,
      borderRadius: '50%',
      background: '#16a34a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
      transition: 'transform 0.15s',
    }}
    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.08)'}
    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'}
  >
    <svg width="24" height="24" fill="#fff" viewBox="0 0 24 24">
      <path d="M20.4 3.6C18.2 1.4 15.2 0 12 0 5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.7 6L0 24l6.2-1.6c1.8 1 3.8 1.5 5.8 1.5 6.6 0 12-5.4 12-12 0-3.2-1.4-6.2-3.6-8.4zM12 22c-1.8 0-3.5-.5-5.1-1.4l-.4-.2-3.9 1 1-3.8-.2-.4C2.5 15.5 2 13.8 2 12c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10zm5.5-7.4c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.1-.2.2-.8.9-1 1.1-.2.2-.3.2-.6.1-1.7-.9-2.8-1.6-4-3.6-.3-.5.3-.5.9-1.7.1-.2 0-.4-.1-.6s-.7-1.8-1-2.4c-.3-.7-.6-.6-.8-.6h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4z"/>
    </svg>
  </a>
);

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          ...form, 
          access_key: '5bf5e142-4ea4-46ec-9a0c-935919910ec9' 
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', company: '', message: '' });
      } else {
        setStatus('error');
      }
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section
      id="contact"
      className="section"
      style={{ background: '#ffffff', borderTop: '1px solid #e5e7eb' }}
    >
      <WAButton />

      <div className="container-xl">

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <span className="section-label">Contato</span>
          <h2 className="section-heading">Vamos conversar</h2>
          <p className="section-sub">
            Nossa equipe está pronta para entender as necessidades da sua empresa e mostrar como a automação pode transformar seus resultados.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 340px',
            gap: 24,
            alignItems: 'start',
          }}
          className="contact-grid"
        >

          {/* Form */}
          <div
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: 12,
              padding: '32px 28px',
              background: '#ffffff',
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 24, letterSpacing: '-0.01em' }}>
              Fale com um especialista
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="form-row">
                {[
                  { id: 'name',    label: 'Nome',    type: 'text',  placeholder: 'Seu nome' },
                  { id: 'email',   label: 'Email',   type: 'email', placeholder: 'seu@email.com' },
                  { id: 'phone',   label: 'Telefone',type: 'tel',   placeholder: '(11) 90000-0000' },
                  { id: 'company', label: 'Empresa', type: 'text',  placeholder: 'Nome da empresa' },
                ].map(f => (
                  <div key={f.id}>
                    <label style={{ display: 'block', fontSize: 12, color: '#6b7280', marginBottom: 6, fontWeight: 500 }}>
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      id={f.id}
                      name={f.id}
                      value={form[f.id as keyof typeof form]}
                      onChange={handleChange}
                      placeholder={f.placeholder}
                      required={f.id === 'name' || f.id === 'email'}
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = '#9ca3af')}
                      onBlur={e => (e.currentTarget.style.borderColor = '#d1d5db')}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#6b7280', marginBottom: 6, fontWeight: 500 }}>
                  Mensagem
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Descreva brevemente sua necessidade..."
                  required
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#9ca3af')}
                  onBlur={e => (e.currentTarget.style.borderColor = '#d1d5db')}
                />
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn btn-primary btn-lg"
                  style={{ flex: 1, justifyContent: 'center', opacity: status === 'submitting' ? 0.6 : 1 }}
                >
                  <Send size={14} />
                  {status === 'submitting' ? 'Enviando…' : 'Enviar'}
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-lg"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  WhatsApp
                </a>
              </div>

              {status === 'success' && (
                <p style={{ fontSize: 13, color: '#16a34a', textAlign: 'center' }}>
                  Mensagem enviada. Entraremos em contato em breve.
                </p>
              )}
              {status === 'error' && (
                <p style={{ fontSize: 13, color: '#dc2626', textAlign: 'center' }}>
                  Erro ao enviar. Tente novamente ou use o WhatsApp.
                </p>
              )}
            </form>
          </div>

          {/* Info sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

            {[
              { icon: <Mail size={16} />, label: 'Email', value: 'contato@conectaone.com', href: 'mailto:contato@conectaone.com' },
              { icon: <Phone size={16} />, label: 'Telefone', value: '+55 (11) 97417-8200', href: 'tel:+5511974178200' },
            ].map((c, i) => (
              <a
                key={i}
                href={c.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '16px 18px',
                  border: '1px solid #e5e7eb',
                  borderRadius: 10,
                  background: '#ffffff',
                  transition: 'border-color 0.15s',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = '#d1d5db'}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = '#e5e7eb'}
              >
                <span style={{ color: '#9ca3af', flexShrink: 0 }}>{c.icon}</span>
                <div>
                  <p style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{c.label}</p>
                  <p style={{ fontSize: 13, color: '#111827', fontWeight: 500 }}>{c.value}</p>
                </div>
              </a>
            ))}

            <div
              style={{
                padding: '16px 18px',
                border: '1px solid #e5e7eb',
                borderRadius: 10,
                background: '#f9fafb',
              }}
            >
              <p style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Horário</p>
              <p style={{ fontSize: 13, color: '#6b7280' }}>Seg–Sex: 9h às 18h</p>
              <p style={{ fontSize: 13, color: '#6b7280' }}>Sábado: 9h às 12h</p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ justifyContent: 'space-between', padding: '14px 18px' }}
            >
              <span style={{ fontSize: 13 }}>Resposta em até 2h úteis</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
