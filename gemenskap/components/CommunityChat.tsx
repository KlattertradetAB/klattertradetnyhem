import React, { useState, useEffect, useRef } from 'react';
import { Profile, ChatMessage } from '../types';
import { PERSONAS, Persona } from '../services/personas';
import { supabase } from '../services/supabase';
import { getAIResponse } from '../services/gemini';
import { sendNotification } from '../services/notifications';
import {
    Send, User, MessageCircle, Sparkles, MoreHorizontal,
    Smile, Paperclip, MoreVertical, Check, CheckCheck,
    Edit2, Trash2, XCircle, CheckCircle2
} from 'lucide-react';
import { getEffectiveAvatar, getUserInitials } from '../services/userUtils';

interface CommunityChatProps {
    user: Profile;
    threadId?: string;
    showHeader?: boolean;
    className?: string;
    onlineUsers?: Set<string>;
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

const CommunityChat: React.FC<CommunityChatProps> = ({ user, threadId = 'general', showHeader = true, className, onlineUsers }) => {
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
                .from('chat_messages')
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
                const userIds = [...new Set(messagesData.filter((m: any) => !m.is_ai).map((m: any) => m.user_id))];
                let profilesMap: Record<string, any> = {};

                if (userIds.length > 0) {
                    const { data: profilesData } = await supabase
                        .from('profiles')
                        .select('id, full_name, email, avatar_url')
                        .in('id', userIds);

                    if (profilesData) {
                        profilesData.forEach((p) => {
                            profilesMap[p.id] = p;
                        });
                    }
                }

                const mappedMessages: CommunityMessage[] = messagesData.map((msg) => ({
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

    /* AI Forum Automation Disabled for now
    useEffect(() => {
        if (messages.length === 0 || !user) return;
        // ... (logic)
    }, [messages.length, threadId, user]);
    */

    useEffect(() => {
        const channel = supabase
            .channel(`public:messages:${threadId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'chat_messages',
                    filter: threadId && threadId !== 'general' ? `thread_id=eq.${threadId}` : undefined
                },
                async (payload: any) => {
                    const newMsg = payload.new as any;
                    if ((threadId === 'general' || !threadId) && newMsg.thread_id) return;

                    let senderName = 'Någon';
                    let senderEmail = '';
                    let senderAvatar = '';
                    if (!newMsg.is_ai) {
                        const { data } = await (supabase
                            .from('profiles')
                            .select('full_name, email, avatar_url')
                            .eq('id', newMsg.user_id)
                            .single() as any);
                        if (data) {
                            senderName = (data as any).full_name;
                            senderEmail = (data as any).email;
                            senderAvatar = (data as any).avatar_url;
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
                    table: 'chat_messages',
                    filter: threadId && threadId !== 'general' ? `thread_id=eq.${threadId}` : undefined
                },
                (payload: any) => {
                    const updatedMsg = payload.new as any;
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
                    table: 'chat_messages',
                    filter: threadId && threadId !== 'general' ? `thread_id=eq.${threadId}` : undefined
                },
                (payload: any) => {
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
            senderAvatar: getEffectiveAvatar(user.email, (user as any).avatar_url) || undefined
        };
        setMessages(prev => [...prev, optimisticMsg]);

        try {
            await supabase.from('chat_messages').insert({
                content: textToSend,
                user_id: user.id,
                is_ai: false,
                thread_id: threadId === 'general' ? null : threadId
            });

            /* AI Response Logic Disabled for now
            const userMessages = messages.filter(m => m.role === 'user');
            // ... (AI loop)
            */
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    const handleEdit = async (messageId: string) => {
        if (!editInput.trim()) return;

        try {
            const { error } = await supabase
                .from('chat_messages')
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
            await supabase.from('chat_messages').delete().eq('id', messageId);
        } catch (err) {
            console.error('Error deleting message:', err);
        }
    };

    const startEditing = (msg: CommunityMessage) => {
        setEditingMessageId(msg.id || null);
        setEditInput(msg.text);
    };

    return (
        <div className={`flex flex-col bg-transparent h-full w-full max-w-full ${className || ''}`}>
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
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-8 py-10 space-y-8 no-scrollbar scroll-smooth min-h-0">
                {messages.map((msg, idx) => {
                    const isCurrentUser = msg.user_id === user.id;
                    const nextMsgIsSame = messages[idx + 1]?.persona?.id === msg.persona?.id && messages[idx + 1]?.role === msg.role;

                    return (
                        <div key={idx} className={`flex items-end gap-4 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} animate-in fade-in slide-in-from-bottom-6 duration-700`}>
                            {/* Avatar - only show if next message is not from same person */}
                            {!nextMsgIsSame ? (
                                <div className={`w-12 h-12 rounded-[1.25rem] flex items-center justify-center shrink-0 shadow-2xl relative group cursor-pointer overflow-hidden ${isCurrentUser ? 'bg-gradient-to-br from-orange-400 to-red-600 text-white' : (msg.persona?.color || 'bg-slate-800') + ' text-white'}`}>
                                    {isCurrentUser || msg.role === 'user' ? (
                                        (() => {
                                            const avatar = getEffectiveAvatar(msg.senderEmail, msg.senderAvatar);
                                            return avatar ? (
                                                <img src={avatar} alt={msg.senderName} className={`w-full h-full ${avatar.includes('icon-512') ? 'object-contain p-1.5 bg-slate-900' : 'object-cover'}`} />
                                            ) : (
                                                getUserInitials(msg.senderName || user.full_name)
                                            );
                                        })()
                                    ) : (
                                        <div className="scale-125">{msg.persona?.avatar}</div>
                                    )}
                                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-4 border-slate-950 rounded-full ${isCurrentUser || (msg.user_id && onlineUsers?.has(msg.user_id)) ? 'bg-green-500' : 'bg-slate-500'}`}></div>
                                </div>
                            ) : (
                                <div className="w-12 shrink-0"></div>
                            )}

                            {/* Message Content */}
                            <div className={`flex flex-col max-w-[75%] ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                                {/* Meta info only on first message of a group */}
                                {(!messages[idx - 1] || messages[idx - 1].role !== msg.role || messages[idx - 1].persona?.id !== msg.persona?.id) && (
                                    <div className="flex items-center gap-3 mb-2 px-2">
                                        <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">{isCurrentUser ? (msg.senderName || user.full_name) : (msg.persona?.name || msg.senderName)}</span>
                                        <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                )}

                                <div className={`
                                    relative px-7 py-5 text-[15px] leading-relaxed shadow-[0_15px_35px_rgba(0,0,0,0.3)] transition-all duration-500 hover:scale-[1.01] overflow-hidden group
                                    ${isCurrentUser
                                        ? 'bg-orange-500 text-slate-950 font-bold rounded-[2.5rem] rounded-br-none'
                                        : 'bg-slate-900/80 text-slate-200 border border-white/5 rounded-[2.5rem] rounded-bl-none backdrop-blur-xl'}
                                `}>
                                    {isCurrentUser && <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>}

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
                                    <div className={`absolute top-2 ${isCurrentUser ? 'left-2' : 'right-2'} flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity`}>
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

                                    {(isCurrentUser || msg.is_edited) && (
                                        <div className={`absolute -bottom-6 ${isCurrentUser ? 'right-0' : 'left-0'} flex items-center gap-2 ${isCurrentUser ? 'text-orange-500/60' : 'text-slate-500/60'}`}>
                                            {msg.is_edited && (
                                                <span className="text-[8px] font-black uppercase tracking-widest italic mr-2">(Redigerat)</span>
                                            )}
                                            {isCurrentUser && (
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
            <div className="px-3 md:px-6 pb-4 md:pb-6 pt-2 shrink-0 w-full">
                <div className="relative group bg-slate-900/60 backdrop-blur-2xl border border-white/5 rounded-[1.5rem] p-2 shadow-2xl transition-all focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500/30 flex items-center gap-2 w-full max-w-full">
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
