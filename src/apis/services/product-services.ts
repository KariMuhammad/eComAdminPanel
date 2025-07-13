import { axiosInstance } from "@/apis";
import { productActions } from "@/app/redux/features/products";
import type { Product } from "@/types/product";
import { toast } from "sonner";

export const fetchProducts = async (token: string, page: number, limit: number) => {
  try {
    const response = await axiosInstance.get(`/products?page=${page}&limit=${limit}`, {
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

export const createProduct = async (data: Product | FormData, token: string) => {
  const headers: any = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data"
  };

  // If data is FormData, don't set Content-Type (browser will set it with boundary)
  if (!(data instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await axiosInstance.post("/products", data, {
    headers,
  });

  console.log("Response Data", response.data);
  productActions.append(response.data.data.product);
  return response.data.data.product;
};

export const getSingleProductBySlug = async (slug: string, token: string) => {
  try {
    const response = await axiosInstance.get(`/products/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;

  } catch (error) {
    const message = error instanceof Error? error.message: error as string;
    console.error(message);
    toast.error(message)
  }
}