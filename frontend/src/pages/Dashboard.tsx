import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, Calendar, HelpCircle, Lightbulb } from 'lucide-react';

interface FeatureCardProps {
    Icon: React.ElementType;
    title: string;
    description: string;
    path: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ Icon, title, description, path }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(path)}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 p-8 transition-all duration-300 cursor-pointer hover:shadow-xl hover:border-accent-300 dark:hover:border-accent-600 hover:-translate-y-2 group"
        >
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 dark:from-primary-600 dark:to-accent-600 flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Icon size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{title}</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">{description}</p>
            <div className="flex items-center text-accent-600 dark:text-accent-400 font-medium group-hover:translate-x-1 transition-transform">
                Start learning
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </div>
        </div>
    );
};

export const Dashboard: React.FC = () => {
    const features = [
        {
            Icon: Map,
            title: 'Learning Roadmap',
            description: 'Generate a structured learning path tailored to your goals and experience level.',
            path: '/roadmap',
        },
        {
            Icon: Calendar,
            title: 'Daily Study Plan',
            description: 'Build a personalized, day-by-day study schedule optimized for your time and pace.',
            path: '/daily-plan',
        },
        {
            Icon: HelpCircle,
            title: 'Adaptive Quiz',
            description: 'Test your comprehension with AI-generated questions tailored to your level.',
            path: '/quiz',
        },
        {
            Icon: Lightbulb,
            title: 'Guided Hints',
            description: 'Receive progressive hints that guide your thinking without giving away answers.',
            path: '/intuition',
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 animate-fade-in">
            {/* Hero Section */}
            <div className="text-center mb-12 space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
                    Welcome to <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 dark:from-primary-400 dark:via-primary-500 dark:to-accent-400 bg-clip-text text-transparent">GuidedAI</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                    Your AI mentor for building deeper understanding
                </p>
                <p className="text-base text-accent-600 dark:text-accent-400 font-medium flex items-center justify-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Learn by thinking, not by copying
                </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
                {features.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                ))}
            </div>

            {/* How It Works Section */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-soft-lg border border-slate-200 dark:border-slate-700 p-8 md:p-12">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-10 text-center">
                    How GuidedAI Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="text-center space-y-3">
                        <div className="bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 text-primary-600 dark:text-primary-400 rounded-full w-14 h-14 flex items-center justify-center mx-auto font-bold text-xl shadow-sm">
                            1
                        </div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-50 text-lg">Plan</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Define your learning goals and get a roadmap
                        </p>
                    </div>
                    <div className="text-center space-y-3">
                        <div className="bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 text-primary-600 dark:text-primary-400 rounded-full w-14 h-14 flex items-center justify-center mx-auto font-bold text-xl shadow-sm">
                            2
                        </div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-50 text-lg">Schedule</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Create daily study plans that fit your time
                        </p>
                    </div>
                    <div className="text-center space-y-3">
                        <div className="bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 text-primary-600 dark:text-primary-400 rounded-full w-14 h-14 flex items-center justify-center mx-auto font-bold text-xl shadow-sm">
                            3
                        </div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-50 text-lg">Test</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Validate understanding with AI quizzes
                        </p>
                    </div>
                    <div className="text-center space-y-3">
                        <div className="bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 text-primary-600 dark:text-primary-400 rounded-full w-14 h-14 flex items-center justify-center mx-auto font-bold text-xl shadow-sm">
                            4
                        </div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-50 text-lg">Grow</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Get hints to solve problems independently
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
