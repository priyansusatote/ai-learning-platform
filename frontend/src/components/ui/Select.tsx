import React from 'react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    label?: string;
    options: SelectOption[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean;
    error?: string;
    helperText?: string;
    disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({
    label,
    options,
    value,
    onChange,
    required,
    error,
    helperText,
    disabled,
}) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <select
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={`
                    w-full px-4 py-3
                    bg-white dark:bg-slate-800
                    border rounded-lg
                    text-slate-900 dark:text-slate-100
                    transition-smooth
                    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${error
                        ? 'border-red-300 dark:border-red-700'
                        : 'border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'
                    }
                `}
            >
                <option value="">Select an option</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
            {helperText && (
                <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
                    {helperText}
                </p>
            )}
        </div>
    );
};
