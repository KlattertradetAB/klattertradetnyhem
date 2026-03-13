import React, { useState, useEffect } from 'react';
import type { NavigationCategory, HandbookSection } from '../types';
import { HANDBOOK_SECTIONS } from '../constants';

// --- Utility Functions for Fuzzy Search ---

/**
 * Converts a ReactNode to a plain string for searching.
 * Recursively extracts text from children.
 * @param node The ReactNode to convert.
 * @returns A plain string representation.
 */
const reactNodeToText = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (node === null || typeof node === 'boolean' || typeof node === 'undefined') return '';
    if (Array.isArray(node)) return node.map(reactNodeToText).join('');
    
    if (React.isValidElement<{ children?: React.ReactNode }>(node) && node.props.children) {
        if (typeof node.type === 'string' && ['input', 'img', 'svg'].includes(node.type)) {
            return '';
        }
        return reactNodeToText(node.props.children);
    }
    return '';
};

/**
 * Calculates the Levenshtein distance between two strings.
 * @param a The first string.
 * @param b The second string.
 * @returns The number of edits required to change `a` into `b`.
 */
const levenshteinDistance = (a: string, b: string): number => {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));

    for (let i = 0; i <= a.length; i += 1) {
        matrix[0][i] = i;
    }
    for (let j = 0; j <= b.length; j += 1) {
        matrix[j][0] = j;
    }

    for (let j = 1; j <= b.length; j += 1) {
        for (let i = 1; i <= a.length; i += 1) {
            const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[j][i] = Math.min(
                matrix[j][i - 1] + 1,        // deletion
                matrix[j - 1][i] + 1,        // insertion
                matrix[j - 1][i - 1] + indicator, // substitution
            );
        }
    }

    return matrix[b.length][a.length];
};

/**
 * Calculates a relevance score for a text based on a query.
 * @param text The text to search within.
 * @param query The search query.
 * @returns A relevance score (higher is better).
 */
