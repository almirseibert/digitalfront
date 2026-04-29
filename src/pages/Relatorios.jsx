import React, { useState, useEffect } from 'react';
import { 
  BarChart3, TrendingUp, Users, DollarSign, Calendar, Download, Filter, ArrowUpRight, ArrowDownRight, Loader2
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

// Fallback component se o Sidebar não existir
const DefaultSidebar = () => <div className="w-64 bg-slate-800 text-white p-4 h-full hidden md:block">Sidebar Placeholder</div>;

export default function Relatorios() {
  const [periodo, setPeriodo] = useState('Este Mês');
  const [isLoading, setIsLoading] = useState(true);
  const [dados, setDados] = useState({
    funil: { prospeccao: 0, qualificacao: 0, proposta: 0, ganho: 0, perdido: 0 },
    financeiro: { receitas: 0, despesas: 0, lucro: 0 },
    vendasTotais: 0
  });

  useEffect(() => {
    carregarRelatorios();
  }, [periodo]);

  const carregarRelatorios = async () => {
    try {
      setIsLoading(true);
      // Aqui poderíamos enviar o periodo via query param: /relatorios?periodo=mensal
      // Para já, vamos usar a rota dashboard que traz um resumo geral
      const response = await api.get('/relatorios/dashboard');
      
      if (response.data.success) {
        const resumo = response.data.data;
        
        // Mapear os dados reais da API para os gráficos
        setDados({
          vendasTotais: resumo.vendasFechadas,
          financeiro: {
            receitas: Number(resumo.receitaPrevista),
            despesas: 0, // Despesas podem ser implementadas numa rota específica do financeiro depois
            lucro: Number(resumo.receitaPrevista)
          },
          // Como o backend ainda não retorna o breakdown por fase do funil no /dashboard,
          // mantemos a estrutura preparada. Num cenário ideal, criaríamos uma rota /relatorios/funil
          funil: {
            prospeccao: resumo.totalLeads, // Simplificação para demonstração com dados reais
            qualificacao: Math.floor(resumo.totalLeads * 0.7),
            proposta: Math.floor(resumo.totalLeads * 0.4),
            ganho: resumo.vendasFechadas,
            perdido: Math.floor(resumo.totalLeads * 0.2)
          }
        });
      }
    } catch (error) {
      console.error('Erro ao carregar relatórios:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calcularTaxaConversao = () => {
    if (dados.funil.prospeccao === 0) return 0;
    return Math.round((dados.funil.ganho / dados.funil.prospeccao) * 100);
  };

  // Tenta carregar o Sidebar, se falhar usa o fallback
  let SidebarComponent = DefaultSidebar;
  try {
     SidebarComponent = require('../components/Sidebar').default;
  } catch(e) {
      console.warn("Componente Sidebar não encontrado, usando fallback.");
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      <SidebarComponent />

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shrink-0 sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <BarChart3 className="text-blue-600" /> Relatórios e Analítica
          </h1>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 bg-white">
              <Calendar size={16} className="text-slate-500" /> {periodo}
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm transition-colors">
              <Download size={16} /> Exportar PDF
            </button>
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
          {isLoading ? (
             <div className="flex justify-center items-center h-40 text-blue-600"><Loader2 className="animate-spin" size={32} /></div>
          ) : (
            <>
              {/* KPIs Principais */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-slate-500 text-sm font-medium flex items-center justify-between mb-2">
                    Receita Bruta <DollarSign size={16} className="text-slate-400"/>
                  </p>
                  <p className="text-2xl font-bold text-slate-800">R$ {dados.financeiro.receitas.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                </div>
                
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-slate-500 text-sm font-medium flex items-center justify-between mb-2">
                    Negócios Ganhos <TrendingUp size={16} className="text-slate-400"/>
                  </p>
                  <p className="text-2xl font-bold text-slate-800">{dados.funil.ganho}</p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-slate-500 text-sm font-medium flex items-center justify-between mb-2">
                    Taxa de Conversão <BarChart3 size={16} className="text-slate-400"/>
                  </p>
                  <p className="text-2xl font-bold text-slate-800">{calcularTaxaConversao()}%</p>
                  <p className="text-xs text-green-600 flex items-center mt-1"><ArrowUpRight size={12}/> Prospecção para Ganho</p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-slate-500 text-sm font-medium flex items-center justify-between mb-2">
                    Novos Leads <Users size={16} className="text-slate-400"/>
                  </p>
                  <p className="text-2xl font-bold text-slate-800">{dados.funil.prospeccao}</p>
                </div>
              </div>

              {/* Gráficos / Tabelas Detalhadas */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Visualização de Funil Simplificada */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                  <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="font-bold text-slate-800">Funil de Vendas (Simulação)</h2>
                    <Filter size={16} className="text-slate-400" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-center gap-4">
                    
                    <div className="relative">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-slate-600">Prospecção</span>
                        <span className="font-bold">{dados.funil.prospeccao}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-8 rounded-md overflow-hidden">
                        <div className="bg-blue-400 h-full w-full"></div>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-slate-600">Qualificação</span>
                        <span className="font-bold">{dados.funil.qualificacao}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-8 rounded-md overflow-hidden flex justify-center">
                        <div className="bg-yellow-400 h-full w-[80%] rounded-md"></div>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-slate-600">Proposta</span>
                        <span className="font-bold">{dados.funil.proposta}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-8 rounded-md overflow-hidden flex justify-center">
                        <div className="bg-purple-400 h-full w-[60%] rounded-md"></div>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-slate-600">Ganho</span>
                        <span className="font-bold text-green-600">{dados.funil.ganho}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-8 rounded-md overflow-hidden flex justify-center">
                        <div className="bg-green-500 h-full w-[40%] rounded-md"></div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Resumo Financeiro */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                  <div className="p-5 border-b border-slate-100">
                    <h2 className="font-bold text-slate-800">Resumo Financeiro (Fluxo)</h2>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-center">
                    <div className="space-y-6">
                      
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-full text-green-600"><ArrowUpRight size={20}/></div>
                          <div>
                            <p className="text-sm font-medium text-green-800">Total Entradas</p>
                            <p className="text-xs text-green-600">Receitas faturadas</p>
                          </div>
                        </div>
                        <p className="text-xl font-bold text-green-700">R$ {dados.financeiro.receitas.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-full text-red-600"><ArrowDownRight size={20}/></div>
                          <div>
                            <p className="text-sm font-medium text-red-800">Total Saídas</p>
                            <p className="text-xs text-red-600">Despesas pagas</p>
                          </div>
                        </div>
                        <p className="text-xl font-bold text-red-700">R$ {dados.financeiro.despesas.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                      </div>

                      <div className="pt-4 border-t border-slate-200 flex items-center justify-between px-2">
                        <p className="font-bold text-slate-600">Resultado Líquido</p>
                        <p className={`text-2xl font-black ${dados.financeiro.lucro >= 0 ? 'text-slate-800' : 'text-red-600'}`}>
                          R$ {dados.financeiro.lucro.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                        </p>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}