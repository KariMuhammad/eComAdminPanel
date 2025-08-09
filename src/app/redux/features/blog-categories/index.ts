import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQueryWithAuth } from '@/lib/utils';
import { API_BASE_URL } from '@/constants';

export type BlogCategoryResponse = {
    _id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    count: number;
}

export type CreateBlogCategoryRequest = Omit<BlogCategoryResponse, "_id" | "slug" | "count" | "image"> & {
    image: File | null
};

export type CreateBlogCategoryFormData = FormData;


export const BlogCategoryApi = createApi({
    reducerPath: "blogCategoryApi",
    baseQuery: createBaseQueryWithAuth(`${API_BASE_URL}/blog-category`),
    tagTypes: ["BlogCategory"],
    endpoints: (builder) => ({
        getBlogCategories: builder.query<BlogCategoryResponse[], void>({
            query: () => "/",

            transformResponse: (response: { data: BlogCategoryResponse[] }) => response.data,

            providesTags: (result) => result ? [
                ...result.map(blogCategory => ({ type: "BlogCategory" as const, id: blogCategory._id })),
                { type: "BlogCategory" as const, id: "LIST" }
            ] : [{ type: "BlogCategory" as const, id: "LIST" }]
        }),

        getBlogCategoryById: builder.query<BlogCategoryResponse, Pick<BlogCategoryResponse, "_id">>({
            query: ({ _id }) => `/${_id}`,

            transformResponse: (response: { data: BlogCategoryResponse }) => response.data,

            providesTags: (result, undefined, { _id }) => [{ type: "BlogCategory", id: _id }],
        }),

        createBlogCategory: builder.mutation<BlogCategoryResponse, CreateBlogCategoryFormData>({
            query: (data) => ({
                url: "/",
                method: "POST",
                body: data,
            }),


            transformResponse: (response: { data: BlogCategoryResponse }) => response.data,

            invalidatesTags: (result) => [{ type: "BlogCategory", id: "LIST" }],

            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                const patches = [];

                try {
                    const { data } = await queryFulfilled;

                    patches.push(
                        dispatch(BlogCategoryApi.util.updateQueryData("getBlogCategories", undefined, (draft) => {
                            draft.unshift(data)
                        }))
                    )
                } catch (error) {
                    console.error("Error un create blog category!");
                    patches.forEach(patch => patch.undo());
                }
            }
        }),

        updateBlogCategory: builder.mutation<BlogCategoryResponse, { id: string, data: CreateBlogCategoryFormData }>({
            query: ({ id, data }) => ({
                url: `/${id}`,
                method: "PATCH",
                body: data
            }),

            invalidatesTags: (result, undefined, { id }) => [{ type: "BlogCategory", id }],

            transformResponse: (response: { data: BlogCategoryResponse }) => response.data,

            async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
                const patches = [];

                try {
                    patches.push(
                        dispatch(BlogCategoryApi.util.updateQueryData("getBlogCategoryById", { _id: id }, (draft) => {
                            Object.assign(draft, data);
                        }))
                    )

                    patches.push(
                        dispatch(BlogCategoryApi.util.updateQueryData("getBlogCategories", undefined, (draft) => {
                            const index = draft.findIndex(blogCategory => blogCategory._id === id);
                            if (index !== -1) {
                                Object.assign(draft[index], data);
                            }
                        }))
                    )

                    await queryFulfilled;
                } catch (error) {
                    patches.forEach(patch => patch.undo());
                }
            }
        }),

        deleteBlogCategory: builder.mutation<void, Pick<BlogCategoryResponse, "_id">>({
            query: ({ _id }) => ({
                url: `/${_id}`,
                method: "DELETE",
            }),

            invalidatesTags: (result, undefined, { _id }) => [{ type: "BlogCategory", id: _id }],

            async onQueryStarted({ _id }, { dispatch, queryFulfilled }) {
                const patches = [];

                try {
                    patches.push(
                        dispatch(BlogCategoryApi.util.updateQueryData("getBlogCategories", undefined, (draft) => {
                            const index = draft.findIndex(blogCategory => blogCategory._id === _id);

                            if (index !== -1) {
                                draft.splice(index, 1);
                            }
                        }))
                    )

                    await queryFulfilled;
                } catch (error) {
                    patches.forEach(patch => patch.undo());
                }
            }
        })
    })
})


const { useGetBlogCategoriesQuery, useGetBlogCategoryByIdQuery, useCreateBlogCategoryMutation, useUpdateBlogCategoryMutation, useDeleteBlogCategoryMutation } = BlogCategoryApi;

export { useGetBlogCategoriesQuery, useGetBlogCategoryByIdQuery, useCreateBlogCategoryMutation, useUpdateBlogCategoryMutation, useDeleteBlogCategoryMutation };