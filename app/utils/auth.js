import AsyncStorage from "@react-native-async-storage/async-storage";
import { sonataApi } from "./apiConfig";

const ACCESS_TOKEN_KEY = "my-access-jwt";
const REFRESH_TOKEN_KEY = "my-refresh-jwt";

export const getTokens = async () => {
  const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);

  return {
    accessToken,
    refreshToken,
  };
};

export const refreshTokens = async () => {
  const { refreshToken, accessToken } = await getTokens();
  console.log("refreshToken", refreshToken, "access", accessToken);
  const { data } = await sonataApi.get(`/auth/refresh-token`, {
    headers: { Authorization: `Bearer ${refreshToken}` },
  });
  return data;
};

export const setTokens = async (accessToken, refreshToken) => {
  await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const deleteTokens = async () => {
  await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
  await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const postUser = async (user_name, user_email, user_password) => {
  const { data } = await sonataApi.post("/users", {
    user_name,
    user_email,
    user_password,
  });
  return data.user;
};
export const postLogin = async (email, password) => {
  const { data } = await sonataApi.post(`/auth/login`, { email, password });

  return data;
};
