
import React from 'react';
import { PageWrapper } from './PageWrapper';

interface Chapter6Props {
  startPageNumber: number;
}

export const Chapter6: React.FC<Chapter6Props> = ({ startPageNumber }) => {
  let currentPage = startPageNumber;

  return (
    <div id="chap6">
      <PageWrapper pageNumber={currentPage++}>
        <div className="text-center text-[var(--secondary-text)] text-2xl my-10 tracking-widest">***</div>
        
        <header className="mb-12">
          <h2 className="font-sans text-3xl md:text-4xl text-[var(--accent-color)] font-bold tracking-tight mb-8">
            6. Föräldern som restprodukt – Målet om att neutralisera
          </h2>
        </header>

        <p className="mb-6 text-justify leading-relaxed">
          I definitionen av MiV framträder en obehaglig uppdelning av roller. Barnet omvandlas till verksamhetskapital; föräldern blir ett hinder för detta kapital, en störning som måste neutraliseras.
        </p>

        <h3 id="sec6-1" className="font-sans text-2xl font-bold text-[var(--accent-color)] mt-12 mb-6">
          6.1 Othering / Andregörande
        </h3>
        <p className="mb-6 text-justify leading-relaxed">
          "Othering" är processen genom vilken en dominant grupp definierar en annan grupp som avvikande för att bibehålla maktstrukturer (Said, 1978).
        </p>

        <p className="mb-6 text-justify leading-relaxed">
          <strong>Patologisering av motstånd:</strong> Naturliga reaktioner på våld (ilska, förtvivlan) tolkas inte som omsorg utan som symptom på psykisk instabilitet. En stridbar förälder blir "aggressiv" eller "ovillig till samarbete” (Becker, 1963; Labeling Theory).
        </p>

        <p className="mb-6 text-justify leading-relaxed">
          <strong>Det monsterifierade subjektet:</strong> Genom att måla upp föräldern som en potentiell fara skapas en bild av ett monster, vilket gör att systemet kan distansera sig moraliskt.
        </p>
      </PageWrapper>

      <PageWrapper pageNumber={currentPage++}>
        <h3 id="sec6-2" className="font-sans text-2xl font-bold text-[var(--accent-color)] mb-6">
          6.2 Systemets immunförsvar: Principen om neutralisering
        </h3>
        <p className="mb-6 text-justify leading-relaxed">
          <strong>Delegitimering av rösten:</strong> Neutralisering handlar om att ta ifrån en människa hennes trovärdighet. Sanningen blir irrelevant; endast "pappersverkligheten" räknas.
        </p>
        <p className="mb-6 text-justify leading-relaxed">
          <strong>Uteslutning via språkligt övertag och procedur:</strong> Den som inte behärskar det byråkratiska språket, eller som är traumatiserad (MIT), blir tystad. Neutraliseringen är fullbordad när föräldern ses som ett riskmoment snarare än en part.
        </p>

        <h3 id="sec6-3" className="font-sans text-2xl font-bold text-[var(--accent-color)] mt-12 mb-6">
          6.3 Från rättsbärare till objekt för åtgärd
        </h3>
        <p className="mb-6 text-justify leading-relaxed">
          Den mest förödande aspekten av denna process är förlusten av subjektstatus.
        </p>
        <p className="mb-6 text-justify leading-relaxed">
          <strong>Objektifiering:</strong> Individen blir ett ärendenummer, en "risk", ett administrativt objekt som ska "utredas" och "avfärdas".
        </p>
        <p className="mb-6 text-justify leading-relaxed">
          <strong>Den byråkratiska abjektionen:</strong> Inom psykoanalytisk teori talar man om det abjekta – det som stötts bort och väcker obehag (Kristeva, 1980). Den utsatta föräldern blir systemets abjekt, det "smutsiga" som den rationella byråkratin vill rena sig ifrån. Att neutralisera föräldern blir därmed en hygienåtgärd för systemet – ett sätt att "städa upp" ärendet så att det passar i arkivet.
        </p>
      </PageWrapper>

      <PageWrapper pageNumber={currentPage++}>
        <h3 id="sec6-4" className="font-sans text-2xl font-bold text-[var(--accent-color)] mb-6">
          6.4 Kapital kontra avfall
        </h3>
        <ul className="space-y-6">
          <li>
            <strong>Barnet görs till verksamhetskapital:</strong> En värdefull tillgång som motiverar systemets existens.
          </li>
          <li>
            <strong>Föräldern görs till systemavfall:</strong> En oönskad restprodukt som måste neutraliseras, tystas och städas bort för att "maskineriet" ska kunna rulla vidare friktionsfritt.
          </li>
        </ul>

        <div className="mt-12 bg-black/5 p-8 rounded-xl italic text-justify leading-relaxed">
          Detta är kärnan i Myndighetsinducerat våld. Det handlar om att förlora sin status som människa i systemets ögon. Det är detta som möjliggör det "karaktärsmord" som är så centralt i beskrivningen av fenomenet.
        </div>
      </PageWrapper>
    </div>
  );
};
