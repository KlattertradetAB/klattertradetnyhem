
import React from 'react';
import CTAButton from './CTAButton';
import { BookSection } from './BookSection';
import ContactForm from './ContactForm';
import { useTranslations } from '../hooks';

interface BookReleasePageProps {
  onBack: () => void;
}

const BookReleasePage: React.FC<BookReleasePageProps> = ({ onBack }) => {
  const { t } = useTranslations();

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        const headerOffset = 50;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 font-sans">
      
      {/* Back Button Container */}
      <div className="pt-6 px-6 lg:px-8 bg-slate-900/80 backdrop-blur-lg">
          <button
            onClick={onBack}
            className="flex items-center text-slate-300 hover:text-cyan-400 transition-colors group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform duration-200 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t.goBack}
          </button>
      </div>

      {/* Hero Section - Matching Landing Page Aesthetics */}
      <div className="relative isolate overflow-hidden bg-slate-900/80 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              Myndighetsinducerat trauma
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-300 font-medium">
              {t.bookReleaseCollaboration}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <CTAButton onClick={() => scrollToId('book-details')}>
                {t.readMoreAboutBook}
              </CTAButton>
              <button 
                onClick={() => scrollToId('preorder')}
                className="inline-block rounded-md px-6 py-3 text-lg font-semibold text-center text-white border-2 border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
              >
                {t.preOrderCopy}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <main>
        <section id="book-details" className="scroll-mt-12">
          {/* Reuse BookSection but styled simply */}
          <BookSection />
        </section>
        
        <section id="preorder" className="scroll-mt-12">
          {/* Replaced BookContact with the standard ContactForm */}
          <ContactForm />
        </section>
      </main>

      <footer className="bg-slate-900 py-8 text-center text-gray-400 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <p className="text-sm opacity-80">&copy; 2025 Horizonten Gemenskap.</p>
        </div>
      </footer>
    </div>
  );
}

export default BookReleasePage;
