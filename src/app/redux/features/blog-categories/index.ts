import type { CommonState } from '@/interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchBlogCategories as getBlogCategories } from '@/apis/services/category-services';

type BlogCategory = {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string;
    count: number;
}

// used when dispatch
export type BlogCategoryState = CommonState & {
    blogCategories: BlogCategory[];
}

const initialState: BlogCategoryState = {
    blogCategories: [],
    error: null,
    loading: false,
    message: ""
}

export const fetchBlogCategories = createAsyncThunk("blog-categories/fetchBlogCategories", async () => {
    try {
        const data = await getBlogCategories();
        console.log("Blog Categories", data);
        return data;
    } catch (error) {
        const message = error instanceof Error? error.message : error;
        return Promise.reject(message);
    }
})

const blogCategorySlice = createSlice({
    name: "blog-categories",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchBlogCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.message = "Fetching Blog Categories";
            state.blogCategories = [];
        })

        builder.addCase(fetchBlogCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as any;
            state.message = "Failed fetch blog categories!";
        })

        builder.addCase(fetchBlogCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.message = "Successfully fetch blog categories";
            state.blogCategories = action.payload;
        })
    }
})

export const blogCategoryReducer = blogCategorySlice.reducer;
export const blogCategoryActions = blogCategorySlice.actions;