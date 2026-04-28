import React from 'react';
import { BarChart2, PieChart, TrendingUp, Download, Calendar } from 'lucide-react';
import Sidebar from '../components/Sidebar';

export default function Relatorios() {
  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shrink-0 sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">Relatórios e Indicadores</h1>
          <div className="flex items-center gap-4">
            <button className="border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
              <Calendar size={18} /> Este Trimestre
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
              <Download size={18} /> Exportar PDF
            </button>
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <PieChart size={18} className="text-blue-600"/> Origem dos Clientes Fechados
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">Google Ads</span>
                    <span className="font-bold text-slate-800">45%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '45%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">Indicações</span>
                    <span className="font-bold text-slate-800">30%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-indigo-500 h-2 rounded-full" style={{width: '30%'}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">Instagram</span>
                    <span className="font-bold text-slate-800">15%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '15%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <TrendingUp size={18} className="text-blue-600"/> Taxa de Conversão do Funil
              </h3>
              
              <div className="relative flex flex-col items-center justify-center h-48 py-4">
                <div className="w-full max-w-[250px] bg-blue-100 h-12 flex items-center justify-center font-bold text-blue-800 rounded-t-lg mb-1">
                  100 Leads Iniciais
                </div>
                <div className="w-full max-w-[200px] bg-blue-300 h-12 flex items-center justify-center font-bold text-blue-900 mb-1">
                  60 Qualificados
                </div>
                <div className="w-full max-w-[150px] bg-blue-500 h-12 flex items-center justify-center font-bold text-white mb-1">
                  35 Propostas
                </div>
                <div className="w-full max-w-[100px] bg-blue-700 h-12 flex items-center justify-center font-bold text-white rounded-b-lg">
                  18 Vendas
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <BarChart2 size={18} className="text-blue-600"/> Serviços Mais Vendidos
              </h3>
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-sm text-slate-500">
                    <th className="pb-3 font-medium">Nome do Serviço</th>
                    <th className="pb-3 font-medium text-right">Qtd. Vendas</th>
                    <th className="pb-3 font-medium text-right">Receita Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  <tr>
                    <td className="py-4 font-semibold text-slate-800">Desenvolvimento de Site E-commerce</td>
                    <td className="py-4 text-right text-slate-600">8</td>
                    <td className="py-4 text-right font-bold text-green-600">R$ 28.000,00</td>
                  </tr>
                  <tr>
                    <td className="py-4 font-semibold text-slate-800">Integração IA Atendimento (WhatsApp)</td>
                    <td className="py-4 text-right text-slate-600">6</td>
                    <td className="py-4 text-right font-bold text-green-600">R$ 51.000,00</td>
                  </tr>
                  <tr>
                    <td className="py-4 font-semibold text-slate-800">Consultoria SEO Avançada</td>
                    <td className="py-4 text-right text-slate-600">4</td>
                    <td className="py-4 text-right font-bold text-green-600">R$ 18.000,00</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
