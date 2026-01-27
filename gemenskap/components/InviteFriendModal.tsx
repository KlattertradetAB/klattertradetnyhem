import React, { useState } from 'react';
import { X, Send, UserPlus, Mail } from 'lucide-react';

interface InviteFriendModalProps {
    onClose: () => void;
}

export const InviteFriendModal: React.FC<InviteFriendModalProps> = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const subject = encodeURIComponent('Inbjudan till Horizonten Gemenskap');
        const defaultBody = `Hej!\n\nJag är medlem i Horizonten och tror att det skulle vara något för dig. Det är en plats för personlig utveckling och gemenskap.\n\nKolla in det här: https://klattertradet.se\n\n${message ? `\nMeddelande från mig:\n${message}` : ''}`;

        const body = encodeURIComponent(defaultBody);

        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
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
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl" />

                <div className="relative z-10">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-indigo-500/20 rounded-2xl text-indigo-400">
                                <UserPlus size={24} />
                            </div>
                            <h2 className="text-2xl font-black text-white italic tracking-tight">Bjud in en vän</h2>
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
                            Känner du någon som skulle uppskatta gemenskapen? Skicka en inbjudan direkt via mejl.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Vännens E-post</label>
                            <div className="relative">
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="namn@exempel.se"
                                    className="w-full bg-slate-950/50 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/40 transition-all font-medium"
                                />
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Personligt meddelande (Frivilligt)</label>
                            <textarea
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                placeholder="Skriv en personlig hälsning..."
                                rows={3}
                                className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/40 transition-all font-medium resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_10px_30px_rgba(79,70,229,0.3)] group"
                        >
                            Skicka inbjudan
                            <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
