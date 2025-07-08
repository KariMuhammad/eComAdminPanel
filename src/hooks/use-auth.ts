import type { AuthStateType } from "@/app/redux/features/auth";
import type { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";

export default function useAuth() {
  const { user, isAuthenticated } = useSelector<RootState, AuthStateType>(
    (state) => state.auth
  );

  return { user, isAuthenticated };
}
