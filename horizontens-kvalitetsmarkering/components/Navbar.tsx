import React from 'react';
import { Section } from '../types';
import { Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentSection: Section;
  setSection: (section: Section) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentSection, setSection }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { label: 'Hem', value: Section.HOME },
    { label: 'Tre Pelare', value: Section.PILLARS },
    { label: 'Checklista', value: Section.CHECKLIST },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-hkm-dark/60 backdrop-blur-lg border-b border-white/10 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer group" onClick={() => setSection(Section.HOME)}>
            <div className="relative">
              <ShieldCheck className="h-8 w-8 text-hkm-gold mr-2 transition-transform duration-300 group-hover:scale-110 relative z-10" />
              <div className="absolute inset-0 bg-hkm-gold blur-lg opacity-20 rounded-full group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>
            <span className="font-serif font-bold text-xl tracking-wider text-white group-hover:text-hkm-gold transition-colors duration-300 drop-shadow-sm">HKM</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setSection(item.value)}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 border-b-2 rounded-t-md ${
                    currentSection === item.value
                      ? 'border-hkm-gold text-white bg-white/10'
                      : 'border-transparent text-gray-300 hover:text-hkm-gold hover:border-gray-600 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none transition-colors duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] bg-hkm-dark/90 backdrop-blur-xl border-b border-white/10 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                setSection(item.value);
                setIsOpen(false);
              }}
              className={`block px-3 py-3 text-base font-medium w-full text-left transition-all duration-200 border-l-4 ${
                currentSection === item.value
                  ? 'bg-white/10 border-hkm-gold text-white pl-4'
                  : 'border-transparent text-gray-300 hover:bg-white/5 hover:text-hkm-gold hover:pl-4'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;