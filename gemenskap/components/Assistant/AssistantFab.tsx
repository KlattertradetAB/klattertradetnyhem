import React from 'react';
import { X } from 'lucide-react';
import AssistantChat from './AssistantChat';
import { Profile } from '../../types';
import { useAssistant } from '../../contexts/AssistantContext';

interface AssistantFabProps {
    user: Profile | null;
    isChatActive?: boolean;
}

const AssistantFab: React.FC<AssistantFabProps> = ({ user, isChatActive = false }) => {
    const { isOpen, setIsOpen } = useAssistant();

    return (
        <>
            {/* The Chat Window (Fixed Overlay) */}
            <div className={`
                fixed z-[60] transition-all duration-500 ease-in-out
                ${isOpen
                    ? `bottom-24 ${isChatActive ? 'mb-20' : ''} right-4 md:right-8 w-[calc(100vw-2rem)] md:w-[400px] h-[600px] max-h-[80vh] opacity-100 translate-y-0 scale-100`
                    : 'bottom-8 right-8 w-0 h-0 opacity-0 translate-y-20 scale-90 pointer-events-none'}
            `}>
                <AssistantChat user={user} onClose={() => setIsOpen(false)} />
            </div>

            {/* The Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    fixed ${isChatActive ? 'bottom-24 md:bottom-8' : 'bottom-6 md:bottom-8'} right-6 md:right-8 z-[60]
                    w-14 h-14 md:w-16 md:h-16 rounded-[1.8rem] md:rounded-[2.2rem]
                    bg-white/10 backdrop-blur-2xl border border-white/20
                    shadow-[0_8px_32px_rgba(0,0,0,0.4)]
                    flex items-center justify-center 
                    transition-all duration-500 hover:scale-110 active:scale-95 group
                    hover:bg-white/15 hover:border-white/30
                    ${isOpen ? 'rotate-90' : 'rotate-0'}
                `}
            >
                <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>

                {isOpen ? (
                    <X size={28} className="text-white drop-shadow-md" />
                ) : (
                    <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-xl overflow-hidden group-hover:scale-110 transition-transform duration-300">
                        <img
                            src="/logo2.png"
                            alt="Assistent"
                            className="w-full h-full object-contain drop-shadow-lg p-0.5"
                        />
                    </div>
                )}

                {/* Tooltip */}
                {!isOpen && (
                    <div className="absolute right-full mr-4 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Behöver du hjälp?
                    </div>
                )}
            </button>
        </>
    );
};

export default AssistantFab;
