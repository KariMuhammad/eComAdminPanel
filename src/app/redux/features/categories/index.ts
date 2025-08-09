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
}

interface UpdateCategoryRequest {
  id: string
  updatedData: Partial<Category> | FormData
}

interface DeleteCategoryRequest {
  id: string
}

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',

  baseQuery: createBaseQueryWithAuth(`${API_BASE_URL}/category`),

  tagTypes: ['Category'],

  endpoints: (builder) => ({
    // Fetch categories with pagination
    getCategories: builder.query<CategoriesResponse, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: `?page=${page}&limit=${limit}`,
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
    getCategory: builder.query<Category, { id: string; }>({
      query: ({ id }) => ({
        url: `/${id}`,
      }),

      transformResponse: (response: { data: { category: Category } }) => response.data.category,

      providesTags: (result, error, { id }) => [{ type: 'Category', id }],
    }),

    // Create category
    createCategory: builder.mutation<Category, CreateCategoryRequest>({
      query: ({ data }) => ({
        url: '',
        method: 'POST',
        body: data,
      }),

      transformResponse: (response: { data: { category: Category } }) => response.data.category,

      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
      // Optimistic update for better UX
      async onQueryStarted({ data }, { dispatch, queryFulfilled }) {
        try {
          const { data: newCategory } = await queryFulfilled

          // Update the cache for getCategories queries
          dispatch(
            categoriesApi.util.updateQueryData('getCategories', { page: 1 }, (draft) => {
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
      query: ({ id, updatedData }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: updatedData,
      }),

      transformResponse: (response: { data: Category }) => response.data,

      invalidatesTags: (result, error, { id }) => [{ type: 'Category', id }],
      // Optimistic update
      async onQueryStarted({ id, updatedData }, { dispatch, queryFulfilled }) {
        // Optimistically update all queries containing this category
        const patchResults: any[] = []

        // Update single category query
        patchResults.push(
          dispatch(
            categoriesApi.util.updateQueryData('getCategory', { id }, (draft) => {
              Object.assign(draft, updatedData)
            })
          )
        )

        // Update categories list queries
        patchResults.push(
          dispatch(
            categoriesApi.util.updateQueryData('getCategories', {}, (draft) => {
              const categoryIndex = draft.categories.findIndex(cat => cat._id === id)
              if (categoryIndex !== -1) {
                Object.assign(draft.categories[categoryIndex], updatedData)
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

    // Delete category
    deleteCategory: builder.mutation<void, DeleteCategoryRequest>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),

      transformResponse: (response: { data: void }) => response.data,

      invalidatesTags: (result, error, { id }) => [
        { type: 'Category', id },
        { type: 'Category', id: 'LIST' },
      ],
      // Optimistic update
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const patchResults: any[] = []

        // Remove from all categories queries
        patchResults.push(
          dispatch(
            categoriesApi.util.updateQueryData('getCategories', {}, (draft) => {
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