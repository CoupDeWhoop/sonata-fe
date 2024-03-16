import { sonataApi, configureAxiosHeader } from './api';
import { refreshTokens, setTokens } from './auth';

export const handleTokenRefresh = async (apiCall) => {
    try {
        const result = await apiCall();
        return result;
    } catch (error) {
        console.log(error.message);
        if (error.response && error.response.status === 403) {
            try {
                const { tokens } = await refreshTokens();
                await setTokens(tokens.accessToken, tokens.refreshToken);
                configureAxiosHeader(tokens.accessToken);
                const result = await apiCall();
                return result;
            } catch (refreshError) {
                console.error('Refresh token error:', refreshError.message);
                throw refreshError;
            }
        } else {
            throw error;
        }
    }
};

export const getLessons = async () => {
    return handleTokenRefresh(async () => {
        const { data } = await sonataApi.get('/lessons/notes');
        return data.lessons;
    });
};

export const getPractises = async () => {
    return handleTokenRefresh(async () => {
        const { data } = await sonataApi.get('/practises');
        return data.practises;
    });
};

export const postLesson = async (timestamp, duration) => {
    const newLesson = { timestamp };
    if (duration) newLesson['duration'] = duration;
    return handleTokenRefresh(async () => {
        const { data } = await sonataApi.post('/lessons', newLesson);
        return data.lesson;
    });
};

export const deleteLesson = async (lesson_id) => {
    return handleTokenRefresh(async () => {
        const { data } = await sonataApi.delete(`/lessons/${lesson_id}`);
        return data;
    });
};