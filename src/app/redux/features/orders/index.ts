import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as orderServices from "@/apis/services/order-services";
import type { CommonState } from "@/interfaces";

type Order = {
  _id: string;
  orderedBy: {
    first_name: string;
    last_name: string;
    email: string;
  };

  totalPrice: number;
  status: boolean;
  createdAt: Date;
};

export type OrderStateType = CommonState & {
  orders: Order[];
};

const initialState: OrderStateType = {
  orders: [],
  loading: false,
  error: null,
  message: "",
};

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (token: string) => {
    try {
      const data = await orderServices.fetchOrders(token);
      return data.orders;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.orders = [];
      state.loading = true;
      state.error = null;
      state.message = "";
    });

    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
      state.error = null;
      state.message = "";
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.orders = [];
      state.loading = false;
      state.error = action.payload as string;
      state.message = "Failed to get orders!";
    });
  },
});

export const orderReducer = orderSlice.reducer;
export const orderActions = orderSlice.actions;
