import type { AuthStateType } from "@/app/redux/features/auth";
import type { RootState } from "@/app/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const { user, isAuthenticated } = useSelector<RootState, AuthStateType>(
    (state) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("User is not authenticated, redirecting to sign-in page");
      navigate("/auth/sign-in");
    }
  }, [isAuthenticated]);

  return { user, isAuthenticated };
}
