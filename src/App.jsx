import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importação das páginas e componentes
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import KanbanCRM from './pages/KanbanCRM';
import ClientesList from './pages/ClientesList';
import Financeiro from './pages/Financeiro';
import Relatorios from './pages/Relatorios';

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
        <Route path="/crm" element={<KanbanCRM />} />
        <Route path="/clientes" element={<ClientesList />} />
        <Route path="/financeiro" element={<Financeiro />} />
        <Route path="/relatorios" element={<Relatorios />} />
        
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
