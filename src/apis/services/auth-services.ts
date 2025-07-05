import axios from "axios";
import { API_BASE_URL } from "@/constants";

export const login = async (email: string, password: string) => {
  const response = await axios.post(API_BASE_URL + "/auth/login", {
    email,
    password,
  });

  console.log("Login response:", response);

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Login failed");
  }
};
