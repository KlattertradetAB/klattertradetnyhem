
import React, { useEffect } from 'react';
import { useTranslations } from '../hooks';
import { BookAuthor } from './BookAuthor';

interface AboutPageProps {
    onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
    const { t } = useTranslations();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={onBack}
                    className="mb-8 flex items-center text-slate-600 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform duration-200 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    {t.goBack}
                </button>

                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg p-8 sm:p-12 rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700 mb-12">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight text-center">
                        {t.navAbout} Horizonten
                    </h1>
                    
                    <div className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
                        <p className="text-xl font-medium leading-relaxed mb-8">
                            Horizonten är mer än bara en förening; det är en rörelse för personlig utveckling, mental hälsa och samhällsengagemang.
                        </p>
                        
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">Vår Vision</h2>
                        <p>
                            Vi strävar efter att skapa ett samhälle där mental hälsa och personlig utveckling är tillgängligt för alla. Genom att kombinera digitala verktyg med mänsklig gemenskap bygger vi en plattform för läkning och tillväxt.
                        </p>

                        <div className="bg-cyan-50 dark:bg-cyan-900/20 p-6 rounded-xl border border-cyan-100 dark:border-cyan-800 my-10">
                            <h3 className="text-xl font-bold text-cyan-800 dark:text-cyan-300 mb-3">En Integrerad Syn på Läkning</h3>
                            <p className="text-sm italic mb-0">
                                Vi ser människan som en helhet i samspel med sin omgivning. Genom att kombinera fältteori med praktisk self-care skapar vi förutsättningar för djupgående läkning. Vi förstår att trauma inte bara är en inre process utan något som påverkas av de fält vi verkar i – familj, samhälle och kultur.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">Vilka är vi?</h2>
                    <BookAuthor />
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
