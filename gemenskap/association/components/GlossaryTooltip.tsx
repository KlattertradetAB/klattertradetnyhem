
import React from 'react';
import { GLOSSARY_TERMS } from '../glossary';

interface GlossaryTooltipProps {
    children: React.ReactNode;
    termKey?: string;
}

const getTextFromReactNode = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(getTextFromReactNode).join('');
    // FIX: Cast node.props to a type that includes children to resolve TypeScript error.
    if (React.isValidElement<{ children?: React.ReactNode }>(node) && node.props.children) {
        return getTextFromReactNode(node.props.children);
    }
    return '';
};

const GlossaryTooltip: React.FC<GlossaryTooltipProps> = ({ children, termKey }) => {
    const termToFind = termKey || getTextFromReactNode(children);
    const glossaryEntry = GLOSSARY_TERMS.find(
        (entry) => entry.term.toLowerCase() === termToFind.toLowerCase()
    );

    if (!glossaryEntry) {
        return <>{children}</>;
    }

    return (
        <span className="relative group cursor-pointer">
            <span className="text-blue-700 dark:text-blue-400 font-semibold border-b-2 border-blue-500/50 dark:border-blue-400/50 border-dotted">
                {children}
            </span>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 dark:bg-slate-700 text-white dark:text-slate-100 text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                <h4 className="font-bold mb-1">{glossaryEntry.term}</h4>
                <p>{glossaryEntry.definition}</p>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-slate-800 dark:border-t-slate-700"></div>
            </div>
        </span>
    );
};

export default GlossaryTooltip;