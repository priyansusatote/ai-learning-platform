import axios, { AxiosError } from 'axios';
import type { AxiosInstance } from 'axios';
import { storage } from '../utils/storage';

const API_BASE_URL = 'http://localhost:8080';

// Create axios instance
export const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor: attach JWT token
apiClient.interceptors.request.use(
    (config) => {
        const token = storage.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor: handle 401 unauthorized
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            // Clear token and redirect to login
            storage.removeToken();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Generic error handler
export const handleApiError = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.message || error.message || 'An error occurred';
    }
    return 'An unexpected error occurred';
};
