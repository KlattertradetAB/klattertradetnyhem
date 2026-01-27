import React from 'react';
import { X, Share, PlusSquare, ArrowUp, Menu } from 'lucide-react';

interface InstallGuideModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const InstallGuideModal: React.FC<InstallGuideModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-sm bg-zinc-900 border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="text-center space-y-6">
                    <div className="space-y-2">
                        <h3 className="text-xl font-black text-white">Installera Appen</h3>
                        <p className="text-sm text-slate-400">
                            Följ instruktionerna för din enhet:
                        </p>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-6 space-y-4 text-left">
                        {isIOS ? (
                            <>
                                <div className="flex items-start gap-4">
                                    <div className="bg-orange-500/10 p-2 rounded-lg text-orange-500 mt-1">
                                        <Share size={20} />
                                    </div>
                                    <div>
                                        <span className="block text-white font-bold text-sm">Steg 1</span>
                                        <span className="text-slate-400 text-xs">Tryck på <span className="text-white font-medium">Dela-knappen</span> i menyn.</span>
                                    </div>
                                </div>
                                <div className="w-px h-6 bg-white/10 ml-5 my-1"></div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-orange-500/10 p-2 rounded-lg text-orange-500 mt-1">
                                        <PlusSquare size={20} />
                                    </div>
                                    <div>
                                        <span className="block text-white font-bold text-sm">Steg 2</span>
                                        <span className="text-slate-400 text-xs">Välj <span className="text-white font-medium">"Lägg till på hemskärmen"</span>.</span>
                                    </div>
                                </div>
                            </>
                        ) : isAndroid ? (
                            // Android Instructions
                            <>
                                <div className="flex items-start gap-4">
                                    <div className="bg-orange-500/10 p-2 rounded-lg text-orange-500 mt-1">
                                        <Menu size={20} />
                                    </div>
                                    <div>
                                        <span className="block text-white font-bold text-sm">Steg 1</span>
                                        <span className="text-slate-400 text-xs">Tryck på <span className="text-white font-medium">Meny-knappen</span> (tre prickar).</span>
                                    </div>
                                </div>
                                <div className="w-px h-6 bg-white/10 ml-5 my-1"></div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-orange-500/10 p-2 rounded-lg text-orange-500 mt-1">
                                        <PlusSquare size={20} />
                                    </div>
                                    <div>
                                        <span className="block text-white font-bold text-sm">Steg 2</span>
                                        <span className="text-slate-400 text-xs">Välj <span className="text-white font-medium">"Installera app"</span> eller <span className="text-white font-medium">"Lägg till på hemskärmen"</span>.</span>
                                    </div>
                                </div>
                            </>
                        ) : isSafari ? (
                            // Safari Desktop
                            <>
                                <div className="flex items-start gap-4">
                                    <div className="bg-orange-500/10 p-2 rounded-lg text-orange-500 mt-1">
                                        <Share size={20} />
                                    </div>
                                    <div>
                                        <span className="block text-white font-bold text-sm">Steg 1 (Safari)</span>
                                        <span className="text-slate-400 text-xs">Tryck på <span className="text-white font-medium">Dela-knappen</span> i verktygsfältet.</span>
                                    </div>
                                </div>
                                <div className="w-full h-px bg-white/10 my-3"></div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-orange-500/10 p-2 rounded-lg text-orange-500 mt-1">
                                        <PlusSquare size={20} />
                                    </div>
                                    <div>
                                        <span className="block text-white font-bold text-sm">Steg 2</span>
                                        <span className="text-slate-400 text-xs">Välj <span className="text-white font-medium">"Lägg till i Dock"</span>.</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            // Chrome/Edge Desktop
                            <>
                                <div className="flex items-start gap-4">
                                    <div className="bg-orange-500/10 p-2 rounded-lg text-orange-500 mt-1">
                                        <ArrowUp size={20} className="rotate-45" />
                                    </div>
                                    <div>
                                        <span className="block text-white font-bold text-sm">Alternativ 1 (Enklast)</span>
                                        <span className="text-slate-400 text-xs">Leta efter en liten <span className="text-white font-medium">dator-ikon med pil</span> i adressfältet.</span>
                                    </div>
                                </div>
                                <div className="w-full h-px bg-white/10 my-3"></div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-orange-500/10 p-2 rounded-lg text-orange-500 mt-1">
                                        <Menu size={20} />
                                    </div>
                                    <div>
                                        <span className="block text-white font-bold text-sm">Alternativ 2 (Meny)</span>
                                        <span className="text-slate-400 text-xs">Tre prickar ➔ <span className="text-white font-medium">Spara och dela</span> ➔ "Installera Horizonten..."</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="bg-orange-500/10 border border-orange-500/20 p-3 rounded-xl">
                        <p className="text-[10px] text-orange-200 text-center">
                            Ser du inte alternativen? Då har du troligen redan installerat appen! Titta i din app-lista.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
                    >
                        Jag förstår
                    </button>

                    {/* Visual Arrow pointing to bottom (useful for iOS safari) */}
                    {isIOS && (
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 translate-y-full animate-bounce text-white/50">
                            <ArrowUp size={24} className="rotate-180" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
