import React from 'react';
import { ExpandableSection } from './ExpandableSection';
import { Tooltip } from './Tooltip';

export const Chapter1: React.FC = () => {
  return (
    <div id="chap1">
      <header className="text-center mb-12 pt-5">
        <span className="block font-sans text-sm font-bold uppercase tracking-widest text-[var(--secondary-text)] mb-3">
          Kapitel ett
        </span>
        <h2 className="font-sans text-3xl md:text-4xl text-[var(--accent-color)] font-bold tracking-tight">
          Konceptuell Inramning: Myndighetsansvar och Systemisk Skada
        </h2>
      </header>

      {/* Definition Section */}
      <section className="mb-12">
        <h3 className="font-sans text-xl font-bold uppercase tracking-wide text-[var(--secondary-text)] mb-4 border-b border-[var(--border-color)] pb-2">
          Definition
        </h3>
        <p className="mb-6 text-justify leading-relaxed hyphens-auto">
          Myndighetsinducerat trauma är ett djupt och komplext trauma som uppstår när en individ, eller flera individer inom ett system som en familj blir utsatta för ingripanden från myndighet som är i sådan pass grad att det över tid ger varaktiga negativa symptom på livet. Poängen i utredningsmaterialet "Utredning MiT" ska överstiga gränsvärdet för att med säkerhet särskilja myndighetsinducerat trauma från annan typ av skada. I denna process berövas individen/individerna gradvis sin autonomi, sin röst, sitt tolkningsföreträde, sitt eget narrativ och i många fall även sin relation till varandra.
        </p>

        <p className="mb-6 text-justify leading-relaxed hyphens-auto">
          Detta är ett trauma som initialt uppvisar alla de markörer som återfinns i diagnosen för posttraumatiskt stressyndrom (PTSD) men en bit in i processessen utgör de symptom som snarare liknar c-PTSD.
        </p>

        <p className="mb-6 text-justify leading-relaxed hyphens-auto">
          Till skillnad från många andra typer av trauman förvärras Myndighetsinducerat trauma i regel över tid och i en process som nedan kommer beskrivas i detalj. I sin mest komplexa form utreds det ibland med skalor som PCL-5 vilken används för att utreda komplex posttraumatiskt stressyndrom (c-PTSD).
        </p>

        <p className="mb-6 text-justify leading-relaxed hyphens-auto">
          Precis som i Eva Langes teori om våldets normaliseringsprocess går det in i en fas av normalisering där den våldsutsatta personen börjar skuldbelägga sig själv och inte längre förmår ta sig ur den destruktiva processen.
        </p>

        <p className="mb-6 text-justify leading-relaxed hyphens-auto">
          Den utsattas sanning vänds successivt mot personen själv och utåt sett kan det uppfattas som att individen saknar ambition att lösa den påtvingade situationen eller att personen själv har gjort tillräckligt fel för att förtjäna den skada som förövaren utsätter dem och deras barn för.
        </p>

        <p className="mb-6 text-justify leading-relaxed hyphens-auto">
          Myndighetsinducerat trauma uppstår inte som ett resultat av illvilja i en enskild myndighetsutövares personliga ambition eller att intentionen bakom gällande lagstiftning skulle vara felaktig. Det har heller inget att göra med det narrativ som myndigheten presenterar för den utsatta, deras familj eller för sig själva. Den skada som vi beskriver har enbart att göra med what som faktiskt har gjorts, hur det utförts och hur de som möter myndigheterna påverkats utav det- oavsett den personliga ambitionen bakom handlingen.
        </p>
        <p className="mb-6 text-justify leading-relaxed hyphens-auto">
          Denna skada har för att förtydliga lite inte med lagstiftningens ursprungliga syfte eller intention att göra utan svårigheten att hålla sig inom det lagrum som är oss givna utan att tolka dessa till sin egen personliga fördel.
        </p>
      </section>

      {/* FAQ Section */}
      <h3 className="font-sans text-2xl text-[var(--accent-color)] font-bold tracking-tight mt-12 mb-6">
        Vanliga Frågor & Svar
      </h3>
      
      <ExpandableSection title="Vad är skillnaden mellan MiT och MiV?">
        <p className="leading-relaxed">
          <strong>MiT (Myndighetsinducerat Trauma)</strong> är den skada/sår som uppstår hos individen. Det är konsekvensen av interaktionen.
          <br /><br />
          <strong>MiV (Myndighetsinducerat Våld)</strong> är handlingen eller processen som orsakar skadan, ofta karaktäriserad av strategisk användning av systemet för att skada.
        </p>
      </ExpandableSection>

      <ExpandableSection title="Vilka teoretiska fält förklarar MiT/V?">
         <p className="mb-4 leading-relaxed">
          För att förstå MiT/V använder vi en syntes av flera kritiska fält:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4 leading-relaxed">
          <li><strong>Institutionssvek (IBT):</strong> Förklarar den psykologiska chocken när en beskyddare blir förövare.</li>
          <li><strong>Strukturellt Våld (SV):</strong> Belyser hur lagar och regler kan vara våldsamma i sin effekt, även utan illvilja.</li>
          <li><strong>Organisatoriskt Trauma (OT):</strong> Hur systemet i sig kan vara traumatiserat och traumatisera sina anställda och klienter.</li>
        </ul>
        <p className="leading-relaxed">
          Vi integrerar även delar av <strong>polyvagal teori</strong> (för att förstå nervsystemets reaktioner på hot från systemet), <strong>interpersonell neurobiologi</strong> (hur hjärnan påverkas av relationella brott), <strong>objektrelationsteori</strong> och <strong>anknytningsteori</strong>. 
        </p>
        <p className="leading-relaxed mt-2">
          I det terapeutiska arbetet med drabbade personer arbetar vi till viss del manualbaserat men i övrigt främst med <strong>bottom up</strong>-metoder, där vi utgår från kroppens och nervsystemets signaler för att återställa trygghet innan vi bearbetar kognitiva narrativ.
        </p>
      </ExpandableSection>

      <h3 className="font-sans text-2xl text-[var(--accent-color)] font-bold tracking-tight mt-12 mb-5">
        1.1 Inledning
      </h3>
      
      <h4 className="font-sans text-lg font-bold text-[var(--text-color)] mt-8 mb-4 tracking-tight">
        Att förstå det Osynliga Såret
      </h4>
      <p className="mb-6 text-justify leading-relaxed hyphens-auto">
        Denna bok ämnar belysa ett djupt och komplext mänskligt lidande: Myndighetsinducerat Trauma (MiT).
      </p>
      <p className="mb-6 text-justify leading-relaxed hyphens-auto">
        Trauma är ett ord vi ofta associerar med krig, olyckor eller naturkatastrofer, men MiT uppstår i en mer subtil, men ack så destruktiv kontext: när en individ, eller flera individier inom ett system som en familj, utsätts för ingripanden från en myndighet.
     </p>
      <div className="bg-black/5 p-6 rounded-lg mb-6 border-l-4 border-[var(--accent-color)] italic">
        <p className="mb-0 text-justify leading-relaxed">
          <strong className="text-[var(--accent-color)]">MiT definieras som</strong> ett djupt och komplext trauma som uppstår när en individ (eller flera individer inom ett system som en familj) blir utsatt för myndighetsingripanden i sådan pass grad att det över tid ger symptom på livet. De drabbade berövas successivt sin autonomi, sin röst och sitt egna narrativ – alltså sin rätt att tolka det som händer dem.
        </p>
      </div>

      <h4 className="font-sans text-lg font-bold text-[var(--text-color)] mt-8 mb-4 tracking-tight">
        Vi pratar inte om posttraumatiskt stressyndrom
      </h4>
      <p className="mb-6 text-justify leading-relaxed hyphens-auto">
        Det som gör MiT unikt är dess ursprung och utveckling. Initialt kan detta trauma uppvisa alla de markörer som återfinns i diagnosen Posttraumatiskt stressyndrom (PTSD). PTSD är vanligen kopplat till en enskild traumatisk händelse.
      </p>
      <p className="mb-6 text-justify leading-relaxed hyphens-auto">
        Men när traumat inträffar i en kontext av upprepade och långvariga kränkningar av tillit och säkerhet, vilket är typiskt för MiT, liknar symptom snarare Komplext posttraumatiskt stressyndrom (C-PTSD). Denna gradvisa utarmning av autonomi sker i regel över tid.
      </p>

      <h4 className="font-sans text-lg font-bold text-[var(--text-color)] mt-8 mb-4 tracking-tight">
        Våldets normaliseringsprocess
      </h4>
      <p className="mb-6 text-justify leading-relaxed hyphens-auto">
        En central aspekt som förvärrar MiT är det Eva Langes teori kallar våldets normalisering. Den utsatta personen börjar skuldbelägga sig själv, och det destruktiva narrativet – att individen "gjort och olyckligt fel" – blir deras sanning. Detta kan leda till att det utåt sett uppfattas som att individen är den som har en problematik, såsom "Kverulantparanoia". Den drabbade individen slutar kämpa, och i slutändan upplevs det som att ha blivit "medborgare noll".
      </p>
      <p className="mb-6 text-justify leading-relaxed hyphens-auto">
        Syftet med denna bok är att tillhandahålla en noggrann utredning av MiT och MiV, och att belysa denna dynamik i detalj. Genom att ge en röst åt det osynliga såret hoppas vi bidra till ökad insikt och nödvändig förändring.
      </p>
    </div>
  );
};