import { axiosInstance } from "@/apis";
import type { Product } from "@/types/product";

export const fetchProducts = async (token: string) => {
  try {
    const response = await axiosInstance.get("/products", {
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

export const createProduct = async (data: Product, token: string) => {
  const response = await axiosInstance.post("/products", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.product;
};
