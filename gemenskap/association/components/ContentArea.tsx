

import React, { Children, useRef, useState, useEffect } from 'react';
import type { HandbookSection, Event } from '../types';
import type { Theme, FontSize } from '../types';
import { CHECKLIST_DATA, getUpcomingEvents } from '../constants';
import EventItem from './EventItem'; // Import the new EventItem component
import EventDetailPage from './EventDetailPage'; // Import the new EventDetailPage component
import Checklist from './Checklist'; // Import the new Checklist component
import { useTranslations } from '../hooks';


interface ContentAreaProps {
    section: HandbookSection;
    searchQuery: string;
    onOpenSidebar: () => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
    fontSize: FontSize;
    setFontSize: (size: FontSize) => void;
    checkedItems: string[];
    onToggleCheckItem: (itemId: string) => void;
    bookmarkedSections: string[];
    onToggleBookmark: (sectionId: string) => void;
    selectedEventId: string | null; // New prop for selected event
    onSelectEvent: (eventId: string | null) => void; // New prop to handle event selection
    onResetChecklist: () => void; // New prop for resetting checklist
}

const highlightMatches = (node: React.ReactNode, query: string): React.ReactNode => {
    if (!query || query.trim() === '') {
        return node;
    }

    const queryEscaped = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${queryEscaped})`, 'gi');

    return Children.map(node, (child) => {
        if (typeof child === 'string') {
            const parts = child.split(regex);
            
            if (parts.length <= 1) {
                return child;
            }
            
            return (
                <>
                    {parts.map((part, i) =>
                        i % 2 === 1 ? (
                            <mark key={i} className="bg-yellow-300/70 dark:bg-yellow-500/70 rounded px-0.5 text-slate-800 dark:text-slate-900">
                                {part}
                            </mark>
                        ) : (
                            part
                        )
                    )}
                </>
            );
        }

        if (React.isValidElement(child)) {
            const props = child.props as { children?: React.ReactNode; [key: string]: any };

            if (props.children) {
                return React.cloneElement(
                    child,
                    { ...props },
                    highlightMatches(props.children, query)
                );
            }
        }
        
        return child;
    });
};

const SettingsControl: React.FC<Pick<ContentAreaProps, 'theme' | 'setTheme' | 'fontSize' | 'setFontSize'>> = ({ theme, setTheme, fontSize, setFontSize }) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const settingsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isSettingsOpen && settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
                setIsSettingsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isSettingsOpen]);

    return (
        <div className="relative" ref={settingsRef}>
            <button
                onClick={() => setIsSettingsOpen(prev => !prev)}
                className="p-2 rounded-full bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-md hover:bg-white/50 dark:hover:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                aria-label="Anpassa utseende"
                aria-haspopup="true"
                aria-expanded={isSettingsOpen}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-800 dark:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>
            {isSettingsOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-lg shadow-lg p-4 z-20 animate-fade-in">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tema</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button onClick={() => setTheme('light')} className={`px-3 py-2 text-sm rounded-md transition-colors ${theme === 'light' ? 'bg-blue-600 text-white font-semibold shadow' : 'bg-white/20 dark:bg-slate-900/20 border border-white/20 dark:border-white/10 hover:bg-white/40 dark:hover:bg-slate-900/40 text-slate-700 dark:text-slate-300'}`}>Ljust</button>
                                <button onClick={() => setTheme('dark')} className={`px-3 py-2 text-sm rounded-md transition-colors ${theme === 'dark' ? 'bg-blue-500 text-white font-semibold shadow' : 'bg-white/20 dark:bg-slate-900/20 border border-white/20 dark:border-white/10 hover:bg-white/40 dark:hover:bg-slate-900/40 text-slate-700 dark:text-slate-300'}`}>Mörkt</button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Textstorlek</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button onClick={() => setFontSize('sm')} className={`px-3 py-2 text-sm rounded-md transition-colors ${fontSize === 'sm' ? 'bg-blue-600 text-white font-semibold shadow' : 'bg-white/20 dark:bg-slate-900/20 border border-white/20 dark:border-white/10 hover:bg-white/40 dark:hover:bg-slate-900/40 text-slate-700 dark:text-slate-300'}`}>Liten</button>
                                <button onClick={() => setFontSize('base')} className={`px-3 py-2 text-sm rounded-md transition-colors ${fontSize === 'base' ? 'bg-blue-600 text-white font-semibold shadow' : 'bg-white/20 dark:bg-slate-900/20 border border-white/20 dark:border-white/10 hover:bg-white/40 dark:hover:bg-slate-900/40 text-slate-700 dark:text-slate-300'}`}>Normal</button>
                                <button onClick={() => setFontSize('lg')} className={`px-3 py-2 text-sm rounded-md transition-colors ${fontSize === 'lg' ? 'bg-blue-600 text-white font-semibold shadow' : 'bg-white/20 dark:bg-slate-900/20 border border-white/20 dark:border-white/10 hover:bg-white/40 dark:hover:bg-slate-900/40 text-slate-700 dark:text-slate-300'}`}>Stor</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


const ContentArea: React.FC<ContentAreaProps> = ({
    section,
    searchQuery,
    onOpenSidebar,
    theme,
    setTheme,
    fontSize,
    setFontSize,
    checkedItems,
    onToggleCheckItem,
    bookmarkedSections,
    onToggleBookmark,
    selectedEventId, // New prop
    onSelectEvent,    // New prop
    onResetChecklist, // New prop
}) => {
    const { t } = useTranslations();
    const contentRef = useRef<HTMLDivElement>(null);
    const fontSizeClasses = {
        sm: 'prose-sm',
        base: 'prose-base',
        lg: 'prose-lg',
    };
    
    const allEvents: Event[] = getUpcomingEvents(t);
    const selectedEvent = selectedEventId ? allEvents.find(e => e.id === selectedEventId) : null;

    // Scroll to top when section changes or selected event changes
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = 0;
        }
    }, [section.id, selectedEventId]);

    const contentToRender = highlightMatches(section.content, searchQuery);
    const isBookmarked = bookmarkedSections.includes(section.id);
    
    return (
        <div className="flex-1 h-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30 dark:border-white/10 flex flex-col overflow-hidden">
            <header className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
                <div className="flex items-center gap-4 min-w-0">
                     <button onClick={onOpenSidebar} className="sm:hidden p-2 -ml-2 rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        <span className="sr-only">Öppna menyn</span>
                    </button>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 truncate">
                        {selectedEventId && section.id === 'evenemangskalender' ? t.eventDetailsTitle : section.title}
                    </h2>
                    <button 
                        onClick={() => onToggleBookmark(section.id)}
                        className={`p-2 -ml-2 rounded-full transition-colors ${
                            isBookmarked 
                                ? 'text-blue-600 dark:text-blue-500' 
                                : 'text-slate-400 dark:text-slate-500'
                        } hover:bg-slate-200/50 dark:hover:bg-slate-700/50`}
                        aria-label={isBookmarked ? 'Ta bort bokmärke' : 'Lägg till bokmärke'}
                    >
                        {isBookmarked ? (
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-3.13L5 18V4z" />
                            </svg>
                        ) : (
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                        )}
                        <span className="sr-only">{isBookmarked ? 'Ta bort bokmärke' : 'Lägg till bokmärke'}</span>
                    </button>
                </div>
                <SettingsControl theme={theme} setTheme={setTheme} fontSize={fontSize} setFontSize={setFontSize} />
            </header>
            <div ref={contentRef} className="flex-1 overflow-y-auto">
                {section.id === 'evenemangskalender' && selectedEvent ? (
                    <EventDetailPage event={selectedEvent} onBack={() => onSelectEvent(null)} />
                ) : section.id === 'evenemangskalender' ? (
                    <div className="p-6 sm:p-8">
                        <article className={`prose prose-slate dark:prose-invert max-w-none ${fontSizeClasses[fontSize]}`}>
                            <p className="mb-6">
                                {t.handbookCalendarIntro}
                            </p>
                            <div className="space-y-4">
                                {allEvents.map((event) => (
                                    <EventItem key={event.id} event={event} onClick={onSelectEvent} />
                                ))}
                            </div>
                        </article>
                    </div>
                ) : (
                    <div className="p-6 sm:p-8">
                        <article className={`prose prose-slate dark:prose-invert max-w-none ${fontSizeClasses[fontSize]}`}>
                            {contentToRender}
                            {section.id === 'checklista-ny-styrelse' && (
                                <Checklist
                                    checkedItems={checkedItems}
                                    onToggleCheckItem={onToggleCheckItem}
                                    onResetChecklist={onResetChecklist}
                                />
                            )}
                        </article>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentArea;
