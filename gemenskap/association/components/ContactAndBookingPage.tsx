
import React, { useEffect } from 'react';
import ContactForm from './ContactForm';
import { useTranslations } from '../hooks';

interface ContactAndBookingPageProps {
    onBack: () => void;
}

const ContactAndBookingPage: React.FC<ContactAndBookingPageProps> = ({ onBack }) => {
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

                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-slate-700 overflow-hidden">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
};

export default ContactAndBookingPage;
