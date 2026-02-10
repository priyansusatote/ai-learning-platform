import { apiClient } from './api';
import type {
    RoadmapRequest,
    RoadmapResponse,
    DailyPlanRequest,
    DailyPlanResponse,
    QuizRequest,
    QuizResponse,
    HintRequest,
    HintResponse,
} from '../types/api';

export const learningService = {
    generateRoadmap: async (data: RoadmapRequest): Promise<RoadmapResponse> => {
        const response = await apiClient.post<RoadmapResponse>('/roadmap', data);
        return response.data;
    },

    generateDailyPlan: async (data: DailyPlanRequest): Promise<DailyPlanResponse> => {
        const response = await apiClient.post<DailyPlanResponse>('/daily-plan', data);
        return response.data;
    },

    generateQuiz: async (data: QuizRequest): Promise<QuizResponse> => {
        const response = await apiClient.post<QuizResponse>('/quiz', data);
        return response.data;
    },

    getHint: async (data: HintRequest): Promise<HintResponse> => {
        const response = await apiClient.post<HintResponse>('/intuition/hint', data);
        return response.data;
    },
};
