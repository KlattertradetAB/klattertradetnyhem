
import React, { useState } from 'react';
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
    Wind,
    X,
    Calendar,
    ChevronRight,
    Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import NewsletterSignup from '../components/NewsletterSignup';
import { useLanguage } from '../contexts/LanguageContext';

interface ServicesProps {
    setPage: (page: Page) => void;
}

const Services: React.FC<ServicesProps> = ({ setPage }) => {
    const { t } = useLanguage();
    const [selectedService, setSelectedService] = useState<{
        name: string;
        desc: string;
        page?: Page;
        img: string;
        details?: string[];
        experts?: string[];
    } | null>(null);

    const serviceCategories = [
        {
            title: t.nav_training,
            icon: <BookOpen className="text-orange-400" size={24} />,
            items: [
                {
                    name: t.nav_behandlingspedagog,
                    desc: t.services_desc_behandlingspedagog,
                    page: Page.BEHANDLINGS_PEDAGOG,
                    img: "/Pic-BIllyteavla.jpeg",
                    details: [
                        "8 omfattande utbildningsblock",
                        "Praktisk traumamedveten omsorg (TMO)",
                        "Fokus på relationellt behandlingsarbete",
                        "Halvfart för att möjliggöra arbete"
                    ],
                    experts: ["Billy Ljungberg", "Malin Widerlöv"]
                },
                {
                    name: t.home_mit_title,
                    desc: t.services_desc_mit,
                    page: Page.CHAT,
                    img: "/assets/logo2.png",
                    details: [
                        "Förståelse för systemets påverkan",
                        "Metoder för bemötande av trauma",
                        "Verktyg för professionella",
                        "Direkt koppling till boken 'MiT'"
                    ],
                    experts: ["Billy Ljungberg"]
                },
                {
                    name: t.nav_gestalt,
                    desc: t.services_desc_gestalt,
                    page: Page.GESTALT_TRAINING,
                    img: "/hemsida-bild2.jpeg",
                    details: [
                        "Här-och-nu fokuserad metodik",
                        "Processinriktat lärande",
                        "Fördjupad självkännedom",
                        "Relationell kompetensutveckling"
                    ],
                    experts: ["Mattias O Sandin", "Billy Ljungberg"]
                }
            ]
        },
        {
            title: t.nav_therapy_cat,
            icon: <Heart className="text-red-400" size={24} />,
            items: [
                {
                    name: t.nav_enskild_terapi,
                    desc: t.services_desc_enskild,
                    page: Page.THERAPY,
                    img: "/bild-ljusbord.jpeg",
                    details: [
                        "Gestaltterapeutisk grund",
                        "Traumafokuserat stöd",
                        "Personlig växtkraft",
                        "Trygga fysiska eller digitala möten"
                    ],
                    experts: ["Minerva Kassab", "Mattias O Sandin", "Billy Ljungberg"]
                },
                {
                    name: t.nav_grupp_terapi,
                    desc: t.services_desc_grupp,
                    page: Page.GROUP_THERAPY,
                    img: "/bild-terapistol.jpeg",
                    details: [
                        "Läkning genom tillsammanskap",
                        "Spegling i andras erfarenheter",
                        "Parterapi för djupare kontakt",
                        "Moderatorledda samtalsgrupper"
                    ],
                    experts: ["Billy Ljungberg"]
                }
            ]
        },
        {
            title: "Specialistområden",
            icon: <Award className="text-amber-400" size={24} />,
            items: [
                {
                    name: "Traumaterapi & Bottom-up",
                    desc: "Arbete med kroppens minnen och nervsystemets reglering för djupgående läkning.",
                    img: "/hemsida-bild3.jpeg",
                    details: [
                        "Kroppsbaserad traumabehandling",
                        "Nervsystemsreglering",
                        "Bottom-up perspektiv",
                        "Integration av trauma"
                    ],
                    experts: ["Billy Ljungberg"]
                },
                {
                    name: "KBT & Beteendevetenskap",
                    desc: "Strukturerade verktyg och mönsterförändring för en fungerande vardag.",
                    img: "/hemsida-bild4.jpeg",
                    details: [
                        "Analys av beteendemönster",
                        "Exponering och hantering",
                        "Strukturerade hemuppgifter",
                        "Målfokuserat arbete"
                    ],
                    experts: ["Minerva Kassab"]
                },
                {
                    name: "Hypnos & Coaching",
                    desc: "Nå bortom det logiska sinnet för att arbeta med djupare förändringsprocesser.",
                    img: "/bild-ljusbord.jpeg",
                    details: [
                        "Klinisk hypnos för förändring",
                        "Resursfokuserad coaching",
                        "Mentala målbilder",
                        "Stresshantering på djupet"
                    ],
                    experts: ["Mattias O Sandin"]
                },
                {
                    name: "Somatisk omsorg",
                    desc: "Self-care som vårdar kroppens gräns mot omvärlden och främjar helhetshälsa.",
                    img: "/Jea-profil.png",
                    details: [
                        "Holistiskt välmående",
                        "Kroppslig gränssättning",
                        "Somatisk medvetenhet",
                        "Främjande av inre ro"
                    ],
                    experts: ["Jeanette Johansson"]
                }
            ]
        }
    ];

    return (
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-12 animate-fade-in space-y-16 relative">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tight">
                    {t.services_title.split(' ')[0]} <span className="text-orange-400">{t.services_title.split(' ').slice(1).join(' ')}</span>
                </h1>
                <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
                    {t.services_subtitle}
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
                                <motion.div
                                    key={sIdx}
                                    layoutId={`${idx}-${sIdx}`}
                                    onClick={() => setSelectedService(service)}
                                    className="glass bg-white/5 border border-white/10 rounded-[2rem] p-6 hover:bg-white/10 transition-all group cursor-pointer flex flex-col h-full relative overflow-hidden"
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
                                        <span className="text-orange-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                            Visa detaljer <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </span>
                                        <div className="p-2 bg-white/5 rounded-lg text-white/20 group-hover:text-orange-400 transition-colors">
                                            <Sparkles size={16} />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Service Detail Modal */}
            <AnimatePresence>
                {selectedService && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedService(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                        />
                        <motion.div
                            layoutId={selectedService.name}
                            className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto no-scrollbar"
                        >
                            <button
                                onClick={() => setSelectedService(null)}
                                className="absolute top-6 right-6 z-20 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all active:scale-95"
                            >
                                <X size={24} />
                            </button>

                            <div className="md:w-2/5 relative h-64 md:h-auto">
                                <img
                                    src={selectedService.img}
                                    alt={selectedService.name}
                                    className="w-full h-full object-cover grayscale opacity-60"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-transparent to-transparent"></div>
                                <div className="absolute bottom-8 left-8">
                                    <h2 className="text-3xl font-black text-white italic tracking-tighter drop-shadow-2xl">
                                        {selectedService.name}
                                    </h2>
                                </div>
                            </div>

                            <div className="md:w-3/5 p-8 md:p-12 space-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-orange-400 text-[11px] font-black uppercase tracking-[0.3em]">Beskrivning</h3>
                                    <p className="text-zinc-300 text-lg font-light leading-relaxed">
                                        {selectedService.desc}
                                    </p>
                                </div>

                                {selectedService.details && (
                                    <div className="space-y-4">
                                        <h3 className="text-white text-[11px] font-black uppercase tracking-[0.3em] opacity-40">Detta ingår</h3>
                                        <div className="grid grid-cols-1 gap-3">
                                            {selectedService.details.map((detail, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                                                    <span className="text-zinc-400 text-sm">{detail}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {selectedService.experts && (
                                    <div className="space-y-4">
                                        <h3 className="text-white text-[11px] font-black uppercase tracking-[0.3em] opacity-40">Ansvariga Experter</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedService.experts.map((expert, i) => (
                                                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-white text-xs font-bold">
                                                    {expert}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="pt-6 flex flex-col sm:flex-row gap-4">
                                    {selectedService.page && (
                                        <button
                                            onClick={() => {
                                                setPage(selectedService.page!);
                                                setSelectedService(null);
                                            }}
                                            className="px-8 py-4 bg-orange-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20"
                                        >
                                            Gå till tjänstesida <ChevronRight size={16} />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            setPage(Page.CONTACT);
                                            setSelectedService(null);
                                        }}
                                        className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                                    >
                                        Boka samtal <Calendar size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <NewsletterSignup />
        </div>
    );
};

export default Services;
