import React, { useState } from 'react';
import CTAButton from './CTAButton';
import { useTranslations } from '../hooks';

interface LoginFormProps {
    onLoginSuccess: () => void;
    onBackClick: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess, onBackClick }) => {
    const { t } = useTranslations();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password === 'Styrelse') {
            setError('');
            onLoginSuccess();
        } else {
            setError(t.loginError);
        }
    };

    return (
        <div className="container mx-auto px-6 py-12 max-w-lg">
            <button onClick={onBackClick} className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-200 mb-6 flex items-center group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform duration-200 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {t.goBack}
            </button>
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-white/20 dark:border-slate-700">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{t.loginTitle}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">{t.loginSubtitle}</p>
                
                <form onSubmit={handleSubmit} noValidate>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="login-email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                                {t.formEmailLabel}
                            </label>
                            <div className="mt-2">
                                <input
                                    id="login-email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 py-2 px-3 bg-slate-100 dark:bg-slate-700 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                    placeholder={t.formEmailPlaceholder}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                                {t.loginPassword}
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 py-2 px-3 bg-slate-100 dark:bg-slate-700 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && <p className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
                        
                        <div className="mt-8">
                           <CTAButton type="submit">
                                {t.loginSubmit}
                            </CTAButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
  };

export default LoginForm;
