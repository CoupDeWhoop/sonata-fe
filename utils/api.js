import axios from 'axios'
import { useContext } from 'react'
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../app/context/AuthContext';
const ACCESS_TOKEN_KEY = 'my-access-jwt';

export const sonataApi = axios.create({
    baseURL: 'https://sonata-gj0z.onrender.com/api',
})

const getToken = async () => {
    // if (Platform.OS !== 'web') {
    //     return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    //     } else {
    //     const val = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    //     return val;
    //     }
    const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    return token;
};

export const configureAxiosHeader = async (token) => {
    sonataApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const postLogin = async(email, password) => {
    const { data } = await sonataApi.post(`/auth/login`, { email, password });
    console.log(data);
    return data;
}
export const getLessons = async() => {
    const { data } = await sonataApi.get('/lessons');
    console.log(data.lessons);
    return data.lessons;
}