import useAuth from "@/hooks/use-auth";
import type React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type GuestProvderProps = {
  children: React.ReactNode;
};

export default function GuestProvder({ children }: GuestProvderProps) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return <>{children}</>;
}
