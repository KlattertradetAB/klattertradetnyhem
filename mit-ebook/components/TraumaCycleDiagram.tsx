
import React from 'react';
import { Tooltip } from './Tooltip';

export const TraumaCycleDiagram: React.FC = () => {
  return (
    <div>
      <div className="text-center text-[var(--secondary-text)] text-2xl my-10 tracking-widest">***</div>
      
      <div id="diagram-mit" className="bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl p-8 my-16 font-sans text-[var(--text-color)] shadow-sm relative overflow-hidden">
         <div className="absolute inset-0 bg-gray-50 opacity-[0.05] pointer-events-none"></div>

        <div className="text-center mb-10 relative z-10 px-4">
          <h2 className="text-2xl md:text-3xl font-black mb-3 text-[var(--accent-color)] leading-tight">
            Myndighetsinducerat trauma, En cyklisk process av beroende, svek och normalisering
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[var(--bg-color)] border-4 border-gray-200 rounded-full items-center justify-center z-20 shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400" aria-hidden="true">
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9 0 0 0 6.74-2.74L21 16"/><path d="M16 16l5 5v-5"/>
            </svg>
          </div>

          <div className="bg-[var(--bg-color)] p-6 rounded-xl shadow-md border-t-4 border-[var(--blue-500)] relative flex flex-col md:col-start-1 md:row-start-1 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl">
            <span className="absolute top-3 right-4 text-5xl font-black opacity-5 pointer-events-none">1</span>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-[var(--blue-100)] text-[var(--blue-500)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div className="font-bold text-lg leading-tight">Fas 1: Beroende & Sårbarhet</div>
            </div>
            <p className="text-sm text-[var(--secondary-text)] mb-4 flex-grow">
              Individen befinner sig i ett ofrivilligt beroendeförhållande till myndigheten (ekonomiskt bistånd, vårdnadstvist, asyl).
            </p>
            <ul className="space-y-1">
              {['Hög sårbarhet hos individen', 'Implicit förväntan på professionellt skydd', 'Ofrivilligt beroende av systemet'].map((pt, i) => (
                <li key={i} className="text-xs text-[var(--secondary-text)] flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 mr-2 bg-[var(--blue-500)] shrink-0"></span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[var(--bg-color)] p-6 rounded-xl shadow-md border-t-4 border-[var(--red-500)] relative flex flex-col md:col-start-2 md:row-start-1 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl">
            <span className="absolute top-3 right-4 text-5xl font-black opacity-5 pointer-events-none">2</span>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-[var(--red-100)] text-[var(--red-500)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M14 13l-7.5 7.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L11 10"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/></svg>
              </div>
              <div className="font-bold text-lg leading-tight">Fas 2: Institutionellt Svek (IB)</div>
            </div>
            <p className="text-sm text-[var(--secondary-text)] mb-4 flex-grow">
              Myndigheten misslyckas med att agera skyddande eller adekvat genom kompetensbrist eller felaktiga utredningar.
            </p>
            <ul className="space-y-1">
              {['Pragmatisk skada (förlust av resurser)', 'Psykologisk skada (ogiltigförklarande)', 'Administrativ långsamhet'].map((pt, i) => (
                <li key={i} className="text-xs text-[var(--secondary-text)] flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 mr-2 bg-[var(--red-500)] shrink-0"></span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[var(--bg-color)] p-6 rounded-xl shadow-md border-t-4 border-[var(--orange-500)] relative flex flex-col md:col-start-2 md:row-start-2 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl">
            <span className="absolute top-3 right-4 text-5xl font-black opacity-5 pointer-events-none">3</span>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-[var(--orange-100)] text-[var(--orange-500)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <div className="font-bold text-lg leading-tight">Fas 3: Traumareaktion &{' '}
                <Tooltip content="En reaktion där förövaren förnekar övergrepp, attackerar offret och vänder på rollerna så offret framstår som förövaren.">
                  <span className="underline decoration-dashed decoration-[var(--orange-500)] text-[var(--orange-500)]">DARVO</span>
                </Tooltip>
              </div>
            </div>
            <p className="text-sm text-[var(--secondary-text)] mb-4 flex-grow">
              Akut stress och maktlöshet. Myndigheten kan använda DARVO (Deny, Attack, Reverse Victim & Offender) för att förneka sveket.
            </p>
            <ul className="space-y-1">
              {['Undertryckande av insikt (Betrayal Blindness)', 'Akut stress och skam', 'Systemet reverserar offer/förövare'].map((pt, i) => (
                <li key={i} className="text-xs text-[var(--secondary-text)] flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 mr-2 bg-[var(--orange-500)] shrink-0"></span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[var(--bg-color)] p-6 rounded-xl shadow-md border-t-4 border-[var(--purple-500)] relative flex flex-col md:col-start-1 md:row-start-2 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl">
            <span className="absolute top-3 right-4 text-5xl font-black opacity-5 pointer-events-none">4</span>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-[var(--purple-100)] text-[var(--purple-500)]">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M19 14c1.49-1.28 3.6-2.35 4.57-1.4 1.75 1.71 0 4.29-1.57 5.86a4.504 4.504 0 0 1-6.36 0c-1.28-1.49-2.35-3.6-1.4-4.57 1.71-1.75 4.29 0 5.86 1.57.5.5.9 1.05 1.18 1.63"/><path d="M11 11.5 5 17.5"/><path d="M5 11.5 11 17.5"/><path d="M4.2 9.8C2.5 8.1 3 5 6 5c1.5 0 2.5 1 3.5 2 1-1 2-2 3.5-2 3 0 3.5 3.1 1.8 4.8L9.5 14 4.2 9.8z"/></svg>
              </div>
              <div className="font-bold text-lg leading-tight">Fas 4: Kronisk Skada</div>
            </div>
            <p className="text-sm text-[var(--secondary-text)] mb-4 flex-grow">
              Upprepat svek leder till C-PTSD. Systemet kräver att individen 'bevisar' sin skada, vilket vidmakthåller cykeln.
            </p>
            <ul className="space-y-1">
              {['Eroderad tillit till sociala fältet', 'Hypervigilans och undvikande', 'Krav på bevisning återskapar trauma'].map((pt, i) => (
                <li key={i} className="text-xs text-[var(--secondary-text)] flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 mr-2 bg-[var(--purple-500)] shrink-0"></span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 p-6 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-lg text-center shadow-sm">
          <h4 className="text-[var(--text-color)] font-bold mb-2 text-lg">Cykelns Natur</h4>
          <p className="text-[var(--secondary-text)] text-sm">
            Modellen visar hur det inte är en linjär process med ett slut, utan en cykel där Fas 4 ofta leder tillbaka till nya krav från myndigheten, vilket återaktiverar Fas 1 och vidmakthåller traumat.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <header className="text-center mb-10">
            <h2 className="font-sans text-2xl md:text-3xl font-bold text-[var(--accent-color)] mb-2">
                Från misstänkliggörande till kollaps
            </h2>
            <p className="font-sans text-lg text-[var(--secondary-text)] uppercase tracking-widest">
                Processen och funktionen (MiT)<br/>
                <span className="text-sm normal-case block mt-1">Sju funktioner för att förstå</span>
            </p>
        </header>

        <div className="space-y-10">
            <div>
                <h3 className="font-sans text-xl font-bold text-[var(--text-color)] mb-4">
                    Steg 1: Misstänkliggörande och aktivering
                </h3>
                <p className="mb-4 text-justify leading-loose">
                    Myndigheten träder in i familjens liv, ofta på grund av en anmälan från en motpart. Föräldern försöker samarbeta och hävda sina gränser för att skydda sin familj. Men redan här inleds en tolkningsprocess från myndigheten som ligger till grund för förödande beslut.
                </p>
                <p className="mb-4 text-justify leading-loose">
                    Förälderns försvar uppfattas som ett "försvarstal," och detta tolkningsföreträde får inte ifrågasättas. Om en extern part som inte är en utbildad advokat försöker ifrågasätta det, anses det oftast "inte främja socialtjänstens process" och denna part avlägsnas från ärendet, vilket hindrar dem från att delta som stöd till den anklagade.
                </p>
                <p className="mb-4 text-justify leading-loose">
                    Varje handling som utförs av föräldern misstolkas och omtolkas genom en lins av tolkad lagstiftning och gruppkultur. Omsorg blir kontroll, oro blir en projektion och varje annan rörelse från den anklagade föräldern bekräftar misstanken.
                </p>
                <p className="mb-4 text-justify leading-loose">
                    Detta misstänkliggörande blir tyvärr den bevisbörda som senare används för att hålla familjen isär. Utredningar byggs på sekundärkällor, felaktigt tolkade citat och tolkade "signaler" från barnet. Vid asymmetriska föräldrakonflikter reduceras förälderns röst till "ord mot ord," där deras berättelse blir en gisslan i en narrativ kollaps.
                </p>
            </div>

            <div>
                <h3 className="font-sans text-xl font-bold text-[var(--text-color)] mb-4">
                    Steg 2: Förlusten av tolkningsföreträdet
                </h3>
                <p className="mb-4 text-justify leading-loose">
                    Utredningen bygger på andrahandsinformation och ett direkt ställningstagande för den som anmält, i linje med idén om att "hellre skydda än fria."
                </p>
                <p className="mb-4 text-justify leading-loose">
                    Detta står i direkt motsättning till tingsrättens princip om att "hellre fria än fälla." Den egna rösten hos föräldern marginaliseras fullständigt. Inom praktiken blir det en strid mellan "myndigheternas ord mot föräldrarnas tystnad." Föräldern blir en gisslan i en berättelse de inte får påverka, där deras historia filtreras genom någon annans syfte.
                </p>
            </div>

            <div>
                <h3 className="font-sans text-xl font-bold text-[var(--text-color)] mb-4">
                    Steg 3: Relationsundergrävning och förintande av det egna ordet
                </h3>
                <p className="mb-4 text-justify leading-loose">
                    Bandet mellan förälder och barn ifrågasätts. Föräldern påstås tidigt utgöra en fara för sitt eget barn, vilket är fallet antingen indirekt eller direkt. Kontakten mellan föräldern och barnet begränsas eller avslutas helt, ibland till övervakade träffar, och ibland till ingen kontakt alls. Det biologiska bandet finns kvar, men det undertrycks socialt. Samtidigt undergrävs den misstänktas känslor, som om behovet av relationen inte längre ska finnas.
                </p>
                <p className="mb-4 text-justify leading-loose">
                    Denna process skapar en djupgående klyvning där affektiv frikoppling uppstår.
                </p>
            </div>

            <div>
                <h3 className="font-sans text-xl font-bold text-[var(--text-color)] mb-4">
                    Steg 4: Systematisk desorientering
                </h3>
                <p className="mb-4 text-justify leading-loose">
                    Föräldern vet inte längre vad som är verkligt. Myndigheter kommunicerar i ett kodat språk med en kommunikationsstil som är omöjlig att förstå och avkoda för någon utan förkunskaper eller som är känslomässigt pressad. Det är även svårt att svara på ett korrekt sätt eftersom svaret återigen kommer att omtolkas i journaler och utredningar.
                </p>
                <p className="mb-4 text-justify leading-loose">
                    Detta stärker myndighetens röst och narrativ. Föräldern förväntas från en dag till en annan förklara och försvara sig mot anklagelser, utan att det ska låta som att de försvarar sig. Samtidigt söker myndigheten efter sätt där den anklagade föräldern säger emot sig själv för att bekräfta det rådande narrativet. Föräldern förlorar här känslan av vad som är verkligt och börjar vända sin egen sanning och intuition mot sig själv.
                </p>
                <p className="mb-4 text-justify leading-loose">
                    Detta kallas institutionell gaslighting när en person ifrågasätter sig själv på grund av de övergrepp som begås av en institution.
                </p>
            </div>

            <div>
                <h3 className="font-sans text-xl font-bold text-[var(--text-color)] mb-4">
                    Steg 5: Tystnadens zon och autonom kollaps
                </h3>
                <p className="mb-4 text-justify leading-loose">
                    Föräldern förlorar mer och mer kontakten med sina barn. En konstlad kontakt, som gått från att vara självklar till att marginaliseras till en övervakad träff på max 30 minuter i veckan, är på samma gång nödvändig och skadlig. Barnet vet, precis som föräldern, genom vilken lins umgänget bevakas. Umgänget blir lätt förövarens förlängda arm.
                </p>
                <p className="mb-4 text-justify leading-loose">
                    Kroppen och nervsystemet stänger av, precis som vid all annan form av traumatisering. Den dorsala vagusnerven tvingar ner aktivitetsnivån, och kroppen går in i vad som kallas freeze och ofta den mest komplexa nivån av immobilisering. Vid denna punkt har föräldern gradvis börjat bli den person som myndigheterna tidigare beskrev, även om så inte var fallet innan. Många slutar svara på brev, öppnar inte post, svarar inte i telefonen, ignorerar kontaktförsök, går inte till affären och orkar inte längre förklara sig för någon.
                </p>
            </div>

            <div>
                <h3 className="font-sans text-xl font-bold text-[var(--text-color)] mb-4">
                    Steg 6: Bandet fryser till is
                </h3>
                <p className="mb-4 text-justify leading-loose">
                    Barnet blir tvunget att tro på den bild och det narrativ som målats upp av den ifrågasatta omsorgspersonen. I många fall tvingas barnet anamma det språk som har skapats kring omsorgspersonen. Föräldern reduceras och marginaliseras till en siffra i ett system där den sociala insatsen sällan rör sig utanför sitt kontor mer än 1-1,5 timme i veckan och som högst träffar barnet och föräldern 30 minuter under hela ärendet. Umgängen ses inte längre som nödvändiga, eftersom föräldern inte bara har reducerats och marginaliserats, utan även har tappat såväl sitt barn som sin autonomi, sin egen röst, sitt tolkningsföreträde, sitt narrativ och sin relation.
                </p>
            </div>

            <div>
                <h3 className="font-sans text-xl font-bold text-[var(--text-color)] mb-4">
                    Steg 7: Institutionellt våld
                </h3>
                <p className="mb-4 text-justify leading-loose">
                    I vissa fall, särskilt i vårdnadstvister och pågående destruktiva separationer, utnyttjas myndigheters makt och inflytande i den enskilda människans och familjers liv. Med att de utnyttjas menar vi i de fall där till exempel en förälder söker skyddat boende för ett annat syfte än vad en skyddsplacering avser (där placeringsformen inte i tillräcklig grad kan styrkas och regleras) eller där socialtjänsten motiverar en förälder till att aktivera skyddslagarna.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};
