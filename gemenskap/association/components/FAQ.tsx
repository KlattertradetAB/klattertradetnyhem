import React, { useState } from 'react';
import { useTranslations } from '../hooks';
import { faqData } from '../constants';

// Fix: Define a props interface and use React.FC to correctly type the component,
// which resolves the issue with the 'key' prop being passed in a list.
interface FaqItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer, isOpen, onClick }) => (
    <div className="border-b border-gray-300/50 dark:border-slate-700/80 last:border-b-0">
        <h3 className="text-lg">
            <button
                type="button"
                className="flex items-center justify-between w-full p-5 font-semibold text-left text-slate-900 dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-md transition-colors duration-200 hover:bg-slate-100/50 dark:hover:bg-slate-700/40"
                onClick={onClick}
                aria-expanded={isOpen}
            >
                <span>{question}</span>
                <svg
                    className={`w-6 h-6 shrink-0 transition-transform duration-300 text-cyan-600 dark:text-cyan-400 ${isOpen ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
        </h3>
        <div
            className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        >
            <div className="overflow-hidden">
                <div className="p-5 pt-0 text-gray-600 dark:text-gray-300">
                    <p>{answer}</p>
                </div>
            </div>
        </div>
    </div>
);


const FAQ: React.FC = () => {
    const { t } = useTranslations();
    const faqs = faqData(t);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl lg:text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">{t.faqTitle}</h2>
                </div>
                <div className="mt-16 mx-auto max-w-4xl rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg shadow-2xl border border-white/20 dark:border-slate-700/80 overflow-hidden">
                    {faqs.map((faq, index) => (
                        <FaqItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
