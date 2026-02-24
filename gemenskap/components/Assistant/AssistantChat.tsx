import React, { useState, useRef, useEffect } from 'react';
import { Send, X, RotateCcw } from 'lucide-react';
import { getAssistantResponse, MessageContext } from '../../services/assistant/assistantService';
import { Profile } from '../../types';
import { useAssistant } from '../../contexts/AssistantContext';

interface AssistantChatProps {
    user: Profile | null;
    onClose: () => void;
}

const AssistantChat: React.FC<AssistantChatProps> = ({ user, onClose }) => {
    const { messages, addMessage, clearMessages } = useAssistant();
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initial message if empty
    useEffect(() => {
        if (messages.length === 0) {
            addMessage({
                role: 'model',
                text: `Hej ${user?.full_name?.split(' ')[0] || ''}! Jag är din personliga assistent här på Horizonten. Hur kan jag stötta dig idag?`,
                timestamp: new Date()
            });
        }
    }, [messages.length, user, addMessage]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user' as const, text: input, timestamp: new Date() };
        addMessage(userMsg);
        setInput('');
        setIsTyping(true);

        try {
            const history: MessageContext[] = messages.map(m => ({ role: m.role, text: m.text }));
            const responseText = await getAssistantResponse(history, userMsg.text);

            if (responseText) {
                addMessage({ role: 'model', text: responseText, timestamp: new Date() });
            } else {
                addMessage({ role: 'model', text: "Jag har lite svårt att ansluta just nu. Försök igen om en stund.", timestamp: new Date() });
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
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg">
                        <img src="/logo2.png" alt="Logo" className="w-6 h-6 object-contain" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-sm">Assistenten</h3>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">Aktiv nu</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={clearMessages} className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors" title="Rensa chatt">
                        <RotateCcw size={18} />
                    </button>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-900/50 custom-scrollbar">
                {messages.map((msg, idx) => {
                    const isUser = msg.role === 'user';
                    return (
                        <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                            <div className={`
                                max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed
                                ${isUser
                                    ? 'bg-zinc-100 text-zinc-900 rounded-tr-none shadow-lg'
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
                            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce delay-100"></span>
                            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce delay-200"></span>
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
                        placeholder="Hur kan jag hjälpa dig?"
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all shadow-inner"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white text-black rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-200"
                    >
                        <Send size={16} />
                    </button>
                </div>
                <p className="mt-3 text-[10px] text-center text-zinc-500 uppercase tracking-widest font-bold">
                    AI-stödd assistent för Horizonten
                </p>
            </div>
        </div>
    );
};

export default AssistantChat;
