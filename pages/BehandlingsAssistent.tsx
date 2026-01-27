
import React, { useState } from 'react';
import { BookOpen, GraduationCap, ChevronDown, ChevronUp, Users, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { Page } from '../public/types';
import TiltedImage from '../components/TiltedImage';

interface BehandlingsAssistentProps {
  setPage: (page: Page) => void;
}

const BehandlingsAssistent: React.FC<BehandlingsAssistentProps> = ({ setPage }) => {
  const [expandedBlock, setExpandedBlock] = useState<number | null>(null);

  const toggleBlock = (id: number) => {
    if (expandedBlock === id) {
      setExpandedBlock(null);
    } else {
      setExpandedBlock(id);
    }
  };

  // Platshållare för de 8 blocken - Du kan enkelt byta ut texten här senare
  const courseBlocks = [
    {
      id: 1,
      title: "Block 1: Introduktion & Yrkesroll",
      content: "Här läggs grunden för yrkesrollen som behandlingsassistent. Vi går igenom etik, värdegrund och vad det innebär att arbeta professionellt med människor i utsatta situationer. Fokus på bemötande och empatisk förmåga."
    },
    {
      id: 2,
      title: "Block 2: Kommunikation & Samtalsmetodik",
      content: "Detta block fokuserar på praktiska verktyg för kommunikation. Vi tränar på aktivt lyssnande, MI (Motiverande Samtal) och hur man bygger bärande relationer med klienter."
    },
    {
      id: 3,
      title: "Block 3: Psykisk Ohälsa & Diagnoser",
      content: "Grundläggande kunskap om de vanligaste psykiatriska diagnoserna såsom ångest, depression, ADHD och autismspektrumtillstånd. Hur anpassar vi vårt stöd utifrån olika förutsättningar?"
    },
    {
      id: 4,
      title: "Block 4: Beroendelära & Missbruk",
      content: "En djupdykning i beroendets mekanismer, både substansberoende och beteendeberoende. Vi går igenom olika behandlingsmodeller och återfallsprevention."
    },
    {
      id: 5,
      title: "Block 5: Sociallagstiftning & Dokumentation",
      content: "Viktiga lagar som styr arbetet, såsom SoL och LSS. Vi lär oss också vikten av rättssäker dokumentation och hur man skriver genomförandeplaner."
    },
    {
      id: 6,
      title: "Block 6: Konflikthantering & Lågaffektivt Bemötande",
      content: "Metoder för att förebygga och hantera hotfulla situationer. Vi arbetar med lågaffektivt bemötande (LAB) för att skapa trygghet för både personal och klienter."
    },
    {
      id: 7,
      title: "Block 7: Gruppdynamik & Systemteori",
      content: "Hur fungerar grupper och familjesystem? Vi tittar på roller i grupper och hur man kan arbeta med nätverket runt individen."
    },
    {
      id: 8,
      title: "Block 8: Praktisk Tillämpning & Avslutning",
      content: "Summering av utbildningen, fallbeskrivningar (case) och praktiska övningar där vi väver samman kunskapen från alla tidigare block. Diplomering."
    }
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-10 animate-fade-in space-y-16">

      {/* Hero Section */}
      <div className="glass bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-teal-400 leading-tight">
              Behandlingsassistent
            </h1>
            <h2 className="text-xl md:text-3xl text-white/90 font-light italic mb-8">
              En yrkesutbildning för framtidens vård och omsorg
            </h2>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
              Vill du arbeta med människor och göra verklig skillnad? Vår utbildning till behandlingsassistent ger dig den teoretiska grund och de praktiska verktyg du behöver för att stå trygg i mötet med människor i förändring.
            </p>
          </div>
          <div className="hidden lg:block shrink-0">
            <TiltedImage
              src="/hemsida-bild6.jpeg"
              alt="Behandlingsassistent"
              className="w-72 h-96"
              grayscale={false}
              defaultRotation="3deg"
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">

          {/* Intro Text */}
          <div className="glass bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
                <GraduationCap size={28} />
              </div>
              <h3 className="text-2xl font-bold">Om utbildningen</h3>
            </div>
            <p className="text-white/80 leading-relaxed mb-6">
              Vår utbildning är utformad för att ge dig en bred kompetens som efterfrågas på arbetsmarknaden. Vi varvar föreläsningar med grupparbeten, rollspel och reflektion. Målet är att du efter avslutad utbildning ska känna dig redo att arbeta inom exempelvis HVB-hem, stödboende, öppenvård eller socialpsykiatri.
            </p>
          </div>

          {/* Kursinnehåll - Accordion */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold px-2 mb-4 flex items-center gap-2">
              <BookOpen size={24} className="text-emerald-400" /> Kursinnehåll
            </h3>

            <div className="space-y-3">
              {courseBlocks.map((block) => (
                <div
                  key={block.id}
                  className={`glass border rounded-xl overflow-hidden transition-all duration-300 ${expandedBlock === block.id
                    ? 'bg-white/10 border-emerald-500/40 shadow-lg'
                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                    }`}
                >
                  <button
                    onClick={() => toggleBlock(block.id)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                  >
                    <span className={`font-bold text-lg ${expandedBlock === block.id ? 'text-emerald-300' : 'text-white/90'}`}>
                      {block.title}
                    </span>
                    {expandedBlock === block.id ? (
                      <ChevronUp className="text-emerald-400" size={24} />
                    ) : (
                      <ChevronDown className="text-white/50" size={24} />
                    )}
                  </button>

                  {expandedBlock === block.id && (
                    <div className="px-5 pb-6 pt-0 animate-fade-in">
                      <div className="h-px bg-white/10 mb-4 w-full"></div>
                      <p className="text-white/80 leading-relaxed">
                        {block.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="glass bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border border-emerald-500/30 rounded-2xl p-6 sticky top-6">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Calendar size={20} className="text-emerald-400" /> Kursstart & Upplägg
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Users size={18} className="text-emerald-300" />
                </div>
                <div>
                  <p className="text-xs text-white/50 uppercase font-bold">Studietakt</p>
                  <p className="text-white font-medium">Halvfart (50%)</p>
                  <p className="text-sm text-white/70">Möjligt att kombinera med arbete</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} className="text-emerald-300" />
                </div>
                <div>
                  <p className="text-xs text-white/50 uppercase font-bold">Behörighet</p>
                  <p className="text-white font-medium">Grundläggande behörighet</p>
                  <p className="text-sm text-white/70">Intervju kan förekomma</p>
                </div>
              </div>
            </div>

            <div className="bg-black/20 p-4 rounded-xl border border-white/5 mb-6">
              <p className="text-sm text-white/80 italic">
                "En utbildning som inte bara ger kunskap, utan också personlig utveckling."
              </p>
            </div>

            <button
              onClick={() => setPage(Page.CONTACT)}
              className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-bold transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              Ansök nu <ArrowRight size={20} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BehandlingsAssistent;
