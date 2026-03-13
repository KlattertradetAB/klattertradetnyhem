import React from 'react';
import { Page } from '../types';
import { ArrowLeft, ShieldCheck, Info, Eye, Shield, Lock, Clock, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface CookiePolicyProps {
    setPage: (page: Page) => void;
    onOpenSettings: () => void;
}

const CookiePolicy: React.FC<CookiePolicyProps> = ({ setPage, onOpenSettings }) => {
    const { t } = useLanguage();
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 animate-fade-in max-w-4xl">
            <button
                onClick={() => setPage(Page.HOME)}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                {t.back_btn}
            </button>

            <div className="space-y-12">
                {/* Header Section */}
                <div className="glass bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500/10 to-transparent pointer-events-none"></div>
                    <div className="relative z-10 space-y-6">
                        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">{t.cookie_title}</h1>
                        <h2 className="text-2xl md:text-3xl font-light text-amber-200/80 italic">{t.cookie_subtitle}</h2>
                        <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">
                                <ShieldCheck size={24} />
                            </div>
                            <p className="text-slate-300 font-medium">{t.cookie_badge}</p>
                        </div>
                    </div>
                </div>

                {/* Intro from Billy */}
                <div className="space-y-6 text-lg text-slate-300 leading-relaxed font-light">
                    <p>
                        {t.cookie_intro}
                    </p>
                </div>

                {/* Content Sections */}
                <div className="space-y-16">
                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Info className="text-amber-500" />
                            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{t.cookie_what_title}</h3>
                        </div>
                        <p className="text-slate-400">
                            {t.cookie_what_text}
                        </p>

                        <div className="py-6">
                            <button
                                onClick={onOpenSettings}
                                className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-slate-950 rounded-xl font-bold transition-all hover:scale-105 shadow-xl shadow-orange-500/20 text-sm"
                            >
                                {t.cookie_settings_btn}
                            </button>
                        </div>
                    </section>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="glass bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6">
                                <Shield size={24} />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-4">{t.cookie_type1_title}</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {t.cookie_type1_text}
                            </p>
                        </div>

                        <div className="glass bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors">
                            <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-400 mb-6">
                                <Eye size={24} />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-4">{t.cookie_type2_title}</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {t.cookie_type2_text}
                            </p>
                        </div>
                    </div>

                    <section className="glass bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-[2.5rem] p-8 md:p-12 space-y-8">
                        <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{t.cookie_consent_title}</h3>
                        <div className="grid gap-6 text-slate-300 text-sm">
                            <div className="flex gap-4">
                                <Lock className="text-amber-500 shrink-0" size={20} />
                                <p><strong>{t.cookie_consent_item1_title}</strong> {t.cookie_consent_item1_text}</p>
                            </div>
                            <div className="flex gap-4">
                                <Clock className="text-amber-500 shrink-0" size={20} />
                                <p><strong>{t.cookie_consent_item2_title}</strong> {t.cookie_consent_item2_text}</p>
                            </div>
                        </div>
                    </section>

                    <section className="text-center space-y-4">
                        <p className="text-slate-400 text-sm">{t.cookie_questions}</p>
                        <a href="mailto:billy@klattertradet.se" className="text-orange-400 font-bold hover:underline">billy@klattertradet.se</a>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CookiePolicy;
