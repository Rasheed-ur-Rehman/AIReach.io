
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Cpu, Layers, Globe, Shield, Rocket, ChevronRight } from 'lucide-react';
import { SERVICES } from '../constants';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
      {/* Background Animated Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        <div className="scanline"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full z-10 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/10 bg-white/5 text-xs tracking-widest uppercase mb-8 animate-bounce">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
          Future Intelligence Integrated
        </div>
        <h1 className="font-sync text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none mb-10 transition-all">
          NEXT-GEN <br />
          <span className="text-outline-white text-transparent" style={{ WebkitTextStroke: '1px white' }}>DIGITAL</span> FLOW
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-white/60 mb-12 leading-relaxed">
          Bridging the gap between hyper-growth strategies and artificial intelligence. We build the digital infrastructure of tomorrow.
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          <Link to="/contact" className="px-12 py-5 bg-white text-black font-sync text-sm tracking-widest hover:bg-white/90 transition-all flex items-center gap-2 group">
            START PROJECT <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
          <Link to="/portfolio" className="px-12 py-5 border border-white/20 hover:bg-white/5 transition-all font-sync text-sm tracking-widest">
            VIEW WORK
          </Link>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 animate-bounce">
        <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>
  );
};

const ServiceSection = () => (
  <section className="py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div>
          <h2 className="font-sync text-4xl md:text-6xl mb-6">CORE EXPERTISE</h2>
          <p className="text-white/40 tracking-widest uppercase text-sm">Elevating brands through technology</p>
        </div>
        <Link to="/services/web-development" className="text-white/60 hover:text-white flex items-center gap-2 transition-all">
          EXPLORE ALL <ChevronRight size={16} />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
        {SERVICES.map((s, i) => (
          <div key={s.id} className="bg-black p-10 group hover:bg-white hover:text-black transition-all duration-700 relative overflow-hidden">
            <div className="text-white/10 group-hover:text-black/5 absolute -top-10 -right-10 text-9xl font-bold transition-colors">0{i+1}</div>
            <div className="relative z-10">
              <h3 className="font-sync text-xl mb-4 group-hover:translate-x-2 transition-transform">{s.title}</h3>
              <p className="text-white/50 mb-8 group-hover:text-black/70 transition-colors h-24">{s.description}</p>
              <Link to={`/services/${s.id}`} className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase">
                Details <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const GlobalMap = () => (
  <section className="py-32 px-6 bg-black relative overflow-hidden">
    <div className="absolute inset-0 opacity-10 pointer-events-none">
       {/* Mock Map Texture */}
       <div className="w-full h-full bg-[radial-gradient(circle_at_center,_#fff_1px,_transparent_1px)] bg-[size:40px_40px]"></div>
    </div>
    <div className="max-w-7xl mx-auto relative z-10 text-center">
      <h2 className="font-sync text-4xl md:text-7xl mb-12">GLOBAL REACH</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: 'PROJECTS DONE', val: '250+' },
          { label: 'GLOBAL CLIENTS', val: '80+' },
          { label: 'AI MODELS', val: '15' },
          { label: 'SUCCESS RATE', val: '99%' },
        ].map(stat => (
          <div key={stat.label} className="p-8 border border-white/10 glass">
            <p className="text-4xl md:text-6xl font-sync mb-2">{stat.val}</p>
            <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-32 px-6 bg-white text-black">
    <div className="max-w-7xl mx-auto">
      <h2 className="font-sync text-4xl md:text-6xl mb-20 text-center">VOICES OF TRUST</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[1,2,3].map(i => (
          <div key={i} className="flex flex-col items-start gap-8 border-l border-black/10 pl-8">
            <div className="text-6xl font-serif text-black/10 italic">"</div>
            <p className="text-xl leading-relaxed">
              Nexus transformed our business infrastructure. Their AI implementation saved us hundreds of man-hours monthly.
            </p>
            <div>
              <p className="font-sync text-xs tracking-widest uppercase">Sarah Jenkins</p>
              <p className="text-xs text-black/40">CEO, FutureTech Solutions</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <div className="animate-in fade-in duration-700">
      <Hero />
      <ServiceSection />
      <GlobalMap />
      <Testimonials />
      
      {/* Client Logos Row */}
      <div className="py-20 border-y border-white/5 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee">
          {['SONY', 'ADIDAS', 'TESLA', 'SPACEX', 'NIKE', 'APPLE', 'NVIDIA', 'MICROSOFT'].map(l => (
            <span key={l} className="mx-12 font-sync text-2xl text-white/20 hover:text-white transition-colors cursor-default">{l}</span>
          ))}
          {['SONY', 'ADIDAS', 'TESLA', 'SPACEX', 'NIKE', 'APPLE', 'NVIDIA', 'MICROSOFT'].map(l => (
            <span key={l+'_2'} className="mx-12 font-sync text-2xl text-white/20 hover:text-white transition-colors cursor-default">{l}</span>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
            display: inline-block;
          }
        `}</style>
      </div>
    </div>
  );
}
