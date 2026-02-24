import React, { useState, useEffect } from 'react';
import { Smartphone } from 'lucide-react';
import { InstallGuideModal } from './InstallGuideModal';

export const InstallButton = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [showGuide, setShowGuide] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        // Check if already installed
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
            (window.navigator as any).standalone === true;

        if (isStandalone) {
            setIsInstalled(true);
            setIsVisible(false);
            return;
        }

        const handleBeforeInstallPrompt = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsVisible(true);
        };

        const handleAppInstalled = () => {
            setIsInstalled(true);
            setIsVisible(false);
            setDeferredPrompt(null);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        // Show button after a moment (for browsers without native prompt)
        const timer = setTimeout(() => setIsVisible(true), 1500);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
            clearTimeout(timer);
        };
    }, []);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            // Native prompt available (Chrome/Edge/Android)
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                setDeferredPrompt(null);
                setIsVisible(false);
            }
        } else {
            // Show manual guide modal (Safari/iOS/etc)
            setShowGuide(true);
        }
    };

    if (!isVisible || isInstalled) return null;

    return (
        <>
            <button
                onClick={handleInstallClick}
                className="fixed bottom-6 left-6 z-50 group animate-in fade-in slide-in-from-bottom-5 duration-700"
                aria-label="Installera Horizonten-appen"
            >
                {/* Liquid Glass Container */}
                <div className="relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(31,38,135,0.37)] rounded-2xl p-4 transition-all duration-300 group-hover:bg-white/15 group-hover:scale-105 group-hover:shadow-[0_8px_32px_rgba(249,115,22,0.2)]">

                    {/* Shiny reflection effect */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-lg p-2 shadow-inner text-white">
                            <Smartphone size={20} className="drop-shadow-sm" />
                        </div>
                        <div className="text-left">
                            <span className="block text-[10px] font-bold text-white/60 uppercase tracking-widest">Premium</span>
                            <span className="block text-sm font-bold text-white leading-none group-hover:text-orange-200 transition-colors">Installera App</span>
                        </div>
                    </div>

                    {/* Liquid Blob Background */}
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-orange-500/20 rounded-full blur-2xl group-hover:bg-orange-500/30 transition-all duration-500"></div>
                </div>
            </button>

            <InstallGuideModal
                isOpen={showGuide}
                onClose={() => setShowGuide(false)}
            />
        </>
    );
};
