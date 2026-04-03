import React from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
    title: string;
    onResetTab: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onResetTab }) => {
    return (
        <header className="px-8 py-6 border-b border-white/5 backdrop-blur-md flex items-center justify-between sticky top-0 z-40 bg-slate-950/20">
            <div className="space-y-1">
                <h1 className="text-2xl font-black tracking-tight flex items-center gap-2 text-white">
                    {title}
                </h1>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-green-500">
                    <Lock className="w-3 h-3 animate-pulse" />
                    <span>Säker anslutning upprättad</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="outline" className="rounded-xl h-9 text-xs border-white/10 text-slate-300 hover:text-white hover:bg-white/5">
                    Hjälpcenter
                </Button>
                <div 
                    className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-xs cursor-pointer hover:bg-orange-500/30 transition-colors"
                    onClick={onResetTab}
                >
                    H
                </div>
            </div>
        </header>
    );
};
