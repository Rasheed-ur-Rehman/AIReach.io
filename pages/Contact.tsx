
import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, Upload, CheckCircle2 } from 'lucide-react';
import { db } from '../services/db';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API delay
    setTimeout(() => {
      db.saveInquiry(formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', description: '' });
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 text-center animate-in zoom-in duration-500">
        <div className="max-w-md">
          <CheckCircle2 size={64} className="mx-auto mb-6 text-white" />
          <h2 className="font-sync text-4xl mb-4">TRANSMISSION RECEIVED</h2>
          <p className="text-white/60 mb-8 leading-relaxed">Thank you. Your project parameters have been stored and sent to rasheedurrehman71@gmail.com. We will reach out shortly.</p>
          <button 
            onClick={() => setStatus('idle')}
            className="px-12 py-4 bg-white text-black font-sync text-xs tracking-widest hover:bg-white/90 transition-all"
          >
            NEW INQUIRY
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700">
      <section className="py-24 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-sync text-5xl md:text-8xl mb-8 uppercase leading-tight">INITIATE PROJECT</h1>
          <p className="text-2xl text-white/40 max-w-2xl">Scale your vision with NextDigiPro. Professional AI & Digital Development.</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <div className="space-y-12">
              <div>
                <h3 className="font-sync text-xs tracking-widest text-white/40 uppercase mb-6">HQ CONTACT</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-6 group">
                    <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Direct Email</p>
                      <p className="text-lg">rasheedurrehman71@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 group">
                    <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">WhatsApp / Call</p>
                      <p className="text-lg">+92 348 5496769</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 group">
                    <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Operations</p>
                      <p className="text-lg">Islamabad, Pakistan</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-sync text-xs tracking-widest text-white/40 uppercase mb-6">Social Nodes</h3>
                <div className="flex flex-wrap gap-4">
                  {['LinkedIn', 'Github', 'Instagram'].map(s => (
                    <a key={s} href="#" className="px-6 py-3 border border-white/10 hover:border-white text-[10px] uppercase tracking-widest transition-all">{s}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest text-white/40 uppercase">Your Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-transparent border-b border-white/20 focus:border-white py-2 outline-none transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest text-white/40 uppercase">Email Protocol</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-transparent border-b border-white/20 focus:border-white py-2 outline-none transition-all" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest text-white/40 uppercase">Phone / Telegram</label>
                <input 
                  type="tel" 
                  required 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-transparent border-b border-white/20 focus:border-white py-2 outline-none transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest text-white/40 uppercase">Project Description & Requirements</label>
                <textarea 
                  rows={4} 
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Tell us about your project, goals, and tech stack preferences..."
                  className="w-full bg-transparent border-b border-white/20 focus:border-white py-2 outline-none transition-all resize-none"
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-white text-black font-sync py-6 tracking-[0.3em] hover:bg-white/90 transition-all flex items-center justify-center gap-4 group disabled:opacity-50"
              >
                {status === 'submitting' ? 'TRANSMITTING...' : 'SEND TO NEXTDIGIPRO'} <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
