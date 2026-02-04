import React, { useState, useEffect, useCallback } from 'react';
import { Page } from '../types';
import { ArrowRight, BookOpen, Users, Shield, Heart, Anchor, Sparkles, Calendar, FileText, Star, ChevronRight, ChevronLeft } from 'lucide-react';
import Newsletter from '../components/Newsletter';
import PDFViewer from '../components/PDFViewer';
import TiltedImage from '../components/TiltedImage';
import Experts from '../gemenskap/components/Experts';

const SWUpdateIndicator: React.FC = () => {
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
        Uppdatering tillgänglig – Klicka för att hämta
      </span>
    </div>
  );
};

interface HomeProps {
  setPage: (page: Page, state?: any) => void;
}

const HomeComponent: React.FC<HomeProps> = ({ setPage }) => {
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      title: "Ett grundläggande attributionsfel",
      description: "Varför dömer vi andra hårdare än oss själva? En genomgång av hur våra hjärnor snedvrider verkligheten i sociala relationer.",
      pdfUrl: "/Attributionsfel-narcissism.pdf"
    },
    {
      title: "Polarisering och personlighetsstörningar",
      description: "En djupanalys av hur dömande och polarisering påverkar våra relationer och vår självbild i ett kliniskt sammanhang.",
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
        <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-black leading-[0.95] drop-shadow-lg tracking-tight max-w-[12ch]">
              Klätterträdet <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-zinc-500">
                & Horizonten
              </span>
            </h1>
            <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-md font-light">
              Specialistutbildning, terapi och handledning med fokus på traumamedvetenhet och personlig mognad. Välkommen till vår gemenskap.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => setPage(Page.CHAT)}
                className="px-6 md:px-8 py-2.5 bg-white text-slate-900 hover:bg-white/90 rounded-xl font-bold transition-all hover:scale-105 flex items-center gap-2 shadow-xl shadow-white/10"
              >
                Våra Utbildningar <ArrowRight size={18} />
              </button>
              <button
                onClick={() => setPage(Page.CONTACT)}
                className="px-6 md:px-8 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold transition-all hover:scale-105 flex items-center gap-2"
              >
                Boka tid <Calendar size={18} />
              </button>
            </div>
          </div>
          <div className="hidden md:flex justify-center items-center">
            <div className="relative w-56 h-64 p-4">
              <TiltedImage
                src="/logo2.png"
                alt="Klätterträdet Logo"
                className="w-full h-full"
                imgClassName="object-contain p-4"
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
            Nytt från oss
          </h2>
          {/* Service Worker Update Indicator */}
          <SWUpdateIndicator />
        </div>

        <div className="relative group/carousel">
          {/* Side Navigation Arrows - Wide Liquid Glass Style */}
          <button
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            aria-label="Föregående slide"
            className="absolute -left-2 top-[92%] -translate-y-1/2 z-20 px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-2xl text-white transition-all backdrop-blur-2xl md:opacity-0 md:group-hover/carousel:opacity-100 opacity-100 hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)] md:group-hover/carousel:-translate-x-2"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            aria-label="Nästa slide"
            className="absolute -right-2 top-[92%] -translate-y-1/2 z-20 px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-2xl text-white transition-all backdrop-blur-2xl md:opacity-0 md:group-hover/carousel:opacity-100 opacity-100 hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)] md:group-hover/carousel:translate-x-2"
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
                Veckans Djupdykning
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white mb-1 group-hover:text-orange-400 transition-colors tracking-tight">
                {slides[currentSlide].title}
              </h4>
              <p className="text-slate-400 text-xs md:text-sm mb-3 max-w-2xl font-light leading-relaxed line-clamp-1 md:line-clamp-none">
                {slides[currentSlide].description}
              </p>
              <button
                onClick={(e) => { e.stopPropagation(); setPage(Page.BLOG); }}
                className="flex items-center gap-2 text-orange-400 text-[10px] md:text-xs font-black group-hover:gap-3 transition-all hover:text-white"
              >
                Läs de nya blogginläggen <ChevronRight size={16} />
              </button>
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
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">Vår nya bok: Myndighetsinducerat trauma</h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            En unik djupdykning i systemets påverkan på individen och vägen mot läkning.
            Innehåller praktiska verktyg och fallstudier för både drabbade och professionella.
          </p>
          <button
            onClick={() => setPage(Page.BOOK)}
            className="flex items-center gap-2 text-amber-500 font-bold hover:underline transition-all group-hover:translate-x-2 text-sm md:text-base"
          >
            Läs mer om boken <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <div className="w-full glass bg-gradient-to-r from-amber-500/20 to-orange-600/20 border border-white/10 rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden group min-h-[320px] flex items-center justify-center">
        <div className="relative z-10 max-w-2xl text-center space-y-4">
          <div className="inline-block px-3 py-1 bg-amber-500/20 rounded-full border border-amber-500/30 text-amber-500 text-[10px] font-black uppercase tracking-widest">
            Aktuell Specialistutbildning
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">Myndighetsinducerat Trauma (MiT)</h2>
          <p className="text-sm md:text-base text-amber-100/80 leading-relaxed">
            Vår nya specialistutbildning ger dig verktygen att förstå, bemöta och stötta klienter som farit illa av systemet och myndighetsutövning.
          </p>
          <button
            onClick={() => setPage(Page.CHAT)}
            className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-black transition-all hover:scale-105 shadow-2xl shadow-amber-500/20 text-sm md:text-base"
          >
            Läs mer om MiT <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        {[
          { src: "/hemsida-bild2.jpeg", title: "Empati", text: "Vi möter dig där du är, utan dömande, med fokus på din unika livssituation.", rot: "-2deg" },
          { src: "/hemsida-bild3.jpeg", title: "Trygghet", text: "En trygg bas är förutsättningen för all form av läkning och utveckling.", rot: "1deg" },
          { src: "/hemsida-bild4.jpeg", title: "Insikt", text: "Genom 'Här, Nu och Hur' skapar vi medvetenhet som leder till verklig förändring.", rot: "-1deg" }
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
          <h2 className="text-2xl md:text-3xl font-bold text-white">Våra Tjänster</h2>
          <p className="text-zinc-400 text-xs md:text-sm max-w-2xl mx-auto">Vi erbjuder ett brett spektrum av tjänster för både individer och professionella.</p>
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
              <h3 className="text-xl md:text-2xl font-bold text-white">Enskild Terapi</h3>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                Gestaltterapeutisk grund med fokus på att lösa upp knutar som står i vägen för det liv du vill leva.
                Vi jobbar med stress, ångest, sorg och PTSD.
              </p>
            </div>
            <button
              onClick={() => setPage(Page.THERAPY)}
              className="mt-4 md:mt-6 flex items-center gap-2 text-white font-bold hover:text-red-400 transition-colors text-xs md:text-sm"
            >
              Läs mer om terapi <ArrowRight size={18} />
            </button>
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
              <h3 className="text-xl md:text-2xl font-bold text-white">Grupp- & Parterapi</h3>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                Läkning genom relation och gemenskap. Vi erbjuder specialiserad terapi för grupper och par.
              </p>
            </div>
            <button
              onClick={() => setPage(Page.GROUP_THERAPY)}
              className="mt-4 md:mt-6 flex items-center gap-2 text-white font-bold hover:text-indigo-400 transition-colors text-xs md:text-sm"
            >
              Läs mer om parterapi <ArrowRight size={18} />
            </button>
          </div>

          <div className="glass bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-[1.5rem] p-5 md:p-8 flex flex-col justify-between group">
            <div className="space-y-3 md:space-y-4">
              <TiltedImage
                src="/hemsida-bild6.jpeg"
                alt="Utbildning"
                className="w-full h-40"
                defaultRotation="-1deg"
              />
              <h3 className="text-xl md:text-2xl font-bold text-white">Utbildning</h3>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                Specialistutbildningar för behandlare, inklusive Myndighetsinducerat Trauma (MiT) och Gestaltmetodik.
              </p>
            </div>
            <button
              onClick={() => setPage(Page.CHAT)}
              className="mt-4 md:mt-6 flex items-center gap-2 text-white font-bold hover:text-amber-400 transition-colors text-xs md:text-sm"
            >
              Se våra utbildningar <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>




      {/* Horizonten Gemenskap Section */}
      <div className="space-y-16 md:space-y-24 py-12">
        <div className="text-center space-y-6 mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tight leading-[1.1]">
            Horizonten Gemenskap – <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-200 to-white">
              Din digitala flock
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-amber-500/90 font-bold italic tracking-wide">
            Ingen läker i vakuum. Vi behöver varandra.
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-transparent mx-auto rounded-full"></div>
          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed font-light">
            På Klätterträdet vet vi att psykisk hälsa inte bara handlar om vad som sker under en timme i terapistolen. Det handlar om vad som händer däremellan. Det handlar om vardagen. Därför har vi, tillsammans med våra partners Socialkraft och Twisted-stacks, skapat Horizonten Gemenskap.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mx-auto">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 bg-orange-500/10 rounded-full border border-orange-500/20 text-orange-500 text-xs font-black uppercase tracking-widest">
              Mer än bara en app
            </div>
            <h3 className="text-3xl font-black text-white italic">En omsorgsfullt designad plattform</h3>
            <p className="text-zinc-400 text-lg leading-relaxed font-light">
              Detta är inte sociala medier som stjäl din energi. Det är en omsorgsfullt designad plattform för återhämtning, igenkänning och växtkraft. Vi har flyttat in vår filosofi om Self-care, Bottom-up och trygghet i en digital miljö som du alltid har med dig i fickan.
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
            <h3 className="text-3xl font-black text-white italic tracking-tight">Vad hittar du här?</h3>
            <p className="text-zinc-500">Mångsidigt stöd för din personliga resa.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
            {[
              { title: "Gratis Stöd", text: "En plats där du kan dela erfarenheter med andra som förstår. Att spegla sig i andra minskar skam och bryter isolering.", icon: <Users className="text-orange-500" size={32} /> },
              { title: "Verktyg", text: "Tillgång till material, övningar och mallar som stöttar din process.", icon: <Sparkles className="text-amber-400" size={32} /> },
              { title: "Möjligheter", text: "Som medlem kan du delta i (eller själv hålla i) digitala självhjälpsmöten via våra videorum.", icon: <Calendar className="text-white" size={32} /> }
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
              <h3 className="text-3xl font-black text-white italic tracking-tight">Ett unikt samarbete</h3>
              <p className="text-zinc-400 text-lg font-light">Horizonten är resultatet av tre krafter som förenas för din skull:</p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                { name: "Klätterträdet", text: "Bidrar med den terapeutiska grunden, kunskapen om trauma och nervsystemet.", icon: <Heart className="text-red-400" size={24} /> },
                { name: "Socialkraft", text: "Säkerställer perspektivet av rättvisa, stöd i myndighetsfrågor och empowerment.", icon: <Shield className="text-blue-400" size={24} /> },
                { name: "Twisted-stacks", text: "Möjliggör tekniken som bygger broar mellan människor på ett säkert sätt.", icon: <Sparkles className="text-purple-400" size={24} /> }
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
              Vårt Specialistteam
            </h2>
            <p className="text-xl text-amber-500 font-bold italic">
              Handplockad kompetens för hela människan.
            </p>
            <div className="space-y-6 text-zinc-400 text-lg md:text-xl leading-relaxed font-light text-left md:text-center">
              <p>
                Jag brukar säga att trygghet börjar med kompetens. För att kunna guida en annan människa genom svår terräng – oavsett om det handlar om djupa barndomstrauman eller stressrelaterad ohälsa – krävs en guide som är trygg, erfaren och välutbildad.
              </p>
              <p>
                Därför är jag otroligt stolt och tacksam över det team vi har samlat här på Klätterträdet och Horizonten.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mx-auto">
            <div className="space-y-6">
              <h3 className="text-3xl font-black text-white italic">Vi har sållat fram de bästa</h3>
              <p className="text-zinc-400 text-lg leading-relaxed font-light">
                Vi ställer extremt höga krav på våra medarbetare. Inte bara gällande deras akademiska meriter, utan på deras förmåga till närvaro och bemötande. De terapeuter och behandlare du möter hos oss är noga utsorterade för att de är bäst inom sina respektive fält.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed font-light">
                Vi jobbar inte efter en "one-size-fits-all"-modell. Vi vet att olika nervsystem behöver olika ingångar för att läka. Därför har vi samlat en bredd av expertis under samma tak:
              </p>
            </div>
            <div className="relative p-8 glass bg-white/5 border border-white/10 rounded-[2.5rem] space-y-4">
              {[
                { label: "Traumaterapi & Bottom-up", desc: "Specialister på att arbeta med kroppens minnen och nervsystemets reglering." },
                { label: "KBT & Beteendevetenskap", desc: "För dig som behöver struktur, verktyg och tankemönsterförändring." },
                { label: "Psykoanalys & Psychodynamic", desc: "För djupare förståelse av omedvetna processer och livsmönster." },
                { label: "Hypnos", desc: "Ett kraftfullt verktyg för att nå bortom det logiska sinnet och arbeta med djupare förändring." },
                { label: "Hudvård & Somatisk omsorg", desc: "Self-care handlar också om att vårda kroppens gräns mot omvärlden." }
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
                <p className="text-2xl font-black text-white italic">Välkommen in i värmen.</p>
                <p className="text-orange-500 font-bold uppercase tracking-widest text-xs">Det är gratis att bli medlem.</p>
              </div>

              <div className="flex flex-wrap justify-center gap-6">
                <button
                  onClick={() => setPage(Page.CONTACT)}
                  className="px-10 py-5 bg-white text-slate-900 hover:bg-white/90 rounded-2xl font-black transition-all hover:scale-105 flex items-center gap-3 shadow-2xl shadow-white/10 uppercase tracking-widest text-xs"
                >
                  Ta kontakt med oss <ArrowRight size={20} />
                </button>
                <button
                  onClick={() => setPage(Page.THERAPY, { showForm: true })}
                  className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/20 rounded-2xl text-white font-black transition-all hover:scale-105 flex items-center gap-3 uppercase tracking-widest text-xs"
                >
                  Hjälp med att hitta en terapeut
                </button>
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
