import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { learningService } from '../services/learning';
import { handleApiError } from '../services/api';
import { HintDomain } from '../types/api';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { MarkdownRenderer } from '../components/markdown/MarkdownRenderer';

export const Intuition: React.FC = () => {
    const [problem, setProblem] = useState('');
    const [domain, setDomain] = useState<HintDomain | ''>('');
    const [whatUserTried, setWhatUserTried] = useState('');
    const [hintLevel, setHintLevel] = useState<number>(1);
    const [hint, setHint] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const domainOptions = [
        { value: HintDomain.DATA_STRUCTURES, label: 'Data Structures' },
        { value: HintDomain.ALGORITHMS, label: 'Algorithms' },
        { value: HintDomain.SYSTEM_DESIGN, label: 'System Design' },
        { value: HintDomain.MATH, label: 'Math' },
        { value: HintDomain.PROGRAMMING, label: 'Programming' },
        { value: HintDomain.GENERAL_LOGIC, label: 'General Logic' },
    ];

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setHint('');

        if (!domain) {
            setError('Please select a domain');
            return;
        }

        setIsLoading(true);

        try {
            const response = await learningService.getHint({
                problem,
                domain: domain as HintDomain,
                whatUserTried,
                hintLevel,
            });
            setHint(response.hint);
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            {/* Header with USP Badge */}
            <div className="mb-12 space-y-6">
                <div className="space-y-3">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50">
                        💡 Guided Hints
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                        Receive progressive hints that guide your thinking without giving away answers.
                    </p>
                </div>

                {/* Special USP Highlight */}
                <div className="relative overflow-hidden bg-gradient-to-r from-primary-500 to-purple-600 dark:from-primary-600 dark:to-purple-700 rounded-xl p-6 shadow-lg">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="relative flex items-center gap-3">
                        <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                            <span className="text-2xl">✨</span>
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg">Our Philosophy</h3>
                            <p className="text-white/90 text-sm">Learn by thinking, not by copying — we guide your thinking, never reveal the answer</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Input Form */}
            <Card className="mb-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Problem Statement */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Problem Statement <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={problem}
                            onChange={(e) => setProblem(e.target.value)}
                            required
                            rows={5}
                            placeholder="Describe the problem you're trying to solve..."
                            className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-smooth resize-none"
                        />
                    </div>

                    {/* Domain Selection */}
                    <Select
                        label="Domain"
                        options={domainOptions}
                        value={domain}
                        onChange={(e) => setDomain(e.target.value as HintDomain)}
                        required
                        helperText="Choose the area this problem belongs to"
                    />

                    {/* What User Tried */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            What Have You Tried? <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={whatUserTried}
                            onChange={(e) => setWhatUserTried(e.target.value)}
                            required
                            rows={4}
                            placeholder="Explain your approach and where you're stuck..."
                            className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-smooth resize-none"
                        />
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            This helps us provide more relevant hints
                        </p>
                    </div>

                    {/* Hint Level Selector */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Hint Level <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {[1, 2, 3].map((level) => (
                                <button
                                    key={level}
                                    type="button"
                                    onClick={() => setHintLevel(level)}
                                    className={`p-4 rounded-lg border-2 font-medium transition-all ${hintLevel === level
                                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary-300 dark:hover:border-primary-600'
                                        }`}
                                >
                                    <div className="text-2xl mb-2">
                                        {level === 1 ? '🔍' : level === 2 ? '💭' : '🎯'}
                                    </div>
                                    <div className="text-sm font-semibold mb-1">Level {level}</div>
                                    <div className="text-xs opacity-75">
                                        {level === 1 ? 'Gentle nudge' : level === 2 ? 'Clear direction' : 'Strong guidance'}
                                    </div>
                                </button>
                            ))}
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Higher levels provide more specific guidance
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <Button type="submit" fullWidth isLoading={isLoading} size="lg">
                        {isLoading ? 'Thinking...' : 'Get Hint'}
                    </Button>
                </form>
            </Card>

            {/* Hint Result - Special "Thinking Assistant" Design */}
            {hint && (
                <Card className="bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-yellow-50/50 dark:from-amber-900/10 dark:via-orange-900/10 dark:to-yellow-900/10 border-2 border-amber-200/50 dark:border-amber-800/50">
                    <div className="space-y-6">
                        {/* Hint Header */}
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-3xl">💡</span>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                                    Your Hint
                                </h2>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="px-3 py-1 bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 rounded-full font-medium">
                                        Level {hintLevel} Guidance
                                    </div>
                                    <span className="text-slate-600 dark:text-slate-400">•</span>
                                    <span className="text-slate-600 dark:text-slate-400">Think it through step by step</span>
                                </div>
                            </div>
                        </div>

                        {/* Important Reminder */}
                        <div className="bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    <strong>Remember:</strong> This is guidance, not the solution. Use this hint to guide your own thinking.
                                </p>
                            </div>
                        </div>

                        {/* Hint Content */}
                        <div className="bg-white dark:bg-slate-900/50 rounded-xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
                            <MarkdownRenderer content={hint} />
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
};
