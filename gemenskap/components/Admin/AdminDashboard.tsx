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
    AlertCircle,
    ChevronRight,
    Search as SearchIcon,
    Video,
    Link,
    Copy
} from 'lucide-react';
import { translations } from '../../translations';
import { NAVIGATION_CATEGORIES } from '../../association/constants';
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
    status: string | null;
    address?: string | null;
    created_at: string;
}

interface Booking {
    id: string;
    client_name: string;
    email: string;
    service_type: string;
    booking_date: string;
    booking_time: string;
    status: string | null;
    created_at: string;
}

interface ContactMessage {
    id: string;
    sender_name: string;
    email: string;
    subject?: string | null;
    message: string;
    is_read: boolean | null;
    created_at: string;
}

interface CourseApplication {
    id: string;
    course_type: string;
    applicant_name: string;
    email: string;
    phone: string | null;
    workplace: string | null;
    invoice_address: string | null;
    message: string | null;
    status: string | null;
    created_at: string;
}

interface TherapyRequest {
    id: string;
    applicant_name: string;
    email: string;
    phone: string | null;
    challenges: string[] | null;
    meeting_form: string | null;
    status: string | null;
    created_at: string;
}

interface AdminDashboardProps {
    user: Profile;
    onBack: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onBack }) => {
    const [activeSection, setActiveSection] = useState<'overview' | 'orders' | 'bookings' | 'messages' | 'blog' | 'threads' | 'moderation' | 'handbook'>('overview');
    const [selectedHandbookSection, setSelectedHandbookSection] = useState<string | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [courseApps, setCourseApps] = useState<CourseApplication[]>([]);
    const [therapyRequests, setTherapyRequests] = useState<TherapyRequest[]>([]);
    const [stats, setStats] = useState<any>({
        members: 0,
        newThreads: 0,
        unreadReports: 0,
        blogPosts: 0,
        unprocessedApps: 0,
        todayUniques: 45,
        todayViews: 128
    });
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [chartData, setChartData] = useState<any[]>([]);
    const [calendarOffset, setCalendarOffset] = useState(0); // 0 = latest 5 days, 1 = previous 5 days, etc.

    const [bookingSearch, setBookingSearch] = useState('');
    const [bookingStatus, setBookingStatus] = useState('');
    const [profileSearch, setProfileSearch] = useState('');
    const [allBlogs, setAllBlogs] = useState<any[]>([]);
    const [allThreads, setAllThreads] = useState<any[]>([]);
    const [allHandbookPages, setAllHandbookPages] = useState<any[]>([]);
    const [showBlogForm, setShowBlogForm] = useState(false);
    const [showThreadForm, setShowThreadForm] = useState(false);
    const [showHandbookForm, setShowHandbookForm] = useState(false);

    // Blog form state
    const [blogTitle, setBlogTitle] = useState('');
    const [blogDescription, setBlogDescription] = useState('');
    const [blogImageUrl, setBlogImageUrl] = useState('');
    const [blogContent, setBlogContent] = useState('');

    const applyBlogTemplate = (type: 'news' | 'article' | 'monthly') => {
        if (type === 'news') {
            setBlogTitle('Nyhet: [Kort rubrik]');
            setBlogDescription('En kort sammanfattning av nyheten...');
            setBlogContent('## Vad har hänt?\n\n[Beskriv nyheten här]\n\n## När?\n\n[Ange tid/datum]\n\n## Hur påverkar detta dig?\n\n[Beskriv konsekvenser/nästa steg]');
        } else if (type === 'article') {
            setBlogTitle('[Titel på din artikel/krönika]');
            setBlogDescription('En intresseväckande ingress som beskriver vad artikeln handlar om...');
            setBlogContent('## Bakgrund\n\n[Skriv om bakgrunden till ämnet]\n\n## Insikter och Reflektioner\n\n[Dela dina tankar och analyser]\n\n## Slutsats\n\n[Summera och ge en konkret avslutning]');
        } else if (type === 'monthly') {
            setBlogTitle('Månadsbrev: [Månad] [År]');
            setBlogDescription('En summering av månaden som gått och vad som händer framöver.');
            setBlogContent('## Tillbakablick på månaden\n\n* [Händelse 1]\n* [Händelse 2]\n\n## Kommande aktiviteter\n\n* [Aktivitet 1]\n* [Aktivitet 2]\n\n## En hälsning från redaktionen\n\n[Ditt meddelande]');
        }
    };

    useEffect(() => {
        if (user.role === 'admin') {
            fetchData();
        }
    }, [user.role, activeSection, profileSearch]);

    const fetchData = async () => {
        setFetchError(null);
        try {
            // Fetch stats with error checking
            const { count: memberCount, error: memberError } = await supabase.from('profiles').select('id', { count: 'exact', head: true });
            const { count: threadCount, error: threadError } = await supabase.from('threads').select('id', { count: 'exact', head: true });
            const { count: blogCount, error: blogError } = await supabase.from('blogs').select('id', { count: 'exact', head: true });
            const { count: appCount, error: appError } = await supabase.from('course_applications').select('id', { count: 'exact', head: true }).eq('status', 'Ny');
            const { count: therapyCount, error: therapyError } = await supabase.from('therapy_matchmaking').select('id', { count: 'exact', head: true }).eq('status', 'Väntar på matchning');

            if (memberError) {
                console.error('Error fetching member count:', memberError);
                setFetchError(memberError.message);
            }
            if (threadError) console.error('Error fetching thread count:', threadError);
            if (blogError) console.error('Error fetching blog count:', blogError);
            if (appError) console.error('Error fetching app count:', appError);
            if (therapyError) console.error('Error fetching therapy count:', therapyError);

            setStats((prev: any) => ({
                ...prev,
                members: memberCount || 0,
                newThreads: threadCount || 0,
                blogPosts: blogCount || 0,
                unreadReports: 0,
                unprocessedApps: (appCount || 0) + (therapyCount || 0)
            }));

            // Fetch Real Analytics Data (Last 30 days instead of 7 to allow scrolling back)
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            thirtyDaysAgo.setHours(0, 0, 0, 0);

            const { data: viewsData, error: viewsError } = await (supabase as any)
                .from('page_views')
                .select('created_at, session_id')
                .gte('created_at', thirtyDaysAgo.toISOString());

            if (!viewsError && viewsData) {
                // Group by date (YYYY-MM-DD)
                const groupedData: Record<string, { views: number, sessions: Set<string> }> = {};
                
                // Initialize last 30 days
                for (let i = 0; i < 30; i++) {
                    const d = new Date();
                    d.setDate(d.getDate() - (29 - i));
                    const dateStr = d.toISOString().split('T')[0];
                    groupedData[dateStr] = { views: 0, sessions: new Set() };
                }

                viewsData.forEach((row: any) => {
                    const dateStr = row.created_at.split('T')[0];
                    if (groupedData[dateStr]) {
                        groupedData[dateStr].views++;
                        groupedData[dateStr].sessions.add(row.session_id);
                    }
                });

                const finalChartData = Object.keys(groupedData).sort().map(date => ({
                    date,
                    views: groupedData[date].views,
                    uniques: groupedData[date].sessions.size
                }));

                setChartData(finalChartData);

                const todayStr = new Date().toISOString().split('T')[0];
                const todayStats = groupedData[todayStr] || { views: 0, sessions: new Set() };

                setStats((prev: any) => ({
                    ...prev,
                    todayViews: todayStats.views,
                    todayUniques: todayStats.sessions.size
                }));
            }
        } catch (err) {
            console.error('General stats fetch error:', err);
        }

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

            const { data: appsData } = await supabase.from('course_applications').select('*').order('created_at', { ascending: false });
            if (appsData) setCourseApps(appsData as unknown as CourseApplication[]);

            const { data: therapyData } = await supabase.from('therapy_matchmaking').select('*').order('created_at', { ascending: false });
            if (therapyData) setTherapyRequests(therapyData as unknown as TherapyRequest[]);
        }
        if (activeSection === 'blog') {
            const { data: blogsData } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
            if (blogsData) setAllBlogs(blogsData);
        }
        if (activeSection === 'threads') {
            const { data: threadsData } = await supabase.from('threads').select('*').order('created_at', { ascending: false });
            if (threadsData) setAllThreads(threadsData);
        }
        if (activeSection === 'handbook') {
            const { data: handbookData } = await supabase.from('board_handbook' as any).select('*').order('created_at', { ascending: false });
            if (handbookData) setAllHandbookPages(handbookData);
        }
        if (activeSection === 'moderation') {
            let query = supabase.from('profiles').select('*').order('created_at', { ascending: false });
            if (profileSearch) {
                query = query.or(`full_name.ilike.%${profileSearch}%,email.ilike.%${profileSearch}%`);
            }
            const { data: profilesData } = await query;
            if (profilesData) setProfiles(profilesData);
        }
    };

    const updateOrderStatus = async (id: string, status: string) => {
        await supabase.from('orders').update({ status }).eq('id', id);
        fetchData();
    };

    const deleteOrder = async (id: string) => {
        if (!confirm('Är du säker på att du vill radera denna beställning?')) return;
        await supabase.from('orders').delete().eq('id', id);
        fetchData();
    };

    const updateBookingStatus = async (id: string, status: string) => {
        await supabase.from('bookings').update({ status }).eq('id', id);
        fetchData();
    };

    const deleteBooking = async (id: string) => {
        if (!confirm('Är du säker på att du vill radera denna bokning?')) return;
        await supabase.from('bookings').delete().eq('id', id);
        fetchData();
    };

    const markMessageRead = async (id: string) => {
        await supabase.from('contact_messages').update({ is_read: true }).eq('id', id);
        fetchData();
    };

    const deleteMessage = async (id: string, type: 'contact' | 'course' | 'therapy') => {
        if (!confirm('Är du säker på att du vill radera detta meddelande?')) return;
        const table = type === 'contact' ? 'contact_messages' : type === 'course' ? 'course_applications' : 'therapy_matchmaking';
        await supabase.from(table).delete().eq('id', id);
        fetchData();
    };

    const deleteBlogPost = async (id: string) => {
        if (!confirm('Är du säker på att du vill radera detta blogginlägg?')) return;
        await supabase.from('blogs').delete().eq('id', id);
        fetchData();
    };

    const deleteThread = async (id: string) => {
        if (!confirm('Är du säker på att du vill radera denna forumtråd?')) return;
        await supabase.from('threads').delete().eq('id', id);
        fetchData();
    };

    const deleteHandbookPage = async (id: string) => {
        if (!confirm('Är du säker på att du vill radera denna handboksida?')) return;
        await supabase.from('board_handbook' as any).delete().eq('id', id);
        fetchData();
    };

    const handleCourseApp = async (app: CourseApplication) => {
        await supabase.from('course_applications').update({ status: 'Behandlas' }).eq('id', app.id);
        window.location.href = `mailto:${app.email}?subject=Angående din utbildningsansökan: ${app.course_type}&body=Hej ${app.applicant_name},%0D%0A%0D%0A`;
        fetchData();
    };

    const handleTherapyRequest = async (req: TherapyRequest) => {
        await supabase.from('therapy_matchmaking').update({ status: 'Behandlas' }).eq('id', req.id);
        window.location.href = `mailto:${req.email}?subject=Angående din terapimatchning&body=Hej ${req.applicant_name},%0D%0A%0D%0A`;
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
    };

    // Calendar logic:
    const displayData = chartData.slice(-7); // Chart always shows last 7 days
    const maxOffset = Math.max(0, Math.ceil(chartData.length / 5) - 1);
    const safeOffset = Math.max(0, Math.min(calendarOffset, maxOffset));
    
    // Calculate the slice for the 5-day calendar
    const endIndex = chartData.length - (safeOffset * 5);
    const startIndex = Math.max(0, endIndex - 5);
    const calendarDays = chartData.slice(startIndex, endIndex);

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
                        <MessageSquare size={18} /> Inkorg {stats.unprocessedApps > 0 && <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{stats.unprocessedApps}</span>}
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
                    <button onClick={() => setActiveSection('handbook')} className={`px-5 py-2.5 rounded-xl font-bold transition-all border whitespace-nowrap flex items-center gap-2 ${activeSection === 'handbook' ? 'bg-orange-500 text-slate-950 border-orange-500' : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'}`}>
                        <BookOpen size={18} /> Styrelsehandbok
                    </button>
                </div>
            </div>

            {fetchError && (
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-400 text-sm">
                    <Shield className="shrink-0" size={18} />
                    <p><strong>DB-anslutningsfel:</strong> {fetchError}. Kontrollera dina RLS-policies i Supabase.</p>
                </div>
            )}

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
                                    <AreaChart data={displayData}>
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

                        {/* 5-Day Calendar History */}
                        <div className="bg-white/5 border border-white/5 rounded-3xl p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-white">Besökskalender</h3>
                                <div className="flex bg-slate-900/50 rounded-xl p-1 border border-white/5">
                                    <button 
                                        disabled={safeOffset >= maxOffset || chartData.length === 0}
                                        onClick={() => setCalendarOffset(prev => prev + 1)} 
                                        className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 transition-colors"
                                    >
                                        ← Äldre
                                    </button>
                                    <div className="w-px bg-white/10 my-2"></div>
                                    <button 
                                        disabled={safeOffset === 0}
                                        onClick={() => setCalendarOffset(prev => Math.max(0, prev - 1))} 
                                        className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 transition-colors"
                                    >
                                        Nyare →
                                    </button>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {calendarDays.length > 0 ? calendarDays.map((day, ix) => {
                                    const dateObj = new Date(day.date);
                                    const today = new Date().toISOString().split('T')[0];
                                    const isToday = day.date === today;
                                    
                                    return (
                                        <div key={ix} className={`border rounded-2xl p-5 text-center transition-all ${isToday ? 'bg-orange-500/10 border-orange-500/30' : 'bg-slate-900/40 border-white/5'}`}>
                                            <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${isToday ? 'text-orange-400' : 'text-slate-500'}`}>
                                                {isToday ? 'Idag' : dateObj.toLocaleDateString('sv-SE', { weekday: 'short', month: 'short', day: 'numeric' })}
                                            </p>
                                            <p className="text-3xl font-black text-white mb-1">{day.uniques}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">Besökare</p>
                                            <div className="pt-3 border-t border-white/5">
                                                <p className="text-xs text-orange-400 font-bold">{day.views} visn.</p>
                                            </div>
                                        </div>
                                    );
                                }) : (
                                    <div className="col-span-2 md:col-span-5 text-center py-6 text-slate-500 italic text-sm">Finns ingen data än under denna period</div>
                                )}
                            </div>

                        {/* Video Meeting Quick Generator */}
                        <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900/40 border border-indigo-500/20 rounded-3xl p-8 relative overflow-hidden group mt-8">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none group-hover:bg-indigo-500/20 transition-colors"></div>
                            
                            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3 relative z-10">
                                <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl">
                                    <Video size={20} />
                                </div>
                                Skapa Möteslänk
                            </h3>
                            <p className="text-sm text-slate-400 mb-6 relative z-10 max-w-2xl">Skriv in ett rumsnamn för att skapa en unik videolänk. När du skickar länken till någon navigeras de direkt in i ett privat, krypterat videomöte inne på klätterträdet. Ingen inloggning krävs för gäster.</p>
                            
                            <div className="flex flex-col md:flex-row gap-4 relative z-10">
                                <div className="flex-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                                        <Link size={16} />
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="t.ex. styrelse-april" 
                                        className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                        onChange={(e) => {
                                            const clean = e.target.value.replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase();
                                            const resultInput = document.getElementById('roomLinkResult') as HTMLInputElement;
                                            if (resultInput) resultInput.value = clean ? `${window.location.origin}/videomote?room=${clean}` : '';
                                        }}
                                    />
                                </div>
                                <div className="flex-[2] flex gap-2">
                                    <input 
                                        id="roomLinkResult"
                                        type="text"
                                        readOnly
                                        placeholder="Din länk dyker upp här..."
                                        className="flex-1 bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-indigo-300 font-mono text-sm select-all cursor-pointer"
                                        onClick={(e) => (e.target as HTMLInputElement).select()}
                                    />
                                    <button
                                        onClick={(e) => {
                                            const resultInput = document.getElementById('roomLinkResult') as HTMLInputElement;
                                            if (resultInput && resultInput.value) {
                                                navigator.clipboard.writeText(resultInput.value);
                                                const btn = e.currentTarget;
                                                const originalText = btn.innerHTML;
                                                btn.innerHTML = '<span class="flex items-center gap-2">Kopierad!</span>';
                                                btn.classList.add('bg-green-600', 'text-white');
                                                btn.classList.remove('bg-indigo-600');
                                                setTimeout(() => {
                                                    btn.innerHTML = originalText;
                                                    btn.classList.remove('bg-green-600');
                                                    btn.classList.add('bg-indigo-600');
                                                }, 2000);
                                            }
                                        }}
                                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25 whitespace-nowrap flex items-center gap-2"
                                    >
                                        <Copy size={16} /> Kopiera
                                    </button>
                                </div>
                            </div>
                        </div>


                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-white flex items-center gap-3">
                                    <BookOpen className="text-orange-500" size={20} /> Senaste Beställningar
                                </h3>
                                <div className="space-y-4">
                                    {orders.slice(0, 3).map((order) => (
                                        <div key={order.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between group">
                                            <div>
                                                <p className="font-bold text-white text-sm">{order.customer_name}</p>
                                                <p className="text-xs text-slate-500">{order.book_title}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-lg text-[10px] font-black uppercase tracking-wider">
                                                    {order.status}
                                                </span>
                                                <button 
                                                    onClick={() => deleteOrder(order.id)}
                                                    className="p-1 text-slate-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
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
                                            <td className="px-4 py-6 text-right flex items-center justify-end gap-2">
                                                <select
                                                    value={order.status || ''}
                                                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                    className="bg-slate-800 border border-white/10 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                                                >
                                                    <option value="Mottagen">Mottagen</option>
                                                    <option value="Behandlas">Behandlas</option>
                                                    <option value="Skickad">Skickad</option>
                                                </select>
                                                <button 
                                                    onClick={() => deleteOrder(order.id)}
                                                    className="p-1.5 text-slate-500 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
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
                                        <div className="flex gap-2">
                                            <select
                                                value={booking.status || ''}
                                                onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                                                className="bg-slate-900/50 border border-white/10 rounded-lg px-2 py-1 text-[10px] font-black text-white uppercase tracking-wider"
                                            >
                                                <option value="Bekräftad">Bekräftad</option>
                                                <option value="Väntar">Väntar</option>
                                                <option value="Avbokad">Avbokad</option>
                                            </select>
                                            <button 
                                                onClick={() => deleteBooking(booking.id)}
                                                className="p-1 text-slate-500 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
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
                        <h3 className="text-2xl font-black text-white mb-6">Inkorg & Webbformulär</h3>

                        {/* Tab Switcher for Inboxes */}
                        <div className="flex gap-4 mb-8">
                            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest self-center mr-4">Visa:</h4>
                            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                                <button className="px-4 py-2 bg-orange-500 text-slate-950 rounded-lg text-xs font-bold">Kontakt</button>
                                <button className="px-4 py-2 text-slate-400 hover:text-white transition-colors text-xs font-bold">Utbildning ({courseApps.length})</button>
                                <button className="px-4 py-2 text-slate-400 hover:text-white transition-colors text-xs font-bold">Terapiutredning ({therapyRequests.length})</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {/* Course Apps List */}
                            {courseApps.map(app => (
                                <div key={app.id} className="p-8 bg-white/5 border border-amber-500/20 rounded-[2rem] flex flex-col md:flex-row gap-8">
                                    <div className="md:w-64 shrink-0">
                                        <span className="bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded mb-4 inline-block">UTBILDNINGSANSÖKAN</span>
                                        <h4 className="font-bold text-white mb-1">{app.applicant_name}</h4>
                                        <p className="text-xs text-slate-500 mb-4">{app.email}</p>
                                        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                            <Clock size={12} /> {new Date(app.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h5 className="text-white font-bold mb-2">{app.course_type}</h5>
                                        <p className="text-slate-300 text-sm leading-relaxed">{app.message || '(Inget meddelande)'}</p>
                                        {app.workplace && <p className="text-slate-500 text-xs mt-4 italic">Arbetsplats: {app.workplace}</p>}
                                    </div>
                                    <div className="md:w-32 shrink-0 flex flex-col justify-center gap-2">
                                        <button onClick={() => handleCourseApp(app)} className="py-3 bg-white hover:bg-slate-200 text-slate-950 rounded-xl text-xs font-black transition-all">Hantera</button>
                                        <button 
                                            onClick={() => deleteMessage(app.id, 'course')}
                                            className="py-3 bg-white/5 text-slate-400 rounded-xl text-xs font-bold border border-white/10 hover:border-red-500/50 hover:text-red-500 transition-all"
                                        >
                                            Radera
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Therapy Requests List */}
                            {therapyRequests.map(req => (
                                <div key={req.id} className="p-8 bg-white/5 border border-blue-500/20 rounded-[2rem] flex flex-col md:flex-row gap-8">
                                    <div className="md:w-64 shrink-0">
                                        <span className="bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded mb-4 inline-block">TERAPIMATCHNING</span>
                                        <h4 className="font-bold text-white mb-1">{req.applicant_name}</h4>
                                        <p className="text-xs text-slate-500 mb-4">{req.email}</p>
                                        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                            <Clock size={12} /> {new Date(req.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {req.challenges?.map(c => <span key={c} className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[10px] text-slate-400 font-bold uppercase">{c}</span>)}
                                        </div>
                                        <p className="text-slate-300 text-sm">Söker: {req.meeting_form}</p>
                                    </div>
                                    <div className="md:w-32 shrink-0 flex flex-col justify-center gap-2">
                                        <button onClick={() => handleTherapyRequest(req)} className="py-3 bg-white hover:bg-slate-200 text-slate-950 rounded-xl text-xs font-black transition-all">Matcha</button>
                                        <button 
                                            onClick={() => deleteMessage(req.id, 'therapy')}
                                            className="py-3 bg-white/5 text-slate-400 rounded-xl text-xs font-bold border border-white/10 hover:border-red-500/50 hover:text-red-500 transition-all"
                                        >
                                            Radera
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Contact Messages List */}
                            {messages.map((msg: ContactMessage) => (
                                <div key={msg.id} className={`p-8 bg-white/5 border rounded-[2rem] transition-all flex flex-col md:flex-row gap-8 ${msg.is_read ? 'border-white/5' : 'border-blue-500/30 bg-blue-500/5'}`}>
                                    <div className="md:w-64 shrink-0">
                                        <h4 className="font-bold text-white mb-1">{msg.sender_name}</h4>
                                        <p className="text-xs text-slate-500 mb-4">{msg.email}</p>
                                        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                            <Clock size={12} /> {new Date(msg.created_at).toLocaleDateString()}
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
                                        <button 
                                            onClick={() => deleteMessage(msg.id, 'contact')}
                                            className="flex-1 md:flex-none py-3 bg-white/5 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 text-slate-300 rounded-xl text-xs font-bold transition-all border border-white/10"
                                        >
                                            Radera
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {messages.length === 0 && courseApps.length === 0 && therapyRequests.length === 0 && (
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
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-black text-white">Hantera Bloggen</h3>
                            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                                <button onClick={() => setShowBlogForm(false)} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${!showBlogForm ? 'bg-orange-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>Lista</button>
                                <button onClick={() => setShowBlogForm(true)} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${showBlogForm ? 'bg-orange-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>Skapa Ny</button>
                            </div>
                        </div>

                        {!showBlogForm ? (
                            <div className="grid grid-cols-1 gap-4">
                                {allBlogs.map(blog => (
                                    <div key={blog.id} className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-between group">
                                        <div>
                                            <h4 className="font-bold text-white mb-1">{blog.title}</h4>
                                            <p className="text-xs text-slate-500">Publicerad: {new Date(blog.created_at).toLocaleDateString()} av {blog.author_name}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => deleteBlogPost(blog.id)}
                                                className="p-2 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-xl transition-all border border-white/5"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {allBlogs.length === 0 && <p className="text-center py-10 text-slate-500 italic">Inga blogginlägg hittades</p>}
                            </div>
                        ) : (
                            <form onSubmit={async (e) => {
                                e.preventDefault();

                                try {
                                    const { error } = await supabase.from('blogs').insert({
                                        title: blogTitle,
                                        description: blogDescription,
                                        content: blogContent,
                                        image_url: blogImageUrl || null,
                                        user_id: user.id,
                                        author_name: user.full_name || 'Admin',
                                        created_at: new Date().toISOString(),
                                    });

                                    if (error) throw error;

                                    alert('Blogginlägg skapat!');
                                    setBlogTitle('');
                                    setBlogDescription('');
                                    setBlogContent('');
                                    setBlogImageUrl('');
                                    setShowBlogForm(false);
                                    fetchData();
                                } catch (error) {
                                    console.error('Error creating blog post:', error);
                                    alert('Kunde inte skapa blogginlägg. Försök igen.');
                                }
                            }} className="space-y-6 bg-white/5 border border-white/5 p-8 rounded-[2.5rem]">
                                
                                <div className="mb-8">
                                    <label className="block text-slate-400 text-xs font-black uppercase tracking-widest mb-3 px-1">Snabbstart: Välj en mall</label>
                                    <div className="flex flex-wrap gap-3">
                                        <button type="button" onClick={() => applyBlogTemplate('news')} className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 rounded-xl text-xs font-bold transition-all">Nyhetsuppdatering</button>
                                        <button type="button" onClick={() => applyBlogTemplate('article')} className="px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 rounded-xl text-xs font-bold transition-all">Artikel / Krönika</button>
                                        <button type="button" onClick={() => applyBlogTemplate('monthly')} className="px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 rounded-xl text-xs font-bold transition-all">Månadsbrev</button>
                                        <button type="button" onClick={() => { setBlogTitle(''); setBlogDescription(''); setBlogContent(''); setBlogImageUrl(''); }} className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 rounded-xl text-xs font-bold transition-all">Rensa formulär</button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-slate-400 text-xs font-black uppercase tracking-widest mb-3 px-1">Rubrik</label>
                                    <input
                                        name="title"
                                        type="text"
                                        required
                                        value={blogTitle}
                                        onChange={(e) => setBlogTitle(e.target.value)}
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
                                        value={blogDescription}
                                        onChange={(e) => setBlogDescription(e.target.value)}
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all resize-none"
                                        placeholder="En kort ingress som lockar till läsning..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-slate-400 text-xs font-black uppercase tracking-widest mb-3 px-1">Bild-URL (Valfritt)</label>
                                    <input
                                        name="imageUrl"
                                        type="url"
                                        value={blogImageUrl}
                                        onChange={(e) => setBlogImageUrl(e.target.value)}
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                                        placeholder="https://images.unsplash.com/..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-slate-400 text-xs font-black uppercase tracking-widest mb-3 px-1">Bloggtext (Markdown stöds)</label>
                                    <textarea
                                        name="content"
                                        required
                                        rows={15}
                                        value={blogContent}
                                        onChange={(e) => setBlogContent(e.target.value)}
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
                        )}
                    </div>
                )}

                {activeSection === 'threads' && (
                    <div className="space-y-8 max-w-4xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-black text-white">Hantera Forumet</h3>
                            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                                <button onClick={() => setShowThreadForm(false)} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${!showThreadForm ? 'bg-orange-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>Lista</button>
                                <button onClick={() => setShowThreadForm(true)} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${showThreadForm ? 'bg-orange-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>Skapa Ny</button>
                            </div>
                        </div>

                        {!showThreadForm ? (
                            <div className="grid grid-cols-1 gap-4">
                                {allThreads.map(thread => (
                                    <div key={thread.id} className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-between group">
                                        <div>
                                            <h4 className="font-bold text-white mb-1">{thread.title}</h4>
                                            <p className="text-xs text-slate-500">Kategori: {thread.category} • Skapad: {new Date(thread.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => deleteThread(thread.id)}
                                                className="p-2 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-xl transition-all border border-white/5"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {allThreads.length === 0 && <p className="text-center py-10 text-slate-500 italic">Inga trådar hittades</p>}
                            </div>
                        ) : (
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
                                    setShowThreadForm(false);
                                    fetchData();
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
                        )}
                    </div>
                )}

                {activeSection === 'handbook' && (
                    <div className="space-y-8 max-w-4xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-black text-white">Styrelsehandbok</h3>
                            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                                <button onClick={() => setShowHandbookForm(false)} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${!showHandbookForm ? 'bg-orange-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>Lista</button>
                                <button onClick={() => setShowHandbookForm(true)} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${showHandbookForm ? 'bg-orange-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>Skapa Ny</button>
                            </div>
                        </div>

                        {!showHandbookForm ? (
                            <div className="grid grid-cols-1 gap-4">
                                {allHandbookPages.map(page => (
                                    <div key={page.id} className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-between group">
                                        <div>
                                            <h4 className="font-bold text-white mb-1">{page.title}</h4>
                                            <p className="text-xs text-slate-500">Kategori: {page.category === 'rules' ? 'Stadgar' : page.category === 'contacts' ? 'Kontakter' : page.category === 'archive' ? 'Arkiv' : 'Dokument'} • Uppdaterad: {new Date(page.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => deleteHandbookPage(page.id)}
                                                className="p-2 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-xl transition-all border border-white/5"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {allHandbookPages.length === 0 && <p className="text-center py-10 text-slate-500 italic">Inga sidor i handboken hittades. Klicka på "Skapa Ny" för att lägga till dokumentation.</p>}
                            </div>
                        ) : (
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                const form = e.target as HTMLFormElement;
                                const title = (form.elements.namedItem('title') as HTMLInputElement).value;
                                const content = (form.elements.namedItem('content') as HTMLTextAreaElement).value;
                                const category = (form.elements.namedItem('category') as HTMLSelectElement).value;

                                try {
                                    const { error } = await supabase.from('board_handbook' as any).insert({
                                        title,
                                        content,
                                        category,
                                        author_id: user.id,
                                        created_at: new Date().toISOString(),
                                    });

                                    if (error) throw error;

                                    alert('Sida skapad i handboken!');
                                    form.reset();
                                    setShowHandbookForm(false);
                                    fetchData();
                                } catch (error) {
                                    console.error('Error creating handbook page:', error);
                                    alert('Kunde inte spara inlägget. Kontrollera att tabellen "board_handbook" finns i databasen.');
                                }
                            }} className="space-y-6 bg-white/5 border border-white/5 p-8 rounded-[2.5rem]">
                                <div>
                                    <label className="block text-slate-400 text-xs font-black uppercase tracking-widest mb-3 px-1">Rubrik</label>
                                    <input
                                        name="title"
                                        type="text"
                                        required
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                                        placeholder="T.ex. Stadgar, Rutiner eller Mötesprotokoll"
                                    />
                                </div>
                                <div>
                                    <label className="block text-slate-400 text-xs font-black uppercase tracking-widest mb-3 px-1">Kategori (Ikon)</label>
                                    <select
                                        name="category"
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                                    >
                                        <option value="document">Dokument (Generellt)</option>
                                        <option value="rules">Stadgar & Regler</option>
                                        <option value="contacts">Kontakter</option>
                                        <option value="archive">Arkiv</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-slate-400 text-xs font-black uppercase tracking-widest mb-3 px-1">Innehåll (Markdown stöds)</label>
                                    <textarea
                                        name="content"
                                        required
                                        rows={12}
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all resize-none font-mono text-sm leading-relaxed"
                                        placeholder="Skriv innehållet här..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-slate-950 font-black py-5 rounded-2xl transition-all shadow-xl shadow-orange-500/20 active:scale-[0.98]"
                                >
                                    Spara i Handboken
                                </button>
                            </form>
                        )}
                    </div>
                )}

                {activeSection === 'moderation' && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <h3 className="text-2xl font-black text-white">Medlemshantering</h3>
                                <p className="text-slate-400 text-sm mt-1">Hantera community-medlemmar och deras behörigheter.</p>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="relative">
                                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        type="text"
                                        placeholder="Sök medlem..."
                                        value={profileSearch}
                                        onChange={(e) => setProfileSearch(e.target.value)}
                                        className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                                    />
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 flex items-center gap-4">
                                    <Users className="text-blue-400" size={20} />
                                    <span className="text-white font-bold">{stats.members} Medlemmar</span>
                                </div>
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
