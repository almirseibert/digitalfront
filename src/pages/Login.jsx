import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import api from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErro('');

    try {
      // Faz a chamada real ao Backend
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.success) {
        // Guarda o token e os dados do utilizador no navegador
        localStorage.setItem('digitalplus_token', response.data.token);
        localStorage.setItem('digitalplus_user', JSON.stringify(response.data.usuario));
        
        // Reencaminha para o CRM
        navigate('/dashboard'); 
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErro(error.response.data.error);
      } else {
        setErro('Erro de ligação ao servidor. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
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
          {/* ... (mantenha os mesmos elementos visuais que já existiam aqui) ... */}
          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold mb-4 leading-tight">O Motor do Seu <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Negócio Digital</span></h1>
            <p className="text-slate-400 text-lg">Faça login para aceder ao seu CRM e gerir os seus resultados.</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-slate-800">Bem-vindo de volta! 👋</h2>
            <p className="text-slate-500 mt-2">Insira as suas credenciais para continuar.</p>
          </div>

          {/* Mensagem de Erro */}
          {erro && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
              <AlertCircle size={20} />
              <p className="text-sm font-medium">{erro}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">E-mail Corporativo</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 transition-all" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Palavra-passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 transition-all" required />
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
