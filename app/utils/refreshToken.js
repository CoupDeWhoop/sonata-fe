import { configureAxiosHeader } from "./api";
import { refreshTokens, setTokens } from "./auth";

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
        console.error("Refresh token error:", refreshError.message);
        throw refreshError;
      }
    } else {
      throw error;
    }
  }
};
