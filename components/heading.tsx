import React from 'react'

export function Heading({ children, className = '' }: { children: React.ReactNode, className?: string }) {
    return (
        <h1 className={`text-2xl font-bold tracking-tight text-zinc-950 dark:text-white ${className}`}>
            {children}
        </h1>
    )
}
