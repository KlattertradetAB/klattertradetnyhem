
import React from 'react';
import { Sparkles, Target, Users, BookOpen, Star, ShieldCheck, ArrowRight } from 'lucide-react';
import { Page } from '../types';

interface GestaltTrainingProps {
  setPage: (page: Page) => void;
}

const GestaltTraining: React.FC<GestaltTrainingProps> = ({ setPage }) => {
  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-6 md:py-10 animate-fade-in space-y-16">

      {/* Hero Section */}
      <div className="glass bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-400 leading-tight">
            Utbildning i Gestaltterapi
          </h1>
          <h2 className="text-xl md:text-3xl text-white/90 font-light italic mb-8">
            Fördjupa din närvaro och professionella skicklighet
          </h2>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            Vår gestaltutbildning vänder sig till dig som vill arbeta processinriktat och relationellt. Vi fokuserar på kontakten, medvetenheten och det personliga ansvaret i det terapeutiska mötet.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Om utbildningen */}
          <div className="glass bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                <Target size={28} />
              </div>
              <h3 className="text-2xl font-bold">Här, Nu och Hur</h3>
            </div>
            <p className="text-white/80 leading-relaxed mb-6">
              Gestaltterapi är en upplevelsebaserad metod. I utbildningen lär du dig att använda dig själv som instrument och att arbeta med det som sker i rummet just nu. Vi går bortom intellektualiseringar och fokuserar på den direkta upplevelsen och hur den formar våra livsmönster.
            </p>
            <p className="text-white/80 leading-relaxed">
              Utbildningen ger dig verktyg att identifiera oavslutade gestalter och stödja klienten i att nå fullbordan och mognad. Vi varvar teori med praktiska övningar, handledning och eget terapiarbete.
            </p>
          </div>

          {/* Moduler */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold px-2">Utbildningens kärnområden</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Kontaktformler", desc: "Förståelse för hur vi möter eller undviker kontakt med omvärlden." },
                { title: "Figur & Grund", desc: "Lär dig se vad som träder fram som mest relevant i stunden." },
                { title: "Kroppslig Medvetenhet", desc: "Lyssna på kroppens signaler som bärare av sanning." },
                { title: "Den terapeutiska alliansen", desc: "Att bygga en trygg och utmanande relation." }
              ].map((m, i) => (
                <div key={i} className="glass bg-white/5 border border-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors">
                  <h4 className="font-bold text-blue-300 mb-2">{m.title}</h4>
                  <p className="text-sm text-white/70">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="glass bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border border-blue-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Star className="text-yellow-400" size={24} />
              <h3 className="text-xl font-bold">Vem bör gå?</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Utbildningen är skräddarsydd för socionomer, psykologer, behandlingspedagoger och chefer som vill fördjupa sitt ledarskap och sin samtalsmetodik.
            </p>
            <div className="space-y-3 bg-black/30 p-4 rounded-xl border border-white/5">
              <div className="flex gap-3 text-xs text-white/70">
                <ShieldCheck className="text-blue-400 shrink-0" size={16} />
                <span>Minst 2 års yrkeserfarenhet inom människovårdande yrken.</span>
              </div>
              <div className="flex gap-3 text-xs text-white/70">
                <ShieldCheck className="text-blue-400 shrink-0" size={16} />
                <span>Vilja att arbeta med sin egen personliga utveckling.</span>
              </div>
            </div>
          </div>

          <div className="glass bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">Intresseanmälan</h3>
            <p className="text-sm text-white/60 mb-6">Vi startar nya grupper kontinuerligt. Kontakta oss för kursstart och kursplan.</p>
            <button
              onClick={() => setPage(Page.CONTACT)}
              className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-bold transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              Kontakta oss <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestaltTraining;
