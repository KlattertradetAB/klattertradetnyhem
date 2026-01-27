import React from 'react';
import { Calendar, Mail, Phone, MapPin, Award, Users } from 'lucide-react';

const Experts: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header Section */}
            <div className="text-center space-y-4 mb-12">
                <h2 className="text-4xl font-bold text-white tracking-tight">Kontakt & Bokning</h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                    Inom Horizonten har vi tillgång till legitimerade terapeuter och experter.
                    Boka ett samtal för att få professionell vägledning och stöd för din situation.
                </p>
            </div>

            {/* Grid of Experts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* Minerva Kassab */}
                <div className="group bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-orange-500/30 transition-all hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.15)] flex flex-col">
                    <div className="relative h-80 overflow-hidden bg-slate-800">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10 opacity-60"></div>
                        <img
                            src="/assets/minerva_profil.jpg"
                            alt="Minerva Kassab"
                            className="w-full h-full object-cover object-top opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                        />
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                        <div className="mb-4">
                            <h3 className="text-2xl font-bold text-white mb-1">Minerva Kassab</h3>
                            <p className="text-orange-400 font-medium flex items-center gap-2">
                                <Award size={16} />
                                Psykolog!
                            </p>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                            Erbjuder stödjande samtal och terapi med fokus på personlig utveckling och relationshantering.
                        </p>
                        <button
                            onClick={() => window.location.href = 'mailto:minerva@klattertradet.se,billy@klattertradet.se?subject=Bokningsförfrågan via Horizonten'}
                            className="w-full bg-slate-800 hover:bg-orange-500 hover:text-slate-900 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
                        >
                            <Calendar size={18} />
                            <span>Boka Samtal</span>
                        </button>
                    </div>
                </div>

                {/* Linda Matta */}
                <div className="group bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-orange-500/30 transition-all hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.15)] flex flex-col">

                    {/* Image Container */}
                    <div className="relative h-80 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10 opacity-60"></div>
                        <img
                            src="/assets/linda-matta-new.jpeg"
                            alt="Linda Matta"
                            className="w-full h-full object-cover object-top opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute bottom-4 left-4 z-20">
                            <span className="inline-block px-3 py-1 bg-orange-500 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-full mb-2">
                                Tillgänglig
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-grow flex flex-col">
                        <div className="mb-4">
                            <h3 className="text-2xl font-bold text-white mb-1">Linda Matta</h3>
                            <p className="text-orange-400 font-medium flex items-center gap-2">
                                <Award size={16} />
                                Samtalsterapeut & Hudterapeut
                            </p>
                        </div>

                        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                            Linda erbjuder en unik helhetssyn där det inre och yttre välmåendet möts.
                            Som samtalsterapeut ger hon stöd i livets utmaningar, och som hudterapeut
                            förstår hon vikten av att ta hand om sig själv fysiskt för att må bra psykiskt.
                        </p>

                        <div className="space-y-3 mb-8 text-sm text-slate-300">
                            {/* 
               <div className="flex items-center gap-3">
                <MapPin size={16} className="text-slate-500" />
                <span>Stockholm / Online</span>
               </div>
               */}
                        </div>

                        {/* Action Button */}
                        <button
                            onClick={() => window.location.href = 'mailto:linda@klattertradet.se,billy@klattertradet.se?subject=Bokningsförfrågan via Horizonten'}
                            className="w-full bg-slate-800 hover:bg-orange-500 hover:text-slate-900 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
                        >
                            <Calendar size={18} />
                            <span>Boka Samtal</span>
                        </button>
                    </div>
                </div>

                {/* Billy Ljungberg */}
                <div className="group bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-orange-500/30 transition-all hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.15)] flex flex-col">
                    <div className="relative h-80 overflow-hidden bg-slate-800">
                        {/* Placeholder image or generic */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10 opacity-60"></div>
                        <img
                            src="/assets/billy_profil.jpeg"
                            alt="Billy Ljungberg"
                            className="w-full h-full object-cover object-top opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute bottom-4 left-4 z-20">
                            <span className="inline-block px-3 py-1 bg-green-500 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-full mb-2">
                                Grundare
                            </span>
                        </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                        <div className="mb-4">
                            <h3 className="text-2xl font-bold text-white mb-1">Billy Ljungberg</h3>
                            <p className="text-orange-400 font-medium flex items-center gap-2">
                                <Award size={16} />
                                Gestaltterapeut / Beroendeterapeut
                            </p>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                            Grundare av Klätterträdet. Specialiserad på traumamedveten omsorg, beroendeproblematik och processledning.
                        </p>
                        <button
                            onClick={() => window.location.href = 'mailto:billy@klattertradet.se?subject=Bokningsförfrågan via Horizonten'}
                            className="w-full bg-slate-800 hover:bg-orange-500 hover:text-slate-900 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
                        >
                            <Calendar size={18} />
                            <span>Boka Samtal</span>
                        </button>
                    </div>
                </div>


                {/* Mattias O Sandin */}
                <div className="group bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-orange-500/30 transition-all hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.15)] flex flex-col">
                    <div className="relative h-80 overflow-hidden bg-slate-800">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10 opacity-60"></div>
                        <div className="w-full h-full flex items-center justify-center text-slate-700">
                            <Users size={64} />
                        </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                        <div className="mb-4">
                            <h3 className="text-2xl font-bold text-white mb-1">Mattias O Sandin</h3>
                            <p className="text-orange-400 font-medium flex items-center gap-2">
                                <Award size={16} />
                                Samtalsterapeut
                            </p>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                            Erfaren terapeut som möter dig där du är. Fokus på trygghet, insikt och förändring.
                        </p>
                        <button
                            onClick={() => window.location.href = 'mailto:mattias@klattertradet.se,billy@klattertradet.se?subject=Bokningsförfrågan via Horizonten'}
                            className="w-full bg-slate-800 hover:bg-orange-500 hover:text-slate-900 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
                        >
                            <Calendar size={18} />
                            <span>Boka Samtal</span>
                        </button>
                    </div>
                </div>

                {/* Malin Widerlöv */}
                <div className="group bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-orange-500/30 transition-all hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.15)] flex flex-col">
                    <div className="relative h-80 overflow-hidden bg-slate-800">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10 opacity-60"></div>
                        <img
                            src="/assets/malin-widerlov.png"
                            alt="Malin Widerlöv"
                            className="w-full h-full object-cover object-top opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                        />
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                        <div className="mb-4">
                            <h3 className="text-2xl font-bold text-white mb-1">Malin Widerlöv</h3>
                            <p className="text-orange-400 font-medium flex items-center gap-2">
                                <Award size={16} />
                                Behandlingspedagog & Socialarbetare
                            </p>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                            Specialiserad på familjefrågor och socialt stöd. Malin fungerar även som familjeombud och stöttar i komplexa livssituationer.
                        </p>
                        <button
                            onClick={() => window.location.href = 'mailto:malin@klattertradet.se,billy@klattertradet.se?subject=Bokningsförfrågan via Horizonten'}
                            className="w-full bg-slate-800 hover:bg-orange-500 hover:text-slate-900 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
                        >
                            <Calendar size={18} />
                            <span>Boka Samtal</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Experts;
