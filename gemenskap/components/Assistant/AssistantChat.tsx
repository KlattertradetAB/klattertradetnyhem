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
    const { messages, addMessage, clearMessages, assistantType, setAssistantType } = useAssistant();
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const getAssistantName = (type: string) => {
        if (type === 'lina') return 'Lina';
        if (type === 'erik') return 'Erik';
        if (type === 'amanda') return 'Amanda';
        if (type === 'axel') return 'Axel';
        return 'Huvudassistenten';
    };

    const getAssistantAvatar = (type: string) => {
        if (type === 'lina') return '🧘‍♀️';
        if (type === 'erik') return '🏃‍♂️';
        if (type === 'amanda') return '👩‍⚕️';
        if (type === 'axel') return '🌲';
        return '🤖';
    };

    // Initial message if empty
    useEffect(() => {
        if (messages.length === 0) {
            let welcomeText = `Hej ${user?.full_name?.split(' ')[0] || ''}! Jag är din personliga assistent här på Horizonten. Hur kan jag stötta dig idag?`;
            if (assistantType === 'lina') welcomeText = `Välkommen, jag är Lina. Jag finns här för att lyssna och skapa trygghet. Vad bär du på idag?`;
            if (assistantType === 'erik') welcomeText = `Hej! Erik här. Jag hjälper dig gärna med konkreta verktyg för att reglera nervsystemet. Hur känns det i kroppen just nu?`;
            if (assistantType === 'amanda') welcomeText = `Hej vännen, Amanda här. ❤️ Kul att se dig! Har du hunnit sätta dig ner med en kopp kaffe än? Hur mår du egentligen?`;
            if (assistantType === 'axel') welcomeText = `Tjena, Axel här. 🌲 Det är skönt att du hittat hit. Ibland behöver man bara checka in lite. Hur ser din dag ut?`;

            addMessage({
                role: 'model',
                text: welcomeText,
                timestamp: new Date()
            });
        }
    }, [messages.length, user, addMessage, assistantType]);

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
            const responseText = await getAssistantResponse(history, userMsg.text, assistantType);

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
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shadow-lg text-xl">
                        {getAssistantAvatar(assistantType)}
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-sm">{getAssistantName(assistantType)}</h3>
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

            {/* Assistant Switcher */}
            <div className="flex p-1.5 bg-slate-950/50 gap-1.5 border-b border-white/5 overflow-x-auto no-scrollbar">
                {[
                    { id: 'main', avatar: '🤖', name: 'Standard' },
                    { id: 'lina', avatar: '🧘‍♀️', name: 'Lina' },
                    { id: 'erik', avatar: '🏃‍♂️', name: 'Erik' },
                    { id: 'amanda', avatar: '👩‍⚕️', name: 'Amanda' },
                    { id: 'axel', avatar: '🌲', name: 'Axel' }
                ].map((asst) => (
                    <button
                        key={asst.id}
                        onClick={() => {
                            setAssistantType(asst.id as any);
                            clearMessages();
                        }}
                        className={`flex-shrink-0 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${assistantType === asst.id ? 'bg-orange-500 text-slate-950 shadow-lg' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                    >
                        <span>{asst.avatar}</span>
                        <span className="hidden sm:inline">{asst.name}</span>
                    </button>
                )) as any}
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-900/50 custom-scrollbar">
                {messages.map((msg, idx) => {
                    const isUser = msg.role === 'user';
                    return (
                        <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                            <div className={`
                                max-w-[85%] p-4 rounded-2xl text-[15px] leading-relaxed
                                ${isUser
                                    ? 'bg-zinc-100 text-zinc-900 rounded-tr-none shadow-lg'
                                    : 'bg-slate-800 text-slate-200 rounded-tl-none border border-white/5 shadow-md shadow-black/20'}
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
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-4 pl-4 pr-12 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all shadow-inner"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        className="absolute right-2 top-2 bottom-2 aspect-square bg-orange-500 text-slate-950 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-400 flex items-center justify-center font-bold"
                    >
                        <Send size={18} />
                    </button>
                </div>
                <p className="mt-3 text-[9px] text-center text-zinc-600 uppercase tracking-[0.2em] font-black">
                    AI-stöd för Horizonten & Klätterträdet
                </p>
            </div>
        </div>
    );
};

export default AssistantChat;
