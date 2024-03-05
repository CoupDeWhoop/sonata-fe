import axios from 'axios'
import { useContext } from 'react'
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
const ACCESS_TOKEN_KEY = 'my-access-jwt';
const REFRESH_TOKEN_KEY = 'my-refresh-jwt';

export const sonataApi = axios.create({
    baseURL: 'https://sonata-gj0z.onrender.com/api',
})

export const getTokens = async () => {
    const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);

    return {
        accessToken,
        refreshToken
    };
};

export const setTokens = async(accessToken, refreshToken) => {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
}

export const deleteTokens = async() => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
}

export const configureAxiosHeader = async (token) => {
    sonataApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const postLogin = async(email, password) => {
    const { data } = await sonataApi.post(`/auth/login`, { email, password });
    return data;
}
export const getLessons = async() => {
    const { data } = await sonataApi.get('/lessons/notes');
    return data.lessons;
}
