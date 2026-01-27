
import React, { useState, useRef, useEffect } from 'react';
import { Profile, ChatMessage } from '../types';
import { getAIResponse } from '../services/gemini';
import { PERSONAS, Persona } from '../services/personas';
import { Send, Bot, User, Loader2, Sparkles, Trash2, ArrowLeft, Users } from 'lucide-react';

interface AIConsultantProps {
  user: Profile;
  initialTopic?: string | null;
}

const AIConsultant: React.FC<AIConsultantProps> = ({ user, initialTopic }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize with topic if provided
  useEffect(() => {
    if (initialTopic) {
      const topicMsg: ChatMessage = {
        role: 'model',
        text: `Välkommen till tråden: "${initialTopic}". Hur kan jag hjälpa dig att driva denna diskussion framåt eller ge dig expertinsikter om ämnet?`,
        timestamp: new Date()
      };
      setMessages([topicMsg]);
    }
  }, [initialTopic]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Provide context if it's a specific thread
    const contextPrompt = initialTopic ? `[Kontext: Denna chat handlar om tråden "${initialTopic}"] ${input}` : input;

    // Use selected persona's prompt or default to null (which uses default prompt in gemini service)
    const systemPrompt = selectedPersona ? selectedPersona.systemPrompt : undefined;

    const aiText = await getAIResponse(messages, contextPrompt, systemPrompt);

    const aiMessage: ChatMessage = {
      role: 'model',
      text: aiText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-slate-800/50 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${selectedPersona ? selectedPersona.color + ' text-white' : 'bg-orange-500/20 text-orange-400'}`}>
            {selectedPersona ? <span className="text-xl">{selectedPersona.avatar}</span> : <Sparkles size={24} />}
          </div>
          <div>
            <h3 className="font-bold text-white">
              {selectedPersona ? selectedPersona.name : 'Horizonten gemenskap'}
            </h3>
            <p className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">
              {selectedPersona ? selectedPersona.role : 'Kom i kontakt med oss direkt'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {initialTopic && (
            <div className="hidden sm:block px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-[10px] text-orange-400 font-bold uppercase tracking-tight">
              Tråd: {initialTopic}
            </div>
          )}
          <button
            onClick={clearChat}
            className="text-slate-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-400/10 transition-colors"
            title="Rensa konversation"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Persona Selector - Deluxe Horizontal Scroll */}
      <div className="px-6 py-4 bg-slate-900/80 backdrop-blur-md border-b border-white/5 flex gap-4 overflow-x-auto no-scrollbar scroll-smooth">
        <button
          onClick={() => setSelectedPersona(null)}
          className={`flex-shrink-0 flex flex-col items-center gap-2 group transition-all duration-300 ${!selectedPersona ? 'opacity-100 scale-105' : 'opacity-40 hover:opacity-70'}`}
        >
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${!selectedPersona ? 'bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.3)] ring-2 ring-orange-400/50' : 'bg-slate-800'}`}>
            <Sparkles size={24} className={!selectedPersona ? 'text-white' : 'text-slate-500'} />
          </div>
          <span className={`text-[10px] uppercase tracking-widest font-bold ${!selectedPersona ? 'text-orange-400' : 'text-slate-500'}`}>General</span>
        </button>
        {PERSONAS.map(p => (
          <button
            key={p.id}
            onClick={() => setSelectedPersona(p)}
            className={`flex-shrink-0 flex flex-col items-center gap-2 group transition-all duration-300 ${selectedPersona?.id === p.id ? 'opacity-100 scale-105' : 'opacity-40 hover:opacity-70'}`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all overflow-hidden ${selectedPersona?.id === p.id ? p.color + ' shadow-lg ring-2 ring-white/20' : 'bg-slate-800'}`}>
              {p.avatar.startsWith('/') ? (
                <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl">{p.avatar}</span>
              )}
            </div>
            <span className={`text-[10px] uppercase tracking-widest font-bold ${selectedPersona?.id === p.id ? 'text-white' : 'text-slate-500'}`}>{p.name}</span>
          </button>
        ))}
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 max-w-sm mx-auto opacity-80">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-2">
              <Bot size={32} />
            </div>
            <h4 className="text-xl font-bold text-white">Hur kan jag hjälpa dig idag?</h4>
            <p className="text-slate-400 text-sm">
              Ställ frågor om strategier, medlemsförmåner eller nätverksmöjligheter inom Horizonten.
            </p>
            <div className="flex flex-wrap gap-2 justify-center pt-4">
              {selectedPersona?.id === 'saga' ? ['Skrivprojekt', 'Utlopp för känslor', 'Kreativ blockad'] :
                selectedPersona?.id === 'erik' ? ['Nervsystemet', 'Kroppslig trygghet', 'Stretching'] :
                  ['Affärsplan', 'Nätverkstips', 'Investeringar'].map(tag => (
                    <button
                      key={tag}
                      onClick={() => setInput(tag)}
                      className="bg-slate-800 hover:bg-orange-500/20 hover:text-orange-400 text-xs text-slate-300 px-4 py-2 rounded-xl border border-white/5 transition-all duration-300"
                    >
                      {tag}
                    </button>
                  ))}
            </div>
          </div>
        ) : (
          messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-500`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${m.role === 'user' ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' : 'bg-slate-800 text-orange-400 border border-white/10'}`}>
                {m.role === 'user' ? <User size={20} /> : (
                  selectedPersona?.avatar.startsWith('/') ? (
                    <img src={selectedPersona.avatar} alt={selectedPersona.name} className="w-full h-full object-cover rounded-xl" />
                  ) : <Bot size={20} />
                )}
              </div>
              <div className={`max-w-[75%] rounded-[1.5rem] px-5 py-4 text-[15px] leading-relaxed shadow-xl ${m.role === 'user' ? 'bg-orange-600 text-white font-medium rounded-tr-none' : 'bg-slate-800/80 backdrop-blur-sm text-slate-100 border border-white/5 rounded-tl-none'}`}>
                {m.text}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-slate-800 text-orange-400 flex items-center justify-center">
              <Bot size={18} />
            </div>
            <div className="bg-slate-800/50 rounded-2xl px-4 py-3 text-orange-400">
              <Loader2 className="animate-spin" size={20} />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-800/30 border-t border-slate-800">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={initialTopic ? `Diskutera "${initialTopic}"...` : "Skriv din fråga här..."}
            className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-6 py-4 pr-16 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all placeholder:text-slate-600 shadow-inner"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 bottom-2 aspect-square bg-orange-500 hover:bg-orange-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 rounded-xl flex items-center justify-center transition-all shadow-lg"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIConsultant;
