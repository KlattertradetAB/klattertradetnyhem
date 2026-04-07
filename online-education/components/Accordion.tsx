
import React, { useState, useId } from 'react';
import type { CourseBlock } from '../types';
import { ChevronDownIcon, BookOpenIcon, UsersIcon } from './Icons';

interface AccordionProps {
  items: CourseBlock[];
  blockPrefix: 'År' | 'Block';
}

const AccordionItem: React.FC<{
  item: CourseBlock;
  isOpen: boolean;
  onClick: () => void;
  blockPrefix: 'År' | 'Block';
  id: string;
}> = ({ item, isOpen, onClick, blockPrefix, id }) => {
  return (
    <div className="glass-card mb-3 overflow-hidden rounded-2xl">
      <button
        id={`${id}-header`}
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={id}
        className="w-full flex justify-between items-center p-4 sm:p-5 text-left transition-all duration-300 ease-in-out hover:bg-blue-500/5 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 group"
      >
        <div className='flex items-center gap-3 sm:gap-4 min-w-0'>
            <span className="bg-orange-600 dark:bg-orange-500/30 text-white font-bold rounded-lg w-14 sm:w-16 h-10 flex items-center justify-center flex-shrink-0 text-xs sm:text-sm group-hover:scale-105 transition-transform duration-300 shadow-md">
                {item.date ? `B${item.blockNumber}` : `${blockPrefix} ${item.blockNumber}`}
            </span>
            <div className="min-w-0">
              <h3 className="font-semibold text-base sm:text-lg text-blue-950 dark:text-white truncate sm:whitespace-normal">{item.title}</h3>
              {item.date && <p className="text-xs sm:text-sm text-blue-700 dark:text-slate-400">{item.date}</p>}
            </div>
        </div>
        <ChevronDownIcon
          className={`w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-slate-400 transition-transform duration-300 flex-shrink-0 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <div
        id={id}
        role="region"
        aria-labelledby={`${id}-header`}
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
             <div className="px-5 pb-5 pt-2 border-t border-blue-200/50 dark:border-white/10">
                {item.bookReview && item.bookReview.title !== 'N/A' && (
                    <div className='mb-4'>
                        <h4 className='flex items-center gap-2 font-semibold text-orange-600 dark:text-orange-400 mb-2'>
                            <BookOpenIcon className='w-4 h-4' />
                            Bokrecension
                        </h4>
                        <p className='text-sm sm:text-base text-blue-800 dark:text-slate-300 italic'>"{item.bookReview.title}", {item.bookReview.author}</p>
                    </div>
                )}
                <div>
                    <h4 className='flex items-center gap-2 font-semibold text-orange-600 dark:text-orange-400 mb-3'>
                        <UsersIcon className='w-4 h-4' />
                        Ämnen & Innehåll
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-blue-800 dark:text-slate-300">
                        {item.topics.map((topic, index) => (
                        <li key={index} className="leading-relaxed">{topic}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export const Accordion: React.FC<AccordionProps> = ({ items, blockPrefix }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const idPrefix = useId();

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <AccordionItem
          key={item.blockNumber}
          id={`${idPrefix}-${item.blockNumber}`}
          item={item}
          isOpen={openIndex === index}
          onClick={() => handleClick(index)}
          blockPrefix={blockPrefix}
        />
      ))}
    </div>
  );
};
