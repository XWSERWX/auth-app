import { CODE, LOGIN, PASSWORD } from './constants';

export interface ApiError extends Error {
    status?: number;
    message: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export const login = async ({ email, password }: LoginPayload) => {
    await new Promise((r) => setTimeout(r, 1000));

    if (!email || !password) {
        const error: ApiError = new Error('Fields are required');
        error.status = 400;
        throw error;
    }

    if (email !== LOGIN || password !== PASSWORD) {
        const error: ApiError = new Error('Invalid email or password');
        error.status = 401;
        throw error;
    }

    if (Math.random() < 0.1) {
        const error: ApiError = new Error('Server unavailable');
        error.status = 500;
        throw error;
    }

    return { token: 'fake-jwt-token', user: { email } };
};

export const send2FACode = async (email: string) => {
    await new Promise((r) => setTimeout(r, 1000));

    if (!email) {
        const error: ApiError = new Error('Email is required');
        error.status = 400;
        throw error;
    }

    return { success: true, expiresIn: 60 };
};

export const verify2FACode = async (email: string, code: string) => {
    await new Promise((r) => setTimeout(r, 500));

    if (!email || !code) {
        const error: ApiError = new Error('Email and code are required');
        error.status = 400;
        throw error;
    }

    if (code !== CODE) {
        const error: ApiError = new Error('Invalid code');
        error.status = 401;
        throw error;
    }

    return { success: true };
};
