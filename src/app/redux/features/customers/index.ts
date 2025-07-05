import type { CommonState } from "@/interfaces";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as customerServices from "../../../../apis/services/customer-services";

type Customer = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  address: string;
};

type CustomerStateType = CommonState & {
  customers: Customer[];
};

const initialState: CustomerStateType = {
  customers: [],
  error: null,
  loading: false,
  message: "",
};

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async (token: string) => {
    try {
      const response = await customerServices.fetchCustomers(token);
      return response.data;
    } catch (error) {
      return Promise.reject(
        error instanceof Error ? error.message : "Failed to fetch customers"
      );
    }
  }
);

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
  },
});

export const customerReducer = customerSlice.reducer;
export const customerActions = customerSlice.actions;
export type { CustomerStateType };
export const selectCustomers = (state: { customers: CustomerStateType }) =>
  state.customers.customers;
