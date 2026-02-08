import React, { useState } from 'react';
import { Mail, Phone, User, Send, CheckCircle2, ArrowLeft, Lock, Loader2 } from 'lucide-react';
import { Page } from '../types';
import { supabase } from '../gemenskap/services/supabase';

interface PremiumApplicationProps {
    setPage: (page: Page) => void;
}

const PremiumApplication: React.FC<PremiumApplicationProps> = ({ setPage }) => {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        reason: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    emailRedirectTo: window.location.origin,
                    data: {
                        full_name: formData.name,
                        phone: formData.phone,
                        application_reason: formData.reason,
                        membership_level: 2, // Default to premium level since it's free now
                        role: 'medlem',
                        membership_active: true
                    }
                }
            });

            if (signUpError) throw signUpError;

            // If signup successful, show success screen
            if (data.user) {
                setSubmitted(true);
            }

        } catch (err: any) {
            console.error('Signup error:', err);
            setError(err.message || 'Ett fel uppstod vid registreringen. Försök igen.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

                    <h2 className="text-3xl font-bold text-white mb-4">Välkommen till Gemenskapen!</h2>
                    <p className="text-zinc-400 mb-10 leading-relaxed text-lg">
                        Ditt konto har skapats. Vi har skickat ett verifieringsmail till <span className="text-white font-bold">{formData.email}</span>.
                    </p>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-10 text-left space-y-4">
                        <h3 className="text-white font-bold text-center">Nästa steg</h3>
                        <ol className="list-decimal pl-5 space-y-3 text-zinc-300 text-sm">
                            <li>Öppna din e-postkorg.</li>
                            <li>Klicka på länken i mailet från oss.</li>
                            <li>När du verifierat din e-post kan du logga in direkt.</li>
                        </ol>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => {
                                window.location.hash = '#login';
                                setPage(Page.GEMENSKAP_APP);
                            }}
                            className="w-full py-4 bg-orange-500 hover:bg-orange-400 text-black font-bold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-orange-500/20"
                        >
                            Till inloggningen
                        </button>
                    </div>
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
                        <h1 className="text-4xl font-bold text-white mb-4">Bli medlem i Gemenskapen</h1>
                        <p className="text-zinc-400 text-lg">
                            Just nu är det kostnadsfritt att gå med. Fyll i dina uppgifter nedan för att skapa ditt konto.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-200 text-sm">
                                {error}
                            </div>
                        )}

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
                                <label className="text-sm font-medium text-zinc-300 ml-1">Lösenord</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                    <input
                                        required
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Välj ett starkt lösenord"
                                        minLength={6}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300 ml-1">Varför vill du gå med?</label>
                            <textarea
                                required
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                placeholder="Berätta lite kort om dig själv..."
                                rows={3}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-medium resize-none"
                            />
                        </div>

                        {/* Terms and Conditions */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                            <h3 className="text-white font-bold text-sm">Medlemsvillkor</h3>
                            <div className="text-xs text-zinc-400 leading-relaxed space-y-2 max-h-32 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
                                <p>Genom att skapa ett konto godkänner du följande:</p>
                                <ul className="list-disc pl-4 space-y-1">
                                    <li>Vi sparar dina uppgifter för att administrera ditt medlemskap.</li>
                                    <li>Du måste verifiera din e-postadress för att kunna logga in.</li>
                                    <li>Respektfullt bemötande är ett krav för fortsatt medlemskap.</li>
                                    <li>Innehåll i gemenskapen får ej spridas vidare.</li>
                                </ul>
                            </div>
                            <label className="flex items-start gap-3 cursor-pointer group pt-2">
                                <input
                                    required
                                    type="checkbox"
                                    className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-orange-500 focus:ring-orange-500 focus:ring-offset-0"
                                />
                                <span className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                                    Jag godkänner medlemsvillkoren.
                                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/50 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-3 text-lg group active:scale-95 shadow-[0_10px_30px_rgba(245,158,11,0.2)]"
                        >
                            {loading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    Skapa konto
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PremiumApplication;
