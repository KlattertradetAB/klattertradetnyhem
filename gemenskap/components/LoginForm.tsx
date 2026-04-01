import React, { useState } from 'react';
import { authService } from '../services/authService';
import { Profile } from '../types';
import { ShieldCheck, AlertCircle, Loader2, ArrowRight, Key, Mail, User as UserIcon } from 'lucide-react';

interface LoginFormProps {
  onLoginSuccess: (profile: Profile) => void;
  initialView?: 'login' | 'signup' | 'forgot';
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
  const [view, setView] = useState<'login' | 'signup' | 'forgot'>(initialView);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'designer' | 'student' | 'teacher' | 'member'>('member');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showResend, setShowResend] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    setShowResend(false);

    try {
      if (view === 'login') {
        await authService.login(email, password);
      } else if (view === 'signup') {
        await authService.register({
          email,
          password,
          fullName,
          role: role as any,
          membershipLevel: 1,
          membershipActive: true
        });
        
        setMessage('Välkommen! Ditt konto har skapats. Kontrollera din e-post för att bekräfta din adress.');
        // If Supabase is configured to not require confirmation, 
        // the onAuthStateChange in GemenskapApp will handle the redirect automatically.
      } else if (view === 'forgot') {
        await authService.resetPassword(email);
        setMessage('En länk för lösenordsåterställning har skickats till din e-post.');
      }
    } catch (err: any) {
      console.error('Auth Error:', err);
      let errorMsg = err.message || 'Ett oväntat fel uppstod.';
      
      if (err.message?.includes('Email not confirmed')) {
        errorMsg = 'Din e-postadress är inte bekräftad ännu. Vänligen kontrollera din inkorg eller klicka nedan för att skicka en ny länk.';
        setShowResend(true);
      } else if (err.message?.includes('Invalid login credentials')) {
        errorMsg = 'Fel e-postadress eller lösenord. Försök igen.';
      }
      
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (!email) return;
    setLoading(true);
    try {
      await authService.resendVerificationEmail(email);
      setMessage('En ny bekräftelselänk har skickats!');
      setShowResend(false);
    } catch (err: any) {
      setError(err.message || 'Kunde inte skicka om bekräftelsemailet.');
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
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-white mb-1">
              {view === 'login' ? 'Välkommen tillbaka' : view === 'signup' ? 'Skapa konto' : 'Återställ lösenord'}
            </h2>
            <p className="text-sm text-slate-500">
              {view === 'login' ? 'Logga in på din profil' : view === 'signup' ? 'Gör som hundratals andra' : 'Ange din e-post för att fortsätta'}
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl space-y-3 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-red-200">{error}</p>
              </div>
              {showResend && (
                <button
                  type="button"
                  onClick={handleResendEmail}
                  className="w-full py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 text-xs font-bold rounded-lg transition-all"
                >
                  Skicka ny bekräftelselänk
                </button>
              )}
            </div>
          )}

          {message && (
            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <ShieldCheck className="text-green-400 shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-green-200">{message}</p>
            </div>
          )}

          {view === 'signup' && (
            <div className="animate-in fade-in slide-in-from-top-4">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">Fullständigt namn</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-3.5 text-slate-600" size={18} />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Förnamn Efternamn"
                  required
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3.5 pl-12 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-medium"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">E-postadress</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-slate-600" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="namn@exempel.se"
                required
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3.5 pl-12 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-medium"
              />
            </div>
          </div>

          {view !== 'forgot' && (
            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Lösenord</label>
                {view === 'login' && (
                  <button
                    type="button"
                    onClick={() => setView('forgot')}
                    className="text-[10px] font-bold text-orange-500 hover:text-orange-400 transition-colors uppercase tracking-wider"
                  >
                    Glömt lösenordet?
                  </button>
                )}
              </div>
              <div className="relative">
                <Key className="absolute left-4 top-3.5 text-slate-600" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3.5 pl-12 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-medium"
                />
              </div>
            </div>
          )}

          {view === 'signup' && (
            <>
              <div className="flex items-start gap-3 mt-4 animate-in fade-in slide-in-from-top-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 bg-slate-800 border-slate-700 rounded text-orange-500 focus:ring-orange-500/50"
                />
                <label htmlFor="terms" className="text-xs text-slate-500 leading-tight">
                  Jag godkänner{' '}
                  <button type="button" onClick={onNavigateToTerms} className="text-orange-400 hover:text-orange-300 underline font-semibold">medlemsvillkoren</button>
                  {' '}och att mina uppgifter hanteras enligt integritetspolicyn.
                </label>
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Välj intresse (Valfritt)</label>
                <div className="role-radio-group">
                  <label className="label">
                    <input type="radio" name="role" value="member" checked={role === 'member'} onChange={() => setRole('member')} />
                    <p className="text">Allmänt</p>
                  </label>
                  <label className="label">
                    <input type="radio" name="role" value="designer" checked={role === 'designer'} onChange={() => setRole('designer')} />
                    <p className="text">Designer</p>
                  </label>
                  <label className="label">
                    <input type="radio" name="role" value="student" checked={role === 'student'} onChange={() => setRole('student')} />
                    <p className="text">Student</p>
                  </label>
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading || (view === 'signup' && !acceptedTerms)}
            className="w-full bg-orange-500 hover:bg-orange-400 disabled:bg-orange-500/30 disabled:text-slate-800 disabled:cursor-not-allowed text-slate-950 font-black uppercase tracking-[0.2em] text-[11px] py-4 rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 group transition-all active:scale-95"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                {view === 'login' ? 'Logga in' : view === 'signup' ? 'Skapa konto' : 'Återställ lösenord'}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center space-y-4">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            {view === 'login' ? 'Saknar du inloggning?' : 'Har du redan ett konto?'}
            {' '}
            <button
              type="button"
              onClick={() => setView(view === 'login' ? 'signup' : 'login')}
              className="text-orange-400 hover:text-orange-300 transition-colors ml-1"
            >
              {view === 'login' ? 'Registrera dig' : 'Logga in här'}
            </button>
          </p>
          
          {view === 'forgot' && (
            <button
              type="button"
              onClick={() => setView('login')}
              className="text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-widest block mx-auto"
            >
              Tillbaka till inloggning
            </button>
          )}

          <p className="text-slate-500 text-[10px] font-medium leading-relaxed opacity-60">
            Genom att använda denna tjänst godkänner du vår användning av cookies för en optimal upplevelse.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-slate-700 text-[10px] mb-6 font-medium">
          &copy; {new Date().getFullYear()} Horizonten Network. Designad för tillit.
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[10px] text-slate-600 uppercase tracking-widest font-black">
          <button onClick={onNavigateToTerms} className="hover:text-orange-400 transition-colors">Villkor</button>
          <button onClick={onNavigateToPrivacy} className="hover:text-orange-400 transition-colors">Integritet</button>
          <button onClick={onNavigateToContact} className="hover:text-orange-400 transition-colors">Support</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
