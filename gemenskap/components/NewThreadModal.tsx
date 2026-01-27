import React, { useState } from 'react';
import { X, Send, Sparkles } from 'lucide-react';

interface NewThreadModalProps {
    onClose: () => void;
}

export const NewThreadModal: React.FC<NewThreadModalProps> = ({ onClose }) => {
    const [threadName, setThreadName] = useState('');
    const [purpose, setPurpose] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const subject = encodeURIComponent(`Förslag på ny diskussionstråd: ${threadName}`);
        const body = encodeURIComponent(
            `Föreslaget namn på tråd: ${threadName}\n\n` +
            `Förklaring/Syfte med tråden:\n${purpose}`
        );

        window.location.href = `mailto:billy@klattertradet.se?subject=${subject}&body=${body}`;
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
            {/* Glass backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-md animate-in fade-in duration-300"
                onClick={onClose}
            />

            <div className="relative bg-slate-900/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 w-full max-w-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 duration-500 overflow-hidden">
                {/* Decorative background glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl" />

                <div className="relative z-10">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-orange-500/20 rounded-2xl text-orange-500">
                                <Sparkles size={24} />
                            </div>
                            <h2 className="text-2xl font-black text-white italic tracking-tight">Öppna ny tråd</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-slate-500 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="mb-8 space-y-2">
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Har du ett ämne du vill diskutera med gemenskapen? Lämna ett förslag på en ny tråd nedan.
                        </p>
                        <p className="text-orange-500/80 text-xs font-bold italic">
                            Vi går igenom alla förslag och återkopplar snabbt om tråden läggs upp.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Trådens namn</label>
                            <input
                                required
                                type="text"
                                value={threadName}
                                onChange={e => setThreadName(e.target.value)}
                                placeholder="T.ex. Hantering av stress i vardagen"
                                className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/40 transition-all font-medium"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Förklaring / Syfte</label>
                            <textarea
                                required
                                value={purpose}
                                onChange={e => setPurpose(e.target.value)}
                                placeholder="Berätta kort varför denna tråd behövs och vad syftet är..."
                                rows={4}
                                className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/40 transition-all font-medium resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-400 text-slate-950 font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_10px_30px_rgba(249,115,22,0.3)] group"
                        >
                            Skicka in
                            <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
