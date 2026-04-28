import React, { useState } from 'react';
import { 
  Search, Plus, MoreHorizontal, Filter, Mail, Phone, Edit2, Trash2 
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

export default function ClientesList() {
  const [clientes, setClientes] = useState([
    { id: 1, nome: "Ana Paula", empresa: "Moda Essencial", email: "ana@modaessencial.com", telefone: "+55 11 99999-9999", origem: "Google Ads", status: "Ativo" },
    { id: 2, nome: "Marcos Silva", empresa: "Tech Solutions", email: "marcos@techsolutions.com", telefone: "+55 11 88888-8888", origem: "Indicação", status: "Em Negociação" },
    { id: 3, nome: "Carla Mendes", empresa: "Floricultura Florescer", email: "carla@florescer.com", telefone: "+55 11 77777-7777", origem: "WebForm Site", status: "Novo Lead" },
    { id: 4, nome: "Ricardo Farias", empresa: "Fast Logística", email: "ricardo@fastlog.com", telefone: "+55 11 66666-6666", origem: "Instagram", status: "Inativo" },
    { id: 5, nome: "Juliana Costa", empresa: "Clínica Sorriso", email: "contato@clinicasorriso.com", telefone: "+55 11 55555-5555", origem: "Google Ads", status: "Ativo" },
  ]);

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

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shrink-0">
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">Gestão de Clientes</h1>
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200 cursor-pointer">
            JD
          </div>
        </header>

        <div className="p-6 border-b border-slate-200 bg-white shrink-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Pesquisar por nome, empresa ou email..." 
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 transition-shadow"
              />
            </div>
            <button className="p-2.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2" title="Filtros">
              <Filter size={18} /> <span className="hidden sm:inline text-sm font-medium">Filtros</span>
            </button>
          </div>
          
          <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm">
            <Plus size={18} /> Adicionar Cliente
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
                  <th className="px-6 py-4">Cliente & Empresa</th>
                  <th className="px-6 py-4">Contacto</th>
                  <th className="px-6 py-4 hidden md:table-cell">Origem</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clientes.map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
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
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusColor(cliente.status)}`}>
                        {cliente.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
                          <Trash2 size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors" title="Mais Opções">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
              <span className="text-sm text-slate-500">A mostrar <span className="font-medium text-slate-800">5</span> de <span className="font-medium text-slate-800">124</span> clientes</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50" disabled>Anterior</button>
                <button className="px-3 py-1 text-sm text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50">Próxima</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
