import React, { useState, useEffect } from 'react';
import { 
  Search, Bell, Phone, CheckCircle, 
  MessageCircle, Plus, MoreVertical, Briefcase,
  Users, Loader2
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import api from '../services/api'; // Importa a conexão com o Backend

const fases = [
  { id: 'Prospecção', titulo: '1. Prospecção', cor: 'bg-blue-100 text-blue-800 border-blue-200' },
  { id: 'Qualificação', titulo: '2. Qualificação', cor: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { id: 'Proposta', titulo: '3. Proposta Enviada', cor: 'bg-purple-100 text-purple-800 border-purple-200' },
  { id: 'Ganho', titulo: '4. Ganho (Fechado)', cor: 'bg-green-100 text-green-800 border-green-200' },
  { id: 'Perdido', titulo: '5. Perdido', cor: 'bg-red-100 text-red-800 border-red-200' }
];

export default function KanbanCRM() {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // 1. Hook para carregar as negociações do backend ao abrir a página
  useEffect(() => {
    carregarNegociacoes();
  }, []);

  const carregarNegociacoes = async () => {
    try {
      setIsLoading(true);
      // Chama a rota GET /api/negociacoes que você criou no server.js
      const response = await api.get('/negociacoes');
      if (response.data.success) {
        setLeads(response.data.data);
      }
    } catch (error) {
      console.error("Erro ao carregar do servidor:", error);
      showToast("Falha ao conectar com o servidor Node.js", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragStart = (e, leadId) => {
    e.dataTransfer.setData('leadId', leadId);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); 
  };

  // 2. Atualiza a fase via Drag & Drop e dispara no backend
  const handleDrop = async (e, novaFase) => {
    e.preventDefault();
    const leadId = parseInt(e.dataTransfer.getData('leadId'));
    
    const leadAtualizado = leads.find(l => l.id === leadId);
    if (!leadAtualizado || leadAtualizado.fase === novaFase) return;

    // Atualização otimista: atualiza a interface instantaneamente para o usuário
    const leadsAntigos = [...leads];
    setLeads(leads.map(lead => 
      lead.id === leadId ? { ...lead, fase: novaFase } : lead
    ));

    try {
      // Chama a rota PUT /api/negociacoes/:id/fase do seu backend
      const response = await api.put(`/negociacoes/${leadId}/fase`, { novaFase });
      
      if (response.data.success) {
        // Se o backend disparou a automação do WhatsApp (como configurado no server.js)
        if (response.data.automacao_disparada) {
           showToast(`Automação Ativa: Mensagem enviada para ${leadAtualizado.cliente} no WhatsApp 🚀`, 'success');
        } else if (novaFase === 'Ganho') {
           showToast(`Parabéns! Venda fechada com ${leadAtualizado.empresa} 🎉`, 'success');
        } else {
           showToast(`Fase atualizada para ${novaFase}`, 'success');
        }
      }
    } catch (error) {
      console.error("Erro ao atualizar a fase:", error);
      // Reverte a atualização otimista na tela se a chamada falhar
      setLeads(leadsAntigos);
      showToast("Erro ao sincronizar com o banco de dados.", "error");
    }
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      
      <Sidebar />

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
            <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full flex items-center gap-2">
              Total: {isLoading ? <Loader2 size={12} className="animate-spin" /> : leads.length} negociações
            </span>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm">
            <Plus size={18} />
            Nova Negociação
          </button>
        </div>

        {/* Quadro Kanban (Área de Arrastar e Soltar) */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden p-6">
          {isLoading ? (
            <div className="flex w-full h-full items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-slate-400">
                 <Loader2 size={32} className="animate-spin text-blue-500" />
                 <p>Conectando ao banco de dados...</p>
              </div>
            </div>
          ) : (
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
                            R$ {Number(lead.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
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
          )}
        </div>
      </main>

      {/* Toast Notification (Alerta do Sistema/WhatsApp) */}
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