import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, VideoIcon, FileTextIcon, CheckCircleIcon, ChevronRightIcon, PlayIcon, LockIcon, SparklesIcon, SendIcon } from './Icons';
import { Policies } from './Policies';
import type { Course } from '../types';

interface SubModule {
  id: string;
  title: string;
  videoUrl: string;
  assignmentPrompt: string;
}

interface MainModule {
  id: string;
  title: string;
  subModules: SubModule[];
}

interface CourseContentViewProps {
  course: Course;
  user?: any;
  onBack: () => void;
  initialSubModuleId?: string;
  onSubModuleChange?: (subModuleId: string) => void;
}

export const CourseContentView: React.FC<CourseContentViewProps> = ({ 
  course, 
  user, 
  onBack,
  initialSubModuleId,
  onSubModuleChange
}) => {
  // Hypothetical content structure
  const modules = useMemo<MainModule[]>(() => [
    {
      id: 'm1',
      title: 'Modul 1: Grundläggande principer',
      subModules: [
        { id: 's1-1', title: 'Introduktion till ämnet', videoUrl: '#', assignmentPrompt: 'Beskriv dina förväntningar på kursen och hur du planerar att använda dina nya kunskaper.' },
        { id: 's1-2', title: 'Historisk tillbakablick', videoUrl: '#', assignmentPrompt: 'Vilka historiska milstolpar anser du vara mest betydelsefulla för dagens praktik?' },
        { id: 's1-3', title: 'Etiska överväganden', videoUrl: '#', assignmentPrompt: 'Ge ett exempel på ett etiskt dilemma som kan uppstå i din yrkesroll.' },
        { id: 's1-4', title: 'Teoretiska ramverk', videoUrl: '#', assignmentPrompt: 'Sammanfatta de viktigaste teorierna som presenterades i föreläsningen.' },
        { id: 's1-5', title: 'Praktisk tillämpning del 1', videoUrl: '#', assignmentPrompt: 'Hur skulle du applicera teori X i en klientsituation?' },
        { id: 's1-6', title: 'Reflektion och sammanfattning', videoUrl: '#', assignmentPrompt: 'Vad är din viktigaste lärdom från Modul 1?' },
      ]
    },
    {
      id: 'm2',
      title: 'Modul 2: Fördjupning och metodik',
      subModules: [
        { id: 's2-1', title: 'Metodval och strategier', videoUrl: '#', assignmentPrompt: 'Diskutera för- och nackdelar med de olika metoderna.' },
        { id: 's2-2', title: 'Kommunikationstekniker', videoUrl: '#', assignmentPrompt: 'Beskriv en situation där aktivt lyssnande gjorde skillnad.' },
      ]
    }
  ], []);

  const [activeSubModuleId, setActiveSubModuleId] = useState<string>(initialSubModuleId || modules[0].subModules[0].id);
  const [completedSubModules, setCompletedSubModules] = useState<Set<string>>(new Set());
  const [activeStep, setActiveStep] = useState<'video-1' | 'questions' | 'video-2' | 'summary'>('video-1');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isVideo1Watched, setIsVideo1Watched] = useState(false);
  const [isVideo2Watched, setIsVideo2Watched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (onSubModuleChange) {
      onSubModuleChange(activeSubModuleId);
    }
  }, [activeSubModuleId, onSubModuleChange]);

  const activeSubModule = useMemo(() => {
    for (const m of modules) {
      const found = m.subModules.find(s => s.id === activeSubModuleId);
      if (found) return found;
    }
    return modules[0].subModules[0];
  }, [activeSubModuleId, modules]);

  const handleCompleteSubModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVideo2Watched) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      const newCompleted = new Set(completedSubModules);
      newCompleted.add(activeSubModuleId);
      setCompletedSubModules(newUnlocked => new Set([...newUnlocked, activeSubModuleId]));
      
      // Find next sub-module
      let flatSubModules: SubModule[] = [];
      modules.forEach(m => flatSubModules.push(...m.subModules));
      const currentIndex = flatSubModules.findIndex(s => s.id === activeSubModuleId);
      
      if (currentIndex < flatSubModules.length - 1) {
        setActiveSubModuleId(flatSubModules[currentIndex + 1].id);
        setAnswers({});
        setIsVideo1Watched(false);
        setIsVideo2Watched(false);
        setActiveStep('video-1');
      }
      
      setIsSubmitting(false);
    }, 1000);
  };

  const isSubModuleLocked = (subModuleId: string) => {
    let flatSubModules: SubModule[] = [];
    modules.forEach(m => flatSubModules.push(...m.subModules));
    const index = flatSubModules.findIndex(s => s.id === subModuleId);
    if (index === 0) return false;
    return !completedSubModules.has(flatSubModules[index - 1].id);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Tillbaka till översikt</span>
          </button>
          <div className="flex items-center gap-4 text-right">
            <div>
              <h1 className="text-lg font-bold text-white truncate max-w-[200px] sm:max-w-none">{course.title}</h1>
              <p className="text-xs text-orange-500 font-semibold uppercase tracking-wider">Studieportal</p>
            </div>
            <img src="/logo.png" alt="Logo" className="w-8 h-8 hidden sm:block opacity-80" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar - Curriculum */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card no-hover-effect p-6 rounded-2xl border-white/5">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <BookOpenIcon className="w-5 h-5 text-orange-500" />
              Kursinnehåll
            </h2>
            <div className="space-y-8">
              {modules.map((m) => (
                <div key={m.id}>
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">{m.title}</h3>
                  <div className="space-y-2">
                    {m.subModules.map((s) => {
                      const isLocked = isSubModuleLocked(s.id);
                      const isCompleted = completedSubModules.has(s.id);
                      const isActive = activeSubModuleId === s.id;

                      return (
                        <button
                          key={s.id}
                          disabled={isLocked}
                          onClick={() => {
                            setActiveSubModuleId(s.id);
                            setAnswers({});
                            setIsVideo1Watched(false);
                            setIsVideo2Watched(false);
                            setActiveStep('video-1');
                          }}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left border ${
                            isActive 
                              ? 'bg-orange-500/10 border-orange-500/30 text-white' 
                              : isLocked 
                                ? 'opacity-50 cursor-not-allowed border-transparent' 
                                : 'hover:bg-white/5 border-transparent text-slate-400'
                          }`}
                        >
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            isCompleted ? 'bg-green-500/20 text-green-500' : isActive ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-500'
                          }`}>
                            {isCompleted ? <CheckCircleIcon className="w-5 h-5" /> : isLocked ? <LockIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4 fill-current" />}
                          </div>
                          <span className="text-sm font-medium flex-1">{s.title}</span>
                          {isActive && <ChevronRightIcon className="w-4 h-4" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - SubModule Player */}
        <div className="lg:col-span-8 space-y-8">
          <motion.div 
            key={activeSubModule.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Step Selection Logic */}
            <AnimatePresence mode="wait">
              {activeStep === 'video-1' ? (
                <motion.div
                  key="video-1-step"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {/* Video Player Placeholder */}
                  <div className="aspect-video bg-slate-900 rounded-3xl overflow-hidden border border-white/10 relative group shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent mix-blend-overlay"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-[2px] group-hover:backdrop-blur-none transition-all duration-700">
                      <div 
                        className="relative w-24 h-24 flex items-center justify-center cursor-pointer"
                        onClick={() => setIsVideo1Watched(true)}
                      >
                        <div className="absolute inset-0 bg-orange-600 rounded-full blur-xl opacity-40 group-hover:opacity-60 animate-pulse"></div>
                        <div className="relative w-20 h-20 rounded-full bg-orange-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform active:scale-95 z-10">
                          <PlayIcon className="w-10 h-10 text-white fill-white ml-1" />
                        </div>
                      </div>
                      <p className="mt-6 font-bold text-white tracking-[0.2em] uppercase text-[10px] bg-slate-950/50 px-4 py-2 rounded-full border border-white/5 backdrop-blur-md">Föreläsning - Del 1</p>
                      <p className="text-slate-400 text-[10px] mt-2 font-mono">12:45 • HD 4K</p>
                    </div>
                    {isVideo1Watched && (
                      <div className="absolute top-6 right-6 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in zoom-in">
                        <CheckCircleIcon className="w-3 h-3" />
                        <span>DEL 1 SEDD</span>
                      </div>
                    )}
                  </div>

                  <div className="glass-card no-hover-effect p-8 rounded-3xl border-white/5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-orange-500">
                        <VideoIcon className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">Innehåll - Del 1</span>
                      </div>
                      <div className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded-full font-bold">STEG 1 AV 4</div>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">{activeSubModule.title} (Introduktion)</h2>
                    <p className="text-slate-400 leading-relaxed mb-8">
                      Välkommen till den inledande delen av {activeSubModule.title}. Här lägger vi fokus på grundläggande begrepp. Se filmen och gå sedan vidare till de första reflektionsfrågorna.
                    </p>
                    
                    <div className="flex justify-center sm:justify-start">
                      <button 
                        onClick={() => setActiveStep('questions')}
                        className={`group flex items-center gap-3 font-bold py-4 px-10 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                          isVideo1Watched 
                            ? 'bg-orange-600 hover:bg-orange-500 text-white shadow-orange-600/20' 
                            : 'bg-slate-800 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <span>Se film 1 klar – Gå till uppgifter</span>
                        <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : activeStep === 'questions' ? (
                <motion.div
                  key="questions-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="glass-card no-hover-effect p-4 px-8 rounded-full border-white/5 flex items-center justify-between">
                     <button onClick={() => setActiveStep('video-1')} className="text-xs text-slate-400 hover:text-white flex items-center gap-2">
                        <ArrowLeftIcon className="w-3 h-3" />
                        Tillbaka till film 1
                     </button>
                     <div className="text-[10px] bg-orange-500/20 text-orange-500 px-3 py-1 rounded-full font-bold uppercase tracking-widest">Steg 2 AV 4: Fördjupande frågor</div>
                  </div>

                  <div className="space-y-12">
                    {[
                      { id: 'q1', context: 'Reflektera över din roll i relation till patientens behov.', question: 'Hur kan du balansera empati och professionalism i denna situation?' },
                      { id: 'q2', context: 'Kommunikation är nyckeln till förtroende.', question: 'Vilka verktyg från föreläsningen skulle du använda för att hantera ett laddat samtal?' },
                      { id: 'q3', context: 'Gränssättning skyddar både dig och patienten.', question: 'Ge ett exempel på en tydlig men respektfull gränssättning.' },
                      { id: 'q4', context: 'Självreflektion minskar risken för sekundär traumatisering.', question: 'Hur tar du hand om dig själv efter ett svårt arbetspass?' },
                      { id: 'q5', context: 'Teamarbete stärker vårdkvaliteten.', question: 'När är det viktigast att be en kollega om råd?' },
                      { id: 'q6', context: 'Dokumentation är en del av behandlingen.', question: 'Vad är viktigast att förmedla i den skriftliga rapporten?' }
                    ].map((item, idx) => (
                      <div key={item.id} className="glass-card no-hover-effect p-8 rounded-3xl border-white/5 relative">
                        <div className="flex items-center gap-2 text-blue-400 mb-4 opacity-70">
                          <SparklesIcon className="w-3 h-3" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">{item.context}</span>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-6 leading-tight">{item.question}</h4>
                        <textarea 
                          value={answers[item.id] || ''}
                          onChange={(e) => setAnswers(prev => ({ ...prev, [item.id]: e.target.value }))}
                          placeholder="Skriv din reflektion här..."
                          className="w-full min-h-[120px] bg-slate-950/50 border border-slate-800 rounded-2xl p-6 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all resize-none shadow-inner"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center py-8">
                    <button
                      onClick={() => setActiveStep('video-2')}
                      disabled={Object.keys(answers).filter(k => k.startsWith('q')).length < 6 || Object.values(answers).some(v => !(v as string).trim())}
                      className="flex items-center gap-3 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-5 px-12 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                      <span>Nästa föreläsning</span>
                      <ChevronRightIcon className="w-6 h-6" />
                    </button>
                  </div>
                </motion.div>
              ) : activeStep === 'video-2' ? (
                <motion.div
                  key="video-2-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="glass-card no-hover-effect p-4 px-8 rounded-full border-white/5 flex items-center justify-between">
                     <button onClick={() => setActiveStep('questions')} className="text-xs text-slate-400 hover:text-white flex items-center gap-2">
                        <ArrowLeftIcon className="w-3 h-3" />
                        Tillbaka till frågor
                     </button>
                     <div className="text-[10px] bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full font-bold uppercase tracking-widest">Steg 3 AV 4: Fördjupad föreläsning</div>
                  </div>

                  <div className="aspect-video bg-slate-900 rounded-3xl overflow-hidden border border-white/10 relative group shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent mix-blend-overlay"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-[2px] group-hover:backdrop-blur-none transition-all duration-700">
                      <div 
                        className="relative w-24 h-24 flex items-center justify-center cursor-pointer"
                        onClick={() => setIsVideo2Watched(true)}
                      >
                        <div className="absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-40 group-hover:opacity-60 animate-pulse"></div>
                        <div className="relative w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform active:scale-95 z-10">
                          <PlayIcon className="w-10 h-10 text-white fill-white ml-1" />
                        </div>
                      </div>
                      <p className="mt-6 font-bold text-white tracking-[0.2em] uppercase text-[10px] bg-slate-950/50 px-4 py-2 rounded-full border border-white/5 backdrop-blur-md">Föreläsning - Del 2</p>
                      <p className="text-slate-400 text-[10px] mt-2 font-mono">15:20 • HD 4K</p>
                    </div>
                    {isVideo2Watched && (
                      <div className="absolute top-6 right-6 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in zoom-in">
                        <CheckCircleIcon className="w-3 h-3" />
                        <span>DEL 2 SEDD</span>
                      </div>
                    )}
                  </div>

                  <div className="glass-card no-hover-effect p-8 rounded-3xl border-white/5">
                    <h3 className="text-2xl font-bold text-white mb-4">Den fördjupade integrationsfasen</h3>
                    <p className="text-slate-400 leading-relaxed mb-6">
                      I denna andra film går vi djupare in på tillämpningen i komplexa situationer. Se filmen och avsluta sedan med din slutliga sammanfattning till kursledaren.
                    </p>
                    <div className="flex justify-center sm:justify-start">
                      <button 
                        onClick={() => setActiveStep('summary')}
                        className={`group flex items-center gap-3 font-bold py-4 px-10 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                          isVideo2Watched 
                            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20' 
                            : 'bg-slate-800 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <span>Gå till slutlig sammanfattning</span>
                        <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="summary-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="glass-card no-hover-effect p-4 px-8 rounded-full border-white/5 flex items-center justify-between">
                     <button onClick={() => setActiveStep('video-2')} className="text-xs text-slate-400 hover:text-white flex items-center gap-2">
                        <ArrowLeftIcon className="w-3 h-3" />
                        Tillbaka till film 2
                     </button>
                     <div className="text-[10px] bg-green-500/20 text-green-500 px-3 py-1 rounded-full font-bold uppercase tracking-widest">Steg 4 AV 4: Slutsteg</div>
                  </div>

                  <div className="glass-card no-hover-effect p-10 rounded-[3rem] border-white/5 space-y-12">
                    <div className="text-center space-y-2">
                      <h3 className="text-3xl font-bold text-white">Slutreflektion</h3>
                      <p className="text-slate-400">Sammanfatta din inlärning från hela delmodulen.</p>
                    </div>

                    {[
                      { id: 's1', question: 'Vilka tre insikter från filmerna tar du med dig till ditt dagliga arbete?' },
                      { id: 's2', question: 'Hur kompletterar litteraturen de praktiska råden i föreläsningarna?' },
                      { id: 's3', question: 'Baserat på de frågor du nyss besvarat, vad är din viktigaste personliga utvecklingspunkt?' }
                    ].map((item, idx) => (
                      <div key={item.id} className="space-y-4">
                        <h4 className="text-lg font-bold text-slate-200">{item.question}</h4>
                        <textarea 
                          value={answers[item.id] || ''}
                          onChange={(e) => setAnswers(prev => ({ ...prev, [item.id]: e.target.value }))}
                          placeholder="Sammanfatta här..."
                          className="w-full min-h-[140px] bg-slate-900 border border-slate-800 rounded-3xl p-6 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all resize-none shadow-xl"
                        />
                      </div>
                    ))}

                    <div className="flex justify-center pt-8 border-t border-white/5">
                      <button
                        onClick={handleCompleteSubModule}
                        disabled={isSubmitting || !answers.s1 || !answers.s2 || !answers.s3}
                        className="group flex items-center gap-3 bg-green-600 hover:bg-green-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-6 px-16 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-green-600/20"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>Lämna in till ansvarig kursledare</span>
                            <SendIcon className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Certificate Preview Placeholder */}
                    <div className="mt-20 pt-12 border-t border-white/5">
                        <div className="text-center mb-8">
                             <div className="inline-flex p-3 rounded-2xl bg-orange-500/10 text-orange-500 mb-4 animate-bounce">
                                <SparklesIcon className="w-8 h-8" />
                             </div>
                             <h4 className="text-2xl font-bold text-white">Ditt Certifikat Väntar</h4>
                             <p className="text-slate-400 text-sm">När du slutfört hela utbildningen erhåller du ett officiellt certifikat.</p>
                        </div>
                        
                        <div className="relative group max-w-md mx-auto aspect-[1.414/1] bg-white rounded-xl shadow-2xl overflow-hidden p-8 flex flex-col items-center justify-between border-[12px] border-slate-900 ring-2 ring-orange-500/30">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.05)_0%,transparent_70%)]"></div>
                            
                            <img src="/logo.png" alt="Horizonten" className="w-16 h-16 opacity-20 grayscale" />
                            
                            <div className="text-center space-y-4">
                                <h5 className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400">Certifikat för Genomförd Utbildning</h5>
                                <div className="h-px w-20 bg-orange-300 mx-auto opacity-30"></div>
                                <p className="text-2xl font-serif text-slate-800 italic">{user?.displayName || 'Deltagarens Namn'}</p>
                                <p className="text-[8px] text-slate-500 max-w-[200px] mx-auto uppercase">Har med godkänt resultat genomfört samtliga moduler i</p>
                                <p className="text-lg font-bold text-slate-900 tracking-tight">{course.title}</p>
                            </div>
                            
                            <div className="w-full flex justify-between items-end">
                                <div className="text-left">
                                     <div className="h-px w-24 bg-slate-200 mb-1"></div>
                                     <p className="text-[6px] text-slate-400 uppercase">Billy Ljungberg • Kursledare</p>
                                </div>
                                <div className="w-12 h-12 rounded-full border-2 border-orange-500/20 flex items-center justify-center">
                                    <SparklesIcon className="w-6 h-6 text-orange-500/30" />
                                </div>
                            </div>

                            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="text-white font-bold text-xs uppercase tracking-widest bg-orange-600 px-4 py-2 rounded-full shadow-lg">Låses upp efter Modul 6</p>
                            </div>
                        </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Policies />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Re-using BookOpenIcon from Icons.tsx if available, otherwise defining it here
const BookOpenIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);
