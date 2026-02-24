
import React from 'react';
import { Download, FileText, Book, Sparkles, FileSpreadsheet, Heart } from 'lucide-react';
import { Page } from '../types';

interface MaterialItem {
  title: string;
  desc: string;
  icon?: React.ElementType;
  image?: string;
  color: string;
  size: string;
  action?: () => any;
  page?: Page;
}

interface DownloadsProps {
  setPage: (page: Page) => void;
}

const Downloads: React.FC<DownloadsProps> = ({ setPage }) => {
  const materials: { category: string; items: MaterialItem[] }[] = [
    {
      category: "E-böcker",
      items: [
        {
          title: "Myndighetsinducerat trauma, från subjekt till objekt",
          desc: "En unik djupdykning i systemets påverkan på individen.",
          image: "/booklet.jpeg",
          color: "text-amber-400",
          size: "Läs Online",
          action: () => window.open('/ebooks/myndighetsinducerat-trauma/index.html', '_blank')
        },
        {
          title: "Gestaltterapi i vardagen",
          desc: "Praktiska verktyg för att använda gestaltmetodik i dina nära relationer.",
          icon: Book,
          color: "text-blue-400",
          size: "1.8 MB"
        },
        {
          title: "Narcissism, ett grundläggande attributionsfel",
          desc: "Varför dömer vi andra hårdare än oss själva? En genomgång av hur våra hjärnor snedvrider verkligheten.",
          icon: Book,
          color: "text-purple-400",
          size: "Läs Online",
          action: () => window.open('https://pers-ju1m232pf-billys-projects-8ad18619.vercel.app/', '_blank')
        }
      ]
    },
    {
      category: "Arbetsmaterial & Mallar",
      items: [
        {
          title: "Självreglerings-schema (Veckoplanering)",
          desc: "Ett verktyg för att kartlägga ditt nervsystems reaktioner under veckan.",
          icon: FileSpreadsheet,
          color: "text-emerald-400",
          size: "0.5 MB"
        },
        {
          title: "Checklista inför myndighetsmöten",
          desc: "Gör din röst hörd. En guide för att förbereda dig mentalt och praktiskt.",
          icon: FileText,
          color: "text-orange-400",
          size: "0.3 MB"
        },
        {
          title: "Gestaltterapi: arbetsblad i filosofisk grund",
          desc: "Interaktivt arbetsblad för att utforska existentialism och fenomenologi.",
          icon: Sparkles,
          color: "text-indigo-400",
          size: "Online",
          page: Page.GESTALT_WORKSHEET
        }
      ]
    },
    {
      category: "Övningar & Verktyg",
      items: [
        {
          title: "Grounding-övningar för hemmabruk",
          desc: "Fem enkla övningar för att komma tillbaka till nuet när stressen tar över.",
          icon: Heart,
          color: "text-red-400",
          size: "1.2 MB"
        },
        {
          title: "Self-care modellen: Arbetsblad",
          desc: "Fördjupat arbetsblad för att arbeta med dina grundsår på egen hand.",
          icon: Sparkles,
          color: "text-purple-400",
          size: "0.9 MB"
        }
      ]
    }
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-10 animate-fade-in space-y-12">

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-500">
          Nedladdningar
        </h1>
        <p className="text-lg text-white/70">
          Här har vi samlat resurser, e-böcker och arbetsmaterial som hjälper dig i din personliga eller professionella utveckling.
        </p>
      </div>

      <div className="space-y-16">
        {materials.map((section, sIdx) => (
          <div key={sIdx} className="space-y-6">
            <h2 className="text-2xl font-bold border-l-4 border-emerald-500 pl-4 text-white/90">
              {section.category}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {section.items.map((item: any, iIdx) => (
                <div
                  key={iIdx}
                  className="glass bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-300 group flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    {item.image ? (
                      <div className="w-16 h-20 rounded-lg overflow-hidden border border-white/10 shadow-lg shrink-0 group-hover:scale-105 transition-transform">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className={`p-3 bg-white/5 rounded-2xl ${item.color} group-hover:scale-110 transition-transform`}>
                        {item.icon && <item.icon size={28} />}
                      </div>
                    )}
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full border border-white/5">
                      {item.size === "Online" ? "WEB APP" : `PDF | ${item.size}`}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (item.page) {
                        setPage(item.page);
                      } else if (item.action) {
                        item.action();
                      } else {
                        alert(`Startar nedladdning av: ${item.title}`);
                      }
                    }}
                    className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                  >
                    {item.page || item.action ? <Sparkles size={18} /> : <Download size={18} />}
                    {item.page ? (section.category === "E-böcker" ? "Öppna e-bok" : "Öppna arbetsblad") : item.action ? "Läs online" : "Ladda ner material"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="glass bg-emerald-900/10 border border-emerald-500/20 rounded-3xl p-8 text-center max-w-2xl mx-auto mt-12">
        <Sparkles className="mx-auto text-emerald-400 mb-4" />
        <p className="text-sm text-white/70 italic">
          Vi fyller på med nytt material kontinuerligt. Saknar du något specifikt? Kontakta oss gärna med önskemål.
        </p>
      </div>
    </div>
  );
};

export default Downloads;
