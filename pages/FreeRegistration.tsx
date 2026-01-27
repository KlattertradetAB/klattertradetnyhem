import React, { useState } from 'react';
import { Mail, User, Send, CheckCircle2, ArrowLeft, ArrowRight, Lock, Loader2 } from 'lucide-react';
import { Page } from '../public/types';
import { supabase } from '../gemenskap/services/supabase';

interface FreeRegistrationProps {
    setPage: (page: Page) => void;
}

const FreeRegistration: React.FC<FreeRegistrationProps> = ({ setPage }) => {
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    emailRedirectTo: window.location.origin,
                    data: {
                        full_name: formData.name,
                        avatar_url: '',
                    },
                },
            });

            if (signUpError) {
                setError(signUpError.message);
                setIsLoading(false);
            } else if (data.user) {
                // Ensure profile exists
                await supabase.from('profiles').upsert({
                    id: data.user.id,
                    email: formData.email,
                    full_name: formData.name,
                    membership_level: 1, // Free tier
                    membership_active: true,
                    updated_at: new Date().toISOString(),
                });

                setSubmitted(true);
                setIsLoading(false);
            }
        } catch (err) {
            setError('Ett oväntat fel uppstod.');
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (submitted) {
        return (
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="max-w-xl w-full glass-card p-10 md:p-14 text-center animate-in fade-in zoom-in duration-500 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 to-emerald-600"></div>

                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-4">Välkommen till gemenskapen!</h2>
                    <p className="text-zinc-400 mb-10 leading-relaxed text-lg">
                        Ditt konto har skapats. Vi har skickat ett bekräftelsemail till din e-postadress.
                        Vänligen klicka på länken i mailet för att verifiera ditt konto och logga in.
                    </p>

                    <button
                        onClick={() => {
                            window.location.hash = '#login';
                            setPage(Page.GEMENSKAP_APP);
                        }}
                        className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all active:scale-[0.98]"
                    >
                        Gå till inloggning
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 py-24 px-6">
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={() => setPage(Page.LOGIN)}
                    className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Tillbaka
                </button>

                <div className="glass-card p-8 md:p-12">
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold text-white mb-4">Registrera Gratis Medlemskap</h1>
                        <p className="text-zinc-400 text-lg">
                            Fyll i formuläret nedan för att skapa ditt konto. Det är helt kostnadsfritt och du får direkt tillgång till vår öppna gemenskap.
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
                                    placeholder="Välj ett säkert lösenord"
                                    minLength={6}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-medium"
                                />
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                            <h3 className="text-white font-bold text-sm">Medlemsvillkor</h3>
                            <label className="flex items-start gap-3 cursor-pointer group pt-2">
                                <input
                                    required
                                    type="checkbox"
                                    checked={acceptedTerms}
                                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                                    className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-orange-500 focus:ring-orange-500 focus:ring-offset-0"
                                />
                                <span className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                                    Jag godkänner{' '}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setPage(Page.TERMS);
                                        }}
                                        className="text-blue-400 hover:text-blue-300 underline font-bold"
                                    >
                                        medlemsvillkoren
                                    </button>
                                    {' '}och bekräftar att jag förstår att detta är en trygg plats där vi behandlar varandra med respekt.
                                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !acceptedTerms}
                            className="w-full py-5 bg-white hover:bg-slate-200 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-3 text-lg group active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    Skapa konto
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => setPage(Page.PREMIUM_APPLICATION)}
                            className="w-full py-4 bg-transparent hover:bg-white/5 border border-white/10 text-orange-400 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                        >
                            Till premium medlemskapet
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FreeRegistration;
