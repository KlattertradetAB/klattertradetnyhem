import React, { useState, useEffect } from 'react';
import { Profile } from '../types';
import { Calendar, Users, MessageSquareText, Star, ChevronRight, MapPin, MessageCircle, FileText, BookOpen, Bot, ArrowRight, Sparkles } from 'lucide-react';
import PDFViewer from '../../components/PDFViewer';
import { requestNotificationPermission } from '../services/notifications';

import CommunityChat from './CommunityChat';

import { Page } from '../../types';

interface DashboardProps {
  user: Profile;
  onThreadClick: (topic: string) => void;
  onBackToSite: (page?: Page) => void;
}



const Dashboard: React.FC<DashboardProps> = ({ user, onThreadClick, onBackToSite }) => {
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [activePdf, setActivePdf] = useState({ url: '', title: '' });

  const openPdf = (url: string, title: string) => {
    setActivePdf({ url, title });
    setIsPdfOpen(true);
  };


  useEffect(() => {
    // Request notification permission on mount (as "standard" setting)
    requestNotificationPermission();
  }, []);

  const events = [
    { id: 1, title: 'Myndighetsinducerat trauma bokrelease har vi i april -2026', date: 'April 2026', location: 'Bokrelease', type: 'Event', page: Page.BOOK },
    { id: 2, title: 'Utbildning i myndighetsinducerat trauma drar igång i augusti -2026', date: 'Aug 2026', location: 'Digitalt/Gbg', type: 'Utbildning', page: Page.CHAT },
    { id: 3, title: 'Här har du möjlighet att söka en plats som styrelsemedlem inför -2027!', date: 'Inför 2027', location: 'Socialt', type: 'Styrelse', page: Page.COMMUNITY },
  ];

  const threads = [
    { id: 'general', title: 'Att navigera i motvind – När livet utmanar vår grundtrygghet', lastUser: 'Admin', count: 14, time: '2 tim sedan', description: 'Strategier för att hitta fotfäste när tillvaron gungar.' },
    { id: 'trygghet', title: 'Från sår till styrka: Att förstå våra fixerade markörer', lastUser: 'Lina', count: 32, time: '5 tim sedan', description: 'Hur vi kan vända gamla mönster och sår till nya styrkor.' },
    { id: 'self-care', title: 'Relationellt fadder-skap – Konsten att bära och bli buren', lastUser: 'Kalle', count: 8, time: 'Igår', description: 'Om vikten av ömsesidigt stöd och tillit i en gemenskap.' },
    { id: 'trygghet', title: 'Nyfikenhet som kompass – Att våga tänka och göra nytt', lastUser: 'Axel', count: 19, time: 'Igår', description: 'Att våga utmana sina egna sanningar och växa.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-700">
      {/* Welcome Hero with Ultra-Premium Liquid Frozen Glass Effect */}
      <section className="relative overflow-hidden rounded-[2.5rem] min-h-[280px] flex items-center border border-white/20 shadow-[0_20px_50px_rgba(249,115,22,0.15)] bg-slate-950">

        {/* Liquid Layer: Moving background blobs */}
        <div className="absolute inset-0 bg-orange-600 overflow-hidden pointer-events-none">
          {/* Liquid Blob 1 */}
          <div className="absolute top-[-30%] left-[-10%] w-[80%] h-[120%] bg-orange-400 rounded-full blur-[100px] opacity-70 animate-pulse transition-all duration-[10s]"></div>
          {/* Liquid Blob 2 */}
          <div className="absolute bottom-[-40%] right-[-5%] w-[70%] h-[100%] bg-amber-500 rounded-full blur-[120px] opacity-60 animate-bounce" style={{ animationDuration: '15s' }}></div>
          {/* Liquid Blob 3 */}
          <div className="absolute top-[10%] right-[10%] w-[50%] h-[60%] bg-orange-300 rounded-full blur-[90px] opacity-40 animate-pulse" style={{ animationDuration: '7s' }}></div>
          {/* Liquid Blob 4 - Accent */}
          <div className="absolute bottom-[10%] left-[20%] w-[30%] h-[40%] bg-white/20 rounded-full blur-[60px] opacity-30"></div>
        </div>

        {/* Frozen Glass Layer: High-end frosted overlay */}
        <div className="absolute inset-0 backdrop-blur-[80px] bg-orange-600/25 border-t border-l border-white/30 rounded-[2.5rem]"></div>

        {/* Subtle Grain Texture for tactile frosted feel */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>

        {/* Shine/Refraction effect */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 px-10 py-12 w-full">
          <div className="text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter leading-[1.1]">
              Din Överblick ... <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-white via-orange-50 to-orange-100 bg-clip-text text-transparent">
                {user.full_name}
              </span>
            </h2>
            <p className="text-white/90 font-semibold text-lg md:text-xl max-w-xl leading-relaxed">
              Här är de senaste uppdateringarna för din Nivå 2 gemenskap.
            </p>
          </div>

          <div className="flex gap-4 items-center shrink-0">
            <div className="bg-white/10 backdrop-blur-3xl px-6 py-6 rounded-[2rem] border border-white/20 text-center shadow-xl group hover:bg-white/15 transition-all">
              <span className="block text-4xl font-black text-white group-hover:scale-110 transition-transform">142</span>
              <span className="text-[10px] uppercase font-bold text-white/70 tracking-[0.2em]">Medlemmar</span>
            </div>
            <div className="bg-white/10 backdrop-blur-3xl px-6 py-6 rounded-[2rem] border border-white/20 text-center shadow-xl group hover:bg-white/15 transition-all">
              <span className="block text-4xl font-black text-white group-hover:scale-110 transition-transform">8</span>
              <span className="text-[10px] uppercase font-bold text-white/70 tracking-[0.2em]">Nya trådar</span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Threads Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* Live Community Chat */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <CommunityChat
              user={user}
              className="h-[600px] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl bg-black/20 backdrop-blur-sm"
            />
          </div>

          {/* Blog/Feature Grid */}
          <div className="space-y-6">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Star className="text-orange-500" size={20} />
              Utvalt innehåll
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Blog Post 1 */}
              <div
                onClick={() => openPdf('/Attributionsfel-narcissism.pdf', 'Ett grundläggande attributionsfel')}
                className="bg-gradient-to-br from-slate-900 to-slate-800 border border-orange-500/30 p-8 rounded-[2rem] group hover:border-orange-500 transition-all cursor-pointer shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-30 group-hover:opacity-60 transition-opacity">
                  <FileText size={60} className="text-orange-500/10 rotate-12" />
                </div>
                <div className="relative z-10">
                  <span className="text-[10px] bg-orange-500 text-slate-950 px-3 py-1 rounded-full font-black uppercase tracking-widest mb-4 inline-block">
                    Blogginlägg
                  </span>
                  <h4 className="text-2xl font-black text-white mb-3 group-hover:text-orange-400 transition-colors leading-tight">
                    Ett grundläggande <br /> attributionsfel
                  </h4>
                  <p className="text-slate-400 mb-6 text-sm font-light leading-relaxed line-clamp-2">
                    Varför dömer vi andra hårdare än oss själva? En genomgång av hur våra hjärnor snedvrider verkligheten.
                  </p>
                  <div className="flex items-center gap-3 text-white font-bold group-hover:gap-5 transition-all uppercase tracking-widest text-[10px]">
                    Läs artikeln <ArrowRight size={16} className="text-orange-500" />
                  </div>
                </div>
              </div>

              {/* Blog Post 2 */}
              <div
                onClick={() => openPdf('/Polarisering-av-personlighetsstörningar .pdf', 'Polarisering och personlighetsstörningar')}
                className="bg-gradient-to-br from-slate-900 to-slate-800 border border-indigo-500/30 p-8 rounded-[2rem] group hover:border-indigo-500 transition-all cursor-pointer shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-30 group-hover:opacity-60 transition-opacity">
                  <FileText size={60} className="text-indigo-500/10 rotate-12" />
                </div>
                <div className="relative z-10">
                  <span className="text-[10px] bg-indigo-500 text-white px-3 py-1 rounded-full font-black uppercase tracking-widest mb-4 inline-block">
                    Blogginlägg
                  </span>
                  <h4 className="text-2xl font-black text-white mb-3 group-hover:text-indigo-400 transition-colors leading-tight">
                    Polarisering & <br /> personlighetsstörningar
                  </h4>
                  <p className="text-slate-400 mb-6 text-sm font-light leading-relaxed line-clamp-2">
                    En djupanalys av hur dömande och polarisering påverkar våra relationer och vår självbild.
                  </p>
                  <div className="flex items-center gap-3 text-white font-bold group-hover:gap-5 transition-all uppercase tracking-widest text-[10px]">
                    Läs artikeln <ArrowRight size={16} className="text-indigo-500" />
                  </div>
                </div>
              </div>

              {/* Premium App Download Card (Only for Level 3 and not yet installed) */}
              {/* Premium App Download Card (Only for Level 3 and not yet installed) - REMOVED, using global button instead */}

              {/* Biblioteket Card */}
              <div className="bg-slate-950/50 backdrop-blur-md border border-white/5 p-8 rounded-[2rem] group hover:border-orange-500/50 transition-all shadow-xl">
                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform border border-blue-500/20">
                  <BookOpen size={28} />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Biblioteket</h4>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed font-light">Mallar, guider och inspelade workshops från våra experter.</p>
                <button className="flex items-center gap-2 text-orange-400 text-xs font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                  Utforska <ChevronRight size={16} />
                </button>
              </div>

              {/* Meditation Card */}
              <div className="bg-slate-950/50 backdrop-blur-md border border-white/5 p-8 rounded-[2rem] group hover:border-purple-500/50 transition-all shadow-xl">
                <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform border border-purple-500/20">
                  <Star size={28} />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Övningar</h4>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed font-light">Ljudfiler och guidade meditationer för din dagliga Self-care.</p>
                <button className="flex items-center gap-2 text-purple-400 text-xs font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                  Lyssna nu <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* AI Assistants Quick Access */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Bot className="text-orange-500" size={20} />
                  Direktkontakt med dina assistenter
                </h3>
                <button
                  onClick={() => onThreadClick('consultant')}
                  className="text-orange-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
                >
                  Visa alla
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Saga', avatar: '🎨', role: 'Kreativitet', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
                  { name: 'Erik', avatar: '🏃‍♂️', role: 'Kropp & TMO', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
                  { name: 'Lina', avatar: '🧘‍♀️', role: 'Trauma', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
                  { name: 'Marcus', avatar: '💻', role: 'IT & Struktur', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
                ].map(assistant => (
                  <button
                    key={assistant.name}
                    onClick={() => onThreadClick('consultant')}
                    className={`flex flex-col items-center p-6 rounded-[2rem] border transition-all hover:scale-105 active:scale-95 group ${assistant.color}`}
                  >
                    <span className="text-3xl mb-3 group-hover:scale-125 transition-transform">{assistant.avatar}</span>
                    <span className="font-bold text-xs uppercase tracking-tighter block">{assistant.name}</span>
                    <span className="text-[10px] opacity-60 font-medium block">{assistant.role}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <PDFViewer
          isOpen={isPdfOpen}
          onClose={() => setIsPdfOpen(false)}
          pdfUrl={activePdf.url}
          title={activePdf.title}
        />

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
            <div className="px-6 py-4 border-b border-slate-800 bg-slate-800/30">
              <h3 className="font-bold flex items-center gap-2 text-white">
                <Calendar className="text-orange-500" size={18} />
                Kommande Event
              </h3>
            </div>
            <div className="p-2">
              {events.map((event) => (
                <div
                  key={event.id}
                  onClick={() => onBackToSite(event.page)}
                  className="p-4 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider">{event.type}</span>
                    <span className="text-xs text-slate-500 font-medium">{event.date}</span>
                  </div>
                  <h4 className="font-bold text-slate-100 group-hover:text-orange-400 transition-colors leading-snug">{event.title}</h4>
                  <div className="flex items-center gap-1 mt-2 text-xs text-slate-500">
                    <MapPin size={12} /> {event.location}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-slate-800/50">
              <button
                onClick={() => onThreadClick('experts')}
                className="w-full bg-slate-700 hover:bg-slate-600 py-2 rounded-lg text-sm font-bold transition-colors"
              >
                Visa kalender
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
