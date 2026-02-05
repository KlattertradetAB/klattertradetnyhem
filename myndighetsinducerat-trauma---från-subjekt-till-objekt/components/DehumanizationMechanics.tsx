import React from 'react';

// Simplified SVG icons to replace Lucide dependency for better React performance
const Icon = ({ name, className = "w-6 h-6" }: { name: string, className?: string }) => {
  const icons: Record<string, React.ReactNode> = {
    users: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>,
    arrowDown: <path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>,
    settings: <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>,
    fileText: <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>,
    gavel: <path d="m14 5 8 8"/><path d="m14.91 11.76 4.22 4.22a1 1 0 0 1 0 1.42l-1.41 1.41a1 1 0 0 1-1.42 0l-4.22-4.22"/><path d="m16 16 3 3"/><path d="m7 18 2-2"/><path d="m5 11-2-2"/><path d="m11 5-2-2"/><path d="M2 21l6-6"/><path d="m7 8 5 5-5 5-5-5 5-5z"/>,
    brain: <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .52 8.105 3 3 0 1 0 5.997-.125 4 4 0 0 0 2.526-5.77 4 4 0 0 0-.52-8.105z"/><path d="M9 13a4.5 4.5 0 0 0 3-4"/><path d="M12 13a4.5 4.5 0 0 1-3-4"/><path d="M12 13h1"/><path d="M12 9h1"/><path d="M12 11h1"/>,
    ban: <circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/>,
    shieldAlert: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="M12 8v4"/><path d="M12 16h.01"/>,
    trash2: <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>,
    baby: <path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/><path d="M12 18v3"/><path d="M8 21h8"/>,
    fileDigit: <path d="M4 22V4c0-1.1.9-2 2-2h9l5 5v15c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><rect width="4" height="6" x="10" y="12" rx="2"/>,
    coins: <circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>,
    arrowRight: <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>,
  };

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      {icons[name]}
    </svg>
  );
};

