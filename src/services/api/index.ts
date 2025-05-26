import axios, { type AxiosInstance } from "axios";
import type { AuthDTO } from "@/services/types/AuthDTO";

export const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const authStorage = localStorage.getItem("auth");
    const auth = authStorage ? (JSON.parse(authStorage) as AuthDTO) : null;

    if (auth?.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
