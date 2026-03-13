import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pillars from './components/Pillars';
import Checklist from './components/Checklist';
import { Section } from './types';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>(Section.HOME);

  const renderSection = () => {
    switch (currentSection) {
      case Section.HOME:
        return (
          <>
            <Hero setSection={setCurrentSection} />
            <Pillars />
            <div className="bg-hkm-dark text-white py-12 px-4 text-center">
              <h3 className="font-serif text-2xl mb-4">Förankring i Nuet och Vetenskapen</h3>
              <p className="max-w-2xl mx-auto text-gray-300">
                I en värld av komplexitet garanterar denna markering att du inte bara har kunskapen – du lever den.
              </p>
            </div>
            <Checklist />
          </>
        );
      case Section.PILLARS:
        return <Pillars />;
      case Section.CHECKLIST:
        return <Checklist />;
      default:
        return <Hero setSection={setCurrentSection} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900">
      <Navbar currentSection={currentSection} setSection={setCurrentSection} />
      <main className="flex-grow">
        <div key={currentSection} className="animate-fade-in">
          {renderSection()}
        </div>
      </main>
      <footer className="bg-hkm-dark py-8 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Horizontens Kvalitetsmarkering. Utbildad via Klätterträdet/Horizonten.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;