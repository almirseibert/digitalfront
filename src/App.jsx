import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronRight, Code, Smartphone, BarChart, 
  Bot, LayoutTemplate, Briefcase, Calendar, Globe, 
  Target, Megaphone, Search, PenTool, LayoutDashboard, 
  Users, Columns, Settings, LogOut, ArrowRight, CheckCircle2,
  Phone, Mail, MapPin
} from 'lucide-react';

// ==========================================
// COMPONENTES PRINCIPAIS (ROTEAMENTO)
// ==========================================

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('home');

  // Função global de navegação (Substitui o useNavigate do react-router-dom neste ambiente)
  const navigate = (route) => {
    window.scrollTo(0, 0);
    setCurrentRoute(route);
  };

  // Roteador simples
  switch (currentRoute) {
    case 'home':
      return <LandingPage navigate={navigate} />;
    case 'login':
      return <Login navigate={navigate} />;
    case 'crm-dashboard':
      return <CRMDashboard navigate={navigate} />;
    default:
      return <LandingPage navigate={navigate} />;
  }
}

// ==========================================
// 1. LANDING PAGE INSTITUCIONAL
// ==========================================

function LandingPage({ navigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Efeito para mudar o estilo do header ao rolar a página
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-600 selection:text-white">
      {/* Header / Navbar */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg py-3' : 'bg-slate-900 py-5'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
              d+
            </div>
            <span className="text-2xl font-black text-white tracking-tight">digit@l <span className="text-blue-500">plus+</span></span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('servicos')} className="text-slate-300 hover:text-white font-medium transition-colors">Serviços</button>
            <button onClick={() => scrollToSection('sobre')} className="text-slate-300 hover:text-white font-medium transition-colors">A Agência</button>
            <button onClick={() => scrollToSection('contato')} className="text-slate-300 hover:text-white font-medium transition-colors">Contato</button>
            <div className="w-px h-6 bg-slate-700 mx-2"></div>
            <button 
              onClick={() => navigate('login')}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full font-medium transition-all"
            >
              Portal Cliente <ChevronRight size={16} />
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-t border-slate-800 shadow-xl flex flex-col p-6 gap-4">
            <button onClick={() => scrollToSection('servicos')} className="text-left text-slate-300 hover:text-white font-medium text-lg">Serviços</button>
            <button onClick={() => scrollToSection('sobre')} className="text-left text-slate-300 hover:text-white font-medium text-lg">A Agência</button>
            <button onClick={() => scrollToSection('contato')} className="text-left text-slate-300 hover:text-white font-medium text-lg">Contato</button>
            <button 
              onClick={() => navigate('login')}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium mt-4"
            >
              Acessar Sistema CRM
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-slate-900 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold text-sm mb-6 uppercase tracking-wider">
            Agência Full-Service & Software House
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight max-w-5xl mx-auto mb-8">
            Transformamos a sua visão em <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">resultados digitais</span>.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Desenvolvimento de software de alta performance, marketing estratégico e inteligência artificial para escalar o seu negócio na era digital.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button onClick={() => scrollToSection('servicos')} className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
              Conheça nossas Soluções <ArrowRight size={20} />
            </button>
            <button onClick={() => scrollToSection('contato')} className="w-full sm:w-auto px-8 py-4 bg-transparent border border-slate-700 hover:bg-slate-800 hover:border-slate-600 text-white rounded-full font-bold text-lg transition-all flex items-center justify-center">
              Falar com um Especialista
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section id="servicos" className="py-24 bg-slate-50 relative z-20 -mt-8 rounded-t-[40px]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nossas Especialidades</h2>
            <p className="text-slate-600 text-lg">Um ecossistema completo de serviços para impulsionar a sua marca e otimizar os processos da sua empresa.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <ServiceCard 
              icon={<Globe size={32} />} title="E-commerce B2B" 
              desc="Plataformas robustas de vendas online para negócios B2B, focadas em conversão e gestão de catálogos."
            />
            <ServiceCard 
              icon={<LayoutTemplate size={32} />} title="Sites e Portais" 
              desc="Criação de sites, e-commerces e páginas de vendas com design UI/UX focadas em performance."
            />
            <ServiceCard 
              icon={<Code size={32} />} title="Web Apps (SaaS)" 
              desc="Desenvolvimento sob medida de sistemas web ágeis e escaláveis para resolver os seus desafios."
            />
            <ServiceCard 
              icon={<Smartphone size={32} />} title="Apps Mobile (iOS/Android)" 
              desc="Aplicações nativas ou híbridas, colocando o seu negócio literalmente no bolso do seu cliente."
            />
            <ServiceCard 
              icon={<Calendar size={32} />} title="Agendamento Online" 
              desc="Sistemas inteligentes para gestão de marcações, ideal para clínicas, salões e consultorias."
            />
            <ServiceCard 
              icon={<Target size={32} />} title="Tráfego Pago" 
              desc="Gestão de campanhas de alta conversão (Meta Ads, TikTok, LinkedIn) focada em ROI."
            />
            <ServiceCard 
              icon={<BarChart size={32} />} title="Google Ads (SEM)" 
              desc="Apareça para quem já está buscando pelo seu serviço com Search Engine Marketing estratégico."
            />
            <ServiceCard 
              icon={<Search size={32} />} title="SEO & Conteúdo" 
              desc="Otimização para motores de busca e marketing de conteúdo para autoridade de marca."
            />
            <ServiceCard 
              icon={<Megaphone size={32} />} title="Gestão de Mídias Sociais" 
              desc="Estratégia, planejamento e criação de conteúdo para engajar sua comunidade nas redes."
            />
            <ServiceCard 
              icon={<Briefcase size={32} />} title="Consultoria Digital" 
              desc="Mapeamento de processos e estratégia digital para transformação do seu modelo de negócios."
            />
            <ServiceCard 
              icon={<PenTool size={32} />} title="Agência de Logo" 
              desc="Criação de identidade visual forte, moderna e memorável para posicionar sua marca no mercado."
            />
            <ServiceCard 
              icon={<Bot size={32} />} title="IA Humanizada" 
              desc="Agentes de inteligência artificial treinados para atender e vender aos seus clientes 24/7."
            />
          </div>
        </div>
      </section>

      {/* CTA / Footer */}
      <section id="contato" className="bg-slate-900 py-20 text-white">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Pronto para digitalizar o seu sucesso?</h2>
            <p className="text-slate-400 text-lg mb-8">Entre em contato com o nosso time de especialistas. Vamos analisar o seu cenário e desenhar a melhor arquitetura de software ou campanha de marketing para o seu momento atual.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-blue-400"><Phone size={20} /></div>
                <div><p className="text-sm text-slate-500">Ligue para nós</p><p className="font-medium">+55 (00) 00000-0000</p></div>
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-blue-400"><Mail size={20} /></div>
                <div><p className="text-sm text-slate-500">Envie um e-mail</p><p className="font-medium">contato@digitalplus.com.br</p></div>
              </div>
            </div>
          </div>
          <div className="bg-slate-800 rounded-3xl p-8 shadow-2xl border border-slate-700">
            <h3 className="text-2xl font-bold mb-6 text-white">Solicite um orçamento</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Nome Completo" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
              <input type="email" placeholder="E-mail Corporativo" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
              <select className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
                <option value="">Selecione o serviço de interesse</option>
                <option value="dev">Desenvolvimento (Web, Apps, E-commerce)</option>
                <option value="mkt">Marketing (Tráfego, Redes Sociais, SEO)</option>
                <option value="ia">Inteligência Artificial & Automação</option>
                <option value="design">Design & Branding</option>
              </select>
              <textarea placeholder="Fale um pouco sobre o seu projeto..." rows="4" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"></textarea>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors">Enviar Mensagem</button>
            </form>
          </div>
        </div>
        <div className="container mx-auto px-6 md:px-12 mt-20 pt-8 border-t border-slate-800 text-center text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 digit@l plus+. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <button onClick={() => navigate('login')} className="hover:text-blue-400 transition-colors">Acesso Restrito (CRM)</button>
            <span className="cursor-pointer hover:text-white transition-colors">Política de Privacidade</span>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ icon, title, desc }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
    </div>
  );
}

