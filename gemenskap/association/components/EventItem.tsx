

import React from 'react';
import { Event } from '../types';
import { LocationIcon } from './Icons';

interface EventItemProps {
    event: Event;
    onClick: (eventId: string) => void;
}

const EventItem: React.FC<EventItemProps> = ({ event, onClick }) => {
    return (
        <button
            onClick={() => onClick(event.id)}
            className="w-full text-left bg-white/70 dark:bg-slate-800/30 backdrop-blur-sm p-4 rounded-2xl border border-black/5 dark:border-slate-700/50 shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-4 transform hover:-translate-y-1 hover:border-cyan-200 dark:hover:border-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-200 dark:focus-visible:ring-offset-slate-900"
            aria-label={`Visa detaljer för ${event.title}`}
        >
            <div className="flex-shrink-0 text-center bg-cyan-100 dark:bg-cyan-900/50 rounded-lg p-3 w-20">
                <p className="text-sm font-bold text-cyan-700 dark:text-cyan-300">{event.date.month}</p>
                <p className="text-3xl font-bold text-slate-800 dark:text-white">{event.date.day}</p>
            </div>
            <div className="flex-grow">
                <h3 className="font-semibold text-lg text-slate-900 dark:text-white">{event.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{event.description}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 flex items-center">
                    <LocationIcon />
                    <span className="truncate max-w-[200px]">
                        {event.location.startsWith('http') && !event.location.includes(' ') ? 'Online (Zoom)' : event.location}
                    </span>
                </p>
            </div>
        </button>
    );
};

export default EventItem;
