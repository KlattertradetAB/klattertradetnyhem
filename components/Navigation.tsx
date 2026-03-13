
import React, { useState, useRef, useEffect } from 'react';
import { Page } from '../types';
import { PAGE_URLS } from '../App';
import { Hexagon, Menu, X, Moon, Sun, ChevronDown, BookOpen, Heart, Newspaper, Library, Users, ClipboardList, Download, LogIn, ShieldCheck, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ThemeToggle from './ui/ThemeToggle';

interface NavigationProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, setPage, isDarkMode, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const { lang, setLang, t } = useLanguage();
  const langRef = useRef<HTMLDivElement>(null);

  const servicesRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);

  const handleNavClick = (page: Page, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setPage(page);
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
    setIsResourcesOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setIsResourcesOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isServicesActive = [Page.SERVICES, Page.CHAT, Page.THERAPY, Page.GROUP_THERAPY, Page.GESTALT_TRAINING, Page.BEHANDLINGS_PEDAGOG].includes(currentPage);
  const isResourcesActive = [Page.COMMUNITY, Page.SURVEY, Page.DOWNLOADS, Page.QUALITY_MARKING].includes(currentPage);

  return (
    <header className="p-4 md:p-5">
      <div className="max-w-[1600px] mx-auto">
        <nav className="glass bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg flex justify-between items-center px-8 py-4 relative z-50">

          <a
            href={PAGE_URLS[Page.HOME]}
            className="flex items-center gap-4 cursor-pointer group rounded-lg focus:outline-none"
            onClick={(e) => handleNavClick(Page.HOME, e)}
          >
            <div className="w-16 h-16 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
              <img
                src="/assets/logo2.png"
                alt="Logo"
                className="w-full h-full object-contain opacity-90 group-hover:opacity-100"
              />
            </div>
            <span className="text-xl md:text-2xl font-bold text-white drop-shadow-md hidden sm:block tracking-tight">
              Klätterträdet <span className="text-orange-400 font-light mx-1">&</span> Horizonten
            </span>
          </a>

          <div className="hidden md:flex items-center gap-2">
            <a
              href={PAGE_URLS[Page.HOME]}
              onClick={(e) => handleNavClick(Page.HOME, e)}
              className={`px-4 py-2 rounded-xl transition-all font-medium ${currentPage === Page.HOME ? 'bg-blue-600/20 text-blue-400 shadow-sm shadow-blue-500/10 border border-blue-500/20' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
            >
              {t.nav_home}
            </a>
            <a
              href={PAGE_URLS[Page.ABOUT]}
              onClick={(e) => handleNavClick(Page.ABOUT, e)}
              className={`px-4 py-2 rounded-xl transition-all font-medium ${currentPage === Page.ABOUT ? 'bg-blue-600/20 text-blue-400 shadow-sm shadow-blue-500/10 border border-blue-500/20' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
            >
              {t.nav_about}
            </a>

            {/* Tjänster Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                onMouseEnter={() => { setIsServicesOpen(true); setIsResourcesOpen(false); }}
                onClick={() => handleNavClick(Page.SERVICES)}
                className={`flex items-center gap-1 px-4 py-2 rounded-xl transition-all font-medium ${isServicesActive ? 'bg-blue-600/20 text-blue-400 shadow-sm shadow-blue-500/10 border border-blue-500/20' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
              >
                {t.nav_services_label} <ChevronDown size={16} className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {isServicesOpen && (
                <div
                  className="absolute top-full left-0 mt-3 w-80 glass bg-black/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-4 animate-fade-in flex flex-col gap-4"
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <div>
                    <div className="flex items-center gap-2 px-3 mb-2 text-white/40 text-[10px] uppercase tracking-widest font-bold">
                      <BookOpen size={12} /> {t.nav_training}
                    </div>
                    <div className="space-y-1">
                      <a
                        href={PAGE_URLS[Page.BEHANDLINGS_PEDAGOG]}
                        onClick={(e) => handleNavClick(Page.BEHANDLINGS_PEDAGOG, e)}
                        className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex flex-col ${currentPage === Page.BEHANDLINGS_PEDAGOG ? 'bg-blue-600/20 text-blue-400' : 'hover:bg-white/5 text-white/90'}`}
                      >
                        <span className="font-bold text-sm">{t.nav_behandlingspedagog}</span>
                        <span className="text-[10px] opacity-60">{t.nav_behandlingspedagog_sub}</span>
                      </a>
                      <a
                        href={PAGE_URLS[Page.CHAT]}
                        onClick={(e) => handleNavClick(Page.CHAT, e)}
                        className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex flex-col ${currentPage === Page.CHAT ? 'bg-blue-600/20 text-blue-400' : 'hover:bg-white/5 text-white/90'}`}
                      >
                        <span className="font-bold text-sm">{t.nav_mit}</span>
                        <span className="text-[10px] opacity-60">{t.nav_mit_sub}</span>
                      </a>
                      <a
                        href={PAGE_URLS[Page.GESTALT_TRAINING]}
                        onClick={(e) => handleNavClick(Page.GESTALT_TRAINING, e)}
                        className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex flex-col ${currentPage === Page.GESTALT_TRAINING ? 'bg-blue-600/20 text-blue-400' : 'hover:bg-white/5 text-white/90'}`}
                      >
                        <span className="font-bold text-sm">{t.nav_gestalt}</span>
                        <span className="text-[10px] opacity-60">{t.nav_gestalt_sub}</span>
                      </a>
                    </div>
                  </div>
                  <div className="h-px bg-white/10 mx-2"></div>
                  <div>
                    <div className="flex items-center gap-2 px-3 mb-2 text-white/40 text-[10px] uppercase tracking-widest font-bold">
                      <Heart size={12} /> {t.nav_therapy_cat}
                    </div>
                    <div className="space-y-1">
                      <a
                        href={PAGE_URLS[Page.THERAPY]}
                        onClick={(e) => handleNavClick(Page.THERAPY, e)}
                        className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex flex-col ${currentPage === Page.THERAPY ? 'bg-blue-600/20 text-blue-400' : 'hover:bg-white/5 text-white/90'}`}
                      >
                        <span className="font-bold text-sm">{t.nav_enskild_terapi}</span>
                        <span className="text-[10px] opacity-60">{t.nav_enskild_terapi_sub}</span>
                      </a>
                      <a
                        href={PAGE_URLS[Page.GROUP_THERAPY]}
                        onClick={(e) => handleNavClick(Page.GROUP_THERAPY, e)}
                        className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex flex-col ${currentPage === Page.GROUP_THERAPY ? 'bg-blue-600/20 text-blue-400' : 'hover:bg-white/5 text-white/90'}`}
                      >
                        <span className="font-bold text-sm">{t.nav_grupp_terapi}</span>
                        <span className="text-[10px] opacity-60">{t.nav_grupp_terapi_sub}</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Resurser Dropdown */}
            <div className="relative" ref={resourcesRef}>
              <button
                onMouseEnter={() => { setIsResourcesOpen(true); setIsServicesOpen(false); }}
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                className={`flex items-center gap-1 px-4 py-2 rounded-xl transition-all font-medium ${isResourcesActive ? 'bg-blue-600/20 text-blue-400 shadow-sm shadow-blue-500/10 border border-blue-500/20' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
              >
                {t.nav_resources_label} <ChevronDown size={16} className={`transition-transform duration-300 ${isResourcesOpen ? 'rotate-180' : ''}`} />
              </button>

              {isResourcesOpen && (
                <div
                  className="absolute top-full left-0 mt-3 w-72 glass bg-black/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-4 animate-fade-in flex flex-col gap-2"
                  onMouseLeave={() => setIsResourcesOpen(false)}
                >
                  <div className="flex items-center gap-2 px-3 mb-1 text-white/40 text-[10px] uppercase tracking-widest font-bold">
                    <Library size={12} /> {t.nav_library}
                  </div>


                  <a
                    href={PAGE_URLS[Page.COMMUNITY]}
                    onClick={(e) => handleNavClick(Page.COMMUNITY, e)}
                    className={`w-full text-left px-3 py-3 rounded-xl transition-colors flex items-center gap-3 ${currentPage === Page.COMMUNITY ? 'bg-amber-600/20 text-amber-400' : 'hover:bg-white/5 text-white/90'}`}
                  >
                    <div className="p-2 bg-white/5 rounded-lg">
                      <Users size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">{t.nav_gemenskap}</span>
                      <span className="text-[10px] opacity-60">{t.nav_gemenskap_sub}</span>
                    </div>
                  </a>

                  <a
                    href={PAGE_URLS[Page.QUALITY_MARKING]}
                    onClick={(e) => handleNavClick(Page.QUALITY_MARKING, e)}
                    className={`w-full text-left px-3 py-3 rounded-xl transition-colors flex items-center gap-3 ${currentPage === Page.QUALITY_MARKING ? 'bg-blue-600/20 text-blue-400' : 'hover:bg-white/5 text-white/90'}`}
                  >
                    <div className="p-2 bg-white/5 rounded-lg">
                      <ShieldCheck size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">{t.nav_kvalitetsmarkering}</span>
                      <span className="text-[10px] opacity-60">{t.nav_kvalitetsmarkering_sub}</span>
                    </div>
                  </a>

                  <a
                    href={PAGE_URLS[Page.SURVEY]}
                    onClick={(e) => handleNavClick(Page.SURVEY, e)}
                    className={`w-full text-left px-3 py-3 rounded-xl transition-colors flex items-center gap-3 ${currentPage === Page.SURVEY ? 'bg-blue-600/20 text-blue-400' : 'hover:bg-white/5 text-white/90'}`}
                  >
                    <div className="p-2 bg-white/5 rounded-lg">
                      <ClipboardList size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">{t.nav_enkat}</span>
                      <span className="text-[10px] opacity-60">{t.nav_enkat_sub}</span>
                    </div>
                  </a>

                  <a
                    href={PAGE_URLS[Page.DOWNLOADS]}
                    onClick={(e) => handleNavClick(Page.DOWNLOADS, e)}
                    className={`w-full text-left px-3 py-3 rounded-xl transition-colors flex items-center gap-3 ${currentPage === Page.DOWNLOADS ? 'bg-emerald-600/20 text-emerald-400' : 'hover:bg-white/5 text-white/90'}`}
                  >
                    <div className="p-2 bg-white/5 rounded-lg">
                      <Download size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">{t.nav_nedladdningar}</span>
                      <span className="text-[10px] opacity-60">{t.nav_nedladdningar_sub}</span>
                    </div>
                  </a>

                </div>
              )}
            </div>

            <a
              href={PAGE_URLS[Page.BLOG]}
              onClick={(e) => handleNavClick(Page.BLOG, e)}
              className={`px-4 py-2 rounded-xl transition-all font-medium ${currentPage === Page.BLOG ? 'bg-blue-600/20 text-blue-400 shadow-sm shadow-blue-500/10 border border-blue-500/20' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
            >
              {t.nav_blog}
            </a>
            <a
              href={PAGE_URLS[Page.CONTACT]}
              onClick={(e) => handleNavClick(Page.CONTACT, e)}
              className={`px-4 py-2 rounded-xl transition-all font-medium ${currentPage === Page.CONTACT ? 'bg-blue-600/20 text-blue-400 shadow-sm shadow-blue-500/10 border border-blue-500/20' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
            >
              {t.nav_contact}
            </a>

            <div className="relative group/badge">
              <a
                href={PAGE_URLS[Page.LOGIN]}
                onClick={(e) => handleNavClick(Page.LOGIN, e)}
                className={`px-4 py-2 rounded-xl transition-all font-medium flex items-center gap-2 ${currentPage === Page.LOGIN ? 'bg-orange-600/20 text-orange-400 shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
              >
                <LogIn size={18} /> {t.nav_login}
              </a>
              <div className="absolute -top-3 -right-3 pointer-events-none">
                <div className="bg-red-600 text-[7px] font-black text-white px-2 py-1 rounded-lg shadow-[0_4px_12px_rgba(220,38,38,0.5)] animate-pulse whitespace-nowrap uppercase tracking-widest border border-white/20 -rotate-6 group-hover/badge:rotate-0 transition-transform duration-500">
                  {t.nav_badge_new}
                </div>
              </div>
            </div>

            <div className="w-px h-6 bg-white/20 mx-2"></div>

            {/* Language Switcher */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="p-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all hover:scale-105 flex items-center gap-1.5"
                aria-label="Switch language"
              >
                <Globe size={20} />
                <span className="text-xs font-bold uppercase">{lang}</span>
              </button>
              {isLangOpen && (
                <div className="absolute right-0 top-full mt-2 w-40 glass bg-black/90 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-2 animate-fade-in">
                  <button
                    onClick={() => { setLang('sv'); setIsLangOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${lang === 'sv' ? 'bg-orange-500/20 text-orange-400' : 'text-white/80 hover:bg-white/5'}`}
                  >
                    🇸🇪 Svenska
                  </button>
                  <button
                    onClick={() => { setLang('en'); setIsLangOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${lang === 'en' ? 'bg-orange-500/20 text-orange-400' : 'text-white/80 hover:bg-white/5'}`}
                  >
                    🇬🇧 English
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center p-1">
              <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} size={20} />
            </div>
          </div>

          <div className="md:hidden flex items-center gap-3">
            {/* Mobile Language Switcher */}
            <button
              onClick={() => setLang(lang === 'sv' ? 'en' : 'sv')}
              className="p-2 text-white/80 flex items-center gap-1"
              aria-label="Switch language"
            >
              <Globe size={22} />
              <span className="text-xs font-bold uppercase">{lang}</span>
            </button>
            <div className="p-1">
              <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} size={22} />
            </div>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 w-full mt-4 p-4 md:hidden">
              <div className="glass bg-black/98 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex flex-col gap-4 shadow-2xl max-h-[80vh] overflow-y-auto no-scrollbar">

                <div className="flex flex-col gap-1">
                  <a href={PAGE_URLS[Page.HOME]} onClick={(e) => handleNavClick(Page.HOME, e)} className={`w-full py-3 rounded-xl font-bold text-left px-4 transition-colors ${currentPage === Page.HOME ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20' : 'text-white/80 hover:bg-white/5'}`}>{t.nav_home}</a>
                  <a href={PAGE_URLS[Page.ABOUT]} onClick={(e) => handleNavClick(Page.ABOUT, e)} className={`w-full py-3 rounded-xl font-bold text-left px-4 transition-colors ${currentPage === Page.ABOUT ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20' : 'text-white/80 hover:bg-white/5'}`}>{t.nav_about}</a>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 space-y-3">
                  <div className="px-1 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{t.nav_services_training}</div>
                  <div className="grid grid-cols-1 gap-1">
                    <a href={
                      PAGE_URLS[Page.SERVICES]} onClick={(e) => handleNavClick(Page.SERVICES, e)} className={`w-full py-3 rounded-xl font-bold text-left px-4 text-sm transition-colors ${currentPage === Page.SERVICES ? 'text-blue-400 bg-blue-500/10' : 'text-white/70 hover:bg-white/5'}`}>{t.nav_visa_alla}</a>
                    <a href={PAGE_URLS[Page.BEHANDLINGS_PEDAGOG]} onClick={(e) => handleNavClick(Page.BEHANDLINGS_PEDAGOG, e)} className={`w-full py-3 rounded-xl font-medium text-left px-4 text-sm transition-colors ${currentPage === Page.BEHANDLINGS_PEDAGOG ? 'text-blue-400 bg-blue-500/10' : 'text-white/70 hover:bg-white/5'}`}>{t.nav_behandlingspedagog}</a>
                    <a href={PAGE_URLS[Page.CHAT]} onClick={(e) => handleNavClick(Page.CHAT, e)} className={`w-full py-3 rounded-xl font-medium text-left px-4 text-sm transition-colors ${currentPage === Page.CHAT ? 'text-blue-400 bg-blue-500/10' : 'text-white/70 hover:bg-white/5'}`}>{t.nav_mit}</a>
                    <a href={PAGE_URLS[Page.GESTALT_TRAINING]} onClick={(e) => handleNavClick(Page.GESTALT_TRAINING, e)} className={`w-full py-3 rounded-xl font-medium text-left px-4 text-sm transition-colors ${currentPage === Page.GESTALT_TRAINING ? 'text-blue-400 bg-blue-500/10' : 'text-white/70 hover:bg-white/5'}`}>{t.nav_gestalt}</a>
                    <a href={PAGE_URLS[Page.THERAPY]} onClick={(e) => handleNavClick(Page.THERAPY, e)} className={`w-full py-3 rounded-xl font-medium text-left px-4 text-sm transition-colors ${currentPage === Page.THERAPY ? 'text-blue-400 bg-blue-500/10' : 'text-white/70 hover:bg-white/5'}`}>{t.nav_enskild_terapi}</a>
                    <a href={PAGE_URLS[Page.GROUP_THERAPY]} onClick={(e) => handleNavClick(Page.GROUP_THERAPY, e)} className={`w-full py-3 rounded-xl font-medium text-left px-4 text-sm transition-colors ${currentPage === Page.GROUP_THERAPY ? 'text-blue-400 bg-blue-500/10' : 'text-white/70 hover:bg-white/5'}`}>{t.nav_grupp_terapi}</a>
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 space-y-3">
                  <div className="px-1 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{t.nav_resources}</div>
                  <div className="grid grid-cols-1 gap-1">
                    <a href={PAGE_URLS[Page.COMMUNITY]} onClick={(e) => handleNavClick(Page.COMMUNITY, e)} className={`w-full py-3 rounded-xl font-medium text-left px-4 text-sm transition-colors ${currentPage === Page.COMMUNITY ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20' : 'text-white/70 hover:bg-white/5'}`}>{t.nav_gemenskap}</a>
                    <a href={PAGE_URLS[Page.QUALITY_MARKING]} onClick={(e) => handleNavClick(Page.QUALITY_MARKING, e)} className={`w-full py-3 rounded-xl font-medium text-left px-4 text-sm transition-colors ${currentPage === Page.QUALITY_MARKING ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20' : 'text-white/70 hover:bg-white/5'}`}>{t.nav_kvalitetsmarkering}</a>
                    <a href={PAGE_URLS[Page.SURVEY]} onClick={(e) => handleNavClick(Page.SURVEY, e)} className={`w-full py-3 rounded-xl font-medium text-left px-4 text-sm transition-colors ${currentPage === Page.SURVEY ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20' : 'text-white/70 hover:bg-white/5'}`}>{t.nav_enkat}</a>
                    <a href={PAGE_URLS[Page.DOWNLOADS]} onClick={(e) => handleNavClick(Page.DOWNLOADS, e)} className={`w-full py-3 rounded-xl font-medium text-left px-4 text-sm transition-colors ${currentPage === Page.DOWNLOADS ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-white/70 hover:bg-white/5'}`}>{t.nav_nedladdningar}</a>
                    <a href={PAGE_URLS[Page.BLOG]} onClick={(e) => handleNavClick(Page.BLOG, e)} className={`w-full py-3 rounded-xl font-medium text-left px-4 text-sm transition-colors ${currentPage === Page.BLOG ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20' : 'text-white/70 hover:bg-white/5'}`}>{t.nav_blog}</a>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <a href={PAGE_URLS[Page.BLOG]} onClick={(e) => handleNavClick(Page.BLOG, e)} className={`w-full py-3 rounded-xl font-bold text-left px-4 transition-colors ${currentPage === Page.BLOG ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20' : 'text-white/80 hover:bg-white/5'}`}>{t.nav_blog}</a>
                  <a href={PAGE_URLS[Page.CONTACT]} onClick={(e) => handleNavClick(Page.CONTACT, e)} className={`w-full py-3 rounded-xl font-bold text-left px-4 transition-colors ${currentPage === Page.CONTACT ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20' : 'text-white/80 hover:bg-white/5'}`}>{t.nav_contact}</a>
                </div>

                <div className="mt-2">
                  <a href={PAGE_URLS[Page.LOGIN]} onClick={(e) => handleNavClick(Page.LOGIN, e)} className={`w-full py-4 rounded-2xl font-black text-center px-4 flex items-center justify-center gap-3 transition-all ${currentPage === Page.LOGIN ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                    <LogIn size={20} /> {t.nav_login.toUpperCase()}
                  </a>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