export const DehumanizationMechanics: React.FC = () => {
  return (
    <div className="my-16 font-sans">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-[var(--accent-color)] mb-2">Dehumaniseringens Mekanik</h2>
        <p className="text-lg text-[var(--secondary-text)]">En systemanalys av Verksamhetsbarn, Verksamhetskapital och Systemavfall</p>
      </div>

      <div className="max-w-4xl mx-auto">
        
        {/* START: MIV-Processen */}
        <div className="relative border-2 border-dashed border-[var(--border-color)] rounded-3xl p-6 mb-12 bg-black/5">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[var(--accent-color)] text-[var(--bg-color)] px-4 py-1 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
            Svensk byråkrati och lagstiftning som vapen
          </div>
          
          <div className="flex flex-col items-center justify-center space-y-4 pt-4">
            <div className="flex items-center space-x-4 bg-[var(--bg-color)] p-4 rounded-xl shadow-sm border border-[var(--border-color)]">
              <Icon name="users" className="text-blue-600 w-8 h-8" />
              <div>
                <h3 className="font-bold">Mänskliga Subjekt</h3>
                <p className="text-xs text-[var(--secondary-text)]">Levande individer med rättigheter</p>
              </div>
            </div>
            
            <div className="flex justify-center my-2 text-[var(--secondary-text)]">
              <Icon name="arrowDown" className="w-6 h-6" />
            </div>
            
            <div className="bg-[var(--accent-color)] text-[var(--bg-color)] p-6 rounded-xl w-full max-w-2xl text-center shadow-lg">
              <div className="flex justify-center mb-4">
                <Icon name="settings" className="animate-spin-slow opacity-60 w-12 h-12" />
              </div>
              <h2 className="text-xl font-bold uppercase mb-2 tracking-widest">MIV-MASKINERIET</h2>
              <p className="text-sm opacity-80 mb-6">
                Juridisk krigföring & Administrativa rutiner. 
                "Luften luktar pappersarkivplast."
              </p>
              
              <div className="flex justify-center gap-4 mt-4 text-xs font-mono">
                <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md border border-white/20">
                  <Icon name="fileText" className="w-4 h-4" /> 
                  <span>Blanketter</span>
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md border border-white/20">
                  <Icon name="gavel" className="w-4 h-4" /> 
                  <span>Lagrum</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SPLIT: The Bifurcation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative">
          
          {/* Central Divider Icon */}
          <div className="hidden md:flex absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 bg-[var(--bg-color)] border-4 border-[var(--app-bg)] rounded-full p-2 z-10 shadow-md">
            <Icon name="brain" className="text-[var(--secondary-text)] w-8 h-8" />
          </div>

          {/* LEFT COLUMN: THE PARENT */}
          <div className="flex flex-col h-full">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-red-700">FÖRÄLDERN</h3>
              <p className="text-xs text-red-500 font-semibold uppercase tracking-widest">Från Rättsbärare till Objekt</p>
            </div>

            <div className="bg-red-50/50 p-6 rounded-lg shadow-md border-l-4 border-red-500 flex-grow relative overflow-hidden dark:bg-red-900/10">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Icon name="ban" className="text-red-900 w-24 h-24" />
              </div>

              <span className="text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider bg-red-200 text-red-800 mb-4 inline-block dark:bg-red-800 dark:text-red-100">
                Mekanism: Andrafiering (Othering)
              </span>
              
              <div className="space-y-6 mt-4">
                <div className="bg-[var(--bg-color)] p-4 rounded shadow-sm border border-red-100 dark:border-red-900/30">
                  <h4 className="font-bold text-red-900 dark:text-red-400 flex items-center gap-2 mb-2">
                    <Icon name="shieldAlert" className="w-4 h-4" /> Det Monsterifierade Subjektet
                  </h4>
                  <p className="text-sm text-[var(--secondary-text)]">
                    Definieras som "Den Andre". Naturliga reaktioner (ilska/sorg) tolkas som symptom/diagnos.
                  </p>
                </div>

                <div className="flex justify-center my-2 text-red-200 dark:text-red-900/40">
                  <Icon name="arrowDown" className="w-6 h-6" />
                </div>

                <div className="bg-[var(--bg-color)] p-4 rounded shadow-sm border border-red-100 dark:border-red-900/30">
                  <h4 className="font-bold text-red-900 dark:text-red-400 flex items-center gap-2 mb-2">
                    <Icon name="ban" className="w-4 h-4" /> Neutralisering
                  </h4>
                  <p className="text-sm text-[var(--secondary-text)]">
                    Systemets "immunförsvar". Delegitimering av rösten. Uteslutning via procedur ("Jägarna").
                  </p>
                </div>

                <div className="border-t-2 border-red-200 dark:border-red-900/30 pt-4 mt-6">
                  <div className="flex items-center gap-4">
                    <Icon name="trash2" className="text-red-600 w-8 h-8 shrink-0" />
                    <div>
                      <h4 className="font-black text-red-700 dark:text-red-400 text-lg uppercase">SYSTEMAVFALL</h4>
                      <p className="text-xs text-red-800 dark:text-red-500">
                        Hinder. Störning. "Det Abjekta" som måste städas bort.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: THE CHILD */}
          <div className="flex flex-col h-full">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-blue-700">BARNET</h3>
              <p className="text-xs text-blue-500 font-semibold uppercase tracking-widest">Från Subjekt till Resurs</p>
            </div>

            <div className="bg-blue-50/50 p-6 rounded-lg shadow-md border-l-4 border-blue-500 flex-grow relative overflow-hidden dark:bg-blue-900/10">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Icon name="fileDigit" className="text-blue-900 w-24 h-24" />
              </div>

              <span className="text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider bg-blue-200 text-blue-800 mb-4 inline-block dark:bg-blue-800 dark:text-blue-100">
                Mekanism: Tingifiering (Reification)
              </span>

              <div className="space-y-6 mt-4">
                <div className="bg-[var(--bg-color)] p-4 rounded shadow-sm border border-blue-100 dark:border-blue-900/30">
                  <h4 className="font-bold text-blue-900 dark:text-blue-400 flex items-center gap-2 mb-2">
                    <Icon name="baby" className="w-4 h-4" /> Verksamhetsbarnet
                  </h4>
                  <p className="text-sm text-[var(--secondary-text)]">
                    Ett nummer i regelverket. "Administrativt bevismaskineri". Frikopplad från livsvärlden.
                  </p>
                </div>

                <div className="flex justify-center my-2 text-blue-200 dark:text-blue-900/40">
                  <Icon name="arrowDown" className="w-6 h-6" />
                </div>

                <div className="bg-[var(--bg-color)] p-4 rounded shadow-sm border border-blue-100 dark:border-blue-900/30">
                  <h4 className="font-bold text-blue-900 dark:text-blue-400 flex items-center gap-2 mb-2">
                    <Icon name="settings" className="w-4 h-4" /> Biopolitisk Kontroll
                  </h4>
                  <p className="text-sm text-[var(--secondary-text)]">
                    Makt över kroppen. Flyttkedjor. Insatser för insatsens skull (Systemets kolonisering).
                  </p>
                </div>

                <div className="border-t-2 border-blue-200 dark:border-blue-900/30 pt-4 mt-6">
                  <div className="flex items-center gap-4">
                    <Icon name="coins" className="text-blue-600 w-8 h-8 shrink-0" />
                    <div>
                      <h4 className="font-black text-blue-700 dark:text-blue-400 text-lg uppercase">VERKSAMHETSKAPITAL</h4>
                      <p className="text-xs text-blue-800 dark:text-blue-500">
                        Bränsle. Resurs för anslag. Statistikunderlag.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM: THE RESULT */}
        <div className="mt-12 bg-[var(--accent-color)] text-[var(--bg-color)] p-8 rounded-2xl border-t-8 border-purple-500 shadow-xl">
          <h3 className="text-center font-bold text-purple-300 uppercase mb-6 tracking-widest">Systemets Resultat</h3>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <strong className="block text-white mb-2 text-lg">Permanent Skada (MIT)</strong>
              <p className="text-sm opacity-80 leading-relaxed">
                Barnet lär sig att värdet ligger i funktionen, inte mänskligheten. Föräldern förlorar sin status som människa.
              </p>
            </div>
            <div className="text-center md:text-left border-l border-white/10 md:pl-8">
              <strong className="block text-white mb-2 text-lg">Systemets Självbevarelse</strong>
              <p className="text-sm opacity-80 leading-relaxed">
                "Maskineriet rullar vidare". Systemet har städat bort hindret (föräldern) och säkrat bränslet (barnet).
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
