import React, { useState, useEffect } from 'react';
import { Profile } from '../types';
import { Page } from '../../types';
import { PERSONAS } from '../services/personas';
import CommunityChat from './CommunityChat';
import {
    Hash, MessageSquare, Shield, Info, Settings, Search, Bell, Users, Star,
    Plus, User, LayoutGrid, Power, Moon, Sun, MessageCircle, Heart, Zap,
    MoreVertical, Send, Smile, Paperclip, ChevronLeft, ChevronRight,
    UserPlus, Camera, Mic, MicOff, VideoOff, PhoneOff, Lock
} from 'lucide-react';
import { NewThreadModal } from './NewThreadModal';
import { InviteFriendModal } from './InviteFriendModal';
import { VideoRoom } from './VideoRoom';
import { getNotifications, subscribeToNotifications, clearNotifications, NotificationItem, addNotification } from '../services/notificationStore';
import { supabase } from '../services/supabase';
import { getEffectiveAvatar } from '../services/userUtils';

interface ChatPageProps {
    user: Profile;
    onlineUsers: Set<string>;
    initialThread?: string | null;
    onOpenSettings?: () => void;
    onLogout: () => void;
    onBackToSite: (page?: Page) => void;
}

interface ChatRoom {
    id: string;
    name: string;
    icon: React.ReactNode;
    description: string;
    category: 'public' | 'private' | 'support';
    hasVideo?: boolean;
}

const CHAT_ROOMS: ChatRoom[] = [
    { id: 'general', name: 'Gemenskapen', icon: <Hash size={18} />, description: 'Det öppna rummet för alla medlemmar.', category: 'public' },
    { id: 'self-care', name: 'Self-care tips', icon: <Heart size={18} />, description: 'Dela med dig av dina bästa tips för självvård.', category: 'public' },
    { id: 'video', name: 'Videorummet', icon: <Camera size={18} />, description: 'Anslut med kamera och röst i realtid.', category: 'public', hasVideo: true },
    { id: 'trygghet', name: 'Trygga rummet', icon: <Shield size={18} />, description: 'En skyddad plats för svårare samtal.', category: 'private' },
    { id: 'info', name: 'Information', icon: <Info size={18} />, description: 'Viktiga meddelanden från administratörer.', category: 'support' },
];

