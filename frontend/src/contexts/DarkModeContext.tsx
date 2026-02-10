import { createContext, useContext, useEffect, useState } from 'react';

interface DarkModeContextType {
    isDark: boolean;
    toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDark, setIsDark] = useState<boolean>(() => {
        // Check localStorage for saved preference
        const saved = localStorage.getItem('darkMode');
        return saved ? JSON.parse(saved) : true; // Default to dark mode
    });

    useEffect(() => {
        // Apply dark mode class to document
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        // Save preference
        localStorage.setItem('darkMode', isDark.toString());
    }, [isDark]);

    const toggleDarkMode = () => {
        setIsDark(!isDark);
    };

    return (
        <DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}

export function useDarkMode() {
    const context = useContext(DarkModeContext);
    if (context === undefined) {
        throw new Error('useDarkMode must be used within a DarkModeProvider');
    }
    return context;
}
