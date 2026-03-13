import React from 'react';
import { useTranslations } from '../hooks';

interface SplashScreenProps {
    onEnter: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter }) => {
    const { t } = useTranslations();
    return (
        <div className="flex items-center justify-center bg-slate-900/80 p-4" style={{minHeight: '600px'}}>
            <button 
                onClick={onEnter}
                className="w-full max-w-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-white/20 dark:border-slate-700 rounded-2xl shadow-xl p-10 sm:p-16 text-center transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20 dark:hover:shadow-cyan-400/20 focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-opacity-50"
                aria-label={t.splashScreenButton}
            >
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    {t.splashScreenTitle}
                </h1>
                <p className="mt-6 text-xl text-gray-700 dark:text-gray-300">
                    {t.splashScreenSubtitle}
                </p>
            </button>
        </div>
    );
};

export default SplashScreen;
