import type { Course, ResourceFile } from './types';

const behandlingsassistent: Course = {
    id: 'behandlingsassistent',
    iconName: 'UsersIcon',
    title: 'Behandlingsassistent',
    subtitle: '12stegs-inriktning',
    description: `Detta är en processinriktad grundutbildning för dig som vill jobba med människor i utsatta situationer där fokus är förändring. Utbildningen ger kunskaper för att främst jobba med ungdomar och vuxna med missbruk/beroende och annan tillhörande problematik. Den är också bra för dig som vill lära dig mer om dig själv och/eller för dig som vill eller är nyfiken på att jobba med människor i förändring.`,
    keyBenefits: [
        {
            iconName: 'SparklesIcon',
            title: 'Djup Personlig Insikt',
            description: 'Utbildningen är processinriktad, vilket innebär att du inte bara lär dig teorier utan även genomgår en egen personlig utvecklingsresa.'
        },
        {
            iconName: 'UsersIcon',
            title: 'Praktiska Färdigheter',
            description: 'Få konkreta verktyg som MI, KBT och 12-stegsmetodik för att professionellt kunna möta och hjälpa människor i utsatta situationer.'
        },
        {
            iconName: 'BookOpenIcon',
            title: 'Bred Kompetensbas',
            description: 'Lär dig om allt från beroendesjukdomen och familjesystem till lagstiftning och våld i nära relationer för en holistisk förståelse.'
        }
    ],
    details: [
        { iconName: 'CalendarIcon', title: 'Varaktighet', content: '1 år (8 träffar á 2.5 dagar)' },
        { iconName: 'MapPinIcon', title: 'Plats', content: '2 fysiska träffar i Gävle varje år, resterande utbildning går helt online' },
        { iconName: 'HomeIcon', title: 'Praktik', content: '80 timmar (obligatorisk)' }
    ],
    themes: [
        "Beroendesjukdomen", "Tolvstegsprogrammet", "MI (Motiverande samtal)", "Återfallsprevention",
        "Återfallsinventering", "Tillfrisknande", "Familjesystemet", "Socialtjänstlagen och etik",
        "Feedback", "Grupp och kommunikation", "Våld i nära relationer", "Känslor",
        "Andlighet", "Beroendepersonligheten", "KBT"
    ],
    blocks: [
        {
            blockNumber: 1, date: '25 – 27 maj 2022', title: 'Beroendesjukdomen',
            bookReview: { title: 'Beroendepersonligheten', author: 'Craig Nakken' },
            topics: ['Människan som struktur', 'Risk/skyddsfaktorer för ett beroende', 'Beroendeutveckling', 'Beroendepersonligheten', 'Konsekvenser kopplat till utveckling', 'Den moraliska kampen', 'Motivationsfaser i behandling']
        },
        {
            blockNumber: 2, date: '15 – 17 juni 2022', title: 'Familjesystemet',
            bookReview: { title: 'Flodhästen i vardagsrummet', author: 'Tommy Hellsten' },
            topics: ['Anknytningsteori', 'Den kliniska situationen', 'Behov och samspel', 'Det sårade inre barnet', 'Familjen som system', 'Regler och kommunikation', 'Familjeroller']
        },
        {
            blockNumber: 3, date: '17 – 19 augusti 2022', title: 'Socialtjänstlagen och MI',
            bookReview: { title: 'N/A', author: 'N/A' },
            topics: ['Sekretess', 'Journalföring', 'Ansvarsfördelning', 'Socialtjänstlagen', 'MI (motiverande intervju) del 1']
        },
        {
            blockNumber: 4, date: '14 – 16 september 2022', title: 'Känslor och relationer',
            bookReview: { title: 'Sorgbearbetning', author: 'John W James & Russell Friedman' },
            topics: ['Tompkin\'s affektteori', 'Affekter kopplat till kroppen', 'Skam', 'Rädsla', 'Medberoende', 'Relationer']
        },
        {
            blockNumber: 5, date: '9 – 11 november 2022', title: 'Grupp och kommunikation',
            bookReview: { title: 'Hitta din moraliska kompass', author: 'Craig Nakken' },
            topics: ['Grupputveckling i faser', 'Grupprocesser i beroendebehandling', 'Individuell tillväxt', 'Transaktionsanalys', 'Psykologiskt manus', 'Kommunikationsregler', 'Feedback']
        },
        {
            blockNumber: 6, date: '7 – 9 december 2022', title: 'Tolvstegsprogrammet',
            bookReview: { title: 'Stegen vi tog', author: 'Joe Mc Q' },
            topics: ['Programmets historia', 'Professionalisering av tolvstegsprogrammet', 'Steg 1 – 12 kopplat till terapi/behandlingsarbete', 'Polaritetstänk', 'Maktlöshet, tro & tillfrisknande', 'Motivationsfaser']
        },
        {
            blockNumber: 7, date: '8 – 10 februari 2023', title: 'Våld i nära relationer',
            bookReview: { title: 'Pojken som kallades det', author: 'Dave Pelzer' },
            topics: ['Relationsvåld', 'Drivkrafter', 'Vanmakts teorin', 'Social inlärningsteori', 'Trauma', 'Orsaks och avsiktstänk']
        },
        {
            blockNumber: 8, date: '5 – 7 april 2023', title: 'KBT och MI',
            bookReview: { title: 'KBT i utveckling', author: 'Anna Kåver' },
            topics: ['Inlärningspsykologi', 'Kognitiv teori', 'Funktionell beteendeanalys', 'Kognitiv omstrukturering', 'Relevant akutmedicin', 'MI (motiverande intervju) del 2']
        }
    ],
    literature: [
        { title: "Beroendepersonligheten", author: "Craig Nakken" }, { title: "Flodhästen i vardagsrummet", author: "Tommy Hellsten" },
        { title: "Sorgbearbetning", author: "John W James & Russell Friedman" }, { title: "Hitta din moraliska kompass", author: "Craig Nakken" },
        { title: "Stegen vi tog", author: "Joe Mc Q" }, { title: "KBT i utveckling", author: "Anna Kåver" }
    ],
    miscInfo: [
        { iconName: 'CoffeeIcon', title: 'Ingår', content: 'Fika och kaffe under kursdagar.' },
        { iconName: 'HelpCircleIcon', title: 'Ingår Ej', content: 'Kost, logi och studielitteratur.' }
    ]
};

