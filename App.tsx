
import React, { useState, useEffect, Suspense, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, ChevronDown, Cpu, Globe, Rocket, Shield, 
  ArrowRight, Github, Linkedin, Twitter, Layout, 
  BarChart, Layers, Mail, PlusCircle, Sparkles, LogIn, User,
  MessageCircle, Send, Instagram, ArrowUpRight
} from 'lucide-react';
import { db } from './services/db';

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'));
const ServiceDetail = React.lazy(() => import('./pages/ServiceDetail'));
const Portfolio = React.lazy(() => import('./pages/Portfolio'));
const Blog = React.lazy(() => import('./pages/Blog'));
const Contact = React.lazy(() => import('./pages/Contact'));
const AiLab = React.lazy(() => import('./pages/AiLab'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Auth = React.lazy(() => import('./pages/Auth'));

import { SERVICES } from './constants';

const Preloader = () => {
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setPercent(prev => (prev >= 100 ? 100 : prev + 1));
    }, 15);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden">
      <div className="relative w-48 h-48 mb-8">
        <div className="absolute inset-0 border-4 border-white opacity-10 rounded-full animate-ping"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Cpu className="w-16 h-16 text-white animate-pulse" />
        </div>
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle cx="96" cy="96" r="90" className="stroke-white/20 fill-none" strokeWidth="4" />
          <circle cx="96" cy="96" r="90" className="stroke-white fill-none transition-all duration-300" strokeWidth="4" strokeDasharray={565.48} strokeDashoffset={565.48 - (565.48 * percent) / 100} />
        </svg>
      </div>
      <h1 className="font-sync text-2xl tracking-[0.2em] text-white uppercase">NextDigiPro</h1>
      <p className="mt-4 font-mono text-sm tracking-widest text-white/50">{percent}% SYNCING CORE</p>
    </div>
  );
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState(db.getChatMessages());
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setChatHistory(db.getChatMessages());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, chatHistory]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    db.saveChatMessage(message, 'user');
    setChatHistory(db.getChatMessages());
    setMessage('');
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex flex-col items-start">
      {isOpen && (
        <div className="w-80 h-[500px] bg-black border border-white/20 shadow-2xl flex flex-col mb-4 animate-in slide-in-from-bottom-10 overflow-hidden">
          <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
            <div>
              <p className="font-sync text-[10px] tracking-widest">NDP INTELLIGENCE</p>
              <p className="text-[9px] text-green-500 uppercase flex items-center gap-1">
                <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span> SYSTEM ONLINE
              </p>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform"><X size={18} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
            <div className="bg-white/5 p-3 text-xs border border-white/10 max-w-[85%] rounded-tr-xl rounded-br-xl rounded-bl-xl font-light leading-relaxed">
              Welcome to NextDigiPro. How can we elevate your digital presence today?
            </div>
            {chatHistory.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 text-xs max-w-[85%] shadow-sm ${msg.sender === 'user' ? 'bg-white text-black rounded-tl-xl rounded-bl-xl rounded-br-xl font-medium' : 'bg-white/10 border border-white/10 text-white rounded-tr-xl rounded-br-xl rounded-bl-xl font-light'}`}>
                  {msg.text}
                  <p className={`text-[8px] mt-1 opacity-50 ${msg.sender === 'user' ? 'text-black' : 'text-white'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-black flex gap-2">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Query system..." 
              className="flex-1 bg-white/5 border border-white/10 px-4 py-2 text-xs outline-none focus:border-white/40 transition-colors"
            />
            <button type="submit" className="bg-white text-black p-2 hover:bg-white/80 transition-all">
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white text-black p-4 rounded-full shadow-lg hover:scale-110 transition-all flex items-center gap-3 group relative border-2 border-transparent hover:border-white/50"
      >
        <MessageCircle size={24} />
        <span className="hidden group-hover:block absolute left-full ml-4 whitespace-nowrap bg-black text-white text-[10px] tracking-widest px-4 py-2 border border-white/20 font-sync">
          Powered by Rasheed Ur Rehman
        </span>
      </button>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { 
    setIsOpen(false); 
    setShowServices(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-3 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="font-sync text-2xl tracking-tighter flex items-center gap-3 group">
          <div className="w-10 h-10 bg-white flex items-center justify-center transition-transform group-hover:rotate-45">
            <div className="w-5 h-5 bg-black"></div>
          </div>
          <span className="hidden md:inline font-bold">NextDigiPro.com</span>
          <span className="md:hidden font-bold">NDP</span>
        </Link>

        <div className="hidden lg:flex items-center gap-10 font-medium tracking-wide text-[10px] uppercase">
          <Link to="/" className="hover:text-white/60 transition-colors tracking-widest">Home</Link>
          
          {/* Services Dropdown */}
          <div 
            className="relative group py-2"
            onMouseEnter={() => setShowServices(true)}
            onMouseLeave={() => setShowServices(false)}
          >
            <button className="flex items-center gap-1 hover:text-white/60 transition-colors tracking-widest">
              Services <ChevronDown size={12} className={`transition-transform duration-300 ${showServices ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute top-full -left-6 w-64 bg-black border border-white/10 mt-1 p-2 flex flex-col gap-1 transition-all duration-300 origin-top shadow-2xl ${showServices ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
              {SERVICES.map(s => (
                <Link 
                  key={s.id} 
                  to={`/services/${s.id}`} 
                  className="px-4 py-4 hover:bg-white hover:text-black transition-all flex items-center justify-between group/item"
                >
                  <span className="font-sync text-[9px]">{s.title}</span>
                  <ArrowRight size={12} className="opacity-0 group-hover/item:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          <Link to="/portfolio" className="hover:text-white/60 transition-colors tracking-widest">Work</Link>
          <Link to="/blog" className="hover:text-white/60 transition-colors tracking-widest">Insights</Link>
          <Link to="/contact" className="hover:text-white/60 transition-colors tracking-widest">Contact</Link>
          <Link to="/ai-lab" className="flex items-center gap-2 bg-white text-black px-6 py-2.5 hover:bg-white/80 transition-all rounded-full font-bold shadow-lg shadow-white/5">
            <Sparkles size={14} /> AI STUDIO
          </Link>
          <Link to="/dashboard" className="p-2.5 border border-white/10 hover:border-white rounded-full transition-all group">
            <Layout size={18} className="group-hover:scale-110" />
          </Link>
        </div>

        <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div className={`lg:hidden fixed inset-0 top-[70px] bg-black z-40 p-10 flex flex-col gap-8 text-3xl transition-transform duration-500 font-sync ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <Link to="/" className="border-b border-white/5 pb-4">HOME</Link>
        <div className="flex flex-col gap-4">
           <p className="text-[10px] text-white/40 tracking-[0.3em] uppercase mb-2">Capabilities</p>
           {SERVICES.map(s => (
             <Link key={s.id} to={`/services/${s.id}`} className="text-lg hover:pl-4 transition-all">{s.title}</Link>
           ))}
        </div>
        <Link to="/portfolio" className="border-b border-white/5 pb-4">PORTFOLIO</Link>
        <Link to="/blog" className="border-b border-white/5 pb-4">BLOG</Link>
        <Link to="/contact" className="border-b border-white/5 pb-4">CONTACT</Link>
        <Link to="/ai-lab" className="bg-white text-black px-6 py-6 flex justify-between items-center text-xl mt-4">
          AI STUDIO <Sparkles />
        </Link>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-black border-t border-white/10 pt-32 pb-12 px-6 relative overflow-hidden">
    {/* Decorative Elements */}
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
    <div className="absolute bottom-0 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
        {/* Branding & Mission */}
        <div className="lg:col-span-5">
          <Link to="/" className="font-sync text-4xl tracking-tighter mb-8 block font-bold">NextDigiPro<span className="text-white/30">.com</span></Link>
          <p className="text-white/50 max-w-md mb-10 leading-relaxed text-lg font-light">
            We architect high-performance digital ecosystems. From deep-learning AI integrations to global search dominance, we empower the next generation of industry leaders.
          </p>
          <div className="flex gap-4">
            {[
              { icon: <Github size={20} />, label: 'Github' },
              { icon: <Linkedin size={20} />, label: 'LinkedIn' },
              { icon: <Instagram size={20} />, label: 'Instagram' },
              { icon: <Twitter size={20} />, label: 'Twitter' }
            ].map((soc, i) => (
              <a key={i} href="#" className="p-4 border border-white/10 hover:border-white hover:bg-white hover:text-black transition-all group shadow-sm">
                {soc.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2">
          <h4 className="font-sync text-[11px] tracking-widest uppercase mb-8 text-white/40 font-bold border-b border-white/5 pb-4">Sitemap</h4>
          <div className="flex flex-col gap-4 text-sm tracking-wide font-light">
            <Link to="/" className="hover:text-white hover:translate-x-1 transition-all">Home Nodes</Link>
            <Link to="/portfolio" className="hover:text-white hover:translate-x-1 transition-all">Case Studies</Link>
            <Link to="/blog" className="hover:text-white hover:translate-x-1 transition-all">Intelligence Feed</Link>
            <Link to="/ai-lab" className="hover:text-white hover:translate-x-1 transition-all">AI Sandbox</Link>
            <Link to="/contact" className="hover:text-white hover:translate-x-1 transition-all">Direct Uplink</Link>
          </div>
        </div>

        {/* Services Links */}
        <div className="lg:col-span-2">
          <h4 className="font-sync text-[11px] tracking-widest uppercase mb-8 text-white/40 font-bold border-b border-white/5 pb-4">Solutions</h4>
          <div className="flex flex-col gap-4 text-sm tracking-wide font-light">
            {SERVICES.map(s => (
              <Link key={s.id} to={`/services/${s.id}`} className="hover:text-white hover:translate-x-1 transition-all">{s.title}</Link>
            ))}
          </div>
        </div>

        {/* Contact info */}
        <div className="lg:col-span-3">
          <h4 className="font-sync text-[11px] tracking-widest uppercase mb-8 text-white/40 font-bold border-b border-white/5 pb-4">Headquarters</h4>
          <div className="flex flex-col gap-6 text-sm tracking-wide">
            <div className="group cursor-pointer">
              <p className="text-[10px] uppercase text-white/30 tracking-widest mb-1">Direct Terminal</p>
              <p className="text-lg group-hover:text-white transition-colors">rasheedurrehman71@gmail.com</p>
            </div>
            <div className="group cursor-pointer">
              <p className="text-[10px] uppercase text-white/30 tracking-widest mb-1">Voice Uplink</p>
              <p className="text-lg group-hover:text-white transition-colors">+92 348 5496769</p>
            </div>
            <div className="pt-4">
              <Link to="/contact" className="inline-flex items-center gap-3 text-xs font-sync tracking-widest border-2 border-white px-8 py-4 hover:bg-white hover:text-black transition-all">
                BOOK CONSULT <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-white/20 tracking-[0.4em] uppercase font-bold">
        <p>© 2024 NEXTDIGIPRO GLOBAL OPERATIONS. ALL PROTOCOLS RESERVED.</p>
        <div className="flex gap-12">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Compliance</a>
          <a href="#" className="hover:text-white transition-colors">Legal Matrix</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Preloader />;

  return (
    <Router>
      <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
        <Navbar />
        <main className="pt-20">
          <Suspense fallback={<div className="h-screen flex items-center justify-center"><div className="w-12 h-12 border-2 border-white animate-spin"></div></div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/ai-lab" element={<AiLab />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </Suspense>
        </main>
        <ChatWidget />
        <Footer />
      </div>
    </Router>
  );
}
