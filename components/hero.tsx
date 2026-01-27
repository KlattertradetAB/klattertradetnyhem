
import React, { useState } from "react";
import { GL } from "./gl";
import { Pill } from "./pill";
import { Button } from "./ui/button";

interface HeroProps {
  onLoginClick: () => void;
  onContactClick?: () => void;
}

export function Hero({ onLoginClick, onContactClick }: HeroProps) {
  const [hovering, setHovering] = useState(false);

  return (
    <div className="flex flex-col h-screen justify-between bg-black text-white relative overflow-hidden">
      <GL hovering={hovering} />

      <div className="pb-16 mt-auto text-center relative z-10 px-4">
        <Pill className="mb-6">EXKLUSIV TILLGÅNG</Pill>

        <h1 className="font-serif text-4xl text-white text-balance mt-4 sm:text-8xl leading-[0.9] tracking-tighter">
          Välkommen till <br />
          <span className="text-[#b35c2a]">Horizonten</span> gemenskap
        </h1>

        <p className="font-sans text-sm sm:text-lg text-zinc-400 text-balance mt-8 max-w-[680px] mx-auto leading-relaxed">
          Du som betalande medlem använder ditt vanliga inlogg på alternativet nedanför.
          För er som inte är betalande medlemmar går det bra att höra av sig!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <button
            onClick={onLoginClick}
            className="px-8 py-3 bg-[#b35c2a] hover:bg-[#9a4f24] text-white font-bold rounded-lg transition-all duration-300 shadow-xl shadow-[#b35c2a]/20 group flex items-center gap-2"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            Logga in
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>

          <Button
            variant="ghost"
            className="text-white hover:bg-white/5"
            onClick={onContactClick || (() => window.location.href = 'mailto:kontakt@klattertradet.se')}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            Kontakta oss
          </Button>
        </div>
      </div>
    </div>
  );
}
