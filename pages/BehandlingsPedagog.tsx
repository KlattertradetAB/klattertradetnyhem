
import React from 'react';
import { Sparkles, BookOpen, Calendar, Activity, ShieldCheck } from 'lucide-react';
import { Page } from '../types';
import TiltedImage from '../components/TiltedImage';
import { useLanguage } from '../contexts/LanguageContext';
import ExploreMoreServices from '../components/ExploreMoreServices';

interface BehandlingsPedagogProps {
  setPage: (page: Page) => void;
}

const BehandlingsPedagog: React.FC<BehandlingsPedagogProps> = ({ setPage }) => {
  const { t } = useLanguage();

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-6 md:py-10 animate-fade-in space-y-20">

      {/* Hero Section */}
      <div className="glass bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500/10 to-transparent pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-400 leading-tight">
              {t.behandlings_title}
            </h1>
            <h2 className="text-xl md:text-3xl text-white/90 font-light italic mb-8">
              {t.behandlings_subtitle}
            </h2>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
              {t.behandlings_intro}
            </p>
          </div>
          <div className="hidden lg:block shrink-0">
            <TiltedImage
              src="/Pic-BIllyteavla.jpeg"
              alt="Behandlingspedagog utbildning"
              className="w-72 h-96"
              grayscale={false}
              blur="8px"
              hoverBlur="0px"
              defaultRotation="3deg"
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-12">
          {/* Om utbildningen */}
          <div className="glass bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Sparkles className="text-orange-400" /> {t.behandlings_about_title}
            </h3>
            <p className="text-white/80 leading-relaxed text-lg">
              {t.behandlings_about_desc}
            </p>
          </div>

          {/* Kursinnehåll */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold px-4 flex items-center gap-3">
              <BookOpen className="text-amber-400" /> {t.behandlings_course_title}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: t.behandlings_block1_title, desc: t.behandlings_block1_desc },
                { title: t.behandlings_block2_title, desc: t.behandlings_block2_desc },
                { title: t.behandlings_block3_title, desc: t.behandlings_block3_desc },
                { title: t.behandlings_block4_title, desc: t.behandlings_block4_desc },
                { title: t.behandlings_block5_title, desc: t.behandlings_block5_desc },
                { title: t.behandlings_block6_title, desc: t.behandlings_block6_desc },
                { title: t.behandlings_block7_title, desc: t.behandlings_block7_desc },
                { title: t.behandlings_block8_title, desc: t.behandlings_block8_desc },
              ].map((block, idx) => (
                <div key={idx} className="glass bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                  <h4 className="font-bold text-orange-300 mb-2">Block {idx + 1}</h4>
                  <h5 className="text-lg font-bold mb-3">{block.title.split(': ')[1]}</h5>
                  <p className="text-sm text-white/60 leading-relaxed">{block.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="glass bg-gradient-to-br from-amber-900/10 to-orange-900/10 border border-white/10 rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
              <Calendar className="text-orange-400" /> {t.behandlings_sidebar_title}
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400">
                  <Activity size={20} />
                </div>
                <div>
                  <p className="text-sm text-white/40 uppercase font-black tracking-widest">{t.behandlings_studietakt_label}</p>
                  <p className="font-bold text-lg">{t.behandlings_studietakt_value}</p>
                  <p className="text-sm text-white/60">{t.behandlings_studietakt_desc}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-sm text-white/40 uppercase font-black tracking-widest">{t.behandlings_behorighet_label}</p>
                  <p className="font-bold text-lg">{t.behandlings_behorighet_value}</p>
                  <p className="text-sm text-white/60">{t.behandlings_behorighet_desc}</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="text-white/80 italic font-light mb-8">
                {t.behandlings_quote}
              </p>
              <button
                onClick={() => setPage(Page.CONTACT)}
                className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all hover:scale-[1.02] shadow-xl shadow-orange-500/20"
              >
                {t.behandlings_apply_btn}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ExploreMoreServices setPage={setPage} currentPages={[Page.BEHANDLINGS_PEDAGOG]} />
    </div>
  );
};

export default BehandlingsPedagog;
