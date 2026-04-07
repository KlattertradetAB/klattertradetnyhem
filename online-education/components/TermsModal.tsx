import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UsersIcon, ShieldIcon, LockIcon, SparklesIcon, XIcon, CheckCircleIcon, BookOpenIcon, Edit3Icon } from './Icons';

interface TermsModalProps {
  onAccept: (id: string) => void;
  initialName?: string;
  courseTitle?: string;
  agreementId?: string;
}

export const TermsModal: React.FC<TermsModalProps> = ({ 
  onAccept, 
  initialName = '', 
  courseTitle = 'Horizonten Plattform',
  agreementId = 'platform'
}) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [signatureName, setSignatureName] = useState(initialName);
  const [currentDate] = useState(new Date().toLocaleDateString('sv-SE'));

  // Sync initialName if it changes (e.g. after registration)
  useEffect(() => {
    if (initialName && !signatureName) {
      setSignatureName(initialName);
    }
  }, [initialName]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      setHasScrolled(true);
    }
  };

  const isFormValid = isChecked && signatureName.trim().length > 3;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" 
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-2xl glass-card no-hover-effect rounded-[2.5rem] border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-8 pb-4 border-b border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 blur-3xl rounded-full -mr-16 -mt-16" />
          <h2 className="text-2xl font-extrabold text-white mb-1">Utbildningsavtal & Sekretessförbindelse</h2>
          <p className="text-orange-500 font-bold uppercase tracking-widest text-[10px]">Mellan Klätterträdet AB (Horizonten) och Undertecknad elev</p>
        </div>

        {/* Content */}
        <div 
          onScroll={handleScroll}
          className="p-8 overflow-y-auto space-y-8 custom-scrollbar"
        >
          {/* Section 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-orange-500">
              <BookOpenIcon className="w-5 h-5" />
              <h3 className="font-bold text-white tracking-tight text-lg">1. Tillgång till utbildningsmaterial</h3>
            </div>
            <div className="pl-8 space-y-3">
              <p className="text-slate-400 text-sm leading-relaxed">
                Jag bekräftar att jag köpt tillgång till {courseTitle}. Tillgången är personlig och får ej delas med andra. Inloggningsuppgifter är unika och systemet loggar IP-adresser för att förhindra missbruk.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-blue-400">
              <ShieldIcon className="w-5 h-5" />
              <h3 className="font-bold text-white tracking-tight text-lg">2. Sekretess och spridningsförbud</h3>
            </div>
            <div className="pl-8 space-y-3 font-medium">
              <p className="text-slate-300 text-sm mb-4">Jag förbinder mig att:</p>
              <ul className="space-y-3">
                <li className="text-xs text-slate-400 flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                  <span>Inte dela, kopiera eller distribuera filmer, föreläsningsmaterial eller dokumentation från utbildningen.</span>
                </li>
                <li className="text-xs text-slate-400 flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                  <span>Inte publicera frågor, svar eller diskussioner från plattformen i sociala medier eller andra publika forum.</span>
                </li>
                <li className="text-xs text-slate-400 flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                  <span>Respektera att Self-care modellen och dess specifika terminologi är skyddat material.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-emerald-400">
              <SparklesIcon className="w-5 h-5" />
              <h3 className="font-bold text-white tracking-tight text-lg">3. Examination och Progression</h3>
            </div>
            <div className="pl-8 space-y-3 text-slate-400 text-sm leading-relaxed">
              <p>
                Jag förstår att nästa modul låses upp först efter godkänd genomgång av nuvarande steg. Inga undantag görs från denna pedagogiska struktur då den är utformad för att främja en hållbar professionell utveckling.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-red-500">
              <LockIcon className="w-5 h-5" />
              <h3 className="font-bold text-white tracking-tight text-lg">4. Överträdelse</h3>
            </div>
            <div className="pl-8 space-y-3 text-slate-400 text-sm leading-relaxed">
              <p>
                Vid konstaterat brott mot upphovsrätten eller delning av material avslutas tillgången till utbildningen omedelbart utan återbetalning. Klätterträdet AB förbehåller sig rätten att vidta rättsliga åtgärder vid omfattande spridning av skyddat material.
              </p>
            </div>
          </div>

          {/* Signature Section */}
          <div className="pt-8 border-t border-white/5 space-y-6">
            <div className="flex items-center gap-3 text-orange-500 mb-2">
              <Edit3Icon className="w-5 h-5" />
              <h3 className="font-bold text-white tracking-tight text-lg uppercase text-[10px] tracking-[0.2em]">Underskrift</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Datum</label>
                <div className="w-full bg-slate-900/50 border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-400 cursor-not-allowed">
                  {currentDate}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Namnförtydligande</label>
                <input 
                  type="text" 
                  value={signatureName}
                  onChange={(e) => setSignatureName(e.target.value)}
                  placeholder="Skriv ditt fullständiga namn"
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-orange-500/30 transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Visual Signature Preview */}
            <AnimatePresence>
              {signatureName.trim().length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-orange-600" />
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-4 opacity-50">Digital signatur</p>
                  <p className="text-4xl text-white font-['Caveat'] tracking-wide select-none pointer-events-none">
                    {signatureName}
                  </p>
                  <div className="w-48 h-px bg-slate-700 mt-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-white/5 space-y-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div 
              onClick={() => setIsChecked(!isChecked)}
              className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${
                isChecked 
                  ? 'bg-orange-600 border-orange-600 shadow-[0_0_15px_rgba(234,88,12,0.4)]' 
                  : 'border-slate-700 bg-slate-900 group-hover:border-slate-500'
              }`}
            >
              {isChecked && <CheckCircleIcon className="w-4 h-4 text-white fill-white" />}
            </div>
            <span className="text-sm text-slate-300 font-medium select-none">Jag bekräftar att jag läst, förstått och accepterar avtalet i dess helhet.</span>
          </label>

          <button
            onClick={() => onAccept(agreementId)}
            disabled={!isFormValid}
            className={`w-full py-4 rounded-2xl font-bold transition-all transform active:scale-95 flex items-center justify-center gap-2 ${
              isFormValid
                ? 'bg-orange-600 hover:bg-orange-500 text-white shadow-xl shadow-orange-600/20'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5 opacity-50'
            }`}
          >
            <span>Underteckna & Börja min resa</span>
            <SparklesIcon className={`w-4 h-4 ${isFormValid ? 'animate-pulse text-orange-200' : ''}`} />
          </button>
          
          {!hasScrolled && !isFormValid && (
            <p className="text-center text-[10px] text-slate-600 italic">Scrolla ner för att läsa allt och signera</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};
