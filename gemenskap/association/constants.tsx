


import React from 'react';
import { translations } from '../translations';
import {
    InfluenceIcon,
    GrowthIcon,
    NetworkIcon,
    SupportIcon,
    CommunityIcon
} from './components/Icons';

// Handbook imports
import { HandbookSection, NavigationCategory, Event } from './types';
import { GLOSSARY_TERMS } from './glossary';
import GlossaryTooltip from './components/GlossaryTooltip';


export const ICONS = {
    influence: <InfluenceIcon className="h-6 w-6" />,
    growth: <GrowthIcon className="h-6 w-6" />,
    network: <NetworkIcon className="h-6 w-6" />,
    support: <SupportIcon className="h-6 w-6" />,
    community: <CommunityIcon className="h-6 w-6" />,
};

// Fix: Add a specific type for the translations object to resolve 'any' type in functions.
type TranslationType = typeof translations['sv'];

export const valuePropsData = (t: TranslationType) => [
    { icon: ICONS.growth, title: t.valuePropGrowthTitle, description: t.valuePropGrowthDesc }, // Tillgänglighet
    { icon: ICONS.network, title: t.valuePropNetworkTitle, description: t.valuePropNetworkDesc }, // Professionella tjänster
    { icon: ICONS.support, title: t.valuePropSupportTitle, description: t.valuePropSupportDesc }, // Självhjälp
    { icon: ICONS.community, title: t.valuePropCommunityTitle, description: t.valuePropCommunityDesc }, // Stöd och Gemenskap
    { icon: ICONS.influence, title: t.valuePropInfluenceTitle, description: t.valuePropInfluenceDesc }, // Samhällspåverkan
];

export const memberBenefitsData = (t: TranslationType) => [
    { icon: ICONS.growth, title: t.memberBenefit1Title, description: t.memberBenefit1Desc },
    { icon: ICONS.network, title: t.memberBenefit2Title, description: t.memberBenefit2Desc },
    { icon: ICONS.influence, title: t.memberBenefit3Title, description: t.memberBenefit3Desc },
    { icon: ICONS.community, title: t.memberBenefit4Title, description: t.memberBenefit4Desc },
];

export const faqData = (t: TranslationType) => [
    { question: t.faqQ1, answer: t.faqA1 },
    { question: t.faqQ2, answer: t.faqA2 },
    { question: t.faqQ3, answer: t.faqA3 },
    { question: t.faqQ4, answer: t.faqA4 },
];

export const getUpcomingEvents = (t: TranslationType): Event[] => [
    {
        id: 'event-1',
        date: { month: t.hbEvent1Month, day: t.hbEvent1Day },
        title: t.hbEvent1Title,
        description: t.hbEvent1Desc,
        location: t.hbEvent1Loc,
        time: t.hbEvent1Time,
    },
    {
        id: 'event-2',
        date: { month: t.hbEvent2Month, day: t.hbEvent2Day },
        title: t.hbEvent2Title,
        description: t.hbEvent2Desc,
        location: t.hbEvent2Loc,
        time: t.hbEvent2Time,
    },
    {
        id: 'event-3',
        date: { month: t.hbEvent3Month, day: t.hbEvent3Day },
        title: t.hbEvent3Title,
        description: t.hbEvent3Desc,
        location: t.hbEvent3Loc,
        time: t.hbEvent3Time,
    },
];

export const boardHandbookData = (t: TranslationType) => [
    { title: t.handbookStatutes, icon: 'document', link: '#' },
    { title: t.handbookProcedure, icon: 'rules', link: '#' },
    { title: t.handbookContacts, icon: 'contacts', link: '#' },
    { title: t.handbookMinutes, icon: 'archive', link: '#' },
];

/* ----------------------------------------------------------------------------------
   NEW HANDBOOK DATA 
   ---------------------------------------------------------------------------------- */

const Placeholder: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="text-blue-700 dark:text-blue-400 italic font-medium">{children}</span>
);

export const CHECKLIST_DATA = [
    {
        heading: 'Alla ledamöter',
        items: [
            { id: 'check-1', label: <>Aktuella <GlossaryTooltip>stadgar</GlossaryTooltip>.</> },
            { id: 'check-2', label: <>Arbetsordning och/eller reglemente.</> },
            { id: 'check-3', label: <>Policys</> },
            { id: 'check-4', label: <>Attestrutiner med nivåer.</> },
            { id: 'check-5', label: <>Delegationsordning</> },
            { id: 'check-6', label: <>Beslutad budget och <GlossaryTooltip>verksamhetsplan</GlossaryTooltip>.</> },
            { id: 'check-7', label: <>Om er förening är en del av en riksomfattande eller regional organisation: hur ser organisationen ut, när är det gemensamma möten tex ordförandekonferenser, hur fungerar demokratin dvs när är det stämma, hur många ombud får ni skicka osv.</> },
            { id: 'check-8', label: <>Tillgång till föreningens ekonomiska historia.</> },
        ]
    },
    {
        heading: 'Nyvald ordförande behöver dessutom',
        items: [
            { id: 'check-9', label: <>Lista över interna kontakter som valberedning och <GlossaryTooltip>revisorer</GlossaryTooltip>.</> },
            { id: 'check-10', label: <>Lista över externa kontakter, t.ex. kontaktperson på banken, i andra organisationer, arbetsgivarorganisation mm.</> },
            { id: 'check-11', label: <>Tillgång till alla föreningens kontrakt och avtal. Gå igenom och notera uppsägningsdatum.</> },
            { id: 'check-12', label: <>Göra en årsagenda och planera styrelsens arbete under det kommande året, gärna med datum för kommande styrelse- och medlemsmöten.</> },
            { id: 'check-13', label: <>Be den avgående ordföranden beskriva sin syn på föreningens största utmaningar och möjligheter.</> },
        ]
    }
];

