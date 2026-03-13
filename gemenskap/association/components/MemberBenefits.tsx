
import React from 'react';
import { useTranslations } from '../hooks';
import { memberBenefitsData } from '../constants';

const MemberBenefits: React.FC = () => {
    const { t } = useTranslations();
    const benefits = memberBenefitsData(t);

    return (
        <div className="py-20 sm:py-28 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-y border-white/20 dark:border-slate-700/50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">{t.memberBenefitsTitle}</p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-gray-600 dark:text-gray-300 sm:grid-cols-2 lg:grid-cols-4">
                        {benefits.map((benefit) => (
                            <div key={benefit.title} className="relative pl-9">
                                <dt className="inline font-semibold text-gray-900 dark:text-white">
                                    <div className="absolute left-1 top-1 h-6 w-6 text-cyan-600 dark:text-cyan-400" aria-hidden="true">
                                       {benefit.icon}
                                    </div>
                                    {benefit.title}
                                </dt>
                                <dd className="block mt-1">{benefit.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default MemberBenefits;
