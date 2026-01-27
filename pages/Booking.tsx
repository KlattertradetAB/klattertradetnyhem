
import React, { useState } from 'react';
import { Heart, Send, CheckCircle, MessageSquare } from 'lucide-react';

type ViewState = 'splash' | 'form' | 'confirmation';

const Booking: React.FC = () => {
  const [view, setView] = useState<ViewState>('splash');
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData(prev => ({ ...prev, utmaningar: [...prev.utmaningar, value] }));
    } else {
      setFormData(prev => ({ ...prev, utmaningar: prev.utmaningar.filter(u => u !== value) }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const recipient = 'billy@klattertradet.se';
    const subject = 'Enkät, hjälp med att hitta terapeut';
    
    let body = "Här är svaren från din enkät:\n\n";

    body += "1. Dina tidigare erfarenheter av terapi:\n";
    body += `   - Har sökt terapi tidigare? ${formData.tidigare_erfarenhet || 'Inget svar'}\n`;
    if (formData.uppskattade) body += `   - Mest/minst uppskattat: ${formData.uppskattade}\n`;
    if (formData.tanke_delar) body += `   - Tankar kring upplevelser: ${formData.tanke_delar}\n`;
    body += "\n";

    body += "2. Vad söker du hjälp för?\n";
    const displayUtmaningar = formData.utmaningar.map(u => 
      u === 'annan' ? `Annan: ${formData.annan_utmaning_text}` : u
    );
    body += `   - Aktuell utmaning: ${displayUtmaningar.length > 0 ? displayUtmaningar.join(', ') : 'Inget svar'}\n`;
    body += `   - Huvudsakligt mål: ${formData.mal === 'annat' ? `Annat: ${formData.annat_mal_text}` : formData.mal}\n`;
    body += "\n";

    body += "3. Önskemål på terapeut:\n";
    body += `   - Terapeutens kön: ${formData.terapeut_kon}\n`;
    body += `   - Föredragen mötesform: ${formData.motesform}\n`;
    body += "\n";

    body += "4. Dina kontaktuppgifter:\n";
    body += `   - Namn: ${formData.namn}\n`;
    body += `   - E-post: ${formData.epost}\n`;
    if (formData.telefon) body += `   - Telefon: ${formData.telefon}\n`;

    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setView('confirmation');

    setTimeout(() => {
      window.location.href = mailtoLink;
    }, 1000);
  };

  if (view === 'splash') {
    return (
      <div className="container mx-auto px-4 py-20 flex items-center justify-center animate-fade-in min-h-[70vh]">
        <button 
          onClick={() => setView('form')}
          className="glass bg-white/10 backdrop-blur-xl border border-white/20 p-12 rounded-[40px] max-w-lg w-full text-center hover:bg-white/15 transition-all group shadow-2xl"
        >
          <div className="mb-8 flex justify-center">
            <div className="p-6 bg-orange-500/20 rounded-full text-orange-400 group-hover:scale-110 transition-transform duration-500">
              <Heart size={48} />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight italic">
            Söker du terapi och är osäker på val av terapeut?
          </h2>
          <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed">
            I så fall kan detta formulär underlätta genom att vi hjälper dig med matchning och skickar ett förslag.
          </p>
          <span className="inline-block bg-white/10 text-white py-3 px-8 rounded-xl font-bold border border-white/20 transition-all hover:scale-105">
            Öppna formulär
          </span>
        </button>
      </div>
    );
  }

  if (view === 'confirmation') {
    return (
      <div className="container mx-auto px-4 py-20 flex items-center justify-center animate-fade-in min-h-[70vh]">
        <div className="glass bg-white/10 backdrop-blur-xl border border-white/20 p-12 rounded-[40px] max-w-md w-full text-center shadow-2xl">
          <div className="mb-6 flex justify-center text-green-400">
            <CheckCircle size={64} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Tack för ditt svar!</h2>
          <p className="text-lg text-white/80 mb-2">Vi har skapat ett e-postmeddelande med dina svar.</p>
          <p className="text-white/60">Klicka på "Skicka" i din e-postklient för att skicka det till oss. Vi återkommer så snart vi kan!</p>
          <button 
            onClick={() => setView('splash')}
            className="mt-8 text-white hover:text-amber-400 font-medium underline transition-colors"
          >
            Gå tillbaka till start
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-10 animate-fade-in max-w-3xl">
      <div className="glass bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
        <div className="text-center mb-10">
          <MessageSquare className="mx-auto text-orange-400 mb-4" size={40} />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Söker du terapi?</h1>
          <p className="text-white/70">Låt oss hjälpa dig på vägen genom att svara på några korta frågor.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* Sektion 1 */}
          <fieldset className="p-6 border border-white/10 rounded-2xl bg-white/5">
            <legend className="text-lg font-bold text-orange-300 px-3 mb-4">1. Dina tidigare erfarenheter av terapi</legend>
            
            <div className="mb-6">
              <p className="font-medium text-white/90 mb-3">Har du sökt terapi tidigare?</p>
              <div className="space-y-3">
                {['Ja, jag har gått i terapi.', 'Nej, det här är första gången jag funderar på det.', 'Jag har sökt, men inte fullföljt.'].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="tidigare_erfarenhet" 
                      value={opt} 
                      onChange={(e) => setFormData({...formData, tidigare_erfarenhet: e.target.value})}
                      className="w-4 h-4 text-orange-500 bg-white/10 border-white/20 focus:ring-orange-500"
                    />
                    <span className="text-white/80 group-hover:text-white transition-colors">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-medium text-white/90 mb-2">Om du har tidigare erfarenheter, vad uppskattade du mest/minst?</label>
              <textarea 
                rows={3} 
                maxLength={200}
                placeholder="Max 200 tecken"
                className="w-full p-4 bg-black/30 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-orange-500 outline-none resize-none transition-all"
                value={formData.uppskattade}
                onChange={(e) => setFormData({...formData, uppskattade: e.target.value})}
              />
            </div>

            <div>
              <label className="block font-medium text-white/90 mb-2">Vilka tankar har du kring tidigare upplevelser som du vill dela med oss?</label>
              <textarea 
                rows={3} 
                maxLength={200}
                placeholder="Max 200 tecken"
                className="w-full p-4 bg-black/30 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-orange-500 outline-none resize-none transition-all"
                value={formData.tanke_delar}
                onChange={(e) => setFormData({...formData, tanke_delar: e.target.value})}
              />
            </div>
          </fieldset>

          {/* Sektion 2 */}
          <fieldset className="p-6 border border-white/10 rounded-2xl bg-white/5">
            <legend className="text-lg font-bold text-orange-300 px-3 mb-4">2. Vad söker du hjälp för?</legend>

            <div className="mb-6">
              <p className="font-medium text-white/90 mb-3">Vilken typ av utmaning är mest aktuell för dig just nu? (Välj en eller flera)</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'stress', label: 'Stress och utbrändhet' },
                  { id: 'angest', label: 'Ångest och oro' },
                  { id: 'nedstammdhet', label: 'Nedstämdhet eller depression' },
                  { id: 'relationsproblem', label: 'Relationsproblem' },
                  { id: 'sorg_trauma', label: 'Sorg och trauma' },
                  { id: 'existentiella', label: 'Existentiella funderingar' },
                  { id: 'somnsvårigheter', label: 'Sömnsvårigheter' },
                  { id: 'annan', label: 'Annan utmaning:' }
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      name="utmaning" 
                      value={item.id} 
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 rounded text-orange-500 bg-white/10 border-white/20 focus:ring-orange-500"
                    />
                    <span className="text-white/80 group-hover:text-white transition-colors">{item.label}</span>
                  </label>
                ))}
              </div>
              <textarea 
                rows={1}
                placeholder="Beskriv här..."
                className="w-full mt-4 p-4 bg-black/30 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-orange-500 outline-none resize-none transition-all"
                value={formData.annan_utmaning_text}
                onChange={(e) => setFormData({...formData, annan_utmaning_text: e.target.value})}
              />
            </div>

            <div>
              <p className="font-medium text-white/90 mb-3">Vad är ditt huvudsakliga mål med terapin?</p>
              <div className="space-y-3">
                {[
                  { id: 'hantera_akuta', label: 'Att hantera akuta problem och få verktyg.' },
                  { id: 'forsta_mig_sjalv', label: 'Att förstå mig själv och mina mönster bättre.' },
                  { id: 'tryggt_utrymme', label: 'Att få ett tryggt utrymme att prata i.' },
                  { id: 'annat', label: 'Annat:' }
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="mal" 
                      value={item.id} 
                      onChange={(e) => setFormData({...formData, mal: e.target.value})}
                      className="w-4 h-4 text-orange-500 bg-white/10 border-white/20 focus:ring-orange-500"
                    />
                    <span className="text-white/80 group-hover:text-white transition-colors">{item.label}</span>
                  </label>
                ))}
              </div>
              <textarea 
                rows={1}
                placeholder="Beskriv här..."
                className="w-full mt-4 p-4 bg-black/30 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-orange-500 outline-none resize-none transition-all"
                value={formData.annat_mal_text}
                onChange={(e) => setFormData({...formData, annat_mal_text: e.target.value})}
              />
            </div>
          </fieldset>

          {/* Sektion 3 */}
          <fieldset className="p-6 border border-white/10 rounded-2xl bg-white/5">
            <legend className="text-lg font-bold text-orange-300 px-3 mb-4">3. Önskemål på terapeut</legend>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="font-medium text-white/90 mb-3">Önskemål kring kön?</p>
                <div className="space-y-2">
                  {['Man', 'Kvinna', 'Inget särskilt önskemål.'].map((opt) => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="terapeut_kon" 
                        value={opt} 
                        defaultChecked={opt === 'Inget särskilt önskemål.'}
                        onChange={(e) => setFormData({...formData, terapeut_kon: e.target.value})}
                        className="w-4 h-4 text-orange-500 bg-white/10 border-white/20 focus:ring-orange-500"
                      />
                      <span className="text-white/80">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-medium text-white/90 mb-3">Föredragen mötesform?</p>
                <div className="space-y-2">
                  {['Fysiska möten på plats.', 'Digitalt via Zoom.'].map((opt) => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="motesform" 
                        value={opt} 
                        onChange={(e) => setFormData({...formData, motesform: e.target.value})}
                        className="w-4 h-4 text-orange-500 bg-white/10 border-white/20 focus:ring-orange-500"
                      />
                      <span className="text-white/80 group-hover:text-white transition-colors">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </fieldset>

          {/* Sektion 4 */}
          <fieldset className="p-6 border border-white/10 rounded-2xl bg-white/5">
            <legend className="text-lg font-bold text-orange-300 px-3 mb-4">4. Dina kontaktuppgifter</legend>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-1">Namn</label>
                <input 
                  type="text" 
                  required 
                  className="w-full p-3 bg-black/30 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Ditt fullständiga namn"
                  value={formData.namn}
                  onChange={(e) => setFormData({...formData, namn: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">E-post</label>
                <input 
                  type="email" 
                  required 
                  className="w-full p-3 bg-black/30 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="din.epost@exempel.se"
                  value={formData.epost}
                  onChange={(e) => setFormData({...formData, epost: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">Telefonnummer (Valfritt)</label>
                <input 
                  type="tel" 
                  className="w-full p-3 bg-black/30 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="070-123 45 67"
                  value={formData.telefon}
                  onChange={(e) => setFormData({...formData, telefon: e.target.value})}
                />
              </div>
            </div>
          </fieldset>

          <button 
            type="submit" 
            className="w-full py-5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-3"
          >
            Skicka in formuläret <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
