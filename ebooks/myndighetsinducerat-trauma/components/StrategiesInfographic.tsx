import React from 'react';

export const StrategiesInfographic: React.FC = () => {
  const strategies = [
    {
      title: "Juridisk krigsföring (Lawfare)",
      description: "En strategi där förövaren aktiverar lagrum som en direkt förlängning av kontrollen. Rättsprocessen blir det nya verktyget för att utöva våld och begränsa den utsattes frihet.",
      color: "#2c3e50"
    },
    {
      title: "Tolkningsföreträde",
      description: "Att vara den som \"ropar först\" och därmed sätter ett narrativ som myndigheter anammar.",
      source: "Referens: The Power of Definition (Bourdieu, 1991)",
      color: "#34495e"
    },
    {
      title: "Strategiska anmälningar",
      description: "Att genom frekventa och repetitiva anmälningar trötta ut den utsatta psykiskt och skapa en bild av en \"konfliktfylld\" person hos myndigheterna.",
      color: "#7f8c8d"
    },
    {
      title: "Ekonomisk utmattning",
      description: "Att systematiskt ruinera motparten genom att tvinga fram kostsamma juridiska ombud och utdragna processer tills den utsatta inte längre har råd att försvara sina rättigheter.",
      color: "#95a5a6"
    },
    {
      title: "Skapandet av en pappersverklighet",
      description: "Att mata systemet med vinklad eller osann dokumentation för att skapa en officiell sanning. Myndigheternas beslut baseras på denna fabricerade bild snarare än verkligheten.",
      color: "#bdc3c7"
    },
    {
      title: "Objektifiering av barnen",
      description: "Att reducera barnen till bevisföremål eller strategiska tillgångar för att stärka förövarens position. Barnens egna behov osynliggörs till förmån för den juridiska vinsten.",
      color: "#c0392b"
    }
  ];

  return (
    <div className="bg-black/5 p-6 md:p-10 rounded-xl border border-[var(--border-color)] font-sans">
      <div className="text-center mb-10 border-b-2 border-[var(--accent-color)] pb-6">
        <h2 className="text-2xl md:text-3xl font-black text-[var(--text-color)] uppercase tracking-wider mb-2">
          Strategier inom Myndighetsinducerat våld
        </h2>
        <p className="italic text-[var(--secondary-text)] text-lg">
          Hur systemet används för administrativt övertag
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {strategies.map((strategy, index) => (
          <div 
            key={index} 
            className="bg-[var(--bg-color)] p-6 rounded-lg shadow-sm border-l-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col h-full"
            style={{ borderLeftColor: strategy.color }}
          >
            <h3 className="text-[#c0392b] font-bold text-lg mb-3 leading-tight">
              {strategy.title}
            </h3>
            <p className="text-sm leading-relaxed text-[var(--text-color)] flex-grow">
              {strategy.description}
            </p>
            {strategy.source && (
              <span className="block mt-4 text-[10px] font-bold text-[var(--secondary-text)] uppercase tracking-tighter">
                {strategy.source}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
