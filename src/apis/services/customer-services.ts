import { axiosInstance } from "@/apis";

export const fetchCustomers = async (token: string) => {
  try {
    const response = await axiosInstance.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const data = await response.data.data;
    return data;
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    throw error;
  }
};
