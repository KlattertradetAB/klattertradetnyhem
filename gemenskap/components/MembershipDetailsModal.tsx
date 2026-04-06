import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Star, Zap, Shield, MessageCircle, Video, Book, Download, Users, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MembershipDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpgrade: () => void;
}

const MembershipDetailsModal: React.FC<MembershipDetailsModalProps> = ({ isOpen, onClose, onUpgrade }) => {
    if (!isOpen) return null;

    const features = [
        { name: 'Community Forum', gratis: true, premium: true, category: 'Socialt' },
        { name: 'Offentliga diskussioner', gratis: true, premium: true, category: 'Socialt' },
        { name: 'Privata trådar (Trygga rummet)', gratis: false, premium: true, category: 'Socialt' },
        { name: 'Direktmeddelanden', gratis: 'Begränsat', premium: 'Obegränsat', category: 'Socialt' },
        { name: 'Deltagande i videorum', gratis: 'Lyssna', premium: 'Prata & Dela', category: 'Video' },
        { name: 'Boka egna mötesrum', gratis: false, premium: true, category: 'Video' },
        { name: 'Månatliga workshops', gratis: false, premium: true, category: 'Lärande' },
        { name: 'Hela Kunskapsbanken', gratis: 'Grundurval', premium: 'Full tillgång', category: 'Lärande' },
        { name: 'E-bok (Arbetsblad)', gratis: false, premium: true, category: 'Resurser' },
        { name: 'Direktkontakt experter', gratis: false, premium: true, category: 'Support' },
        { name: 'Förtur på kurser', gratis: false, premium: true, category: 'Support' },
    ];

    const categories = Array.from(new Set(features.map(f => f.category)));

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-8 overflow-hidden">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-5xl h-[90vh] md:h-auto max-h-[850px] bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-[0_20px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
                >
                    {/* Header bg glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-40 bg-orange-500/10 blur-[80px] pointer-events-none"></div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-all z-50"
                    >
                        <X size={20} />
                    </button>

                    {/* Content Area */}
                    <div className="relative z-10 flex flex-col h-full">
                        {/* Header Section */}
                        <div className="p-8 md:p-12 text-center space-y-4 shrink-0">
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-widest mb-2"
                            >
                                <Star size={14} className="fill-current" />
                                Medlemskapsjämförelse
                            </motion.div>
                            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                                Välj den nivå som <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-white">passar din resa bäst</span>
                            </h2>
                        </div>

                        {/* Comparison Table/List */}
                        <div className="flex-grow overflow-y-auto px-6 md:px-12 pb-12 no-scrollbar">
                            <div className="w-full space-y-12">
                                {/* Comparison Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Gratis Card */}
                                    <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 md:p-10 space-y-8 flex flex-col">
                                        <div className="space-y-2">
                                            <div className="text-orange-500/40 font-black uppercase tracking-widest text-[10px]">Nivå 1</div>
                                            <h3 className="text-2xl font-black text-white">Basmedlem</h3>
                                            <p className="text-slate-400 text-sm font-light leading-relaxed italic">"För dig som vill doppa tårna och känna in gemenskapen."</p>
                                        </div>
                                        <div className="text-3xl font-black text-white">0 kr <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">/ för alltid</span></div>
                                        
                                        <div className="space-y-4 pt-4 flex-grow border-t border-white/5">
                                            {features.filter(f => f.gratis).slice(0, 4).map((f, i) => (
                                                <div key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                                                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                                                        <Check size={12} />
                                                    </div>
                                                    <span className="font-medium">{f.name}</span>
                                                    {typeof f.gratis === 'string' && <span className="text-[10px] px-2 py-0.5 bg-white/5 rounded text-slate-500">{f.gratis}</span>}
                                                </div>
                                            ))}
                                        </div>

                                        <button 
                                            onClick={onClose}
                                            className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-black text-xs uppercase tracking-widest rounded-2xl border border-white/5 transition-all"
                                        >
                                            Behåll mitt gratis konto
                                        </button>
                                    </div>

                                    {/* Premium Card */}
                                    <div className="relative group overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-600 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity"></div>
                                        <div className="bg-slate-900 border-2 border-orange-500/30 rounded-[2.5rem] p-8 md:p-10 space-y-8 flex flex-col relative z-10 shadow-[0_20px_50px_rgba(179,92,42,0.15)] h-full ring-1 ring-orange-500/20">
                                            <div className="absolute top-6 right-8">
                                                <div className="px-4 py-1.5 bg-orange-500 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg shadow-orange-500/40">Mest Kraftfull</div>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="text-orange-500 font-black uppercase tracking-widest text-[10px]">Nivå 2</div>
                                                <h3 className="text-2xl font-black text-white">Premium</h3>
                                                <p className="text-orange-200/50 text-sm font-light leading-relaxed italic">"Verktygslådan för dig som väljer tillväxt och empowerment."</p>
                                            </div>
                                            <div className="text-3xl font-black text-white italic tracking-tight">149 kr <span className="text-xs text-orange-500/50 uppercase tracking-widest font-black">/ månad</span></div>
                                            
                                            <div className="space-y-4 pt-4 flex-grow border-t border-white/5">
                                                {features.filter(f => f.premium).slice(0, 6).map((f, i) => (
                                                    <div key={i} className="flex items-center gap-3 text-white text-sm">
                                                        <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-slate-950">
                                                            <Check size={12} strokeWidth={4} />
                                                        </div>
                                                        <span className="font-bold">{f.name}</span>
                                                    </div>
                                                ))}
                                                <div className="text-[10px] text-orange-400/60 font-bold uppercase tracking-widest pt-2">+ Mycket mer...</div>
                                            </div>

                                            <button 
                                                onClick={onUpgrade}
                                                className="w-full py-5 bg-orange-500 hover:bg-orange-400 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-orange-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                                            >
                                                Starta Premiumresa <Zap size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Full Feature Comparison Table */}
                                <div className="space-y-6 pt-12">
                                    <div className="text-center space-y-2">
                                        <h4 className="text-xl font-bold text-white tracking-tight">Fullständig Funktionsmatris</h4>
                                        <p className="text-slate-500 text-sm font-light">Se de tekniska skillnaderna i detalj</p>
                                    </div>

                                    <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden">
                                        {categories.map((cat, catIdx) => (
                                            <div key={cat} className={cn("divide-y divide-white/5", catIdx !== 0 && "border-t border-white/5")}>
                                                <div className="bg-white/[0.03] px-8 py-3">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500/60">{cat}</span>
                                                </div>
                                                {features.filter(f => f.category === cat).map((f, i) => (
                                                    <div key={i} className="grid grid-cols-6 gap-4 px-8 py-5 items-center hover:bg-white/[0.01] transition-colors">
                                                        <div className="col-span-3 text-sm font-medium text-slate-300">{f.name}</div>
                                                        <div className="col-span-1.5 flex justify-center">
                                                            {f.gratis === true ? <Check size={18} className="text-green-500/50" /> : f.gratis === false ? <X size={18} className="text-slate-800" /> : <span className="text-[10px] font-bold text-slate-500 uppercase">{f.gratis}</span>}
                                                        </div>
                                                        <div className="col-span-1.5 flex justify-center">
                                                            {f.premium === true ? <Check size={18} className="text-orange-500" /> : <span className="text-[10px] font-bold text-white uppercase">{f.premium}</span>}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer Note */}
                                <div className="text-center py-8">
                                    <p className="text-slate-500 text-xs font-light max-w-lg mx-auto leading-relaxed">
                                        Ingen bindningstid. Avsluta eller nedgradera när du vill. Priset inkluderar full tillgång till Horizonten Community - den ideella föreningen.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default MembershipDetailsModal;
