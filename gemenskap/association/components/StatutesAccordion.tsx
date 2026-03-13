import React, { useState } from 'react';
import { useTranslations } from '../hooks';

const StatutesAccordion: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslations();

    return (
        <div className="border border-gray-300/50 dark:border-slate-700 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg shadow-2xl hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h2 className="sr-only" id="statutes-heading">{t.statutesTitle}</h2>
            <button
                type="button"
                className="flex items-center justify-between w-full p-5 font-semibold text-left text-slate-900 dark:text-white rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 transition-colors duration-200 hover:bg-slate-100/50 dark:hover:bg-slate-700/40"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls="statutes-content"
            >
                <span className="text-lg">{t.statutesTitle}</span>
                <svg
                    className={`w-6 h-6 shrink-0 transition-transform duration-300 text-cyan-600 dark:text-cyan-400 ${isOpen ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div
                id="statutes-content"
                className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                aria-labelledby="statutes-heading"
            >
                <div className="overflow-hidden">
                    <div className="p-5 pt-0 text-gray-600 dark:text-gray-300">
                       <div className="border-t border-gray-200 dark:border-slate-700 pt-4 prose prose-sm max-w-none dark:prose-invert">
                            <ol className="space-y-2 list-decimal list-inside">
                                <li><strong>{t.statutesPurpose.split(': ')[0]}:</strong> {t.statutesPurpose.split(': ')[1]}</li>
                                <li><strong>{t.statutesMembership.split(': ')[0]}:</strong> {t.statutesMembership.split(': ')[1]}</li>
                                <li><strong>{t.statutesValues.split(': ')[0]}:</strong> {t.statutesValues.split(': ')[1]}</li>
                                <li><strong>{t.statutesCommitment.split(': ')[0]}:</strong> {t.statutesCommitment.split(': ')[1]}</li>
                            </ol>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    );
  };

export default StatutesAccordion;
