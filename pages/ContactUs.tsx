
import React, { useState, useRef } from 'react';
import {
  ArrowRight,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  CheckCircle2,
  ShieldCheck,
  Send,
  MapPin,
  ClipboardCheck,
  ChevronLeft,
  MessageCircle,
  Video,
  Users
} from 'lucide-react';
import Newsletter from '../components/Newsletter';

const therapists = [
  {
    id: 0,
    name: "Minerva Kassab",
    email: "minerva@klattertradet.se",
    age: 36,
    role: "Samtalsterapeut",
    subRole: "Relationsspecialist",
    desc: "Erbjuder stödjande samtal och terapi med fokus på personlig utveckling och relationshantering.",
    image: "/assets/minerva_profil.jpg"
  },
  {
    id: 1,
    name: "Mattias O Sandin",
    email: "mattias@klattertradet.se",
    age: 34,
    role: "Gestalt- & Hypnosterapeut",
    subRole: "Resursfokuserad samtalsterapeut",
    desc: "Arbetar med undermedvetna processer och kroppslig förankring i nuet.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Billy Ljungberg",
    email: "billy@klattertradet.se",
    age: 35,
    role: "Traumaterapeut",
    subRole: "Utbildare & Handledare",
    desc: "Specialiserad på myndighetsinducerat trauma och komplexa livssituationer.",
    image: "/billy-bokning.jpeg"
  },
  {
    id: 3,
    name: "Malin Widerlöv",
    email: "malin@klattertradet.se",
    age: 42,
    role: "Behandlingspedagog & Socialarbetare",
    subRole: "Familjeombud",
    desc: "Specialiserad på familjefrågor och socialt stöd. Stöttar i komplexa livssituationer.",
    image: "/Malin-profil-hemsida.png"
  },
];

