import React from 'react';

interface CTAButtonProps {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

const CTAButton: React.FC<CTAButtonProps> = ({ children, onClick, href, type = 'button', disabled = false }) => {
    const baseClasses = "inline-block rounded-md px-6 py-3 text-lg font-semibold text-center text-white shadow-sm transition-all duration-300 ease-in-out transform will-change-transform";
    const enabledClasses = "bg-cyan-500 hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 hover:scale-105 hover:shadow-lg";
    const disabledClasses = "bg-gray-400 cursor-not-allowed opacity-70";
    const className = `${baseClasses} ${disabled ? disabledClasses : enabledClasses}`;

    if (href) {
        return (
            <a
                href={disabled ? undefined : href}
                className={className}
                onClick={(e) => {
                    if (disabled) {
                        e.preventDefault();
                    } else if (onClick) {
                        onClick(e);
                    }
                }}
                aria-disabled={disabled}
                role="button"
            >
                {children}
            </a>
        );
    }

    return (
        <button onClick={onClick} className={className} type={type} disabled={disabled}>
            {children}
        </button>
    );
};

export default CTAButton;