const gestaltterapeut: Course = {
    id: 'gestalt-traumaterapeut',
    iconName: 'SparklesIcon',
    title: 'Gestalt- & Traumaterapeut',
    subtitle: '2-årig processutbildning',
    description: `Sedan början av nittiotalet har Samverkangruppen utbildat beroendeterapeuter och Gestalt och Trauma terapeuter. Det är en processutbildning där all kunskap integreras på ett djupare plan, så att du inte bara lär dig en teoretisk kunskap eller metod. En människa som arbetar med gestaltterapi jobbar här och nu med det som kommer upp i mötet mellan terapeut och klient.`,
    keyBenefits: [
        {
            iconName: 'SparklesIcon',
            title: 'Terapeutisk Självkännedom',
            description: 'Genom en djupgående processutbildning integrerar du kunskapen personligt, vilket är grunden för att kunna hjälpa andra.'
        },
        {
            iconName: 'UsersIcon',
            title: 'Klientfokuserad Praktik',
            description: 'Få verklig erfarenhet genom att arbeta med egna klienter under handledning, vilket bygger trygghet och yrkeskompetens.'
        },
        {
            iconName: 'BookIcon',
            title: 'Holistisk Metodik',
            description: 'Lär dig arbeta med "här och nu" genom Gestaltfilosofi, drömarbete och traumabehandling för en komplett terapeutisk verktygslåda.'
        }
    ],
    details: [
        { iconName: 'CalendarIcon', title: 'Varaktighet', content: '2 år' },
        { iconName: 'UsersIcon', title: 'Målgrupp', content: 'Behandlingsassistenter, pedagoger, socialarbetare, beroendeterapeuter m.fl. Gärna med grundkurs i addiktologi.' },
        { iconName: 'HomeIcon', title: 'Upplägg', content: '4 workshops (2.5 dagar) och 4 halvdagar (Zoom) per år. År 2 inkluderar klientarbete.' }
    ],
    themes: [
        "Gestaltfilosofi", "Traumabehandling", "Grupputveckling", "Drömarbete", "Vuxenbarnproblematik",
        "Existentialism", "Fenomenologi", "Kontaktavbrott", "Etik", "Kommunikation", "Gruppledarskap"
    ],
    blocks: [
        {
            blockNumber: 1,
            title: 'Basår (År 1)',
            topics: [
                'Fokus på grupputveckling, gestaltfilosofi och metodik.',
                'De mänskliga sinnestillstånden och hur man kan ”arbeta” med drömmar.',
                'Olika typer av trauma och vuxenbarnproblematik.',
                'Historiken bakom gestaltfilosofin, existentialism och fenomenologi.',
                'Praktisk träning där du både övar på moment och agerar klient.',
                'Stor del egenutveckling varvat med teoretisk kunskap.'
            ]
        },
        {
            blockNumber: 2,
            title: 'Fördjupningsår (År 2)',
            topics: [
                'Individuell utvärdering för att gå vidare till år 2.',
                'Arbete med egna klienter under handledning.',
                'Praktisk övning på elever som börjar basåret.',
                'Fördjupning i de ämnen som gruppen tycker är viktiga.',
                'Fokus på kommunikation och att leda grupper.',
                'Uppgradering av certifikat för certifierade addiktologer.'
            ]
        }
    ],
    literature: [
        { title: "Kurslitteratur", author: "En del kurslitteratur kommer att ingå och meddelas vid kursstart." }
    ],
    miscInfo: []
};

