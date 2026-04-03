import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/community/Sidebar';
import {
    ShieldCheck,
    BarChart3,
    Users,
    Eye,
    ShoppingBag,
    Calendar,
    Lock,
    ArrowRight,
    Video,
    Copy,
    ChevronLeft,
    ChevronRight,
    Inbox,
    FileText,
    MessageSquare,
    Scale,
    Book
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export default function Admin() {
    const [activeTab, setActiveTab] = useState("Översikt");
    const [roomName, setRoomName] = useState("");
    const [generatedLink, setGeneratedLink] = useState("");
    const [stats, setStats] = useState({
        views: 106,
        members: 7,
        uniqueVisitors: 5,
        newOrders: 0,
        activeBookings: 0
    });

    const tabs = [
        "Översikt",
        "Beställningar",
        "Bokningar",
        "Inkorg",
        "Blogg",
        "Trådar",
        "Moderering",
        "Adminvillkor och förhållningssätt"
    ];

    const members = [
        { email: "horizonten.test@gmail.com", role: "member", membership: "Bas", status: "Inaktiv" },
        { email: "test123456@gmail.com", role: "member", membership: "Bas", status: "Inaktiv" },
        { email: "hlivfachapman2000@gmail.com", role: "member", membership: "Bas", status: "Inaktiv" },
        { email: "billy@klattertradet.se", role: "member", membership: "Bas", status: "Inaktiv" },
        { email: "malin@klattertradet.se", role: "therapist", membership: "Bas", status: "Inaktiv" },
        { email: "diskmedel940@gmail.com", role: "member", membership: "Bas", status: "Inaktiv" },
        { email: "billy.ljungberg90@gmail.com", role: "admin", membership: "Bas", status: "Inaktiv" },
    ];

    // Real-time animation for stats
    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                ...prev,
                views: prev.views + (Math.random() > 0.7 ? 1 : 0),
                uniqueVisitors: prev.uniqueVisitors + (Math.random() > 0.95 ? 1 : 0)
            }));
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const renderTabContent = () => {
        switch (activeTab) {
            case "Översikt":
                return (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            <MetricCard title="Sidvisningar (Idag)" value={stats.views} icon={Eye} color="text-primary" />
                            <MetricCard title="Totalt Medlemmar" value={stats.members} icon={Users} color="text-blue-400" />
                            <MetricCard title="Unika Besökare" value={stats.uniqueVisitors} icon={BarChart3} color="text-green-400" />
                            <MetricCard title="Nya Beställningar" value={stats.newOrders} icon={ShoppingBag} color="text-orange-400" />
                            <MetricCard title="Aktiva Bokningar" value={stats.activeBookings} icon={Calendar} color="text-purple-400" />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-8">
                                <Card className="bg-card/40 border-border/40 overflow-hidden rounded-3xl backdrop-blur-sm">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                            <BarChart3 className="w-4 h-4" /> Besöksstatistik
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="h-64 flex items-end justify-between gap-4 px-8 pb-12 pt-8">
                                        {[12, 35, 20, 80, 45, 95, 106].map((val, i) => (
                                            <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                                                <div className="w-full relative">
                                                    <motion.div
                                                        initial={{ height: 0 }}
                                                        animate={{ height: `${(val / 106) * 100}%` }}
                                                        className="bg-primary/20 border-t-2 border-primary group-hover:bg-primary/30 transition-all rounded-t-lg relative"
                                                    >
                                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                            {val} visn
                                                        </div>
                                                    </motion.div>
                                                </div>
                                                <span className="text-[10px] font-bold text-muted-foreground uppercase">{26 + i === 32 ? "01" : 26 + i}</span>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-bold">Besökskalender</h2>
                                        <div className="flex items-center gap-1">
                                            <Button size="icon" variant="ghost" className="h-8 w-8"><ChevronLeft className="w-4 h-4" /></Button>
                                            <span className="text-[10px] font-bold uppercase tracking-tighter">Mars / April</span>
                                            <Button size="icon" variant="ghost" className="h-8 w-8"><ChevronRight className="w-4 h-4" /></Button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <CalendarRow date="lör 28 mars" visitors={1} views={2} />
                                        <CalendarRow date="sön 29 mars" visitors={0} views={0} />
                                        <CalendarRow date="mån 30 mars" visitors={0} views={0} />
                                        <CalendarRow date="tis 31 mars" visitors={1} views={2} />
                                        <CalendarRow date="Idag" visitors={stats.uniqueVisitors} views={stats.views} highlight />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <Card className="bg-primary/5 border border-primary/20 rounded-3xl overflow-hidden backdrop-blur-xl group hover:border-primary/40 transition-all">
                                    <CardHeader>
                                        <CardTitle className="text-primary font-black uppercase italic tracking-widest text-lg flex items-center gap-2">
                                            <Video className="w-5 h-5" /> Skapa Möteslänk
                                        </CardTitle>
                                        <CardDescription className="text-xs leading-relaxed text-foreground/70">
                                            Skriv in ett rumsnamn för att skapa en unik videolänk. Privat, krypterat och ingen inloggning krävs för gäster.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="relative">
                                            <Input
                                                placeholder="t.ex. styrelse-april"
                                                value={roomName}
                                                onChange={(e) => setRoomName(e.target.value)}
                                                className="bg-background/50 border-border/40 rounded-xl focus-visible:ring-primary h-11"
                                            />
                                            <Button size="sm" className="absolute right-1 top-1 h-9 rounded-lg bg-primary hover:bg-primary/90" onClick={() => setGeneratedLink(`https://klattertradet.se/join/${roomName.toLowerCase().replace(/\s+/g, '-')}`)}>
                                                Generera
                                            </Button>
                                        </div>
                                        {generatedLink && (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-background/80 rounded-2xl border border-primary/20 flex flex-col gap-2">
                                                <div className="text-[10px] font-bold text-muted-foreground uppercase opacity-50">Klar! Dela denna länk:</div>
                                                <div className="flex items-center gap-2">
                                                    <code className="text-[11px] text-primary font-mono truncate flex-1">{generatedLink}</code>
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-primary/10 hover:text-primary" onClick={() => navigator.clipboard.writeText(generatedLink)}>
                                                        <Copy className="w-3.5 h-3.5" />
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                );

            case "Beställningar":
            case "Bokningar":
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-black tracking-tight">{activeTab}</h2>
                        <Card className="bg-card/40 border-border/40 rounded-3xl overflow-hidden backdrop-blur-sm">
                            <TableLayout
                                headers={["Kund", "Produkt", "Datum", "Status", "Hantera"]}
                                emptyMessage={`Inga ${activeTab.toLowerCase()} hittades`}
                            />
                        </Card>
                    </div>
                );

            case "Inkorg":
                return (
                    <div className="space-y-8">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-black tracking-tight">Inkorg & Webbformulär</h2>
                            <p className="text-sm text-muted-foreground">Visa och hantera inkommande meddelanden.</p>
                        </div>
                        <div className="flex gap-4">
                            <Button variant="secondary" className="rounded-xl h-12 px-6">Kontakt</Button>
                            <Button variant="ghost" className="rounded-xl h-12 px-6">Utbildning (0)</Button>
                            <Button variant="ghost" className="rounded-xl h-12 px-6">Terapiutredning (0)</Button>
                        </div>
                        <Card className="bg-card/40 border-border/40 rounded-3xl p-12 text-center border-dashed">
                            <Inbox className="w-12 h-12 text-muted-foreground opacity-20 mx-auto mb-4" />
                            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground opacity-30 italic">Inkorgen är tom</p>
                        </Card>
                    </div>
                );

            case "Blogg":
                return (
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-black tracking-tight">Hantera Bloggen</h2>
                            <div className="flex gap-2">
                                <Button variant="secondary" className="rounded-xl">Lista</Button>
                                <Button className="rounded-xl">Skapa Ny</Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Rubrik</label>
                                        <Input placeholder="Vad ska blogginlägget heta?" className="bg-card/40 border-border/40 h-12 rounded-xl text-lg font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Kort beskrivning</label>
                                        <Input placeholder="En kort ingress som lockar till läsning..." className="bg-card/40 border-border/40 h-12 rounded-xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Bild-URL (Valfritt)</label>
                                        <Input placeholder="https://images.unsplash.com/..." className="bg-card/40 border-border/40 h-12 rounded-xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Bloggtext (Markdown stöds)</label>
                                        <textarea
                                            className="w-full min-h-[300px] bg-card/40 border border-border/40 rounded-xl p-4 focus:ring-1 focus:ring-primary outline-none text-sm leading-relaxed"
                                            placeholder="Skriv ditt inlägg här..."
                                        />
                                    </div>
                                    <Button className="w-full h-14 rounded-2xl text-md font-black italic uppercase tracking-widest bg-gradient-to-r from-primary to-orange-600 hover:scale-[1.01] transition-transform shadow-xl shadow-primary/20">
                                        Publicera Blogginlägg
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <Card className="bg-accent/20 border-border/40 rounded-3xl p-6">
                                    <h3 className="text-xs font-black uppercase tracking-widest mb-4">Snabbstart: Välj en mall</h3>
                                    <div className="space-y-2">
                                        {["Nyhetsuppdatering", "Artikel / Krönika", "Månadsbrev"].map(mall => (
                                            <Button key={mall} variant="outline" className="w-full justify-start h-12 rounded-xl border-border/40 hover:bg-card/60">
                                                {mall}
                                            </Button>
                                        ))}
                                        <Separator className="my-4 opacity-50" />
                                        <Button variant="ghost" className="w-full h-12 rounded-xl text-destructive hover:bg-destructive/10">Rensa formulär</Button>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                );

            case "Trådar":
                return (
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-black tracking-tight">Hantera Forumet</h2>
                            <div className="flex gap-2">
                                <Button variant="secondary" className="rounded-xl">Lista</Button>
                                <Button className="rounded-xl">Skapa Ny</Button>
                            </div>
                        </div>
                        <Card className="bg-card/40 border-border/40 rounded-3xl p-24 text-center">
                            <MessageSquare className="w-16 h-16 text-muted-foreground opacity-10 mx-auto mb-4" />
                            <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground opacity-30 italic">Inga trådar hittades</p>
                        </Card>
                    </div>
                );

            case "Moderering":
                return (
                    <div className="space-y-8">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-black tracking-tight">Medlemshantering</h2>
                            <p className="text-sm text-muted-foreground">Hantera community-medlemmar och deras behörigheter.</p>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <div className="relative flex-1 max-w-md">
                                <Input placeholder="Sök medlem..." className="bg-card/40 border-border/40 h-11 rounded-xl pl-10" />
                                <Users className="w-4 h-4 absolute left-3.5 top-3.5 text-muted-foreground" />
                            </div>
                            <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground">7 Medlemmar</div>
                        </div>

                        <Card className="bg-card/40 border-border/40 rounded-3xl overflow-hidden backdrop-blur-sm">
                            <div className="w-full overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-accent/30 border-b border-border/40">
                                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Medlem</th>
                                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Medlemskap</th>
                                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Roll</th>
                                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</th>
                                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Åtgärder</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {members.map((m, i) => (
                                            <tr key={i} className="border-b border-border/10 hover:bg-accent/10 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-[10px] font-bold">?</div>
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-bold">Okänd</span>
                                                            <span className="text-[10px] text-muted-foreground">{m.email}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-medium text-sm">{m.membership}</td>
                                                <td className="px-6 py-4">
                                                    <Badge variant="outline" className={`${m.role === 'admin' ? 'border-primary text-primary bg-primary/5' : 'border-border text-muted-foreground'} text-[9px] uppercase font-black`}>
                                                        {m.role}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-50">{m.status}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Button variant="ghost" size="sm" className="h-8 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">Hantera</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                );

            case "Adminvillkor och förhållningssätt":
                return (
                    <div className="max-w-3xl space-y-8">
                        <h2 className="text-3xl font-black tracking-tight leading-tight">Adminvillkor och förhållningssätt</h2>
                        <div className="prose prose-invert prose-orange max-w-none space-y-6 text-foreground/80">
                            <p className="text-lg leading-relaxed font-medium">
                                Som administratör för Horizonten Gemenskap bär du ett särskilt ansvar för att upprätthålla en trygg, inkluderande och stödjande miljö.
                            </p>
                            <div className="space-y-8 mt-12">
                                <AdminPrinciple title="1. Integritet & Tystnadsplikt" text="All information som delas inom gemenskapen, särskilt under känsliga samtal eller i terapi-inkorgen, behandlas med strängast möjliga sekretess." />
                                <AdminPrinciple title="2. Icke-dömande förhållningssätt" text="Vi möter alla medlemmar med nyfikenhet och empati. Vi tillrättavisar inte erfarenheter utan guidar samtalet mot läkning." />
                                <AdminPrinciple title="3. Säkerhet & Moderering" text="Vi ingriper omedelbart vid kränkningar, men vi gör det med sikte på att bevara gruppens dynamik och trygghet." />
                            </div>
                        </div>
                    </div>
                );

            default:
                return <div>Innehåll kommer snart...</div>;
        }
    };

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col relative overflow-hidden bg-gradient-to-br from-background via-card/10 to-accent/5 font-sans">

                {/* Header */}
                <header className="px-8 py-6 border-b border-border/40 backdrop-blur-md flex items-center justify-between sticky top-0 z-10">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                            {activeTab === "Översikt" ? "Admin Dashboard" : activeTab}
                        </h1>
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-green-500">
                            <Lock className="w-3 h-3 animate-pulse" />
                            <span>Säker anslutning upprättad</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="rounded-xl h-9 text-xs border-border/50">Export Report</Button>
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs" onClick={() => setActiveTab("Översikt")}>BL</div>
                    </div>
                </header>

                <section className="flex-1 overflow-auto">
                    <div className="max-w-7xl mx-auto p-8 space-y-8">

                        {/* Top Navigation Strip */}
                        <div className="flex flex-wrap items-center gap-2 pb-2">
                            {tabs.map((tab) => (
                                <Button
                                    key={tab}
                                    variant={activeTab === tab ? "secondary" : "ghost"}
                                    className={cn(
                                        "h-8 rounded-lg text-[10px] font-bold uppercase tracking-wider px-4 transition-all",
                                        activeTab === tab ? "bg-primary/10 text-primary scale-105" : "text-muted-foreground opacity-60 hover:opacity-100"
                                    )}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab === "Adminvillkor och förhållningssätt" ? "Villkor" : tab}
                                </Button>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {renderTabContent()}
                            </motion.div>
                        </AnimatePresence>

                    </div>
                </section>

            </main>
        </div>
    );
}

function TableLayout({ headers, emptyMessage }) {
    return (
        <div className="w-full">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-accent/30 border-b border-border/40">
                        {headers.map(h => (
                            <th key={h} className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground font-sans">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={headers.length} className="px-6 py-24 text-center">
                            <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground opacity-30 italic">
                                {emptyMessage}
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

function AdminPrinciple({ title, text }) {
    return (
        <div className="space-y-3 bg-accent/20 p-6 rounded-3xl border border-border/40">
            <h3 className="text-sm font-black uppercase tracking-widest text-primary italic">{title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
        </div>
    );
}

function MetricCard({ title, value, icon: Icon, color }) {
    return (
        <Card className="bg-card/40 border-border/40 rounded-3xl backdrop-blur-sm overflow-hidden group hover:bg-card/60 transition-all border-b-4 border-b-transparent hover:border-b-primary/50">
            <CardContent className="p-6 space-y-4">
                <div className={`w-10 h-10 rounded-2xl bg-accent/50 flex items-center justify-center ${color}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                    <div className="text-4xl font-black tracking-tighter tabular-nums">{value}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-60 leading-none">{title}</div>
                </div>
            </CardContent>
        </Card>
    );
}

function CalendarRow({ date, visitors, views, highlight }) {
    return (
        <div className={`p-4 rounded-2xl flex items-center justify-between transition-all ${highlight ? 'bg-primary/10 border border-primary/20 shadow-lg shadow-primary/5' : 'bg-accent/20 border border-border/40 opacity-70 hover:opacity-100'}`}>
            <div className="space-y-0.5">
                <div className={`text-[11px] font-black uppercase tracking-widest ${highlight ? 'text-primary' : 'text-foreground'}`}>{date}</div>
                <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase opacity-60">
                    <span>{visitors} Besökare</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>{views} visn.</span>
                </div>
            </div>
            {highlight && (
                <Badge className="bg-primary text-primary-foreground font-black italic rounded-lg">LIVE</Badge>
            )}
        </div>
    );
}
