import { API_BASE_URL } from "@/constants";
import { axiosInstance } from "@/apis";

export const fetchCustomers = async (token: string) => {
  try {
    const response = await axiosInstance.get(API_BASE_URL + "/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    throw error;
  }
};
