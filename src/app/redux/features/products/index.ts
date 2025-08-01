import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { CommonState, Pagination } from "@/interfaces";
import type { Product } from "@/types/product";

import api from "@/apis/services/product-services";

type ProductState = CommonState & {
  products: Product[];
  pagination: Pagination; // Optional pagination for products
};

const initialState: ProductState = {
  products: [],
  pagination: {
    count: 0,
    limit: 0,
    nextPage: null,
    page: 1,
    prevPage: null,
    totalCount: 0,
  },
  error: null,
  loading: false,
  message: "",
};

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async ({ token, page = 1, limit = 10 }: { token: string; page?: number; limit?: number }, thunkAPI) => {
    try {
      const data = await api.fetch(token, page, limit);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch products"
      );
    }
  }
);

export const createProduct = createAsyncThunk("products/create", async ({ data, token }: { token: string; data: Product | FormData }, thunkAPI) => {
  try {
    const product = await api.create(data, token);
    return product;
  } catch (error) {
    console.log("Error ", error);
    return thunkAPI.rejectWithValue("Failed to create products");
  }
})

export const updateProduct = createAsyncThunk("products/update", async ({ id, updatedData, token }: { id: string; updatedData: any; token: string }, thunkAPI) => {
  try {
    const product = await api.update(id, updatedData, token);
    return product;
  } catch (error) {
    console.log("Error ", error);
    return thunkAPI.rejectWithValue("Failed to update products");
  }
})

export const deleteProduct = createAsyncThunk("products/delete", async ({ id, token }: { id: string; token: string }, { getState, rejectWithValue }) => {
  try {
    await api.delete(id, token);
    const state = getState() as { products: ProductState };
    return state.products.products.find((product: Product) => product._id === id);
  } catch (error) {
    console.log("Error ", error);
    return rejectWithValue("Failed to delete products");
  }
})

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    append: (state, action) => {
      state.products.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    // Fetching Cases
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
      state.pagination = initialState.pagination; // Reset pagination on error
    });

    // Creating Cases
    builder.addCase(createProduct.fulfilled, (state, action) => {
      // Add this store & Re-Calculate Pagination (Update UI)
      const { page, count, totalCount, nextPage } = state.pagination;

      if (page === 1) {
        state.products.unshift(action.payload)

        if (state.products.length > state.pagination.limit) {
          state.products.pop();
        }
      }

      state.pagination.totalCount += 1;
      state.pagination.nextPage = totalCount > count ? (nextPage && isFinite(nextPage) ? nextPage + 1 : 1) : nextPage;
    })

    // Updating Cases
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const { _id, ...data } = action.payload;
      const productIndex = state.products.findIndex((product) => product._id === _id)

      console.log("Update product #", _id);
      console.log("Data", data);

      const product = state.products[productIndex];
      state.products[productIndex] = { ...product, ...data }
    })

    // Deletion Cases
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      console.log("Action Payload", action.payload);

      if (action.payload) {
        const { _id } = action.payload;
        state.products = state.products.filter((product) => product._id !== _id);
      }
    })
  },
});

export const productReducer = productSlice.reducer;
export const productActions = productSlice.actions;
export type { ProductState };
export const selectProducts = (state: { products: ProductState }) =>
  state.products.products;
