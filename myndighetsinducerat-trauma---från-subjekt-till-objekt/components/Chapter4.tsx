
import React from 'react';
import { PageWrapper } from './PageWrapper';

interface Chapter4Props {
  startPageNumber: number;
}

export const Chapter4: React.FC<Chapter4Props> = ({ startPageNumber }) => {
  let currentPage = startPageNumber;

  return (
    <div id="chap4">
      <PageWrapper pageNumber={currentPage++}>
        <div className="text-center text-[var(--secondary-text)] text-2xl my-10 tracking-widest">***</div>
        
        <header className="mb-12">
          <h2 className="font-sans text-3xl md:text-4xl text-[var(--accent-color)] font-bold tracking-tight mb-8">
            4. Systeminducerad retraumatisering som avsiktlig strategi
          </h2>
        </header>

        <p className="mb-6 text-justify leading-relaxed">
          En central mekanism i MiV kan vara systeminducerad retraumatisering. Till skillnad från när systemet oavsiktligt orsakar skada blir retraumatiseringen här ett avsiktligt och strategiskt vapen. Förövaren utnyttjar systemets inneboende svagheter för att uppnå sitt mål och de som i Sverige utgör störst risk att mista sina barn är en tydlig viss grupp av människor. I den grupp människor jag syftar till finns oftats men inte nödvändígvis tidigare traumbildningar i nervsystemet.
        </p>

        <h3 className="font-sans text-2xl font-bold text-[var(--accent-color)] mt-12 mb-6">
          4.2 Handling och konsekvens
        </h3>
        <p className="mb-6 text-justify leading-relaxed">
          Effekterna av MiV beskrivs under kapitel 1–3 om Myndighetsinducerat trauma (MiT). För att förtydliga:
        </p>
        <p className="mb-6 text-justify leading-relaxed">
          Myndighetsinducerat våld skapar alltid Myndighetsinducerat trauma – men för att bli drabbad av Myndighetsinducerat trauma behövs inte Myndighetsinducerat våld.
        </p>
        
        <div className="space-y-4 mb-8">
          <p><strong>Myndighetsinducerat våld (Handlingen):</strong> Beskriver den aktiva processen där systemet används som vapen.</p>
          <p><strong>Myndighetsinducerat trauma (Konsekvens av handling):</strong> Den djupa skada som uppstår hos den som blivit utsatt för våld eller tvingande myndighetsingripanden.</p>
        </div>

        <p className="mb-6 text-justify leading-relaxed">
          Det är i högsta grad att betrakta som ett karaktärsmord där målet är att systematiskt bryta ner den utsattas trovärdighet (Goffman, 1963; Stigma).
        </p>
        <p className="mb-6 text-justify leading-relaxed">
          Den konstanta stressen aktiverar kroppens primitiva överlevnadssystem. Kopplingen till den dorsala vagusnerven är relevant; den utsatta hamnar i ett tillstånd av freeze och kollaps där jag ofta får höra saker som att ”jag kunde inte ens öppna post längre". Detta är en fysiologisk reaktion på extrem och långvariga stress (Levine, 2010; Somatic Experiencing).
        </p>
      </PageWrapper>
    </div>
  );
};
