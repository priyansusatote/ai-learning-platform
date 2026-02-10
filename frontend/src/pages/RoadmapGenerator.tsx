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

export const RoadmapGenerator: React.FC = () => {
    const [goal, setGoal] = useState('');
    const [level, setLevel] = useState<LearningLevel | ''>('');
    const [roadmap, setRoadmap] = useState('');
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
        setRoadmap('');

        if (!level) {
            setError('Please select a learning level');
            return;
        }

        setIsLoading(true);

        try {
            const response = await learningService.generateRoadmap({
                goal,
                level: level as LearningLevel,
            });
            setRoadmap(response.roadmap);
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
                    🗺️ Learning Roadmap
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    Generate a structured learning path tailored to your goals and experience level.
                </p>
            </div>

            {/* Form Section */}
            <Card className="mb-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Learning Goal"
                        placeholder="e.g., Learn React, Master Python, Become a Data Scientist"
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
                        helperText="Be honest about your current knowledge level"
                    />

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <Button type="submit" fullWidth isLoading={isLoading}>
                        {isLoading ? 'Generating Roadmap...' : 'Generate Roadmap'}
                    </Button>
                </form>
            </Card>

            {/* Result Section */}
            {roadmap && (
                <Card className="bg-gradient-to-br from-primary-50/30 to-white dark:from-primary-900/10 dark:to-slate-800">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="text-5xl transition-smooth animate-pulse">📋</div>
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Your Learning Roadmap</h2>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                Follow this path to achieve your goal
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900/50 rounded-lg p-6 md:p-8 border border-slate-200 dark:border-slate-700">
                        <MarkdownRenderer content={roadmap} />
                    </div>
                </Card>
            )}
        </div>
    );
};
