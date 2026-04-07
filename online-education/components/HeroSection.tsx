

import React, { useMemo } from 'react';
import type { Course } from '../types';
import { MailIcon, UsersIcon, SparklesIcon, ShieldIcon } from './Icons';
import { Spotlight } from './Spotlight';

interface SearchResult {
  course: Course;
  titleIndices: number[];
  isMatch: boolean;
}

interface HeroSectionProps {
  allCourses: Course[];
  searchQuery: string;
  searchResults: SearchResult[];
  renderHighlightedText: (text: string, indices: number[]) => React.ReactNode;
  onCourseClick: (courseId: string) => void;
}


export const HeroSection: React.FC<HeroSectionProps> = ({ 
  allCourses, 
  searchQuery, 
  searchResults, 
  renderHighlightedText,
  onCourseClick,
}) => {

  const iconMap: { [key: string]: React.ReactElement } = {
    UsersIcon: <UsersIcon className="w-4 h-4" />,
    SparklesIcon: <SparklesIcon className="w-4 h-4" />,
    ShieldIcon: <ShieldIcon className="w-4 h-4" />,
  };
  
  const hasActiveFilters = searchQuery.trim().length > 0;

  const searchResultsMap = useMemo(() => 
    new Map(searchResults.map(r => [r.course.id, r])),
    [searchResults]
  );
  
  const hasMatches = hasActiveFilters && searchResults.some(r => r.isMatch);

  return (
    <section 
      className="relative text-center pt-16 pb-12 rounded-2xl overflow-hidden bg-blue-50/[0.96] dark:bg-black/[0.96] antialiased"
    >
      {/* Spotlight Effect */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
       {/* Grid Background */}
      <div 
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '2rem 2rem'
        }}
        // Using a data attribute to switch style in CSS could be an alternative for complex styles
      />
      <div 
        aria-hidden="true"
        className="absolute inset-0 dark:opacity-100 opacity-0 transition-opacity duration-300"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '2rem 2rem'
        }}
      />
      
      <div className="relative z-10 p-4">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-b from-blue-950 to-blue-700 dark:from-neutral-50 dark:to-neutral-400 bg-clip-text text-transparent leading-tight tracking-wide">
          Våra Utbildningar
        </h1>
        <p className="max-w-3xl mx-auto text-blue-800 dark:text-neutral-300 leading-relaxed mt-4 mb-8">
          Utforska våra processinriktade utbildningar. Använd sökfältet för att hitta en kurs som passar dig, och klicka på den för att läsa mer.
        </p>

        <div className="mb-8 min-h-[44px]">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              {allCourses.map(course => {
                const result = searchResultsMap.get(course.id);
                const isMatch = result?.isMatch ?? false;
                const titleIndices = result?.titleIndices ?? [];
                const icon = iconMap[course.iconName];

                const isHighlighted = hasActiveFilters && isMatch;
                const isDimmed = hasActiveFilters && !isMatch;
                
                const baseClasses = "flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base border transform hover:scale-105 backdrop-blur-md";
                
                const styleClasses = isHighlighted
                  ? "text-white bg-orange-500/80 dark:bg-orange-500/20 border-orange-400"
                  : isDimmed
                  ? "text-blue-500 bg-blue-900/5 border-blue-900/10 dark:text-slate-400 dark:bg-white/10 dark:border-white/10 opacity-50 hover:opacity-100 hover:text-blue-800 dark:hover:text-slate-200"
                  : "text-blue-800 bg-blue-900/5 border-blue-900/10 dark:text-slate-200 dark:bg-white/5 dark:border-white/10 hover:bg-blue-900/10 dark:hover:bg-white/10";

                return (
                  <button 
                    key={course.id}
                    onClick={() => onCourseClick(course.id)}
                    className={`${baseClasses} ${styleClasses}`}
                  >
                    {icon}
                    <span>{(isHighlighted && searchQuery) ? renderHighlightedText(course.title, titleIndices) : course.title}</span>
                  </button>
                );
              })}
          </div>
          {hasActiveFilters && !hasMatches && (
            <p className="text-blue-700 dark:text-slate-400 italic mt-4">Inga kurser matchade din sökning.</p>
          )}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <a
            href="#contact"
            className="flex items-center gap-3 bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-105"
          >
            <MailIcon className="w-5 h-5" />
            Kontakta oss direkt
          </a>
        </div>
      </div>
    </section>
  );
};