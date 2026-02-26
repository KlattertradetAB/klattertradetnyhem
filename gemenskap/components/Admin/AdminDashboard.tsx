import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';
import { Profile } from '../../types';
import {
    LayoutGrid,
    Users,
    MessageSquare,
    Shield,
    Trash2,
    Edit2,
    Plus,
    ArrowLeft,
    Send,
    CheckCircle,
    XCircle,
    BookOpen,
    Calendar,
    Search,
    Mail,
    Clock,
    TrendingUp,
    AlertCircle
} from 'lucide-react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

interface Order {
    id: string;
    customer_name: string;
    email: string;
    book_title: string;
    status: string;
    address?: string;
    created_at: string;
}

interface Booking {
    id: string;
    client_name: string;
    email: string;
    service_type: string;
    booking_date: string;
    booking_time: string;
    status: string;
    created_at: string;
}

interface ContactMessage {
    id: string;
    sender_name: string;
    email: string;
    subject?: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

interface AdminDashboardProps {
    user: Profile;
    onBack: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onBack }) => {
    const [activeSection, setActiveSection] = useState<'overview' | 'orders' | 'bookings' | 'messages' | 'blog' | 'threads' | 'moderation'>('overview');
    const [orders, setOrders] = useState<Order[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [stats, setStats] = useState({
        members: 0,
        newThreads: 0,
        unreadReports: 0,
        blogPosts: 0,
        todayUniques: 45,
        todayViews: 128
    });

    const [bookingSearch, setBookingSearch] = useState('');
    const [bookingStatus, setBookingStatus] = useState('');

    useEffect(() => {
        if (user.role === 'admin') {
            fetchData();
        }
    }, [user.role, activeSection]);

    const fetchData = async () => {
        // Fetch stats
        const { count: memberCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
        const { count: threadCount } = await supabase.from('threads').select('*', { count: 'exact', head: true });
        const { count: blogCount } = await supabase.from('blogs').select('*', { count: 'exact', head: true });

        setStats(prev => ({
            ...prev,
            members: memberCount || 0,
            newThreads: threadCount || 0,
            blogPosts: blogCount || 0
        }));

        if (activeSection === 'overview' || activeSection === 'orders') {
            const { data: ordersData } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
            if (ordersData) setOrders(ordersData);
        }
        if (activeSection === 'overview' || activeSection === 'bookings') {
            let query = supabase.from('bookings').select('*').order('booking_date', { ascending: true });
            if (bookingSearch) query = query.or(`client_name.ilike.%${bookingSearch}%,email.ilike.%${bookingSearch}%`);
            if (bookingStatus) query = query.eq('status', bookingStatus);
            const { data: bookingsData } = await query;
            if (bookingsData) setBookings(bookingsData);
        }
        if (activeSection === 'overview' || activeSection === 'messages') {
            const { data: messagesData } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
            if (messagesData) setMessages(messagesData);
        }
        if (activeSection === 'moderation') {
            const { data: profilesData } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
            if (profilesData) setProfiles(profilesData);
        }
    };

    const updateOrderStatus = async (id: string, status: string) => {
        await supabase.from('orders').update({ status }).eq('id', id);
        fetchData();
    };

    const updateBookingStatus = async (id: string, status: string) => {
        await supabase.from('bookings').update({ status }).eq('id', id);
        fetchData();
    };

    const markMessageRead = async (id: string) => {
        await supabase.from('contact_messages').update({ is_read: true }).eq('id', id);
        fetchData();
    };

    // Safety check
    if (user.role !== 'admin') {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                    <Shield className="w-16 h-16 text-red-500 mx-auto animate-pulse" />
                    <h2 className="text-2xl font-bold text-white">Åtkomst nekad</h2>
                    <p className="text-slate-400">Du har inte behörighet att se denna sida.</p>
                    <button onClick={onBack} className="px-6 py-2 bg-orange-500 rounded-xl font-bold text-slate-950">Gå tillbaka</button>
                </div>
            </div>
        );
    }

    const chartData = [
        { date: '2026-02-19', views: 400, uniques: 240 },
        { date: '2026-02-20', views: 300, uniques: 139 },
        { date: '2026-02-21', views: 200, uniques: 980 },
        { date: '2026-02-22', views: 278, uniques: 390 },
        { date: '2026-02-23', views: 189, uniques: 480 },
        { date: '2026-02-24', views: 239, uniques: 380 },
        { date: '2026-02-25', views: 349, uniques: 430 },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-700">
            {/* Admin Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

                <div className="relative z-10 flex items-center gap-6">
                    <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                        <Shield size={32} className="text-slate-950" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tight">Admin Dashboard</h2>
                        <p className="text-orange-500 font-bold tracking-widest uppercase text-xs flex items-center gap-2 mt-1">
                            <span className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></span> Säker anslutning upprättad
                        </p>
                    </div>
                </div>

                <div className="flex gap-3 relative z-10 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                    <button onClick={() => setActiveSection('overview')} className={`px-5 py-2.5 rounded-xl font-bold transition-all border whitespace-nowrap flex items-center gap-2 ${activeSection === 'overview' ? 'bg-orange-500 text-slate-950 border-orange-500' : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'}`}>
                        <LayoutGrid size={18} /> Översikt
                    </button>
                    <button onClick={() => setActiveSection('orders')} className={`px-5 py-2.5 rounded-xl font-bold transition-all border whitespace-nowrap flex items-center gap-2 ${activeSection === 'orders' ? 'bg-orange-500 text-slate-950 border-orange-500' : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'}`}>
                        <BookOpen size={18} /> Beställningar
                    </button>
                    <button onClick={() => setActiveSection('bookings')} className={`px-5 py-2.5 rounded-xl font-bold transition-all border whitespace-nowrap flex items-center gap-2 ${activeSection === 'bookings' ? 'bg-orange-500 text-slate-950 border-orange-500' : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'}`}>
                        <Calendar size={18} /> Bokningar
                    </button>
                    <button onClick={() => setActiveSection('messages')} className={`px-5 py-2.5 rounded-xl font-bold transition-all border whitespace-nowrap flex items-center gap-2 ${activeSection === 'messages' ? 'bg-orange-500 text-slate-950 border-orange-500' : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'}`}>
                        <MessageSquare size={18} /> Meddelanden
                    </button>
                    <button onClick={() => setActiveSection('blog')} className={`px-5 py-2.5 rounded-xl font-bold transition-all border whitespace-nowrap flex items-center gap-2 ${activeSection === 'blog' ? 'bg-orange-500 text-slate-950 border-orange-500' : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'}`}>
                        <Edit2 size={18} /> Blogg
                    </button>
                    <button onClick={() => setActiveSection('threads')} className={`px-5 py-2.5 rounded-xl font-bold transition-all border whitespace-nowrap flex items-center gap-2 ${activeSection === 'threads' ? 'bg-orange-500 text-slate-950 border-orange-500' : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'}`}>
                        <MessageSquare size={18} /> Trådar
                    </button>
                    <button onClick={() => setActiveSection('moderation')} className={`px-5 py-2.5 rounded-xl font-bold transition-all border whitespace-nowrap flex items-center gap-2 ${activeSection === 'moderation' ? 'bg-orange-500 text-slate-950 border-orange-500' : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'}`}>
                        <Shield size={18} /> Moderering
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            {activeSection === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-3xl hover:border-white/10 transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 group-hover:scale-110 transition-transform">
                                <TrendingUp size={20} />
                            </div>
                            <span className="text-2xl font-black text-white">{stats.todayViews}</span>
                        </div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sidvisningar (Idag)</p>
                    </div>
                    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-3xl hover:border-white/10 transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                                <Users size={20} />
                            </div>
                            <span className="text-2xl font-black text-white">{stats.members}</span>
                        </div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Totalt Medlemmar</p>
                    </div>
                    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-3xl hover:border-white/10 transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                                <Users size={20} />
                            </div>
                            <span className="text-2xl font-black text-white">{stats.todayUniques}</span>
                        </div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Unika Besökare</p>
                    </div>
                    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-3xl hover:border-white/10 transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-lg bg-green-500/10 text-green-400 group-hover:scale-110 transition-transform">
                                <BookOpen size={20} />
                            </div>
                            <span className="text-2xl font-black text-white">{orders.length}</span>
                        </div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Nya Beställningar</p>
                    </div>
                    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-3xl hover:border-white/10 transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                                <Calendar size={20} />
                            </div>
                            <span className="text-2xl font-black text-white">{bookings.length}</span>
                        </div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Aktiva Bokningar</p>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8">
                {activeSection === 'overview' && (
                    <div className="space-y-8">
                        {/* Business Analytics Chart */}
                        <div className="bg-white/5 border border-white/5 rounded-3xl p-8">
                            <h3 className="text-xl font-bold text-white mb-8">Besöksstatistik</h3>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                        <XAxis
                                            dataKey="date"
                                            stroke="rgba(255,255,255,0.3)"
                                            fontSize={12}
                                            tickFormatter={(val) => val.split('-').slice(2).join('/')}
                                        />
                                        <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                        <Area type="monotone" dataKey="views" name="Sidvisningar" stroke="#f97316" fillOpacity={1} fill="url(#colorViews)" strokeWidth={3} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-white flex items-center gap-3">
                                    <BookOpen className="text-orange-500" size={20} /> Senaste Beställningar
                                </h3>
                                <div className="space-y-4">
                                    {orders.slice(0, 3).map((order) => (
                                        <div key={order.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                                            <div>
                                                <p className="font-bold text-white text-sm">{order.customer_name}</p>
                                                <p className="text-xs text-slate-500">{order.book_title}</p>
                                            </div>
                                            <span className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-lg text-[10px] font-black uppercase tracking-wider">
                                                {order.status}
                                            </span>
                                        </div>
                                    ))}
                                    {orders.length === 0 && <p className="text-slate-500 text-sm italic">Inga nya beställningar</p>}
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-white flex items-center gap-3">
                                    <Calendar className="text-blue-500" size={20} /> Kommande Bokningar
                                </h3>
                                <div className="space-y-4">
                                    {bookings.slice(0, 3).map((booking) => (
                                        <div key={booking.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                                            <div>
                                                <p className="font-bold text-white text-sm">{booking.client_name}</p>
                                                <p className="text-xs text-slate-400">{booking.booking_date} kl {booking.booking_time}</p>
                                            </div>
                                            <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-[10px] font-black uppercase tracking-wider">
                                                {booking.service_type}
                                            </span>
                                        </div>
                                    ))}
                                    {bookings.length === 0 && <p className="text-slate-500 text-sm italic">Inga bokade tider</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'orders' && (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-black text-white mb-6">Bokbeställningar</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10 text-slate-500 text-xs font-black uppercase tracking-widest">
                                        <th className="px-4 py-4">Kund</th>
                                        <th className="px-4 py-4">Produkt</th>
                                        <th className="px-4 py-4">Datum</th>
                                        <th className="px-4 py-4">Status</th>
                                        <th className="px-4 py-4 text-right">Hantera</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-white/5 transition-all">
                                            <td className="px-4 py-6">
                                                <p className="text-sm font-bold text-white">{order.customer_name}</p>
                                                <p className="text-[10px] text-slate-500">{order.email}</p>
                                            </td>
                                            <td className="px-4 py-6 text-sm text-slate-300 font-medium">{order.book_title}</td>
                                            <td className="px-4 py-6 text-sm text-slate-400">{new Date(order.created_at).toLocaleDateString()}</td>
                                            <td className="px-4 py-6">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${order.status === 'Skickad' ? 'bg-green-500/20 text-green-400' :
                                                    order.status === 'Behandlas' ? 'bg-blue-500/20 text-blue-400' :
                                                        'bg-orange-500/20 text-orange-400'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-6 text-right">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                    className="bg-slate-800 border border-white/10 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                                                >
                                                    <option value="Mottagen">Mottagen</option>
                                                    <option value="Behandlas">Behandlas</option>
                                                    <option value="Skickad">Skickad</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                    {orders.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="py-20 text-center text-slate-500 italic">Inga beställningar hittades</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeSection === 'bookings' && (
                    <div className="space-y-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <h3 className="text-2xl font-black text-white">Terapibokningar</h3>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        type="text"
                                        placeholder="Sök kient..."
                                        value={bookingSearch}
                                        onChange={(e) => setBookingSearch(e.target.value)}
                                        onKeyUp={(e) => e.key === 'Enter' && fetchData()}
                                        className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                                    />
                                </div>
                                <select
                                    value={bookingStatus}
                                    onChange={(e) => { setBookingStatus(e.target.value); fetchData(); }}
                                    className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-sm text-white focus:outline-none"
                                >
                                    <option value="">Alla statusar</option>
                                    <option value="Bekräftad">Bekräftad</option>
                                    <option value="Väntar">Väntar</option>
                                    <option value="Avbokad">Avbokad</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {bookings.map((booking) => (
                                <div key={booking.id} className="bg-white/5 border border-white/5 p-8 rounded-[2rem] hover:border-white/10 transition-all group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl -mr-12 -mt-12"></div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl">
                                            <Calendar size={24} />
                                        </div>
                                        <select
                                            value={bookingStatus}
                                            onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                                            className="bg-slate-900/50 border border-white/10 rounded-lg px-2 py-1 text-[10px] font-black text-white uppercase tracking-wider"
                                        >
                                            <option value="Bekräftad">Bekräftad</option>
                                            <option value="Väntar">Väntar</option>
                                            <option value="Avbokad">Avbokad</option>
                                        </select>
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-1">{booking.client_name}</h4>
                                    <p className="text-sm text-blue-400 font-bold mb-6 italic">{booking.service_type}</p>

                                    <div className="space-y-3 pt-6 border-t border-white/5">
                                        <p className="text-sm text-slate-300 flex items-center gap-3">
                                            <Clock size={16} className="text-slate-500" /> {booking.booking_date} kl {booking.booking_time}
                                        </p>
                                        <p className="text-sm text-slate-300 flex items-center gap-3">
                                            <Mail size={16} className="text-slate-500" /> {booking.email}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {bookings.length === 0 && (
                                <div className="col-span-full py-20 text-center space-y-4">
                                    <Calendar className="w-16 h-16 text-slate-800 mx-auto" />
                                    <p className="text-slate-500 italic">Inga bokningar matchar din sökning</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeSection === 'messages' && (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-black text-white mb-6">Kontaktmeddelanden</h3>
                        <div className="grid grid-cols-1 gap-4">
                            {messages.map((msg: ContactMessage) => (
                                <div key={msg.id} className={`p-8 bg-white/5 border rounded-[2rem] transition-all flex flex-col md:flex-row gap-8 ${msg.is_read ? 'border-white/5' : 'border-blue-500/30 bg-blue-500/5'}`}>
                                    <div className="md:w-64 shrink-0">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center font-black text-orange-500 text-xl">
                                                {msg.sender_name[0]}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white">{msg.sender_name}</h4>
                                                <p className="text-xs text-slate-500">{msg.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                            <Clock size={12} /> {new Date(msg.created_at).toLocaleString('sv-SE', { dateStyle: 'short', timeStyle: 'short' })}
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <h4 className="text-lg font-bold text-white">{msg.subject || 'Inget ämne'}</h4>
                                        <p className="text-slate-300 text-sm leading-relaxed">{msg.message}</p>
                                    </div>
                                    <div className="md:w-32 shrink-0 flex md:flex-col justify-end gap-3">
                                        {!msg.is_read && (
                                            <button
                                                onClick={() => markMessageRead(msg.id)}
                                                className="flex-1 md:flex-none py-3 bg-blue-500 hover:bg-blue-600 text-slate-950 rounded-xl text-xs font-black transition-all"
                                            >
                                                Läst
                                            </button>
                                        )}
                                        <button className="flex-1 md:flex-none py-3 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-xs font-bold transition-all border border-white/10">Svara</button>
                                    </div>
                                </div>
                            ))}
                            {messages.length === 0 && (
                                <div className="py-20 text-center space-y-4">
                                    <Mail className="w-16 h-16 text-slate-800 mx-auto" />
                                    <p className="text-slate-500 italic">E-postlådan är tom</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeSection === 'blog' && (
                    <div className="space-y-8 max-w-4xl mx-auto">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-black text-white">Hantera Bloggen</h3>
                            <button onClick={() => setActiveSection('overview')} className="text-orange-500 hover:text-orange-400 font-bold text-sm bg-orange-500/10 px-4 py-2 rounded-xl transition-all">
                                Avbryt
                            </button>
                        </div>
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const form = e.target as HTMLFormElement;
                            const title = (form.elements.namedItem('title') as HTMLInputElement).value;
                            const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;
                            const content = (form.elements.namedItem('content') as HTMLTextAreaElement).value;

                            try {
                                const { error } = await supabase.from('blogs').insert({
                                    title,
                                    description,
                                    content,
                                    user_id: user.id,
                                    author_name: user.full_name || 'Admin',
                                    created_at: new Date().toISOString(),
                                });

                                if (error) throw error;

                                alert('Blogginlägg skapat!');
                                form.reset();
                                setActiveSection('overview');
                            } catch (error) {
                                console.error('Error creating blog post:', error);
                                alert('Kunde inte skapa blogginlägg. Försök igen.');
                            }
                        }} className="space-y-6 bg-white/5 border border-white/5 p-8 rounded-[2.5rem]">
                            <div>
                                <label className="block text-slate-400 text-xs font-black uppercase tracking-widest mb-3 px-1">Rubrik</label>
                                <input
                                    name="title"
                                    type="text"
                                    required
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                                    placeholder="Vad ska blogginlägget heta?"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-xs font-black uppercase tracking-widest mb-3 px-1">Kort beskrivning</label>
                                <textarea
                                    name="description"
                                    required
                                    rows={2}
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all resize-none"
                                    placeholder="En kort ingress som lockar till läsning..."
                                />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-xs font-black uppercase tracking-widest mb-3 px-1">Bloggtext (Markdown stöds)</label>
                                <textarea
                                    name="content"
                                    required
                                    rows={15}
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all resize-none font-mono text-sm leading-relaxed"
                                    placeholder="Skriv ditt inlägg här..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-orange-500 hover:bg-orange-600 text-slate-950 font-black py-5 rounded-2xl transition-all shadow-xl shadow-orange-500/20 active:scale-[0.98]"
                            >
                                Publicera Blogginlägg
                            </button>
                        </form>
                    </div>
                )}

                {activeSection === 'threads' && (
                    <div className="space-y-8 max-w-4xl mx-auto">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-black text-white">Ny Forumtråd</h3>
                            <button onClick={() => setActiveSection('overview')} className="text-orange-500 hover:text-orange-400 font-bold text-sm bg-orange-500/10 px-4 py-2 rounded-xl transition-all">
                                Avbryt
                            </button>
                        </div>
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const form = e.target as HTMLFormElement;
                            const title = (form.elements.namedItem('title') as HTMLInputElement).value;
                            const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;
                            const category = (form.elements.namedItem('category') as HTMLSelectElement).value;

                            try {
                                const { error } = await supabase.from('threads').insert({
                                    title,
                                    description,
                                    category,
                                    user_id: user.id,
                                    author_name: user.full_name || 'Admin',
                                    created_at: new Date().toISOString(),
                                });

                                if (error) throw error;

                                alert('Tråd skapad!');
                                form.reset();
                                setActiveSection('overview');
                            } catch (error) {
                                console.error('Error creating thread:', error);
                                alert('Kunde inte skapa tråd. Försök igen.');
                            }
                        }} className="space-y-6 bg-white/5 border border-white/5 p-8 rounded-[2.5rem]">
                            <div>
                                <label className="block text-slate-400 text-xs font-black uppercase tracking-widest mb-3 px-1">Rubrik</label>
                                <input
                                    name="title"
                                    type="text"
                                    required
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                                    placeholder="Vad handlar tråden om?"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-xs font-black uppercase tracking-widest mb-3 px-1">Kategori</label>
                                <select
                                    name="category"
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                                >
                                    <option value="general">Allmänt</option>
                                    <option value="announcements">Meddelanden</option>
                                    <option value="support">Stöd</option>
                                    <option value="events">Event</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-slate-400 text-xs font-black uppercase tracking-widest mb-3 px-1">Beskrivning</label>
                                <textarea
                                    name="description"
                                    required
                                    rows={6}
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all resize-none"
                                    placeholder="Beskriv ämnet..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-orange-500 hover:bg-orange-600 text-slate-950 font-black py-5 rounded-2xl transition-all shadow-xl shadow-orange-500/20 active:scale-[0.98]"
                            >
                                Skapa Tråd
                            </button>
                        </form>
                    </div>
                )}

                {activeSection === 'moderation' && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <h3 className="text-2xl font-black text-white">Medlemshantering</h3>
                                <p className="text-slate-400 text-sm mt-1">Hantera community-medlemmar och deras behörigheter.</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 flex items-center gap-4">
                                <Users className="text-blue-400" size={20} />
                                <span className="text-white font-bold">{stats.members} Medlemmar totalt</span>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10 text-slate-500 text-xs font-black uppercase tracking-widest">
                                        <th className="px-4 py-4 uppercase">Medlem</th>
                                        <th className="px-4 py-4 uppercase">Medlemskap</th>
                                        <th className="px-4 py-4 uppercase">Roll</th>
                                        <th className="px-4 py-4 uppercase">Status</th>
                                        <th className="px-4 py-4 uppercase text-right">Åtgärder</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {profiles.map((p) => (
                                        <tr key={p.id} className="hover:bg-white/5 transition-all group">
                                            <td className="px-4 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 border border-white/10 flex items-center justify-center font-bold text-white shadow-lg overflow-hidden shrink-0">
                                                        {p.avatar_url ? <img src={p.avatar_url} alt="" className="w-full h-full object-cover" /> : p.full_name?.[0] || '?'}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-white">{p.full_name || 'Okänd'}</p>
                                                        <p className="text-[10px] text-slate-500 font-medium">{p.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-6">
                                                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${p.membership_level === 3 ? 'bg-orange-500/20 text-orange-400 border border-orange-500/20' : 'bg-slate-800 text-slate-400 border border-white/5'}`}>
                                                    {p.membership_level === 3 ? 'Premium' : p.membership_level === 2 ? 'Standard' : 'Bas'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-6">
                                                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${p.role === 'admin' ? 'bg-red-500/20 text-red-400 border border-red-500/20' : 'bg-slate-800 text-slate-400 border border-white/5'}`}>
                                                    {p.role || 'Medlem'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-6">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${p.membership_active ? 'bg-green-500' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'}`}></div>
                                                    <span className={`text-[10px] font-bold uppercase tracking-tight ${p.membership_active ? 'text-green-500' : 'text-red-500'}`}>
                                                        {p.membership_active ? 'Aktiv' : 'Inaktiv'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={async () => {
                                                            const newLevel = p.membership_level === 3 ? 2 : 3;
                                                            await supabase.from('profiles').update({ membership_level: newLevel }).eq('id', p.id);
                                                            fetchData();
                                                        }}
                                                        className="p-2 bg-white/5 hover:bg-orange-500 hover:text-slate-950 rounded-lg transition-all border border-white/5"
                                                        title={p.membership_level === 3 ? "Nedgradera till Standard" : "Uppgradera till Premium"}
                                                    >
                                                        <TrendingUp size={16} />
                                                    </button>
                                                    <button
                                                        onClick={async () => {
                                                            await supabase.from('profiles').update({ membership_active: !p.membership_active }).eq('id', p.id);
                                                            fetchData();
                                                        }}
                                                        className={`p-2 rounded-lg transition-all border ${p.membership_active ? 'bg-white/5 hover:bg-red-500 hover:text-slate-950 border-white/5' : 'bg-green-500 text-slate-950 border-green-500'}`}
                                                        title={p.membership_active ? "Inaktivera konto" : "Aktivera konto"}
                                                    >
                                                        {p.membership_active ? <XCircle size={16} /> : <CheckCircle size={16} />}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
