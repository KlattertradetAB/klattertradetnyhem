import React from 'react';
import { Logo } from './Logo';
import ThemeSwitcher from './ThemeSwitcher';
import { useTranslations } from '../translations';

const Header: React.FC = () => {
  const t = useTranslations();
  const handleReset = () => {
    // A simple way to reset the app state by reloading the page
    window.location.reload();
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-20">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={handleReset}
          aria-label={t.resetQuizButton}
          className="bg-transparent border-none p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary rounded-md"
        >
          <Logo className="h-10 md:h-12 w-auto" />
        </button>
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;