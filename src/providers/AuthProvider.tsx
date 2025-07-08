import useAuth from "@/hooks/use-auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) navigate("/auth/sign-in");
  }, [isAuthenticated]);

  return <>{children}</>;
}
