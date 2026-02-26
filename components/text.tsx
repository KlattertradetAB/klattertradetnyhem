import React from 'react'

export function Text({ children, className = '' }: { children: React.ReactNode, className?: string }) {
    return (
        <p className={`text-sm text-white/50 ${className}`}>
            {children}
        </p>
    )
}

export function Strong({ children, className = '' }: { children: React.ReactNode, className?: string }) {
    return (
        <strong className={`font-semibold text-white/90 hover:text-white transition-colors duration-200 ${className}`}>
            {children}
        </strong>
    )
}

export function TextLink({ href, children, className = '' }: { href: string, children: React.ReactNode, className?: string }) {
    return (
        <a
            href={href}
            className={`text-white/80 underline decoration-white/20 underline-offset-4 hover:text-white hover:decoration-white/60 transition-all duration-200 ${className}`}
        >
            {children}
        </a>
    )
}
