import React, { useState } from 'react';
import { Loader2, ArrowLeft, ShieldCheck, AlertCircle, ArrowRight, Key, Mail } from 'lucide-react';
import { Profile } from '../types';
import { authService } from '../services/authService';

interface PremiumLoginProps {
    onLoginSuccess: (profile: Profile) => void;
    onBack: () => void;
    onRegister?: () => void;
    isStandalone?: boolean;
}

const PremiumLogin: React.FC<PremiumLoginProps> = ({ onLoginSuccess, onBack, onRegister, isStandalone }) => {
    const [view, setView] = useState<'login' | 'signup' | 'forgot'>('login');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [role, setRole] = useState<'designer' | 'student' | 'teacher'>('designer');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [showResend, setShowResend] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setMessage(null);
        setShowResend(false);

        try {
            if (view === 'login') {
                await authService.login(email, password);
            } else if (view === 'signup') {
                await authService.register({
                    email,
                    password,
                    fullName,
                    role: role as any,
                    membershipLevel: 2,
                    membershipActive: true
                });
                setMessage('Välkommen som premiummedlem! Kontrollera din e-post för att bekräfta din adress.');
            } else if (view === 'forgot') {
                await authService.resetPassword(email);
                setMessage('En återställningslänk har skickats till din e-post.');
            }
        } catch (err: any) {
            console.error('Premium Auth error:', err);
            let errorMsg = err.message || 'Fel vid autentisering. Kontrollera dina uppgifter.';
            
            if (err.message?.includes('Email not confirmed')) {
                errorMsg = 'E-postadressen är inte bekräftad ännu. Kontrollera din inkorg eller skicka en ny länk.';
                setShowResend(true);
            }
            
            setError(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendEmail = async () => {
        if (!email) return;
        setIsLoading(true);
        try {
            await authService.resendVerificationEmail(email);
            setMessage('En ny bekräftelselänk har skickats!');
            setShowResend(false);
        } catch (err: any) {
            setError(err.message || 'Kunde inte skicka om bekräftelsemailet.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-700">
            {/* Logo and Title */}
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center gap-3 mb-6">
                    <img
                        src="/assets/logo2.png"
                        alt="Horizonten gemenskap"
                        className="w-14 h-14 object-contain"
                    />
                    <span className="text-white text-xl font-medium tracking-tight">Horizonten Premium</span>
                </div>
                <h1 className="text-2xl sm:text-3xl text-white font-light tracking-wide">
                    {view === 'login' ? 'Välkommen tillbaka' : view === 'signup' ? 'Skapa premiumkonto' : 'Återställ lösenord'}
                </h1>
                <p className="text-slate-400 mt-3 text-sm">
                    {view === 'login' ? 'Logga in på din premiumprofil' : view === 'signup' ? 'Börja din resa med oss idag' : 'Ange din e-post för att få en länk'}
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl space-y-3 animate-in fade-in slide-in-from-top-2">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
                            <p className="text-sm text-red-200 leading-relaxed">{error}</p>
                        </div>
                        {showResend && (
                            <button
                                type="button"
                                onClick={handleResendEmail}
                                className="w-full py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 text-xs font-bold rounded-lg transition-all"
                            >
                                Skicka ny bekräftelselänk
                            </button>
                        )}
                    </div>
                )}
                {message && (
                    <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                        <ShieldCheck className="text-green-400 shrink-0 mt-0.5" size={18} />
                        <p className="text-sm text-green-200 leading-relaxed">{message}</p>
                    </div>
                )}

                {view === 'signup' && (
                    <div className="animate-in fade-in slide-in-from-top-4">
                        <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">
                            Namn (Visas för andra)
                        </label>
                        <input
                            id="fullName"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            placeholder="Förnamn Efternamn"
                            className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/10 focus:outline-none focus:border-[#b35c2a] focus:ring-1 focus:ring-[#b35c2a] transition-all"
                        />
                    </div>
                )}

                <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">
                        E-postadress
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="din@email.se"
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/10 focus:outline-none focus:border-[#b35c2a] focus:ring-1 focus:ring-[#b35c2a] transition-all"
                    />
                </div>

                {view !== 'forgot' && (
                    <div>
                        <div className="flex justify-between items-center mb-2 ml-1">
                            <label htmlFor="password" className="block text-xs font-bold uppercase tracking-widest text-slate-500">
                                Lösenord
                            </label>
                            {view === 'login' && (
                                <button
                                    type="button"
                                    onClick={() => setView('forgot')}
                                    className="text-[10px] font-bold text-[#b35c2a] hover:text-[#9a4f24] uppercase tracking-wider"
                                >
                                    Glömt lösenordet?
                                </button>
                            )}
                        </div>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            minLength={6}
                            className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/10 focus:outline-none focus:border-[#b35c2a] focus:ring-1 focus:ring-[#b35c2a] transition-all"
                        />
                    </div>
                )}

                {view === 'login' && (
                    <div className="flex items-center justify-between text-xs">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-white/10 bg-white/5 text-[#b35c2a] focus:ring-[#b35c2a] focus:ring-offset-0"
                            />
                            <span className="text-slate-500 group-hover:text-slate-300 transition-colors">Kom ihåg mig</span>
                        </label>
                    </div>
                )}

                {view === 'signup' && (
                    <>
                        <div className="flex items-start gap-3 mt-4 animate-in fade-in slide-in-from-top-2">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={acceptedTerms}
                                onChange={(e) => setAcceptedTerms(e.target.checked)}
                                className="mt-1 w-4 h-4 bg-white/5 border-white/10 rounded text-[#b35c2a] focus:ring-[#b35c2a] focus:ring-offset-0"
                            />
                            <label htmlFor="terms" className="text-[10px] text-slate-500 leading-relaxed">
                                Jag godkänner{' '}
                                <button type="button" className="text-[#b35c2a] hover:text-[#9a4f24] underline">medlemsvillkoren</button>
                                {' '}och att mina uppgifter hanteras enligt integritetspolicyn.
                            </label>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Välj inriktning</label>
                            <div className="role-radio-group">
                                <label className="label">
                                    <input
                                        type="radio"
                                        name="role-premium"
                                        value="designer"
                                        checked={role === 'designer'}
                                        onChange={() => setRole('designer')}
                                    />
                                    <p className="text">Designer</p>
                                </label>
                                <label className="label">
                                    <input
                                        type="radio"
                                        name="role-premium"
                                        value="student"
                                        checked={role === 'student'}
                                        onChange={() => setRole('student')}
                                    />
                                    <p className="text">Student</p>
                                </label>
                                <label className="label">
                                    <input
                                        type="radio"
                                        name="role-premium"
                                        value="teacher"
                                        checked={role === 'teacher'}
                                        onChange={() => setRole('teacher')}
                                    />
                                    <p className="text">Lärare</p>
                                </label>
                            </div>
                        </div>
                    </>
                )}

                <button
                    type="submit"
                    disabled={isLoading || (view === 'signup' && !acceptedTerms)}
                    className="w-full px-8 py-4 bg-[#b35c2a] hover:bg-[#9a4f24] disabled:bg-[#b35c2a]/50 text-white font-black uppercase tracking-[0.2em] text-xs rounded-xl transition-all duration-200 shadow-xl shadow-[#b35c2a]/20 flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                    {isLoading ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : (
                        <>
                            {view === 'login' ? 'Logga in' : view === 'signup' ? 'Bli medlem' : 'Skicka länk'}
                            <ArrowRight size={18} />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8 text-center text-slate-500 text-xs space-y-4 font-bold uppercase tracking-widest">
                <p>
                    {view === 'login' ? 'Saknar du konto?' : 'Har du redan ett konto?'}
                    {' '}
                    <button
                        type="button"
                        onClick={() => setView(view === 'login' ? 'signup' : 'login')}
                        className="text-[#b35c2a] hover:text-[#9a4f24] transition-colors ml-1"
                    >
                        {view === 'login' ? 'Registrera här' : 'Logga in nu'}
                    </button>
                </p>
                {view === 'forgot' && (
                    <button
                        type="button"
                        onClick={() => setView('login')}
                        className="text-slate-600 hover:text-white transition-colors block mx-auto pt-2"
                    >
                        Tillbaka till inloggning
                    </button>
                )}
                {!isStandalone && view === 'login' && (
                    <p className="pt-4 border-t border-white/5 font-medium normal-case tracking-normal text-slate-600">
                        Är du inte redo än?
                        {' '}
                        <button
                            onClick={onRegister}
                            className="text-[#b35c2a] hover:text-[#9a4f24] transition-colors underline underline-offset-4"
                        >
                            Ta reda på mer om premium
                        </button>
                    </p>
                )}
            </div>

            {/* Back button */}
            {!isStandalone && (
                <div className="mt-10 text-center">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-slate-600 hover:text-white transition-all mx-auto text-[10px] font-black uppercase tracking-widest group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Gå tillbaka
                    </button>
                </div>
            )}
        </div>
    );
};

export default PremiumLogin;
