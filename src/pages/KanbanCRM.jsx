import React, { useState, useEffect } from 'react';
import { Search, Phone, MessageCircle, Plus, MoreVertical, Users, Loader2, X, CheckCircle, BookOpen, Tag, Info } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

const fases = [
  { id: 'Prospecção', titulo: '1. Prospecção', cor: 'bg-blue-100 text-blue-800 border-blue-200' },
  { id: 'Qualificação', titulo: '2. Qualificação', cor: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { id: 'Proposta', titulo: '3. Proposta Enviada', cor: 'bg-purple-100 text-purple-800 border-purple-200' },
  { id: 'Ganho', titulo: '4. Ganho (Fechado)', cor: 'bg-green-100 text-green-800 border-green-200' },
  { id: 'Perdido', titulo: '5. Perdido', cor: 'bg-red-100 text-red-800 border-red-200' }
];

const servicosReferencia = [
  {
    nome: "Criação de Landing Page",
    descricao: "Página única focada em conversão, ideal para campanhas de anúncios, captura de leads ou vendas de um único produto/serviço.",
    min: 800, med: 1500, max: 3000
  },
  {
    nome: "E-commerce / Loja Virtual",
    descricao: "Plataforma completa de vendas online com carrinho de compras, integração de pagamentos, cálculo de envio e gestão de stock.",
    min: 2500, med: 5000, max: 15000
  },
  {
    nome: "Gestão de Tráfego Pago (Mensal)",
    descricao: "Criação e otimização de campanhas no Google Ads, Facebook Ads e Instagram Ads (não inclui o valor investido na plataforma).",
    min: 800, med: 1500, max: 5000
  },
  {
    nome: "Gestão de Redes Sociais (Mensal)",
    descricao: "Planeamento, criação de design, copywriting e agendamento de publicações estratégicas para o Instagram, Facebook e LinkedIn.",
    min: 600, med: 1200, max: 3000
  },
  {
    nome: "Identidade Visual / Branding",
    descricao: "Criação de logótipo, definição da paleta de cores, tipografia e construção de um manual da marca profissional.",
    min: 500, med: 1200, max: 4000
  },
  {
    nome: "Desenvolvimento de Sistema Web",
    descricao: "Sistemas sob medida (como ERPs, CRMs ou portais à medida) com base de dados, painel administrativo e integrações complexas.",
    min: 5000, med: 12000, max: 50000
  }
];

export default function KanbanCRM() {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);
  
  // Estado do Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novaNegociacao, setNovaNegociacao] = useState({
    nome: '', empresa: '', telefone: '', email: '', valor_estimado: '', titulo: ''
  });

  // Estado do Catálogo de Serviços (Mural)
  const [isCatalogoOpen, setIsCatalogoOpen] = useState(false);

  useEffect(() => {
    carregarNegociacoes();
  }, []);

  const carregarNegociacoes = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/negociacoes');
      if (response.data.success) {
        setLeads(response.data.data);
      }
    } catch (error) {
      console.error("Erro:", error);
      showToast("Falha ao carregar negociações", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSalvarNegociacao = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/negociacoes', novaNegociacao);
      if (response.data.success) {
        setIsModalOpen(false);
        setNovaNegociacao({ nome: '', empresa: '', telefone: '', email: '', valor_estimado: '', titulo: '' });
        showToast("Negociação e Cliente criados com sucesso!", "success");
        carregarNegociacoes();
      }
    } catch (error) {
      showToast("Erro ao gravar negociação.", "error");
    }
  };

  const handleDragStart = (e, leadId) => e.dataTransfer.setData('leadId', leadId);
  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = async (e, novaFase) => {
    e.preventDefault();
    const leadId = parseInt(e.dataTransfer.getData('leadId'));
    const leadAtualizado = leads.find(l => l.id === leadId);
    if (!leadAtualizado || leadAtualizado.fase === novaFase) return;

    const leadsAntigos = [...leads];
    setLeads(leads.map(lead => lead.id === leadId ? { ...lead, fase: novaFase } : lead));

    try {
      const response = await api.put(`/negociacoes/${leadId}/fase`, { novaFase });
      if (response.data.success) {
        if (response.data.automacao_disparada) {
           showToast(`Automação Ativa: Mensagem enviada via WhatsApp 🚀`, 'success');
        } else {
           showToast(`Fase atualizada para ${novaFase}`, 'success');
        }
      }
    } catch (error) {
      setLeads(leadsAntigos);
      showToast("Erro ao sincronizar com banco.", "error");
    }
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden relative">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shrink-0 z-10">
          <h1 className="text-2xl font-bold text-slate-800">Pipeline de Vendas</h1>
        </header>

        <div className="px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0 bg-white border-b border-slate-100">
          <div className="flex gap-2">
            <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full flex items-center gap-2">
              Total: {leads.length} negociações
            </span>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button onClick={() => setIsCatalogoOpen(true)} className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm w-full sm:w-auto justify-center transition-colors">
              <BookOpen size={18} /> Tabela de Preços
            </button>
            <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm w-full sm:w-auto justify-center transition-colors">
              <Plus size={18} /> Nova Negociação
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-x-auto overflow-y-hidden p-6">
          {isLoading ? (
            <div className="flex w-full h-full items-center justify-center text-blue-500">
               <Loader2 size={32} className="animate-spin" />
            </div>
          ) : (
            <div className="flex gap-6 h-full items-start min-w-max pb-4">
              {fases.map(fase => (
                <div key={fase.id} className="w-80 flex flex-col max-h-full bg-slate-100/50 rounded-xl border border-slate-200" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, fase.id)}>
                  <div className={`px-4 py-3 border-b border-slate-200 rounded-t-xl flex justify-between items-center ${fase.cor.split(' ')[0]}`}>
                    <h3 className={`font-semibold text-sm ${fase.cor.split(' ')[1]}`}>{fase.titulo}</h3>
                    <span className="bg-white/60 text-slate-700 text-xs font-bold px-2 py-0.5 rounded-full">
                      {leads.filter(l => l.fase === fase.id).length}
                    </span>
                  </div>

                  <div className="p-3 overflow-y-auto flex-1 space-y-3 custom-scrollbar">
                    {leads.filter(l => l.fase === fase.id).map(lead => (
                      <div key={lead.id} draggable onDragStart={(e) => handleDragStart(e, lead.id)} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 cursor-grab hover:border-blue-300 transition-all">
                        <h4 className="font-bold text-slate-800 mb-1">{lead.empresa}</h4>
                        <p className="text-sm text-slate-600 flex items-center gap-1 mb-3">
                          <Users size={14} className="text-slate-400" /> {lead.cliente}
                        </p>
                        <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                          <span className="font-bold text-slate-700">R$ {Number(lead.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        </div>
                      </div>
                    ))}
                    {leads.filter(l => l.fase === fase.id).length === 0 && (
                      <div className="h-20 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-sm">Arraste para cá</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MODAL DE CRIAÇÃO DE NEGOCIAÇÃO */}
        {isModalOpen && (
          <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <h2 className="font-bold text-slate-800">Nova Oportunidade</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
              </div>
              <form onSubmit={handleSalvarNegociacao} className="p-6 space-y-4">
                <p className="text-xs text-slate-500 mb-4">Isto criará automaticamente um registo de cliente associado.</p>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Título do Projeto</label>
                  <input required type="text" placeholder="Ex: E-commerce" value={novaNegociacao.titulo} onChange={e => setNovaNegociacao({...novaNegociacao, titulo: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Contato</label>
                    <input required type="text" value={novaNegociacao.nome} onChange={e => setNovaNegociacao({...novaNegociacao, nome: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Empresa</label>
                    <input required type="text" value={novaNegociacao.empresa} onChange={e => setNovaNegociacao({...novaNegociacao, empresa: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"/>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Telefone / WhatsApp</label>
                    <input type="text" value={novaNegociacao.telefone} onChange={e => setNovaNegociacao({...novaNegociacao, telefone: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Valor Estimado (R$)</label>
                    <input required type="number" min="0" step="0.01" value={novaNegociacao.valor_estimado} onChange={e => setNovaNegociacao({...novaNegociacao, valor_estimado: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"/>
                  </div>
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium">Cancelar</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">Gravar</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL DE CATÁLOGO DE SERVIÇOS (MURAL) */}
        {isCatalogoOpen && (
          <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-slate-800">Mural de Serviços & Preços</h2>
                    <p className="text-xs text-slate-500">Guia de referência para equipa comercial e prospecção</p>
                  </div>
                </div>
                <button onClick={() => setIsCatalogoOpen(false)} className="text-slate-400 hover:bg-slate-200 p-2 rounded-full transition-colors"><X size={24}/></button>
              </div>
              
              <div className="p-6 overflow-y-auto bg-slate-50/50 flex-1 custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {servicosReferencia.map((servico, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-base mb-2 flex items-center gap-2">
                          {servico.nome}
                        </h3>
                        <p className="text-sm text-slate-600 mb-5 min-h-[40px] leading-relaxed">
                          {servico.descricao}
                        </p>
                      </div>
                      
                      <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 mt-auto">
                        <p className="text-xs font-semibold text-slate-500 uppercase mb-2 flex items-center gap-1">
                          <Tag size={12} /> Referência de Mercado
                        </p>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase">Mínimo</p>
                            <p className="font-medium text-slate-700">R$ {servico.min.toLocaleString('pt-BR')}</p>
                          </div>
                          <div className="text-center bg-blue-100 px-3 py-1.5 rounded-md shadow-inner">
                            <p className="text-[10px] text-blue-700 uppercase font-bold">Média Cobrada</p>
                            <p className="font-bold text-blue-900 text-lg">R$ {servico.med.toLocaleString('pt-BR')}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-slate-400 uppercase">Máximo</p>
                            <p className="font-medium text-slate-700">R$ {servico.max.toLocaleString('pt-BR')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-sm text-blue-800 shadow-sm">
                  <Info size={24} className="shrink-0 text-blue-600" />
                  <p>
                    <strong>Nota para a Equipa Comercial:</strong> Os valores acima são médias praticadas no mercado e servem como referência. O preço final deve sempre considerar a complexidade do projeto do cliente, as horas estimadas da equipa e as integrações necessárias. Use estes valores como argumento de ancoragem e autoridade durante as negociações.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {toast && (
        <div className={`fixed bottom-6 right-6 px-6 py-4 rounded-lg shadow-xl border flex items-center gap-3 z-50 ${toast.type === 'success' ? 'bg-white border-green-200 text-slate-800' : 'bg-slate-800 text-white'}`}>
          {toast.type === 'success' ? <CheckCircle className="text-green-500" size={24} /> : <MessageCircle size={24} />}
          <p className="font-medium">{toast.message}</p>
        </div>
      )}
    </div>
  );
}