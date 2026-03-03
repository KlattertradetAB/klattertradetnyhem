
import React from 'react';
import { Page } from '../types';
import { PAGE_URLS } from '../App';
import {
    ArrowRight,
    BookOpen,
    Heart,
    Users,
    Sparkles,
    ShieldCheck,
    Brain,
    Wind
} from 'lucide-react';
import TiltedImage from '../components/TiltedImage';

interface ServicesProps {
    setPage: (page: Page) => void;
}

const Services: React.FC<ServicesProps> = ({ setPage }) => {
    const serviceCategories = [
        {
            title: "Utbildningar",
            icon: <BookOpen className="text-orange-400" size={24} />,
            items: [
                {
                    name: "Behandlingspedagog",
                    desc: "Yrkesutbildning för professionellt arbete med människor.",
                    page: Page.BEHANDLINGS_PEDAGOG,
                    img: "/Pic-BIllyteavla.jpeg"
                },
                {
                    name: "Myndighetsinducerat trauma (MiT)",
                    desc: "Specialistutbildning för ett bättre bemötande.",
                    page: Page.CHAT,
                    img: "/assets/logo2.png"
                },
                {
                    name: "Gestaltterapi",
                    desc: "Grundutbildning i gestaltmetodik och förhållningssätt.",
                    page: Page.GESTALT_TRAINING,
                    img: "/hemsida-bild2.jpeg"
                }
            ]
        },
        {
            title: "Terapi & Samtal",
            icon: <Heart className="text-red-400" size={24} />,
            items: [
                {
                    name: "Enskild Terapi",
                    desc: "Personlig utveckling och traumabehandling.",
                    page: Page.THERAPY,
                    img: "/bild-ljusbord.jpeg"
                },
                {
                    name: "Grupp- & Parterapi",
                    desc: "Gemensam läkning och relationsstöd.",
                    page: Page.GROUP_THERAPY,
                    img: "/bild-terapistol.jpeg"
                }
            ]
        }
    ];

    return (
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-12 animate-fade-in space-y-16">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tight">
                    Våra <span className="text-orange-400">Tjänster</span>
                </h1>
                <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
                    Vi erbjuder specialistkompetens inom trauma, pedagogik och terapi för att stödja din väg mot helhet och mognad.
                </p>
            </div>

            <div className="space-y-24">
                {serviceCategories.map((category, idx) => (
                    <div key={idx} className="space-y-10">
                        <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                            {category.icon}
                            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{category.title}</h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {category.items.map((service, sIdx) => (
                                <div
                                    key={sIdx}
                                    onClick={() => setPage(service.page)}
                                    className="glass bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all group cursor-pointer flex flex-col h-full"
                                >
                                    <div className="mb-6 overflow-hidden rounded-2xl aspect-video relative">
                                        <img
                                            src={service.img}
                                            alt={service.name}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                    </div>

                                    <div className="flex-1 space-y-3">
                                        <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">{service.name}</h3>
                                        <p className="text-zinc-400 text-sm leading-relaxed">{service.desc}</p>
                                    </div>

                                    <div className="mt-6 flex items-center justify-between">
                                        <span className="text-orange-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                            Läs mer <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </span>
                                        <div className="p-2 bg-white/5 rounded-lg text-white/20 group-hover:text-orange-400 transition-colors">
                                            <Sparkles size={16} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Catch-all Section */}
            <div className="glass bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-white/20 rounded-[3rem] p-10 md:p-16 text-center space-y-8">
                <div className="flex justify-center gap-4">
                    <Brain className="text-amber-500" size={40} />
                    <Wind className="text-orange-400" size={40} />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white italic">Hittar du inte det du söker?</h2>
                <p className="text-zinc-300 text-lg max-w-2xl mx-auto font-light">
                    Vi skräddarsyr även handledning och utbildningsinsatser för kommuner, verksamheter och organisationer.
                </p>
                <button
                    onClick={() => setPage(Page.CONTACT)}
                    className="px-8 py-4 bg-white text-slate-950 rounded-2xl font-black transition-all hover:scale-105 shadow-2xl shadow-white/5 uppercase tracking-widest text-xs"
                >
                    Kontakta oss för förfrågan
                </button>
            </div>
        </div>
    );
};

export default Services;
