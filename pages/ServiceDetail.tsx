
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SERVICES } from '../constants';
import { CheckCircle, ArrowRight, Code, Search, Palette, Video } from 'lucide-react';

export default function ServiceDetail() {
  const { id } = useParams();
  const service = SERVICES.find(s => s.id === id);

  if (!service) return <div className="p-20 text-center">Service not found.</div>;

  const getIcon = () => {
    switch (service.id) {
      case 'web-development': return <Code size={48} />;
      case 'seo-content': return <Search size={48} />;
      case 'graphic-design': return <Palette size={48} />;
      case 'video-editing': return <Video size={48} />;
      default: return <Code size={48} />;
    }
  };

  return (
    <div className="animate-in fade-in duration-700 pb-20">
      {/* Hero */}
      <section className="py-24 px-6 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-[-20deg] translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-10 text-white/40">{getIcon()}</div>
          <h1 className="font-sync text-5xl md:text-8xl mb-8 uppercase leading-tight">{service.title}</h1>
          <p className="text-2xl text-white/60 max-w-3xl leading-relaxed">{service.longDescription}</p>
        </div>
      </section>

      {/* Grid Content */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            <div>
              <h2 className="font-sync text-2xl mb-8 uppercase tracking-widest border-b border-white/10 pb-4">Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {service.features.map(f => (
                  <div key={f} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                      <CheckCircle size={18} />
                    </div>
                    <span className="text-lg text-white/80">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div>
                <h3 className="font-sync text-xs tracking-widest uppercase mb-6 text-white/40">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map(t => (
                    <span key={t} className="px-4 py-2 bg-white/5 border border-white/10 text-sm hover:border-white/40 transition-colors">{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-sync text-xs tracking-widest uppercase mb-6 text-white/40">Industry Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {service.tools.map(t => (
                    <span key={t} className="px-4 py-2 bg-white/5 border border-white/10 text-sm hover:border-white/40 transition-colors">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Form */}
          <div className="lg:col-span-1">
            <div className="glass p-8 sticky top-32">
              <h3 className="font-sync text-xl mb-6">REQUEST SERVICE</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-[10px] tracking-widest text-white/40 uppercase mb-2">Your Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/20 focus:border-white py-2 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest text-white/40 uppercase mb-2">Email Address</label>
                  <input type="email" className="w-full bg-transparent border-b border-white/20 focus:border-white py-2 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest text-white/40 uppercase mb-2">Project Brief</label>
                  <textarea rows={3} className="w-full bg-transparent border-b border-white/20 focus:border-white py-2 outline-none transition-all resize-none"></textarea>
                </div>
                <button className="w-full bg-white text-black font-sync py-4 tracking-widest hover:bg-white/90 transition-all flex items-center justify-center gap-2">
                  SUBMIT <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
