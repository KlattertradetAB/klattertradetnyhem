import React from 'react'

export function Checkbox({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            type="checkbox"
            className={`h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:ring-offset-zinc-900 dark:focus:ring-zinc-400 ${className}`}
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
