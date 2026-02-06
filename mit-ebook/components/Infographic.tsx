
import React from 'react';

export const Infographic: React.FC = () => {
  return (
    <div className="font-sans py-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-[var(--info-text-summary)]">
        Infografik: Myndighetsinducerat Trauma och Terapeutisk Närvaro
      </h1>

      {/* SEKTION I: DET TERAPEUTISKA FÖRHÅLLNINGSSÄTTET */}
      <div className="mb-12">
        <div className="bg-[var(--info-green-dark)] text-white p-4 rounded-lg text-center font-bold text-lg mb-6 shadow-md">
          I. Det Terapeutiska Förhållningssättet: Konsten att Närvara i Fältet
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          
          <div className="bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col items-center text-center h-full">
            <div className="text-4xl mb-4 text-[var(--info-green-light)]">👤 + 🏛️ = 🌐</div>
            <h3 className="text-lg font-bold mb-2">Arbeta i Fältet (P + E)</h3>
            <p className="text-sm text-[var(--secondary-text)] flex-grow">
              Lokalisera inte problemet enbart hos individen (P) utan arbeta i det fält (E) som uppstår mellan klient och terapeut. Terapeutens uppgift är att modulera sin egen närvaro vid kontaktgränsen - inte att "fixa" klienten.
            </p>
            <p className="text-[10px] text-gray-400 mt-4 w-full text-left">[3]</p>
          </div>
          
          <div className="bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col items-center text-center h-full">
            <div className="text-4xl mb-4 text-[var(--info-green-light)]">⚖️</div>
            <h3 className="text-lg font-bold mb-2">Self-Care (SCM) som Diagnostik</h3>
            <p className="text-sm text-[var(--secondary-text)] flex-grow">
              Terapeuten använder sin egen Self-Care (SCM) och kropp för att upptäcka <strong>kontraktioner</strong> även hos klienten. Utmattning eller irritation ses inte som personlig trötthet utan som en indikation på att klienten omedvetet finner det svårt att vara kvar i sessionen.
            </p>
            <p className="text-[10px] text-gray-400 mt-4 w-full text-left">[2, 4]</p>
          </div>

          <div className="bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col items-center text-center h-full">
            <div className="text-4xl mb-4 text-[var(--info-green-light)]">🧘‍♀️</div>
            <h3 className="text-lg font-bold mb-2">Autonom Regleringsförmåga</h3>
            <p className="text-sm text-[var(--secondary-text)] flex-grow">
              Genom att aktivt odla sin egen <strong>Autonoma Regleringsförmåga</strong> (t.ex. lugn andning/öppen hållning) garanterar terapeuten att klienten kan ge sig själv möjlighet att uppleva säkerhet, trygghet och tillit i fältet dem emellan.
            </p>
            <p className="text-[10px] text-gray-400 mt-4 w-full text-left">[5, 6, 7]</p>
          </div>

        </div>
      </div>

      {/* SEKTION II: KLIENTFOKUSERADE SELF-CARE INTERVENTIONER */}
      <div className="mb-12">
        <div className="bg-[var(--info-green-light)] text-white p-4 rounded-lg text-center font-bold text-lg mb-6 shadow-md">
          II. Klientfokuserade Self-Care Interventioner: Operationalisering av Medvetenhet
        </div>
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col items-center text-center h-full">
            <div className="text-4xl mb-4 text-[var(--info-green-light)]">🪑</div>
            <h3 className="text-lg font-bold mb-2">Integrera Oavslutade Gestalter</h3>
            <p className="text-sm text-[var(--secondary-text)] flex-grow">
              SCM översätts till att bearbeta "oavslutade affärer" (emotionell self-care). <strong>Tomma stolen</strong> och <strong>rollspel</strong> är SCM i handling, utformade för att uttrycka och integrera oerkända delar (t.ex. ilska/sorg).
            </p>
            <p className="text-[10px] text-gray-400 mt-4 w-full text-left">[8, 9, 10, 11]</p>
          </div>

          <div className="bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col items-center text-center h-full">
            <div className="text-4xl mb-4 text-[var(--info-green-light)]">💪</div>
            <h3 className="text-lg font-bold mb-2">Kroppsbaserad Reglering</h3>
            <p className="text-sm text-[var(--secondary-text)] flex-grow">
              Self-care som <strong>Reglering</strong> översätts till somatisk kompetens. <strong>Exaggerationstekniken</strong> används för att lossa defensiva mönster och frigöra neurofysiologisk energi låst i kamp/flykt/frys-responser.
            </p>
            <p className="text-[10px] text-gray-400 mt-4 w-full text-left">[6, 11, 12, 13]</p>
          </div>

          <div className="bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col items-center text-center h-full">
            <div className="text-4xl mb-4 text-[var(--info-green-light)]">🤝</div>
            <h3 className="text-lg font-bold mb-2">Relationell Self-Care & Gränser</h3>
            <p className="text-sm text-[var(--secondary-text)] flex-grow">
              Kategorin <strong>Trygghet</strong> (gränssättning och stöd) tränas i terapirummet. Klienten får "experimentera" med att sätta gränser mot terapeuten för att öka kontaktgränsens permeabilitet.
            </p>
            <p className="text-[10px] text-gray-400 mt-4 w-full text-left">[9, 14]</p>
          </div>
        </div>
      </div>

      {/* SEKTION III: TERAPEUTENS ETISKA OCH PRAKTISKA SELF-CARE */}
      <div className="mb-12">
        <div className="bg-[#73a284] text-white p-4 rounded-lg text-center font-bold text-lg mb-6 shadow-md">
          III. Terapeutens Etiska och Praktiska Self-Care
        </div>
        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col items-center text-center h-full">
            <div className="text-4xl mb-4 text-[var(--info-green-light)]">🛑</div>
            <h3 className="text-lg font-bold mb-2">Hantering av Gränser</h3>
            <p className="text-sm text-[var(--secondary-text)] flex-grow">
              SCM är nödvändigt för att differentiera mellan gränsöverskridanden och skadliga gränskränkningar. Använd <strong>strategier</strong> för att undvika "compliance traps" (t.ex. paus, självprat i tredje person, separata professionella telefonlinjer).
            </p>
            <p className="text-[10px] text-gray-400 mt-4 w-full text-left">[15, 16]</p>
          </div>

          <div className="bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col items-center text-center h-full">
            <div className="text-4xl mb-4 text-[var(--info-green-light)]">📚</div>
            <h3 className="text-lg font-bold mb-2">Professionellt Självstöd</h3>
            <p className="text-sm text-[var(--secondary-text)] flex-grow">
              Kontinuerlig <strong>psykoterapi/handledning</strong> och <strong>medvetet engagemang i nya områden</strong> förhindrar att terapeutens omedvetet repeterar klientens relationshistorier. Detta ökar den estetiska känsligheten.
            </p>
            <p className="text-[10px] text-gray-400 mt-4 w-full text-left">[3, 9, 17, 18]</p>
          </div>
        </div>
      </div>

      {/* SAMMANFATTNING */}
      <div className="bg-[var(--info-bg-summary)] text-[var(--info-text-summary)] p-6 rounded-xl italic font-medium border-l-4 border-[var(--info-green-light)]">
        <p className="font-bold mb-2 uppercase text-xs tracking-widest">Sammanfattning:</p>
        <p className="text-sm leading-relaxed">
          Self-Care-modellen är inte bara en rekommendation, utan terapeutens <strong>primära verktyg</strong> och <strong>etiska nödvändighet</strong>. Genom att aktivt modellera och operationalisera self-care i realtid inom det relationella fältet, skapas de nödvändiga förutsättningarna för gestaltisk medvetenhet, reglering och tillväxt hos klienten.
        </p>
      </div>

      <div className="text-[10px] text-gray-400 mt-6 text-left">
        <p><strong>Källor:</strong> [1] till [18] refererar till den underliggande teorin som utgör utbildningsmaterialet (Fältteori, PVT, Lewins Livsrum, Gestaltterapi & Self-Care Modellen).</p>
      </div>
    </div>
  );
};
