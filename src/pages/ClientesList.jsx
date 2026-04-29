import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, MoreHorizontal, Filter, Mail, Phone, Edit2, Trash2, X, Loader2
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

export default function ClientesList() {
  const [clientes, setClientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novoCliente, setNovoCliente] = useState({
    nome: '', empresa: '', email: '', telefone: '', origem: 'Site'
  });

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/clientes');
      if (response.data.success) {
        setClientes(response.data.data);
      }
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
      alert('Erro ao carregar os dados dos clientes.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSalvarCliente = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/clientes', novoCliente);
      if (response.data.success) {
        setIsModalOpen(false);
        setNovoCliente({ nome: '', empresa: '', email: '', telefone: '', origem: 'Site' });
        carregarClientes(); // Recarrega a lista
      }
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      alert('Ocorreu um erro ao gravar o cliente.');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Ativo': return 'bg-green-100 text-green-700 border-green-200';
      case 'Em Negociação': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Novo Lead': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shrink-0">
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">Gestão de Clientes</h1>
        </header>

        <div className="p-6 border-b border-slate-200 bg-white shrink-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" placeholder="Pesquisar..." className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 bg-slate-50"/>
            </div>
          </div>
          
          <button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 shadow-sm">
            <Plus size={18} /> Adicionar Cliente
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            {isLoading ? (
              <div className="flex justify-center items-center h-40 text-blue-600">
                <Loader2 className="animate-spin" size={32} />
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
                    <th className="px-6 py-4">Cliente & Empresa</th>
                    <th className="px-6 py-4">Contacto</th>
                    <th className="px-6 py-4 hidden md:table-cell">Origem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {clientes.map((cliente) => (
                    <tr key={cliente.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold uppercase">
                            {cliente.nome.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">{cliente.nome}</p>
                            <p className="text-xs text-slate-500">{cliente.empresa}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="text-sm text-slate-600 flex items-center gap-2"><Mail size={14} className="text-slate-400"/> {cliente.email}</p>
                          <p className="text-sm text-slate-600 flex items-center gap-2"><Phone size={14} className="text-slate-400"/> {cliente.telefone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="text-sm text-slate-600">{cliente.origem}</span>
                      </td>
                    </tr>
                  ))}
                  {clientes.length === 0 && (
                    <tr>
                      <td colSpan="3" className="px-6 py-8 text-center text-slate-500">Nenhum cliente cadastrado ainda.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* MODAL DE CRIAÇÃO */}
        {isModalOpen && (
          <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <h2 className="font-bold text-slate-800">Novo Cliente</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
              </div>
              <form onSubmit={handleSalvarCliente} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Cliente</label>
                  <input required type="text" value={novoCliente.nome} onChange={e => setNovoCliente({...novoCliente, nome: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Empresa</label>
                  <input type="text" value={novoCliente.empresa} onChange={e => setNovoCliente({...novoCliente, empresa: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
                    <input type="email" value={novoCliente.email} onChange={e => setNovoCliente({...novoCliente, email: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Telefone</label>
                    <input type="text" value={novoCliente.telefone} onChange={e => setNovoCliente({...novoCliente, telefone: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"/>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Origem (Onde nos conheceu?)</label>
                  <select value={novoCliente.origem} onChange={e => setNovoCliente({...novoCliente, origem: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                    <option value="Site">Site</option>
                    <option value="Google Ads">Google Ads</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Indicação">Indicação</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium">Cancelar</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">Gravar Cliente</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}