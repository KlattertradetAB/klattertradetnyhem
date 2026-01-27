
import React, { useState } from 'react';
import { Send, CheckCircle, Info, ShieldAlert } from 'lucide-react';

const Survey: React.FC = () => {
  const [showContact, setShowContact] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Create an array of years for the dropdown
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1990 + 1 }, (_, i) => currentYear - i);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Simulate form submission via mailto for this demo, 
    // or typically you'd send this data to a backend.
    // For now, we show the success state.
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Simple console log to show data capture
    console.log("Survey Data:", data);

    // Show success view
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-20 flex items-center justify-center animate-fade-in min-h-[70vh]">
        <div className="glass bg-white/10 backdrop-blur-xl border border-white/20 p-12 rounded-[40px] max-w-2xl w-full text-center shadow-2xl">
          <div className="mb-6 flex justify-center text-green-400">
            <CheckCircle size={64} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Tack för din medverkan!</h2>
          <p className="text-lg text-white/80 mb-6 leading-relaxed">
            Genom att dela din erfarenhet har du gett oss ett viktigt bidrag i arbetet med att synliggöra de mänskliga konsekvenserna av myndigheters agerande.
          </p>
          
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-left space-y-4 mb-8">
            <h3 className="font-bold text-white">Behöver du stöd?</h3>
            <p className="text-white/70 text-sm">
              Besök gärna våra självhjälpsmöten i Horizonten app, det är gratis och tillgängligt för alla.
            </p>
          </div>

          <div className="text-white/60 text-sm">
             <p>Med värme och styrka,</p>
             <p>Styrelsen på Horizonten Social-kraft & Klätterträdet AB</p>
          </div>

          <button 
            onClick={() => setSubmitted(false)}
            className="mt-8 text-white hover:text-amber-400 font-medium underline transition-colors"
          >
            Gå tillbaka till formuläret
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-10 animate-fade-in max-w-4xl">
      
      {/* Header */}
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-400">
          Kraftsamling för Barnens Bästa
        </h1>
        <h2 className="text-xl text-white/80 font-light italic">
          Upplevelser av rättssäkerhet i den Svenska barnavården
        </h2>
      </div>

      <div className="glass bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
        
        {/* Intro Text */}
        <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-2xl mb-10 text-white/90 leading-relaxed space-y-4">
          <div className="flex items-start gap-3">
            <Info className="text-blue-400 shrink-0 mt-1" size={20} />
            <div className="space-y-4">
              <p>
                Vi på Horizonten och Klätterträdet genomför i samarbete med Socialkraft genomför denna kartläggning för att förstå och synliggöra de upplevelser och konsekvenser som familjer erfar i samband med ett ärende om omhändertagande av barn.
              </p>
              <p>
                Syftet är att samla in ett brett underlag för att kunna belysa hur dessa processer kan påverka familjer (föräldrar och framförallte barnen)- och för att kunna beskriva det vi kallar Myndighetsinducerat trauma.
              </p>
              <p className="text-sm opacity-90">
                Det du skriver kommer hanteras enligt vår integritets & sekretesspolicy som du hittar på länken här: <a href="https://klattertradet.se/integritet-sekretess-policy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline underline-offset-2 font-medium">https://klattertradet.se/integritet-sekretess-policy</a>
              </p>
            </div>
          </div>
          <p className="ml-8 text-xs font-bold text-blue-300">
            Undersökningen tar mellan 3-8 minuter. Alla frågor förutom den första är frivilliga.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          
          {/* Section: Consent */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-300 border-l-4 border-blue-500 pl-4">Dataskydd och Samtycke</h3>
            <label className="flex items-start gap-3 cursor-pointer p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <input type="checkbox" name="consent" required className="mt-1 w-5 h-5 rounded text-blue-500 bg-black/30 border-white/20" /> 
                <span className="text-white/80 text-sm">
                  Jag har läst informationen ovan, tagit del av <a href="https://klattertradet.se/integritet-sekretess-policy" target="_blank" className="text-blue-400 hover:underline">integritetspolicyn</a> och samtycker till att Social-kraft behandlar mina svar i enlighet med beskrivningen. <span className="text-red-400">*</span>
                </span>
            </label>
          </div>

          {/* Section 1 */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-blue-300 border-l-4 border-blue-500 pl-4">1. Din grundläggande upplevelse</h3>
            <p className="text-white/90 font-medium">Upplever du att du eller din familj har blivit felaktigt eller illa behandlad av socialtjänsten i samband med ett ärende om omhändertagande av barn? <span className="text-red-400">*</span></p>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="radio" name="experience" value="Ja" required className="w-5 h-5 text-blue-500 bg-black/30 border-white/20" />
                <span className="text-white/80 group-hover:text-white">Ja</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="radio" name="experience" value="Nej" className="w-5 h-5 text-blue-500 bg-black/30 border-white/20" />
                <span className="text-white/80 group-hover:text-white">Nej</span>
              </label>
            </div>
            <p className="text-sm text-white/50 italic">Stort tack! Bara genom att svara på föregående fråga har du bidragit med ovärderlig information. Varje extra steg du orkar ta ger oss djupare kunskap.</p>
          </div>

          {/* Section 2 */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-blue-300 border-l-4 border-blue-500 pl-4">2. Hur vill du delta?</h3>
            <p className="text-white/90">Välj det alternativ som passar dig bäst.</p>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="radio" name="participation_type" value="Anonym" onClick={() => setShowContact(false)} className="w-5 h-5 text-blue-500 bg-black/30 border-white/20" />
                <span className="text-white/80 group-hover:text-white">Jag vill delta helt anonymt.</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="radio" name="participation_type" value="Kontakt" onClick={() => setShowContact(true)} className="w-5 h-5 text-blue-500 bg-black/30 border-white/20" />
                <span className="text-white/80 group-hover:text-white">Jag kan tänka mig att bli kontaktad för eventuella följdfrågor eller djupintervjuer.</span>
              </label>
            </div>

            {showContact && (
              <div className="mt-6 p-6 bg-black/30 border border-white/10 rounded-xl space-y-4 animate-fade-in">
                <p className="font-bold text-white/90 mb-2">Fyll i de kontaktuppgifter du är bekväm med att dela:</p>
                <div>
                  <label className="block text-sm text-white/60 mb-1">Namn</label>
                  <input type="text" name="name" className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1">E-post</label>
                  <input type="email" name="email" className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1">Telefonnummer</label>
                  <input type="tel" name="phone" className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-blue-500 transition-colors" />
                </div>
              </div>
            )}
          </div>

          {/* Section 3 */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold text-blue-300 border-l-4 border-blue-500 pl-4">3. På vilket eller vilka sätt upplevde du dig felbehandlad?</h3>
            <p className="text-sm text-white/60">Välj alla alternativ som stämmer in. Detta hjälper oss förstå de processer som kan leda till myndighetsinducerat trauma.</p>

            <div className="space-y-4">
              <h4 className="font-bold text-white/90 border-b border-white/10 pb-2">Maktlöshet och Inflytande</h4>
              <div className="space-y-2">
                {[
                  {val: "maktlös", label: "Jag kände mig maktlös och helt utlämnad till systemet."},
                  {val: "omyndigförklarad", label: "Jag upplevde att jag blev 'omyndigförklarad' och/eller inte lyssnad på."},
                  {val: "inflytande_försvann", label: "Mitt inflytande över mitt barns situation försvann helt."}
                ].map(opt => (
                  <label key={opt.val} className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" name="mistreatment" value={opt.val} className="mt-1 w-4 h-4 rounded text-blue-500 bg-black/30 border-white/20" />
                    <span className="text-white/80 group-hover:text-white text-sm">{opt.label}</span>
                  </label>
                ))}
                <input type="text" name="mistreatment_other_1" placeholder="Annat..." className="w-full mt-2 p-2 bg-black/30 border border-white/10 rounded text-sm text-white placeholder-white/30 outline-none focus:border-blue-500" />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-white/90 border-b border-white/10 pb-2">Beslutsunderlag och Rättssäkerhet</h4>
              <div className="space-y-2">
                {[
                  {val: "saknad_grund", label: "Jag/andra anser att det saknades objektiv grund eller tillräckliga bevis för ingripandet."},
                  {val: "vinklad_dok", label: "Jag upplevde att dokumentationen (journaler, utredningar) var vinklad eller innehöll direkta felaktigheter."},
                  {val: "ignorerad_bild", label: "Min bild av situationen och min kunskap om mitt barn ignorerades (jag förlorade tolkningsföreträdet)."}
                ].map(opt => (
                  <label key={opt.val} className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" name="legal" value={opt.val} className="mt-1 w-4 h-4 rounded text-blue-500 bg-black/30 border-white/20" />
                    <span className="text-white/80 group-hover:text-white text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-white/90 border-b border-white/10 pb-2">Kommunikation och Bemötande</h4>
              <div className="space-y-2">
                {[
                  {val: "bristfällig", label: "Kommunikationen med socialtjänsten var bristfällig, otydlig eller obefintlig."},
                  {val: "respektlöst", label: "Jag upplevde bemötandet som respektlöst, dömande eller hotfullt."},
                  {val: "brist_info", label: "Jag fick inte tillräcklig eller korrekt information om processen eller mina rättigheter."}
                ].map(opt => (
                  <label key={opt.val} className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" name="comm" value={opt.val} className="mt-1 w-4 h-4 rounded text-blue-500 bg-black/30 border-white/20" />
                    <span className="text-white/80 group-hover:text-white text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-white/90 border-b border-white/10 pb-2">Långsiktiga Konsekvenser</h4>
              <div className="space-y-2">
                {[
                  {val: "skadad_tillit", label: "Min tillit till myndigheter och samhället har skadats allvarligt."},
                  {val: "psykisk_ohälsa", label: "Processen har direkt orsakat mig eller min familj psykisk ohälsa (t.ex. ångest, depression, PTSD-symptom)."}
                ].map(opt => (
                  <label key={opt.val} className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" name="cons" value={opt.val} className="mt-1 w-4 h-4 rounded text-blue-500 bg-black/30 border-white/20" />
                    <span className="text-white/80 group-hover:text-white text-sm">{opt.label}</span>
                  </label>
                ))}
                <textarea name="cons_other" placeholder="Annat: Sammanfatta i korthet med egna ord" rows={2} className="w-full mt-2 p-3 bg-black/30 border border-white/10 rounded text-sm text-white placeholder-white/30 outline-none focus:border-blue-500" />
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-blue-300 border-l-4 border-blue-500 pl-4">4. Din redogörelse</h3>
            <p className="text-sm text-white/60">Detta avsnitt är helt frivilligt, men din berättelse hjälper oss att förstå helheten.</p>
            
            <div className="space-y-3">
              <label className="block text-white/90 font-medium">A) Vad var det som utlöste socialtjänstens utredning?</label>
              <label className="flex items-center gap-2 text-sm text-white/70 mb-2">
                 <input type="checkbox" name="no_redogorelse" className="rounded text-blue-500 bg-black/30 border-white/20" /> Kan inte redogöra pga bristande utredning
              </label>
              <textarea name="redogorelse_start" placeholder="Min redogörelse..." rows={4} className="w-full p-4 bg-black/30 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500" />
            </div>

            <div className="space-y-3">
              <label className="block text-white/90 font-medium">B) Vilken påverkan hade processen på dig och din familj?</label>
              <p className="text-xs text-white/50">Tänk gärna på hälsa, ekonomi, sociala relationer, stress, självbild. Upplever du att dina ord tappade sitt värde?</p>
              <textarea name="paverkan" placeholder="Beskriv påverkan här..." rows={4} className="w-full p-4 bg-black/30 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500" />
            </div>
          </div>

          {/* Section 5 */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-blue-300 border-l-4 border-blue-500 pl-4">5. Bakgrundsinformation</h3>
            <div className="grid md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="block text-sm text-white/70">Vilken kommun gällde ärendet?</label>
                  <input type="text" name="kommun" className="w-full p-3 bg-black/30 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500" />
               </div>
               <div className="space-y-2">
                  <label className="block text-sm text-white/70">Vilket år inleddes ärendet ungefär?</label>
                  <select name="start_year" className="w-full p-3 bg-black/30 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500">
                    <option value="" className="bg-gray-900">Välj årtal...</option>
                    {years.map(year => (
                      <option key={year} value={year} className="bg-gray-900">{year}</option>
                    ))}
                  </select>
               </div>
            </div>
          </div>

          {/* Section 6 */}
          <div className="space-y-4">
             <h3 className="text-xl font-bold text-blue-300 border-l-4 border-blue-500 pl-4">6. Övriga kommentarer</h3>
             <p className="text-sm text-white/60">Här kan du förklara varför du hoppat över vissa frågor eller lämna andra tillägg.</p>
             <textarea name="extra_comments" rows={3} className="w-full p-4 bg-black/30 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500" />
          </div>

          <button 
            type="submit" 
            className="w-full py-5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl shadow-xl transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-3"
          >
            Skicka in mitt svar <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Survey;
