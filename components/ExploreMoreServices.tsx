
import React from 'react';
import { Page } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface ExploreMoreServicesProps {
    setPage: (page: Page) => void;
    currentPages: Page[];
}

const ExploreMoreServices: React.FC<ExploreMoreServicesProps> = ({ setPage, currentPages }) => {
    const { t } = useLanguage();

    const services = [
        { name: t.nav_behandlingspedagog, page: Page.BEHANDLINGS_PEDAGOG, icon: <Sparkles size={20} className="text-orange-400" /> },
        { name: t.nav_mit, page: Page.CHAT, icon: <Sparkles size={20} className="text-amber-400" /> },
        { name: t.nav_gestalt, page: Page.GESTALT_TRAINING, icon: <Sparkles size={20} className="text-blue-400" /> },
        { name: t.nav_enskild_terapi, page: Page.THERAPY, icon: <Sparkles size={20} className="text-red-400" /> },
        { name: t.nav_grupp_terapi, page: Page.GROUP_THERAPY, icon: <Sparkles size={20} className="text-purple-400" /> }
    ].filter(s => !currentPages.includes(s.page));

    return (
        <section className="py-24 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 space-y-12">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tight">Utforska fler tjänster</h2>
                    <p className="text-zinc-500 font-light max-w-2xl mx-auto italic">{t.home_choose_path}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            onClick={() => setPage(service.page)}
                            className="glass bg-white/5 border border-white/10 p-6 rounded-[2rem] hover:bg-white/10 transition-all cursor-pointer group flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">
                                    {service.icon}
                                </div>
                                <span className="text-white font-bold text-sm tracking-tight">{service.name}</span>
                            </div>
                            <ArrowRight size={18} className="text-white/20 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                        </motion.div>
                    ))}
                    
                    <motion.div
                        whileHover={{ y: -5 }}
                        onClick={() => setPage(Page.SERVICES)}
                        className="glass bg-orange-500/10 border border-orange-500/20 p-6 rounded-[2rem] hover:bg-orange-500/20 transition-all cursor-pointer group flex items-center justify-between col-span-full lg:col-span-1"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-orange-500/20 rounded-2xl">
                                <ArrowRight size={20} className="text-orange-400" />
                            </div>
                            <span className="text-orange-400 font-black text-xs uppercase tracking-widest">{t.nav_visa_alla}</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ExploreMoreServices;
