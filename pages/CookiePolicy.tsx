import React from 'react';
import { Page } from '../types';
import { ArrowLeft, ShieldCheck, Info, Eye, Shield, Lock, Clock, Mail } from 'lucide-react';

interface CookiePolicyProps {
    setPage: (page: Page) => void;
}

const CookiePolicy: React.FC<CookiePolicyProps> = ({ setPage }) => {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 animate-fade-in max-w-4xl">
            <button
                onClick={() => setPage(Page.HOME)}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Tillbaka
            </button>

            <div className="space-y-12">
                {/* Header Section */}
                <div className="glass bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500/10 to-transparent pointer-events-none"></div>
                    <div className="relative z-10 space-y-6">
                        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">Din data, ditt val</h1>
                        <h2 className="text-2xl md:text-3xl font-light text-amber-200/80 italic">– Vår Cookiepolicy</h2>
                        <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">
                                <ShieldCheck size={24} />
                            </div>
                            <p className="text-slate-300 font-medium">Transparens och samtycke är våra grundstenar.</p>
                        </div>
                    </div>
                </div>

                {/* Intro from Billy */}
                <div className="space-y-6 text-lg text-slate-300 leading-relaxed font-light">
                    <p>
                        Precis som i våra utbildningar och i terapirummet är transparens och samtycke grundstenar i vår verksamhet. Vi vill att du ska känna dig trygg med hur vi hanterar information om dig när du besöker oss digitalt.
                    </p>
                </div>

                {/* Content Sections */}
                <div className="space-y-16">
                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Info className="text-amber-500" />
                            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Vad är en Cookie?</h3>
                        </div>
                        <p className="text-slate-400">
                            En cookie är en liten textfil som sparas på din enhet (dator eller mobil). Man kan se det som ett litet digitalt minne som hjälper hemsidan att komma ihåg dina val. Det finns dock olika typer av "minnen", och vi skiljer noga på dem:
                        </p>
                    </section>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="glass bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6">
                                <Shield size={24} />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-4">1. Nödvändiga Cookies</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Dessa är hemsidans <strong>"autonoma nervsystem"</strong>. Utan dessa fungerar inte sidan. De håller koll på grundläggande funktioner, som säkerhet eller vad du lagt i varukorgen om du bokar en utbildning.
                            </p>
                        </div>

                        <div className="glass bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors">
                            <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-400 mb-6">
                                <Eye size={24} />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-4">2. Funktions- & Analyscookies</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Dessa använder vi för att se hur besökare rör sig på sidan, så att vi kan förbättra vårt innehåll och våra tjänster. Det handlar om att förstå mönster – lite som vi kartlägger mönster i Self-care modellen.
                            </p>
                        </div>
                    </div>

                    <section className="glass bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-[2.5rem] p-8 md:p-12 space-y-8">
                        <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Ditt samtycke är "Frivilligt, Specifikt och Otvetydigt"</h3>
                        <div className="grid gap-6 text-slate-300 text-sm">
                            <div className="flex gap-4">
                                <Lock className="text-amber-500 shrink-0" size={20} />
                                <p><strong>Inget antagande:</strong> Vi spårar inget (förutom de strikt nödvändiga) förrän du aktivt klickat "OK".</p>
                            </div>
                            <div className="flex gap-4">
                                <Clock className="text-amber-500 shrink-0" size={20} />
                                <p><strong>Du kan ändra dig:</strong> Du kan när som helst dra tillbaka ditt samtycke via inställningarna. Det är en del av din Self-care att sätta gränser.</p>
                            </div>
                        </div>
                    </section>

                    <section className="text-center space-y-4">
                        <p className="text-slate-400 text-sm">Frågor? Maila Billy Ljungberg direkt på:</p>
                        <a href="mailto:billy@klattertradet.se" className="text-orange-400 font-bold hover:underline">billy@klattertradet.se</a>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CookiePolicy;
