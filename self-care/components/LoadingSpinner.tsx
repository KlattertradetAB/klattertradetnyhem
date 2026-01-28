import React from 'react';
import { useTranslations } from '../translations';

const LoadingSpinner: React.FC = () => {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 bg-brand-primary rounded-full animate-pulse-dot"></div>
        <div className="w-4 h-4 bg-brand-primary rounded-full animate-pulse-dot" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-4 h-4 bg-brand-primary rounded-full animate-pulse-dot" style={{ animationDelay: '0.4s' }}></div>
      </div>
      <p className="text-brand-primary dark:text-brand-accent font-semibold mt-6 text-lg">{t.loadingAnalysis}</p>
      <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">{t.loadingTakeAMoment}</p>
    </div>
  );
};

export default LoadingSpinner;