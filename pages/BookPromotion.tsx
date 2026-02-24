import React from 'react';
import { Page } from '../types';
import { BookOpen, CheckCircle, Smartphone, ArrowRight, Shield, Award, Users } from 'lucide-react';

interface BookPromotionProps {
    setPage: (page: Page) => void;
}

const BookPromotion: React.FC<BookPromotionProps> = ({ setPage }) => {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 animate-fade-in space-y-24">
            {/* Hero Section */}
            <section className="glass bg-white/10 backdrop-blur-md border border-white/20 rounded-[3rem] p-8 md:p-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none"></div>
                <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-block px-4 py-1 bg-amber-500/20 rounded-full border border-amber-500/30 text-amber-500 text-xs font-black uppercase tracking-widest">
                            Nyutgiven Bok
                        </div>
                        <h1 className="text-4xl md:text-7xl font-bold leading-tight text-white">
                            Myndighetsinducerat trauma <br />
                            <span className="text-2xl md:text-4xl font-light text-amber-200/80 block mt-4">
                                – från subjekt till objekt
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
                            Vår nyutgivna bok är en djupdykning i hur systemet kan skada och hur vi kan läka.
                            Men boken är mer än bara text – den är en guide till din återhämtning.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <button
                                onClick={() => setPage(Page.CHECKOUT)}
                                className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-2xl font-black transition-all hover:scale-105 shadow-2xl shadow-amber-500/20 flex items-center gap-2"
                            >
                                Beställ boken här <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                    <div className="hidden lg:flex justify-end">
                        <div className="relative w-80 h-96">
                            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent rounded-[2rem] blur-3xl animate-pulse"></div>
                            <div className="relative glass bg-white/5 border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-all duration-500">
                                <img
                                    src="/booklet.jpeg"
                                    alt="Bokomslag"
                                    className="w-full h-full object-contain p-4"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* App Highlight */}
            <section className="glass bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-[2.5rem] p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 shrink-0">
                        <Smartphone size={32} />
                    </div>
                    <blockquote className="text-xl md:text-2xl font-medium text-blue-100/90 italic leading-relaxed">
                        "Tillhörande boken finns en stor mängd självhjälpsmaterial och praktiska övningar i appen,
                        skapade för att ge dig verktygen att navigera i din egen läkningsprocess."
                    </blockquote>
                </div>
            </section>

            {/* Book Content */}
            <section className="grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-8">
                    <h2 className="text-3xl md:text-5xl font-bold text-white">Vad innehåller boken?</h2>
                    <div className="grid gap-6">
                        {[
                            { title: "Neurobiologisk förståelse", text: "Hur kroppen och nervsystemet reagerar på strukturellt svek." },
                            { title: "Self-care modellen", text: "Praktiska verktyg för självreglering och läkning." },
                            { title: "Fallstudier", text: "Verkliga berättelser från människor som navigerat systemet." },
                            { title: "Praktiska övningar", text: "Steg-för-steg-guider för bearbetning och återhämtning." },
                            { title: "Från subjekt till objekt", text: "Vad är systemdriven objektifiering och vad säger forskningen?" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4 group">
                                <div className="p-1 mt-1">
                                    <CheckCircle className="text-amber-500 w-6 h-6" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors uppercase tracking-tight">{item.title}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 space-y-8">
                    <h2 className="text-3xl md:text-5xl font-bold text-white">För vem är boken?</h2>
                    <div className="space-y-6 text-zinc-300 leading-relaxed text-lg">
                        <p>
                            Denna bok vänder sig till dig som har upplevt att mötet med myndigheter blivit mer skadligt än hjälpsamt.
                        </p>
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                            <p className="text-white/90 font-medium">
                                Men den är också ovärderlig för professionella – <span className="text-amber-400">socialsekreterare, terapeuter, behandlingspedagoger</span> –
                                som vill förstå och bemöta myndighetsinducerat trauma med större medvetenhet och empati.
                            </p>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/10">
                        <div className="flex items-center gap-4 text-zinc-400">
                            <Shield className="text-amber-500/50" />
                            <p className="text-sm italic">Baserad på mångårig forskning och praktisk erfarenhet inom TMO.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section - New Refined Template */}
            <section className="relative isolate bg-transparent px-6 py-24 sm:py-32 lg:px-8">
                {/* Background Glow */}
                <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
                    <div
                        style={{
                            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
                        }}
                        className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-amber-500 to-amber-700 opacity-20"
                    ></div>
                </div>

                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-base/7 font-semibold text-amber-500 uppercase tracking-widest">Prissättning</h2>
                    <p className="mt-2 text-balance text-5xl font-bold tracking-tight text-white sm:text-6xl">Välj rätt format för dig</p>
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-zinc-400 sm:text-xl/8">
                    Hitta det alternativ som passar bäst för ditt sätt att läsa och ta till dig kunskapen.
                </p>

                <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
                    {/* Basic Tier -> Online Access */}
                    <div className="rounded-3xl rounded-t-3xl bg-white/5 p-8 ring-1 ring-white/10 sm:mx-8 sm:rounded-b-none sm:p-10 lg:mx-0 lg:rounded-bl-3xl lg:rounded-tr-none backdrop-blur-md">
                        <h3 id="tier-online" className="text-base/7 font-semibold text-amber-500 uppercase tracking-widest italic">Digital läsning</h3>
                        <p className="mt-4 flex items-baseline gap-x-2">
                            <span className="text-5xl font-bold tracking-tight text-white">150:-</span>
                        </p>
                        <p className="mt-6 text-base font-bold text-white uppercase tracking-tight">Få tillgång till- och läs din e-bok online</p>
                        <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
                            Genom att läsa boken online på vår hemsida får du direkt tillgång till innehållet utan att behöva hantera filer. Det är ett miljövänligt och smidigt sätt att ta del av materialet på valfri skärm, samtidigt som du sparar utrymme på din enhet.
                        </p>
                        <ul role="list" className="mt-8 space-y-3 text-sm/6 text-zinc-300 sm:mt-10">
                            {[
                                "Läs direkt i webbläsaren",
                                "Spara bokmärken automatiskt",
                                "Ingen nedladdning krävs",
                                "Alltid senaste versionen"
                            ].map((feature) => (
                                <li key={feature} className="flex gap-x-3">
                                    <CheckCircle className="h-6 w-5 flex-none text-amber-500" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => setPage(Page.CHECKOUT)}
                            className="mt-8 block w-full rounded-2xl px-3.5 py-2.5 text-center text-sm font-black text-white ring-1 ring-inset ring-white/20 hover:bg-white/10 transition-all hover:scale-105 sm:mt-10"
                        >
                            Välj Online-läsning
                        </button>
                    </div>

                    {/* Featured Tier -> Full Download */}
                    <div className="relative rounded-3xl bg-amber-500/10 p-8 shadow-2xl ring-2 ring-amber-500/50 sm:p-10 backdrop-blur-xl lg:scale-105 lg:z-10">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 rounded-full text-[10px] font-black uppercase text-slate-950 tracking-tighter">
                            Mest flexibel
                        </div>
                        <h3 id="tier-full" className="text-base/7 font-semibold text-amber-400 uppercase tracking-widest italic">Komplett ägandeskap</h3>
                        <p className="mt-4 flex items-baseline gap-x-2">
                            <span className="text-5xl font-bold tracking-tight text-white">200:-</span>
                        </p>
                        <p className="mt-6 text-base font-bold text-white uppercase tracking-tight">Få tillgång till boken som e-pub eller pdf på den enhet du känner känns lämpligast</p>
                        <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
                            Väljer du detta alternativ får du filerna skickade till dig så att du kan läsa boken i din favorit-app för e-böcker, på din Kindle, eller skriva ut delar som du vill ha fysiskt. Du äger din kopia offline och kan läsa den helt utan internetuppkoppling.
                        </p>
                        <ul role="list" className="mt-8 space-y-3 text-sm/6 text-zinc-300 sm:mt-10">
                            {[
                                "Nedladdningsbar PDF & ePub",
                                "Läs offline på Kindle/iPad/Mobil",
                                "Skriv ut kapitel vid behov",
                                "Ingen inloggning krävs efter köp"
                            ].map((feature) => (
                                <li key={feature} className="flex gap-x-3">
                                    <CheckCircle className="h-6 w-5 flex-none text-amber-400" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => setPage(Page.CHECKOUT)}
                            className="mt-8 block w-full rounded-2xl bg-amber-500 px-3.5 py-3.5 text-center text-sm font-black text-slate-950 shadow-xl shadow-amber-500/20 hover:bg-amber-400 transition-all hover:scale-105 sm:mt-10"
                        >
                            Beställ Full tillgång
                        </button>
                    </div>
                </div>
            </section>

            {/* Call to Order */}
            <section className="text-center py-12">
                <div className="max-w-3xl mx-auto space-y-8">
                    <div className="p-8 glass bg-white/5 border border-white/10 rounded-[2.5rem]">
                        <p className="text-xl text-amber-200 font-bold mb-6">Släpps inom en snar framtid – säkra ditt exemplar nu.</p>
                        <button
                            onClick={() => setPage(Page.CHECKOUT)}
                            className="inline-block bg-amber-500 hover:bg-amber-400 text-slate-950 px-12 py-5 rounded-2xl text-xl font-black transition-all hover:scale-105 shadow-2xl shadow-amber-500/20"
                        >
                            Förhandsbeställ boken här
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BookPromotion;
