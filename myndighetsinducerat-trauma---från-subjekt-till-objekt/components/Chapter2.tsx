import React from 'react';

export const Chapter2: React.FC = () => {
  return (
    <div id="chap2">
      <div className="text-center text-[var(--secondary-text)] text-2xl my-10 tracking-widest">***</div>
      
      <header className="text-center mb-12 pt-5">
        <span className="block font-sans text-sm font-bold uppercase tracking-widest text-[var(--secondary-text)] mb-3">
          Kapitel Två
        </span>
        <h2 className="font-sans text-3xl md:text-4xl text-[var(--accent-color)] font-bold tracking-tight">
          Definition
        </h2>
      </header>

      <div className="prose prose-lg text-[var(--text-color)] max-w-none">
        <p className="mb-6 text-justify leading-relaxed hyphens-auto">
          Myndighetsinducerat trauma är ett djupt och komplext trauma som uppstår när en individ, eller flera individer inom ett system som en familj blir utsatta för ingripanden från myndighet som är i sådan pass grad att det över tid ger symptom på livet som gör att poängen Utredningsmaterialet utgör minst hälften. I denna process berövas de gradvis sin autonomi, sin röst, sitt tolkningsföreträde, sitt eget narrativ och i många fall även sin relation till varandra.
        </p>

        <p className="mb-6 text-justify leading-relaxed hyphens-auto">
          Detta är ett trauma som initialt uppvisar alla de markörer som återfinns i diagnosen för posttraumatiskt stressyndrom (PTSD) men en bit in i processessen utgör de symptom som snarare liknar c-PTSD.
        </p>

        <p className="mb-6 text-justify leading-relaxed hyphens-auto">
          Till skillnad från många andra trauman förvärras Myndighetsinducerat trauma i regel över tid och i en process som nedan kommer beskrivas i detalj. I sin mest komplexa form utreds det ibland med skalor som PCL-5 vilken används för att utreda komplex posttraumatiskt stressyndrom (c-PTSD).
        </p>

        <p className="mb-6 text-justify leading-relaxed hyphens-auto">
          Precis som i Eva Langes teori om våldets normaliseringsprocess går det in i en fas av normalisering där den våldsutsatta personen börjar skuldbelägga sig själv och inte längre förmår ta sig ur den destruktiva processen.
        </p>

        <p className="mb-6 text-justify leading-relaxed hyphens-auto">
          Den utsattas sanning vänds successivt mot personen själv och utåt sett kan det uppfattas som att individen saknar ambition att lösa den påtvingade situationen eller att personen själv har gjort tillräckligt fel för att förtjäna den skada som förövaren utsätter dem och deras barn för.
        </p>

        <p className="mb-6 text-justify leading-relaxed hyphens-auto">
          Myndighetsinducerat trauma uppstår inte som ett resultat av illvilja i en enskild myndighetsutövares personliga ambition eller att intentionen bakom gällande lagstiftning skulle vara felaktig. Det har heller inget att göra med det narrativ som myndigheten presenterar för den utsatta, deras familj eller för sig själva. Den skada som vi beskriver har enbart att göra med vad som faktiskt har gjorts, hur det utförts och hur de som möter myndigheterna påverkats utav det- oavsett den personliga ambitionen bakom handlingen.
        </p>

        <p className="mb-6 text-justify leading-relaxed hyphens-auto">
          Denna skada har för att förtydliga lite inte med lagstiftningens ursprungliga syfte eller intention att göra utan svårigheten att hålla sig inom det lagrum som är oss givna utan att tolka dessa till sin egen personliga fördel.
        </p>
      </div>
    </div>
  );
};