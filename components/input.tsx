import React from 'react'

export function Input({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className={`block w-full rounded-xl border border-white/[0.12] bg-white/[0.06] backdrop-blur-md px-4 py-2.5 text-white placeholder:text-white/40 focus:border-white/25 focus:outline-none focus:ring-1 focus:ring-white/20 focus:bg-white/[0.1] transition-all duration-300 sm:text-sm ${className}`}
            {...props}
        />
    )
}
