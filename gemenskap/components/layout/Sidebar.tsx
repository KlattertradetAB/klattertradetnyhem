import React from 'react';
import { 
    Home, 
    LayoutGrid, 
    Package, 
    MessageCircle, 
    Users, 
    Shield, 
    LogOut, 
    Settings,
    ChevronLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { getEffectiveAvatar } from '../../services/userUtils';
import { Profile } from '../../types';

interface SidebarProps {
    className?: string;
    activeTab: string;
    onTabChange: (tab: any) => void;
    user: Profile;
    onLogout: () => void;
    onSettingsClick: () => void;
    onBack: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
    className,
    activeTab, 
    onTabChange, 
    user, 
    onLogout, 
    onSettingsClick,
    onBack 
}) => {
    const navItems = [
        { id: 'welcome', label: 'Välkommen hem', icon: Home },
        { id: 'dashboard', label: 'Överblick', icon: LayoutGrid },
        { id: 'resources', label: 'Resurser', icon: Package },
        { id: 'chat', label: 'Gemenskapen', icon: MessageCircle },
        { id: 'experts', label: 'Kontakt & Bokning', icon: Users },
        ...(user.role === 'admin' ? [{ id: 'admin', label: 'Admin Panel', icon: Shield }] : [])
    ];

    return (
        <aside className={cn("flex flex-col w-72 bg-slate-950/50 backdrop-blur-2xl border-r border-white/5 p-6 relative z-50 h-full overflow-y-auto", className)}>
            {/* Logo Area */}
            <div className="flex items-center gap-3 mb-12 px-2 cursor-pointer group" onClick={() => onTabChange('dashboard')}>
                <div className="w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                    <img src="/assets/logo2.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-white group-hover:text-orange-400 transition-colors">Horizonten</h1>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Gemenskap</p>
                </div>
            </div>

            {/* Back Button */}
            <div className="mb-8 px-2">
                <button
                    onClick={onBack}
                    className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm font-bold group"
                >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-orange-500/30 group-hover:bg-white/10 transition-all">
                        <ChevronLeft size={16} />
                    </div>
                    Gå bakåt
                </button>
            </div>

            {/* Navigation Menus */}
            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        className={cn(
                            "w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                            activeTab === item.id
                                ? "bg-white/10 text-white shadow-lg shadow-black/20"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <div className="flex items-center gap-3 relative z-10">
                            <item.icon size={20} className={activeTab === item.id ? 'text-orange-400' : 'group-hover:text-orange-400 transition-colors'} />
                            <span className="font-medium text-[15px]">{item.label}</span>
                        </div>

                        {/* The Fade-in White Line Effect */}
                        <div className={cn(
                            "w-1 h-8 bg-gradient-to-b from-transparent via-white to-transparent rounded-full shadow-[0_0_10px_white] absolute right-4 transition-all duration-500 ease-out transform",
                            activeTab === item.id ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-50 translate-x-4 group-hover:opacity-60 group-hover:translate-x-0 group-hover:scale-75"
                        )}></div>
                    </button>
                ))}
            </nav>

            {/* User Footer in Sidebar */}
            <div className="pt-6 border-t border-white/5 space-y-4">
                <button onClick={onSettingsClick} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-slate-400 hover:text-white group">
                    <div className="relative">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800">
                            {(() => {
                                const avatar = getEffectiveAvatar(user.email || undefined, user.avatar_url || undefined, user.role || undefined);
                                return avatar ? (
                                    <img src={avatar} alt="" className={`w-full h-full ${avatar.includes('logo2') ? 'object-contain p-1.5 bg-slate-900' : 'object-cover'}`} />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xs font-bold">{(user.full_name || 'A')[0]}</div>
                                );
                            })()}
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-slate-950"></div>
                    </div>
                    <div className="text-left flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">{(user.full_name || 'Användare').split(' ')[0]}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Inställningar</p>
                    </div>
                    <Settings size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <button
                    onClick={onLogout}
                    className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-red-900/20 group"
                >
                    <LogOut size={16} className="text-red-400 group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-red-200 group-hover:text-white transition-colors">Logga ut</span>
                </button>
            </div>
        </aside>
    );
};
