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

export const fetchBlogCategories = async () => {
  try {
    const response = await axiosInstance.get("/blog-category");
    return response.data.data;
  } catch (error) {
    const message = error instanceof Error ? error.message : error as any;
    throw new Error(message);
  }
}

export const createCategory = async (data: any, token: string) => {
  try {
    const response = await axiosInstance.post("/category", data, {
      headers: {
        Authorization: "Bearer " + token,
      }
    })

    return response.data;
  } catch (error) {
    const message = error instanceof Error ? error.message: error as any;
    throw new Error(message || "Failed to create category!")
  }
}

export const createBlogCategory = async (data: any, token: string) => {
  try {
    const response = await axiosInstance.post("/blog-category", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    })

    return response.data
  } catch (error) {
    const message = error instanceof Error? error.message: error as string;
    throw new Error(message || "Failed to create blog category");
  }
}