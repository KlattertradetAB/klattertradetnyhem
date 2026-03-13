

import React, { useEffect } from 'react';
import CTAButton from './CTAButton';
import { useTranslations } from '../hooks';
import { Share2, Shield, Zap } from 'lucide-react';

interface MembershipPromoProps {
    onNavigateToApplication: () => void;
    onBack: () => void;
}

const MembershipPromo: React.FC<MembershipPromoProps> = ({ onNavigateToApplication, onBack }) => {
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

                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg p-8 sm:p-12 rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700">
                    
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight text-center">
                        {t.membershipPromoTitle}
                    </h1>

                    <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
                        {t.membershipPromoIntro}
                    </p>

                    <div className="mb-10">
                        <h2 className="text-2xl font-bold text-cyan-700 dark:text-cyan-400 mb-4">
                            {t.membershipPromoWhyTitle}
                        </h2>
                        <p className="text-slate-700 dark:text-slate-300 mb-4 italic">
                            {t.membershipPromoWhyIntro}
                        </p>
                        <ul className="space-y-4 pl-4">
                            <li className="flex items-start">
                                <span className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-amber-500 mr-3"></span>
                                <div>
                                    <strong className="block text-slate-900 dark:text-white text-lg mb-1">{t.membershipPromoPoint1Title}</strong>
                                    <span className="text-slate-600 dark:text-slate-400">{t.membershipPromoPoint1Desc}</span>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-amber-500 mr-3"></span>
                                <div>
                                    <strong className="block text-slate-900 dark:text-white text-lg mb-1">{t.membershipPromoPoint2Title}</strong>
                                    <span className="text-slate-600 dark:text-slate-400">{t.membershipPromoPoint2Desc}</span>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-amber-500 mr-3"></span>
                                <div>
                                    <strong className="block text-slate-900 dark:text-white text-lg mb-1">{t.membershipPromoPoint3Title}</strong>
                                    <span className="text-slate-600 dark:text-slate-400">{t.membershipPromoPoint3Desc}</span>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-amber-500 mr-3"></span>
                                <div>
                                    <strong className="block text-slate-900 dark:text-white text-lg mb-1">{t.membershipPromoPoint4Title}</strong>
                                    <span className="text-slate-600 dark:text-slate-400">{t.membershipPromoPoint4Desc}</span>
                                </div>
                            </li>
                        </ul>

                        {/* NEW PILLARS SECTION */}
                        <div className="relative mt-12 lg:mt-16">
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                                {/* Pillar 1 */}
                                <div className="flex flex-col bg-slate-50 dark:bg-slate-700/50 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 border border-slate-200 dark:border-slate-600">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-cyan-600 text-white mb-6">
                                        <Share2 className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{t.promoPillar1Title}</h3>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 flex-grow leading-relaxed">
                                        {t.promoPillar1Desc}
                                    </p>
                                    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-600">
                                        <p className="text-xs text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wide">{t.promoPillar1Tag}</p>
                                    </div>
                                </div>

                                {/* Pillar 2 */}
                                <div className="flex flex-col bg-slate-50 dark:bg-slate-700/50 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 border border-slate-200 dark:border-slate-600">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-cyan-600 text-white mb-6">
                                        <Shield className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{t.promoPillar2Title}</h3>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 flex-grow leading-relaxed">
                                        {t.promoPillar2Desc}
                                    </p>
                                    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-600">
                                        <p className="text-xs text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wide">{t.promoPillar2Tag}</p>
                                    </div>
                                </div>

                                {/* Pillar 3 */}
                                <div className="flex flex-col bg-slate-50 dark:bg-slate-700/50 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 border border-slate-200 dark:border-slate-600">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-cyan-600 text-white mb-6">
                                        <Zap className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{t.promoPillar3Title}</h3>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 flex-grow leading-relaxed">
                                        {t.promoPillar3Desc}
                                    </p>
                                    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-600">
                                        <p className="text-xs text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wide">{t.promoPillar3Tag}</p>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-700/50 p-8 rounded-xl border border-slate-200 dark:border-slate-600 mb-10 text-center">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                            {t.membershipPromoInvestmentTitle}
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 mb-6">
                            {t.membershipPromoInvestmentText}
                        </p>
                        
                        <div className="inline-block bg-amber-100 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-700 rounded-lg px-6 py-4 mb-6 transform scale-110 shadow-lg">
                            <span className="italic text-amber-700 dark:text-amber-300 text-2xl sm:text-3xl font-bold">
                                ”{t.membershipPromoPrice}”
                            </span>
                        </div>

                        <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed max-w-2xl mx-auto">
                            {t.membershipPromoFeeDetails}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {t.membershipPromoValidity}
                        </p>
                    </div>

                    <div className="text-center">
                        <p className="italic text-xl text-slate-800 dark:text-slate-200 mb-6 font-medium">
                            ”{t.membershipPromoReady}”
                        </p>
                        <p className="font-extrabold text-lg text-slate-900 dark:text-white mb-6 uppercase tracking-wider">
                            ”{t.membershipPromoClickBelow}”
                        </p>
                        <div className="inline-block">
                            <CTAButton onClick={onNavigateToApplication}>
                                {t.membershipPromoButton}
                            </CTAButton>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MembershipPromo;
