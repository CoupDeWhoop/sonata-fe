import { createContext, useContext, useEffect, useState } from "react";
import {
  postLogin,
  getTokens,
  setTokens,
  deleteTokens,
  postUser,
} from "../utils";
import { configureAxiosHeader } from "../utils/apiConfig";

const AuthContext = createContext({});

export const useAuth = () => {
  // we can use this just like a hook in other pages
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    accessToken: null,
    refreshToken: null,
    authenticated: null,
  });

  const [message, setMessage] = useState(null);

  useEffect(() => {
    const loadTokens = async () => {
      try {
        const tokens = await getTokens();
        console.log("stored:", tokens.accessToken, tokens.refreshToken);
        if (tokens.accessToken) {
          configureAxiosHeader(tokens.accessToken);
          setAuthState({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            authenticated: true,
          });
        }
      } catch (error) {
        console.error("Error loading tokens:", error);
        setMessage("Server Error, please log in again");
      }
    };
    loadTokens();
  }, []);

  const login = async (email, password) => {
    try {
      const result = await postLogin(email, password);
      const { accessToken, refreshToken } = result.tokens;
      //UpdateHTTP Headers

      configureAxiosHeader(accessToken);
      setAuthState({
        accessToken,
        refreshToken,
        authenticated: true,
      });

      setTokens(accessToken, refreshToken);
    } catch (error) {
      return { error: true, msg: error.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const user = await postUser(name, email, password);
      return user;
    } catch (error) {
      console.log("Registration Error:", error);
      setMessage("Registration failed. Please try again");
    }
  };

  const logout = async () => {
    await deleteTokens();
    // Update HTTP Headers
    configureAxiosHeader("");

    // Reset auth state
    setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: false,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
    message,
    setMessage,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
