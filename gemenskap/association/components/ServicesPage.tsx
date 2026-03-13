
import React, { useEffect } from 'react';
import { useTranslations } from '../hooks';
import TherapistAgreement from './TherapistAgreement';

interface ServicesPageProps {
    onBack: () => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onBack }) => {
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

                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg p-8 sm:p-12 rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700 text-center mb-12">
                    
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                        {t.servicesPageTitle}
                    </h1>

                    <p className="text-xl text-slate-700 dark:text-slate-300 mb-6 font-medium leading-relaxed">
                        {t.servicesPageIntro}
                    </p>

                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
                        {t.servicesPageDesc}
                    </p>

                    <a
                        href="https://klattertradet.se/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-cyan-500 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 transition-all transform hover:scale-105"
                    >
                        {t.servicesLinkText}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>

                <div className="bg-white/80 dark:bg-slate-200/90 backdrop-blur-lg p-8 sm:p-12 rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 leading-tight text-center">
                        {t.servicesJoinTherapistTitle}
                    </h2>
                    <p className="text-lg text-slate-700 mb-10 leading-relaxed text-center">
                        {t.servicesJoinTherapistDesc}
                    </p>
                    
                    <TherapistAgreement />
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
