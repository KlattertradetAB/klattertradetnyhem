
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import SplashScreen from './components/SplashScreen';
import LoginForm from './components/LoginForm';
import BoardMemberPage from './components/BoardMemberPage';
import ConsultantAgreement from './components/ConsultantAgreement';
import EventCalendarView from './components/EventCalendarView';
import BookReleasePage from './components/BookReleasePage';
import MembershipPromo from './components/MembershipPromo';
import ContactAndBookingPage from './components/ContactAndBookingPage'; 
import ServicesPage from './components/ServicesPage'; 
import AboutPage from './components/AboutPage'; // Import AboutPage
import { useTranslations } from './hooks';
import ThemeToggle from './components/ThemeToggle';
import LanguageSelector from './components/LanguageSelector';
import { FacebookIcon, InstagramIcon, LinkedInIcon } from './components/Icons';


// --- App Content Component ---
const AppContent: React.FC = () => {
    const { t } = useTranslations();
    
    // Change simple view state to a history stack
    const [history, setHistory] = useState<string[]>(['landing']);
    const view = history[history.length - 1]; // Current view is the last one in history

    const [showSplash, setShowSplash] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const rootEl = document.getElementById('root');
        if (rootEl) {
            if (isAuthenticated) {
                rootEl.classList.add('dashboard-view');
            } else {
                rootEl.classList.remove('dashboard-view');
            }
        }
        return () => {
            if (rootEl) {
                rootEl.classList.remove('dashboard-view');
            }
        };
    }, [isAuthenticated]);

    // Navigation Helper: Pushes new view to history
    const navigateTo = (newView: string) => {
        setHistory(prev => [...prev, newView]);
        window.scrollTo(0, 0);
    };

    // Back Helper: Pops current view from history
    const handleBack = () => {
        setHistory(prev => {
            if (prev.length > 1) {
                return prev.slice(0, -1);
            }
            return prev; // Don't pop the last element (landing)
        });
        window.scrollTo(0, 0);
    };

    const handleEnterApp = () => setShowSplash(false);
    
    // Explicitly resetting to landing (e.g. for Home button/Logo) clears history to avoid loops
    const handleNavigateToLanding = () => { 
        window.scrollTo(0, 0); 
        setHistory(['landing']); 
    };

    const handleNavigateToLogin = () => navigateTo('login');
    const handleNavigateToAgreement = () => navigateTo('consultant-agreement');
    const handleNavigateToCalendar = () => navigateTo('event-calendar');
    const handleNavigateToBookRelease = () => navigateTo('book-release');
    const handleNavigateToMembershipPromo = () => navigateTo('membership-promo');
    const handleNavigateToContactBooking = () => navigateTo('contact-booking');
    const handleNavigateToServices = () => navigateTo('services');
    const handleNavigateToAbout = () => navigateTo('about');
    
    const handleNavigateToApplication = () => {
        // If we are not on landing, go there (pushing to history so back works)
        if (view !== 'landing') {
            setHistory(prev => [...prev, 'landing']);
        }
        // Use setTimeout to allow landing page to render before scrolling
        setTimeout(() => {
            const el = document.getElementById('ansokan');
            if (el) {
                const headerOffset = 100;
                const elementPosition = el.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        }, 100);
    };

    const handleLoginSuccess = () => { setIsAuthenticated(true); };
    const handleLogout = () => { 
        setIsAuthenticated(false); 
        setHistory(['landing']); // Reset history on logout
    };

    if (showSplash) {
        return <SplashScreen onEnter={handleEnterApp} />;
    }
    
    if (isAuthenticated) {
        return <BoardMemberPage onLogout={handleLogout} />;
    }

    // Render logic based on 'view' (last item in history)
    // IMPORTANT: onBack props now use handleBack instead of handleNavigateToLanding

    if (view === 'consultant-agreement') {
        return <ConsultantAgreement onBack={handleBack} />;
    }

    if (view === 'event-calendar') {
        return <EventCalendarView onBack={handleBack} />;
    }

    if (view === 'book-release') {
        return <BookReleasePage onBack={handleBack} />;
    }

    if (view === 'membership-promo') {
        return <MembershipPromo onNavigateToApplication={handleNavigateToApplication} onBack={handleBack} />;
    }

    if (view === 'contact-booking') {
        return <ContactAndBookingPage onBack={handleBack} />;
    }

    if (view === 'services') {
        return <ServicesPage onBack={handleBack} />;
    }

    if (view === 'about') {
        return <AboutPage onBack={handleBack} />;
    }

    // Default to 'login' view check, otherwise render Layout + Landing
    return (
      <div className="bg-gray-50/60 dark:bg-slate-900/60 backdrop-blur-lg text-gray-800 dark:text-slate-200 antialiased flex flex-col min-h-screen relative overflow-hidden">
         {/* Blob 1: Cyan/Blue - Top Left */}
         <div 
            className="absolute -top-20 -left-20 w-[600px] h-[600px]"
            style={{ transform: `translateY(${scrollY * 0.4}px)` }}
            >
            <div className="w-full h-full bg-cyan-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 dark:opacity-30 animate-blob"></div>
         </div>
         
         {/* Blob 2: Amber - Top Right */}
         <div 
            className="absolute top-0 -right-20 w-[600px] h-[600px]"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
         >
            <div className="w-full h-full bg-amber-300 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 dark:opacity-30 animate-blob animation-delay-2000"></div>
         </div>
         
         {/* Blob 3: Yellow - Bottom Left/Center */}
         <div 
            className="absolute -bottom-32 left-10 w-[600px] h-[600px]"
            style={{ transform: `translateY(${scrollY * -0.3}px)` }}
         >
            <div className="w-full h-full bg-yellow-300 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 dark:opacity-30 animate-blob animation-delay-4000"></div>
         </div>

        <main className="flex-grow relative z-10">
          {view === 'landing' && (
              <LandingPage 
                  onNavigateToLogin={handleNavigateToLogin} 
                  onNavigateToAgreement={handleNavigateToAgreement}
                  onNavigateToCalendar={handleNavigateToCalendar}
                  onNavigateToBookRelease={handleNavigateToBookRelease}
                  onNavigateToMembershipPromo={handleNavigateToMembershipPromo}
                  onNavigateToContactBooking={handleNavigateToContactBooking}
                  onNavigateToServices={handleNavigateToServices}
                  onNavigateToContact={handleNavigateToContactBooking}
                  onNavigateToAbout={handleNavigateToAbout}
                  onNavigateHome={handleNavigateToLanding}
              />
          )}
          {view === 'login' && <LoginForm onLoginSuccess={handleLoginSuccess} onBackClick={handleBack} />}
        </main>

        <footer className="bg-slate-900/80 backdrop-blur-lg text-slate-200 py-8 border-t border-slate-700/50 relative z-10">
          <div className="container mx-auto px-6 text-center">
             <div className="flex justify-center items-center gap-x-6 mb-6">
                <LanguageSelector />
                <ThemeToggle />
            </div>
            <p className="text-sm">&copy; {new Date().getFullYear()} {t.footerCopyright}</p>
            <div className="flex justify-center gap-x-6 my-6">
              <div className="relative group flex items-center">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label={t.facebookAria} className="text-slate-400 hover:text-white transition-all duration-300 transform hover:scale-110">
                  <FacebookIcon />
                </a>
                <div className="absolute bottom-full mb-2 px-3 py-1.5 text-sm font-semibold text-white bg-slate-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap left-1/2 -translate-x-1/2">
                  {t.facebookAria}
                </div>
              </div>
              <div className="relative group flex items-center">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label={t.instagramAria} className="text-slate-400 hover:text-white transition-all duration-300 transform hover:scale-110">
                  <InstagramIcon />
                </a>
                <div className="absolute bottom-full mb-2 px-3 py-1.5 text-sm font-semibold text-white bg-slate-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap left-1/2 -translate-x-1/2">
                  {t.instagramAria}
                </div>
              </div>
              <div className="relative group flex items-center">
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label={t.linkedInAria} className="text-slate-400 hover:text-white transition-all duration-300 transform hover:scale-110">
                  <LinkedInIcon />
                </a>
                <div className="absolute bottom-full mb-2 px-3 py-1.5 text-sm font-semibold text-white bg-slate-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap left-1/2 -translate-x-1/2">
                  {t.linkedInAria}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
};

export default AppContent;
