
import React, { useState, useEffect } from 'react';
import { useTranslations } from '../hooks';
import { getUpcomingEvents } from '../constants';
import EventItem from './EventItem';
import EventDetailPage from './EventDetailPage';

interface EventCalendarViewProps {
    onBack: () => void;
}

const EventCalendarView: React.FC<EventCalendarViewProps> = ({ onBack }) => {
    const { t } = useTranslations();
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
    const events = getUpcomingEvents(t);
    const selectedEvent = selectedEventId ? events.find(e => e.id === selectedEventId) : null;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [selectedEventId]);

    if (selectedEvent) {
        return (
             <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                     <EventDetailPage event={selectedEvent} onBack={() => setSelectedEventId(null)} />
                </div>
             </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
             <div className="max-w-4xl mx-auto">
                <button
                    onClick={onBack}
                    className="mb-8 flex items-center text-slate-600 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform duration-200 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    {t.goBack}
                </button>

                <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 dark:border-slate-700">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Evenemangskalender</h1>
                    <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">{t.handbookCalendarIntro}</p>

                    <div className="space-y-4">
                        {events.map((event) => (
                            <EventItem key={event.id} event={event} onClick={setSelectedEventId} />
                        ))}
                    </div>
                </div>
             </div>
        </div>
    );
};

export default EventCalendarView;
