import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
export const useAuthStore = create((set, get) => ({
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
    signup: async (data) => {
        set({isSigningup: true});
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            toast.success("Congrats! You have created an account");
            set({authUser: res.data, isSigningup: false});
        } catch (error) {
            console.error("Error signing up:", error);
            toast.error("Error signing up. Please try again.");
        } finally {
            set({isSigningup: false});
        }
    },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser: null});
            toast.success("You have logged out");
        } catch (error) {
            console.error("Error logging out:", error);
            toast.error("Error logging out. Please try again.");
        }
    },
}));