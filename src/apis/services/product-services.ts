import { axiosInstance } from "@/apis";
import { API_BASE_URL } from "@/constants";

export const fetchProducts = async (token: string) => {
  try {
    const response = await axiosInstance.get(API_BASE_URL + "/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = response.data;
    const products = data.products || [];
    const pagination = data.pagination || {};

    return {
      products,
      pagination,
    };
  } catch (error) {
    return Promise.reject(
      error instanceof Error ? error.message : "Failed to fetch products"
    );
  }
};
