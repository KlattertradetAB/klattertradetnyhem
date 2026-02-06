
import React, { useState, useRef, useEffect } from 'react';
import { Page } from '../types';
import { Hexagon, Menu, X, Moon, Sun, ChevronDown, BookOpen, Heart, Newspaper, Library, Users, ClipboardList, Download, LogIn } from 'lucide-react';

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

  const servicesRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);

  const handleNavClick = (page: Page) => {
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
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isServicesActive = [Page.CHAT, Page.THERAPY, Page.GROUP_THERAPY, Page.GESTALT_TRAINING, Page.BEHANDLINGS_PEDAGOG].includes(currentPage);
  const isResourcesActive = [Page.COMMUNITY, Page.SURVEY, Page.DOWNLOADS].includes(currentPage);

  return (
    <header className="p-4 md:p-5">
      <div className="max-w-[1600px] mx-auto">
        <nav className="glass bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg flex justify-between items-center px-8 py-4 relative z-50">

          <button
            className="flex items-center gap-4 cursor-pointer group rounded-lg focus:outline-none"
            onClick={() => handleNavClick(Page.HOME)}
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
          </button>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => handleNavClick(Page.HOME)}
              className={`px-4 py-2 rounded-xl transition-all font-medium ${currentPage === Page.HOME ? 'bg-white/20 text-white shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
            >
              Hem
            </button>
            <button
              onClick={() => handleNavClick(Page.ABOUT)}
              className={`px-4 py-2 rounded-xl transition-all font-medium ${currentPage === Page.ABOUT ? 'bg-white/20 text-white shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
            >
              Om oss
            </button>

            {/* Tjänster Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                onMouseEnter={() => { setIsServicesOpen(true); setIsResourcesOpen(false); }}
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={`flex items-center gap-1 px-4 py-2 rounded-xl transition-all font-medium ${isServicesActive ? 'bg-white/20 text-white shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
              >
                Tjänster <ChevronDown size={16} className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {isServicesOpen && (
                <div
                  className="absolute top-full left-0 mt-3 w-80 glass bg-black/90 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-4 animate-fade-in flex flex-col gap-4"
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <div>
                    <div className="flex items-center gap-2 px-3 mb-2 text-white/40 text-[10px] uppercase tracking-widest font-bold">
                      <BookOpen size={12} /> Utbildningar
                    </div>
                    <div className="space-y-1">
                      <button onClick={() => handleNavClick(Page.BEHANDLINGS_PEDAGOG)} className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex flex-col ${currentPage === Page.BEHANDLINGS_PEDAGOG ? 'bg-orange-600/20 text-orange-400' : 'hover:bg-white/5 text-white/90'}`}>
                        <span className="font-bold text-sm">Behandlingspedagog</span>
                        <span className="text-[10px] opacity-60">Yrkesutbildning</span>
                      </button>
                      <button onClick={() => handleNavClick(Page.CHAT)} className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex flex-col ${currentPage === Page.CHAT ? 'bg-orange-600/20 text-orange-400' : 'hover:bg-white/5 text-white/90'}`}>
                        <span className="font-bold text-sm">Myndighetsinducerat trauma</span>
                        <span className="text-[10px] opacity-60">Specialistutbildning (MiT)</span>
                      </button>
                      <button onClick={() => handleNavClick(Page.GESTALT_TRAINING)} className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex flex-col ${currentPage === Page.GESTALT_TRAINING ? 'bg-orange-600/20 text-orange-400' : 'hover:bg-white/5 text-white/90'}`}>
                        <span className="font-bold text-sm">Gestaltterapi</span>
                        <span className="text-[10px] opacity-60">Grundutbildning & metodik</span>
                      </button>
                    </div>
                  </div>
                  <div className="h-px bg-white/10 mx-2"></div>
                  <div>
                    <div className="flex items-center gap-2 px-3 mb-2 text-white/40 text-[10px] uppercase tracking-widest font-bold">
                      <Heart size={12} /> Terapi
                    </div>
                    <div className="space-y-1">
                      <button onClick={() => handleNavClick(Page.THERAPY)} className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex flex-col ${currentPage === Page.THERAPY ? 'bg-orange-600/20 text-orange-400' : 'hover:bg-white/5 text-white/90'}`}>
                        <span className="font-bold text-sm">Enskild Terapi</span>
                        <span className="text-[10px] opacity-60">Stöd & utveckling</span>
                      </button>
                      <button onClick={() => handleNavClick(Page.GROUP_THERAPY)} className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex flex-col ${currentPage === Page.GROUP_THERAPY ? 'bg-orange-600/20 text-orange-400' : 'hover:bg-white/5 text-white/90'}`}>
                        <span className="font-bold text-sm">Grupp- och parterapi</span>
                        <span className="text-[10px] opacity-60">Gemensam läkning</span>
                      </button>
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
                className={`flex items-center gap-1 px-4 py-2 rounded-xl transition-all font-medium ${isResourcesActive ? 'bg-white/20 text-white shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
              >
                Resurser <ChevronDown size={16} className={`transition-transform duration-300 ${isResourcesOpen ? 'rotate-180' : ''}`} />
              </button>

              {isResourcesOpen && (
                <div
                  className="absolute top-full left-0 mt-3 w-72 glass bg-black/90 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-4 animate-fade-in flex flex-col gap-2"
                  onMouseLeave={() => setIsResourcesOpen(false)}
                >
                  <div className="flex items-center gap-2 px-3 mb-1 text-white/40 text-[10px] uppercase tracking-widest font-bold">
                    <Library size={12} /> Bibliotek & Verktyg
                  </div>

                  <button
                    onClick={() => handleNavClick(Page.COMMUNITY)}
                    className={`w-full text-left px-3 py-3 rounded-xl transition-colors flex items-center gap-3 ${currentPage === Page.COMMUNITY ? 'bg-amber-600/20 text-amber-400' : 'hover:bg-white/5 text-white/90'}`}
                  >
                    <div className="p-2 bg-white/5 rounded-lg">
                      <Users size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">Gemenskap</span>
                      <span className="text-[10px] opacity-60">Appen & community</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick(Page.SURVEY)}
                    className={`w-full text-left px-3 py-3 rounded-xl transition-colors flex items-center gap-3 ${currentPage === Page.SURVEY ? 'bg-blue-600/20 text-blue-400' : 'hover:bg-white/5 text-white/90'}`}
                  >
                    <div className="p-2 bg-white/5 rounded-lg">
                      <ClipboardList size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">Enkät och utredning</span>
                      <span className="text-[10px] opacity-60">Självreflektion & Grundsår</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick(Page.DOWNLOADS)}
                    className={`w-full text-left px-3 py-3 rounded-xl transition-colors flex items-center gap-3 ${currentPage === Page.DOWNLOADS ? 'bg-emerald-600/20 text-emerald-400' : 'hover:bg-white/5 text-white/90'}`}
                  >
                    <div className="p-2 bg-white/5 rounded-lg">
                      <Download size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">Nedladdningar</span>
                      <span className="text-[10px] opacity-60">E-böcker & material</span>
                    </div>
                  </button>

                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick(Page.BLOG)}
              className={`px-4 py-2 rounded-xl transition-all font-medium ${currentPage === Page.BLOG ? 'bg-white/20 text-white shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
            >
              Blogg
            </button>
            <button
              onClick={() => handleNavClick(Page.CONTACT)}
              className={`px-4 py-2 rounded-xl transition-all font-medium ${currentPage === Page.CONTACT ? 'bg-white/20 text-white shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
            >
              Kontakt & bokning
            </button>

            <div className="relative group/badge">
              <button
                onClick={() => handleNavClick(Page.LOGIN)}
                className={`px-4 py-2 rounded-xl transition-all font-medium flex items-center gap-2 ${currentPage === Page.LOGIN ? 'bg-orange-600/20 text-orange-400 shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
              >
                <LogIn size={18} /> Logga in
              </button>
              <div className="absolute -top-3 -right-3 pointer-events-none">
                <div className="bg-red-600 text-[7px] font-black text-white px-2 py-1 rounded-lg shadow-[0_4px_12px_rgba(220,38,38,0.5)] animate-pulse whitespace-nowrap uppercase tracking-widest border border-white/20 -rotate-6 group-hover/badge:rotate-0 transition-transform duration-500">
                  Nytt från oss
                </div>
              </div>
            </div>

            <div className="w-px h-6 bg-white/20 mx-2"></div>

            <button onClick={toggleTheme} className="p-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all hover:scale-105">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 text-white/80">
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 w-full mt-4 p-4 md:hidden">
              <div className="glass bg-black/95 backdrop-blur-3xl border border-white/20 rounded-2xl p-6 flex flex-col gap-4 shadow-2xl max-h-[80vh] overflow-y-auto no-scrollbar">

                <div className="flex flex-col gap-1">
                  <button onClick={() => handleNavClick(Page.HOME)} className={`w-full py-3 rounded-xl font-bold text-left px-4 transition-colors ${currentPage === Page.HOME ? 'text-orange-400 bg-white/10' : 'text-white/80 hover:bg-white/5'}`}>Hem</button>
                  <button onClick={() => handleNavClick(Page.ABOUT)} className={`w-full py-3 rounded-xl font-bold text-left px-4 transition-colors ${currentPage === Page.ABOUT ? 'text-orange-400 bg-white/10' : 'text-white/80 hover:bg-white/5'}`}>Om oss</button>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 space-y-3">
                  <div className="px-1 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Tjänster & Utbildning</div>
                  <div className="grid grid-cols-1 gap-1">
                    <button onClick={() => handleNavClick(Page.BEHANDLINGS_PEDAGOG)} className={`w-full py-3 rounded-xl font-medium text-left px-4 text-sm transition-colors ${currentPage === Page.BEHANDLINGS_PEDAGOG ? 'text-orange-400 bg-white/10' : 'text-white/70 hover:bg-white/5'}`}>Behandlingspedagog</button>
                    <button onClick={() => handleNavClick(Page.CHAT)} className={`w-full py-3 rounded-xl font-medium text-left px-4 text-sm transition-colors ${currentPage === Page.CHAT ? 'text-orange-400 bg-white/10' : 'text-white/70 hover:bg-white/5'}`}>Myndighetsinducerat trauma</button>
                    <button onClick={() => handleNavClick(Page.GESTALT_TRAINING)} className={`w-full py-3 rounded-xl font-medium text-left px-4 text-sm transition-colors ${currentPage === Page.GESTALT_TRAINING ? 'text-orange-400 bg-white/10' : 'text-white/70 hover:bg-white/5'}`}>Gestaltterapi</button>
                    <button onClick={() => handleNavClick(Page.THERAPY)} className={`w-full py-3 rounded-xl font-medium text-left px-4 text-sm transition-colors ${currentPage === Page.THERAPY ? 'text-orange-400 bg-white/10' : 'text-white/70 hover:bg-white/5'}`}>Enskild Terapi</button>
                    <button onClick={() => handleNavClick(Page.GROUP_THERAPY)} className={`w-full py-3 rounded-xl font-medium text-left px-4 text-sm transition-colors ${currentPage === Page.GROUP_THERAPY ? 'text-orange-400 bg-white/10' : 'text-white/70 hover:bg-white/5'}`}>Grupp- och parterapi</button>
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 space-y-3">
                  <div className="px-1 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Resurser</div>
                  <div className="grid grid-cols-1 gap-1">
                    <button onClick={() => handleNavClick(Page.COMMUNITY)} className={`w-full py-3 rounded-xl font-medium text-left px-4 text-sm transition-colors ${currentPage === Page.COMMUNITY ? 'text-amber-400 bg-white/10' : 'text-white/70 hover:bg-white/5'}`}>Gemenskap</button>
                    <button onClick={() => handleNavClick(Page.SURVEY)} className={`w-full py-3 rounded-xl font-medium text-left px-4 text-sm transition-colors ${currentPage === Page.SURVEY ? 'text-blue-400 bg-white/10' : 'text-white/70 hover:bg-white/5'}`}>Enkät och utredning</button>
                    <button onClick={() => handleNavClick(Page.DOWNLOADS)} className={`w-full py-3 rounded-xl font-medium text-left px-4 text-sm transition-colors ${currentPage === Page.DOWNLOADS ? 'text-emerald-400 bg-white/10' : 'text-white/70 hover:bg-white/5'}`}>Nedladdningar</button>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <button onClick={() => handleNavClick(Page.BLOG)} className={`w-full py-3 rounded-xl font-bold text-left px-4 transition-colors ${currentPage === Page.BLOG ? 'text-orange-400 bg-white/10' : 'text-white/80 hover:bg-white/5'}`}>Blogg</button>
                  <button onClick={() => handleNavClick(Page.CONTACT)} className={`w-full py-3 rounded-xl font-bold text-left px-4 transition-colors ${currentPage === Page.CONTACT ? 'text-orange-400 bg-white/10' : 'text-white/80 hover:bg-white/5'}`}>Kontakt & bokning</button>
                </div>

                <div className="mt-2">
                  <button onClick={() => handleNavClick(Page.LOGIN)} className={`w-full py-4 rounded-2xl font-black text-center px-4 flex items-center justify-center gap-3 transition-all ${currentPage === Page.LOGIN ? 'bg-orange-500 text-black shadow-lg shadow-orange-500/20' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                    <LogIn size={20} /> LOGGA IN
                  </button>
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
