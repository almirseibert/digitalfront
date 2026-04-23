import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Bell, Settings, LayoutDashboard, Users, 
  DollarSign, FileText, Phone, CheckCircle, XCircle, 
  MessageCircle, Plus, MoreVertical, Briefcase 
} from 'lucide-react';

const initialLeads = [
  { id: 1, cliente: "Ana Paula", empresa: "Moda Essencial", valor: 3500.00, fase: "Prospecção", telefone: "5511999999999" },
  { id: 2, cliente: "Marcos Silva", empresa: "Tech Solutions", valor: 12000.00, fase: "Prospecção", telefone: "5511888888888" },
  { id: 3, cliente: "Carla Mendes", empresa: "Floricultura Florescer", valor: 1500.00, fase: "Qualificação", telefone: "5511777777777" },
  { id: 4, cliente: "Ricardo Farias", empresa: "Fast Logística", valor: 8500.00, fase: "Proposta", telefone: "5511666666666" },
];

const fases = [
  { id: 'Prospecção', titulo: '1. Prospecção', cor: 'bg-blue-100 text-blue-800 border-blue-200' },
  { id: 'Qualificação', titulo: '2. Qualificação', cor: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { id: 'Proposta', titulo: '3. Proposta Enviada', cor: 'bg-purple-100 text-purple-800 border-purple-200' },
  { id: 'Ganho', titulo: '4. Ganho (Fechado)', cor: 'bg-green-100 text-green-800 border-green-200' },
  { id: 'Perdido', titulo: '5. Perdido', cor: 'bg-red-100 text-red-800 border-red-200' }
];

export default function KanbanCRM() {
  const [leads, setLeads] = useState(initialLeads);
  const [toast, setToast] = useState(null);

  const handleDragStart = (e, leadId) => {
    e.dataTransfer.setData('leadId', leadId);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); 
  };

  const handleDrop = (e, novaFase) => {
    e.preventDefault();
    const leadId = parseInt(e.dataTransfer.getData('leadId'));
    
    const leadAtualizado = leads.find(l => l.id === leadId);
    if (!leadAtualizado || leadAtualizado.fase === novaFase) return;

    setLeads(leads.map(lead => 
      lead.id === leadId ? { ...lead, fase: novaFase } : lead
    ));

    if (novaFase === 'Proposta') {
      showToast(`Automação: Mensagem de "Proposta" enviada para o WhatsApp de ${leadAtualizado.cliente} 🚀`, 'success');
    } else if (novaFase === 'Ganho') {
      showToast(`Parabéns! Venda de R$ ${leadAtualizado.valor} fechada com ${leadAtualizado.empresa} 🎉`, 'success');
    }
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      
      {/* Sidebar Lateral (Estilo digit@l plus+) */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col hidden md:flex shadow-xl z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">+</div>
          <span className="text-xl font-bold text-white tracking-wide">digit@l <span className="text-blue-400">plus+</span></span>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors">
            <LayoutDashboard size={20} /> Início
          </Link>
          <Link to="/crm" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-900/20">
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

        <div className="p-4 border-t border-slate-800">
          <Link to="/login" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors">
            <Settings size={20} /> Configurações
          </Link>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Header Superior */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shrink-0 z-10">
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            Pipeline de Vendas
          </h1>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar negociação..." 
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 bg-slate-50"
              />
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200 cursor-pointer">
              JD
            </div>
          </div>
        </header>

        {/* Barra de Ações */}
        <div className="px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0 bg-white border-b border-slate-100">
          <div className="flex gap-2">
            <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              Total: {leads.length} negociações
            </span>
            <span className="text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full flex items-center gap-1">
              <DollarSign size={14} />
              {leads.reduce((acc, lead) => acc + lead.valor, 0).toLocaleString('pt-BR')}
            </span>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm">
            <Plus size={18} />
            Nova Negociação
          </button>
        </div>

        {/* Quadro Kanban (Área de Arrastar e Soltar) */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden p-6">
          <div className="flex gap-6 h-full items-start min-w-max pb-4">
            
            {fases.map(fase => (
              <div 
                key={fase.id}
                className="w-80 flex flex-col max-h-full bg-slate-100/50 rounded-xl border border-slate-200"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, fase.id)}
              >
                {/* Cabeçalho da Coluna */}
                <div className={`px-4 py-3 border-b border-slate-200 rounded-t-xl flex justify-between items-center ${fase.cor.split(' ')[0]}`}>
                  <h3 className={`font-semibold text-sm ${fase.cor.split(' ')[1]}`}>{fase.titulo}</h3>
                  <span className="bg-white/60 text-slate-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    {leads.filter(l => l.fase === fase.id).length}
                  </span>
                </div>

                {/* Lista de Cartões (Leads) */}
                <div className="p-3 overflow-y-auto flex-1 space-y-3 custom-scrollbar">
                  {leads.filter(l => l.fase === fase.id).map(lead => (
                    <div 
                      key={lead.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead.id)}
                      className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 cursor-grab active:cursor-grabbing hover:border-blue-300 hover:shadow-md transition-all group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          ID: #{lead.id}
                        </span>
                        <button className="text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                      
                      <h4 className="font-bold text-slate-800 mb-1">{lead.empresa}</h4>
                      <p className="text-sm text-slate-600 flex items-center gap-1 mb-3">
                        <Users size={14} className="text-slate-400" /> {lead.cliente}
                      </p>
                      
                      <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                        <span className="font-bold text-slate-700">
                          R$ {lead.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                        <div className="flex gap-2">
                           <button className="text-slate-400 hover:text-green-500 transition-colors" title="WhatsApp">
                             <MessageCircle size={16} />
                           </button>
                           <button className="text-slate-400 hover:text-blue-500 transition-colors" title="Ligar">
                             <Phone size={16} />
                           </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Espaço vazio para facilitar o drop se a coluna estiver vazia */}
                  {leads.filter(l => l.fase === fase.id).length === 0 && (
                    <div className="h-20 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-sm">
                      Arraste para cá
                    </div>
                  )}
                </div>
              </div>
            ))}

          </div>
        </div>
      </main>

      {/* Toast Notification (Simulação de Alerta do Sistema/WhatsApp) */}
      {toast && (
        <div className={`fixed bottom-6 right-6 px-6 py-4 rounded-lg shadow-xl border flex items-center gap-3 transform transition-all duration-300 z-50 animate-in slide-in-from-bottom-5 ${
          toast.type === 'success' ? 'bg-white border-green-200 text-slate-800' : 'bg-slate-800 text-white border-slate-700'
        }`}>
          {toast.type === 'success' ? <CheckCircle className="text-green-500" size={24} /> : <MessageCircle size={24} />}
          <p className="font-medium">{toast.message}</p>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
      `}} />
    </div>
  );
}