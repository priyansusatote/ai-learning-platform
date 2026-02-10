import { apiClient } from './api';
import { storage } from '../utils/storage';
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types/api';

export const authService = {
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/login', data);
        storage.saveToken(response.data.accessToken);
        return response.data;
    },

    register: async (data: RegisterRequest): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/register', data);
        storage.saveToken(response.data.accessToken);
        return response.data;
    },

    logout: (): void => {
        storage.removeToken();
    },

    isAuthenticated: (): boolean => {
        return storage.hasToken();
    },
};
