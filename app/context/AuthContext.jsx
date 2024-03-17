import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { postLogin, getTokens, setTokens, deleteTokens } from "../utils";
import { configureAxiosHeader } from "../utils/api";
export const API_URL = 'https://sonata-gj0z.onrender.com/api';
const AuthContext = createContext({});

export const useAuth = () => { // we can use this just like a hook in other pages
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        accessToken: null,
        refreshToken:null,
        authenticated: null
    })

    useEffect(() => {
        const loadTokens = async () => {
            
            const tokens = await getTokens()
            console.log('stored:', tokens.accessToken, tokens.refreshToken);
            configureAxiosHeader(tokens.accessToken);
            setAuthState({
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                authenticated: true,
            });
        };
        loadTokens(); 
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
            const { accessToken, refreshToken } = result.tokens;
            //UpdateHTTP Headers
            configureAxiosHeader(accessToken);
            setAuthState({
                accessToken,
                refreshToken,
                authenticated: true
            })
    
            setTokens(accessToken, refreshToken)
    
        } catch (error) {
            return { error: true, msg: error.message}
        }
    }
        
    const logout = async() => {

        await deleteTokens()
        // Update HTTP Headers
        configureAxiosHeader('');
    
        // Reset auth state
        setAuthState({
            accessToken: null,
            refreshToken: null,
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




