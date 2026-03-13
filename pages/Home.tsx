import React, { useState, useEffect, useCallback } from 'react';
import { Page } from '../types';
import { PAGE_URLS } from '../App';
import { ArrowRight, BookOpen, Users, Shield, Heart, Anchor, Sparkles, Calendar, FileText, Star, ChevronRight, ChevronLeft } from 'lucide-react';
import Newsletter from '../components/Newsletter';
import PDFViewer from '../components/PDFViewer';
import TiltedImage from '../components/TiltedImage';
import Experts from '../gemenskap/components/Experts';
import { useLanguage } from '../contexts/LanguageContext';

const SWUpdateIndicator: React.FC = () => {
  const { t } = useLanguage();
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setUpdateAvailable(true);
              }
            };
          }
        };
      });
    }
  }, []);

  if (!updateAvailable) return null;

  return (
    <div
      onClick={() => window.location.reload()}
      className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 px-4 py-1.5 rounded-full cursor-pointer hover:bg-orange-500/20 transition-all animate-pulse"
    >
      <div className="relative">
        <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-ping absolute inset-0"></div>
        <div className="w-2.5 h-2.5 bg-orange-500 rounded-full relative"></div>
      </div>
      <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">
        {t.home_update_available}
      </span>
    </div>
  );
};

interface HomeProps {
  setPage: (page: Page, state?: any) => void;
}

