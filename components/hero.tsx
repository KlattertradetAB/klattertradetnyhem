
import React, { useState } from "react";
import { GL } from "./gl";
import { Pill } from "./pill";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";

interface HeroProps {
  onLoginClick: () => void;
  onContactClick?: () => void;
}

export function Hero({ onLoginClick, onContactClick }: HeroProps) {
  const { t } = useLanguage();
  const [hovering, setHovering] = useState(false);

  return (
    <div className="flex flex-col h-screen justify-between bg-black text-white relative overflow-hidden">
      <GL hovering={hovering} />

      <div className="pb-16 mt-auto text-center relative z-10 px-4">
        <Pill className="mb-6">{t.hero_pill}</Pill>

        <h1 className="font-display text-4xl text-white text-balance mt-4 sm:text-8xl leading-[0.9] tracking-tighter">
          {t.hero_welcome} <br />
          <span className="text-[#b35c2a]">Horizonten</span> {t.hero_community}
        </h1>

        <p className="font-sans text-sm sm:text-lg text-zinc-400 text-balance mt-8 max-w-[680px] mx-auto leading-relaxed">
          {t.hero_text}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <button
            onClick={onLoginClick}
            className="px-8 py-3 bg-[#b35c2a] hover:bg-[#9a4f24] text-white font-bold rounded-lg transition-all duration-300 shadow-xl shadow-[#b35c2a]/20 group flex items-center gap-2"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {t.hero_login}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>

          <Button
            variant="ghost"
            className="text-white hover:bg-white/5"
            onClick={onContactClick || (() => window.location.href = 'mailto:kontakt@klattertradet.se')}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {t.hero_contact}
          </Button>
        </div>
      </div>
    </div>
  );
}
