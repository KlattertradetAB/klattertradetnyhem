

import React, { useState } from 'react';
import type { Course } from '../types';
import { InfoCard } from './InfoCard';
import { Accordion } from './Accordion';
import { 
    BookIcon, CalendarIcon, CoffeeIcon, HelpCircleIcon, HomeIcon, 
    MapPinIcon, UsersIcon, SparklesIcon, BookOpenIcon, ShieldIcon,
    LoaderIcon
} from './Icons';
import { generateCourseSummary } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';

interface CourseSectionProps {
  course: Course;
  titleIndices: number[];
  subtitleIndices: number[];
  descriptionIndices: number[];
  renderHighlightedText: (text: string, indices: number[]) => React.ReactNode;
  onCourseClick: (courseId: string) => void;
  isLoggedIn: boolean;
}

export const CourseSection: React.FC<CourseSectionProps> = ({ 
    course, 
    titleIndices, 
    subtitleIndices, 
    descriptionIndices, 
    renderHighlightedText,
    onCourseClick,
    isLoggedIn
}) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // FIX: Explicitly type the values of iconMap to ensure TypeScript knows the elements accept a className prop, which resolves the React.cloneElement error.
  const iconMap: { [key: string]: React.ReactElement<{ className?: string }> } = {
    CalendarIcon: <CalendarIcon />,
    MapPinIcon: <MapPinIcon />,
    HomeIcon: <HomeIcon />,
    UsersIcon: <UsersIcon />,
    CoffeeIcon: <CoffeeIcon />,
    HelpCircleIcon: <HelpCircleIcon />,
    SparklesIcon: <SparklesIcon />,
    BookOpenIcon: <BookOpenIcon />,
    ShieldIcon: <ShieldIcon />,
    BookIcon: <BookIcon />
  };

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const courseText = `
        Titel: ${course.title}
        Subtitel: ${course.subtitle}
        Beskrivning: ${course.description}
        Teman: ${course.themes.join(', ')}
        Fördelar: ${course.keyBenefits.map(b => `${b.title}: ${b.description}`).join('; ')}
      `;
      const result = await generateCourseSummary(courseText);
      setSummary(result);
    } catch (err) {
      setError("Kunde inte generera sammanfattning. Försök igen senare.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id={course.id} className="pt-16 pb-8">
      <header className="text-center mb-12">
        <h2 id={`title-${course.id}`} className="text-4xl md:text-5xl font-extrabold text-blue-950 dark:text-slate-100 leading-tight tracking-wide break-words">
            {renderHighlightedText(course.title, titleIndices)}
        </h2>
        <p className="text-lg md:text-2xl text-orange-600 dark:text-orange-500 mt-2 font-light">
            {renderHighlightedText(course.subtitle, subtitleIndices)}
        </p>
        <p id={`description-${course.id}`} className="max-w-3xl mx-auto text-blue-800 dark:text-slate-300 leading-relaxed mt-4">
            {renderHighlightedText(course.description, descriptionIndices)}
        </p>

        <div className="mt-8 flex flex-col items-center gap-4">
          <button 
            onClick={() => onCourseClick(course.id)}
            className="flex items-center gap-2 px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/30"
          >
            <span>{isLoggedIn ? 'Visa kursinformation' : 'Logga in för att läsa mer'}</span>
          </button>

          {!summary && !isLoading && isLoggedIn && (
            <button 
              onClick={handleGenerateSummary}
              className="flex items-center gap-2 px-6 py-3 bg-orange-600/10 hover:bg-orange-600/20 text-orange-600 dark:text-orange-400 border border-orange-500/30 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 group"
            >
              <SparklesIcon className="w-5 h-5 group-hover:animate-pulse" />
              <span>Sammanfatta med AI</span>
            </button>
          )}

          {isLoading && (
            <div className="flex items-center gap-3 text-orange-600 dark:text-orange-400 font-medium animate-pulse">
              <LoaderIcon className="w-6 h-6 animate-spin" />
              <span>Genererar magi...</span>
            </div>
          )}

          <AnimatePresence>
            {summary && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mt-6 p-6 glass-card border-orange-500/30 dark:border-orange-500/20 relative"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-orange-600 text-white text-xs font-bold rounded-full uppercase tracking-widest shadow-lg">
                  AI Sammanfattning
                </div>
                <p className="text-blue-900 dark:text-slate-200 italic leading-relaxed">
                  "{summary}"
                </p>
                <button 
                  onClick={() => setSummary(null)}
                  className="mt-4 text-xs text-blue-500 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  Stäng sammanfattning
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <p className="mt-4 text-red-500 text-sm font-medium">{error}</p>
          )}
        </div>
      </header>

      {isLoggedIn && course.keyBenefits && course.keyBenefits.length > 0 && (
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-blue-950 dark:text-slate-100 mb-8 tracking-wide">Varför Välja Denna Utbildning?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {course.keyBenefits.map((benefit, index) => (
              <div key={index} className="glass-card p-6 text-center flex flex-col items-center">
                <div className="text-orange-500 dark:text-orange-400 mb-4">
                  {React.cloneElement(iconMap[benefit.iconName], { className: 'w-10 h-10' })}
                </div>
                <h4 className="font-bold text-lg text-blue-950 dark:text-white mb-2">{benefit.title}</h4>
                <p className="text-blue-800 dark:text-slate-300 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isLoggedIn && course.details.length > 0 && (
        <div className="mb-16">
            <h3 className="text-3xl font-bold text-center text-blue-950 dark:text-slate-100 mb-8 tracking-wide">Kursinformation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {course.details.map((detail, index) => (
                  <InfoCard key={index} icon={iconMap[detail.iconName]} title={detail.title} content={detail.content} />
                ))}
            </div>
        </div>
      )}

      {isLoggedIn && course.themes.length > 0 && (
        <div className="mb-16">
            <h3 className="text-3xl font-bold text-center text-blue-950 dark:text-slate-100 mb-8 tracking-wide">Teman & Innehåll</h3>
            <div className="flex flex-wrap justify-center gap-3">
            {course.themes.map((theme) => (
                <span key={theme} className="bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-200 border border-orange-500/20 dark:border-orange-500/30 text-sm font-medium px-4 py-2 rounded-full shadow-sm">
                {theme}
                </span>
            ))}
            </div>
        </div>
      )}

      {isLoggedIn && course.blocks.length > 0 && (
          <div className="mb-16">
             <h3 className="text-3xl font-bold text-center text-blue-950 dark:text-slate-100 mb-8 tracking-wide">{course.id === 'behandlingsassistent' ? 'Kursens 8 Block' : 'Utbildningens Upplägg'}</h3>
              <div className="max-w-4xl mx-auto text-center text-blue-800 dark:text-slate-300 mb-12 leading-relaxed">
                  <p>Varje block representerar en schemalagd workshop. Dessa kan genomföras antingen digitalt via Zoom eller som fysiska träffar på plats. Information om format, plats och tidpunkt anges alltid tydligt för respektive block. Blocken är kärnan i utbildningen och utgör den schemalagda undervisningstiden där vi fördjupar oss i kursens ämnen.</p>
              </div>
             <div className="max-w-4xl mx-auto">
               <Accordion items={course.blocks} blockPrefix={course.id === 'gestalt-traumaterapeut' ? 'År' : 'Block'} />
             </div>
          </div>
      )}

      {isLoggedIn && (
        <div>
          <h3 className="text-3xl font-bold text-center text-blue-950 dark:text-slate-100 mb-8 tracking-wide">Studielitteratur & Övriga Kostnader</h3>
          <div className="max-w-3xl mx-auto text-center text-blue-800 dark:text-slate-300 leading-relaxed">
              <p>Information om obligatorisk studielitteratur och eventuella andra kostnader tillhandahålls i god tid innan utbildningsstart, efter att din anmälan har bekräftats.</p>
          </div>
        </div>
      )}

    </section>
  );
};