const HomeComponent: React.FC<HomeProps> = ({ setPage }) => {
  const { t } = useLanguage();
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      title: t.home_carousel_title1,
      description: t.home_carousel_desc1,
      pdfUrl: "/Attributionsfel-narcissism.pdf"
    },
    {
      title: t.home_carousel_title2,
      description: t.home_carousel_desc2,
      pdfUrl: "/Polarisering-av-personlighetsstörningar .pdf"
    }
  ];

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsAnimating(false);
    }, 500);
  }, [isAnimating, slides.length]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsAnimating(false);
    }, 500);
  }, [isAnimating, slides.length]);

  useEffect(() => {
    if (isPdfOpen) return;
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide, isPdfOpen]);

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-2 md:py-4 animate-fade-in w-full space-y-12">
      <PDFViewer
        isOpen={isPdfOpen}
        onClose={() => setIsPdfOpen(false)}
        pdfUrl={slides[currentSlide].pdfUrl}
        title={slides[currentSlide].title}
      />

      {/* Hero Section */}
      <div className="glass bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 md:py-6 md:px-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-10 items-center">
          <div className="space-y-4 md:space-y-6 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-black leading-[0.95] drop-shadow-lg tracking-tight mx-auto md:mx-0 max-w-[12ch]">
              Klätterträdet <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-zinc-500">
                & Horizonten
              </span>
            </h1>
            <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-md mx-auto md:mx-0 font-light">
              {t.home_hero_subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto">
              <a
                href={PAGE_URLS[Page.CHAT]}
                onClick={(e) => { e.preventDefault(); setPage(Page.CHAT); }}
                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-3.5 bg-white text-slate-900 hover:bg-white/90 rounded-xl font-bold transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-xl shadow-white/10"
              >
                {t.home_hero_cta_utbildning} <ArrowRight size={18} />
              </a>
              <a
                href={PAGE_URLS[Page.CONTACT]}
                onClick={(e) => { e.preventDefault(); setPage(Page.CONTACT); }}
                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                {t.home_hero_cta_boka} <Calendar size={18} />
              </a>
            </div>
          </div>
          <div className="flex justify-center items-center w-full">
            <div className="relative w-48 h-48 md:w-56 md:h-64 p-4">
              <TiltedImage
                src="/logo2.png"
                alt="Klätterträdet Logo"
                className="w-full h-full"
                imgClassName="object-contain p-2 md:p-4"
                defaultRotation="-8deg"
                grayscale={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Post Carousel (Mirrored from Community) */}
      <div className="w-full space-y-3 animate-in slide-in-from-bottom-6 duration-700 relative group/carousel">
        <div className="flex justify-between items-center px-2">
          <h2 className="text-xl md:text-2xl font-black text-white italic tracking-tight flex items-center gap-2">
            <Star className="text-orange-500" size={20} />
            {t.home_weekly}
          </h2>
          {/* Service Worker Update Indicator */}
          <SWUpdateIndicator />
        </div>

        <div className="relative group/carousel">
          {/* Side Navigation Arrows - Wide Liquid Glass Style */}
          <button
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            aria-label="Föregående slide"
            className="absolute -left-1 md:-left-2 top-[92%] -translate-y-1/2 z-20 px-4 md:px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-2xl text-white transition-all backdrop-blur-2xl md:opacity-0 md:group-hover/carousel:opacity-100 opacity-100 hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)] md:group-hover/carousel:-translate-x-2"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            aria-label="Nästa slide"
            className="absolute -right-1 md:-right-2 top-[92%] -translate-y-1/2 z-20 px-4 md:px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-2xl text-white transition-all backdrop-blur-2xl md:opacity-0 md:group-hover/carousel:opacity-100 opacity-100 hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)] md:group-hover/carousel:translate-x-2"
          >
            <ChevronRight size={20} />
          </button>

          <div
            onClick={() => setIsPdfOpen(true)}
            className={`bg-gradient-to-br from-slate-900 to-slate-800 border border-orange-500/30 p-4 md:p-6 rounded-[1.5rem] group hover:border-orange-500 transition-all duration-500 cursor-pointer shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative overflow-hidden ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
          >
            <div className="absolute top-1/2 -translate-y-1/2 right-[15%] p-4 opacity-20 group-hover:opacity-40 transition-opacity blur-[2px]">
              <img src="/logo2.png" alt="Klätterträdet Logo" className="w-20 h-20 md:w-28 md:h-28 object-contain rotate-12" />
            </div>

            <div className="relative z-10">
              <span className="text-[10px] bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full font-black uppercase tracking-[0.2em] mb-2 inline-block">
                {t.home_weekly_label}
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white mb-1 group-hover:text-orange-400 transition-colors tracking-tight">
                {slides[currentSlide].title}
              </h4>
              <p className="text-slate-400 text-xs md:text-sm mb-3 max-w-2xl font-light leading-relaxed line-clamp-1 md:line-clamp-none">
                {slides[currentSlide].description}
              </p>
              <a
                href={PAGE_URLS[Page.BLOG]}
                onClick={(e) => { e.stopPropagation(); e.preventDefault(); setPage(Page.BLOG); }}
                className="flex items-center gap-2 text-orange-400 text-[10px] md:text-xs font-black group-hover:gap-3 transition-all hover:text-white"
              >
                {t.home_blog_read_more} <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Gå till slide ${i + 1}`}
              className={`h-1.5 transition-all rounded-full ${currentSlide === i ? 'w-8 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'w-1.5 bg-white/20'}`}
            />
          ))}
        </div>
      </div>

      {/* Book Promotion Section */}
      <div className="w-full glass bg-white/5 border border-white/10 rounded-[2.5rem] p-6 md:p-10 flex flex-col md:flex-row items-center gap-10 group hover:border-amber-500/20 transition-all min-h-[280px]">
        <div className="md:w-1/4 flex justify-center">
          <TiltedImage
            src="/booklet.jpeg"
            alt="Myndighetsinducerat trauma bok"
            className="w-40 h-56"
            defaultRotation="-3deg"
            grayscale={false}
          />
        </div>
        <div className="md:w-3/4 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">{t.home_book_title}</h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            {t.home_book_desc}
          </p>
          <a
            href={PAGE_URLS[Page.BOOK]}
            onClick={(e) => { e.preventDefault(); setPage(Page.BOOK); }}
            className="flex items-center gap-2 text-amber-500 font-bold hover:underline transition-all group-hover:translate-x-2 text-sm md:text-base"
          >
            {t.home_book_link} <ArrowRight size={20} />
          </a>
        </div>
      </div>

      <div className="w-full glass bg-gradient-to-r from-amber-500/20 to-orange-600/20 border border-white/10 rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden group min-h-[320px] flex items-center justify-center">
        <div className="relative z-10 max-w-2xl text-center space-y-4">
          <div className="inline-block px-3 py-1 bg-amber-500/20 rounded-full border border-amber-500/30 text-amber-500 text-[10px] font-black uppercase tracking-widest">
            {t.home_mit_label}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">{t.home_mit_title}</h2>
          <p className="text-sm md:text-base text-amber-100/80 leading-relaxed">
            {t.home_mit_desc}
          </p>
          <a
            href={PAGE_URLS[Page.CHAT]}
            onClick={(e) => { e.preventDefault(); setPage(Page.CHAT); }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-black transition-all hover:scale-105 shadow-2xl shadow-amber-500/20 text-sm md:text-base"
          >
            {t.home_mit_link} <ArrowRight size={20} />
          </a>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        {[
          { src: "/hemsida-bild2.jpeg", title: t.home_philosophy_empati, text: t.home_philosophy_empati_desc, rot: "-2deg" },
          { src: "/hemsida-bild3.jpeg", title: t.home_philosophy_trygghet, text: t.home_philosophy_trygghet_desc, rot: "1deg" },
          { src: "/hemsida-bild4.jpeg", title: t.home_philosophy_insikt, text: t.home_philosophy_insikt_desc, rot: "-1deg" }
        ].map((item, i) => (
          <div key={i} className="glass bg-white/5 border border-white/10 p-5 md:p-6 rounded-3xl hover:bg-white/10 transition-colors group flex flex-col items-center text-center">
            <TiltedImage
              src={item.src}
              alt={item.title}
              className="w-32 h-32 mb-4"
              defaultRotation={item.rot}
            />
            <h3 className="text-base md:text-lg font-bold text-white mb-1.5 md:mb-2">{item.title}</h3>
            <p className="text-zinc-400 leading-relaxed text-[11px] md:text-xs">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Tjänster Section */}
      <div className="space-y-6 md:space-y-8">
        <div className="text-center space-y-1">
          <h2 className="text-2xl md:text-3xl font-bold text-white">{t.home_tjanster_title}</h2>
          <p className="text-zinc-400 text-xs md:text-sm max-w-2xl mx-auto">{t.home_tjanster_subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="glass bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-[1.5rem] p-5 md:p-8 flex flex-col justify-between group">
            <div className="space-y-3 md:space-y-4">
              <TiltedImage
                src="/bild-ljusbord.jpeg"
                alt="Enskild Terapi"
                className="w-full h-40"
                defaultRotation="-2deg"
                grayscale={false}
              />
              <h3 className="text-xl md:text-2xl font-bold text-white">{t.home_enskild_terapi}</h3>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                {t.home_enskild_terapi_desc}
              </p>
            </div>
            <a
              href={PAGE_URLS[Page.THERAPY]}
              onClick={(e) => { e.preventDefault(); setPage(Page.THERAPY); }}
              className="mt-4 md:mt-6 flex items-center gap-2 text-white font-bold hover:text-red-400 transition-colors text-xs md:text-sm"
            >
              {t.home_therapy_read_more} <ArrowRight size={18} />
            </a>
          </div>

          <div className="glass bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-[1.5rem] p-5 md:p-8 flex flex-col justify-between group">
            <div className="space-y-3 md:space-y-4">
              <TiltedImage
                src="/bild-terapistol.jpeg"
                alt="Parterapi"
                className="w-full h-40"
                defaultRotation="2deg"
                grayscale={false}
              />
              <h3 className="text-xl md:text-2xl font-bold text-white">{t.home_grupp_terapi}</h3>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                {t.home_grupp_terapi_desc}
              </p>
            </div>
            <a
              href={PAGE_URLS[Page.GROUP_THERAPY]}
              onClick={(e) => { e.preventDefault(); setPage(Page.GROUP_THERAPY); }}
              className="mt-4 md:mt-6 flex items-center gap-2 text-white font-bold hover:text-indigo-400 transition-colors text-xs md:text-sm"
            >
              {t.home_grupp_terapi_link} <ArrowRight size={18} />
            </a>
          </div>

          <div className="glass bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-[1.5rem] p-5 md:p-8 flex flex-col justify-between group">
            <div className="space-y-3 md:space-y-4">
              <TiltedImage
                src="/Pic-BIllyteavla.jpeg"
                alt="Behandlingspedagog"
                className="w-full h-56"
                defaultRotation="-1deg"
              />
              <h3 className="text-xl md:text-2xl font-bold text-white">{t.home_behandlingspedagog}</h3>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                {t.home_behandlingspedagog_desc}
              </p>
            </div>
            <a
              href={PAGE_URLS[Page.BEHANDLINGS_PEDAGOG]}
              onClick={(e) => { e.preventDefault(); setPage(Page.BEHANDLINGS_PEDAGOG); }}
              className="mt-4 md:mt-6 flex items-center gap-2 text-white font-bold hover:text-amber-400 transition-colors text-xs md:text-sm"
            >
              {t.home_behandlingspedagog_link} <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>




      {/* Horizonten Gemenskap Section */}
      <div className="space-y-16 md:space-y-24 py-12">
        <div className="text-center space-y-6 mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tight leading-[1.1]">
            {t.home_gemenskap_title}
          </h2>
          <p className="text-xl md:text-2xl text-amber-500/90 font-bold italic tracking-wide">
            {t.home_gemenskap_subtitle}
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-transparent mx-auto rounded-full"></div>
          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed font-light">
            {t.home_gemenskap_desc}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mx-auto">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 bg-orange-500/10 rounded-full border border-orange-500/20 text-orange-500 text-xs font-black uppercase tracking-widest">
              {t.home_gemenskap_mer_an}
            </div>
            <h3 className="text-3xl font-black text-white italic">{t.home_gemenskap_platform}</h3>
            <p className="text-zinc-400 text-lg leading-relaxed font-light">
              {t.home_gemenskap_platform_desc}
            </p>
          </div>
          <div className="relative group flex justify-center">
            <div className="absolute -inset-4 bg-orange-500/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <TiltedImage
              src="/logo2.png"
              alt="Horizonten Gemenskap"
              className="w-64 h-64 md:w-80 md:h-80"
              imgClassName="object-contain p-8"
              defaultRotation="5deg"
              grayscale={false}
            />
          </div>
        </div>

        <div className="space-y-12">
          <div className="text-center space-y-2">
            <h3 className="text-3xl font-black text-white italic tracking-tight">{t.home_find_here_title}</h3>
            <p className="text-zinc-500">{t.home_find_here_sub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
            {[
              { title: t.home_feature_gemenskap, text: t.home_feature_gemenskap_desc, icon: <Users className="text-orange-500" size={32} /> },
              { title: t.home_feature_verktyg, text: t.home_feature_verktyg_desc, icon: <Sparkles className="text-amber-400" size={32} /> },
              { title: t.home_feature_mojligheter, text: t.home_feature_mojligheter_desc, icon: <Calendar className="text-white" size={32} /> }
            ].map((item, i) => (
              <div key={i} className="glass bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all group hover:-translate-y-2">
                <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                <p className="text-zinc-400 leading-relaxed text-sm font-light">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-[3rem] p-10 md:p-16 mx-auto relative overflow-hidden group">
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/10 transition-colors"></div>
          <div className="relative z-10 space-y-12 text-center">
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-white italic tracking-tight">{t.home_samarbete_title}</h3>
              <p className="text-zinc-400 text-lg font-light">{t.home_samarbete_subtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                { name: t.home_partner_klattertradet, text: t.home_partner_klattertradet_desc, icon: <Heart className="text-red-400" size={24} /> },
                { name: t.home_partner_socialkraft, text: t.home_partner_socialkraft_desc, icon: <Shield className="text-blue-400" size={24} /> },
                { name: t.home_partner_twisted, text: t.home_partner_twisted_desc, icon: <Sparkles className="text-purple-400" size={24} /> }
              ].map((partner, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    {partner.icon}
                    <h4 className="text-xl font-black text-white tracking-tight">{partner.name}</h4>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed font-light">{partner.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vårt Specialistteam Section */}
        <div className="space-y-24">
          <div className="text-center space-y-6 mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tight">
              {t.home_specialist_title}
            </h2>
            <p className="text-xl text-amber-500 font-bold italic">
              {t.home_specialist_subtitle}
            </p>
            <div className="space-y-6 text-zinc-400 text-lg md:text-xl leading-relaxed font-light text-left md:text-center">
              <p>
                {t.home_specialist_intro1}
              </p>
              <p>
                {t.home_specialist_intro2}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mx-auto">
            <div className="space-y-6">
              <h3 className="text-3xl font-black text-white italic">{t.home_specialist_selection_title}</h3>
              <p className="text-zinc-400 text-lg leading-relaxed font-light">
                {t.home_specialist_selection_desc1}
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed font-light">
                {t.home_specialist_selection_desc2}
              </p>
            </div>
            <div className="relative p-8 glass bg-white/5 border border-white/10 rounded-[2.5rem] space-y-4">
              {[
                { label: t.home_specialist_tag1, desc: t.home_specialist_tag1_desc },
                { label: t.home_specialist_tag2, desc: t.home_specialist_tag2_desc },
                { label: t.home_specialist_tag3, desc: t.home_specialist_tag3_desc },
                { label: t.home_specialist_tag4, desc: t.home_specialist_tag4_desc },
                { label: t.home_specialist_tag5, desc: t.home_specialist_tag5_desc }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 w-1.5 h-1.5 bg-orange-500 rounded-full shrink-0"></div>
                  <div>
                    <p className="text-white font-bold text-sm">{item.label}</p>
                    <p className="text-zinc-500 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center space-y-12 mx-auto">
            <Experts />

            <div className="pt-8 space-y-8">
              <div className="space-y-2">
                <p className="text-2xl font-black text-white italic">{t.home_valkommen}</p>
                <p className="text-orange-500 font-bold uppercase tracking-widest text-xs">{t.home_gratis_medlem}</p>
              </div>

              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href={PAGE_URLS[Page.CONTACT]}
                  onClick={(e) => { e.preventDefault(); setPage(Page.CONTACT); }}
                  className="px-10 py-5 bg-white text-slate-900 hover:bg-white/90 rounded-2xl font-black transition-all hover:scale-105 flex items-center justify-center gap-3 shadow-2xl shadow-white/10 uppercase tracking-widest text-xs"
                >
                  {t.home_ta_kontakt} <ArrowRight size={20} />
                </a>
                <a
                  href={PAGE_URLS[Page.THERAPY]}
                  onClick={(e) => { e.preventDefault(); setPage(Page.THERAPY, { showForm: true }); }}
                  className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/20 rounded-2xl text-white font-black transition-all hover:scale-105 flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                >
                  {t.home_hitta_terapeut}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Newsletter />
    </div>
  );
};

export default HomeComponent;
