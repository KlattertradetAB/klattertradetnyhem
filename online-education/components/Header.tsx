
import React, { useState, useMemo, useLayoutEffect, useRef, useEffect } from 'react';
import { LogoIcon, SearchIcon, MenuIcon, XIcon, SunIcon, MoonIcon, ChevronDownIcon, LogOutIcon, LogInIcon, HomeIcon } from './Icons';
import type { Course, User } from '../types';

interface SearchResult {
  course: Course;
  titleIndices: number[];
  isMatch: boolean;
}
interface HeaderProps {
  allCourses: Course[];
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  suggestionResults: SearchResult[];
  renderHighlightedText: (text: string, indices: number[]) => React.ReactNode;
  theme: string;
  onToggleTheme: () => void;
  user: User | null;
  onLogout: () => void;
  onLoginClick: () => void;
  onCourseClick: (courseId: string) => void;
}

const getShortTitle = (title: string): string => {
    if (title === 'Behandlingsassistent') return 'Behandling';
    if (title === 'Gestalt- & Traumaterapeut') return 'Gestalt & Trauma';
    if (title === 'Myndighetsinducerat Trauma') return 'Myndighetstrauma';
    return title;
};

export const Header: React.FC<HeaderProps> = ({ 
  allCourses, 
  searchQuery, 
  onSearchChange, 
  suggestionResults, 
  renderHighlightedText, 
  theme, 
  onToggleTheme,
  user,
  onLogout,
  onLoginClick,
  onCourseClick
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  
  const [isMeasured, setIsMeasured] = useState(false);
  const [visibleLinks, setVisibleLinks] = useState<NavLink[]>([]);
  const [hiddenLinks, setHiddenLinks] = useState<NavLink[]>([]);

  const navContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const moreMenuContainerRef = useRef<HTMLDivElement>(null);

  interface NavLink {
    id: string;
    title: string;
    href: string;
  }
  
  const navLinks = useMemo<NavLink[]>(() => [
    { id: 'home', title: 'Hem', href: '#' },
    ...allCourses.map(course => ({ id: course.id, title: getShortTitle(course.title), href: `#${course.id}` })),
    ...(user ? [{ id: 'dashboard', title: 'Mina sidor', href: '#dashboard' }] : []),
    { id: 'resources', title: 'Resurser', href: '#resources' },
    { id: 'contact', title: 'Kontakt', href: '#contact' },
  ], [allCourses, user]);

  useEffect(() => {
    const handleResize = () => setIsMeasured(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    if (!isMeasured && navContainerRef.current) {
      const containerWidth = navContainerRef.current.offsetWidth;
      const allItemWidths = itemRefs.current.map(el => el?.getBoundingClientRect().width ?? 0);
      const moreButtonWidth = moreButtonRef.current?.getBoundingClientRect().width ?? 80;

      let currentWidth = 0;
      let splitIndex = -1;

      // First pass: can we fit everything?
      for (let i = 0; i < allItemWidths.length; i++) {
        const itemWidth = allItemWidths[i] + 16; // Add margin/gap buffer
        if (currentWidth + itemWidth > containerWidth) {
          splitIndex = i;
          break;
        }
        currentWidth += itemWidth;
      }
      
      if (splitIndex === -1) {
        setVisibleLinks(navLinks);
        setHiddenLinks([]);
      } else {
        // Second pass: fit with "More" button
        currentWidth = 0;
        splitIndex = -1;
        const availableWidth = containerWidth - moreButtonWidth - 16;
        for (let i = 0; i < allItemWidths.length; i++) {
          const itemWidth = allItemWidths[i] + 16;
          if (currentWidth + itemWidth > availableWidth) {
            splitIndex = i;
            break;
          }
          currentWidth += itemWidth;
        }
        
        if (splitIndex <= 0) {
           setVisibleLinks([]);
           setHiddenLinks(navLinks);
        } else {
           setVisibleLinks(navLinks.slice(0, splitIndex));
           setHiddenLinks(navLinks.slice(splitIndex));
        }
      }
      setIsMeasured(true);
    }
  }, [isMeasured, navLinks]);
  
  useEffect(() => {
    if (!isMoreMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
        if (moreMenuContainerRef.current && !moreMenuContainerRef.current.contains(event.target as Node)) {
            setIsMoreMenuOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMoreMenuOpen]);


  const handleHomeClick = (e?: React.MouseEvent) => {
    e?.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
    setIsMoreMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (href === '#') {
      handleHomeClick(e);
      return;
    }
    
    // Intercept course links
    if (href?.startsWith('#') && href.length > 1) {
      const courseId = href.substring(1);
      if (allCourses.some(c => c.id === courseId)) {
        e.preventDefault();
        onCourseClick(courseId);
        setIsMenuOpen(false);
        setIsMoreMenuOpen(false);
        return;
      }
      
      if (courseId === 'dashboard') {
        e.preventDefault();
        setIsMenuOpen(false);
        setIsMoreMenuOpen(false);
        // We'll handle this via a dedicated prop or custom event if needed, 
        // but for now let's assume hash navigation or similar in App.tsx
        window.location.hash = 'dashboard';
        return;
      }
    }

    setIsMenuOpen(false);
    setIsMoreMenuOpen(false);
  };
  
  const handleSuggestionClick = (courseId: string) => {
    onCourseClick(courseId);
    setSuggestionsVisible(false);
    onSearchChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="mt-4 flex items-center justify-between gap-4 p-4 glass-card no-hover-effect">
          <div className="flex items-center gap-3 flex-shrink-0">
            <button onClick={() => handleHomeClick()} aria-label="Gå till toppen av sidan" className="transition-transform hover:scale-105 active:scale-95">
              <img src="/logo.png" alt="Klätterträdet Logo" className="w-12 h-12 object-contain" />
            </button>
            <div className="hidden lg:block">
              <h1 className="text-lg font-bold text-blue-950 dark:text-white leading-tight">Horizonten & Klätterträdet</h1>
              <p className="text-[10px] text-orange-600 dark:text-orange-400 font-semibold uppercase tracking-[0.2em]">Utbildning • Handledning • Terapi</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-6 flex-1 justify-end min-w-0">
            <nav ref={navContainerRef} className="hidden md:flex items-center gap-6 text-sm font-bold flex-1 justify-end mr-4">
              {!isMeasured && (
                <div className="absolute invisible flex items-center gap-4">
                  {navLinks.map((link, index) => (
                    <a key={link.id} ref={el => { itemRefs.current[index] = el; }} href={link.href} className="whitespace-nowrap px-2">{link.title}</a>
                  ))}
                  <button ref={moreButtonRef} className="whitespace-nowrap flex items-center gap-1 px-2">Mer <ChevronDownIcon className="w-4 h-4" /></button>
                </div>
              )}

              {visibleLinks.map((link, index) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={handleNavClick}
                  className="text-blue-800 dark:text-slate-300 hover:text-blue-950 dark:hover:text-white transition-colors whitespace-nowrap px-1 flex items-center gap-1"
                  aria-label={link.id === 'home' ? 'Hem' : `Visa information om ${link.title}`}
                >
                  {link.id === 'home' ? <HomeIcon className="w-4 h-4" /> : link.title}
                </a>
              ))}
              
              {hiddenLinks.length > 0 && (
                <div ref={moreMenuContainerRef} className="relative">
                  <button
                    onClick={() => setIsMoreMenuOpen(prev => !prev)}
                    className="flex items-center gap-1 text-blue-800 dark:text-slate-300 hover:text-blue-950 dark:hover:text-white transition-colors whitespace-nowrap px-1"
                    aria-haspopup="true"
                    aria-expanded={isMoreMenuOpen}
                  >
                    Mer
                    <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isMoreMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isMoreMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 glass-card no-hover-effect rounded-lg shadow-xl overflow-hidden py-2 z-10 animate-fade-in-down">
                       <ul>
                         {hiddenLinks.map(link => (
                            <li key={link.id}>
                                <a
                                href={link.href}
                                onClick={handleNavClick}
                                className="w-full text-left block px-4 py-2 text-blue-800 dark:text-slate-300 hover:bg-blue-500/10 dark:hover:bg-white/10 transition-colors"
                                >
                                {link.title}
                                </a>
                            </li>
                         ))}
                       </ul>
                    </div>
                  )}
                </div>
              )}
            </nav>

            <div className="relative w-full sm:max-w-[200px] lg:max-w-xs">
              <input 
                type="search"
                placeholder="Sök..."
                value={searchQuery}
                onChange={onSearchChange}
                onFocus={() => setSuggestionsVisible(true)}
                onBlur={() => setTimeout(() => setSuggestionsVisible(false), 200)}
                autoComplete="off"
                className="w-full bg-blue-100/50 dark:bg-slate-900/70 border border-blue-300/50 dark:border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-blue-950 dark:text-white placeholder-blue-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                aria-label="Sök kurser"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="w-4 h-4 text-blue-500 dark:text-slate-400" />
              </div>
               {suggestionsVisible && searchQuery && suggestionResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full glass-card no-hover-effect rounded-lg shadow-xl overflow-hidden py-2 z-10">
                  <ul role="listbox" aria-label="Sökförslag">
                    {suggestionResults.map(({ course, titleIndices }) => (
                      <li key={course.id}>
                        <button
                          onClick={() => handleSuggestionClick(course.id)}
                          className="w-full text-left px-4 py-2 text-sm text-blue-800 dark:text-slate-300 hover:bg-blue-500/10 dark:hover:bg-white/10 transition-colors"
                          role="option"
                        >
                          {renderHighlightedText(course.title, titleIndices)}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <button
                onClick={onToggleTheme}
                className="liquid-glass-toggle focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 flex-shrink-0 scale-90 sm:scale-100"
                aria-label={`Växla till ${theme === 'dark' ? 'ljust' : 'mörkt'} läge`}
            >
                <span className="sr-only">Växla tema</span>
                <span className="liquid-glass-knob flex items-center justify-center">
                    <span className={`absolute transition-opacity duration-200 ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}>
                        <SunIcon className="w-4 h-4 text-yellow-500" />
                    </span>
                    <span className={`absolute transition-opacity duration-200 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}>
                        <MoonIcon className="w-4 h-4 text-indigo-300" />
                    </span>
                </span>
            </button>

            {user ? (
              <div className="flex items-center gap-3 ml-2">
                <div className="hidden sm:block text-right">
                  <div className="flex items-center gap-1.5 justify-end">
                    <span className="text-[10px] bg-orange-500/20 text-orange-600 dark:text-orange-400 px-1.5 py-0.5 rounded-full font-bold border border-orange-500/30">DEV</span>
                    <p className="text-xs font-bold text-blue-950 dark:text-white truncate max-w-[100px]">
                      {user.displayName}
                    </p>
                  </div>
                  <button 
                    onClick={onLogout}
                    className="text-[10px] text-orange-600 dark:text-orange-400 hover:underline"
                  >
                    Logga ut
                  </button>
                </div>
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName || 'User'} 
                    className="w-8 h-8 rounded-full border border-orange-500/30"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold text-xs border border-orange-500/30 shadow-inner">
                    {user.displayName?.charAt(0) || 'U'}
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-orange-500/30 whitespace-nowrap"
              >
                <LogInIcon className="w-4 h-4" />
                <span>Logga in / Skapa inlogg</span>
              </button>
            )}
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-blue-800 dark:text-slate-300 hover:bg-blue-500/10 dark:hover:bg-white/10 transition-colors"
                aria-label="Öppna menyn"
                aria-expanded={isMenuOpen}
              >
                <MenuIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div
          className={`fixed top-0 right-0 bottom-0 w-4/5 max-w-sm glass-card no-hover-effect p-6 flex flex-col transition-transform duration-300 ease-in-out transform ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-bold text-blue-950 dark:text-white">Meny</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-md text-blue-800 dark:text-slate-300 hover:bg-blue-500/10 dark:hover:bg-white/10 transition-colors"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-6 text-lg">
            {navLinks.map(link => (
              <a
                key={link.id}
                href={link.href}
                onClick={handleNavClick}
                className="text-blue-800 dark:text-slate-300 hover:text-blue-950 dark:hover:text-white transition-colors text-left"
              >
                {link.title === 'Hem' ? 'Hem' : (allCourses.find(c => c.id === link.id)?.title || link.title)}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

const animationStyles = `
  @keyframes fade-in-down {
    0% { opacity: 0; transform: translateY(-10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-down { animation: fade-in-down 0.2s ease-out; }
`;
if (!document.getElementById('header-animations')) {
    const styleSheet = document.createElement("style");
    styleSheet.id = 'header-animations';
    styleSheet.innerText = animationStyles;
    document.head.appendChild(styleSheet);
}
