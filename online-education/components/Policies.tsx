import React from 'react';
import { ShieldIcon, BookOpenIcon, LockIcon, CheckCircleIcon, SparklesIcon } from './Icons';

export const Policies: React.FC = () => {
  return (
    <section className="mt-20 mb-12">
      <div className="glass-card no-hover-effect p-8 md:p-12 rounded-[2.5rem] border-white/5 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/5 blur-[100px] rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full -ml-32 -mb-32" />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-2">Utbildningsavtal & Riktlinjer</h2>
              <p className="text-orange-500 font-bold uppercase tracking-widest text-xs">Horizonten Utbildning</p>
            </div>
            <div className="h-px flex-1 bg-white/10 hidden md:block mx-8" />
            <ShieldIcon className="w-12 h-12 text-white/20 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Policy 1 */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-6">
                <BookOpenIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">1. Tillgång</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Personlig licens för [Utbildningens namn]. Inga inloggningsuppgifter får delas. Systemet övervakar IP-adresser för att säkra materialet.
              </p>
            </div>

            {/* Policy 2 */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
                <ShieldIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">2. Sekretess</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Strikt förbud mot spridning av filmer och dokumentation. Self-care modellen och dess terminologi är upphovsrättsligt skyddat material.
              </p>
            </div>

            {/* Policy 3 */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
                <SparklesIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">3. Progression</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Modulbaserad upplåsning. Nästa steg kräver godkänd genomgång. En pedagogisk struktur för hållbar professionell utveckling.
              </p>
            </div>

            {/* Policy 4 */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 mb-6">
                <LockIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">4. Överträdelse</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Brott mot upphovsrätten innebär omedelbar avstängning utan återbetalning. Klätterträdet AB förbehåller sig rätten till rättsliga åtgärder.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <CheckCircleIcon className="w-4 h-4 text-orange-500/50" />
              <span>Digital signering krävs vid start</span>
            </div>
            <div className="hidden md:block w-1 h-1 rounded-full bg-slate-700" />
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <CheckCircleIcon className="w-4 h-4 text-orange-500/50" />
              <span>Hållbart lärande</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
