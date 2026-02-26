import React from 'react'

export function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-6 py-12 sm:px-8">
            <div className="w-full max-w-sm space-y-10 bg-white/[0.06] backdrop-blur-3xl p-8 md:p-10 rounded-[2.5rem] border border-white/[0.12] shadow-[0_8px_64px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)] animate-in fade-in zoom-in-95 duration-500">
                {children}
            </div>
        </div>
    )
}
