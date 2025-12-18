
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Github, Mail, ShieldCheck } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full animate-in zoom-in-95 duration-500">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-white mb-6">
            <ShieldCheck size={32} />
          </div>
          <h1 className="font-sync text-3xl mb-2">{isLogin ? 'IDENTITY SECURE' : 'CREATE CORE'}</h1>
          <p className="text-white/40 text-sm tracking-widest uppercase">Enter the digital ecosystem</p>
        </div>

        <div className="glass p-10 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-[10px] tracking-widest text-white/40 uppercase mb-2">Full Name</label>
                <input type="text" required className="w-full bg-transparent border-b border-white/20 focus:border-white py-2 outline-none transition-all" />
              </div>
            )}
            <div>
              <label className="block text-[10px] tracking-widest text-white/40 uppercase mb-2">Matrix Identifier (Email)</label>
              <input type="email" required className="w-full bg-transparent border-b border-white/20 focus:border-white py-2 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-[10px] tracking-widest text-white/40 uppercase mb-2">Access Key (Password)</label>
              <input type="password" required className="w-full bg-transparent border-b border-white/20 focus:border-white py-2 outline-none transition-all" />
            </div>
            
            <button className="w-full bg-white text-black font-sync py-4 tracking-widest hover:bg-white/90 transition-all flex items-center justify-center gap-2 group">
              {isLogin ? 'ESTABLISH LINK' : 'INITIALIZE'} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-[10px] text-white/40 tracking-[0.2em] uppercase mb-6">Secondary Protocols</p>
            <div className="flex gap-4">
              <button className="flex-1 border border-white/10 py-3 hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2">
                <Github size={16} /> <span className="text-[10px] tracking-widest uppercase font-bold">Github</span>
              </button>
              <button className="flex-1 border border-white/10 py-3 hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2">
                <Mail size={16} /> <span className="text-[10px] tracking-widest uppercase font-bold">Google</span>
              </button>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-sm">
          <span className="text-white/40">{isLogin ? "No access node?" : "Already in the matrix?"} </span>
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-white hover:underline font-bold"
          >
            {isLogin ? "Join Nexus" : "Access Console"}
          </button>
        </p>
      </div>
    </div>
  );
}
