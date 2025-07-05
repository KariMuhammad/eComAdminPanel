export { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as productServices from "@/apis/services/product-services";
import type { CommonState, Pagination } from "@/interfaces";
import type { Product } from "@/types/product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type ProductState = CommonState & {
  products: Product[];
  pagination?: Pagination; // Optional pagination for products
};

const initialState: ProductState = {
  products: [],
  pagination: undefined, // Initialize pagination as undefined
  error: null,
  loading: false,
  message: "",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  (token: string, thunkAPI) => {
    try {
      const response = productServices.fetchProducts(token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch products"
      );
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = "";
      state.products = [];
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.pagination = action.payload.pagination;
      state.error = null;
      state.message = "Products fetched successfully";
    });

    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.message = "Failed to fetch products";
      state.products = [];
      state.pagination = undefined; // Reset pagination on error
    });
  },
});

export const productReducer = productSlice.reducer;
export const productActions = productSlice.actions;
export type { ProductState };
export const selectProducts = (state: { products: ProductState }) =>
  state.products.products;
