
import React from 'react';
import { PageWrapper } from './PageWrapper';

interface Chapter5Props {
  startPageNumber: number;
}

export const Chapter5: React.FC<Chapter5Props> = ({ startPageNumber }) => {
  let currentPage = startPageNumber;

  return (
    <div id="chap5">
      <PageWrapper pageNumber={currentPage++}>
        <div className="text-center text-[var(--secondary-text)] text-2xl my-10 tracking-widest">***</div>
        
        <header className="mb-12">
          <h2 className="font-sans text-3xl md:text-4xl text-[var(--accent-color)] font-bold tracking-tight mb-8">
            5. Systemets objektifiering
          </h2>
        </header>

        <p className="mb-6 text-justify leading-relaxed">
          I skärningspunkten mellan juridisk krigföring och byråkratisk administration uppstår en process där barnet upphör att vara ett subjekt. Inom teorin för MiT introduceras begreppen verksamhetsbarn och verksamhetskapital.
        </p>

        <h3 id="sec5-1" className="font-sans text-2xl font-bold text-[var(--accent-color)] mt-12 mb-6">
          5.1 Barnen blir verksamhetskapital
        </h3>
        <p className="mb-6 text-justify leading-relaxed">
          När barnet väl har reducerats till att ses som och bli behandlat som ett objekt, omvandlas det till Verksamhetskapital. Jürgen Habermas (1981) teori om att systemet koloniserar livsvärlden är relevant här. Den byråkratiska logiken tränger undan den kommunikativa logiken (förståelse, omsorg). Barnet blir bränsle i en struktur som kräver ärenden för att motivera anslag och skydda sin egen organisation.
        </p>

        <h3 id="sec5-2" className="font-sans text-2xl font-bold text-[var(--accent-color)] mt-12 mb-6">
          5.2 Biopolitisk kontroll
        </h3>
        <p className="mb-6 text-justify leading-relaxed">
          Michel Foucaults (1976) begrepp biopolitik handlar om statens kontroll över kroppar. Verksamhetskapitalet är den ultimata formen av biopolitik i familjerättsliga sammanhang. Beslut om umgängesstopp som verkställs under samma dag visar på statens totala makt att flytta kroppar (barn) baserat på administrativa riskbedömningar. Lagen luktar "pappersarkivplast" och blir verktyget för denna disciplinering.
        </p>
      </PageWrapper>

      <PageWrapper pageNumber={currentPage++}>
        <h3 id="sec5-3" className="font-sans text-2xl font-bold text-[var(--accent-color)] mb-6">
          5.3 Konsekvensen: Det administrativa våldet
        </h3>
        <p className="mb-6 text-justify leading-relaxed">
          Sammansmältningen av barn och kapital resulterar i en form av strukturellt våld (Galtung, 1969).
        </p>
        <ul className="space-y-6">
          <li>
            <strong>Förlust av Röst:</strong> Eftersom barnet är ett objekt saknar det egen röst (Spivak, 1988). Det talas om barnet, men sällan med barnet.
          </li>
          <li>
            <strong>Permanent Skada:</strong> Barnet lär sig att dess värde är knutet till dess funktion i ett system, inte till dess mänsklighet.
          </li>
        </ul>

        <div className="mt-16 text-center text-[var(--secondary-text)] text-xl tracking-[0.3em]">***</div>
      </PageWrapper>
    </div>
  );
};
