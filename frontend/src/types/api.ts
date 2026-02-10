// Enums matching backend
export enum LearningLevel {
    BEGINNER = 'BEGINNER',
    INTERMEDIATE = 'INTERMEDIATE',
    ADVANCED = 'ADVANCED',
}

export enum HintDomain {
    DATA_STRUCTURES = 'DATA_STRUCTURES',
    ALGORITHMS = 'ALGORITHMS',
    SYSTEM_DESIGN = 'SYSTEM_DESIGN',
    MATH = 'MATH',
    PROGRAMMING = 'PROGRAMMING',
    GENERAL_LOGIC = 'GENERAL_LOGIC',
}

// Auth DTOs
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
}

export interface AuthResponse {
    accessToken: string;
}

// Roadmap DTOs
export interface RoadmapRequest {
    goal: string;
    level: LearningLevel;
}

export interface RoadmapResponse {
    roadmap: string;
}

// Daily Plan DTOs
export interface DailyPlanRequest {
    goal: string;
    level: LearningLevel;
    days: number;
    dailyHours: number;
}

export interface DailyPlanResponse {
    plan: string;
}

// Quiz DTOs
export interface QuizRequest {
    topic: string;
    level: LearningLevel;
    questionCount: number;
}

export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswerIndex: number;
}

export interface QuizResponse {
    quiz: QuizQuestion[];
}

// Hint DTOs
export interface HintRequest {
    problem: string;
    domain: HintDomain;
    whatUserTried: string;
    hintLevel: number;
}

export interface HintResponse {
    hint: string;
}

// API Error
export interface ApiError {
    message: string;
    status?: number;
}
