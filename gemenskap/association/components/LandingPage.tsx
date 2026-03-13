
import React, { useState } from 'react';
import CTAButton from './CTAButton';
import ValuePropCard from './ValuePropCard';
import StatutesAccordion from './StatutesAccordion';
import FAQ from './FAQ';
import MemberBenefits from './MemberBenefits';
import NewsletterSignup from './NewsletterSignup';
import ApplicationForm from './ApplicationForm';
import ContactForm from './ContactForm';
import { valuePropsData } from '../constants';
import { useTranslations } from '../hooks';
import { Menu, X } from 'lucide-react';

interface LandingPageProps {
    onNavigateToLogin: () => void;
    onNavigateToAgreement: () => void;
    onNavigateToCalendar: () => void;
    onNavigateToBookRelease: () => void;
    onNavigateToMembershipPromo: () => void;
    onNavigateToContactBooking: () => void;
    onNavigateToServices: () => void;
    onNavigateToContact: () => void;
    onNavigateToAbout: () => void; // Added About navigation
    onNavigateHome: () => void;
    isTab?: boolean;
}

const Header = ({
    onNavigateToLogin,
    onNavigateToServices,
    onNavigateToContact,
    onNavigateToAbout,
    onNavigateHome
}: {
    onNavigateToLogin: () => void;
    onNavigateToServices: () => void;
    onNavigateToContact: () => void;
    onNavigateToAbout: () => void;
    onNavigateHome: () => void;
}) => {
    const { t } = useTranslations();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="flex justify-center transition-all duration-300 mt-8 mb-4">
            <nav className="mx-auto flex max-w-7xl items-center justify-center p-2 lg:px-8 border border-white/10 bg-white/5 rounded-2xl backdrop-blur-md" aria-label="Local navigation">
                {/* Desktop menu */}
                <div className="flex gap-x-6 md:gap-x-10 items-center">
                    <button
                        onClick={onNavigateToAbout}
                        className="text-sm md:text-base font-semibold leading-6 text-white/70 hover:text-cyan-400 transition-colors"
                    >
                        {t.navAbout}
                    </button>
                    <button
                        onClick={onNavigateToServices}
                        className="text-sm md:text-base font-semibold leading-6 text-white/70 hover:text-cyan-400 transition-colors"
                    >
                        {t.navServices}
                    </button>
                    <button
                        onClick={onNavigateToContact}
                        className="text-sm md:text-base font-semibold leading-6 text-white/70 hover:text-cyan-400 transition-colors"
                    >
                        {t.navContact}
                    </button>
                    <button
                        onClick={onNavigateToLogin}
                        className="text-sm md:text-base font-semibold leading-6 text-white/70 hover:text-cyan-400 transition-colors"
                    >
                        {t.loginTitle}
                    </button>
                </div>
            </nav>

            {/* Mobile menu dialog */}
            {mobileMenuOpen && (
                <div className="lg:hidden" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />

                    <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-slate-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <button
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    onNavigateHome();
                                }}
                                className="-m-1.5 p-1.5 text-white font-bold text-lg"
                            >
                                {t.appName}
                            </button>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-300 hover:text-white"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Stäng meny</span>
                                <X className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-700">
                                <div className="space-y-2 py-6">
                                    <button
                                        onClick={() => {
                                            setMobileMenuOpen(false);
                                            onNavigateToAbout();
                                        }}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-slate-800 transition-colors w-full text-left"
                                    >
                                        {t.navAbout}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setMobileMenuOpen(false);
                                            onNavigateToServices();
                                        }}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-slate-800 transition-colors w-full text-left"
                                    >
                                        {t.navServices}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setMobileMenuOpen(false);
                                            onNavigateToContact();
                                        }}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-slate-800 transition-colors w-full text-left"
                                    >
                                        {t.navContact}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setMobileMenuOpen(false);
                                            onNavigateToLogin();
                                        }}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-slate-800 transition-colors w-full text-left"
                                    >
                                        {t.loginTitle}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const LandingPage: React.FC<LandingPageProps> = ({
    onNavigateToLogin,
    onNavigateToAgreement,
    onNavigateToCalendar,
    onNavigateToBookRelease,
    onNavigateToMembershipPromo,
    onNavigateToContactBooking,
    onNavigateToServices,
    onNavigateToContact,
    onNavigateToAbout,
    onNavigateHome,
    isTab = false
}) => {
    const { t } = useTranslations();
    const valueProps = valuePropsData(t);

    const scrollToId = (e: React.MouseEvent<HTMLElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        } else {
            console.warn(`Element with ID '${id}' not found for JavaScript scrolling. Falling back to native hash navigation.`);
            window.location.hash = id;
        }
    };


    return (
        <>
            {!isTab && (
                <div className="relative isolate overflow-hidden bg-slate-900 py-24 sm:py-32">
                    {/* Background Blobs instead of image */}
                    <div className="absolute inset-0 -z-10 overflow-hidden">
                        {/* Large blurry blobs for an abstract, focused feeling */}
                        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-600/30 rounded-full blur-[120px] animate-blob"></div>
                        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
                        <div className="absolute -bottom-40 left-1/4 w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-[150px] animate-blob animation-delay-4000"></div>
                    </div>

                    <div className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
                        <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
                    </div>
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">{t.appName}</h1>
                            <p className="mt-6 text-lg leading-8 text-gray-300">{t.heroSubtitle}</p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <CTAButton href="#ansokan" onClick={(e) => scrollToId(e, 'ansokan')}>{t.becomeMemberToday}</CTAButton>
                            </div>

                            <div className="mt-12">
                                <Header
                                    onNavigateToLogin={onNavigateToLogin}
                                    onNavigateToServices={onNavigateToServices}
                                    onNavigateToContact={onNavigateToContact}
                                    onNavigateToAbout={onNavigateToAbout}
                                    onNavigateHome={onNavigateHome}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className={`py-20 sm:py-28 ${isTab ? 'bg-transparent' : ''}`}>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-cyan-600 dark:text-cyan-400">{t.ourPromise}</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">{t.everythingYouNeedToGrow}</p>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">{t.platformDescription}</p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            {valueProps.map((prop) => (
                                <ValuePropCard key={prop.title} icon={prop.icon} title={prop.title} description={prop.description} />
                            ))}
                        </div>
                    </div>


                </div>
            </div>

            <div id="formaner" className="scroll-mt-28">
                <MemberBenefits />
            </div>

            <div className={`py-16 sm:py-24 ${isTab ? 'bg-transparent' : ''}`}>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className={`relative isolate overflow-hidden px-6 py-16 text-center shadow-2xl rounded-2xl sm:px-16 ${isTab ? 'bg-white/5 border border-white/10' : 'bg-slate-900'}`}>
                        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.ctaTitle}</h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">{t.ctaSubtitle}</p>
                        <div className="mt-10 flex items-center justify-center">
                            <CTAButton href="#ansokan" onClick={(e) => scrollToId(e, 'ansokan')}>{t.joinNow}</CTAButton>
                        </div>
                        <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]" aria-hidden="true">
                            <circle cx={512} cy={512} r={512} fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fillOpacity="0.7" />
                            <defs>
                                <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                                    <stop stopColor="#0891b2" />
                                    <stop offset={1} stopColor="#0f172a" />
                                </radialGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="mt-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-white/20 dark:border-slate-700 px-6 py-8 text-center shadow-lg rounded-2xl">
                        <p className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                            {t.boardHint}
                        </p>
                    </div>
                </div>
            </div>

            <div id="nyhetsbrev" className="scroll-mt-28">
                <NewsletterSignup />
            </div>
            <div id="ansokan" className={`scroll-mt-28 py-20 sm:py-28 ${isTab ? 'bg-transparent' : 'bg-white/40 dark:bg-slate-800/40'}`}>
                <ApplicationForm />
            </div>
            <div id="faq" className="scroll-mt-28">
                <FAQ />
            </div>
            <div id="kontakt" className="scroll-mt-28">
                <ContactForm />
            </div>
        </>
    );
};

export default LandingPage;
