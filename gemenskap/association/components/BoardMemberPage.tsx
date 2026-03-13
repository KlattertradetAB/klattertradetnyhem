
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ContentArea from './ContentArea';
import Feedback from './Feedback';
import { HANDBOOK_SECTIONS, NAVIGATION_CATEGORIES } from '../constants';
import { Theme, FontSize } from '../types';

const READ_SECTIONS_STORAGE_KEY = 'handbook-read-sections';
const BOOKMARKED_SECTIONS_STORAGE_KEY = 'handbook-bookmarked-sections';
const THEME_STORAGE_KEY = 'handbook-theme';
const FONT_SIZE_STORAGE_KEY = 'handbook-font-size';
const CHECKED_ITEMS_STORAGE_KEY = 'handbook-checked-items';

interface BoardMemberPageProps {
    onLogout: () => void;
}

const BoardMemberPage: React.FC<BoardMemberPageProps> = ({ onLogout }) => {
    const [activeSectionId, setActiveSectionId] = useState<string>(HANDBOOK_SECTIONS[0].id);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [readSections, setReadSections] = useState<string[]>([]);
    const [bookmarkedSections, setBookmarkedSections] = useState<string[]>([]);
    const [theme, setTheme] = useState<Theme>('light');
    const [fontSize, setFontSize] = useState<FontSize>('base');
    const [checkedItems, setCheckedItems] = useState<string[]>([]);
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null); // New state for selected event
    
    // Load settings and read sections from localStorage on initial render
    useEffect(() => {
        try {
            // Read sections
            const storedReadSections = localStorage.getItem(READ_SECTIONS_STORAGE_KEY);
            if (storedReadSections) {
                setReadSections(JSON.parse(storedReadSections));
            } else {
                const initialRead = [HANDBOOK_SECTIONS[0].id];
                setReadSections(initialRead);
                localStorage.setItem(READ_SECTIONS_STORAGE_KEY, JSON.stringify(initialRead));
            }

            // Bookmarked sections
            const storedBookmarkedSections = localStorage.getItem(BOOKMARKED_SECTIONS_STORAGE_KEY);
            if (storedBookmarkedSections) {
                setBookmarkedSections(JSON.parse(storedBookmarkedSections));
            }

            // Theme
            const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme;
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (storedTheme && ['light', 'dark'].includes(storedTheme)) {
                setTheme(storedTheme);
            } else if (prefersDark) {
                setTheme('dark');
            }

            // Font size
            const storedFontSize = localStorage.getItem(FONT_SIZE_STORAGE_KEY) as FontSize;
            if (storedFontSize && ['sm', 'base', 'lg'].includes(storedFontSize)) {
                setFontSize(storedFontSize);
            }

            // Checked items for checklist
            const storedCheckedItems = localStorage.getItem(CHECKED_ITEMS_STORAGE_KEY);
            if (storedCheckedItems) {
                setCheckedItems(JSON.parse(storedCheckedItems));
            }

        } catch (error) {
            console.error("Failed to access localStorage:", error);
            setReadSections([HANDBOOK_SECTIONS[0].id]); // Fallback for the initial section
        }
    }, []);

    // Apply theme class to html element and persist setting
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        try {
            localStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch (error) {
            console.error("Failed to write theme to localStorage:", error);
        }
    }, [theme]);

    // Persist font size setting
    useEffect(() => {
        try {
            localStorage.setItem(FONT_SIZE_STORAGE_KEY, fontSize);
        } catch (error) {
            console.error("Failed to write font size to localStorage:", error);
        }
    }, [fontSize]);
    
    // Persist checked items setting
    useEffect(() => {
        try {
            localStorage.setItem(CHECKED_ITEMS_STORAGE_KEY, JSON.stringify(checkedItems));
        } catch (error) {
            console.error("Failed to write checked items to localStorage:", error);
        }
    }, [checkedItems]);
    
    // Persist bookmarked sections setting
    useEffect(() => {
        try {
            localStorage.setItem(BOOKMARKED_SECTIONS_STORAGE_KEY, JSON.stringify(bookmarkedSections));
        } catch (error) {
            console.error("Failed to write bookmarked items to localStorage:", error);
        }
    }, [bookmarkedSections]);


    // Mark current section as read when it changes
    useEffect(() => {
        if (activeSectionId && !readSections.includes(activeSectionId)) {
            const newReadSections = [...new Set([...readSections, activeSectionId])];
            setReadSections(newReadSections);
            try {
                localStorage.setItem(READ_SECTIONS_STORAGE_KEY, JSON.stringify(newReadSections));
            } catch (error) {
                console.error("Failed to write to localStorage:", error);
            }
        }
        // When switching sections, clear any selected event to return to the list view
        if (activeSectionId !== 'evenemangskalender') {
            setSelectedEventId(null);
        }
    }, [activeSectionId, readSections]);

    const handleToggleCheckItem = (itemId: string) => {
        setCheckedItems(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    const handleResetChecklist = () => {
        setCheckedItems([]);
        try {
            localStorage.removeItem(CHECKED_ITEMS_STORAGE_KEY);
        } catch (error) {
            console.error("Failed to clear checked items from localStorage:", error);
        }
    };

    const handleToggleBookmark = (sectionId: string) => {
        setBookmarkedSections(prev =>
            prev.includes(sectionId)
                ? prev.filter(id => id !== sectionId)
                : [...prev, sectionId]
        )
    }

    const handleSectionClick = (id: string) => {
        setActiveSectionId(id);
        if (id !== 'evenemangskalender') {
            setSelectedEventId(null); // Clear selected event if navigating away from calendar
        }
    };

    const handleSelectEvent = (eventId: string | null) => {
        setSelectedEventId(eventId);
    };

    const activeSection = HANDBOOK_SECTIONS.find(s => s.id === activeSectionId) || HANDBOOK_SECTIONS[0];

    return (
        <main className="min-h-screen w-full bg-slate-200 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans p-4 sm:p-6 lg:p-8 overflow-hidden relative">
            {/* Background Blobs - Increased size and blur */}
            <div className="absolute top-0 -left-20 w-[600px] h-[600px] bg-blue-300 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute top-0 -right-20 w-[600px] h-[600px] bg-stone-300 dark:bg-stone-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-10 w-[600px] h-[600px] bg-gray-300 dark:bg-gray-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

            <div className="relative h-[calc(100vh-2rem)] sm:h-[calc(100vh-3rem)] lg:h-[calc(100vh-4rem)] max-w-7xl mx-auto flex flex-row gap-6">
                {/* Overlay for mobile sidebar */}
                {isSidebarOpen && (
                    <div 
                        className="sm:hidden fixed inset-0 bg-black/60 dark:bg-black/80 z-40 transition-opacity"
                        onClick={() => setIsSidebarOpen(false)}
                        aria-hidden="true"
                    ></div>
                )}
                
                <Sidebar
                    categories={NAVIGATION_CATEGORIES}
                    activeSectionId={activeSectionId}
                    readSections={readSections}
                    bookmarkedSections={bookmarkedSections}
                    onSectionClick={handleSectionClick} // Use new handler
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    onLogout={onLogout}
                />
                <ContentArea 
                    section={activeSection} 
                    searchQuery={searchQuery} 
                    onOpenSidebar={() => setIsSidebarOpen(true)}
                    theme={theme}
                    setTheme={setTheme}
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                    checkedItems={checkedItems}
                    onToggleCheckItem={handleToggleCheckItem}
                    bookmarkedSections={bookmarkedSections}
                    onToggleBookmark={handleToggleBookmark}
                    selectedEventId={selectedEventId} // Pass selected event ID
                    onSelectEvent={handleSelectEvent} // Pass event selection handler
                    onResetChecklist={handleResetChecklist} // Pass reset handler
                    key={`${activeSection.id}-${searchQuery}-${selectedEventId}`} 
                />
            </div>
            <Feedback />
        </main>
    );
};

export default BoardMemberPage;
