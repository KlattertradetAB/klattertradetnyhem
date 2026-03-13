
import React from 'react';
import { Check, CheckSquare, Square, Trash2, PenLine } from 'lucide-react';
import SignatureCanvas from './SignatureCanvas';

interface ContractDocumentProps {
  therapistName: string;
  therapistOrgNum: string;
  signDate: string;
  signatureData: string | null;
  termsAccepted: boolean;
  infoCertified: boolean;
  setTermsAccepted: (val: boolean) => void;
  setInfoCertified: (val: boolean) => void;
  onSignatureSave: (data: string) => void;
  onSignatureClear: () => void;
}

const ContractDocument: React.FC<ContractDocumentProps> = ({ 
  therapistName, 
  therapistOrgNum,
  signDate,
  signatureData,
  termsAccepted,
  infoCertified,
  setTermsAccepted,
  setInfoCertified,
  onSignatureSave,
  onSignatureClear
}) => {
  
  // Format date for display
  const formattedDate = signDate ? new Date(signDate).toLocaleDateString('sv-SE') : '[Datum]';

  return (
    <article className="text-slate-900 text-[11pt] leading-relaxed font-serif">
      {/* Header */}
      <header className="border-b-2 border-slate-800 pb-6 mb-8 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">Samarbetsavtal</h1>
        <p className="text-slate-600 italic">Horizonten & Klätterträdet - Terapeutanslutning</p>
      </header>

      {/* Intro Text for Context */}
      <div className="mb-6 text-sm italic text-slate-500 border p-4 border-slate-300 rounded bg-slate-50 print:hidden shadow-sm">
        <p>
          Detta avtal signeras av terapeuten först som en intresseanmälan. 
          Avtalet blir bindande först när Horizonten & Klätterträdet granskat, godkänt och motsignerat handlingen.
        </p>
      </div>

      {/* Parties */}
      <section className="mb-6">
        <h2 className="text-lg font-bold uppercase mb-2">Parter</h2>
        <p className="mb-2">Detta avtal ingås mellan:</p>
        <ul className="list-disc list-inside mb-4 pl-2 space-y-1">
          <li>
            <span className="font-bold">Horizonten & Klätterträdet</span> (”Plattformen”), organisationsnummer [fyll i].
          </li>
          <li>
            <span className="font-bold">Terapeuten</span>, <span className="bg-blue-50 px-2 py-0.5 print:bg-transparent border-b border-dashed border-slate-400 min-w-[200px] inline-block font-mono text-blue-900 print:text-black">{therapistName || '[Fyll i ovan]'}</span>, 
            personnummer/organisationsnummer <span className="bg-blue-50 px-2 py-0.5 print:bg-transparent border-b border-dashed border-slate-400 min-w-[150px] inline-block font-mono text-blue-900 print:text-black">{therapistOrgNum || '[Fyll i ovan]'}</span>, 
            innehavare av F-skatt.
          </li>
        </ul>
        <p>
          <strong>Avtalsdatum:</strong> {formattedDate}
        </p>
      </section>

      {/* Main Content with Increased Line Spacing (1 through 8) */}
      <div className="leading-loose">
        {/* 1. Syfte */}
        <section className="mb-8">
            <h3 className="text-md font-bold uppercase mb-3">1. Syfte</h3>
            <p>
            Plattformen erbjuder en digital boknings- och mötestjänst för traumaterapi (fokus på PTSD, C-PTSD och relaterade tillstånd). 
            Terapin ska tillhandahållas genom evidensbaserade metoder i enlighet med Socialstyrelsens riktlinjer. 
            Terapeuten ansluter sig som självständig konsult för att tillhandahålla kvalificerad terapi till klienter via Plattformen. 
            Avtalet reglerar samarbete, bokning, ersättning och villkor.
            </p>
        </section>

        {/* 2. Terapeutens Åtaganden */}
        <section className="mb-8 print-break-inside-avoid">
            <h3 className="text-md font-bold uppercase mb-3">2. Terapeutens Åtaganden</h3>
            <div className="space-y-4">
            <p><span className="font-bold">2.1</span> Tillhandahålla kvalificerad traumaterapi enligt Plattformens standarder, med evidensbaserade metoder och, vid behov, tekniker som beröring/perception (med klientens skriftliga samtycke och i enlighet med Patientsäkerhetslagen (2010:659)).</p>
            <p><span className="font-bold">2.2</span> Uppvisa relevanta kvalifikationer (t.ex. legitimation som psykolog/psykoterapeut) och meddela förändringar. Terapeuten är ansvarig för och bär kostnaden för egna försäkringar, inklusive ansvarsförsäkring och patientskadeförsäkring.</p>
            <p><span className="font-bold">2.3</span> Ange och uppdatera tillgänglighet i Plattformens bokningssystem.</p>
            <p><span className="font-bold">2.4</span> Följa GDPR, Patientdatalagen (2008:355), gällande lagar och Plattformens riktlinjer för professionalitet.</p>
            <p><span className="font-bold">2.5</span> Föra journaler enligt regelverk via Plattformens eller eget GDPR-säkrat system.</p>
            </div>
        </section>

        {/* 3. Plattformens Åtaganden */}
        <section className="mb-8 print-break-inside-avoid">
            <h3 className="text-md font-bold uppercase mb-3">3. Plattformens Åtaganden</h3>
            <div className="space-y-4">
            <p><span className="font-bold">3.1</span> Marknadsföra tjänsterna och rådgivande matcha klienter med terapeuter baserat på kvalifikationer, tillgänglighet och behov. Matchning sker utan att ingripa i terapeutens yrkesutövning eller kliniska bedömningar.</p>
            <p><span className="font-bold">3.2</span> Tillhandahålla digitalt bokningssystem och videomöten.</p>
            <p><span className="font-bold">3.3</span> Hantera fakturering till klient och betalningar samt rabatter utan att påverka Terapeutens ersättning.</p>
            </div>
        </section>

        {/* 4. Ekonomiska Villkor */}
        <section className="mb-8 print-break-inside-avoid">
            <h3 className="text-md font-bold uppercase mb-3">4. Ekonomiska Villkor</h3>
            <div className="space-y-4">
            <p><span className="font-bold">4.1</span> Plattformen fakturerar klienten 1000 SEK/session (exkl. moms). Terapeuten erhåller 800 SEK/session (exkl. moms), oavsett eventuella rabatter som Plattformen ger.</p>
            <p><span className="font-bold">4.2</span> Betalning sker månadsvis mot Terapeutens faktura. Fakturering sker via Plattformens system, och utbetalning sker senast den 25:e nästföljande månad.</p>
            <p><span className="font-bold">4.3</span> Plattformen behåller 200 SEK/session (20 %) för administration, marknadsföring och rabatter.</p>
            <p><span className="font-bold">4.4</span> Ingen ersättning utgår vid avbokning med mindre än 24 timmars varsel eller vid uteblivande, om ej annat avtalats.</p>
            <p><span className="font-bold">4.5</span> Terapeuten är ensam ansvarig för moms (mervärdesskattelagen) och skatt, samt för att inneha och redovisa F-skatt.</p>
            <p><span className="font-bold">4.6</span> Vid betalningsdröjsmål efter fakturans förfallodatum utgår förseningsränta enligt räntelagen (1975:635).</p>
            </div>
        </section>

        {/* 5. Bokning och Matchning */}
        <section className="mb-8 print-break-inside-avoid">
            <h3 className="text-md font-bold uppercase mb-3">5. Bokning och Matchning</h3>
            <div className="space-y-4">
            <p><span className="font-bold">5.1</span> Klienter bokar specifika terapeuter eller non-specific via Plattformens system.</p>
            <p><span className="font-bold">5.2</span> Vid non-specific bokningar matchas klienten baserat på terapeutens kvalifikationer, tillgänglighet och klientens behov (via formulär). Vid högt tryck används roterande fördelning. Terapeuten bekräftar/avböjer matchningen inom 24 timmar; vid avböj matchas nästa terapeut.</p>
            <p><span className="font-bold">5.3</span> Klienten informeras om matchning och sessiondetaljer via e-post/SMS (klientens samtycke till datadelning för matchningsändamål dokumenteras för GDPR Art. 6).</p>
            </div>
        </section>

        {/* 6. Sekretess och GDPR */}
        <section className="mb-8 print-break-inside-avoid">
            <h3 className="text-md font-bold uppercase mb-3">6. Sekretess och GDPR (Personuppgiftsbiträde)</h3>
            <div className="space-y-4">
            <p><span className="font-bold">6.1</span> Plattformen är Personuppgiftsansvarig för behandlingen av klientdata. Terapeuten är Personuppgiftsbiträde (PuB) och åtar sig att följa GDPR och sekretesslagar. Terapeuten förbinder sig att:</p>
            <ul className="list-[lower-roman] list-inside pl-4 space-y-2">
                <li>Vidta lämpliga säkerhetsåtgärder för skydd av känsliga hälsouppgifter (GDPR Art. 9, Art. 32).</li>
                <li>Underrätta Plattformen om en personuppgiftsincident utan oskäligt dröjsmål, dock senast inom 48 timmar efter att Terapeuten fått kännedom om incidenten.</li>
                <li>Bistå Plattformen i hanteringen av de registrerades rättigheter (rätten till tillgång, rättelse, radering, etc.).</li>
                <li>Endast anlita underbiträden efter Plattformens skriftliga godkännande.</li>
                <li>Radera eller återlämna all data till Plattformen vid uppsägning av detta avtal.</li>
            </ul>
            <p><span className="font-bold">6.2</span> Plattformen tillhandahåller GDPR-säkrade verktyg. All klientdata är konfidentiell. Ingen klientdata får användas för marknadsföringsändamål.</p>
            </div>
        </section>

        {/* 7. Varaktighet och Uppsägning */}
        <section className="mb-8 print-break-inside-avoid">
            <h3 className="text-md font-bold uppercase mb-3">7. Varaktighet och Uppsägning</h3>
            <div className="space-y-4">
            <p><span className="font-bold">7.1</span> Avtalet gäller tills vidare från undertecknandedatumet.</p>
            <p><span className="font-bold">7.2</span> Uppsägning sker med 30 dagars skriftlig varsel via e-post ([avtal@horizontenklattertradet.se] eller Terapeutens e-post). Terapeuten slutför eller överlåter pågående klientåtaganden i samråd med Plattformen.</p>
            <p><span className="font-bold">7.3</span> Plattformen betalar för genomförda sessioner fram till uppsägningsdatumet; slutlig faktura betalas inom 14 dagar efter mottagande.</p>
            <p><span className="font-bold">7.4</span> Vid uppsägning stängs systemåtkomst. All klientdata returneras till Plattformen eller raderas enligt GDPR-kraven i avsnitt 6.1 inom 30 dagar.</p>
            <p><span className="font-bold">7.5</span> Omedelbar uppsägning får ske vid väsentligt brott mot villkor (t.ex. grov vårdslöshet, GDPR-överträdelse) med skriftlig motivering.</p>
            <p><span className="font-bold">7.6</span> <span className="underline">Vite:</span> Vid brott mot avsnitt 6 (GDPR) eller avsnitt 8.4 (Konkurrensförbud) utgår ett vite om 10 000 SEK per överträdelse, om inte skadan är större.</p>
            </div>
        </section>

        {/* 8. Övrigt */}
        <section className="mb-8 print-break-inside-avoid">
            <h3 className="text-md font-bold uppercase mb-3">8. Övrigt</h3>
            <div className="space-y-4">
            <p><span className="font-bold">8.1</span> Ändringar görs skriftligen och undertecknas av båda parter.</p>
            <p><span className="font-bold">8.2</span> Ingen ansvarar för force majeure (t.ex. naturkatastrofer, tekniska fel utanför parternas kontroll).</p>
            <p><span className="font-bold">8.3</span> Tvister löses i första hand genom förhandling. Om tvist inte kan lösas, avgörs den i svensk allmän domstol med tillämpning av svensk lag.</p>
            <p><span className="font-bold">8.4</span> <span className="underline">Konkurrensförbud:</span> Terapeuten åtar sig att inte under sex (6) månader efter avtalets upphörande, direkt eller indirekt, bedriva verksamhet eller anlitas av klienter som har förmedlats via Plattformen under avtalstiden.</p>
            <p><span className="font-bold">8.5</span> <span className="underline">Ansvarsbegränsning:</span> Plattformen ansvarar ej för Terapeutens yrkesmässiga handlingar eller underlåtenheter i tjänsten, utom vid fall av Plattformens grova vårdslöshet eller uppsåt.</p>
            </div>
        </section>
      </div>

      {/* 9. Undertecknande */}
      <section className="mt-12 pt-8 border-t-2 border-slate-200 print-break-inside-avoid">
        <h3 className="text-md font-bold uppercase mb-8">9. Undertecknande</h3>
        
        {/* Interactive Checkboxes for Screen */}
        <div className="mb-10 space-y-4 no-print bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-inner">
            <h4 className="text-sm font-bold uppercase text-slate-500 mb-4 tracking-wider">Bekräftelse före signering</h4>
            <div 
              className="flex items-start gap-3 cursor-pointer group p-2 -ml-2 hover:bg-white transition-colors rounded-lg"
              onClick={() => setTermsAccepted(!termsAccepted)}
            >
              <div className={`mt-0.5 transition-colors ${termsAccepted ? 'text-emerald-600' : 'text-slate-300 group-hover:text-slate-400'}`}>
                {termsAccepted ? <CheckSquare size={24} /> : <Square size={24} />}
              </div>
              <p className="text-sm select-none font-medium text-slate-700">
                Jag accepterar villkoren i detta avtal och önskar bli en del av ert bokningssystem för mina tjänster.
              </p>
            </div>

            <div 
              className="flex items-start gap-3 cursor-pointer group p-2 -ml-2 hover:bg-white transition-colors rounded-lg"
              onClick={() => setInfoCertified(!infoCertified)}
            >
              <div className={`mt-0.5 transition-colors ${infoCertified ? 'text-emerald-600' : 'text-slate-300 group-hover:text-slate-400'}`}>
                {infoCertified ? <CheckSquare size={24} /> : <Square size={24} />}
              </div>
              <p className="text-sm select-none font-medium text-slate-700">
                Jag intygar att de uppgifter jag angivit är korrekta.
              </p>
            </div>
        </div>

        {/* Static Checkboxes for Print */}
        <div className="hidden print:block mb-10 space-y-4">
             <div className="flex items-center gap-3">
               <div className="w-5 h-5 border border-slate-800 bg-white shrink-0 flex items-center justify-center">
                 {termsAccepted && <Check size={16} strokeWidth={3} />}
               </div>
               <p className="font-bold">Jag accepterar villkoren i detta avtal och önskar bli en del av ert bokningssystem för mina tjänster.</p>
             </div>
             <div className="flex items-center gap-3">
               <div className="w-5 h-5 border border-slate-800 bg-white shrink-0 flex items-center justify-center">
                 {infoCertified && <Check size={16} strokeWidth={3} />}
               </div>
               <p className="italic">Jag intygar att de uppgifter jag angivit är korrekta</p>
             </div>
        </div>

        <div className="grid grid-cols-2 gap-16">
          {/* Platform Signature (Static/Billy's Side) */}
          <div className="relative opacity-80">
            <h4 className="font-bold text-slate-800 mb-8 flex items-center gap-2">
                Part 1: Plattformen
            </h4>
            
            <div className="mb-4">
              <div className="border-b border-slate-400 h-8 flex items-end">
                <span className="font-mono text-lg text-slate-900">Billy Ljungberg</span>
              </div>
              <p className="text-[10pt] text-slate-500 mt-1">Namnförtydligande</p>
            </div>
            
            <div className="mb-4">
              <div className="border-b border-slate-400 h-8 flex items-end">
                <span className="font-mono text-lg text-slate-900">Verksamhetsutvecklare</span>
              </div>
              <p className="text-[10pt] text-slate-500 mt-1">Titel</p>
            </div>

            <div className="mb-4">
              <div className="border-b border-slate-400 h-8"></div>
              <p className="text-[10pt] text-slate-500 mt-1">Datum & Ort</p>
            </div>

            <div className="mt-8 border-2 border-dashed border-slate-200 rounded-lg h-32 flex items-center justify-center bg-slate-50">
              <p className="text-xs text-slate-400 font-sans italic">Signeras vid godkännande</p>
            </div>
            <p className="text-[10pt] font-bold mt-2 text-slate-500">Signatur (Horizonten & Klätterträdet)</p>
          </div>

          {/* Therapist Signature (Interactive/User's Side) */}
          <div>
            <h4 className="font-bold text-slate-800 mb-8 flex items-center gap-2">
                Part 2: Terapeuten
            </h4>
            
            <div className="mb-4">
              <div className={`border-b h-8 flex items-end transition-colors ${therapistName ? 'border-emerald-400' : 'border-slate-400'}`}>
                <span className="font-mono text-lg text-blue-900 print:text-black">{therapistName || ''}</span>
              </div>
              <p className="text-[10pt] text-slate-500 mt-1">Namnförtydligande</p>
            </div>

             <div className="mb-4">
              <div className="border-b border-slate-400 h-8 flex items-end">
                 <span className="font-mono text-lg text-slate-400 italic">Konsult</span>
              </div>
              <p className="text-[10pt] text-slate-500 mt-1">Titel</p>
            </div>

            <div className="mb-4">
              <div className={`border-b h-8 flex items-end transition-colors ${signDate ? 'border-emerald-400' : 'border-slate-400'}`}>
                <span className="font-mono text-lg text-blue-900 print:text-black">{formattedDate}</span>
              </div>
              <p className="text-[10pt] text-slate-500 mt-1">Datum</p>
            </div>

            <div className="mt-8 relative">
               {/* Signature Box */}
               {!signatureData ? (
                 <div className="no-print">
                   <div className="relative">
                      <div className={`p-1 border-2 rounded-lg transition-all duration-300 ${(!termsAccepted || !infoCertified) ? 'border-slate-200 bg-slate-50' : 'border-blue-300 bg-white shadow-md'}`}>
                        <SignatureCanvas 
                          onSave={onSignatureSave} 
                          onClear={onSignatureClear}
                          disabled={!termsAccepted || !infoCertified}
                        />
                      </div>
                      {(!termsAccepted || !infoCertified) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-100/60 backdrop-blur-[1px] rounded-lg border border-red-200 text-red-600 text-xs font-bold text-center p-4 z-10">
                           <div className="flex flex-col items-center gap-2">
                               <PenLine size={20} className="opacity-50" />
                               Läs avtalet och kryssa i rutorna ovan för att låsa upp signeringsrutan
                           </div>
                        </div>
                      )}
                   </div>
                 </div>
               ) : (
                 <div className="relative group p-2 border-2 border-emerald-500 bg-emerald-50/10 rounded-lg">
                    <img src={signatureData} alt="Signatur" className="max-h-24 -ml-2 mix-blend-multiply" />
                    {/* Clear button - hidden on print */}
                    <button 
                      onClick={onSignatureClear}
                      className="absolute -top-3 -right-3 p-2 text-white bg-red-500 hover:bg-red-600 rounded-full shadow-lg transition-transform hover:scale-110 no-print"
                      title="Rensa signatur och skriv under på nytt"
                    >
                      <Trash2 size={16} />
                    </button>
                 </div>
               )}

               {/* Print Only Placeholder */}
               <div className="hidden print:block border-b-2 border-slate-900 h-24 relative overflow-hidden">
                  {signatureData && <img src={signatureData} alt="Signatur" className="absolute bottom-0 left-0 max-h-24 w-auto mix-blend-multiply" />}
               </div>
               
              <p className="text-[10pt] font-bold mt-2">Digital Signatur (Terapeuten)</p>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="mt-16 pt-8 border-t border-slate-200 text-[9pt] text-slate-400 italic text-center">
        Detta dokument är genererat digitalt och dess integritet skyddas genom Plattformens systemloggar.
      </footer>
    </article>
  );
};

export default ContractDocument;
