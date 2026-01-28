import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import AssistantChat from './AssistantChat';
import { Profile } from '../../types';

interface AssistantFabProps {
    user: Profile | null;
}

const AssistantFab: React.FC<AssistantFabProps> = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* The Chat Window (Fixed Overlay) */}
            <div className={`
                fixed z-50 transition-all duration-500 ease-in-out
                ${isOpen
                    ? 'bottom-24 right-4 md:right-8 w-[calc(100vw-2rem)] md:w-[400px] h-[600px] max-h-[80vh] opacity-100 translate-y-0 scale-100'
                    : 'bottom-8 right-8 w-0 h-0 opacity-0 translate-y-20 scale-90 pointer-events-none'}
            `}>
                <AssistantChat user={user} onClose={() => setIsOpen(false)} />
            </div>

            {/* The Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50
                    w-14 h-14 md:w-16 md:h-16 rounded-full 
                    bg-gradient-to-r from-indigo-600 to-purple-600 
                    text-white shadow-lg shadow-indigo-500/40 
                    flex items-center justify-center 
                    transition-all duration-300 hover:scale-110 active:scale-95
                    ${isOpen ? 'rotate-90' : 'rotate-0'}
                `}
            >
                {isOpen ? (
                    <div className="w-8 h-1 bg-white rounded-full"></div> // Fallback close icon visual
                ) : (
                    <Sparkles size={28} className="animate-pulse" />
                )}
            </button>
        </>
    );
};

export default AssistantFab;
