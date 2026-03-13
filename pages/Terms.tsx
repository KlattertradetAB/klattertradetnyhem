import React from 'react';
import { Page } from '../types';
import { ArrowLeft, ShieldCheck, Heart, Info, Anchor, Users, Brain, Zap, Gem, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface TermsProps {
    setPage: (page: Page) => void;
}

const Terms: React.FC<TermsProps> = ({ setPage }) => {
    const { t } = useLanguage();
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 animate-fade-in max-w-4xl space-y-16">
            <button
                onClick={() => setPage(Page.HOME)}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                {t.back_btn}
            </button>

            {/* Hero Section */}
            <div className="glass bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none"></div>
                <div className="relative z-10 space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">{t.terms_title}</h1>
                    <h2 className="text-2xl md:text-3xl font-light text-blue-200/80 italic">{t.terms_community}</h2>
                </div>
            </div>

            {/* Main Content */}
            <div className="space-y-12">

                {/* Section 1 & 2 */}
                <section className="space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                            <Anchor size={24} />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{t.terms_anchor_title}</h3>
                            <p className="text-slate-300 leading-relaxed">
                                {t.terms_anchor_text}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0">
                            <Heart size={24} />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{t.terms_heart_title}</h3>
                            <p className="text-slate-300 leading-relaxed">
                                {t.terms_heart_text}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 3 & 4 */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="glass bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                        <div className="flex items-center gap-3 text-amber-400">
                            <ShieldCheck size={24} />
                            <h3 className="text-xl font-bold">{t.terms_safety_title}</h3>
                        </div>
                        <ul className="space-y-4 text-sm text-slate-400 leading-relaxed">
                            <li><strong className="text-white">{t.terms_safety_item1_title}</strong> {t.terms_safety_item1_text}</li>
                            <li><strong className="text-white">{t.terms_safety_item2_title}</strong> {t.terms_safety_item2_text}</li>
                        </ul>
                    </div>

                    <div className="glass bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                        <div className="flex items-center gap-3 text-green-400">
                            <Users size={24} />
                            <h3 className="text-xl font-bold">{t.terms_group_safety_title}</h3>
                        </div>
                        <ul className="space-y-4 text-sm text-slate-400 leading-relaxed">
                            <li><strong className="text-white">{t.terms_group_safety_item1_title}</strong> {t.terms_group_safety_item1_text}</li>
                            <li><strong className="text-white">{t.terms_group_safety_item2_title}</strong> {t.terms_group_safety_item2_text}</li>
                            <li><strong className="text-white">{t.terms_group_safety_item3_title}</strong> {t.terms_group_safety_item3_text}</li>
                        </ul>
                    </div>
                </div>

                {/* Section 5, 6, 7 */}
                <section className="space-y-12">
                    <div className="glass bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-[2.5rem] p-8 md:p-12 space-y-6">
                        <div className="flex items-center gap-3">
                            <Brain className="text-blue-400" />
                            <h3 className="text-2xl font-bold text-white">{t.terms_moderation_title}</h3>
                        </div>
                        <p className="text-slate-300 leading-relaxed">
                            {t.terms_moderation_text}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h4 className="text-xl font-bold text-white flex items-center gap-2">
                                <Lock size={20} className="text-orange-400" /> {t.terms_gdpr_title}
                            </h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {t.terms_gdpr_text}
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xl font-bold text-white flex items-center gap-2">
                                <Info size={20} className="text-blue-400" /> {t.terms_disclaimer_title}
                            </h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {t.terms_disclaimer_text}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Premium Section */}
                <div className="pt-16 border-t border-white/10">
                    <div className="glass bg-gradient-to-tr from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
                        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
                        <div className="relative z-10 space-y-8">
                            <div className="inline-block px-4 py-1 bg-amber-500/20 rounded-full border border-amber-500/30 text-amber-500 text-xs font-black uppercase tracking-widest">
                                {t.terms_premium_badge}
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white">{t.terms_premium_title}</h2>
                            <p className="text-xl text-amber-200/90 font-light italic">{t.terms_premium_subtitle}</p>

                            <div className="space-y-6 text-slate-300 leading-relaxed">
                                <p>
                                    {t.terms_premium_text}
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6 pt-6">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-3">
                                    <div className="flex items-center gap-2 font-bold text-white"><Zap size={18} className="text-amber-400" /> {t.terms_premium_perk1_title}</div>
                                    <p className="text-xs text-slate-400">{t.terms_premium_perk1_text}</p>
                                </div>
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-3">
                                    <div className="flex items-center gap-2 font-bold text-white"><Gem size={18} className="text-amber-400" /> {t.terms_premium_perk2_title}</div>
                                    <p className="text-xs text-slate-400">{t.terms_premium_perk2_text}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
