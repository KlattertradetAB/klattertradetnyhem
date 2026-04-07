import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, LockIcon, PlayIcon } from './Icons';

interface CourseAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  courseTitle: string;
}

export const CourseAccessModal: React.FC<CourseAccessModalProps> = ({ isOpen, onClose, onSuccess, courseTitle }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'kurs' && password === 'kurs') {
      onSuccess();
      onClose();
      setUsername('');
      setPassword('');
      setError(null);
    } else {
      setError('Fel användarnamn eller lösenord. Kontakta oss om du saknar inloggningsuppgifter.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-card no-hover-effect w-full max-w-md p-8 relative border-orange-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <XIcon className="w-6 h-6" />
            </button>

            <div className="text-center space-y-6">
              <div className="inline-flex p-4 rounded-full bg-orange-500/10 text-orange-500 mb-2">
                <LockIcon className="w-10 h-10" />
              </div>
              
              <h2 className="text-3xl font-bold text-white tracking-tight">Påbörja {courseTitle}</h2>
              <p className="text-slate-300 leading-relaxed">
                Denna del av utbildningen kräver en separat inloggning för betalande deltagare.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Användarnamn</label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ange användarnamn"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Lösenord</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ange lösenord"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                    required
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 px-8 rounded-full shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <PlayIcon className="w-5 h-5 fill-white" />
                  <span>Lås upp och påbörja</span>
                </button>
              </form>

              <p className="text-xs text-slate-500">
                Har du glömt dina uppgifter? Kontakta kursansvarig.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
