import React from 'react';
import { Page } from '../public/types';
import { ArrowLeft, ShieldCheck, Heart, Info, Anchor, Users, Brain, Zap, Gem, Lock } from 'lucide-react';

interface TermsProps {
    setPage: (page: Page) => void;
}

const Terms: React.FC<TermsProps> = ({ setPage }) => {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 animate-fade-in max-w-4xl space-y-16">
            <button
                onClick={() => setPage(Page.HOME)}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Tillbaka
            </button>

            {/* Hero Section */}
            <div className="glass bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none"></div>
                <div className="relative z-10 space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">Medlemsvillkor</h1>
                    <h2 className="text-2xl md:text-3xl font-light text-blue-200/80 italic">Horizonten Gemenskap</h2>
                </div>
            </div>

            {/* Main Content */}
            <div className="space-y-12">

                {/* Section 1 & 2 */}
                <section className="space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                            <Anchor size={24} />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">1. Din digitala trygga hamn</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Genom att klicka på ”Jag godkänner” kliver du in i en gemenskap som drivs av Klätterträdet AB och Horizonten. Vi är glada att du är här. Dessa villkor finns till för att skydda din och gruppens integritet – en förutsättning för verklig återhämtning.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0">
                            <Heart size={24} />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">2. Syftet: En plats för läkning och stöd</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Denna chatt är en mötesplats för vårdnadshavare och individer som söker stöd och gemenskap. Vi vet att ensamhet är ett av våra största grundsår. Här motverkar vi det genom äkta kontakt och igenkänning.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 3 & 4 */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="glass bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                        <div className="flex items-center gap-3 text-amber-400">
                            <ShieldCheck size={24} />
                            <h3 className="text-xl font-bold">3. Identitet & Säkerhet</h3>
                        </div>
                        <ul className="space-y-4 text-sm text-slate-400 leading-relaxed">
                            <li><strong className="text-white">Äkthet:</strong> Du registrerar dig med BankID för att skapa en säker miljö fri från troll. Trygghet börjar med transparens.</li>
                            <li><strong className="text-white">En vuxen, ett konto:</strong> Delade konton tillåts inte. Detta är din plats för återhämtning.</li>
                        </ul>
                    </div>

                    <div className="glass bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                        <div className="flex items-center gap-3 text-green-400">
                            <Users size={24} />
                            <h3 className="text-xl font-bold">4. Vår gemensamma trygghet</h3>
                        </div>
                        <ul className="space-y-4 text-sm text-slate-400 leading-relaxed">
                            <li><strong className="text-white">Respekt:</strong> Kränkningar eller hot aktiverar hot-systemet hos andra och leder till omedelbar uteslutning.</li>
                            <li><strong className="text-white">Integritet:</strong> Dela aldrig bilder på andras barn eller skärmdumpa. Det som sägs i rummet stannar där.</li>
                            <li><strong className="text-white">Reklamfritt:</strong> Vi är här för mänsklig kontakt, inte försäljning.</li>
                        </ul>
                    </div>
                </div>

                {/* Section 5, 6, 7 */}
                <section className="space-y-12">
                    <div className="glass bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-[2.5rem] p-8 md:p-12 space-y-6">
                        <div className="flex items-center gap-3">
                            <Brain className="text-blue-400" />
                            <h3 className="text-2xl font-bold text-white">5. Reglering av gruppen (Moderering)</h3>
                        </div>
                        <p className="text-slate-300 leading-relaxed">
                            Våra moderatorer fungerar som gruppens <strong>"prefrontala cortex"</strong>. De hjälper till att hålla ordning och sänka stressnivån. Om någon agerar på ett sätt som skadar gruppens trygghet kan vi behöva pausa kontot. Detta är en nödvändig gränsdragning för kollektivets bästa.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h4 className="text-xl font-bold text-white flex items-center gap-2">
                                <Lock size={20} className="text-orange-400" /> 6. Sekretess & Data
                            </h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Vi skyddar dina uppgifter stenhårt (GDPR). Många här har erfarenhet av myndighetsinducerat trauma – därför är din datahelgd vår högsta prioritet.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xl font-bold text-white flex items-center gap-2">
                                <Info size={20} className="text-blue-400" /> 7. Ansvarsfriskrivning
                            </h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Horizonten är en stödjande gemenskap, inte klinisk terapi. Vid behov av professionell traumabehandling hänvisar vi till vår mottagning.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Premium Section */}
                <div className="pt-16 border-t border-white/10">
                    <div className="glass bg-gradient-to-tr from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
                        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
                        <div className="relative z-10 space-y-8">
                            <div className="inline-block px-4 py-1 bg-amber-500/20 rounded-full border border-amber-500/30 text-amber-500 text-xs font-black uppercase tracking-widest">
                                Uppgradera din upplevelse
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white">HORIZONTEN PREMIUM</h2>
                            <p className="text-xl text-amber-200/90 font-light italic">– Investera i din hållbarhet</p>

                            <div className="space-y-6 text-slate-300 leading-relaxed">
                                <p>
                                    Varför bli betalande medlem? Den fria chatten ger dig gemenskapen. Premium-medlemskapet ger dig verktygen för förändring. Min vision med Horizonten är att demokratisera kunskapen om hur vi fungerar.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6 pt-6">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-3">
                                    <div className="flex items-center gap-2 font-bold text-white"><Zap size={18} className="text-amber-400" /> Fördjupning</div>
                                    <p className="text-xs text-slate-400">Exklusivt material om traumateori och bottom-up-metoder.</p>
                                </div>
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-3">
                                    <div className="flex items-center gap-2 font-bold text-white"><Gem size={18} className="text-amber-400" /> Förmåner</div>
                                    <p className="text-xs text-slate-400">Rabatter på utbildningar och förtur till nya funktioner.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
