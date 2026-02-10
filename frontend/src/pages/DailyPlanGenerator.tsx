import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { learningService } from '../services/learning';
import { handleApiError } from '../services/api';
import { LearningLevel } from '../types/api';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { MarkdownRenderer } from '../components/markdown/MarkdownRenderer';

export const DailyPlanGenerator: React.FC = () => {
    const [goal, setGoal] = useState('');
    const [level, setLevel] = useState<LearningLevel | ''>('');
    const [days, setDays] = useState('');
    const [dailyHours, setDailyHours] = useState('');
    const [plan, setPlan] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const levelOptions = [
        { value: LearningLevel.BEGINNER, label: 'Beginner' },
        { value: LearningLevel.INTERMEDIATE, label: 'Intermediate' },
        { value: LearningLevel.ADVANCED, label: 'Advanced' },
    ];

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setPlan('');

        if (!level) {
            setError('Please select a learning level');
            return;
        }

        const daysNum = parseInt(days);
        const hoursNum = parseInt(dailyHours);

        if (daysNum < 1 || hoursNum < 1) {
            setError('Days and daily hours must be at least 1');
            return;
        }

        setIsLoading(true);

        try {
            const response = await learningService.generateDailyPlan({
                goal,
                level: level as LearningLevel,
                days: daysNum,
                dailyHours: hoursNum,
            });
            setPlan(response.plan);
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            {/* Header */}
            <div className="mb-12 space-y-3">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50">
                    📅 Daily Study Plan
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    Build a personalized, day-by-day study schedule optimized for your time and pace.
                </p>
            </div>

            {/* Form Section */}
            <Card className="mb-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Learning Goal"
                        placeholder="e.g., Master TypeScript, Learn Machine Learning"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        required
                        helperText="What do you want to learn?"
                    />

                    <Select
                        label="Current Level"
                        options={levelOptions}
                        value={level}
                        onChange={(e) => setLevel(e.target.value as LearningLevel)}
                        required
                        helperText="Your current experience level"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Number of Days"
                            type="number"
                            min="1"
                            placeholder="e.g., 7"
                            value={days}
                            onChange={(e) => setDays(e.target.value)}
                            required
                            helperText="Total study duration"
                        />

                        <Input
                            label="Daily Hours"
                            type="number"
                            min="1"
                            placeholder="e.g., 2"
                            value={dailyHours}
                            onChange={(e) => setDailyHours(e.target.value)}
                            required
                            helperText="Hours you can study per day"
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <Button type="submit" fullWidth isLoading={isLoading}>
                        {isLoading ? 'Generating Plan...' : 'Generate Daily Plan'}
                    </Button>
                </form>
            </Card>

            {/* Result Section */}
            {plan && (
                <Card className="bg-gradient-to-br from-primary-50/30 to-white dark:from-primary-900/10 dark:to-slate-800">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="text-5xl transition-smooth">📆</div>
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Your Daily Study Plan</h2>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                A structured schedule tailored to your goals
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900/50 rounded-lg p-6 md:p-8 border border-slate-200 dark:border-slate-700">
                        <MarkdownRenderer content={plan} />
                    </div>
                </Card>
            )}
        </div>
    );
};
