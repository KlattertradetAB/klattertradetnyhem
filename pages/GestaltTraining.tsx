
import React from 'react';
import { Sparkles, Target, Users, BookOpen, Star, ShieldCheck, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { Page } from '../types';

interface GestaltTrainingProps {
  setPage: (page: Page) => void;
}

const GestaltTraining: React.FC<GestaltTrainingProps> = ({ setPage }) => {
  const [formState, setFormState] = React.useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleInterestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await import('../gemenskap/services/supabase').then(m => m.supabase.from('contact_messages').insert({
        sender_name: formState.name,
        email: formState.email,
        subject: 'Utbildning Intresseanmälan',
        message: formState.message || 'Intresserad av utbildning i Gestaltterapi.',
        is_read: false
      }));
      if (!error) setSubmitted(true);
    } catch (err) {
      console.error('Training interest submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-6 md:py-10 animate-fade-in space-y-16">
      {/* ... Hero Section ... */}
      <div className="glass bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-400 leading-tight">
            Utbildning i Gestaltterapi
          </h1>
          <h2 className="text-xl md:text-3xl text-white/90 font-light italic mb-8">
            Fördjupa din närvaro och professionella skicklighet
          </h2>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            Vår gestaltutbildning vänder sig till dig som vill arbeta processinriktat och relationellt. Vi fokuserar på kontakten, medvetenheten och det personliga ansvaret i det terapeutiska mötet.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Om utbildningen */}
          <div className="glass bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                <Target size={28} />
              </div>
              <h3 className="text-2xl font-bold">Här, Nu och Hur</h3>
            </div>
            <p className="text-white/80 leading-relaxed mb-6">
              Gestaltterapi är en upplevelsebaserad metod. I utbildningen lär du dig att använda dig själv som instrument och att arbeta med det som sker i rummet just nu. Vi går bortom intellektualiseringar och fokuserar på den direkta upplevelsen och hur den formar våra livsmönster.
            </p>
            <p className="text-white/80 leading-relaxed">
              Utbildningen ger dig verktyg att identifiera oavslutade gestalter och stödja klienten i att nå fullbordan och mognad. Vi varvar teori med praktiska övningar, handledning och eget terapiarbete.
            </p>
          </div>

          {/* Moduler */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold px-2">Utbildningens kärnområden</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Kontaktformler", desc: "Förståelse för hur vi möter eller undviker kontakt med omvärlden." },
                { title: "Figur & Grund", desc: "Lär dig se vad som träder fram som mest relevant i stunden." },
                { title: "Kroppslig Medvetenhet", desc: "Lyssna på kroppens signaler som bärare av sanning." },
                { title: "Den terapeutiska alliansen", desc: "Att bygga en trygg och utmanande relation." }
              ].map((m, i) => (
                <div key={i} className="glass bg-white/5 border border-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors">
                  <h4 className="font-bold text-blue-300 mb-2">{m.title}</h4>
                  <p className="text-sm text-white/70">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="glass bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border border-blue-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Star className="text-yellow-400" size={24} />
              <h3 className="text-xl font-bold">Vem bör gå?</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Utbildningen är skräddarsydd för socionomer, psykologer, behandlingspedagoger och chefer som vill fördjupa sitt ledarskap och sin samtalsmetodik.
            </p>
            <div className="space-y-3 bg-black/30 p-4 rounded-xl border border-white/5">
              <div className="flex gap-3 text-xs text-white/70">
                <ShieldCheck className="text-blue-400 shrink-0" size={16} />
                <span>Minst 2 års yrkeserfarenhet inom människovårdande yrken.</span>
              </div>
              <div className="flex gap-3 text-xs text-white/70">
                <ShieldCheck className="text-blue-400 shrink-0" size={16} />
                <span>Vilja att arbeta med sin egen personliga utveckling.</span>
              </div>
            </div>
          </div>

          <div className="glass bg-white/5 border border-white/10 rounded-2xl p-6">
            {submitted ? (
              <div className="text-center py-4 animate-in fade-in duration-500">
                <CheckCircle2 className="mx-auto text-emerald-500 mb-2" size={32} />
                <h4 className="font-bold text-white mb-1">Tack för din anmälan!</h4>
                <p className="text-xs text-zinc-400">Vi hör av oss så snart vi kan.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-4">Intresseanmälan</h3>
                <form onSubmit={handleInterestSubmit} className="space-y-4">
                  <input
                    required
                    type="text"
                    placeholder="Ditt namn"
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={formState.name}
                    onChange={e => setFormState({ ...formState, name: e.target.value })}
                  />
                  <input
                    required
                    type="email"
                    placeholder="Din e-post"
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={formState.email}
                    onChange={e => setFormState({ ...formState, email: e.target.value })}
                  />
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="animate-spin" size={18} /> : "Skicka anmälan"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestaltTraining;
