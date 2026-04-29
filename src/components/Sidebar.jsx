import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, DollarSign, FileText, 
  Briefcase, Globe, LogOut, ShieldCheck 
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path) => currentPath === path;
  const navigate = useNavigate();
  const usuarioAtual = JSON.parse(localStorage.getItem('digitalplus_user') || '{}');
  const isSuperAdmin = usuarioAtual.email === 'almir.seibert@gmail.com';

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col hidden md:flex shadow-xl z-20 shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">+</div>
        <span className="text-xl font-bold text-white tracking-wide">digit@l <span className="text-blue-400">plus+</span></span>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        <Link to="/dashboard" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/dashboard') ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'hover:bg-slate-800'}`}>
          <LayoutDashboard size={20} /> Início
        </Link>
        <Link to="/crm" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/crm') ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'hover:bg-slate-800'}`}>
          <Briefcase size={20} /> Funil de Vendas
        </Link>
        <Link to="/clientes" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/clientes') ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'hover:bg-slate-800'}`}>
          <Users size={20} /> Clientes
        </Link>
        <Link to="/financeiro" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/financeiro') ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'hover:bg-slate-800'}`}>
          <DollarSign size={20} /> Financeiro
        </Link>
        <Link to="/relatorios" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/relatorios') ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'hover:bg-slate-800'}`}>
          <FileText size={20} /> Relatórios
        </Link>
        {isSuperAdmin && (
        <Link to="/usuarios" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/usuarios') ? 'bg-red-600/90 text-white shadow-lg' : 'hover:bg-slate-800'}`}>
          <ShieldCheck size={20} /> Acessos
        </Link>
)}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-2">
        <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
          <Globe size={20} /> Voltar ao Site
        </button>
        <button onClick={() => navigate('/login')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-red-400 transition-colors">
          <LogOut size={20} /> Sair do Sistema
        </button>
      </div>
    </aside>
  );
}