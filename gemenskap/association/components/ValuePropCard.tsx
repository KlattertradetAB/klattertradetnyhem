import React from 'react';

interface ValuePropCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const ValuePropCard: React.FC<ValuePropCardProps> = ({ icon, title, description }) => {
    return (
      <div className="p-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl bg-white/60 backdrop-blur-lg border border-white/20 dark:bg-slate-800/60 dark:border-slate-700/80">
        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-cyan-500 text-white mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="mt-2 text-base text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    );
  };

export default ValuePropCard;