const ContactUs: React.FC = () => {
  const [activeTherapist, setActiveTherapist] = useState(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const cardRef = useRef<HTMLDivElement>(null);

  const [generalSubmitted, setGeneralSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    meetingForm: 'Fysiskt på mottagning',
    reason: ''
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setRotation({
      x: Number(((y / (rect.height / 2)) * -10).toFixed(2)),
      y: Number(((x / (rect.width / 2)) * 10).toFixed(2))
    });
  };

  const getUpcomingDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      // Skip Sundays (0)
      if (d.getDay() === 0) continue;
      dates.push({
        day: d.toLocaleDateString('sv-SE', { weekday: 'short' }).replace(/^\w/, c => c.toUpperCase()),
        num: d.getDate().toString(),
        full: d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })
      });
      if (dates.length >= 5) break;
    }
    return dates;
  };

  const dates = getUpcomingDates();

  const timeSlots = ["07:00", "08:00", "09:00", "10:30", "13:00", "14:45", "16:00", "17:30"];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedTherapistObj = therapists[activeTherapist];
    const billyEmail = 'billy@klattertradet.se';

    let recipients = selectedTherapistObj.email;
    if (selectedTherapistObj.email !== billyEmail) {
      recipients += `,${billyEmail}`;
    }

    const therapistName = selectedTherapistObj.name;
    const formattedDate = selectedDate ? `${selectedDate} ${new Date().toLocaleDateString('sv-SE', { month: 'long', year: 'numeric' })}` : '';
    const subject = `Ny bokning: ${bookingData.name} - ${formattedDate} kl ${selectedTime}`;

    const body = `
NY BOKNING VIA HEMSIDAN

TERAPEUT: ${therapistName}
DATUM: ${formattedDate}
TID: ${selectedTime}
MÖTESFORM: ${bookingData.meetingForm}

KONTAKTUPPGIFTER:
Namn: ${bookingData.name}
E-post: ${bookingData.email}
Telefon: ${bookingData.phone}

SYFTE / MEDDELANDE:
${bookingData.reason || 'Ingen beskrivning angiven.'}

---
Detta är ett automatiskt genererat utkast från hemsidan.
    `.trim();

    const mailtoLink = `mailto:${recipients}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setBookingStep(3);

    setTimeout(() => {
      window.location.href = mailtoLink;
    }, 500);
  };

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-10 animate-fade-in space-y-16">

      {/* Booking Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between px-4 gap-6">
        <div>
          <span className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">Tidsbokning</span>
          <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tight">Välj en tid i kalendern</h1>
        </div>

        <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl overflow-x-auto no-scrollbar w-full md:w-auto">
          {therapists.map((t) => (
            <button
              key={t.id}
              onClick={() => { setActiveTherapist(t.id); setBookingStep(1); setSelectedTime(null); setSelectedDate(null); }}
              className={`px-4 md:px-8 py-3 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap ${activeTherapist === t.id
                ? 'bg-white/10 border border-white/20 text-white scale-105'
                : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Booking Interface */}
      <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">

        {/* Left Side: 3D Profile Card */}
        <div className="lg:w-1/2 w-full flex justify-center">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => { setIsHovering(false); setRotation({ x: 0, y: 0 }); }}
            style={{ perspective: '1000px' }}
            className="relative cursor-pointer group"
          >
            <div
              className="relative w-[300px] md:w-[380px] aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 ease-out border border-white/10"
              style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovering ? 1.05 : 1})`,
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="absolute inset-0 bg-slate-900">
                <img src={therapists[activeTherapist].image} className="w-full h-full object-cover object-top opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Therapist" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
              </div>

              <div className="absolute inset-0 p-10 flex flex-col justify-end" style={{ transform: 'translateZ(60px)' }}>
                <div className="mb-4">
                  <span className="text-amber-500 text-[10px] font-bold tracking-[0.3em] uppercase block mb-1">
                    {therapists[activeTherapist].age} år • {therapists[activeTherapist].subRole}
                  </span>
                  <h2 className="text-4xl font-black text-white leading-none">{therapists[activeTherapist].name}</h2>
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6 border-l-2 border-amber-500/50 pl-4 italic">
                  "{therapists[activeTherapist].desc}"
                </p>
                <div className="flex items-center gap-2 text-amber-500/80 text-[11px] font-bold uppercase tracking-widest">
                  <ShieldCheck size={14} /> Certifierad Behandlare
                </div>
              </div>
            </div>
            <div className="absolute -inset-4 bg-amber-500/10 blur-3xl -z-10 rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>

        {/* Right Side: Booking Steps */}
        <div className="lg:w-1/2 w-full">
          <div className="glass bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl min-h-[550px] flex flex-col">
            {bookingStep === 1 ? (
              <div className="animate-fade-in flex-1 flex flex-col">
                <h3 className="text-3xl font-black mb-2 text-white italic">Boka session</h3>
                <p className="text-zinc-500 text-sm mb-10">Välj ett datum och en tid för ditt möte med {therapists[activeTherapist].name}.</p>

                <div className="space-y-10 flex-1">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-4 block">
                      {new Date().toLocaleDateString('sv-SE', { month: 'long', year: 'numeric' })}
                    </label>
                    <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                      {dates.map((d) => (
                        <button
                          key={d.num}
                          onClick={() => { setSelectedDate(d.num); setSelectedTime(null); }}
                          className={`flex flex-col items-center min-w-[75px] py-5 rounded-2xl border transition-all ${selectedDate === d.num
                            ? 'bg-amber-500 border-amber-500 text-black shadow-xl scale-105'
                            : 'bg-white/5 border-white/10 text-zinc-400 hover:border-white/30'
                            }`}
                        >
                          <span className="text-[10px] uppercase font-bold mb-1">{d.day}</span>
                          <span className="text-xl font-black">{d.num}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={`text-[10px] font-bold uppercase tracking-widest mb-4 block transition-colors ${selectedDate ? 'text-amber-500' : 'text-zinc-700'}`}>
                      Tillgängliga tider
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          disabled={!selectedDate}
                          onClick={() => setSelectedTime(time)}
                          className={`py-4 rounded-xl text-sm font-black border transition-all ${!selectedDate
                            ? 'bg-white/5 border-white/5 text-zinc-700 cursor-not-allowed'
                            : selectedTime === time
                              ? 'bg-white text-black border-white shadow-lg'
                              : 'bg-transparent border-white/10 text-white/80 hover:bg-white/5'
                            }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    disabled={!selectedTime}
                    onClick={() => setBookingStep(2)}
                    className={`w-full py-5 rounded-xl font-bold text-xl transition-all flex items-center justify-center gap-3 group border border-white/20 ${selectedTime
                      ? 'bg-white/10 hover:bg-white/20 text-white shadow-xl hover:scale-105'
                      : 'bg-white/5 text-white/30 border-white/5 cursor-not-allowed'
                      }`}
                  >
                    Fortsätt med bokning
                    <ArrowRight size={24} className={selectedTime ? "group-hover:translate-x-1 transition-transform" : ""} />
                  </button>
                </div>
              </div>
            ) : bookingStep === 2 ? (
              <div className="animate-in fade-in zoom-in-95 duration-300 flex-1">
                <button onClick={() => setBookingStep(1)} className="text-zinc-500 hover:text-white mb-8 text-sm flex items-center gap-2 font-bold">
                  <ChevronLeft size={18} /> Gå tillbaka till tider
                </button>
                <h3 className="text-3xl font-black mb-2 text-white italic">Några frågor...</h3>
                <p className="text-zinc-500 text-sm mb-8 italic">Vi behöver veta lite mer om dig för att förbereda vårt möte.</p>

                <form className="space-y-6" onSubmit={handleBookingSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-amber-500 ml-1">Vad heter du?</label>
                      <input
                        type="text"
                        required
                        placeholder="För- och efternamn"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-amber-500 transition-all"
                        value={bookingData.name}
                        onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-amber-500 ml-1">Din e-post</label>
                        <input
                          type="email"
                          required
                          placeholder="namn@epost.se"
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-amber-500 transition-all"
                          value={bookingData.email}
                          onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-amber-500 ml-1">Telefonnummer</label>
                        <input
                          type="tel"
                          required
                          placeholder="07x-xxx xx xx"
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-amber-500 transition-all"
                          value={bookingData.phone}
                          onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-amber-500 ml-1">Hur vill du ses?</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {['Fysiskt på mottagning', 'Digitalt via Zoom'].map((form) => (
                          <button
                            key={form}
                            type="button"
                            onClick={() => setBookingData({ ...bookingData, meetingForm: form })}
                            className={`px-3 py-3 rounded-xl text-[11px] font-bold transition-all border ${bookingData.meetingForm === form
                              ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                              : 'bg-black/20 border-white/10 text-white/40 hover:border-white/30'
                              }`}
                          >
                            {form}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-amber-500 ml-1">Vad önskar du hjälp med? (Valfritt)</label>
                      <textarea
                        placeholder="Kort beskrivning av ditt ärende..."
                        rows={3}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-amber-500 transition-all resize-none"
                        value={bookingData.reason}
                        onChange={(e) => setBookingData({ ...bookingData, reason: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center gap-4">
                    <Calendar size={20} className="text-amber-500" />
                    <span className="text-sm font-bold text-white/90">Vald tid: {selectedDate} {new Date().toLocaleDateString('sv-SE', { month: 'short' })} kl {selectedTime}</span>
                  </div>

                  <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-5 rounded-xl font-bold text-xl transition-all hover:scale-[1.01] active:scale-95 mt-4">
                    Slutför bokning
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-20 animate-in zoom-in-90 duration-500 flex-1 flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-8 shadow-2xl">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl md:text-4xl font-black mb-4 text-white italic">Välkommen till vår bokningspanel</h3>
                <p className="text-zinc-300 text-lg mb-6 max-w-sm mx-auto leading-relaxed">
                  Tack {bookingData.name.split(' ')[0]}! Vad bra att du hörde av dig till oss och vi återkommer till dig snarast efter att vi mottagit mailet!
                </p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8 text-xs text-zinc-500 max-w-xs italic">
                  Notera: Ditt e-postprogram har öppnats. Vänligen klicka på "Skicka" för att slutföra bokningen.
                </div>
                <button onClick={() => { setBookingStep(1); setSelectedDate(null); setSelectedTime(null); setBookingData({ name: '', email: '', phone: '', meetingForm: 'Fysiskt på mottagning', reason: '' }); }} className="text-white hover:text-amber-400 font-bold hover:underline tracking-widest text-sm uppercase">Gör en ny bokning</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* General Inquiry / Sidebar Info */}
      <div className="grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass bg-white/5 border border-white/10 rounded-3xl p-10 space-y-10">
            <h2 className="text-3xl font-black text-white italic">Kontakt</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-amber-500 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1 font-bold">Mottagning</p>
                  <p className="text-white font-medium text-lg">Gullregnsgatan 9A, Gävle</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-amber-500 shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1 font-bold">E-post</p>
                  <p className="text-white font-medium text-lg">billy@klattertradet.se</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {!generalSubmitted ? (
            <div className="glass bg-white/5 border border-white/10 rounded-3xl p-10 md:p-12">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                  <ClipboardCheck className="text-amber-500" size={28} />
                </div>
                <h2 className="text-3xl font-black text-white italic">Övriga frågor</h2>
              </div>

              <form onSubmit={handleGeneralSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <input required placeholder="Ditt namn" type="text" className="w-full p-4 bg-black/40 border border-white/10 rounded-2xl text-white outline-none focus:border-amber-500 transition-all" />
                  <input required placeholder="Din e-post" type="email" className="w-full p-4 bg-black/40 border border-white/10 rounded-2xl text-white outline-none focus:border-amber-500 transition-all" />
                </div>
                <textarea rows={5} placeholder="Ditt meddelande..." className="w-full p-4 bg-black/40 border border-white/10 rounded-2xl text-white outline-none focus:border-amber-500 transition-all resize-none" />
                <button type="submit" className="w-full py-6 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl shadow-xl transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-3 text-lg">
                  Skicka meddelande <Send size={20} />
                </button>
              </form>
            </div>
          ) : (
            <div className="glass bg-white/5 border border-white/10 p-12 rounded-[40px] text-center flex flex-col items-center justify-center min-h-[400px]">
              <CheckCircle2 size={64} className="text-emerald-500 mb-6" />
              <h2 className="text-3xl font-black text-white mb-4 italic">Tack!</h2>
              <p className="text-zinc-400">Vi återkommer till dig så snart vi kan.</p>
            </div>
          )}
        </div>
      </div>

      <Newsletter />
    </div>
  );
};

export default ContactUs;
