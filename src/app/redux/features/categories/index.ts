import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { CommonState } from "@/interfaces";
import * as categoryServices from "@/apis/services/category-services";

type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  count: number;
};

export type CategoryStateType = CommonState & {
  categories: Category[];
};

const initialState: CategoryStateType = {
  categories: [],
  error: null,
  loading: false,
  message: "",
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      const data = await categoryServices.fetchCategories();

      return data;
    } catch (error) {
      return Promise.reject(error instanceof Error ? error.message : error);
    }
  }
);

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    reset: (state) => {
      state.categories = [];
      state.error = null;
      state.message = "";
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.categories = [];
      state.loading = true;
      state.error = null;
      state.message = "Fetching categories right now,,,";
    });

    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      // Transform _id to id
      state.categories = action.payload.map((category: any) => ({
        ...category,
        id: category._id,
      }));
      state.error = null;
      state.loading = false;
      state.message = "Fetch categories is done!";
    });

    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.categories = [];
      state.error = action.payload as string;
      state.loading = false;
      state.message = "Failed to fetch categories!";
    });
  },
});

export const categoryReducer = categorySlice.reducer;
export const categoryActions = categorySlice.actions;
