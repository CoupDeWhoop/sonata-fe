import { createContext, useContext, useEffect, useState } from "react";
import { Platform } from 'react-native'
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureAxiosHeader, postLogin, sonataApi } from "../../utils/api";
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
        authenticated: null
    })

    useEffect(() => {
        const loadToken = async () => {
            // let accessToken, refreshToken;

            // if (Platform.OS !== 'web') {
            //     accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
            //     refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
            //     } else {
            //         accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
            //         refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
            //     }
            
            const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
            // refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
            console.log('stored:', accessToken);
        

            if (accessToken) {
                const header = await configureAxiosHeader();
                setAuthState({
                    accessToken,
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
            const result = await postLogin(email, password);
            const { accessToken} = result.tokens;
            //UpdateHTTP Headers
            await configureAxiosHeader(accessToken);
            setAuthState({
                accessToken,
                authenticated: true
            })
    

            

            // if (Platform.OS !== 'web') {
            // await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
            // await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
            // } else {
            //     await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
            //     await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
            // }
            await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
    
        } catch (error) {
            return { error: true, msg: error.message}
        }
    }
        
    const logout = async() => {
        //Delete token from storage
        // if (Platform.OS !== 'web') {
        //     await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
        //     await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
        //     } else {
        //         await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
        //         await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
        //     }  
        await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
        // Update HTTP Headers
        sonataApi.defaults.headers.common['Authorization'] = '';
    
        // Reset auth state
        setAuthState({
            accessToken: null,
            authenticated: false
        });
    };

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    };
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}




