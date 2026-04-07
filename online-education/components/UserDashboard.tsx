
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpenIcon, CalendarIcon, MessageCircleIcon, ChevronRightIcon, SendIcon, UserIcon, ClockIcon } from './Icons';
import type { Course } from '../types';

interface UserDashboardProps {
  user: any;
  allCourses: Course[];
  courseProgress: Record<string, { currentSubModuleId: string }>;
  onCourseClick: (courseId: string) => void;
  onBackToHome: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ user, allCourses, courseProgress, onCourseClick, onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<'active' | 'upcoming' | 'chat'>('active');
  const [chatMessage, setChatMessage] = useState('');
  const chatEndRef = React.useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Lärare (Henrik)', text: 'Välkomna till veckans modul! Glöm inte att titta på den andra föreläsningen ordentligt.', time: '09:30', isMe: false },
    { id: 2, sender: 'Du', text: 'Tack Henrik! Jag har precis börjat på reflektionsfrågorna.', time: '10:15', isMe: true },
    { id: 3, sender: 'Sara (Deltagare)', text: 'Jag fastnade lite på fråga 4, någon som vill spåna?', time: '10:45', isMe: false },
  ]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (activeTab === 'chat') {
      scrollToBottom();
    }
  }, [activeTab, messages]);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    const newMessage = {
      id: messages.length + 1,
      sender: 'Du',
      text: chatMessage,
      time: new Date().toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    setMessages([...messages, newMessage]);
    setChatMessage('');
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="container mx-auto px-4 pt-32">
        {/* Profile Header */}
        <div className="glass-card no-hover-effect p-8 rounded-[2.5rem] mb-8 border-white/5 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-[100px] rounded-full -mr-32 -mt-32"></div>
          
          <div className="relative">
             <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-orange-600/20">
               {user.displayName?.charAt(0) || 'U'}
             </div>
             <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-emerald-500 border-4 border-slate-950 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
             </div>
          </div>
          
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-4xl font-bold text-white tracking-tight">Välkommen tillbaka, {user.displayName || 'Elev'}!</h1>
            <p className="text-slate-400 flex items-center justify-center md:justify-start gap-2">
              <UserIcon className="w-4 h-4 text-orange-500" />
              <span>{user.email}</span>
              <span className="mx-2 opacity-30">•</span>
              <span className="text-orange-500 font-bold uppercase text-[10px] tracking-widest bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">Aktiv Elev</span>
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 md:ml-auto flex gap-4">
             <div className="text-center px-6 py-3 glass-card no-hover-effect rounded-2xl border-white/5">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Poäng</p>
                <p className="text-2xl font-bold text-white">450</p>
             </div>
             <div className="text-center px-6 py-3 glass-card no-hover-effect rounded-2xl border-white/5">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Certifikat</p>
                <p className="text-2xl font-bold text-white">2</p>
             </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex p-1.5 glass-card no-hover-effect rounded-2xl border-white/5 mb-8 w-full max-w-xl mx-auto md:mx-0">
          {[
            { id: 'active', label: 'Aktiva kurser', icon: BookOpenIcon },
            { id: 'upcoming', label: 'Kommande', icon: CalendarIcon },
            { id: 'chat', label: 'Utbildningsgrupp', icon: MessageCircleIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === tab.id 
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'active' && (
            <motion.div
              key="active-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {allCourses.slice(0, 1).map(course => {
                const progress = courseProgress[course.id];
                const currentSubId = progress?.currentSubModuleId;
                
                const getModuleInfo = (subId: string) => {
                  if (subId.startsWith('s1-')) return { name: 'Block 1: Grundläggande principer', percent: Math.round((parseInt(subId.split('-')[1]) / 6) * 100) };
                  if (subId.startsWith('s2-')) return { name: 'Block 2: Fördjupning och metodik', percent: Math.round(50 + (parseInt(subId.split('-')[1]) / 2) * 50) };
                  return { name: 'Ej påbörjad', percent: 0 };
                };

                const moduleInfo = currentSubId ? getModuleInfo(currentSubId) : { name: 'Ej påbörjad', percent: 0 };

                return (
                  <div key={course.id} className="glass-card p-6 rounded-[2rem] border-white/5 group flex flex-col h-full">
                    <div className="relative aspect-[16/7] rounded-2xl overflow-hidden mb-6 border border-white/10">
                      {/* Using a placeholder or the actual image if available */}
                      <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                         <BookOpenIcon className="w-12 h-12 text-orange-500/20" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest bg-orange-600 px-3 py-1 rounded-full shadow-lg">Pågående</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <h3 className="text-2xl font-bold text-white">{course.title}</h3>
                      <div className="space-y-2">
                         <div className="flex justify-between text-xs font-bold text-slate-400">
                            <span>{moduleInfo.name}</span>
                            <span className="text-orange-500">{moduleInfo.percent}%</span>
                         </div>
                         <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                            <div 
                              className="h-full bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.4)] transition-all duration-1000" 
                              style={{ width: `${moduleInfo.percent}%` }}
                            ></div>
                         </div>
                      </div>
                      
                      <button 
                        onClick={() => onCourseClick(course.id)}
                        className="w-full mt-4 flex items-center justify-center gap-2 py-4 bg-white/5 hover:bg-orange-600 text-white font-bold rounded-2xl border border-white/10 hover:border-orange-500 transition-all group/btn"
                      >
                        <span>{currentSubId ? 'Återuppta Utbildning' : 'Börja Utbildning'}</span>
                        <ChevronRightIcon className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {activeTab === 'upcoming' && (
            <motion.div
              key="upcoming-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {allCourses.slice(1).map(course => (
                <div key={course.id} className="glass-card p-6 rounded-3xl border-white/5 flex gap-6 items-center">
                  <div className="w-20 h-20 rounded-2xl bg-slate-900 flex items-center justify-center border border-white/5">
                    <CalendarIcon className="w-8 h-8 text-slate-700" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{course.title}</h4>
                    <p className="text-sm text-slate-400 mb-2">Planerad start: Hösten 2024</p>
                    <button className="text-xs font-bold text-orange-500 hover:underline px-3 py-1 rounded-full bg-orange-500/10">Bevaka kurs</button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'chat' && (
            <motion.div 
              key="chat-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-card no-hover-effect rounded-[2.5rem] border-white/5 overflow-hidden flex flex-col h-[600px] shadow-2xl"
            >
              <div className="p-6 bg-white/5 border-b border-white/5 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-sm font-bold">BG</div>
                    <div>
                       <h4 className="text-sm font-bold text-white">Behandlingsassistent Grupp 1</h4>
                       <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">12 medlemmar online</p>
                    </div>
                 </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-2 mb-1 px-2">
                       <span className="text-[10px] font-bold text-slate-500">{msg.sender}</span>
                       <span className="text-[10px] text-slate-600">{msg.time}</span>
                    </div>
                    <div className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm ${
                      msg.isMe 
                      ? 'bg-orange-600 text-white rounded-tr-none shadow-lg shadow-orange-600/10' 
                      : 'bg-white/5 text-slate-300 rounded-tl-none border border-white/5'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              
              <div className="p-6 bg-slate-950/50 border-t border-white/5">
                <div className="relative">
                  <input 
                    type="text" 
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Skriv ett meddelande till gruppen..."
                    className="w-full bg-slate-900 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:ring-2 focus:ring-orange-500/30 transition-all"
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="absolute right-2 top-2 bottom-2 aspect-square bg-orange-600 hover:bg-orange-500 text-white rounded-xl flex items-center justify-center transition-all shadow-lg"
                  >
                    <SendIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 text-center">
           <button 
             onClick={onBackToHome}
             className="text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-[0.2em]"
           >
             ← Tillbaka till startsidan
           </button>
        </div>
      </div>
    </div>
  );
};
