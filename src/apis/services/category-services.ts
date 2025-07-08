import { axiosInstance } from "..";

export const fetchCategories = async () => {
  try {
    const response = await axiosInstance.get("/category");
    return response.data.data.categories || [];
  } catch (error) {
    return Promise.reject(
      error instanceof Error ? error.message : "Failed to fetch Categories!"
    );
  }
};
