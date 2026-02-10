const TOKEN_KEY = 'ai_learning_jwt';

export const storage = {
    saveToken: (token: string): void => {
        localStorage.setItem(TOKEN_KEY, token);
    },

    getToken: (): string | null => {
        return localStorage.getItem(TOKEN_KEY);
    },

    removeToken: (): void => {
        localStorage.removeItem(TOKEN_KEY);
    },

    hasToken: (): boolean => {
        return !!localStorage.getItem(TOKEN_KEY);
    },
};
