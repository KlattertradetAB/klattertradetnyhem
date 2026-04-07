import React from 'react';

interface InfoCardProps {
  icon: React.ReactElement<{ className?: string }>;
  title: string;
  content: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ icon, title, content }) => {
  return (
    <div className="glass-card p-6 text-center flex flex-col items-center">
      <div className="relative group text-orange-500 dark:text-orange-400 mb-4">
        {React.cloneElement(icon, { className: 'w-10 h-10' })}
        <div 
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max whitespace-nowrap px-3 py-1.5 bg-blue-950 dark:bg-slate-800 text-white text-xs font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg"
        >
          {title}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-blue-950 dark:border-t-slate-800"></div>
        </div>
      </div>
      <h3 className="font-bold text-lg text-blue-950 dark:text-white mb-2">{title}</h3>
      <p className="text-blue-800 dark:text-slate-300 text-sm leading-relaxed">{content}</p>
    </div>
  );
};