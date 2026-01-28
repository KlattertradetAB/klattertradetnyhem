import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { getTranslatedQuestions } from './constants';
import QuestionCard from './components/QuestionCard';
import ResultsDisplay from './components/ResultsDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { analyzeAnswers } from './services/geminiService';
import type { AnalysisResult } from './types';
import Header from './components/Header';
import { useLanguage } from './contexts/LanguageContext';
import { useTranslations } from './translations';


type QuizState = 'idle' | 'active' | 'loading' | 'complete' | 'error';

const App: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState>('idle');
  const [userEmail, setUserEmail] = useState<string>('');
  const { language } = useLanguage();
  const t = useTranslations();

  const quizQuestions = useMemo(() => getTranslatedQuestions(language), [language]);

  const [answers, setAnswers] = useState<number[]>(() => Array(quizQuestions.length).fill(-1));
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastAnsweredIndex = useRef<number | null>(null);

  const handleAnswerChange = useCallback((questionIndex: number, answerValue: number) => {
    lastAnsweredIndex.current = questionIndex;
    setAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionIndex] = answerValue;
      return newAnswers;
    });
  }, []);

  useEffect(() => {
    if (lastAnsweredIndex.current === null) return;

    const nextUnansweredIndex = answers.findIndex((ans, idx) => ans === -1 && idx > lastAnsweredIndex.current!);

    if (nextUnansweredIndex !== -1) {
      setTimeout(() => {
        questionRefs.current[nextUnansweredIndex]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 100);
    }

    lastAnsweredIndex.current = null;
  }, [answers]);

  const handleSubmit = async () => {
    setQuizState('loading');
    setError(null);
    try {
      const scores = answers.map(answer => answer * (20 / 6));
      const result = await analyzeAnswers(scores, language);
      setAnalysisResult(result);
      setQuizState('complete');
    } catch (e) {
      console.error("Error analyzing answers:", e);
      setError(t.analysisError);
      setQuizState('error');
    }
  };

  useEffect(() => {
    setAnswers(Array(quizQuestions.length).fill(-1));
  }, [language, quizQuestions.length]);


  const resetQuiz = () => {
    setAnswers(Array(quizQuestions.length).fill(-1));
    setAnalysisResult(null);
    setUserEmail('');
    setQuizState('idle');
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const allQuestionsAnswered = useMemo(() => answers.every(answer => answer !== -1), [answers]);

  const isEmailValid = useMemo(() => userEmail.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail), [userEmail]);


  const renderContent = () => {
    switch (quizState) {
      case 'idle':
        return (
          <div
            className="text-center p-8 max-w-2xl mx-auto bg-white/40 dark:bg-brand-dark-surface/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-white/10 opacity-0"
            style={{ animation: 'slideInUp 0.5s ease-out 0.1s forwards' }}
          >
            <h1
              className="text-3xl font-bold text-brand-text dark:text-brand-dark-text mt-4 mb-2"
            >
              {t.idleTitle}
            </h1>
            <p
              className="text-gray-600 dark:text-gray-300 mb-4"
              dangerouslySetInnerHTML={{ __html: t.idleWelcome }}
            />
            <div
              className="text-left bg-brand-secondary/10 dark:bg-brand-secondary/20 backdrop-blur-sm border-l-4 border-brand-secondary p-4 rounded-r-lg mb-6"
            >
              <p className="text-gray-700 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: t.idleDescription }} />
            </div>
            <p
              className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t.idleInstructions }}
            />

            <div
              className="w-full max-w-sm mx-auto mb-6"
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.emailPrompt}</label>
              <input
                type="email"
                id="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="din.email@exempel.com"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary bg-white/70 dark:bg-brand-dark-surface text-brand-text dark:text-brand-dark-text"
                required
              />
            </div>

            <div>
              <button
                onClick={() => setQuizState('active')}
                disabled={!isEmailValid}
                className="bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
              >
                {t.startQuizButton}
              </button>
            </div>
          </div>
        );

      case 'active':
        return (
          <div className="w-full max-w-4xl mx-auto">
            <h1 className="text-4xl font-extrabold text-center text-brand-text dark:text-brand-dark-text mb-8">{t.activeTitle}</h1>
            <div className="space-y-6">
              {quizQuestions.map((q, index) => (
                <QuestionCard
                  key={q.id}
                  ref={el => { questionRefs.current[index] = el; }}
                  question={q}
                  questionIndex={index}
                  selectedAnswer={answers[index]}
                  onAnswerSelect={handleAnswerChange}
                />
              ))}
            </div>
            <div className="mt-10 text-center">
              <button
                onClick={handleSubmit}
                disabled={!allQuestionsAnswered}
                className="bg-brand-primary text-white font-bold py-3 px-10 rounded-full transition-all duration-300 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none hover:bg-brand-secondary hover:shadow-xl transform hover:-translate-y-1 active:scale-95"
              >
                {t.submitButton}
              </button>
              {!allQuestionsAnswered && <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm">{t.pleaseAnswerAll}</p>}
            </div>
          </div>
        );

      case 'loading':
        return <LoadingSpinner />;

      case 'complete':
        return analysisResult && <ResultsDisplay result={analysisResult} onReset={resetQuiz} userEmail={userEmail} />;

      case 'error':
        return (
          <div className="text-center p-8 max-w-2xl mx-auto bg-white/50 dark:bg-brand-dark-surface/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-white/10">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-500 mb-4">{t.errorTitle}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">{error}</p>
            <button
              onClick={resetQuiz}
              className="bg-brand-secondary hover:bg-brand-primary text-white font-bold py-2 px-6 rounded-full transition-all duration-300 active:scale-95"
            >
              {t.tryAgainButton}
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen font-sans text-brand-text dark:text-brand-dark-text flex flex-col">

      <main className="flex-grow flex flex-col items-center justify-center min-h-full w-full p-4 sm:p-6 lg:p-8">
        <div key={quizState} className="w-full flex justify-center animate-fade-in py-8">
          {renderContent()}
        </div>
      </main>
      <div className="text-center py-4 mt-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs text-gray-500 dark:text-gray-400">{t.footerText}</p>
      </div>
    </div>
  );
};

export default App;