import React, { useState, useEffect } from 'react';
import { BookOpen, Menu, X, Sun, Moon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Theme Initialization
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  const navLinks = [
    { name: 'Hem', href: '#home' },
    { name: 'Om boken', href: '#book' },
    { name: 'Författarna', href: '#author' },
    { name: 'Kontakt', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 dark:bg-black/95 py-4 backdrop-blur-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-brand-secondary rounded-full flex items-center justify-center text-white relative shadow-[0_0_15px_rgba(233,196,106,0.5)]">
            <BookOpen size={20} />
            <div className="absolute -right-1 -bottom-1 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-brand-secondary -rotate-45"></div>
          </div>
          <span className="text-white font-bold text-xl group-hover:text-brand-primary transition-colors">
            ebook
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-white text-sm font-semibold hover:text-brand-primary transition-colors relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-brand-secondary after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              {link.name}
            </a>
          ))}
          
          {/* Liquid Glass Toggle */}
          <button
            onClick={toggleTheme}
            className="relative w-16 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[inset_0_1px_4px_rgba(0,0,0,0.2)] hover:bg-white/20 transition-colors duration-300 flex items-center px-1 overflow-hidden group"
            aria-label="Toggle Dark Mode"
          >
             {/* Fluid Indicator */}
            <div className={`absolute top-1 bottom-1 w-6 rounded-full shadow-lg flex items-center justify-center transform transition-all duration-500 cubic-bezier(0.68, -0.55, 0.27, 1.55) ${isDarkMode ? 'translate-x-8 bg-brand-primary text-white' : 'translate-x-0 bg-white/90 text-brand-secondary'}`}>
               {isDarkMode ? <Moon size={14} /> : <Sun size={14} />}
            </div>
            {/* Glass Shine Effect */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full pointer-events-none"></div>
          </button>

          <a href="#contact" className="bg-brand-btn hover:bg-brand-btn-hover text-white px-6 py-2 rounded-large font-bold text-sm transition-colors shadow-lg shadow-brand-btn/20 hover:shadow-brand-btn/40">
            Beställ idag
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 text-white bg-white/10 rounded-full backdrop-blur-sm border border-white/20"
          >
            {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button 
            className="text-white"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/95 dark:bg-[#050505]/95 p-6 md:hidden flex flex-col gap-6 border-t border-white/10 backdrop-blur-lg shadow-2xl">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-white text-lg font-semibold hover:text-brand-secondary transition-colors"
              onClick={() => setIsMobileOpen(false)}
            >
              {link.name}
            </a>
          ))}
           <a 
            href="#contact" 
            className="bg-brand-btn hover:bg-brand-btn-hover text-white px-6 py-3 rounded-large font-bold text-center"
            onClick={() => setIsMobileOpen(false)}
           >
            Beställ idag
          </a>
        </div>
      )}
    </nav>
  );
};