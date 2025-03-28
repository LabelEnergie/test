import { BASE } from "@/constants";
import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { auth } from "@/config/firebase";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
    },
  },
});

export const api = axios.create({
  baseURL: BASE.URL,
});

export const apiFromServerSideEnd = axios.create({
  baseURL: BASE.URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(async (request) => {
  try {
    const token = await auth.currentUser?.getIdToken();
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
  } catch {}
  return request;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await auth.signOut();
      if (window.location.href.includes("/app")) {
        window.location.href = "/app/connexion";
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);


export const backend = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
});

export const resetSession = () => {
  localStorage.clear();
  sessionStorage.clear();
};
