
import React from 'react';
import { cn } from "../../lib/utils";

export const Pill = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn(
      "inline-flex items-center px-4 py-1.5 rounded-full bg-[#b35c2a]/10 border border-[#b35c2a]/20",
      "text-[10px] font-black uppercase tracking-[0.3em] text-[#b35c2a]",
      className
    )}>
      <span className="relative flex h-2 w-2 mr-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b35c2a] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b35c2a]"></span>
      </span>
      {children}
    </div>
  );
};
