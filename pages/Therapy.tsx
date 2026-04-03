
import React, { useState, useRef, useEffect } from 'react';
import { Heart, Sparkles, Activity, ShieldCheck, CheckCircle, Target, Users, Send, MessageSquare } from 'lucide-react';
import { Page } from '../types';
import TiltedImage from '../components/TiltedImage';
import { useLanguage } from '../contexts/LanguageContext';
import ExploreMoreServices from '../components/ExploreMoreServices';

type FormViewState = 'splash' | 'form' | 'confirmation';

interface TherapyProps {
  setPage: (page: Page) => void;
}

const Therapy: React.FC<TherapyProps> = ({ setPage }) => {
  const { t } = useLanguage();
  const [formView, setFormView] = useState<FormViewState>(() => {
    const historyState = window.history.state;
    return historyState?.showForm ? 'form' : 'splash';
  });
  const [formData, setFormData] = useState({
    tidigare_erfarenhet: '',
    uppskattade: '',
    tanke_delar: '',
    utmaningar: [] as string[],
    annan_utmaning_text: '',
    mal: '',
    annat_mal_text: '',
    terapeut_kon: 'inte_viktigt',
    motesform: '',
    namn: '',
    epost: '',
    telefon: ''
  });

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const historyState = window.history.state;
    if (historyState?.showForm && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, []);

  const problems = [
    t.therapy_cat_anxiety, t.therapy_cat_phobia, t.therapy_cat_shame, t.therapy_cat_childhood,
    t.therapy_cat_grief, t.therapy_cat_codependency, t.therapy_cat_adultchild, t.therapy_cat_stress,
    t.therapy_cat_burnout, t.therapy_cat_ptsd, t.therapy_cat_cptsd
  ];

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData(prev => ({ ...prev, utmaningar: [...prev.utmaningar, value] }));
    } else {
      setFormData(prev => ({ ...prev, utmaningar: prev.utmaningar.filter(u => u !== value) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Save to Supabase
    try {
      const { supabase } = await import('../gemenskap/services/supabase');
      const { error } = await (supabase.from('therapy_matchmaking') as any).insert({
        previously_sought_therapy: formData.tidigare_erfarenhet,
        appreciated_aspects: formData.uppskattade,
        thoughts_on_experience: formData.tanke_delar,
        challenges: formData.utmaningar,
        other_challenge_text: formData.annan_utmaning_text,
        goal: formData.mal,
        other_goal_text: formData.annat_mal_text,
        therapist_gender_pref: formData.terapeut_kon,
        meeting_form: formData.motesform,
        applicant_name: formData.namn,
        email: formData.epost,
        phone: formData.telefon
      });
      if (error) console.error('Supabase therapy request error:', error);
    } catch (err) {
      console.error('Failed to save therapy request to Supabase:', err);
    }

    const recipient = 'billy@klattertradet.se';
    const subject = t.therapy_seeking_title;

    let body = `${t.therapy_confirm_desc}\n\n`;
    body += `${t.therapy_section1}\n`;
    body += `   - ${t.therapy_prev_exp_q} ${formData.tidigare_erfarenhet || '?'}\n`;
    if (formData.uppskattade) body += `   - ${t.therapy_appreciated_q}: ${formData.uppskattade}\n`;
    body += "\n";
    body += `${t.therapy_section2}\n`;
    const displayUtmaningar = formData.utmaningar.map(u => {
      const match = [
        { label: t.therapy_cat_stress, value: 'Stress' },
        { label: t.therapy_cat_anxiety, value: 'Ångest' },
        { label: t.therapy_cat_depression, value: 'Nedstämdhet' },
        { label: t.therapy_cat_relationships, value: 'Relationer' },
        { label: t.therapy_cat_grief, value: 'Sorg' },
        { label: t.therapy_cat_other, value: 'Annan' }
      ].find(opt => opt.value === u);
      return match ? match.label : u;
    });
    body += `   - ${t.therapy_section2}: ${displayUtmaningar.join(', ')}\n`;
    body += "\n";
    body += `${t.therapy_section3}\n`;
    body += `   - ${t.therapy_pref_meeting}: ${formData.motesform}\n`;
    body += "\n";
    body += `   - ${t.therapy_name_label}: ${formData.namn}\n`;
    body += `   - ${t.therapy_email_label}: ${formData.epost}\n`;
    if (formData.telefon) body += `   - ${t.contact_phone_label}: ${formData.telefon}\n`;

    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormView('confirmation');
    setTimeout(() => { window.location.href = mailtoLink; }, 1000);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-6 md:py-10 animate-fade-in space-y-20">

      {/* Hero Section */}
      <div className="glass bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-500/10 to-transparent pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-200 to-orange-400 leading-tight">
              {t.therapy_title}
            </h1>
            <h2 className="text-xl md:text-3xl text-white/90 font-light italic mb-8">
              {t.therapy_subtitle}
            </h2>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
              {t.therapy_intro}
            </p>
          </div>
          <div className="hidden lg:block shrink-0">
            <TiltedImage
              src="/pic-enskildterapi.jpeg"
              alt={t.nav_enskild_terapi}
              className="w-72 h-96"
              grayscale={false}
              blur="8px"
              hoverBlur="0px"
              defaultRotation="-3deg"
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Metodik Sektion */}
        <div className="space-y-8">
          <div className="glass bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-500/20 rounded-2xl text-red-400">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-bold">{t.therapy_gestalt_title}</h3>
            </div>
            <p className="text-white/80 leading-relaxed mb-6">
              {t.therapy_gestalt_desc1}
            </p>
            <p className="text-white/80 leading-relaxed">
              {t.therapy_gestalt_desc2}
            </p>
          </div>

          <div className="glass bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-amber-500/20 rounded-2xl text-amber-400">
                <Sparkles size={32} />
              </div>
              <h3 className="text-2xl font-bold">{t.therapy_patterns_title}</h3>
            </div>
            <p className="text-white/80 leading-relaxed mb-6">
              {t.therapy_patterns_desc}
            </p>
            <div className="flex items-start gap-4 bg-black/20 p-6 rounded-2xl border border-white/5">
              <ShieldCheck className="text-orange-400 shrink-0 mt-1" />
              <p className="text-white/90 italic">
                {t.therapy_contract_note}
              </p>
            </div>
          </div>
        </div>

        {/* Problembilder Sektion */}
        <div className="glass bg-gradient-to-br from-red-900/10 to-orange-900/10 border border-white/10 rounded-3xl p-8 md:p-12 h-fit">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-red-500/20 rounded-2xl text-red-400">
              <Heart size={32} />
            </div>
            <h3 className="text-2xl font-bold">{t.therapy_problems_title}</h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {problems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/5 border border-white/5 p-4 rounded-xl hover:bg-white/10 hover:border-white/10 transition-all group"
              >
                <CheckCircle className="text-red-400/50 group-hover:text-red-400 transition-colors shrink-0" size={18} />
                <span className="text-white/80 font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 space-y-4">
            <div className="flex items-center gap-3 text-white/70">
              <Users size={20} className="text-orange-300" />
              <p className="text-sm">{t.therapy_supervision}</p>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <Activity size={20} className="text-orange-300" />
              <p className="text-sm">{t.therapy_meet_you}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy Snippet */}
      <div className="glass bg-white/5 border border-white/10 rounded-3xl p-10 text-center max-w-4xl mx-auto">
        <p className="text-2xl font-light text-white/90 leading-relaxed italic">
          {t.therapy_quote}
        </p>
      </div>

      {/* Interaktiv Sök Terapi Sektion */}
      <div className="max-w-4xl mx-auto w-full">
        {formView === 'splash' && (
          <button
            onClick={() => setFormView('form')}
            className="w-full glass bg-white/10 backdrop-blur-xl border border-white/20 p-12 rounded-[40px] text-center hover:bg-white/15 transition-all group shadow-2xl animate-fade-in"
          >
            <div className="mb-6 flex justify-center">
              <div className="p-5 bg-orange-500/20 rounded-full text-orange-400 group-hover:scale-110 transition-transform duration-500">
                <Heart size={40} />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">{t.therapy_find_cta}</h2>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">{t.therapy_find_sub}</p>
            <span className="inline-block px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-bold transition-all hover:scale-105">
              {t.therapy_find_btn}
            </span>
          </button>
        )}

        {formView === 'form' && (
          <div ref={formRef} className="glass bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl animate-fade-in">
            <div className="text-center mb-10">
              <MessageSquare className="mx-auto text-orange-400 mb-4" size={40} />
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.therapy_seeking_title}</h1>
              <p className="text-white/70">{t.therapy_seeking_sub}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <fieldset className="p-6 border border-white/10 rounded-2xl bg-white/5">
                <legend className="text-lg font-bold text-orange-300 px-3 mb-4">{t.therapy_section1}</legend>
                <div className="space-y-4 mb-6">
                  <p className="font-medium text-white/90">{t.therapy_prev_exp_q}</p>
                  {[t.therapy_prev_exp_yes, t.therapy_prev_exp_no, t.therapy_prev_exp_started].map(opt => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="exp" value={opt} onChange={(e) => setFormData({ ...formData, tidigare_erfarenhet: e.target.value })} className="w-4 h-4 text-orange-500 bg-white/10 border-white/20" />
                      <span className="text-white/80 group-hover:text-white transition-colors">{opt}</span>
                    </label>
                  ))}
                </div>
                <div className="space-y-4">
                  <label className="block font-medium text-white/90">{t.therapy_appreciated_q}</label>
                  <textarea rows={2} maxLength={200} className="w-full p-4 bg-black/30 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-orange-500" value={formData.uppskattade} onChange={(e) => setFormData({ ...formData, uppskattade: e.target.value })} />
                </div>
              </fieldset>

              <fieldset className="p-6 border border-white/10 rounded-2xl bg-white/5">
                <legend className="text-lg font-bold text-orange-300 px-3 mb-4">{t.therapy_section2}</legend>
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {[
                    { label: t.therapy_cat_stress, value: 'Stress' },
                    { label: t.therapy_cat_anxiety, value: 'Ångest' },
                    { label: t.therapy_cat_depression, value: 'Nedstämdhet' },
                    { label: t.therapy_cat_relationships, value: 'Relationer' },
                    { label: t.therapy_cat_grief, value: 'Sorg' },
                    { label: t.therapy_cat_other, value: 'Annan' }
                  ].map(u => (
                    <label key={u.value} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" value={u.value} onChange={handleCheckboxChange} className="w-4 h-4 rounded text-orange-500 bg-white/10 border-white/20" />
                      <span className="text-white/80">{u.label}</span>
                    </label>
                  ))}
                </div>
                <textarea rows={1} placeholder={t.therapy_describe_more} className="w-full p-4 bg-black/30 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-orange-500" value={formData.annan_utmaning_text} onChange={(e) => setFormData({ ...formData, annan_utmaning_text: e.target.value })} />
              </fieldset>

              <fieldset className="p-6 border border-white/10 rounded-2xl bg-white/5">
                <legend className="text-lg font-bold text-orange-300 px-3 mb-4">{t.therapy_section3}</legend>
                <div className="mb-6">
                  <p className="font-medium text-white/90 mb-3">{t.therapy_pref_meeting}</p>
                  <div className="space-y-2">
                    {[t.therapy_physical, t.therapy_digital].map((opt) => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="motesform"
                          value={opt}
                          onChange={(e) => setFormData({ ...formData, motesform: e.target.value })}
                          className="w-4 h-4 text-orange-500 bg-white/10 border-white/20"
                        />
                        <span className="text-white/80 group-hover:text-white transition-colors">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">{t.therapy_name_label}</label>
                    <input type="text" required className="w-full p-3 bg-black/30 border border-white/10 rounded-xl text-white" value={formData.namn} onChange={(e) => setFormData({ ...formData, namn: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">{t.therapy_email_label}</label>
                    <input type="email" required className="w-full p-3 bg-black/30 border border-white/10 rounded-xl text-white" value={formData.epost} onChange={(e) => setFormData({ ...formData, epost: e.target.value })} />
                  </div>
                </div>
              </fieldset>

              <button type="submit" className="w-full py-5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl shadow-xl hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3">
                {t.therapy_submit_btn} <Send size={20} />
              </button>
            </form>
          </div>
        )}

        {formView === 'confirmation' && (
          <div className="glass bg-white/10 backdrop-blur-xl border border-white/20 p-12 rounded-[40px] text-center shadow-2xl animate-fade-in">
            <CheckCircle className="mx-auto text-green-400 mb-6" size={64} />
            <h2 className="text-3xl font-bold text-white mb-4">{t.therapy_confirm_title}</h2>
            <p className="text-lg text-white/80 mb-6">{t.therapy_confirm_desc}</p>
            <p className="text-white/60">{t.therapy_confirm_note}</p>
            <button onClick={() => setFormView('splash')} className="mt-8 text-white hover:text-amber-400 underline font-bold">{t.therapy_back}</button>
          </div>
        )}
      </div>
      <ExploreMoreServices setPage={setPage} currentPages={[Page.THERAPY]} />
    </div>
  );
};

export default Therapy;
