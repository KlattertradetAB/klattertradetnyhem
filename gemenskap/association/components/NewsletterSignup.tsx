import React, { useState } from 'react';
import { useTranslations } from '../hooks';

const NewsletterSignup: React.FC = () => {
    const { t } = useTranslations();
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError(t.newsletterError);
            return;
        }
        setError('');
        
        const subject = encodeURIComponent(`Anmälan till nyhetsbrev från Horizonten Gemenskap`);
        const body = encodeURIComponent(
`Hej,

En ny person har anmält sig till nyhetsbrevet.

E-postadress: ${email}

Vänligen lägg till denna adress i sändlistan.

Hälsningar,
Webbplatsen`
        );
        const mailtoLink = `mailto:billy@klattertradet.se?subject=${subject}&body=${body}`;

        window.location.href = mailtoLink;

        setTimeout(() => {
            setSubmitted(true);
        }, 300);
    };

    return (
        <div className="py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="relative isolate overflow-hidden bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-white/20 dark:border-slate-700/80 px-6 py-16 text-center shadow-2xl rounded-2xl sm:px-16">
                    <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]" aria-hidden="true">
                        <circle cx={512} cy={512} r={512} fill="url(#newsletter-gradient)" fillOpacity="0.5" />
                        <defs>
                            <radialGradient id="newsletter-gradient">
                            <stop stopColor="#fbbf24" />
                            <stop offset={1} stopColor="#fef08a" />
                            </radialGradient>
                        </defs>
                    </svg>
                    <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        {t.newsletterTitle}
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
                        {t.newsletterSubtitle}
                    </p>
                    {submitted ? (
                        <div className="mt-10 text-xl font-semibold text-cyan-700 dark:text-cyan-400">
                            {t.newsletterSuccess}
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="mt-10 mx-auto max-w-md">
                            <div className="flex gap-x-4">
                                <label htmlFor="email-address" className="sr-only">
                                    {t.newsletterEmailPlaceholder}
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="min-w-0 flex-auto rounded-md border-0 bg-white/80 dark:bg-slate-900/80 px-3.5 py-2 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6 placeholder:text-gray-500"
                                    placeholder={t.newsletterEmailPlaceholder}
                                    aria-label={t.newsletterEmailPlaceholder}
                                />
                                <button
                                    type="submit"
                                    className="flex-none rounded-md bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                                >
                                    {t.newsletterButton}
                                </button>
                            </div>
                            {error && <p className="mt-4 text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
                             <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                                {t.newsletterSubmitNote}
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewsletterSignup;