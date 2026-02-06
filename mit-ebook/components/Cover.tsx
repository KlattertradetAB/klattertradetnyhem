
import React, { useState } from 'react';

export const Cover: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <div 
      id="top" 
      className="relative w-full mb-12 md:mb-16 rounded-lg overflow-hidden shadow-xl bg-slate-800"
      style={{ minHeight: imgError ? '0' : 'auto' }}
    >
      {/* 
        Försöker ladda 'cover.jpg'. 
        Om den misslyckas (fel namn/saknas) visas en fallback-layout med text.
      */}
      {!imgError && (
        <img 
          src="https://images.unsplash.com/photo-1518066000714-cdcd8253b052?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Bokomslag: Myndighets-inducerat Trauma"
          className="w-full h-auto block transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl" // Added hover effects
          style={{
            filter: 'blur(0.5px) brightness(1.05) saturate(1.05)', // Subtle liquid glass filter
          }}
          onError={() => setImgError(true)}
        />
      )}

      {/* Fallback om bilden inte fungerar: Behåll layouten med aspektförhållande */}
      {imgError && (
        <div className="w-full aspect-[2/3] flex flex-col items-center justify-center bg-[var(--accent-color)] text-[var(--bg-color)] p-4 text-center">
             <div className="text-6xl mb-4">📖</div>
             <p className="opacity-70">Bilden 'cover.jpg' saknas</p>
        </div>
      )}

      {/* 
        Overlay innehåll.
        Om bilden laddas (imgError = false) visas gradient och undertitel/författare (eftersom titeln finns i bilden).
        Om bilden INTE laddas (imgError = true) visas även titeln som text så omslaget blir komplett.
      */}
      <div className={`absolute inset-0 z-10 flex flex-col justify-end items-center p-4 sm:p-8 md:p-12 pb-8 sm:pb-12 ${imgError ? 'bg-transparent' : 'bg-gradient-to-b from-transparent via-transparent to-[rgba(0,0,0,0.8)]'}`}>
        
        {/* Visa titel som text ENDAST om bilden saknas */}
        {imgError && (
          <h1 
            className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white text-center mb-8 leading-tight tracking-wide w-full max-w-[95%] break-words hyphens-auto"
            style={{ 
              textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 4px 20px rgba(0,0,0,0.8)' 
            }}
          >
            Myndighets-<br />inducerat trauma
          </h1>
        )}

        {/* Titel för skärmläsare om bilden laddas korrekt */}
        {!imgError && (
          <h1 className="sr-only">Myndighets-inducerat trauma</h1>
        )}
        
        {/* Undertitel */}
        <div className="font-sans text-base sm:text-lg md:text-2xl font-normal tracking-wide opacity-95 mb-4 md:mb-8 text-gray-100 drop-shadow-md text-center px-2">
          Från subjekt till objekt
        </div>
        
        {/* Författare */}
        <div className="font-sans text-xs sm:text-sm md:text-lg font-bold uppercase tracking-[0.2em] text-gray-200 border-t border-gray-400/50 pt-3 md:pt-5 inline-block px-4 text-center">
          Av: Billy Ljungberg & Malin Widerlöv
        </div>
      </div>
    </div>
  );
};
