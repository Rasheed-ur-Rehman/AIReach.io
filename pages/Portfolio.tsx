
import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { ServiceType } from '../types';
import { ArrowUpRight } from 'lucide-react';

export default function Portfolio() {
  const [filter, setFilter] = useState<ServiceType | 'all'>('all');

  const filteredProjects = filter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <div className="animate-in fade-in duration-700 min-h-screen">
      <section className="py-24 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-sync text-5xl md:text-8xl mb-12 uppercase leading-tight">THE WORK</h1>
          <div className="flex flex-wrap gap-4 font-sync text-[10px] tracking-widest">
            {['all', ...Object.values(ServiceType)].map(t => (
              <button 
                key={t}
                onClick={() => setFilter(t as any)}
                className={`px-8 py-3 border transition-all ${filter === t ? 'bg-white text-black border-white' : 'border-white/10 hover:border-white/40'}`}
              >
                {t.replace('-', ' ').toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
          {filteredProjects.map(p => (
            <div key={p.id} className="group relative bg-black aspect-video overflow-hidden">
              <img 
                src={p.image} 
                alt={p.title} 
                className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute inset-0 p-12 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-all duration-500">
                <div className="flex gap-2 mb-4">
                  {p.tags.map(tag => (
                    <span key={tag} className="text-[10px] border border-white/20 px-2 py-1 bg-black/50 backdrop-blur-sm">{tag}</span>
                  ))}
                </div>
                <h3 className="font-sync text-2xl mb-2">{p.title}</h3>
                <p className="text-white/60 mb-6 opacity-0 group-hover:opacity-100 transition-opacity">{p.description}</p>
                <div className="flex items-center gap-2 font-sync text-xs tracking-widest group-hover:translate-x-2 transition-transform">
                  VIEW CASE STUDY <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
