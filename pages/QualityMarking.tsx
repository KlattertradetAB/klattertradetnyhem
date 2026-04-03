import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { ArrowRight, Brain, Activity, TrendingUp, Share2, Shield, Zap, CheckCircle, Circle, Building, User, Calendar, Users, FileText, Sparkles, LifeBuoy, Megaphone, Globe } from 'lucide-react';
import NordicMap from '../components/NordicMap';
import { useLanguage } from '../contexts/LanguageContext';
import PremiumLogin from '../gemenskap/components/PremiumLogin';
import Loader from '../components/ui/Loader';
import { authService } from '../gemenskap/services/authService';
import { supabase } from '../gemenskap/services/supabase';

interface QualityMarkingProps {
    setPage: (page: Page) => void;
}

const QualityMarking: React.FC<QualityMarkingProps> = ({ setPage }) => {
    const { t } = useLanguage();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    const [items, setItems] = useState([
        { id: '1', text: t.quality_checklist_item1, checked: false },
        { id: '2', text: t.quality_checklist_item2, checked: false },
        { id: '3', text: t.quality_checklist_item3, checked: false },
    ]);

    useEffect(() => {
        let mounted = true;

        const checkAuth = async () => {
            try {
                const user = await authService.getCurrentUser();
                if (user && mounted) {
                    const profile = await authService.getProfile(user.id);
                    // Kräver premium (membership_level >= 2) eller bara inloggad, 
                    // men PremiumLogin registrerar med level 2. Vi testar ifall profilen existerar.
                    if (profile && (profile.membership_level == null || profile.membership_level >= 1)) {
                        setIsAuthorized(true);
                    } else {
                        setIsAuthorized(false);
                    }
                } else if (mounted) {
                    setIsAuthorized(false);
                }
            } catch (err) {
                console.error("Auth check failed", err);
                if (mounted) setIsAuthorized(false);
            } finally {
                if (mounted) setIsLoading(false);
            }
        };

        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                checkAuth();
            } else {
                if (mounted) setIsAuthorized(false);
            }
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const toggleItem = (id: string) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    const allChecked = items.every(item => item.checked);

    const scrollToChecklist = () => {
        document.getElementById('checklist-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    if (isLoading) {
        return (
            <div className="flex-1 w-full flex items-center justify-center pt-24 pb-16">
                <Loader />
            </div>
        );
    }

    if (!isAuthorized) {
        return (
            <div className="flex-1 w-full relative z-10 pt-24 pb-16 flex flex-col items-center justify-center px-4">
                <PremiumLogin 
                    onLoginSuccess={() => {}} 
                    onBack={() => setPage(Page.HOME)} 
                    onRegister={() => setPage(Page.PREMIUM_APPLICATION)}
                />
            </div>
        );
    }

    return (
        <div className="flex-1 w-full relative z-10 pt-24 pb-16">
            <div className="max-w-[1200px] mx-auto px-4 md:px-8">

                {/* Header Section */}
                <div className="text-center mb-16 md:mb-24 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm shadow-orange-500/20 backdrop-blur-sm">
                        <Shield size={16} />
                        {t.quality_hero_badge}
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="mb-8 relative group animate-fade-in flex items-center justify-center">
                            {/* Glass Box Background */}
                            <div className="glass bg-white/20 backdrop-blur-2xl border border-white/20 p-6 rounded-[2.5rem] shadow-[0_0_50px_rgba(255,255,255,0.05)] relative z-10">
                                <img
                                    src="/HKM-trans2.png"
                                    alt="HZN Kvalitetsmarkering"
                                    className="w-48 h-48 md:w-56 md:h-56 object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            {/* Outer Glow */}
                            <div className="absolute -inset-4 bg-orange-500/10 blur-[60px] rounded-[3rem] group-hover:bg-orange-500/20 transition-all duration-700" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
                            {t.quality_hero_title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">{t.quality_hero_title2}</span>
                        </h1>
                    </div>
                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-white/70 leading-relaxed mb-10">
                        {t.quality_hero_desc}
                    </p>
                    <button
                        onClick={scrollToChecklist}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold text-lg py-4 px-10 rounded-2xl hover:scale-105 transition-all shadow-xl shadow-orange-900/20"
                    >
                        {t.quality_hero_cta} <ArrowRight size={20} />
                    </button>
                </div>

                {/* Hörnstenar Section */}
                <div className="mb-24 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">{t.quality_pillars_title}</h2>
                        <p className="max-w-3xl mx-auto text-lg text-white/60 leading-relaxed">
                            {t.quality_pillars_subtitle}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="glass bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl group hover:bg-white/10 transition-all">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400">
                                    <Brain size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-white">{t.quality_pillar1_title}</h3>
                            </div>
                            <ul className="space-y-3 text-white/70">
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={18} className="text-orange-500 mt-1 flex-shrink-0" />
                                    <span>{t.quality_pillar1_item1}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={18} className="text-orange-500 mt-1 flex-shrink-0" />
                                    <span>{t.quality_pillar1_item2}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="glass bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl group hover:bg-white/10 transition-all">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                                    <Users size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-white">{t.quality_pillar2_title}</h3>
                            </div>
                            <ul className="space-y-3 text-white/70">
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={18} className="text-amber-500 mt-1 flex-shrink-0" />
                                    <span>{t.quality_pillar2_item1}</span>
                                </li>
                                <li className="flex items-start gap-2 italic text-amber-400/80">
                                    <Zap size={18} className="mt-1 flex-shrink-0" />
                                    <span>{t.quality_pillar2_item2}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="glass bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl group hover:bg-white/10 transition-all">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                                    <FileText size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-white">{t.quality_pillar3_title}</h3>
                            </div>
                            <p className="text-white/50 text-sm mb-4 italic px-2">{t.quality_pillar3_sub}</p>
                            <ul className="space-y-3 text-white/70">
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={18} className="text-cyan-500 mt-1 flex-shrink-0" />
                                    <span>{t.quality_pillar3_item1}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Sparkles size={18} className="text-cyan-400 mt-1 flex-shrink-0" />
                                    <span>{t.quality_pillar3_item2}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="glass bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl group hover:bg-white/10 transition-all">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                                    <Calendar size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-white">{t.quality_pillar4_title}</h3>
                            </div>
                            <ul className="space-y-3 text-white/70">
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={18} className="text-purple-500 mt-1 flex-shrink-0" />
                                    <span>{t.quality_pillar4_item1}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={18} className="text-purple-500 mt-1 flex-shrink-0" />
                                    <span>{t.quality_pillar4_item2}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* What you get section */}
                    <div className="glass bg-gradient-to-br from-orange-500/10 to-amber-500/5 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-[100px] rounded-full" />
                        <h3 className="text-3xl font-bold text-white mb-10 text-center relative z-10">{t.quality_perks_title}</h3>
                        <div className="grid md:grid-cols-3 gap-8 relative z-10">
                            <div className="flex flex-col items-center text-center group">
                                <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center text-orange-400 mb-5 group-hover:scale-110 transition-transform">
                                    <LifeBuoy size={32} />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-3">{t.quality_perk1_title}</h4>
                                <p className="text-white/60 text-sm leading-relaxed">{t.quality_perk1_desc}</p>
                            </div>
                            <div className="flex flex-col items-center text-center group">
                                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 transition-transform">
                                    <Megaphone size={32} />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-3">{t.quality_perk2_title}</h4>
                                <p className="text-white/60 text-sm leading-relaxed">{t.quality_perk2_desc}</p>
                            </div>
                            <div className="flex flex-col items-center text-center group">
                                <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                                    <Globe size={32} />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-3">{t.quality_perk3_title}</h4>
                                <p className="text-white/60 text-sm leading-relaxed">{t.quality_perk3_desc}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pillars Section */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">{t.quality_pillars_three_title}</h2>
                        <p className="max-w-2xl mx-auto text-lg text-white/60">
                            {t.quality_pillars_three_desc}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="glass bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl flex flex-col relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-colors"></div>
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-orange-400 mb-6 relative z-10 shadow-inner">
                                <Share2 size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{t.quality_pillar_branding_title}</h3>
                            <p className="text-white/70 flex-grow relative z-10">
                                {t.quality_pillar_branding_desc}
                            </p>
                        </div>

                        <div className="glass bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl flex flex-col relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-colors"></div>
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-amber-400 mb-6 relative z-10 shadow-inner">
                                <Shield size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{t.quality_pillar_supervision_title}</h3>
                            <p className="text-white/70 flex-grow relative z-10">
                                {t.quality_pillar_supervision_desc}
                            </p>
                        </div>

                        <div className="glass bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl flex flex-col relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-colors"></div>
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-cyan-400 mb-6 relative z-10 shadow-inner">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{t.quality_pillar_dev_title}</h3>
                            <p className="text-white/70 flex-grow relative z-10">
                                {t.quality_pillar_dev_desc}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Nordic Map Section */}
                <div className="mb-24 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4">{t.quality_map_title}</h2>
                        <p className="max-w-2xl mx-auto text-lg text-white/60">
                            {t.quality_map_desc}
                        </p>
                    </div>
                    <div className="glass bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
                        <NordicMap />
                    </div>
                </div>

                {/* Checklist Section */}
                <div id="checklist-section" className="glass bg-black/40 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
                    <div className="absolute pointer-events-none inset-0 opacity-20">
                        <div className="absolute -top-1/2 -right-1/4 w-[500px] h-[500px] bg-orange-500/30 rounded-full blur-[120px]"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-white">{t.quality_checklist_title}</h2>
                            <p className="mt-4 text-white/60">
                                {t.quality_checklist_subtitle}
                            </p>
                        </div>

                        <div className="space-y-4 mb-10">
                            {items.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => toggleItem(item.id)}
                                    className={`w-full text-left flex items-start p-4 md:p-6 rounded-2xl transition-all border ${item.checked ? 'border-orange-500/50 bg-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.1)]' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                                >
                                    <div className="flex-shrink-0 mt-1 mr-4">
                                        {item.checked ? (
                                            <CheckCircle className="text-orange-400 w-6 h-6" />
                                        ) : (
                                            <Circle className="text-white/30 w-6 h-6" />
                                        )}
                                    </div>
                                    <div>
                                        <span className={`text-sm md:text-base font-medium leading-relaxed ${item.checked ? 'text-white' : 'text-white/70'}`}>
                                            {item.text}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="text-center bg-white/5 p-8 rounded-3xl border border-white/5">
                            {allChecked ? (
                                <div className="animate-fade-in flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 mb-4 shadow-[0_0_30px_rgba(249,115,22,0.3)]">
                                        <CheckCircle size={32} />
                                    </div>
                                    <p className="text-white font-bold text-xl mb-6">{t.quality_checklist_ready}</p>
                                    <button
                                        onClick={() => window.open('mailto:kontakt@klattertradet.se?subject=Ansökan om HKM-Certifiering')}
                                        className="bg-orange-500 hover:bg-orange-600 text-black font-bold text-lg py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-orange-500/40 w-full sm:w-auto"
                                    >
                                        {t.quality_apply_btn}
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-white/40 italic mb-6">{t.quality_checklist_not_ready}</p>
                                    <button disabled className="bg-white/5 border border-white/10 text-white/30 font-bold text-lg py-4 px-10 rounded-xl cursor-not-allowed w-full sm:w-auto">
                                        {t.quality_apply_btn}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Certified Entities Section */}
                <div className="mt-24 mb-12">
                    <div className="text-center mb-16 animate-fade-in">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">{t.quality_certified_title}</h2>
                        <p className="max-w-2xl mx-auto text-lg text-white/60">
                            {t.quality_certified_desc}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Verksamheter */}
                        <div className="glass bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2rem] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-[80px]"></div>
                            <div className="flex items-center gap-4 mb-8 relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                                    <Building size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-white">{t.quality_entities_business}</h3>
                            </div>

                            <div className="space-y-6 relative z-10">
                                {/* Hypothetical Business 1 */}
                                <div className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-lg font-bold text-white">{t.quality_entity1_title}</h4>
                                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-400 bg-amber-500/10 px-2 py-1 rounded-md">
                                            <CheckCircle size={12} /> {t.quality_certified_active}
                                        </span>
                                    </div>
                                    <p className="text-white/60 text-sm mb-3">{t.quality_entity1_desc}</p>
                                    <div className="flex items-center gap-2 text-xs text-white/40">
                                        <Calendar size={14} />
                                        <span>{t.quality_certified_since} 15 Mars 2024</span>
                                    </div>
                                </div>

                                {/* Hypothetical Business 2 */}
                                <div className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-lg font-bold text-white">{t.quality_entity2_title}</h4>
                                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-400 bg-amber-500/10 px-2 py-1 rounded-md">
                                            <CheckCircle size={12} /> {t.quality_certified_active}
                                        </span>
                                    </div>
                                    <p className="text-white/60 text-sm mb-3">{t.quality_entity2_desc}</p>
                                    <div className="flex items-center gap-2 text-xs text-white/40">
                                        <Calendar size={14} />
                                        <span>{t.quality_certified_since} 02 Oktober 2023</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Personer */}
                        <div className="glass bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2rem] relative overflow-hidden">
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/10 rounded-full blur-[80px]"></div>
                            <div className="flex items-center gap-4 mb-8 relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400">
                                    <User size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-white">{t.quality_entities_people}</h3>
                            </div>

                            <div className="space-y-6 relative z-10">
                                {/* Hypothetical Person 1 */}
                                <div className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-lg font-bold text-white">{t.quality_entity3_title}</h4>
                                        <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-400 bg-orange-500/10 px-2 py-1 rounded-md">
                                            <CheckCircle size={12} /> {t.quality_certified_active}
                                        </span>
                                    </div>
                                    <p className="text-white/60 text-sm mb-3">{t.quality_entity3_desc}</p>
                                    <div className="flex items-center gap-2 text-xs text-white/40">
                                        <Calendar size={14} />
                                        <span>{t.quality_certified_since} 12 Maj 2024</span>
                                    </div>
                                </div>

                                {/* Hypothetical Person 2 */}
                                <div className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-lg font-bold text-white">{t.quality_entity4_title}</h4>
                                        <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-400 bg-orange-500/10 px-2 py-1 rounded-md">
                                            <CheckCircle size={12} /> {t.quality_certified_active}
                                        </span>
                                    </div>
                                    <p className="text-white/60 text-sm mb-3">{t.quality_entity4_desc}</p>
                                    <div className="flex items-center gap-2 text-xs text-white/40">
                                        <Calendar size={14} />
                                        <span>{t.quality_certified_since} 28 Augusti 2023</span>
                                    </div>
                                </div>

                                {/* Hypothetical Person 3 */}
                                <div className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-lg font-bold text-white">{t.quality_entity5_title}</h4>
                                        <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-400 bg-orange-500/10 px-2 py-1 rounded-md">
                                            <CheckCircle size={12} /> {t.quality_certified_active}
                                        </span>
                                    </div>
                                    <p className="text-white/60 text-sm mb-3">{t.quality_entity5_desc}</p>
                                    <div className="flex items-center gap-2 text-xs text-white/40">
                                        <Calendar size={14} />
                                        <span>{t.quality_certified_since} 05 Januari 2025</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default QualityMarking;
