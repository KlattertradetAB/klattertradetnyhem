import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Profile } from '../../types';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ChevronLeft } from 'lucide-react';

interface CommunityLayoutProps {
    children: React.ReactNode;
    activeTab: string;
    onTabChange: (tab: any) => void;
    user: Profile;
    onLogout: () => void;
    onSettingsClick: () => void;
    onBack: () => void;
}

export const CommunityLayout: React.FC<CommunityLayoutProps> = ({
    children,
    activeTab,
    onTabChange,
    user,
    onLogout,
    onSettingsClick,
    onBack
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const getTitle = () => {
        switch (activeTab) {
            case 'welcome': return 'Välkommen hem';
            case 'dashboard': return 'Överblick';
            case 'resources': return 'Resurser';
            case 'chat': return 'Forum';
            case 'experts': return 'Kontakt & Bokning';
            case 'admin': return 'Admin Panel';
            default: return 'Community';
        }
    };

    return (
        <div className="flex h-screen bg-slate-950 overflow-hidden font-sans">
            {/* Desktop Sidebar */}
            <Sidebar
                className="hidden md:flex"
                activeTab={activeTab}
                onTabChange={(tab) => {
                    onTabChange(tab);
                    setIsMobileMenuOpen(false);
                }}
                user={user}
                onLogout={onLogout}
                onSettingsClick={onSettingsClick}
                onBack={onBack}
            />

            {/* Mobile Header */}
            <header className="md:hidden fixed top-0 left-0 right-0 h-20 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl z-50 flex items-end justify-between px-6 pb-4 pt-safe">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onBack}
                        className="p-2.5 rounded-xl bg-white/5 border border-white/10 active:scale-95 transition-transform"
                    >
                        <ChevronLeft size={20} className="text-slate-400" />
                    </button>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-orange-500 font-black uppercase tracking-widest leading-none mb-1">Horizonten</span>
                        <span className="font-bold text-white text-base leading-none">{getTitle()}</span>
                    </div>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2.5 text-slate-400 hover:text-white bg-white/5 border border-white/10 rounded-xl"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="w-72 h-full bg-slate-950 border-r border-white/5"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Sidebar
                                activeTab={activeTab}
                                onTabChange={(tab) => {
                                    onTabChange(tab);
                                    setIsMobileMenuOpen(false);
                                }}
                                user={user}
                                onLogout={onLogout}
                                onSettingsClick={onSettingsClick}
                                onBack={onBack}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900/50 to-orange-950/10">
                <div className="hidden md:block">
                    <Header title={getTitle()} onResetTab={() => onTabChange('welcome')} />
                </div>

                <section className="flex-1 overflow-auto md:pt-0 pt-20 custom-scrollbar">
                    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="min-h-full"
                            >
                                {children}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </section>
            </main>
        </div>
    );
};
