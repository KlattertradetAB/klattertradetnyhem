import React, { useState, useEffect, useRef } from 'react';
import { Profile, DmMessage, DmRoom } from '../types';
import { supabase } from '../services/supabase';
import { dmService } from '../services/dmService';
import {
    Send, User, MessageCircle, MoreVertical,
    Smile, Paperclip, CheckCheck, Edit2, Trash2
} from 'lucide-react';
import { getEffectiveAvatar, getUserInitials } from '../services/userUtils';

interface DirectChatProps {
    user: Profile;
    conversation: DmRoom;
    onlineUsers?: Record<string, any>;
    className?: string;
    showHeader?: boolean;
}

const DirectChat: React.FC<DirectChatProps> = ({ 
    user, 
    conversation, 
    onlineUsers = {}, 
    className,
    showHeader = true 
}) => {
    const [messages, setMessages] = useState<DmMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    const otherUser = conversation.other_user;

    useEffect(() => {
        const fetchMessages = async () => {
            setIsLoading(true);
            const data = await dmService.getMessages(conversation.id);
            setMessages(data);
            setIsLoading(false);
        };

        fetchMessages();
        dmService.markAsRead(conversation.id);

        const channel = dmService.subscribeToRoom(conversation.id, (newMsg) => {
            setMessages(prev => {
                if (prev.some(m => m.id === newMsg.id)) return prev;
                return [...prev, newMsg];
            });
            // Mark as read when new message arrives if we are in the room
            dmService.markAsRead(conversation.id);
        });

        return () => {
            supabase.removeChannel(channel);
        };
    }, [conversation.id]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const textToSend = input;
        setInput('');

        // Optimistic update
        const optimisticMsg: any = {
            id: 'temp-' + Date.now(),
            room_id: conversation.id,
            user_id: user.id,
            content: textToSend,
            created_at: new Date().toISOString()
        };
        setMessages(prev => [...prev, optimisticMsg]);

        const result = await dmService.sendMessage(conversation.id, textToSend);
        
        if (result) {
            // Replace optimistic message with actual data
            setMessages(prev => prev.map(m => m.id === optimisticMsg.id ? result : m));
            
            // Manual notification insertion removed - now handled by Database Trigger (notis_trigger.sql)
        }
    };

    if (!conversation) return null;

    return (
        <div className={`flex flex-col bg-transparent h-full w-full max-w-full ${className || ''}`}>
            {/* Header - Only shown if not handled by parent (ChatPage) */}
            {showHeader && (
                <div className="px-4 md:px-6 py-4 md:py-8 border-b border-white/5 flex items-center justify-between bg-slate-900/60 backdrop-blur-3xl relative z-20 shrink-0">
                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="relative">
                            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-[2rem] flex items-center justify-center text-lg md:text-xl shadow-2xl transition-transform hover:scale-105 duration-500 overflow-hidden ${getEffectiveAvatar(undefined, otherUser?.avatar_url, undefined)?.includes('logo2') ? 'bg-slate-950 p-2' : 'bg-gradient-to-br from-orange-400 to-red-600 text-white'}`}>
                                {(() => {
                                    const avatar = getEffectiveAvatar(undefined, otherUser?.avatar_url, undefined);
                                    return avatar ? (
                                        <img src={avatar} alt={otherUser?.full_name || 'Medlem'} className="w-full h-full object-cover" />
                                    ) : (
                                        getUserInitials(otherUser?.full_name || '?')
                                    );
                                })()}
                            </div>
                            {onlineUsers[otherUser?.id || ''] && (
                                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 md:w-5 md:h-5 bg-green-500 border-[3px] md:border-4 border-slate-950 rounded-full shadow-lg"></div>
                            )}
                        </div>
                        <div>
                            <h3 className="text-lg md:text-2xl font-black text-white tracking-tighter truncate max-w-[150px] md:max-w-none">
                                {otherUser?.full_name || 'Medlem'}
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] md:text-[10px] text-orange-500 font-black uppercase tracking-widest">Privat chatt</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        <button className="p-3 md:p-4 bg-white/5 hover:bg-orange-500/10 hover:text-orange-400 border border-white/5 rounded-xl md:rounded-2xl transition-all shadow-xl active:scale-95">
                            <MoreVertical size={18} />
                        </button>
                    </div>
                </div>
            )}

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-8 py-6 md:py-10 space-y-6 md:space-y-8 no-scrollbar scroll-smooth min-h-0">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-600 gap-4">
                        <div className="w-8 h-8 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
                        <p className="font-bold text-xs uppercase tracking-widest">Hämtar historik...</p>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-700 text-center space-y-4 opacity-50">
                        <div className="w-20 h-20 bg-white/5 rounded-[2.5rem] flex items-center justify-center">
                            <MessageCircle size={40} />
                        </div>
                        <p className="italic">Inget sagt än. Säg hej!</p>
                    </div>
                ) : (
                    messages.map((msg, idx) => {
                        const isCurrentUser = msg.user_id === user.id;
                        const nextMsgIsSame = messages[idx + 1]?.user_id === msg.user_id;

                        return (
                            <div key={msg.id} className={`flex items-end gap-4 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} animate-in fade-in slide-in-from-bottom-6 duration-700`}>
                                {/* Avatar */}
                                {!nextMsgIsSame ? (
                                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-2xl relative overflow-hidden ${isCurrentUser ? 'bg-gradient-to-br from-orange-400 to-red-600 text-white' : 'bg-slate-800 text-white'}`}>
                                        {(() => {
                                            const u = isCurrentUser ? user : otherUser;
                                            const avatar = getEffectiveAvatar(u?.email || undefined, u?.avatar_url || undefined, u?.role || undefined);
                                            return avatar ? (
                                                <img src={avatar} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-xs">{getUserInitials(u?.full_name || '?')}</span>
                                            );
                                        })()}
                                        
                                        {/* Status Dot for other user */}
                                        {!isCurrentUser && onlineUsers[msg.user_id] && (
                                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="w-10 shrink-0"></div>
                                )}

                                {/* Content */}
                                <div className={`flex flex-col max-w-[75%] ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                                    <div className={`
                                        relative px-6 py-4 text-[14px] leading-relaxed shadow-2xl transition-all duration-500 hover:scale-[1.01]
                                        ${isCurrentUser
                                            ? 'bg-orange-500 text-slate-950 font-bold rounded-[2rem] rounded-br-none'
                                            : 'bg-slate-900/80 text-slate-200 border border-white/5 rounded-[2rem] rounded-bl-none backdrop-blur-xl'}
                                    `}>
                                        <span>{msg.content}</span>
                                        
                                        {isCurrentUser && (
                                            <div className="absolute -bottom-5 right-0 flex items-center gap-2 text-orange-500/40">
                                                <CheckCheck size={12} className="animate-pulse" />
                                                <span className="text-[8px] font-black uppercase tracking-widest">
                                                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        )}
                                        {!isCurrentUser && (
                                            <div className="absolute -bottom-5 left-0 text-slate-500/40 text-[8px] font-black uppercase tracking-widest">
                                                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Input */}
            <div className="px-6 pb-6 pt-2 shrink-0">
                <div className="group bg-slate-900/60 backdrop-blur-2xl border border-white/5 rounded-[1.5rem] p-2 shadow-2xl transition-all focus-within:ring-2 focus-within:ring-orange-500/20 flex items-center gap-2">
                    <button className="text-slate-500 hover:text-orange-400 transition-colors p-2">
                        <Smile size={20} />
                    </button>

                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Skriv ett privat meddelande..."
                        className="flex-grow bg-transparent border-none py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none font-medium"
                    />

                    <div className="flex items-center gap-1">
                        <button className="p-2 text-slate-500 hover:text-white transition-all hover:bg-white/5 rounded-xl hidden sm:flex">
                            <Paperclip size={18} />
                        </button>
                        <button
                            onClick={handleSend}
                            disabled={!input.trim()}
                            className={`
                                w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300
                                ${input.trim() ? 'bg-orange-500 text-slate-950 shadow-lg' : 'bg-slate-800 text-slate-600 opacity-50'}
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

export default DirectChat;
