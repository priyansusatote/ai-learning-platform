import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { learningService } from '../services/learning';
import { handleApiError } from '../services/api';
import type { QuizQuestion } from '../types/api';
import { LearningLevel } from '../types/api';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const Quiz: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [level, setLevel] = useState<LearningLevel | ''>('');
    const [numQuestions, setNumQuestions] = useState('5');
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [score, setScore] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);
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
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setShowAnswer(false);
        setScore(0);
        setQuizComplete(false);

        if (!level) {
            setError('Please select a level');
            return;
        }

        setIsLoading(true);

        try {
            const response = await learningService.generateQuiz({
                topic,
                level: level as LearningLevel,
                questionCount: parseInt(numQuestions) || 5,
            });
            setQuestions(response.quiz);
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setIsLoading(false);
        }
    };

    const handleAnswerSelect = (answer: string) => {
        if (showAnswer) return;
        setSelectedAnswer(answer);
    };

    const handleCheckAnswer = () => {
        if (!selectedAnswer) return;
        setShowAnswer(true);
        const correctAnswer = currentQuestion.options[currentQuestion.correctAnswerIndex];
        if (selectedAnswer === correctAnswer) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setShowAnswer(false);
        } else {
            setQuizComplete(true);
        }
    };

    const handleRestart = () => {
        setTopic('');
        setLevel('');
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setShowAnswer(false);
        setScore(0);
        setQuizComplete(false);
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            {/* Header */}
            <div className="mb-12 space-y-3">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50">
                    📝 Adaptive Quiz
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    Test your comprehension with AI-generated questions tailored to your level.
                </p>
            </div>

            {questions.length === 0 ? (
                /* Quiz Setup Form */
                <Card>
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-6">Start New Quiz</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Topic"
                            placeholder="e.g., JavaScript Fundamentals, Python Basics"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            required
                            helperText="What topic do you want to test?"
                        />

                        <Select
                            label="Difficulty Level"
                            options={levelOptions}
                            value={level}
                            onChange={(e) => setLevel(e.target.value as LearningLevel)}
                            required
                            helperText="Choose based on your current knowledge"
                        />

                        <Input
                            type="number"
                            label="Number of Questions"
                            value={numQuestions}
                            onChange={(e) => setNumQuestions(e.target.value)}
                            min="1"
                            max="10"
                            required
                            helperText="Choose between 1-10 questions"
                        />

                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <Button type="submit" fullWidth isLoading={isLoading}>
                            {isLoading ? 'Generating Quiz...' : `Start Quiz (${numQuestions} Question${parseInt(numQuestions) !== 1 ? 's' : ''})`}
                        </Button>
                    </form>
                </Card>
            ) : quizComplete ? (
                /* Quiz Complete Screen */
                <Card className="text-center">
                    <div className="space-y-6">
                        <div className="text-7xl">
                            {score === questions.length ? '🎉' : score >= questions.length * 0.6 ? '👏' : '📚'}
                        </div>
                        <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-50">
                            Quiz Complete!
                        </h2>
                        <div className="space-y-2">
                            <div className="text-6xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-500 dark:to-primary-400 bg-clip-text text-transparent">
                                {score}/{questions.length}
                            </div>
                            <p className="text-xl text-slate-600 dark:text-slate-400">
                                {score === questions.length
                                    ? 'Perfect score! Outstanding work! 🌟'
                                    : score >= questions.length * 0.8
                                        ? 'Excellent performance! Keep it up! 💪'
                                        : score >= questions.length * 0.6
                                            ? 'Good job! Room to improve! 📈'
                                            : 'Keep learning! Practice makes perfect! 🚀'}
                            </p>
                        </div>
                        <div className="pt-4">
                            <Button onClick={handleRestart} size="lg">
                                Take Another Quiz
                            </Button>
                        </div>
                    </div>
                </Card>
            ) : (
                /* Quiz Question View */
                <div className="space-y-6">
                    {/* Progress Bar */}
                    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Question {currentQuestionIndex + 1} of {questions.length}
                            </span>
                            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                                Score: {score}/{questions.length}
                            </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                            <div
                                className="bg-gradient-to-r from-primary-600 to-primary-500 h-2.5 rounded-full transition-all duration-500"
                                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Question Card */}
                    <Card>
                        <div className="space-y-6">
                            <div>
                                <div className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium mb-4">
                                    {topic}
                                </div>
                                <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 leading-relaxed">
                                    {currentQuestion.question}
                                </h3>
                            </div>

                            {/* Answer Options */}
                            <div className="space-y-3">
                                {currentQuestion.options.map((option, index) => {
                                    const isSelected = selectedAnswer === option;
                                    const isCorrect = option === currentQuestion.options[currentQuestion.correctAnswerIndex];
                                    const showCorrectness = showAnswer;

                                    let buttonClass = 'w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ';

                                    if (showCorrectness) {
                                        if (isCorrect) {
                                            buttonClass += 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100';
                                        } else if (isSelected) {
                                            buttonClass += 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100';
                                        } else {
                                            buttonClass += 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400';
                                        }
                                    } else {
                                        if (isSelected) {
                                            buttonClass += 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-slate-900 dark:text-slate-50';
                                        } else {
                                            buttonClass += 'border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300';
                                        }
                                    }

                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswerSelect(option)}
                                            disabled={showAnswer}
                                            className={buttonClass}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold ${showCorrectness && isCorrect
                                                    ? 'bg-green-500 text-white'
                                                    : showCorrectness && isSelected
                                                        ? 'bg-red-500 text-white'
                                                        : isSelected
                                                            ? 'bg-primary-500 text-white'
                                                            : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                                                    }`}>
                                                    {String.fromCharCode(65 + index)}
                                                </div>
                                                <span className="text-base font-medium">{option}</span>
                                                {showCorrectness && isCorrect && (
                                                    <svg className="ml-auto w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Explanation (shown after answering) */}
                            {showAnswer && currentQuestion.explanation && (
                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Explanation</h4>
                                            <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">{currentQuestion.explanation}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-2">
                                {!showAnswer ? (
                                    <Button
                                        onClick={handleCheckAnswer}
                                        disabled={!selectedAnswer}
                                        fullWidth
                                    >
                                        Check Answer
                                    </Button>
                                ) : (
                                    <Button onClick={handleNextQuestion} fullWidth>
                                        {currentQuestionIndex < questions.length - 1 ? 'Next Question →' : 'See Results'}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};
