import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';
import { Profile } from '../../types';
import { LayoutGrid, Users, MessageSquare, Shield, Trash2, Edit2, Plus, ArrowLeft, Send, CheckCircle, XCircle } from 'lucide-react';

interface AdminDashboardProps {
    user: Profile;
    onBack: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onBack }) => {
    const [activeSection, setActiveSection] = useState<'overview' | 'blog' | 'therapists' | 'threads' | 'moderation'>('overview');

    // Safety check - though parent should handle this too
    if (user.role !== 'admin') {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                    <Shield className="w-16 h-16 text-red-500 mx-auto animate-pulse" />
                    <h2 className="text-2xl font-bold text-white">Åtkomst nekad</h2>
                    <p className="text-slate-400">Du har inte behörighet att se denna sida.</p>
                    <button onClick={onBack} className="px-6 py-2 bg-orange-500 rounded-xl font-bold text-slate-950">Gå tillbaka</button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-700">
            {/* Admin Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

                <div className="relative z-10 flex items-center gap-6">
                    <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                        <Shield size={32} className="text-slate-950" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tight">Admin Dashboard</h2>
                        <p className="text-orange-500 font-bold tracking-widest uppercase text-xs flex items-center gap-2 mt-1">
                            <span className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></span> Säker anslutning upprättad
                        </p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button onClick={() => setActiveSection('blog')} className="px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 font-bold transition-all border border-white/10 flex items-center gap-2">
                        <Edit2 size={18} /> Blogg
                    </button>
                    <button onClick={() => setActiveSection('threads')} className="px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 font-bold transition-all border border-white/10 flex items-center gap-2">
                        <Plus size={18} /> Ny tråd
                    </button>
                </div>
            </div>

            {/* Quick Stats / Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Aktiva medlemmar', value: '142', icon: Users, color: 'text-blue-400' },
                    { label: 'Nya trådar (7 dagar)', value: '12', icon: MessageSquare, color: 'text-orange-400' },
                    { label: 'Olästa rapporter', value: '3', icon: Shield, color: 'text-red-400' },
                    { label: 'Blogginlägg', value: '28', icon: LayoutGrid, color: 'text-green-400' },
                ].map((stat, i) => (
                    <div key={i} className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-3xl hover:border-white/10 transition-all cursor-pointer group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2 rounded-lg bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon size={20} />
                            </div>
                            <span className="text-2xl font-black text-white">{stat.value}</span>
                        </div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8">
                {activeSection === 'overview' && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white mb-6">Senaste aktivitet</h3>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((_, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-400">
                                            {String.fromCharCode(65 + i)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white">Användare {i + 1} skrev i #allmänt</p>
                                            <p className="text-xs text-slate-500">2 minuter sedan</p>
                                        </div>
                                    </div>
                                    <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {activeSection === 'blog' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white">Skapa nytt blogginlägg</h3>
                            <button onClick={() => setActiveSection('overview')} className="text-orange-500 hover:text-orange-400 font-bold text-sm">
                                Avbryt
                            </button>
                        </div>
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const form = e.target as HTMLFormElement;
                            const title = (form.elements.namedItem('title') as HTMLInputElement).value;
                            const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;
                            const content = (form.elements.namedItem('content') as HTMLTextAreaElement).value;

                            try {
                                const { error } = await supabase.from('blogs').insert({
                                    title,
                                    description,
                                    content,
                                    user_id: user.id,
                                    author_name: user.full_name || 'Admin',
                                    created_at: new Date().toISOString(),
                                });

                                if (error) throw error;

                                alert('Blogginlägg skapat!');
                                form.reset();
                                setActiveSection('overview');
                            } catch (error) {
                                console.error('Error creating blog post:', error);
                                alert('Kunde inte skapa blogginlägg. Försök igen.');
                            }
                        }} className="space-y-4">
                            <div>
                                <label className="block text-slate-400 text-sm font-bold mb-2">Rubrik</label>
                                <input
                                    name="title"
                                    type="text"
                                    required
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                                    placeholder="Vad ska blogginlägget heta?"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm font-bold mb-2">Kort beskrivning</label>
                                <textarea
                                    name="description"
                                    required
                                    rows={2}
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
                                    placeholder="En kort ingress som lockar till läsning..."
                                />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm font-bold mb-2">Bloggtext</label>
                                <textarea
                                    name="content"
                                    required
                                    rows={12}
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors resize-none font-mono text-sm leading-relaxed"
                                    placeholder="Skriv ditt inlägg här..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-orange-500 hover:bg-orange-600 text-slate-950 font-black py-4 rounded-xl transition-all shadow-lg shadow-orange-500/20"
                            >
                                Publicera inlägg
                            </button>
                        </form>
                    </div>
                )}

                {activeSection === 'threads' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white">Skapa ny tråd</h3>
                            <button onClick={() => setActiveSection('overview')} className="text-orange-500 hover:text-orange-400 font-bold text-sm">
                                Avbryt
                            </button>
                        </div>
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const form = e.target as HTMLFormElement;
                            const title = (form.elements.namedItem('title') as HTMLInputElement).value;
                            const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;
                            const category = (form.elements.namedItem('category') as HTMLSelectElement).value;

                            try {
                                const { error } = await supabase.from('threads').insert({
                                    title,
                                    description,
                                    category,
                                    user_id: user.id,
                                    author_name: user.full_name || 'Admin',
                                    created_at: new Date().toISOString(),
                                });

                                if (error) throw error;

                                alert('Tråd skapad!');
                                form.reset();
                                setActiveSection('overview');
                            } catch (error) {
                                console.error('Error creating thread:', error);
                                alert('Kunde inte skapa tråd. Försök igen.');
                            }
                        }} className="space-y-4">
                            <div>
                                <label className="block text-slate-400 text-sm font-bold mb-2">Rubrik</label>
                                <input
                                    name="title"
                                    type="text"
                                    required
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                                    placeholder="Vad handlar tråden om?"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm font-bold mb-2">Kategori</label>
                                <select
                                    name="category"
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                                >
                                    <option value="general">Allmänt</option>
                                    <option value="announcements">Meddelanden</option>
                                    <option value="support">Stöd</option>
                                    <option value="events">Event</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm font-bold mb-2">Beskrivning</label>
                                <textarea
                                    name="description"
                                    required
                                    rows={4}
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
                                    placeholder="Beskriv ämnet..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-orange-500 hover:bg-orange-600 text-slate-950 font-black py-4 rounded-xl transition-all shadow-lg shadow-orange-500/20"
                            >
                                Publicera tråd
                            </button>
                        </form>
                    </div>
                )}

                {activeSection !== 'overview' && activeSection !== 'threads' && activeSection !== 'blog' && (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                        <div className="w-20 h-20 bg-orange-500/10 rounded-3xl flex items-center justify-center animate-pulse">
                            <Plus size={40} className="text-orange-500" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-white">Hantering av {activeSection}</h3>
                            <p className="text-slate-400 max-w-md mx-auto">Här kommer du kunna skapa, redigera och ta bort innehåll. Denna funktion byggs ut i nästa steg.</p>
                        </div>
                        <button onClick={() => setActiveSection('overview')} className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-bold transition-all flex items-center gap-2">
                            <ArrowLeft size={18} /> Tillbaka till överblick
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
