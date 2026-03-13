

import React from 'react';
import { Event } from '../types';
import { LocationIcon } from './Icons';
import { useTranslations } from '../hooks';

interface EventDetailPageProps {
    event: Event;
    onBack: () => void;
}

const EventDetailPage: React.FC<EventDetailPageProps> = ({ event, onBack }) => {
    const { t } = useTranslations();

    // Helper to render location text with clickable links
    const renderLocation = (loc: string) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = loc.split(urlRegex);
        return parts.map((part, i) => {
            if (part.match(urlRegex)) {
                return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-cyan-600 dark:text-cyan-400 hover:underline break-all">{part}</a>;
            }
            return <span key={i}>{part}</span>;
        });
    };

    return (
        <div className="p-6 sm:p-8">
            <button
                onClick={onBack}
                className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-200 mb-6 group transition-colors duration-200"
                aria-label={t.goBack}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {t.goBack}
            </button>

            <article className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 dark:border-slate-700">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{event.title}</h2>
                        <p className="text-slate-600 dark:text-slate-300 text-lg">{event.description}</p>
                    </div>
                    <div className="flex-shrink-0 self-start md:self-center bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 px-6 py-3 rounded-xl font-bold text-center border border-cyan-200 dark:border-cyan-800/50 min-w-[120px]">
                        <p className="text-base">{event.date.month}</p>
                        <p className="text-4xl">{event.date.day}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3 text-lg text-slate-700 dark:text-slate-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600 dark:text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-semibold">{t.eventTime}:</span> {event.time}
                    </div>
                    <div className="flex items-center gap-3 text-lg text-slate-700 dark:text-slate-300">
                        <LocationIcon className="h-6 w-6 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                        <span className="font-semibold">{t.eventLocation}:</span> 
                        <span className="break-words">
                            {renderLocation(event.location)}
                        </span>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default EventDetailPage;
