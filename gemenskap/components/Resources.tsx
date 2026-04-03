import React from 'react';
import { Package, Download, Globe, Shield, ArrowRight, Zap, Star, Layout } from 'lucide-react';
import PricingCard from '../../components/ui/PricingCard';
import PremiumBadge from './PremiumBadge';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const Resources: React.FC = () => {
    return (
        <div className="space-y-12 pb-12">
            {/* Hero Section */}
            <div className="text-center space-y-6 max-w-3xl mx-auto py-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-widest mb-2"
                >
                    <Package size={14} />
                    Resurser & Verktyg
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                    Allt du behöver för <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-white">din personliga resa</span>.
                </h1>
                <p className="text-lg text-slate-400 leading-relaxed font-light">
                    Här hittar du verktyg, material och fördjupning. Välj det stöd som passar dig bäst just nu.
                </p>
            </div>

            {/* Premium Call to Action */}
            <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-orange-500/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <Card className="bg-gradient-to-br from-orange-500/20 via-orange-600/5 to-transparent border-orange-500/30 rounded-[3rem] overflow-hidden relative z-10 transition-transform duration-500 group-hover:scale-[1.01]">
                    <CardContent className="p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-8">
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="shrink-0"
                            >
                                <PremiumBadge />
                            </motion.div>
                            <div className="space-y-2">
                                <h2 className="text-3xl font-black text-white tracking-tight">Uppgradera till Premium</h2>
                                <p className="text-slate-400 text-sm max-w-md font-light">Lås upp exklusiva workshops, boken som e-bok och direktkontakt med våra experter.</p>
                            </div>
                        </div>
                        <button className="px-8 py-4 rounded-2xl bg-orange-500 text-white font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 flex items-center gap-3">
                            Utforska Medlemskap
                            <ArrowRight size={18} />
                        </button>
                    </CardContent>
                </Card>
            </div>

            {/* Pricing Section */}
            <div className="space-y-8">
                <div className="flex items-center gap-3 px-2">
                    <Star className="text-orange-500" size={24} />
                    <h3 className="text-xl font-bold text-white">Medlemskapsnivåer</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <PricingCard
                        title="Basmedlem"
                        price="Gratis"
                        period="för alltid"
                        description="Perfekt för dig som vill utforska gemenskapen."
                        buttonText="Bli Medlem"
                        features={["Öppna forum", "Grund-övningar", "Live-samtal", "Digital flock"]}
                    />

                    <PricingCard
                        title="Premium"
                        price="149 kr"
                        period="/ månad"
                        isPopular={true}
                        description="För dig som vill fördjupa din utveckling."
                        buttonText="Uppgradera Nu"
                        features={["Allt i Bas", "Videoserier", "Support", "Workshops", "E-bok"]}
                    />

                    <PricingCard
                        title="Pro Support"
                        price="495 kr"
                        period="/ månad"
                        description="Det ultimata stödet med personliga verktyg."
                        buttonText="Kontakta Oss"
                        features={["Allt i Premium", "Handledning", "Yrkesgrupper", "Metodstöd", "Träffar"]}
                    />
                </div>
            </div>

            {/* Additional Tool Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                {[
                    {
                        title: 'Nedladdningscenter',
                        desc: 'Hämta PDF-guider, arbetsblad och visualiseringsövningar direkt till din enhet.',
                        icon: Download,
                        color: 'text-orange-400',
                        bg: 'bg-orange-500/10'
                    },
                    {
                        title: 'Globalt Nätverk',
                        desc: 'Hitta lokala grupper och partnerskap över hela landet för fysiska möten.',
                        icon: Globe,
                        color: 'text-blue-400',
                        bg: 'bg-blue-500/10'
                    }
                ].map((tool, i) => (
                    <Card key={tool.title} className="bg-card/40 border-white/5 rounded-[2.5rem] overflow-hidden group hover:bg-card/60 transition-all cursor-pointer">
                        <CardContent className="p-8 flex items-start gap-6">
                            <div className={`p-5 ${tool.bg} rounded-3xl ${tool.color} group-hover:scale-110 transition-transform duration-500 border border-white/5 shadow-2xl`}>
                                <tool.icon size={32} />
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-xl font-bold text-white">{tool.title}</h3>
                                <p className="text-slate-400 text-sm font-light leading-relaxed">{tool.desc}</p>
                                <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest ${tool.color} group-hover:gap-4 transition-all pt-2`}>
                                    Utforska <ArrowRight size={16} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="h-20"></div>
        </div>
    );
};

export default Resources;
