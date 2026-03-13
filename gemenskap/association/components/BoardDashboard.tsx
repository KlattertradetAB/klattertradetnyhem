import React, { useEffect } from 'react';
import { useTranslations } from '../hooks';
import { getUpcomingEvents, boardHandbookData } from '../constants';
import {
    MemberIcon,
    EventIcon,
    FinanceIcon,
    DocumentsIcon,
    LocationIcon,
    HandbookDocumentIcon,
    HandbookRulesIcon,
    HandbookContactsIcon,
    HandbookArchiveIcon,
    ChevronRightIcon
} from './Icons';


interface BoardDashboardProps {
    onLogout: () => void;
}

const DashboardCard = ({ title, value, description, icon }: { title: string, value: string, description: string, icon: React.ReactNode }) => (
    <div className="bg-white/70 dark:bg-slate-800/30 backdrop-blur-sm p-6 rounded-2xl border border-black/5 dark:border-slate-700/50 shadow-md hover:shadow-xl hover:bg-white dark:hover:bg-slate-700/50 transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
            <div className="text-cyan-600 dark:text-cyan-400">{icon}</div>
        </div>
        <p className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">{value}</p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </div>
);


const HandbookIcons = {
    document: HandbookDocumentIcon,
    rules: HandbookRulesIcon,
    contacts: HandbookContactsIcon,
    archive: HandbookArchiveIcon,
};


const BoardDashboard: React.FC<BoardDashboardProps> = ({ onLogout }) => {
    const { t } = useTranslations();
    const events = getUpcomingEvents(t);
    const handbookItems = boardHandbookData(t);

    useEffect(() => {
        const originalTitle = document.title;
        document.title = `${t.dashboardTitle} | ${t.appName}`;
        return () => {
            document.title = originalTitle;
        };
    }, [t]);

    return (
        <div className="min-h-screen bg-slate-200 dark:bg-slate-900 p-4 sm:p-6 lg:p-8">
            <header className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t.dashboardTitle}</h1>
                    <p className="text-slate-600 dark:text-slate-400">{t.dashboardSubtitle}</p>
                </div>
                <button 
                    onClick={onLogout}
                    className="inline-flex items-center gap-2 rounded-md bg-white dark:bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-white shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 transition-all duration-200 transform hover:scale-105"
                >
                    {t.logout}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                       <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V5h10a1 1 0 100-2H3zm12.293 4.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L17.586 13H10a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </header>
            
            <main>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <DashboardCard title={t.membersOverview} value="84" description={t.newMembersThisMonth} icon={<MemberIcon />} />
                    <DashboardCard title={t.upcomingEvents} value="3" description={t.nextEvent} icon={<EventIcon />} />
                    <DashboardCard title={t.finances} value="12 500 kr" description={t.budgetRemaining} icon={<FinanceIcon />} />
                    <DashboardCard title={t.documents} value="15" description={t.newStatutesUploaded} icon={<DocumentsIcon />} />
                </div>
                 
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t.upcomingEventsListTitle}</h2>
                            <button className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:underline">
                                {t.viewAllEvents}
                            </button>
                        </div>
                        <div className="space-y-4">
                            {events.map((event) => (
                                <div key={event.id} className="bg-white/70 dark:bg-slate-800/30 backdrop-blur-sm p-4 rounded-2xl border border-black/5 dark:border-slate-700/50 shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-4">
                                    <div className="flex-shrink-0 text-center bg-cyan-100 dark:bg-cyan-900/50 rounded-lg p-3 w-20">
                                        <p className="text-sm font-bold text-cyan-700 dark:text-cyan-300">{event.date.month}</p>
                                        <p className="text-3xl font-bold text-slate-800 dark:text-white">{event.date.day}</p>
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-semibold text-lg text-slate-900 dark:text-white">{event.title}</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{event.description}</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 flex items-center">
                                            <LocationIcon />
                                            {event.location}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:mt-0">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{t.handbookTitle}</h2>
                        <div className="bg-white/70 dark:bg-slate-800/30 backdrop-blur-sm p-4 rounded-2xl border border-black/5 dark:border-slate-700/50 shadow-md">
                           <ul className="divide-y divide-slate-200/50 dark:divide-slate-700/50">
                            {handbookItems.map((item) => {
                                const IconComponent = HandbookIcons[item.icon as keyof typeof HandbookIcons];
                                return (
                                    <li key={item.title}>
                                        <a href={item.link} className="group flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors duration-200">
                                            <div className="flex items-center gap-x-4">
                                                <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-lg text-slate-600 dark:text-slate-300 group-hover:bg-cyan-100 dark:group-hover:bg-cyan-900/50 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-200">
                                                    <IconComponent />
                                                </div>
                                                <span className="font-semibold text-slate-800 dark:text-slate-100">{item.title}</span>
                                            </div>
                                            <div className="text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all duration-200">
                                                <ChevronRightIcon />
                                            </div>
                                        </a>
                                    </li>
                                );
                            })}
                           </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BoardDashboard;