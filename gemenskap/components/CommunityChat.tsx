import React, { useState, useEffect, useRef } from 'react';
import { Profile, ChatMessage } from '../types';
import { PERSONAS, Persona } from '../services/personas';
import { supabase } from '../services/supabase';
import { getAIResponse } from '../services/gemini';
import { sendNotification } from '../services/notifications';
import { addNotification } from '../services/notificationStore';
import {
    Send, User, MessageCircle, Sparkles, MoreHorizontal,
    Smile, Paperclip, MoreVertical, Check, CheckCheck,
    Edit2, Trash2, XCircle, CheckCircle2
} from 'lucide-react';

interface CommunityChatProps {
    user: Profile;
    threadId?: string;
    showHeader?: boolean;
    className?: string;
}

interface CommunityMessage extends ChatMessage {
    persona?: Persona; // If undefined, it's the user
    senderName?: string;
    senderEmail?: string;
    senderAvatar?: string;
    id?: string;
    user_id?: string;
    is_ai?: boolean;
}

const CommunityChat: React.FC<CommunityChatProps> = ({ user, threadId = 'general', showHeader = true, className }) => {
    const [messages, setMessages] = useState<CommunityMessage[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState<Persona | null>(null);
    const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
    const [editInput, setEditInput] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initialize with Supabase Data
    useEffect(() => {
        const fetchMessages = async () => {
            let query = supabase
                .from('messages')
                .select('*')
                .order('created_at', { ascending: true })
                .limit(50);

            if (threadId && threadId !== 'general') {
                query = query.eq('thread_id', threadId);
            } else {
                query = query.is('thread_id', null);
            }

            const { data: messagesData, error: messagesError } = await query;
            if (messagesError) {
                console.error('Supabase Messages Error:', messagesError);
                return;
            }

            if (messagesData) {
                const userIds = [...new Set(messagesData.filter(m => !m.is_ai).map(m => m.user_id))];
                let profilesMap: Record<string, any> = {};

                if (userIds.length > 0) {
                    const { data: profilesData } = await supabase
                        .from('profiles')
                        .select('id, full_name, email, avatar_url')
                        .in('id', userIds);

                    if (profilesData) {
                        profilesData.forEach(p => {
                            profilesMap[p.id] = p;
                        });
                    }
                }

                const mappedMessages: CommunityMessage[] = messagesData.map((msg: any) => ({
                    id: msg.id,
                    role: msg.is_ai ? 'model' : 'user',
                    text: msg.content,
                    timestamp: new Date(msg.created_at),
                    persona: msg.is_ai && msg.persona_id ? PERSONAS.find(p => p.id === msg.persona_id) : undefined,
                    senderName: msg.is_ai ? undefined : (profilesMap[msg.user_id]?.full_name || 'Medlem'),
                    senderEmail: msg.is_ai ? undefined : profilesMap[msg.user_id]?.email,
                    senderAvatar: msg.is_ai ? undefined : profilesMap[msg.user_id]?.avatar_url,
                    edit_count: msg.edit_count || 0,
                    is_edited: !!msg.is_edited,
                    user_id: msg.user_id
                }));
                setMessages(mappedMessages);
            }
        };

        fetchMessages();
    }, [user.id, threadId]);

    // 24h Interaction Gap & Daily Reflection Logic
    useEffect(() => {
        if (messages.length === 0 || !user) return;

        const checkForumActivity = async () => {
            const lastMessage = messages[messages.length - 1];
            const now = new Date();
            const lastMessageTime = new Date(lastMessage.timestamp);
            const hoursSinceLastMessage = (now.getTime() - lastMessageTime.getTime()) / (1000 * 60 * 60);

            // 1. INTERACTION GAP (2h)
            if (hoursSinceLastMessage >= 2) {
                const welcomers = PERSONAS.filter(p => p.id === 'anneli' || p.id === 'andreas');
                const responder = welcomers[Math.floor(Math.random() * welcomers.length)];
                const followUpText = "Jag har tänkt lite på det vi pratade om här sist, hur har du det just nu?";

                if (lastMessage.text !== followUpText) {
                    await supabase.from('messages').insert({
                        content: followUpText,
                        user_id: user.id,
                        is_ai: true,
                        persona_id: responder.id,
                        thread_id: threadId === 'general' ? null : threadId
                    });
                }
            }

            // 2. DAILY REFLECTION
            const reflections = [
                "Utveckling handlar sällan om stora språng, utan om de där små stegen vi knappt märker att vi tar.",
                "Ibland är den största utvecklingen att våga stanna upp och acceptera läget precis som det är.",
                "Kom ihåg att bakslag inte är misslyckanden, det är information om vad vi behöver justera."
            ];

            const today = new Date().toLocaleDateString();
            const hasReflectionToday = messages.some(m =>
                new Date(m.timestamp).toLocaleDateString() === today &&
                reflections.some(r => m.text.includes(r))
            );

            if (!hasReflectionToday && now.getHours() >= 8) {
                const randomReflection = reflections[Math.floor(Math.random() * reflections.length)];
                const welcomers = PERSONAS.filter(p => p.id === 'anneli' || p.id === 'andreas');
                const responder = welcomers[Math.floor(Math.random() * welcomers.length)];

                await supabase.from('messages').insert({
                    content: randomReflection,
                    user_id: user.id,
                    is_ai: true,
                    persona_id: responder.id,
                    thread_id: threadId === 'general' ? null : threadId
                });
            }
        };

        const timer = setTimeout(checkForumActivity, 5000);
        return () => clearTimeout(timer);
    }, [messages.length, threadId, user]);

    useEffect(() => {
        const channel = supabase
            .channel(`public:messages:${threadId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: threadId && threadId !== 'general' ? `thread_id=eq.${threadId}` : undefined
                },
                async (payload) => {
                    const newMsg = payload.new;
                    if ((threadId === 'general' || !threadId) && newMsg.thread_id) return;

                    let senderName = 'Någon';
                    let senderEmail = '';
                    let senderAvatar = '';
                    if (!newMsg.is_ai) {
                        const { data } = await supabase
                            .from('profiles')
                            .select('full_name, email, avatar_url')
                            .eq('id', newMsg.user_id)
                            .single();
                        if (data) {
                            senderName = data.full_name;
                            senderEmail = data.email;
                            senderAvatar = data.avatar_url;
                        }
                    }

                    const mappedMsg: CommunityMessage = {
                        id: newMsg.id,
                        role: newMsg.is_ai ? 'model' : 'user',
                        text: newMsg.content,
                        timestamp: new Date(newMsg.created_at),
                        persona: newMsg.is_ai && newMsg.persona_id ? PERSONAS.find(p => p.id === newMsg.persona_id) : undefined,
                        senderName: newMsg.is_ai ? undefined : senderName,
                        senderEmail: newMsg.is_ai ? undefined : senderEmail,
                        senderAvatar: newMsg.is_ai ? undefined : senderAvatar
                    };

                    setMessages(prev => {
                        if (prev.some(m => m.id === mappedMsg.id || (m.timestamp.getTime() === mappedMsg.timestamp.getTime() && m.text === mappedMsg.text))) {
                            return prev;
                        }
                        return [...prev, mappedMsg];
                    });

                    // Notifications are handled globally in GemenskapApp.tsx
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'messages',
                    filter: threadId && threadId !== 'general' ? `thread_id=eq.${threadId}` : undefined
                },
                (payload) => {
                    const updatedMsg = payload.new;
                    setMessages(prev => prev.map(m => m.id === updatedMsg.id ? {
                        ...m,
                        text: updatedMsg.content,
                        edit_count: updatedMsg.edit_count || 0,
                        is_edited: !!updatedMsg.is_edited
                    } : m));
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'DELETE',
                    schema: 'public',
                    table: 'messages',
                    filter: threadId && threadId !== 'general' ? `thread_id=eq.${threadId}` : undefined
                },
                (payload) => {
                    setMessages(prev => prev.filter(m => m.id !== payload.old.id));
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user.id, threadId]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const textToSend = input;
        setInput('');

        const optimisticMsg: CommunityMessage = {
            role: 'user',
            text: textToSend,
            timestamp: new Date(),
            senderName: user.full_name,
            senderEmail: user.email,
            senderAvatar: user.avatar_url
        };
        setMessages(prev => [...prev, optimisticMsg]);

        try {
            await supabase.from('messages').insert({
                content: textToSend,
                user_id: user.id,
                is_ai: false,
                thread_id: threadId === 'general' ? null : threadId
            });

            const userMessages = messages.filter(m => m.role === 'user');
            const isFirstMessage = userMessages.length === 0;
            let responders: Persona[] = [];
            const lowText = textToSend.toLowerCase();

            if (isFirstMessage) {
                const welcomers = PERSONAS.filter(p => p.id === 'anneli' || p.id === 'andreas');
                responders.push(welcomers[Math.floor(Math.random() * welcomers.length)]);
            } else if (lowText.includes('nu först jag') || lowText.includes('först jag') || lowText.includes('hej') || lowText.includes('hallå')) {
                const potentialResponders = PERSONAS.filter(p => p.id === 'linda' || p.id === 'kalle');
                responders.push(potentialResponders[Math.floor(Math.random() * potentialResponders.length)]);
            } else if (lowText.includes('stress') || lowText.includes('oro') || lowText.includes('ångest') || lowText.includes('jobbigt')) {
                const potentialResponders = PERSONAS.filter(p => p.id === 'lina' || p.id === 'erik');
                responders.push(potentialResponders[Math.floor(Math.random() * potentialResponders.length)]);
            } else {
                responders = [PERSONAS[Math.floor(Math.random() * PERSONAS.length)]];
            }

            const chainChance = (isFirstMessage || lowText.includes('nu först jag') || lowText.length > 50) ? 0.6 : 0.4;
            if (Math.random() < chainChance) {
                const alreadyPicked = responders[0].id;
                const available = PERSONAS.filter(p => p.id !== alreadyPicked);
                if (alreadyPicked === 'linda') {
                    const friends = available.filter(p => p.id === 'kalle' || p.id === 'amanda');
                    responders.push(friends[Math.floor(Math.random() * friends.length)]);
                } else {
                    responders.push(available[Math.floor(Math.random() * available.length)]);
                }
            }

            for (const responder of responders) {
                const isSecondResponder = responders.indexOf(responder) > 0;

                // 30-120s delay for first responder, fixed shorter delay for chain
                const randomDelay = Math.floor(Math.random() * (120000 - 30000 + 1)) + 30000;
                const typingDelay = isSecondResponder ? 8000 : randomDelay;
                const responseDelay = isSecondResponder ? 3000 : 0;

                if (isSecondResponder) {
                    await new Promise(resolve => setTimeout(resolve, responseDelay));
                }

                setIsTyping(responder);
                await new Promise(resolve => setTimeout(resolve, typingDelay));

                const contextMessages = messages.slice(-12).map(m => ({
                    role: m.role,
                    text: `${m.persona ? m.persona.name + ': ' : (m.senderName || 'Medlem') + ': '} ${m.text}`,
                    timestamp: m.timestamp
                }));

                const isFirstTimeAnneliOrAndreas = isFirstMessage && (responder.id === 'anneli' || responder.id === 'andreas');
                const aiInstruction = isFirstTimeAnneliOrAndreas
                    ? `Svara EXAKT så här: "Hej ${user.full_name.split(' ')[0]}, vad fint att du hittat hit. Jag heter ${responder.name.split(' ')[0]} och jobbar som behandlingspedagog här. Hur känns det att ta steget att skriva här idag?"`
                    : isSecondResponder
                        ? `Du svarar nu direkt efter ${responders[0].name}. Bekräfta vad de sa eller bygg vidare på det som en del av en naturlig gruppchat. Prata som en människa, sök gemenskap.`
                        : `Svara på användarens meddelande. Du är i ett öppet chatrum med dina vänner Amanda, Axel, Lina, Kalle, Marcus, Saga, Erik och Linda. Var varm, mänsklig och bekräftande.`;

                try {
                    const responseText = await getAIResponse(
                        contextMessages,
                        textToSend,
                        `${responder.systemPrompt}\n\nKONTEXT: ${aiInstruction}\n\nVIKTIGT: Svara kort och kärnfullt (max 3 meningar om det inte är det specifika välkomstmeddelandet). Använd en mjuk, mänsklig ton. Avslöja aldrig att du är en AI.`
                    );

                    if (!responseText) continue;

                    const { data: savedMsg, error: saveErr } = await supabase.from('messages').insert({
                        content: responseText,
                        user_id: user.id,
                        is_ai: true,
                        persona_id: responder.id,
                        thread_id: threadId === 'general' ? null : threadId
                    }).select().single();

                    if (!saveErr && savedMsg) {
                        const newMapped: CommunityMessage = {
                            id: savedMsg.id,
                            role: 'model',
                            text: responseText,
                            timestamp: new Date(savedMsg.created_at),
                            persona: responder
                        };
                        setMessages(prev => [...prev, newMapped]);
                    }
                } catch (aiErr) {
                    console.error("AI Gen Error", aiErr);
                } finally {
                    setIsTyping(null);
                }
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    const handleEdit = async (messageId: string) => {
        if (!editInput.trim()) return;

        try {
            const { error } = await supabase
                .from('messages')
                .update({
                    content: editInput,
                    is_edited: true,
                    edit_count: (messages.find(m => m.id === messageId)?.edit_count || 0) + 1
                })
                .eq('id', messageId);

            if (!error) {
                setEditingMessageId(null);
                setEditInput('');
            }
        } catch (err) {
            console.error('Error editing message:', err);
        }
    };

    const handleDelete = async (messageId: string) => {
        if (!confirm('Är du säker på att du vill ta bort detta meddelande?')) return;

        try {
            await supabase.from('messages').delete().eq('id', messageId);
        } catch (err) {
            console.error('Error deleting message:', err);
        }
    };

    const startEditing = (msg: CommunityMessage) => {
        setEditingMessageId(msg.id || null);
        setEditInput(msg.text);
    };

    return (
        <div className={`flex flex-col bg-transparent overflow-hidden ${className || 'h-full'}`}>
            {/* Header (Optional, mostly hidden in ChatPage) */}
            {showHeader && (
                <div className="px-6 py-4 bg-slate-900/40 backdrop-blur-xl border-b border-white/5 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-slate-950 shadow-lg">
                            <MessageCircle size={20} />
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-white uppercase tracking-wider">
                                {threadId === 'general' ? 'Gemenskapen' : threadId}
                            </h3>
                            <p className="text-[10px] text-orange-500 font-bold tracking-widest uppercase flex items-center gap-1.5">
                                <span className="w-1 h-1 bg-orange-500 rounded-full animate-ping"></span> Live nu
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Messages View */}
            <div ref={scrollRef} className="flex-grow overflow-y-auto px-8 py-10 space-y-8 no-scrollbar scroll-smooth">
                {messages.map((msg, idx) => {
                    const isUser = msg.role === 'user';
                    const nextMsgIsSame = messages[idx + 1]?.persona?.id === msg.persona?.id && messages[idx + 1]?.role === msg.role;

                    return (
                        <div key={idx} className={`flex items-end gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'} animate-in fade-in slide-in-from-bottom-6 duration-700`}>
                            {/* Avatar - only show if next message is not from same person */}
                            {!nextMsgIsSame ? (
                                <div className={`w-12 h-12 rounded-[1.25rem] flex items-center justify-center shrink-0 shadow-2xl relative group cursor-pointer overflow-hidden ${isUser ? 'bg-gradient-to-br from-orange-400 to-red-600 text-white' : (msg.persona?.color || 'bg-slate-800') + ' text-white'}`}>
                                    {isUser ? (
                                        (msg.senderEmail === 'billy.ljungberg90@gmail.com' || (!msg.senderEmail && user.email === 'billy.ljungberg90@gmail.com')) ? (
                                            <img src="/assets/logo2.png" alt="Admin" className="w-full h-full object-contain p-1.5 bg-slate-900" />
                                        ) : msg.senderAvatar ? (
                                            <img src={msg.senderAvatar} alt={msg.senderName} className="w-full h-full object-cover" />
                                        ) : (
                                            (msg.senderName || user.full_name).charAt(0)
                                        )
                                    ) : (
                                        <div className="scale-125">{msg.persona?.avatar}</div>
                                    )}
                                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-4 border-slate-950 rounded-full ${isUser ? 'bg-green-500' : 'bg-green-500'}`}></div>
                                </div>
                            ) : (
                                <div className="w-12 shrink-0"></div>
                            )}

                            {/* Message Content */}
                            <div className={`flex flex-col max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
                                {/* Meta info only on first message of a group */}
                                {(!messages[idx - 1] || messages[idx - 1].role !== msg.role || messages[idx - 1].persona?.id !== msg.persona?.id) && (
                                    <div className="flex items-center gap-3 mb-2 px-2">
                                        <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">{isUser ? (msg.senderName || user.full_name) : msg.persona?.name}</span>
                                        <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                )}

                                <div className={`
                                    relative px-7 py-5 text-[15px] leading-relaxed shadow-[0_15px_35px_rgba(0,0,0,0.3)] transition-all duration-500 hover:scale-[1.01] overflow-hidden group
                                    ${isUser
                                        ? 'bg-orange-500 text-slate-950 font-bold rounded-[2.5rem] rounded-br-none'
                                        : 'bg-slate-900/80 text-slate-200 border border-white/5 rounded-[2.5rem] rounded-bl-none backdrop-blur-xl'}
                                `}>
                                    {isUser && <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>}

                                    {editingMessageId === msg.id ? (
                                        <div className="relative z-10 space-y-3">
                                            <textarea
                                                value={editInput}
                                                onChange={(e) => setEditInput(e.target.value)}
                                                className="w-full bg-black/20 text-slate-950 p-3 rounded-xl border border-black/10 focus:outline-none min-h-[80px] font-bold"
                                            />
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => setEditingMessageId(null)} className="p-2 bg-black/10 rounded-lg hover:bg-black/20"><XCircle size={18} /></button>
                                                <button onClick={() => handleEdit(msg.id!)} className="p-2 bg-black/10 rounded-lg hover:bg-black/20"><CheckCircle2 size={18} /></button>
                                            </div>
                                        </div>
                                    ) : (
                                        <span className="relative z-10">{msg.text}</span>
                                    )}

                                    {/* Edit/Delete Controls */}
                                    <div className={`absolute top-2 ${isUser ? 'left-2' : 'right-2'} flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity`}>
                                        {/* Own message: Edit 1x only OR Admin: Always edit */}
                                        {((msg.user_id === user.id && (msg.edit_count || 0) < 1) || (user.role === 'admin')) && !msg.is_ai && !editingMessageId && (
                                            <button onClick={() => startEditing(msg)} className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors">
                                                <Edit2 size={12} />
                                            </button>
                                        )}
                                        {/* Admin can delete anything */}
                                        {(user.role === 'admin') && !editingMessageId && (
                                            <button onClick={() => handleDelete(msg.id!)} className="p-1.5 hover:bg-white/10 rounded-lg text-red-400 hover:text-red-500 transition-colors">
                                                <Trash2 size={12} />
                                            </button>
                                        )}
                                    </div>

                                    {(isUser || msg.is_edited) && (
                                        <div className={`absolute -bottom-6 ${isUser ? 'right-0' : 'left-0'} flex items-center gap-2 ${isUser ? 'text-orange-500/60' : 'text-slate-500/60'}`}>
                                            {msg.is_edited && (
                                                <span className="text-[8px] font-black uppercase tracking-widest italic mr-2">(Redigerat)</span>
                                            )}
                                            {isUser && (
                                                <>
                                                    <CheckCheck size={14} className="animate-pulse" />
                                                    <span className="text-[9px] font-black uppercase tracking-widest">Levererad</span>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}

                {isTyping && (
                    <div className="flex items-end gap-3 animate-in fade-in slide-in-from-bottom-2">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${isTyping.color} text-white shadow-xl`}>
                            {isTyping.avatar}
                        </div>
                        <div className="bg-slate-900 border border-white/5 rounded-3xl rounded-bl-none px-6 py-4 shadow-2xl">
                            <div className="flex gap-1.5">
                                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area (Floating Swipe Style) */}
            <div className="px-3 md:px-6 pb-4 md:pb-6 pt-2">
                <div className="relative group bg-slate-900/60 backdrop-blur-2xl border border-white/5 rounded-[1.5rem] p-2 shadow-2xl transition-all focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500/30 flex items-center gap-2">
                    <button className="text-slate-500 hover:text-orange-400 transition-colors shrink-0 p-2" aria-label="Lägg till emoji">
                        <Smile size={20} />
                    </button>

                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Skriv ett meddelande..."
                        className="flex-grow bg-transparent border-none py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none font-medium min-w-0"
                    />

                    <div className="flex items-center gap-1 shrink-0">
                        <button className="p-2 text-slate-500 hover:text-white transition-all hover:bg-white/5 rounded-xl shrink-0 hidden sm:flex" aria-label="Bifoga fil">
                            <Paperclip size={18} />
                        </button>
                        <button
                            onClick={handleSend}
                            disabled={!input.trim()}
                            aria-label="Skicka meddelande"
                            className={`
                w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 shrink-0
                ${input.trim()
                                    ? 'bg-orange-500 text-slate-950 shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95'
                                    : 'bg-slate-800 text-slate-600 opacity-50'}
              `}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityChat;
