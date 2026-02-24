import React from 'react'

export function Field({ children, className = '' }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`space-y-2 ${className}`}>
            {children}
        </div>
    )
}

export function Label({ children, className = '' }: { children: React.ReactNode, className?: string }) {
    return (
        <label className={`block text-sm font-medium text-zinc-900 dark:text-zinc-100 ${className}`}>
            {children}
        </label>
    )
}
