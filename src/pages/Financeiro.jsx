import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Users, DollarSign, FileText, Briefcase, 
  Search, Plus, Filter, Download, ArrowUpRight, ArrowDownRight, 
  MoreHorizontal, CreditCard, Wallet 
} from 'lucide-react';

export default function Financeiro() {
  const [lancamentos, setLancamentos] = useState([
    { id: 1, data: "21/04/2026", descricao: "Sinal - Projeto IA Fast Logística", categoria: "Serviços", tipo: "RECEITA", valor: 4250.00, status: "PAGO" },
    { id: 2, data: "22/04/2026", descricao: "Hospedagem Servidores AWS", categoria: "Infraestrutura", tipo: "DESPESA", valor: 350.00, status: "PENDENTE" },
    { id: 3, data: "25/04/2026", descricao: "Parcela 2/3 - Site Moda Essencial", categoria: "Serviços", tipo: "RECEITA", valor: 1166.66, status: "PENDENTE" },
    { id: 4, data: "05/05/2026", descricao: "Google Ads (Mídia Paga)", categoria: "Marketing", tipo: "DESPESA", valor: 1500.00, status: "PENDENTE" },
    { id: 5, data: "18/04/2026", descricao: "Consultoria SEO Tech Solutions", categoria: "Consultoria", tipo: "RECEITA", valor: 12000.00, status: "PAGO" },
  ]);

  const getStatusStyle = (status) => {
    return status === 'PAGO' 
      ? 'bg-green-100 text-green-700 border-green-200'
      : 'bg-yellow-100 text-yellow-700 border-yellow-200';
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      
      {/* Sidebar Lateral */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col hidden md:flex shadow-xl z-20 shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">+</div>
          <span className="text-xl font-bold text-white tracking-wide">digit@l <span className="text-blue-400">plus+</span></span>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors">
            <LayoutDashboard size={20} /> Início
          </Link>
          <Link to="/crm" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors">
            <Briefcase size={20} /> Funil de Vendas (CRM)
          </Link>
          <Link to="/clientes" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors">
            <Users size={20} /> Clientes
          </Link>
          <Link to="/financeiro" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-900/20">
            <DollarSign size={20} /> Financeiro
          </Link>
          <Link to="/relatorios" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors">
            <FileText size={20} /> Relatórios
          </Link>
        </nav>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Header Superior */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shrink-0 sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">Controlo Financeiro</h1>
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200 cursor-pointer">
            JD
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
          
          {/* Cards de Resumo Financeiro */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="p-3 bg-slate-50 text-slate-600 rounded-lg"><Wallet size={24} /></div>
              </div>
              <h3 className="text-slate-500 text-sm font-medium">Saldo Atual</h3>
              <p className="text-3xl font-bold text-slate-800 mt-1">R$ 16.250,00</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="p-3 bg-green-50 text-green-600 rounded-lg"><ArrowUpRight size={24} /></div>
              </div>
              <h3 className="text-slate-500 text-sm font-medium">Receitas (Mês)</h3>
              <p className="text-3xl font-bold text-green-600 mt-1">R$ 17.416,66</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="p-3 bg-red-50 text-red-600 rounded-lg"><ArrowDownRight size={24} /></div>
              </div>
              <h3 className="text-slate-500 text-sm font-medium">Despesas (Mês)</h3>
              <p className="text-3xl font-bold text-red-600 mt-1">R$ 1.850,00</p>
            </div>
          </div>

          {/* Barra de Ferramentas */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" placeholder="Pesquisar lançamentos..." className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"/>
              </div>
              <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors" title="Filtros">
                <Filter size={18} />
              </button>
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                <Download size={18} /> Exportar
              </button>
              <button className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm">
                <Plus size={18} /> Novo Lançamento
              </button>
            </div>
          </div>

          {/* Tabela Financeira */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
                    <th className="px-6 py-4">Data</th>
                    <th className="px-6 py-4">Descrição</th>
                    <th className="px-6 py-4">Categoria</th>
                    <th className="px-6 py-4">Tipo</th>
                    <th className="px-6 py-4">Valor</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {lancamentos.map((lanc) => (
                    <tr key={lanc.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4 text-sm text-slate-600">{lanc.data}</td>
                      <td className="px-6 py-4 font-medium text-slate-800">{lanc.descricao}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{lanc.categoria}</td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1 text-sm font-semibold ${lanc.tipo === 'RECEITA' ? 'text-green-600' : 'text-red-600'}`}>
                          {lanc.tipo === 'RECEITA' ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>}
                          {lanc.tipo}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-700">
                        R$ {lanc.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusStyle(lanc.status)}`}>
                          {lanc.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-blue-600 transition-colors">
                          <MoreHorizontal size={18} />
                        </button>
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
