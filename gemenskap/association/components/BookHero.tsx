
import React, { useState, useRef, MouseEvent, useEffect } from 'react';
import { ArrowRight, ShoppingCart } from 'lucide-react';

export const BookHero: React.FC = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = e.clientX - centerX;
    const y = e.clientY - centerY;

    // Calculate rotation based on mouse position (max ~12 degrees)
    const rotateX = ((y / (rect.height / 2)) * -12).toFixed(2);
    const rotateY = ((x / (rect.width / 2)) * 12).toFixed(2);

    setRotation({ x: Number(rotateX), y: Number(rotateY) });
  };

  const handleMouseEnter = () => setIsHovering(true);
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-20 overflow-hidden bg-slate-50 dark:bg-[#0c1a1a] transition-colors duration-300">
      {/* Animated Blobs - Bakgrundseffekter */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Top Left - Mjukare amber, större och mer blur */}
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-amber-300/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob dark:bg-amber-800/10 dark:mix-blend-normal"></div>
          
          {/* Middle Right - Mjukare orange, större och mer blur */}
          <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-orange-200/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-2000 dark:bg-orange-800/10 dark:mix-blend-normal"></div>
          
          {/* Bottom Center - Bytte från yellow-300 till en mjuk amber-100, mycket större och blurrigare */}
          <div className="absolute -bottom-40 left-1/2 transform -translate-x-1/2 w-[700px] h-[700px] bg-amber-100/30 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-blob animation-delay-4000 dark:bg-amber-900/10 dark:mix-blend-normal"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Textinnehåll */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-amber-600 dark:text-amber-400 text-xl md:text-2xl font-bold mb-4">
              Läs första kapitlet till nya boken
            </h2>
            <h1 className="text-slate-900 dark:text-white text-5xl md:text-7xl font-bold leading-tight mb-6">
              Myndighetsinducerat trauma
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0">
              En introduktion till teorin bakom myndighetsinducerat trauma och myndighetsinducerat våld.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <a href="#book" className="bg-brand-btn hover:bg-brand-btn-hover text-white px-8 py-4 rounded-large font-bold text-sm transition-colors flex items-center justify-center gap-2 group">
                Läs mer om boken
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#author" className="border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-brand-primary px-8 py-4 rounded-large font-bold text-sm transition-colors">
                Möt författarna
              </a>
            </div>

            {/* Köpknapp */}
            <div className="flex justify-center lg:justify-start">
              <a href="#contact" className="bg-amber-400 text-slate-900 hover:bg-white hover:scale-105 px-10 py-5 rounded-large font-bold text-lg transition-all duration-300 shadow-[0_0_30px_rgba(251,191,36,0.4)] hover:shadow-[0_0_50px_rgba(251,191,36,0.6)] flex items-center gap-3 w-full sm:w-auto justify-center">
                <ShoppingCart size={22} />
                Förboka ditt exemplar
              </a>
            </div>
          </div>

          {/* 3D Bok-mockup */}
          <div className="lg:w-1/2 relative flex justify-center perspective-1000 min-h-[400px] items-center">
             <div 
                ref={containerRef}
                className="relative z-10 cursor-pointer"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ perspective: '1000px' }}
             >
                <div 
                  className="relative will-change-transform"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `translateY(${scrollY * -0.2}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovering ? 1.08 : 1}, ${isHovering ? 1.08 : 1}, ${isHovering ? 1.08 : 1})`,
                    transition: isHovering ? 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'transform 0.8s ease-out'
                  }}
                >
                  <div className={`relative w-[280px] md:w-[350px] aspect-[2/3] mx-auto rounded-r-lg rounded-l-sm border-l-2 border-white/5 overflow-hidden bg-transparent transition-all duration-500 ease-in-out ${isHovering ? 'shadow-[0_20px_60px_rgba(100,200,200,0.2)] brightness-110' : 'shadow-2xl'}`}>
                      
                      {/* Bakgrundstextur */}
                      <div className="absolute inset-0">
                          <img 
                              src="https://images.unsplash.com/photo-1514517220017-8ce97a34a7b6?q=80&w=1000&auto=format&fit=crop" 
                              alt="Foggy Texture" 
                              className="w-full h-full object-cover opacity-80 mix-blend-soft-light filter grayscale contrast-125"
                          />
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-b from-[#7c9d9d]/80 via-[#4a6b6b]/80 to-[#1d2b2b]/90 mix-blend-multiply"></div>
                      
                      {/* Innehåll på omslaget */}
                      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6" style={{ transformStyle: 'preserve-3d' }}>
                          <div className="mt-16 mb-3 relative z-20">
                             <h3 
                               className="text-white/90 font-sans font-bold tracking-[0.2em] text-[10px] md:text-xs drop-shadow-md blur-[0.5px] will-change-transform"
                               style={{
                                 transform: isHovering 
                                   ? `translateZ(5px) translateY(${rotation.x * -0.6}px) translateX(${rotation.y * 0.6}px)` 
                                   : 'translateZ(0) translateY(0) translateX(0)',
                                 transition: 'transform 0.3s ease-out',
                               }}
                             >
                                 MYNDIGHETSINDUCERAT
                             </h3>
                          </div>
                          <div className="relative z-20 mb-16">
                             <h1 
                               className="text-white font-sans font-bold text-4xl md:text-5xl tracking-tighter drop-shadow-lg leading-none blur-[1.2px] will-change-transform"
                               style={{
                                 transform: isHovering 
                                   ? `translateZ(8px) translateY(${rotation.x * -1}px) translateX(${rotation.y * 1}px)` 
                                   : 'translateZ(0) translateY(0) translateX(0)',
                                 transition: 'transform 0.3s ease-out',
                               }}
                             >
                                 TRAUMA
                             </h1>
                          </div>

                          <div 
                            className="absolute bottom-[-10px] w-full h-3/4 flex justify-center items-end opacity-50 pointer-events-none mix-blend-overlay will-change-transform"
                            style={{
                              transform: isHovering 
                                ? `translateZ(2px) translateY(${rotation.x * -0.4}px) translateX(${rotation.y * 0.4}px)` 
                                : 'translateZ(0) translateY(0) translateX(0)',
                              transition: 'transform 0.3s ease-out',
                            }}
                          >
                               <img 
                                  src="https://images.unsplash.com/photo-1614852206758-0caebadbba66?q=80&w=600&auto=format&fit=crop" 
                                  className="h-full w-full object-cover filter invert(100%) brightness(0.3) contrast(150%)"
                                  alt="Plant Silhouette"
                               />
                          </div>
                          
                          <div 
                            className="absolute bottom-8 left-0 right-0 text-center z-20 will-change-transform"
                            style={{
                              transform: isHovering 
                                ? `translateZ(4px) translateY(${rotation.x * -0.5}px) translateX(${rotation.y * 0.5}px)` 
                                : 'translateZ(0) translateY(0) translateX(0)',
                              transition: 'transform 0.3s ease-out',
                            }}
                          >
                              <p className="text-white/70 text-[9px] font-bold tracking-[0.2em] uppercase">Widerlöv & Ljungberg</p>
                          </div>
                      </div>
                  </div>
                  
                   {/* Shine/Ljus-effekt */}
                   <div 
                    className="absolute inset-0 rounded-r-lg rounded-l-sm pointer-events-none z-20 will-change-transform"
                    style={{
                       background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.05) 30%, transparent 35%)',
                       transform: `translateX(${rotation.y * -3}px)`,
                       mixBlendMode: 'soft-light',
                       opacity: 0.8,
                       transition: 'transform 0.1s ease-out',
                    }}
                   ></div>
                   
                   <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-white/10 z-30 rounded-l-sm border-r border-white/5"></div>
                </div>
             </div>
             
             <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-500/30 blur-[80px] rounded-full -z-10 transition-opacity duration-500 ${isHovering ? 'opacity-100 scale-110' : 'opacity-60'}`}></div>
          </div>

        </div>
      </div>
    </section>
  );
};
