import { createApi } from '@reduxjs/toolkit/query/react'
import type { Pagination } from '@/interfaces'
import { API_BASE_URL } from '@/constants';
import { createBaseQueryWithAuth } from '@/lib/utils';

type Category = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  count: number;
};


interface CategoriesResponse {
  categories: Category[]
  pagination: Pagination
}

interface CreateCategoryRequest {
  data: Category | FormData
  token: string
}

interface UpdateCategoryRequest {
  id: string
  updatedData: Partial<Category> | FormData
  token: string
}

interface DeleteCategoryRequest {
  id: string
  token: string
}

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',

  baseQuery: createBaseQueryWithAuth(`${API_BASE_URL}/category`),

  tagTypes: ['Category'],

  endpoints: (builder) => ({
    // Fetch categories with pagination
    getCategories: builder.query<CategoriesResponse, { token: string; page?: number; limit?: number }>({
      query: ({ token, page = 1, limit = 10 }) => ({
        url: `?page=${page}&limit=${limit}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

      transformResponse: (response: { data: CategoriesResponse }) => response.data,

      providesTags: (result) =>
        result
          ? [
            ...result.categories.map(({ _id }) => ({ type: 'Category' as const, id: _id })),
            { type: 'Category', id: 'LIST' },
          ]
          : [{ type: 'Category', id: 'LIST' }],
    }),

    // Get single category
    getCategory: builder.query<Category, { id: string; token: string }>({
      query: ({ id, token }) => ({
        url: `/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

      transformResponse: (response: { data: { category: Category } }) => response.data.category,

      providesTags: (result, error, { id }) => [{ type: 'Category', id }],
    }),

    // Create category
    createCategory: builder.mutation<Category, CreateCategoryRequest>({
      query: ({ data, token }) => ({
        url: '',
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

      transformResponse: (response: { data: Category }) => response.data,

      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
      // Optimistic update for better UX
      async onQueryStarted({ data, token }, { dispatch, queryFulfilled }) {
        try {
          const { data: newCategory } = await queryFulfilled

          // Update the cache for getCategories queries
          dispatch(
            categoriesApi.util.updateQueryData('getCategories', { token, page: 1 }, (draft) => {
              draft.categories.unshift(newCategory)
              draft.pagination.totalCount += 1

              // Remove last item if we exceed limit
              if (draft.categories.length > draft.pagination.limit) {
                draft.categories.pop()
              }
            })
          )
        } catch (error) {
          // Handle error if needed
          console.error('Create category failed:', error)
        }
      },
    }),

    // Update category
    updateCategory: builder.mutation<Category, UpdateCategoryRequest>({
      query: ({ id, updatedData, token }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: updatedData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

      transformResponse: (response: { data: Category }) => response.data,

      invalidatesTags: (result, error, { id }) => [{ type: 'Category', id }],
      // Optimistic update
      async onQueryStarted({ id, updatedData, token }, { dispatch, queryFulfilled }) {
        // Optimistically update all queries containing this category
        const patchResults: any[] = []

        // Update single category query
        patchResults.push(
          dispatch(
            categoriesApi.util.updateQueryData('getCategory', { id, token }, (draft) => {
              Object.assign(draft, updatedData)
            })
          )
        )

        // Update categories list queries
        dispatch(
          categoriesApi.util.updateQueryData('getCategories', { token }, (draft) => {
            const categoryIndex = draft.categories.findIndex(cat => cat._id === id)
            if (categoryIndex !== -1) {
              Object.assign(draft.categories[categoryIndex], updatedData)
            }
          })
        )

        try {
          await queryFulfilled
        } catch (error) {
          // Revert optimistic updates on error
          patchResults.forEach(patch => patch.undo())
        }
      },
    }),

    // Delete category
    deleteCategory: builder.mutation<void, DeleteCategoryRequest>({
      query: ({ id, token }) => ({
        url: `/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

      transformResponse: (response: { data: void }) => response.data,

      invalidatesTags: (result, error, { id }) => [
        { type: 'Category', id },
        { type: 'Category', id: 'LIST' },
      ],
      // Optimistic update
      async onQueryStarted({ id, token }, { dispatch, queryFulfilled }) {
        const patchResults: any[] = []

        // Remove from all categories queries
        patchResults.push(
          dispatch(
            categoriesApi.util.updateQueryData('getCategories', { token }, (draft) => {
              const index = draft.categories.findIndex(cat => cat._id === id)
              if (index !== -1) {
                draft.categories.splice(index, 1)
                draft.pagination.totalCount -= 1
              }
            })
          )
        )

        try {
          await queryFulfilled
        } catch (error) {
          // Revert optimistic updates on error
          patchResults.forEach(patch => patch.undo())
        }
      },
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi