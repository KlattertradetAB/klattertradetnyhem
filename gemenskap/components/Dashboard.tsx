import React, { useState, useEffect } from 'react';
import { Profile, Thread } from '../types';
import { supabase } from '../services/supabase';
import { 
    Calendar, 
    Users, 
    MessageSquareText, 
    Star, 
    ChevronRight, 
    MapPin, 
    MessageCircle, 
    FileText, 
    BookOpen, 
    Bot, 
    ArrowRight, 
    Sparkles,
    LayoutGrid,
    Clock,
    Zap
} from 'lucide-react';
import PDFViewer from '../../components/PDFViewer';
import { requestNotificationPermission } from '../services/notifications';
import CommunityChat from './CommunityChat';
import { Page } from '../../types';
import { Card, CardContent } from '@/components/ui/card';
import { MetricCard } from './ui/MetricCard';
import { CalendarRow } from './ui/CalendarRow';

interface DashboardProps {
    user: Profile;
    onThreadClick: (topic: string) => void;
    onBackToSite: (page?: Page) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onThreadClick, onBackToSite }) => {
    const [isPdfOpen, setIsPdfOpen] = useState(false);
    const [activePdf, setActivePdf] = useState({ url: '', title: '' });
    const [threads, setThreads] = useState<Thread[]>([]);

    const openPdf = (url: string, title: string) => {
        setActivePdf({ url, title });
        setIsPdfOpen(true);
    };

    useEffect(() => {
        requestNotificationPermission();
        fetchThreads();
    }, []);

    const fetchThreads = async () => {
        const { data, error } = await supabase
            .from('threads')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5);

        if (error) {
            console.error('Error fetching threads:', error);
        } else {
            setThreads((data as any) || []);
        }
    };

    const events = [
        { id: 1, title: 'Myndighetsinducerat trauma bokrelease', date: 'April 2026', visitors: 142, views: 856, highlight: true },
        { id: 2, title: 'Utbildning i trauma drar igång', date: 'Aug 2026', visitors: 89, views: 432 },
        { id: 3, title: 'Sök plats som styrelsemedlem', date: 'Inför 2027', visitors: 45, views: 231 },
    ];

    return (
        <div className="space-y-8 pb-12">
            {/* Header Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <MetricCard 
                    title="Medlemmar" 
                    value="142" 
                    icon={Users} 
                    color="text-blue-400" 
                />
                <MetricCard 
                    title="Nya trådar" 
                    value={threads.length} 
                    icon={MessageSquareText} 
                    color="text-orange-400" 
                />
                <MetricCard 
                    title="Aktiva nu" 
                    value="18" 
                    icon={Zap} 
                    color="text-green-400" 
                />
                <MetricCard 
                    title="Dagar som medlem" 
                    value="12" 
                    icon={Clock} 
                    color="text-purple-400" 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Live Community Chat */}
                    <Card className="bg-card/40 border-white/5 rounded-[2.5rem] overflow-hidden">
                        <CardContent className="p-0 h-[600px]">
                            <CommunityChat
                                user={user}
                                className="h-full border-0 rounded-none shadow-none bg-transparent"
                            />
                        </CardContent>
                    </Card>

                    {/* Featured Content Area */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Star className="text-orange-500" size={24} />
                                Utvalt innehåll
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                {
                                    id: 'attr',
                                    title: 'Ett grundläggande attributionsfel',
                                    desc: 'Varför dömer vi andra hårdare än oss själva?',
                                    tag: 'Blogg',
                                    icon: FileText,
                                    color: 'text-orange-500',
                                    url: '/Attributionsfel-narcissism.pdf'
                                },
                                {
                                    id: 'polar',
                                    title: 'Polarisering & Personlighetsstörningar',
                                    desc: 'Djupanalys av hur dömande påverkar relationer.',
                                    tag: 'Nyhet',
                                    icon: Info,
                                    color: 'text-indigo-500',
                                    url: '/Polarisering-av-personlighetsstörningar .pdf'
                                }
                            ].map(item => (
                                <Card 
                                    key={item.id}
                                    onClick={() => openPdf(item.url, item.title)}
                                    className="bg-card/40 border-white/5 rounded-3xl group hover:bg-card/60 transition-all cursor-pointer overflow-hidden"
                                >
                                    <CardContent className="p-8 relative">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 ${item.color}`}>
                                                {item.tag}
                                            </div>
                                            <item.icon className={`w-5 h-5 ${item.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
                                        </div>
                                        <h4 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-orange-400 transition-colors">
                                            {item.title}
                                        </h4>
                                        <p className="text-slate-400 text-xs mb-6 line-clamp-2">{item.desc}</p>
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">
                                            Visa dokument <ArrowRight size={14} />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar area */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Events Widget */}
                    <Card className="bg-card/40 border-white/5 rounded-[2.5rem] overflow-hidden">
                        <CardContent className="p-8 space-y-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-white flex items-center gap-2">
                                    <Calendar className="text-orange-500" size={20} />
                                    Kommande
                                </h3>
                                <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Kalender</div>
                            </div>

                            <div className="space-y-4">
                                {events.map(event => (
                                    <CalendarRow 
                                        key={event.id}
                                        date={event.date}
                                        visitors={event.visitors}
                                        views={event.views}
                                        highlight={event.highlight}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={() => onThreadClick('experts')}
                                className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                            >
                                Visa alla event
                                <ChevronRight size={16} />
                            </button>
                        </CardContent>
                    </Card>

                    {/* Recent Threads Widget */}
                    <Card className="bg-card/40 border-white/5 rounded-[2.5rem] overflow-hidden">
                        <CardContent className="p-8 space-y-6">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <MessageSquareText className="text-orange-500" size={20} />
                                Senaste
                            </h3>
                            
                            <div className="space-y-4">
                                {threads.map(thread => (
                                    <div 
                                        key={thread.id} 
                                        onClick={() => onThreadClick(thread.id)}
                                        className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all cursor-pointer group"
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[9px] font-black uppercase text-orange-500/80 tracking-widest">
                                                {thread.category || 'Forum'}
                                            </span>
                                            <div className="w-1 h-1 rounded-full bg-white/20" />
                                            <span className="text-[9px] font-bold text-slate-500">
                                                {new Date(thread.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h4 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                                            {thread.title}
                                        </h4>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => onThreadClick('general')}
                                className="w-full py-4 rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/20 font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all"
                            >
                                GÖ TILL FORUMET
                            </button>
                        </CardContent>
                    </Card>

                    {/* AI Quick Contact */}
                    <Card className="bg-gradient-to-br from-indigo-500/20 to-transparent border-indigo-500/20 rounded-[2.5rem] overflow-hidden group">
                        <CardContent className="p-8 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                                    <Bot size={28} />
                                </div>
                                <h4 className="text-lg font-bold text-white">AI-Assistans</h4>
                            </div>
                            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                                {[
                                    { name: 'Saga', avatar: '🎨', color: 'bg-emerald-500/10 text-emerald-400' },
                                    { name: 'Mikael', avatar: '🍃', color: 'bg-emerald-600/10 text-emerald-500' },
                                    { name: 'Elena', avatar: '🤝', color: 'bg-rose-500/10 text-rose-400' },
                                    { name: 'Lina', avatar: '🧘‍♀️', color: 'bg-purple-500/10 text-purple-400' },
                                    { name: 'Erik', avatar: '🏃‍♂️', color: 'bg-blue-500/10 text-blue-400' },
                                ].map((ass) => (
                                    <button 
                                        key={ass.name} 
                                        onClick={() => onThreadClick(`consultant?persona=${ass.name}`)}
                                        className={`flex-shrink-0 w-12 h-12 rounded-2xl ${ass.color} border border-white/5 flex items-center justify-center text-xl shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 group`}
                                        title={`Prata med ${ass.name}`}
                                    >
                                        <span className="group-hover:rotate-12 transition-transform">{ass.avatar}</span>
                                    </button>
                                ))}
                            </div>
                            <p className="text-slate-400 text-[10px] leading-relaxed">
                                Behöver du snabb hjälp? Mikael, Elena och våra andra AI-coacher finns här dygnet runt.
                            </p>
                            <button
                                onClick={() => onThreadClick('consultant')}
                                className="w-full py-3 rounded-xl bg-white/10 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all"
                            >
                                Starta samtal
                            </button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <PDFViewer
                isOpen={isPdfOpen}
                onClose={() => setIsPdfOpen(false)}
                pdfUrl={activePdf.url}
                title={activePdf.title}
            />
        </div>
    );
};

export default Dashboard;

// Missing icons for the header mapping if needed
import { Info } from 'lucide-react';
