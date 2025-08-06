import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as brandServices from "@/apis/services/brand-services";
import type { CommonState } from "@/interfaces";

type Brand = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type BrandStateType = CommonState & {
  brands: Brand[];
};

const initialState: BrandStateType = {
  brands: [],
  loading: false,
  error: null,
  message: "",
};

export const fetchBrands = createAsyncThunk("brands/fetchBrands", async () => {
  try {
    const data = await brandServices.fetchBrands();
    return data;
  } catch (error) {
    return Promise.reject(
      error instanceof Error ? error.message : "Failed to fetch brands!"
    );
  }
});

export const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBrands.pending, (state) => {
      state.brands = [];
      state.loading = true;
      state.error = null;
      state.message = "Fetching brands...";
    });

    builder.addCase(fetchBrands.fulfilled, (state, action) => {
      // Transform _id to id
      state.brands = action.payload.map((brand: any) => ({
        ...brand,
        id: brand._id,
      }));
      state.loading = false;
      state.error = null;
      state.message = "Fetch brands is done.";
    });

    builder.addCase(fetchBrands.rejected, (state, action) => {
      state.brands = [];
      state.loading = false;
      state.error = action.payload as string;
      state.message = "Failed to fetch brands!";
    });
  },
});

export const brandReducer = brandSlice.reducer;
export const brandActions = brandSlice.actions;
