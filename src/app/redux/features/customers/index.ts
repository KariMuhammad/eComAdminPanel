import type { CommonState } from "@/interfaces";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import customerServices from "../../../../apis/services/customer-services";
import type { Customer } from "@/types";



type CustomerStateType = CommonState & {
  customers: Customer[];
};

const initialState: CustomerStateType = {
  customers: [],
  error: null,
  loading: false,
  message: "",
};

type UpdateCustomerRequest = {
  id: string;
  updatedData: Partial<Customer>;
  token: string
}

// type CreateCustomerRequest = {
//   data: Omit<Customer, "_id" | "role" | "status" | "address">;
//   token: string
// }

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async (token: string) => {
    try {
      const response = await customerServices.fetch(token);
      return response.data;
    } catch (error) {
      return Promise.reject(
        error instanceof Error ? error.message : "Failed to fetch customers"
      );
    }
  }
);

export const updateCustomer = createAsyncThunk("customers/updateCustomer", async ({ id, updatedData, token }: UpdateCustomerRequest, thunkApi) => {
  try {
    const response = await customerServices.update(id, updatedData, token);
    return response.data;
  } catch (error) {
    return Promise.reject(
      error instanceof Error ? error.message : "Failed to updated customer"
    )
  }
})

export const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCustomers.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = "";
      state.customers = [];
    });

    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      state.loading = false;
      state.customers = action.payload;
      state.error = null;
      state.message = "Customers fetched successfully";
    });

    builder.addCase(fetchCustomers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.message = "Failed to fetch customers";
      state.customers = [];
    });

    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = "Successfully updated customer";

      const index = state.customers.findIndex((customer) => customer._id === action.payload._id);
      if (index !== -1) {
        state.customers[index] = action.payload;
      }
    })
  },
});

export const customerReducer = customerSlice.reducer;
export const customerActions = customerSlice.actions;
export type { CustomerStateType };
export const selectCustomers = (state: { customers: CustomerStateType }) =>
  state.customers.customers;
