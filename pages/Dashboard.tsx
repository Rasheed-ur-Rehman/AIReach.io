
import React, { useState, useEffect } from 'react';
import { 
  BarChart as BarChartIcon, Users, CreditCard, Activity, 
  Settings, Bell, LogOut, ChevronRight, Plus, MessageSquare, Trash2, Mail, Send, Check
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { db, ChatMessage, Inquiry } from '../services/db';

const analyticsData = [
  { name: 'Mon', uv: 4000, pv: 2400 },
  { name: 'Tue', uv: 3000, pv: 1398 },
  { name: 'Wed', uv: 2000, pv: 9800 },
  { name: 'Thu', uv: 2780, pv: 3908 },
  { name: 'Fri', uv: 1890, pv: 4800 },
  { name: 'Sat', uv: 2390, pv: 3800 },
  { name: 'Sun', uv: 3490, pv: 4300 },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'chats' | 'inquiries'>('overview');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [notified, setNotified] = useState<string | null>(null);

  useEffect(() => {
    setMessages(db.getChatMessages());
    setInquiries(db.getInquiries());
  }, [activeTab]);

  const deleteMsg = (id: string) => {
    db.deleteMessage(id);
    setMessages(db.getChatMessages());
  };

  const handleReply = (msgId: string) => {
    const text = replyText[msgId];
    if (!text?.trim()) return;
    
    db.saveChatMessage(text, 'admin');
    setMessages(db.getChatMessages());
    setReplyText(prev => ({ ...prev, [msgId]: '' }));
    
    setNotified(msgId);
    setTimeout(() => setNotified(null), 3000);
  };

  return (
    <div className="flex min-h-screen bg-black pt-0">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 border-r border-white/10 flex flex-col p-4 bg-white/[0.02]">
        <div className="p-4 mb-10 hidden lg:block">
          <h2 className="font-sync text-sm tracking-widest uppercase text-white/40">NextDigiPro Control</h2>
        </div>
        <nav className="flex-1 space-y-2">
          <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-4 p-4 transition-all ${activeTab === 'overview' ? 'text-white bg-white/10' : 'text-white/40 hover:bg-white/5'}`}>
            <Activity size={20} /> <span className="hidden lg:block font-sync text-[10px] tracking-widest">OVERVIEW</span>
          </button>
          <button onClick={() => setActiveTab('chats')} className={`w-full flex items-center gap-4 p-4 transition-all ${activeTab === 'chats' ? 'text-white bg-white/10' : 'text-white/40 hover:bg-white/5'}`}>
            <MessageSquare size={20} /> <span className="hidden lg:block font-sync text-[10px] tracking-widest">CHATS</span>
          </button>
          <button onClick={() => setActiveTab('inquiries')} className={`w-full flex items-center gap-4 p-4 transition-all ${activeTab === 'inquiries' ? 'text-white bg-white/10' : 'text-white/40 hover:bg-white/5'}`}>
            <Mail size={20} /> <span className="hidden lg:block font-sync text-[10px] tracking-widest">INQUIRIES</span>
          </button>
          <button className="w-full flex items-center gap-4 p-4 text-white/40 hover:bg-white/5"><Settings size={20} /><span className="hidden lg:block font-sync text-[10px] tracking-widest">SETTINGS</span></button>
        </nav>
        <button className="flex items-center gap-4 p-4 text-red-500 hover:bg-red-500/10 transition-all border-t border-white/5">
          <LogOut size={20} />
          <span className="hidden lg:block font-sync text-[10px] tracking-widest">LOGOUT</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="font-sync text-2xl uppercase mb-1 tracking-tighter">{activeTab.toUpperCase()}</h1>
            <p className="text-[10px] text-white/40 tracking-widest uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span> Console Manager v4.0.1
            </p>
          </div>
          <div className="flex gap-4">
            <button className="p-3 border border-white/10 hover:bg-white/5 transition-all rounded-full relative">
              <Bell size={18} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full"></span>
            </button>
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { label: 'Chat Volume', val: messages.length.toString(), trend: '+15%', color: 'text-white' },
                { label: 'Active Leads', val: inquiries.length.toString(), trend: '+4', color: 'text-white' },
                { label: 'Response Rate', val: '99%', trend: '+1%', color: 'text-white' },
                { label: 'Status', val: 'OPTIMAL', trend: 'STABLE', color: 'text-green-500' },
              ].map((stat, i) => (
                <div key={i} className="p-8 border border-white/10 bg-white/5 shadow-inner">
                  <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase mb-4">{stat.label}</p>
                  <div className="flex justify-between items-end">
                    <p className={`text-3xl font-sync ${stat.color}`}>{stat.val}</p>
                    <span className="text-[10px] font-bold text-green-500/80">{stat.trend}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="p-8 border border-white/10 bg-white/5 h-[400px]">
                <h3 className="font-sync text-[10px] tracking-widest uppercase mb-8 text-white/40">Network Traffic</h3>
                <ResponsiveContainer width="100%" height="80%">
                  <AreaChart data={analyticsData}>
                    <defs>
                      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#fff" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#fff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                    <XAxis dataKey="name" stroke="#444" fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333', fontSize: '10px' }} />
                    <Area type="monotone" dataKey="pv" stroke="#fff" fill="url(#colorPv)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="p-8 border border-white/10 bg-white/5 h-[400px]">
                <h3 className="font-sync text-[10px] tracking-widest uppercase mb-8 text-white/40">Inquiry Volume</h3>
                <ResponsiveContainer width="100%" height="80%">
                  <BarChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                    <XAxis dataKey="name" stroke="#444" fontSize={10} axisLine={false} tickLine={false} />
                    <Bar dataKey="uv" fill="#fff" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chats' && (
          <div className="animate-in slide-in-from-right-10 duration-500 max-w-5xl">
            <h3 className="font-sync text-xs tracking-widest uppercase mb-8 text-white/40">Secure Communication Logs</h3>
            <div className="space-y-6">
              {messages.length === 0 ? (
                <div className="p-20 border border-white/5 border-dashed text-center text-white/10 uppercase tracking-[0.5em] font-sync text-xl">Empty_Channel</div>
              ) : (
                messages.filter(m => m.sender === 'user').map(msg => (
                  <div key={msg.id} className="border border-white/10 bg-white/[0.03] overflow-hidden">
                    <div className="p-6 border-b border-white/5 flex justify-between items-start">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 border border-white/20 flex items-center justify-center font-bold font-sync text-xs">U</div>
                        <div>
                          <p className="text-sm font-medium leading-relaxed max-w-2xl">{msg.text}</p>
                          <p className="text-[10px] text-white/30 uppercase tracking-widest mt-2">
                            {new Date(msg.timestamp).toLocaleString()} | ID: {msg.id}
                          </p>
                        </div>
                      </div>
                      <button onClick={() => deleteMsg(msg.id)} className="p-2 text-white/10 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    {/* Admin Reply Section */}
                    <div className="p-6 bg-white/[0.01]">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-bold font-sync text-xs">A</div>
                        <div className="flex-1 relative">
                          <input 
                            type="text" 
                            placeholder="Type transmission response..."
                            className="w-full bg-black border border-white/10 px-6 py-4 text-xs outline-none focus:border-white/50 transition-all font-light"
                            value={replyText[msg.id] || ''}
                            onChange={(e) => setReplyText({ ...replyText, [msg.id]: e.target.value })}
                            onKeyDown={(e) => e.key === 'Enter' && handleReply(msg.id)}
                          />
                          <button 
                            onClick={() => handleReply(msg.id)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 transition-colors"
                          >
                            {notified === msg.id ? <Check size={16} className="text-green-500" /> : <Send size={16} className="text-white/40" />}
                          </button>
                        </div>
                      </div>
                      {/* Thread Visualization */}
                      {messages.filter(m => m.sender === 'admin').length > 0 && (
                        <div className="mt-4 pl-14 space-y-3">
                           {messages.filter(m => m.sender === 'admin').slice(-1).map(adm => (
                             <div key={adm.id} className="text-[11px] text-white/40 border-l border-white/10 pl-4 py-1 italic">
                               Last Reply: "{adm.text}"
                             </div>
                           ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div className="animate-in slide-in-from-right-10 duration-500 max-w-5xl">
            <h3 className="font-sync text-xs tracking-widest uppercase mb-8 text-white/40">Inbound Acquisition Targets</h3>
            <div className="grid grid-cols-1 gap-6">
              {inquiries.length === 0 ? (
                <div className="p-20 border border-white/5 border-dashed text-center text-white/10 uppercase tracking-[0.5em] font-sync text-xl">Null_Leads</div>
              ) : (
                inquiries.map(inq => (
                  <div key={inq.id} className="p-8 border border-white/10 bg-white/[0.03] hover:border-white/30 transition-all">
                    <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
                      <div>
                        <h4 className="font-sync text-xl mb-1 tracking-tighter">{inq.name}</h4>
                        <p className="text-xs text-white/40 font-light flex items-center gap-2">
                           <Mail size={12} /> {inq.email} | <Activity size={12} /> {inq.phone}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold bg-white/5 px-4 py-2">
                          Timestamp: {new Date(inq.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="border-t border-white/5 pt-8">
                       <p className="text-[10px] text-white/30 uppercase tracking-widest mb-4">Project Parameters</p>
                       <p className="text-sm text-white/70 leading-relaxed font-light italic">
                         "{inq.description}"
                       </p>
                    </div>
                    <div className="mt-8 flex justify-end">
                       <button className="text-[10px] font-sync tracking-widest border border-white/10 px-6 py-3 hover:bg-white hover:text-black transition-all">
                         ARCHIVE DATA
                       </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