const DownloadLink: React.FC<{ title: string }> = ({ title }) => (
    <div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/50">
        <span className="font-medium text-slate-800 dark:text-slate-200">{title}</span>
        <a
            href="#"
            download
            onClick={(e) => { e.preventDefault(); alert('Den här mallen är inte tillgänglig för nedladdning i den här demon.'); }}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 dark:bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-white dark:focus:ring-offset-slate-900 transition-colors"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Ladda ner
        </a>
    </div>
);

// Removed EventItem component here as it's extracted to its own file.

const sections: HandbookSection[] = [
    {
        id: 'intro',
        title: 'Introduktion',
        content: (
            <>
                <p className="mb-4">
                    Välkommen till Horizonten medlemsförening! Detta häfte är framtaget för att tydliggöra våra gemensamma rutiner och regler, vilket bidrar till en smidig, rättvis och trivsam verksamhet för alla våra medlemmar.
                </p>
                <p>
                    Genom att följa dessa riktlinjer skapar vi en starkare förening där alla känner sig välkomna och kan bidra.
                </p>
            </>
        ),
    },
    {
        id: 'foreningen',
        title: '1. Vår Förening Horizonten – Vision och Syfte',
        content: (
            <>
                <h3 className="text-xl font-semibold mb-2">Vår Historia</h3>
                <p className="mb-4">
                    Horizonten Gemenskap föddes ur en enkel men kraftfull idé: att ingen ska behöva navigera genom livets utmaningar ensam. Det som började 2023 som en lokal initiativgrupp för mental hälsa har snabbt vuxit till en dynamisk förening med medlemmar över hela landet. Grundarna såg ett gap i samhället där tekniska lösningar ofta saknade den mänskliga värmen, och fysiska mötesplatser saknade de moderna verktygen. Horizonten skapades för att brygga denna klyfta och skapa en hybrid av digitalt stöd och mänsklig närvaro.
                </p>

                <h3 className="text-xl font-semibold mb-2">Vår Vision</h3>
                <p className="mb-4">
                    Vi visionerar om ett samhälle där mental hälsa och personlig utveckling inte är lyxvaror, utan grundläggande rättigheter. Vi ser en framtid där "Horizonten" inte bara är en plats man blickar mot, utan en gemenskap man är en del av – en plats där taket är högt, dörren är öppen och där varje individ ges förutsättningar att blomstra. Vår vision är att vara den ledande plattformen för holistisk hälsa och gemenskap i Norden.
                </p>

                <h3 className="text-xl font-semibold mb-2">Våra Övergripande Mål</h3>
                <ul className="list-disc list-inside space-y-2 mb-6">
                    <li><strong>Utbildning & Insikt:</strong> Att genom workshops och föreläsningar ge våra medlemmar konkreta verktyg för att hantera stress, ångest och livspussel.</li>
                    <li><strong>Gemenskap:</strong> Att etablera lokala "Horisont-hubbar" i varje större stad för att främja fysiska möten och minska ofrivillig ensamhet.</li>
                    <li><strong>Digital Innovation:</strong> Att kontinuerligt utveckla våra digitala hjälpmedel för att vara ledande inom "tech-for-good", med fokus på integritet och användarnyltta.</li>
                    <li><strong>Samhällspåverkan:</strong> Att aktivt delta i debatten om folkhälsa och verka för politiska beslut som gynnar det kollektiva välmåendet.</li>
                    <li><strong>Tillgänglighet:</strong> Genom att göra oss tillgängliga på internet och erbjuda gratis hjälp säkerställer vi att de som mest behöver stödet får tillgång till det när de behöver det, och på sina egna villkor.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-2">Horizonten app och tillgängligheten</h3>
                <p className="mb-4">
                    Horizonten-appen är ett digitalt verktyg för självomsorg och välmående, designat för att hjälpa användare att ta hand om sig själva på ett enkelt och effektivt sätt. Men för att appen ska kunna nå och stödja alla, oavsett funktionsförmåga, har vi lagt stor vikt vid tillgänglighet. Vi tror på inkludering och har därför utvecklat funktioner som gör appen användbar för personer med olika behov – från syn- och hörselnedsättningar till motoriska eller kognitiva utmaningar.
                </p>
                <p className="mb-6">
                    Här går vi igenom hur Horizonten-appen är utformad för att vara tillgänglig för så många som möjligt.
                </p>

                <h3 className="text-xl font-semibold mb-1">En Integrerad Syn på Läkning och Trauma</h3>
                <h4 className="text-md font-medium text-slate-600 dark:text-slate-400 mb-4 italic">Fältteori och Self-care</h4>
                <p className="mb-4">
                    På Horizonten ser vi människan som en helhet i samspel med sin omgivning. Genom att kombinera fältteori med praktisk self-care skapar vi förutsättningar för djupgående läkning. Vi förstår att trauma inte bara är en inre process utan något som påverkas av och påverkar de fält vi verkar i – familj, samhälle och kultur. Vår metodik integrerar dessa perspektiv för att erbjuda ett stöd som är både brett och djupt, där individens egenmakt står i centrum för återhämtningen.
                </p>
            </>
        )
    },
    {
        id: 'self-care-level-2',
        title: 'Fördjupning: Kompensatoriska Beteenden (Nivå 2)',
        content: (
            <>
                <p className="mb-6 text-lg">
                    Dessa beteenden representerar ett etablerat mönster av funktionell kompensation. Personen kan navigera i livet, men måste upprätthålla rigida strategier för att maskera eller kontrollera inre sårbarhet.
                </p>

                {/* Reglering */}
                <div className="mb-8 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <h3 className="text-xl font-bold mb-4 text-cyan-700 dark:text-cyan-400 border-b border-slate-200 dark:border-slate-700 pb-2">
                        Reglering (Flykt och Kontroll)
                    </h3>

                    <div className="mb-6">
                        <h4 className="font-bold text-lg mb-2">Nivå 2: Ritualiserad Kontroll</h4>
                        <p className="mb-3">Strikt, systematisk efterlevnad av rutiner (kost, träning, städschema) vars brott leder till stark ångest eller ilska.</p>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg text-sm">
                            <p className="mb-1"><strong className="text-slate-700 dark:text-slate-300">Neurobiologisk Funktion:</strong> Skapar maximal förutsägbarhet i omgivningen för att sänka en grundläggande, hög baslinjeångest.</p>
                            <p><strong className="text-slate-700 dark:text-slate-300">Koppling till Grundsår:</strong> <span className="text-red-600 dark:text-red-400">Misstro, Ovärdighet.</span></p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-2">Nivå 2: Den Charmiga Bufferten</h4>
                        <p className="mb-3">Använder humor, ytlig konversation och hövlighet i sociala sammanhang för att undvika att nå emotionellt djup eller sårbarhet.</p>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg text-sm">
                            <p className="mb-1"><strong className="text-slate-700 dark:text-slate-300">Neurobiologisk Funktion:</strong> Håller det sociala engagemangssystemet (ventrala vagus) aktivt men endast ytligt, vilket signalerar trygghet utan krav på intimitet.</p>
                            <p><strong className="text-slate-700 dark:text-slate-300">Koppling till Grundsår:</strong> <span className="text-red-600 dark:text-red-400">Avvisad, Övergivenhet.</span></p>
                        </div>
                    </div>
                </div>

                {/* Självbild */}
                <div className="mb-8 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <h3 className="text-xl font-bold mb-4 text-cyan-700 dark:text-cyan-400 border-b border-slate-200 dark:border-slate-700 pb-2">
                        Självbild (Maskering och Försvar)
                    </h3>

                    <div className="mb-6">
                        <h4 className="font-bold text-lg mb-2">Nivå 2: Rollen som Identifierare</h4>
                        <p className="mb-3">Värdet är hårt knutet till en yttre roll (Jobbtitel, Expert, "Den Perfekta Föräldern"). Kritik mot rollen upplevs som en attack på själva jaget.</p>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg text-sm">
                            <p className="mb-1"><strong className="text-slate-700 dark:text-slate-300">Neurobiologisk Funktion:</strong> Yttre validering via status och erkännande fungerar som ett känslomässigt plåster på det inre såret av otillräcklighet.</p>
                            <p><strong className="text-slate-700 dark:text-slate-300">Koppling till Grundsår:</strong> <span className="text-red-600 dark:text-red-400">Ovärdighet, Skam.</span></p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-2">Nivå 2: Intellektuell Försvarare</h4>
                        <p className="mb-3">Använder logik, fakta eller debatt för att "vinna" diskussioner och undvika att känna sig "fel", dum eller sårbar i en konflikt.</p>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg text-sm">
                            <p className="mb-1"><strong className="text-slate-700 dark:text-slate-300">Neurobiologisk Funktion:</strong> Hyper-rationalisering (kognitiv flykt) används som en försvarsmekanism mot känslomässig exponering ("Fight"-mekanism).</p>
                            <p><strong className="text-slate-700 dark:text-slate-300">Koppling till Grundsår:</strong> <span className="text-red-600 dark:text-red-400">Misstro, Avvisad.</span></p>
                        </div>
                    </div>
                </div>

                {/* Trygghet */}
                <div className="mb-8 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <h3 className="text-xl font-bold mb-4 text-cyan-700 dark:text-cyan-400 border-b border-slate-200 dark:border-slate-700 pb-2">
                        Trygghet (Gränser och Konfliktundvikande)
                    </h3>

                    <div className="mb-6">
                        <h4 className="font-bold text-lg mb-2">Nivå 2: Väggbyggaren</h4>
                        <p className="mb-3">Upprättar rigida, ogenomträngliga gränser i relationer; har svårt med flexibilitet, spontanitet eller att bjuda in till ömsesidig sårbarhet.</p>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg text-sm">
                            <p className="mb-1"><strong className="text-slate-700 dark:text-slate-300">Neurobiologisk Funktion:</strong> Skapar en känslomässig fästning; kontrollsystemet bedömer sårbarhet som en hög risk för smärta/förlust.</p>
                            <p><strong className="text-slate-700 dark:text-slate-300">Koppling till Grundsår:</strong> <span className="text-red-600 dark:text-red-400">Misstro, Avvisad.</span></p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-2">Nivå 2: Passivt Resistent</h4>
                        <p className="mb-3">Ger muntligt medhåll eller lovar något, men "glömmer" eller misslyckas konsekvent med att leverera eller hålla tidsramar.</p>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg text-sm">
                            <p className="mb-1"><strong className="text-slate-700 dark:text-slate-300">Neurobiologisk Funktion:</strong> Utövar gränssättning och kontroll indirekt för att undvika den rädsla som är kopplad till direkt konfrontation eller underkastelse.</p>
                            <p><strong className="text-slate-700 dark:text-slate-300">Koppling till Grundsår:</strong> <span className="text-red-600 dark:text-red-400">Underkastelse, Misstro.</span></p>
                        </div>
                    </div>
                </div>
            </>
        )
    },
    {
        id: 'styrelsens-arbetsformer',
        title: '2. Styrelsens arbetsformer',
        content: (
            <>
                <p className="font-bold text-lg mb-4">Styrelsens arbetsformer – Horizonten</p>
                <p className="mb-4 italic">
                    Detta dokument beskriver hur styrelsen inom Horizonten organiserar sitt arbete, hur beslut fattas och hur ansvarsområden fördelas. Syftet är att skapa transparens, tydlighet och kontinuitet i ledningsarbetet i enlighet med föreningens värdegrund.
                </p>

                <h3 className="text-xl font-semibold mb-2">1. Styrelsens ansvar</h3>
                <p className="mb-4">
                    Styrelsen ansvarar för att föreningens verksamhet bedrivs enligt <GlossaryTooltip>stadgar</GlossaryTooltip>, policyer och fattade beslut. Styrelsen är kollektivt ansvarig inför <GlossaryTooltip termKey="Årsmöte">årsmötet</GlossaryTooltip> och representerar medlemmarna mellan <GlossaryTooltip>årsmöten</GlossaryTooltip>.
                </p>

                <h3 className="text-xl font-semibold mb-2">2. Konstituering</h3>
                <p className="mb-4">
                    Efter <GlossaryTooltip termKey="Årsmöte">årsmötet</GlossaryTooltip> hålls ett konstituerande möte där roller fördelas: ordförande, sekreterare, kassör samt eventuella övriga ansvarsområden som kommunikation, personalkontakt, kvalitet, utbildning och medlemskap.
                </p>

                <h3 className="text-xl font-semibold mb-2">3. Beslutsformer</h3>
                <p className="mb-4">
                    Styrelsen fattar beslut med enkel majoritet. Ordförande har utslagsröst vid lika röstetal. Alla beslut dokumenteras i <GlossaryTooltip>mötesprotokoll</GlossaryTooltip> och sammanställs i beslutslogg.
                </p>

                <h3 className="text-xl font-semibold mb-2">4. Mötesformer</h3>
                <p className="mb-4">
                    Ordinarie styrelsemöten hålls minst 4 gånger per år, digitalt eller fysiskt. Extra möten kan kallas vid behov. Möten leds av ordföranden eller dennes ersättare.
                </p>

                <h3 className="text-xl font-semibold mb-2">5. Sekreterarens uppdrag</h3>
                <p className="mb-4">
                    Sekreteraren ansvarar för att föra <GlossaryTooltip termKey="Protokoll">protokoll</GlossaryTooltip>, sammanställa <GlossaryTooltip termKey="Dagordning">dagordningar</GlossaryTooltip> och hålla kontakt med myndigheter för registrering och handlingar. Hen ansvarar också för dokumentarkiv och versionering.
                </p>

                <h3 className="text-xl font-semibold mb-2">6. Kassörens uppdrag</h3>
                <p className="mb-4">
                    Kassören har ansvar för ekonomisk överblick, rapportering och kontakter med eventuell redovisningsbyrå. Kassören godkänner rekvisitioner, medverkar vid budgetarbete och samordnar årsredovisning.
                </p>

                <h3 className="text-xl font-semibold mb-2">7. Arbetsgrupper</h3>
                <p className="mb-4">
                    Styrelsen kan tillsätta arbetsgrupper för särskilda områden såsom projekt, utbildning, kommunikation eller policyutveckling. Minst en styrelsemedlem ska ingå i varje arbetsgrupp och rapportera tillbaka till styrelsen.
                </p>

                <h3 className="text-xl font-semibold mb-2">8. Beslutslogg och uppföljning</h3>
                <p className="mb-4">
                    Alla styrelsebeslut sammanställs i en beslutslogg som uppdateras löpande. Styrelsen följer upp genomförande av beslut vid varje möte.
                </p>

                <h3 className="text-xl font-semibold mb-2">9. Ansvar och gränsdragning</h3>
                <p className="mb-4">
                    Styrelsen ska särskilja beslutande roll från operativ verksamhet. Projektledare, ombud och andra funktioner ansvarar för genomförande inom ramar satta av styrelsen. Vid osäkerhet ska beslut lyftas tillbaka till styrelsen.
                </p>

                <h3 className="text-xl font-semibold mb-2">10. Kommunikation inom styrelsen</h3>
                <p>
                    Styrelsens interna kommunikation sker främst via mail, sms och digitala samarbetsytor (t.ex. Horizonten App eller Google Drive). Akuta frågor kan avgöras via telefon- eller sms-beslut, som bekräftas vid nästa möte.
                </p>
            </>
        )
    },
    {
        id: 'medlemskap',
        title: '3. Medlemskap i Horizonten',
        content: (
            <>
                <h3 className="text-xl font-semibold mb-2">Vem kan bli medlem?</h3>
                <p className="mb-2"><Placeholder>[Beskriv kriterier, t.ex. "Alla som delar föreningens värderingar och syfte", "Personer över 18 år", etc.]</Placeholder></p>
                <p className="mb-4">Ansökan om medlemskap sker genom att <Placeholder>[beskriv processen, t.ex. fylla i formulär på hemsidan, kontakta styrelsen]</Placeholder>.</p>

                <h3 className="text-xl font-semibold mb-2">Medlemsavgift</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>Medlemsavgiften fastställs årligen av <GlossaryTooltip termKey="Årsmöte">årsmötet</GlossaryTooltip>.</li>
                    <li>Avgiften betalas senast <Placeholder>[datum]</Placeholder> för att medlemskapet ska vara giltigt under <Placeholder>[period, t.ex. innevarande verksamhetsår]</Placeholder>.</li>
                    <li>Information om aktuell avgift och hur den betalas finns på <Placeholder>[hemsida/kontaktperson]</Placeholder>.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-2">Medlemmens rättigheter och skyldigheter</h3>
                <h4 className="text-lg font-semibold mt-4 mb-2">Rättigheter:</h4>
                <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>Rösträtt vid <GlossaryTooltip termKey="Årsmöte">årsmöten</GlossaryTooltip> (om <GlossaryTooltip termKey="Stadgar">stadgarna</GlossaryTooltip> medger det och medlemsavgiften är betald).</li>
                    <li>Rätt att ta del av föreningens handlingar (<GlossaryTooltip termKey="Protokoll">mötesprotokoll</GlossaryTooltip>, <GlossaryTooltip>stadgar</GlossaryTooltip>, ekonomisk redovisning).</li>
                    <li>Rätt att delta i föreningens aktiviteter.</li>
                    <li>Rätt att lämna <GlossaryTooltip>motioner</GlossaryTooltip> och förslag till styrelsen och <GlossaryTooltip termKey="Årsmöte">årsmötet</GlossaryTooltip>.</li>
                </ul>

                <h4 className="text-lg font-semibold mt-4 mb-2">Skyldigheter:</h4>
                <ul className="list-disc list-inside space-y-2">
                    <li>Följa föreningens <GlossaryTooltip>stadgar</GlossaryTooltip> och de regler som fastställs.</li>
                    <li>Betala medlemsavgift i tid.</li>
                    <li>Bidra till en positiv och inkluderande miljö.</li>
                    <li>Värna om föreningens egendom och resurser.</li>
                </ul>
            </>
        )
    },
    {
        id: 'organisation',
        title: '4. Organisation och Beslutsfattande',
        content: (
            <>
                <h3 className="text-xl font-semibold mb-2">Styrelsen</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>Består av <Placeholder>[antal]</Placeholder> ledamöter och <Placeholder>[antal]</Placeholder> <GlossaryTooltip>suppleanter</GlossaryTooltip>, valda vid <GlossaryTooltip termKey="Årsmöte">årsmötet</GlossaryTooltip>.</li>
                    <li>Styrelsen ansvarar för att leda föreningens löpande verksamhet mellan <GlossaryTooltip>årsmöten</GlossaryTooltip>.</li>
                    <li>Styrelsemöten hålls <Placeholder>[frekvens, t.ex. en gång i månaden]</Placeholder> eller vid behov.</li>
                    <li><GlossaryTooltip termKey="Protokoll">Mötesprotokoll</GlossaryTooltip> från styrelsemöten <Placeholder>[var de finns tillgängliga, t.ex. på hemsidan för medlemmar]</Placeholder>.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-2">Årsmöte</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>Föreningens högsta beslutande organ.</li>
                    <li>Hålls årligen senast <Placeholder>[månad, t.ex. mars]</Placeholder>.</li>
                    <li>Kallelse skickas ut senast <Placeholder>[antal]</Placeholder> veckor innan mötet, tillsammans med <GlossaryTooltip>dagordning</GlossaryTooltip> och nödvändiga handlingar.</li>
                    {/* Fix: Corrected typo 'GlossyaTooltip' to 'GlossaryTooltip' */}
                    <li>Medlemmar har rätt att lämna in <GlossaryTooltip>motioner</GlossaryTooltip> till <GlossaryTooltip termKey="Årsmöte">årsmötet</GlossaryTooltip> senast <Placeholder>[datum/tidpunkt, t.ex. fyra veckor före mötet]</Placeholder>.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-2">Extrastyrelsemöte</h3>
                <p className="mb-4"><Placeholder>[Om relevant, beskriv hur och när sådana kan kallas till.]</Placeholder></p>

                <h3 className="text-xl font-semibold mb-2">Övriga möten och kommittéer</h3>
                <p className="mb-4"><Placeholder>[Om föreningen har arbetsgrupper eller utskott, beskriv deras syfte och hur de arbetar.]</Placeholder></p>

                <h3 className="text-xl font-semibold mb-2">Beslutsprocesser</h3>
                <ul className="list-disc list-inside space-y-2">
                    <li>Beslut fattas i första hand genom <GlossaryTooltip>konsensus</GlossaryTooltip>.</li>
                    <li>Om <GlossaryTooltip>konsensus</GlossaryTooltip> inte nås, sker omröstning där enkel majoritet gäller, om inte annat stadgas i <GlossaryTooltip termKey="Stadgar">stadgarna</GlossaryTooltip>.</li>
                    <li>Vid lika röstetal <Placeholder>[ordförande har utslagsröst/lotten avgör]</Placeholder>.</li>
                </ul>
            </>
        )
    },
    {
        id: 'ekonomi',
        title: '5. Ekonomi och Administration',
        content: (
            <>
                <h3 className="text-xl font-semibold mb-2">Budget och ekonomisk uppföljning</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>Budget upprättas av styrelsen och fastställs av <GlossaryTooltip termKey="Årsmöte">årsmötet</GlossaryTooltip>.</li>
                    <li>Löpande uppföljning av ekonomin sker <Placeholder>[frekvens, t.ex. månadsvis]</Placeholder> av <Placeholder>[ansvarig, t.ex. kassören]</Placeholder>.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-2">Hantering av intäkter och utgifter</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>Alla transaktioner ska dokumenteras med kvitto/faktura.</li>
                    <li>Utbetalningar görs av <Placeholder>[ansvarig, t.ex. kassören]</Placeholder> efter godkännande av <Placeholder>[t.ex. två styrelsemedlemmar]</Placeholder>.</li>
                    <li><Placeholder>[Rutiner för utlägg och ersättning]</Placeholder>.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-2">Ansökan om bidrag</h3>
                <p className="mb-4"><Placeholder>[Beskriv processen för att söka bidrag, vem som är ansvarig och hur information om detta sprids.]</Placeholder></p>

                <h3 className="text-xl font-semibold mb-2">Transparens och revision</h3>
                <ul className="list-disc list-inside space-y-2">
                    <li>Föreningens räkenskaper granskas årligen av valda <GlossaryTooltip>revisorer</GlossaryTooltip> inför <GlossaryTooltip termKey="Årsmöte">årsmötet</GlossaryTooltip>.</li>
                    <li>Medlemmar har rätt att ta del av föreningens ekonomiska redovisning.</li>
                </ul>
            </>
        )
    },
    {
        id: 'verksamhet',
        title: '6. Verksamhet och Aktiviteter',
        content: (
            <>
                <h3 className="text-xl font-semibold mb-2">Planering och genomförande av aktiviteter</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>Förslag på aktiviteter kan komma från <Placeholder>[styrelsen/alla medlemmar]</Placeholder>.</li>
                    <li>Alla aktiviteter ska planeras i samråd med <Placeholder>[ansvarig styrelsemedlem/aktivitetskommitté]</Placeholder>.</li>
                    <li>Budget för aktiviteter ska godkännas av <Placeholder>[styrelsen/kassören]</Placeholder>.</li>
                </ul>
                <h3 className="text-xl font-semibold mb-2">Ansvar för arrangemang</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>Varje aktivitet ska ha en tydlig ansvarig person/grupp.</li>
                    <li>Ansvarig ser till att <Placeholder>[t.ex. nödvändiga tillstånd finns, lokalen är bokad, information sprids, utvärdering görs]</Placeholder>.</li>
                </ul>
                <h3 className="text-xl font-semibold mb-2">Kommunikation om aktiviteter</h3>
                <p>Information om kommande aktiviteter ska publiceras på <Placeholder>[föreningens kanaler]</Placeholder> i god tid.</p>
            </>
        )
    },
    {
        id: 'kommunikation',
        title: '7. Kontakt med organisationen',
        content: (
            <>
                <p className="mb-4">Strukturerad kontakt med ledning och styrelse från Horizonten och dess verksamheter:</p>

                <h3 className="text-xl font-semibold mb-2">1. Regelbundna Avstämningsmöten</h3>
                <p className="mb-2 italic">Detta är grunden för all god kommunikation.</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                    <li><strong>Frekvens:</strong> Bestäm en fast frekvens, till exempel en gång i månaden eller kvartalsvis, beroende på behov och intensiteten i utvecklingen.</li>
                    <li><strong>Deltagare:</strong> En eller flera utsedda representanter från styrelsen (t.ex. ordföranden, eller en ledamot från arbetsgruppen "App och Tech") bör möta en eller flera nyckelpersoner från Horizontens ledning/utvecklingsteam.</li>
                    <li>
                        <strong>Dagordning:</strong> Dessa möten bör ha en tydlig <GlossaryTooltip>dagordning</GlossaryTooltip> som inkluderar:
                        <ul className="list-['–'] list-inside space-y-1 mt-2 ml-4">
                            <li>Rapportering från styrelsen: Sammanställning av medlemsfeedback, förslag och önskemål som kommit in via föreningen.</li>
                            <li>Rapportering från Horizonten: Uppdateringar om apputveckling, planerade funktioner, utmaningar och strategiska beslut.</li>
                            <li>Gemensam diskussion: Dialog kring hur medlemsfeedback kan implementeras, prioriteringar och hur föreningen kan stödja Horizontens mål.</li>
                        </ul>
                    </li>
                </ul>

                <h3 className="text-xl font-semibold mb-2">2. Dedikerad Kontaktperson</h3>
                <p className="mb-2">Utse en specifik person på vardera sida som är primär kontakt.</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                    <li><strong>Från Styrelsen:</strong> En styrelseledamot (kanske den som är sammankallande för arbetsgruppen "App och Tech") fungerar som huvudkontakt.</li>
                    <li><strong>Från Horizonten:</strong> En person från Horizontens sida, med insyn och mandat, som är styrelsens direkta länk. Detta underlättar snabba frågor och förhindrar att information går vilse.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-2">3. Gemensam Kommunikationsplattform</h3>
                <p className="mb-2 italic">Använd digitala verktyg för löpande dialog och dokumentation.</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                    <li><strong>Delad Kommunikationskanal:</strong> En gemensam Slack-kanal, Microsoft Teams-grupp eller liknande där snabbare frågor och uppdateringar kan skickas.</li>
                    <li><strong>Delat Dokumentationssystem:</strong> Använd ett system (t.ex. Google Drive, Microsoft SharePoint) för att dela relevanta dokument, <GlossaryTooltip termKey="Protokoll">mötesprotokoll</GlossaryTooltip>, feedbackrapporter och utvecklingsplaner på ett säkert och lättillgängligt sätt.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-2">4. Föreningens Årsmöte</h3>
                <p className="mb-2 italic">Horizontens representanter bör bjudas in.</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                    <li><strong>Inbjudan till Årsmötet:</strong> Att bjuda in relevanta representanter från Horizonten till föreningens <GlossaryTooltip termKey="Årsmöte">årsmöte</GlossaryTooltip> ger dem en djupare inblick i medlemmarnas engagemang och beslutsprocesser. De kan också presentera sin vision och svara på medlemsfrågor direkt.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-2">5. Formella och Informella Kanaler</h3>
                <p className="mb-2 italic">Komplettera de strukturerade mötena med andra former av kontakt.</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                    <li><strong>Styrelseledamot i Horizontens advisory board (om relevant):</strong> Om Horizonten har en rådgivande grupp, kan en styrelseledamot från föreningen ingå där för att säkerställa medlemsrepresentativitet på en högre nivå.</li>
                    <li><strong>Informella möten/kaffepauser:</strong> Att bygga personliga relationer kan underlätta dialogen avsevärt.</li>
                </ul>

                <p className="mb-4">Genom att implementera en kombination av dessa strategier kan styrelsen säkerställa att medlemmarnas röster hörs och tas på allvar, samtidigt som Horizonten får värdefull input för sin utveckling.</p>
            </>
        )
    },
    {
        id: 'resurser',
        title: '8. Användning av Föreningens Resurser/Lokaler',
        content: (
            <>
                <p className="mb-4">
                    <strong>Tillämpningsområde:</strong> Rutinen gäller för alla medlemmar och grupper inom föreningen som önskar använda Horisonts lokaler (<Placeholder>ange namn på lokal, t.ex. föreningslokalen, musikrummet</Placeholder>) eller utrustning (<Placeholder>ange typ av utrustning, t.ex. projektor, ljudutrustning</Placeholder>).
                </p>

                <p className="mb-4">
                    <strong>Ansvarig:</strong> <Placeholder>Ange ansvarig person/grupp, t.ex. Lokalförvaltare/Styrelsen via sekreteraren</Placeholder>.
                </p>

                <h3 className="text-xl font-semibold mb-4 mt-6">Procedurer</h3>

                <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2">1. Bokning av lokaler/utrustning</h4>
                    <ul className="list-disc list-inside space-y-3">
                        <li>
                            <strong>Tillgänglighet:</strong> Föreningens lokaler och utrustning är i första hand till för föreningsgemensamma aktiviteter. Därefter kan de bokas av enskilda medlemmar för <Placeholder>ange tillåtet ändamål, t.ex. föreningsrelaterade möten, personliga projekt som gynnar föreningen, etc. – eller om det är tillåtet för privata ändamål mot avgift</Placeholder>.
                        </li>
                        <li>
                            <strong>Bokningssystem:</strong> Bokning sker via <Placeholder>ange bokningssystem, t.ex. Google Kalender som styrelsen delar, ett formulär på hemsidan, kontakt med ansvarig via e-post</Placeholder>.
                        </li>
                        <li>
                            <strong>Bokningsförfrågan:</strong> En bokningsförfrågan ska innehålla:
                            <ul className="list-['–'] list-inside ml-4 mt-2 space-y-1">
                                <li>Datum och tid för önskad användning.</li>
                                <li>Syfte med bokningen (vad som ska göras).</li>
                                <li>Vilken lokal/utrustning som önskas.</li>
                                <li>Kontaktperson (namn, telefon, e-post).</li>
                                <li>Beräknat antal deltagare (för lokaler).</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Bekräftelse:</strong> En bokning är bindande först när den har bekräftats av <Placeholder>ansvarig</Placeholder> via <Placeholder>kanal, t.ex. e-post</Placeholder>.
                        </li>
                        <li>
                            <strong>Avbokning:</strong> Avbokning ska ske snarast möjligt, senast <Placeholder>ange tidsfrist, t.ex. 24 timmar</Placeholder> före bokad tid, för att ge andra möjlighet att boka.
                        </li>
                    </ul>
                </div>

                <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2">2. Nyckelhantering (om relevant)</h4>
                    <ul className="list-disc list-inside space-y-3">
                        <li>
                            Nycklar till lokalen får endast kvitteras ut av <Placeholder>ange vem, t.ex. styrelsemedlemmar eller särskilt utsedda nyckelansvariga</Placeholder>.
                        </li>
                        <li>Om en medlem lånar nyckel, ska en kvittens skrivas under.</li>
                        <li>
                            Nyckeln ska återlämnas senast <Placeholder>ange tidsfrist</Placeholder> efter användning.
                        </li>
                        <li>
                            Borttappad nyckel ska omedelbart rapporteras till <Placeholder>ansvarig</Placeholder>. Kostnad för cylinderbyte kan debiteras den ansvarige vid oaktsamhet.
                        </li>
                    </ul>
                </div>

                <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2">3. Regler vid användning</h4>
                    <ul className="list-disc list-inside space-y-3">
                        <li>
                            <strong>Ordningsregler:</strong>
                            <ul className="list-['–'] list-inside ml-4 mt-2 space-y-1">
                                <li>Lämna lokalen i det skick du önskar finna den – ren och städad.</li>
                                <li>Allt skräp ska tas med eller sorteras i avsedda kärl.</li>
                                <li>Saker som flyttats ska ställas tillbaka på sin plats.</li>
                                <li>Följ eventuella specifika instruktioner för användning av utrustning.</li>
                                <li><Placeholder>Regler för mat/dryck, alkohol, rökning, husdjur etc. om relevant</Placeholder>.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Säkerhet:</strong>
                            <ul className="list-['–'] list-inside ml-4 mt-2 space-y-1">
                                <li>Se till att dörrar och fönster är låsta vid lämnande av lokalen.</li>
                                <li>Kontrollera att all elutrustning är avstängd (kaffekokare, lampor etc.).</li>
                                <li>Känn till utrymningsvägar och var brandsläckare/första hjälpen-utrustning finns.</li>
                            </ul>
                        </li>
                        <li><strong>Ansvar:</strong> Den som bokar lokalen/utrustningen är ytterst ansvarig för att dessa regler följs under den bokade tiden.</li>
                    </ul>
                </div>

                <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2">4. Felanmälan och skador</h4>
                    <ul className="list-disc list-inside space-y-3">
                        <li>
                            Eventuella fel på lokal eller utrustning, eller skador som uppstår under användning, ska omedelbart rapporteras till <Placeholder>ansvarig person/kontakt, t.ex. Lokalförvaltare eller styrelsen via e-post</Placeholder>.
                        </li>
                        <li>Rapportera även om något saknas.</li>
                        <li>Vid uppsåtlig skadegörelse eller grov oaktsamhet kan den ansvarige debiteras för reparationskostnaden.</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-semibold mb-2">5. Störningar och missbruk</h4>
                    <p>Upprepade brott mot dessa regler eller missbruk av föreningens resurser kan leda till att rätten att boka lokaler/utrustning dras in, och i allvarliga fall kan det hanteras enligt rutin för hantering av konflikter och kränkande särbehandling.</p>
                </div>
            </>
        )
    },
    {
        id: 'etik',
        title: '9. Etiska Riktlinjer och Uppförandekod',
        content: (
            <>
                <h3 className="text-xl font-semibold mb-2">Respekt och inkludering</h3>
                <p className="mb-2">Vi strävar efter en öppen och inkluderande miljö där alla känner sig respekterade oavsett bakgrund, åsikt eller livsstil.</p>
                <p className="mb-4">All form av diskriminering, rasism, sexism eller kränkande särbehandling är oacceptabelt.</p>

                <h3 className="text-xl font-semibold mb-2">Hantering av konflikter och trakasserier</h3>
                <p className="mb-2">Vid upplevelse av eller observation av konflikter/trakasserier uppmanas du att kontakta <Placeholder>[styrelsen/särskild kontaktperson]</Placeholder>.</p>
                <p className="mb-2">Alla ärenden behandlas konfidentiellt och tas på allvar.</p>
                <p className="mb-4">Målet är att lösa situationen på ett konstruktivt sätt.</p>

                <h3 className="text-xl font-semibold mb-2">Representera föreningen</h3>
                <p>När du agerar i föreningens namn förväntas du följa dessa riktlinjer och bidra till en positiv bild av Horizonten.</p>
            </>
        )
    },
    {
        id: 'forandring',
        title: '10. Förändring och Uppdatering av Regler',
        content: (
            <>
                <ul className="list-disc list-inside space-y-2">
                    <li>Dessa rutiner och regler kan revideras och uppdateras vid behov.</li>
                    <li>Förslag på ändringar kan lämnas till <Placeholder>[styrelsen/årsmötet]</Placeholder>.</li>
                    <li>Styrelsen har rätt att göra mindre justeringar, men större förändringar ska godkännas av <GlossaryTooltip termKey="Årsmöte">årsmötet</GlossaryTooltip>.</li>
                    <li>Medlemmar informeras om uppdateringar via <Placeholder>[kommunikationskanaler]</Placeholder>.</li>
                </ul>
            </>
        )
    },
    {
        id: 'bilagor',
        title: '11. Bilagor och Mallar',
        content: (
            <>
                <p className="mb-6">
                    Här hittar du användbara mallar och dokument som kan underlätta styrelsearbetet. Klicka på "Ladda ner" för att spara en kopia.
                </p>
                <div className="space-y-4">
                    <DownloadLink title="Mall för dagordning till årsstämma" />
                    <DownloadLink title="Mall för verksamhetsberättelse" />
                    <DownloadLink title="Mall för protokoll från styrelsemöte" />
                </div>
            </>
        )
    },
    {
        id: 'glossary',
        title: '12. Ordlista',
        content: (
            <>
                <p className="mb-6">Här är förklaringar till några vanliga termer som används inom föreningslivet och i denna handbok.</p>
                <dl className="space-y-4">
                    {GLOSSARY_TERMS.sort((a, b) => a.term.localeCompare(b.term)).map(term => (
                        <div key={term.term}>
                            <dt className="font-semibold text-lg">{term.term}</dt>
                            <dd className="ml-4">{term.definition}</dd>
                        </div>
                    ))}
                </dl>
            </>
        )
    },
    {
        id: 'checklista-ny-styrelse',
        title: '13. Checklista vid ny styrelse',
        content: (
            <>
                <p className="mb-6">
                    Alla som valts in i en styrelse har samma ansvar i styrelsearbetet direkt från att valet skett. Därför är det viktigt att du omgående får tillgång till de dokument som styr föreningens verksamhet. Nedan finns några av de viktigaste handlingarna och momenten som du som ny ledamot behöver.
                </p>
            </>
        )
    },
    {
        id: 'evenemangskalender',
        title: '14. Evenemangskalender', // Will be localized dynamically if possible, but string literals here
        content: (
            <>
                {/* Content for this section will be dynamically rendered in ContentArea */}
            </>
        )
    },
    {
        id: 'medlemsformaner',
        title: translations['sv'].handbookBenefitsTitle, // Using Swedish as base, but will be localized via 't' in component if re-rendered
        content: (
            <>
                {/* This content will be dynamically handled in rendering if needed, but defining structure here for now */}
                {/* We can't access 't' directly here easily for dynamic content inside the object without a function wrapper for sections,
                   but for this specific implementation, we will render it using a component approach or by passing 't' if sections becomes a function.
                   
                   However, to keep it simple and consistent with current architecture where 'sections' is a static array (mostly),
                   we will use a static structure that might not update language instantly without page reload if language changes,
                   unless we make 'sections' a function.
                   
                   Let's make 'sections' a function of 't' in a refactor? Or just use a placeholder here and handle in ContentArea?
                   Actually, let's use the 'translations' import directly for default keys or make sections a function.
                   
                   Wait, 'sections' is currently a const array. To make it dynamic, I should change how it's exported or used.
                   But for this change, I will stick to the pattern.
               */}
                <div className="handbook-benefits-section">
                    {/* We will inject the content logic in ContentArea or just hardcode the structure here assuming 't' is available or use a component */}
                    <p className="mb-6 text-lg">{translations['sv'].handbookBenefitsIntro}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {memberBenefitsData(translations['sv']).map((benefit, index) => (
                            <div key={index} className="bg-white/50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
                                <div className="text-cyan-600 dark:text-cyan-400 mb-4 scale-125">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-slate-800 dark:text-white">{benefit.title}</h3>
                                <p className="text-slate-600 dark:text-slate-300">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )
    }
];

export const NAVIGATION_CATEGORIES: NavigationCategory[] = [
    {
        title: 'Introduktion & Vision',
        sections: sections.filter(s => ['intro', 'foreningen', 'self-care-level-2', 'medlemsformaner'].includes(s.id)),
    },
    {
        title: 'Styrelsens Arbete & Ansvar',
        sections: sections.filter(s => ['styrelsens-arbetsformer', 'medlemskap', 'organisation', 'ekonomi'].includes(s.id)),
    },
    {
        title: 'Verksamhet & Kommunikation',
        sections: sections.filter(s => ['verksamhet', 'kommunikation', 'resurser'].includes(s.id)),
    },
    {
        title: 'Evenemangskalender',
        sections: sections.filter(s => s.id === 'evenemangskalender'),
    },
    {
        title: 'Regler & Verktyg',
        sections: sections.filter(s => ['etik', 'forandring', 'bilagor', 'glossary', 'checklista-ny-styrelse'].includes(s.id)),
    }
];

export const HANDBOOK_SECTIONS: HandbookSection[] = NAVIGATION_CATEGORIES.flatMap(category => category.sections);
