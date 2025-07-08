import { axiosInstance } from "..";

export const fetchBrands = async () => {
  try {
    const response = await axiosInstance.get("/brands");
    return response.data.data.brands || [];
  } catch (error) {
    return Promise.reject(
      error instanceof Error ? error.message : "Failed to fetch Brands!"
    );
  }
};
