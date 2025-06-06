import axiosService, { type AxiosInstance } from "axios";
import type { AuthDTO } from "@/services/types/AuthDTO";

export const axios: AxiosInstance = axiosService.create({
  baseURL: "https://minerva-api-tg8d.onrender.com",
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(
  (config) => {
    const authStorage = localStorage.getItem("auth");
    const auth = authStorage ? (JSON.parse(authStorage) as AuthDTO) : null;

    window.dispatchEvent(new Event("checkAuth"));

    if (auth?.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
