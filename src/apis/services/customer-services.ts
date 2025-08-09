import { axiosInstance } from "@/apis";
import { catchAsyncThunk } from "@/lib/utils";
import { type Customer } from "@/types";
export default {
  fetch: (token: string) => catchAsyncThunk(async () => {
    const response = await axiosInstance.get(`/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }),

  create: (data: Omit<Customer, "_id" | "role" | "status" | "address">, token: string) => catchAsyncThunk(async () => {
    const response = await axiosInstance.post("/users", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    console.log("Response Data", response.data);

    const newCustomer = response.data;
    return newCustomer;
  }),

  update: (id: string, data: Partial<Customer>, token: string) => catchAsyncThunk(async () => {
    const response = await axiosInstance.patch(`/users/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    console.log("Response Data", response.data);
    // productActions.append(response.data.data.product);

    const updatedCustomer = response.data;
    return updatedCustomer;
  }),

  delete: (id: string, token: string) => catchAsyncThunk(async () => {
    const response = await axiosInstance.delete(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })

    return response.data;
  }),
}