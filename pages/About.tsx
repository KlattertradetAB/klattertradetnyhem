
import React from 'react';
import { BookOpen, Heart, Users, MapPin, Quote, Sparkles, Anchor, Target, Award, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-6 md:py-10 animate-fade-in space-y-16">

      {/* Intro Header */}
      <div className="glass bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500/10 to-transparent pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-400 leading-tight">
            {t.about_title}
          </h1>
          <h2 className="text-xl md:text-2xl text-white/90 font-light italic mb-8">
            {t.about_subtitle}
          </h2>
          <p className="text-lg text-white/80 leading-relaxed max-w-4xl mx-auto">
            {t.about_intro}
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
            <h3 className="text-2xl font-bold">{t.about_startade}</h3>
          </div>
          <p className="text-white/80 leading-relaxed mb-6">
            <strong>Klätterträdet AB</strong> {t.about_startade_desc}
          </p>
          <div className="flex items-start gap-4 bg-black/20 p-6 rounded-2xl border border-white/5">
            <Quote className="text-orange-400 shrink-0" size={24} />
            <p className="text-white/80 italic text-sm">
              {t.about_quote}
            </p>
          </div>
        </div>

        <div className="glass bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Anchor className="text-amber-400" /> {t.about_verksamhet}
          </h3>
          <p className="text-white/80 leading-relaxed mb-6">
            {t.about_verksamhet_desc}
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-white/90">
              <Award className="text-orange-400" size={20} />
              <span>{t.about_forelasare}</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <Shield className="text-orange-400" size={20} />
              <span>{t.about_kvalitet}</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <Users className="text-orange-400" size={20} />
              <span>{t.about_stod}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metodik & Filosofi Section */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-10">{t.about_metodik}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass bg-white/5 p-8 rounded-2xl border border-white/10">
            <div className="mb-4 bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center text-blue-300">
              <Target size={24} />
            </div>
            <h4 className="text-xl font-bold mb-3">{t.about_processinriktat}</h4>
            <p className="text-white/70 text-sm leading-relaxed">
              {t.about_processinriktat_desc}
            </p>
          </div>

          <div className="glass bg-white/5 p-8 rounded-2xl border border-white/10">
            <div className="mb-4 bg-red-500/20 w-12 h-12 rounded-lg flex items-center justify-center text-red-300">
              <Heart size={24} />
            </div>
            <h4 className="text-xl font-bold mb-3">{t.about_traumamedveten}</h4>
            <p className="text-white/70 text-sm leading-relaxed">
              {t.about_traumamedveten_desc}
            </p>
          </div>

          <div className="glass bg-white/5 p-8 rounded-2xl border border-white/10">
            <div className="mb-4 bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center text-green-300">
              <Users size={24} />
            </div>
            <h4 className="text-xl font-bold mb-3">{t.about_gestalt}</h4>
            <p className="text-white/70 text-sm leading-relaxed">
              {t.about_gestalt_desc}
            </p>
          </div>
        </div>
      </div>

      {/* Practical Details */}
      <div className="glass bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 text-center mt-12">
        <h3 className="text-2xl font-bold mb-6">{t.about_besok}</h3>
        <p className="text-white/80 max-w-2xl mx-auto mb-8">
          {t.about_besok_desc}
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
