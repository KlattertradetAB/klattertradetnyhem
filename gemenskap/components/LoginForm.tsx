import React, { useState } from 'react';
import { authService } from '../services/authService';
import { Profile } from '../types';
import { ShieldCheck, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

interface LoginFormProps {
  onLoginSuccess: (profile: Profile) => void;
  initialView?: 'login' | 'signup';
  onNavigateToPremium?: () => void;
  onNavigateToTerms?: () => void;
  onNavigateToPrivacy?: () => void;
  onNavigateToCookies?: () => void;
  onNavigateToContact?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onLoginSuccess,
  initialView = 'login',
  onNavigateToPremium,
  onNavigateToTerms,
  onNavigateToPrivacy,
  onNavigateToCookies,
  onNavigateToContact
}) => {
  const [isLogin, setIsLogin] = useState(initialView === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isLogin) {
        // LOGIN
        await authService.login(email, password);
        // App.tsx listener handles the rest
      }
    } catch (err: any) {
      console.error('Login Error:', err);
      setError(err.message || 'Ett oväntat fel uppstod.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-10 selection:bg-orange-500/30">
        <div className="inline-flex items-center justify-center mb-6">
          <img
            src="/assets/logo2.png"
            alt="Klätterträdet & Horizonten"
            className="h-24 md:h-28 w-auto object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-slate-800">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          {message && (
            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <ShieldCheck className="text-green-400 shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-green-200">{message}</p>
            </div>
          )}

          {!isLogin && (
            <div className="animate-in fade-in slide-in-from-top-4">
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">Namn (Visas för andra)</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Förnamn Efternamn"
                aria-label="Namn"
                required={!isLogin}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">E-post</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="namn@exempel.se"
              aria-label="E-post"
              required
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">Lösenord</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              aria-label="Lösenord"
              required
              minLength={6}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
            />
          </div>

          {!isLogin && (
            <div className="flex items-start gap-3 mt-4 animate-in fade-in slide-in-from-top-2">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 w-4 h-4 bg-slate-800 border-slate-700 rounded text-orange-500 focus:ring-orange-500/50"
              />
              <label htmlFor="terms" className="text-sm text-slate-400 leading-tight">
                Jag godkänner{' '}
                <button
                  type="button"
                  onClick={onNavigateToTerms}
                  className="text-blue-400 hover:text-blue-300 underline font-medium"
                >
                  medlemsvillkoren
                </button>
                {' '}och att mina uppgifter hanteras enligt integritetspolicyn.
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || (!isLogin && !acceptedTerms)}
            className="w-full bg-orange-500 hover:bg-orange-400 disabled:bg-orange-500/30 disabled:text-slate-800 disabled:cursor-not-allowed text-slate-950 font-bold py-4 rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 group transition-all"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                {isLogin ? 'Logga in' : 'Skapa konto'}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </>
            )}
          </button>

          {!isLogin && onNavigateToPremium && (
            <button
              type="button"
              onClick={onNavigateToPremium}
              className="w-full mt-4 bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-xl border border-slate-700 transition-all shadow-lg flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
            >
              Till premium medlemskapet
            </button>
          )}
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <p className="text-slate-500 text-sm">
            Ingen tillgång?{' '}
            <button
              onClick={onNavigateToPremium}
              className="text-orange-400 hover:text-orange-300 font-semibold underline underline-offset-4 focus:outline-none"
            >
              Ansök om medlemskap
            </button>
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-slate-600 text-xs mb-4">
          &copy; 2024 Horizonten Network. Alla rättigheter förbehållna.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-[10px] text-slate-500 uppercase tracking-wider font-medium">
          <button onClick={() => window.alert('Du måste vara inloggad för att ändra kontoinställningar.')} className="hover:text-orange-400 transition-colors">Kontoinställningar</button>
          <button onClick={onNavigateToTerms} className="hover:text-orange-400 transition-colors">Medlemsvillkor</button>
          <button onClick={onNavigateToPrivacy} className="hover:text-orange-400 transition-colors">Integritets- & Sekretesspolicy</button>
          <button onClick={onNavigateToCookies} className="hover:text-orange-400 transition-colors">Cookie-inställningar</button>
          <button onClick={onNavigateToContact} className="hover:text-orange-400 transition-colors">Kontakt</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
