
import React, { useState } from 'react';
import { BLOGS } from '../constants';
import { Search, Calendar, Tag, ArrowUpRight } from 'lucide-react';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBlogs = BLOGS.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-700 min-h-screen pb-20">
      <section className="py-24 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-end gap-12">
          <div>
            <h1 className="font-sync text-5xl md:text-8xl mb-8 uppercase leading-tight">INSIGHTS</h1>
            <p className="text-2xl text-white/40 max-w-2xl leading-relaxed">Intelligence for the digital frontier. Curated updates on technology, SEO, and global growth.</p>
          </div>
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input 
              type="text" 
              placeholder="SEARCH THE VOID"
              className="w-full bg-white/5 border border-white/10 pl-16 pr-8 py-5 outline-none focus:border-white transition-all font-sync text-xs tracking-widest"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {filteredBlogs.map(blog => (
            <div key={blog.id} className="group border border-white/10 bg-white/5 hover:bg-white/10 transition-all p-8 flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2 aspect-[4/3] overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="md:w-1/2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-[10px] tracking-widest uppercase text-white/40 mb-4">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {blog.date}</span>
                    <span className="flex items-center gap-1"><Tag size={12} /> {blog.category}</span>
                  </div>
                  <h3 className="font-sync text-2xl mb-4 group-hover:text-white transition-colors">{blog.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-8">{blog.excerpt}</p>
                </div>
                <button className="flex items-center gap-2 font-sync text-[10px] tracking-[0.3em] uppercase group-hover:translate-x-2 transition-transform">
                  READ FULL LOG <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Featured Newsletter */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-white p-12 md:p-20 text-black flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="max-w-xl">
            <h2 className="font-sync text-4xl mb-6">STAY CONNECTED</h2>
            <p className="text-black/60 tracking-widest uppercase text-sm">Join 10k+ professionals receiving weekly AI & marketing insights.</p>
          </div>
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="EMAIL ADDRESS" 
              className="px-8 py-5 border border-black/10 outline-none focus:border-black transition-all font-sync text-xs min-w-[300px]"
            />
            <button className="bg-black text-white px-12 py-5 font-sync text-xs tracking-widest hover:bg-black/80 transition-all">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
