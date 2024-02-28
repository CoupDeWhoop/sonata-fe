import { createContext, useContext, useEffect, useState } from "react";
import { Platform } from 'react-native'
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN_KEY = 'my-access-jwt';
const REFRESH_TOKEN_KEY = 'my-refresh-jwt';
export const API_URL = 'https://sonata-gj0z.onrender.com/api';
const AuthContext = createContext({});

export const useAuth = () => { // we can use this just like a hook in other pages
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        accessToken: null,
        refreshToken: null,
        authenticated: null
    })

    useEffect(() => {
    const loadToken = async () => {
        const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
        const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
        console.log('stored:', accessToken, refreshToken);
    

        if (accessToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
            
            setAuthState({
                accessToken,
                refreshToken,
                authenticated: true,
            });
        }
    };
    loadToken(); 
    }, []);

    const register = async(email, password) => {
        try {
            return await axios.post(`${API_URL}/users`, { email, password })
        } catch (error) {
            return { error: true, msg: error.response.body.msg} // TODO: check this 
        }
    }
    const login = async(email, password) => {
        try {
            const result = await axios.post(`${API_URL}/auth/login`, { email, password });
    
            const { accessToken, refreshToken } = result.data.tokens;
            console.log('hello')
    
            setAuthState({
                accessToken,
                refreshToken,
                authenticated: true
            })
    
            //UpdateHTTP Headers
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
            
            if (Platform.OS !== 'web') {
            await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
            await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
            } else {
                await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
                await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

            }
    
        } catch (error) {
            return { error: true, msg: error.message}
        }
    }
        
    // const logout = async() => {
    //     //Delete token from storage
    //     await SecureStore.deleteItemAsync(accessToken);
    //     await SecureStore.deleteItemAsync(refreshToken);    
    //     // Update HTTP Headers
    //     axios.defaults.headers.comom['Authorization'] = '';
    
    //     // Reset auth state
    //     SetAuthState({
    //         accessToken: null,
    //         refreshToken: null,
    //         authenticated: false
    //     });
    // };

    const value = {
        onRegister: register,
        onLogin: login,
        // onLogout: logout,
        authState
    };
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}




