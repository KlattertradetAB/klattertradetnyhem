import React from 'react';
import { Heart, Shield, Users, ArrowRight } from 'lucide-react';

const Welcome: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Hero Section */}
            <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center p-3 bg-orange-500/10 rounded-full border border-orange-500/20 mb-4">
                    <Heart className="text-orange-500 animate-pulse" size={32} />
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                    Välkommen hem till <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-200 to-white">
                        Horizonten Gemenskap
                    </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 font-medium italic">
                    Vad fint att du hittat hit.
                </p>
            </div>

            {/* Main Content Glass Card */}
            <div className="glass bg-slate-900/50 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:bg-orange-500/10 transition-colors duration-700"></div>

                <div className="relative z-10 space-y-8 text-slate-300 leading-relaxed text-lg font-light">
                    <p>
                        Du har just klivit in i ett digitalt rum som är byggt med en enda avsikt: <span className="text-white font-semibold">Att minska avståndet mellan människor</span>.
                        Vi vet, utifrån både erfarenhet och neurobiologi, att ensamhet är farligt för oss, medan kontakt är förutsättningen för all läkning och utveckling.
                    </p>

                    <p>
                        Horizonten Gemenskap är hjärtat i samarbetet mellan <span className="text-orange-400 font-bold">Klätterträdet, Socialkraft och Twisted-stacks</span>.
                        Vi har gått samman för att vi delar en vision: Psykisk hälsa och mänskligt stöd ska vara tillgängligt för alla.
                        Det ska inte vara krångligt, det ska inte kosta en förmögenhet, och du ska inte behöva vänta i en telefonkö för att känna att någon lyssnar.
                    </p>
                </div>
            </div>

            {/* What is this place? */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Users className="text-orange-500" size={28} />
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
                <div className="bg-gradient-to-br from-orange-500/20 to-transparent p-8 rounded-[2rem] border border-orange-500/20">
                    <h3 className="text-orange-400 font-black uppercase tracking-widest text-xs mb-6">Tre pelare</h3>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="shrink-0 w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white font-bold">1</div>
                            <div>
                                <h4 className="text-white font-bold mb-1 text-sm">Tillgänglighet</h4>
                                <p className="text-xs text-slate-500 leading-relaxed">Stödet finns i fickan. Dygnet runt. Du behöver inte prestera här, du kan bara vara.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="shrink-0 w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white font-bold">2</div>
                            <div>
                                <h4 className="text-white font-bold mb-1 text-sm">Gratis stöd</h4>
                                <p className="text-xs text-slate-500 leading-relaxed">Vi tror på kraften i att dela erfarenheter. I de öppna forumen hjälps vi åt, stöttar och speglar varandra.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="shrink-0 w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white font-bold">3</div>
                            <div>
                                <h4 className="text-white font-bold mb-1 text-sm">Kontakt</h4>
                                <p className="text-xs text-slate-500 leading-relaxed">Läkning sker "bottom up" – från kroppen, via känslan och in i relationen. Här får du utrymme att dela din berättelse.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* To those who are new */}
            <div className="glass bg-white/5 border border-white/10 p-10 rounded-[3rem] text-center space-y-6">
                <h2 className="text-2xl font-bold text-white">Till dig som är ny</h2>
                <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Känn in rummet. Du behöver inte skriva något direkt om du inte vill. Det är okej att bara "vara med" och observera.
                    Det kallas att <span className="text-orange-400">samreglera</span>, och det är första steget till trygghet.
                </p>
                <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    När du känner dig redo – skriv gärna en rad i presentationstråden. Vi vill gärna veta vem du är, men på dina villkor.
                </p>
                <div className="pt-6">
                    <p className="text-xl font-bold text-white italic">Varmt välkommen</p>
                </div>
            </div>

            <div className="h-20"></div>
        </div>
    );
};

export default Welcome;
