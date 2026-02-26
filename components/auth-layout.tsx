import React from 'react'

export function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-6 py-12 sm:px-8">
            <div className="w-full max-w-sm space-y-10 bg-white/5 dark:bg-slate-900/40 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl animate-in fade-in zoom-in-95 duration-500">
                {children}
            </div>
        </div>
    )
}
