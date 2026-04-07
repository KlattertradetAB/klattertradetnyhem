import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../services/supabase';
import { XIcon, LogInIcon } from './Icons';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userData?: any) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSignUp, setIsSignUp] = React.useState(false);
  
  // Registration States
  const [regData, setRegData] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    personalNumber: '',
    password: '',
  });
  const [loginEmail, setLoginEmail] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');
  const [authMode, setAuthMode] = React.useState<'google' | 'email'>('google');
  
  const [agreements, setAgreements] = React.useState({
    relation: false,
    collegial: false,
    ip: false,
    pedagogy: false,
    newsletter: false,
  });

  const isRegValid = 
    regData.fullName && 
    regData.email.includes('@') && 
    regData.password.length >= 6 &&
    regData.phone && 
    regData.personalNumber && 
    agreements.relation && 
    agreements.collegial && 
    agreements.ip && 
    agreements.pedagogy;

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err: any) {
      console.error("Login error:", err);
      setError("Inloggningen med Google misslyckades.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      if (error) throw error;
      onSuccess(data.user);
      onClose();
    } catch (err: any) {
      setError("E-post eller lösenord är felaktigt.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignUp = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Sign up user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: regData.email,
        password: regData.password,
      });

      if (signUpError) throw signUpError;
      if (!data.user) throw new Error("Kunde inte skapa användare");

      // 2. Create profile
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        full_name: regData.fullName,
        email: regData.email,
        newsletter_opt_in: agreements.newsletter
      });

      if (profileError) throw profileError;

      onSuccess({ ...data.user, displayName: regData.fullName, isNewUser: true });
      onClose();
    } catch (err: any) {
      setError(err.message || "Registreringen misslyckades.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
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
                <LogInIcon className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                {isSignUp ? 'Skapa konto' : 'Välkommen tillbaka'}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                {isSignUp 
                  ? 'Fyll i dina uppgifter för att börja din utbildningsresa.' 
                  : 'Logga in för att få tillgång till ditt personliga kursmaterial.'}
              </p>

              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {isSignUp ? (
                <div className="space-y-4 text-left">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Fullständigt namn</label>
                       <input 
                         type="text" 
                         value={regData.fullName}
                         onChange={(e) => setRegData({...regData, fullName: e.target.value})}
                         className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-orange-500/30"
                         placeholder="Förnamn Efternamn"
                       />
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">E-postadress</label>
                       <input 
                         type="email" 
                         value={regData.email}
                         onChange={(e) => setRegData({...regData, email: e.target.value})}
                         className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-orange-500/30"
                         placeholder="din@e-post.se"
                       />
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Välj lösenord (Minst 6 tecken)</label>
                       <input 
                         type="password" 
                         value={regData.password}
                         onChange={(e) => setRegData({...regData, password: e.target.value})}
                         className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-orange-500/30"
                         placeholder="••••••••"
                       />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Personnummer</label>
                         <input 
                           type="text" 
                           value={regData.personalNumber}
                           onChange={(e) => setRegData({...regData, personalNumber: e.target.value})}
                           className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-orange-500/30"
                           placeholder="ÅÅÅÅMMDD-XXXX"
                         />
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Mobilnummer</label>
                         <input 
                           type="tel" 
                           value={regData.phone}
                           onChange={(e) => setRegData({...regData, phone: e.target.value})}
                           className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-orange-500/30"
                           placeholder="07X-XXXXXXX"
                         />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={agreements.newsletter}
                        onChange={() => setAgreements({...agreements, newsletter: !agreements.newsletter})}
                        className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-orange-500"
                      />
                      <span className="text-[11px] text-slate-300">Prenumerera på nyhetsbrev (Valfritt)</span>
                    </label>
                  </div>

                  <div className="pt-4 space-y-2">
                    <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-2">Avtal & Policy</p>
                    {[
                      { id: 'relation', text: 'Tillgång till utbildningsmaterial' },
                      { id: 'collegial', text: 'Sekretess och spridningsförbud' },
                      { id: 'ip', text: 'Examination och Progression' },
                      { id: 'pedagogy', text: 'Överträdelse & Påföljder' },
                    ].map(policy => (
                      <label key={policy.id} className="flex items-start gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={(agreements as any)[policy.id]}
                          onChange={() => setAgreements({...agreements, [policy.id]: !(agreements as any)[policy.id]})}
                          className="w-4 h-4 mt-0.5 rounded border-slate-700 bg-slate-900 text-orange-500"
                        />
                        <span className="text-[11px] text-slate-400">Jag godkänner <strong>{policy.text}</strong></span>
                      </label>
                    ))}
                  </div>

                  <button
                    onClick={handleEmailSignUp}
                    disabled={isLoading || !isRegValid}
                    className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-full shadow-lg transition-all disabled:opacity-30 mt-4"
                  >
                    {isLoading ? 'Laddar...' : 'Skapa mitt konto'}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {authMode === 'google' ? (
                    <button
                      onClick={handleGoogleLogin}
                      disabled={isLoading}
                      className="w-full flex items-center justify-center gap-3 bg-white text-slate-900 font-bold py-4 rounded-full shadow-xl hover:bg-slate-100 transition-all font-sans"
                    >
                      {isLoading ? 'Laddar...' : (
                        <>
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          <span>Logga in med Google</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="space-y-4 text-left">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">E-postadress</label>
                        <input 
                          type="email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-orange-500/30"
                          placeholder="din@e-post.se"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Lösenord</label>
                        <input 
                          type="password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-orange-500/30"
                          placeholder="••••••••"
                        />
                      </div>
                      <button 
                        onClick={handleEmailLogin}
                        disabled={isLoading || !loginEmail || !loginPassword}
                        className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-full shadow-lg transition-all disabled:opacity-30"
                      >
                        {isLoading ? 'Laddar...' : 'Logga in'}
                      </button>
                    </div>
                  )}

                  <div className="pt-2">
                    <button 
                      onClick={() => setAuthMode(authMode === 'google' ? 'email' : 'google')}
                      className="text-xs font-bold text-orange-500 hover:underline"
                    >
                      {authMode === 'google' ? 'Logga in med e-post' : 'Logga in med Google'}
                    </button>
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-slate-800">
                <button 
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-xs font-bold text-orange-400 hover:underline"
                >
                  {isSignUp ? 'Redan medlem? Logga in' : 'Saknar du inlogg? Skapa ett konto'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
