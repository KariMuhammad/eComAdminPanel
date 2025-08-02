import axios from "axios";
import store from "@/app/redux/store";
import { authActions } from "@/app/redux/features/auth";
import { API_BASE_URL } from "@/constants";
import { toast } from "sonner";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check for token expired error (customize as needed)
    if (
      error.response &&
      (error.response.status === 401 ||
        error.response.data?.message?.toLowerCase().includes("token expired") ||
        error.response.data?.message?.toLowerCase().includes("unauthorized") ||
        error.response.data?.error?.toLowerCase().includes("token expired") ||
        error.response.data?.error?.toLowerCase().includes("unauthorized"))
    ) {
      // Dispatch logout action to clear auth state
      store.dispatch(authActions.logout());

      // Show user-friendly message
      toast.error("Session expired. Please sign in again.");

      // Use a more reliable way to navigate
      setTimeout(() => {
        window.location.href = "/auth/sign-in";
      }, 100);
    }
    return Promise.reject(error);
  }
);
