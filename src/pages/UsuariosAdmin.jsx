import React, { useState, useEffect } from 'react';
import { ShieldCheck, Plus, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

export default function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [novoUsuario, setNovoUsuario] = useState({ nome: '', email: '', senha: '' });
  const [mensagem, setMensagem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Resgata o usuário logado para verificar a permissão
  const usuarioAtual = JSON.parse(localStorage.getItem('digitalplus_user') || '{}');
  const isSuperAdmin = usuarioAtual.email === 'almir.seibert@gmail.com';

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      const response = await api.get('/auth/usuarios');
      if (response.data.success) {
        setUsuarios(response.data.data);
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const handleCriarUsuario = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMensagem(null);

    try {
      const response = await api.post('/auth/usuarios', novoUsuario);
      if (response.data.success) {
        setMensagem({ tipo: 'sucesso', texto: 'Administrador criado com sucesso!' });
        setNovoUsuario({ nome: '', email: '', senha: '' });
        carregarUsuarios(); // Atualiza a lista
      }
    } catch (error) {
      setMensagem({ 
        tipo: 'erro', 
        texto: error.response?.data?.error || 'Erro ao criar administrador.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Se não for o Almir, bloqueia a visão da página
  if (!isSuperAdmin) {
    return (
      <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-100">
           <ShieldCheck size={64} className="text-red-500 mb-4" />
           <h1 className="text-3xl font-bold mb-2">Acesso Restrito</h1>
           <p className="text-slate-600 text-center max-w-md">
             Apenas o utilizador principal (almir.seibert@gmail.com) tem privilégios para visualizar esta página e gerir outros administradores.
           </p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center px-6 shrink-0 sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="text-blue-600" /> Gestão de Acessos (Admin)
          </h1>
        </header>

        <div className="p-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Formulário de Criação (Apenas Super Admin vê) */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-slate-200 p-6 self-start">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Adicionar Novo Administrador</h2>
            
            {mensagem && (
              <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 text-sm ${mensagem.tipo === 'sucesso' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {mensagem.tipo === 'sucesso' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                {mensagem.texto}
              </div>
            )}

            <form onSubmit={handleCriarUsuario} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" value={novoUsuario.nome} onChange={e => setNovoUsuario({...novoUsuario, nome: e.target.value})} className="w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">E-mail Corporativo</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="email" value={novoUsuario.email} onChange={e => setNovoUsuario({...novoUsuario, email: e.target.value})} className="w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Palavra-passe Segura</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="password" value={novoUsuario.senha} onChange={e => setNovoUsuario({...novoUsuario, senha: e.target.value})} minLength="6" className="w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" required />
                </div>
              </div>
              <button type="submit" disabled={isLoading} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
                {isLoading ? 'A gravar...' : <><Plus size={18} /> Criar Conta de Acesso</>}
              </button>
            </form>
          </div>

          {/* Lista de Utilizadores */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="text-lg font-bold text-slate-800">Utilizadores Cadastrados</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs uppercase text-slate-500 bg-white">
                    <th className="px-6 py-3 font-semibold">Nome & E-mail</th>
                    <th className="px-6 py-3 font-semibold">Nível de Acesso</th>
                    <th className="px-6 py-3 font-semibold">Data de Criação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {usuarios.map(user => (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-800">{user.nome}</p>
                        <p className="text-sm text-slate-500">{user.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        {user.email === 'almir.seibert@gmail.com' 
                          ? <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full border border-red-200">Super Admin</span>
                          : <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-200">Administrador</span>
                        }
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(user.data_criacao).toLocaleDateString('pt-BR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
