import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    color: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon: Icon, color }) => {
    return (
        <Card className="bg-card/40 border-border/40 rounded-3xl backdrop-blur-sm overflow-hidden group hover:bg-card/60 transition-all border-b-4 border-b-transparent hover:border-b-primary/50">
            <CardContent className="p-6 space-y-4">
                <div className={`w-10 h-10 rounded-2xl bg-accent/50 flex items-center justify-center ${color}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                    <div className="text-4xl font-black tracking-tighter tabular-nums">{value}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-60 leading-none">{title}</div>
                </div>
            </CardContent>
        </Card>
    );
};
