
import React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
  pageNumber: number;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children, pageNumber }) => {
  return (
    <section className="relative min-h-[60vh] flex flex-col pb-32 mb-16 last:mb-0 print:break-after-page">
      {/* Main Content Area */}
      <div className="flex-grow">
        {children}
      </div>
      
      {/* Decorative Footer Area with Page Number */}
      <div className="absolute bottom-12 left-0 w-full flex flex-col items-center pointer-events-none select-none">
        
        {/* Page Number with elegant "kringlande streck" flourishes */}
        <div className="flex items-center gap-4 text-[var(--secondary-text)]">
          {/* Left Flourish */}
          <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="opacity-30">
            <path 
              d="M0 10C10 10 15 2 20 2C25 2 30 10 40 10" 
              stroke="currentColor" 
              strokeWidth="0.5" 
              strokeLinecap="round"
            />
            <path 
              d="M5 13C12 13 18 18 25 10" 
              stroke="currentColor" 
              strokeWidth="0.5" 
              strokeLinecap="round"
              strokeDasharray="1 2"
            />
          </svg>
          
          <div className="relative px-2">
            <span className="font-serif text-[var(--text-color)] font-bold text-xl tracking-tighter block min-w-[1.5ch] text-center">
              {pageNumber}
            </span>
          </div>

          {/* Right Flourish (Mirror of Left) */}
          <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="opacity-30 scale-x-[-1]">
            <path 
              d="M0 10C10 10 15 2 20 2C25 2 30 10 40 10" 
              stroke="currentColor" 
              strokeWidth="0.5" 
              strokeLinecap="round"
            />
            <path 
              d="M5 13C12 13 18 18 25 10" 
              stroke="currentColor" 
              strokeWidth="0.5" 
              strokeLinecap="round"
              strokeDasharray="1 2"
            />
          </svg>
        </div>
        
        {/* Very subtle shadow/gradient transition at the bottom of the "page" */}
        <div className="mt-6 w-32 h-px bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent opacity-20"></div>
      </div>

      {/* Visual Page Separator for Screen View */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full h-8 flex justify-center items-center pointer-events-none print:hidden opacity-10 overflow-hidden">
         <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--text-color)] to-transparent"></div>
      </div>
    </section>
  );
};
