import React from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Featured } from './Featured';
import { BookSection } from './BookSection';
import { Reviews } from './Reviews';
import { Author } from './Author';
import { Contact } from './Contact';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-white dark:bg-black transition-colors duration-300">
      <Navbar />
      
      <main className="flex-grow">
        <section id="home" className="scroll-mt-28">
          <Hero />
        </section>
        
        <Featured />
        
        <section id="book" className="scroll-mt-28">
          <BookSection />
        </section>
        
        <section id="reviews" className="scroll-mt-28">
          <Reviews />
        </section>
        
        <section id="author" className="scroll-mt-28">
          <Author />
        </section>
        
        <section id="contact" className="scroll-mt-28">
          <Contact />
        </section>
      </main>

      <footer className="bg-brand-primary dark:bg-gray-900 py-8 text-center text-white">
        <div className="container mx-auto px-4">
          <p className="text-sm opacity-80">&copy; 2024 Modern Ebook. Designed with React & Tailwind.</p>
        </div>
      </footer>
    </div>
  );
}