import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, X, ChevronRight, Code, Smartphone, BarChart, 
  Bot, LayoutTemplate, Briefcase, Calendar, Globe, 
  Target, Megaphone, Search, PenTool, ArrowRight, 
  Phone, Mail 
} from 'lucide-react';

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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
              +
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
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full font-medium transition-all"
            >
              Acesso ao CRM <ChevronRight size={16} />
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
              onClick={() => navigate('/login')}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium mt-4"
            >
              Acessar Sistema CRM
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-slate-900 overflow-hidden">
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
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section id="servicos" className="py-24 bg-slate-50 relative z-20 -mt-8 rounded-t-[40px]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">O que oferecemos</h2>
            <p className="text-slate-600 text-lg">Um ecossistema completo de serviços para impulsionar a sua marca e otimizar processos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <ServiceCard icon={<Globe size={32} />} title="Plataforma E-commerce B2B" desc="Sistemas robustos de vendas online para negócios B2B, focados em conversão e gestão de catálogos." />
            <ServiceCard icon={<LayoutTemplate size={32} />} title="Sites e Portais" desc="Criação de sites, e-commerces e páginas de vendas focadas em alta performance e UI/UX." />
            <ServiceCard icon={<Code size={32} />} title="Web Apps (SaaS)" desc="Desenvolvimento de aplicativos web ágeis e escaláveis para resolver desafios complexos." />
            <ServiceCard icon={<Smartphone size={32} />} title="Aplicativos Mobile" desc="Desenvolvimento de aplicativos nativos ou híbridos para iOS e Android." />
            <ServiceCard icon={<Calendar size={32} />} title="Agendamento Online" desc="Sistemas inteligentes para gestão de marcações e reservas automatizadas." />
            <ServiceCard icon={<Briefcase size={32} />} title="Consultoria e Estratégia" desc="Mapeamento de processos e estratégia para a transformação do seu modelo de negócios." />
            <ServiceCard icon={<Target size={32} />} title="Tráfego Pago" desc="Gestão de campanhas de alta conversão focada no seu Retorno sobre Investimento (ROI)." />
            <ServiceCard icon={<Search size={32} />} title="Conteúdo e SEO" desc="Otimização para motores de busca e marketing de conteúdo para autoridade de marca." />
            <ServiceCard icon={<BarChart size={32} />} title="Google Ads (SEM)" desc="Apareça para quem já está buscando ativamente pelo seu serviço no Google." />
            <ServiceCard icon={<Megaphone size={32} />} title="Mídias Sociais" desc="Marketing de conteúdo e gestão estratégica das suas redes sociais." />
            <ServiceCard icon={<PenTool size={32} />} title="Agência de Logo" desc="Criação de identidade visual e logomarcas modernas para posicionar sua marca." />
            <ServiceCard icon={<Bot size={32} />} title="IA Humanizada" desc="Criação de agentes de inteligência artificial humanizada para atendimento 24 horas." />
          </div>
        </div>
      </section>

      {/* Footer / Contato */}
      <section id="contato" className="bg-slate-900 py-20 text-white">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Pronto para digitalizar o seu sucesso?</h2>
            <p className="text-slate-400 text-lg mb-8">Entre em contato com a nossa equipe. Vamos desenhar a melhor solução para o seu negócio.</p>
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
              <input type="text" placeholder="Nome Completo" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
              <input type="email" placeholder="E-mail Corporativo" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors">Enviar Mensagem</button>
            </form>
          </div>
        </div>
        <div className="container mx-auto px-6 md:px-12 mt-20 pt-8 border-t border-slate-800 text-center text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 digit@l plus+. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <button onClick={() => navigate('/login')} className="hover:text-blue-400 transition-colors">Acesso Restrito (CRM)</button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Subcomponente usado na Landing Page
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
