

import React from 'react';

export interface HandbookSection {
    id: string;
    title: string;
    content: React.ReactNode;
}

export interface NavigationCategory {
    title: string;
    sections: HandbookSection[];
}

export interface GlossaryTerm {
    term: string;
    definition: string;
}

export interface Event {
    id: string;
    date: { month: string; day: string };
    title: string;
    description: string;
    location: string;
    time?: string; // Optional time for events on detail page
}

export type Theme = 'light' | 'dark';
export type FontSize = 'sm' | 'base' | 'lg';

export interface Word {
    text: string;
    className?: string;
}
