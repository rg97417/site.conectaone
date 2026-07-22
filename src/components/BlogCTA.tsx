import { useState } from 'react';
import { Send, Zap } from 'lucide-react';

const BlogCTA = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('submitting');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '5bf5e142-4ea4-46ec-9a0c-935919910ec9',
          email: email,
          subject: 'Novo Lead pelo Blog ConectaOne',
          from_name: 'Blog ConectaOne',
          message: 'Um novo lead demonstrou interesse lendo um artigo do blog.',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setEmail('');
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
    <div className="my-10 p-8 md:p-10 bg-gradient-to-br from-[#0B1220] to-[#1a2b4c] rounded-2xl shadow-xl text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-600 opacity-20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-blue-400 opacity-10 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={20} className="text-blue-400" />
            <span className="text-sm font-semibold tracking-wider text-blue-200 uppercase">
              Acelere sua operação
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-3 leading-tight">
            Pare de perder tempo com processos manuais.
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            Deixe seu e-mail abaixo e um especialista entrará em contato para desenhar uma solução sob medida para sua empresa.
          </p>
        </div>

        <div className="w-full md:w-auto min-w-[320px]">
          {status === 'success' ? (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl text-center">
              <p className="font-medium">Obrigado pelo interesse!</p>
              <p className="text-sm mt-1">Entraremos em contato em breve.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Seu melhor e-mail corporativo"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-70"
              >
                <Send size={16} />
                {status === 'submitting' ? 'Enviando...' : 'Falar com Especialista'}
              </button>
              {status === 'error' && (
                <p className="text-red-400 text-sm text-center">
                  Ocorreu um erro. Tente novamente.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCTA;
