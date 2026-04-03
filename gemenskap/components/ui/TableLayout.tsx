import React from 'react';

interface TableLayoutProps {
    headers: string[];
    emptyMessage: string;
}

export const TableLayout: React.FC<TableLayoutProps> = ({ headers, emptyMessage }) => {
    return (
        <div className="w-full">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-accent/30 border-b border-border/40">
                        {headers.map(h => (
                            <th key={h} className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground font-sans">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={headers.length} className="px-6 py-24 text-center">
                            <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground opacity-30 italic">
                                {emptyMessage}
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
