import React, { useState } from 'react';
import { Shield, Brain, Calendar, MapPin, Laptop, Award, Users, ArrowLeft, Send, CheckCircle } from 'lucide-react';
import TiltedImage from '../components/TiltedImage';

type ViewState = 'info' | 'form' | 'success';

const Chat: React.FC = () => {
  const [view, setView] = useState<ViewState>('info');
  const [formData, setFormData] = useState({
    type: 'Anmälan till utbildning (MiT)',
    name: '',
    email: '',
    phone: '',
    workplace: '',
    invoiceAddress: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Save to Supabase
    try {
      const { supabase } = await import('../gemenskap/services/supabase');
      const { error } = await supabase.from('course_applications').insert({
        course_type: formData.type,
        applicant_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        workplace: formData.workplace,
        invoice_address: formData.invoiceAddress,
        message: formData.message
      } as any);
      if (error) console.error('Supabase application error:', error);
    } catch (err) {
      console.error('Failed to save application to Supabase:', err);
    }

    const recipient = 'billy@klattertradet.se';
    const subject = `Anmälan: ${formData.type} - ${formData.name}`;

    const body = `
Hej Billy,

Här kommer en anmälan/förfrågan via hemsidan.

AVSER:
${formData.type}

KONTAKTUPPGIFTER:
Namn: ${formData.name}
E-post: ${formData.email}
Telefon: ${formData.phone}
Arbetsplats/Titel: ${formData.workplace}

FAKTURAADRESS (om angivet):
${formData.invoiceAddress}

MEDDELANDE / ÖVRIGT:
${formData.message}
    `.trim();

    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open mail client
    window.location.href = mailtoLink;

    // Show success screen
    setView('success');
  };

  if (view === 'success') {
    return (
      <div className="container mx-auto px-4 py-20 flex items-center justify-center animate-fade-in min-h-[70vh]">
        <div className="glass bg-white/10 backdrop-blur-xl border border-white/20 p-12 rounded-[40px] max-w-lg w-full text-center shadow-2xl">
          <div className="mb-6 flex justify-center text-green-400">
            <CheckCircle size={64} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Tack för din anmälan!</h2>
          <p className="text-lg text-white/80 mb-6">
            Ett förifyllt mail har skapats i din mailklient. Vänligen klicka på "Skicka" för att slutföra anmälan till Billy.
          </p>
          <button
            onClick={() => setView('info')}
            className="text-white hover:text-amber-400 font-medium underline transition-colors"
          >
            Gå tillbaka till utbildningssidan
          </button>
        </div>
      </div>
    );
  }

  if (view === 'form') {
    return (
      <div className="container mx-auto px-4 md:px-6 py-10 animate-fade-in max-w-3xl">
        <button
          onClick={() => setView('info')}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={20} /> Tillbaka till informationen
        </button>

        <div className="glass bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Anmälan & Intresse</h1>
            <p className="text-white/70">Myndighetsinducerat Trauma (MiT)</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">Vad vill du göra?</label>
              <select
                className="w-full p-4 bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="Bindande anmälan till utbildning (MiT)" className="bg-zinc-900">Jag vill anmäla mig till utbildningen</option>
                <option value="Intresseanmälan (MiT)" className="bg-zinc-900">Jag är intresserad och vill veta mer (Intresseanmälan)</option>
                <option value="Förfrågan för arbetsgrupp (MiT)" className="bg-zinc-900">Jag vill boka utbildning för min arbetsgrupp</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">Namn <span className="text-red-400">*</span></label>
                <input
                  required
                  type="text"
                  className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-orange-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">E-post <span className="text-red-400">*</span></label>
                <input
                  required
                  type="email"
                  className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-orange-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">Telefon</label>
                <input
                  type="tel"
                  className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-orange-500"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">Arbetsplats / Titel</label>
                <input
                  type="text"
                  className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="T.ex. Socialtjänsten Gävle / Socialsekreterare"
                  value={formData.workplace}
                  onChange={(e) => setFormData({ ...formData, workplace: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">Fakturaadress (vid anmälan)</label>
              <textarea
                rows={2}
                className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                placeholder="Adress, referens, ev. kostnadsställe..."
                value={formData.invoiceAddress}
                onChange={(e) => setFormData({ ...formData, invoiceAddress: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">Meddelande / Allergier</label>
              <textarea
                rows={3}
                className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2"
            >
              Skicka anmälan <Send size={20} />
            </button>
            <p className="text-center text-xs text-white/40 mt-4">
              Genom att skicka in godkänner du att vi kontaktar dig angående utbildningen.
            </p>
          </form>
        </div>
      </div>
    );
  }

  // DEFAULT VIEW ('info')
  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-6 md:py-10 animate-fade-in w-full">

      {/* Hero Header */}
      <div className="glass bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="relative z-10 flex-1">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-400 leading-tight">
            Myndighetsinducerat Trauma (MiT)
          </h1>
          <h2 className="text-xl md:text-2xl text-white/90 italic font-light mb-6">
            – Att läka när systemet skadar
          </h2>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-4xl">
            När hjälpen blir ett hot. En specialistutbildning för dig som möter människor i kläm mellan behov och byråkrati.
          </p>
        </div>
        <div className="relative z-10 w-full md:w-64 h-48 md:h-64 flex justify-center md:justify-end">
          <TiltedImage
            src="/hemsida-bild7.jpeg"
            alt="Myndighetsinducerat Trauma"
            className="w-48 h-64 md:w-full md:h-full"
            defaultRotation="8deg"
            grayscale={false}
            blur="10px"
            hoverBlur="0px"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">

          {/* Introduction */}
          <div className="glass bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <p className="text-white/80 leading-relaxed mb-6 text-lg">
              Har du mött klienten som "stänger av" så fort ett myndighetsbrev landar på hallmattan? Eller ungdomen som går in i totalt kamp-läge vid blotta tanken på ett SIP-möte? Det handlar ofta om myndighetsinducerat trauma. För många av våra klienter är mötet med vård- och omsorgsapparaten inte en väg till läkning, utan en källa till ytterligare stress, vanmakt och retraumatiserande upplevelser.
            </p>
            <p className="text-white/80 leading-relaxed text-lg">
              På Klätterträdet och Horizonten vet vi att vi inte kan prata bort dessa tillstånd. Vi måste jobba bottom-up. Vi måste förstå nervsystemets reaktioner och erbjuda verktyg som fungerar på riktigt.
            </p>
          </div>

          {/* Om Utbildningen */}
          <div className="glass bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="text-orange-400" size={32} aria-hidden="true" />
              <h3 className="text-2xl font-bold">Om utbildningen</h3>
            </div>
            <p className="text-white/80 leading-relaxed mb-4">
              Detta är en processinriktad specialistutbildning som sträcker sig över en termin. Vi kombinerar djupgående fysiska träffar i Gävle med flexibla, processinriktade onlineträffar. Målet är att göra dig till en trygg hamn i ett stormigt system.
            </p>
            <p className="text-white/80 leading-relaxed">
              Vi utgår från vår egen Self-care modell för att kartlägga hur bristen på agens och trygghet i kontakten med myndigheter aktiverar gamla grundsår såsom Avvisad eller Förödmjukad. Du får lära dig att hjälpa klienten gå från maktlös underkastelse till reglering och agens.
            </p>
          </div>

          {/* Upplägg */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold px-2">Upplägg: 3 + 3 Modellen</h3>
            <p className="text-white/70 px-2 italic">Vi tror på det "blandade lärandet" – att ses på riktigt för att bygga allians och trygghet, och att ses digitalt för att hålla processen levande i vardagen.</p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Del 1 */}
              <div className="glass bg-orange-900/10 border border-orange-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4 text-orange-300">
                  <Users size={24} aria-hidden="true" />
                  <h4 className="text-xl font-bold">Del 1: Fysiska Träffar</h4>
                </div>
                <p className="text-sm text-white/70 mb-4">3 heldagar i Gävle. Vi ses i våra lokaler på Gullregnsgatan.</p>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-white/80 text-sm">
                    <span className="text-orange-400 font-bold" aria-hidden="true">•</span>
                    <span><strong>Neurobiologin bakom MiT:</strong> Vad händer i hjärnan och kroppen vid strukturellt svek?</span>
                  </li>
                  <li className="flex gap-3 text-white/80 text-sm">
                    <span className="text-orange-400 font-bold" aria-hidden="true">•</span>
                    <span><strong>Identifiera Grundsår:</strong> Hur triggar systemet sår som Övergivenhet eller Orättvisa?</span>
                  </li>
                  <li className="flex gap-3 text-white/80 text-sm">
                    <span className="text-orange-400 font-bold" aria-hidden="true">•</span>
                    <span><strong>Praktisk Self-care:</strong> Vi övar på Containment och Reglering. Hur skapar vi ett "vi" när klienten misstror alla auktoriteter?</span>
                  </li>
                </ul>
              </div>

              {/* Del 2 */}
              <div className="glass bg-blue-900/10 border border-blue-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4 text-blue-300">
                  <Laptop size={24} aria-hidden="true" />
                  <h4 className="text-xl font-bold">Del 2: Onlineträffar</h4>
                </div>
                <p className="text-sm text-white/70 mb-4">3 halvdagar via länk. Din "depåstopp" för handledning och implementation.</p>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-white/80 text-sm">
                    <span className="text-blue-400 font-bold" aria-hidden="true">•</span>
                    <span><strong>Case-arbete:</strong> Du tar med dig fall från din vardag.</span>
                  </li>
                  <li className="flex gap-3 text-white/80 text-sm">
                    <span className="text-blue-400 font-bold" aria-hidden="true">•</span>
                    <span><strong>Metodfördjupning:</strong> Hur applicerar vi Self-care modellen i digitala möten eller korta samtal?</span>
                  </li>
                  <li className="flex gap-3 text-white/80 text-sm">
                    <span className="text-blue-400 font-bold" aria-hidden="true">•</span>
                    <span><strong>Hållbarhet:</strong> Hur skyddar du dig själv från sekundärtraumatisering när du stångas mot systemet?</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar / Right Column */}
        <div className="lg:col-span-1 space-y-8">

          {/* Kvalitetsmarkering */}
          <div className="glass bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-orange-500/30 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 text-orange-500/10 rotate-12" aria-hidden="true">
              <Award size={180} />
            </div>

            <h3 className="text-2xl font-bold mb-4 relative z-10 flex items-center gap-2">
              <Shield className="text-orange-400" aria-hidden="true" /> Unikt värde
            </h3>
            <p className="text-white/90 mb-6 relative z-10 font-medium">Bli Kvalitetsmarkerad</p>

            <p className="text-white/70 text-sm mb-6 relative z-10 leading-relaxed">
              Vi vet att tillit är hårdvaluta. Direkt efter godkänd utbildning får du rätten att använda Horizontens Kvalitetsmarkering för MiT-kompetens.
            </p>

            <div className="space-y-3 relative z-10 bg-black/20 p-4 rounded-xl border border-white/5">
              <p className="text-xs text-white/70 uppercase tracking-widest mb-2">Bevis på kompetens</p>
              <div className="flex gap-3 text-sm text-white/80">
                <span className="font-bold text-orange-400">1.</span>
                <span>Specialistkunskap om systeminducerad stress.</span>
              </div>
              <div className="flex gap-3 text-sm text-white/80">
                <span className="font-bold text-orange-400">2.</span>
                <span>Evidensbaserade verktyg för stabilisering.</span>
              </div>
              <div className="flex gap-3 text-sm text-white/80">
                <span className="font-bold text-orange-400">3.</span>
                <span>Etiskt förhållningssätt via Self-care modellen.</span>
              </div>
            </div>
          </div>

          {/* Practical Info */}
          <div className="glass bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h3 className="text-xl font-bold mb-6">Praktisk information</h3>

            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="bg-white/10 p-2 rounded-lg" aria-hidden="true">
                  <MapPin size={20} className="text-orange-300" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Plats</p>
                  <p className="text-white font-medium">Gullregnsgatan 9A, Gävle (Fysiska)</p>
                  <p className="text-white font-medium">Samt Zoom (Online)</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-white/10 p-2 rounded-lg" aria-hidden="true">
                  <Calendar size={20} className="text-orange-300" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Omfattning</p>
                  <p className="text-white font-medium">3 heldagar fysiskt</p>
                  <p className="text-white font-medium">3 halvdagar online</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-white/10 p-2 rounded-lg" aria-hidden="true">
                  <Users size={20} className="text-orange-300" />
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-white/70">Kursledare</p>
                  <div>
                    <p className="text-white font-medium">Billy Ljungberg</p>
                    <p className="text-xs text-white/70">Traumaterapeut</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Malin Widerlöv</p>
                    <p className="text-xs text-white/70">Socialarbetare</p>
                  </div>
                </div>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="text-sm font-bold text-white/70 mb-2">För vem?</h4>
              <p className="text-sm text-white/70 italic">
                Socionomer, behandlingspedagoger, boendestödjare, terapeuter eller andra i gränssnittet mellan individ och myndighet.
              </p>
            </div>

            <button
              onClick={() => setView('form')}
              className="w-full mt-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-bold transition-all hover:scale-105 focus:outline-none"
              aria-label="Anmäl dig till Myndighetsinducerat Trauma utbildningen"
            >
              Anmäl dig här
            </button>
          </div>
        </div>

      </div>

      <div className="mt-12 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Är du redo?</h3>
        <p className="text-white/70">Bli den skillnad dina klienter behöver i mötet med systemet.</p>
      </div>
    </div>
  );
};

export default Chat;
