import axios from 'axios'
import { useContext } from 'react'
import { Platform } from 'react-native';
// import jwt_decode from 'jwt-decode'
import * as SecureStore from 'expo-secure-store';
const ACCESS_TOKEN_KEY = 'my-access-jwt';
const REFRESH_TOKEN_KEY = 'my-refresh-jwt';

export const sonataApi = axios.create({
    baseURL: 'https://sonata-gj0z.onrender.com/api',
})

export const configureAxiosHeader = (token) => {
    sonataApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const getTokens = async () => {
    const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);

    return {
        accessToken,
        refreshToken
    };
};

export const refreshTokens = async () => {
    const { refreshToken } = await getTokens();
    console.log(refreshToken)
    const { data } = await sonataApi.get(`/auth/refresh-token`, { headers: {'Authorization': `Bearer ${refreshToken}`} });
    return data;
}

export const setTokens = async(accessToken, refreshToken) => {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
}

export const deleteTokens = async() => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
}
//ssssssssssjbkb
export const checkTokenExpired = (token) => {
    return jwt_decode(token)
}
export const postLogin = async(email, password) => {
    const { data } = await sonataApi.post(`/auth/login`, { email, password });
    return data;
}
export const getLessons = async() => {
    const { data } = await sonataApi.get('/lessons/notes');
    return data.lessons;
}
