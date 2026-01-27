
import React from 'react';
import { BookOpen, Heart, Users, MapPin, Quote, Sparkles, Anchor, Target, Award, Shield } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-10 animate-fade-in space-y-16">
      
      {/* Intro Header */}
      <div className="glass bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500/10 to-transparent pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-400 leading-tight">
            Om Klätterträdet & Horizonten
          </h1>
          <h2 className="text-xl md:text-2xl text-white/90 font-light italic mb-8">
            Ett kunskapscenter för mänsklig utveckling
          </h2>
          <p className="text-lg text-white/80 leading-relaxed max-w-4xl mx-auto">
            Vår vision har alltid varit att skapa rum för utveckling, återhämtning och utbildning – för människor i förändring. Vi förenar djup terapeutisk kompetens med specialistutbildningar för morgondagens behandlare.
          </p>
        </div>
      </div>

      {/* Vår Historia & Grundare */}
      <div className="grid md:grid-cols-2 gap-10">
        <div className="glass bg-gradient-to-br from-orange-900/20 to-black/40 border border-orange-500/20 rounded-3xl p-8 md:p-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-orange-500/20 rounded-xl text-orange-400">
              <Sparkles size={32} />
            </div>
            <h3 className="text-2xl font-bold">Vi startade 2020</h3>
          </div>
          <p className="text-white/80 leading-relaxed mb-6">
            <strong>Klätterträdet AB</strong> grundades av Billy Ljungberg 2020 och har sin bas i Gävle. Med lång erfarenhet som terapeut, handledare och utbildare har vi under åren fått förmånen att möta både individer och verksamheter i behov av stöd, riktning och fördjupning.
          </p>
          <div className="flex items-start gap-4 bg-black/20 p-6 rounded-2xl border border-white/5">
            <Quote className="text-orange-400 shrink-0" size={24} />
            <p className="text-white/80 italic text-sm">
              "Vi startade med en övertygelse om att kvalitet och närvaro är nyckeln till verklig förändring."
            </p>
          </div>
        </div>
        
        <div className="glass bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
             <Anchor className="text-amber-400" /> Vår verksamhet
          </h3>
          <p className="text-white/80 leading-relaxed mb-6">
            Vi erbjuder utbildningar till <strong>behandlingspedagog</strong> och <strong>socialpedagog</strong>, samt handledning och kvalificerad terapi inom beroendeproblematik, trauma och relationsarbete.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-white/90">
              <Award className="text-orange-400" size={20} />
              <span>Handplockade föreläsare från hela Sverige</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <Shield className="text-orange-400" size={20} />
              <span>Kvalitetssäkrad metodik & traumaförståelse</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <Users className="text-orange-400" size={20} />
              <span>Stöd för både individer och organisationer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metodik & Filosofi Section */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-10">Vår Metodik & Filosofi</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass bg-white/5 p-8 rounded-2xl border border-white/10">
            <div className="mb-4 bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center text-blue-300">
              <Target size={24} />
            </div>
            <h4 className="text-xl font-bold mb-3">Processinriktat Lärande</h4>
            <p className="text-white/70 text-sm leading-relaxed">
              Kunskap måste landa i kroppen. Våra utbildningar bygger på kvalitet, närvaro och mångårig erfarenhet där vi varvar teori med praktisk implementation.
            </p>
          </div>
          
          <div className="glass bg-white/5 p-8 rounded-2xl border border-white/10">
            <div className="mb-4 bg-red-500/20 w-12 h-12 rounded-lg flex items-center justify-center text-red-300">
              <Heart size={24} />
            </div>
            <h4 className="text-xl font-bold mb-3">Traumamedveten Omsorg</h4>
            <p className="text-white/70 text-sm leading-relaxed">
              Vi utgår från neurobiologi och traumateori (TMO) för att förstå hur man reglerar nervsystem som fastnat i kamp, flykt eller frys.
            </p>
          </div>

          <div className="glass bg-white/5 p-8 rounded-2xl border border-white/10">
            <div className="mb-4 bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center text-green-300">
              <Users size={24} />
            </div>
            <h4 className="text-xl font-bold mb-3">Gestaltterapeutisk Grund</h4>
            <p className="text-white/70 text-sm leading-relaxed">
              Vi fokuserar på "här och nu". Kontakt, medvetenhet och ansvar är nyckelord i vår syn på människan som en helhet.
            </p>
          </div>
        </div>
      </div>

      {/* Practical Details */}
      <div className="glass bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 text-center mt-12">
        <h3 className="text-2xl font-bold mb-6">Besök oss i Gävle</h3>
        <p className="text-white/80 max-w-2xl mx-auto mb-8">
          Vi bedriver vår verksamhet i ljusa lokaler centralt i Gävle. Här möts vi för utbildningsträffar, terapi och fördjupade samtal.
        </p>
        
        <div className="inline-flex flex-col md:flex-row gap-6 md:gap-12 justify-center items-center text-white/90 font-medium">
          <div className="flex items-center gap-3">
            <MapPin className="text-orange-400" />
            <span>Gullregnsgatan 9A, 802 56 Gävle</span>
          </div>
          <div className="hidden md:block w-1.5 h-1.5 bg-white/30 rounded-full"></div>
          <div className="flex items-center gap-3">
             <BookOpen className="text-orange-400" size={20} />
             <span>info@klattertradet.se</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
