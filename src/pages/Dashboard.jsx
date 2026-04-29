import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, DollarSign, FileText, Settings, Briefcase, 
  TrendingUp, Activity, Bell, Search, ArrowUpRight, ArrowDownRight, Loader2 
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

export default function Dashboard() {
  const [resumo, setResumo] = useState({ totalLeads: 0, vendasFechadas: 0, receitaPrevista: 0 });
  const [isLoading, setIsLoading] = useState(true);
  
  const usuarioAtual = JSON.parse(localStorage.getItem('digitalplus_user') || '{}');

  useEffect(() => {
    carregarDashboard();
  }, []);

  const carregarDashboard = async () => {
    try {
      const response = await api.get('/relatorios/dashboard');
      if (response.data.success) {
        setResumo(response.data.data);
      }
    } catch (error) {
      console.error('Erro ao carregar Dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const metricas = [
    { titulo: "Receita em Ganho (Aprovada)", valor: `R$ ${Number(resumo.receitaPrevista).toLocaleString('pt-BR', {minimumFractionDigits:2})}`, icone: <DollarSign size={24} className="text-green-600" /> },
    { titulo: "Total de Clientes", valor: resumo.totalLeads, icone: <Users size={24} className="text-indigo-600" /> },
    { titulo: "Projetos Vendidos", valor: resumo.vendasFechadas, icone: <Briefcase size={24} className="text-purple-600" /> }
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center px-6 shrink-0 sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Institucional</h1>
        </header>

        <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
          <div className="mb-8">
            <h2 className="text-xl text-slate-600">Olá, <span className="font-bold text-slate-800">{usuarioAtual.nome || 'Gestor'}</span> 👋</h2>
            <p className="text-sm text-slate-500">Aqui está o resumo dos dados reais gravados no seu banco de dados MySQL.</p>
          </div>

          {isLoading ? (
             <div className="flex justify-center items-center h-40 text-blue-600"><Loader2 className="animate-spin" size={32} /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {metricas.map((metrica, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-slate-50 rounded-lg">{metrica.icone}</div>
                  </div>
                  <h3 className="text-slate-500 text-sm font-medium">{metrica.titulo}</h3>
                  <p className="text-3xl font-bold text-slate-800 mt-1">{metrica.valor}</p>
                </div>
              ))}
            </div>
          )}

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mt-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-2"><Activity size={18} className="text-blue-600"/> Bem-vindo à Produção</h3>
              <p className="text-slate-600 text-sm">O sistema agora está ligado em tempo real. Sempre que adicionar um cliente ou criar uma negociação no menu lateral, os números acima irão atualizar-se automaticamente baseados nos dados gravados na base de dados (aaPanel).</p>
          </div>
        </div>
      </main>
    </div>
  );
}