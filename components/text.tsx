import React from 'react'

export function Text({ children, className = '' }: { children: React.ReactNode, className?: string }) {
    return (
        <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${className}`}>
            {children}
        </p>
    )
}

export function Strong({ children, className = '' }: { children: React.ReactNode, className?: string }) {
    return (
        <strong className={`font-semibold text-zinc-950 dark:text-white ${className}`}>
            {children}
        </strong>
    )
}

export function TextLink({ href, children, className = '' }: { href: string, children: React.ReactNode, className?: string }) {
    return (
        <a
            href={href}
            className={`text-zinc-950 underline decoration-zinc-950/20 underline-offset-4 hover:decoration-zinc-950 dark:text-white dark:decoration-white/20 dark:hover:decoration-white ${className}`}
        >
            {children}
        </a>
    )
}
