import React from 'react'

export function Checkbox({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            type="checkbox"
            className={`h-4 w-4 rounded border-white/20 bg-white/[0.06] text-orange-500 focus:ring-orange-500/30 focus:ring-offset-0 transition-colors duration-200 ${className}`}
            {...props}
        />
    )
}

export function CheckboxField({ children, className = '' }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {children}
        </div>
    )
}