const calculateScore = (text: string, query: string): number => {
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase().trim();

    if (!lowerText || !lowerQuery) return 0;
    
    let bestScore = 0;

    // Direct substring match gives a good base score
    const index = lowerText.indexOf(lowerQuery);
    if (index !== -1) {
        const isWordStart = index === 0 || /[\s(]/.test(lowerText[index - 1]);
        bestScore = isWordStart ? 0.9 : 0.7;
    }

    // Fuzzy match score for each word
    const words = lowerText.split(/[\s,.'"`~()\[\]{}?!:;]+/);
    for (const word of words) {
        if (!word) continue;
        const distance = levenshteinDistance(word, lowerQuery);
        const similarity = 1 - (distance / Math.max(word.length, lowerQuery.length));
        if (similarity > bestScore) {
            bestScore = similarity;
        }
    }

    return bestScore;
}


// --- Component ---

interface SidebarProps {
    categories: NavigationCategory[];
    activeSectionId: string;
    readSections: string[];
    bookmarkedSections: string[];
    onSectionClick: (id: string) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    isOpen: boolean;
    onClose: () => void;
    onLogout: () => void;
}

interface SearchResult extends HandbookSection {
    score: number;
}

const LOGO_DATA_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAACAASURBVHgB7N1pkF1V9T/s2f2pnd6Z3qSTCYkISFhCAsbYFeEQVwQQUARHwYFERcEZfDFFRdwYURARARXQBAEERQkEwwhIQkJJJPMdKendaZ7ZvbZ/XGP6Z7emU4yk8xkz+8+P/XUqVNVr169evXqvT5/9d/t9/v9/i4gAAAAAACIq8Z/jX4CAAAAAAAQz5QEAwAAAAAAiP9JBQMAAAAAAID4n1QwAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qWAAAAAAAADAf1PBAAAAAAAAAPG/qW";

const Sidebar: React.FC<SidebarProps> = ({
    categories,
    activeSectionId,
    readSections,
    bookmarkedSections,
    onSectionClick,
    searchQuery,
    onSearchChange,
    isOpen,
    onClose,
    onLogout,
}) => {
    const [openCategories, setOpenCategories] = useState<string[]>([]);
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

    // Effect for managing categories when NOT searching
    useEffect(() => {
        if (searchQuery) {
            setOpenCategories([]); // Collapse categories when searching
            return; 
        }

        const activeCategory = categories.find(cat =>
            cat.sections.some(sec => sec.id === activeSectionId)
        );
        if (activeCategory) {
            setOpenCategories(prev => [...new Set([...prev, activeCategory.title])]);
        }
    }, [activeSectionId, categories, searchQuery]);

    // Effect for performing search
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSearchResults([]);
            return;
        }

        const query = searchQuery.trim();
        const results = HANDBOOK_SECTIONS.map(section => {
            const titleScore = calculateScore(section.title, query);
            const contentScore = calculateScore(reactNodeToText(section.content), query);
            
            // Prioritize title matches heavily
            const totalScore = titleScore * 2 + contentScore;
            
            return {
                ...section,
                score: totalScore
            };
        })
        .filter(result => result.score > 0.5) // Filter out low-relevance results
        .sort((a, b) => b.score - a.score); // Rank by score
        
        setSearchResults(results);
    }, [searchQuery]);


    const handleToggleCategory = (categoryTitle: string) => {
        setOpenCategories(prev =>
            prev.includes(categoryTitle)
                ? prev.filter(t => t !== categoryTitle)
                : [...prev, categoryTitle]
        );
    };

    const isSearching = searchQuery.trim().length > 0;

    const bookmarkedItems = HANDBOOK_SECTIONS.filter(section => bookmarkedSections.includes(section.id));

    return (
        <aside className={`
            w-4/5 max-w-xs sm:max-w-sm
            sm:w-1/3 lg:w-1/4 h-full bg-white/30 dark:bg-slate-900/30 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30 dark:border-white/10
            flex flex-col p-6
            transform transition-transform duration-300 ease-in-out z-50
            fixed sm:static sm:translate-x-0
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
            <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                    <img src={LOGO_DATA_URL} alt="Horizonten Logo" className="w-12 h-12" />
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        Handbok
                    </h1>
                </div>
                 <button 
                    onClick={onClose} 
                    className="sm:hidden p-2 -mr-2 rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 hover:text-slate-800 dark:hover:text-slate-200"
                    aria-label="Stäng menyn"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder="Sök i handboken..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/50 dark:bg-slate-800/50 rounded-lg border border-slate-300 dark:border-slate-700 dark:text-white dark:placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-blue-600 dark:focus:border-blue-500 transition-shadow outline-none"
                    aria-label="Sök i handboken"
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-slate-500 dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
            <nav className="flex-1 overflow-y-auto -mr-2 pr-2">
                {isSearching ? (
                    <div>
                        <h3 className="px-3 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Sökresultat</h3>
                        {searchResults.length > 0 ? (
                            <ul className="space-y-1">
                                {searchResults.map(result => (
                                    <li key={result.id}>
                                        <a
                                            href={`#${result.id}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                onSectionClick(result.id);
                                                onClose();
                                            }}
                                            className={`flex items-center justify-between w-full text-left p-2 rounded-lg transition-colors text-sm ${
                                                activeSectionId === result.id
                                                    ? 'bg-blue-600 dark:bg-blue-500 text-white shadow hover:bg-blue-700 dark:hover:bg-blue-400 font-medium'
                                                    : readSections.includes(result.id)
                                                    ? 'text-slate-500 dark:text-slate-400 font-normal hover:bg-slate-200/50 dark:hover:bg-slate-700/50 hover:text-slate-800 dark:hover:text-slate-200'
                                                    : 'text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200/50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-100'
                                            }`}
                                            aria-current={activeSectionId === result.id ? 'page' : undefined}
                                        >
                                            <span>{result.title}</span>
                                            {readSections.includes(result.id) && activeSectionId !== result.id && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 dark:text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="p-3 text-slate-600 dark:text-slate-400 text-sm italic">Inga resultat för "{searchQuery}".</p>
                        )}
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {bookmarkedItems.length > 0 && (
                            <li>
                                <h3 className="px-3 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-3.13L5 18V4z" /></svg>
                                    Bokmärken
                                </h3>
                                <ul className="space-y-1 mt-1">
                                    {bookmarkedItems.map(section => (
                                         <li key={section.id}>
                                             <a
                                                 href={`#${section.id}`}
                                                 onClick={(e) => {
                                                     e.preventDefault();
                                                     onSectionClick(section.id);
                                                     onClose();
                                                 }}
                                                 className={`flex items-center justify-between w-full text-left p-2 rounded-lg transition-colors text-sm ${
                                                     activeSectionId === section.id
                                                         ? 'bg-blue-600 dark:bg-blue-500 text-white shadow hover:bg-blue-700 dark:hover:bg-blue-400 font-medium'
                                                         : readSections.includes(section.id)
                                                         ? 'text-slate-500 dark:text-slate-400 font-normal hover:bg-slate-200/50 dark:hover:bg-slate-700/50 hover:text-slate-800 dark:hover:text-slate-200'
                                                         : 'text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200/50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-100'
                                                 }`}
                                                 aria-current={activeSectionId === section.id ? 'page' : undefined}
                                             >
                                                 <span>{section.title}</span>
                                                 {readSections.includes(section.id) && activeSectionId !== section.id && (
                                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 dark:text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                                                         <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                     </svg>
                                                 )}
                                             </a>
                                         </li>
                                     ))}
                                </ul>
                           </li>
                        )}
                        {categories.map(category => {
                            const isOpen = openCategories.includes(category.title);
                            return (
                                <li key={category.title}>
                                    <button
                                        onClick={() => handleToggleCategory(category.title)}
                                        className="w-full flex justify-between items-center text-left p-3 rounded-lg transition-colors text-base font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100"
                                        aria-expanded={isOpen}
                                    >
                                        <span>{category.title}</span>
                                        <svg
                                            className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </button>
                                    {isOpen && (
                                        <ul className="pl-4 mt-2 space-y-2 border-l-2 border-slate-300 dark:border-slate-700 ml-2">
                                            {category.sections.map(section => (
                                                <li key={section.id}>
                                                    <a
                                                        href={`#${section.id}`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            onSectionClick(section.id);
                                                            onClose();
                                                        }}
                                                        className={`flex items-center justify-between w-full text-left p-2 rounded-lg transition-colors text-sm ${
                                                            activeSectionId === section.id
                                                                ? 'bg-blue-600 dark:bg-blue-500 text-white shadow hover:bg-blue-700 dark:hover:bg-blue-400 font-medium'
                                                                : readSections.includes(section.id)
                                                                ? 'text-slate-500 dark:text-slate-400 font-normal hover:bg-slate-200/50 dark:hover:bg-slate-700/50 hover:text-slate-800 dark:hover:text-slate-200'
                                                                : 'text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200/50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-100'
                                                        }`}
                                                        aria-current={activeSectionId === section.id ? 'page' : undefined}
                                                    >
                                                        <span>{section.title}</span>
                                                        {readSections.includes(section.id) && activeSectionId !== section.id && (
                                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 dark:text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        )}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </nav>
            <div className="mt-6 pt-6 border-t border-slate-300 dark:border-slate-700">
                <button 
                    onClick={onLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg transition-colors font-semibold"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V5h10a1 1 0 100-2H3zm12.293 4.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L17.586 13H10a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Logga ut
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
