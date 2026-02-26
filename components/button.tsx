import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

export function Button({ className = '', ...props }: ButtonProps) {
    return (
        <button
            className={`inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-0 disabled:opacity-50 ${className}`}
            {...props} />
    );
}
