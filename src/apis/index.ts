import axios from "axios";
import store from "@/app/redux/store";
import { authActions } from "@/app/redux/features/auth";

export const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check for token expired error (customize as needed)
    if (
      error.response &&
      (error.response.status === 401 ||
        error.response.data?.message?.toLowerCase().includes("token expired"))
    ) {
      store.dispatch(authActions.logout());
      window.alert("Session expired. Please sign in again.");
      window.location.href = "/auth/sign-in";
    }
    return Promise.reject(error);
  }
);
