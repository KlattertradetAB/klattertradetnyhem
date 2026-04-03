import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Compass, ArrowRight, ShieldCheck, Star, Users, Package, MessageCircle, Lock, Users2, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { MetricCard } from './ui/MetricCard';

const Welcome: React.FC = () => {
    return (
        <div className="space-y-8 pb-12">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-orange-500/20 via-orange-600/5 to-transparent border border-white/10 p-8 md:p-12">
                <div className="relative z-10 max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        <Heart size={14} className="animate-pulse" />
                        Välkommen hem till Horizonten
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
                        Välkommen hem till <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-200 to-white">
                            Horizonten Gemenskap
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-300 font-medium italic mb-8">
                        Vad fint att du hittat hit.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold">
                            <Lock size={18} className="text-green-500" />
                            100% Anonymt & Säkert
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold">
                            <Star size={18} className="text-orange-400" />
                            Premium Community
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('/assets/logo2.png')] bg-contain bg-no-repeat bg-right opacity-[0.03] grayscale pointer-events-none" />
            </div>

            {/* Content Cards */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Main Text Area */}
                <div className="md:col-span-8 space-y-8">
                    <Card className="bg-card/40 border-white/5 rounded-[2.5rem] overflow-hidden">
                        <CardContent className="p-8 md:p-12 space-y-8 text-slate-300 leading-relaxed text-lg font-light">
                            <p>
                                Du har just klivit in i ett digitalt rum som är byggt med en enda avsikt: <span className="text-white font-semibold">Att minska avståndet mellan människor</span>.
                                Vi vet, utifrån både erfarenhet och neurobiologi, att ensamhet är farligt för oss, medan kontakt är förutsättningen för all läkning och utveckling.
                            </p>

                            <p>
                                Horizonten Gemenskap är hjärtat i samarbetet mellan <span className="text-orange-400 font-bold">Klätterträdet, Socialkraft och Twisted-stacks</span>.
                                Vi har gått samman för att vi delar en vision: Psykisk hälsa och mänskligt stöd ska vara tillgängligt för alla.
                                Det ska inte vara krångligt, det ska inte kosta en förmögenhet, och du ska inte behöva vänta i en telefonkö för att känna att någon lyssnar.
                            </p>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6 p-6">
                            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                                <Users2 className="text-orange-500" size={28} />
                                Vad är det här för plats?
                            </h2>
                            <p className="text-slate-400 leading-relaxed">
                                Det här är din digitala flock. Här möts vi – oavsett om du är här för att du kämpar med myndighetsstress, 
                                bearbetar trauma, är nyfiken på din egen utveckling eller arbetar professionellt med människor.
                            </p>
                            <p className="text-slate-400 leading-relaxed">
                                Här övar vi på <span className="text-white font-medium">Self-care tillsammans</span>. Inte som ett prestationskrav, 
                                utan som ett sätt att vara snälla mot våra nervsystem.
                            </p>
                        </div>

                        <Card className="bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/20 rounded-[2.5rem]">
                            <CardContent className="p-8">
                                <h3 className="text-orange-400 font-black uppercase tracking-widest text-xs mb-6 px-1">Tre pelare</h3>
                                <div className="space-y-6">
                                    {[
                                        { title: 'Tillgänglighet', desc: 'Stödet finns i fickan. Dygnet runt. Du behöver inte prestera här, du kan bara vara.' },
                                        { title: 'Gratis stöd', desc: 'Vi tror på kraften i att dela erfarenheter. I de öppna forumen hjälps vi åt, stöttar och speglar varandra.' },
                                        { title: 'Kontakt', desc: 'Läkning sker "bottom up" – från kroppen, via känslan och in i relationen. Här får du utrymme att dela din berättelse.' }
                                    ].map((item, i) => (
                                        <div key={item.title} className="flex gap-4 group">
                                            <div className="shrink-0 w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white font-bold group-hover:bg-orange-500/20 group-hover:text-orange-400 transition-colors">
                                                {i + 1}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold mb-1 text-sm">{item.title}</h4>
                                                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Sidebar Cards */}
                <div className="md:col-span-4 space-y-8">
                    <Card className="bg-card/40 border-white/5 rounded-[2.5rem] text-center p-8 overflow-hidden group">
                        <CardContent className="p-0 space-y-6 relative z-10">
                            <div className="w-16 h-16 bg-orange-500/10 rounded-3xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-500">
                                <Info className="text-orange-500" size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Till dig som är ny</h2>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Känn in rummet. Du behöver inte skriva något direkt om du inte vill. Det är okej att bara "vara med" och observera.
                                Det kallas att <span className="text-orange-400 font-bold">samreglera</span>, och det är första steget till trygghet.
                            </p>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                När du känner dig redo – skriv gärna en rad i presentationstråden. Vi vill gärna veta vem du är, men på dina villkor.
                            </p>
                            <div className="pt-6 border-t border-white/5">
                                <p className="text-xl font-bold text-white italic">Varmt välkommen</p>
                            </div>
                        </CardContent>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    </Card>

                    {/* Quick Stats Placeholder */}
                    <div className="grid grid-cols-1 gap-4">
                        <MetricCard 
                            title="Aktiva Idag" 
                            value="42" 
                            icon={Users} 
                            color="text-blue-400" 
                        />
                        <MetricCard 
                            title="Resurser" 
                            value="12" 
                            icon={Package} 
                            color="text-orange-400" 
                        />
                        <MetricCard 
                            title="Nya Inlägg" 
                            value="156" 
                            icon={MessageCircle} 
                            color="text-green-400" 
                        />
                    </div>
                </div>
            </div>
            
            <div className="h-20"></div>
        </div>
    );
};

export default Welcome;
