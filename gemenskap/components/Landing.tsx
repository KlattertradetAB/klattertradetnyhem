import React from 'react';
import { ArrowRight, Sparkles, Leaf, TreePine, ChevronRight, X, Users } from 'lucide-react';

interface LandingProps {
    onLoginClick: () => void;
    onPremiumLoginClick: () => void;
    onBackToSite: () => void;
}

const Landing: React.FC<LandingProps> = ({ onLoginClick, onPremiumLoginClick, onBackToSite }) => {
    return (
        <div className="min-h-screen relative flex flex-col items-center justify-start p-4 md:p-8 overflow-x-hidden bg-slate-950">
            {/* Dynamic Animated Background */}
            <div className="absolute inset-0 bg-slate-950 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Close/Back Button */}
            <button
                onClick={onBackToSite}
                className="fixed top-6 left-6 z-50 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/50 hover:text-white transition-all backdrop-blur-md group"
                title="Tillbaka till huvudsidan"
            >
                <X size={20} className="group-hover:scale-110 transition-transform" />
            </button>

            <div className="relative z-10 max-w-6xl w-full flex flex-col items-center py-12 md:py-20 space-y-16">
                {/* Header Section */}
                <div className="text-center space-y-4 md:space-y-6 max-w-4xl animate-in fade-in slide-in-from-top-4 duration-1000">
                    <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]">
                        Välkommen till <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-200 to-white">
                            Horizonten Gemenskap
                        </span>
                    </h1>
                    <p className="text-xl md:text-3xl font-medium text-orange-200/80 tracking-tight italic">
                        – Din digitala flock för läkning, växande och Self-care
                    </p>
                </div>

                {/* Intro Text Section */}
                <div className="glass bg-white/[0.03] border border-white/10 p-8 md:p-12 rounded-[3rem] max-w-3xl text-center space-y-8 backdrop-blur-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-1000 delay-200">
                    <div className="space-y-6 text-slate-300 text-lg md:text-xl leading-relaxed font-light">
                        <p>
                            Att vara människa är att behöva andra. Vårt nervsystem söker ständigt efter trygghet i kontakt med flocken.
                            Här på Horizonten har vi skapat en digital plats där du kan öva på att ta plats, dela erfarenheter och hitta styrka i igenkänning – allt utifrån din egen takt och dina behov.
                        </p>
                        <p className="text-white font-medium">
                            Oavsett om du vill smyga igång och "känna in rummet" eller om du är redo att dyka djupt och leda dig själv och andra, så finns det en plats för dig här.
                        </p>
                    </div>
                    <div className="pt-4">
                        <p className="text-orange-400 font-black uppercase tracking-[0.2em] text-sm">
                            Välj den nivå av gemenskap som passar ditt liv just nu:
                        </p>
                    </div>
                </div>

                {/* Tiers Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                    {/* Free Tier */}
                    <div className="group relative glass bg-white/[0.02] border border-white/10 hover:border-white/20 p-10 md:p-14 rounded-[3.5rem] transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Leaf size={120} className="text-green-500 rotate-12" />
                        </div>

                        <div className="space-y-8 relative z-10">
                            <div className="space-y-2">
                                <h3 className="text-4xl font-black text-white flex items-center gap-3">
                                    <span className="text-2xl">🌱</span> GRATIS MEDLEMSKAP
                                </h3>
                                <p className="text-slate-400 font-bold tracking-wide uppercase text-xs">En trygg plats att landa på</p>
                            </div>

                            <p className="text-slate-400 leading-relaxed text-lg">
                                Detta är för dig som vill ta del av gemenskapen, läsa och inspireras, men kanske inte har behov av de djupare funktionerna just nu. Det är ett första steg i din Self-care för att bryta isolering.
                            </p>

                            <ul className="space-y-6 pt-6 border-t border-white/5">
                                {[
                                    { title: "Läsrättigheter", desc: "Ta del av öppna diskussioner och insikter." },
                                    { title: "Begränsad chat", desc: "Möjlighet att skriva i vår allmänna välkomst-tråd." },
                                    { title: "Gemenskap", desc: "Du är en del av flocken – du är inte ensam." }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4 items-start">
                                        <div className="bg-white/5 p-1 rounded-md mt-1 shrink-0"><ChevronRight size={14} className="text-slate-500" /></div>
                                        <div className="text-base">
                                            <span className="block font-bold text-white mb-1">{item.title}:</span>
                                            <span className="text-slate-400 font-light">{item.desc}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            onClick={onLoginClick}
                            className="mt-12 w-full py-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-black text-white transition-all flex items-center justify-center gap-2 group-hover:gap-4 group-hover:scale-[1.02] uppercase tracking-widest text-sm"
                        >
                            BLI MEDLEM GRATIS <ArrowRight size={20} />
                        </button>
                    </div>

                    {/* Premium Tier */}
                    <div className="group relative overflow-hidden bg-gradient-to-br from-orange-600/10 to-transparent border border-orange-500/30 hover:border-orange-500 p-10 md:p-14 rounded-[3.5rem] transition-all duration-500 flex flex-col justify-between shadow-[0_20px_60px_rgba(249,115,22,0.1)]">
                        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                            <TreePine size={140} className="text-orange-500 -rotate-6" />
                        </div>

                        <div className="space-y-8 relative z-10">
                            <div className="space-y-2">
                                <div className="flex flex-wrap justify-between items-start gap-4">
                                    <h3 className="text-4xl font-black text-white flex items-center gap-3">
                                        <span className="text-2xl">🌳</span> PREMIUM
                                    </h3>
                                    <div className="bg-orange-500 text-[11px] font-black px-4 py-1.5 rounded-full text-white uppercase tracking-widest shadow-lg shadow-orange-500/40">250 kr/mån</div>
                                </div>
                                <p className="text-orange-300 font-bold tracking-wide uppercase text-xs">För dig som vill växa, påverka och fördjupa din process</p>
                            </div>

                            <p className="text-slate-300 leading-relaxed text-lg font-light">
                                Här får du tillgång till hela verktygslådan. Premium är utformat för att ge dig handlingsutrymme. Det handlar inte bara om att få stöd, utan om möjligheten att själv vara en aktiv skapare av din trygghet och din utveckling.
                            </p>

                            <ul className="space-y-6 pt-6 border-t border-orange-500/10">
                                {[
                                    { title: "Obegränsad Chat & Trådar", desc: "Skriv fritt i den offentliga tråden och få tillgång till privata trådar för djupare, skyddade samtal om specifika ämnen." },
                                    { title: "Bli din egen mötesledare", desc: "Som Premium-medlem har du möjlighet att (till rabatterat pris) hyra våra säkra videorum. Det ger dig makten att bjuda in till egna möten, starta en studiegrupp eller hålla i ett Horizonten Självhjälpsmöte. Detta är empowerment i praktiken." },
                                    { title: "Kunskapsbanken", desc: "Fri nedladdning av arbetsblad, mallar och filer från vår nerladdningssida som stöttar din Self-care-resa." },
                                    { title: "Förtur & Rabatter", desc: "Få förtur till vissa workshops och event som Klätterträdet anordnar." }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4 items-start">
                                        <div className="bg-orange-500/10 p-1 rounded-md mt-1 shrink-0"><ChevronRight size={14} className="text-orange-400" /></div>
                                        <div className="text-base">
                                            <span className="block font-bold text-white mb-1">{item.title}:</span>
                                            <span className="text-slate-400 font-light leading-relaxed">{item.desc}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="bg-orange-500/5 p-4 rounded-xl border border-orange-500/10">
                                <p className="text-orange-200/90 text-sm font-medium italic text-center">
                                    Ingen bindningstid. Investera i din egen hållbarhet.
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={onPremiumLoginClick}
                            className="mt-12 w-full py-6 bg-orange-500 hover:bg-orange-400 text-white rounded-2xl font-black transition-all flex items-center justify-center gap-2 group-hover:gap-4 group-hover:scale-[1.02] shadow-2xl shadow-orange-500/20 uppercase tracking-widest text-sm"
                        >
                            LOGGA IN (PREMIUM) <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Billy's Personal Message Section (Explicitly under the boxes) */}
                <div className="w-full max-w-4xl py-20 border-t border-white/5 animate-in fade-in duration-1000 delay-1000">
                    <div className="flex flex-col md:flex-row gap-12 items-center md:items-start text-center md:text-left bg-white/[0.02] p-10 md:p-14 rounded-[3rem] border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Users size={80} className="text-orange-500" />
                        </div>

                        <div className="relative shrink-0">
                            <div className="w-28 h-28 rounded-3xl overflow-hidden shadow-2xl rotate-3 border-2 border-orange-500/20 group-hover:rotate-0 transition-transform duration-500">
                                <img src="/billy-bokning.jpeg" alt="Billy Ljungberg" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-3 -right-3 bg-orange-600 rounded-full p-2.5 border-4 border-slate-950 shadow-xl">
                                <Sparkles size={16} className="text-white" />
                            </div>
                        </div>
                        <div className="space-y-6 relative z-10">
                            <div className="space-y-1">
                                <h3 className="text-3xl font-black text-white italic tracking-tight">Hej igen! Billy här.</h3>
                                <p className="text-orange-400/60 text-xs font-black uppercase tracking-widest">En personlig reflektion</p>
                            </div>

                            <div className="space-y-4 text-slate-300 text-lg md:text-xl leading-relaxed font-light italic">
                                <p>
                                    "Det här är ett avgörande steg. Att bjuda in till gemenskap är en av de finaste formerna av co-regulation (samreglering) vi kan erbjuda.
                                    Ur ett neurobiologiskt perspektiv vet vi att vi skadas i relationer, men vi läker också i relationer."
                                </p>
                                <p>
                                    "När vi designar den här sidan får vi inte bara 'sälja ett abonnemang'. Vi måste erbjuda en väg till minskad ensamhet och ökad agency (handlingskraft)."
                                </p>
                                <p className="text-slate-400 text-base md:text-lg not-italic mt-8 border-l-2 border-orange-500/30 pl-6">
                                    Här är ett förslag på text till inloggningssidan/landningssidan för Horizonten Gemenskap.
                                    Jag har lagt upp det så att det tydligt skiljer alternativen åt, men utan att förminska gratisalternativet – det ska vara en låg tröskel in i värmen.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer info */}
                <div className="pt-12 text-slate-600 text-sm font-medium">
                    © {new Date().getFullYear()} Klätterträdet AB • En trygg bas för mänsklig mognad
                </div>
            </div>
        </div>
    );
};

export default Landing;
