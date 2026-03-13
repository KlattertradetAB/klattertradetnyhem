
import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navigation from './components/Navigation';
import BackgroundShapes from './components/BackgroundShapes';
import CookieBanner from './components/CookieBanner';
import Meta from './components/Meta';
import Loader from './components/ui/Loader';

// Lazy load page components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Chat = lazy(() => import('./pages/Chat'));
const Therapy = lazy(() => import('./pages/Therapy'));
const GroupTherapy = lazy(() => import('./pages/GroupTherapy'));
const GestaltTraining = lazy(() => import('./pages/GestaltTraining'));
const BehandlingsPedagog = lazy(() => import('./pages/BehandlingsPedagog'));
const Blog = lazy(() => import('./pages/Blog'));
const Community = lazy(() => import('./pages/Community'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const Services = lazy(() => import('./pages/Services'));
const SelfCareApp = lazy(() => import('./self-care/App'));
const Downloads = lazy(() => import('./pages/Downloads'));
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/Auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./pages/Auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/Auth/ResetPasswordPage'));
const BookPromotion = lazy(() => import('./pages/BookPromotion'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const QualityMarking = lazy(() => import('./pages/QualityMarking'));
const GemenskapApp = lazy(() => import('./gemenskap/GemenskapApp'));
const PremiumApplication = lazy(() => import('./pages/PremiumApplication'));
const FreeRegistration = lazy(() => import('./pages/FreeRegistration'));
const GestaltApp = lazy(() => import('./gestalt-filosofi/App'));
import { Page } from './types';
import { LanguageProvider as SelfCareLanguageProvider } from './self-care/contexts/LanguageContext';
import { ThemeProvider as SelfCareThemeProvider } from './self-care/contexts/ThemeContext';
import AdminDashboard from './self-care/components/AdminDashboard';
import { supabase } from './gemenskap/services/supabase';
import { AuthStatus } from './gemenskap/types';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
export const PAGE_URLS: Record<Page, string> = {
  [Page.HOME]: '/',
  [Page.ABOUT]: '/om-oss',
  [Page.CHAT]: '/utbildning/mit',
  [Page.THERAPY]: '/terapi',
  [Page.GROUP_THERAPY]: '/grupp-terapi',
  [Page.GESTALT_TRAINING]: '/gestaltutbildning',
  [Page.BEHANDLINGS_PEDAGOG]: '/behandlingspedagog',
  [Page.BLOG]: '/blogg',
  [Page.COMMUNITY]: '/gemenskap',
  [Page.CONTACT]: '/kontakt.bokning',
  [Page.SERVICES]: '/tjanster',
  [Page.SURVEY]: '/enkät',
  [Page.DOWNLOADS]: '/bibliotek',
  [Page.LOGIN]: '/logga-in',
  [Page.REGISTER]: '/registrera',
  [Page.FORGOT_PASSWORD]: '/glomt-losenord',
  [Page.RESET_PASSWORD]: '/aterstall-losenord',
  [Page.GEMENSKAP_APP]: '/app',
  [Page.QUALITY_MARKING]: '/kvalitetsmarkering',
  [Page.BOOK]: '/bok',
  [Page.CHECKOUT]: '/kassa',
  [Page.PRIVACY]: '/sekretesspolicy',
  [Page.TERMS]: '/villkor',
  [Page.COOKIE_POLICY]: '/cookies',
  [Page.PREMIUM_APPLICATION]: '/premium-ansokan',
  [Page.FREE_REGISTRATION]: '/gratis-registrering',
  [Page.GESTALT_WORKSHEET]: '/gestalt-arbetsblad',
  [Page.ADMIN_SURVEY_STATS]: '/admin/survey-stats',
  [Page.ADMIN_PANEL]: '/admin'
};

const App: React.FC = () => {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(true);
  const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.IDLE);
  const [loginInitialType, setLoginInitialType] = useState<'member' | 'admin'>('member');

  useEffect(() => {
    // Check for standalone mode
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
    setIsStandalone(!!isStandaloneMode);

    // 1. Handle Auth Callback (PKCE)
    const handleAuthCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const next = params.get('next') || '/';

      if (code) {
        console.log('🔄 Exchanging code for session...');
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          console.error('❌ Code exchange error:', error.message);
        } else {
          console.log('✅ Session established from code.');
          // Remove code from URL for security and cleanliness
          window.history.replaceState({}, '', next);
        }
      }
    };

    handleAuthCallback();

    // 2. Supabase Auth Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: string, session: any) => {
      console.log('🔔 Auth Event:', event);

      if (event === 'PASSWORD_RECOVERY') {
        handleSetPage(Page.RESET_PASSWORD);
        return;
      }

      if (session) {
        setAuthStatus(AuthStatus.AUTHENTICATED);
        // If on a public auth page, move to app
        if ([Page.LOGIN, Page.REGISTER, Page.FORGOT_PASSWORD].includes(currentPage)) {
          handleSetPage(Page.GEMENSKAP_APP);
        }
      } else {
        setAuthStatus(AuthStatus.UNAUTHENTICATED);
      }
    });

    // 3. Initial routing logic
    const handleInitialRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const historyState = window.history.state;

      // 1. Path based routing (Highest Priority)
      const normalizedPath = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
      const foundPage = (Object.keys(PAGE_URLS) as Page[]).find(p => PAGE_URLS[p] === normalizedPath);

      if (foundPage) {
        // If we found a proper page like /om-oss or /terapi, use it
        setCurrentPage(foundPage);
        return;
      }

      // 2. Legacy Hashes & Auth Redirects
      if (hash.includes('#login') || hash.includes('#premium-login') || hash.includes('#signup')) {
        setCurrentPage(Page.GEMENSKAP_APP);
        window.history.replaceState({ page: Page.GEMENSKAP_APP }, '', PAGE_URLS[Page.GEMENSKAP_APP]);
        return;
      }

      // 3. Standalone Mode specifics
      if (isStandaloneMode) {
        if (hash.includes('#chat') || hash.includes('#dashboard') || hash.includes('#welcome') || hash.includes('#experts')) {
          setCurrentPage(Page.GEMENSKAP_APP);
          return;
        }
      }

      // 4. History State (if navigating back/forward)
      if (historyState && historyState.page) {
        setCurrentPage(historyState.page);
        return;
      }

      // Default: Home (if no path matches and no hash)
      if (path === '/' && currentPage !== Page.HOME) {
        setCurrentPage(Page.HOME);
      }
    };

    handleInitialRoute();

    // Browser navigation (Back/Forward) handling
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page);
      } else {
        // If no state (e.g. initial page or external link), re-run initial route
        handleInitialRoute();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      subscription.unsubscribe();
      window.removeEventListener('popstate', handlePopState);
    };
  }, []); // Changed dependency from [currentPage] to [] to avoid redundant runs and listeners

  const handleSetPage = (page: Page, state?: any) => {
    if (page !== currentPage) {
      if (state?.initialType) setLoginInitialType(state.initialType);
      else setLoginInitialType('member');
      const url = PAGE_URLS[page] || '/';
      window.history.pushState({ page, ...state }, '', url);
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [currentPage]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };


  return (
    <LanguageProvider>
      <Meta currentPage={currentPage} />
      <div className={`relative min-h-screen flex flex-col transition-all duration-700 ease-in-out ${isDarkMode ? 'bg-glossy-gradient-dark' : 'bg-glossy-gradient'}`}>
        <BackgroundShapes />
        <CookieBanner
          setPage={handleSetPage}
          isVisible={isCookieBannerVisible}
          onClose={() => setIsCookieBannerVisible(false)}
        />
        {currentPage !== Page.GEMENSKAP_APP && !isStandalone && (
          <Navigation
            currentPage={currentPage}
            setPage={handleSetPage}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
          />
        )}

        <main className="flex-1 w-full flex flex-col">
          <Suspense fallback={
            <div className="flex-1 flex items-center justify-center">
              <Loader />
            </div>
          }>
            {(() => {
              switch (currentPage) {
                case Page.HOME: return <Home setPage={handleSetPage} />;
                case Page.ABOUT: return <About />;
                case Page.CHAT: return <Chat />;
                case Page.THERAPY: return <Therapy setPage={handleSetPage} />;
                case Page.GROUP_THERAPY: return <GroupTherapy setPage={handleSetPage} />;
                case Page.GESTALT_TRAINING: return <GestaltTraining setPage={handleSetPage} />;
                case Page.BEHANDLINGS_PEDAGOG: return <BehandlingsPedagog setPage={handleSetPage} />;
                case Page.BLOG: return <Blog setPage={handleSetPage} />;
                case Page.COMMUNITY: return <Community setPage={handleSetPage} />;
                case Page.CONTACT: return <ContactUs />;
                case Page.SERVICES: return <Services setPage={handleSetPage} />;
                case Page.SURVEY: return (
                  <SelfCareLanguageProvider>
                    <SelfCareThemeProvider>
                      <SelfCareApp />
                    </SelfCareThemeProvider>
                  </SelfCareLanguageProvider>
                );
                case Page.DOWNLOADS: return <Downloads setPage={handleSetPage} />;
                case Page.GESTALT_WORKSHEET: return <GestaltApp onBack={() => handleSetPage(Page.DOWNLOADS)} />;
                case Page.LOGIN: return <LoginPage setPage={handleSetPage} initialType={loginInitialType} />;
                case Page.REGISTER: return <RegisterPage setPage={handleSetPage} />;
                case Page.FORGOT_PASSWORD: return <ForgotPasswordPage setPage={handleSetPage} />;
                case Page.RESET_PASSWORD: return <ResetPasswordPage setPage={handleSetPage} />;
                case Page.BOOK: return <BookPromotion setPage={handleSetPage} />;
                case Page.CHECKOUT: return (
                  <div className="container mx-auto px-6 py-24 text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">{t.checkout_title}</h1>
                    <p className="text-zinc-400">{t.checkout_soon}</p>
                    <button onClick={() => handleSetPage(Page.BOOK)} className="mt-8 text-amber-500 font-bold underline">{t.back_btn}</button>
                  </div>
                );
                case Page.PRIVACY: return <PrivacyPolicy setPage={handleSetPage} />;
                case Page.COOKIE_POLICY: return (
                  <CookiePolicy
                    setPage={handleSetPage}
                    onOpenSettings={() => setIsCookieBannerVisible(true)}
                  />
                );
                case Page.TERMS: return <Terms setPage={handleSetPage} />;
                case Page.PREMIUM_APPLICATION: return <PremiumApplication setPage={handleSetPage} />;
                case Page.FREE_REGISTRATION: return <FreeRegistration setPage={handleSetPage} />;
                case Page.QUALITY_MARKING: return <QualityMarking setPage={handleSetPage} />;
                case Page.ADMIN_SURVEY_STATS: return <AdminDashboard />;
                case Page.ADMIN_PANEL: return <GemenskapApp onBackToSite={(targetPage?: Page, state?: any) => handleSetPage(targetPage || Page.HOME, state)} initialTab="admin" />;
                case Page.GEMENSKAP_APP: return <GemenskapApp onBackToSite={(targetPage?: Page, state?: any) => handleSetPage(targetPage || Page.HOME, state)} />;
                default: return <Home setPage={handleSetPage} />;
              }
            })()}
          </Suspense>
        </main>

        {currentPage !== Page.GEMENSKAP_APP && !isStandalone && (
          <footer className="py-12 mt-auto border-t border-white/10">
            <div className="max-w-[1600px] mx-auto px-6 flex flex-col items-center gap-6">
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-[10px] md:text-xs font-bold text-white/30 tracking-widest uppercase">
                <button
                  onClick={() => handleSetPage(Page.COOKIE_POLICY)}
                  className="hover:text-amber-500 transition-colors whitespace-nowrap"
                >
                  {t.footer_cookies}
                </button>
                <button
                  onClick={() => handleSetPage(Page.TERMS)}
                  className="hover:text-amber-500 transition-colors whitespace-nowrap"
                >
                  {t.footer_terms}
                </button>
                <button
                  onClick={() => handleSetPage(Page.PRIVACY)}
                  className="hover:text-amber-500 transition-colors whitespace-nowrap"
                >
                  {t.footer_privacy}
                </button>
              </div>
              <div className="text-white/50 text-[10px] md:text-xs tracking-tight">
                <p>&copy; {new Date().getFullYear()} Klätterträdet & Horizonten.</p>
              </div>
            </div>
          </footer>
        )}
      </div>
    </LanguageProvider>
  );
};

export default App;