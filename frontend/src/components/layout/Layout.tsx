import React from 'react';
import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/auth';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { Home, Map, Calendar, HelpCircle, Lightbulb, Sun, Moon, LogOut } from 'lucide-react';

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isDark, toggleDarkMode } = useDarkMode();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/', label: 'Dashboard', icon: Home },
        { path: '/roadmap', label: 'Roadmap', icon: Map },
        { path: '/daily-plan', label: 'Daily Plan', icon: Calendar },
        { path: '/quiz', label: 'Quiz', icon: HelpCircle },
        { path: '/intuition', label: 'Hints', icon: Lightbulb },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 transition-colors duration-300">
            <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <button
                            onClick={() => navigate('/')}
                            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-500 dark:to-primary-400 bg-clip-text text-transparent hover:opacity-80 transition-smooth"
                        >
                            GuidedAI
                        </button>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                const IconComponent = item.icon;
                                return (
                                    <button
                                        key={item.path}
                                        onClick={() => navigate(item.path)}
                                        className={`
                                            flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
                                            ${isActive
                                                ? 'bg-primary-600 dark:bg-primary-500 text-white shadow-md'
                                                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                                            }
                                        `}
                                    >
                                        <IconComponent size={18} />
                                        {item.label}
                                    </button>
                                );
                            })}
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            {/* Dark Mode Toggle */}
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
                                aria-label="Toggle dark mode"
                            >
                                {isDark ? <Sun size={20} /> : <Moon size={20} />}
                            </button>

                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-all duration-200"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="lg:hidden border-t border-slate-200 dark:border-slate-700 px-4 py-2 overflow-x-auto">
                    <div className="flex gap-2">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            const IconComponent = item.icon;
                            return (
                                <button
                                    key={item.path}
                                    onClick={() => navigate(item.path)}
                                    className={`
                                        flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200
                                        ${isActive
                                            ? 'bg-primary-600 dark:bg-primary-500 text-white'
                                            : 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700'
                                        }
                                    `}
                                >
                                    <IconComponent size={16} />
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </header>

            <main className="flex-grow">
                {children}
            </main>

            <footer className="bg-slate-900 dark:bg-slate-950 text-white py-8 mt-auto border-t border-slate-800 dark:border-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-slate-400 dark:text-slate-500">
                        GuidedAI © 2026
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-600 mt-1">
                        Learn by thinking, not by copying
                    </p>
                </div>
            </footer>
        </div>
    );
};
