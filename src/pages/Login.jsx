import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulação de tempo de carregamento antes do redirecionamento
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard'); 
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans relative">
      <button 
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 text-slate-500 hover:text-slate-800 flex items-center gap-2 transition-colors"
      >
        <ArrowRight className="rotate-180" size={20} /> Voltar ao Site
      </button>

      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row z-10">
        <div className="w-full md:w-1/2 bg-slate-900 p-12 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">+</div>
              <span className="text-3xl font-bold tracking-wide">digit@l <span className="text-blue-400">plus+</span></span>
            </div>
            <h1 className="text-4xl font-extrabold mb-4 leading-tight">O Motor do Seu <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Negócio Digital</span></h1>
            <p className="text-slate-400 text-lg">Faça login para acessar ao seu CRM, gerenciar leads e acompanhar os resultados em tempo real.</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-slate-800">Bem-vindo de volta! 👋</h2>
            <p className="text-slate-500 mt-2">Insira as suas credenciais para continuar.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Endereço de E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@digitalplus.com.br" className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 transition-all" required />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-slate-700">Palavra-passe</label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 transition-all" required />
              </div>
            </div>
            <button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-600/30">
              {isLoading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <>Entrar no Sistema <ArrowRight size={20} /></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