// ==========================================
// 2. TELA DE LOGIN DO CRM
// ==========================================

function Login({ navigate }) {
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simula tempo de rede para demonstrar que a interatividade (JS) está funcionando
    setTimeout(() => {
      setLoading(false);
      navigate('crm-dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4">
      <button 
        onClick={() => navigate('home')}
        className="absolute top-8 left-8 text-slate-400 hover:text-white flex items-center gap-2 transition-colors"
      >
        <ArrowRight className="rotate-180" size={20} /> Voltar ao Site
      </button>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg mb-4">
            d+
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Acesso ao Sistema</h1>
          <p className="text-slate-500">Gestão Integrada CRM & ERP</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">E-mail Corporativo</label>
            <input 
              type="email" 
              defaultValue="admin@digitalplus.com.br"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Senha</label>
            <input 
              type="password" 
              defaultValue="********"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
              <span className="text-slate-600">Lembrar de mim</span>
            </label>
            <a href="#" className="text-blue-600 font-medium hover:text-blue-800">Esqueceu a senha?</a>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full text-white font-bold py-3.5 rounded-xl transition-all flex justify-center items-center ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              'Entrar no Painel'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 3. LAYOUT E DASHBOARD DO CRM (MOCKUP INTERATIVO)
// ==========================================

function CRMDashboard({ navigate }) {
  // Estados para demonstrar que o JavaScript/Interatividade está perfeito após a navegação
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [counter, setCounter] = useState(0); // Prova viva da interatividade React

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      
      {/* Sidebar do CRM */}
      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:-translate-x-[4.5rem]'} flex flex-col`}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800">
          <div className={`flex items-center gap-3 ${!isSidebarOpen && 'md:hidden'}`}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">d+</div>
            <span className="font-bold text-lg whitespace-nowrap">CRM & ERP</span>
          </div>
          <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
          <p className={`px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 ${!isSidebarOpen && 'md:hidden'}`}>Menu Principal</p>
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active isOpen={isSidebarOpen} />
          <SidebarItem icon={<Columns size={20} />} label="Kanban (Funil)" isOpen={isSidebarOpen} />
          <SidebarItem icon={<Users size={20} />} label="Clientes (Leads)" isOpen={isSidebarOpen} />
          <SidebarItem icon={<Calendar size={20} />} label="Agendamentos" isOpen={isSidebarOpen} />
          <SidebarItem icon={<BarChart size={20} />} label="Relatórios" isOpen={isSidebarOpen} />
        </div>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => navigate('home')}
            className="w-full flex items-center gap-3 px-3 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            <span className={`font-medium ${!isSidebarOpen && 'md:hidden'}`}>Sair / Ver Site</span>
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal do CRM */}
      <main className="flex-1 flex flex-col w-full h-screen overflow-hidden">
        
        {/* Topbar do CRM */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-30">
          <div className="flex items-center gap-4">
            <button className="text-slate-500 hover:text-slate-800" onClick={() => setSidebarOpen(!isSidebarOpen)}>
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-slate-800 hidden sm:block">Painel de Controle</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end mr-2">
              <span className="text-sm font-bold text-slate-800">Admin Silva</span>
              <span className="text-xs text-green-600 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Online</span>
            </div>
            <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold border-2 border-blue-200 cursor-pointer">
              AS
            </div>
          </div>
        </header>

        {/* Workspace Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          
          {/* Alerta de Sucesso (Prova de interatividade na página) */}
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 flex items-start sm:items-center gap-4 mb-8 shadow-sm">
            <CheckCircle2 className="text-green-500 flex-shrink-0 mt-0.5 sm:mt-0" size={24} />
            <div>
              <h4 className="font-bold">Acesso Realizado com Sucesso!</h4>
              <p className="text-sm text-green-700">Bem-vindo à nova interface combinada (Site + CRM). Seus cliques não estão gerando a hashtag <code className="bg-green-100 px-1 rounded">/#</code> e a página está 100% interativa.</p>
            </div>
          </div>

          {/* Teste de Interatividade Local */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Bot className="text-blue-600" /> Teste de Interatividade (JavaScript Ativo)
            </h3>
            <p className="text-slate-500 mb-6 text-sm">Use o botão abaixo para confirmar que os estados do React (useState) estão respondendo perfeitamente após a navegação entre o site e o sistema.</p>
            
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setCounter(c => c + 1)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-indigo-600/30"
              >
                Clique Aqui
              </button>
              <div className="text-2xl font-black text-slate-800">
                Cliques: <span className="text-indigo-600">{counter}</span>
              </div>
            </div>
          </div>

          {/* Tabs Interativas Mockup */}
          <div className="flex border-b border-slate-200 mb-6 overflow-x-auto hide-scrollbar">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === 'overview' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              Visão Geral
            </button>
            <button 
              onClick={() => setActiveTab('leads')}
              className={`px-6 py-3 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === 'leads' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              Novos Leads (IA)
            </button>
          </div>

          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="Propostas Ativas" value="12" icon={<Briefcase />} color="blue" />
              <StatCard title="Leads no Funil" value="48" icon={<Users />} color="indigo" />
              <StatCard title="Receita Prevista" value="R$ 45.200" icon={<BarChart />} color="emerald" />
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-bold text-slate-800">Últimas interações do Bot (WhatsApp)</h3>
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">Automático</span>
              </div>
              <div className="divide-y divide-slate-100">
                {[
                  { name: 'Empresa Alpha Ltda', serv: 'E-commerce B2B', status: 'Aguardando Contato', time: 'Há 10 min' },
                  { name: 'Clínica Sorriso', serv: 'Agendamento Online', status: 'Qualificado', time: 'Há 2 horas' },
                  { name: 'Boutique Premium', serv: 'Tráfego Pago', status: 'Em Negociação', time: 'Há 5 horas' }
                ].map((lead, i) => (
                  <div key={i} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">{lead.name}</h4>
                      <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                        <Target size={14} className="text-indigo-500" /> Interesse: <span className="font-medium text-slate-700">{lead.serv}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-slate-700">{lead.status}</p>
                        <p className="text-xs text-slate-400">{lead.time}</p>
                      </div>
                      <button className="bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-600 px-4 py-2 rounded-lg font-medium text-sm transition-all shadow-sm">
                        Abrir Lead
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active, isOpen }) {
  return (
    <button className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${active ? 'bg-blue-600 text-white shadow-md shadow-blue-900/50' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
      <div className={`${active ? 'text-white' : 'text-slate-400'}`}>{icon}</div>
      <span className={`font-medium whitespace-nowrap ${!isOpen && 'md:hidden'}`}>{label}</span>
    </button>
  );
}

function StatCard({ title, value, icon, color }) {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    emerald: 'bg-emerald-50 text-emerald-600',
  };
  
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-5">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h4 className="text-2xl font-black text-slate-800">{value}</h4>
      </div>
    </div>
  );
}