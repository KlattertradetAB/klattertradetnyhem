
import React, { useState } from 'react';
import { Smartphone, Users, Calendar, BookOpen, Heart, Sparkles, X, Send, CheckCircle, ArrowRight } from 'lucide-react';
import TiltedImage from '../components/TiltedImage';
import AssociationTab from '../gemenskap/components/AssociationTab';
import { useLanguage } from '../contexts/LanguageContext';

import { Page } from '../types';
import { PAGE_URLS } from '../App';

interface CommunityProps {
  setPage?: (page: Page) => void;
}

const Community: React.FC<CommunityProps> = ({ setPage }) => {
  const { t } = useLanguage();
  const [viewState, setViewState] = useState<'info' | 'form' | 'success'>('info');
  const [formData, setFormData] = useState({
    name: '',
    ssn: '',
    email: '',
    phone: '',
    newsletter: true
  });

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Här skulle logik för att skicka datan till backend/mail finnas
    setViewState('success');
  };

  const handleLoginClick = () => {
    if (setPage) {
      setPage(Page.GEMENSKAP_APP);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-6 md:py-10 animate-fade-in w-full space-y-12">

      {/* Hero Header */}
      <div className="glass bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="max-w-2xl text-center lg:text-left">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-400">
            {t.community_title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light italic mb-8">
            {t.community_subtitle}
          </p>
          <div className="flex justify-center lg:justify-start gap-4 flex-wrap items-center">
            <a
              href={PAGE_URLS[Page.GEMENSKAP_APP]}
              onClick={(e) => { e.preventDefault(); handleLoginClick(); }}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-colors shadow-lg hover:shadow-orange-500/20 flex items-center justify-center"
            >
              {t.community_login_btn}
            </a>
            <div className="px-6 py-2 bg-white/10 rounded-full border border-white/20 text-sm">{t.community_appen_tag}</div>
            <div className="px-6 py-2 bg-white/10 rounded-full border border-white/20 text-sm">{t.community_gemenskap_tag}</div>
            <div className="px-6 py-2 bg-white/10 rounded-full border border-white/20 text-sm">{t.community_självhjälp_tag}</div>
          </div>
        </div>
        <div className="hidden lg:block shrink-0">
          <TiltedImage
            src="/bild-terapistol.jpeg"
            alt={t.nav_gemenskap}
            className="w-64 h-80"
            grayscale={false}
            defaultRotation="3deg"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Appen sektion */}
        <div className="glass bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-orange-500/20 rounded-2xl text-orange-400">
              <Smartphone size={32} />
            </div>
            <h2 className="text-2xl font-bold">{t.community_appen_title}</h2>
          </div>
          <p className="text-white/80 leading-relaxed mb-6">
            {t.community_appen_desc}
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-white/70">
              <Sparkles className="text-amber-400 shrink-0 mt-1" size={18} />
              <span>{t.community_appen_feature1}</span>
            </li>
            <li className="flex items-start gap-3 text-white/70">
              <Sparkles className="text-amber-400 shrink-0 mt-1" size={18} />
              <span>{t.community_appen_feature2}</span>
            </li>
          </ul>
        </div>

        {/* Självhjälpsmöten */}
        <div className="glass bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-red-500/20 rounded-2xl text-red-400">
              <Calendar size={32} />
            </div>
            <h2 className="text-2xl font-bold">{t.community_session_title}</h2>
          </div>
          <p className="text-white/80 leading-relaxed mb-6">
            {t.community_session_desc}
          </p>
          <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
            <p className="text-sm font-bold text-orange-300 mb-1">{t.community_session_when}</p>
            <p className="text-white/70 italic">{t.community_session_time}</p>
          </div>
        </div>
      </div>

      {/* Boken sektion */}
      <div className="glass bg-gradient-to-br from-orange-900/20 to-amber-900/20 border border-orange-500/30 rounded-3xl p-8 md:p-12 transition-all duration-500">

        {/* Book info always shown – clicks navigate to full BookPromotion page */}
        <div className="grid md:grid-cols-3 gap-8 items-center animate-fade-in">
          <div className="md:col-span-1 flex justify-center">
            <TiltedImage
              src="/booklet.jpeg"
              alt={t.book_title}
              className="w-48 h-64"
              defaultRotation="3deg"
            />
          </div>
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-3xl font-bold">{t.book_title_long}</h2>
            <p className="text-lg text-white/80 leading-relaxed">
              {t.book_intro_p1} {t.book_intro_p2}
            </p>
            <div className="flex items-start gap-4 bg-white/5 p-6 rounded-2xl border border-white/10">
              <Heart className="text-red-400 shrink-0" />
              <p className="text-white/90 italic">
                {t.book_app_highlight}
              </p>
            </div>
            <button
              onClick={() => setPage?.(Page.BOOK)}
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-black transition-all hover:scale-105 flex items-center gap-2"
            >
              {t.community_book_order_btn} <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {viewState === 'form' && (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">{t.community_order_form_title}</h2>
              <button
                onClick={() => setViewState('info')}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} className="text-white/70" />
              </button>
            </div>

            <form onSubmit={handleOrderSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/80 ml-1">{t.community_form_name}</label>
                  <input
                    required
                    type="text"
                    placeholder={t.contact_form_name}
                    className="w-full p-4 bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:border-amber-500 transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/80 ml-1">{t.community_form_ssn}</label>
                  <input
                    required
                    type="text"
                    placeholder="ÅÅMMDD-XXXX"
                    className="w-full p-4 bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:border-amber-500 transition-all"
                    value={formData.ssn}
                    onChange={(e) => setFormData({ ...formData, ssn: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/80 ml-1">{t.community_form_email}</label>
                  <input
                    required
                    type="email"
                    placeholder="din@epost.se"
                    className="w-full p-4 bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:border-amber-500 transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/80 ml-1">{t.community_form_phone}</label>
                  <input
                    required
                    type="tel"
                    placeholder="070-XXX XX XX"
                    className="w-full p-4 bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:border-amber-500 transition-all"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="bg-black/20 p-4 rounded-xl border border-white/5 mt-4">
                <label className="flex items-center gap-4 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      className="peer h-6 w-6 cursor-pointer appearance-none rounded-md border border-white/20 bg-black/40 transition-all checked:border-amber-500 checked:bg-amber-500"
                      checked={formData.newsletter}
                      onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                    />
                    <CheckCircle size={16} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black opacity-0 peer-checked:opacity-100 pointer-events-none" strokeWidth={3} />
                  </div>
                  <span className="text-white/90 font-medium group-hover:text-white transition-colors">{t.community_form_newsletter}</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-3 mt-4"
              >
                {t.community_form_submit} <Send size={20} />
              </button>
            </form>
          </div>
        )}

        {viewState === 'success' && (
          <div className="text-center py-10 animate-fade-in flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 shadow-xl">
              <CheckCircle size={40} className="text-emerald-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">{t.community_order_success_title}</h2>
            <p className="text-white/70 max-w-md mx-auto mb-8">
              {t.community_order_success_desc.replace('{email}', formData.email)}
            </p>
            <button
              onClick={() => setViewState('info')}
              className="text-white hover:text-amber-400 font-bold underline transition-colors"
            >
              {t.community_back_btn}
            </button>
          </div>
        )}

      </div>

      {/* Membership / Föreningen Section */}
      <div className="border-t border-white/10 pt-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{t.community_assoc_title.split(' ')[0]} <span className="text-orange-400">{t.community_assoc_title.split(' ').slice(1).join(' ')}</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">{t.community_assoc_subtitle}</p>
        </div>
        <AssociationTab />
      </div>

      {/* Footer CTA */}
      <div className="text-center py-6">
        <h3 className="text-2xl font-bold mb-4">{t.community_cta_title}</h3>
        <p className="text-white/60 mb-6">{t.community_cta_desc}</p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 font-bold transition-all hover:scale-105">App Store</button>
          <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 font-bold transition-all hover:scale-105">Google Play</button>
        </div>
      </div>
    </div>
  );
};

export default Community;
