import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningup: false,
    isLoggingIng: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data, isCheckingAuth: false});
        } catch (error) {
            console.error("Error checking auth:", error);
            set({authUser: null});
            set({isCheckingAuth: false});
        }
    },
}));