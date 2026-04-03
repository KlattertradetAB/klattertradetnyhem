import React from 'react';
import { Badge } from '@/components/ui/badge';

interface CalendarRowProps {
    date: string;
    visitors: number;
    views: number;
    highlight?: boolean;
}

export const CalendarRow: React.FC<CalendarRowProps> = ({ date, visitors, views, highlight }) => {
    return (
        <div className={`p-4 rounded-2xl flex items-center justify-between transition-all ${highlight ? 'bg-primary/10 border border-primary/20 shadow-lg shadow-primary/5' : 'bg-accent/20 border border-border/40 opacity-70 hover:opacity-100'}`}>
            <div className="space-y-0.5">
                <div className={`text-[11px] font-black uppercase tracking-widest ${highlight ? 'text-primary' : 'text-foreground'}`}>{date}</div>
                <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase opacity-60">
                    <span>{visitors} Besökare</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>{views} visn.</span>
                </div>
            </div>
            {highlight && (
                <Badge className="bg-primary text-primary-foreground font-black italic rounded-lg">LIVE</Badge>
            )}
        </div>
    );
};
