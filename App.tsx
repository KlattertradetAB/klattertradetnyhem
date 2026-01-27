
import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import BackgroundShapes from './components/BackgroundShapes';
import CookieBanner from './components/CookieBanner';
import Home from './pages/Home';
import About from './pages/About';
import Chat from './pages/Chat';
import Therapy from './pages/Therapy';
import GroupTherapy from './pages/GroupTherapy';
import GestaltTraining from './pages/GestaltTraining';
import BehandlingsAssistent from './pages/BehandlingsAssistent';
import Blog from './pages/Blog';
import Community from './pages/Community';
import ContactUs from './pages/ContactUs';
import Survey from './pages/Survey';
import Downloads from './pages/Downloads';
import LoginPage from './pages/LoginPage';
import BookPromotion from './pages/BookPromotion';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import Terms from './pages/Terms';
import GemenskapApp from './gemenskap/GemenskapApp';
import PremiumApplication from './pages/PremiumApplication';
import FreeRegistration from './pages/FreeRegistration';
import { Page } from './public/types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Sync state with history on mount
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page);
      } else {
        // Check hash if no state
        if (window.location.hash.includes('#login') || window.location.hash.includes('#premium-login')) {
          setCurrentPage(Page.GEMENSKAP_APP);
        } else {
          setCurrentPage(Page.HOME);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Initial state check
    const hash = window.location.hash;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;

    if (hash.includes('#login') || hash.includes('#premium-login') || hash.includes('#signup')) {
      setCurrentPage(Page.GEMENSKAP_APP);
      window.history.replaceState({ page: Page.GEMENSKAP_APP }, '');
    } else if (isStandalone && (currentPage === Page.HOME || !hash)) {
      // If standalone and at home, force to community app
      setCurrentPage(Page.GEMENSKAP_APP);
      window.location.hash = '#premium-login';
      window.history.replaceState({ page: Page.GEMENSKAP_APP }, '');
    } else if (!window.history.state) {
      window.history.replaceState({ page: currentPage }, '');
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSetPage = (page: Page, state?: any) => {
    if (page !== currentPage) {
      window.history.pushState({ page, ...state }, '');
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });

    // Update document title dynamically
    if (currentPage === Page.HOME) {
      document.title = 'Klätterträdet';
    } else if (currentPage === Page.GEMENSKAP_APP) {
      document.title = 'Horizonten gemenskap';
    } else {
      const pageTitle = currentPage.charAt(0) + currentPage.slice(1).toLowerCase().replace('_', ' ');
      document.title = `${pageTitle} | Horizonten`;
    }
  }, [currentPage]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };


  return (
    <div className={`relative min-h-screen flex flex-col transition-all duration-700 ease-in-out ${isDarkMode ? 'bg-glossy-gradient-dark' : 'bg-glossy-gradient'}`}>
      <BackgroundShapes />
      <CookieBanner setPage={handleSetPage} />
      {currentPage !== Page.GEMENSKAP_APP && (
        <Navigation
          currentPage={currentPage}
          setPage={handleSetPage}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
      )}

      <main className="flex-1 w-full flex flex-col">
        {(() => {
          switch (currentPage) {
            case Page.HOME: return <Home setPage={handleSetPage} />;
            case Page.ABOUT: return <About />;
            case Page.CHAT: return <Chat />;
            case Page.THERAPY: return <Therapy setPage={handleSetPage} />;
            case Page.GROUP_THERAPY: return <GroupTherapy setPage={handleSetPage} />;
            case Page.GESTALT_TRAINING: return <GestaltTraining setPage={handleSetPage} />;
            case Page.BEHANDLINGS_ASSISTENT: return <BehandlingsAssistent setPage={handleSetPage} />;
            case Page.BLOG: return <Blog setPage={handleSetPage} />;
            case Page.COMMUNITY: return <Community />;
            case Page.CONTACT: return <ContactUs />;
            case Page.SURVEY: return <Survey />;
            case Page.DOWNLOADS: return <Downloads />;
            case Page.LOGIN: return <LoginPage setPage={handleSetPage} />;
            case Page.BOOK: return <BookPromotion setPage={handleSetPage} />;
            case Page.CHECKOUT: return (
              <div className="container mx-auto px-6 py-24 text-center">
                <h1 className="text-4xl font-bold text-white mb-4">Kassa</h1>
                <p className="text-zinc-400">Betalningslösning kommer snart...</p>
                <button onClick={() => handleSetPage(Page.BOOK)} className="mt-8 text-amber-500 font-bold underline">Tillbaka</button>
              </div>
            );
            case Page.PRIVACY: return <PrivacyPolicy setPage={handleSetPage} />;
            case Page.COOKIE_POLICY: return <CookiePolicy setPage={handleSetPage} />;
            case Page.TERMS: return <Terms setPage={handleSetPage} />;
            case Page.PREMIUM_APPLICATION: return <PremiumApplication setPage={handleSetPage} />;
            case Page.FREE_REGISTRATION: return <FreeRegistration setPage={handleSetPage} />;
            case Page.GEMENSKAP_APP: return <GemenskapApp onBackToSite={(targetPage?: Page) => handleSetPage(targetPage || Page.HOME)} />;
            default: return <Home setPage={handleSetPage} />;
          }
        })()}
      </main>

      {currentPage !== Page.GEMENSKAP_APP && (
        <footer className="py-12 mt-auto border-t border-white/10">
          <div className="max-w-[1600px] mx-auto px-6 flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-[10px] md:text-xs font-bold text-white/30 tracking-widest uppercase">
              <button
                onClick={() => handleSetPage(Page.COOKIE_POLICY)}
                className="hover:text-amber-500 transition-colors whitespace-nowrap"
              >
                Cookies
              </button>
              <button
                onClick={() => handleSetPage(Page.TERMS)}
                className="hover:text-amber-500 transition-colors whitespace-nowrap"
              >
                Medlemsvillkor
              </button>
              <button
                onClick={() => handleSetPage(Page.PRIVACY)}
                className="hover:text-amber-500 transition-colors whitespace-nowrap"
              >
                Integritet & Sekretess
              </button>
            </div>
            <div className="text-white/50 text-[10px] md:text-xs tracking-tight">
              <p>&copy; 2025 Klätterträdet & Horizonten.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;