import React, { useState, useEffect } from 'react';
import { supabase } from '../gemenskap/services/supabase';
import { Page } from '../public/types';
import { ShieldCheck, Settings, X, ChevronDown, ChevronUp, Lock, Eye } from 'lucide-react';

interface CookieBannerProps {
    setPage: (page: Page) => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ setPage }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent-v4');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAcceptAll = async () => {
        localStorage.setItem('cookie-consent-v4', 'all');
        setIsVisible(false);

        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            await supabase.from('cookie_consents').upsert({
                user_id: session.user.id,
                consent_level: 'all',
                updated_at: new Date().toISOString()
            });
        }
    };

    const handleAcceptNecessary = async () => {
        localStorage.setItem('cookie-consent-v4', 'necessary');
        setIsVisible(false);

        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            await supabase.from('cookie_consents').upsert({
                user_id: session.user.id,
                consent_level: 'necessary',
                updated_at: new Date().toISOString()
            });
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 left-6 right-6 z-[100] animate-in slide-in-from-bottom-10 fade-in duration-700">
            <div className="glass bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-4 md:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)] max-w-5xl mx-auto overflow-hidden">

                <div className="flex flex-col gap-4">
                    {/* Content Section */}
                    <div className="flex flex-col lg:flex-row gap-6 lg:items-center">
                        <div className="flex-grow space-y-3">
                            <div className="flex items-center gap-3 text-orange-400">
                                <ShieldCheck size={24} className="animate-pulse" />
                                <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">
                                    Vi värnar om din integritet
                                </h2>
                            </div>

                            <div className="space-y-2 text-slate-300 text-xs md:text-sm leading-relaxed font-light max-w-2xl">
                                <p>
                                    Vi använder cookies för att ge dig en så trygg och fungerande upplevelse som möjligt.
                                    Vissa krävs för grundfunktionen, medan andra hjälper oss att förbättra våra verktyg för dig.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-1">
                                <button
                                    onClick={() => setPage(Page.COOKIE_POLICY)}
                                    className="text-xs font-bold text-slate-400 hover:text-orange-400 underline transition-colors uppercase tracking-widest"
                                >
                                    Läs vår policy
                                </button>
                                <button
                                    onClick={() => setShowSettings(!showSettings)}
                                    className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-orange-400 underline transition-colors uppercase tracking-widest"
                                >
                                    {showSettings ? <ChevronUp size={14} /> : <ChevronDown size={14} />} {showSettings ? 'Dölj inställningar' : 'Inställningar'}
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 min-w-[180px]">
                            <button
                                onClick={handleAcceptAll}
                                className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-slate-950 rounded-xl font-black transition-all hover:scale-105 shadow-xl shadow-orange-500/20 text-xs md:text-sm"
                            >
                                Godkänn alla
                            </button>
                            <button
                                onClick={handleAcceptNecessary}
                                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold transition-all text-xs md:text-sm"
                            >
                                Endast nödvändiga
                            </button>
                        </div>
                    </div>

                    {/* Settings Section (Expanding) */}
                    {showSettings && (
                        <div className="pt-8 border-t border-white/10 grid md:grid-cols-2 gap-6 animate-in slide-in-from-top-4 duration-500">
                            <div className="glass bg-white/5 p-6 rounded-2xl border border-white/5 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-white font-bold">
                                        <Lock size={16} className="text-blue-400" /> Nödvändiga
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-black">Alltid aktiva</span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed font-light">
                                    Dessa är sidans "autonoma nervsystem". Krävs för grundläggande funktioner som säkerhet och sessioner.
                                </p>
                            </div>

                            <div className="glass bg-white/5 p-6 rounded-2xl border border-white/5 space-y-3 opacity-60">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-white font-bold">
                                        <Eye size={16} className="text-orange-400" /> Analys & Statistik
                                    </div>
                                    <div className="w-10 h-5 bg-slate-800 rounded-full relative">
                                        <div className="absolute right-1 top-1 bottom-1 w-3 bg-slate-600 rounded-full"></div>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed font-light">
                                    Hjälper oss att förstå hur sidan används så vi kan förbättra upplevelsen. (Privacy by default: inaktiverat tills du godkänner).
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
                    aria-label="Stäng"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
};

export default CookieBanner;
