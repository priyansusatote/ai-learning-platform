import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
    const baseStyles = 'bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8 transition-smooth';
    const hoverStyles = hover ? 'hover:shadow-soft-lg hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer' : 'shadow-soft';

    return (
        <div className={`${baseStyles} ${hoverStyles} ${className}`}>
            {children}
        </div>
    );
};
