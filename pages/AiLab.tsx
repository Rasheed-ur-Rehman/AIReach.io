
import React, { useState } from 'react';
import { Sparkles, MessageSquare, Image as ImageIcon, Send, Loader2, Download } from 'lucide-react';
import { generateAiContent, generateAiImage } from '../services/geminiService';

export default function AiLab() {
  const [activeTab, setActiveTab] = useState<'content' | 'visuals'>('content');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setResult(null);
    
    if (activeTab === 'content') {
      const res = await generateAiContent(prompt);
      setResult(res);
    } else {
      const res = await generateAiImage(prompt);
      setResult(res);
    }
    setLoading(false);
  };

  return (
    <div className="animate-in fade-in duration-700 min-h-screen">
      <section className="py-24 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4 text-white/40">
              <Sparkles size={24} />
              <span className="font-sync text-xs tracking-[0.3em] uppercase">Experimental Feature</span>
            </div>
            <h1 className="font-sync text-5xl md:text-8xl uppercase leading-tight">AI LAB</h1>
          </div>
          <div className="flex gap-4 p-1 bg-white/5 border border-white/10">
            <button 
              onClick={() => {setActiveTab('content'); setResult(null);}}
              className={`flex items-center gap-2 px-6 py-3 font-sync text-[10px] tracking-widest transition-all ${activeTab === 'content' ? 'bg-white text-black' : 'hover:bg-white/5'}`}
            >
              <MessageSquare size={14} /> CONTENT
            </button>
            <button 
              onClick={() => {setActiveTab('visuals'); setResult(null);}}
              className={`flex items-center gap-2 px-6 py-3 font-sync text-[10px] tracking-widest transition-all ${activeTab === 'visuals' ? 'bg-white text-black' : 'hover:bg-white/5'}`}
            >
              <ImageIcon size={14} /> VISUALS
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative mb-12">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={activeTab === 'content' ? "Describe the marketing copy you need..." : "Describe the visual asset you want to generate..."}
              className="w-full h-40 bg-white/5 border border-white/10 p-8 text-xl outline-none focus:border-white/40 transition-all resize-none font-light leading-relaxed"
            />
            <button 
              onClick={handleGenerate}
              disabled={loading}
              className="absolute bottom-6 right-6 p-4 bg-white text-black hover:bg-white/80 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
            </button>
          </div>

          {result && (
            <div className="animate-in slide-in-from-bottom-10 duration-500">
              <h3 className="font-sync text-xs tracking-widest text-white/40 uppercase mb-6 flex justify-between items-center">
                Generation Result
                {activeTab === 'visuals' && (
                  <a href={result} download="ai-gen.png" className="flex items-center gap-2 hover:text-white transition-colors">
                    DOWNLOAD <Download size={12} />
                  </a>
                )}
              </h3>
              <div className="bg-white/5 border border-white/10 p-8">
                {activeTab === 'content' ? (
                  <div className="whitespace-pre-wrap leading-relaxed text-lg text-white/80 font-light">
                    {result}
                  </div>
                ) : (
                  <img src={result} alt="AI Generated" className="w-full rounded-lg shadow-2xl" />
                )}
              </div>
            </div>
          )}
          
          {!result && !loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-30">
              <div className="p-8 border border-white/10 border-dashed">
                <p className="text-xs uppercase tracking-widest mb-2 font-bold">Example 01</p>
                <p className="text-sm font-light italic">"Create a high-impact headline for a futuristic digital agency landing page."</p>
              </div>
              <div className="p-8 border border-white/10 border-dashed">
                <p className="text-xs uppercase tracking-widest mb-2 font-bold">Example 02</p>
                <p className="text-sm font-light italic">"Generate a cyberpunk-themed abstract background for a tech blog."</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
