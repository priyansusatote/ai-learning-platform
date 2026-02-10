import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    disabled?: boolean;
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    disabled = false,
    isLoading = false,
}) => {
    const baseStyles = 'font-medium rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center';

    const variantStyles = {
        primary: 'bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white focus:ring-primary-500 shadow-sm dark:bg-primary-500 dark:hover:bg-primary-600',
        secondary: 'bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-900 focus:ring-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-100',
        outline: 'border-2 border-slate-300 hover:border-slate-400 active:border-slate-500 text-slate-700 hover:bg-slate-50 focus:ring-slate-400 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:border-slate-500',
        ghost: 'hover:bg-slate-100 active:bg-slate-200 text-slate-700 focus:ring-slate-400 dark:hover:bg-slate-800 dark:text-slate-300',
    };

    const sizeStyles = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-5 py-3 text-base',
        lg: 'px-6 py-4 text-lg',
    };

    const widthStyle = fullWidth ? 'w-full' : '';

    const className = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle}`;

    return (
        <button
            type={type}
            onClick={onClick}
            className={className}
            disabled={disabled || isLoading}
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                </>
            ) : (
                children
            )}
        </button>
    );
};
