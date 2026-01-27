import React, { useState } from 'react';
import { Mail, Phone, User, Send, CheckCircle2, ArrowLeft, CreditCard } from 'lucide-react';
import { Page } from '../public/types';

interface PremiumApplicationProps {
    setPage: (page: Page) => void;
}

const PremiumApplication: React.FC<PremiumApplicationProps> = ({ setPage }) => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        reason: '',
        paymentInterval: 'monthly',
        paymentMethod: 'swish'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // In a real app, this would send to a server. 
        // For now, we simulate success and provide instructions or use mailto if desired.
        // The user requested data to be sent to billy@klattertradet.se

        const subject = encodeURIComponent(`Ansökan om Premium Medlemskap: ${formData.name}`);
        const body = encodeURIComponent(
            `Namn: ${formData.name}\n` +
            `E-post: ${formData.email}\n` +
            `Telefon: ${formData.phone}\n` +
            `Betalningsintervall: ${formData.paymentInterval === 'monthly' ? 'Månadsvis (250 kr/mån)' : 'Årsvis (2500 kr/år)'}\n\n` +
            `Motivering/Bakgrund:\n${formData.reason}`
        );

        // We can trigger mailto or just show success. 
        // Showing success is cleaner for UX, but mailto ensures the data reaches the destination if no backend.
        window.location.href = `mailto:billy@klattertradet.se?subject=${subject}&body=${body}`;

        setSubmitted(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (submitted) {
        return (
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="max-w-xl w-full glass-card p-10 md:p-14 text-center animate-in fade-in zoom-in duration-500 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 to-orange-600"></div>

                    <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(245,158,11,0.2)]">
                        <CheckCircle2 className="w-10 h-10 text-amber-500" />
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-4">Ansökan mottagen!</h2>
                    <p className="text-zinc-400 mb-10 leading-relaxed text-lg">
                        För att slutföra din ansökan och få tillgång till gemenskapen behöver vi din betalning.
                        (Under testperioden är detta steg <span className="text-orange-500 font-bold uppercase tracking-widest">valfritt</span>).
                    </p>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-10 text-left space-y-6">
                        <h3 className="text-white font-black uppercase tracking-widest text-xs text-center border-b border-white/10 pb-4">Betalningsinstruktioner</h3>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center group">
                                <span className="text-zinc-500 text-sm">Belopp att betala:</span>
                                <span className="text-white font-bold text-xl">{formData.paymentInterval === 'monthly' ? '250 kr' : '2500 kr'}</span>
                            </div>

                            <div className="space-y-4 pt-2">
                                <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-orange-500 text-[10px] font-black uppercase tracking-wider mb-1">Swish</span>
                                        <span className="text-white font-mono font-bold text-lg tracking-wider">123 456 78 90</span>
                                    </div>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Swish_Logo.svg/1200px-Swish_Logo.svg.png" alt="Swish" className="w-10 h-10 object-contain" />
                                </div>

                                <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-zinc-500 text-[10px] font-black uppercase tracking-wider mb-1">Bankgiro</span>
                                        <span className="text-white font-mono font-bold text-lg tracking-wider">XXXX-XXXX</span>
                                    </div>
                                    <div className="w-10 h-10 flex items-center justify-center">
                                        <CreditCard className="text-zinc-500" />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10">
                                <p className="text-zinc-500 text-[11px] leading-relaxed">
                                    <span className="text-white font-bold">Viktigt:</span> Ange ditt fullständiga namn ({formData.name}) som meddelande vid betalning så att vi kan koppla den till din ansökan.
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="text-zinc-500 text-sm mb-10">
                        Ett bekräftelsemejl har skickats till <span className="text-white">{formData.email}</span>.
                        När betalningen registrerats (vanligtvis inom 24h) skickas dina inloggningsuppgifter.
                    </p>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => {
                                window.location.hash = '#login';
                                setPage(Page.GEMENSKAP_APP);
                            }}
                            className="w-full py-4 bg-orange-500 hover:bg-orange-400 text-black font-bold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-orange-500/20"
                        >
                            Logga in direkt (Testläge - ingen betalning krävs)
                        </button>
                        <button
                            onClick={() => setPage(Page.HOME)}
                            className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all active:scale-[0.98]"
                        >
                            Tillbaka till startsidan
                        </button>
                    </div>
                    <p className="text-[10px] text-zinc-600 mt-6 italic">Frågor? Kontakta oss på billy@klattertradet.se</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 py-24 px-6">
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={() => setPage(Page.LOGIN)}
                    className="flex items-center gap-2 text-zinc-500 hover:text-amber-500 transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Tillbaka
                </button>

                <div className="glass-card p-8 md:p-12">
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold text-white mb-4">Ansök om Premium Medlemskap</h1>
                        <p className="text-zinc-400 text-lg">
                            Fyll i formuläret nedan för att påbörja din ansökan. Vi granskar alla medlemskap manuellt för att säkerställa kvaliteten i vår community.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300 ml-1">Fullständigt namn</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Ditt namn"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300 ml-1">E-postadress</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="din.epost@exempel.se"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300 ml-1">Telefonnummer</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                    <input
                                        required
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="070-000 00 00"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300 ml-1">Önskad betalningsplan</label>
                                <div className="relative">
                                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                    <select
                                        name="paymentInterval"
                                        value={formData.paymentInterval}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-medium cursor-pointer"
                                    >
                                        <option value="monthly">250 kr / månad</option>
                                        <option value="yearly">2500 kr / år (Spara 500 kr)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300 ml-1">Varför vill du gå med i Premium?</label>
                            <textarea
                                required
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                placeholder="Berätta lite kort om dig själv och vad du hoppas få ut av gemenskapen..."
                                rows={5}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-medium resize-none"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-medium text-zinc-300 ml-1">Välj betalsätt</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <label className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${formData.paymentMethod === 'swish' ? 'bg-orange-500/10 border-orange-500' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="swish"
                                        checked={formData.paymentMethod === 'swish'}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === 'swish' ? 'border-orange-500' : 'border-zinc-600'}`}>
                                        {formData.paymentMethod === 'swish' && <div className="w-2.5 h-2.5 bg-orange-500 rounded-full" />}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-white text-sm">Swish</span>
                                        <span className="text-[10px] text-zinc-500 uppercase font-black">Direktbetalning</span>
                                    </div>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Swish_Logo.svg/1200px-Swish_Logo.svg.png" alt="Swish" className="w-8 h-8 ml-auto object-contain" />
                                </label>

                                <label className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${formData.paymentMethod === 'card' ? 'bg-orange-500/10 border-orange-500' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="card"
                                        checked={formData.paymentMethod === 'card'}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === 'card' ? 'border-orange-500' : 'border-zinc-600'}`}>
                                        {formData.paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-orange-500 rounded-full" />}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-white text-sm">Kort</span>
                                        <span className="text-[10px] text-zinc-500 uppercase font-black">Visa / Mastercard</span>
                                    </div>
                                    <div className="flex gap-1 ml-auto">
                                        <CreditCard size={20} className="text-zinc-400" />
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                            <h3 className="text-white font-bold text-sm">Betalnings- och medlemsvillkor</h3>
                            <div className="text-xs text-zinc-400 leading-relaxed space-y-2 max-h-32 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
                                <p>Genom att slutföra ansökan och betalning godkänner du följande villkor:</p>
                                <ul className="list-disc pl-4 space-y-1">
                                    <li>Medlemskapet aktiveras så snart betalningen har registrerats och din profil har verifierats manuellt.</li>
                                    <li>Betalning sker i förskott och förnyas automatiskt enligt valt intervall (månad/år).</li>
                                    <li>Du kan när som helst säga upp ditt medlemskap via dina inställningar. Ingen återbetalning sker för påbörjad period.</li>
                                    <li>Innehåll i gemenskapen är skyddat och får inte spridas utanför plattformen.</li>
                                    <li>Respektfullt bemötande är ett krav för fortsatt medlemskap.</li>
                                </ul>
                            </div>
                            <label className="flex items-start gap-3 cursor-pointer group pt-2">
                                <input
                                    required
                                    type="checkbox"
                                    className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-orange-500 focus:ring-orange-500 focus:ring-offset-0"
                                />
                                <span className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                                    Jag godkänner betalningsvillkoren och bekräftar att jag förstår att tillgång till gemenskapen kräver genomförd betalning.
                                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-3 text-lg group active:scale-95 shadow-[0_10px_30px_rgba(245,158,11,0.2)]"
                        >
                            <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            Gå vidare till betalning
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PremiumApplication;
