import React, { useState } from 'react';
import { translations } from '@/gemenskap/translations';

const NewsletterSignup: React.FC = () => {
    // Använd de svenska översättningarna direkt för att undvika kontext-kraschar utanför GemenskapApp
    const t = translations['sv'];
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError(t.newsletterError || 'Ogiltig e-postadress');
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
        <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] my-12 overflow-hidden">
            {/* Frosted Glass Background Layer */}
            <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-2xl border-y border-white/10"></div>

            {/* Subtle top edge highlight to give glass depth */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            {/* Subtle decorative glow in center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 blur-[120px] pointer-events-none opacity-20"></div>

            <div className="relative z-10 max-w-7xl mx-auto py-16 px-6 md:px-12 flex flex-col items-center text-center">
                <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
                    {t.newsletterTitle || 'Prenumerera på vårt nyhetsbrev'}
                </h2>
                <p className="mx-auto max-w-xl text-lg text-white/60 mb-10">
                    {t.newsletterSubtitle || 'Få de senaste uppdateringarna och nyheterna direkt till din inkorg.'}
                </p>
                {submitted ? (
                    <div className="mt-10 text-xl font-semibold text-cyan-400">
                        {t.newsletterSuccess || 'Tack för din anmälan!'}
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="mx-auto max-w-md w-full">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <label htmlFor="email-address" className="sr-only">
                                {t.newsletterEmailPlaceholder || 'Din e-postadress'}
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 p-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-zinc-500 outline-none focus:border-cyan-500 transition-all text-sm"
                                placeholder={t.newsletterEmailPlaceholder || 'Din e-postadress'}
                                aria-label={t.newsletterEmailPlaceholder || 'Din e-postadress'}
                            />
                            <button
                                type="submit"
                                className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-bold text-sm transition-all hover:scale-105 shadow-lg shadow-cyan-500/20 whitespace-nowrap"
                            >
                                {t.newsletterButton || 'Prenumerera'}
                            </button>
                        </div>
                        {error && <p className="mt-4 text-sm text-red-500" role="alert">{error}</p>}
                        <p className="mt-4 text-xs text-white/40 italic">
                            {t.newsletterSubmitNote || 'Vi värnar om din integritet och delar aldrig din e-post med andra.'}
                        </p>
                    </form>
                )}
            </div>
        </section>
    );
};

export default NewsletterSignup;
