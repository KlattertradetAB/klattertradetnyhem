import React, { useState } from 'react';
import { Loader2, ArrowLeft, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';
import { Profile } from '../types';
import { authService } from '../services/authService';

interface PremiumLoginProps {
    onLoginSuccess: (profile: Profile) => void;
    onBack: () => void;
    onRegister?: () => void;
    isStandalone?: boolean;
}

const PremiumLogin: React.FC<PremiumLoginProps> = ({ onLoginSuccess, onBack, onRegister, isStandalone }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setMessage(null);

        try {
            await authService.login(email, password);
            // Success is handled by the auth state listener in GemenskapApp
        } catch (err: any) {
            console.error('Premium Login error:', err);
            setError(err.message || 'Fel vid inloggning. Kontrollera dina uppgifter.');
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
                    <span className="text-white text-xl font-medium">Horizonten gemenskap</span>
                </div>
                <h1 className="text-2xl sm:text-3xl text-white font-light tracking-wide">
                    Logga in
                </h1>
                <p className="text-slate-400 mt-3 text-sm">
                    Välkommen tillbaka till vår gemenskap
                </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-sm text-red-200 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                        <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
                        {error}
                    </div>
                )}
                {message && (
                    <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                        <ShieldCheck className="text-green-400 shrink-0 mt-0.5" size={18} />
                        <p className="text-sm text-green-200">{message}</p>
                    </div>
                )}

                {!isLogin && (
                    <div className="animate-in fade-in slide-in-from-top-4">
                        <label htmlFor="fullName" className="block text-sm font-medium text-slate-300 mb-2">
                            Namn (Visas för andra)
                        </label>
                        <input
                            id="fullName"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required={!isLogin}
                            placeholder="Förnamn Efternamn"
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-[#b35c2a] focus:ring-1 focus:ring-[#b35c2a] transition-colors"
                        />
                    </div>
                )}

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                        E-postadress
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="din@email.se"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-[#b35c2a] focus:ring-1 focus:ring-[#b35c2a] transition-colors"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                        Lösenord
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Ange ditt lösenord"
                        minLength={6}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-[#b35c2a] focus:ring-1 focus:ring-[#b35c2a] transition-colors"
                    />
                </div>

                {isLogin && (
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#b35c2a] focus:ring-[#b35c2a] focus:ring-offset-0"
                            />
                            <span className="text-slate-400 group-hover:text-slate-200 transition-colors">Kom ihåg mig</span>
                        </label>
                        <button type="button" className="text-[#b35c2a] hover:text-[#9a4f24] transition-colors">
                            Glömt lösenord?
                        </button>
                    </div>
                )}

                {!isLogin && (
                    <div className="flex items-start gap-3 mt-4 animate-in fade-in slide-in-from-top-2">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={acceptedTerms}
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                            className="mt-1 w-4 h-4 bg-white/5 border-white/20 rounded text-[#b35c2a] focus:ring-[#b35c2a] focus:ring-offset-0"
                        />
                        <label htmlFor="terms" className="text-xs text-slate-400 leading-tight">
                            Jag godkänner{' '}
                            <button type="button" className="text-[#b35c2a] hover:text-[#9a4f24] underline">medlemsvillkoren</button>
                            {' '}och att mina uppgifter hanteras enligt integritetspolicyn.
                        </label>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading || (!isLogin && !acceptedTerms)}
                    className="w-full px-8 py-3 bg-[#b35c2a] hover:bg-[#9a4f24] disabled:bg-[#b35c2a]/50 text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-[#b35c2a]/20 flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : (
                        <>
                            {isLogin ? 'Logga in' : 'Skapa konto'}
                            {!isLogin && <ArrowRight size={20} />}
                        </>
                    )}
                </button>
            </form>

            {/* Footer */}
            {!isStandalone && (
                <div className="mt-8 text-center text-slate-500 text-sm">
                    <p>
                        Inte medlem än?
                        {' '}
                        <button
                            onClick={onRegister}
                            className="text-[#b35c2a] hover:text-[#9a4f24] transition-colors font-medium ml-1"
                        >
                            Ansök om medlemskap
                        </button>
                    </p>
                </div>
            )}

            {/* Back to selection */}
            {!isStandalone && (
                <div className="mt-8 text-center pt-6 border-t border-white/5">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mx-auto text-sm group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Tillbaka till startsidan
                    </button>
                </div>
            )}
        </div>
    );
};

export default PremiumLogin;
