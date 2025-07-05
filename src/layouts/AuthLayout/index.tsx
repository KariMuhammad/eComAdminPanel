import type { AuthStateType } from "@/app/redux/features/auth";
import type { RootState } from "@/app/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthLayout() {
  const { isAuthenticated } = useSelector<RootState, AuthStateType>(
    (state) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/sign-in");
    } else {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Outlet />
      </div>
    </div>
  );
}
