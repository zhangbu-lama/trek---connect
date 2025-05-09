import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
    user: null,
    adminToken: null,
    isAdmin: false,
    error: null,
    loading: false,
    initializing: true,

    signup: async (userData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(
                "http://localhost:8000/api/v1/auth/signup",
                userData,
            );
            set({ loading: false, user: response.data.data });
            return response.data;
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || "Failed to sign up";
            set({ loading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    login: async (credentials) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(
                "http://localhost:8000/api/v1/auth/login",
                credentials,
                {
                    withCredentials: true,
                },
            );
            set({ loading: false, user: response.data.data });
            return response.data.data;
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || "Failed to log in";
            set({ loading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    adminLogin: async (credentials) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(
                "http://localhost:8000/api/v1/auth/admin/login",
                credentials,
            );
            const res = response.data.data;
            set({
                loading: false,
                user: res.admin,
                adminToken: res.token,
                isAdmin: true,
            });
            return response.data.data;
        } catch (error) {
            let errorMessage = "Failed to log in as admin";
            if (error.response) {
                errorMessage =
                    error.response.data?.message ||
                    `Server error: ${error.response.status}`;
            } else if (error.request) {
                errorMessage =
                    "No response from server. Check backend or CORS.";
            } else {
                errorMessage = `Request error: ${error.message}`;
            }
            set({ loading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    logout: async () => {
        try {
            await axios.get("http://localhost:8000/api/v1/auth/logout", {
                withCredentials: true,
            });
            set({ user: null, adminToken: null, isAdmin: false, error: null });
        } catch (error) {
            console.log("Logout error:", error);
        }
    },

    initializeAuth: async () => {
        set({ initializing: true, error: null });
        try {
            const token = localStorage.getItem('authToken'); 
            if (!token) {
                set({ initializing: false, user: null, adminToken: null });
                return;
            }

            const response = await axios.get(
                "http://localhost:8000/api/v1/auth/verify-user-token",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,  
                    },
                    withCredentials: true,
                }
            );
            set({ user: response.data.data });
        } catch (err) {
            console.log("Auth initialization failed:", err);
            set({ user: null, adminToken: null });
        } finally {
            set({ initializing: false });
        }
    },
}));

export default useAuthStore;
