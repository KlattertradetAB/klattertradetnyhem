import React, { useState } from 'react';
import { authService } from '../services/authService';
import { Loader2, ShieldCheck, AlertCircle, ArrowRight, Lock } from 'lucide-react';

interface UpdatePasswordFormProps {
  onSuccess: () => void;
  onBack: () => void;
}

const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = ({ onSuccess, onBack }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Lösenorden matchar inte.');
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      await authService.updatePassword(password);
      setMessage('Ditt lösenord har uppdaterats!');
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err: any) {
      console.error('Update Password Error:', err);
      setError(err.message || 'Kunde inte uppdatera lösenordet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center border border-orange-500/20 shadow-xl">
            <Lock className="text-orange-500" size={32} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Nytt lösenord</h2>
        <p className="text-slate-400 text-sm">Välj ett starkt lösenord för ditt konto</p>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-2xl">
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

          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">Nytt lösenord</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">Bekräfta lösenord</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-medium"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-400 disabled:bg-orange-500/30 text-slate-950 font-black uppercase tracking-[0.2em] text-[11px] py-4 rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 group transition-all"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                Updatera lösenord
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <button
            onClick={onBack}
            className="text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors"
          >
            Avbryt och gå tillbaka
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
