import { axiosInstance } from "@/apis";
import { catchAsyncThunk } from "@/lib/utils";
import type { Product } from "@/types/product";

export default {
  fetch: (token: string, page: number, limit: number) => catchAsyncThunk(async () => {
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
  }),

  create: (data: Product | FormData, token: string) => catchAsyncThunk(async () => {
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

    const { product } = response.data.data;
    return product;
  }),

  update: (id: string, data: Product | FormData, token: string) => catchAsyncThunk(async () => {
    const headers: any = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    };

    // If data is FormData, don't set Content-Type (browser will set it with boundary)
    if (!(data instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await axiosInstance.patch(`/products/${id}`, data, {
      headers,
    });

    console.log("Response Data", response.data);
    // productActions.append(response.data.data.product);

    const { product } = response.data.data;
    return product;
  }),

  delete: (id: string, token: string) => catchAsyncThunk(async () => {
    const headers: any = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    };

    const response = await axiosInstance.delete(`/products/${id}`, {
      headers
    })

    return response.data;
  }),

  getSingleProductBySlug: (slug: string, token: string) => catchAsyncThunk(async () => {
    const response = await axiosInstance.get(`/products/s/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data.data.product;
  })
}