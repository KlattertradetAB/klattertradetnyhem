
import React, { useState } from 'react';
import { getPhilosophicalInsight } from '../services/geminiService';

const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    const result = await getPhilosophicalInsight(query);
    setResponse(result);
    setIsLoading(false);
  };

  const clear = () => {
    setQuery('');
    setResponse(null);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 no-print">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="font-medium">AI-Filosofisk Guide</span>
        </button>
      ) : (
        <div className="bg-white w-80 md:w-96 rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <h3 className="font-bold flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Filosofisk Konsult
            </h3>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-500 rounded p-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-4 max-h-96 overflow-y-auto bg-slate-50 space-y-4">
            {response ? (
              <div className="text-sm text-slate-700 bg-white p-4 rounded-lg border border-slate-200 prose prose-slate italic">
                {response}
              </div>
            ) : (
              <p className="text-sm text-slate-500 text-center py-4">
                Ställ en fråga om existentialism, fenomenologi eller gestaltterapi.
              </p>
            )}
            {isLoading && (
              <div className="flex justify-center py-2">
                <div className="animate-bounce h-2 w-2 bg-blue-600 rounded-full mx-1"></div>
                <div className="animate-bounce h-2 w-2 bg-blue-600 rounded-full mx-1 delay-100"></div>
                <div className="animate-bounce h-2 w-2 bg-blue-600 rounded-full mx-1 delay-200"></div>
              </div>
            )}
          </div>

          <div className="p-4 border-top border-slate-200 bg-white">
            <textarea
              className="w-full text-sm border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              rows={3}
              placeholder="Vad menas med epoche?..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="mt-2 flex gap-2">
              <button
                onClick={handleAsk}
                disabled={isLoading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 rounded transition-colors disabled:opacity-50"
              >
                Fråga AI
              </button>
              <button
                onClick={clear}
                className="px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded transition-colors"
              >
                Rensa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIConsultant;
