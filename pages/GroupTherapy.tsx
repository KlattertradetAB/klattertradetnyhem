
import React from 'react';
import { Users, Heart, Users2, Shield, Sparkles, CheckCircle, ArrowRight, Target } from 'lucide-react';
import { Page } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import TiltedImage from '../components/TiltedImage';
import ExploreMoreServices from '../components/ExploreMoreServices';

interface GroupTherapyProps {
  setPage: (page: Page) => void;
}

const GroupTherapy: React.FC<GroupTherapyProps> = ({ setPage }) => {
  const { t } = useLanguage();
  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-6 md:py-10 animate-fade-in space-y-16">

      {/* Hero Section */}
      <div className="glass bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-400 leading-tight">
              {t.group_therapy_title}
            </h1>
            <h2 className="text-xl md:text-3xl text-white/90 font-light italic mb-8">
              {t.group_therapy_subtitle}
            </h2>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
              {t.group_therapy_intro}
            </p>
          </div>
          <div className="hidden lg:block shrink-0">
            <TiltedImage
              src="/Pic-gruppterapi.jpeg"
              alt={t.group_therapy_grupp_title}
              className="w-64 h-80"
              grayscale={false}
              defaultRotation="-3deg"
              blur="8px"
              hoverBlur="0px"
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">

        {/* Parterapi Section */}
        <div className="glass bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-purple-500/20 rounded-2xl text-purple-400">
              <Heart size={32} />
            </div>
            <h3 className="text-2xl font-bold">{t.group_therapy_par_title}</h3>
          </div>
          <p className="text-white/80 leading-relaxed mb-6">
            {t.group_therapy_par_desc}
          </p>
          <ul className="space-y-4 mb-8">
            {(t.group_therapy_par_items as string[]).map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-white/70 text-sm">
                <CheckCircle size={16} className="text-purple-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Gruppterapi Section */}
        <div className="glass bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 hover:bg-white/10 transition-all duration-300">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-indigo-500/20 rounded-2xl text-indigo-400">
                  <Users2 size={32} />
                </div>
                <h3 className="text-2xl font-bold">{t.group_therapy_grupp_title}</h3>
              </div>
              <p className="text-white/80 leading-relaxed mb-6">
                {t.group_therapy_grupp_desc}
              </p>
              <div className="bg-black/20 p-6 rounded-2xl border border-white/5 space-y-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="text-indigo-400 mt-1" size={20} />
                  <p className="text-sm text-white/80 italic">{t.group_therapy_grupp_quote}</p>
                </div>
                <p className="text-xs text-white/50">
                  {t.group_therapy_grupp_note}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Why Group/Couple Section */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-indigo-300">
            <Shield size={32} />
          </div>
          <h4 className="font-bold">{t.group_therapy_safety_title}</h4>
          <p className="text-sm text-white/60">{t.group_therapy_safety_desc}</p>
        </div>
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-indigo-300">
            <Users size={32} />
          </div>
          <h4 className="font-bold">{t.group_therapy_growth_title}</h4>
          <p className="text-sm text-white/60">{t.group_therapy_growth_desc}</p>
        </div>
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-indigo-300">
            <Target size={32} />
          </div>
          <h4 className="font-bold">{t.group_therapy_target_title}</h4>
          <p className="text-sm text-white/60">{t.group_therapy_target_desc}</p>
        </div>
      </div>

      {/* CTA */}
      <div className="glass bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-white/20 rounded-3xl p-10 text-center max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">{t.group_therapy_cta_title}</h3>
        <p className="text-white/70 mb-8">{t.group_therapy_cta_desc}</p>
        <button
          onClick={() => setPage(Page.CONTACT)}
          className="px-10 py-4 bg-white text-indigo-900 rounded-full font-bold hover:scale-105 transition-all shadow-xl flex items-center gap-2 mx-auto"
        >
          {t.group_therapy_cta_btn} <ArrowRight size={20} />
        </button>
      </div>

      <ExploreMoreServices setPage={setPage} currentPages={[Page.GROUP_THERAPY]} />
    </div>
  );
};

export default GroupTherapy;
