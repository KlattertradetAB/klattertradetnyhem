
import React, { useState } from 'react';
import { Send, Sparkles, Check, Mail } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulerar ett API-anrop
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus('success');
      setEmail('');
      setName('');
      // Återställ status efter några sekunder
      setTimeout(() => setStatus('idle'), 6000);
    }, 1200);
  };

  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] my-12 overflow-hidden">
      {/* Frosted Glass Background Layer */}
      <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-2xl border-y border-white/10"></div>
      
      {/* Subtle top edge highlight to give glass depth */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      {/* Subtle decorative glow in center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-amber-500/5 blur-[120px] pointer-events-none opacity-20"></div>

      <div className="relative z-10 max-w-7xl mx-auto py-10 px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
        
        <div className="newsletter-text text-center lg:text-left space-y-2 lg:max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-amber-500/10 rounded-full border border-amber-500/20 text-amber-500 text-[10px] font-bold uppercase tracking-widest mb-1">
            <Mail size={12} /> Nyhetsbrev
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
            Prenumerera på vårt nyhetsbrev
          </h3>
          <p className="text-zinc-400 text-sm font-medium leading-relaxed">
            Reflektioner om trauma och utveckling – direkt till din inkorg.
          </p>
        </div>
        
        <div className="w-full lg:max-w-2xl">
          {status === 'success' ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 py-4 px-8 rounded-2xl text-center animate-fade-in flex items-center justify-center gap-4">
              <div className="w-10 h-10 bg-emerald-500 text-black rounded-full flex items-center justify-center shadow-lg">
                <Check size={20} strokeWidth={3} />
              </div>
              <span className="text-emerald-400 font-bold">Tack! Vi har lagt till dig på listan.</span>
            </div>
          ) : (
            <form 
              className="flex flex-col sm:flex-row gap-3 w-full"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <input 
                  type="text" 
                  placeholder="Ditt namn" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 p-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-zinc-600 outline-none focus:border-amber-500 transition-all text-sm"
                  required 
                />
                <input 
                  type="email" 
                  placeholder="Din e-postadress" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-[1.2] p-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-zinc-600 outline-none focus:border-amber-500 transition-all text-sm"
                  required 
                />
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl cursor-pointer font-bold text-sm transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Prenumerera <Send size={16} />
                  </>
                )}
              </button>
            </form>
          )}
          <p className="mt-4 text-[10px] text-zinc-500 text-center lg:text-left flex items-center justify-center lg:justify-start gap-2 italic">
            <Sparkles size={10} className="text-amber-500" /> Din integritet är viktig. Vi hanterar dina uppgifter med största omsorg.
          </p>
        </div>
        
      </div>
    </section>
  );
};

export default Newsletter;
