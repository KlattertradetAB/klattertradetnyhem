import React from 'react';
import { Page } from '../types';
import { ArrowLeft, ArrowRight, TreePine, Leaf, ShieldCheck, ChevronRight, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../gemenskap/hooks/usePWAInstall';
import { InstallGuideModal } from '../gemenskap/components/InstallGuideModal';

interface LoginPageProps {
    setPage: (page: Page) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setPage }) => {
    const { installApp, isInstallable, showInstallModal, setShowInstallModal } = usePWAInstall();

    return (
        <div className="container mx-auto px-4 md:px-6 py-10 md:py-20 animate-fade-in flex flex-col items-center">
            <div className="w-full max-w-6xl">
                <button
                    onClick={() => setPage(Page.HOME)}
                    className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Tillbaka till hem
                </button>

                {/* Header Section */}
                <div className="text-center space-y-4 mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-tight">
                        Medlemsinloggning <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-200 to-white">
                            Horizonten Gemenskap
                        </span>
                    </h1>
                    <p className="text-lg md:text-2xl font-medium text-orange-200/80 tracking-tight italic">
                        Din digitala gemenskap för läkning och växande
                    </p>
                </div>

                {/* Intro Text Section */}
                <div className="glass bg-white/[0.03] border border-white/10 p-6 md:p-10 rounded-3xl max-w-5xl mx-auto text-center space-y-6 backdrop-blur-md mb-20 animate-in fade-in zoom-in-95 duration-700">
                    <div className="space-y-4 text-slate-300 text-base md:text-lg leading-relaxed font-light">
                        <p>
                            Att vara människa är att behöva andra. Vårt nervsystem söker ständigt efter trygghet i kontakt med flocken.
                            Här på Horizonten har vi skapat en digital plats där du kan öva på att ta plats, dela erfarenheter och hitta styrka i igenkänning – allt utifrån din egen takt och dina behov.
                        </p>
                        <p className="text-white font-medium">
                            Oavsett om du vill smyga igång och "känna in rummet" eller om du är redo att dyka djupt och leda dig själv och andra, så finns det en plats för dig här.
                        </p>
                    </div>
                    <div className="pt-2">
                        <p className="text-orange-400 font-black uppercase tracking-[0.2em] text-xs">
                            Välj den nivå av gemenskap som passar ditt liv just nu:
                        </p>
                    </div>
                </div>

                {/* Tiers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-12">
                    {/* Free Tier */}
                    <div className="group relative glass bg-white/[0.02] border border-white/10 hover:border-white/20 p-8 md:p-10 rounded-[2.5rem] transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Leaf size={100} className="text-green-500 rotate-12" />
                        </div>

                        <div className="space-y-6 relative z-10">
                            <div className="space-y-1">
                                <h3 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
                                    GRATIS MEDLEMSKAP
                                </h3>
                                <p className="text-slate-400 font-bold tracking-wide uppercase text-[10px]">En trygg plats att landa på</p>
                            </div>

                            <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                                Detta är för dig som vill ta del av gemenskapen, läsa och inspireras, men kanske inte har behov av de djupare funktionerna just nu. Det är ett första steg i din Self-care för att bryta isolering.
                            </p>

                            <ul className="space-y-4 pt-4 border-t border-white/5">
                                {[
                                    { title: "Läsrättigheter", desc: "Ta del av öppna diskussioner och insikter." },
                                    { title: "Begränsad chat", desc: "Möjlighet att skriva i vår allmänna välkomst-tråd." },
                                    { title: "Gemenskap", desc: "Du är en del av flocken – du är inte ensam." }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 items-start">
                                        <ChevronRight size={14} className="text-slate-500 mt-1 shrink-0" />
                                        <div className="text-sm">
                                            <span className="font-bold text-white mr-1">{item.title}:</span>
                                            <span className="text-slate-400 font-light">{item.desc}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col gap-3 mt-8">
                            <button
                                onClick={() => {
                                    window.location.hash = '#login';
                                    setPage(Page.GEMENSKAP_APP);
                                }}
                                className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-black text-white transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                            >
                                Logga in <ArrowRight size={18} />
                            </button>
                            <button
                                onClick={() => {
                                    setPage(Page.FREE_REGISTRATION);
                                }}
                                className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black rounded-2xl font-black transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs shadow-lg shadow-amber-500/20"
                            >
                                Registrera dig gratis idag
                            </button>
                        </div>
                    </div>

                    {/* Premium Tier */}
                    <div className="group relative overflow-hidden bg-gradient-to-br from-orange-600/10 to-transparent border border-orange-500/30 hover:border-orange-500 p-8 md:p-10 rounded-[2.5rem] transition-all duration-500 flex flex-col justify-between shadow-[0_20px_60px_rgba(249,115,22,0.1)]">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <TreePine size={120} className="text-orange-500 -rotate-6" />
                        </div>

                        <div className="space-y-6 relative z-10">
                            <div className="space-y-1">
                                <div className="flex flex-wrap justify-between items-start gap-2">
                                    <h3 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
                                        PREMIUM
                                    </h3>
                                    <div className="bg-orange-500 text-[10px] font-black px-3 py-1 rounded-full text-white uppercase tracking-widest shadow-lg shadow-orange-500/40">250 kr/mån</div>
                                </div>
                                <p className="text-orange-300 font-bold tracking-wide uppercase text-[10px]">För dig som vill växa, påverka och fördjupa din process</p>
                            </div>

                            <p className="text-slate-300 leading-relaxed text-sm md:text-base font-light">
                                Här får du tillgång till hela verktygslådan. Premium är utformat för att ge dig handlingsutrymme. Det handlar inte bara om att få stöd, utan om möjligheten att själv vara en aktiv skapare av din trygghet och din utveckling.
                            </p>

                            <ul className="space-y-4 pt-4 border-t border-orange-500/10">
                                {[
                                    { title: "Obegränsad Chat & Trådar", desc: "Skriv fritt i den offentliga tråden och få tillgång till privata trådar." },
                                    { title: "Bli din egen mötesledare", desc: "Möjlighet att (till rabatterat pris) hyra våra säkra videorum för egna grupper." },
                                    { title: "Kunskapsbanken", desc: "Fri nedladdning av arbetsblad, mallar och filer som stöttar din resa." },
                                    { title: "Förtur & Rabatter", desc: "Få förtur till workshops och event som Klätterträdet anordnar." }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 items-start">
                                        <ChevronRight size={14} className="text-orange-400 mt-1 shrink-0" />
                                        <div className="text-sm">
                                            <span className="font-bold text-white mr-1">{item.title}:</span>
                                            <span className="text-slate-400 font-light leading-relaxed">{item.desc}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="bg-orange-500/5 p-3 rounded-xl border border-orange-500/10">
                                <p className="text-orange-200/90 text-xs font-medium italic text-center">
                                    Ingen bindningstid. Investera i din egen och andras hållbarhet.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 mt-8">
                            <button
                                onClick={() => {
                                    window.location.hash = '#premium-login';
                                    setPage(Page.GEMENSKAP_APP);
                                }}
                                className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl font-black text-white transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                            >
                                Logga in <ArrowRight size={18} />
                            </button>
                            <button
                                onClick={() => setPage(Page.PREMIUM_APPLICATION)}
                                className="w-full py-4 bg-orange-500 hover:bg-orange-400 text-white rounded-2xl font-black transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs shadow-2xl shadow-orange-500/20"
                            >
                                Ansök om medlemskap
                            </button>
                            {isInstallable && (
                                <button
                                    onClick={installApp}
                                    className="bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-700/80 transition-all shadow-lg hover:shadow-xl font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 w-full"
                                >
                                    <Smartphone size={18} className="text-orange-400" /> Installera Appen
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Existing User Login Link */}
                <div className="text-center">
                    <button
                        onClick={() => {
                            window.location.hash = '#login';
                            setPage(Page.GEMENSKAP_APP);
                        }}
                        className="text-white/40 hover:text-orange-400 transition-colors text-sm font-bold flex items-center gap-2 mx-auto"
                    >
                        Redan medlem? <span className="underline underline-offset-4">Logga in här</span>
                    </button>
                </div>
            </div>



            <InstallGuideModal isOpen={showInstallModal} onClose={() => setShowInstallModal(false)} />
        </div>
    );
};

export default LoginPage;
