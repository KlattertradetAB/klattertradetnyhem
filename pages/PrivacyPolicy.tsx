import React from 'react';
import { Page } from '../types';
import { ArrowLeft, ShieldCheck, Lock, Database, UserCheck, Scale, Mail, Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PrivacyPolicyProps {
    setPage: (page: Page) => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ setPage }) => {
    const { t } = useLanguage();
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 animate-fade-in max-w-4xl space-y-16">
            <button
                onClick={() => setPage(Page.HOME)}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                {t.back_btn}
            </button>

            {/* Header */}
            <div className="glass bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-500/10 to-transparent pointer-events-none"></div>
                <div className="relative z-10 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">{t.privacy_title}</h1>
                    <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">{t.privacy_updated}</p>
                    <div className="pt-6 border-t border-white/10">
                        <p className="text-slate-300 font-bold">{t.privacy_controller}</p>
                    </div>
                </div>
            </div>

            {/* Main Content Sections */}
            <div className="space-y-12">

                <section className="space-y-6">
                    <div className="flex items-center gap-3 text-orange-400">
                        <ShieldCheck size={28} />
                        <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{t.privacy_promise_title}</h3>
                    </div>
                    <p className="text-slate-300 text-lg leading-relaxed font-light italic">
                        {t.privacy_promise_quote}
                    </p>
                    <p className="text-slate-400 leading-relaxed">
                        {t.privacy_promise_text}
                    </p>
                </section>

                <section className="glass bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 space-y-8">
                    <div className="flex items-center gap-3 text-blue-400">
                        <Database size={24} />
                        <h3 className="text-xl font-bold text-white uppercase tracking-tight">{t.privacy_data_title}</h3>
                    </div>
                    <div className="grid gap-6">
                        <div className="space-y-2">
                            <h4 className="text-white font-bold">{t.privacy_data_bankid_title}</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">{t.privacy_data_bankid_text}</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-white font-bold">{t.privacy_data_content_title}</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">{t.privacy_data_content_text}</p>
                        </div>
                    </div>
                </section>

                <section className="space-y-8">
                    <div className="flex items-center gap-3 text-green-400">
                        <Lock size={24} />
                        <h3 className="text-xl font-bold text-white uppercase tracking-tight">{t.privacy_protection_title}</h3>
                    </div>
                    <p className="text-slate-300 leading-relaxed font-light">
                        {t.privacy_protection_text}
                    </p>
                </section>

                <section className="glass bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 text-orange-400">
                        <Scale size={24} />
                        <h3 className="text-xl font-bold text-white uppercase tracking-tight">{t.privacy_chat_journal_title}</h3>
                    </div>
                    <div className="space-y-4 text-slate-300">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                            <p><strong>{t.privacy_chat_journal_chat_title}</strong> {t.privacy_chat_journal_chat_text}</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                            <p><strong>{t.privacy_chat_journal_therapy_title}</strong> {t.privacy_chat_journal_therapy_text}</p>
                        </div>
                    </div>
                </section>

                <section className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h4 className="text-white font-bold flex items-center gap-2 tracking-tight uppercase text-sm"><UserCheck size={18} className="text-blue-400" /> {t.privacy_rights_title}</h4>
                        <ul className="text-slate-400 text-xs space-y-2 leading-relaxed">
                            <li>• {t.privacy_rights_item1}</li>
                            <li>• {t.privacy_rights_item2}</li>
                            <li>• {t.privacy_rights_item3}</li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-white font-bold flex items-center gap-2 tracking-tight uppercase text-sm"><Mail size={18} className="text-orange-400" /> {t.privacy_contact_title}</h4>
                        <div className="text-slate-400 text-xs leading-relaxed whitespace-pre-line">
                            {t.privacy_contact_text}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
