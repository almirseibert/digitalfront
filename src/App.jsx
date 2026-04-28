import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importação das páginas e componentes
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';

// Componente temporário para manter as rotas existentes ativas
// (Substitua pelos seus componentes reais, como KanbanCRM, ClientesList, etc.)
function PlaceholderPage({ title }) {
  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col p-8">
         <h1 className="text-3xl font-bold mb-4">{title}</h1>
         <p className="text-slate-600">
           Esta página está conectada corretamente ao roteador. Você deve importar e colocar o seu componente original (ex: KanbanCRM) aqui.
         </p>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rota do Site Institucional (Landing Page) */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Rota de Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Rotas Privadas do CRM */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crm" element={<PlaceholderPage title="Funil de Vendas (Kanban)" />} />
        <Route path="/clientes" element={<PlaceholderPage title="Gestão de Clientes" />} />
        <Route path="/financeiro" element={<PlaceholderPage title="Financeiro" />} />
        <Route path="/relatorios" element={<PlaceholderPage title="Relatórios" />} />
        
        {/* Rota 404 - Se o usuário digitar um link errado */}
        <Route path="*" element={
          <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">404 - Página não encontrada</h1>
            <Link to="/" className="text-blue-600 hover:underline font-medium">Voltar ao Início</Link>
          </div>
        } />
      </Routes>
    </Router>
  );
}
