
import React, { useEffect, useRef, useState } from 'react';
import type { Course } from '../types';
import { InfoCard } from './InfoCard';
import { Accordion } from './Accordion';
import { BookIcon, CalendarIcon, CoffeeIcon, HelpCircleIcon, HomeIcon, MapPinIcon, UsersIcon, XIcon, FacebookIcon, InstagramIcon, LinkedInIcon, SparklesIcon, BookOpenIcon, ShieldIcon, LoaderIcon, PlayIcon } from './Icons';
import { generateCourseSummary } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
  onStartCourse: (courseTitle: string) => void;
  isUnlocked: boolean;
}

export const CourseModal: React.FC<CourseModalProps> = ({ course, onClose, onStartCourse, isUnlocked }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for animation to finish before calling parent onClose to unmount
    setTimeout(() => {
        onClose();
    }, 300);
  };

  const handleGenerateSummary = async () => {
    if (!course) return;
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

  useEffect(() => {
    // Reset summary when course changes
    setSummary(null);
    setError(null);
    
    // Animate in
    if (course) {
        // A minimal delay ensures the component is in the DOM with initial (invisible) styles
        // before the transition to visible styles is triggered.
        const id = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(id);
    }
  }, [course]);

  useEffect(() => {
    if (course) {
      lastFocusedElementRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';

      // Set initial focus on the close button after the modal is rendered
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          handleClose();
          return;
        }

        if (event.key === 'Tab') {
          if (!modalRef.current) return;
          
          const focusableElements = (Array.from(
            modalRef.current.querySelectorAll(
              'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
            )
          ) as HTMLElement[]).filter(el => !el.hasAttribute('disabled') && el.offsetWidth > 0 && el.offsetHeight > 0);
          
          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (event.shiftKey) { // Shift + Tab
            if (document.activeElement === firstElement) {
              lastElement.focus();
              event.preventDefault();
            }
          } else { // Tab
            if (document.activeElement === lastElement) {
              firstElement.focus();
              event.preventDefault();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'auto';
        // Restore focus to the element that opened the modal
        lastFocusedElementRef.current?.focus();
      };
    }
  }, [course]);


  if (!course) {
    return null;
  }

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

  const shareUrl = `${window.location.origin}${window.location.pathname}#${course.id}`;
  const shareText = `Kolla in kursen "${course.title}" hos Horizonten & Klätterträdet AB!`;
  const shareDescription = `${shareText} ${course.description.substring(0, 100)}...`;

  return (
    <div 
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="course-title"
        aria-describedby="course-description"
    >
      <div 
        ref={modalRef}
        className={`glass-card no-hover-effect relative w-full max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-8 rounded-2xl transition-all duration-300 ease-in-out ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95'}`}
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="absolute top-4 right-4 flex items-center gap-2 sm:gap-3 z-10">
          <button 
            onClick={() => onStartCourse(course.title)}
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-orange-600 hover:bg-orange-500 text-white text-[10px] sm:text-sm font-bold rounded-full shadow-lg hover:shadow-orange-500/40 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <PlayIcon className="w-3 h-3 sm:w-4 h-4 fill-white" />
            <span>{isUnlocked ? 'Fortsätt kursen' : 'Påbörja kursen'}</span>
          </button>
          
          <button 
              ref={closeButtonRef}
              onClick={handleClose} 
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Stäng fönster"
          >
            <XIcon className="w-8 h-8" />
          </button>
        </div>

        <header className="text-center mb-8">
            <h1 id="course-title" className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-wide">{course.title}</h1>
            <p className="text-lg md:text-2xl text-orange-300 mt-2 font-light">{course.subtitle}</p>
            <p id="course-description" className="max-w-3xl mx-auto text-slate-300 leading-relaxed mt-4">{course.description}</p>
            
            <div className="mt-8 flex flex-col items-center">
              {!summary && !isLoading && (
                <button 
                  onClick={handleGenerateSummary}
                  className="flex items-center gap-2 px-6 py-3 bg-orange-600/20 hover:bg-orange-600/30 text-orange-300 border border-orange-500/30 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 group"
                >
                  <SparklesIcon className="w-5 h-5 group-hover:animate-pulse" />
                  <span>Sammanfatta med AI</span>
                </button>
              )}

              {isLoading && (
                <div className="flex items-center gap-3 text-orange-400 font-medium animate-pulse">
                  <LoaderIcon className="w-6 h-6 animate-spin" />
                  <span>Genererar magi...</span>
                </div>
              )}

              <AnimatePresence>
                {summary && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl mt-6 p-6 glass-card border-orange-500/30 relative"
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-orange-600 text-white text-xs font-bold rounded-full uppercase tracking-widest shadow-lg">
                      AI Sammanfattning
                    </div>
                    <p className="text-slate-200 italic leading-relaxed">
                      "{summary}"
                    </p>
                    <button 
                      onClick={() => setSummary(null)}
                      className="mt-4 text-xs text-slate-400 hover:text-orange-400 transition-colors"
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
        
        <div className="flex justify-center items-center gap-6 mb-10 border-y border-white/10 py-4">
            <span className="text-sm font-semibold text-slate-300">Dela kursen:</span>
            <div className="flex gap-3">
                <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareDescription)}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Dela på Facebook"
                    className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
                >
                    <FacebookIcon className="w-5 h-5" />
                </a>
                <a 
                    href="https://www.instagram.com/"
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Besök oss på Instagram"
                    className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
                >
                    <InstagramIcon className="w-5 h-5" />
                </a>
                <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Dela på LinkedIn" 
                    className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
                >
                    <LinkedInIcon className="w-5 h-5" />
                </a>
            </div>
        </div>
        
        <div className="space-y-16">

            {course.keyBenefits && course.keyBenefits.length > 0 && (
              <section id="key-benefits">
                <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-wide">Varför Välja Denna Utbildning?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {course.keyBenefits.map((benefit, index) => (
                    <div key={index} className="glass-card p-6 text-center flex flex-col items-center">
                      <div className="text-orange-400 mb-4">
                        {React.cloneElement(iconMap[benefit.iconName], { className: 'w-10 h-10' })}
                      </div>
                      <h3 className="font-bold text-lg text-white mb-2">{benefit.title}</h3>
                      <p className="text-slate-300 text-sm leading-relaxed">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {course.details.length > 0 && (
              <section id="details">
                <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-wide">Kursinformation</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {course.details.map((detail, index) => (
                      <InfoCard key={index} icon={iconMap[detail.iconName]} title={detail.title} content={detail.content} />
                    ))}
                </div>
              </section>
            )}

            {course.themes.length > 0 && (
                <section id="themes">
                  <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-wide">Teman & Innehåll</h2>
                  <div className="flex flex-wrap justify-center gap-3">
                    {course.themes.map((theme) => (
                      <span key={theme} className="bg-orange-600/20 text-orange-200 border border-orange-500/30 text-sm font-medium px-4 py-2 rounded-full shadow-sm">
                        {theme}
                      </span>
                    ))}
                  </div>
                </section>
            )}

            {course.blocks.length > 0 && (
                <section id="blocks">
                   <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-wide">{course.id === 'behandlingsassistent' ? 'Kursens 8 Block' : 'Utbildningens Upplägg'}</h2>
                    <div className="max-w-4xl mx-auto text-center text-slate-300 mb-12 leading-relaxed">
                        <p>Varje block representerar en schemalagd workshop. Dessa kan genomföras antingen digitalt via Zoom eller som fysiska träffar på plats. Information om format, plats och tidpunkt anges alltid tydligt för respektive block. Blocken är kärnan i utbildningen och utgör den schemalagda undervisningstiden där vi fördjupar oss i kursens ämnen.</p>
                    </div>
                   <div className="max-w-4xl mx-auto">
                     <Accordion items={course.blocks} blockPrefix={course.id === 'gestalt-traumaterapeut' ? 'År' : 'Block'} />
                   </div>
                </section>
            )}

            {course.literature.length > 0 && (
                <section id="literature">
                    <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-wide">Litteraturlista</h2>
                    <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                        {course.literature.map((book, index) => (
                            <div key={index} className="glass-card flex items-center p-4 gap-4">
                                <BookIcon className="text-orange-400 w-8 h-8 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-white">{book.title}</h3>
                                    <p className="text-slate-400 text-sm">{book.author}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {course.miscInfo && course.miscInfo.length > 0 && (
                <section id="misc-info">
                    <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-wide">Övrig Information</h2>
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                         {course.miscInfo.map((info, index) => (
                            <InfoCard key={index} icon={iconMap[info.iconName]} title={info.title} content={info.content} />
                         ))}
                    </div>
                </section>
            )}
        </div>
      </div>
    </div>
  );
};