const ChatPage: React.FC<ChatPageProps> = ({ user, onlineUsers: globalOnlineUsers, initialThread, onOpenSettings, onLogout, onBackToSite }) => {
    const [activeRoom, setActiveRoom] = useState<string>(initialThread || 'general');
    const [activeNav, setActiveNav] = useState<'discussions' | 'members' | 'notifications' | 'settings'>('discussions');
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [showNewThreadModal, setShowNewThreadModal] = useState(false);
    const [notifications, setNotifications] = useState<NotificationItem[]>(getNotifications());
    const [showInviteModal, setShowInviteModal] = useState(false);
    // Default to false so mobile users land on the Room List (Hub), desktop unaffected
    const [mobileShowChat, setMobileShowChat] = useState(false);
    const [threads, setThreads] = useState<any[]>([]);

    useEffect(() => {
        const fetchThreads = async () => {
            const { data, error } = await supabase
                .from('threads')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data) {
                setThreads(data);
            }
        };

        fetchThreads();

        const subscription = supabase
            .channel('public:threads')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'threads' }, (payload: any) => {
                setThreads(prev => [payload.new, ...prev]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    useEffect(() => {
        const unsubscribe = subscribeToNotifications((updatedNotifications) => {
            setNotifications(updatedNotifications);
        });
        return () => unsubscribe();
    }, []);

    // Presence & Global Notifications handled in GemenskapApp.tsx

    // Helper to check if a room is locked for the current user
    const isRoomLocked = (roomId: string) => {
        // Unlock all rooms for everyone as per new community guidelines
        return false;
    };

    const dynamicRooms: ChatRoom[] = threads.map(t => ({
        id: t.id,
        name: t.title,
        icon: <MessageSquare size={18} />,
        description: t.description,
        category: (t.category === 'support' || t.category === 'private') ? 'support' : 'public',
    }));

    const allRooms = [...CHAT_ROOMS, ...dynamicRooms];

    const currentRoom = allRooms.find(r => r.id === activeRoom) || CHAT_ROOMS[0];

    return (
        <div className="flex h-full bg-slate-950/80 backdrop-blur-3xl animate-in fade-in zoom-in-95 duration-700">

            {/* 1. Left Vertical Navigation (Swipe Style) */}
            <div className="hidden md:flex w-24 bg-slate-900/80 border-r border-white/5 flex-col items-center py-10 justify-between shrink-0 h-full">
                {/* ... (keep user avatar and nav buttons) */}
                <div className="flex flex-col items-center gap-10 w-full">
                    {/* User Avatar with Pulse indicator */}
                    <div className="relative group cursor-pointer mb-4 overflow-hidden rounded-2.5rem p-0.5 bg-gradient-to-tr from-white/10 to-transparent">
                        <div className={`w-14 h-14 rounded-2.5rem flex items-center justify-center text-xl font-black text-white shadow-2xl group-hover:scale-105 transition-transform duration-500 overflow-hidden ${getEffectiveAvatar(user.email, user.avatar_url)?.includes('icon-512') ? 'bg-slate-950 p-2' : 'bg-gradient-to-br from-orange-400 to-red-600'}`}>
                            {(() => {
                                const avatar = getEffectiveAvatar(user.email, user.avatar_url);
                                return avatar ? (
                                    <img src={avatar} alt={user.full_name} className={`w-full h-full ${avatar.includes('icon-512') ? 'object-contain' : 'object-cover'}`} />
                                ) : (
                                    user.full_name.charAt(0)
                                );
                            })()}
                        </div>
                        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-4 border-slate-900 rounded-full shadow-lg z-10"></div>
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>

                    <div className="flex flex-col gap-6 w-full px-4">
                        {[
                            { id: 'discussions', icon: <MessageCircle size={26} />, label: 'Chatt' },
                            { id: 'members', icon: <Users size={26} />, label: 'Medlemmar' },
                            { id: 'notifications', icon: <Bell size={26} />, label: 'Notiser', badge: notifications.length > 0 },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveNav(item.id as any)}
                                className={`
                                    relative p-4 rounded-3xl transition-all duration-500 flex items-center justify-center group
                                    ${activeNav === item.id
                                        ? 'bg-orange-500 text-slate-950 shadow-[0_10px_30px_rgba(249,115,22,0.3)] scale-110'
                                        : 'text-slate-500 hover:text-white hover:bg-white/5'}
                                `}
                            >
                                {item.icon}
                                {item.badge && activeNav !== item.id && (
                                    <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-950 group-hover:scale-125 transition-transform"></div>
                                )}
                                <span className={`absolute left-full ml-4 px-3 py-1 bg-white text-slate-950 text-[10px] font-black uppercase rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-xl`}>
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-center gap-6 w-full px-4">
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="p-4 rounded-3xl text-slate-500 hover:text-orange-400 hover:bg-orange-500/10 transition-all duration-300 group relative"
                    >
                        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
                        <span className="absolute left-full ml-4 px-3 py-1 bg-white text-slate-950 text-[10px] font-black uppercase rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-xl">
                            {isDarkMode ? 'Ljust läge' : 'Mörkt läge'}
                        </span>
                    </button>
                    {/* Settings and Logout removed as they are now in the main app sidebar */}
                </div>
            </div>

            {/* 2. Middle Sidebar (Content List) - Responsive: Full width on mobile when chat hidden, fixed width on desktop */}
            <div className={`${mobileShowChat ? 'hidden lg:flex' : 'flex w-full'} lg:w-80 bg-slate-900/40 border-r border-white/5 flex-col shrink-0 h-full transition-all duration-300`}>
                {activeNav === 'discussions' && (
                    <>
                        <div className="p-8 pb-6">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-3xl font-black text-white tracking-tighter">Diskussioner</h2>
                                <button
                                    onClick={() => setShowNewThreadModal(true)}
                                    className="w-12 h-12 bg-orange-500 hover:bg-orange-400 text-slate-950 rounded-2xl flex items-center justify-center transition-all shadow-[0_10px_20px_rgba(249,115,22,0.2)] active:scale-95 group"
                                >
                                    <Plus size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                                </button>
                            </div>

                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-orange-500 transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="Sök i gemenskapen..."
                                    className="w-full bg-slate-950/40 border border-white/10 rounded-[1.25rem] py-4 pl-12 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/40 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="flex-grow overflow-y-auto px-2 pb-24 md:pb-8 space-y-8 no-scrollbar scroll-smooth">
                            {/* Category: Public Rooms */}
                            <div className="space-y-3">
                                <div className="px-4 flex items-center justify-between">
                                    <span className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-500">Offentliga Rum</span>
                                    <div className="h-[1px] flex-grow ml-4 bg-gradient-to-r from-white/10 to-transparent"></div>
                                </div>
                                <div className="space-y-1">
                                    {allRooms.filter(r => r.category === 'public').map(room => {
                                        const locked = isRoomLocked(room.id);
                                        return (
                                            <button
                                                key={room.id}
                                                onClick={() => {
                                                    if (!locked) {
                                                        setActiveRoom(room.id);
                                                        setMobileShowChat(true);
                                                    }
                                                }}
                                                disabled={locked}
                                                className={`w-[calc(100%-1rem)] mx-2 flex items-center gap-4 px-4 py-5 rounded-[2rem] transition-all duration-500 group relative 
                                                ${activeRoom === room.id ? 'bg-white/10 shadow-2xl border border-white/5' : locked ? 'opacity-50 cursor-not-allowed' : 'text-slate-500 hover:bg-white/5 hover:text-white'}
                                            `}
                                            >
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 
                                                ${activeRoom === room.id ? 'bg-orange-500 text-slate-950 shadow-xl scale-110' : locked ? 'bg-slate-800/20 text-slate-600' : 'bg-slate-800/50 border border-white/5'}
                                            `}>
                                                    {locked ? <Lock size={18} /> : room.icon}
                                                </div>
                                                <div className="flex-grow text-left">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className={`font-bold transition-colors ${activeRoom === room.id ? 'text-white' : locked ? 'text-slate-600' : 'group-hover:text-orange-400'}`}>{room.name}</span>
                                                        {!locked && <span className="text-[10px] font-medium opacity-40">12:45</span>}
                                                    </div>
                                                    <p className="text-[11px] opacity-60 line-clamp-1 font-medium leading-relaxed">{room.description}</p>
                                                </div>
                                                {activeRoom === room.id && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-orange-500 rounded-r-full shadow-[0_0_15px_rgba(249,115,22,1)]"></div>}
                                                {room.hasVideo && !locked && (
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full animate-pulse">
                                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                                        <span className="text-[8px] font-black text-green-500 uppercase tracking-widest">Live</span>
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Private Rooms */}
                            <div className="space-y-3">
                                <div className="px-4 flex items-center justify-between">
                                    <span className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-500">Privata Grupper</span>
                                    <div className="h-[1px] flex-grow ml-4 bg-gradient-to-r from-white/10 to-transparent"></div>
                                </div>
                                <div className="space-y-1">
                                    {allRooms.filter(r => r.category === 'private' || r.category === 'support').map(room => {
                                        const locked = isRoomLocked(room.id);
                                        return (
                                            <button
                                                key={room.id}
                                                onClick={() => {
                                                    if (!locked) {
                                                        setActiveRoom(room.id);
                                                        setMobileShowChat(true);
                                                    }
                                                }}
                                                disabled={locked}
                                                className={`w-[calc(100%-1rem)] mx-2 flex items-center gap-4 px-4 py-5 rounded-[2rem] transition-all duration-500 group relative 
                                                    ${activeRoom === room.id ? 'bg-white/10 shadow-2xl border border-white/5' : locked ? 'opacity-50 cursor-not-allowed' : 'text-slate-500 hover:bg-white/5 hover:text-white'}
                                                `}
                                            >
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 
                                                    ${activeRoom === room.id ? 'bg-orange-500 text-slate-950 shadow-xl scale-110' : locked ? 'bg-slate-800/20 text-slate-600' : 'bg-slate-800/50 border border-white/5'}
                                                `}>
                                                    {locked ? <Lock size={18} /> : room.icon}
                                                </div>
                                                <div className="flex-grow text-left">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className={`font-bold transition-colors ${activeRoom === room.id ? 'text-white' : locked ? 'text-slate-600' : 'group-hover:text-orange-400'}`}>{room.name}</span>
                                                        {!locked && <span className="text-[10px] font-medium opacity-40">I går</span>}
                                                    </div>
                                                    <p className="text-[11px] opacity-60 line-clamp-1 font-medium leading-relaxed">{room.description}</p>
                                                </div>
                                                {activeRoom === room.id && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-orange-500 rounded-r-full shadow-[0_0_15px_rgba(249,115,22,1)]"></div>}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Members view */}
                {activeNav === 'members' && (
                    <div className="p-8 animate-in fade-in slide-in-from-left-4 duration-500 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-black text-white tracking-tighter">Medlemmar</h2>
                            <button className="w-12 h-12 bg-white/5 hover:bg-white/10 text-white rounded-2xl flex items-center justify-center transition-all border border-white/10 active:scale-95">
                                <UserPlus size={22} />
                            </button>
                        </div>
                        <div className="space-y-2 overflow-y-auto no-scrollbar pb-24 md:pb-8">
                            {/* Render Online Users from Global Presence */}
                            {Array.from(globalOnlineUsers).map(userId => (
                                <div key={userId} className="flex items-center gap-4 p-4 rounded-[2rem] hover:bg-white/5 transition-all cursor-pointer group border border-transparent hover:border-white/5">
                                    <div className="relative">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-xl transition-transform group-hover:scale-105 duration-500`}>
                                            <span className="font-bold">?</span>
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-slate-900 rounded-full shadow-lg"></div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white group-hover:text-orange-400 transition-colors">Medlem</h4>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Online</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {globalOnlineUsers.size === 0 && (
                                <div className="text-center py-10 text-slate-500 italic">Laddar medlemmar...</div>
                            )}
                        </div>
                        <div className="mt-auto py-6 border-t border-white/5">
                            <button
                                onClick={() => setShowInviteModal(true)}
                                className="w-full py-4 bg-orange-500 text-slate-950 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all hover:shadow-[0_10px_30px_rgba(249,115,22,0.2)] active:scale-95"
                            >
                                <UserPlus size={16} /> Bjud in vän
                            </button>
                        </div>
                    </div>
                )}
                {/* Invite Friend Modal */}
                {showInviteModal && <InviteFriendModal onClose={() => setShowInviteModal(false)} />}

                {/* Notifications view */}
                {activeNav === 'notifications' && (
                    <div className="p-8 animate-in fade-in slide-in-from-left-4 duration-500 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-black text-white tracking-tighter">Notiser</h2>
                            <button
                                onClick={clearNotifications}
                                className="text-zinc-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest"
                            >
                                Rensa alla
                            </button>
                        </div>
                        <div className="space-y-4 overflow-y-auto no-scrollbar pb-24 md:pb-10">
                            {notifications.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-slate-700">
                                        <Bell size={32} />
                                    </div>
                                    <p className="text-slate-500 font-medium italic">Inga nya notiser</p>
                                </div>
                            ) : (
                                notifications.map((n, i) => (
                                    <div key={n.id} className="flex gap-4 p-5 rounded-[2rem] bg-white/5 border border-white/5 hover:border-white/10 transition-all cursor-pointer group">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-orange-500/10 text-orange-400 border border-orange-500/20`}>
                                            <Bell size={14} />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="font-bold text-white text-sm group-hover:text-orange-400 transition-colors">{n.title}</h4>
                                            <p className="text-xs text-zinc-500 leading-relaxed">{n.message}</p>
                                            <p className="text-[10px] text-zinc-600 font-bold uppercase pt-1">
                                                {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {/* Settings view (Mini version in sidebar) */}
                {activeNav === 'settings' && (
                    <div className="p-8 animate-in fade-in slide-in-from-left-4 duration-500 h-full flex flex-col">
                        <h2 className="text-3xl font-black text-white tracking-tighter mb-8">Inställningar</h2>
                        <div className="space-y-6">
                            <div className="p-6 bg-white/5 border border-white/5 rounded-3xl space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">Profil</h4>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center text-white font-bold">
                                        {user.full_name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">{user.full_name}</p>
                                        <p className="text-[10px] text-zinc-600">{user.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onOpenSettings}
                                    className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-white transition-all"
                                >
                                    Redigera profil
                                </button>
                            </div>

                            <div className="space-y-2">
                                {[
                                    { icon: <Bell size={18} />, label: 'Notifikationer' },
                                    { icon: <Shield size={18} />, label: 'Privatliv' },
                                    { icon: <Moon size={18} />, label: 'Utseende' },
                                    { icon: <Heart size={18} />, label: 'Visa stöd' },
                                ].map((s, i) => (
                                    <button key={i} className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 text-zinc-400 hover:text-white transition-all group">
                                        <div className="flex items-center gap-4">
                                            <span className="opacity-50 group-hover:opacity-100 group-hover:text-orange-400 transition-all">{s.icon}</span>
                                            <span className="font-bold text-sm tracking-tight">{s.label}</span>
                                        </div>
                                        <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="mt-auto pt-8 border-t border-white/5">
                            <button
                                onClick={onLogout}
                                className="w-full flex items-center gap-3 p-4 text-red-500 hover:bg-red-500/10 rounded-2xl transition-all group"
                            >
                                <Power size={20} className="group-hover:rotate-12 transition-transform" />
                                <span className="font-black uppercase tracking-widest text-[10px]">Logga ut</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* 3. Main Chat Area - Responsive: Hidden on mobile if viewing lists */}
            <div className={`${!mobileShowChat ? 'hidden lg:flex' : 'flex'} flex-1 flex-col bg-slate-950/20 min-w-0 max-w-full overflow-hidden relative`}>
                {/* Room Header (Exclusive Horizonten/Swipe Hybrid) */}
                <div className="px-4 md:px-12 py-4 md:py-8 border-b border-white/5 flex items-center justify-between bg-slate-900/60 backdrop-blur-3xl relative z-20 shrink-0">
                    <div className="flex items-center gap-3 md:gap-8">
                        {/* Mobile Back Button */}
                        <button
                            onClick={() => setMobileShowChat(false)}
                            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:text-white"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <div className="relative">
                            <div className="w-20 h-20 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2.5rem] flex items-center justify-center text-orange-400 border border-white/10 shadow-2xl relative group cursor-pointer overflow-hidden">
                                <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="scale-125 transition-transform duration-500 group-hover:scale-110">{currentRoom.icon}</div>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-slate-950 shadow-lg"></div>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-3xl font-black text-white tracking-tighter decoration-orange-500/30 decoration-4">
                                    {currentRoom.name}
                                </h3>
                                <div className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full">
                                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Aktiv</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 md:gap-4 text-xs font-semibold text-slate-500">
                                <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><Users size={14} className="text-orange-500" /> <span className="hidden sm:inline">{globalOnlineUsers.size} medlemmar online</span><span className="sm:hidden">{globalOnlineUsers.size}</span></span>
                                <span className="w-1.5 h-1.5 bg-slate-800 rounded-full"></span>
                                <span className="italic opacity-80 font-medium line-clamp-1 max-w-[150px] md:max-w-none">"{currentRoom.description}"</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-10">
                        <div className="hidden xl:flex -space-x-4 items-center">
                            {PERSONAS.map(p => (
                                <div key={p.id} className={`w-12 h-12 rounded-[1.25rem] border-4 border-slate-950 flex items-center justify-center text-lg ${p.color} text-white shadow-2xl hover:translate-y-[-6px] transition-all cursor-pointer relative group`} title={p.name}>
                                    {p.avatar}
                                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.25rem]"></div>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            {[
                                { icon: <Search size={22} />, label: 'Sök' },
                                { icon: <Star size={22} />, label: 'Favorit' },
                                { icon: <Info size={22} />, label: 'Info' },
                                { icon: <MoreVertical size={22} />, label: 'Mer' }
                            ].map((btn, i) => (
                                <button key={i} className="p-4 bg-white/5 hover:bg-orange-500/10 hover:text-orange-400 border border-white/5 rounded-2xl transition-all shadow-xl group active:scale-95" title={btn.label}>
                                    {btn.icon}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Chat or Video Component Area */}
                <div className="flex-1 overflow-hidden relative flex flex-col min-h-0">
                    {currentRoom.hasVideo ? (
                        <VideoRoom roomId={currentRoom.name} user={user} onEndCall={() => setActiveRoom('general')} />
                    ) : (
                        <CommunityChat user={user} threadId={currentRoom.id} showHeader={false} onlineUsers={globalOnlineUsers} />
                    )}

                    {/* Subtle decoration to match Swipe vibe */}
                    {!currentRoom.hasVideo && (
                        <>
                            <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-slate-950/40 to-transparent pointer-events-none"></div>
                            <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none"></div>
                        </>
                    )}
                </div>
            </div>

            {
                showNewThreadModal && (
                    <NewThreadModal onClose={() => setShowNewThreadModal(false)} />
                )
            }

            {/* Mobile Bottom Navigation - Premium Glassmorphism (Hidden when in Chat) */}
            {!mobileShowChat && (
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-950/80 backdrop-blur-xl border-t border-white/5 pb-safe pt-2 px-6 flex justify-between items-center z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                    {[
                        { id: 'chat', label: 'Chatt', icon: MessageCircle, action: () => setMobileShowChat(true) },
                        { id: 'rooms', label: 'Rum', icon: LayoutGrid, action: () => { setMobileShowChat(false); setActiveNav('discussions'); } },
                        { id: 'members', label: 'Medlemmar', icon: Users, action: () => { setMobileShowChat(false); setActiveNav('members'); } },
                        { id: 'notifications', label: 'Notiser', icon: Bell, action: () => { setMobileShowChat(false); setActiveNav('notifications'); }, badge: notifications.length }
                    ].map((item) => {
                        const isActive = item.id === 'chat' ? mobileShowChat : (!mobileShowChat && activeNav === (item.id === 'rooms' ? 'discussions' : item.id));
                        return (
                            <button
                                key={item.id}
                                onClick={item.action}
                                className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all duration-300 relative group ${isActive ? 'text-orange-400' : 'text-slate-500'}`}
                            >
                                <div className={`
                                p-2 rounded-2xl transition-all duration-300
                                ${isActive ? 'bg-orange-500/10 scale-100' : 'group-active:scale-95'}
                            `}>
                                    <item.icon size={24} className={isActive ? 'fill-orange-500/20' : ''} />
                                </div>
                                <span className={`text-[10px] font-bold tracking-wide transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                                    {item.label}
                                </span>
                                {isActive && (
                                    <div className="absolute top-1 w-1 h-1 bg-orange-400 rounded-full shadow-[0_0_10px_rgba(249,115,22,1)]"></div>
                                )}
                                {item.badge ? (
                                    <div className="absolute top-2 right-2 w-3.5 h-3.5 bg-red-500 rounded-full text-[9px] flex items-center justify-center text-white font-bold border border-slate-950">
                                        {item.badge}
                                    </div>
                                ) : null}
                            </button>
                        )
                    })}
                </div>
            )}
        </div >
    );
};

export default ChatPage;
