import axios from "axios";

export const sonataApi = axios.create({
  baseURL: "https://sonata-gj0z.onrender.com/api",
});

export const configureAxiosHeader = (token) => {
  sonataApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
