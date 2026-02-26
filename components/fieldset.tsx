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
        <label className={`block text-sm font-medium text-white/70 ${className}`}>
            {children}
        </label>
    )
}
