
import React, { useState } from 'react';
import CTAButton from './CTAButton';
import { useTranslations } from '../hooks';

const ContactForm: React.FC = () => {
    const { t } = useTranslations();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<{ name?: boolean; email?: boolean; subject?: boolean; message?: boolean }>({});

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const newErrors = {
            name: !name.trim(),
            email: !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
            subject: !subject.trim(),
            message: !message.trim(),
        };

        if (Object.values(newErrors).some(Boolean)) {
            setErrors(newErrors);
            return;
        }

        const mailtoLink = `mailto:billy@klattertradet.se?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Från: ${name} (${email})\n\n${message}`)}`;
        
        window.location.href = mailtoLink;
        
        setTimeout(() => {
            setSubmitted(true);
            setErrors({});
        }, 300);
    };

    if (submitted) {
        return (
            <div className="container mx-auto px-6 py-16 max-w-2xl text-center">
                <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg p-10 rounded-2xl shadow-xl border border-white/20 dark:border-slate-700 animate-fade-in">
                    <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">{t.contactTitle}</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                        {t.contactSuccess}
                    </p>
                    <div className="mt-10">
                         <button 
                            onClick={() => { setSubmitted(false); setName(''); setEmail(''); setSubject(''); setMessage(''); }}
                            className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline"
                        >
                            {t.contactSubmit} {t.contactNameLabel}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 max-w-4xl py-20 sm:py-28">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{t.contactTitle}</h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{t.contactSubtitle}</p>
            </div>

            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-slate-700 overflow-hidden">
                <div className="p-8 sm:p-12">
                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                        <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                            <div>
                                <label htmlFor="contact-name" className="block text-sm font-semibold leading-6 text-slate-900 dark:text-white">
                                    {t.contactNameLabel}
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        id="contact-name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className={`block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ${errors.name ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 dark:ring-slate-600 focus:ring-cyan-600'} bg-white/50 dark:bg-slate-900/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all duration-200`}
                                        placeholder={t.contactNamePlaceholder}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="contact-email" className="block text-sm font-semibold leading-6 text-slate-900 dark:text-white">
                                    {t.contactEmailLabel}
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="email"
                                        id="contact-email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={`block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ${errors.email ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 dark:ring-slate-600 focus:ring-cyan-600'} bg-white/50 dark:bg-slate-900/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all duration-200`}
                                        placeholder={t.contactEmailPlaceholder}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="contact-subject" className="block text-sm font-semibold leading-6 text-slate-900 dark:text-white">
                                    {t.contactSubjectLabel}
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        id="contact-subject"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className={`block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ${errors.subject ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 dark:ring-slate-600 focus:ring-cyan-600'} bg-white/50 dark:bg-slate-900/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all duration-200`}
                                        placeholder={t.contactSubjectPlaceholder}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="contact-message" className="block text-sm font-semibold leading-6 text-slate-900 dark:text-white">
                                    {t.contactMessageLabel}
                                </label>
                                <div className="mt-2.5">
                                    <textarea
                                        id="contact-message"
                                        rows={4}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className={`block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ${errors.message ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 dark:ring-slate-600 focus:ring-cyan-600'} bg-white/50 dark:bg-slate-900/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all duration-200 resize-none`}
                                        placeholder={t.contactMessagePlaceholder}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center pt-4">
                            <CTAButton type="submit">
                                {t.contactSubmit}
                            </CTAButton>
                        </div>
                        <p className="text-center text-xs text-gray-500 dark:text-gray-400 italic">
                            {t.newsletterSubmitNote}
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
