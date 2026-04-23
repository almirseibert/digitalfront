import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Users, DollarSign, FileText, Settings, Briefcase, 
  TrendingUp, Activity, Bell, Search, ArrowUpRight, ArrowDownRight, MessageCircle 
} from 'lucide-react';

export default function Dashboard() {
  // Dados simulados para o Dashboard
  const metricas = [
    { titulo: "Receita Prevista", valor: "R$ 45.500", variacao: "+12%", positiva: true, icone: <DollarSign size={24} className="text-blue-600" /> },
    { titulo: "Novos Leads", valor: "124", variacao: "+8%", positiva: true, icone: <Users size={24} className="text-indigo-600" /> },
    { titulo: "Vendas Fechadas", valor: "18", variacao: "-2%", positiva: false, icone: <Briefcase size={24} className="text-purple-600" /> },
    { titulo: "Taxa de Conversão", valor: "14.5%", variacao: "+1.2%", positiva: true, icone: <TrendingUp size={24} className="text-green-600" /> }
  ];

  const atividadesRecentes = [
    { id: 1, tipo: 'whatsapp', texto: 'Mensagem de qualificação enviada para Marcos Silva', tempo: 'Há 10 min', icone: <MessageCircle size={16} className="text-green-500"/> },
    { id: 2, tipo: 'venda', texto: 'Ana Paula moveu "Site E-commerce" para Ganho', tempo: 'Há 1 hora', icone: <Briefcase size={16} className="text-blue-500"/> },
    { id: 3, tipo: 'lead', texto: 'Novo lead recebido via Google Ads: Carlos Eduardo', tempo: 'Há 2 horas', icone: <Users size={16} className="text-indigo-500"/> },
    { id: 4, tipo: 'financas', texto: 'Fatura #0042 paga por Tech Solutions', tempo: 'Ontem', icone: <DollarSign size={16} className="text-emerald-500"/> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      
      {/* Sidebar Lateral */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col hidden md:flex shadow-xl z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">+</div>
          <span className="text-xl font-bold text-white tracking-wide">digit@l <span className="text-blue-400">plus+</span></span>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-900/20">
            <LayoutDashboard size={20} /> Início
          </Link>
          <Link to="/crm" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors">
            <Briefcase size={20} /> Funil de Vendas (CRM)
          </Link>
          <Link to="/clientes" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors">
            <Users size={20} /> Clientes
          </Link>
          <Link to="/financeiro" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors">
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
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" placeholder="Procurar..." className="pl-10 pr-4 py-2 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 w-64"/>
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200 cursor-pointer">
              JD
            </div>
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
          
          {/* Saudação */}
          <div className="mb-8">
            <h2 className="text-xl text-slate-600">Olá, <span className="font-bold text-slate-800">Gestor Principal</span> 👋</h2>
            <p className="text-sm text-slate-500">Aqui está o resumo do desempenho da sua agência hoje.</p>
          </div>

          {/* Cards de Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metricas.map((metrica, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-slate-50 rounded-lg">{metrica.icone}</div>
                  <span className={`flex items-center text-sm font-semibold ${metrica.positiva ? 'text-green-600' : 'text-red-600'}`}>
                    {metrica.positiva ? <ArrowUpRight size={16} className="mr-1"/> : <ArrowDownRight size={16} className="mr-1"/>}
                    {metrica.variacao}
                  </span>
                </div>
                <h3 className="text-slate-500 text-sm font-medium">{metrica.titulo}</h3>
                <p className="text-2xl font-bold text-slate-800 mt-1">{metrica.valor}</p>
              </div>
            ))}
          </div>

          {/* Secção Dupla: Gráfico e Atividades */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            
            {/* Gráfico Simulado (Esquerda) */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800 flex items-center gap-2"><Activity size={18} className="text-blue-600"/> Desempenho de Vendas</h3>
                <select className="text-sm border border-slate-200 rounded-md px-3 py-1 bg-slate-50 text-slate-600 outline-none">
                  <option>Últimos 6 Meses</option>
                  <option>Este Ano</option>
                </select>
              </div>
              <div className="h-64 flex items-end gap-4 justify-between pt-10">
                {/* Barras do Gráfico (Simulação) */}
                {[40, 70, 45, 90, 65, 100].map((height, i) => (
                  <div key={i} className="w-full flex flex-col items-center gap-2 group">
                    <div className="w-full bg-blue-100 rounded-t-md relative flex items-end justify-center h-full transition-all">
                      <div className="w-full bg-blue-500 rounded-t-md group-hover:bg-blue-600 transition-colors" style={{ height: `${height}%` }}></div>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">{['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'][i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Atividades Recentes (Direita) */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-6">Atividades Recentes</h3>
              <div className="space-y-6">
                {atividadesRecentes.map((atividade) => (
                  <div key={atividade.id} className="flex gap-4">
                    <div className="mt-1">{atividade.icone}</div>
                    <div>
                      <p className="text-sm text-slate-700 leading-snug">{atividade.texto}</p>
                      <span className="text-xs text-slate-400 mt-1 block">{atividade.tempo}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors">
                Ver todo o histórico
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
