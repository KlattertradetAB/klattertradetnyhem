import React from 'react';
import { Package, Download, Globe, Shield, ArrowRight } from 'lucide-react';
import PricingCard from '../../components/ui/PricingCard';
import PremiumBadge from './PremiumBadge';

const Resources: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12 space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Hero Section */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                    Resurser & <span className="text-orange-500">Gemenskap</span>
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    Här hittar du verktyg, material och fördjupning för din resa. 
                    Välj det stöd som passar dig bäst just nu.
                </p>
            </div>

            {/* Premium Advertisement Icon */}
            <div className="flex flex-col items-center justify-center pt-4 pb-8">
                <a href="#medlemskap" className="transition-transform duration-300">
                    <PremiumBadge />
                </a>
                <p className="mt-6 text-orange-400 font-bold tracking-[0.2em] uppercase text-sm">
                    Uppgradera till Premium
                </p>
            </div>

            {/* Pricing / Membership Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                <PricingCard
                    title="Basmedlem"
                    price="Gratis"
                    period="för alltid"
                    description="Perfekt för dig som vill utforska gemenskapen och delta i de öppna samtalen."
                    buttonText="Bli Medlem"
                    features={[
                        "Tillgång till öppna forum",
                        "Grundläggande övningar",
                        "Delta i live-samtal",
                        "Digital flock-stöd"
                    ]}
                />

                <PricingCard
                    title="Premium"
                    price="149 kr"
                    period="/ månad"
                    isPopular={true}
                    description="För dig som vill fördjupa din utveckling och få tillgång till exklusivt material."
                    buttonText="Uppgradera Nu"
                    features={[
                        "Allt i Basmedlem",
                        "Fördjupade videoserier",
                        "Prioriterad support",
                        "Exklusiva workshops",
                        "Boken som e-bok"
                    ]}
                />

                <PricingCard
                    title="Pro Support"
                    price="495 kr"
                    period="/ månad"
                    description="Det ultimata stödet med direktkontakt och personliga verktyg."
                    buttonText="Kontakta Oss"
                    features={[
                        "Allt i Premium",
                        "Personlig handledning",
                        "Slutna yrkesgrupper",
                        "Metodstöd & Analys",
                        "Fysiska träffar"
                    ]}
                />
            </div>

            {/* Additional Resources */}
            <div className="grid md:grid-cols-2 gap-8 pt-8">
                <div className="glass bg-white/5 border border-white/10 rounded-[2rem] p-8 flex items-start gap-6 group hover:bg-white/10 transition-all">
                    <div className="p-4 bg-orange-500/10 rounded-2xl text-orange-400 group-hover:scale-110 transition-transform">
                        <Download size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Nedladdningscenter</h3>
                        <p className="text-slate-400 mb-4 text-sm">Hämta PDF-guider, arbetsblad och visualiseringsövningar direkt till din enhet.</p>
                        <button className="flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                            Utforska filer <ArrowRight size={16} />
                        </button>
                    </div>
                </div>

                <div className="glass bg-white/5 border border-white/10 rounded-[2rem] p-8 flex items-start gap-6 group hover:bg-white/10 transition-all">
                    <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform">
                        <Globe size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Globalt Nätverk</h3>
                        <p className="text-slate-400 mb-4 text-sm">Hitta lokala grupper och partnerskap över hela landet för fysiska möten.</p>
                        <button className="flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors">
                            Visa karta <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="h-12"></div>
        </div>
    );
};

export default Resources;
