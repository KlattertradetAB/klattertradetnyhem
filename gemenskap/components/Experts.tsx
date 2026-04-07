import React from 'react';
import { Calendar, Mail, Phone, MapPin, Award, Users, ExternalLink, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const Experts: React.FC = () => {
    const experts = [
        {
            name: 'Minerva Kassab',
            role: 'Psykolog',
            desc: 'Erbjuder stödjande samtal och terapi med fokus på personlig utveckling och relationshantering.',
            image: '/assets/minerva_profil.jpg',
            email: 'minerva@klattertradet.se,billy@klattertradet.se'
        },
        {
            name: 'Billy Ljungberg',
            role: 'Gestaltterapeut / Beroendeterapeut',
            tag: 'Grundare',
            desc: 'Grundare av Klätterträdet. Specialiserad på traumamedveten omsorg, beroendeproblematik och processledning.',
            image: '/assets/billy_profil.jpeg',
            email: 'billy@klattertradet.se'
        },
        {
            name: 'Mattias O Sandin',
            role: 'Samtalsterapeut',
            desc: 'Erfaren terapeut som möter dig där du är. Fokus på trygghet, insikt och förändring.',
            icon: Users,
            email: 'mattias@klattertradet.se,billy@klattertradet.se'
        },
        {
            name: 'Malin Widerlöv',
            role: 'Behandlingspedagog & Socialarbetare',
            desc: 'Specialiserad på familjefrågor och socialt stöd. Malin fungerar även som familjeombud.',
            image: '/Malin-profil-hemsida.png',
            email: 'malin@klattertradet.se,billy@klattertradet.se'
        },
        {
            name: 'Jeanette Johansson',
            role: 'Samtalsterapeut & Expert inom somatisk omsorg',
            desc: 'Specialiserad på somatisk omsorg, kostrådgivning och behandling för myndighetsinducerat trauma. Jeanette erbjuder även coaching och estetiska behandlingar som del av ett holistiskt välbefinnande.',
            image: '/Jea-profil.png',
            email: 'jeanettejohansson1989@gmail.com,billy@klattertradet.se'
        }
    ];

    return (
        <div className="space-y-12 pb-12">
            {/* Header Section */}
            <div className="text-center space-y-6 max-w-3xl mx-auto py-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-widest mb-2"
                >
                    <Users size={14} />
                    Kontakt & Bokning
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                    Professionellt stöd <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-white">när du behöver det</span>.
                </h1>
                <p className="text-lg text-slate-400 leading-relaxed font-light">
                    Inom Horizonten har vi tillgång till legitimerade terapeuter och experter för din situation.
                </p>
            </div>

            {/* Expert Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {experts.map((expert, i) => (
                    <Card key={expert.name} className="bg-card/40 border-white/5 rounded-[2.5rem] overflow-hidden group hover:bg-card/60 transition-all flex flex-col h-full">
                        <div className="relative h-72 overflow-hidden bg-slate-900/50">
                            {expert.image ? (
                                <img 
                                    src={expert.image} 
                                    alt={expert.name} 
                                    className="w-full h-full object-cover object-top opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 shadow-2xl shadow-black/40"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-800">
                                    {expert.icon && <expert.icon size={64} />}
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                            {expert.tag && (
                                <div className="absolute bottom-4 left-6 px-3 py-1 bg-green-500 text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                                    {expert.tag}
                                </div>
                            )}
                        </div>

                        <CardContent className="p-8 flex flex-col flex-1">
                            <div className="mb-4">
                                <h3 className="text-2xl font-black text-white mb-1 tracking-tight">{expert.name}</h3>
                                <div className="flex items-center gap-2 text-orange-500 text-xs font-bold uppercase tracking-wide">
                                    <Award size={14} />
                                    {expert.role}
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1 font-light opacity-80">
                                {expert.desc}
                            </p>
                            <button 
                                onClick={() => window.location.href = `mailto:${expert.email}?subject=Bokningsförfrågan via Horizonten`}
                                className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest hover:bg-orange-500 hover:text-slate-950 hover:border-orange-500 transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/20"
                            >
                                <Calendar size={16} />
                                Boka Samtal
                            </button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Help/Inquiry Section */}
            <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20 rounded-[3rem] p-8 md:p-12 mt-12 overflow-hidden relative group">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-xl space-y-4 text-center md:text-left">
                        <h2 className="text-3xl font-black text-white tracking-tight">Osäker på vem du ska prata med?</h2>
                        <p className="text-slate-400 leading-relaxed font-light">
                            Vi hjälper dig att hitta rätt person utifrån dina behov. Skicka oss ett meddelande så guidar vi dig rätt.
                        </p>
                    </div>
                    <button className="px-8 py-5 rounded-2xl bg-blue-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20 flex items-center gap-3 shrink-0">
                        <MessageCircle size={18} />
                        Skicka Förfrågan
                    </button>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
            </Card>

            <div className="h-20"></div>
        </div>
    );
};

export default Experts;
