import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, X, User, Bot, RotateCcw } from 'lucide-react';
import { getAIResponse } from '../../services/gemini';
import { Profile } from '../../types';

interface AssistantChatProps {
    user: Profile | null;
    onClose: () => void;
}

interface Message {
    role: 'user' | 'model';
    text: string;
    timestamp: Date;
}

const AssistantChat: React.FC<AssistantChatProps> = ({ user, onClose }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'model',
            text: `Hej ${user?.full_name?.split(' ')[0] || ''}! Jag är din personliga assistent. Jag kan hjälpa dig att navigera plattformen, ge tips om övningar eller bara prata en stund. Vad har du på hjärtat?`,
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = { role: 'user', text: input, timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            const contextMessages = messages.map(m => ({ role: m.role, text: m.text }));
            const responseText = await getAIResponse(
                contextMessages,
                userMsg.text,
                "Du är en hjälpsam och empatisk AI-assistent för communityt 'Horizonten' och 'Klätterträdet'. Din roll är att stötta användaren i deras personliga utveckling, hjälpa till med funktioner i appen, och vara ett bollplank. Var koncis, varm och tydlig. Användare söker ofta stöd för stress, ångest eller personlig utveckling."
            );

            if (responseText) {
                setMessages(prev => [...prev, { role: 'model', text: responseText, timestamp: new Date() }]);
            } else {
                setMessages(prev => [...prev, { role: 'model', text: "Jag har lite svårt att ansluta just nu. Försök igen om en stund.", timestamp: new Date() }]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-900 text-white overflow-hidden rounded-3xl shadow-2xl border border-white/10">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-slate-800/50 backdrop-blur-md border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <Sparkles size={20} className="text-white animate-pulse" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white">Assistenten</h3>
                        <p className="text-xs text-indigo-300 font-medium">Alltid här för dig</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setMessages([messages[0]])} className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors" title="Rensa chatt">
                        <RotateCcw size={18} />
                    </button>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-900/50">
                {messages.map((msg, idx) => {
                    const isUser = msg.role === 'user';
                    return (
                        <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                            <div className={`
                                max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed
                                ${isUser
                                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-500/10'
                                    : 'bg-slate-800 text-slate-200 rounded-tl-none border border-white/5'}
                            `}>
                                {msg.text}
                            </div>
                        </div>
                    );
                })}
                {isTyping && (
                    <div className="flex justify-start animate-in fade-in">
                        <div className="bg-slate-800 rounded-2xl rounded-tl-none p-4 flex gap-1 items-center">
                            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-100"></span>
                            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-200"></span>
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="p-4 bg-slate-800/30 backdrop-blur-xl border-t border-white/5">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSend()}
                        placeholder="Skriv något..."
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-inner"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssistantChat;
