import React from 'react';
import { Lock, Sparkles, ArrowRight, ShieldCheck, PlayCircle, BookOpen } from 'lucide-react';
import { Page } from '../types';

interface PremiumRequiredProps {
  setPage: (page: Page) => void;
}

export const PremiumRequired: React.FC<PremiumRequiredProps> = ({ setPage }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 mt-20">
      <div className="max-w-4xl w-full">
        <div className="glass bg-gradient-to-br from-slate-900 via-slate-900 to-orange-950/20 border border-white/10 rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] -mr-48 -mt-48 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -ml-32 -mb-32"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-3xl flex items-center justify-center mb-10 shadow-lg shadow-orange-500/20 rotate-3">
              <Lock className="text-white w-10 h-10" />
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Exklusivt för <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Premium-medlemmar</span>
            </h2>

            <p className="text-xl text-slate-300 mb-12 max-w-2xl leading-relaxed">
              Utbildningsportalen innehåller våra mest djupgående kurser, videolektioner och arbetsmaterial. 
              Som Premium-medlem får du obegränsad tillgång till allt material och vår digitala gemenskap.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-3xl">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center group hover:bg-white/10 transition-colors">
                <PlayCircle className="text-orange-500 mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-white uppercase tracking-wider">Videolektioner</span>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center group hover:bg-white/10 transition-colors">
                <BookOpen className="text-orange-500 mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-white uppercase tracking-wider">Studiematerial</span>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center group hover:bg-white/10 transition-colors">
                <ShieldCheck className="text-orange-500 mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-white uppercase tracking-wider">Certifikat</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <button
                onClick={() => setPage(Page.PREMIUM_APPLICATION)}
                className="px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-orange-500/20 flex items-center gap-3 group text-lg"
              >
                Ansök om Premium-medlemskap
                <Sparkles className="w-5 h-5 group-hover:animate-spin-slow" />
              </button>
              
              <button
                onClick={() => setPage(Page.GESTALT_TRAINING)}
                className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all flex items-center gap-3 border border-white/10"
              >
                Läs mer om våra utbildningar
              </button>
            </div>

            <div className="mt-12 flex items-center gap-2 text-slate-500 text-sm font-medium">
              <ShieldCheck size={16} />
              Säker betalning via Stripe • Ingen bindningstid
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
