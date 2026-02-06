import React, { useState } from 'react';

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
}

export const ExpandableSection: React.FC<ExpandableSectionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-8 border border-[var(--border-color)] rounded-lg overflow-hidden transition-colors duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full px-6 py-4 bg-[var(--bg-color)] text-[var(--accent-color)] font-sans font-bold text-lg cursor-pointer hover:bg-black/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
        aria-expanded={isOpen}
        aria-controls={`expandable-content-${title.replace(/\s/g, '-')}`}
      >
        <span>{title}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div
        id={`expandable-content-${title.replace(/\s/g, '-')}`}
        className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
      >
        <div className="p-6 pt-2 bg-[var(--bg-color)] border-t border-[var(--border-color)] text-[var(--text-color)]">
          {children}
        </div>
      </div>
    </div>
  );
};