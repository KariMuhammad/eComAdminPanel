import type { CommonState } from "@/interfaces";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCoupons as getCoupons } from "@/apis/services/coupon-service";
import type { DiscountType } from "@/types";


type CouponType = {
    code: string;
    discountType: DiscountType,
    discount: number;
    usageLimit: number;
    usageCount: number;
    exireAt: Date;
    isActive: boolean;
}

export type CouponStateType = CommonState & {
    coupons: CouponType[];
}

const initialState: CouponStateType = {
    coupons: [],
    error: null,
    loading: false,
    message: ""
}

export const fetchCoupons = createAsyncThunk("coupons/fetchCoupons", async (token: string) => {
    try {
        const data = await getCoupons(token);
        return data;
    } catch (error) {
        console.log("Error -> ", error);
        return Promise.reject(error);
    }
})

const couponSlice = createSlice({
    name: "coupons",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCoupons.pending, (state) => {
            state.coupons = [];
            state.loading = true;
            state.error = null;
            state.message = "Fetching Coupons from API...";

        }).addCase(fetchCoupons.fulfilled, (state, action) => {
            state.coupons = action.payload;
            state.error = null;
            state.loading = false;
            state.message = "Fetched Coupons Successfully.";
        }).addCase(fetchCoupons.rejected, (state, action) => {
            state.coupons = [];
            state.error = action.payload as string;
            state.loading = false;
            state.message = "Failed to fetch coupons!";
        })
    }
})

export const couponReducer = couponSlice.reducer;
export const couponActions = couponSlice.actions;