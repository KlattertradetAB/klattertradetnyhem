
import React from 'react';
import { PageWrapper } from './PageWrapper';

interface Chapter3Props {
  startPageNumber: number;
}

export const Chapter3: React.FC<Chapter3Props> = ({ startPageNumber }) => {
  let currentPage = startPageNumber;

  return (
    <div id="chap3">
      <PageWrapper pageNumber={currentPage++}>
        <div className="text-center text-[var(--secondary-text)] text-2xl my-10 tracking-widest">***</div>
        
        <header className="text-center mb-12 pt-5">
          <span className="block font-sans text-sm font-bold uppercase tracking-widest text-[var(--secondary-text)] mb-3">
            Kapitel tre
          </span>
          <h2 className="font-sans text-3xl md:text-4xl text-[var(--accent-color)] font-bold tracking-tight">
            Från subjekt till objekt
          </h2>
        </header>

        <h3 id="sec3-1" className="font-sans text-2xl md:text-3xl text-[var(--text-color)] font-bold tracking-tight mb-8">
          3.1 Myndighetsinducerat våld (MiV) – när lagen blir vapen i myndigheters yrkesutövande
        </h3>

        <p className="mb-6 text-justify leading-relaxed">
          Myndighetsinducerat våld (MiV) börjar inte med knytnävar utan med en blankett. En blankett som utgör ansökan om ”skyddat boende” och den checkas i, ett kryss i ruta 3: ”hot från andra vårdnadshavaren”.
        </p>

        <p className="mb-6 text-justify leading-relaxed">
          Handläggaren på socialkontoret har ibland tre veckors erfarenhet om ens en färdig socionomutbildning vilket är en bred och tämligen kort och ospecificerad utbildning.
        </p>

        <p className="mb-6 text-justify leading-relaxed font-bold italic">
          Dörren stängs, låses, kopieras.
        </p>

        <p className="mb-6 text-justify leading-relaxed">
          Nu finns ett nytt juridiskt rum där oftast pappan är förvandlad till ”hotbild” och mamman till ”skyddad part”. Barnet har fått ett eget ärendenummer i det tysta regelverket: LSB – lagen om skyddat boende för barn och uppfyller i och med LSB kraven för sekretessmarkering av skatteverket.
        </p>

        <p className="mb-6 text-justify leading-relaxed">
          Skatteverket gör dock inga egna utredningar utan läser ett utlåtande från socialnämnden och tar utifrån detta ett väldigt omfattande beslut. Ingen domstol har ännu yttrat sig, ingen brottsutredning har inletts. Ändå är umgängesstoppet fullbordat– sekretessen påskriven och flyttkedjan igång.
        </p>

        <p className="mb-6 text-justify leading-relaxed">
          Detta är Myndighetsinducerat våld – en form av administrativt våld (Spade, 2015) där byråkratiska processer används för att marginalisera individer (Neutraliseringsprincipen och objektifiering)
        </p>
      </PageWrapper>

      <PageWrapper pageNumber={currentPage++}>
        <h3 id="sec3-2" className="font-sans text-2xl font-bold text-[var(--accent-color)] mb-6">
          3.2 Ett klargörande om systemkritik kontra enskilda fall
        </h3>
        <p className="mb-6 text-justify leading-relaxed">
          Jag vill understryka och påminna om att jag, och vi i denna bok, inte tar ställning i enskilda fall av omhändertagande eller att det på något sätt fel att ta kontakt med socialtjänst, polis eller andra instanser som är avsedda att hjälpa och skydda. Vi tar ställer oss inte emot att det finns situationer där ett ingripande är den enda återstående utvägen för att skydda ett barn från direkt fara. Syftet med detta verk är inte att kritisera enskilda tjänstemäns intentioner eller specifika skyddsbeslut som vilar på faktiska grunder i brottsbalken. Vi pratar utifrån forskning, egenlevda ingripande och professionell erfarenhet och detta alltid på gruppnivå, inte individnivå.
        </p>
        <p className="mb-6 text-justify leading-relaxed">
          Vårt fokus ligger på den systemiska nivån och de generella mönster vi ser. När vi talar om Myndighetsinducerat våld (MiV) adresserar vi hur själva maskineriet (det som Max Weber (1922) beskrev som byråkratins ”järnbur”) när det saknar tillräckliga motvikter skapar en destruktiv kraft på gruppnivå. Det handlar om den processuella skada som uppstår när lagrum som är avsedda för skydd kan transformeras till vapen vilket vi tyvärr ser är väldigt vanligt och blir mer lättillgängligt genom dagens politiska utveckling.
        </p>
        <p className="mb-6 text-justify leading-relaxed">
          Genom att betrakta det som en strukturell företeelse (Galtung, 1969) kan vi visa hur systemet- oberoende av enskilda handläggares goda vilja, riskerar att skapa det som är denna boks kärna: Myndighetsinducerat trauma. Det är en nödvändig systemkritik för att värna om både barnets rättigheter och rättsstatens principer; en analys av en samhällelig blind fläck där lagen riskerar att bli sin egen antites och skada våra barn, andras barn, föräldrar och självklart den kommande framtiden.
        </p>
      </PageWrapper>

      <PageWrapper pageNumber={currentPage++}>
        <h3 id="sec3-3" className="font-sans text-2xl font-bold text-[var(--accent-color)] mb-6">
          3.3 Beskrivning
        </h3>
        <p className="mb-6 text-justify leading-relaxed">
          MiV är inte i första hand våld i form av slag utan våld i form av separation mellan förälder och barn, separation med historia, av röst, av rättigheter och av minnen. Denna typ av våld som görs genom en part i föräldraförgreningen genom myndigheten inte bara tillåts eller uppmuntras utan fortsätter en inte sällan skadlig process mot barn och dens andre vårdnads (och självklart andra närstående i och utanför familjen) med lag och rätt på sin sida skyddat av att kämpa för det goda.
        </p>
        <p className="mb-6 text-justify leading-relaxed">
          Det är våld som klär sig i paragrafer, som luktar papperskopia och arkivplast. Det är våldet som kommer läggas på en skrivbordskant och försvaras med ”vi följde lagen”.
        </p>
        <p className="mb-6 text-justify leading-relaxed">
          Barnen förvandlas till levande fotnoter i verksamhetens egen berättelse där varje omhändertagande är ett kapitel som skrivs för att visa att systemet fungerar – inte att barnet mår bättre. Barnen är inte längre subjekt med röst och rätt utan verksamhetskapitel – ett administrativt bevis på att maskineriet rullar vidare, skyddat av sin egen statistik och svensk lagstiftning.
        </p>
        <p className="mb-6 text-justify leading-relaxed">
          Föräldern blir inte verksamhetskapitel på samma sätt som barnet. Barnet är det objekt som systemet kan flytta, registrera och visa upp som insats. Föräldern däremot blir något annat – en motpart som ska neutraliseras, en risk som ska hanteras, en berättelse som ska tystas eller omformas. Den ena föräldern ges monopol på sanningen genom sekretessen; den andra tystas av samma sekretess. Barnet förvandlas till en bricka vars drag alltid görs i det fördolda.
        </p>
      </PageWrapper>

      <PageWrapper pageNumber={currentPage++}>
        <h3 id="sec3-4" className="font-sans text-2xl font-bold text-[var(--accent-color)] mb-6">
          3.4 Myndighetsinducerat våldet (MiV) har fyra rörelser:
        </h3>
        <div className="space-y-8">
          <div>
            <h4 className="font-bold text-xl mb-2 italic">Alliansen</h4>
            <p className="leading-relaxed text-justify">
              En förälder (oftast mamman) erbjuder myndigheten det den behöver, en hotbild mot ett barn. Myndigheten erbjuder mamman det hon behöver, en laglig möjlighet att flytta, isolera och vinna tid. Avtalet är outtalat men omedelbart: ”Jag ger er ett ärende, ni ger mig ett barn utan motpart.”
            </p>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-2 italic">Klassificeringen</h4>
            <p className="leading-relaxed text-justify">
              Pappan omföds i dokumenten som aggressiv, kontrollerande, psykiskt instabil. Ingen diagnos ställs av någon med kunskap utan av omgivande hobbypsykologer, ingen utredning görs; adjektiven räcker. När tillräckligt många interna PM citerar varandra uppstår en ”samlad bild” som i nästa steg blir ”bevis” (Becker, 1963).
            </p>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-2 italic">Juridiseringen</h4>
            <p className="leading-relaxed text-justify">
              Nu aktiveras skyddslagarna: 3 kap 5 a § socialtjänstlagen, 7 kap 4 a § föräldrabalken, LSB som ger barnet egen sekretess utan krav på brottsbalk eller våldsuppgift. Varje paragraf är ett stängsel. Ingen kräver motpartsförhör. Alla kan hävas ”om förhållandena ändras” – men ingen aktör ansvarar för att kontrollera om de redan har ändrats.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-2 italic">Kapitulationen</h4>
            <p className="leading-relaxed text-justify">
              Pappan står kvar utanför polishuset med umgängesförbud i handen. Barnet har redan bytt ort, namn på förskolan, gosedjurets adress. He har inte begått brott, bara förlorat sin plats i barnets liv genom ett formulär. Här ser vi en inducerad inlärd hjälplöshet (Seligman, 1972) som ett direkt resultat av systemets övermakt.
            </p>
          </div>
        </div>
      </PageWrapper>

      <PageWrapper pageNumber={currentPage++}>
        <p className="mb-6 text-justify leading-relaxed">
          Ur MiV skapas alltså MiT (Myndighetsinducerat Trauma): i tomrummet mellan den juridiska föräldern och det faktiska barnet vars rättigheter nu kränkts till den grad att de inte existerar. Traumat är inte bara frånvaron utan frånvaron färgas nu även av att det är officiell och permanent information. Detta kan definieras som ett institutionellt svek (Institutional Betrayal; Smith & Freyd, 2014).
        </p>
        <p className="mb-6 text-justify leading-relaxed">
          När mållet till slut når domstol (om det når domstol) har nya ”förutsättningar” skapats för de juridiska besluten: barnet har ”rotat sig”, mamman har ”etablerat trygghet”, pappan har hållits avskild så länge att anknytningen riskerar skadas – den klassas i alla fall som primär hos mamman. Domaren tvingas välja mellan att återställa umgänget och därmed störa det liv som myndigheten själv skapat – eller låta MiV fullbordas. De flesta väljer det senare. Traumat institutionaliseras.
        </p>

        <h3 id="sec3-5" className="font-sans text-2xl font-bold text-[var(--accent-color)] mt-12 mb-6">
          3.5 Fördjupade grenar av hur MiV tar sig uttryck:
        </h3>
        <p className="mb-6 text-justify leading-relaxed">
          För att förstå MiV:s fulla vidd måste vi titta på de grenar där våldet verkar i det tysta, djupt inne i kroppar och system:
        </p>

        <div className="space-y-6">
          <p className="leading-relaxed text-justify">
            <strong>Den Neurobiologiska grenen – Systemisk Immobilisering:</strong> Myndigheten använder sin makt för att försätta den utsatta föräldern i ett konstant tillstånd av hot (sympatiskt pådrag) som över tid tvingar nervsystemet in i en dorsal kollaps eller "freeze" (Porges, 2011). Inom Self-care modellen (Ljungberg) ser vi detta som en biologisk gisslantagning. Systemet straffar föräldern för de traumareaktioner – såsom fragmentering, stumhet eller kollaps – som systemet självt har orsakat genom att pressa individen utanför sitt toleransfönster (Window of Tolerance; Siegel, 1999).
          </p>
          <p className="leading-relaxed text-justify">
            <strong>Den Språkliga grenen – Semantiskt våld (Chomsky, 1968):</strong> Här används språket som ett kirurgiskt verktyg för Othering (Said, 1978). Genom att använda kliniska termer som "bristande insikt", "samarbetssvårigheter" eller "behov av stöd" maskeras den faktiska maktutövningen. Inom MiV blir ordet "omsorg" kidnappat; det förvandlas till en administrativ åtgärd istället för en relationell upplevelse. Detta är en form av epistemisk orättvisa (Fricker, 2007), där den utsattes förmåga att förmedla sin verklighet systematiskt undergrävs.
          </p>
          <p className="leading-relaxed text-justify">
            <strong>Den Relationella grenen – Anknytningskapning:</strong> Här används tiden som ett aktivt vapen. Systemet skapar en ny "sanning" för barnet där den andre föräldern suddas ut. Detta är inte bara en fysisk separation utan en administrativ alienation (Bernet, 2010) där barnet berövas sin rätt till sitt ursprung och sitt sensoriska minne.
          </p>
        </div>
      </PageWrapper>

      <PageWrapper pageNumber={currentPage++}>
        <div className="bg-black/5 p-6 rounded-lg mb-8 italic text-justify leading-relaxed">
          Myndighetsinducerat våld är den process där en förälder genom att aktivera skyddslagrum och alliera sig med socialtjänsten kan omvandla ett vårdnadsmål till ett administrativt övertag.
        </div>

        <p className="mb-6 text-justify leading-relaxed">
          Våldet består inte i att lagarna används eller att intentionen med lagarna skulle vara fel – våldet ligger i att de enbart används åt ett håll – utan motvikt – utan motfråga och att en förälder tillåts detta över tid utan tidshorisont. Genom Othering så ser vi dock inte varandra längre, en familj har blivit en lunta papper. Barnet görs till verksamhetskapital och kommer alltid lätt att etiketteras och tolkas genom glasögon som har en viss grad av förutfattade meningar.
        </p>

        <h3 id="sec3-6" className="font-sans text-2xl font-bold text-[var(--accent-color)] mt-12 mb-6">
          3.6 Definition:
        </h3>
        <p className="mb-6 text-justify leading-relaxed">
          Myndighetsinducerat våld är den process där en förälder genom att aktivera skyddslagrum och alliera sig med socialtjänsten kan omvandla ett vårdnadsmål till ett administrativt övertag. Funktionen som MiV uppbär genom externt nyttjande av systemets makt är att skada, tysta, kontrollera eller vinna fördel i en tvist/konflikt – ofta i samband med vårdnadstvister, separationer eller andra juridiska processer. När nyttjandet av maktens skydd ursprunger inifrån systemet själv och inte i första hand från extern part kan det handla om direkt jäv, yttrande av utrymme/tolkning av lagrum.
        </p>
        <p className="mb-6 text-justify leading-relaxed">
          Istället för att vara en arena för rättvisa och skydd används myndigheterna som en hjälp till kränkning av mänskliga rättigheter. Gärningspersonen utnyttjar sin juridiska, ekonomiska eller språkliga överlägsenhet för att manipulera processen till sin egen fördel vilket lämnar de utsatta i en faktisk situation av extrem hjälplöshet.
        </p>
        <p className="mb-4 italic">Förövaren utnyttjar systemets inneboende svagheter för att uppnå sitt mål. Detta innefattar strategier som:</p>
        
        <ul className="space-y-4">
          <li>
            <strong>Juridisk krigsföring som våldsförlängning:</strong>
            <p className="text-sm mt-1">En strategi där förövaren aktiverar lagrum som en förlängning av kontroll, likt begreppet Lawfare.</p>
          </li>
          <li>
            <strong>Tolkningsföreträde:</strong>
            <p className="text-sm mt-1">Att vara den som "ropar först" och därmed sätter ett narrativ (The Power of Definition; Bourdieu, 1991).</p>
          </li>
          <li>
            <strong>Strategiska och repetitiva anmälningar:</strong>
            <p className="text-sm mt-1">Att genom frekventa anmälningar trötta ut den utsatta.</p>
          </li>
          <li>
            <strong>Ekonomisk utmattning:</strong>
            <p className="text-sm mt-1">Att ruinera motparten genom kostsamma juridiska ombud.</p>
          </li>
          <li>
            <strong>Felaktig framställning och skapandet av en pappersverklighet:</strong>
            <p className="text-sm mt-1">Att mata systemet med vinklad dokumentation för att skapa en officiell sanning som myndigheter baserar beslut på.</p>
          </li>
        </ul>
      </PageWrapper>
    </div>
  );
};