const myndighetsTrauma: Course = {
    id: 'myndighetsinducerat-trauma',
    iconName: 'ShieldIcon',
    title: 'Myndighetsinducerat Trauma',
    subtitle: 'Introkurs till dialog & familjeombud',
    description: `Detta är en unik introduktionskurs för dig som vill förstå, identifiera och arbeta med det komplexa fenomenet myndighetsinducerat trauma. Kursen är avgörande för att belysa hur systematiska brister och felaktiga myndighetsbeslut kan orsaka djupa psykologiska skador hos individer och familjer. Du får inte bara teoretisk kunskap om traumats neurologiska och psykologiska mekanismer, utan även praktiska verktyg för att agera som ett **dialog- och familjeombud** – en stödperson som hjälper drabbade att navigera i systemet, föra sin talan och synliggöra sina upplevelser. Kursen legitimerar dig att använda våra unika utredningsmallar för att dokumentera och analysera fall, vilket gör dig till en viktig resurs för de som annars står maktlösa.`,
    keyBenefits: [
        {
            iconName: 'BookOpenIcon',
            title: 'Unik & Banbrytande Kunskap',
            description: 'Få insikt i ett komplext och ofta förbisett trauma för att kunna identifiera och förstå de drabbades situation på djupet.'
        },
        {
            iconName: 'ShieldIcon',
            title: 'Konkreta Handlingsverktyg',
            description: 'Bli ett licensierat dialog- och familjeombud med tillgång till unika utredningsmallar för att effektivt kunna hjälpa och dokumentera.'
        },
        {
            iconName: 'UsersIcon',
            title: 'Gör Verklig Skillnad',
            description: 'Ge en röst åt de maktlösa och hjälp individer och familjer att navigera i systemet och synliggöra sina upplevelser för att uppnå rättvisa.'
        }
    ],
    details: [
        { iconName: 'CalendarIcon', title: 'Varaktighet', content: '3 dagar online & 3 dagar fysiskt' },
        { iconName: 'MapPinIcon', title: 'Plats', content: 'Online via Zoom samt fysiska träffar i Gävle' },
        { iconName: 'UsersIcon', title: 'Målgrupp', content: 'Yrkesverksamma inom socialt arbete, juridik, vård och omsorg, samt privatpersoner som möter eller vill hjälpa drabbade.' }
    ],
    themes: [
        "Definition & Avgränsning",
        "Processen i Sju Steg",
        "Relationell Neurobiologi",
        "Anknytningsteori",
        "Autonoma Nervsystemet",
        "Institutionellt Svek",
        "Dialogombudets Roll",
        "Utredningsmetodik"
    ],
    blocks: [
        {
            blockNumber: 1,
            title: 'Introduktion & Definition',
            topics: [
                'Vad är Myndighetsinducerat Trauma?',
                'Definition, avgränsning och varför ämnet är viktigt.',
                'Den samhälleliga kontexten och "blindheten".',
                'Introduktion till rollen som dialog- och familjeombud.'
            ]
        },
        {
            blockNumber: 2,
            title: 'Processen i Sju Steg: Från Misstänkliggörande till Kollaps',
            topics: [
                'Steg 1-2: Misstänkliggörande och förlusten av tolkningsföreträde.',
                'Steg 3-4: Relationsundergrävning och systematisk desorientering (institutionell gaslighting).',
                'Steg 5: Tystnadens zon och autonom kollaps (freeze-respons).',
                'Steg 6-7: När bandet fryser till is och det institutionella våldet.',
                'Analys av fallstudier och verkliga exempel.'
            ]
        },
        {
            blockNumber: 3,
            title: 'Teoretisk Fördjupning & Praktiska Verktyg',
            topics: [
                'Neurobiologi: Anknytningsteori och hur relationer påverkar hjärnan.',
                'Det autonoma nervsystemet och den dorsala vagusnervens roll i trauma.',
                'Skillnaden mellan myndighetsinducerat trauma och institutionellt svek.',
                'Introduktion till utredningsmallar och metodik för att kartlägga trauma.',
                'Etiska riktlinjer och förhållningssätt för ett familjeombud.'
            ]
        }
    ],
    literature: [
        { title: "Utredningsmaterial: Myndighetsinducerat Trauma", author: "Horizonten & Klätterträdet" },
        { title: "Kurskompendium", author: "Tillhandahålls vid kursstart" }
    ],
    miscInfo: [
        { iconName: 'CoffeeIcon', title: 'Ingår', content: 'Fika och kaffe under de fysiska kursdagarna i Gävle.' },
        { iconName: 'HelpCircleIcon', title: 'Ingår Ej', content: 'Kost, logi och eventuell resa till Gävle.' }
    ]
};


export const courses: Record<string, Course> = {
    'behandlingsassistent': behandlingsassistent,
    'gestalt-traumaterapeut': gestaltterapeut,
    'myndighetsinducerat-trauma': myndighetsTrauma
};

export const resourceFiles: ResourceFile[] = [
  { name: 'Kursplan_Behandlingsassistent.pdf', path: '/Kursplan_Behandlingsassistent.pdf' },
  { name: 'Anmälningsblankett.pdf', path: '/Anmälningsblankett.pdf' },
  { name: 'Allmänna_Villkor.pdf', path: '/Allmänna_Villkor.pdf' },
];