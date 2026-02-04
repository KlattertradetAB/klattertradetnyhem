import React from 'react';
import { Page } from '../types';
import { ArrowLeft, ShieldCheck, Lock, Database, UserCheck, Scale, Mail, Info } from 'lucide-react';

interface PrivacyPolicyProps {
    setPage: (page: Page) => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ setPage }) => {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 animate-fade-in max-w-4xl space-y-16">
            <button
                onClick={() => setPage(Page.HOME)}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Tillbaka
            </button>

            {/* Header */}
            <div className="glass bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-500/10 to-transparent pointer-events-none"></div>
                <div className="relative z-10 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Integritetspolicy</h1>
                    <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">Senast uppdaterad: 22/1-2026</p>
                    <div className="pt-6 border-t border-white/10">
                        <p className="text-slate-300 font-bold">Personuppgiftsansvarig: Klätterträdet AB (Org. nr: 559267-4732)</p>
                    </div>
                </div>
            </div>

            {/* Main Content Sections */}
            <div className="space-y-12">

                <section className="space-y-6">
                    <div className="flex items-center gap-3 text-orange-400">
                        <ShieldCheck size={28} />
                        <h3 className="text-2xl font-bold text-white uppercase tracking-tight">1. Vårt löfte till dig</h3>
                    </div>
                    <p className="text-slate-300 text-lg leading-relaxed font-light italic">
                        "För att du ska våga vara sårbar och dela dina erfarenheter krävs det att du vet exakt var dina ord tar vägen. Vi ser dina personuppgifter som en förlängning av din personliga integritet."
                    </p>
                    <p className="text-slate-400 leading-relaxed">
                        Vi säljer aldrig dina uppgifter. Vi delar dem inte med tredje part för marknadsföring. Din data stannar i vår "trygga hamn".
                    </p>
                </section>

                <section className="glass bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 space-y-8">
                    <div className="flex items-center gap-3 text-blue-400">
                        <Database size={24} />
                        <h3 className="text-xl font-bold text-white uppercase tracking-tight">2. Vilka uppgifter samlar vi in och varför?</h3>
                    </div>
                    <div className="grid gap-6">
                        <div className="space-y-2">
                            <h4 className="text-white font-bold">Identifikation (BankID)</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">Vi lagrar inte ditt personnummer synligt för andra, men vi använder BankID vid registrering för att verifiera att du är en verklig person. Detta skyddar communityt från troll och falska profiler.</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-white font-bold">Användargenererat innehåll</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">Det du skriver i chatten och forumet sparas på säkra servrar för att tjänsten ska fungera.</p>
                        </div>
                    </div>
                </section>

                <section className="space-y-8">
                    <div className="flex items-center gap-3 text-green-400">
                        <Lock size={24} />
                        <h3 className="text-xl font-bold text-white uppercase tracking-tight">3. Hur skyddas din information?</h3>
                    </div>
                    <p className="text-slate-300 leading-relaxed font-light">
                        All trafik mellan din telefon/dator och våra servrar är krypterad (SSL/TLS). Vi använder moderna databaser med hög säkerhetsklassning (AES-256 kryptering vid vila).
                    </p>
                </section>

                <section className="glass bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 text-orange-400">
                        <Scale size={24} />
                        <h3 className="text-xl font-bold text-white uppercase tracking-tight">4. Skillnad på Chat och Journal</h3>
                    </div>
                    <div className="space-y-4 text-slate-300">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                            <p><strong>Chatten/Appen:</strong> Det du skriver i Horizonten-appen räknas inte som hälso- och sjukvårdsjournal. Det är ett medlemsforum.</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                            <p><strong>Terapi hos Klätterträdet:</strong> Om du går i enskild terapi förs lagstadgad patientjournal i ett helt separat, säkert system (enligt Patientdatalagen). Dessa två system är åtskilda.</p>
                        </div>
                    </div>
                </section>

                <section className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h4 className="text-white font-bold flex items-center gap-2 tracking-tight uppercase text-sm"><UserCheck size={18} className="text-blue-400" /> 6. Dina rättigheter (GDPR)</h4>
                        <ul className="text-slate-400 text-xs space-y-2 leading-relaxed">
                            <li>• Få ett utdrag på all data vi har om dig.</li>
                            <li>• Begära rättelse av felaktiga uppgifter.</li>
                            <li>• Begära att bli helt raderad ("Rätten att bli bortglömd").</li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-white font-bold flex items-center gap-2 tracking-tight uppercase text-sm"><Mail size={18} className="text-orange-400" /> 7. Kontakt</h4>
                        <p className="text-slate-400 text-xs leading-relaxed">
                            Klätterträdet AB<br />
                            Gullregnsgatan 9A, Gävle<br />
                            E-post: billy@klattertradet.se
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
