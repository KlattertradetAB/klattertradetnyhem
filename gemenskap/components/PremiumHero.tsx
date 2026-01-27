
import React, { useState } from "react";
import { GL } from "./gl";
import { Pill } from "./pill";
import { ArrowRight, Mail } from "lucide-react";

interface PremiumHeroProps {
  onLoginClick: () => void;
}

export const PremiumHero: React.FC<PremiumHeroProps> = ({ onLoginClick }) => {
  const [hovering, setHovering] = useState(false);

  return (
    <div className="flex flex-col h-screen justify-between relative overflow-hidden bg-black text-white">
      <GL hovering={hovering} />

      <div className="pb-24 mt-auto text-center relative z-10 px-6">
        <Pill className="mb-8">EXKLUSIV TILLGÅNG</Pill>

        <h1 className="text-5xl sm:text-8xl font-light tracking-tighter text-white mb-8 max-w-5xl mx-auto leading-[0.9]">
          Välkommen till <br />
          <span className="text-[#b35c2a] font-medium">Horizonten</span> gemenskap
        </h1>

        <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          En plats för fördjupad dialog, gemenskap och verktyg för din personliga resa.
          Som betalande medlem har du full tillgång till våra AI-assistenter och forum.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            onClick={onLoginClick}
            className="group relative px-10 py-5 bg-[#b35c2a] hover:bg-[#9a4f24] text-white font-black uppercase tracking-[0.2em] text-sm rounded-full transition-all duration-500 flex items-center gap-3 overflow-hidden shadow-2xl shadow-[#b35c2a]/20"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <span className="relative z-10">Logga in</span>
            <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>

          <button
            onClick={() => window.location.href = 'mailto:kontakt@klattertradet.se'}
            className="group px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black uppercase tracking-[0.2em] text-sm rounded-full transition-all duration-500 flex items-center gap-3"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            Kontakta oss
            <Mail size={18} className="opacity-60 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>

      {/* Subtle bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-0"></div>
    </div>
  );
};
