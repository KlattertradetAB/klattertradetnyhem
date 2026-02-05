import React, { useState, useEffect } from 'react';
import { Theme } from './types';
import { THEMES } from './constants';

// Components - All using Named Imports to avoid default export conflicts
import { Toolbar } from './components/Toolbar';
import { Cover } from './components/Cover';
import { TableOfContents } from './components/TableOfContents';
import { Chapter1 } from './components/Chapter1';
import { Chapter2 } from './components/Chapter2';
import { TraumaCycleDiagram } from './components/TraumaCycleDiagram';
import { Chapter3 } from './components/Chapter3';
import { StrategiesInfographic } from './components/StrategiesInfographic';
import { Chapter4 } from './components/Chapter4';
import { Chapter5 } from './components/Chapter5';
import { Chapter6 } from './components/Chapter6';
import { Footer } from './components/Footer';
import { PageWrapper } from './components/PageWrapper';

interface AppProps {
  onBack: () => void;
}

export const App: React.FC<AppProps> = ({ onBack }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('light');
  let pageCounter = 1; // Global page counter

  // Apply theme-specific styles to body to cover the whole viewport background
  useEffect(() => {
    document.body.style.backgroundColor = THEMES[currentTheme]['--app-bg'];
    return () => {
      // Body style is handled by the main App's dynamic classes, 
      // but we should clear the manual override here.
      document.body.style.backgroundColor = '';
    };
  }, [currentTheme]);

  return (
    <div
      className="min-h-screen transition-colors duration-300 font-serif"
      style={THEMES[currentTheme] as React.CSSProperties}
    >
      {/* Outer App Container */}
      <div className="flex flex-col items-center pt-5 pb-20 bg-[var(--app-bg)] min-h-screen transition-colors duration-300">

        <Toolbar currentTheme={currentTheme} onThemeChange={setCurrentTheme} onBack={onBack} />

        {/* 
          Book Stack Container 
          Adds a visual 'stacked paper' effect with multiple layers of shadows and offsets
        */}
        <div className="relative w-full max-w-[850px] px-4 md:px-0">
          {/* Layered shadows to simulate physical book height */}
          <div className="absolute inset-0 bg-black/5 translate-x-1 translate-y-1 rounded-md -z-10"></div>
          <div className="absolute inset-0 bg-black/5 translate-x-2 translate-y-2 rounded-md -z-20"></div>

          {/* Main Book Body */}
          <div
            className="w-full p-8 md:p-20 bg-[var(--bg-color)] text-[var(--text-color)] shadow-[var(--paper-shadow)] rounded-md transition-colors duration-300 min-h-screen text-lg leading-relaxed relative overflow-hidden"
            role="main"
          >
            {/* Subtle paper texture overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>

            <Cover />

            <PageWrapper pageNumber={pageCounter++}>
              <TableOfContents />
            </PageWrapper>

            <PageWrapper pageNumber={pageCounter++}>
              <Chapter1 />
            </PageWrapper>

            <PageWrapper pageNumber={pageCounter++}>
              <Chapter2 />
            </PageWrapper>

            <PageWrapper pageNumber={pageCounter++}>
              <TraumaCycleDiagram />
            </PageWrapper>

            {/* Chapter 3 (MiV) - approx 6 pages (5-10) */}
            <Chapter3 startPageNumber={pageCounter} />
            {(() => { pageCounter += 6; return null; })()}

            {/* Injected Infographic between page 10 and 11 (becomes page 11) */}
            <PageWrapper pageNumber={pageCounter++}>
              <StrategiesInfographic />
            </PageWrapper>

            {/* Chapter 4 (Systeminducerad retraumatisering) - 1 page (now 12) */}
            <Chapter4 startPageNumber={pageCounter} />
            {(() => { pageCounter += 1; return null; })()}

            {/* Chapter 5 (Systemets objektifiering) - 2 pages (now 13-14) */}
            <Chapter5 startPageNumber={pageCounter} />
            {(() => { pageCounter += 2; return null; })()}

            {/* Chapter 6 (Föräldern som restprodukt / Othering) */}
            <Chapter6 startPageNumber={pageCounter} />

            <Footer />

          </div>
        </div>
      </div>
    </div>
  );
};
