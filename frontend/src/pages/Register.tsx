import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/auth';
import { handleApiError } from '../services/api';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const Register: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        // Client-side validation
        if (password.length < 4) {
            setError('Password must be at least 4 characters');
            return;
        }

        setIsLoading(true);

        try {
            await authService.register({ email, password, name });
            navigate('/');
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            <div className="max-w-md w-full space-y-8 animate-fade-in">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 dark:from-primary-400 dark:via-primary-500 dark:to-accent-400 bg-clip-text text-transparent mb-2">
                        GuidedAI
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-base font-medium">
                        Learn by thinking, not by copying
                    </p>
                    <p className="text-sm text-accent-600 dark:text-accent-400">
                        Your AI mentor for deeper understanding
                    </p>
                </div>

                {/* Register Card */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-1">
                        Begin your journey
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                        Join thousands building deeper understanding
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            type="text"
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            required
                        />

                        <Input
                            type="email"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                        />

                        <Input
                            type="password"
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            helperText="Minimum 4 characters"
                        />

                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            isLoading={isLoading}
                        >
                            {isLoading ? 'Creating account...' : 'Create account'}
                        </Button>
                        <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-4">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="font-medium text-primary-600 dark:text-primary-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                            >
                                Sign in
                            </Link>
                        </p>
                    </form>
                </div>

                {/* Features hint */}
                <div className="text-center space-y-2">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        AI-powered hints • Personalized roadmaps • Progressive learning
                    </p>
                </div>
            </div>
        </div>
    );
};
