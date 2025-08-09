import { API_BASE_URL } from "@/constants";
import type { Pagination } from "@/interfaces";
import { createBaseQueryWithAuth } from "@/lib/utils";
import { createApi } from "@reduxjs/toolkit/query/react";


type BlogResponse = {
    _id: string;
    title: string;
    description: string;
    author: string;
    image: string;
    likes: string[];
    dislikes: string[];
    views: number;
}

type BlogsResponse = {
    blogs: BlogResponse[];
    pagination: Pagination;
}

type CreateBlogRequest = Omit<BlogResponse, "_id" | "likes" | "dislikes" | "views" | "author">;

export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: createBaseQueryWithAuth(`${API_BASE_URL}/blogs`),
    tagTypes: ["Blogs"],

    endpoints: (builder) => ({
        getBlogs: builder.query<BlogsResponse, { page?: string, limit?: string }>({
            query: ({ page = 1, limit = 10 }) => `?page=${page}&limit=${limit}`,

            transformResponse: (response: { data: BlogsResponse }) => response.data,

            providesTags: (result) => result ? [
                ...result.blogs.map((blog) => ({ type: "Blogs" as const, id: blog._id })),
                { type: "Blogs", id: "LIST" }
            ] : [{ type: "Blogs", id: "LIST" }]
        }),

        getBlogById: builder.query<BlogResponse, { id: string }>({
            query: ({ id }) => `/${id}`,
            transformResponse: (response: { data: BlogResponse }) => response.data,
            providesTags: (result, undefined, { id }) => [{ type: "Blogs", id }],
        }),

        createBlog: builder.mutation<BlogResponse, FormData>({
            query: (data) => ({
                url: "",
                method: "POST",
                body: data,
            }),

            invalidatesTags: (result) => [{ type: "Blogs", id: "LIST" }],

            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                const patches = [];

                try {
                    const { data: blog } = await queryFulfilled;

                    patches.push(
                        dispatch(
                            blogApi.util.updateQueryData("getBlogs", {}, (draft) => {
                                draft.blogs.unshift(blog);
                                draft.blogs.pop();
                            })
                        )
                    )
                } catch (error) {
                    console.error("Error in Create Blog ")
                    patches.forEach(patch => patch.undo());
                }
            }
        }),

        updateBlog: builder.mutation<BlogResponse, { id: string, data: FormData }>({
            query: ({ id, data }) => ({
                url: `/${id}`,
                method: "PATCH",
                body: data
            }),

            invalidatesTags: (result, _, { id }) => [{ type: "Blogs", id: "LIST" }],

            async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
                const patches = [];

                try {
                    patches.push(
                        dispatch(
                            blogApi.util.updateQueryData("getBlogs", {}, (draft) => {
                                const index = draft.blogs.findIndex(blog => blog._id === id);
                                if (index !== -1) {
                                    Object.assign(draft.blogs[index], data);
                                }
                            })
                        )
                    )

                    // await queryFulfilled;
                } catch (error) {
                    console.error("Error in Update Blog ")
                    patches.forEach(patch => patch.undo());
                }
            }
        }),

        deleteBlog: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/${id}`,
                method: "DELETE",
            }),

            invalidatesTags: (result, _, { id }) => [{ type: "Blogs", id }],

            async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                const patches = [];

                try {
                    patches.push(
                        dispatch(
                            blogApi.util.updateQueryData("getBlogs", {}, (draft) => {
                                const index = draft.blogs.findIndex((blog) => blog._id === id);
                                if (index !== -1) {
                                    draft.blogs.splice(index, 1);
                                    draft.pagination.totalCount--;
                                }
                            })
                        )
                    )

                    // await queryFulfilled
                } catch (error) {
                    console.error("Error in Delete Blog ")
                    patches.forEach(patch => patch.undo());
                }
            }
        })
    })
})

export const { useCreateBlogMutation, useGetBlogsQuery, useGetBlogByIdQuery, useDeleteBlogMutation, useUpdateBlogMutation } = blogApi;