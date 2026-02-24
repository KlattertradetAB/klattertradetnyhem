import React from 'react'

export function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 py-12 dark:bg-zinc-950 sm:px-8">
            <div className="w-full max-w-sm space-y-10">
                {children}
            </div>
        </div>
    )
}
